import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { parseConnectome } from '../src/connectome.js';
import { apportion, buildSummary, recordEpisode, subsampleGraph } from '../src/viz.js';
import { readoutFromJSON, valueOf } from '../src/readout.js';
import { FEATURE_WEIGHTS, unpackBoard } from '../src/afterstate.js';
import { ciOverlap } from '../src/evaluate.js';
import { createFeaturizer } from '../src/play.js';

const ROOT = new URL('../', import.meta.url);
const read = (p) => JSON.parse(readFileSync(new URL(p, ROOT), 'utf8'));
const connectome = parseConnectome(readFileSync(new URL('data/connectome.json', ROOT), 'utf8'));

test('apportion: largest-remainder allocation sums to total and never exceeds stratum size', () => {
  assert.deepEqual(apportion([10, 10, 10], 30), [10, 10, 10]);
  assert.deepEqual(apportion([7, 2, 1], 5), [4, 1, 0]); // quotas 3.5, 1, 0.5 → floors 3,1,0 → 1 left → remainder 0.5 tie (index 0, 2) → lower index
  const a = apportion([600, 300, 100, 3], 250);
  assert.equal(a.reduce((s, v) => s + v, 0), 250);
  assert.ok(a.every((v, i) => v <= [600, 300, 100, 3][i]));
});

test('subsample preserves the hidden-layer ROI distribution and the KC share; output layer complete; edges only among sampled nodes; coordinates in [-1, 1]', () => {
  const g = subsampleGraph(connectome, { input: 200, hidden: 600, maxEdges: 30000, seed: 6 });
  assert.deepEqual(g.meta.counts, { ...g.meta.counts, input: 200, hidden: 600, output: 107 });
  const full = g.meta.roiShareHiddenFull, samp = g.meta.roiShareHiddenSampled;
  for (const roi of Object.keys(full)) {
    const diff = Math.abs((samp[roi] ?? 0) - full[roi]);
    assert.ok(diff <= 1 / 600 + 1e-9, `ROI ${roi}: full ${full[roi]} vs sampled ${samp[roi] ?? 0}`); // 최대 잔여 배분: 층당 오차 ≤ 1 개
  }
  assert.ok(Math.abs(g.meta.kcShareHiddenSampled - g.meta.kcShareHiddenFull) < 0.005);
  const outputs = connectome.neurons.filter((n) => n.layer === 'output').map((n) => n.id).sort();
  assert.deepEqual(g.nodes.filter((n) => n.layer === 'output').map((n) => n.id).sort(), outputs);
  const n = g.nodes.length;
  for (const [a, b, w] of g.edges) { assert.ok(a >= 0 && a < n && b >= 0 && b < n && a !== b && w >= 3); }
  // 간선 가중치는 원본과 일치
  const orig = new Map(connectome.edges.map(([a, b, w]) => [`${a}>${b}`, w]));
  for (const [a, b, w] of g.edges.slice(0, 200)) assert.equal(orig.get(`${g.nodes[a].i}>${g.nodes[b].i}`), w);
  for (const node of g.nodes) for (const v of node.xyz) assert.ok(v >= -1.0001 && v <= 1.0001);
  // soma 가 있는 뉴런의 좌표는 정규화 규칙과 일치
  const withSoma = g.nodes.find((nd) => connectome.neurons[nd.i].soma);
  const s = connectome.neurons[withSoma.i].soma, c = g.meta.coordinates;
  for (let k = 0; k < 3; k++) assert.ok(Math.abs(withSoma.xyz[k] - (s[k] - c.centerVoxels[k]) * c.scale) < 1e-3);
  // 결정적
  assert.deepEqual(subsampleGraph(connectome, { seed: 6 }).nodes.map((x) => x.i), g.nodes.map((x) => x.i));
});

