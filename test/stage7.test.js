import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildMask, calibrateReadout, createDenseMLP, createSparseRNN, denseMatchedShape, denseParamCount, denseW, initDenseTheta, initSparseTheta, sparseLayout, U_DIM } from '../src/sparse-rnn.js';
import { decisionLoss, valueGapScale, valueMarginWeights } from '../src/rank-train.js';
import { createRng } from '../src/prng.js';
import { HYPER, analyzeWeights, clipGradient, cosineLr, createAdam, daggerImprovement, shouldStopDagger } from '../src/stage7-train.js';
import { COMBO_NORM, GARBAGE_NORM, U_LAYOUT, appendDecisions, chanceFromItems, createPool, encodeAfterstate, mergeDagger, metricsFromScores, trainingSubset } from '../src/stage7-data.js';
import { createTeacher, DEFAULT_PARAMS } from '../src/teacher-attack.js';
import { collectGame, deserialize, serialize } from '../src/versus-data.js';
import { createNetAgent } from '../src/stage7-agent.js';
import { applyDecision, createPlayer, decisionCandidates, enqueueGarbage } from '../src/tetris.js';
import { wasmAvailable } from '../src/wasm-kernels.js';
const require_wasm = () => ({ wasmAvailable });

// 작은 커넥톰: 입력 4 · 중간 6 · 출력 3, 간선 30 (self-loop·중복 없음, 입력층으로 들어가는 간선은 드물게)
function tinyConnectome(seed = 9, E = 30) {
  const rng = createRng(seed);
  const neurons = [];
  for (let i = 0; i < 4; i++) neurons.push({ id: i, type: 'LC1', layer: 'input', roi: 'LO(R)', isKC: false });
  for (let i = 0; i < 6; i++) neurons.push({ id: 10 + i, type: i < 2 ? 'KCab' : 'H', layer: 'hidden', roi: i % 2 ? 'SMP(R)' : 'PVLP(R)', isKC: i < 2 });
  for (let i = 0; i < 3; i++) neurons.push({ id: 20 + i, type: 'DNp01', layer: 'output', roi: 'GNG', isKC: false });
  const edges = [], seen = new Set();
  while (edges.length < E) {
    const a = rng.int(13), b = rng.int(13);
    if (a === b || seen.has(a * 13 + b)) continue;
    if (neurons[b].layer === 'input' && rng.next() < 0.7) continue;
    seen.add(a * 13 + b); edges.push([a, b, 3 + rng.int(10)]);
  }
  return { meta: { condition: { type: 'C0' } }, neurons, edges: edges.sort((x, y) => x[0] - y[0] || x[1] - y[1]) };
}
const randU = (rng, n) => new Float32Array(n * U_DIM).map(() => (rng.next() < 0.3 ? 1 : 0));

function finiteDiffCheck(theta, grad, lossAt, { eps = 1e-6, tol = 1e-5 } = {}) {
  let maxRel = 0, nonzero = 0;
  for (let p = 0; p < theta.length; p++) {
    const o = theta[p];
    theta[p] = o + eps; const Lp = lossAt(); theta[p] = o - eps; const Lm = lossAt(); theta[p] = o;
    const num = (Lp - Lm) / (2 * eps);
    const err = Math.abs(num - grad[p]);
    const rel = err < 1e-8 ? 0 : err / (Math.abs(num) + Math.abs(grad[p])); // 아주 작은 성분은 유한차분 반올림이 지배 — 절대 오차로 본다 (rank-train.test 와 같은 규약)
    if (Math.abs(num) > 1e-9) nonzero++;
    if (rel > maxRel) maxRel = rel;
  }
  assert.ok(nonzero > theta.length / 2, `gradient is nonzero for most parameters (${nonzero}/${theta.length})`);
  assert.ok(maxRel < tol, `max relative error ${maxRel}`);
  return { maxRel, nonzero };
}

