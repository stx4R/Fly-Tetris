#!/usr/bin/env node
// 캘리브레이션된 리저버 + 랜덤 리드아웃으로 500조각 플레이. 크래시 없이 완주하고 전 배치가 합법인지
// 확인하며 배치/초 처리량을 낸다. 게임오버가 나면 보드와 리저버를 리셋하고 새 에피소드로 이어간다.
// 도달불가 DN (입력층에서 BFS 로 못 가는 출력 뉴런) 이 실제로 0회 발화하는지도 확인한다.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseConnectome } from '../src/connectome.js';
import { createEncoder } from '../src/encode.js';
import { WINDOW, createReservoir } from '../src/reservoir.js';
import { createDecoder } from '../src/decode.js';
import { createRng } from '../src/prng.js';
import { applyPlacement, createBag, emptyBoard, legalPlacements } from '../src/tetris.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PIECES = 500;
const SEED = 7;

function unreachableOutputs(connectome) {
  const N = connectome.neurons.length;
  const out = Array.from({ length: N }, () => []);
  for (const [a, b] of connectome.edges) out[a].push(b);
  const seen = new Uint8Array(N);
  let queue = [];
  connectome.neurons.forEach((n, i) => { if (n.layer === 'input') { seen[i] = 1; queue.push(i); } });
  while (queue.length) {
    const next = [];
    for (const u of queue) for (const v of out[u]) if (!seen[v]) { seen[v] = 1; next.push(v); }
    queue = next;
  }
  return connectome.neurons.map((n, i) => i).filter((i) => connectome.neurons[i].layer === 'output' && !seen[i]);
}

function main() {
  const connectome = parseConnectome(readFileSync(path.join(ROOT, 'data', 'connectome.json'), 'utf8'));
  const calib = JSON.parse(readFileSync(path.join(ROOT, 'data', 'calibration.json'), 'utf8'));
  const point = calib.selected ?? calib.fallback;
  if (!point) throw new Error('calibration.json has neither selected nor fallback point');
  if (!calib.selected) {
    console.warn(`WARNING: calibration met no target set; using FALLBACK point g=${point.g} k=${point.k} (targets met ${point.targetsMet}/4). `
      + 'Throughput/legality results are valid; the operating point is not calibrated.');
  } else {
    console.log(`using calibrated point g=${point.g} k=${point.k}`);
  }

  const encoder = createEncoder(connectome);
  const reservoir = createReservoir(connectome, { g: point.g, k: point.k });
  const decoder = createDecoder({ nOutput: reservoir.nOutput, seed: SEED });
  const rng = createRng(SEED);
  const bag = createBag(rng);
  const unreachable = unreachableOutputs(connectome);
  const dnTotal = new Float64Array(reservoir.nOutput);

  let board = emptyBoard();
  let episodes = 1, lines = 0, illegal = 0, placements = 0, spikes = 0, episodeLen = 0;
  const episodeLengths = [];
  let encodeMs = 0, reservoirMs = 0, decodeMs = 0;
  reservoir.reset();
  const t0 = performance.now();
  while (placements < PIECES) {
    const piece = bag.next();
    const legal = legalPlacements(board, piece);
    if (legal.length === 0) {
      episodeLengths.push(episodeLen);
      episodeLen = 0;
      episodes++;
      board = emptyBoard();
      reservoir.reset();
      continue;
    }
    let t = performance.now();
    const iExt = encoder.encode(board, piece);
    encodeMs += performance.now() - t; t = performance.now();
    const { counts, total } = reservoir.run(iExt, WINDOW);
    reservoirMs += performance.now() - t; t = performance.now();
    const rates = reservoir.outputRates(counts, WINDOW);
    const choice = decoder.decode(rates, legal);
    decodeMs += performance.now() - t;
    spikes += total;
    for (let i = 0; i < reservoir.nOutput; i++) dnTotal[i] += counts[reservoir.outputStart + i];

    if (!legal.some((p) => p.col === choice.col && p.rot === choice.rot)) illegal++;
    const r = applyPlacement(board, piece, choice.col, choice.rot);
    if (r.gameOver) throw new Error('legal placement reported gameOver');
    board = r.board;
    lines += r.linesCleared;
    placements++;
    episodeLen++;
  }
  const elapsed = (performance.now() - t0) / 1000;
  episodeLengths.push(episodeLen);

  const unreachableSpikes = unreachable.map((i) => dnTotal[i - reservoir.outputStart]);
  const dnActive = Array.from(dnTotal).filter((c) => c > 0).length;

  console.log(`\n${placements} placements in ${elapsed.toFixed(2)} s → ${(placements / elapsed).toFixed(0)} placements/s (single thread)`);
  console.log(`  per placement: encode ${(encodeMs / placements).toFixed(3)} ms, reservoir ${(reservoirMs / placements).toFixed(3)} ms, decode ${(decodeMs / placements).toFixed(3)} ms`);
  console.log(`  episodes ${episodes} (mean length ${(placements / episodes).toFixed(1)} pieces), lines cleared ${lines}, illegal placements ${illegal}`);
  console.log(`  mean rate ${(spikes / placements / reservoir.N / (WINDOW / 1000)).toFixed(2)} Hz, DNs ever active ${dnActive}/${reservoir.nOutput}`);
  console.log(`  unreachable DNs ${unreachable.length} (${unreachable.map((i) => connectome.neurons[i].type).join(', ')}): spikes ${JSON.stringify(unreachableSpikes)}`);

  if (illegal > 0) { console.error('FAIL: illegal placements chosen'); process.exit(1); }
  if (unreachableSpikes.some((c) => c > 0)) { console.error('FAIL: unreachable DN fired'); process.exit(1); }
  console.log('smoke run OK');
}

main();
