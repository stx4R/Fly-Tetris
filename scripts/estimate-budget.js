#!/usr/bin/env node
// 4단계 실험 총 소요 추정. 단위 비용을 실제로 재고(단일 스레드), 워커 풀의 병렬 배율도 실측한 뒤 설정(experiment-config.js)의
// 축으로 곱한다. 플레이는 상한(모든 게임이 조각 상한까지 감)과 가정 시나리오(평균 생존 500조각)를 둘 다 낸다.
// 상한 추정이 --budget-hours (기본 8) 를 넘으면 exit 1.

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseConnectome } from '../src/connectome.js';
import { createEncoder } from '../src/encode.js';
import { computeSpectral } from '../src/spectral.js';
import { evaluatePoint, generateBoards } from '../src/calibration.js';
import { runProbes } from '../src/probe.js';
import { ACTIONS } from '../src/tetris.js';
import { deserialize } from '../src/afterstate.js';
import { createFeaturizer } from '../src/play.js';
import { degreeShuffle } from '../src/nullmodels.js';
import { quadraticMap, trainMLP } from '../src/readout.js';
import { createRng } from '../src/prng.js';
import { createPool } from './pool.js';
import { parseConfig, playCombos, reservoirKeys } from './experiment-config.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hours = (ms) => ms / 3.6e6;
const fmt = (ms) => (ms < 6e4 ? `${(ms / 1000).toFixed(1)} s` : ms < 3.6e6 ? `${(ms / 6e4).toFixed(1)} min` : `${hours(ms).toFixed(2)} h`);
const time = (fn) => { const t = performance.now(); const r = fn(); return { ms: performance.now() - t, r }; };

