// 7단계 Phase B — 배선 제약 대조군 N1 · N2 · N3.
// 목적: "커넥톰 배선 마스크가 무작위 배선보다 나은가"를 측정한다. 세 조건 모두 N · E · 입력 뉴런 수 ·
// readout 뉴런 수를 원본과 정확히 같게 유지하므로 파라미터 수 P 도 정확히 같다 (sparseLayout 참조).
//
//   N1 degree-preserving shuffle — 차수 보존 재배선 (double-edge swap ≥ 10·E). 뉴런 집합·입출력 배치는 원본 그대로.
//                                  분리: "커넥톰의 구체적 연결 패턴" (차수 분포는 동일하게 두고).
//   N2 full random                — N 노드 위에 E 개 방향성 간선을 균등 무작위 (자기루프·중복 금지). 차수 분포 미보존.
//                                  입력·readout 뉴런 집합도 같은 크기로 무작위 재추출. 가장 약한 하한선.
//   N3 I/O placement shuffle      — 간선 구조는 원본 그대로 두고 ROI 라벨을 개수 보존 순열한 뒤,
//                                  순열된 라벨의 ROI 프로파일에 맞춰 입력·readout 뉴런을 다시 뽑는다.
//                                  위상은 실제 커넥톰, 입출력 배치만 해부학적으로 어긋난다.
//
// 주의 — 사양과 구현의 차이 (보고서에 명시할 것):
//   이 코드베이스에서 입력/출력층 소속은 ROI 가 아니라 뉴런 type 으로 정해진다
//   (src/connectome.js classifyLayer: LC/LPLC → input, DN → output). ROI 라벨은 보고·시각화에만 쓰인다
//   (stage7-train.js byPostRoi, viz.js, reservoir.js). 따라서 "ROI 라벨만 순열"하면 모델은 C0 와 비트 단위로
//   같아져 대조군이 성립하지 않는다. N3 는 사양의 의도("보드 입력이 들어가는 위치와 행동이 읽히는 위치가
//   해부학적으로 어긋난다")를 따라, 라벨 순열에 더해 입력·readout 뉴런 집합을 순열된 라벨 기준으로
//   다시 선택한다. 위상(간선 집합)은 뉴런 재색인 아래에서 정확히 보존된다.
//
//   커넥톰 간선 가중치는 전부 양수다 (459,168개, 3..4299). 즉 초기 상태의 흥분/억제 비율은 100/0 이고,
//   억제성 시냅스는 학습으로만 생긴다 (C0 학습 후 46.9%). "부호 비율 보존"은 세 조건 모두 자명하게 성립한다.

import { createRng } from './prng.js';
import { degreeShuffle } from './nullmodels.js';

export const PHASE_B_NULLS = ['N1', 'N2', 'N3'];
export const NULL_NAMES = {
  N1: 'degree-preserving shuffle',
  N2: 'full random (same E)',
  N3: 'I/O placement shuffle (topology kept)',
};
export const NULL_SEPARATES = {
  N1: '커넥톰의 구체적 연결 패턴 (차수 분포는 보존)',
  N2: '커넥톰 구조 전체 — 차수 이질성 + 연결 패턴 + 해부학적 배치 (하한선)',
  N3: '입출력의 해부학적 배치 (위상은 실제 커넥톰)',
};

const byTypeThenId = (a, b) => (a.type < b.type ? -1 : a.type > b.type ? 1 : a.id - b.id);
const edgeKey = (a, b, N) => a * N + b;

