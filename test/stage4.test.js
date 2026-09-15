import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseConnectome, checkGraph } from '../src/connectome.js';
import { ablateDirect, ablateKC, buildCondition, degreeShuffle, degrees, erdosRenyi, weightShuffle } from '../src/nullmodels.js';
import { assertNoLeak, candidateAfterstates, collectAfterstates, deserialize, packBoard, serialize, splitByGame, unpackBoard, FEATURE_WEIGHTS } from '../src/afterstate.js';
import { applyPlacement, emptyBoard, legalPlacements, CELLS } from '../src/tetris.js';
import { WEIGHTS, evaluatePlacement } from '../src/heuristic.js';
import { createMLP, mlpBackward, mlpForward, quadraticMap, readoutFromJSON, trainMLP, trainQuadratic, trainRidge, valueOf } from '../src/readout.js';
import { bootstrapCI, ciOverlap, kendallTau, r2, regressionMetrics } from '../src/evaluate.js';
import { activitySummary } from '../src/play.js';
import { createRng } from '../src/prng.js';

// ---------- 소형 커넥톰 (nullmodels 용) ----------
const neuron = (id, type, layer, extra = {}) => ({ id, type, layer, instance: type, soma: null, isKC: false, isAllowlisted: false, roi: 'A', ...extra });
function toy() {
  const neurons = [
    neuron(1, 'LC4', 'input'), neuron(2, 'LC4', 'input'), neuron(3, 'LC6', 'input'),
    neuron(4, 'A', 'hidden'), neuron(5, 'KCg', 'hidden', { isKC: true }), neuron(6, 'B', 'hidden'), neuron(7, 'C', 'hidden'), neuron(8, 'KCa', 'hidden', { isKC: true }),
    neuron(9, 'DNp01', 'output'), neuron(10, 'DNp02', 'output'),
  ];
  const edges = [
    [0, 3, 5], [0, 4, 3], [1, 3, 7], [1, 5, 4], [2, 6, 9], [2, 9, 6], [0, 8, 3],
    [3, 4, 3], [3, 5, 8], [4, 6, 3], [5, 3, 4], [5, 8, 6], [6, 7, 5], [7, 3, 3], [7, 6, 4], [3, 9, 10], [6, 8, 3],
    [4, 9, 3], [6, 9, 4], [7, 8, 5], [8, 4, 3], [9, 3, 3],
  ];
  const roiCounts = { A: 10 };
  return { meta: { dataset: 'test', extractedAt: '2026-01-01T00:00:00Z', nodeCount: 10, edgeCount: edges.length, layerSizes: { input: 3, hidden: 5, output: 2 }, weightThreshold: 3, outputAllowlisted: [], kcCount: 2, roiCounts }, neurons, edges };
}
const sortedWeights = (c) => c.edges.map((e) => e[2]).sort((a, b) => a - b);
const noSelfNoDup = (c) => { const s = new Set(); for (const [a, b] of c.edges) { if (a === b) return false; const k = `${a}>${b}`; if (s.has(k)) return false; s.add(k); } return true; };

test('degree-shuffle (configuration model): every in/out degree preserved exactly, weights preserved per source, no self-loops/duplicates, seeded', () => {
  const c = toy();
  const d0 = degrees(c);
  const s1 = degreeShuffle(c, 7), s1b = degreeShuffle(c, 7), s2 = degreeShuffle(c, 8);
  parseConnectome(s1);
  const d1 = degrees(s1);
  assert.deepEqual(Array.from(d1.inDeg), Array.from(d0.inDeg));
  assert.deepEqual(Array.from(d1.outDeg), Array.from(d0.outDeg));
  assert.deepEqual(sortedWeights(s1), sortedWeights(c));
  // 각 pre 뉴런의 출력 가중치 다중집합 보존
  const outW = (cc) => cc.neurons.map((_, i) => cc.edges.filter((e) => e[0] === i).map((e) => e[2]).sort((a, b) => a - b).join(','));
  assert.deepEqual(outW(s1), outW(c));
  assert.ok(noSelfNoDup(s1));
  assert.deepEqual(s1.edges, s1b.edges, 'deterministic');
  assert.notDeepEqual(s1.edges, c.edges, 'actually rewired');
  assert.notDeepEqual(s2.edges, s1.edges, 'seed matters');
  assert.ok(s1.meta.condition.swapsAccepted > 0);
  assert.equal(s1.meta.edgeCount, c.edges.length);
});

