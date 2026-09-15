import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LIF, SFA, buildRoiPools, createReservoir } from '../src/reservoir.js';
import { applyTranspose, buildUnitCSR, computeSpectral, rhoUnitFor, spectralRadius } from '../src/spectral.js';
import { createDecoder, decoderFromJSON } from '../src/decode.js';
import { effectiveRank, meanPairwiseCosineDistance, spikeStats, symmetricEigenvalues } from '../src/metrics.js';

// 소형 커넥톰: input 0,1 / hidden 2,3,4 / output 5,6. ROI: 0,2,3 → 'A', 1,4 → 'B', 5 → null, 6 → 'A'
const neuron = (id, type, layer, roi) => ({ id, type, layer, instance: type, soma: null, isKC: false, isAllowlisted: false, roi });
function smallConnectome() {
  const neurons = [
    neuron(10, 'LC4', 'input', 'A'), neuron(11, 'LC4', 'input', 'B'),
    neuron(20, 'A', 'hidden', 'A'), neuron(21, 'B', 'hidden', 'A'), neuron(22, 'C', 'hidden', 'B'),
    neuron(30, 'DNp04', 'output', null), neuron(31, 'DNp02', 'output', 'A'),
  ];
  const edges = [
    [0, 2, 10], [0, 3, 5], [1, 3, 5], [1, 4, 20],
    [2, 5, 8], [3, 5, 4], [3, 6, 6], [4, 6, 2], [4, 2, 3], [2, 4, 3],
    [5, 2, 1], [0, 5, 7], [4, 5, 2], // 4→5 로 3-사이클(2→4→5→2)을 만들어 재귀 핵을 비주기적으로 (거듭제곱법 수렴 조건)
  ];
  return {
    meta: {
      dataset: 'test', extractedAt: '2026-01-01T00:00:00Z', nodeCount: 7, edgeCount: edges.length,
      layerSizes: { input: 2, hidden: 3, output: 2 }, weightThreshold: 1, outputAllowlisted: [], kcCount: 0,
      roiCounts: { A: 4, B: 2, null: 1 },
    },
    neurons, edges,
  };
}
const spectralFor = (c) => computeSpectral(c, { tol: 1e-10, maxIter: 5000 });

// 밀집 행렬 유틸 (테스트 전용)
const matVec = (A, n, x) => Float64Array.from({ length: n }, (_, i) => { let s = 0; for (let j = 0; j < n; j++) s += A[i * n + j] * x[j]; return s; });

// ---------- 스펙트럼 ----------

test('buildUnitCSR matches a dense adjacency built directly from the edge list (alpha 0.5 and 1.0)', () => {
  const c = smallConnectome();
  const N = c.neurons.length;
  const inW = new Float64Array(N);
  for (const [, post, w] of c.edges) inW[post] += w;
  for (const alpha of [0.5, 1.0]) {
    const dense = Array.from({ length: N }, () => new Float64Array(N));
    for (const [pre, post, w] of c.edges) dense[pre][post] = w / inW[post] ** alpha;
    const csr = buildUnitCSR(c, alpha);
    assert.equal(csr.indptr[N], c.edges.length);
    for (let i = 0; i < N; i++) {
      const row = new Float64Array(N);
      for (let e = csr.indptr[i]; e < csr.indptr[i + 1]; e++) row[csr.indices[e]] += csr.data[e];
      for (let j = 0; j < N; j++) assert.ok(Math.abs(row[j] - dense[i][j]) < 1e-12, `alpha ${alpha} edge ${i}->${j}`);
    }
    assert.deepEqual(Array.from(csr.inWeight), Array.from(inW));
  }
});

