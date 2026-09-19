#!/usr/bin/env node
// 7단계 Phase B — null 비교 (보고서용). Phase A-2 게이트 통과 후에만 (data/stage7-c0.json 의 gate.all; --force 로 무시).
// 조건 (모두 같은 하이퍼파라미터·에폭 상한·데이터 — 12k/4k 결정 (예산 축소: 24k → 12k, C0 도 같은 12k 로 다시 학습), mixed negatives, λ (파일럿 선택), AdamW 감쇠 + 드롭아웃,
//   DAgger 없음, 1 라운드; 조건별 튜닝 없음). 우선순위 순 — 예산 8 h (--budget-hours) 를 넘기면 뒤에서부터 뺀다 (C4·C5 → 보조 실행; C0·C1·C3·D0 는 유지):
//   C0  real (12k 재학습)     C1  degree-shuffle 시드 1     C3  erdos-renyi 시드 1     D0  dense-matched (상한 참조)     C0-listwise (표에만)     C4  KC-ablated     C5  direct-ablated
//   D0  dense-matched — 마스크 없는 밀집 MLP u → H1 → H2 → H3 → 1, 파라미터 수를 C0 와 정확히 일치 (상한 참조)
//   C0-shuffled-init  (보조, null 아님) 마스크는 C0, 초기 W 만 간선 사이에서 순열 — 커넥톰 초기값이 학습 결과에 기여하는지의 대조군
// C2 weight-shuffle 은 없다: 가중치를 학습하면 C2 는 C0 와 위상적으로 동일한 마스크라 null 이 아니다 (docs/stage7-wiring-constraint.md §1).
// 평가: 테스트 1,204 결정 전체 후보 (τ · top-1 · 하위 50% 선택률) + 20 게임 × 1000 조각 가비지 포함 (게이트와 같은 조건: 조각 · 공격 · 테트리스 · 우물).
// 라운드 결과는 data/stage7/b-{name}.json + theta 로 체크포인트 (있으면 건너뜀). 산출: data/stage7-results.json.
// --teacher KEY (Phase A-4′): 그 변형의 교사·데이터로 (train-c0 --teacher 와 같은 값). 학생 후보 집합은 교사의 hold 설정을 따른다. 예산 실측은 a4-c0-round0.json 에서.
// 옵션: --workers N --only C1s0,D0 --games N --lambda F --force --quick --teacher KEY

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { HYPER, PHASE_B, analyzeWeights } from '../src/stage7-train.js';
import { CONDITION_NAMES } from '../src/nullmodels.js';
import { ciOverlap } from '../src/evaluate.js';
import { buildDataset, calibrateState, ci, clearEpochCheckpoint, createDenseState, createSparseState, createTrainingPool, DEFAULT_WORKERS, evaluateTest, fmtMs, loadInputs, loadJson, loadTheta, maskFor, pct, playEval, playLine, ROOT, saveJson, saveModel, saveTheta, STAGE7_DIR, trainRound, variantOf } from './stage7-lib.js';