test('degree-shuffle on the real connectome preserves all 8000 in/out degrees', () => {
  const c = parseConnectome(readFileSync(new URL('../data/connectome.json', import.meta.url), 'utf8'));
  const d0 = degrees(c);
  const s = degreeShuffle(c, 3, 2); // 테스트는 2 라운드만
  const d1 = degrees(s);
  assert.deepEqual(Array.from(d1.inDeg), Array.from(d0.inDeg));
  assert.deepEqual(Array.from(d1.outDeg), Array.from(d0.outDeg));
  assert.equal(s.edges.length, c.edges.length);
  assert.ok(noSelfNoDup(s));
  assert.ok(s.meta.condition.swapsAccepted > c.edges.length, 'well mixed');
  parseConnectome(s);
});

test('weight-shuffle keeps wiring, permutes weights; erdos-renyi keeps N, E, per-layer-block edge counts and the weight multiset', () => {
  const c = toy();
  const w = weightShuffle(c, 3);
  parseConnectome(w);
  const wiring = (cc) => cc.edges.map((e) => `${e[0]}>${e[1]}`).sort();
  assert.deepEqual(wiring(w), wiring(c));
  assert.deepEqual(sortedWeights(w), sortedWeights(c));
  assert.notDeepEqual(w.edges.map((e) => e[2]), c.edges.map((e) => e[2]));
  const er = erdosRenyi(c, 5);
  parseConnectome(er);
  assert.equal(er.edges.length, c.edges.length);
  assert.deepEqual(sortedWeights(er), sortedWeights(c));
  assert.ok(noSelfNoDup(er));
  const blocks = (cc) => { const m = {}; for (const [a, b] of cc.edges) { const k = `${cc.neurons[a].layer}>${cc.neurons[b].layer}`; m[k] = (m[k] ?? 0) + 1; } return m; };
  assert.deepEqual(blocks(er), blocks(c));
  assert.deepEqual(erdosRenyi(c, 5).edges, er.edges, 'deterministic');
});

test('KC ablation removes isKC neurons and their edges and reindexes; direct ablation removes exactly the input→output edges', () => {
  const c = toy();
  const k = ablateKC(c);
  parseConnectome(k);
  assert.equal(k.neurons.length, 8);
  assert.ok(k.neurons.every((n) => !n.isKC));
  assert.equal(k.meta.kcCount, 0);
  assert.deepEqual(k.meta.layerSizes, { input: 3, hidden: 3, output: 2 });
  // 남은 간선은 원본에서 KC 가 아닌 끝점끼리의 간선과 같다 (id 로 대조)
  const idOf = (cc, i) => cc.neurons[i].id;
  const orig = new Set(c.edges.filter(([a, b]) => !c.neurons[a].isKC && !c.neurons[b].isKC).map(([a, b, w]) => `${idOf(c, a)}>${idOf(c, b)}:${w}`));
  const kept = new Set(k.edges.map(([a, b, w]) => `${idOf(k, a)}>${idOf(k, b)}:${w}`));
  assert.deepEqual(kept, orig);
  assert.ok(checkGraph(k).filter((r) => !r.name.startsWith('roi')).every((r) => r.ok));
  const dd = ablateDirect(c);
  parseConnectome(dd);
  assert.equal(dd.meta.condition.removedEdges, 2); // [2, 9, 6], [0, 8, 3] 가 input→output (8, 9 = DN)
  assert.ok(dd.edges.every(([a, b]) => !(c.neurons[a].layer === 'input' && c.neurons[b].layer === 'output')));
  assert.equal(buildCondition(c, 'C0').edges.length, c.edges.length);
  assert.throws(() => buildCondition(c, 'C9'), /unknown condition/);
});

