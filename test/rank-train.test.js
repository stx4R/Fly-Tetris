import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LOSSES, chanceMetrics, createScorer, decisionGradient, decisionLoss, makeTargets, rankMetrics, trainRanker } from '../src/rank-train.js';
import { createRng } from '../src/prng.js';

const randRows = (rng, K, d) => Array.from({ length: K }, () => Float64Array.from({ length: d }, () => rng.uniform(-1, 1)));

test('listwise softmax CE: value and gradient wrt scores match the closed form; probabilities sum to one', () => {
  const s = Float64Array.from([1.5, -0.2, 0.7, 3.1]);
  const { L, ds } = decisionLoss('listwise', s, { chosen: 2 });
  const Z = s.reduce((a, v) => a + Math.exp(v), 0);
  assert.ok(Math.abs(L - (-Math.log(Math.exp(0.7) / Z))) < 1e-12);
  let sum = 0;
  for (let k = 0; k < 4; k++) { const p = Math.exp(s[k]) / Z; assert.ok(Math.abs(ds[k] - (p - (k === 2 ? 1 : 0))) < 1e-12); sum += ds[k]; }
  assert.ok(Math.abs(sum) < 1e-12, '기울기 합 0 (softmax 는 점수의 상수 이동에 불변)');
  // 상수 이동 불변
  const shifted = decisionLoss('listwise', s.map((v) => v + 100), { chosen: 2 });
  assert.ok(Math.abs(shifted.L - L) < 1e-9);
});

test('pairwise hinge: only violating pairs contribute; margin satisfied → zero loss and gradient', () => {
  const ok = decisionLoss('pairwise', Float64Array.from([5, 1, 2, 3]), { chosen: 0 });
  assert.equal(ok.L, 0);
  assert.ok(ok.ds.every((g) => g === 0));
  const bad = decisionLoss('pairwise', Float64Array.from([1, 1.5, 0.5, 0]), { chosen: 0 }); // 쌍 (0,1): 1−(1−1.5)=1.5, (0,2): 1−0.5=0.5, (0,3): 1−1=0 → 위반 아님
  assert.ok(Math.abs(bad.L - (1.5 + 0.5) / 3) < 1e-12);
  assert.ok(Math.abs(bad.ds[0] - (-2 / 3)) < 1e-12 && Math.abs(bad.ds[1] - 1 / 3) < 1e-12 && Math.abs(bad.ds[2] - 1 / 3) < 1e-12 && bad.ds[3] === 0);
});

test('gradient check: analytic dL/dθ of every loss × {linear, mlp} matches central finite differences', () => {
  const rng = createRng(21);
  const d = 5, K = 6;
  const X = randRows(rng, K, d);
  const values = Array.from({ length: K }, () => rng.uniform(-2, 2));
  const chosen = values.indexOf(Math.max(...values));
  for (const loss of LOSSES) {
    const { targetsOf } = makeTargets([{ X, values, chosen }], loss);
    const targets = targetsOf({ X, values, chosen });
    for (const model of ['linear', 'mlp']) {
      const scorer = createScorer(model, d, { hidden: 4, seed: 3 });
      // 힌지의 꺾임점 근처를 피하기 위해 θ 를 조금 키운다 (유한차분이 비활성 경계를 넘지 않게)
      for (let p = 0; p < scorer.theta.length; p++) scorer.theta[p] += rng.uniform(-0.3, 0.3);
      const grad = new Float64Array(scorer.theta.length);
      const L0 = decisionGradient(scorer, loss, X, targets, grad, { sampleWeight: 1 / K });
      const lossAt = () => {
        const s = new Float64Array(K);
        for (let k = 0; k < K; k++) s[k] = scorer.forward(X[k]).y;
        return decisionLoss(loss, s, targets, { sampleWeight: 1 / K }).L;
      };
      assert.ok(Math.abs(lossAt() - L0) < 1e-12);
      const eps = 1e-6;
      let maxRel = 0, nonzero = 0;
      for (let p = 0; p < scorer.theta.length; p++) {
        const orig = scorer.theta[p];
        scorer.theta[p] = orig + eps; const Lp = lossAt();
        scorer.theta[p] = orig - eps; const Lm = lossAt();
        scorer.theta[p] = orig;
        const num = (Lp - Lm) / (2 * eps);
        const err = Math.abs(num - grad[p]);
        const rel = err < 1e-8 ? 0 : err / (Math.abs(num) + Math.abs(grad[p])); // 아주 작은 성분은 유한차분 반올림이 지배 — 절대 오차로 본다
        if (Math.abs(num) > 1e-9) nonzero++;
        if (rel > maxRel) maxRel = rel;
      }
      assert.ok(nonzero > 0, `${loss}/${model}: gradient is not identically zero`);
      assert.ok(maxRel < 1e-5, `${loss}/${model}: max relative error ${maxRel}`);
    }
  }
});

test('listwise training recovers a linear teacher ranking that per-candidate MSE cannot when decisions differ in offset', () => {
  // 후보 값 = w·x + 결정별 큰 오프셋 (결정 간 분산 ≫ 결정 내 분산). 선형 모델은 오프셋을 볼 수 없다.
  const rng = createRng(5);
  const d = 6, w = Float64Array.from({ length: d }, () => rng.uniform(-1, 1));
  const make = (n) => Array.from({ length: n }, () => {
    const K = 4 + rng.int(6);
    const X = randRows(rng, K, d);
    const off = rng.uniform(-50, 50);
    const values = X.map((x) => off + x.reduce((s, v, j) => s + v * w[j], 0));
    return { X, values, chosen: values.indexOf(Math.max(...values)) };
  });
  const train = make(300), val = make(60), test = make(150);
  const opts = { maxEpochs: 40, patience: 8, lr: 1e-2, seed: 2 };
  const lw = rankMetrics(trainRanker({ model: 'linear', loss: 'listwise' }, train, val, opts), test);
  const ms = rankMetrics(trainRanker({ model: 'linear', loss: 'mse' }, train, val, opts), test);
  const ct = rankMetrics(trainRanker({ model: 'linear', loss: 'centered' }, train, val, opts), test);
  const ch = chanceMetrics(test);
  assert.ok(lw.tau > 0.9, `listwise tau ${lw.tau}`);
  assert.ok(lw.top1 > 0.9, `listwise top1 ${lw.top1}`);
  assert.ok(ct.tau > 0.9, `centered regression also removes the offset: tau ${ct.tau}`);
  assert.ok(ms.tau < lw.tau - 0.3, `plain mse is dominated by the offset: tau ${ms.tau} vs ${lw.tau}`);
  assert.ok(ch.top1 < 0.35 && Math.abs(ch.tau) < 0.15);
  assert.ok('r2' in ms && !('r2' in lw), 'R² is reported for mse only');
});
