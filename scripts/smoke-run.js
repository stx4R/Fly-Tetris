#!/usr/bin/env node
// 스모크 플레이. 우선순위: (7단계) data/stage7/c0.model.json 이 있으면 학습된 C0 희소 RNN 으로 대전 엔진 1000 조각 (전체 후보, 단일 스레드) →
// (4단계) data/results.json 의 C0 학습 리드아웃으로 afterstate 플레이 500 조각 → (3단계) 캘리브레이션 선택점 + 랜덤 리드아웃.
// 크래시 없이 완주하고 전 배치가 합법인지 확인하며 처리량을 낸다. 옵션: --stage4 / --stage3 로 이전 단계 경로 강제, --pieces N.

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
import { applyDecision, createPlayer, decisionCandidates } from '../src/tetris.js';
import { createNetAgent } from '../src/stage7-agent.js';
import { loadModel } from './stage7-lib.js';

const argv = process.argv.slice(2);
const optNum = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? Number(argv[i + 1]) : def; };

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

// 7단계: 학습된 C0 (커넥톰 마스크 + 학습 가중치) 로 대전 엔진 플레이. 결정마다 전체 후보의 afterstate 를 점수화해 argmax — 선택이 decisionCandidates 안에 있는지 확인.
function smokeStage7(connectome, pieces) {
  const loaded = loadModel('c0', connectome);
  const { doc, model } = loaded;
  console.log(`using stage-7 C0 model data/stage7/${doc.file} (P ${doc.P}, trained ${doc.trainedAt}, rounds ${doc.rounds}; test top-1 ${(100 * doc.test.top1).toFixed(1)}%, play attack median ${doc.play.attackMedian}, survival ${(100 * doc.play.survival).toFixed(0)}%; gate ${doc.gate?.all ? 'passed' : 'NOT passed'})`);
  const hold = doc.teacher?.hold ?? true; // 학습 시 교사·에이전트의 행동 집합 (A-4 1ply 는 hold 없음; A-4′·A-3 는 hold 포함)
  const agent = createNetAgent(model, { hold });
  if (doc.teacher) console.log(`  teacher ${doc.teacher.variant} (ply ${doc.teacher.ply}, hold ${hold}) — candidate set ${hold ? 'current ∪ hold' : 'current piece only'}`);
  const same = (a, b) => a.useHold === b.useHold && a.col === b.col && a.rot === b.rot && a.top === b.top;
  let p = createPlayer(SEED);
  let placed = 0, illegal = 0, episodes = 1, candidates = 0, lines = 0, attack = 0;
  const t0 = performance.now();
  while (placed < pieces) {
    const legal = decisionCandidates(p);
    if (!legal.length || p.dead) { episodes++; p = createPlayer(SEED + episodes); continue; }
    candidates += legal.length;
    const c = agent.choose(p);
    if (!c || !legal.some((x) => same(x, c))) { illegal++; break; }
    const r = applyDecision(p, c);
    p = r.player;
    lines += r.event.linesCleared; attack += r.event.attack;
    placed++;
    if (placed % 100 === 0) process.stdout.write(`  ${placed}/${pieces} pieces, ${lines} lines, attack ${attack}, episodes ${episodes} (${((performance.now() - t0) / 1000).toFixed(0)} s)
`);
  }
  const elapsed = (performance.now() - t0) / 1000;
  console.log(`
${placed} placements in ${elapsed.toFixed(1)} s → ${(placed / elapsed).toFixed(2)} placements/s single thread (${(candidates / placed).toFixed(1)} candidate forwards per placement, ${(candidates / elapsed).toFixed(0)} candidates/s)`);
  console.log(`  episodes ${episodes} (mean length ${(placed / episodes).toFixed(1)} pieces), lines cleared ${lines}, attack lines ${attack}, illegal placements ${illegal}`);
  if (illegal > 0) { console.error('FAIL: illegal placement chosen'); process.exit(1); }
  console.log('smoke run OK (stage-7 learned C0, versus engine)');
}

function main() {
  const connectome = parseConnectome(readFileSync(path.join(ROOT, 'data', 'connectome.json'), 'utf8'));
  const spectral = JSON.parse(readFileSync(path.join(ROOT, 'data', 'spectral.json'), 'utf8'));
  if (!argv.includes('--stage4') && !argv.includes('--stage3') && existsSync(path.join(ROOT, 'data', 'stage7', 'c0.model.json'))) { smokeStage7(connectome, optNum('pieces', 1000)); return; }
  const resultsFile = path.join(ROOT, 'data', 'results.json');
  if (!argv.includes('--stage3') && existsSync(resultsFile)) {
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