test('sparse RNN BPTT: analytic dL/dθ for every parameter (W on the mask, W_in, b, readout) matches central finite differences, pairwise and listwise', () => {
  const rng = createRng(21);
  const mask = buildMask(tinyConnectome());
  assert.equal(mask.N, 13); assert.equal(mask.E, 30); assert.equal(mask.nInput, 4); assert.equal(mask.nOutput, 3);
  const layout = sparseLayout(mask, { hidden: 5 });
  const theta = new Float64Array(layout.P);
  initSparseTheta(mask, layout, theta, { seed: 3 });
  for (let p = 0; p < theta.length; p++) theta[p] += rng.uniform(-0.2, 0.2);
  const U = randU(rng, 4);
  const model = createSparseRNN(mask, theta, { T: 6, lr: 0.33, hidden: 5 });
  calibrateReadout(model, U, [0, 1, 2, 3]);
  assert.ok(model.dnStd.some((s) => s > 0), 'some DN varies across inputs');
  const rows = [0, 1, 2, 3];
  for (const loss of ['pairwise', 'listwise']) {
    for (let p = 0; p < theta.length; p++) theta[p] += rng.uniform(-0.05, 0.05);
    const f = model.forward(U, rows);
    const { L, ds } = decisionLoss(loss, f.s, { chosen: 1 });
    const grad = new Float64Array(theta.length);
    model.backward(f.cache, ds, grad);
    const lossAt = () => decisionLoss(loss, model.forward(U, rows, { keep: false }).s, { chosen: 1 }).L;
    assert.ok(Math.abs(lossAt() - L) < 1e-12, 'keep=false forward gives the same scores');
    finiteDiffCheck(theta, grad, lossAt);
    // 구간별로 실제 기울기가 흐른다
    const seg = (a, b) => { let s = 0; for (let p = a; p < b; p++) s += Math.abs(grad[p]); return s; };
    assert.ok(seg(layout.off.W, layout.off.Win) > 0 && seg(layout.off.Win, layout.off.b) > 0 && seg(layout.off.b, layout.off.R1) > 0 && seg(layout.off.R1, layout.P) > 0, `${loss}: every parameter block receives gradient`);
  }
});

test('batched kernels equal per-candidate evaluation; chunked score() equals one forward', () => {
  const rng = createRng(5);
  const mask = buildMask(tinyConnectome(4, 40));
  const layout = sparseLayout(mask, { hidden: 4 });
  const theta = new Float64Array(layout.P);
  initSparseTheta(mask, layout, theta, { seed: 2 });
  for (let p = 0; p < theta.length; p++) theta[p] += rng.uniform(-0.3, 0.3);
  const U = randU(rng, 7);
  const model = createSparseRNN(mask, theta, { T: 8, lr: 0.33, hidden: 4 });
  calibrateReadout(model, U, [0, 1, 2, 3, 4, 5, 6]);
  const all = model.forward(U, [0, 1, 2, 3, 4, 5, 6], { keep: false }).s;
  for (let b = 0; b < 7; b++) assert.ok(Math.abs(model.forward(U, [b], { keep: false }).s[0] - all[b]) < 1e-12, `candidate ${b} equal in batch and alone`);
  const chunked = model.score(U, [0, 1, 2, 3, 4, 5, 6], { maxBatch: 3 });
  for (let b = 0; b < 7; b++) assert.ok(Math.abs(chunked[b] - all[b]) < 1e-12);
  assert.notEqual(new Set(Array.from(all).map((v) => v.toFixed(9))).size, 1, 'different inputs give different scores');
});

