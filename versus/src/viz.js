// 6단계 시각화 데이터. 순수 함수 (파일 I/O 는 scripts/build-viz-data.js).
//
//   subsampleGraph   층화 서브샘플 그래프: 입력 200 (시드 무작위), 중간 600 ((ROI, isKC) 층별 비례 배분 — 최대 잔여 방식으로
//                    ROI 분포와 KC 비율을 보존), 출력 107 전부. 간선은 샘플 내부만, weight 상위 maxEdges.
//                    좌표: soma 가 있으면 hemibrain 원좌표(8 nm 복셀), 없으면 같은 ROI 의 soma 평균 + 시드 지터(범위의 ±3%),
//                    ROI 에 soma 가 하나도 없으면 전체 평균. 그 뒤 bbox 중심을 빼고 최장 축이 [-1, 1] 이 되게 등방 스케일.
//   recordEpisode    최종 동작점 + 학습된 리드아웃으로 한 게임을 플레이하며 결정마다 후보·DN 발화 수·예측 가치·실제 점수·선택을,
//                    선택된 후보에 대해서는 샘플 뉴런의 스텝별 발화와 층별 발화 수를 기록.
//   buildSummary     results.json / separation-search.json / spectral.json 에서 화면용 수치만 추출 (CI 포함, CI 겹침 판정 포함).

import { createRng } from './prng.js';
import { createReservoir } from './reservoir.js';
import { createEncoder } from './encode.js';
import { candidateAfterstates, packBoard, FEATURE_WEIGHTS } from './afterstate.js';
import { readoutFromJSON, valueOf } from './readout.js';
import { applyPlacement, createBag, emptyBoard, legalPlacements } from './tetris.js';
import { kendallTau, ciOverlap } from './evaluate.js';

// 최대 잔여 방식 비례 배분: sizes → total 개를 나눈다 (각 층 ≥ 0, 합 = total)
export function apportion(sizes, total) {
  const sum = sizes.reduce((a, b) => a + b, 0);
  if (sum === 0) return sizes.map(() => 0);
  const quotas = sizes.map((s) => (s * total) / sum);
  const alloc = quotas.map(Math.floor);
  let left = total - alloc.reduce((a, b) => a + b, 0);
  const order = quotas.map((q, i) => [q - Math.floor(q), i]).sort((a, b) => b[0] - a[0] || a[1] - b[1]);
  for (let k = 0; k < order.length && left > 0; k++) { const i = order[k][1]; if (alloc[i] < sizes[i]) { alloc[i]++; left--; } }
  return alloc;
}

function sampleIdx(rng, arr, k) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = rng.int(i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a.slice(0, k).sort((x, y) => x - y);
}

