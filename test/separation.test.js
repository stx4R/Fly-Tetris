import { test } from 'node:test';
import assert from 'node:assert/strict';
import { separationFromCounts, withinKendall, measureSeparation } from '../src/separation.js';
import { createReservoir, WINDOW } from '../src/reservoir.js';
import { computeSpectral } from '../src/spectral.js';
import { createFeaturizer } from '../src/play.js';
import { ceilingAt } from '../src/calibration.js';
import { createRng } from '../src/prng.js';

const neuron = (id, type, layer, roi) => ({ id, type, layer, instance: type, soma: null, isKC: false, isAllowlisted: false, roi });
function smallConnectome() {
  const neurons = [
    neuron(10, 'LC4', 'input', 'A'), neuron(11, 'LC4', 'input', 'B'),
    neuron(20, 'A', 'hidden', 'A'), neuron(21, 'B', 'hidden', 'A'), neuron(22, 'C', 'hidden', 'B'),
    neuron(30, 'DNp04', 'output', null), neuron(31, 'DNp02', 'output', 'A'),
  ];
  const edges = [[0, 2, 10], [0, 3, 5], [1, 3, 5], [1, 4, 20], [2, 5, 8], [3, 5, 4], [3, 6, 6], [4, 6, 2], [4, 2, 3], [2, 4, 3], [5, 2, 1], [0, 5, 7], [4, 5, 2]];
  return { meta: {}, neurons, edges };
}

test('separationFromCounts matches a hand-calculated case (distinctFrac, meanDNDiff, per-layer propagation profile)', () => {
  // N = 6: input 0,1 / hidden 2,3 / output 4,5. 결정 A: 후보 3개, 결정 B: 후보 2개
  const dims = { N: 6, nInput: 2, outputStart: 4 };
  const A = [Uint16Array.from([1, 0, 2, 2, 3, 0]), Uint16Array.from([1, 1, 2, 2, 3, 0]), Uint16Array.from([0, 0, 2, 5, 3, 1])];
  const B = [Uint16Array.from([0, 0, 0, 0, 1, 1]), Uint16Array.from([0, 0, 0, 0, 1, 1])];
  const s = separationFromCounts([A, B], dims);
  // A 의 DN 벡터: [3,0], [3,0], [3,1] → 2 distinct / 3; B: [1,1], [1,1] → 1 / 2 → 평균 (2/3 + 1/2) / 2
  assert.ok(Math.abs(s.distinctFrac - (2 / 3 + 1 / 2) / 2) < 1e-12);
  // 쌍: A01 (input 1 다름, hidden 0, DN 0), A02 (input 1, hidden 1, DN 1), A12 (input 2, hidden 1, DN 1), B01 (0,0,0) → 4 쌍
  assert.equal(s.pairs, 4);
  assert.ok(Math.abs(s.meanDNDiff - (0 + 1 + 1 + 0) / 4) < 1e-12);
  assert.deepEqual(s.profile, { input: (1 + 1 + 2 + 0) / 4, hidden: (0 + 1 + 1 + 0) / 4, output: (0 + 1 + 1 + 0) / 4 });
  assert.deepEqual(s.layerSizes, { input: 2, hidden: 2, output: 2 });
  assert.equal(s.decisions, 2);
  const empty = separationFromCounts([], dims);
  assert.equal(empty.distinctFrac, 0); assert.equal(empty.meanDNDiff, 0);
});

test('propagation profile from a real reservoir run agrees with a per-neuron layer classification', () => {
  const c = smallConnectome();
  const spectral = computeSpectral(c, { tol: 1e-10, maxIter: 5000 });
  const res = createReservoir(c, { rhoTarget: 3, alpha: 0.5, b: 0.3 }, { spectral });
  const drive = (a, b) => { const v = new Float32Array(7); v[0] = a; v[1] = b; return v; };
  const run = (v) => { res.reset(); return res.run(v, 60).counts; };
  const cands = [run(drive(0.4, 0.3)), run(drive(0.3, 0.4)), run(drive(0.45, 0.45))];
  const s = separationFromCounts([cands], { N: 7, nInput: 2, outputStart: 5 });
  // 층 분류로 직접 센 값과 대조
  const layer = c.neurons.map((n) => n.layer);
  const prof = { input: 0, hidden: 0, output: 0 };
  let pairs = 0;
  for (let a = 0; a < 3; a++) for (let b = a + 1; b < 3; b++) { pairs++; for (let i = 0; i < 7; i++) if (cands[a][i] !== cands[b][i]) prof[layer[i]]++; }
  assert.deepEqual(s.profile, { input: prof.input / pairs, hidden: prof.hidden / pairs, output: prof.output / pairs });
  assert.ok(s.profile.input + s.profile.hidden + s.profile.output > 0, 'the drives differ enough to change some counts');
  assert.ok(Math.abs(s.meanDNDiff - s.profile.output) < 1e-12, 'meanDNDiff is the output-layer entry of the profile');
});

