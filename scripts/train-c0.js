#!/usr/bin/env node
// 7단계 Phase A-2 — C0 (실제 커넥톰 마스크) 단독 학습 + DAgger (조기 중단) + 게이트. Phase A (2026-09-17, hard negatives · 8k · DAgger 3×2k) 의 결과와 산출물은 data/stage7/phaseA/, data/stage7-c0-phaseA.json.
//   라운드 0   24,000 학습 결정 × K 8 (mixed: 교사 선택 + 상위 3 + 무작위 4), 언롤 T 25 BPTT, pairwise 힌지 + 값 마진 가중 λ (파일럿 선택), AdamW 감쇠 + 드롭아웃,
//              코사인 감쇠 + 전역 노름 클리핑, 검증 손실(K 8, 4,000 결정) 조기 종료
//   라운드 r   학습된 정책으로 플레이한 상태 4,000 결정에 교사(scored 빔) 라벨 → 게임 단위 90/10 train/val 추가 → warm start ≤ 5 에폭 (최대 5 라운드)
//   라운드마다 테스트 1,204 결정 (전체 후보) τ · top-1 · 하위 50% 선택률 + 빠른 평가 5 게임 (가비지 포함, 같은 시드) 의 조각 수 → 2 라운드 연속 개선이 CI 안에서 0 이면 남은 라운드 건너뜀
//   최종      20 게임 × 1000 조각, 가비지 주입 (수집과 같은 0.08/조각) → 게이트 5 항목 전부 통과해야 Phase B:
//              top-1 ≥ 40% · 조각 중앙값 ≥ 400 · 공격 중앙값 ≥ 60 · 테트리스/게임 중앙값 ≥ 1 · 하위 50% 선택률 ≤ 5%. 미달이면 항목별 차이와 진단을 쓰고 exit 1.
// 체크포인트: data/stage7/a2-c0-round{r}.theta.f64 + a2-c0-round{r}.json + a2-c0-dagger{r}.json.gz — 있으면 그 라운드를 건너뛴다 (--no-resume 로 무시).
// 산출: data/stage7-c0.json, data/stage7/c0.model.{bin,json} (최종 모델, Float32 — 8단계 웹·smoke 용).
// 옵션: --lambda F (기본: data/stage7/lambda-choice.json → HYPER.lambda) --workers N --rounds N --dagger N --train N --val N --games N --quick --no-resume --loss pairwise|listwise

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { deserialize } from '../src/versus-data.js';
import { mergeDagger } from '../src/stage7-data.js';
import { HYPER, analyzeInputWeights, analyzeWeights, shouldStopDagger } from '../src/stage7-train.js';
import { buildDataset, calibrateState, ci, createSparseState, createTrainingPool, daggerCollect, DEFAULT_WORKERS, evaluateTest, fmtMs, loadGz, loadInputs, loadJson, loadTheta, maskFor, pct, playEval, playLine, quickEval, ROOT, saveGz, saveJson, saveModel, saveTheta, STAGE7_DIR, trainRound } from './stage7-lib.js';

