import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildConnectome,
  checkGraph,
  classifyLayer,
  dedupeEdges,
  filterEdgesByWeight,
  hiddenCandidates,
  parseConnectome,
  truncateHidden,
} from '../src/connectome.js';

// ---------- 픽스처 ----------

const neuron = (id, type, layer, extra = {}) => ({
  id, type, layer, instance: `${type}_R`, soma: [1, 2, 3], isKC: false, isAllowlisted: false, ...extra,
});

// 3-노드 최소 커넥톰: input(0) → hidden(1) → output(2)
function smallConnectome() {
  return {
    meta: {
      dataset: 'hemibrain:v1.2.1',
      extractedAt: '2026-09-15T00:00:00.000Z',
      nodeCount: 3,
      edgeCount: 2,
      layerSizes: { input: 1, hidden: 1, output: 1 },
      weightThreshold: 3,
      outputAllowlisted: [],
      kcCount: 0,
    },
    neurons: [
      neuron(100, 'LC4', 'input'),
      neuron(200, 'PVLP001', 'hidden', { soma: null }),
      neuron(300, 'DNp04', 'output'),
    ],
    edges: [[0, 1, 5], [1, 2, 7]],
  };
}

// raw 그래프 (bodyId 기준). 입력 LC4(1), LPLC2(2); 출력 DNp04(9); 나머지 후보.
//   1 → 3 → 9         (3: 1-hop from input, 1-hop to output)
//   2 → 4 → 5 → 9     (4: 1-hop in / 2-hop out, 5: 2-hop in / 1-hop out)
//   1 → 6 → 7 → 8 → 9 (7: 2-hop in / 2-hop out, 8: 3-hop in → 탈락, 6: 3-hop out → 탈락)
//   10: 고립 (탈락), 11: LCNOp (입력 아님), 12: DN1a (출력 아님)
const rawNeurons = [
  { id: 1, type: 'LC4', instance: 'LC4', soma: [0, 0, 0] },
  { id: 2, type: 'LPLC2', instance: 'LPLC2', soma: null },
  { id: 3, type: 'A', instance: 'A', soma: null },
  { id: 4, type: 'B', instance: 'B', soma: null },
  { id: 5, type: 'C', instance: 'C', soma: null },
  { id: 6, type: 'D', instance: 'D', soma: null },
  { id: 7, type: 'E', instance: 'E', soma: null },
  { id: 8, type: 'F', instance: 'F', soma: null },
  { id: 9, type: 'DNp04', instance: 'DNp04', soma: [9, 9, 9] },
  { id: 10, type: 'G', instance: 'G', soma: null },
  { id: 11, type: 'LCNOp', instance: 'LCNOp', soma: null },
  { id: 12, type: 'DN1a', instance: 'DN1a', soma: null },
  { id: 13, type: 'KCg-m', instance: 'KCg-m', soma: null },   // 3 → 13 → 14 : KC 중간층
  { id: 14, type: 'MDN', instance: 'MDN_R', soma: null },     // allowlist 출력
];
const rawEdges = [
  [1, 3, 10], [3, 9, 10],
  [2, 4, 20], [4, 5, 20], [5, 9, 20],
  [1, 6, 5], [6, 7, 5], [7, 8, 5], [8, 9, 5],
  [3, 7, 4],   // 7 이 고아가 되지 않도록
  [3, 4, 2],   // 임계값 미만 → 버려짐
  [11, 3, 50], [3, 12, 50],
  [3, 13, 6], [13, 14, 6],
];

// ---------- 스키마 파서 ----------

test('parseConnectome: accepts a valid fixture (object and JSON string)', () => {
  const c = smallConnectome();
  assert.equal(parseConnectome(c), c);
  const parsed = parseConnectome(JSON.stringify(c));
  assert.deepEqual(parsed, c);
});