// 뉴런 목록 + 간선(원본 색인) → input 이 앞, output 이 뒤에 오도록 재색인한 커넥톰 객체.
// buildMask 는 input 이 0..nInput-1, output 이 마지막 nOutput 개를 차지할 것을 요구한다 (sparse-rnn.js).
function assemble(base, neurons, edges, note) {
  const tagged = neurons.map((n, i) => ({ n, i }));
  const order = [
    ...tagged.filter((x) => x.n.layer === 'input').sort((a, b) => byTypeThenId(a.n, b.n)),
    ...tagged.filter((x) => x.n.layer === 'hidden').sort((a, b) => byTypeThenId(a.n, b.n)),
    ...tagged.filter((x) => x.n.layer === 'output').sort((a, b) => byTypeThenId(a.n, b.n)),
  ];
  const map = new Int32Array(neurons.length);
  order.forEach((x, k) => { map[x.i] = k; });
  const ordered = order.map((x) => x.n);
  const remapped = edges.map((e) => [map[e[0]], map[e[1]], e[2]]).sort((x, y) => x[0] - y[0] || x[1] - y[1]);
  const layerSizes = { input: 0, hidden: 0, output: 0 };
  const roiCounts = {};
  let kcCount = 0;
  for (const n of ordered) {
    layerSizes[n.layer]++;
    const key = n.roi ?? 'null';
    roiCounts[key] = (roiCounts[key] ?? 0) + 1;
    if (n.isKC) kcCount++;
  }
  return {
    meta: {
      ...base.meta,
      nodeCount: ordered.length, edgeCount: remapped.length, layerSizes, kcCount,
      roiCounts: Object.fromEntries(Object.entries(roiCounts).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))),
      derivedFrom: base.meta.derivedFrom ?? 'data/connectome.json',
      condition: note,
    },
    neurons: ordered,
    edges: remapped,
  };
}

// 역할(layer)을 다시 배정한 뉴런 목록. isAllowlisted 는 output 에만 남는다 (parseConnectome 불변식).
function reassignRoles(neurons, inputSet, outputSet) {
  return neurons.map((n, i) => {
    const layer = inputSet.has(i) ? 'input' : outputSet.has(i) ? 'output' : 'hidden';
    return { ...n, layer, isAllowlisted: layer === 'output' ? (n.isAllowlisted ?? false) : false };
  });
}

// 크기 k 의 부분집합을 무작위로 뽑는다 (부분 Fisher-Yates).
function sample(pool, k, rng) {
  const a = [...pool];
  for (let i = 0; i < k; i++) { const j = i + rng.int(a.length - i); const t = a[i]; a[i] = a[j]; a[j] = t; }
  return a.slice(0, k);
}

// ---------- N1: 차수 보존 재배선 ----------
// nullmodels.degreeShuffle 과 같은 마르코프 체인 (간선 쌍 교환, 자기루프·중복 기각, 시도 10·E).
// 가중치는 간선을 따라 이동하고, 뉴런 집합·ROI 라벨·입출력 배치는 손대지 않는다.
export function n1DegreeShuffle(c, seed = 0) {
  const out = degreeShuffle(c, seed);
  const prev = out.meta.condition ?? {};
  return { ...out, meta: { ...out.meta, condition: { type: 'N1', name: NULL_NAMES.N1, seed, swapAttempts: prev.swapAttempts, swapsAccepted: prev.swapsAccepted } } };
}

// ---------- N2: 균등 무작위, 같은 E ----------
// 간선 끝점은 N 노드 전체에서 균등 (층 블록 보존 없음). 가중치는 원본 다중집합의 순열 →
// 가중치 분포와 부호 비율이 정확히 보존된다. 입력·readout 뉴런은 같은 크기로 무작위 재추출.
export function n2FullRandom(c, seed = 0) {
  const N = c.neurons.length;
  const E = c.edges.length;
  const rng = createRng(seed + 20001);
  const nInput = c.neurons.filter((n) => n.layer === 'input').length;
  const nOutput = c.neurons.filter((n) => n.layer === 'output').length;
  const all = Array.from({ length: N }, (_, i) => i);
  const picked = sample(all, nInput + nOutput, rng);
  const inputSet = new Set(picked.slice(0, nInput));
  const outputSet = new Set(picked.slice(nInput));
  const w = c.edges.map((e) => e[2]);
  for (let i = w.length - 1; i > 0; i--) { const j = rng.int(i + 1); const t = w[i]; w[i] = w[j]; w[j] = t; }
  const present = new Set();
  const edges = [];
  let rejected = 0;
  while (edges.length < E) {
    const a = rng.int(N), b = rng.int(N);
    if (a === b) { rejected++; continue; }
    const k = edgeKey(a, b, N);
    if (present.has(k)) { rejected++; continue; }
    present.add(k);
    edges.push([a, b, w[edges.length]]);
  }
  const neurons = reassignRoles(c.neurons, inputSet, outputSet);
  return assemble(c, neurons, edges, { type: 'N2', name: NULL_NAMES.N2, seed, rejected, redrewIO: true });
}

