// afterstate 가치 리드아웃 3종. 모든 조건에 같은 리드아웃·같은 하이퍼파라미터를 적용한다 (조건 간 비교가 목적).
//
//   R1 ridge      릿지 선형 (기준선). λ 는 검증 분할에서 격자 선택.
//   R2 quadratic  릿지 + 이차 특징: 입력 d 개 + 제곱항 d 개 + 훈련 분산 상위 30 차원의 쌍별 곱 435 개.
//   R3 mlp        소형 MLP d → 64 → m, ReLU, Adam, 미니배치 64, 검증 MSE 로 조기 종료 (patience 10, 최대 200 epoch). 직접 구현.
//
// 입력은 훈련 통계로 표준화(상수 열은 0, z 는 ±5 winsorize), 목표는 열별 표준화. predict(x) 는 원 단위의 Float64Array(m).
// 목표 2종: V1 = Dellacherie 점수 스칼라, V2 = 6특징 (→ 고정 가중치로 선형 결합해 가치).

import { createRng } from './prng.js';
import { prepareRidge, solveRidge, LAMBDA_GRID } from './probe.js';

export const READOUTS = ['R1', 'R2', 'R3'];
export const READOUT_NAMES = { R1: 'ridge', R2: 'ridge+quadratic', R3: 'mlp' };
export const TARGETS = ['V1', 'V2'];
export const QUAD_TOP = 30;
export const MLP = { hidden: 64, lr: 1e-3, batch: 64, maxEpochs: 200, patience: 10, beta1: 0.9, beta2: 0.999, eps: 1e-8, weightDecay: 0 };

// ---------- 목표 ----------

// samples[i].score / .features → Y 행. weights 는 V2 결합 가중치.
export function targetRows(samples, target) {
  if (target === 'V1') return samples.map((s) => Float64Array.from([s.score]));
  if (target === 'V2') return samples.map((s) => Float64Array.from(s.features));
  throw new Error(`unknown target ${target}`);
}
// 예측 행 → 스칼라 가치
export function valueOf(target, y, weights) {
  if (target === 'V1') return y[0];
  let v = 0;
  for (let k = 0; k < weights.length; k++) v += weights[k] * y[k];
  return v;
}

// ---------- 공통 ----------

const mse = (predict, X, Y) => {
  let s = 0, n = 0;
  for (let i = 0; i < X.length; i++) { const p = predict(X[i]); for (let c = 0; c < Y[i].length; c++) { s += (p[c] - Y[i][c]) ** 2; n++; } }
  return s / n;
};

// R1: 릿지. λ 격자(× n_train)를 검증 MSE 로 고른다.
export function trainRidge(Xtr, Ytr, Xva, Yva, { grid = LAMBDA_GRID } = {}) {
  const prep = prepareRidge(Xtr, Ytr);
  let best = null;
  for (const rel of grid) {
    const fit = solveRidge(prep, rel * Xtr.length);
    const v = mse(fit.predict, Xva, Yva);
    if (!best || v < best.valMse) best = { fit, valMse: v, lambdaRel: rel };
  }
  const { fit } = best;
  return {
    kind: 'R1', predict: fit.predict, info: { lambdaRel: best.lambdaRel, valMse: best.valMse },
    toJSON: () => ({ kind: 'R1', d: prep.d, m: prep.m, W: Array.from(fit.W), mean: Array.from(fit.mean), std: Array.from(fit.std), yMean: Array.from(fit.yMean) }),
  };
}

// R2: 이차 특징 사상. top 은 훈련 분산 상위 QUAD_TOP 차원 인덱스.
export function quadraticMap(x, top) {
  const d = x.length;
  const out = new Float64Array(d + d + (top.length * (top.length - 1)) / 2);
  for (let j = 0; j < d; j++) { out[j] = x[j]; out[d + j] = x[j] * x[j]; }
  let k = 2 * d;
  for (let a = 0; a < top.length; a++) for (let b = a + 1; b < top.length; b++) out[k++] = x[top[a]] * x[top[b]];
  return out;
}
export function topVarianceDims(X, count = QUAD_TOP) {
  const d = X[0].length, n = X.length;
  const mean = new Float64Array(d), v = new Float64Array(d);
  for (const x of X) for (let j = 0; j < d; j++) mean[j] += x[j] / n;
  for (const x of X) for (let j = 0; j < d; j++) v[j] += (x[j] - mean[j]) ** 2 / n;
  return Array.from({ length: d }, (_, j) => j).sort((a, b) => v[b] - v[a] || a - b).slice(0, Math.min(count, d));
}
export function trainQuadratic(Xtr, Ytr, Xva, Yva, opts = {}) {
  const top = topVarianceDims(Xtr);
  const r = trainRidge(Xtr.map((x) => quadraticMap(x, top)), Ytr, Xva.map((x) => quadraticMap(x, top)), Yva, opts);
  const base = r.toJSON();
  return {
    kind: 'R2', predict: (x) => r.predict(quadraticMap(x, top)), info: r.info,
    toJSON: () => ({ ...base, kind: 'R2', top }),
  };
}