test('power iteration reproduces the dominant eigenvalue of a symmetric matrix (Jacobi) and of a triangular matrix', () => {
  // 대칭 비음수 행렬 → Jacobi 고유값과 대조
  const n = 6;
  const S = new Float64Array(n * n);
  const vals = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6];
  let k = 0;
  for (let i = 0; i < n; i++) for (let j = i; j < n; j++) { S[i * n + j] = vals[k]; S[j * n + i] = vals[k]; k++; }
  const edgesS = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (i !== j && S[i * n + j] > 0) edgesS.push([i, j, S[i * n + j]]);
  // alpha = 0 → 단위 CSR 이 원 행렬 그대로 (대각 원소는 self-loop 라 CSR 에 못 넣으므로 대각 0 인 행렬을 쓴다)
  for (let i = 0; i < n; i++) S[i * n + i] = 0;
  const csr = buildUnitCSR({ neurons: Array.from({ length: n }, () => ({})), edges: edgesS }, 0);
  const r = spectralRadius(csr, { tol: 1e-12, maxIter: 10000 });
  const jacobi = symmetricEigenvalues(S, n);
  const expected = Math.max(...Array.from(jacobi).map(Math.abs));
  assert.ok(r.converged, 'converged');
  assert.ok(Math.abs(r.rho - expected) < 1e-8, `${r.rho} vs ${expected}`);
  // applyTranspose 가 실제로 Aᵀx 인지: 대칭이라 Ax 와 같다
  const x = Float64Array.from({ length: n }, (_, i) => i + 1), y = new Float64Array(n);
  applyTranspose(csr, x, y);
  const y2 = matVec(S, n, x);
  for (let i = 0; i < n; i++) assert.ok(Math.abs(y[i] - y2[i]) < 1e-12);

  // 상삼각(비대칭) 행렬: 고유값 = 대각 → 하지만 CSR 은 self-loop 를 못 담으므로 블록 구조로 대신한다:
  // 두 개의 분리된 2-사이클 {0↔1 (w 2,8)}, {2↔3 (w 3,3)} → 고유값 ±4, ±3 → rho = 4
  const csr2 = buildUnitCSR({ neurons: [{}, {}, {}, {}], edges: [[0, 1, 2], [1, 0, 8], [2, 3, 3], [3, 2, 3]] }, 0);
  const r2 = spectralRadius(csr2, { tol: 1e-12, maxIter: 10000 });
  // 2-사이클은 주기적이라 거듭제곱법이 진동한다: 수렴 실패를 명시해야 하고, Rayleigh 이동 평균은 ±4 사이라 부정확할 수 있다
  assert.equal(r2.converged, false);
  assert.ok(r2.note.includes('did not converge'));
});

test('spectral radius of the small connectome: matches dense power iteration, alpha=1 gives rho ≤ 1', () => {
  const c = smallConnectome();
  const N = c.neurons.length;
  for (const alpha of [0.5, 1.0]) {
    const csr = buildUnitCSR(c, alpha);
    const r = spectralRadius(csr, { tol: 1e-12, maxIter: 10000 });
    assert.ok(r.converged, `alpha ${alpha} converged`);
    // 밀집 Aᵀ 로 독립 거듭제곱법
    const A = new Float64Array(N * N);
    for (let j = 0; j < N; j++) for (let e = csr.indptr[j]; e < csr.indptr[j + 1]; e++) A[csr.indices[e] * N + j] = csr.data[e];
    let x = new Float64Array(N).fill(1), lam = 0;
    for (let it = 0; it < 5000; it++) { const y = matVec(A, N, x); lam = Math.hypot(...y); x = y.map((v) => v / lam); }
    assert.ok(Math.abs(r.rho - lam) < 1e-8, `alpha ${alpha}: ${r.rho} vs dense ${lam}`);
    if (alpha === 1) assert.ok(r.rho <= 1 + 1e-12, 'column sums are 1 → rho ≤ 1');
  }
  const sp = spectralFor(c);
  assert.equal(rhoUnitFor(sp, 0.5), sp['0.5'].rhoUnit);
  assert.throws(() => rhoUnitFor(sp, 0.7), /no rhoUnit/);
});

