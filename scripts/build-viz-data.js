#!/usr/bin/env node
// 6단계 시각화 데이터: web/data/graph-viz.json (서브샘플 그래프 < 2 MB), episode.json (한 게임 기록), summary.json (화면용 수치).
// 새 실험은 없다 — data/*.json 과 학습된 리드아웃을 읽어 쓴다.

import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseConnectome } from '../src/connectome.js';
import { buildSummary, recordEpisode, subsampleGraph } from '../src/viz.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'web', 'data');
const kb = (f) => `${(statSync(f).size / 1024).toFixed(0)} KB`;

function main() {
  mkdirSync(OUT, { recursive: true });
  const connectome = parseConnectome(readFileSync(path.join(ROOT, 'data', 'connectome.json'), 'utf8'));
  const spectral = JSON.parse(readFileSync(path.join(ROOT, 'data', 'spectral.json'), 'utf8'));
  const results = JSON.parse(readFileSync(path.join(ROOT, 'data', 'results.json'), 'utf8'));
  const search = JSON.parse(readFileSync(path.join(ROOT, 'data', 'separation-search.json'), 'utf8'));

  // 1. 서브샘플 그래프
  const graph = subsampleGraph(connectome, { input: 200, hidden: 600, maxEdges: 30000, seed: 6 });
  const gFile = path.join(OUT, 'graph-viz.json');
  writeFileSync(gFile, JSON.stringify(graph));
  const m = graph.meta;
  console.log(`graph-viz.json: ${m.counts.input}/${m.counts.hidden}/${m.counts.output} nodes, ${m.counts.edges} edges (of ${m.counts.edgesAmongSampled} among sampled), KC share ${(m.kcShareHiddenFull * 100).toFixed(1)}% → ${(m.kcShareHiddenSampled * 100).toFixed(1)}%, soma fallback ${m.coordinates.fallbackCount}, ${kb(gFile)}`);
  if (statSync(gFile).size > 2 * 1024 * 1024) { console.error('graph-viz.json exceeds 2 MB'); process.exitCode = 1; }

  // 2. 에피소드: C0 재캘리브레이션 점 (T·G_IN 은 1부 선택점) + C0 R3:V2 리드아웃
  const c0 = results.conditions.C0;
  const { gap, g, ...params } = c0.params;
  const op = results.config.operating;
  const readout = c0.readouts['R3:V2'].readout;
  const episode = recordEpisode(connectome, spectral, params, { T: op.T, gIn: op.gIn, readout, target: 'V2', seed: 100, cap: results.config.play.cap, sampledIndices: graph.nodes.map((n) => n.i) });
  const eFile = path.join(OUT, 'episode.json');
  writeFileSync(eFile, JSON.stringify(episode));
  const em = episode.meta;
  const taus = episode.decisions.map((d) => d.tau);
  console.log(`episode.json: ${em.pieces} pieces, ${em.lines} lines, ${em.decisions} decisions, mean candidates ${(episode.decisions.reduce((s, d) => s + d.candidates.length, 0) / em.decisions).toFixed(1)}, per-decision τ mean ${(taus.reduce((a, b) => a + b, 0) / taus.length).toFixed(3)}, ${kb(eFile)}`);

  // 3. 요약
  const summary = buildSummary(results, search, spectral);
  const sFile = path.join(OUT, 'summary.json');
  writeFileSync(sFile, JSON.stringify(summary));
  console.log(`summary.json: ${summary.conditions.length} conditions, ${summary.search.points.length} search points, ${kb(sFile)}`);
}

main();