// ---------- R3: MLP ----------

function standardizer(X, clip = 5) {
  const d = X[0].length, n = X.length;
  const mean = new Float64Array(d), std = new Float64Array(d);
  for (const x of X) for (let j = 0; j < d; j++) mean[j] += x[j] / n;
  for (const x of X) for (let j = 0; j < d; j++) std[j] += (x[j] - mean[j]) ** 2 / n;
  let maxStd = 0;
  for (let j = 0; j < d; j++) { std[j] = Math.sqrt(std[j]); maxStd = Math.max(maxStd, std[j]); }
  for (let j = 0; j < d; j++) if (std[j] < maxStd * 1e-8) std[j] = 0;
  const apply = (x) => { const z = new Float64Array(d); for (let j = 0; j < d; j++) z[j] = std[j] > 0 ? Math.max(-clip, Math.min(clip, (x[j] - mean[j]) / std[j])) : 0; return z; };
  return { mean, std, apply };
}

// 파라미터 { W1 (h×d), b1 (h), W2 (m×h), b2 (m) } 를 하나의 Float64Array 로 두고 뷰로 접근한다.
export function createMLP(d, h, m, seed = 1) {
  const n1 = h * d, n2 = m * h;
  const theta = new Float64Array(n1 + h + n2 + m);
  const rng = createRng(seed);
  const s1 = Math.sqrt(2 / d), s2 = Math.sqrt(1 / h); // He / Glorot 형 초기화 (균등 분포)
  for (let i = 0; i < n1; i++) theta[i] = rng.uniform(-s1, s1) * Math.sqrt(3);
  for (let i = 0; i < n2; i++) theta[n1 + h + i] = rng.uniform(-s2, s2) * Math.sqrt(3);
  return { d, h, m, theta, off: { W1: 0, b1: n1, W2: n1 + h, b2: n1 + h + n2 } };
}

// 순전파. z, a 를 돌려준다 (역전파용).
export function mlpForward(net, x) {
  const { d, h, m, theta, off } = net;
  const z = new Float64Array(h), a = new Float64Array(h), y = new Float64Array(m);
  for (let i = 0; i < h; i++) {
    let s = theta[off.b1 + i];
    const row = off.W1 + i * d;
    for (let j = 0; j < d; j++) s += theta[row + j] * x[j];
    z[i] = s; a[i] = s > 0 ? s : 0;
  }
  for (let c = 0; c < m; c++) {
    let s = theta[off.b2 + c];
    const row = off.W2 + c * h;
    for (let i = 0; i < h; i++) s += theta[row + i] * a[i];
    y[c] = s;
  }
  return { z, a, y };
}

// 미니배치 손실 L = (1/B) Σ_b ½‖y_b − t_b‖² 의 기울기를 grad 에 누적 (grad 는 0 으로 시작해야 한다). 손실 값을 돌려준다.
export function mlpBackward(net, X, T, grad) {
  const { d, h, m, theta, off } = net;
  const B = X.length;
  let loss = 0;
  for (let b = 0; b < B; b++) {
    const x = X[b], t = T[b];
    const { z, a, y } = mlpForward(net, x);
    const dy = new Float64Array(m);
    for (let c = 0; c < m; c++) { const e = y[c] - t[c]; loss += 0.5 * e * e / B; dy[c] = e / B; }
    const da = new Float64Array(h);
    for (let c = 0; c < m; c++) {
      const row = off.W2 + c * h;
      grad[off.b2 + c] += dy[c];
      for (let i = 0; i < h; i++) { grad[row + i] += dy[c] * a[i]; da[i] += theta[row + i] * dy[c]; }
    }
    for (let i = 0; i < h; i++) {
      if (z[i] <= 0) continue;
      const g = da[i];
      grad[off.b1 + i] += g;
      const row = off.W1 + i * d;
      for (let j = 0; j < d; j++) grad[row + j] += g * x[j];
    }
  }
  return loss;
}

