// 커넥톰 추출·검증의 순수 로직. 파일/네트워크 I/O 없음 (scripts/ 에서 호출, test/ 에서 직접 검증).
//
// 용어
//   rawNeuron : { id: bodyId, type, instance, soma: [x,y,z] | null }
//   rawEdge   : [preBodyId, postBodyId, weight]
//   roiInfo   : neuPrint n.roiInfo JSON 문자열 { "<ROI>": { pre, post, ... }, ... } (super-ROI 가 하위 ROI 를 포함해 중첩)
//   connectome: data/connectome.json 스키마 (edges 는 neurons 배열 인덱스 기준)

export const DATASET = 'hemibrain:v1.2.1';
export const WEIGHT_THRESHOLD = 3;
export const MAX_NODES = 8000;
export const LAYERS = ['input', 'hidden', 'output'];

// DN* 패턴에 안 잡히는 하강뉴런. hemibrain v1.2.1 의 실제 type 문자열 그대로 (2026-09-15 API 확인).
//   Giant Fiber = DNp01. oviDN 은 oviDNa/oviDNb 두 type. 총 9 뉴런.
export const OUTPUT_ALLOWLIST = ['Giant Fiber', 'MDN', 'oviDNa', 'oviDNb', 'vpoDN'];

// type 문자열로 입력/출력층 판정. 해당 없으면 null (중간층 후보).
//  - LCNOp/LCNOpm 은 'LC' 로 시작하지만 중앙복합체 뉴런이라 시각 입력층에서 제외
//  - DN1a/DN1pA/DN1pB 등 DN1*/DN2*/DN3* 은 일주기 시계 뉴런이라 하강뉴런 출력층에서 제외
//  - OUTPUT_ALLOWLIST 는 패턴과 별개로 정확한 리터럴 일치만 본다
export function classifyLayer(type) {
  if (typeof type !== 'string') return null;
  if (/^(LC|LPLC)/.test(type)) return /^LCNO/.test(type) ? null : 'input';
  if (/^DN/.test(type)) return /^DN[123]/.test(type) ? null : 'output';
  if (OUTPUT_ALLOWLIST.includes(type)) return 'output';
  return null;
}

export const isKC = (type) => typeof type === 'string' && type.startsWith('KC');
export const isAllowlisted = (type) => OUTPUT_ALLOWLIST.includes(type);

// 뉴런의 주 뉴로필: roiInfo 에서 primaryRois (neuPrint :Meta.primaryRois, 최하위 ROI 집합) 에 속하는 ROI 중
// pre+post 시냅스 수 최대인 것. super-ROI(VLNP(R) 등) 는 하위 ROI 를 포함해 항상 이기므로 후보에서 뺀다.
// 동점은 이름 오름차순. roiInfo 가 없거나 primary ROI 가 하나도 없으면 null.
export function primaryRoi(roiInfo, primaryRois) {
  if (typeof roiInfo !== 'string' || !roiInfo) return null;
  let info;
  try { info = JSON.parse(roiInfo); } catch { return null; }
  if (!info || typeof info !== 'object') return null;
  let best = null;
  let bestCount = -1;
  for (const roi of primaryRois) {
    const e = info[roi];
    if (!e) continue;
    const count = (e.pre ?? 0) + (e.post ?? 0);
    if (count > bestCount || (count === bestCount && roi < best)) { best = roi; bestCount = count; }
  }
  return best;
}

export function filterEdgesByWeight(edges, threshold) {
  return edges.filter((e) => e[2] >= threshold);
}

// self-loop 제거 + (pre,post) 중복 제거. 중복은 첫 항목만 유지.
export function dedupeEdges(edges) {
  const seen = new Set();
  const out = [];
  let selfLoops = 0;
  let duplicates = 0;
  for (const e of edges) {
    if (e[0] === e[1]) { selfLoops++; continue; }
    const key = `${e[0]}>${e[1]}`;
    if (seen.has(key)) { duplicates++; continue; }
    seen.add(key);
    out.push(e);
  }
  return { edges: out, selfLoops, duplicates };
}

function adjacency(edges) {
  const out = new Map();
  const inn = new Map();
  for (const [pre, post] of edges) {
    if (!out.has(pre)) out.set(pre, []);
    out.get(pre).push(post);
    if (!inn.has(post)) inn.set(post, []);
    inn.get(post).push(pre);
  }
  return { out, inn };
}