test('parseConnectome: rejects malformed documents', () => {
  const cases = [
    ['meta missing', (c) => { delete c.meta; }],
    ['extractedAt', (c) => { c.meta.extractedAt = 'yesterday'; }],
    ['nodeCount', (c) => { c.meta.nodeCount = 99; }],
    ['layerSizes', (c) => { c.meta.layerSizes.hidden = 0; }],
    ['layer', (c) => { c.neurons[1].layer = 'middle'; }],
    ['id', (c) => { c.neurons[0].id = '100'; }],
    ['soma', (c) => { c.neurons[0].soma = [1, 2]; }],
    ['instance', (c) => { c.neurons[2].instance = null; }],
    ['edgeCount', (c) => { c.edges.push([0, 2, 4]); }],
    ['edges', (c) => { c.edges[0] = [0, 1]; }],
    ['edges', (c) => { c.edges[0] = [0, 1, 2.5]; }],
    ['isKC', (c) => { delete c.neurons[0].isKC; }],
    ['kcCount', (c) => { c.neurons[1].isKC = true; }],
    ['isAllowlisted but layer', (c) => { c.neurons[1].isAllowlisted = true; }],
    ['outputAllowlisted', (c) => { c.meta.outputAllowlisted = 'MDN'; }],
  ];
  for (const [label, mutate] of cases) {
    const c = smallConnectome();
    mutate(c);
    assert.throws(() => parseConnectome(c), new RegExp(`connectome schema: .*${label}`), label);
  }
});

// ---------- weight 임계값 ----------

test('filterEdgesByWeight: drops edges below threshold, keeps equal', () => {
  const edges = [[1, 2, 2], [1, 3, 3], [2, 3, 100], [3, 1, 0]];
  assert.deepEqual(filterEdgesByWeight(edges, 3), [[1, 3, 3], [2, 3, 100]]);
  assert.deepEqual(filterEdgesByWeight(edges, 0), edges);
});

test('dedupeEdges: removes self-loops and duplicate pairs', () => {
  const { edges, selfLoops, duplicates } = dedupeEdges([[1, 2, 5], [2, 2, 9], [1, 2, 6], [2, 1, 1]]);
  assert.deepEqual(edges, [[1, 2, 5], [2, 1, 1]]);
  assert.equal(selfLoops, 1);
  assert.equal(duplicates, 1);
});

// ---------- 층 판정 / 2-hop 후보 ----------

test('classifyLayer: LC*/LPLC* input, DN* output, with known non-members excluded', () => {
  assert.equal(classifyLayer('LC4'), 'input');
  assert.equal(classifyLayer('LPLC2'), 'input');
  assert.equal(classifyLayer('LCNOp'), null);
  assert.equal(classifyLayer('DNp04'), 'output');
  assert.equal(classifyLayer('DNES1'), 'output');
  assert.equal(classifyLayer('DN1pA'), null);
  assert.equal(classifyLayer('PVLP001'), null);
  assert.equal(classifyLayer(null), null);
  // allowlist: 정확한 리터럴만. 접두어/부분 일치는 안 됨
  for (const t of ['Giant Fiber', 'MDN', 'oviDNa', 'oviDNb', 'vpoDN']) assert.equal(classifyLayer(t), 'output', t);
  assert.equal(classifyLayer('oviDN'), null);
  assert.equal(classifyLayer('MDN2'), null);
  assert.equal(classifyLayer('giant fiber'), null);
});

test('hiddenCandidates: 2-hop reachable from input and 2-hop to output', () => {
  const edges = filterEdgesByWeight(rawEdges, 3);
  const hidden = hiddenCandidates(rawNeurons, edges, new Set([1, 2]), new Set([9, 14]));
  assert.deepEqual(hidden.map((n) => n.id), [3, 4, 5, 7, 13]);
});

// ---------- 8000 절단 ----------

test('truncateHidden: no truncation when under the cap', () => {
  const input = [neuron(1, 'LC4')];
  const output = [neuron(9, 'DNp04')];
  const hidden = [neuron(3, 'A'), neuron(4, 'B')];
  const r = truncateHidden({ input, hidden, output }, [[1, 3, 5], [4, 9, 5]], 4);
  assert.equal(r.truncated, false);
  assert.deepEqual(r.hidden.map((n) => n.id), [3, 4]);
});

test('truncateHidden: keeps all input/output, cuts hidden by total weight within subgraph', () => {
  const input = [neuron(1, 'LC4'), neuron(2, 'LPLC2')];
  const output = [neuron(9, 'DNp04')];
  const hidden = [neuron(3, 'A'), neuron(4, 'B'), neuron(5, 'C'), neuron(6, 'D')];
  const edges = [
    [1, 3, 10], [3, 9, 10],   // 3: 20
    [2, 4, 30],               // 4: 30
    [4, 5, 5], [5, 9, 5],     // 5: 10 (4 는 35 로 상승)
    [1, 6, 8],                // 6: 8
    [6, 77, 1000],            // 후보 집합 밖 노드로의 간선은 점수에 안 들어감
  ];
  const r = truncateHidden({ input, hidden, output }, edges, 5);
  assert.equal(r.truncated, true);
  assert.deepEqual(r.hidden.map((n) => n.id).sort(), [3, 4]);
});