test('T axis: reservoir is deterministic at every window length and 100 steps equals two consecutive 50-step runs', () => {
  const c = smallConnectome();
  const spectral = computeSpectral(c, { tol: 1e-10, maxIter: 5000 });
  const p = { rhoTarget: 3, alpha: 1, b: 0.5, kGlobal: 0.5 };
  const iExt = new Float32Array(7); iExt[0] = 0.35; iExt[1] = 0.45;
  for (const T of [25, 50, 100]) {
    const a = createReservoir(c, p, { spectral }), b = createReservoir(c, p, { spectral });
    assert.deepEqual(Array.from(a.run(iExt, T).counts), Array.from(b.run(iExt, T).counts), `T=${T} deterministic`);
    assert.deepEqual(Array.from(a.voltage()), Array.from(b.voltage()));
  }
  const one = createReservoir(c, p, { spectral }), two = createReservoir(c, p, { spectral });
  const c100 = one.run(iExt, 100).counts;
  const c50a = two.run(iExt, 50).counts, c50b = two.run(iExt, 50).counts;
  for (let i = 0; i < 7; i++) assert.equal(c100[i], c50a[i] + c50b[i]);
  assert.deepEqual(Array.from(one.voltage()), Array.from(two.voltage()));
  assert.deepEqual(Array.from(one.adaptation()), Array.from(two.adaptation()));
  // featurizer 의 T·gIn: 두 인스턴스가 같은 결과, T 에 따라 Hz 환산이 맞다
  const f1 = createFeaturizer(c, p, spectral, { T: 25, gIn: 0.3 }), f2 = createFeaturizer(c, p, spectral, { T: 25, gIn: 0.3 });
  const board = new Uint8Array(200).fill(1, 150);
  assert.deepEqual(Array.from(f1.featurize(board)), Array.from(f2.featurize(board)));
  assert.equal(f1.T, 25); assert.equal(f1.encoder.gIn, 0.3);
  const r = f1.featurizeBoth(board);
  for (let i = 0; i < 2; i++) assert.equal(r.dn[i], r.counts[5 + i] * (1000 / 25));
  assert.equal(ceilingAt(25), 8); assert.equal(ceilingAt(50), 15); assert.equal(ceilingAt(100), 30);
});

test('withinKendall: perfectly informative DN vectors give τ ≈ 1, uninformative give ≈ 0; measureSeparation wires it up', () => {
  const rng = createRng(3);
  const mk = (n, informative) => Array.from({ length: n }, () => {
    const k = 6 + rng.int(6);
    const scores = Array.from({ length: k }, () => rng.uniform(-30, 30));
    const X = scores.map((s) => Float32Array.from({ length: 5 }, (_, j) => (informative ? (j === 0 ? s : rng.next()) : rng.next())));
    return { X, scores };
  });
  const good = withinKendall(mk(40, true), mk(20, true));
  assert.ok(good.tau > 0.95, `informative τ ${good.tau}`);
  const bad = withinKendall(mk(40, false), mk(20, false));
  assert.ok(Math.abs(bad.tau) < 0.25, `uninformative τ ${bad.tau}`);
  // measureSeparation: featurizeBoth 를 흉내 내는 함수로 (보드 → counts/dn)
  const dims = { N: 6, nInput: 2, outputStart: 4 };
  const fake = (board) => { const counts = Uint16Array.from([board[0], board[1], board[2], board[3], board[4], board[5]]); return { counts, dn: Float32Array.from([board[4], board[5]]) }; };
  const dec = [{ boards: [[1, 0, 0, 0, 3, 0], [1, 1, 0, 0, 3, 1], [0, 0, 1, 0, 3, 1]], scores: [1, 2, 3] }];
  const s = measureSeparation(fake, dec, dims, { trainDecisions: [dec[0], dec[0], dec[0], dec[0], dec[0]] });
  assert.ok(Math.abs(s.distinctFrac - 2 / 3) < 1e-12);
  assert.ok('withinKendall' in s);
});
