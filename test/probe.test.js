import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fitRidge, kfold, majorityBaseline, probeActions, probeFeatures, ridgeSolve, runProbes, shuffleNeuronAxis } from '../src/probe.js';
import { createRng } from '../src/prng.js';

const close = (a, b, tol, msg) => assert.ok(Math.abs(a - b) < tol, `${msg ?? ''} ${a} vs ${b}`);

test('ridgeSolve: (A + λI) W = B matches a hand-solved 2×2 system and a 3×3 solved by hand elimination', () => {
  // A = [[2,1],[1,2]], B = [4,5], λ = 1 → [[3,1],[1,3]] W = [4,5] → det 8, W = [(12-5)/8, (15-4)/8] = [7/8, 11/8]
  const W = ridgeSolve(Float64Array.from([2, 1, 1, 2]), Float64Array.from([4, 5]), 2, 1, 1);
  close(W[0], 7 / 8, 1e-12, 'W0');
  close(W[1], 11 / 8, 1e-12, 'W1');
  // 3×3, 두 개의 우변: A = [[4,1,0],[1,3,1],[0,1,2]], λ = 0.5 → M = [[4.5,1,0],[1,3.5,1],[0,1,2.5]]
  // 우변 b1 = [1,0,0]: 손계산 (M⁻¹ 첫 열) — M x = e1 을 제거법으로: det M = 4.5(3.5·2.5 − 1) − 1(2.5) = 4.5·7.75 − 2.5 = 32.375
  // adj 첫 열 = [7.75, −2.5, 1] → x = [7.75, −2.5, 1] / 32.375
  const A3 = Float64Array.from([4, 1, 0, 1, 3, 1, 0, 1, 2]);
  const B3 = Float64Array.from([1, 2, 0, 0, 0, 1]); // 열 0 = e1, 열 1 = [2, 0, 1]
  const W3 = ridgeSolve(A3, B3, 3, 2, 0.5);
  const det = 32.375;
  close(W3[0 * 2 + 0], 7.75 / det, 1e-12, 'x0'); close(W3[1 * 2 + 0], -2.5 / det, 1e-12, 'x1'); close(W3[2 * 2 + 0], 1 / det, 1e-12, 'x2');
  // 열 1: adj 열들 — adj 두 번째 열 = [−2.5, 11.25, −4.5], 세 번째 열 = [1, −4.5, 14.75] → x = (2·col1 + 1·col3)/det
  close(W3[0 * 2 + 1], (2 * 7.75 + 1) / det, 1e-12, 'y0');
  close(W3[1 * 2 + 1], (2 * -2.5 + -4.5) / det, 1e-12, 'y1');
  close(W3[2 * 2 + 1], (2 * 1 + 14.75) / det, 1e-12, 'y2');
  assert.throws(() => ridgeSolve(Float64Array.from([1, 2, 2, 1]), Float64Array.from([1, 1]), 2, 1, 0), /positive definite/);
});

test('fitRidge: closed form with standardization matches the hand-derived solution and reduces to OLS as λ → 0', () => {
  // y = 2·x1 − x2 + 3 정확 선형: λ → 0 이면 완벽 복원
  const rng = createRng(11);
  const X = Array.from({ length: 30 }, () => Float64Array.from([rng.uniform(-1, 1), rng.uniform(-2, 2), 0])); // 3열은 분산 0 → 무시돼야 함
  const Y = X.map((x) => Float64Array.from([2 * x[0] - x[1] + 3]));
  const fit = fitRidge(X, Y, 1e-12);
  close(fit.predict(Float64Array.from([0.5, -0.5, 0]))[0], 2 * 0.5 + 0.5 + 3, 1e-6, 'OLS limit');
  assert.equal(fit.std[2], 0);
  // λ 큰 경우: 표준화 좌표에서 W = (ZᵀZ + λI)⁻¹ ZᵀY_c 를 손으로 (2×2) 계산해 대조
  const lambda = 7;
  const n = X.length;
  const mean = [0, 1].map((j) => X.reduce((s, x) => s + x[j], 0) / n);
  const std = [0, 1].map((j) => Math.sqrt(X.reduce((s, x) => s + (x[j] - mean[j]) ** 2, 0) / n));
  const Z = X.map((x) => [(x[0] - mean[0]) / std[0], (x[1] - mean[1]) / std[1]]);
  const yMean = Y.reduce((s, y) => s + y[0], 0) / n;
  const a = Z.reduce((s, z) => s + z[0] * z[0], 0) + lambda, b = Z.reduce((s, z) => s + z[0] * z[1], 0), d = Z.reduce((s, z) => s + z[1] * z[1], 0) + lambda;
  const r0 = Z.reduce((s, z, i) => s + z[0] * (Y[i][0] - yMean), 0), r1 = Z.reduce((s, z, i) => s + z[1] * (Y[i][0] - yMean), 0);
  const det = a * d - b * b;
  const w0 = (d * r0 - b * r1) / det, w1 = (a * r1 - b * r0) / det;
  const fit2 = fitRidge(X, Y, lambda);
  close(fit2.W[0], w0, 1e-10, 'w0'); close(fit2.W[1], w1, 1e-10, 'w1'); assert.equal(fit2.W[2], 0);
  const x = Float64Array.from([0.3, 1.1, 0]);
  close(fit2.predict(x)[0], yMean + w0 * (x[0] - mean[0]) / std[0] + w1 * (x[1] - mean[1]) / std[1], 1e-10, 'predict');
});