const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? argv[i + 1] : def; };
const quick = argv.includes('--quick');
const lambdaChoice = existsSync(path.join(STAGE7_DIR, 'lambda-choice.json')) ? JSON.parse(readFileSync(path.join(STAGE7_DIR, 'lambda-choice.json'), 'utf8')) : null;
const CFG = {
  workers: Number(opt('workers', DEFAULT_WORKERS)),
  rounds: Number(opt('rounds', quick ? 2 : HYPER.daggerRounds)),
  daggerDecisions: Number(opt('dagger', quick ? 40 : HYPER.daggerDecisions)), daggerCap: quick ? 30 : HYPER.daggerCap,
  trainDecisions: Number(opt('train', quick ? 64 : HYPER.trainDecisions)), valDecisions: Number(opt('val', quick ? 32 : HYPER.valDecisions)),
  playGames: Number(opt('games', quick ? 2 : 20)), playCap: quick ? 40 : 1000, quickGames: quick ? 2 : HYPER.quickGames, quickSeedBase: 60000,
  loss: opt('loss', HYPER.loss),
  lambda: opt('lambda', null) !== null ? Number(opt('lambda')) : (lambdaChoice?.lambda ?? HYPER.lambda), lambdaSource: opt('lambda', null) !== null ? '--lambda' : lambdaChoice ? 'data/stage7/lambda-choice.json' : 'HYPER.lambda (no pilot choice)',
  negatives: HYPER.negatives, hardNegatives: HYPER.hardNegatives, weightDecay: HYPER.weightDecay, dropoutZ: HYPER.dropoutZ, dropoutH: HYPER.dropoutH,
  resume: !argv.includes('--no-resume') && !quick,
  round0: { maxEpochs: quick ? 1 : HYPER.maxEpochs, patience: HYPER.patience, lr: HYPER.lr, batch: HYPER.batch, clip: HYPER.clip, lrMin: HYPER.lrMin },
  finetune: { maxEpochs: quick ? 1 : HYPER.ftMaxEpochs, patience: HYPER.ftPatience, lr: HYPER.ftLr, batch: HYPER.batch, clip: HYPER.clip, lrMin: HYPER.lrMin },
  gate: { top1: 0.40, piecesMedian: 400, attackMedian: 60, tetrisMedian: 1, bottomHalfRate: 0.05 },
  earlyStopRounds: HYPER.earlyStopRounds,
  daggerSeedBase: 9_500_000, daggerValFraction: 0.1,
  quick,
};
const tag = quick ? 'a2-c0-quick' : 'a2-c0';
const OUT = path.join(ROOT, 'data', quick ? 'stage7-c0-quick.json' : 'stage7-c0.json');
const log = (s) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${s}`);

async function main() {
  const t0 = performance.now();
  const { connectome, teacher, data, garbage } = loadInputs();
  const mask = maskFor(connectome, 'C0');
  const state = createSparseState(mask, HYPER);
  const daggerRows = CFG.rounds * (CFG.daggerDecisions + 2 * CFG.workers * CFG.daggerCap) * HYPER.K; // 라운드마다 목표 + 한 배치의 초과분
  const ds = buildDataset(data, { trainDecisions: CFG.trainDecisions, valDecisions: CFG.valDecisions, daggerRows, negatives: CFG.negatives, hard: CFG.hardNegatives });
  const cal = calibrateState(state, ds, 256);
  log(`C0 mask: N ${mask.N}, E ${mask.E}, rho_unit(α1) ${mask.rhoUnit.toFixed(4)}; P ${state.P} (W ${mask.E} + W_in ${state.layout.sizes.Win} + b ${mask.N} + readout ${state.layout.sizes.readout}); init W = ${HYPER.rhoTarget}/rho_unit × w_unit, W_in = RF + U(±0.1), b 0`);
  log(`data: train ${ds.meta.trainDecisions} decisions (${ds.meta.trainGames} games) × K ${ds.K} [${ds.negatives}: chosen + ${ds.meta.hardNegatives} hardest + ${ds.K - 1 - ds.meta.hardNegatives} random], val ${ds.meta.valDecisions} (${ds.meta.valGames} games) × K, test ${ds.meta.testDecisions} decisions / ${ds.meta.testCandidates} candidates (full, stage-6 set); value-gap scale ${ds.valueScale.toFixed(2)}; pool ${ds.meta.poolCapacityRows} rows (${fmtMs(ds.meta.buildMs)})`);
  log(`readout standardization from ${cal.n} initial candidates (constant DNs ${cal.std.filter((s) => s === 0).length}); regularization: AdamW decay ${CFG.weightDecay} (W, W_in, readout weights), dropout z ${CFG.dropoutZ} / hidden ${CFG.dropoutH}; loss ${CFG.loss} λ ${CFG.lambda} (${CFG.lambdaSource})`);
  log(`teacher: ${teacher.source}; garbage injection ${JSON.stringify(garbage)} (DAgger, quick eval, gate); ${CFG.workers} workers${CFG.resume ? '; resume on' : ''}`);
  const tp = await createTrainingPool(state, ds, { workers: CFG.workers, teacher });
  const initTest = await evaluateTest(tp, ds.test);
  log(`untrained model (init only): test τ ${initTest.tau.toFixed(3)} ${ci(initTest.tauCI)}, top-1 ${pct(initTest.top1)} ${ci(initTest.top1CI, pct)}, bottom-half picks ${pct(initTest.bottomHalfRate)}; chance top-1 ${pct(initTest.chance.top1)}  (${fmtMs(initTest.ms)})`);

  const quickSeeds = Array.from({ length: CFG.quickGames }, (_, k) => CFG.quickSeedBase + k);
  const rounds = [];
  const quickHistory = [];
  let adam = null, earlyStop = null;
  let nextGameId = ds.nextGameId;
  for (let r = 0; r <= CFG.rounds; r++) {
    const tr = performance.now();
    let dagger = null;
    if (r >= 1) {
      const file = `${tag}-dagger${r}.json.gz`;
      let doc = CFG.resume ? loadGz(file) : null;
      if (doc) log(`round ${r}: loaded DAgger games from ${file} (${doc.games.length} games, ${doc.decisions} decisions)`);
      else {
        log(`round ${r}: DAgger — policy plays ${CFG.daggerDecisions} decisions (cap ${CFG.daggerCap}/game, garbage ${garbage.rate}/piece), teacher labels every candidate`);
        const dg = await daggerCollect(tp, { target: CFG.daggerDecisions, cap: CFG.daggerCap, injector: garbage, fromId: nextGameId, seedBase: CFG.daggerSeedBase + r * 100_000, workers: CFG.workers, log });
        doc = { round: r, games: dg.games, decisions: dg.decisions, stats: dg.stats, ms: dg.ms };
        saveGz(file, doc);
      }
      nextGameId = Math.max(nextGameId, ...doc.games.map((g) => g.id)) + 1;
      const games = deserialize({ games: doc.games, meta: { split: null } }).games;
      const m = mergeDagger(ds, games, { valFraction: CFG.daggerValFraction });
      dagger = { ...doc.stats, merged: m, ms: doc.ms };
      log(`round ${r}: DAgger ${doc.stats.games} games / ${doc.stats.decisions} decisions (dead ${doc.stats.deadGames}, median ${doc.stats.decisionsMedian} decisions/game, on-policy agreement ${pct(doc.stats.agreeWithTeacher)}, attack/1000 ${doc.stats.attackPer1000}, tetrises ${doc.stats.tetrises}, garbage received ${doc.stats.garbageReceived}) → train +${m.train} (${m.trainGames} games), val +${m.val} (${m.valGames} games); train ${ds.train.length} / val ${ds.val.length}  (${fmtMs(doc.ms)})`);
    }
    const prev = CFG.resume ? loadJson(`${tag}-round${r}.json`) : null;
    if (prev && loadTheta(`${tag}-round${r}`, state.theta)) {
      log(`round ${r}: loaded checkpoint (val ${prev.train.best.valLoss.toFixed(4)} @ epoch ${prev.train.best.epoch}; test top-1 ${pct(prev.test.top1)}; quick pieces median ${prev.quick.piecesMedian}) — skipping`);
      rounds.push({ ...prev, dagger: dagger ?? prev.dagger, resumed: true });
      quickHistory.push({ round: r, pieces: prev.quick.pieces });
      adam = null;
    } else {
      const opts = r === 0 ? CFG.round0 : CFG.finetune;
      log(`round ${r}: training on ${ds.train.length} decisions (val ${ds.val.length}), ${CFG.loss} λ ${CFG.lambda}, lr ${opts.lr} cosine → ${opts.lrMin}, ≤ ${opts.maxEpochs} epochs, patience ${opts.patience}, batch ${opts.batch}, clip ${opts.clip}, wd ${CFG.weightDecay}${adam ? ', Adam state continued' : ''}`);
      const train = await trainRound(tp, state, ds, { ...opts, loss: CFG.loss, lambda: CFG.lambda, weightDecay: CFG.weightDecay, seed: 1 + r, adam, log: (h) => { if (h.epoch !== undefined && h.val !== undefined) log(`  epoch ${h.epoch}: train ${h.train.toFixed(4)} val ${h.val.toFixed(4)} lr ${h.lr.toExponential(2)} |g| ${h.gradNorm.toFixed(2)} clipped ${pct(h.clippedFrac)} (${fmtMs(h.ms)})`); } });
      adam = train.adam;
      log(`round ${r}: trained ${train.epochs} epochs (best ${train.best.epoch}, val ${train.best.valLoss.toFixed(4)}), ${train.steps} steps, clipped ${pct(train.clippedFrac)}  (${fmtMs(train.ms)})`);
      const test = await evaluateTest(tp, ds.test);
      log(`round ${r}: test (${test.decisions} decisions, ${test.candidatesPerDecision.toFixed(1)} candidates — full): τ ${test.tau.toFixed(3)} ${ci(test.tauCI)}, top-1 ${pct(test.top1)} ${ci(test.top1CI, pct)}, bottom-half picks ${pct(test.bottomHalfRate)} ${ci(test.bottomHalfRateCI, pct)}, pick percentile ${test.pickPercentile.toFixed(3)}  (${fmtMs(test.ms)})`);
      const q = await quickEval(tp, { seeds: quickSeeds, cap: CFG.playCap, injector: garbage });
      log(`round ${r}: quick eval ${q.seeds.length} games (garbage): pieces ${q.pieces.join('/')} → median ${q.piecesMedian} ${ci(q.piecesMedianCI, (v) => v.toFixed(0))}, attack ${q.attack.join('/')}, tetrises ${q.tetris.join('/')}  (${fmtMs(q.ms)})`);
      quickHistory.push({ round: r, pieces: q.pieces });
      const rec = { round: r, trainDecisions: ds.train.length, valDecisions: ds.val.length, dagger, train: { ...train, adam: undefined }, test, quick: q, ms: Math.round(performance.now() - tr) };
      rounds.push(rec);
      saveTheta(`${tag}-round${r}`, state.theta);
      saveJson(`${tag}-round${r}.json`, rec);
    }
    if (r >= 1 && r < CFG.rounds) {
      const es = shouldStopDagger(quickHistory, { consecutive: CFG.earlyStopRounds });
      const f = es.flags[es.flags.length - 1];
      log(`round ${r}: paired improvement vs round ${r - 1}: Δpieces ${f.delta.toFixed(1)} ${ci(f.deltaCI, (v) => v.toFixed(0))} → ${f.improved ? 'improved' : 'no improvement (CI contains 0 or negative)'}; non-improving run ${es.run}/${CFG.earlyStopRounds}`);
      if (es.stop) { earlyStop = { afterRound: r, skipped: CFG.rounds - r, flags: es.flags }; log(`round ${r}: EARLY STOP — ${CFG.earlyStopRounds} consecutive rounds without improvement; skipping rounds ${r + 1}–${CFG.rounds}`); break; }
    }
  }

  // ---------- 최종 평가 (게이트) ----------
  const last = rounds[rounds.length - 1];
  const play = await playEval(tp, { seeds: Array.from({ length: CFG.playGames }, (_, k) => 50000 + k), cap: CFG.playCap, injector: garbage });
  log(`final play ${play.games} games × ${CFG.playCap} with garbage: ${playLine(play)}  (${fmtMs(play.ms)})`);
  await tp.close();

  // ---------- W 변화 분석 ----------
  const wFinal = state.theta.subarray(state.layout.off.W, state.layout.off.W + mask.E);
  const weights = analyzeWeights(mask, state.wInit, wFinal);
  const winFinal = state.theta.subarray(state.layout.off.Win, state.layout.off.Win + state.layout.sizes.Win);
  const inputWeights = analyzeInputWeights(state.winInit, winFinal, mask.nInput);
  const o = weights.overall;
  log(`W vs connectome init: |Δw| mean ${o.meanAbsDelta.toExponential(3)} median ${o.medianAbsDelta.toExponential(3)} p90 ${o.p90AbsDelta.toExponential(3)} (init mean ${o.meanInit.toExponential(3)}); corr(w0, w) ${o.corr.toFixed(4)}; inhibitory ${pct(o.inhibitoryFrac)} (init 0%); ‖W‖ ${weights.norms.init.toFixed(2)} → ${weights.norms.final.toFixed(2)}`);
  for (const [k, v] of Object.entries(weights.byBlock)) log(`  block ${k.padEnd(14)} edges ${String(v.edges).padStart(7)}  |Δw| mean ${v.meanAbsDelta.toExponential(2)}  corr ${v.corr.toFixed(3)}  inhibitory ${pct(v.inhibitoryFrac)}`);
  log(`  most changed post-ROIs: ${weights.byPostRoiMostChanged.slice(0, 6).map((r) => `${r.roi} ${r.meanAbsDelta.toExponential(2)} (corr ${r.corr.toFixed(2)})`).join('; ')}; KC edges corr ${weights.kc.kcEdges?.corr.toFixed(3)} vs other ${weights.kc.otherEdges.corr.toFixed(3)}`);
  log(`W_in vs RF init: board columns corr ${inputWeights.board.corr.toFixed(3)} |Δ| ${inputWeights.board.meanAbsDelta.toExponential(2)}; other columns corr ${inputWeights.other.corr.toFixed(3)}`);

  // ---------- 게이트 ----------
  const g = CFG.gate;
  const measured = { top1: last.test.top1, top1CI: last.test.top1CI, piecesMedian: play.piecesMedian, piecesMedianCI: play.piecesMedianCI, attackMedian: play.attackMedian, attackMedianCI: play.attackMedianCI, tetrisMedian: play.tetrisMedian, tetrisMedianCI: play.tetrisMedianCI, bottomHalfRate: last.test.bottomHalfRate, bottomHalfRateCI: last.test.bottomHalfRateCI };
  const passed = { top1: measured.top1 >= g.top1, piecesMedian: measured.piecesMedian >= g.piecesMedian, attackMedian: measured.attackMedian >= g.attackMedian, tetrisMedian: measured.tetrisMedian >= g.tetrisMedian, bottomHalfRate: measured.bottomHalfRate <= g.bottomHalfRate };
  const gate = { criteria: g, measured, passed, all: Object.values(passed).every(Boolean), shortfall: { top1: Math.max(0, g.top1 - measured.top1), piecesMedian: Math.max(0, g.piecesMedian - measured.piecesMedian), attackMedian: Math.max(0, g.attackMedian - measured.attackMedian), tetrisMedian: Math.max(0, g.tetrisMedian - measured.tetrisMedian), bottomHalfRate: Math.max(0, measured.bottomHalfRate - g.bottomHalfRate) } };
  const first = rounds[0];
  const doc = {
    ranAt: new Date().toISOString(), phase: 'A-2', elapsedMs: Math.round(performance.now() - t0), config: CFG, hyper: HYPER,
    model: { kind: 'sparse', condition: 'C0', N: mask.N, E: mask.E, nInput: mask.nInput, nOutput: mask.nOutput, rhoUnit: mask.rhoUnit, P: state.P, sizes: state.layout.sizes, init: { W: `rhoTarget ${HYPER.rhoTarget} / rho_unit × w_unit(alpha 1)`, Win: 'board 200 cols = stage-3 Gaussian RF × 1.0; other 56 cols U(−0.1, 0.1)', b: 0, readout: 'He-uniform' }, readoutStandardization: { n: cal.n, constantDNs: cal.std.filter((s) => s === 0).length } },
    data: { ...ds.meta, teacher: teacher.source, garbage, finalTrainDecisions: ds.train.length, finalValDecisions: ds.val.length },
    untrained: initTest, rounds, quickHistory, earlyStop, play, weights, inputWeights, gate,
    improvement: { perRound: rounds.map((r) => ({ round: r.round, top1: r.test.top1, tau: r.test.tau, bottomHalfRate: r.test.bottomHalfRate, quickPiecesMedian: r.quick.piecesMedian, quickPieces: r.quick.pieces, quickTetrises: r.quick.tetris, onPolicyAgreement: r.dagger?.agreeWithTeacher ?? null })), top1: last.test.top1 - first.test.top1, quickPieces: last.quick.piecesMedian - first.quick.piecesMedian },
    note: '커넥톰에서 오는 것은 배선 구조(마스크)뿐이며 가중치는 학습됐다. 평가는 전체 후보 (K=8 은 학습 부분집합). 게이트 플레이는 가비지 주입 포함.',
  };
  writeFileSync(OUT, JSON.stringify(doc, null, 1) + '\n');
  const model = saveModel(quick ? 'c0-quick' : 'c0', state, { phase: 'A-2', condition: 'C0', trainedAt: doc.ranAt, rounds: rounds.length, lambda: CFG.lambda, gate, test: { tau: last.test.tau, top1: last.test.top1, bottomHalfRate: last.test.bottomHalfRate }, play: { piecesMedian: play.piecesMedian, attackMedian: play.attackMedian, tetrisMedian: play.tetrisMedian, survival: play.survival } });
  console.log(`\n=== Phase A-2 gate (round ${last.round}; test ${last.test.decisions} decisions full candidates; play ${play.games} games × ${CFG.playCap} with garbage ${garbage.rate}/piece) ===`);
  const row = (name, val, crit, ok, extra = '') => console.log(`  ${name.padEnd(22)} ${val.padStart(26)}   ${crit.padEnd(8)} ${ok ? 'PASS' : 'FAIL'}${extra ? `   ${extra}` : ''}`);
  row('top-1', `${pct(measured.top1)} ${ci(measured.top1CI, pct)}`, `≥ ${pct(g.top1)}`, passed.top1, `untrained ${pct(initTest.top1)}, Phase A 37.8%`);
  row('pieces median', `${measured.piecesMedian} ${ci(measured.piecesMedianCI, (v) => v.toFixed(0))}`, `≥ ${g.piecesMedian}`, passed.piecesMedian, `Phase A 134 (no garbage)`);
  row('attack median', `${measured.attackMedian} ${ci(measured.attackMedianCI, (v) => v.toFixed(0))}`, `≥ ${g.attackMedian}`, passed.attackMedian, `Phase A 4.5; teacher 418 with garbage`);
  row('tetris / game median', `${measured.tetrisMedian} ${ci(measured.tetrisMedianCI, (v) => v.toFixed(1))}`, `≥ ${g.tetrisMedian}`, passed.tetrisMedian, `total ${play.tetrises}; well runs ${play.wellRuns.count}, length median ${play.wellRuns.lengthMedian}, ended with tetris ${pct(play.wellRuns.endedWithTetris)}`);
  row('bottom-half picks', `${pct(measured.bottomHalfRate)} ${ci(measured.bottomHalfRateCI, pct)}`, `≤ ${pct(g.bottomHalfRate)}`, passed.bottomHalfRate, `Phase A 16.4%`);
  console.log('  per round:');
  for (const r of doc.improvement.perRound) console.log(`    round ${r.round}: top-1 ${pct(r.top1)}  τ ${r.tau.toFixed(3)}  bottom-half ${pct(r.bottomHalfRate)}  quick pieces median ${r.quickPiecesMedian} (${r.quickPieces.join('/')})  tetrises ${r.quickTetrises.join('/')}${r.onPolicyAgreement !== null ? `  on-policy agreement ${pct(r.onPolicyAgreement)}` : ''}`);
  if (earlyStop) console.log(`  early stop after round ${earlyStop.afterRound} (skipped ${earlyStop.skipped} rounds)`);
  console.log(`wrote ${path.relative(ROOT, OUT)}, data/stage7/${model.file} + ${quick ? 'c0-quick' : 'c0'}.model.json  (total ${fmtMs(doc.elapsedMs)})`);
  if (!gate.all) { console.error(`\nPHASE A-2 GATE NOT MET (${Object.entries(passed).filter(([, v]) => !v).map(([k]) => k).join(', ')}) — 멈춤. Phase B 는 진행하지 않는다.`); process.exit(1); }
  console.log('\nPhase A-2 gate passed.');
}

main().catch((err) => { console.error(err); process.exit(2); });
