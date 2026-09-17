#!/usr/bin/env node
// 7단계 Phase B — null 비교 (보고서용). Phase A-2 게이트 통과 후에만 (data/stage7-c0.json 의 gate.all; --force 로 무시).
// 조건 (모두 같은 하이퍼파라미터·에폭 상한·데이터 — 원 24k/4k 결정, mixed negatives, λ (파일럿 선택), AdamW 감쇠 + 드롭아웃, DAgger 없음, 1 라운드; 조건별 튜닝 없음):
//   C0  real (Phase A-2 라운드 0 체크포인트를 그대로 평가 — 같은 학습이다)     C0-listwise  같은 마스크, 손실만 listwise (표에만)
//   C1  degree-shuffle × 시드 2     C3  erdos-renyi × 시드 2     C4  KC-ablated     C5  direct-ablated
//   D0  dense-matched — 마스크 없는 밀집 MLP u → H1 → H2 → H3 → 1, 파라미터 수를 C0 와 정확히 일치 (상한 참조)
//   C0-shuffled-init  (보조, null 아님) 마스크는 C0, 초기 W 만 간선 사이에서 순열 — 커넥톰 초기값이 학습 결과에 기여하는지의 대조군
// C2 weight-shuffle 은 없다: 가중치를 학습하면 C2 는 C0 와 위상적으로 동일한 마스크라 null 이 아니다 (docs/stage7-wiring-constraint.md §1).
// 평가: 테스트 1,204 결정 전체 후보 (τ · top-1 · 하위 50% 선택률) + 20 게임 × 1000 조각 가비지 포함 (게이트와 같은 조건: 조각 · 공격 · 테트리스 · 우물).
// 라운드 결과는 data/stage7/b-{name}.json + theta 로 체크포인트 (있으면 건너뜀). 산출: data/stage7-results.json.
// 옵션: --workers N --only C1s0,D0 --games N --lambda F --force --quick

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { HYPER, analyzeWeights } from '../src/stage7-train.js';
import { CONDITION_NAMES } from '../src/nullmodels.js';
import { ciOverlap } from '../src/evaluate.js';
import { buildDataset, calibrateState, ci, createDenseState, createSparseState, createTrainingPool, DEFAULT_WORKERS, evaluateTest, fmtMs, loadInputs, loadJson, loadTheta, maskFor, pct, playEval, playLine, ROOT, saveJson, saveModel, saveTheta, STAGE7_DIR, trainRound } from './stage7-lib.js';