// ---------- afterstate ----------

test('candidateAfterstates matches applyPlacement + evaluatePlacement for every legal placement', () => {
  const rng = createRng(2);
  let board = emptyBoard();
  // 무작위로 조각을 놓아 보드를 만든 뒤 대조
  for (let p = 0; p < 15; p++) {
    const piece = rng.int(7);
    const legal = legalPlacements(board, piece);
    const mv = legal[rng.int(legal.length)];
    const r = applyPlacement(board, piece, mv.col, mv.rot);
    if (r.gameOver) break;
    board = r.board;
  }
  for (const piece of [0, 2, 4]) {
    const cands = candidateAfterstates(board, piece);
    const legal = legalPlacements(board, piece).filter(({ col, rot }) => !applyPlacement(board, piece, col, rot).gameOver);
    assert.equal(cands.length, legal.length);
    for (const c of cands) {
      const r = applyPlacement(board, piece, c.col, c.rot);
      assert.deepEqual(Array.from(c.board), Array.from(r.board), `board col ${c.col} rot ${c.rot}`);
      assert.equal(c.linesCleared, r.linesCleared);
      const e = evaluatePlacement(board, piece, c.col, c.rot);
      assert.equal(c.score, e.score);
      assert.deepEqual(c.features, ['landingHeight', 'erodedPieceCells', 'rowTransitions', 'columnTransitions', 'holes', 'cumulativeWells'].map((k) => e.features[k]));
      assert.equal(c.action, c.col * 4 + c.rot);
      // V2 결합 = 점수
      let v = 0; c.features.forEach((f, k) => { v += FEATURE_WEIGHTS[k] * f; });
      assert.ok(Math.abs(v - c.score) < 1e-9);
    }
  }
  assert.deepEqual(FEATURE_WEIGHTS, Object.values(WEIGHTS));
});

test('board pack/unpack round-trips; collect → serialize → deserialize preserves samples; game split has no leak', () => {
  const rng = createRng(9);
  const board = Uint8Array.from({ length: CELLS }, () => (rng.next() < 0.4 ? 1 : 0));
  assert.deepEqual(Array.from(unpackBoard(packBoard(board))), Array.from(board));
  const games = collectAfterstates({ games: 6, decisionsPerGame: 4, warmupMax: 5, epsilon: 0.3, seed: 3 });
  assert.equal(games.length, 6);
  assert.ok(games.every((g) => g.decisions.length <= 4));
  const ids = games.map((g) => g.id);
  const split = splitByGame(ids, { ratios: [0.6, 0.2, 0.2], seed: 1 });
  assert.equal(split.train.length + split.val.length + split.test.length, 6);
  assertNoLeak(split, ids);
  assert.throws(() => assertNoLeak({ train: [0, 1], val: [1], test: [2, 3, 4, 5] }, ids), /both/);
  assert.throws(() => assertNoLeak({ train: [0, 1], val: [2], test: [3, 4] }, ids), /no split/);
  const doc = serialize(games, split, { seed: 3 });
  const { samples, decisions } = deserialize(JSON.parse(JSON.stringify(doc)));
  assert.equal(samples.length, doc.meta.afterstates);
  assert.equal(decisions.length, doc.meta.decisions);
  // 첫 표본 대조
  const g0 = games.find((g) => g.decisions.length > 0);
  const d0 = g0.decisions[0], c0 = d0.candidates[0];
  const s0 = samples.find((s) => s.gameId === g0.id);
  assert.deepEqual(Array.from(s0.board), Array.from(c0.board));
  assert.ok(Math.abs(s0.score - c0.score) < 1e-6);
  assert.deepEqual(s0.features, c0.features);
  assert.equal(s0.chosen, c0.action === d0.chosen);
  // 게임 단위 분할: 같은 게임의 표본은 한 분할에만
  const part = new Map(); for (const p of ['train', 'val', 'test']) for (const id of split[p]) part.set(id, p);
  for (const s of samples) assert.ok(part.has(s.gameId));
  // 결정마다 교사 선택이 후보 중 최고점
  for (const d of decisions) { const best = Math.max(...d.samples.map((i) => samples[i].score)); const ch = d.samples.find((i) => samples[i].chosen); assert.ok(Math.abs(samples[ch].score - best) < 1e-6); }
});