// ---------- LIF ----------

test('createReservoir derives g from rhoTarget / rho_unit and refuses a direct g', () => {
  const c = smallConnectome();
  const spectral = spectralFor(c);
  const res = createReservoir(c, { rhoTarget: 0.9, alpha: 0.5 }, { spectral });
  assert.ok(Math.abs(res.g - 0.9 / spectral['0.5'].rhoUnit) < 1e-15);
  assert.throws(() => createReservoir(c, { rhoTarget: 1, alpha: 0.5, g: 0.1 }, { spectral }), /cannot be given directly/);
  assert.throws(() => createReservoir(c, { rhoTarget: 1, alpha: 0.5 }), /spectral/);
  assert.throws(() => createReservoir(c, { rhoTarget: 1, alpha: 0.5, b: -1 }, { spectral }), /b must be/);
});

test('one step matches the LIF update rule computed by hand (synaptic delay, global + local inhibition, null-ROI neuron)', () => {
  const c = smallConnectome();
  const spectral = spectralFor(c);
  const res = createReservoir(c, { rhoTarget: 0.2 * spectral['0.5'].rhoUnit, alpha: 0.5, kGlobal: 0.5, kLocal: 0.3 }, { spectral });
  const g = res.g;
  assert.ok(Math.abs(g - 0.2) < 1e-12);
  const iExt = new Float32Array(7);
  iExt[0] = 1.5; // 입력 뉴런 0 (ROI A) 이 첫 스텝에 바로 발화하도록
  assert.equal(res.step(iExt), 1);
  assert.deepEqual(Array.from(res.pending()), [0]);
  const V = res.voltage();
  for (let i = 1; i < 7; i++) assert.equal(V[i], 0);
  // 스텝 2: 0 의 출력 간선 전파 (0→2 w10, 0→3 w5, 0→5 w7). 억제: 전역 -0.5·1/7, 지역 A(4개 중 1 발화) -0.3·1/4, B 0, null 0
  assert.equal(res.step(iExt), 0);
  const decay = Math.exp(-1 / 20);
  const inhG = -0.5 / 7, inhA = -0.3 / 4;
  const inW = res.csr.inWeight;
  const syn = (w, post) => g * w / Math.sqrt(inW[post]);
  const close = (a, b, msg) => assert.ok(Math.abs(a - b) < 1e-12, `${msg}: ${a} vs ${b}`);
  close(V[2], syn(10, 2) * decay + inhG + inhA, 'V2 (ROI A)');
  close(V[3], syn(5, 3) * decay + inhG + inhA, 'V3 (ROI A)');
  close(V[5], syn(7, 5) * decay + inhG, 'V5 (roi null → global only)');
  close(V[4], inhG, 'V4 (ROI B, no B spikes → global only)');
  close(V[6], inhG + inhA, 'V6 (ROI A, no input)');
  close(V[1], iExt[1] + inhG, 'V1 (ROI B)');
  assert.equal(res.refractory()[0], 1);
});