export function subsampleGraph(connectome, { input = 200, hidden = 600, maxEdges = 30000, seed = 6, jitter = 0.03 } = {}) {
  const rng = createRng(seed);
  const N = connectome.neurons.length;
  const byLayer = { input: [], hidden: [], output: [] };
  connectome.neurons.forEach((n, i) => byLayer[n.layer].push(i));
  // 중간층: (roi, isKC) 층
  const strata = new Map();
  for (const i of byLayer.hidden) { const n = connectome.neurons[i]; const key = `${n.roi ?? 'null'}|${n.isKC ? 1 : 0}`; if (!strata.has(key)) strata.set(key, []); strata.get(key).push(i); }
  const keys = [...strata.keys()].sort();
  const alloc = apportion(keys.map((k) => strata.get(k).length), Math.min(hidden, byLayer.hidden.length));
  const hiddenIdx = keys.flatMap((k, j) => sampleIdx(rng, strata.get(k), alloc[j])).sort((a, b) => a - b);
  const inputIdx = sampleIdx(rng, byLayer.input, Math.min(input, byLayer.input.length));
  const chosen = [...inputIdx, ...hiddenIdx, ...byLayer.output];
  const pos = new Int32Array(N).fill(-1);
  chosen.forEach((i, k) => { pos[i] = k; });

  // 좌표
  const somaByRoi = new Map();
  const all = [0, 0, 0]; let nAll = 0;
  for (const n of connectome.neurons) {
    if (!n.soma) continue;
    const key = n.roi ?? 'null';
    if (!somaByRoi.has(key)) somaByRoi.set(key, { s: [0, 0, 0], n: 0 });
    const e = somaByRoi.get(key); for (let k = 0; k < 3; k++) { e.s[k] += n.soma[k]; all[k] += n.soma[k]; } e.n++; nAll++;
  }
  const globalMean = all.map((v) => v / nAll);
  const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
  for (const n of connectome.neurons) if (n.soma) for (let k = 0; k < 3; k++) { mn[k] = Math.min(mn[k], n.soma[k]); mx[k] = Math.max(mx[k], n.soma[k]); }
  const extent = mx.map((v, k) => v - mn[k]);
  let fallbackCount = 0;
  const raw = chosen.map((i) => {
    const n = connectome.neurons[i];
    if (n.soma) return n.soma;
    fallbackCount++;
    const e = somaByRoi.get(n.roi ?? 'null');
    const base = e ? e.s.map((v) => v / e.n) : globalMean;
    return base.map((v, k) => v + rng.uniform(-jitter, jitter) * extent[k]);
  });
  const center = mn.map((v, k) => (v + mx[k]) / 2);
  const scale = 2 / Math.max(...extent);
  const nodes = chosen.map((i, k) => {
    const n = connectome.neurons[i];
    return { i, id: n.id, type: n.type, layer: n.layer, roi: n.roi, isKC: n.isKC, xyz: raw[k].map((v, a) => Number(((v - center[a]) * scale).toFixed(4))) };
  });
  // 간선
  const edges = [];
  for (const [a, b, w] of connectome.edges) if (pos[a] >= 0 && pos[b] >= 0) edges.push([pos[a], pos[b], w]);
  edges.sort((x, y) => y[2] - x[2] || x[0] - y[0] || x[1] - y[1]);
  const kept = edges.slice(0, maxEdges);
  const share = (arr, f) => { const m = {}; for (const x of arr) { const k = f(x); m[k] = (m[k] ?? 0) + 1 / arr.length; } return m; };
  const hiddenAll = byLayer.hidden.map((i) => connectome.neurons[i]);
  const hiddenSampled = nodes.filter((n) => n.layer === 'hidden');
  return {
    meta: {
      counts: { input: inputIdx.length, hidden: hiddenIdx.length, output: byLayer.output.length, edges: kept.length, edgesAmongSampled: edges.length },
      seed, maxEdges,
      roiShareHiddenFull: share(hiddenAll, (n) => n.roi ?? 'null'),
      roiShareHiddenSampled: share(hiddenSampled, (n) => n.roi ?? 'null'),
      kcShareHiddenFull: hiddenAll.filter((n) => n.isKC).length / hiddenAll.length,
      kcShareHiddenSampled: hiddenSampled.filter((n) => n.isKC).length / hiddenSampled.length,
      coordinates: {
        source: 'neuPrint somaLocation (hemibrain v1.2.1 voxel coordinates, 8 nm)',
        centerVoxels: center, scale, extentVoxels: extent,
        normalized: 'xyz = (soma - center) * scale → longest axis in [-1, 1], isotropic',
        fallback: `soma null (${fallbackCount} of ${nodes.length} sampled): mean soma of the same primary ROI + seeded jitter ±${jitter * 100}% of extent; global mean if the ROI has no soma`,
        fallbackCount,
      },
    },
    nodes, edges: kept,
  };
}

// 한 게임 기록. sampledIndices: 서브샘플 그래프의 원 인덱스 배열 (스파이크 기록 대상). readout: JSON.
export function recordEpisode(connectome, spectral, params, { T, gIn, readout, target, seed = 100, cap = 1000, sampledIndices }) {
  const res = createReservoir(connectome, params, { spectral });
  const enc = createEncoder(connectome, { gIn });
  const predict = readoutFromJSON(readout);
  const value = (dn) => valueOf(target, predict(dn), FEATURE_WEIGHTS);
  const inSample = new Int32Array(res.N).fill(-1);
  sampledIndices.forEach((i, k) => { inSample[i] = k; });
  const layerOf = connectome.neurons.map((n) => n.layer);
  const rng = createRng(seed);
  const bag = createBag(rng);
  let board = emptyBoard();
  const decisions = [];
  let lines = 0, pieces = 0;
  while (pieces < cap) {
    const piece = bag.next();
    const cands = candidateAfterstates(board, piece);
    if (cands.length === 0) break;
    const recs = cands.map((c) => {
      res.reset();
      const { counts } = res.run(enc.encode(c.board), T);
      const dn = res.outputRates(counts, T);
      const dnCounts = Array.from(counts.subarray(res.outputStart, res.N));
      return { action: c.action, col: c.col, rot: c.rot, board: packBoard(c.board), dnCounts, value: value(dn), score: c.score, linesCleared: c.linesCleared, features: c.features };
    });
    let best = 0;
    for (let k = 1; k < recs.length; k++) if (recs[k].value > recs[best].value || (recs[k].value === recs[best].value && recs[k].action < recs[best].action)) best = k;
    // 선택 후보의 스텝별 발화 (샘플 뉴런) + 층별 발화 수 (전 뉴런)
    res.reset();
    const iExt = enc.encode(cands[best].board);
    const spikes = [], layerCounts = [];
    for (let t = 0; t < T; t++) {
      res.step(iExt);
      const fired = res.pending();
      const lc = { input: 0, hidden: 0, output: 0 };
      const sampled = [];
      for (let s = 0; s < fired.length; s++) { const i = fired[s]; lc[layerOf[i]]++; if (inSample[i] >= 0) sampled.push(inSample[i]); }
      spikes.push(sampled);
      layerCounts.push([lc.input, lc.hidden, lc.output]);
    }
    const pred = recs.map((r) => r.value), truth = recs.map((r) => r.score);
    decisions.push({ index: decisions.length, piece, board: packBoard(board), candidates: recs, chosen: best, tau: kendallTau(truth, pred), spikes, layerCounts });
    const r = applyPlacement(board, piece, cands[best].col, cands[best].rot);
    if (r.gameOver) break;
    board = r.board;
    lines += r.linesCleared;
    pieces++;
  }
  return { meta: { seed, cap, T, gIn, params, target, readoutKind: readout.kind, pieces, lines, decisions: decisions.length, sampledNeurons: sampledIndices.length, layerSizes: { input: res.nInput, hidden: res.outputStart - res.nInput, output: res.nOutput } }, decisions };
}