test('recordEpisode: candidate values equal the readout recomputed from the stored DN counts; chosen = argmax; boards consistent', { skip: !existsSync(new URL('data/results.json', ROOT)) }, () => {
  const results = read('data/results.json');
  const spectral = read('data/spectral.json');
  const c0 = results.conditions.C0;
  const { gap, g, ...params } = c0.params;
  const op = results.config.operating;
  const readout = c0.readouts['R3:V2'].readout;
  const sampled = [0, 1, 2, 5000, 7999];
  const ep = recordEpisode(connectome, spectral, params, { T: op.T, gIn: op.gIn, readout, target: 'V2', seed: 100, cap: 3, sampledIndices: sampled });
  assert.ok(ep.decisions.length >= 1 && ep.decisions.length <= 3);
  const predict = readoutFromJSON(readout);
  const f = createFeaturizer(connectome, params, spectral, { T: op.T, gIn: op.gIn });
  for (const d of ep.decisions) {
    let best = 0;
    d.candidates.forEach((c, k) => {
      const dn = Float32Array.from(c.dnCounts, (v) => v * (1000 / op.T));
      const v = valueOf('V2', predict(dn), FEATURE_WEIGHTS);
      assert.ok(Math.abs(v - c.value) < 1e-6, `value recomputed ${v} vs stored ${c.value}`);
      if (c.value > d.candidates[best].value || (c.value === d.candidates[best].value && c.action < d.candidates[best].action)) best = k;
      // DN 발화 수는 리저버 재실행과 일치
      const r = f.featurizeBoth(unpackBoard(c.board));
      assert.deepEqual(Array.from(r.counts.subarray(f.reservoir.outputStart)), c.dnCounts);
    });
    assert.equal(d.chosen, best);
    assert.equal(d.spikes.length, op.T);
    assert.equal(d.layerCounts.length, op.T);
    for (const step of d.spikes) for (const k of step) assert.ok(k >= 0 && k < sampled.length);
    // 층별 발화 수 합 = 창 총 발화 수 (선택 후보)
    const total = d.layerCounts.reduce((s, [a, b, c]) => s + a + b + c, 0);
    const r = f.featurizeBoth(unpackBoard(d.candidates[d.chosen].board));
    assert.equal(total, r.counts.reduce((s, v) => s + v, 0));
  }
});

test('buildSummary: numbers match the source files (R², τ, CI, play, rho_unit, search counts) and CI-overlap flags agree with ciOverlap', { skip: !existsSync(new URL('data/results.json', ROOT)) }, () => {
  const results = read('data/results.json'), search = read('data/separation-search.json'), spectral = read('data/spectral.json');
  const s = buildSummary(results, search, spectral);
  const row = (k) => s.conditions.find((r) => r.key === k);
  const c0 = results.conditions.C0.readouts['R3:V2'].metrics;
  assert.equal(row('C0').regression.r2, c0.r2);
  assert.deepEqual(row('C0').regression.tauCI, c0.tauCI);
  assert.equal(row('C0').play.linesMedian, results.conditions.C0.play['R3:V2'].metrics.linesMedian);
  assert.equal(row('C0').rhoUnit.alpha05, results.conditions.C0.spectral.rhoUnit['0.5']);
  assert.equal(row('C1s0').region, 'none');
  assert.equal(row('C1s0').regression, null);
  for (const k of ['C2s0', 'C3s1', 'C5']) {
    const m = results.conditions[k].readouts['R3:V2'].metrics;
    assert.equal(row(k).overlapsC0.r2, ciOverlap(m.r2CI, c0.r2CI));
    assert.equal(row(k).overlapsC0.tau, ciOverlap(m.tauCI, c0.tauCI));
  }
  assert.equal(s.search.stage3Pass, search.counts.stage3Pass);
  assert.equal(s.search.allPass, search.counts.allPass);
  assert.equal(s.search.selected.rhoTarget, search.selected.rhoTarget);
  assert.equal(s.search.points.length, search.points.length);
  assert.equal(s.spectralC0.alpha05, spectral['0.5'].rhoUnit);
  assert.equal(s.baselines.teacher.linesMedian, results.baselines.teacher.metrics.linesMedian);
  const binN = s.search.bins.rho.reduce((a, b) => a + b.n, 0);
  assert.equal(binN, search.points.filter((p) => p.separation || p.separationProfileOnly).length);
});