test('mask is never broken by training: after Adam steps the dense reconstruction is nonzero exactly on the mask and no off-mask parameter exists', () => {
  const rng = createRng(8);
  const c = tinyConnectome(11, 25);
  const mask = buildMask(c);
  const layout = sparseLayout(mask, { hidden: 4 });
  const theta = new Float64Array(layout.P);
  initSparseTheta(mask, layout, theta, { seed: 1 });
  assert.equal(layout.sizes.W, mask.E, 'W has exactly one parameter per mask edge');
  const U = randU(rng, 6);
  const model = createSparseRNN(mask, theta, { T: 5, lr: 0.33, hidden: 4 });
  calibrateReadout(model, U, [0, 1, 2, 3, 4, 5]);
  const adam = createAdam(layout.P);
  const grad = new Float64Array(layout.P);
  for (let step = 0; step < 30; step++) {
    grad.fill(0);
    const f = model.forward(U, [0, 1, 2, 3, 4, 5]);
    const { ds } = decisionLoss('pairwise', f.s, { chosen: step % 6 });
    model.backward(f.cache, ds, grad);
    for (let p = 0; p < grad.length; p++) grad[p] += rng.uniform(-1, 1); // 마스크 밖으로 새는 경로가 있다면 무작위 기울기가 드러낸다
    clipGradient(grad, 5);
    adam.step(theta, grad, 1e-2);
  }
  const dense = denseW(mask, theta, layout);
  const inMask = new Set(c.edges.map(([a, b]) => a * mask.N + b));
  let nonzero = 0;
  for (let q = 0; q < dense.length; q++) {
    if (inMask.has(q)) { assert.notEqual(dense[q], 0); nonzero++; } else assert.equal(dense[q], 0, `off-mask entry ${q} must stay 0`);
  }
  assert.equal(nonzero, mask.E);
  // 학습 후 W 는 초기값에서 움직였고, 억제성(음수) 간선이 생길 수 있다 — 분석 함수가 그것을 센다
  const a = analyzeWeights(mask, mask.wUnit, theta.subarray(0, mask.E));
  assert.equal(a.overall.edges, mask.E);
  assert.ok(a.overall.meanAbsDelta > 0);
  assert.ok(Object.keys(a.byBlock).length > 0 && a.byPostRoi.length > 0);
  const same = analyzeWeights(mask, mask.wUnit, mask.wUnit);
  assert.equal(same.overall.meanAbsDelta, 0); assert.equal(same.overall.inhibitoryFrac, 0); assert.ok(Math.abs(same.overall.corr - 1) < 1e-12);
  const flipped = analyzeWeights(mask, mask.wUnit, Float64Array.from(mask.wUnit, (v) => -v));
  assert.equal(flipped.overall.signFlipFrac, 1); assert.equal(flipped.overall.inhibitoryFrac, 1);
});

test('D0 dense-matched MLP has exactly the parameter count of C0 (real connectome sizes) and its gradient checks', () => {
  // 실제 C0 크기: E 459,168 · 입력 2,316 · N 8,000 · DN 107 · 리드아웃 64
  const fakeMask = { E: 459168, N: 8000, nInput: 2316, nOutput: 107 };
  const P = sparseLayout(fakeMask, { hidden: HYPER.hidden }).P;
  assert.equal(P, 459168 + U_DIM * 2316 + 8000 + 64 * 107 + 64 + 64 + 1);
  const shape = denseMatchedShape(P);
  assert.equal(denseParamCount(shape), P);
  assert.equal(shape.length, 3);
  const theta = new Float64Array(P);
  initDenseTheta(theta, shape, { seed: 1 });
  assert.equal(createDenseMLP(theta, shape).P, P);
  assert.throws(() => createDenseMLP(new Float64Array(P - 1), shape));
  // 작은 D0 의 기울기 검사
  const rng = createRng(3);
  const small = [7, 5, 6];
  const th = new Float64Array(denseParamCount(small));
  initDenseTheta(th, small, { seed: 2 });
  const dm = createDenseMLP(th, small);
  const U = randU(rng, 5), rows = [0, 1, 2, 3, 4];
  const f = dm.forward(U, rows);
  const { ds } = decisionLoss('listwise', f.s, { chosen: 2 });
  const grad = new Float64Array(th.length);
  dm.backward(f.cache, ds, grad);
  finiteDiffCheck(th, grad, () => decisionLoss('listwise', dm.score(U, rows), { chosen: 2 }).L);
});

// 교사(얕은 빔)로 몇 결정을 만들어 실제 데이터 경로(collectGame → serialize → deserialize) 를 쓴다
function sampleDecisions(seed = 3, cap = 4) {
  const teacher = createTeacher(DEFAULT_PARAMS, { depth: 1, width: 2 });
  const g = collectGame(teacher, { seed, cap, epsilon: 0.5 });
  const doc = serialize([{ ...g, id: 0 }], { train: [0], val: [], test: [] }, {});
  return deserialize(doc);
}