export function trainMLP(Xtr, Ytr, Xva, Yva, { seed = 1, hidden = MLP.hidden, lr = MLP.lr, batch = MLP.batch, maxEpochs = MLP.maxEpochs, patience = MLP.patience, log = null } = {}) {
  const d = Xtr[0].length, m = Ytr[0].length;
  const sx = standardizer(Xtr), sy = standardizer(Ytr, Infinity); // 목표는 자르지 않는다
  const Ztr = Xtr.map(sx.apply), Zva = Xva.map(sx.apply);
  const Ttr = Ytr.map(sy.apply), Tva = Yva.map(sy.apply);
  const net = createMLP(d, hidden, m, seed);
  const { theta } = net;
  const P = theta.length;
  const grad = new Float64Array(P), mom = new Float64Array(P), vel = new Float64Array(P);
  const rng = createRng(seed + 17);
  const order = Array.from({ length: Ztr.length }, (_, i) => i);
  const valLoss = () => { let s = 0; for (let i = 0; i < Zva.length; i++) { const { y } = mlpForward(net, Zva[i]); for (let c = 0; c < m; c++) s += 0.5 * (y[c] - Tva[i][c]) ** 2; } return s / Zva.length; };
  let best = { loss: Infinity, theta: Float64Array.from(theta), epoch: 0 };
  let step = 0, stale = 0;
  const history = [];
  for (let epoch = 1; epoch <= maxEpochs; epoch++) {
    for (let i = order.length - 1; i > 0; i--) { const j = rng.int(i + 1); [order[i], order[j]] = [order[j], order[i]]; }
    let trainLoss = 0, nb = 0;
    for (let s = 0; s < order.length; s += batch) {
      const idx = order.slice(s, s + batch);
      grad.fill(0);
      trainLoss += mlpBackward(net, idx.map((i) => Ztr[i]), idx.map((i) => Ttr[i]), grad);
      nb++;
      step++;
      const c1 = 1 - MLP.beta1 ** step, c2 = 1 - MLP.beta2 ** step;
      for (let p = 0; p < P; p++) {
        mom[p] = MLP.beta1 * mom[p] + (1 - MLP.beta1) * grad[p];
        vel[p] = MLP.beta2 * vel[p] + (1 - MLP.beta2) * grad[p] * grad[p];
        theta[p] -= lr * (mom[p] / c1) / (Math.sqrt(vel[p] / c2) + MLP.eps);
      }
    }
    const v = valLoss();
    history.push({ epoch, train: trainLoss / nb, val: v });
    log?.(history[history.length - 1]);
    if (v < best.loss - 1e-9) { best = { loss: v, theta: Float64Array.from(theta), epoch }; stale = 0; } else if (++stale >= patience) break;
  }
  theta.set(best.theta);
  const predict = (x) => { const { y } = mlpForward(net, sx.apply(x)); const out = new Float64Array(m); for (let c = 0; c < m; c++) out[c] = sy.std[c] > 0 ? y[c] * sy.std[c] + sy.mean[c] : sy.mean[c]; return out; };
  return {
    kind: 'R3', predict, net,
    info: { epochs: history.length, bestEpoch: best.epoch, valMse: best.loss, history },
    toJSON: () => ({ kind: 'R3', d, h: hidden, m, theta: Array.from(theta), xMean: Array.from(sx.mean), xStd: Array.from(sx.std), yMean: Array.from(sy.mean), yStd: Array.from(sy.std) }),
  };
}

export function trainReadout(kind, Xtr, Ytr, Xva, Yva, opts = {}) {
  if (kind === 'R1') return trainRidge(Xtr, Ytr, Xva, Yva, opts);
  if (kind === 'R2') return trainQuadratic(Xtr, Ytr, Xva, Yva, opts);
  if (kind === 'R3') return trainMLP(Xtr, Ytr, Xva, Yva, opts);
  throw new Error(`unknown readout ${kind}`);
}

// 직렬화된 리드아웃 → predict. (워커에서 재구성)
export function readoutFromJSON(j) {
  const clipz = (x, mean, std, jdx) => (std[jdx] > 0 ? Math.max(-5, Math.min(5, (x[jdx] - mean[jdx]) / std[jdx])) : 0);
  if (j.kind === 'R1' || j.kind === 'R2') {
    const { d, m, W, mean, std, yMean } = j;
    const lin = (x) => {
      const out = Float64Array.from(yMean);
      for (let jdx = 0; jdx < d; jdx++) {
        const z = clipz(x, mean, std, jdx);
        if (z === 0) continue;
        for (let c = 0; c < m; c++) out[c] += z * W[jdx * m + c];
      }
      return out;
    };
    return j.kind === 'R2' ? (x) => lin(quadraticMap(x, j.top)) : lin;
  }
  if (j.kind === 'R3') {
    const net = createMLP(j.d, j.h, j.m, 0);
    net.theta.set(j.theta);
    return (x) => {
      const z = new Float64Array(j.d);
      for (let jdx = 0; jdx < j.d; jdx++) z[jdx] = clipz(x, j.xMean, j.xStd, jdx);
      const { y } = mlpForward(net, z);
      const out = new Float64Array(j.m);
      for (let c = 0; c < j.m; c++) out[c] = j.yStd[c] > 0 ? y[c] * j.yStd[c] + j.yMean[c] : j.yMean[c];
      return out;
    };
  }
  throw new Error(`unknown readout kind ${j.kind}`);
}
