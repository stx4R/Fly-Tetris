// 랭킹 학습 (6단계). 5단계의 회귀 손실을 결정 단위 손실로 대체한다 — 리저버 구조는 그대로 두고 손실만 바꿔 원인 1(손실 오설계)의
// 크기를 잰다. 배치(batch)의 단위가 afterstate 가 아니라 결정이다: 한 결정의 후보 K 개 점수 s_k 를 한 번에 본다.
//
// 손실 (결정 하나, 점수 s[K], 교사 선택 c, 교사 값 v[K]):
//   mse        Σ_k (s_k − t_k)²           t = 전역 표준화한 교사 값. 5단계 회귀 손실 (afterstate 단위 평균) — 기준선
//   centered   Σ_k (s_k − t'_k)²          t' = (v_k − mean_k v) / 전역 std — 결정 간 분산만 제거한 회귀 (진단용)
//   listwise   −log softmax(s)_c          결정 내 softmax 는 결정 간 스케일을 자동으로 제거한다 — 원인 1 의 직접 해결
//   pairwise   (1/(K−1)) Σ_{k≠c} max(0, m − (s_c − s_k))   힌지, m = 1 — 비교용
//              7단계 값 마진 가중: targets.pairWeights (w_k ≥ 0, k ≠ c) 가 있으면 Σ_k (w_k/Σw) max(0, m − (s_c − s_k)) — 교사 값 차이가 큰 쌍(좋은 수 vs 치명적으로 나쁜 수)에
//              더 큰 가중 (valueMarginWeights). Σw 로 정규화하므로 λ 는 상대 가중만 바꾼다 (λ = 0 이면 현행과 동일).
// 점수 모델: linear (d → 1) / mlp (d → 64 → 1, ReLU; readout.js 의 createMLP·mlpForward 재사용). Adam, 미니배치 = 결정 B 개,
// 검증 손실로 조기 종료. 입력은 훈련 통계로 표준화 (5단계와 같이 z 는 ±5 winsorize).
// 평가 (테스트 결정): 결정 내 켄달 τ(점수 vs 교사 값) · top-1(argmax = 교사 선택) 이 주 지표, 풀링 R² 는 mse 모델만 보조로.

import { createRng } from './prng.js';
import { createMLP, mlpForward } from './readout.js';
import { bootstrapCI, kendallTau, mean, r2 } from './evaluate.js';

export const LOSSES = ['mse', 'centered', 'listwise', 'pairwise'];
export const MODELS = ['linear', 'mlp'];
export const HINGE_MARGIN = 1;
export const TRAIN = { hidden: 64, lr: 2e-3, batch: 32, maxEpochs: 60, patience: 6, beta1: 0.9, beta2: 0.999, eps: 1e-8 };

// ---------- 점수 모델 ----------

// theta 하나로 파라미터를 들고, forward(z) → { y, cache }, backward(z, cache, dy, grad) 로 dL/dtheta 를 grad 에 누적한다.
export function createScorer(kind, d, { hidden = TRAIN.hidden, seed = 1 } = {}) {
  if (kind === 'linear') {
    const theta = new Float64Array(d + 1); // w (d) + b
    const rng = createRng(seed);
    for (let j = 0; j < d; j++) theta[j] = rng.uniform(-1, 1) * Math.sqrt(3 / d) * 0.1;
    return {
      kind, d, theta,
      forward(z) { let s = theta[d]; for (let j = 0; j < d; j++) s += theta[j] * z[j]; return { y: s, cache: null }; },
      backward(z, _cache, dy, grad) { for (let j = 0; j < d; j++) grad[j] += dy * z[j]; grad[d] += dy; },
    };
  }
  if (kind === 'mlp') {
    const net = createMLP(d, hidden, 1, seed);
    const { theta, off, h } = net;
    return {
      kind, d, theta, net,
      forward(z) { const f = mlpForward(net, z); return { y: f.y[0], cache: f }; },
      backward(z, cache, dy, grad) {
        const { z: pre, a } = cache;
        grad[off.b2] += dy;
        const row2 = off.W2;
        for (let i = 0; i < h; i++) {
          grad[row2 + i] += dy * a[i];
          if (pre[i] <= 0) continue;
          const g = theta[row2 + i] * dy;
          grad[off.b1 + i] += g;
          const row1 = off.W1 + i * d;
          for (let j = 0; j < d; j++) grad[row1 + j] += g * z[j];
        }
      },
    };
  }
  throw new Error(`unknown scorer ${kind}`);
}