test('u encoding: 256 dims, one-hot blocks sum to one, board cells match the afterstate, garbage/combo normalized to [0, 1]', () => {
  const data = sampleDecisions();
  const d = data.decisions[0];
  assert.ok(d.candidates.length > 8);
  const one = (u, a, n) => { let s = 0; for (let k = a; k < a + n; k++) s += u[k]; return s; };
  for (let k = 0; k < d.candidates.length; k++) {
    const { player, event } = applyDecision(d.player, d.candidates[k]);
    const u = encodeAfterstate(player, event);
    assert.equal(u.length, U_DIM);
    let filled = 0; for (let c = 0; c < 200; c++) { assert.equal(u[c], player.board[c] ? 1 : 0); filled += u[c]; }
    assert.ok(filled > 0);
    assert.equal(one(u, U_LAYOUT.piece, 7), 1); assert.equal(u[U_LAYOUT.piece + d.candidates[k].piece], 1);
    assert.equal(one(u, U_LAYOUT.rot, 4), 1); assert.equal(u[U_LAYOUT.rot + (d.candidates[k].rot & 3)], 1);
    assert.equal(one(u, U_LAYOUT.hold, 8), 1);
    for (let q = 0; q < 5; q++) assert.equal(one(u, U_LAYOUT.upcoming + 7 * q, 7), 1);
    assert.ok(u[U_LAYOUT.garbage] >= 0 && u[U_LAYOUT.garbage] <= 1 && u[U_LAYOUT.combo] >= 0 && u[U_LAYOUT.combo] <= 1);
  }
  // 가비지 큐 · 콤보 정규화
  const p = enqueueGarbage(createPlayer(1), 3, 4);
  const u = encodeAfterstate({ ...p, combo: 4 }, { piece: 0, rot: 0 });
  assert.ok(Math.abs(u[U_LAYOUT.garbage] - 3 / GARBAGE_NORM) < 1e-6 && Math.abs(u[U_LAYOUT.combo] - 4 / COMBO_NORM) < 1e-6);
  assert.equal(encodeAfterstate({ ...enqueueGarbage(p, 20, 1), combo: 30 }, { piece: 0, rot: 0 })[U_LAYOUT.garbage], 1);
});

test('K=8 training subsets are separate from full-candidate evaluation: subset = chosen + 7 hardest, evaluation refuses subsets and counts every candidate', () => {
  const data = sampleDecisions(7, 3);
  const pool = createPool(500);
  const train = appendDecisions(pool, data.decisions, { K: 8, subset: true });
  const full = appendDecisions(pool, data.decisions, { subset: false });
  for (let i = 0; i < data.decisions.length; i++) {
    const d = data.decisions[i];
    const sub = trainingSubset(d.candidates, d.chosen, 8);
    assert.equal(sub.length, Math.min(8, d.candidates.length)); assert.equal(sub[0], d.chosen);
    const others = d.candidates.map((c, k) => k).filter((k) => k !== d.chosen).sort((a, b) => d.candidates[b].value - d.candidates[a].value || a - b);
    assert.deepEqual(sub.slice(1), others.slice(0, 7), 'the 7 hardest negatives by teacher value');
    assert.equal(train[i].rows.length, sub.length); assert.equal(train[i].chosen, 0); assert.equal(train[i].subset, true);
    assert.equal(full[i].rows.length, d.candidates.length); assert.equal(full[i].chosen, d.chosen); assert.equal(full[i].subset, false);
    assert.equal(full[i].values.length, d.candidates.length);
  }
  // mixed negatives 변형: 교사 선택 + 상위 3 + 무작위 4 (K 8), 중복 없음, 부분집합 크기 같음
  const rng = createRng(4);
  for (const d of data.decisions) {
    const mixed = trainingSubset(d.candidates, d.chosen, 8, { mixed: true, hard: 3, rng });
    const hardOnly = trainingSubset(d.candidates, d.chosen, 8);
    assert.equal(mixed.length, hardOnly.length); assert.equal(new Set(mixed).size, mixed.length); assert.equal(mixed[0], d.chosen);
    assert.deepEqual(mixed.slice(0, 4), hardOnly.slice(0, 4), 'chosen + 3 hardest are shared');
    for (const k of mixed.slice(4)) assert.ok(!hardOnly.slice(1, 4).includes(k) && k !== d.chosen);
  }
  assert.throws(() => metricsFromScores(train, train.map((d) => new Float64Array(d.rows.length))), /full candidate set/);
  const perfect = metricsFromScores(full, full.map((d) => Float64Array.from(d.values)));
  assert.equal(perfect.top1, 1); assert.ok(perfect.tau > 0.99);
  assert.equal(perfect.candidates, data.decisions.reduce((s, d) => s + d.candidates.length, 0));
  assert.ok(perfect.candidatesPerDecision > 8, 'evaluation sees the full candidate set, not K');
  const chance = chanceFromItems(full);
  assert.ok(chance.top1 < 0.5);
  assert.throws(() => metricsFromScores(full, full.map((d) => new Float64Array(3))), /length mismatch/);
});