// ---------- 리드아웃 ----------

test('MLP backprop matches central-difference numerical gradients', () => {
  const d = 5, h = 4, m = 2;
  const net = createMLP(d, h, m, 3);
  const rng = createRng(4);
  const X = Array.from({ length: 3 }, () => Float64Array.from({ length: d }, () => rng.uniform(-1, 1)));
  const T = Array.from({ length: 3 }, () => Float64Array.from({ length: m }, () => rng.uniform(-1, 1)));
  const grad = new Float64Array(net.theta.length);
  const loss = mlpBackward(net, X, T, grad);
  const lossAt = () => { let s = 0; for (let b = 0; b < X.length; b++) { const { y } = mlpForward(net, X[b]); for (let c = 0; c < m; c++) s += 0.5 * (y[c] - T[b][c]) ** 2 / X.length; } return s; };
  assert.ok(Math.abs(lossAt() - loss) < 1e-12);
  const eps = 1e-6;
  let maxRel = 0;
  for (let p = 0; p < net.theta.length; p++) {
    const orig = net.theta[p];
    net.theta[p] = orig + eps; const lp = lossAt();
    net.theta[p] = orig - eps; const lm = lossAt();
    net.theta[p] = orig;
    const num = (lp - lm) / (2 * eps);
    const rel = Math.abs(num - grad[p]) / Math.max(1e-8, Math.abs(num) + Math.abs(grad[p]));
    maxRel = Math.max(maxRel, rel);
    assert.ok(Math.abs(num - grad[p]) < 1e-6, `param ${p}: numeric ${num} vs analytic ${grad[p]}`);
  }
  assert.ok(maxRel < 1e-5, `max relative error ${maxRel}`);
});

test('readouts fit a synthetic afterstate value: ridge (linear), quadratic (captures a product term), MLP (nonlinear); JSON round-trip', () => {
  const rng = createRng(6);
  const d = 8;
  const gen = (n) => Array.from({ length: n }, () => Float64Array.from({ length: d }, () => rng.uniform(-2, 2)));
  const fLin = (x) => 3 * x[0] - 2 * x[1] + 0.5 * x[2];
  const fNonlin = (x) => fLin(x) + 2 * x[0] * x[1] + Math.abs(x[3]);
  const Xtr = gen(1500), Xva = gen(300), Xte = gen(300);
  const Ylin = (X) => X.map((x) => Float64Array.from([fLin(x)])), Ynl = (X) => X.map((x) => Float64Array.from([fNonlin(x)]));
  const score = (model, X, Y) => r2(Y.map((y) => y[0]), X.map((x) => model.predict(x)[0]));
  const r1 = trainRidge(Xtr, Ylin(Xtr), Xva, Ylin(Xva));
  assert.ok(score(r1, Xte, Ylin(Xte)) > 0.999, 'ridge on linear target');
  const r1n = trainRidge(Xtr, Ynl(Xtr), Xva, Ynl(Xva));
  const r2q = trainQuadratic(Xtr, Ynl(Xtr), Xva, Ynl(Xva));
  const r3 = trainMLP(Xtr, Ynl(Xtr), Xva, Ynl(Xva), { seed: 1, maxEpochs: 60, patience: 8 });
  const sLin = score(r1n, Xte, Ynl(Xte)), sQuad = score(r2q, Xte, Ynl(Xte)), sMlp = score(r3, Xte, Ynl(Xte));
  assert.ok(sQuad > sLin + 0.05, `quadratic ${sQuad} > linear ${sLin}`);
  assert.ok(sMlp > sLin + 0.05, `mlp ${sMlp} > linear ${sLin}`);
  assert.ok(r3.info.bestEpoch >= 1 && r3.info.epochs <= 60);
  for (const model of [r1n, r2q, r3]) {
    const p = readoutFromJSON(JSON.parse(JSON.stringify(model.toJSON())));
    for (let i = 0; i < 5; i++) assert.ok(Math.abs(p(Xte[i])[0] - model.predict(Xte[i])[0]) < 1e-9, `${model.kind} round-trip`);
  }
  assert.equal(quadraticMap(Float64Array.from([1, 2, 3]), [0, 2]).length, 3 + 3 + 1);
  assert.deepEqual(Array.from(quadraticMap(Float64Array.from([1, 2, 3]), [0, 2])), [1, 2, 3, 1, 4, 9, 3]);
  assert.equal(valueOf('V1', [4.5], []), 4.5);
  assert.equal(valueOf('V2', [1, 1, 0, 0, 0, 0], FEATURE_WEIGHTS), FEATURE_WEIGHTS[0] + FEATURE_WEIGHTS[1]);
});