// 화면용 요약. CI 겹침 판정은 여기서 계산해 둔다 (화면은 판정을 다시 하지 않는다).
export function buildSummary(results, search, spectral) {
  const conds = results.conditions;
  const names = { C0: 'real', C1: 'degree-shuffle', C2: 'weight-shuffle', C3: 'erdos-renyi', C4: 'KC-ablated', C5: 'direct-ablated', C6: 'activity-only' };
  const c0 = conds.C0;
  const combo = 'R3:V2';
  const rows = Object.keys(conds).map((key) => {
    const c = conds[key];
    const m = c.readouts?.[combo]?.metrics ?? null;
    const p = c.play?.[combo]?.metrics ?? null;
    const sel = c.calibration?.selected ?? null;
    const sep = sel?.separation ?? null;
    return {
      key, condition: c.condition, name: names[c.condition], seed: c.seed ?? 0,
      region: c.readouts ? 'ok' : (key === 'C6' ? 'ok' : 'none'),
      nodeCount: c.spectral?.nodeCount ?? null, edgeCount: c.spectral?.edgeCount ?? null,
      rhoUnit: c.spectral ? { alpha1: c.spectral.rhoUnit['1'], alpha05: c.spectral.rhoUnit['0.5'] } : null,
      calibration: c.calibration ? { passCount: c.calibration.passCount, points: c.calibration.points, failBy: c.calibration.failBy } : null,
      params: c.params ?? null,
      point: sel ? { meanRateHz: sel.meanRateHz, medianRateHz: sel.medianRateHz, dnEverActive: sel.dnEverActive, topSpikeShare: sel.topSpikeShare, activeFrac: sel.activeFrac } : null,
      separation: sep ? { distinctFrac: sep.distinctFrac, meanDNDiff: sep.meanDNDiff, withinKendall: sep.withinKendall, profile: sep.profile } : null,
      regression: m ? { r2: m.r2, r2CI: m.r2CI, tau: m.tau, tauCI: m.tauCI, top1: m.top1, top1CI: m.top1CI, decisions: m.decisions, afterstates: m.afterstates } : null,
      readouts: c.readouts ? Object.fromEntries(Object.entries(c.readouts).map(([k, r]) => [k, { r2: r.metrics.r2, r2CI: r.metrics.r2CI, tau: r.metrics.tau, tauCI: r.metrics.tauCI, top1: r.metrics.top1, top1CI: r.metrics.top1CI, perFeatureR2: r.perFeatureR2 ?? null }])) : null,
      play: p ? { linesMedian: p.linesMedian, linesMedianCI: p.linesMedianCI, linesQuartiles: p.linesQuartiles, linesMean: p.linesMean, piecesMedian: p.piecesMedian, piecesMedianCI: p.piecesMedianCI, piecesQuartiles: p.piecesQuartiles, games: p.games, capped: p.capped } : null,
      overlapsC0: m && c0.readouts ? {
        r2: ciOverlap(m.r2CI, c0.readouts[combo].metrics.r2CI),
        tau: ciOverlap(m.tauCI, c0.readouts[combo].metrics.tauCI),
        lines: p ? ciOverlap(p.linesMedianCI, c0.play[combo].metrics.linesMedianCI) : null,
      } : null,
      overlapsC6: m && conds.C6?.readouts ? {
        r2: ciOverlap(m.r2CI, conds.C6.readouts[combo].metrics.r2CI),
        tau: ciOverlap(m.tauCI, conds.C6.readouts[combo].metrics.tauCI),
        deltaR2: m.r2 - conds.C6.readouts[combo].metrics.r2, deltaTau: m.tau - conds.C6.readouts[combo].metrics.tau,
      } : null,
    };
  });
  const baselines = Object.fromEntries(Object.entries(results.baselines).map(([k, b]) => [k, { linesMedian: b.metrics.linesMedian, linesMedianCI: b.metrics.linesMedianCI, linesQuartiles: b.metrics.linesQuartiles, linesMean: b.metrics.linesMean, piecesMedian: b.metrics.piecesMedian, piecesMedianCI: b.metrics.piecesMedianCI, games: b.metrics.games, capped: b.metrics.capped }]));
  // 1부: ρ·T·G_IN 대 distinctFrac 구간 평균
  const pts = search.points;
  const sepOf = (p) => p.separation ?? p.separationProfileOnly ?? null;
  const bin = (label, test) => { const a = pts.filter((p) => sepOf(p) && test(p)); const mean = (f) => (a.length ? a.reduce((s, p) => s + f(sepOf(p)), 0) / a.length : null); return { label, n: a.length, distinctFrac: mean((s) => s.distinctFrac), meanDNDiff: mean((s) => s.meanDNDiff) }; };
  const bins = {
    rho: [['1–2', (p) => p.rhoTarget < 2], ['2–3', (p) => p.rhoTarget >= 2 && p.rhoTarget < 3], ['3–3.5', (p) => p.rhoTarget >= 3 && p.rhoTarget < 3.5], ['3.5–4', (p) => p.rhoTarget >= 3.5 && p.rhoTarget < 4], ['4–4.5', (p) => p.rhoTarget >= 4 && p.rhoTarget < 4.5], ['4.5–5', (p) => p.rhoTarget >= 4.5]].map(([l, t]) => bin(l, t)),
    T: [25, 50, 100].map((T) => bin(String(T), (p) => p.T === T)),
    gInMul: [['0.5–1', (p) => p.gInMul < 1], ['1–2', (p) => p.gInMul >= 1 && p.gInMul < 2], ['2–3', (p) => p.gInMul >= 2 && p.gInMul < 3], ['3–4.5', (p) => p.gInMul >= 3 && p.gInMul < 4.5], ['4.5–6', (p) => p.gInMul >= 4.5]].map(([l, t]) => bin(l, t)),
    alpha: [0.5, 1].map((a) => bin(String(a), (p) => p.alpha === a)),
  };
  const taus = pts.filter((p) => p.separation?.withinKendall !== undefined).map((p) => p.separation.withinKendall).sort((a, b) => a - b);
  const sel = search.selected;
  return {
    generatedAt: new Date().toISOString(),
    sources: { results: results.finishedAt, search: search.searchedAt, spectral: spectral.computedAt },
    operating: results.config.operating,
    hard: results.hard, hardSep: search.hardSep,
    combo,
    conditions: rows,
    baselines,
    search: {
      evaluated: search.protocol.evaluated, points: search.protocol.points, elapsedMs: search.protocol.elapsedMs,
      stage3Pass: search.counts.stage3Pass, allPass: search.counts.allPass,
      alpha05Pass: pts.filter((p) => p.alpha === 0.5 && p.hard.all).length, alpha05Total: pts.filter((p) => p.alpha === 0.5).length,
      withinKendall: taus.length ? { n: taus.length, min: taus[0], median: taus[Math.floor(taus.length / 2)], max: taus[taus.length - 1] } : null,
      selected: sel ? { alpha: sel.alpha, rhoTarget: sel.rhoTarget, b: sel.b, kLocal: sel.kLocal, kGlobal: sel.kGlobal, T: sel.T, gInMul: sel.gInMul, gIn: sel.gIn, meanRateHz: sel.meanRateHz, medianRateHz: sel.medianRateHz, dnEverActive: sel.dnEverActive, separation: { distinctFrac: sel.separation.distinctFrac, meanDNDiff: sel.separation.meanDNDiff, withinKendall: sel.separation.withinKendall, profile: sel.separation.profile } } : null,
      bins,
      points: pts.map((p) => ({ alpha: p.alpha, rho: p.rhoTarget, b: p.b, T: p.T, gInMul: p.gInMul, medianRateHz: p.medianRateHz, pass: p.hard.all, distinctFrac: sepOf(p)?.distinctFrac ?? null, meanDNDiff: sepOf(p)?.meanDNDiff ?? null, tau: p.separation?.withinKendall ?? null })),
    },
    spectralC0: { alpha05: spectral['0.5'].rhoUnit, alpha1: spectral['1'].rhoUnit, criticalG05: spectral['0.5'].criticalG },
  };
}