const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? argv[i + 1] : def; };
const quick = argv.includes('--quick');
const lambdaChoice = existsSync(path.join(STAGE7_DIR, 'lambda-choice.json')) ? JSON.parse(readFileSync(path.join(STAGE7_DIR, 'lambda-choice.json'), 'utf8')) : null;
const CFG = {
  workers: Number(opt('workers', DEFAULT_WORKERS)), playGames: Number(opt('games', quick ? 2 : 20)), playCap: quick ? 40 : 1000,
  trainDecisions: quick ? 64 : HYPER.trainDecisions, valDecisions: quick ? 32 : HYPER.valDecisions,
  lambda: opt('lambda', null) !== null ? Number(opt('lambda')) : (lambdaChoice?.lambda ?? HYPER.lambda),
  negatives: HYPER.negatives, hardNegatives: HYPER.hardNegatives, weightDecay: HYPER.weightDecay, dropoutZ: HYPER.dropoutZ, dropoutH: HYPER.dropoutH,
  train: { maxEpochs: quick ? 1 : HYPER.maxEpochs, patience: HYPER.patience, lr: HYPER.lr, batch: HYPER.batch, clip: HYPER.clip, lrMin: HYPER.lrMin },
  only: opt('only', null)?.split(','), force: argv.includes('--force'), quick,
};
const RUNS = [
  { name: 'C0', condition: 'C0', seed: 0, loss: 'pairwise', checkpoint: 'a2-c0-round0' },
  { name: 'C0-listwise', condition: 'C0', seed: 0, loss: 'listwise' },
  { name: 'C1s0', condition: 'C1', seed: 0, loss: 'pairwise' }, { name: 'C1s1', condition: 'C1', seed: 1, loss: 'pairwise' },
  { name: 'C3s0', condition: 'C3', seed: 0, loss: 'pairwise' }, { name: 'C3s1', condition: 'C3', seed: 1, loss: 'pairwise' },
  { name: 'C4', condition: 'C4', seed: 0, loss: 'pairwise' }, { name: 'C5', condition: 'C5', seed: 0, loss: 'pairwise' },
  { name: 'D0', condition: 'D0', seed: 0, loss: 'pairwise' },
  { name: 'C0-shuffled-init', condition: 'C0', seed: 0, loss: 'pairwise', shuffleInit: true, supplement: true },
];
const OUT = path.join(ROOT, 'data', quick ? 'stage7-results-quick.json' : 'stage7-results.json');
const log = (s) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${s}`);

async function main() {
  const t0 = performance.now();
  const c0File = path.join(ROOT, 'data', 'stage7-c0.json');
  const phaseA = existsSync(c0File) ? JSON.parse(readFileSync(c0File, 'utf8')) : null;
  if (!quick && !CFG.force && !phaseA?.gate?.all) { console.error('Phase A-2 게이트를 통과한 data/stage7-c0.json 이 없다 — Phase B 는 게이트 통과 후에만 (--force 로 무시).'); process.exit(1); }
  const { connectome, teacher, data, garbage } = loadInputs();
  const ds = buildDataset(data, { trainDecisions: CFG.trainDecisions, valDecisions: CFG.valDecisions, negatives: CFG.negatives, hard: CFG.hardNegatives });
  log(`data: train ${ds.meta.trainDecisions} × K ${ds.K} [${ds.negatives}], val ${ds.meta.valDecisions} × K, test ${ds.meta.testDecisions} decisions (${ds.meta.testCandidates} candidates, full); hyper ${JSON.stringify(CFG.train)} λ ${CFG.lambda} wd ${CFG.weightDecay} dropout ${CFG.dropoutZ}/${CFG.dropoutH} for every condition; play with garbage ${garbage.rate}/piece; ${CFG.workers} workers`);
  const c0P = createSparseState(maskFor(connectome, 'C0'), HYPER).P;
  const runs = RUNS.filter((r) => !CFG.only || CFG.only.includes(r.name));
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
    const tp = await createTrainingPool(state, ds, { workers: CFG.workers, teacher });
    let train;
    if (run.checkpoint && !quick && loadTheta(run.checkpoint, state.theta)) {
      const ck = loadJson(`${run.checkpoint}.json`);
      train = { ...ck.train, source: `data/stage7/${run.checkpoint}.theta.f64 (Phase A-2 round 0)` };
      // 리드아웃 표준화 통계는 Phase A-2 와 같은 초기화·같은 표본에서 나오므로 동일 (calibrateState 가 결정적)
      log(`${run.name}: using Phase A-2 round-0 checkpoint (${train.epochs} epochs, best ${train.best.epoch}, val ${train.best.valLoss.toFixed(4)}, λ ${train.lambda})`);
    } else {
      train = await trainRound(tp, state, ds, { ...CFG.train, loss: run.loss, lambda: run.loss === 'pairwise' ? CFG.lambda : 0, weightDecay: CFG.weightDecay, seed: 1, log: (h) => { if (h.val !== undefined) log(`  epoch ${h.epoch}: train ${h.train.toFixed(4)} val ${h.val.toFixed(4)} lr ${h.lr.toExponential(2)} |g| ${h.gradNorm.toFixed(2)} clipped ${pct(h.clippedFrac)} (${fmtMs(h.ms)})`); } });
      delete train.adam;
      log(`${run.name}: trained ${train.epochs} epochs (best ${train.best.epoch}, val ${train.best.valLoss.toFixed(4)}), ${train.steps} steps  (${fmtMs(train.ms)})`);
      saveTheta(tag, state.theta);
    }
    const test = await evaluateTest(tp, ds.test);
    log(`${run.name}: test τ ${test.tau.toFixed(3)} ${ci(test.tauCI)}, top-1 ${pct(test.top1)} ${ci(test.top1CI, pct)}, bottom-half picks ${pct(test.bottomHalfRate)} (${test.candidatesPerDecision.toFixed(1)} candidates/decision, full)  (${fmtMs(test.ms)})`);
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
    if (!quick) saveModel(tag, state, { condition: run.condition, seed: run.seed, loss: run.loss, test: { tau: test.tau, top1: test.top1 }, play: { attackMedian: play.attackMedian, survival: play.survival } });
    results.push(rec);
  }

  // ---------- 표 · 비교 ----------
  const find = (n) => results.find((r) => r.name === n);
  const c0 = find('C0');
  const table = results.map((r) => ({ name: r.name, condition: r.conditionName, seed: r.seed, loss: r.loss, supplement: r.supplement, P: r.P, E: r.E, epochs: r.train.epochs, bestEpoch: r.train.best.epoch, valLoss: r.train.best.valLoss, tau: r.test.tau, tauCI: r.test.tauCI, top1: r.test.top1, top1CI: r.test.top1CI, bottomHalfRate: r.test.bottomHalfRate, bottomHalfRateCI: r.test.bottomHalfRateCI, piecesMedian: r.play.piecesMedian, piecesMedianCI: r.play.piecesMedianCI, attackMedian: r.play.attackMedian, attackMedianCI: r.play.attackMedianCI, tetrisMedian: r.play.tetrisMedian, tetrisMedianCI: r.play.tetrisMedianCI, survival: r.play.survival, linesPer1000: r.play.linesPer1000, wellRunMedian: r.play.wellRuns.lengthMedian, inhibitoryFrac: r.weights?.vsInit.inhibitoryFrac ?? null, corrInit: r.weights?.vsInit.corr ?? null }));
  console.log(`\n=== Phase B: test ${ds.meta.testDecisions} decisions (full candidates), play ${CFG.playGames} × ${CFG.playCap} with garbage; 95% CI ===`);
  console.log(`${'run'.padEnd(18)} ${'condition'.padEnd(16)} ${'loss'.padEnd(9)} ${'P'.padStart(8)} ${'ep'.padStart(3)} ${'τ'.padEnd(22)} ${'top-1'.padEnd(24)} ${'bottom-half'.padEnd(22)} ${'pieces median'.padEnd(18)} ${'attack median'.padEnd(16)} ${'tetris/game'.padEnd(14)} inh%`);
  for (const r of table) console.log(`${r.name.padEnd(18)} ${r.condition.padEnd(16)} ${r.loss.padEnd(9)} ${String(r.P).padStart(8)} ${String(r.epochs).padStart(3)} ${`${r.tau.toFixed(3)} ${ci(r.tauCI)}`.padEnd(22)} ${`${pct(r.top1)} ${ci(r.top1CI, pct)}`.padEnd(24)} ${`${pct(r.bottomHalfRate)} ${ci(r.bottomHalfRateCI, pct)}`.padEnd(22)} ${`${r.piecesMedian} ${ci(r.piecesMedianCI, (v) => v.toFixed(0))}`.padEnd(18)} ${`${r.attackMedian} ${ci(r.attackMedianCI, (v) => v.toFixed(0))}`.padEnd(16)} ${`${r.tetrisMedian} ${ci(r.tetrisMedianCI, (v) => v.toFixed(1))}`.padEnd(14)} ${r.inhibitoryFrac !== null ? pct(r.inhibitoryFrac) : '—'}`);
  const comparisons = {};
  if (c0) {
    const vs = (name) => { const r = find(name); if (!r) return null; return { name, dTop1: r.test.top1 - c0.test.top1, top1Separated: !ciOverlap(r.test.top1CI, c0.test.top1CI), dTau: r.test.tau - c0.test.tau, tauSeparated: !ciOverlap(r.test.tauCI, c0.test.tauCI), dPieces: r.play.piecesMedian - c0.play.piecesMedian, piecesSeparated: !ciOverlap(r.play.piecesMedianCI, c0.play.piecesMedianCI), dAttack: r.play.attackMedian - c0.play.attackMedian, attackSeparated: !ciOverlap(r.play.attackMedianCI, c0.play.attackMedianCI), dTetris: r.play.tetrisMedian - c0.play.tetrisMedian }; };
    for (const r of results) if (r.name !== 'C0') comparisons[r.name] = vs(r.name);
    const nulls = results.filter((r) => r.condition === 'C1' || r.condition === 'C3');
    comparisons.c0OutsideNulls = { top1: nulls.every((r) => !ciOverlap(r.test.top1CI, c0.test.top1CI)), tau: nulls.every((r) => !ciOverlap(r.test.tauCI, c0.test.tauCI)), pieces: nulls.every((r) => !ciOverlap(r.play.piecesMedianCI, c0.play.piecesMedianCI)), attack: nulls.every((r) => !ciOverlap(r.play.attackMedianCI, c0.play.attackMedianCI)), nullTop1Range: nulls.length ? [Math.min(...nulls.map((r) => r.test.top1)), Math.max(...nulls.map((r) => r.test.top1))] : null };
    console.log(`\nC0 vs nulls (C1, C3): top-1 ${pct(c0.test.top1)} vs null range ${comparisons.c0OutsideNulls.nullTop1Range ? comparisons.c0OutsideNulls.nullTop1Range.map(pct).join('–') : '—'} — ${comparisons.c0OutsideNulls.top1 ? 'C0 outside every null CI' : 'CI overlaps with at least one null (no difference)'}; τ ${comparisons.c0OutsideNulls.tau ? 'separated' : 'overlaps'}; pieces ${comparisons.c0OutsideNulls.pieces ? 'separated' : 'overlaps'}; attack ${comparisons.c0OutsideNulls.attack ? 'separated' : 'overlaps'}`);
    const d0 = find('D0');
    if (d0) console.log(`C0 vs D0 (dense, same P): Δtop-1 ${(comparisons.D0.dTop1 >= 0 ? '+' : '')}${pct(comparisons.D0.dTop1)} (${comparisons.D0.top1Separated ? 'CI separated' : 'CI overlap'}), Δτ ${comparisons.D0.dTau.toFixed(3)}, Δpieces ${comparisons.D0.dPieces} (${comparisons.D0.piecesSeparated ? 'CI separated' : 'CI overlap'}), Δattack ${comparisons.D0.dAttack}, Δtetris ${comparisons.D0.dTetris} — ${comparisons.D0.dTop1 < 0 ? '배선 제약은 손해' : '배선 제약은 손해가 아님'} (그대로 보고)`);
    for (const n of ['C1s0', 'C1s1']) if (find(n)) console.log(`${n} (degree-shuffle): top-1 ${pct(find(n).test.top1)} — 5단계에서는 동작 영역 없음(침묵); 학습으로 ${find(n).test.top1 > (phaseA?.untrained?.top1 ?? 0.25) + 0.03 ? '되살아남' : '학습 전 기준선 수준'}`);
  }
  const doc = { ranAt: new Date().toISOString(), phase: 'B (A-2 protocol)', elapsedMs: Math.round(performance.now() - t0), config: CFG, hyper: HYPER, data: { ...ds.meta, teacher: teacher.source, garbage }, phaseAGate: phaseA?.gate ?? null, untrainedTop1: phaseA?.untrained?.top1 ?? null, runs: results, table, comparisons, note: 'C2 weight-shuffle 은 가중치 학습 하에서 C0 와 같은 마스크라 null 이 아니다 (삭제). C0-shuffled-init 은 null 이 아니라 초기값 대조군. 플레이는 가비지 주입 포함 (게이트와 같은 조건).' };
  writeFileSync(OUT, JSON.stringify(doc, null, 1) + '\n');
  console.log(`\nwrote ${path.relative(ROOT, OUT)}  (total ${fmtMs(doc.elapsedMs)})`);
}

main().catch((err) => { console.error(err); process.exit(2); });