test('DAgger merge: new games go to train (+ game-level val fraction), never to test; colliding ids or seeds throw; test items unchanged', () => {
  const base = sampleDecisions(3, 3);
  const pool = createPool(4000);
  const K = 8;
  const mk = (id, seed, n) => ({ id, seed, decisions: base.decisions.slice(0, n).map((d) => ({ ...d, gameId: id })) });
  const trainG = mk(0, 100, 3), valG = mk(1, 101, 2), testG = mk(2, 102, 3);
  const dataset = { pool, K, gameSeeds: [100, 101, 102], train: appendDecisions(pool, trainG.decisions, { K, subset: true }), val: appendDecisions(pool, valG.decisions, { K, subset: true }), test: appendDecisions(pool, testG.decisions, { subset: false }) };
  const testSnapshot = JSON.stringify(dataset.test.map((d) => [Array.from(d.rows), d.chosen, d.values]));
  const newGames = Array.from({ length: 10 }, (_, k) => mk(10 + k, 1000 + k, 2));
  const r = mergeDagger(dataset, newGames, { valFraction: 0.2 });
  assert.equal(r.trainGames, 8); assert.equal(r.valGames, 2); assert.equal(r.train, 16); assert.equal(r.val, 4);
  assert.equal(dataset.train.length, 3 + 16); assert.equal(dataset.val.length, 2 + 4); assert.equal(dataset.test.length, 3);
  assert.equal(JSON.stringify(dataset.test.map((d) => [Array.from(d.rows), d.chosen, d.values])), testSnapshot);
  const trainIds = new Set(dataset.train.map((d) => d.gameId)), valIds = new Set(dataset.val.map((d) => d.gameId)), testIds = new Set(dataset.test.map((d) => d.gameId));
  for (const id of trainIds) assert.ok(!valIds.has(id) && !testIds.has(id), `train game ${id} leaks`);
  for (const id of valIds) assert.ok(!testIds.has(id));
  assert.ok(dataset.train.every((d) => d.subset) && dataset.val.every((d) => d.subset));
  assert.throws(() => mergeDagger(dataset, [mk(2, 5000, 1)]), /collides with an existing game id/);   // test 게임 id
  assert.throws(() => mergeDagger(dataset, [mk(1, 5001, 1)]), /collides with an existing game id/);   // val 게임 id
  assert.throws(() => mergeDagger(dataset, [mk(99, 102, 1)]), /seed .* collides/);                      // test 게임 시드
  assert.throws(() => mergeDagger(dataset, [mk(98, 6000, 1), mk(98, 6001, 1)]), /appears twice/);
});

test('net agent plays legal moves from the full candidate set (excludes dying placements) and pick() agrees with choose()', () => {
  const rng = createRng(2);
  const mask = buildMask(tinyConnectome(6, 35));
  const layout = sparseLayout(mask, { hidden: 4 });
  const theta = new Float64Array(layout.P);
  initSparseTheta(mask, layout, theta, { seed: 1 });
  for (let p = 0; p < theta.length; p++) theta[p] += rng.uniform(-0.5, 0.5);
  const model = createSparseRNN(mask, theta, { T: 3, lr: 0.5, hidden: 4 });
  calibrateReadout(model, randU(rng, 8), [0, 1, 2, 3, 4, 5, 6, 7]);
  const agent = createNetAgent(model);
  let p = createPlayer(11);
  for (let i = 0; i < 12; i++) {
    const cands = decisionCandidates(p);
    const c = agent.choose(p);
    const same = (a, b) => a.useHold === b.useHold && a.col === b.col && a.rot === b.rot && a.top === b.top;
    assert.ok(cands.some((x) => same(x, c)), 'choice is one of the legal candidates');
    const k = agent.pick(p, cands);
    assert.ok(same(cands[k], c), 'pick() and choose() agree');
    p = applyDecision(p, c).player;
    assert.ok(!p.dead);
  }
});