// ---------- 손실 ----------

// 점수 s[K] 에 대한 손실 값과 dL/ds. targets: { chosen, t (표준화 목표, mse/centered 용) }
export function decisionLoss(loss, s, targets, { margin = HINGE_MARGIN, sampleWeight = 1 } = {}) {
  const { chosen, t } = targets;
  const K = s.length;
  const ds = new Float64Array(K);
  let L = 0;
  if (loss === 'mse' || loss === 'centered') {
    for (let k = 0; k < K; k++) { const e = s[k] - t[k]; L += e * e * sampleWeight; ds[k] = 2 * e * sampleWeight; }
    return { L, ds };
  }
  if (loss === 'listwise') {
    let mx = -Infinity;
    for (let k = 0; k < K; k++) if (s[k] > mx) mx = s[k];
    let Z = 0;
    for (let k = 0; k < K; k++) Z += Math.exp(s[k] - mx);
    for (let k = 0; k < K; k++) ds[k] = Math.exp(s[k] - mx) / Z;
    L = -(s[chosen] - mx - Math.log(Z));
    ds[chosen] -= 1;
    return { L, ds };
  }
  if (loss === 'pairwise') {
    if (K < 2) return { L: 0, ds };
    const pw = targets.pairWeights ?? null;
    let W = 0;
    if (pw) { for (let k = 0; k < K; k++) if (k !== chosen) W += pw[k]; } else W = K - 1;
    if (!(W > 0)) return { L: 0, ds };
    for (let k = 0; k < K; k++) {
      if (k === chosen) continue;
      const w = (pw ? pw[k] : 1) / W;
      if (w === 0) continue;
      const viol = margin - (s[chosen] - s[k]);
      if (viol > 0) { L += viol * w; ds[k] += w; ds[chosen] -= w; }
    }
    return { L, ds };
  }
  throw new Error(`unknown loss ${loss}`);
}

// 값 마진 가중 (7단계): w_k = 1 + λ·max(0, V_c − V_k)/scale (k ≠ c), w_c = 0. scale = 학습 집합의 평균 값 격차 (valueGapScale) → 평균 가중 ≈ 1 + λ.
export function valueMarginWeights(values, chosen, lambda, scale) {
  const K = values.length;
  const w = new Float64Array(K);
  for (let k = 0; k < K; k++) { if (k === chosen) continue; w[k] = 1 + (lambda > 0 && scale > 0 ? lambda * Math.max(0, values[chosen] - values[k]) / scale : 0); }
  return w;
}
// 학습 결정 [{ values, chosen }] 의 평균 값 격차 (V_c − V_k 의 전체 평균, k ≠ c)
export function valueGapScale(decisions) {
  let s = 0, n = 0;
  for (const d of decisions) for (let k = 0; k < d.values.length; k++) { if (k === d.chosen) continue; s += Math.max(0, d.values[d.chosen] - d.values[k]); n++; }
  return n ? s / n : 1;
}

// 결정 하나의 손실과 dL/dtheta (grad 누적). X: 표준화된 후보 입력 행 배열.
export function decisionGradient(scorer, loss, X, targets, grad, opts) {
  const K = X.length;
  const s = new Float64Array(K);
  const caches = new Array(K);
  for (let k = 0; k < K; k++) { const f = scorer.forward(X[k]); s[k] = f.y; caches[k] = f.cache; }
  const { L, ds } = decisionLoss(loss, s, targets, opts);
  for (let k = 0; k < K; k++) if (ds[k] !== 0) scorer.backward(X[k], caches[k], ds[k], grad);
  return L;
}

// ---------- 데이터 준비 ----------