// startIds 에서 adj 를 따라 maxHops 이내로 도달하는 노드 집합 (시작 노드 포함).
export function reachableWithin(startIds, adj, maxHops) {
  const seen = new Set(startIds);
  let frontier = [...startIds];
  for (let hop = 0; hop < maxHops && frontier.length; hop++) {
    const next = [];
    for (const id of frontier) {
      for (const nb of adj.get(id) ?? []) {
        if (!seen.has(nb)) { seen.add(nb); next.push(nb); }
      }
    }
    frontier = next;
  }
  return seen;
}

// 중간층 후보: 입력층에서 2-hop 이내 도달 가능 AND 출력층으로 2-hop 이내 도달, 입력/출력층 제외.
export function hiddenCandidates(neurons, edges, inputIds, outputIds, hops = 2) {
  const { out, inn } = adjacency(edges);
  const forward = reachableWithin(inputIds, out, hops);
  const backward = reachableWithin(outputIds, inn, hops);
  const io = new Set([...inputIds, ...outputIds]);
  return neurons.filter((n) => !io.has(n.id) && forward.has(n.id) && backward.has(n.id));
}

// nodeIds 내부 간선만 세어 노드별 total synaptic weight (in + out) 를 구한다.
export function totalWeightWithin(nodeIds, edges) {
  const score = new Map();
  for (const [pre, post, w] of edges) {
    if (!nodeIds.has(pre) || !nodeIds.has(post)) continue;
    score.set(pre, (score.get(pre) ?? 0) + w);
    score.set(post, (score.get(post) ?? 0) + w);
  }
  return score;
}

// 전체 노드가 maxNodes 를 넘으면 중간층만 total weight 상위 순으로 잘라 맞춘다.
// 동점은 bodyId 오름차순으로 결정적이게.
export function truncateHidden({ input, hidden, output }, edges, maxNodes) {
  const budget = maxNodes - input.length - output.length;
  if (hidden.length <= budget) return { hidden, truncated: false };
  if (budget < 0) throw new Error(`input(${input.length}) + output(${output.length}) exceeds maxNodes(${maxNodes})`);
  const ids = new Set([...input, ...hidden, ...output].map((n) => n.id));
  const score = totalWeightWithin(ids, edges);
  const ranked = [...hidden].sort((a, b) =>
    (score.get(b.id) ?? 0) - (score.get(a.id) ?? 0) || a.id - b.id);
  return { hidden: ranked.slice(0, budget), truncated: true };
}

const byTypeThenId = (a, b) => (a.type < b.type ? -1 : a.type > b.type ? 1 : a.id - b.id);

// rawNeuron[] + rawEdge[] → connectome.json 객체.
// roiInfoById (Map bodyId → roiInfo 문자열) 와 primaryRois 를 주면 뉴런별 roi 를 채운다. 없으면 전부 null.
export function buildConnectome(rawNeurons, rawEdges, {
  weightThreshold = WEIGHT_THRESHOLD,
  maxNodes = MAX_NODES,
  extractedAt = new Date().toISOString(),
  dataset = DATASET,
  roiInfoById = null,
  primaryRois = [],
} = {}) {
  const { edges, selfLoops, duplicates } = dedupeEdges(filterEdgesByWeight(rawEdges, weightThreshold));

  const input = rawNeurons.filter((n) => classifyLayer(n.type) === 'input');
  const output = rawNeurons.filter((n) => classifyLayer(n.type) === 'output');
  const inputIds = new Set(input.map((n) => n.id));
  const outputIds = new Set(output.map((n) => n.id));

  const candidates = hiddenCandidates(rawNeurons, edges, inputIds, outputIds);
  const { hidden, truncated } = truncateHidden({ input, hidden: candidates, output }, edges, maxNodes);

  const ordered = [
    ...input.sort(byTypeThenId).map((n) => ({ ...n, layer: 'input' })),
    ...hidden.sort(byTypeThenId).map((n) => ({ ...n, layer: 'hidden' })),
    ...output.sort(byTypeThenId).map((n) => ({ ...n, layer: 'output' })),
  ];
  const index = new Map(ordered.map((n, i) => [n.id, i]));

  const indexed = [];
  for (const [pre, post, w] of edges) {
    const a = index.get(pre);
    const b = index.get(post);
    if (a === undefined || b === undefined) continue;
    indexed.push([a, b, w]);
  }
  indexed.sort((x, y) => x[0] - y[0] || x[1] - y[1]);

  const neuronsOut = ordered.map((n) => ({
    id: n.id, type: n.type, layer: n.layer, instance: n.instance, soma: n.soma,
    isKC: isKC(n.type), isAllowlisted: isAllowlisted(n.type),
    roi: roiInfoById ? primaryRoi(roiInfoById.get(n.id), primaryRois) : null,
  }));
  const roiCounts = {};
  for (const n of neuronsOut) { const key = n.roi ?? 'null'; roiCounts[key] = (roiCounts[key] ?? 0) + 1; }

  return {
    meta: {
      dataset,
      extractedAt,
      nodeCount: ordered.length,
      edgeCount: indexed.length,
      layerSizes: { input: input.length, hidden: hidden.length, output: output.length },
      weightThreshold,
      hiddenCandidateCount: candidates.length,
      truncated,
      droppedSelfLoops: selfLoops,
      droppedDuplicateEdges: duplicates,
      // allowlist 로 실제 들어온 type 문자열 (정렬), KC 플래그 수
      outputAllowlisted: [...new Set(output.filter((n) => isAllowlisted(n.type)).map((n) => n.type))].sort(),
      kcCount: neuronsOut.filter((n) => n.isKC).length,
      // 주 뉴로필(primary ROI)별 뉴런 수. 못 정한 뉴런은 'null' 키.
      roiCounts: Object.fromEntries(Object.entries(roiCounts).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))),
    },
    neurons: neuronsOut,
    edges: indexed,
  };
}

