import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LIF, buildCSR, createReservoir } from '../src/reservoir.js';
import { createDecoder, decoderFromJSON } from '../src/decode.js';
import { effectiveRank, meanPairwiseCosineDistance, spikeStats } from '../src/metrics.js';

// 소형 커넥톰: input 0,1 / hidden 2,3,4 / output 5,6
const neuron = (id, type, layer) => ({ id, type, layer, instance: type, soma: null, isKC: false, isAllowlisted: false });
function smallConnectome() {
  const neurons = [
    neuron(10, 'LC4', 'input'), neuron(11, 'LC4', 'input'),
    neuron(20, 'A', 'hidden'), neuron(21, 'B', 'hidden'), neuron(22, 'C', 'hidden'),
    neuron(30, 'DNp04', 'output'), neuron(31, 'DNp02', 'output'),
  ];
  const edges = [
    [0, 2, 10], [0, 3, 5], [1, 3, 5], [1, 4, 20],
    [2, 5, 8], [3, 5, 4], [3, 6, 6], [4, 6, 2], [4, 2, 3], [2, 4, 3],
    [5, 2, 1], [0, 5, 7],
  ];
  return {
    meta: { dataset: 'test', extractedAt: '2026-01-01T00:00:00Z', nodeCount: 7, edgeCount: edges.length, layerSizes: { input: 2, hidden: 3, output: 2 }, weightThreshold: 1, outputAllowlisted: [], kcCount: 0 },
    neurons, edges,
  };
}

test('buildCSR matches a dense adjacency built directly from the edge list', () => {
  const c = smallConnectome();
  const g = 0.7;
  const N = c.neurons.length;
  const dense = Array.from({ length: N }, () => new Float64Array(N));
  const inW = new Float64Array(N);
  for (const [, post, w] of c.edges) inW[post] += w;
  for (const [pre, post, w] of c.edges) dense[pre][post] = g * w / Math.sqrt(inW[post]);

  const csr = buildCSR(c, g);
  assert.equal(csr.indptr[N], c.edges.length);
  for (let i = 0; i < N; i++) {
    const row = new Float64Array(N);
    for (let e = csr.indptr[i]; e < csr.indptr[i + 1]; e++) row[csr.indices[e]] += csr.data[e];
    for (let j = 0; j < N; j++) assert.ok(Math.abs(row[j] - dense[i][j]) < 1e-6, `edge ${i}->${j}`);
  }
  assert.deepEqual(Array.from(csr.inWeight), Array.from(inW));
});

test('one step matches the LIF update rule computed by hand (including 1-step synaptic delay)', () => {
  const c = smallConnectome();
  const g = 0.2;
  const res = createReservoir(c, { g, k: 0.5 });
  const iExt = new Float32Array(7);
  iExt[0] = 1.5; // 입력 뉴런 0 이 첫 스텝에 바로 발화하도록
  // 스텝 1: V0 = 0*decay + 1.5 >= 1 → 발화. 나머지 0. 억제 0 (직전 발화 없음).
  assert.equal(res.step(iExt), 1);
  assert.deepEqual(Array.from(res.pending()), [0]);
  const V = res.voltage();
  for (let i = 1; i < 7; i++) assert.equal(V[i], 0);
  // 스텝 2: 0 의 출력 간선 전파 (0→2 w10, 0→3 w5, 0→5 w7) + 억제 -0.5 * 1/7. 0 은 불응기.
  assert.equal(res.step(iExt), 0);
  const decay = Math.exp(-1 / 20);
  const inh = -0.5 / 7;
  const inW = res.csr.inWeight;
  const expect = (w, post) => Math.fround(g * w / Math.sqrt(inW[post])) * decay + inh; // CSR 가중치는 float32; 시냅스 입력은 도착 스텝에 함께 누설
  assert.ok(Math.abs(V[2] - expect(10, 2)) < 1e-12, 'V2');
  assert.ok(Math.abs(V[3] - expect(5, 3)) < 1e-12, 'V3');
  assert.ok(Math.abs(V[5] - expect(7, 5)) < 1e-12, 'V5');
  assert.ok(Math.abs(V[4] - inh) < 1e-12, 'V4 gets only inhibition');
  assert.equal(res.refractory()[0], 1);
});

