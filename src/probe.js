// 선형 디코딩 프로브: DN 발화율이 보드 정보를 선형으로 담고 있는지 릿지 회귀(닫힌형)로 잰다. 학습 루프가 아니다.
//
//   (a) DN 발화율(107) → 교사(Dellacherie)가 고른 배치의 6특징. 5-fold CV, 특징별 R² 의 폴드 평균.
//   (b) DN 발화율(107) → 교사가 고른 배치(40클래스). one-hot 릿지 회귀 → 합법 배치만 남기고 argmax. 5-fold CV top-1.
//   (c) 통제군: 표본마다 뉴런 축을 무작위로 섞은 발화율에 같은 프로브. 뉴런 정체성을 지우되 표본의 활동량 분포는 남긴다.
//
// 릿지: W = (XᵀX + λI)⁻¹ XᵀY. X 는 훈련 폴드 통계로 표준화(분산 0 열은 0, z 는 ±5 로 winsorize), Y 는 중심화 → 절편은 벌점 없이 복원.
// λ 는 훈련 폴드 안에서 내부 4-fold CV 로 고른다 (후보 = n_train × {1e-4 … 10}). 108×108 정규방정식은 Cholesky 로 푼다.

import { createRng } from './prng.js';

export const FOLDS = 5;
export const INNER_FOLDS = 4;
export const LAMBDA_GRID = [1e-4, 1e-3, 1e-2, 1e-1, 1, 10]; // × n_train
export const STD_FLOOR = 1e-8; // 열 표준편차가 최대 표준편차 × 이 값 미만이면 상수 열로 취급
export const Z_CLIP = 5;       // 표준화 값을 ±Z_CLIP 으로 자른다 (훈련·예측 모두) — 리셋 직후 과도 표본 같은 이상치가 외삽으로 터지는 것을 막는다

// (A + λI) W = B 를 Cholesky 로 푼다. A: d×d SPD (row-major Float64Array), B: d×m. 반환 W: d×m.
export function ridgeSolve(A, B, d, m, lambda) {
  const L = new Float64Array(d * d);
  for (let i = 0; i < d; i++) {
    for (let j = 0; j <= i; j++) {
      let s = A[i * d + j] + (i === j ? lambda : 0);
      for (let k = 0; k < j; k++) s -= L[i * d + k] * L[j * d + k];
      if (i === j) {
        if (!(s > 0)) throw new Error(`ridgeSolve: matrix not positive definite at ${i} (${s})`);
        L[i * d + i] = Math.sqrt(s);
      } else {
        L[i * d + j] = s / L[j * d + j];
      }
    }
  }
  const W = new Float64Array(d * m);
  const y = new Float64Array(d);
  for (let c = 0; c < m; c++) {
    for (let i = 0; i < d; i++) {                 // L y = b
      let s = B[i * m + c];
      for (let k = 0; k < i; k++) s -= L[i * d + k] * y[k];
      y[i] = s / L[i * d + i];
    }
    for (let i = d - 1; i >= 0; i--) {            // Lᵀ w = y
      let s = y[i];
      for (let k = i + 1; k < d; k++) s -= L[k * d + i] * W[k * m + c];
      W[i * m + c] = s / L[i * d + i];
    }
  }
  return W;
}

// 훈련 표본(X 행 배열, Y 행 배열)의 표준화 통계와 정규방정식 (ZᵀZ, ZᵀY_c). λ 와 무관하므로 λ 격자에서 재사용한다.
export function prepareRidge(X, Y) {
  const n = X.length, d = X[0].length, m = Y[0].length;
  const mean = new Float64Array(d), std = new Float64Array(d), yMean = new Float64Array(m);
  for (const x of X) for (let j = 0; j < d; j++) mean[j] += x[j] / n;
  for (const x of X) for (let j = 0; j < d; j++) std[j] += (x[j] - mean[j]) ** 2 / n;
  for (let j = 0; j < d; j++) std[j] = std[j] > 0 ? Math.sqrt(std[j]) : 0;
  // 사실상 상수인 열(최대 표준편차 대비 1e-8 미만)은 상수로 본다 — 표준화가 수치 잡음을 증폭해 예측을 터뜨리는 것을 막는다
  const floor = Math.max(...std) * STD_FLOOR;
  for (let j = 0; j < d; j++) if (std[j] < floor) std[j] = 0;
  for (const y of Y) for (let c = 0; c < m; c++) yMean[c] += y[c] / n;

  const zval = (x, j) => (std[j] > 0 ? Math.max(-Z_CLIP, Math.min(Z_CLIP, (x[j] - mean[j]) / std[j])) : 0);
  const Z = X.map((x) => { const z = new Float64Array(d); for (let j = 0; j < d; j++) z[j] = zval(x, j); return z; });
  const A = new Float64Array(d * d), B = new Float64Array(d * m);
  for (let r = 0; r < n; r++) {
    const z = Z[r], y = Y[r];
    for (let i = 0; i < d; i++) {
      const zi = z[i];
      if (zi === 0) continue;
      for (let j = i; j < d; j++) A[i * d + j] += zi * z[j];
      for (let c = 0; c < m; c++) B[i * m + c] += zi * (y[c] - yMean[c]);
    }
  }
  for (let i = 0; i < d; i++) for (let j = i + 1; j < d; j++) A[j * d + i] = A[i * d + j];
  return { A, B, d, m, n, mean, std, yMean, zval };
}