async function main() {
  const argv = process.argv.slice(2);
  const cfg = parseConfig(argv);
  const bi = argv.indexOf('--budget-hours');
  const budgetHours = bi >= 0 ? Number(argv[bi + 1]) : cfg.budgetHours;
  const assumedSurvival = 500; // "기대" 시나리오의 평균 생존 조각 수 (가정)

  const connectome = parseConnectome(readFileSync(path.join(ROOT, 'data', 'connectome.json'), 'utf8'));
  const spectral = JSON.parse(readFileSync(path.join(ROOT, 'data', 'spectral.json'), 'utf8'));
  const cal = JSON.parse(readFileSync(path.join(ROOT, 'data', 'calibration.json'), 'utf8'));
  // 기준 동작점: 1부 선택점이 있으면 그것(T, G_IN 포함), 없으면 3단계 선택점
  const sepFile = path.join(ROOT, 'data', 'separation-search.json');
  const sepSel = existsSync(sepFile) ? JSON.parse(readFileSync(sepFile, 'utf8')).selected : null;
  const sel = sepSel ?? cal.selected;
  const params = { rhoTarget: sel.rhoTarget, alpha: sel.alpha, b: sel.b, kLocal: sel.kLocal, kGlobal: sel.kGlobal };
  const T = cfg.operating.T, gIn = cfg.operating.gIn;
  const after = deserialize(JSON.parse(readFileSync(path.join(ROOT, 'data', 'afterstates.json'), 'utf8')));
  const nSamples = after.samples.length;
  const candPerDecision = nSamples / after.decisions.length;
  console.log(`config: ${reservoirKeys(cfg).length} reservoir conditions (+C6), play ${cfg.play.games} games × cap ${cfg.play.cap} × ${playCombos(cfg).length} combos, ${cfg.workers} workers`);
  console.log(`afterstates ${nSamples}, ${candPerDecision.toFixed(1)} candidates/decision; reference point ${sepSel ? 'separation-search selected' : 'stage-3 selected'} (alpha ${sel.alpha}, rho ${sel.rhoTarget}, b ${sel.b}), T ${T}, G_IN ${gIn}; constraints ${cfg.operating.constraints}`);

  // 1. 후보 창 비용 (리셋 + 인코딩 + 50 스텝), afterstate 보드 300개
  const f = createFeaturizer(connectome, params, spectral, { T, gIn });
  const rng = createRng(1);
  const boards = Array.from({ length: 300 }, () => after.samples[rng.int(nSamples)].board);
  for (let i = 0; i < 30; i++) f.featurize(boards[i]); // 워밍업
  const win = time(() => { for (const b of boards) f.featurize(b); }).ms / boards.length;
  console.log(`\n[unit] candidate window (reset+encode+50 steps): ${win.toFixed(2)} ms  → decision ≈ ${(win * candPerDecision).toFixed(0)} ms`);

  // 2. 리드아웃 예측 비용 (가중치 무작위, 규모만 측정)
  const d = 107;
  const x = Float64Array.from({ length: d }, () => rng.next() * 60);
  const top = Array.from({ length: 30 }, (_, i) => i);
  const w1 = Float64Array.from({ length: d }, () => rng.next()), w2 = Float64Array.from({ length: 649 }, () => rng.next());
  const rNet = { W1: Float64Array.from({ length: 64 * d }, () => rng.next() * 0.1), W2: Float64Array.from({ length: 64 }, () => rng.next()) };
  const predR1 = time(() => { let s = 0; for (let k = 0; k < 2000; k++) for (let j = 0; j < d; j++) s += w1[j] * x[j]; return s; }).ms / 2000;
  const predR2 = time(() => { let s = 0; for (let k = 0; k < 2000; k++) { const q = quadraticMap(x, top); for (let j = 0; j < q.length; j++) s += w2[j] * q[j]; } return s; }).ms / 2000;
  const predR3 = time(() => { let s = 0; for (let k = 0; k < 2000; k++) { for (let i = 0; i < 64; i++) { let z = 0; for (let j = 0; j < d; j++) z += rNet.W1[i * d + j] * x[j]; s += rNet.W2[i] * Math.max(0, z); } } return s; }).ms / 2000;
  console.log(`[unit] readout predict: R1 ${predR1.toFixed(3)} ms, R2 ${predR2.toFixed(3)} ms, R3 ${predR3.toFixed(3)} ms (창 비용 대비 무시할 수준)`);

  // 3. 캘리브레이션 점 비용 (200 보드, 4단계 범위의 점 3개) + 프로브 비용
  const cb = generateBoards(cfg.calibration.boards, { seed: cfg.seed });
  const enc = createEncoder(connectome, { gIn });
  const iExts = cb.map((s) => enc.encode(s.board, s.piece));
  const pts = [{ rhoTarget: 3.5, b: 0.5, kLocal: 0.1, kGlobal: 1 }, { rhoTarget: 4.2, b: 1.0, kLocal: 0.3, kGlobal: 3 }, { rhoTarget: 4.8, b: 0.2, kLocal: 0.05, kGlobal: 0.5 }];
  let ptMs = 0, ptRate = 0;
  for (const p of pts) { const r = time(() => evaluatePoint(connectome, spectral, cb, iExts, { alpha: sel.alpha, ...p }, { T, gap: 'full', probe: false })); ptMs += r.ms / pts.length; ptRate += r.r.meanRateHz / pts.length; }
  const dnRates = cb.map((s) => f.featurize(s.board));
  const probeMs = time(() => runProbes(dnRates, cb, ACTIONS, { seed: 1 })).ms;
  console.log(`[unit] calibration point (${cfg.calibration.boards} boards, no probe): ${ptMs.toFixed(0)} ms (mean rate ${ptRate.toFixed(1)} Hz); probe: ${probeMs.toFixed(0)} ms`);

  // 4. MLP 학습 epoch 비용 (훈련 17.8k × 107, 검증 6.6k)
  const nTr = after.split.train.length / after.meta.games * nSamples | 0, nVa = after.split.val.length / after.meta.games * nSamples | 0;
  const Xtr = Array.from({ length: nTr }, () => Float64Array.from({ length: d }, () => rng.next() * 60));
  const Ytr = Xtr.map((r) => Float64Array.from([r[0] - r[1] + rng.next()]));
  const Xva = Array.from({ length: nVa }, () => Float64Array.from({ length: d }, () => rng.next() * 60));
  const Yva = Xva.map((r) => Float64Array.from([r[0] - r[1]]));
  const mlp = time(() => trainMLP(Xtr, Ytr, Xva, Yva, { maxEpochs: 2, patience: 100 }));
  const epochMs = mlp.ms / 2;
  const assumedEpochs = 60;
  console.log(`[unit] MLP epoch (${nTr} train): ${epochMs.toFixed(0)} ms → ${assumedEpochs} epochs ≈ ${fmt(epochMs * assumedEpochs)} per model (가정 ${assumedEpochs} epoch, 최대 200)`);

  // 5. null 그래프 생성 + 스펙트럼
  const nullMs = time(() => degreeShuffle(connectome, 3)).ms;
  const specMs = time(() => computeSpectral(connectome, { maxIter: 500 })).ms;
  console.log(`[unit] degree-shuffle build ${fmt(nullMs)}, spectral (2 alphas) ${fmt(specMs)}`);

  // 6. 병렬 배율 실측: 워커 풀에 featurize 작업을 던져 집계 처리량 측정
  const pool = createPool(new URL('./experiment-worker.js', import.meta.url), cfg.workers);
  await pool.ready;
  // 워커마다 JIT 워밍업이 충분히 되도록 (워커 × 3 작업 × 300 창) 먼저 돌리고, 워커 × 4 작업 × 500 창을 잰다
  const mk = (count, chunk) => Array.from({ length: count }, (_, i) => { const from = (i * chunk) % (nSamples - chunk); return { type: 'featurize', key: 'C0', condition: 'C0', seed: 0, params, T, gIn, from, to: from + chunk, activity: false }; });
  await pool.run(mk(cfg.workers * 3, 300));
  const chunk = 500;
  const jobs = mk(cfg.workers * 4, chunk).map((j) => ({ ...j, T, gIn }));
  const t0 = performance.now();
  await pool.run(jobs);
  const wall = performance.now() - t0;
  const aggregate = (jobs.length * chunk) / wall; // windows per ms
  const speedup = aggregate * win;
  await pool.close();
  console.log(`[unit] parallel: ${cfg.workers} workers → ${(aggregate * 1000).toFixed(0)} windows/s aggregate vs ${(1000 / win).toFixed(0)} single → speedup ×${speedup.toFixed(1)}`);

  // ---------- 합산 ----------
  // 리저버가 도는 단계(캘리브레이션·특징 추출·플레이)는 "창 수 / 실측 집계 처리량" 으로, 학습은 MLP 벽시계(조건당 MLP 2개가 병렬)로 잰다.
  const keys = reservoirKeys(cfg);
  const combos = playCombos(cfg);
  const nCond = keys.length + (cfg.conditions.includes('C6') ? 1 : 0);
  const passFrac = 0.4; // 4단계 범위(α1, ρ 3–5, k_local ≤ 0.5)에서 통과 비율 가정 (3단계 k_local=0 부분 탐색 45%)
  const cpuSpeedup = Math.min(cfg.workers, 6); // 프로브·학습 같은 CPU 작업의 병렬 배율 가정 (P-코어 수)
  // 분리 제약 모드: 3단계 통과점마다 분리 지표 (테스트 결정 × ~21 고유 후보 + 훈련 결정 × ~21) 창이 추가된다
  const sepWindows = cfg.operating.constraints === 'separation'
    ? cfg.calibration.points * passFrac * (cfg.calibration.separation.test + cfg.calibration.separation.train) * 21 + cfg.calibration.top * 150 * 21 : 0;
  const winPerCond = {
    calibration: cfg.calibration.points * cfg.calibration.boards + cfg.calibration.top * cfg.calibration.finalBoards + sepWindows,
    featurize: nSamples,
  };
  const calibProbeMs = (cfg.calibration.points * passFrac + cfg.calibration.top) * probeMs / cpuSpeedup;
  const trainWallMs = epochMs * assumedEpochs + 15000; // MLP 2개 병렬 + 릿지/이차
  const playWindows = (games, cap, nCombos, survival) => nCombos * games * Math.min(cap, survival) * candPerDecision;
  const total = (c2, survival) => {
    const k2 = reservoirKeys(c2).length, n2 = k2 + (c2.conditions.includes('C6') ? 1 : 0), cb2 = playCombos(c2).length;
    const build = k2 * (nullMs + specMs);
    const calib = k2 * (winPerCond.calibration / aggregate + calibProbeMs);
    const feat = k2 * winPerCond.featurize / aggregate;
    const train = n2 * trainWallMs;
    const play = n2 * playWindows(c2.play.games, c2.play.cap, cb2, survival) / aggregate;
    const base = 2 * c2.baselines.games * 1000 / cpuSpeedup;
    return { build, calib, feat, train, play, base, sum: build + calib + feat + train + play + base };
  };
  const worst = total(cfg, Infinity), expected = total(cfg, assumedSurvival);
  console.log(`
[estimate] aggregate ${(aggregate * 1000).toFixed(0)} windows/s with ${cfg.workers} workers; ${nCond} conditions; decision = ${candPerDecision.toFixed(1)} windows`);
  console.log(`[estimate] wall: build ${fmt(worst.build)}, calibration ${fmt(worst.calib)}, featurize ${fmt(worst.feat)}, train ${fmt(worst.train)}, baselines ${fmt(worst.base)}`);
  console.log(`[estimate] play: worst ${fmt(worst.play)} (every game to cap ${cfg.play.cap}), expected ${fmt(expected.play)} (mean survival ${assumedSurvival} — assumption)`);
  console.log(`[estimate] TOTAL worst ${fmt(worst.sum)}, expected ${fmt(expected.sum)}; budget ${budgetHours} h`);

  const scen = (label, o) => {
    const c2 = { ...cfg, play: { ...cfg.play, ...o.play }, nullSeeds: o.nullSeeds ?? cfg.nullSeeds };
    console.log(`  ${label.padEnd(44)} worst ${fmt(total(c2, Infinity).sum).padStart(9)}   expected ${fmt(total(c2, assumedSurvival).sum).padStart(9)}`);
  };
  console.log('\n[scenarios] (worst = every game reaches the cap; expected = mean survival 500 pieces)');
  scen('full spec', {});
  scen('combos → 1 (e.g. R3:V2 for all conditions)', { play: { combos: [['R3', 'V2']] } });
  scen('combos → 2 (R1:V2, R3:V2)', { play: { combos: [['R1', 'V2'], ['R3', 'V2']] } });
  scen('cap 2000 → 1000', { play: { cap: 1000 } });
  scen('cap 2000 → 500', { play: { cap: 500 } });
  scen('games 20 → 10', { play: { games: 10 } });
  scen('null seeds 5 → 3', { nullSeeds: 3 });
  scen('combos 1 + cap 1000', { play: { combos: [['R3', 'V2']], cap: 1000 } });
  scen('combos 2 + cap 500', { play: { combos: [['R1', 'V2'], ['R3', 'V2']], cap: 500 } });
  scen('combos 2 + cap 1000 + seeds 3', { play: { combos: [['R1', 'V2'], ['R3', 'V2']], cap: 1000 }, nullSeeds: 3 });
  scen('regression only (games 0)', { play: { games: 0 } });

  if (hours(worst.sum) > budgetHours) {
    console.error(`
ESTIMATE EXCEEDS BUDGET: worst case ${fmt(worst.sum)} > ${budgetHours} h — stop; choose axes to cut (games, cap, null seeds, combos).`);
    process.exit(1);
  }
  console.log(`
within budget (worst case ${fmt(worst.sum)} ≤ ${budgetHours} h)`);
}

main().catch((err) => { console.error(err); process.exit(2); });