test('truncateHidden: ties resolved by ascending bodyId', () => {
  const input = [neuron(1, 'LC4')];
  const output = [neuron(9, 'DNp04')];
  const hidden = [neuron(30, 'A'), neuron(20, 'B'), neuron(10, 'C')];
  const edges = [[1, 30, 5], [1, 20, 5], [1, 10, 5]];
  const r = truncateHidden({ input, hidden, output }, edges, 4);
  assert.deepEqual(r.hidden.map((n) => n.id), [10, 20]);
});

test('truncateHidden: throws when input+output alone exceed the cap', () => {
  assert.throws(() => truncateHidden({ input: [neuron(1, 'LC4')], hidden: [neuron(3, 'A')], output: [neuron(9, 'DNp04')] }, [], 1));
});

// ---------- 종단 ----------

test('buildConnectome: end-to-end on the fixture, output passes parser and graph checks', () => {
  const c = buildConnectome(rawNeurons, rawEdges, { weightThreshold: 3, maxNodes: 100, extractedAt: '2026-09-15T00:00:00.000Z' });
  parseConnectome(c);
  assert.deepEqual(c.meta.layerSizes, { input: 2, hidden: 5, output: 2 });
  assert.equal(c.meta.truncated, false);
  assert.equal(c.meta.hiddenCandidateCount, 5);
  assert.deepEqual(c.meta.outputAllowlisted, ['MDN']);
  assert.equal(c.meta.kcCount, 1);
  // 순서: input(LC4, LPLC2) → hidden(A,B,C,E,KCg-m) → output(DNp04, MDN)
  assert.deepEqual(c.neurons.map((n) => n.id), [1, 2, 3, 4, 5, 7, 13, 9, 14]);
  assert.deepEqual(c.neurons.map((n) => n.isKC), [false, false, false, false, false, false, true, false, false]);
  assert.deepEqual(c.neurons.map((n) => n.isAllowlisted), [false, false, false, false, false, false, false, false, true]);
  // 인덱스 간선: 1→3=[0,2], 2→4=[1,3], 3→7=[2,5], 3→13=[2,6], 3→9=[2,7], 4→5=[3,4], 5→9=[4,7], 13→14=[6,8]
  assert.deepEqual(c.edges, [[0, 2, 10], [1, 3, 20], [2, 5, 4], [2, 6, 6], [2, 7, 10], [3, 4, 20], [4, 7, 20], [6, 8, 6]]);
  assert.equal(c.meta.edgeCount, 8);
  assert.ok(checkGraph(c).every((r) => r.ok), JSON.stringify(checkGraph(c).filter((r) => !r.ok)));
});

test('buildConnectome: cap forces hidden truncation', () => {
  const c = buildConnectome(rawNeurons, rawEdges, { weightThreshold: 3, maxNodes: 6 });
  assert.equal(c.meta.truncated, true);
  assert.deepEqual(c.meta.layerSizes, { input: 2, hidden: 2, output: 2 });
  assert.equal(c.meta.nodeCount, 6);
  // 후보 점수: 3=30, 4=40, 5=40, 7=4, 13=12 → 4, 5 유지
  assert.deepEqual(c.neurons.filter((n) => n.layer === 'hidden').map((n) => n.id), [4, 5]);
});

test('checkGraph: flags out-of-range, self-loop, duplicate, unreachable, orphan', () => {
  const c = smallConnectome();
  c.edges = [[0, 0, 5], [0, 1, 5], [0, 1, 5], [0, 7, 5]];
  c.meta.edgeCount = 4;
  const bad = Object.fromEntries(checkGraph(c).map((r) => [r.name, r.ok]));
  assert.equal(bad['edge indices in range'], false);
  assert.equal(bad['no self-loops'], false);
  assert.equal(bad['no duplicate edges'], false);
  assert.equal(bad['input reaches output (BFS)'], false);
  assert.equal(bad['orphan ratio < 5%'], false); // output(2) 가 고아 → 1/3
});