// ---------- 스키마 파서 ----------

const isInt = (v) => Number.isInteger(v);
const fail = (msg) => { throw new Error(`connectome schema: ${msg}`); };

// JSON 문자열 또는 객체를 받아 스키마를 검사하고 객체를 돌려준다. 그래프 성질은 checkGraph 에서.
export function parseConnectome(input) {
  const c = typeof input === 'string' ? JSON.parse(input) : input;
  if (!c || typeof c !== 'object') fail('root must be an object');

  const m = c.meta;
  if (!m || typeof m !== 'object') fail('meta missing');
  if (typeof m.dataset !== 'string' || !m.dataset) fail('meta.dataset must be a non-empty string');
  if (typeof m.extractedAt !== 'string' || Number.isNaN(Date.parse(m.extractedAt))) fail('meta.extractedAt must be ISO8601');
  if (!isInt(m.nodeCount) || !isInt(m.edgeCount)) fail('meta.nodeCount/edgeCount must be integers');
  if (!m.layerSizes || !LAYERS.every((l) => isInt(m.layerSizes[l]))) fail('meta.layerSizes must have integer input/hidden/output');
  if (!isInt(m.weightThreshold)) fail('meta.weightThreshold must be an integer');
  if (!Array.isArray(m.outputAllowlisted) || !m.outputAllowlisted.every((t) => typeof t === 'string')) fail('meta.outputAllowlisted must be a string array');
  if (!isInt(m.kcCount)) fail('meta.kcCount must be an integer');
  if (!m.roiCounts || typeof m.roiCounts !== 'object' || !Object.values(m.roiCounts).every(isInt)) fail('meta.roiCounts must map ROI → integer');

  if (!Array.isArray(c.neurons)) fail('neurons must be an array');
  if (c.neurons.length !== m.nodeCount) fail(`neurons.length ${c.neurons.length} != meta.nodeCount ${m.nodeCount}`);
  const counts = { input: 0, hidden: 0, output: 0 };
  let kc = 0;
  const roiCounts = {};
  c.neurons.forEach((n, i) => {
    if (!n || typeof n !== 'object') fail(`neurons[${i}] must be an object`);
    if (!isInt(n.id)) fail(`neurons[${i}].id must be an integer`);
    if (typeof n.type !== 'string') fail(`neurons[${i}].type must be a string`);
    if (!LAYERS.includes(n.layer)) fail(`neurons[${i}].layer must be one of ${LAYERS.join('|')}`);
    if (typeof n.instance !== 'string') fail(`neurons[${i}].instance must be a string`);
    if (n.soma !== null && !(Array.isArray(n.soma) && n.soma.length === 3 && n.soma.every(Number.isFinite))) {
      fail(`neurons[${i}].soma must be [x,y,z] or null`);
    }
    if (typeof n.isKC !== 'boolean' || typeof n.isAllowlisted !== 'boolean') fail(`neurons[${i}].isKC/isAllowlisted must be booleans`);
    if (n.isAllowlisted && n.layer !== 'output') fail(`neurons[${i}] isAllowlisted but layer is ${n.layer}`);
    if (n.roi !== null && (typeof n.roi !== 'string' || !n.roi)) fail(`neurons[${i}].roi must be a non-empty string or null`);
    counts[n.layer]++;
    if (n.isKC) kc++;
    const key = n.roi ?? 'null';
    roiCounts[key] = (roiCounts[key] ?? 0) + 1;
  });
  for (const l of LAYERS) {
    if (counts[l] !== m.layerSizes[l]) fail(`layer ${l}: counted ${counts[l]} != meta.layerSizes.${l} ${m.layerSizes[l]}`);
  }
  if (kc !== m.kcCount) fail(`kcCount: counted ${kc} != meta.kcCount ${m.kcCount}`);
  const roiKeys = new Set([...Object.keys(roiCounts), ...Object.keys(m.roiCounts)]);
  for (const key of roiKeys) {
    if ((roiCounts[key] ?? 0) !== (m.roiCounts[key] ?? 0)) fail(`roiCounts[${key}]: counted ${roiCounts[key] ?? 0} != meta ${m.roiCounts[key] ?? 0}`);
  }

  if (!Array.isArray(c.edges)) fail('edges must be an array');
  if (c.edges.length !== m.edgeCount) fail(`edges.length ${c.edges.length} != meta.edgeCount ${m.edgeCount}`);
  c.edges.forEach((e, i) => {
    if (!Array.isArray(e) || e.length !== 3 || !e.every(isInt)) fail(`edges[${i}] must be [preIdx, postIdx, weight] integers`);
  });
  return c;
}