// 준비된 정규방정식을 λ 로 푼다. predict(x) → Float64Array(m).
export function solveRidge(prep, lambda) {
  const { A, B, d, m, mean, std, yMean, zval } = prep;
  const W = ridgeSolve(A, B, d, m, lambda);
  function predict(x) {
    const out = Float64Array.from(yMean);
    for (let j = 0; j < d; j++) {
      if (std[j] === 0) continue;
      const z = zval(x, j);
      if (z === 0) continue;
      for (let c = 0; c < m; c++) out[c] += z * W[j * m + c];
    }
    return out;
  }
  return { W, mean, std, yMean, lambda, predict };
}

export const fitRidge = (X, Y, lambda) => solveRidge(prepareRidge(X, Y), lambda);

// 시드 있는 K-fold 분할: 표본 인덱스를 섞어 k 개로 나눈다.
export function kfold(n, k, seed) {
  const rng = createRng(seed);
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) { const j = rng.int(i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  return Array.from({ length: k }, (_, f) => idx.filter((_, i) => i % k === f));
}

// 외부 K-fold + 내부 CV 로 λ 선택. score(predictFn, testIdx) → 숫자(클수록 좋음). 폴드별 점수와 고른 λ 를 돌려준다.
export function crossValidate(X, Y, score, { folds = FOLDS, innerFolds = INNER_FOLDS, seed = 1, grid = LAMBDA_GRID } = {}) {
  const n = X.length;
  const outer = kfold(n, folds, seed);
  const results = [];
  for (let f = 0; f < folds; f++) {
    const test = outer[f];
    const train = outer.filter((_, g) => g !== f).flat();
    // 내부 CV: 훈련 폴드를 다시 나눠 λ 후보마다 점수 평균
    const inner = kfold(train.length, innerFolds, seed + 101 + f).map((fold) => fold.map((i) => train[i]));
    const sums = new Float64Array(grid.length);
    for (let g = 0; g < innerFolds; g++) {
      const iTest = inner[g];
      const iTrain = inner.filter((_, h) => h !== g).flat();
      const prep = prepareRidge(iTrain.map((i) => X[i]), iTrain.map((i) => Y[i]));
      grid.forEach((rel, k) => { sums[k] += score(solveRidge(prep, rel * iTrain.length).predict, iTest) / innerFolds; });
    }
    let best = 0;
    for (let k = 1; k < grid.length; k++) if (sums[k] > sums[best]) best = k;
    const bestLambda = grid[best];
    const fit = fitRidge(train.map((i) => X[i]), train.map((i) => Y[i]), bestLambda * train.length);
    results.push({ fold: f, lambdaRel: bestLambda, score: score(fit.predict, test), n: test.length, test, predict: fit.predict });
  }
  return { mean: results.reduce((s, r) => s + r.score, 0) / folds, folds: results };
}

// 테스트 폴드에서 Y 열별 R² (폴드 평균 기준). 분산 0 열은 0.
function foldR2(X, Y, predict, test) {
  const m = Y[0].length;
  const yMean = new Float64Array(m);
  for (const i of test) for (let c = 0; c < m; c++) yMean[c] += Y[i][c] / test.length;
  const ssRes = new Float64Array(m), ssTot = new Float64Array(m);
  for (const i of test) {
    const p = predict(X[i]);
    for (let c = 0; c < m; c++) { ssRes[c] += (Y[i][c] - p[c]) ** 2; ssTot[c] += (Y[i][c] - yMean[c]) ** 2; }
  }
  return Array.from({ length: m }, (_, c) => (ssTot[c] > 0 ? 1 - ssRes[c] / ssTot[c] : 0));
}

// (a) 특징 회귀. 점수 = 특징별 R² 의 평균 (λ 선택 기준도 같다). 외부 폴드 평균 R² 를 특징별로도 돌려준다.
export function probeFeatures(X, Y, opts) {
  const m = Y[0].length;
  const score = (predict, test) => foldR2(X, Y, predict, test).reduce((s, v) => s + v, 0) / m;
  const cv = crossValidate(X, Y, score, opts);
  const perFeature = new Array(m).fill(0);
  for (const r of cv.folds) foldR2(X, Y, r.predict, r.test).forEach((v, c) => { perFeature[c] += v / cv.folds.length; });
  return { meanR2: cv.mean, perFeatureR2: perFeature, folds: cv.folds.map(({ fold, lambdaRel, score: s }) => ({ fold, lambdaRel, score: s })) };
}

// (b) 행동 분류. actions[i] ∈ [0, A), legal[i] = 합법 행동 인덱스 배열. 합법 마스킹 후 top-1 정확도.
export function probeActions(X, actions, legal, nActions, opts) {
  const Y = actions.map((a) => { const y = new Float64Array(nActions); y[a] = 1; return y; });
  const score = (predict, test) => {
    let hit = 0;
    for (const i of test) {
      const p = predict(X[i]);
      let best = -1, bestVal = -Infinity;
      for (const a of legal[i]) if (p[a] > bestVal || (p[a] === bestVal && a < best)) { bestVal = p[a]; best = a; }
      if (best === actions[i]) hit++;
    }
    return hit / test.length;
  };
  const cv = crossValidate(X, Y, score, opts);
  return { top1: cv.mean, folds: cv.folds.map(({ fold, lambdaRel, score: s }) => ({ fold, lambdaRel, score: s })) };
}

// 표본마다 뉴런 축을 독립적으로 섞는다 (통제군).
export function shuffleNeuronAxis(X, seed = 1) {
  const rng = createRng(seed);
  return X.map((x) => {
    const y = Float64Array.from(x);
    for (let i = y.length - 1; i > 0; i--) { const j = rng.int(i + 1); [y[i], y[j]] = [y[j], y[i]]; }
    return y;
  });
}

// 기준선: 훈련 폴드에서 가장 자주 나온 행동을 합법 범위 안에서 고르는 규칙의 5-fold 정확도.
export function majorityBaseline(actions, legal, nActions, { folds = FOLDS, seed = 1 } = {}) {
  const outer = kfold(actions.length, folds, seed);
  let hit = 0;
  for (let f = 0; f < folds; f++) {
    const freq = new Float64Array(nActions);
    outer.forEach((fold, g) => { if (g !== f) for (const i of fold) freq[actions[i]]++; });
    for (const i of outer[f]) {
      let best = -1, bestVal = -Infinity;
      for (const a of legal[i]) if (freq[a] > bestVal) { bestVal = freq[a]; best = a; }
      if (best === actions[i]) hit++;
    }
  }
  return hit / actions.length;
}

// 전체 프로브. samples[i] = { features: number[6], action, legal: number[] }.
export function runProbes(dnRates, samples, nActions, { seed = 1 } = {}) {
  const X = dnRates.map((r) => Float64Array.from(r));
  const Yf = samples.map((s) => Float64Array.from(s.features));
  const actions = samples.map((s) => s.action);
  const legal = samples.map((s) => s.legal);
  const Xs = shuffleNeuronAxis(X, seed + 7);
  const opts = { seed };
  const feat = probeFeatures(X, Yf, opts);
  const act = probeActions(X, actions, legal, nActions, opts);
  const featC = probeFeatures(Xs, Yf, opts);
  const actC = probeActions(Xs, actions, legal, nActions, opts);
  return {
    featuresR2: feat.meanR2,
    perFeatureR2: feat.perFeatureR2,
    top1: act.top1,
    control: { featuresR2: featC.meanR2, perFeatureR2: featC.perFeatureR2, top1: actC.top1 },
    top1Margin: act.top1 - actC.top1,
    majorityTop1: majorityBaseline(actions, legal, nActions, opts),
    lambdaRel: act.folds.map((f) => f.lambdaRel),
  };
}
