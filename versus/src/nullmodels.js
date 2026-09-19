// 4단계 조건: null model 과 ablation. 원본 커넥톰 객체는 건드리지 않고 새 객체를 만든다.
//
//   C0 real            원본
//   C1 degree-shuffle  차수 보존 재배선 (configuration model). 간선 쌍 교환 (a→b, c→d) ⇒ (a→d, c→b) 를 self-loop·중복이
//                      생기지 않는 경우에만 받아들이는 마르코프 체인. 모든 뉴런의 in/out 차수가 정확히 보존되고, 간선은
//                      가중치를 그대로 갖고 옮겨가므로 전역 가중치 분포와 각 뉴런의 출력 가중치 다중집합도 보존된다.
//   C2 weight-shuffle  배선 그대로, 가중치만 전체 순열
//   C3 erdos-renyi     노드 수·간선 수·층 블록별 간선 수(input→hidden 등 9 블록)만 일치, 블록 안에서 끝점 무작위.
//                      가중치는 원본 다중집합의 순열. self-loop·중복은 기각 후 재추첨.
//   C4 KC-ablated      isKC 뉴런과 그 간선 제거
//   C5 direct-ablated  input→output 직접 간선 제거
//
// 모든 결과는 connectome.json 스키마를 따르고 (meta.layerSizes/edgeCount/roiCounts 갱신), parseConnectome 을 통과한다.

import { createRng } from './prng.js';
import { LAYERS } from './connectome.js';

export const CONDITIONS = ['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
export const CONDITION_NAMES = {
  C0: 'real', C1: 'degree-shuffle', C2: 'weight-shuffle', C3: 'erdos-renyi', C4: 'KC-ablated', C5: 'direct-ablated', C6: 'activity-only',
};
export const NULL_CONDITIONS = ['C1', 'C2', 'C3']; // 시드 여러 개로 null 분포를 만드는 조건

const SWAP_ROUNDS = 10; // 간선 수 × 이 값 만큼 교환 시도

// 간선 배열과 뉴런 부분집합으로 새 커넥톰 객체를 만든다 (meta 갱신, 간선 정렬).
function rebuild(base, neurons, edges, note) {
  const sorted = [...edges].sort((x, y) => x[0] - y[0] || x[1] - y[1]);
  const layerSizes = { input: 0, hidden: 0, output: 0 };
  const roiCounts = {};
  let kcCount = 0;
  for (const n of neurons) {
    layerSizes[n.layer]++;
    const key = n.roi ?? 'null';
    roiCounts[key] = (roiCounts[key] ?? 0) + 1;
    if (n.isKC) kcCount++;
  }
  return {
    meta: {
      ...base.meta,
      nodeCount: neurons.length, edgeCount: sorted.length, layerSizes, kcCount,
      roiCounts: Object.fromEntries(Object.entries(roiCounts).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))),
      derivedFrom: base.meta.derivedFrom ?? 'data/connectome.json',
      condition: note,
    },
    neurons,
    edges: sorted,
  };
}

const edgeKey = (a, b, N) => a * N + b;

// C1: 차수 보존 간선 교환. 시드 결정적.
export function degreeShuffle(c, seed, rounds = SWAP_ROUNDS) {
  const N = c.neurons.length;
  const rng = createRng(seed);
  const edges = c.edges.map((e) => [e[0], e[1], e[2]]);
  const present = new Set(edges.map((e) => edgeKey(e[0], e[1], N)));
  const E = edges.length;
  let accepted = 0;
  const attempts = E * rounds;
  for (let t = 0; t < attempts; t++) {
    const i = rng.int(E), j = rng.int(E);
    if (i === j) continue;
    const [a, b] = edges[i], [cc, d] = edges[j];
    if (a === d || cc === b) continue;                               // self-loop
    const k1 = edgeKey(a, d, N), k2 = edgeKey(cc, b, N);
    if (present.has(k1) || present.has(k2)) continue;               // 중복
    present.delete(edgeKey(a, b, N)); present.delete(edgeKey(cc, d, N));
    present.add(k1); present.add(k2);
    edges[i][1] = d; edges[j][1] = b;                                // 가중치는 간선(출력 stub)에 남는다
    accepted++;
  }
  return rebuild(c, c.neurons, edges, { type: 'C1', seed, swapAttempts: attempts, swapsAccepted: accepted });
}