// ---------- N3: 입출력 배치 순열 (위상 고정) ----------
// 1) ROI 라벨을 개수 보존 순열 (라벨 다중집합을 뉴런 사이에서 섞는다)
// 2) 원본의 ROI 별 입력·readout 뉴런 수를 그대로 두고, 순열된 라벨 기준으로 그 수만큼 다시 뽑는다
// 3) 간선 집합은 그대로 (재색인 아래에서 위상 정확히 보존)
export function n3IoPlacementShuffle(c, seed = 0) {
  const rng = createRng(seed + 30001);
  const labels = c.neurons.map((n) => n.roi ?? null);
  for (let i = labels.length - 1; i > 0; i--) { const j = rng.int(i + 1); const t = labels[i]; labels[i] = labels[j]; labels[j] = t; }
  const relabeled = c.neurons.map((n, i) => ({ ...n, roi: labels[i] }));
  // 원본의 ROI 별 입력·출력 뉴런 수
  const profile = (layer) => {
    const m = new Map();
    for (const n of c.neurons) if (n.layer === layer) { const k = n.roi ?? 'null'; m.set(k, (m.get(k) ?? 0) + 1); }
    return m;
  };
  const inProfile = profile('input'), outProfile = profile('output');
  const byRoi = new Map();
  relabeled.forEach((n, i) => { const k = n.roi ?? 'null'; if (!byRoi.has(k)) byRoi.set(k, []); byRoi.get(k).push(i); });
  const taken = new Set();
  const draw = (prof) => {
    const picked = [];
    for (const entry of [...prof.entries()].sort()) {
      const roi = entry[0], count = entry[1];
      const pool = (byRoi.get(roi) ?? []).filter((i) => !taken.has(i));
      if (pool.length < count) throw new Error(`N3: ROI ${roi} 에 남은 뉴런 ${pool.length} 개 < 필요한 ${count} 개`);
      for (const i of sample(pool, count, rng)) { taken.add(i); picked.push(i); }
    }
    return picked;
  };
  const inputSet = new Set(draw(inProfile));
  const outputSet = new Set(draw(outProfile));
  const neurons = reassignRoles(relabeled, inputSet, outputSet);
  const edges = c.edges.map((e) => [e[0], e[1], e[2]]);
  return assemble(c, neurons, edges, { type: 'N3', name: NULL_NAMES.N3, seed, permutedRoiLabels: true, redrewIO: true });
}

export function buildPhaseBNull(c, kind, seed = 0) {
  switch (kind) {
    case 'N1': return n1DegreeShuffle(c, seed);
    case 'N2': return n2FullRandom(c, seed);
    case 'N3': return n3IoPlacementShuffle(c, seed);
    default: throw new Error(`unknown Phase B null ${kind}`);
  }
}

// ---------- sanity check ----------
// 재색인에 무관하게 비교하려고 간선을 뉴런 id 쌍으로 본다.
function edgeIdSet(c) {
  const id = c.neurons.map((n) => n.id);
  const s = new Set();
  for (const e of c.edges) s.add(`${id[e[0]]}>${id[e[1]]}`);
  return s;
}
function degreeById(c) {
  const inDeg = new Map(), outDeg = new Map();
  for (const n of c.neurons) { inDeg.set(n.id, 0); outDeg.set(n.id, 0); }
  for (const e of c.edges) {
    const a = c.neurons[e[0]].id, b = c.neurons[e[1]].id;
    outDeg.set(a, outDeg.get(a) + 1);
    inDeg.set(b, inDeg.get(b) + 1);
  }
  return { inDeg, outDeg };
}
const roleIds = (c, layer) => new Set(c.neurons.filter((n) => n.layer === layer).map((n) => n.id));
const sameSet = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));