test('optimizer pieces: clipping scales to the norm, cosine schedule endpoints, Adam moves parameters against the gradient', () => {
  const g = Float64Array.from([3, 4]);
  const r = clipGradient(g, 1);
  assert.ok(r.clipped && Math.abs(r.norm - 5) < 1e-12 && Math.abs(Math.hypot(g[0], g[1]) - 1) < 1e-12);
  assert.equal(clipGradient(Float64Array.from([0.1, 0.1]), 1).clipped, false);
  assert.equal(cosineLr(1, 0, 0, 100), 1); assert.ok(Math.abs(cosineLr(1, 0, 100, 100)) < 1e-12); assert.ok(Math.abs(cosineLr(1, 0, 50, 100) - 0.5) < 1e-12);
  const adam = createAdam(2);
  const th = Float64Array.from([1, -1]);
  adam.step(th, Float64Array.from([1, -1]), 0.1);
  assert.ok(th[0] < 1 && th[1] > -1);
});

// ---------- Phase A-2 ----------

test('value-margin weighted pairwise: λ=0 equals plain pairwise, weights are relative (Σw normalization), analytic gradient through the sparse RNN matches finite differences', () => {
  const values = [10, 4, 9.5, -20, 6];
  const s = Float64Array.from([0.2, 0.5, 0.1, 0.4, -0.3]);
  const plain = decisionLoss('pairwise', s, { chosen: 0 });
  const scale = valueGapScale([{ values, chosen: 0 }]);
  const w0 = valueMarginWeights(values, 0, 0, scale);
  const zero = decisionLoss('pairwise', s, { chosen: 0, pairWeights: w0 });
  assert.ok(Math.abs(zero.L - plain.L) < 1e-12 && zero.ds.every((g, k) => Math.abs(g - plain.ds[k]) < 1e-12), 'λ = 0 reduces to the current pairwise loss');
  assert.ok(Math.abs(scale - (6 + 0.5 + 30 + 4) / 4) < 1e-12);
  const w2 = valueMarginWeights(values, 0, 2, scale);
  assert.equal(w2[0], 0);
  assert.ok(w2[3] > w2[1] && w2[1] > w2[2], 'the catastrophic candidate (gap 30) gets the largest weight');
  // 닫힌형: 모든 쌍이 위반일 때 L = Σ w_k (m − (s_c − s_k)) / Σ w
  const big = Float64Array.from([0, 0.9, 0.8, 0.95, 0.7]);
  const r = decisionLoss('pairwise', big, { chosen: 0, pairWeights: w2 });
  let W = 0, L = 0;
  for (let k = 1; k < 5; k++) { W += w2[k]; L += w2[k] * (1 - (big[0] - big[k])); }
  assert.ok(Math.abs(r.L - L / W) < 1e-12);
  assert.ok(Math.abs(r.ds.reduce((a, b) => a + b, 0)) < 1e-12, 'gradient sums to zero');
  // 희소 RNN 을 통한 기울기 검사
  const rng = createRng(31);
  const mask = buildMask(tinyConnectome(3, 32));
  const layout = sparseLayout(mask, { hidden: 5 });
  const theta = new Float64Array(layout.P);
  initSparseTheta(mask, layout, theta, { seed: 4 });
  for (let p = 0; p < theta.length; p++) theta[p] += rng.uniform(-0.25, 0.25);
  const U = randU(rng, 5), rows = [0, 1, 2, 3, 4];
  const model = createSparseRNN(mask, theta, { T: 5, lr: 0.33, hidden: 5 });
  calibrateReadout(model, U, rows);
  const targets = { chosen: 0, pairWeights: w2 };
  const f = model.forward(U, rows);
  const { ds } = decisionLoss('pairwise', f.s, targets);
  const grad = new Float64Array(theta.length);
  model.backward(f.cache, ds, grad);
  finiteDiffCheck(theta, grad, () => decisionLoss('pairwise', model.forward(U, rows, { keep: false }).s, targets).L);
});