// ---------- 지표 ----------

test('metrics: kendall tau-b, r2, bootstrap CI, regressionMetrics, activitySummary', () => {
  assert.equal(kendallTau([1, 2, 3, 4], [1, 2, 3, 4]), 1);
  assert.equal(kendallTau([1, 2, 3, 4], [4, 3, 2, 1]), -1);
  assert.ok(Math.abs(kendallTau([1, 2, 3, 4], [1, 3, 2, 4]) - 4 / 6) < 1e-12);
  assert.ok(Math.abs(kendallTau([1, 1, 2, 3], [1, 2, 3, 4]) - 5 / Math.sqrt(5 * 6)) < 1e-12, 'tau-b with a tie in a');
  assert.equal(kendallTau([1, 1, 1], [1, 2, 3]), 0);
  assert.equal(r2([1, 2, 3], [1, 2, 3]), 1);
  assert.ok(Math.abs(r2([1, 2, 3], [2, 2, 2])) < 1e-12);
  const ci = bootstrapCI([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (s) => s.reduce((a, b) => a + b, 0) / s.length, { n: 500, seed: 1 });
  assert.ok(ci[0] < 5.5 && ci[1] > 5.5 && ci[0] > 3 && ci[1] < 8, JSON.stringify(ci));
  assert.ok(ciOverlap([0, 1], [0.5, 2]) && !ciOverlap([0, 1], [1.5, 2]));
  const decs = [
    { trueValues: [1, 2, 3], predValues: [1.1, 1.9, 3.2], chosenIdx: 2 },
    { trueValues: [5, 4], predValues: [4, 5], chosenIdx: 0 },
  ];
  const m = regressionMetrics(decs, { seed: 1 });
  assert.ok(Math.abs(m.r2 - (1 - 2.06 / 10)) < 1e-12); // yTrue [1,2,3,5,4] vs yPred [1.1,1.9,3.2,4,5]
  assert.ok(Math.abs(m.tau - (1 + -1) / 2) < 1e-12);
  assert.equal(m.top1, 0.5);
  assert.equal(m.decisions, 2);
  const counts = new Uint16Array(10); counts[0] = 10; counts[7] = 2; counts[9] = 1;
  const a = activitySummary(counts, 10, 7, 50);
  const expect = [13, 2, 13 / 10 * 20, 0, 10 / 13];
  a.forEach((v, i) => assert.ok(Math.abs(v - expect[i]) < 1e-6, `activity[${i}]`)); // Float32
});