// 표준화기 (훈련 통계, 상수 열 0, ±clip). decisions 의 X 행을 스트리밍으로 읽는다 (공유 버퍼 뷰를 복사하지 않기 위해).
export function standardizer(decisions, dim, clip = 5) {
  let n = 0;
  const mean = new Float64Array(dim), std = new Float64Array(dim);
  for (const d of decisions) for (const x of d.X) { n++; for (let j = 0; j < dim; j++) mean[j] += x[j]; }
  for (let j = 0; j < dim; j++) mean[j] /= n;
  for (const d of decisions) for (const x of d.X) for (let j = 0; j < dim; j++) std[j] += (x[j] - mean[j]) ** 2 / n;
  let maxStd = 0;
  for (let j = 0; j < dim; j++) { std[j] = Math.sqrt(std[j]); if (std[j] > maxStd) maxStd = std[j]; }
  for (let j = 0; j < dim; j++) if (std[j] < maxStd * 1e-8) std[j] = 0;
  const apply = (x) => { const z = new Float64Array(dim); for (let j = 0; j < dim; j++) z[j] = std[j] > 0 ? Math.max(-clip, Math.min(clip, (x[j] - mean[j]) / std[j])) : 0; return z; };
  return { mean, std, apply };
}

// 결정 목록 [{ X: [Float64Array...], values: number[], chosen }] 에서 손실별 목표를 만든다.
// mse: t = (v − μ)/σ (전역), centered: t = (v − 결정 평균)/σ_within (전역 결정 내 표준편차)
export function makeTargets(decisions, loss) {
  const all = decisions.flatMap((d) => d.values);
  const mu = mean(all);
  const sd = Math.sqrt(mean(all.map((v) => (v - mu) ** 2))) || 1;
  const centered = decisions.flatMap((d) => { const m = mean(d.values); return d.values.map((v) => v - m); });
  const sdW = Math.sqrt(mean(centered.map((v) => v * v))) || 1;
  const scale = { mu, sd, sdW };
  const targetsOf = (d) => {
    if (loss === 'mse') return { chosen: d.chosen, t: d.values.map((v) => (v - mu) / sd) };
    if (loss === 'centered') { const m = mean(d.values); return { chosen: d.chosen, t: d.values.map((v) => (v - m) / sdW) }; }
    return { chosen: d.chosen, t: null };
  };
  return { scale, targetsOf };
}

// ---------- 학습 ----------