// ---------- 그래프 검사 (validate 스크립트용) ----------

// 각 항목 { name, ok, detail } 배열을 돌려준다. 파일 크기 등 I/O 검사는 스크립트 쪽.
export function checkGraph(c, { maxOrphanRatio = 0.05, maxRoiNullRatio = 0.10 } = {}) {
  const n = c.neurons.length;
  const results = [];
  const push = (name, ok, detail) => results.push({ name, ok, detail });

  let outOfRange = 0;
  let selfLoops = 0;
  let belowThreshold = 0;
  const seen = new Set();
  let duplicates = 0;
  const indeg = new Uint32Array(n);
  const outdeg = new Uint32Array(n);
  const out = Array.from({ length: n }, () => []);
  for (const [a, b, w] of c.edges) {
    if (a < 0 || a >= n || b < 0 || b >= n) { outOfRange++; continue; }
    if (a === b) selfLoops++;
    if (w < c.meta.weightThreshold) belowThreshold++;
    const key = a * n + b;
    if (seen.has(key)) duplicates++; else seen.add(key);
    outdeg[a]++; indeg[b]++; out[a].push(b);
  }
  push('edge indices in range', outOfRange === 0, `${outOfRange} out of range`);
  push('no self-loops', selfLoops === 0, `${selfLoops} self-loops`);
  push('no duplicate edges', duplicates === 0, `${duplicates} duplicates`);
  push('all weights >= threshold', belowThreshold === 0, `${belowThreshold} below ${c.meta.weightThreshold}`);

  const sizes = c.meta.layerSizes;
  push('every layer non-empty', LAYERS.every((l) => sizes[l] > 0), JSON.stringify(sizes));

  // BFS: 입력층 → 출력층 도달 가능 여부
  const layer = c.neurons.map((x) => x.layer);
  const visited = new Uint8Array(n);
  let queue = [];
  for (let i = 0; i < n; i++) if (layer[i] === 'input') { visited[i] = 1; queue.push(i); }
  let reachedOutput = 0;
  let hops = 0;
  let firstHit = -1;
  while (queue.length) {
    const next = [];
    for (const u of queue) {
      for (const v of out[u]) {
        if (visited[v]) continue;
        visited[v] = 1;
        next.push(v);
        if (layer[v] === 'output') { reachedOutput++; if (firstHit < 0) firstHit = hops + 1; }
      }
    }
    queue = next;
    hops++;
  }
  push('input reaches output (BFS)', reachedOutput > 0,
    `${reachedOutput}/${sizes.output} output neurons reachable, shortest path ${firstHit} hop(s)`);

  let orphans = 0;
  for (let i = 0; i < n; i++) if (indeg[i] === 0 && outdeg[i] === 0) orphans++;
  const ratio = n ? orphans / n : 0;
  push(`orphan ratio < ${maxOrphanRatio * 100}%`, ratio < maxOrphanRatio, `${orphans}/${n} = ${(ratio * 100).toFixed(2)}%`);

  const roiNull = c.neurons.filter((x) => x.roi === null).length;
  const roiNullRatio = n ? roiNull / n : 0;
  const roiCount = Object.keys(c.meta.roiCounts).filter((k) => k !== 'null').length;
  push(`roi null ratio < ${maxRoiNullRatio * 100}%`, roiNullRatio < maxRoiNullRatio,
    `${roiNull}/${n} = ${(roiNullRatio * 100).toFixed(2)}% null, ${roiCount} distinct primary ROIs`);

  return results;
}