test('DAgger early stop: two consecutive rounds whose paired improvement CI contains zero (or is negative) stop the loop; real improvement resets the count', () => {
  const base = [100, 120, 90, 110, 130];
  const up = (a, d) => a.map((v, i) => v + d + (i % 2 ? 3 : -3)); // 일관된 개선 + 작은 잡음
  const flat = (a) => a.map((v, i) => v + (i % 2 ? 6 : -6));       // 잡음만
  const q = (round, pieces) => ({ round, pieces });
  const rising = [q(0, base), q(1, up(base, 30)), q(2, up(up(base, 30), 30)), q(3, up(up(up(base, 30), 30), 30))];
  assert.equal(shouldStopDagger(rising).stop, false);
  assert.ok(shouldStopDagger(rising).flags.every((f) => f.improved));
  const plateau = [q(0, base), q(1, up(base, 30)), q(2, flat(up(base, 30))), q(3, flat(up(base, 30)))];
  const r = shouldStopDagger(plateau);
  assert.equal(r.stop, true); assert.equal(r.run, 2);
  assert.ok(!r.flags[1].improved && !r.flags[2].improved && r.flags[1].zeroInCI);
  const onePlateau = [q(0, base), q(1, up(base, 30)), q(2, flat(up(base, 30)))];
  assert.equal(shouldStopDagger(onePlateau).stop, false, 'one non-improving round is not enough');
  const recover = [q(0, base), q(1, flat(base)), q(2, up(base, 40)), q(3, flat(up(base, 40)))];
  assert.equal(shouldStopDagger(recover).stop, false, 'improvement in between resets the run');
  const worse = [q(0, base), q(1, up(base, -20)), q(2, up(base, -40))];
  assert.equal(shouldStopDagger(worse).stop, true, 'getting worse counts as no improvement');
  const imp = daggerImprovement(base, up(base, 30));
  assert.ok(imp.improved && imp.deltaCI[0] > 0 && Math.abs(imp.delta - 29.4) < 1e-9);
});

test('dropout: inactive at evaluation (train=false is deterministic and equals the no-dropout model); active in training; AdamW decay shrinks only the decayed ranges', () => {
  const rng = createRng(12);
  const mask = buildMask(tinyConnectome(5, 30));
  const layout = sparseLayout(mask, { hidden: 6 });
  const theta = new Float64Array(layout.P);
  initSparseTheta(mask, layout, theta, { seed: 2 });
  for (let p = 0; p < theta.length; p++) theta[p] += rng.uniform(-0.3, 0.3);
  const U = randU(rng, 6), rows = [0, 1, 2, 3, 4, 5];
  const plain = createSparseRNN(mask, theta, { T: 4, lr: 0.33, hidden: 6 });
  calibrateReadout(plain, U, rows);
  const drop = createSparseRNN(mask, theta, { T: 4, lr: 0.33, hidden: 6, dnMean: plain.dnMean, dnStd: plain.dnStd, dropoutZ: 0.3, dropoutH: 0.5, seed: 9 });
  const a = drop.forward(U, rows, { train: false }).s, b = drop.forward(U, rows, { train: false }).s, c = plain.forward(U, rows).s, d = drop.score(U, rows);
  for (let k = 0; k < 6; k++) { assert.equal(a[k], b[k]); assert.equal(a[k], c[k]); assert.equal(d[k], c[k]); }
  const t1 = drop.forward(U, rows, { train: true }), t2 = drop.forward(U, rows, { train: true });
  assert.ok(t1.cache.mz && t1.cache.mh, 'masks are kept for backward');
  assert.ok(t1.cache.mz.some((m) => m === 0) && t1.cache.mh.some((m) => m === 0), 'some units are dropped');
  assert.ok(t1.cache.mz.every((m) => m === 0 || Math.abs(m - 1 / 0.7) < 1e-12), 'inverted dropout scaling');
  assert.ok(Array.from(t1.s).some((v, k) => v !== t2.s[k]) && Array.from(t1.s).some((v, k) => v !== c[k]), 'training forward is stochastic');
  // 역전파는 마스크를 따른다: 모든 후보에서 떨어진 은닉 유닛의 R1 행에는 기울기가 없다
  const grad = new Float64Array(theta.length);
  drop.backward(t1.cache, Float64Array.from([1, -1, 0.5, 0.2, -0.3, 0.1]), grad);
  for (let q = 0; q < 6; q++) {
    const droppedEverywhere = rows.every((_, b) => t1.cache.mh[b * 6 + q] === 0);
    if (droppedEverywhere) for (let o = 0; o < 3; o++) assert.equal(grad[layout.off.R1 + q * 3 + o], 0);
  }
  // 밀집 모델도 같은 규약
  const dh = createDenseMLP(new Float64Array(denseParamCount([5, 4, 3])), [5, 4, 3], { dropoutH: 0.5, seed: 3 });
  initDenseTheta(dh.theta, [5, 4, 3], { seed: 1 });
  const e1 = dh.forward(U, rows, { train: false }).s, e2 = dh.score(U, rows), e3 = dh.forward(U, rows, { train: true }).s;
  for (let k = 0; k < 6; k++) assert.equal(e1[k], e2[k]);
  assert.ok(Array.from(e3).some((v, k) => v !== e1[k]));
  // AdamW 감쇠
  const th = Float64Array.from([1, 1, 1, 1]);
  const adam = createAdam(4, { weightDecay: 0.5, decayRanges: [[0, 2]] });
  adam.step(th, new Float64Array(4), 0.1);
  assert.ok(Math.abs(th[0] - 0.95) < 1e-12 && Math.abs(th[1] - 0.95) < 1e-12 && th[2] === 1 && th[3] === 1, 'decay 1 − lr·wd on the ranges only, biases untouched');
});

