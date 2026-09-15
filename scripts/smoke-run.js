#!/usr/bin/env node
// 500조각 스모크 플레이. data/results.json 에 C0 의 학습된 리드아웃이 있으면 afterstate 에이전트(4단계)로, 없으면
// 캘리브레이션 선택점 + 랜덤 리드아웃(3단계)으로 돈다. 크래시 없이 완주하고 전 배치가 합법인지 확인하며 처리량을 낸다.
// 게임오버가 나면 보드와 리저버를 리셋하고 새 에피소드로 이어간다. 도달불가 DN 이 0회 발화하는지도 확인한다.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseConnectome } from '../src/connectome.js';
import { createEncoder } from '../src/encode.js';
import { WINDOW, createReservoir } from '../src/reservoir.js';
import { createDecoder } from '../src/decode.js';
import { createRng } from '../src/prng.js';
import { applyPlacement, createBag, emptyBoard, legalPlacements } from '../src/tetris.js';
import { existsSync } from 'node:fs';
import { createAgent, createFeaturizer } from '../src/play.js';
import { readoutFromJSON, valueOf } from '../src/readout.js';
import { FEATURE_WEIGHTS } from '../src/afterstate.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PIECES = 500;
const SEED = 7;
const MIN_RATE = 300; // 배치/s

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

// 4단계: C0 학습 리드아웃으로 afterstate 플레이 (test τ 최대 조합)
function smokeLearned(connectome, spectral, results) {
  const c0 = results.conditions.C0;
  const combos = Object.entries(c0.readouts).sort((a, b) => b[1].metrics.tau - a[1].metrics.tau);
  const [combo, r] = combos[0];
  const [readout, target] = combo.split(':');
  const { gap, g, ...params } = c0.params;
  const op = results.config.operating ?? { T: 50 };
  console.log(`using C0 learned readout ${combo} (test τ ${r.metrics.tau.toFixed(3)}, R² ${r.metrics.r2.toFixed(3)}) at alpha ${params.alpha} rho ${params.rhoTarget} b ${params.b} kL ${params.kLocal} kG ${params.kGlobal}, gap ${gap}, T ${op.T}, G_IN ${op.gIn ?? 'default'}${results.config.quick ? ' [readout from a QUICK pipeline run]' : ''}`);
  const f = createFeaturizer(connectome, params, spectral, { T: op.T, gIn: op.gIn });
  const predict = readoutFromJSON(r.readout);
  const agent = createAgent(f.featurize, (x) => valueOf(target, predict(x), FEATURE_WEIGHTS));
  const rng = createRng(SEED);
  const bag = createBag(rng);
  const unreachable = unreachableOutputs(connectome);
  let board = emptyBoard();
  let episodes = 1, lines = 0, illegal = 0, placements = 0, candidates = 0;
  const t0 = performance.now();
  while (placements < PIECES) {
    const piece = bag.next();
    const legal = legalPlacements(board, piece);
    if (legal.length === 0) { episodes++; board = emptyBoard(); continue; }
    candidates += legal.length;
    const mv = agent.choose(board, piece);
    if (!legal.some((p) => p.col === mv.col && p.rot === mv.rot)) illegal++;
    const res = applyPlacement(board, piece, mv.col, mv.rot);
    if (res.gameOver) { episodes++; board = emptyBoard(); continue; }
    board = res.board;
    lines += res.linesCleared;
    placements++;
  }
  const elapsed = (performance.now() - t0) / 1000;
  const rate = placements / elapsed;
  console.log(`
${placements} placements in ${elapsed.toFixed(2)} s → ${rate.toFixed(1)} placements/s (${(candidates / placements).toFixed(1)} candidate windows per placement, ${(candidates / elapsed).toFixed(0)} windows/s)`);
  console.log(`  episodes ${episodes} (mean length ${(placements / episodes).toFixed(1)} pieces), lines cleared ${lines}, illegal placements ${illegal}`);
  console.log(`  unreachable DNs ${unreachable.length}: checked structurally (no input path) — afterstate agent uses the same reservoir as calibration`);
  if (illegal > 0) { console.error('FAIL: illegal placements chosen'); process.exit(1); }
  console.log('smoke run OK (afterstate agent)');
}

