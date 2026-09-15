#!/usr/bin/env node
// neuPrint hemibrain v1.2.1 에서 시각(LC/LPLC) → 중간 → 하강(DN) 뉴런 부분그래프를 뽑아
// data/connectome.json (minified) + data/connectome.meta.json (pretty) 을 쓴다.
//
// raw API 응답은 data/raw/ 에 캐시되어 재실행 시 네트워크를 타지 않는다.
// 인증: NEUPRINT_TOKEN 환경변수 (없으면 .env / .env.local 에서 읽음).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DATASET, MAX_NODES, WEIGHT_THRESHOLD, buildConnectome } from '../src/connectome.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'data');
const RAW_DIR = path.join(DATA_DIR, 'raw');
const ENDPOINT = 'https://neuprint.janelia.org/api/custom/custom';

const NEURON_PAGE = 5000;   // 뉴런 목록 페이지 크기
const EDGE_CHUNK = 500;     // 간선 조회 시 한 요청당 pre-synaptic bodyId 수
const CONCURRENCY = 3;
const MAX_RETRY = 5;
const REQUEST_TIMEOUT_MS = 180_000;

// ---------- 인증 ----------

function loadToken() {
  if (process.env.NEUPRINT_TOKEN?.trim()) return process.env.NEUPRINT_TOKEN.trim();
  for (const name of ['.env', '.env.local']) {
    const file = path.join(ROOT, name);
    if (!existsSync(file)) continue;
    const lines = readFileSync(file, 'utf8').split(/\r?\n/).map((s) => s.trim()).filter((s) => s && !s.startsWith('#'));
    for (const line of lines) {
      const m = line.match(/^(?:export\s+)?NEUPRINT_TOKEN\s*=\s*(.*)$/);
      if (m) return m[1].trim().replace(/^(["'])(.*)\1$/, '$2');
    }
    // KEY=VALUE 형식이 아닌 한 줄짜리 파일은 토큰 자체로 간주
    if (lines.length === 1 && !lines[0].includes('=')) return lines[0];
  }
  return null;
}

// ---------- HTTP ----------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function cypher(query, token) {
  let lastErr;
  for (let attempt = 0; attempt <= MAX_RETRY; attempt++) {
    if (attempt > 0) {
      const delay = 1000 * 2 ** (attempt - 1) + Math.random() * 500;
      console.warn(`  retry ${attempt}/${MAX_RETRY} in ${Math.round(delay)}ms: ${lastErr.message}`);
      await sleep(delay);
    }
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ cypher: query, dataset: DATASET }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      const text = await res.text();
      if (res.status === 429 || res.status >= 500) {
        lastErr = new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 500)}`);
      const body = JSON.parse(text);
      if (body.error) throw new Error(`neuPrint error: ${body.error}`);
      return body;
    } catch (err) {
      if (err.name === 'AbortError' || err.name === 'TimeoutError' || err.cause?.code) {
        lastErr = err; // 네트워크/타임아웃은 재시도
        continue;
      }
      throw err;
    }
  }
  throw new Error(`giving up after ${MAX_RETRY} retries: ${lastErr.message}`);
}

// raw 응답을 data/raw/<name>.json 에 캐시. 있으면 API 를 타지 않는다.
async function cached(name, fetcher) {
  const file = path.join(RAW_DIR, `${name}.json`);
  if (existsSync(file)) return JSON.parse(readFileSync(file, 'utf8'));
  const body = await fetcher();
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(body));
  return body;
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

// ---------- 추출 ----------

// 타입이 붙은 Traced 뉴런 전부 (중간층 후보 풀). 약 2.3만 개.
async function fetchNeurons(token) {
  const rows = [];
  for (let page = 0; ; page++) {
    const body = await cached(`neurons-${String(page).padStart(2, '0')}`, () => cypher(
      `MATCH (n:Neuron {status:'Traced'}) WHERE n.type IS NOT NULL
       RETURN n.bodyId AS id, n.type AS type, n.instance AS instance, n.somaLocation AS soma
       ORDER BY n.bodyId SKIP ${page * NEURON_PAGE} LIMIT ${NEURON_PAGE}`, token));
    rows.push(...body.data);
    console.log(`  neurons page ${page}: ${body.data.length} rows`);
    if (body.data.length < NEURON_PAGE) break;
  }
  return rows.map(([id, type, instance, soma]) => ({
    id, type, instance: instance ?? '', soma: soma?.coordinates ?? null,
  }));
}

// 각 뉴런의 출력 간선 (weight >= threshold, 대상도 타입 있는 Traced 뉴런).
async function fetchEdges(neuronIds, token) {
  const chunks = [];
  for (let i = 0; i < neuronIds.length; i += EDGE_CHUNK) chunks.push(neuronIds.slice(i, i + EDGE_CHUNK));
  console.log(`  ${chunks.length} edge chunks of <= ${EDGE_CHUNK} pre-synaptic neurons`);
  let done = 0;
  const parts = await mapLimit(chunks, CONCURRENCY, async (ids, i) => {
    const hash = createHash('sha1').update(ids.join(',')).digest('hex').slice(0, 8);
    const body = await cached(`edges/${String(i).padStart(3, '0')}-${hash}`, () => cypher(
      `MATCH (a:Neuron)-[r:ConnectsTo]->(b:Neuron)
       WHERE a.bodyId IN [${ids.join(',')}] AND r.weight >= ${WEIGHT_THRESHOLD}
         AND b.status = 'Traced' AND b.type IS NOT NULL
       RETURN a.bodyId AS pre, b.bodyId AS post, r.weight AS weight`, token));
    done++;
    if (done % 5 === 0 || done === chunks.length) console.log(`  edges: ${done}/${chunks.length} chunks, +${body.data.length} rows`);
    return body.data;
  });
  return parts.flat();
}

function topTypes(neurons, layer, k = 10) {
  const count = new Map();
  for (const n of neurons) if (n.layer === layer) count.set(n.type, (count.get(n.type) ?? 0) + 1);
  return [...count].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1)).slice(0, k);
}

async function main() {
  const token = loadToken();
  if (!token) {
    console.error('NEUPRINT_TOKEN is not set (env var, .env, or .env.local). Aborting.');
    process.exit(2);
  }
  mkdirSync(RAW_DIR, { recursive: true });

  console.log(`[1/3] neurons (${DATASET})`);
  const neurons = await fetchNeurons(token);
  console.log(`  ${neurons.length} typed Traced neurons`);

  console.log('[2/3] edges');
  const edges = await fetchEdges(neurons.map((n) => n.id), token);
  console.log(`  ${edges.length} edges with weight >= ${WEIGHT_THRESHOLD}`);

  console.log('[3/3] build connectome');
  const connectome = buildConnectome(neurons, edges, {
    weightThreshold: WEIGHT_THRESHOLD, maxNodes: MAX_NODES, extractedAt: new Date().toISOString(),
  });

  const outFile = path.join(DATA_DIR, 'connectome.json');
  const metaFile = path.join(DATA_DIR, 'connectome.meta.json');
  writeFileSync(outFile, JSON.stringify(connectome));
  writeFileSync(metaFile, JSON.stringify(connectome.meta, null, 2) + '\n');

  const { meta } = connectome;
  console.log(`\nwrote ${path.relative(ROOT, outFile)} and ${path.relative(ROOT, metaFile)}`);
  console.log(`  nodes: ${meta.nodeCount} (input ${meta.layerSizes.input}, hidden ${meta.layerSizes.hidden}, output ${meta.layerSizes.output})`);
  console.log(`  edges: ${meta.edgeCount}`);
  console.log(`  hidden candidates: ${meta.hiddenCandidateCount}, truncated to ${MAX_NODES}: ${meta.truncated}`);
  console.log(`  dropped: ${meta.droppedSelfLoops} self-loops, ${meta.droppedDuplicateEdges} duplicate edges`);
  console.log('  top input types :', topTypes(connectome.neurons, 'input').map(([t, c]) => `${t}=${c}`).join(' '));
  console.log('  top output types:', topTypes(connectome.neurons, 'output').map(([t, c]) => `${t}=${c}`).join(' '));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