test('mixed negatives: chosen + 3 hardest + 4 random without duplicates, exactly K, consistent with the pool items', () => {
  const data = sampleDecisions(9, 3);
  const pool = createPool(400);
  const items = appendDecisions(pool, data.decisions, { K: 8, subset: true, negatives: 'mixed', hard: 3, seed: 5 });
  for (let i = 0; i < data.decisions.length; i++) {
    const d = data.decisions[i], it = items[i];
    assert.equal(it.rows.length, Math.min(8, d.candidates.length)); assert.equal(it.chosen, 0);
    assert.equal(new Set(Array.from(it.rows)).size, it.rows.length, 'no duplicate rows');
    const hard = trainingSubset(d.candidates, d.chosen, 8);
    assert.equal(it.values[0], d.candidates[d.chosen].value);
    for (let q = 1; q <= 3; q++) assert.equal(it.values[q], d.candidates[hard[q]].value, 'positions 1-3 are the 3 hardest');
    assert.ok(it.values.slice(4).every((v) => d.candidates.some((c) => c.value === v)), 'random negatives are real candidates');
  }
});

test('wasm backend equals the js backend: scores, DN means and full gradients agree (even and odd batch widths)', () => {
  const { wasmAvailable } = require_wasm();
  assert.ok(wasmAvailable(), 'WebAssembly SIMD module compiles');
  const rng = createRng(77);
  const mask = buildMask(tinyConnectome(8, 36));
  const layout = sparseLayout(mask, { hidden: 5 });
  const theta = new Float64Array(layout.P);
  initSparseTheta(mask, layout, theta, { seed: 6 });
  for (let p = 0; p < theta.length; p++) theta[p] += rng.uniform(-0.3, 0.3);
  const U = randU(rng, 7);
  const js = createSparseRNN(mask, theta, { T: 6, lr: 0.33, hidden: 5, backend: 'js' });
  calibrateReadout(js, U, [0, 1, 2, 3, 4, 5, 6]);
  const wasm = createSparseRNN(mask, theta, { T: 6, lr: 0.33, hidden: 5, dnMean: js.dnMean, dnStd: js.dnStd, backend: 'wasm' });
  assert.equal(wasm.backend, 'wasm'); assert.equal(js.backend, 'js');
  for (const rows of [[0, 1, 2, 3], [0, 1, 2, 3, 4], [6], [1, 2]]) {
    const a = js.forward(U, rows), b = wasm.forward(U, rows);
    assert.equal(b.s.length, rows.length); assert.equal(b.dn.length, rows.length * mask.nOutput);
    for (let k = 0; k < rows.length; k++) assert.ok(Math.abs(a.s[k] - b.s[k]) < 1e-12, `score ${k}: ${a.s[k]} vs ${b.s[k]}`);
    for (let q = 0; q < a.dn.length; q++) assert.ok(Math.abs(a.dn[q] - b.dn[q]) < 1e-13);
    const ds = Float64Array.from(rows, (_, k) => rng.uniform(-1, 1));
    const ga = new Float64Array(theta.length), gb = new Float64Array(theta.length);
    js.backward(a.cache, ds, ga); wasm.backward(b.cache, ds, gb);
    let maxErr = 0, maxG = 0;
    for (let p = 0; p < theta.length; p++) { maxErr = Math.max(maxErr, Math.abs(ga[p] - gb[p])); maxG = Math.max(maxG, Math.abs(ga[p])); }
    assert.ok(maxG > 0 && maxErr < 1e-12 * Math.max(1, maxG), `gradients agree (max |Δ| ${maxErr}, max |g| ${maxG}) for B ${rows.length}`);
    const sa = js.score(U, rows), sb = wasm.score(U, rows);
    for (let k = 0; k < rows.length; k++) assert.ok(Math.abs(sa[k] - sb[k]) < 1e-12);
  }
});
