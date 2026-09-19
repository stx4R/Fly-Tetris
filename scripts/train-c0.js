#!/usr/bin/env node
// 7단계 Phase A-3 — C0 (실제 커넥톰 마스크) 단독 학습 + DAgger 2 라운드 + 게이트. 이전: Phase A (data/stage7/phaseA/, data/stage7-c0-phaseA.json), Phase A-2 (data/stage7/phaseA2/, data/stage7-c0-phaseA2.json).
// Phase A-4′ (--teacher 1ply-hold-garbage; A-3 산출은 data/stage7/phaseA3/, data/stage7-c0-phaseA3.json): 교사만 바꾼 대조 실험 — 깊이 1 + hold 교사 (가비지 조건 CEM 튜닝),
//   같은 프로토콜로 재수집한 데이터 (data/versus-decisions-1ply-hold-garbage.json.gz), 하이퍼파라미터·손실·DAgger 는 A-3 그대로 (DAgger 라운드 수만 예산 추정 budget-choice-a4.json 이 2 → 1 로 줄일 수 있다).
//   학생 후보 집합은 hold 포함 (에이전트·DAgger·평가 동일). 게이트는 교사(가비지 조건 20 게임 × 1000, teacher 파일의 evaluation.garbageTracked) 대비 비율로 건다:
//   조각 중앙값 ≥ 교사의 70% (그리고 절대 하한 250) · 공격 중앙값 ≥ 교사의 60% · 테트리스/게임 중앙값 ≥ 1 · 상대 regret ≤ 0.10 · 사망 원인 중 가비지 비율 ≤ 50%.
//   미달 보고: 지표별 교사 대비 비율, 사망 원인, 우물 길이 분포 (A-3 중앙값 2 / p90 7), 줄 구성, 학생의 hold 사용 빈도 (교사 대비). 태그 a4-c0, 산출 파일 이름은 A-3 과 같다 (stage7-c0.json, c0.model.*).
//   라운드 0   24,000 학습 결정 × K 8 (mixed: 교사 선택 + 상위 3 + 무작위 4), 언롤 T 25 BPTT, 손실 = pairwise 힌지(값 마진 가중 λ=2) + μ·구멍 페널티 (μ 는 파일럿 선택, data/stage7/mu-choice.json),
//              AdamW 감쇠 + 드롭아웃, 코사인 감쇠 + 전역 노름 클리핑; 에폭 최선·조기 종료 = valFull(전체 후보 2,000 결정) 상대 regret (A-3; 이전엔 val 손실)
//   라운드 r   학습된 정책으로 플레이한 상태 4,000 결정에 교사(scored 빔) 라벨 → 게임 단위 90/10 train/val 추가 → warm start ≤ 5 에폭 (A-3: 2 라운드 — 분포 이동은 병목이 아님)
//   라운드마다 테스트 1,204 결정 (전체 후보) 상대 regret · τ · top-1 · 하위 50% 선택률 + 빠른 평가 5 게임 (가비지) 조각 수
//   최종      20 게임 × 1000 조각, 가비지 주입 (0.08/조각), 배치별 추적 → 게이트 A-3 (5 항목 전부 통과해야 Phase B; top-1 은 기록만):
//              조각 중앙값 ≥ 350 · 공격 중앙값 ≥ 50 · 테트리스/게임 중앙값 ≥ 1 · 사망 시 구멍 중앙값 ≤ 12 · 테스트 상대 regret ≤ 0.15. 미달이면 항목별 차이·μ 효과·사망 원인·우물·줄 구성을 쓰고 exit 1.
// 체크포인트: data/stage7/a3-c0-round{r}.theta.f64 + a3-c0-round{r}.json + a3-c0-dagger{r}.json.gz (+ 에폭 체크포인트 a3-c0-round{r}.epoch.*) — 있으면 이어간다 (--no-resume 로 무시).
// 산출: data/stage7-c0.json, data/stage7/c0.model.{bin,json} (최종 모델, Float32 — 8단계 웹·smoke 용). PID data/stage7/train-c0.pid, 상태 data/stage7/train-c0.status.json.
// 옵션: --mu F (기본: data/stage7/mu-choice.json → HYPER.mu) --lambda F (기본: lambda-choice.json → HYPER.lambda) --workers N --rounds N --dagger N --train N --val N --games N --quick --no-resume --loss pairwise|listwise

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { deserialize } from '../src/versus-data.js';
import { mergeDagger } from '../src/stage7-data.js';
import { HYPER, analyzeInputWeights, analyzeWeights, shouldStopDagger } from '../src/stage7-train.js';
import { buildDataset, calibrateState, ci, clearEpochCheckpoint, createSparseState, createTrainingPool, daggerCollect, DEFAULT_WORKERS, evaluateTest, fmtMs, loadGz, loadInputs, loadJson, loadTheta, maskFor, pct, playEval, playLine, quickEval, ROOT, saveGz, saveJson, saveModel, saveTheta, STAGE7_DIR, trainRound, variantOf } from './stage7-lib.js';
import { classifyDeath } from './stage7-deaths.js';
import { median } from '../src/evaluate.js';