// 원본 대비 검사 결과. pass 가 false 면 호출부가 중단한다 (지시 §9).
export function nullSanity(original, nullC, kind, { expectedP = null, actualP = null } = {}) {
  const N = original.neurons.length, E = original.edges.length;
  const oEdges = edgeIdSet(original), nEdges = edgeIdSet(nullC);
  let shared = 0;
  for (const k of nEdges) if (oEdges.has(k)) shared++;
  const od = degreeById(original), nd = degreeById(nullC);
  const degIdentical = [...od.inDeg.keys()].every((id) => od.inDeg.get(id) === nd.inDeg.get(id) && od.outDeg.get(id) === nd.outDeg.get(id));
  const roiCountsSame = JSON.stringify(Object.entries(original.meta.roiCounts ?? {}).sort()) === JSON.stringify(Object.entries(nullC.meta.roiCounts ?? {}).sort());
  const inputSame = sameSet(roleIds(original, 'input'), roleIds(nullC, 'input'));
  const outputSame = sameSet(roleIds(original, 'output'), roleIds(nullC, 'output'));
  const negW = nullC.edges.filter((e) => e[2] < 0).length;
  const chanceOverlap = E / (N * (N - 1));
  const overlapFrac = shared / E;
  const degStats = (m) => {
    const v = [...m.values()].sort((a, b) => a - b);
    return { min: v[0], median: v[Math.floor(v.length / 2)], max: v[v.length - 1], mean: Math.round(100 * v.reduce((s, x) => s + x, 0) / v.length) / 100 };
  };
  const expect = {
    N1: { degIdentical: true, overlapNear: 'chance', io: 'same' },
    N2: { degIdentical: false, overlapNear: 'chance', io: 'redrawn' },
    N3: { degIdentical: true, overlapNear: 'one', io: 'redrawn' },
  }[kind];
  if (!expect) throw new Error(`unknown Phase B null ${kind}`);
  const checks = [];
  const add = (name, ok, detail) => checks.push({ name, ok, detail });
  add('N 일치', nullC.neurons.length === N, `${nullC.neurons.length} vs ${N}`);
  add('E 일치', nullC.edges.length === E, `${nullC.edges.length} vs ${E}`);
  add('입력 뉴런 수 일치', roleIds(nullC, 'input').size === roleIds(original, 'input').size, `${roleIds(nullC, 'input').size} vs ${roleIds(original, 'input').size}`);
  add('readout 뉴런 수 일치', roleIds(nullC, 'output').size === roleIds(original, 'output').size, `${roleIds(nullC, 'output').size} vs ${roleIds(original, 'output').size}`);
  if (expectedP !== null && actualP !== null) add('P 일치 (±0.5%)', Math.abs(actualP - expectedP) / expectedP <= 0.005, `${actualP} vs C0 ${expectedP} (${((actualP - expectedP) / expectedP * 100).toFixed(3)}%)`);
  if (expect.overlapNear === 'chance') add('원본 간선과의 교집합 ≈ 우연 수준', overlapFrac < Math.max(0.05, chanceOverlap * 8), `${(100 * overlapFrac).toFixed(3)}% (우연 ${(100 * chanceOverlap).toFixed(3)}%)`);
  else add('원본 간선과 100% 일치 (위상 보존)', overlapFrac === 1, `${(100 * overlapFrac).toFixed(3)}%`);
  add(expect.degIdentical ? 'in/out 차수 원본과 동일' : 'in/out 차수 원본과 다름 (설계대로 이항 분포)', expect.degIdentical === degIdentical, `동일 ${degIdentical}`);
  add('ROI 별 뉴런 수 보존', roiCountsSame, roiCountsSame ? 'ok' : '불일치');
  if (expect.io === 'same') {
    add('입력 뉴런 집합 원본과 동일', inputSame, String(inputSame));
    add('readout 뉴런 집합 원본과 동일', outputSame, String(outputSame));
  } else {
    add('입력 뉴런 집합이 C0 와 다름', !inputSame, `동일 ${inputSame}`);
    add('readout 뉴런 집합이 C0 와 다름', !outputSame, `동일 ${outputSame}`);
  }
  add('억제성 간선 비율 원본과 동일 (초기 0% — 커넥톰 가중치는 전부 양수)', negW === 0, `음수 가중치 ${negW}`);
  return {
    kind, name: NULL_NAMES[kind], separates: NULL_SEPARATES[kind],
    N: nullC.neurons.length, E: nullC.edges.length, P: actualP, expectedP,
    nInput: roleIds(nullC, 'input').size, nOutput: roleIds(nullC, 'output').size,
    edgeOverlapWithOriginal: overlapFrac, chanceOverlap, degreeIdentical: degIdentical,
    inDegree: degStats(nd.inDeg), outDegree: degStats(nd.outDeg),
    inDegreeOriginal: degStats(od.inDeg), outDegreeOriginal: degStats(od.outDeg),
    roiCountsPreserved: roiCountsSame, inputSetSameAsC0: inputSame, readoutSetSameAsC0: outputSame,
    negativeWeights: negW, checks, pass: checks.every((c) => c.ok),
  };
}