const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? argv[i + 1] : def; };
const quick = argv.includes('--quick');
const variant = variantOf(argv);
const lambdaChoice = existsSync(path.join(STAGE7_DIR, 'lambda-choice.json')) ? JSON.parse(readFileSync(path.join(STAGE7_DIR, 'lambda-choice.json'), 'utf8')) : null;
const muChoice = existsSync(path.join(STAGE7_DIR, 'mu-choice.json')) ? JSON.parse(readFileSync(path.join(STAGE7_DIR, 'mu-choice.json'), 'utf8')) : null;
const CFG = {
  workers: Number(opt('workers', DEFAULT_WORKERS)), teacherVariant: variant, playGames: Number(opt('games', quick ? 2 : 20)), playCap: quick ? 40 : 1000,
  trainDecisions: quick ? 64 : PHASE_B.trainDecisions, valDecisions: quick ? 32 : PHASE_B.valDecisions, nullSeeds: PHASE_B.nullSeeds, budgetHours: Number(opt('budget-hours', PHASE_B.budgetHours)),
  lambda: opt('lambda', null) !== null ? Number(opt('lambda')) : (lambdaChoice?.lambda ?? HYPER.lambda), mu: opt('mu', null) !== null ? Number(opt('mu')) : (muChoice?.mu ?? HYPER.mu), selectBy: HYPER.selectBy, valFullDecisions: quick ? 16 : HYPER.valFullDecisions,
  negatives: HYPER.negatives, hardNegatives: HYPER.hardNegatives, weightDecay: HYPER.weightDecay, dropoutZ: HYPER.dropoutZ, dropoutH: HYPER.dropoutH,
  train: { maxEpochs: quick ? 1 : HYPER.maxEpochs, patience: HYPER.patience, lr: HYPER.lr, batch: HYPER.batch, clip: HYPER.clip, lrMin: HYPER.lrMin },
  only: opt('only', null)?.split(','), force: argv.includes('--force'), quick,
};
// 우선순위 순 (예산 축소 시 뒤에서부터 제외). 필수: C0 · C1 · C3 · D0.
const RUNS = [
  { name: 'C0', condition: 'C0', seed: 0, loss: 'pairwise', essential: true },
  { name: 'C1s0', condition: 'C1', seed: 0, loss: 'pairwise', essential: true },
  { name: 'C3s0', condition: 'C3', seed: 0, loss: 'pairwise', essential: true },
  { name: 'D0', condition: 'D0', seed: 0, loss: 'pairwise', essential: true, cheap: true },
  { name: 'C0-listwise', condition: 'C0', seed: 0, loss: 'listwise' },
  { name: 'C4', condition: 'C4', seed: 0, loss: 'pairwise' },
  { name: 'C5', condition: 'C5', seed: 0, loss: 'pairwise' },
  { name: 'C1s1', condition: 'C1', seed: 1, loss: 'pairwise', extraSeed: true },
  { name: 'C3s1', condition: 'C3', seed: 1, loss: 'pairwise', extraSeed: true },
  { name: 'C0-shuffled-init', condition: 'C0', seed: 0, loss: 'pairwise', shuffleInit: true, supplement: true },
];
const OUT = path.join(ROOT, 'data', quick ? 'stage7-results-quick.json' : 'stage7-results.json');
const log = (s) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${s}`);
const STATUS = path.join(STAGE7_DIR, quick ? 'train-nulls-quick.status.json' : 'train-nulls.status.json');
let statusDoc = { phase: 'B', pid: process.pid, startedAt: new Date().toISOString(), done: false };
const status = (patch) => { statusDoc = { ...statusDoc, ...patch, updatedAt: new Date().toISOString() }; try { writeFileSync(STATUS, JSON.stringify(statusDoc, null, 1) + '\n'); } catch {} };

async function main() {
  const t0 = performance.now();
  try { writeFileSync(path.join(STAGE7_DIR, quick ? 'train-nulls-quick.pid' : 'train-nulls.pid'), `${process.pid}\n`); } catch {}
  const c0File = path.join(ROOT, 'data', 'stage7-c0.json');
  const phaseA = existsSync(c0File) ? JSON.parse(readFileSync(c0File, 'utf8')) : null;
  if (!quick && !CFG.force && !phaseA?.gate?.all) { console.error('Phase A 게이트를 통과한 data/stage7-c0.json 이 없다 — Phase B 는 게이트 통과 후에만 (--force 로 무시).'); process.exit(1); }
  if (!quick && !CFG.force && phaseA && (phaseA.teacherVariant ?? 'beam') !== variant) { console.error(`data/stage7-c0.json 은 교사 ${phaseA.teacherVariant ?? 'beam'} 로 학습됐다 — --teacher ${phaseA.teacherVariant ?? 'beam'} 로 맞출 것 (--force 로 무시).`); process.exit(1); }
  const { connectome, teacher, data, garbage, dataFile } = loadInputs({ variant });
  log(`teacher [${variant}]: ${teacher.source} (ply ${teacher.ply}, hold ${teacher.hold}); data ${dataFile}`);
  const ds = buildDataset(data, { trainDecisions: CFG.trainDecisions, valDecisions: CFG.valDecisions, negatives: CFG.negatives, hard: CFG.hardNegatives, valFullDecisions: CFG.valFullDecisions });
  log(`data: train ${ds.meta.trainDecisions} × K ${ds.K} [${ds.negatives}], val ${ds.meta.valDecisions} × K (valFull ${ds.valFull.length}), test ${ds.meta.testDecisions} decisions (${ds.meta.testCandidates} candidates, full); hyper ${JSON.stringify(CFG.train)} λ ${CFG.lambda} μ ${CFG.mu} select ${CFG.selectBy} wd ${CFG.weightDecay} dropout ${CFG.dropoutZ}/${CFG.dropoutH} for every condition; play with garbage ${garbage.rate}/piece; ${CFG.workers} workers`);
  const c0P = createSparseState(maskFor(connectome, 'C0'), HYPER).P;
  // ---------- 예산: Phase A-2 라운드 0 의 실측 에폭 시간을 12k 로 환산해 실행 목록을 우선순위대로 자른다 ----------
  const a2r0 = (variant !== 'beam' ? loadJson('a4-c0-round0.json') : null) ?? loadJson('a3-c0-round0.json') ?? loadJson('phaseA3/a3-c0-round0.json') ?? loadJson('phaseA2/a2-c0-round0.json');
  const hist = a2r0?.train?.history ?? [];
  const epochMs24k = hist.length ? hist.reduce((s, h) => s + h.ms, 0) / hist.length : 13 * 60000;
  const epochEvalMs = hist.length ? hist.reduce((s, h) => s + (h.evalMs ?? 0), 0) / hist.length : 0; // 에폭 끝 검증(val 손실 + valFull regret) — 학습 규모와 무관한 상수
  const epochMs = (epochMs24k - epochEvalMs) * CFG.trainDecisions / (a2r0?.trainDecisions ?? 24000) + epochEvalMs;
  const evalMs = (a2r0?.test?.ms ?? 40000) + 10 * 60000; // 테스트 + 가비지 20 게임 (~10 min)
  const runMs = (r) => (r.condition === 'D0' ? 0.15 : 1) * (PHASE_B.expectedEpochs * epochMs + evalMs);
  let runs = RUNS.filter((r) => !CFG.only || CFG.only.includes(r.name)).filter((r) => !r.extraSeed || CFG.nullSeeds > 1);
  const budgetMs = CFG.budgetHours * 3.6e6;
  const plan = [];
  let acc = 0;
  for (const r of runs) { const ms = runMs(r); if (acc + ms <= budgetMs || r.essential) { plan.push({ ...r, estMs: ms }); acc += ms; } else plan.push({ ...r, estMs: ms, dropped: true }); }
  const dropped = plan.filter((r) => r.dropped);
  runs = plan.filter((r) => !r.dropped);
  log(`budget: epoch ${fmtMs(epochMs)} at ${CFG.trainDecisions} decisions (from Phase A-2 round 0: ${fmtMs(epochMs24k)} at ${a2r0?.trainDecisions ?? 24000}), expected ${PHASE_B.expectedEpochs} epochs + eval ${fmtMs(evalMs)} per run; budget ${CFG.budgetHours} h → ${runs.length} runs (${runs.map((r) => r.name).join(', ')}) ≈ ${fmtMs(acc)}${dropped.length ? `; dropped ${dropped.map((r) => r.name).join(', ')}` : ''}`);
  if (acc > budgetMs) { console.error(`Phase B 필수 실행만으로도 예산 초과 (${fmtMs(acc)} > ${CFG.budgetHours} h) — 멈춤`); status({ stage: 'over-budget', estimateMs: acc }); process.exit(1); }
  status({ stage: 'planned', plan: plan.map((r) => ({ name: r.name, estMs: Math.round(r.estMs), dropped: !!r.dropped })), estimateMs: Math.round(acc) });
  writeFileSync(path.join(STAGE7_DIR, 'phaseB-plan.json'), JSON.stringify({ plannedAt: new Date().toISOString(), trainDecisions: CFG.trainDecisions, valDecisions: CFG.valDecisions, nullSeeds: CFG.nullSeeds, budgetHours: CFG.budgetHours, epochMs, evalMs, plan, estimateMs: acc }, null, 1) + '\n');
  const results = [];
  for (const run of runs) {
    const tag = quick ? `b-${run.name}-quick` : `b-${run.name}`;
    const prev = quick ? null : loadJson(`${tag}.json`);
    if (prev) { log(`${run.name}: loaded data/stage7/${tag}.json — skipping`); results.push(prev); continue; }
    const tr = performance.now();
    let state, desc;
    if (run.condition === 'D0') { state = createDenseState(c0P, { seed: HYPER.seed }); desc = `dense MLP ${state.hidden.join('→')} (dropout ${CFG.dropoutH} on hidden layers), P ${state.P} (= C0 ${c0P})`; }
    else {
      const mask = maskFor(connectome, run.condition, run.seed);
      state = createSparseState(mask, HYPER, { shuffleInit: !!run.shuffleInit });
      calibrateState(state, ds, 256);
      desc = `${CONDITION_NAMES[run.condition]}${run.seed ? ` seed ${run.seed}` : ''}${run.shuffleInit ? ' (init weights shuffled)' : ''}: N ${mask.N}, E ${mask.E}, rho_unit ${mask.rhoUnit.toFixed(4)}${mask.rhoConverged ? '' : ' (power iteration did not converge)'}, P ${state.P}`;
    }
    log(`${run.name}: ${desc}; loss ${run.loss}`);
    status({ stage: 'training', run: run.name, completed: results.map((r) => r.name) });
    const tp = await createTrainingPool(state, ds, { workers: CFG.workers, teacher });
    let train;
    {
      train = await trainRound(tp, state, ds, { ...CFG.train, loss: run.loss, lambda: run.loss === 'pairwise' ? CFG.lambda : 0, mu: CFG.mu, selectBy: CFG.selectBy, weightDecay: CFG.weightDecay, seed: 1, checkpoint: quick ? null : tag, log: (h) => { if (h.message) log(`  ${h.message}`); else if (h.val !== undefined) { log(`  epoch ${h.epoch}: train ${h.train.toFixed(4)} val ${h.val.toFixed(4)}${h.valRegret ? ` valFull rel-regret ${h.valRegret.relRegret.toFixed(4)}` : ''} lr ${h.lr.toExponential(2)} |g| ${h.gradNorm.toFixed(2)} clipped ${pct(h.clippedFrac)} (${fmtMs(h.ms)})`); status({ stage: 'training', run: run.name, epoch: h.epoch, val: h.val, valRelRegret: h.valRegret?.relRegret ?? null }); } } });
      delete train.adam;
      log(`${run.name}: trained ${train.epochs} epochs (best ${train.best.epoch}, val ${train.best.valLoss.toFixed(4)}), ${train.steps} steps  (${fmtMs(train.ms)})`);
      saveTheta(tag, state.theta);
    }
    const test = await evaluateTest(tp, ds.test);
    log(`${run.name}: test rel-regret ${test.relRegret.toFixed(4)} ${ci(test.relRegretCI, (v) => v.toFixed(3))}, τ ${test.tau.toFixed(3)} ${ci(test.tauCI)}, top-1 ${pct(test.top1)} ${ci(test.top1CI, pct)}, bottom-half picks ${pct(test.bottomHalfRate)} (${test.candidatesPerDecision.toFixed(1)} candidates/decision, full)  (${fmtMs(test.ms)})`);
    const play = await playEval(tp, { seeds: Array.from({ length: CFG.playGames }, (_, k) => 50000 + k), cap: CFG.playCap, injector: garbage });
    log(`${run.name}: play ${play.games} games × ${CFG.playCap} (garbage): ${playLine(play)}  (${fmtMs(play.ms)})`);
    await tp.close();
    let weights = null;
    if (state.kind === 'sparse') {
      const wFinal = state.theta.subarray(state.layout.off.W, state.layout.off.W + state.mask.E);
      const a = analyzeWeights(state.mask, state.wInit, wFinal);
      weights = { vsInit: a.overall, byBlock: a.byBlock, norms: a.norms };
      if (run.shuffleInit) weights.vsConnectome = analyzeWeights(state.mask, state.connectomeInit, wFinal).overall; // 순열 초기값에서 출발한 W 가 커넥톰 가중치와 얼마나 닮는가
      log(`${run.name}: W vs init corr ${a.overall.corr.toFixed(3)}, rel |Δw| ${a.overall.meanRelDelta.toFixed(2)}, inhibitory ${pct(a.overall.inhibitoryFrac)}${weights.vsConnectome ? `; vs connectome weights corr ${weights.vsConnectome.corr.toFixed(3)}` : ''}`);
    }
    const rec = {
      name: run.name, condition: run.condition, conditionName: run.condition === 'D0' ? 'dense-matched' : CONDITION_NAMES[run.condition], seed: run.seed, loss: run.loss, supplement: !!run.supplement, shuffleInit: !!run.shuffleInit, desc,
      P: state.P, N: state.mask?.N ?? null, E: state.mask?.E ?? null, hidden: state.hidden ?? null, rhoUnit: state.mask?.rhoUnit ?? null,
      train: { ...train, history: train.history }, test, play, weights, ms: Math.round(performance.now() - tr),
    };
    saveJson(`${tag}.json`, rec);
    if (!quick) { saveModel(tag, state, { condition: run.condition, seed: run.seed, loss: run.loss, teacher: { variant, ply: teacher.ply, depth: teacher.depth, width: teacher.width, hold: teacher.hold }, test: { tau: test.tau, top1: test.top1 }, play: { attackMedian: play.attackMedian, survival: play.survival } }); clearEpochCheckpoint(tag); }
    results.push(rec);
  }

  // ---------- 표 · 비교 ----------
  const find = (n) => results.find((r) => r.name === n);
  const c0 = find('C0');
  const table = results.map((r) => ({ name: r.name, condition: r.conditionName, seed: r.seed, loss: r.loss, supplement: r.supplement, P: r.P, E: r.E, epochs: r.train.epochs, bestEpoch: r.train.best.epoch, valLoss: r.train.best.valLoss, relRegret: r.test.relRegret, relRegretCI: r.test.relRegretCI, tau: r.test.tau, tauCI: r.test.tauCI, top1: r.test.top1, top1CI: r.test.top1CI, bottomHalfRate: r.test.bottomHalfRate, bottomHalfRateCI: r.test.bottomHalfRateCI, holesAtDeathMedian: r.play.holesAtDeathMedian ?? null, piecesMedian: r.play.piecesMedian, piecesMedianCI: r.play.piecesMedianCI, attackMedian: r.play.attackMedian, attackMedianCI: r.play.attackMedianCI, tetrisMedian: r.play.tetrisMedian, tetrisMedianCI: r.play.tetrisMedianCI, survival: r.play.survival, linesPer1000: r.play.linesPer1000, wellRunMedian: r.play.wellRuns.lengthMedian, inhibitoryFrac: r.weights?.vsInit.inhibitoryFrac ?? null, corrInit: r.weights?.vsInit.corr ?? null }));
  console.log(`\n=== Phase B: test ${ds.meta.testDecisions} decisions (full candidates), play ${CFG.playGames} × ${CFG.playCap} with garbage; 95% CI ===`);
  console.log(`${'run'.padEnd(18)} ${'condition'.padEnd(16)} ${'loss'.padEnd(9)} ${'P'.padStart(8)} ${'ep'.padStart(3)} ${'rel regret'.padEnd(22)} ${'τ'.padEnd(22)} ${'top-1'.padEnd(24)} ${'pieces median'.padEnd(18)} ${'attack median'.padEnd(16)} ${'tetris/game'.padEnd(14)} ${'holes@death'.padEnd(11)} inh%`);
  for (const r of table) console.log(`${r.name.padEnd(18)} ${r.condition.padEnd(16)} ${r.loss.padEnd(9)} ${String(r.P).padStart(8)} ${String(r.epochs).padStart(3)} ${`${r.relRegret.toFixed(3)} ${ci(r.relRegretCI, (v) => v.toFixed(3))}`.padEnd(22)} ${`${r.tau.toFixed(3)} ${ci(r.tauCI)}`.padEnd(22)} ${`${pct(r.top1)} ${ci(r.top1CI, pct)}`.padEnd(24)} ${`${r.piecesMedian} ${ci(r.piecesMedianCI, (v) => v.toFixed(0))}`.padEnd(18)} ${`${r.attackMedian} ${ci(r.attackMedianCI, (v) => v.toFixed(0))}`.padEnd(16)} ${`${r.tetrisMedian} ${ci(r.tetrisMedianCI, (v) => v.toFixed(1))}`.padEnd(14)} ${String(r.holesAtDeathMedian ?? '—').padEnd(11)} ${r.inhibitoryFrac !== null ? pct(r.inhibitoryFrac) : '—'}`);
  const comparisons = {};
  if (c0) {
    const vs = (name) => { const r = find(name); if (!r) return null; return { name, dRelRegret: r.test.relRegret - c0.test.relRegret, relRegretSeparated: !ciOverlap(r.test.relRegretCI, c0.test.relRegretCI), dTop1: r.test.top1 - c0.test.top1, top1Separated: !ciOverlap(r.test.top1CI, c0.test.top1CI), dTau: r.test.tau - c0.test.tau, tauSeparated: !ciOverlap(r.test.tauCI, c0.test.tauCI), dPieces: r.play.piecesMedian - c0.play.piecesMedian, piecesSeparated: !ciOverlap(r.play.piecesMedianCI, c0.play.piecesMedianCI), dAttack: r.play.attackMedian - c0.play.attackMedian, attackSeparated: !ciOverlap(r.play.attackMedianCI, c0.play.attackMedianCI), dTetris: r.play.tetrisMedian - c0.play.tetrisMedian }; };
    for (const r of results) if (r.name !== 'C0') comparisons[r.name] = vs(r.name);
    const nulls = results.filter((r) => r.condition === 'C1' || r.condition === 'C3');
    comparisons.c0OutsideNulls = { relRegret: nulls.every((r) => !ciOverlap(r.test.relRegretCI, c0.test.relRegretCI)), top1: nulls.every((r) => !ciOverlap(r.test.top1CI, c0.test.top1CI)), tau: nulls.every((r) => !ciOverlap(r.test.tauCI, c0.test.tauCI)), pieces: nulls.every((r) => !ciOverlap(r.play.piecesMedianCI, c0.play.piecesMedianCI)), attack: nulls.every((r) => !ciOverlap(r.play.attackMedianCI, c0.play.attackMedianCI)), nullTop1Range: nulls.length ? [Math.min(...nulls.map((r) => r.test.top1)), Math.max(...nulls.map((r) => r.test.top1))] : null };
    console.log(`\nC0 vs nulls (C1, C3): rel-regret ${comparisons.c0OutsideNulls.relRegret ? 'separated' : 'overlaps'}; top-1 ${pct(c0.test.top1)} vs null range ${comparisons.c0OutsideNulls.nullTop1Range ? comparisons.c0OutsideNulls.nullTop1Range.map(pct).join('–') : '—'} — ${comparisons.c0OutsideNulls.top1 ? 'C0 outside every null CI' : 'CI overlaps with at least one null (no difference)'}; τ ${comparisons.c0OutsideNulls.tau ? 'separated' : 'overlaps'}; pieces ${comparisons.c0OutsideNulls.pieces ? 'separated' : 'overlaps'}; attack ${comparisons.c0OutsideNulls.attack ? 'separated' : 'overlaps'}`);
    const d0 = find('D0');
    if (d0) console.log(`C0 vs D0 (dense, same P): Δtop-1 ${(comparisons.D0.dTop1 >= 0 ? '+' : '')}${pct(comparisons.D0.dTop1)} (${comparisons.D0.top1Separated ? 'CI separated' : 'CI overlap'}), Δτ ${comparisons.D0.dTau.toFixed(3)}, Δpieces ${comparisons.D0.dPieces} (${comparisons.D0.piecesSeparated ? 'CI separated' : 'CI overlap'}), Δattack ${comparisons.D0.dAttack}, Δtetris ${comparisons.D0.dTetris} — ${comparisons.D0.dTop1 < 0 ? '배선 제약은 손해' : '배선 제약은 손해가 아님'} (그대로 보고)`);
    for (const n of ['C1s0', 'C1s1']) if (find(n)) console.log(`${n} (degree-shuffle): top-1 ${pct(find(n).test.top1)} — 5단계에서는 동작 영역 없음(침묵); 학습으로 ${find(n).test.top1 > (phaseA?.untrained?.top1 ?? 0.25) + 0.03 ? '되살아남' : '학습 전 기준선 수준'}`);
  }
  const doc = { ranAt: new Date().toISOString(), phase: `B (${phaseA?.phase ?? 'A'} protocol, reduced: 12k, null seeds 1)`, teacherVariant: variant, elapsedMs: Math.round(performance.now() - t0), config: CFG, phaseB: PHASE_B, plan, dropped: dropped.map((r) => r.name), hyper: HYPER, data: { ...ds.meta, teacher: teacher.source, teacherVariant: variant, dataFile, garbage }, phaseAGate: phaseA?.gate ?? null, untrainedTop1: phaseA?.untrained?.top1 ?? null, runs: results, table, comparisons, note: 'C2 weight-shuffle 은 가중치 학습 하에서 C0 와 같은 마스크라 null 이 아니다 (삭제). C0-shuffled-init 은 null 이 아니라 초기값 대조군. 플레이는 가비지 주입 포함 (게이트와 같은 조건).' };
  writeFileSync(OUT, JSON.stringify(doc, null, 1) + '\n');
  status({ stage: 'done', done: true, completed: results.map((r) => r.name), elapsedMs: doc.elapsedMs });
  console.log(`\nwrote ${path.relative(ROOT, OUT)}  (total ${fmtMs(doc.elapsedMs)})`);
}

main().catch((err) => { console.error(err); status({ stage: 'error', error: String(err?.stack ?? err) }); process.exit(2); });