test('refractory period: a neuron under constant supra-threshold drive fires every refractorySteps+1 steps', () => {
  const c = smallConnectome();
  const res = createReservoir(c, { g: 0, k: 0 });
  const iExt = new Float32Array(7);
  iExt[1] = 5; // 매 스텝 임계값을 훌쩍 넘는 전류
  const fired = [];
  for (let t = 0; t < 10; t++) { res.step(iExt); fired.push(res.pending().length ? 1 : 0); }
  // 스텝 0 발화, 1·2 불응, 3 발화, …
  assert.deepEqual(fired, [1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
  assert.equal(res.refractory()[1], 1); // 방금 발화 → 불응기
  assert.equal(res.refractory()[0], 0);
  // 이어지는 50 스텝: 10·11 불응, 12·15·…·57 발화 = 16회 (창 시작에 발화하면 최대 17회)
  const { counts } = res.run(iExt, 50);
  assert.equal(counts[1], 16);
  // 리셋 후 다시 스텝 0 에 발화
  res.reset();
  assert.equal(res.step(iExt), 1);
});

test('same seed + same input → bit-identical state; reset restores the initial state', () => {
  const c = smallConnectome();
  const iExt = new Float32Array(7);
  iExt[0] = 0.4; iExt[1] = 0.3;
  const a = createReservoir(c, { g: 2, k: 1 });
  const b = createReservoir(c, { g: 2, k: 1 });
  const ra = a.run(iExt, 200), rb = b.run(iExt, 200);
  assert.ok(ra.total > 0, 'something fired');
  assert.deepEqual(Array.from(ra.counts), Array.from(rb.counts));
  assert.deepEqual(Array.from(a.voltage()), Array.from(b.voltage()));
  a.reset();
  assert.deepEqual(Array.from(a.voltage()), new Array(7).fill(LIF.vRest));
  assert.equal(a.pending().length, 0);
  const rc = a.run(iExt, 200);
  assert.deepEqual(Array.from(rc.counts), Array.from(ra.counts), 'run after reset reproduces the first run');
});

test('global inhibition lowers activity monotonically', () => {
  const c = smallConnectome();
  const iExt = new Float32Array(7);
  iExt[0] = 0.4; iExt[1] = 0.4;
  const totals = [0, 1, 5].map((k) => createReservoir(c, { g: 2, k }).run(iExt, 300).total);
  assert.ok(totals[0] >= totals[1] && totals[1] >= totals[2], JSON.stringify(totals));
});

test('outputRates converts window counts to Hz for the output block', () => {
  const c = smallConnectome();
  const res = createReservoir(c, { g: 0, k: 0 });
  const counts = new Uint16Array(7);
  counts[5] = 3; counts[6] = 1; counts[2] = 9;
  assert.deepEqual(Array.from(res.outputRates(counts, 50)), [60, 20]);
});

test('createReservoir rejects a connectome whose neurons are not ordered input/hidden/output', () => {
  const c = smallConnectome();
  [c.neurons[0], c.neurons[2]] = [c.neurons[2], c.neurons[0]];
  assert.throws(() => createReservoir(c, { g: 1, k: 0 }), /ordered/);
});

test('decoder: seeded init is deterministic, illegal actions masked, JSON round-trip', () => {
  const d1 = createDecoder({ nOutput: 3, seed: 5 });
  const d2 = createDecoder({ nOutput: 3, seed: 5 });
  assert.deepEqual(Array.from(d1.W), Array.from(d2.W));
  assert.notDeepEqual(Array.from(createDecoder({ nOutput: 3, seed: 6 }).W), Array.from(d1.W));
  const rates = new Float32Array([20, 0, 60]);
  const legal = [{ col: 3, rot: 1 }, { col: 7, rot: 0 }];
  const pick = d1.decode(rates, legal);
  assert.ok(legal.some((p) => p.col === pick.col && p.rot === pick.rot));
  assert.equal(pick.action, pick.col * 4 + pick.rot);
  assert.equal(d1.decode(rates, []), null);
  const d3 = decoderFromJSON(JSON.parse(JSON.stringify(d1.toJSON())));
  assert.deepEqual(Array.from(d3.W), Array.from(d1.W));
  assert.deepEqual(d3.decode(rates, legal), pick);
});

test('metrics: spike stats, cosine separation, effective rank', () => {
  const s = spikeStats([Uint16Array.from([0, 1, 20, 15]), Uint16Array.from([0, 0, 0, 2])], 4, 50);
  assert.equal(s.meanRateHz, (1 + 20 + 15 + 2) / 8 / 0.05);
  assert.equal(s.activeFrac, 4 / 8);
  assert.equal(s.saturatedFrac, 1 / 8);
  assert.equal(s.ceilingFrac, 2 / 8);
  assert.equal(meanPairwiseCosineDistance([[1, 0], [0, 1], [1, 1]]).toFixed(6), ((1 + (1 - Math.SQRT1_2) * 2) / 3).toFixed(6));
  assert.equal(effectiveRank([[1, 0, 0], [0, 2, 0], [1, 2, 0]]), 2);
  assert.equal(effectiveRank([[1, 2, 3], [2, 4, 6]]), 1);
  assert.equal(effectiveRank([[0, 0], [0, 0]]), 0);
});