// C2: 가중치만 순열
export function weightShuffle(c, seed) {
  const rng = createRng(seed);
  const w = c.edges.map((e) => e[2]);
  for (let i = w.length - 1; i > 0; i--) { const j = rng.int(i + 1); [w[i], w[j]] = [w[j], w[i]]; }
  const edges = c.edges.map((e, i) => [e[0], e[1], w[i]]);
  return rebuild(c, c.neurons, edges, { type: 'C2', seed });
}

// C3: 층 블록별 간선 수 보존, 블록 안에서 무작위 끝점. 가중치는 순열.
export function erdosRenyi(c, seed) {
  const N = c.neurons.length;
  const rng = createRng(seed);
  const byLayer = { input: [], hidden: [], output: [] };
  c.neurons.forEach((n, i) => byLayer[n.layer].push(i));
  const blocks = new Map();
  for (const [a, b] of c.edges) {
    const key = `${c.neurons[a].layer}>${c.neurons[b].layer}`;
    blocks.set(key, (blocks.get(key) ?? 0) + 1);
  }
  const w = c.edges.map((e) => e[2]);
  for (let i = w.length - 1; i > 0; i--) { const j = rng.int(i + 1); [w[i], w[j]] = [w[j], w[i]]; }
  const present = new Set();
  const edges = [];
  let rejected = 0;
  for (const [key, count] of [...blocks.entries()].sort()) {
    const [la, lb] = key.split('>');
    const src = byLayer[la], dst = byLayer[lb];
    for (let k = 0; k < count; k++) {
      for (;;) {
        const a = src[rng.int(src.length)], b = dst[rng.int(dst.length)];
        if (a === b) { rejected++; continue; }
        const kk = edgeKey(a, b, N);
        if (present.has(kk)) { rejected++; continue; }
        present.add(kk);
        edges.push([a, b, w[edges.length]]);
        break;
      }
    }
  }
  return rebuild(c, c.neurons, edges, { type: 'C3', seed, rejected, blocks: Object.fromEntries(blocks) });
}

// 뉴런 부분집합만 남기고 인덱스를 다시 매긴다 (순서 유지 → input/hidden/output 블록 순서 유지).
function subgraph(c, keep, note) {
  const map = new Int32Array(c.neurons.length).fill(-1);
  const neurons = [];
  c.neurons.forEach((n, i) => { if (keep[i]) { map[i] = neurons.length; neurons.push(n); } });
  const edges = [];
  for (const [a, b, w] of c.edges) if (map[a] >= 0 && map[b] >= 0) edges.push([map[a], map[b], w]);
  return rebuild(c, neurons, edges, note);
}

// C4: KC 제거
export function ablateKC(c) {
  const keep = c.neurons.map((n) => !n.isKC);
  const removed = keep.filter((k) => !k).length;
  return subgraph(c, keep, { type: 'C4', removedNeurons: removed });
}

// C5: input→output 직접 간선 제거
export function ablateDirect(c) {
  const layer = c.neurons.map((n) => n.layer);
  const edges = c.edges.filter(([a, b]) => !(layer[a] === 'input' && layer[b] === 'output'));
  return rebuild(c, c.neurons, edges, { type: 'C5', removedEdges: c.edges.length - edges.length });
}

// 조건 이름 (+ 시드) → 커넥톰. C6 은 C0 과 같은 리저버를 쓴다 (리드아웃 입력만 다르다).
export function buildCondition(c, condition, seed = 0) {
  switch (condition) {
    case 'C0': case 'C6': return { ...c, meta: { ...c.meta, condition: { type: condition } } };
    case 'C1': return degreeShuffle(c, seed);
    case 'C2': return weightShuffle(c, seed);
    case 'C3': return erdosRenyi(c, seed);
    case 'C4': return ablateKC(c);
    case 'C5': return ablateDirect(c);
    default: throw new Error(`unknown condition ${condition}`);
  }
}

// 검사용: 뉴런별 in/out 차수
export function degrees(c) {
  const N = c.neurons.length;
  const inDeg = new Int32Array(N), outDeg = new Int32Array(N);
  for (const [a, b] of c.edges) { outDeg[a]++; inDeg[b]++; }
  return { inDeg, outDeg };
}

export { LAYERS };