const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? argv[i + 1] : def; };
const quick = argv.includes('--quick');
const variant = variantOf(argv);
const a4 = variant !== 'beam';                // Phase A-4′ (교사 변형) — 게이트·태그·라운드 수 선택이 바뀐다
const phase = a4 ? 'A-4′' : 'A-3';
const lambdaChoice = existsSync(path.join(STAGE7_DIR, 'lambda-choice.json')) ? JSON.parse(readFileSync(path.join(STAGE7_DIR, 'lambda-choice.json'), 'utf8')) : null;
const muChoice = existsSync(path.join(STAGE7_DIR, 'mu-choice.json')) ? JSON.parse(readFileSync(path.join(STAGE7_DIR, 'mu-choice.json'), 'utf8')) : null;
const budgetA4 = a4 && existsSync(path.join(STAGE7_DIR, 'budget-choice-a4.json')) ? JSON.parse(readFileSync(path.join(STAGE7_DIR, 'budget-choice-a4.json'), 'utf8')) : null;
const CFG = {
  workers: Number(opt('workers', DEFAULT_WORKERS)),
  teacherVariant: variant,
  rounds: Number(opt('rounds', quick ? 2 : (budgetA4?.daggerRounds ?? HYPER.daggerRounds))), roundsSource: opt('rounds', null) !== null ? '--rounds' : budgetA4 ? 'data/stage7/budget-choice-a4.json' : 'HYPER.daggerRounds',
  daggerDecisions: Number(opt('dagger', quick ? 40 : HYPER.daggerDecisions)), daggerCap: quick ? 30 : HYPER.daggerCap,
  trainDecisions: Number(opt('train', quick ? 64 : HYPER.trainDecisions)), valDecisions: Number(opt('val', quick ? 32 : HYPER.valDecisions)),
  playGames: Number(opt('games', quick ? 2 : 20)), playCap: quick ? 40 : 1000, quickGames: quick ? 2 : HYPER.quickGames, quickSeedBase: 60000,
  loss: opt('loss', HYPER.loss),
  lambda: opt('lambda', null) !== null ? Number(opt('lambda')) : (lambdaChoice?.lambda ?? HYPER.lambda), lambdaSource: opt('lambda', null) !== null ? '--lambda' : lambdaChoice ? 'data/stage7/lambda-choice.json' : 'HYPER.lambda (no pilot choice)',
  mu: opt('mu', null) !== null ? Number(opt('mu')) : (muChoice?.mu ?? HYPER.mu), muSource: opt('mu', null) !== null ? '--mu' : muChoice ? 'data/stage7/mu-choice.json' : 'HYPER.mu (no pilot choice)', selectBy: HYPER.selectBy, valFullDecisions: quick ? 16 : HYPER.valFullDecisions,
  negatives: HYPER.negatives, hardNegatives: HYPER.hardNegatives, weightDecay: HYPER.weightDecay, dropoutZ: HYPER.dropoutZ, dropoutH: HYPER.dropoutH,
  resume: !argv.includes('--no-resume') && !quick,
  round0: { maxEpochs: quick ? 1 : HYPER.maxEpochs, patience: HYPER.patience, lr: HYPER.lr, batch: HYPER.batch, clip: HYPER.clip, lrMin: HYPER.lrMin },
  finetune: { maxEpochs: quick ? 1 : HYPER.ftMaxEpochs, patience: HYPER.ftPatience, lr: HYPER.ftLr, batch: HYPER.batch, clip: HYPER.clip, lrMin: HYPER.lrMin },
  gate: a4
    ? { piecesRatio: 0.7, attackRatio: 0.6, tetrisMedian: 1, relRegret: 0.10, garbageDeathShare: 0.5, piecesFloor: 250 } // A-4′: 교사 대비 비율 + 절대 하한
    : { piecesMedian: 350, attackMedian: 50, tetrisMedian: 1, holesAtDeathMedian: 12, relRegret: 0.15 }, // A-3 (top-1 은 게이트에서 제외)
  earlyStopRounds: HYPER.earlyStopRounds,
  daggerSeedBase: 9_500_000, daggerValFraction: 0.1,
  quick,
};
const tag = `${a4 ? 'a4' : 'a3'}-c0${quick ? '-quick' : ''}`;
const OUT = path.join(ROOT, 'data', quick ? 'stage7-c0-quick.json' : 'stage7-c0.json');
const log = (s) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${s}`);
// 진행 상태 파일 (다음 세션이 로그 없이도 읽는다) + PID 파일 (중단은 이 PID 만: taskkill /PID <pid> /T /F)
const STATUS = path.join(STAGE7_DIR, quick ? 'train-c0-quick.status.json' : 'train-c0.status.json');
const PIDFILE = path.join(STAGE7_DIR, quick ? 'train-c0-quick.pid' : 'train-c0.pid');
let statusDoc = { phase, teacher: variant, pid: process.pid, startedAt: new Date().toISOString(), done: false };
const status = (patch) => { statusDoc = { ...statusDoc, ...patch, updatedAt: new Date().toISOString() }; try { writeFileSync(STATUS, JSON.stringify(statusDoc, null, 1) + '\n'); } catch {} };

async function main() {
  const t0 = performance.now();
  try { writeFileSync(PIDFILE, `${process.pid}\n`); } catch {}
  status({ stage: 'loading' });
  const { connectome, teacher, data, garbage, dataFile } = loadInputs({ variant });
  // A-4′ 게이트 기준점: 교사의 가비지 조건 평가 (tune-teacher 가 기록; 20 게임 × 1000, 같은 시드 50000+, 같은 주입 rng)
  const T = a4 ? teacher.evaluation?.garbageTracked : null;
  if (a4 && !T) throw new Error(`${teacher.source}: evaluation.garbageTracked 없음 — tune-teacher --teacher ${variant} 로 다시 튜닝`);
  const teacherRef = T ? { piecesMedian: T.piecesMedian, attackMedian: T.attackMedian, tetrisMedian: T.tetrisMedian, survival: T.survival, deaths: T.deaths.counts, garbageDeathShare: T.deaths.garbageShare, holdsPerPiece: T.holds / Math.max(1, T.games_.reduce((s, g) => s + g.pieces, 0)), wellRun: { median: T.wellRuns.lengthMedian, p90: T.wellRuns.lengthP90, max: T.wellRuns.lengthMax }, lineComposition: T.lineComposition } : null;
  if (a4) log(`Phase ${phase}: teacher ${variant} (${teacher.source}), data ${dataFile}; teacher reference with garbage: pieces median ${teacherRef.piecesMedian}, attack median ${teacherRef.attackMedian}, tetris/game ${teacherRef.tetrisMedian}, survival ${pct(teacherRef.survival)}, deaths ${JSON.stringify(teacherRef.deaths)} (garbage share ${pct(teacherRef.garbageDeathShare)}), holds/piece ${teacherRef.holdsPerPiece.toFixed(3)}; gate: pieces ≥ max(${CFG.gate.piecesFloor}, ${pct(CFG.gate.piecesRatio)} × ${teacherRef.piecesMedian} = ${Math.ceil(CFG.gate.piecesRatio * teacherRef.piecesMedian)}), attack ≥ ${pct(CFG.gate.attackRatio)} × ${teacherRef.attackMedian} = ${(CFG.gate.attackRatio * teacherRef.attackMedian).toFixed(1)}, tetris ≥ ${CFG.gate.tetrisMedian}, rel-regret ≤ ${CFG.gate.relRegret}, garbage deaths ≤ ${pct(CFG.gate.garbageDeathShare)}; DAgger rounds ${CFG.rounds} (${CFG.roundsSource})`);
  const mask = maskFor(connectome, 'C0');
  const state = createSparseState(mask, HYPER);
  const daggerRows = CFG.rounds * (CFG.daggerDecisions + 2 * CFG.workers * CFG.daggerCap) * HYPER.K; // 라운드마다 목표 + 한 배치의 초과분
  const ds = buildDataset(data, { trainDecisions: CFG.trainDecisions, valDecisions: CFG.valDecisions, daggerRows, negatives: CFG.negatives, hard: CFG.hardNegatives, valFullDecisions: CFG.valFullDecisions });
  const cal = calibrateState(state, ds, 256);
  log(`C0 mask: N ${mask.N}, E ${mask.E}, rho_unit(α1) ${mask.rhoUnit.toFixed(4)}; P ${state.P} (W ${mask.E} + W_in ${state.layout.sizes.Win} + b ${mask.N} + readout ${state.layout.sizes.readout}); init W = ${HYPER.rhoTarget}/rho_unit × w_unit, W_in = RF + U(±0.1), b 0`);
  log(`data: train ${ds.meta.trainDecisions} decisions (${ds.meta.trainGames} games) × K ${ds.K} [${ds.negatives}: chosen + ${ds.meta.hardNegatives} hardest + ${ds.K - 1 - ds.meta.hardNegatives} random], val ${ds.meta.valDecisions} (${ds.meta.valGames} games) × K, test ${ds.meta.testDecisions} decisions / ${ds.meta.testCandidates} candidates (full, stage-6 set); value-gap scale ${ds.valueScale.toFixed(2)}; pool ${ds.meta.poolCapacityRows} rows (${fmtMs(ds.meta.buildMs)})`);
  log(`readout standardization from ${cal.n} initial candidates (constant DNs ${cal.std.filter((s) => s === 0).length}); regularization: AdamW decay ${CFG.weightDecay} (W, W_in, readout weights), dropout z ${CFG.dropoutZ} / hidden ${CFG.dropoutH}; loss ${CFG.loss} λ ${CFG.lambda} (${CFG.lambdaSource}) + μ ${CFG.mu} · holes (${CFG.muSource}); epoch selection by ${CFG.selectBy} on valFull ${ds.valFull.length} decisions (${ds.meta.valFullCandidates} candidates)`);
  log(`teacher: ${teacher.source} [${variant}: ply ${teacher.ply}, depth ${teacher.depth}, width ${teacher.width}, hold ${teacher.hold}]; student candidate set ${teacher.hold ? 'current ∪ hold (engine)' : 'current piece only'}; garbage injection ${JSON.stringify(garbage)} (DAgger, quick eval, gate); ${CFG.workers} workers${CFG.resume ? '; resume on' : ''}`);
  const tp = await createTrainingPool(state, ds, { workers: CFG.workers, teacher });
  const initTest = await evaluateTest(tp, ds.test);
  log(`untrained model (init only): test rel-regret ${initTest.relRegret.toFixed(4)}, τ ${initTest.tau.toFixed(3)} ${ci(initTest.tauCI)}, top-1 ${pct(initTest.top1)} ${ci(initTest.top1CI, pct)}, bottom-half picks ${pct(initTest.bottomHalfRate)}; chance top-1 ${pct(initTest.chance.top1)}  (${fmtMs(initTest.ms)})`);

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
      status({ stage: 'dagger', round: r });
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
      log(`round ${r}: loaded checkpoint (${prev.train.best.criterion ?? 'val'} ${prev.train.best.valLoss.toFixed(4)} @ epoch ${prev.train.best.epoch}; test rel-regret ${prev.test.relRegret?.toFixed(4) ?? '?'} top-1 ${pct(prev.test.top1)}; quick pieces median ${prev.quick.piecesMedian}) — skipping`);
      rounds.push({ ...prev, dagger: dagger ?? prev.dagger, resumed: true });
      quickHistory.push({ round: r, pieces: prev.quick.pieces });
      adam = null;
    } else {
      const opts = r === 0 ? CFG.round0 : CFG.finetune;
      log(`round ${r}: training on ${ds.train.length} decisions (val ${ds.val.length}), ${CFG.loss} λ ${CFG.lambda}, lr ${opts.lr} cosine → ${opts.lrMin}, ≤ ${opts.maxEpochs} epochs, patience ${opts.patience}, batch ${opts.batch}, clip ${opts.clip}, wd ${CFG.weightDecay}${adam ? ', Adam state continued' : ''}`);
      status({ stage: 'training', round: r, epoch: 0, trainDecisions: ds.train.length, valDecisions: ds.val.length, maxEpochs: opts.maxEpochs });
      const train = await trainRound(tp, state, ds, { ...opts, loss: CFG.loss, lambda: CFG.lambda, mu: CFG.mu, selectBy: CFG.selectBy, weightDecay: CFG.weightDecay, seed: 1 + r, adam, checkpoint: CFG.resume ? `${tag}-round${r}` : null, log: (h) => { if (h.message) log(`  ${h.message}`); else if (h.epoch !== undefined && h.val !== undefined) { log(`  epoch ${h.epoch}: train ${h.train.toFixed(4)} val ${h.val.toFixed(4)}${h.valRegret ? ` valFull rel-regret ${h.valRegret.relRegret.toFixed(4)} (top-1 ${pct(h.valRegret.top1)}, bottom-half ${pct(h.valRegret.bottomHalfRate)})` : ''} lr ${h.lr.toExponential(2)} |g| ${h.gradNorm.toFixed(2)} clipped ${pct(h.clippedFrac)} (${fmtMs(h.ms)})`); status({ stage: 'training', round: r, epoch: h.epoch, val: h.val, valRelRegret: h.valRegret?.relRegret ?? null, bestCriterion: Math.min(statusDoc.bestCriterion ?? Infinity, h.criterion), epochMs: h.ms }); } } });
      adam = train.adam;
      log(`round ${r}: trained ${train.epochs} epochs (best ${train.best.epoch} by ${train.best.criterion} ${train.best.valLoss.toFixed(4)}), ${train.steps} steps, clipped ${pct(train.clippedFrac)}  (${fmtMs(train.ms)})`);
      status({ stage: 'evaluating', round: r, bestCriterion: train.best.valLoss, epochs: train.epochs });
      const test = await evaluateTest(tp, ds.test);
      log(`round ${r}: test (${test.decisions} decisions, ${test.candidatesPerDecision.toFixed(1)} candidates — full): rel-regret ${test.relRegret.toFixed(4)} ${ci(test.relRegretCI, (v) => v.toFixed(3))}, regret ${test.regret.toFixed(2)}, τ ${test.tau.toFixed(3)} ${ci(test.tauCI)}, top-1 ${pct(test.top1)} ${ci(test.top1CI, pct)}, bottom-half picks ${pct(test.bottomHalfRate)} ${ci(test.bottomHalfRateCI, pct)}  (${fmtMs(test.ms)})`);
      const q = await quickEval(tp, { seeds: quickSeeds, cap: CFG.playCap, injector: garbage });
      status({ stage: 'round-done', round: r, test: { relRegret: test.relRegret, tau: test.tau, top1: test.top1, bottomHalfRate: test.bottomHalfRate }, quickPiecesMedian: q.piecesMedian });
      log(`round ${r}: quick eval ${q.seeds.length} games (garbage): pieces ${q.pieces.join('/')} → median ${q.piecesMedian} ${ci(q.piecesMedianCI, (v) => v.toFixed(0))}, attack ${q.attack.join('/')}, tetrises ${q.tetris.join('/')}  (${fmtMs(q.ms)})`);
      quickHistory.push({ round: r, pieces: q.pieces });
      const rec = { round: r, trainDecisions: ds.train.length, valDecisions: ds.val.length, dagger, train: { ...train, adam: undefined }, test, quick: q, ms: Math.round(performance.now() - tr) };
      rounds.push(rec);
      saveTheta(`${tag}-round${r}`, state.theta);
      saveJson(`${tag}-round${r}.json`, rec);
      clearEpochCheckpoint(`${tag}-round${r}`);
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
  status({ stage: 'final-eval', round: last.round, earlyStop: !!earlyStop });
  const play = await playEval(tp, { seeds: Array.from({ length: CFG.playGames }, (_, k) => 50000 + k), cap: CFG.playCap, injector: garbage, trace: true });
  log(`final play ${play.games} games × ${CFG.playCap} with garbage: ${playLine(play)}  (${fmtMs(play.ms)})`);
  // 사망 원인 분류 (scripts/stage7-deaths.js 와 같은 규칙) — 게이트 미달 보고 항목
  const deaths = play.games_.filter((g) => g.trace && !g.survived).map((g) => ({ seed: g.seed, pieces: g.pieces, ...classifyDeath(g.trace) }));
  const deathCounts = {};
  for (const d of deaths) deathCounts[d.cause] = (deathCounts[d.cause] ?? 0) + 1;
  const garbageDeathShare = deaths.length ? (deathCounts.garbage ?? 0) / deaths.length : 0;
  const totalPieces = play.games_.reduce((s, g) => s + g.pieces, 0);
  const holdsPerPiece = play.holds / Math.max(1, totalPieces);
  log(`deaths: ${deaths.length}/${play.games} — ${Object.entries(deathCounts).map(([k, v]) => `${k} ${v}`).join(', ')} (garbage share ${pct(garbageDeathShare)}); holes at death median ${play.holesAtDeathMedian}, garbage in last 40 pieces median ${deaths.length ? median(deaths.map((d) => d.garbage40)) : '—'}; holds ${play.holds} / ${totalPieces} pieces = ${holdsPerPiece.toFixed(3)} per piece${teacherRef ? ` (teacher ${teacherRef.holdsPerPiece.toFixed(3)})` : ''}`);
  for (const g of play.games_) delete g.trace; // 결과 파일 크기 (분류 결과만 남긴다)
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
  const holesAtDeath = play.holesAtDeathMedian ?? 0;
  const measured = { piecesMedian: play.piecesMedian, piecesMedianCI: play.piecesMedianCI, attackMedian: play.attackMedian, attackMedianCI: play.attackMedianCI, tetrisMedian: play.tetrisMedian, tetrisMedianCI: play.tetrisMedianCI, holesAtDeathMedian: holesAtDeath, holesAtDeathCI: play.holesAtDeathCI, relRegret: last.test.relRegret, relRegretCI: last.test.relRegretCI, top1: last.test.top1, top1CI: last.test.top1CI, bottomHalfRate: last.test.bottomHalfRate, tau: last.test.tau, garbageDeathShare, deadGames: deaths.length, holdsPerPiece, wellRun: { median: play.wellRuns.lengthMedian, p90: play.wellRuns.lengthP90, max: play.wellRuns.lengthMax }, lineComposition: play.lineComposition };
  let passed, thresholds = null, ratios = null;
  if (a4) {
    // A-4′: 교사 대비 비율 (교사 = 같은 조건 20 게임 × 1000). 조각은 절대 하한 250 도 함께.
    thresholds = { piecesMedian: Math.max(g.piecesFloor, g.piecesRatio * teacherRef.piecesMedian), attackMedian: g.attackRatio * teacherRef.attackMedian, tetrisMedian: g.tetrisMedian, relRegret: g.relRegret, garbageDeathShare: g.garbageDeathShare };
    ratios = { piecesMedian: measured.piecesMedian / teacherRef.piecesMedian, attackMedian: measured.attackMedian / Math.max(1e-9, teacherRef.attackMedian), tetrisMedian: measured.tetrisMedian / Math.max(1e-9, teacherRef.tetrisMedian), holdsPerPiece: holdsPerPiece / Math.max(1e-9, teacherRef.holdsPerPiece), garbageDeathShare: teacherRef.garbageDeathShare ? garbageDeathShare / teacherRef.garbageDeathShare : null };
    passed = { piecesMedian: measured.piecesMedian >= thresholds.piecesMedian, attackMedian: measured.attackMedian >= thresholds.attackMedian, tetrisMedian: measured.tetrisMedian >= g.tetrisMedian, relRegret: measured.relRegret <= g.relRegret, garbageDeathShare: deaths.length === 0 || garbageDeathShare <= g.garbageDeathShare };
  } else {
    passed = { piecesMedian: measured.piecesMedian >= g.piecesMedian, attackMedian: measured.attackMedian >= g.attackMedian, tetrisMedian: measured.tetrisMedian >= g.tetrisMedian, holesAtDeathMedian: play.deadGames === 0 || holesAtDeath <= g.holesAtDeathMedian, relRegret: measured.relRegret <= g.relRegret };
  }
  const shortfall = a4
    ? { piecesMedian: Math.max(0, thresholds.piecesMedian - measured.piecesMedian), attackMedian: Math.max(0, thresholds.attackMedian - measured.attackMedian), tetrisMedian: Math.max(0, g.tetrisMedian - measured.tetrisMedian), relRegret: Math.max(0, measured.relRegret - g.relRegret), garbageDeathShare: Math.max(0, garbageDeathShare - g.garbageDeathShare) }
    : { piecesMedian: Math.max(0, g.piecesMedian - measured.piecesMedian), attackMedian: Math.max(0, g.attackMedian - measured.attackMedian), tetrisMedian: Math.max(0, g.tetrisMedian - measured.tetrisMedian), holesAtDeathMedian: Math.max(0, holesAtDeath - g.holesAtDeathMedian), relRegret: Math.max(0, measured.relRegret - g.relRegret) };
  const gate = { phase, criteria: g, thresholds, teacher: teacherRef, ratios, measured, passed, all: Object.values(passed).every(Boolean), shortfall, deaths: { counts: deathCounts, rows: deaths } };
  const first = rounds[0];
  const doc = {
    ranAt: new Date().toISOString(), phase, teacherVariant: variant, elapsedMs: Math.round(performance.now() - t0), config: CFG, hyper: HYPER,
    model: { kind: 'sparse', condition: 'C0', N: mask.N, E: mask.E, nInput: mask.nInput, nOutput: mask.nOutput, rhoUnit: mask.rhoUnit, P: state.P, sizes: state.layout.sizes, init: { W: `rhoTarget ${HYPER.rhoTarget} / rho_unit × w_unit(alpha 1)`, Win: 'board 200 cols = stage-3 Gaussian RF × 1.0; other 56 cols U(−0.1, 0.1)', b: 0, readout: 'He-uniform' }, readoutStandardization: { n: cal.n, constantDNs: cal.std.filter((s) => s === 0).length } },
    data: { ...ds.meta, teacher: teacher.source, teacherVariant: variant, teacherSearch: { ply: teacher.ply, depth: teacher.depth, width: teacher.width, hold: teacher.hold }, dataFile, garbage, finalTrainDecisions: ds.train.length, finalValDecisions: ds.val.length },
    untrained: initTest, rounds, quickHistory, earlyStop, play, weights, inputWeights, gate,
    improvement: { perRound: rounds.map((r) => ({ round: r.round, relRegret: r.test.relRegret, top1: r.test.top1, tau: r.test.tau, bottomHalfRate: r.test.bottomHalfRate, quickPiecesMedian: r.quick.piecesMedian, quickPieces: r.quick.pieces, quickTetrises: r.quick.tetris, onPolicyAgreement: r.dagger?.agreeWithTeacher ?? null })), relRegret: last.test.relRegret - first.test.relRegret, top1: last.test.top1 - first.test.top1, quickPieces: last.quick.piecesMedian - first.quick.piecesMedian },
    note: a4
      ? '커넥톰에서 오는 것은 배선 구조(마스크)뿐이며 가중치는 학습됐다. 평가는 전체 후보 (K=8 은 학습 부분집합). 게이트 플레이는 가비지 주입 포함. A-4′: 교사만 교체 (깊이 1 + hold, 가비지 조건 튜닝), 게이트는 교사 대비 비율 + 조각 절대 하한 250; 손실·하이퍼파라미터는 A-3 그대로.'
      : '커넥톰에서 오는 것은 배선 구조(마스크)뿐이며 가중치는 학습됐다. 평가는 전체 후보 (K=8 은 학습 부분집합). 게이트 플레이는 가비지 주입 포함. A-3: 손실에 구멍 페널티 μ, 선택 기준 상대 regret, top-1 은 게이트 제외.',
  };
  writeFileSync(OUT, JSON.stringify(doc, null, 1) + '\n');
  const model = saveModel(quick ? 'c0-quick' : 'c0', state, { phase, condition: 'C0', trainedAt: doc.ranAt, rounds: rounds.length, lambda: CFG.lambda, mu: CFG.mu, teacher: { variant, ply: teacher.ply, depth: teacher.depth, width: teacher.width, hold: teacher.hold, source: teacher.source }, gate, test: { relRegret: last.test.relRegret, tau: last.test.tau, top1: last.test.top1, bottomHalfRate: last.test.bottomHalfRate }, play: { piecesMedian: play.piecesMedian, attackMedian: play.attackMedian, tetrisMedian: play.tetrisMedian, holesAtDeathMedian: play.holesAtDeathMedian, survival: play.survival, holdsPerPiece } });
  const lc = play.lineComposition;
  console.log(`\n=== Phase ${phase} gate (round ${last.round}; teacher ${variant}; μ ${CFG.mu}, λ ${CFG.lambda}; test ${last.test.decisions} decisions full candidates; play ${play.games} games × ${CFG.playCap} with garbage ${garbage.rate}/piece) ===`);
  const row = (name, val, crit, ok, extra = '') => console.log(`  ${name.padEnd(24)} ${val.padStart(26)}   ${crit.padEnd(8)} ${ok ? 'PASS' : 'FAIL'}${extra ? `   ${extra}` : ''}`);
  const r2 = (x) => (x === null || x === undefined ? '—' : `${(100 * x).toFixed(0)}%`);
  if (a4) {
    const tr = teacherRef;
    row('pieces median', `${measured.piecesMedian} ${ci(measured.piecesMedianCI, (v) => v.toFixed(0))}`, `≥ ${Math.ceil(thresholds.piecesMedian)}`, passed.piecesMedian, `${r2(ratios.piecesMedian)} of teacher ${tr.piecesMedian} (gate ${pct(g.piecesRatio)}, floor ${g.piecesFloor}); A-3 152`);
    row('attack median', `${measured.attackMedian} ${ci(measured.attackMedianCI, (v) => v.toFixed(0))}`, `≥ ${thresholds.attackMedian.toFixed(0)}`, passed.attackMedian, `${r2(ratios.attackMedian)} of teacher ${tr.attackMedian} (gate ${pct(g.attackRatio)}); A-3 24, beam teacher 418.5`);
    row('tetris / game median', `${measured.tetrisMedian} ${ci(measured.tetrisMedianCI, (v) => v.toFixed(1))}`, `≥ ${g.tetrisMedian}`, passed.tetrisMedian, `${r2(ratios.tetrisMedian)} of teacher ${tr.tetrisMedian}; total ${play.tetrises} (A-3 25)`);
    row('relative regret', `${measured.relRegret.toFixed(3)} ${ci(measured.relRegretCI, (v) => v.toFixed(3))}`, `≤ ${g.relRegret}`, passed.relRegret, `A-3 0.090; untrained ${initTest.relRegret.toFixed(3)}; top-1 ${pct(measured.top1)} (not gated), τ ${measured.tau.toFixed(3)}, bottom-half ${pct(measured.bottomHalfRate)}`);
    row('garbage death share', `${pct(garbageDeathShare)} (${deathCounts.garbage ?? 0}/${deaths.length})`, `≤ ${pct(g.garbageDeathShare)}`, passed.garbageDeathShare, `deaths ${JSON.stringify(deathCounts)}; teacher ${JSON.stringify(tr.deaths)} (${pct(tr.garbageDeathShare)}); A-3 50%`);
    console.log(`  hold usage: ${play.holds} holds / ${totalPieces} pieces = ${holdsPerPiece.toFixed(3)} per piece — ${r2(ratios.holdsPerPiece)} of teacher ${tr.holdsPerPiece.toFixed(3)}${holdsPerPiece < 0.05 ? '  (학생이 hold 를 거의 쓰지 않는다 — 입력 인코딩·후보 생성 점검)' : ''}`);
    console.log(`  well runs ${play.wellRuns.count}: length median ${play.wellRuns.lengthMedian}, p90 ${play.wellRuns.lengthP90}, max ${play.wellRuns.lengthMax}, ended with tetris ${pct(play.wellRuns.endedWithTetris)} (A-3 median 2 / p90 7 / max 27; teacher ${tr.wellRun.median} / ${tr.wellRun.p90} / ${tr.wellRun.max})`);
    console.log(`  holes at death median ${measured.holesAtDeathMedian}${measured.holesAtDeathCI ? ` ${ci(measured.holesAtDeathCI, (v) => v.toFixed(0))}` : ''} (A-3 19; in play median ${play.holesMedianInPlay}); survival ${pct(play.survival)} (teacher ${pct(tr.survival)})`);
    console.log(`  line composition 1/2/3/4: ${lc.single}/${lc.double}/${lc.triple}/${lc.tetris} (shares ${lc.shares ? lc.shares.map(pct).join('/') : '—'}); teacher ${tr.lineComposition.single}/${tr.lineComposition.double}/${tr.lineComposition.triple}/${tr.lineComposition.tetris}; A-3 1042/134/35/25; lines/1000 ${play.linesPer1000}`);
  } else {
    row('pieces median', `${measured.piecesMedian} ${ci(measured.piecesMedianCI, (v) => v.toFixed(0))}`, `≥ ${g.piecesMedian}`, passed.piecesMedian, `A-2 145.5`);
    row('attack median', `${measured.attackMedian} ${ci(measured.attackMedianCI, (v) => v.toFixed(0))}`, `≥ ${g.attackMedian}`, passed.attackMedian, `A-2 17.5; teacher 418`);
    row('tetris / game median', `${measured.tetrisMedian} ${ci(measured.tetrisMedianCI, (v) => v.toFixed(1))}`, `≥ ${g.tetrisMedian}`, passed.tetrisMedian, `total ${play.tetrises} (A-2 5); well runs ${play.wellRuns.count}, length median ${play.wellRuns.lengthMedian}, max ${play.wellRuns.lengthMax}, ended with tetris ${pct(play.wellRuns.endedWithTetris)}`);
    row('holes at death median', `${measured.holesAtDeathMedian}${measured.holesAtDeathCI ? ` ${ci(measured.holesAtDeathCI, (v) => v.toFixed(0))}` : ''}`, `≤ ${g.holesAtDeathMedian}`, passed.holesAtDeathMedian, `A-2 19; in play median ${play.holesMedianInPlay}; deaths ${JSON.stringify(deathCounts)}`);
    row('relative regret', `${measured.relRegret.toFixed(3)} ${ci(measured.relRegretCI, (v) => v.toFixed(3))}`, `≤ ${g.relRegret}`, passed.relRegret, `untrained ${initTest.relRegret.toFixed(3)}; top-1 ${pct(measured.top1)} (not gated), τ ${measured.tau.toFixed(3)}, bottom-half ${pct(measured.bottomHalfRate)}`);
    console.log(`  line composition 1/2/3/4: ${lc.single}/${lc.double}/${lc.triple}/${lc.tetris} (shares ${lc.shares ? lc.shares.map(pct).join('/') : '—'}); lines/1000 ${play.linesPer1000}; survival ${pct(play.survival)}`);
  }
  console.log('  per round:');
  for (const r of doc.improvement.perRound) console.log(`    round ${r.round}: rel-regret ${r.relRegret.toFixed(4)}  top-1 ${pct(r.top1)}  τ ${r.tau.toFixed(3)}  bottom-half ${pct(r.bottomHalfRate)}  quick pieces median ${r.quickPiecesMedian} (${r.quickPieces.join('/')})  tetrises ${r.quickTetrises.join('/')}${r.onPolicyAgreement !== null ? `  on-policy agreement ${pct(r.onPolicyAgreement)}` : ''}`);
  if (earlyStop) console.log(`  early stop after round ${earlyStop.afterRound} (skipped ${earlyStop.skipped} rounds)`);
  console.log(`wrote ${path.relative(ROOT, OUT)}, data/stage7/${model.file} + ${quick ? 'c0-quick' : 'c0'}.model.json  (total ${fmtMs(doc.elapsedMs)})`);
  status({ stage: 'done', done: true, gatePassed: gate.all, gate: measured, ratios, elapsedMs: doc.elapsedMs, rounds: rounds.length });
  if (!gate.all) { console.error(`\nPHASE ${phase} GATE NOT MET (${Object.entries(passed).filter(([, v]) => !v).map(([k]) => k).join(', ')}) — 멈춤. Phase B 는 진행하지 않는다.`); process.exit(1); }
  console.log(`\nPhase ${phase} gate passed.`);
}

main().catch((err) => { console.error(err); status({ stage: 'error', error: String(err?.stack ?? err) }); process.exit(2); });