test('refractory period: a neuron under constant supra-threshold drive fires every refractorySteps+1 steps', () => {
  const c = smallConnectome();
  const res = createReservoir(c, { rhoTarget: 0, alpha: 0.5 }, { spectral: spectralFor(c) });
  const iExt = new Float32Array(7);
  iExt[1] = 5; // 매 스텝 임계값을 훌쩍 넘는 전류
  const fired = [];
  for (let t = 0; t < 10; t++) { res.step(iExt); fired.push(res.pending().length ? 1 : 0); }
  assert.deepEqual(fired, [1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
  assert.equal(res.refractory()[1], 1);
  assert.equal(res.refractory()[0], 0);
  const { counts } = res.run(iExt, 50);
  assert.equal(counts[1], 16);
  res.reset();
  assert.equal(res.step(iExt), 1);
});

test('same params + same input → bit-identical state; reset restores the initial state; runGap("full") resets', () => {
  const c = smallConnectome();
  const spectral = spectralFor(c);
  const iExt = new Float32Array(7);
  iExt[0] = 0.4; iExt[1] = 0.3;
  const p = { rhoTarget: 3, alpha: 0.5, kGlobal: 1, kLocal: 0.5, b: 0.4 };
  const a = createReservoir(c, p, { spectral });
  const b = createReservoir(c, p, { spectral });
  const ra = a.run(iExt, 200), rb = b.run(iExt, 200);
  assert.ok(ra.total > 0, 'something fired');
  assert.deepEqual(Array.from(ra.counts), Array.from(rb.counts));
  assert.deepEqual(Array.from(a.voltage()), Array.from(b.voltage()));
  assert.deepEqual(Array.from(a.adaptation()), Array.from(b.adaptation()));
  a.reset();
  assert.deepEqual(Array.from(a.voltage()), new Array(7).fill(LIF.vRest));
  assert.deepEqual(Array.from(a.adaptation()), new Array(7).fill(0));
  assert.equal(a.adaptCount(), 0);
  assert.equal(a.pending().length, 0);
  const rc = a.run(iExt, 200);
  assert.deepEqual(Array.from(rc.counts), Array.from(ra.counts), 'run after reset reproduces the first run');
  b.runGap('full');
  assert.deepEqual(Array.from(b.run(iExt, 200).counts), Array.from(ra.counts));
  // gap 25: 외부 입력 0 으로 25 스텝 → 상태가 달라진다 (감쇠)
  const d = createReservoir(c, p, { spectral });
  d.run(iExt, 200);
  const before = Array.from(d.voltage());
  d.runGap(25);
  assert.notDeepEqual(Array.from(d.voltage()), before);
});

test('global and local inhibition lower activity monotonically; SFA lowers activity monotonically', () => {
  const c = smallConnectome();
  const spectral = spectralFor(c);
  const iExt = new Float32Array(7);
  iExt[0] = 0.4; iExt[1] = 0.4;
  const total = (p) => createReservoir(c, { rhoTarget: 3, alpha: 0.5, ...p }, { spectral }).run(iExt, 300).total;
  const kg = [0, 1, 5].map((kGlobal) => total({ kGlobal }));
  assert.ok(kg[0] >= kg[1] && kg[1] >= kg[2], `global ${JSON.stringify(kg)}`);
  const kl = [0, 1, 5].map((kLocal) => total({ kLocal }));
  assert.ok(kl[0] >= kl[1] && kl[1] >= kl[2], `local ${JSON.stringify(kl)}`);
  const bs = [0, 0.5, 2].map((b) => total({ b }));
  assert.ok(bs[0] > bs[1] && bs[1] >= bs[2], `sfa ${JSON.stringify(bs)}`);
});

// naive 참조 구현: 모든 뉴런을 매 스텝 순회, 불응기 카운터 배열, a 배열 전체를 매 스텝 감쇠 (모델 수식을 문자 그대로).
// iExts[t] = 스텝 t 의 외부 전류 벡터.
function naiveSimulate(c, params, spectral, iExts) {
  const T = iExts.length;
  const N = c.neurons.length;
  const nInput = c.neurons.filter((n) => n.layer === 'input').length;
  const ref = createReservoir(c, params, { spectral }); // CSR 가중치와 ROI 풀만 빌린다
  const { indptr, indices, data } = ref.csr;
  const pools = buildRoiPools(c);
  const decay = Math.exp(-LIF.dt / LIF.tauM), cA = 1 - Math.exp(-LIF.dt / LIF.tauM), decayA = Math.exp(-LIF.dt / SFA.tauA);
  const b = params.b ?? 0, kLocal = params.kLocal ?? 0, kGlobal = params.kGlobal ?? 0;
  const flush = b * SFA.flush;
  const V = new Float64Array(N), a = new Float64Array(N);
  const refr = new Int32Array(N);        // 남은 불응 스텝
  let prevSpikes = [];
  const counts = new Uint16Array(N);
  const trace = [];
  for (let t = 0; t < T; t++) {
    const iExt = iExts[t];
    // 시냅스 입력 (직전 발화, 오름차순) 을 V 에 간선 순서대로 더한다 — 커널과 같은 덧셈 순서 (비트 일치 조건).
    // 불응기 뉴런은 아래에서 vReset 으로 덮어써 무시된다.
    const roiSpikes = new Int32Array(pools.R + 1);
    for (const j of prevSpikes) {
      roiSpikes[pools.roiIdx[j]]++;
      for (let e = indptr[j]; e < indptr[j + 1]; e++) V[indices[e]] += data[e];
    }
    const inhG = -kGlobal * prevSpikes.length / N;
    const spikes = [];
    for (let i = 0; i < N; i++) {
      if (refr[i] > 0) { refr[i]--; V[i] = LIF.vReset; continue; }
      const r = pools.roiIdx[i];
      const inhL = r === pools.R ? 0 : -kLocal * roiSpikes[r] / pools.nRoi[r];
      const ext = i < nInput ? iExt[i] : 0;
      // 커널과 같은 연산 순서: (V - vRest)·decay − a·cA (+ ext) + inhG + inhL
      const v = LIF.vRest + (V[i] - LIF.vRest) * decay - a[i] * cA + ext + inhG + inhL;
      if (v >= LIF.vTh) { V[i] = LIF.vReset; refr[i] = LIF.refractorySteps; spikes.push(i); counts[i]++; } else V[i] = v;
    }
    // SFA: 전체 배열 감쇠 + 소거 + 발화 증분
    for (let i = 0; i < N; i++) { a[i] *= decayA; if (a[i] < flush) a[i] = 0; }
    if (b > 0) for (const i of spikes) a[i] += b;
    prevSpikes = spikes;
    trace.push({ spikes: spikes.slice(), V: Float64Array.from(V), a: Float64Array.from(a) });
  }
  return { counts, trace };
}

test('SFA event-driven list matches the naive every-neuron update bit for bit (spikes, V, a): 400 driven + 2000 silent steps', () => {
  const c = smallConnectome();
  const spectral = spectralFor(c);
  const drive = new Float32Array(7);
  drive[0] = 0.35; drive[1] = 0.45;
  const silent = new Float32Array(7);
  // 400 스텝 구동 후 2000 스텝 무입력: 활동이 죽고 a 가 flush 문턱(b·1e-4; a≈3 에서 ≈1150 스텝) 아래로 내려가 목록에서 빠진다
  const iExts = [...Array(400).fill(drive), ...Array(2000).fill(silent)];
  const T = iExts.length;
  for (const params of [
    { rhoTarget: 3, alpha: 0.5, b: 0.3 },
    { rhoTarget: 3, alpha: 1.0, b: 1.5, kGlobal: 0.8, kLocal: 0.6 },
    { rhoTarget: 4, alpha: 0.5, b: 0.05, kLocal: 2 },
  ]) {
    const naive = naiveSimulate(c, params, spectral, iExts);
    const res = createReservoir(c, params, { spectral });
    const counts = new Uint16Array(7);
    let flushed = false;
    for (let t = 0; t < T; t++) {
      res.step(iExts[t], counts);
      const tr = naive.trace[t];
      assert.deepEqual(Array.from(res.pending()), tr.spikes, `${JSON.stringify(params)} step ${t} spikes`);
      const V = res.voltage();
      // 커널은 발화 후 R+1 스텝 동안 V 를 센티널로 두고 다음 스텝 시작에 vReset 으로 복원한다 → 그 뉴런만 vReset 으로 읽는다
      const clamped = new Set();
      for (let s = Math.max(0, t - LIF.refractorySteps); s <= t; s++) for (const i of naive.trace[s].spikes) clamped.add(i);
      for (let i = 0; i < 7; i++) {
        const v = clamped.has(i) ? LIF.vReset : V[i];
        assert.equal(v, tr.V[i], `${JSON.stringify(params)} step ${t} V[${i}]`);
      }
      assert.deepEqual(Array.from(res.adaptation()), Array.from(tr.a), `${JSON.stringify(params)} step ${t} a`);
      // 목록 크기 = a ≠ 0 인 뉴런 수
      assert.equal(res.adaptCount(), tr.a.filter((x) => x !== 0).length, `step ${t} adapt list size`);
      if (t > 0 && naive.trace[t - 1].a.some((x, i) => x !== 0 && tr.a[i] === 0)) flushed = true;
    }
    assert.deepEqual(Array.from(counts), Array.from(naive.counts));
    assert.ok(counts.reduce((s, x) => s + x, 0) > 20, 'enough spikes to make the comparison meaningful');
    assert.ok(flushed, `${JSON.stringify(params)} exercises the flush path`);
    assert.equal(res.adaptCount(), 0, 'adapt list empty after the silent tail');
  }
});

test('outputRates converts window counts to Hz for the output block', () => {
  const c = smallConnectome();
  const res = createReservoir(c, { rhoTarget: 0, alpha: 0.5 }, { spectral: spectralFor(c) });
  const counts = new Uint16Array(7);
  counts[5] = 3; counts[6] = 1; counts[2] = 9;
  assert.deepEqual(Array.from(res.outputRates(counts, 50)), [60, 20]);
});

test('createReservoir rejects a connectome whose neurons are not ordered input/hidden/output', () => {
  const c = smallConnectome();
  const spectral = spectralFor(c);
  [c.neurons[0], c.neurons[2]] = [c.neurons[2], c.neurons[0]];
  assert.throws(() => createReservoir(c, { rhoTarget: 1, alpha: 0.5 }, { spectral }), /ordered/);
});

test('buildRoiPools: index per ROI, null ROI gets the spare slot', () => {
  const pools = buildRoiPools(smallConnectome());
  assert.deepEqual(pools.names, ['A', 'B']);
  assert.deepEqual(Array.from(pools.roiIdx), [0, 1, 0, 0, 1, 2, 0]);
  assert.deepEqual(Array.from(pools.nRoi), [4, 2, 1]);
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

test('metrics: spike stats (mean, median, active, ceiling, top-1% share), cosine separation, effective rank', () => {
  // N = 4, 창 2개. 뉴런별 총 발화: [0, 1, 20, 17]
  const s = spikeStats([Uint16Array.from([0, 1, 20, 15]), Uint16Array.from([0, 0, 0, 2])], 4, 50);
  assert.equal(s.meanRateHz, (1 + 20 + 15 + 2) / 8 / 0.05);
  assert.equal(s.medianRateHz, ((1 + 17) / 2) / 2 / 0.05); // 정렬 [0,1,17,20] 의 중앙값 9 → 창당 4.5 → Hz
  assert.equal(s.activeFrac, 4 / 8);
  assert.equal(s.ceilingFrac, 2 / 8);
  assert.equal(s.topSpikeShare, 20 / 38); // 상위 1% = max(1, round(0.04)) = 1 뉴런
  assert.equal(spikeStats([Uint16Array.from([0, 0])], 2, 50).topSpikeShare, 0);
  assert.equal(meanPairwiseCosineDistance([[1, 0], [0, 1], [1, 1]]).toFixed(6), ((1 + (1 - Math.SQRT1_2) * 2) / 3).toFixed(6));
  assert.equal(effectiveRank([[1, 0, 0], [0, 2, 0], [1, 2, 0]]), 2);
  assert.equal(effectiveRank([[1, 2, 3], [2, 4, 6]]), 1);
  assert.equal(effectiveRank([[0, 0], [0, 0]]), 0);
});