test('kfold: seeded, disjoint, covers all indices, deterministic', () => {
  const folds = kfold(23, 5, 3);
  assert.equal(folds.length, 5);
  const all = folds.flat().sort((a, b) => a - b);
  assert.deepEqual(all, Array.from({ length: 23 }, (_, i) => i));
  assert.deepEqual(kfold(23, 5, 3), folds);
  assert.notDeepEqual(kfold(23, 5, 4), folds);
});

test('probes: linearly decodable synthetic DN rates → high R² and top-1; neuron-axis shuffle control → chance', () => {
  const rng = createRng(5);
  const n = 300, d = 40, nActions = 40;
  const samples = [];
  const rates = [];
  for (let i = 0; i < n; i++) {
    const legal = Array.from({ length: nActions }, (_, k) => k).filter(() => rng.next() < 0.6);
    if (legal.length === 0) legal.push(rng.int(nActions));
    const action = legal[rng.int(legal.length)];
    const features = Float64Array.from({ length: 6 }, () => rng.uniform(-1, 1));
    // 뉴런 k 의 발화율 = 행동 one-hot + 특징의 선형 결합 (+ 잡음): 뉴런 정체성이 정보를 담는다
    const x = new Float64Array(d);
    for (let k = 0; k < d; k++) x[k] = (k === action ? 20 : 0) + 5 * features[k % 6] * (k % 2 ? 1 : -1) + rng.uniform(-0.5, 0.5);
    samples.push({ action, features: Array.from(features), legal });
    rates.push(x);
  }
  const pr = runProbes(rates, samples, nActions, { seed: 1 });
  assert.ok(pr.top1 > 0.9, `top1 ${pr.top1}`);
  assert.ok(pr.featuresR2 > 0.7, `R2 ${pr.featuresR2}`); // 행동 one-hot(크기 20) 과 섞여 있어 완벽하진 않다
  assert.ok(pr.control.top1 < 0.2, `control top1 ${pr.control.top1}`);
  assert.ok(pr.control.featuresR2 < 0.2, `control R2 ${pr.control.featuresR2}`);
  assert.ok(pr.top1Margin > 0.7);
  assert.ok(pr.majorityTop1 < 0.2);
  // 셔플은 표본별 순열: 각 표본의 정렬된 값은 보존
  const shuffled = shuffleNeuronAxis(rates, 9);
  for (let i = 0; i < 5; i++) assert.deepEqual(Array.from(shuffled[i]).sort(), Array.from(rates[i]).sort());
  // 결정성
  assert.deepEqual(runProbes(rates, samples, nActions, { seed: 1 }), pr);
  // 개별 프로브 API
  const pf = probeFeatures(rates, samples.map((s) => Float64Array.from(s.features)), { seed: 1 });
  assert.equal(pf.perFeatureR2.length, 6);
  const pa = probeActions(rates, samples.map((s) => s.action), samples.map((s) => s.legal), nActions, { seed: 1 });
  assert.equal(pa.folds.length, 5);
  assert.ok(majorityBaseline(samples.map((s) => s.action), samples.map((s) => s.legal), nActions) < 0.2);
});

test('probes: constant (uninformative) DN rates → R² ≤ 0 and top-1 at the majority baseline', () => {
  const rng = createRng(8);
  const n = 120;
  const samples = Array.from({ length: n }, () => ({ action: rng.int(3), features: [rng.next(), 1, 2, 3, 4, 5], legal: [0, 1, 2, 3] }));
  const rates = Array.from({ length: n }, () => Float64Array.from({ length: 10 }, () => 0));
  const pr = runProbes(rates, samples, 40, { seed: 2 });
  assert.ok(pr.featuresR2 <= 1e-9, `R2 ${pr.featuresR2}`);
  assert.equal(pr.top1, pr.majorityTop1);
});