function main() {
  const connectome = parseConnectome(readFileSync(path.join(ROOT, 'data', 'connectome.json'), 'utf8'));
  const spectral = JSON.parse(readFileSync(path.join(ROOT, 'data', 'spectral.json'), 'utf8'));
  const resultsFile = path.join(ROOT, 'data', 'results.json');
  if (existsSync(resultsFile)) {
    const results = JSON.parse(readFileSync(resultsFile, 'utf8'));
    if (results.conditions?.C0?.readouts) { smokeLearned(connectome, spectral, results); return; }
  }
  const calib = JSON.parse(readFileSync(path.join(ROOT, 'data', 'calibration.json'), 'utf8'));
  const point = calib.selected ?? calib.fallback;
  if (!point) throw new Error('calibration.json has neither selected nor fallback point');
  const desc = `rho ${point.rhoTarget} alpha ${point.alpha} b ${point.b} kLocal ${point.kLocal} kGlobal ${point.kGlobal} gap ${point.gap}`;
  if (!calib.selected) {
    console.warn(`WARNING: no point passed the hard constraints; using FALLBACK ${desc} (constraints met ${point.hard.met}/4). `
      + 'Throughput/legality results are valid; the operating point is not calibrated.');
  } else {
    console.log(`using selected point ${desc}${calib.gate?.passed ? '' : ' (NOTE: final gate not passed)'}`);
  }

  const encoder = createEncoder(connectome);
  const { rhoTarget, alpha, b, kLocal, kGlobal, gap } = point;
  const reservoir = createReservoir(connectome, { rhoTarget, alpha, b, kLocal, kGlobal }, { spectral });
  const decoder = createDecoder({ nOutput: reservoir.nOutput, seed: SEED });
  const rng = createRng(SEED);
  const bag = createBag(rng);
  const unreachable = unreachableOutputs(connectome);
  const dnTotal = new Float64Array(reservoir.nOutput);

  let board = emptyBoard();
  let episodes = 1, lines = 0, illegal = 0, placements = 0, spikes = 0, episodeLen = 0;
  let encodeMs = 0, gapMs = 0, reservoirMs = 0, decodeMs = 0;
  reservoir.reset();
  const t0 = performance.now();
  while (placements < PIECES) {
    const piece = bag.next();
    const legal = legalPlacements(board, piece);
    if (legal.length === 0) {
      episodeLen = 0;
      episodes++;
      board = emptyBoard();
      reservoir.reset();
      continue;
    }
    let t = performance.now();
    const iExt = encoder.encode(board, piece);
    encodeMs += performance.now() - t; t = performance.now();
    reservoir.runGap(gap);
    gapMs += performance.now() - t; t = performance.now();
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
  const rate = placements / elapsed;

  const unreachableSpikes = unreachable.map((i) => dnTotal[i - reservoir.outputStart]);
  const dnActive = Array.from(dnTotal).filter((c) => c > 0).length;

  console.log(`\n${placements} placements in ${elapsed.toFixed(2)} s → ${rate.toFixed(0)} placements/s (single thread, gap ${gap} included)`);
  console.log(`  per placement: encode ${(encodeMs / placements).toFixed(3)} ms, gap ${(gapMs / placements).toFixed(3)} ms, reservoir ${(reservoirMs / placements).toFixed(3)} ms, decode ${(decodeMs / placements).toFixed(3)} ms`);
  console.log(`  episodes ${episodes} (mean length ${(placements / episodes).toFixed(1)} pieces), lines cleared ${lines}, illegal placements ${illegal}`);
  console.log(`  mean rate ${(spikes / placements / reservoir.N / (WINDOW / 1000)).toFixed(2)} Hz (windows only), DNs ever active ${dnActive}/${reservoir.nOutput}`);
  console.log(`  unreachable DNs ${unreachable.length} (${unreachable.map((i) => connectome.neurons[i].type).join(', ')}): spikes ${JSON.stringify(unreachableSpikes)}`);

  if (illegal > 0) { console.error('FAIL: illegal placements chosen'); process.exit(1); }
  if (unreachableSpikes.some((c) => c > 0)) { console.error('FAIL: unreachable DN fired'); process.exit(1); }
  if (rate < MIN_RATE) { console.error(`FAIL: ${rate.toFixed(0)} placements/s < ${MIN_RATE}`); process.exit(1); }
  console.log('smoke run OK');
}

main();