// train/val: [{ X (표준화 전 행), values, chosen }]. 반환 { scorer, history, best, predict(x) → 점수 }
export function trainRanker({ model, loss }, train, val, { seed = 1, hidden = TRAIN.hidden, lr = TRAIN.lr, batch = TRAIN.batch, maxEpochs = TRAIN.maxEpochs, patience = TRAIN.patience, log = null } = {}) {
  const dim = train[0].X[0].length;
  const sx = standardizer(train, dim);
  // 표준화는 매 접근 때 한다 (행은 공유 버퍼의 뷰일 수 있다; MLP 순전파 비용에 비해 d 번의 곱셈은 작다)
  const Ztr = train.map((d) => ({ Z: () => d.X.map(sx.apply), K: d.X.length, values: d.values, chosen: d.chosen }));
  const Zva = val.map((d) => ({ Z: () => d.X.map(sx.apply), K: d.X.length, values: d.values, chosen: d.chosen }));
  const { scale, targetsOf } = makeTargets(train, loss);
  const Ttr = train.map((d) => targetsOf(d)), Tva = val.map((d) => targetsOf(d));
  const scorer = createScorer(model, dim, { hidden, seed });
  const { theta } = scorer;
  const P = theta.length;
  const grad = new Float64Array(P), mom = new Float64Array(P), vel = new Float64Array(P);
  const rng = createRng(seed + 17);
  const order = Ztr.map((_, i) => i);
  const regression = loss === 'mse' || loss === 'centered';
  // 회귀 손실은 5단계와 같이 afterstate 단위 평균 (배치의 후보 수로 나눈다); 랭킹 손실은 결정 단위 평균
  const evalLoss = (Z, T) => {
    let s = 0, n = 0;
    for (let i = 0; i < Z.length; i++) {
      const d = Z[i], rows = d.Z();
      const sc = new Float64Array(d.K);
      for (let k = 0; k < d.K; k++) sc[k] = scorer.forward(rows[k]).y;
      s += decisionLoss(loss, sc, T[i]).L;
      n += regression ? d.K : 1;
    }
    return s / n;
  };
  let best = { loss: Infinity, theta: Float64Array.from(theta), epoch: 0 };
  let step = 0, stale = 0;
  const history = [];
  for (let epoch = 1; epoch <= maxEpochs; epoch++) {
    for (let i = order.length - 1; i > 0; i--) { const j = rng.int(i + 1); [order[i], order[j]] = [order[j], order[i]]; }
    let trainLoss = 0, nb = 0;
    for (let s0 = 0; s0 < order.length; s0 += batch) {
      const idx = order.slice(s0, s0 + batch);
      grad.fill(0);
      const nSamples = idx.reduce((s, i) => s + Ztr[i].K, 0);
      let L = 0;
      for (const i of idx) L += decisionGradient(scorer, loss, Ztr[i].Z(), Ttr[i], grad, { sampleWeight: regression ? 1 / nSamples : 1 / idx.length });
      trainLoss += L; nb++;
      step++;
      const c1 = 1 - TRAIN.beta1 ** step, c2 = 1 - TRAIN.beta2 ** step;
      for (let p = 0; p < P; p++) {
        mom[p] = TRAIN.beta1 * mom[p] + (1 - TRAIN.beta1) * grad[p];
        vel[p] = TRAIN.beta2 * vel[p] + (1 - TRAIN.beta2) * grad[p] * grad[p];
        theta[p] -= lr * (mom[p] / c1) / (Math.sqrt(vel[p] / c2) + TRAIN.eps);
      }
    }
    const v = evalLoss(Zva, Tva);
    history.push({ epoch, train: trainLoss / nb, val: v });
    log?.(history[history.length - 1]);
    if (v < best.loss - 1e-9) { best = { loss: v, theta: Float64Array.from(theta), epoch }; stale = 0; } else if (++stale >= patience) break;
  }
  theta.set(best.theta);
  const predict = (x) => scorer.forward(sx.apply(x)).y;
  // mse 모델의 원 단위 예측 (R² 용)
  const predictValue = regression ? (x) => predict(x) * (loss === 'mse' ? scale.sd : scale.sdW) + (loss === 'mse' ? scale.mu : 0) : null;
  return { model, loss, scorer, sx, scale, predict, predictValue, history, best: { epoch: best.epoch, valLoss: best.loss }, epochs: history.length };
}

// ---------- 평가 ----------

// 테스트 결정 [{ X, values, chosen }] 에서 결정 내 τ · top-1 (부트스트랩 95% CI) (+ mse 계열은 풀링 R²)
export function rankMetrics(ranker, test, { seed = 11 } = {}) {
  const taus = [], hits = [], yTrue = [], yPred = [], regrets = [];
  for (const d of test) {
    const s = d.X.map((x) => ranker.predict(x));
    taus.push(kendallTau(d.values, s));
    let a = 0;
    for (let k = 1; k < s.length; k++) if (s[k] > s[a]) a = k;
    hits.push(d.values[a] >= d.values[d.chosen] - 1e-9 ? 1 : 0); // 동점 최적도 인정
    regrets.push(d.values[d.chosen] - d.values[a]);
    if (ranker.predictValue && ranker.loss === 'mse') { for (let k = 0; k < s.length; k++) { yTrue.push(d.values[k]); yPred.push(ranker.predictValue(d.X[k])); } }
  }
  const out = {
    decisions: test.length, candidates: test.reduce((s, d) => s + d.X.length, 0),
    tau: mean(taus), tauCI: bootstrapCI(taus, mean, { seed }),
    top1: mean(hits), top1CI: bootstrapCI(hits, mean, { seed: seed + 1 }),
    regret: mean(regrets),
  };
  if (yTrue.length) { out.r2 = r2(yTrue, yPred); out.r2CI = bootstrapCI(yTrue.map((y, i) => [y, yPred[i]]), (p) => r2(p.map((q) => q[0]), p.map((q) => q[1])), { seed: seed + 2 }); }
  return out;
}

// 우연 수준 기준선: 무작위 점수의 τ·top-1 (결정별 후보 수에 따라)
export function chanceMetrics(test, { seed = 3 } = {}) {
  const rng = createRng(seed);
  const fake = { predict: () => rng.next(), predictValue: null, loss: 'random' };
  return rankMetrics(fake, test, { seed });
}
