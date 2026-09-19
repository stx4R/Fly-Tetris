#!/usr/bin/env node
// 7단계 예산 추정 (Phase A-3: μ 파일럿 3점 + C0 본 학습 24k + DAgger 2 × 4k + 게이트 평가; Phase B 는 참고 출력).
// 실제 모델(커넥톰 마스크 희소 RNN, T 25, K 8)로 단위 비용을 실측하고 — 결정 하나의 BPTT(순전파+역전파, 드롭아웃 활성), 후보 하나의 점수(순전파), 교사 라벨 —
// 워커 풀의 병렬 배율을 같은 grad 작업으로 실측한 뒤 계획의 축으로 곱한다.
// 실측 보정: 학습 스텝은 동기화 장벽·E-코어 편차·주 스레드 합산 때문에 (32 결정 × 단일 스레드 비용 / 병렬 배율) 보다 느리다. 그 배율(stepFactor)과
// 점수 배치(테스트·valFull regret·DAgger 수집)의 배율(evalFactor)을 가장 최근 본 학습 실측(data/stage7-c0-phaseA2.json 라운드 0/1, 없으면 phaseA)에서 다시 계산해 곱한다.
//
// 계획 (scripts/train-c0.js · scripts/stage7-pilot.js 와 같은 상수, src/stage7-train.js HYPER):
//   μ 파일럿  3 점 (μ ∈ {0, 1, 4}) × train 12,000 (예산 초과 시 8,000) × K 8 × ≤ 8 에폭, val 2,000 × K + valFull 2,000 × 전체 후보 (상대 regret, 에폭마다), 테스트 + 20 게임
//   라운드 0   train 24,000 결정 × K 8 × T 25, 미니배치 32, 에폭 기대 10 / 상한 15 (조기 종료: valFull 상대 regret), 검증 4,000 × K + valFull 2,000 × 전체 후보
//   라운드마다 테스트 1,204 결정 × 전체 후보 42.6 점수 + 빠른 평가 5 게임 × ≤ 1000 조각 (가비지) × 전체 후보
//   DAgger 2  정책 플레이 4,000 결정 (전체 후보 점수 + 교사 라벨) → 재학습 (warm start) 에폭 기대 3 / 상한 5, 데이터 24k → 28k → 31k
//   최종      20 게임 × 1000 조각 (가비지) 전체 후보
// 규칙: 기대치(파일럿 12k 포함) 가 --budget-hours (기본 8) 를 넘으면 파일럿을 8k 로 줄인다 (사용자 지시). 결과 → data/stage7/budget-choice.json (+ .cmd: set PILOT_TRAIN=…).
//
// --teacher 1ply-hold-garbage (Phase A-4′): 파일럿 없음. CEM (실측 elapsed, 이미 끝남) + 재수집 40k (1-ply 교사 라벨 실측 × 결정 수) + 라운드 0 24k + DAgger R × 4k + 최종.
//   후보 수/결정 은 그 변형의 데이터에서 실측 (1ply-hold ≈ 40). 규칙: 기대치 > 예산 → DAgger 2 → 1 (사용자 지시; A-3 라운드별 regret 개선이 미미했다).
//   결과 → data/stage7-budget-a4.json, data/stage7/budget-choice-a4.json { daggerRounds } (train-c0 --teacher … 가 읽는다). 보정 배율은 phaseA3 (evalMs 를 뺀 에폭) → A2 → A 순으로 실측에서.
// 옵션: --workers N --budget-hours H --bench-decisions N --teacher KEY

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { buildDataset, calibrateState, createSparseState, createTrainingPool, DEFAULT_WORKERS, fmtMs, loadInputs, maskFor, ROOT, STAGE7_DIR, variantOf } from './stage7-lib.js';
import { HYPER, PHASE_B } from '../src/stage7-train.js';
import { teacherFor } from '../src/teacher-attack.js';
import { decisionLoss } from '../src/rank-train.js';

const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? Number(argv[i + 1]) : def; };
const variant = variantOf(argv);
const a4 = variant !== 'beam';
const PLAN = {
  workers: opt('workers', DEFAULT_WORKERS), budgetHours: opt('budget-hours', 8), teacherVariant: variant,
  train: HYPER.trainDecisions, val: HYPER.valDecisions, valFull: HYPER.valFullDecisions, test: 1204, testCands: 42.6, K: HYPER.K, T: HYPER.T, batch: HYPER.batch,
  epochs0: { expected: 10, worst: HYPER.maxEpochs }, rounds: HYPER.daggerRounds, daggerDecisions: HYPER.daggerDecisions, epochsFt: { expected: 3, worst: HYPER.ftMaxEpochs },
  quickGames: HYPER.quickGames, playGames: 20, playCap: 1000, playDecisions: { expected: 500, worst: 1000 }, playCands: 45,
  pilots: { runs: 3, mus: [0, 1, 4], train: 12000, reducedTrain: 8000, val: 2000, epochs: 8 },
  phaseB: ['C0 (12k)', 'C1 s0', 'C3 s0', 'D0', 'C0 listwise', 'C4', 'C5'], phaseBTrain: PHASE_B.trainDecisions, // 축소: 시드 1, 12k, 우선순위 순 (train-nulls 가 실측 에폭 시간으로 다시 자른다)
};
const hours = (ms) => ms / 3.6e6;

async function main() {
  const t0 = performance.now();
  const { connectome, teacher, data, dataFile } = loadInputs({ variant });
  if (a4) {
    // 후보 수/결정 은 변형의 데이터에서 (hold 포함 1-ply ≈ 40; 빔 데이터 42.6)
    const cands = data.decisions.reduce((s, d) => s + d.candidates.length, 0) / data.decisions.length;
    PLAN.testCands = Number(cands.toFixed(1)); PLAN.playCands = Math.round(cands * 45 / 42.6);
    PLAN.test = Math.round(data.games.reduce((acc, g) => (acc.n < 8000 ? { n: acc.n + g.decisions.length, t: acc.t + (data.split.test.includes(g.id) ? g.decisions.length : 0) } : acc), { n: 0, t: 0 }).t) || PLAN.test;
    console.log(`Phase A-4′ plan: teacher ${variant} (${teacher.source}), data ${dataFile}: ${data.decisions.length} decisions, ${cands.toFixed(1)} candidates/decision → test ${PLAN.test} decisions`);
  }
  const mask = maskFor(connectome, 'C0');
  const state = createSparseState(mask, HYPER);
  const benchDecisions = opt('bench-decisions', 48);
  const ds = buildDataset(data, { trainDecisions: Math.max(96, benchDecisions), valDecisions: 16 });
  calibrateState(state, ds, 128);
  console.log(`plan: N ${mask.N}, E ${mask.E} (connectome mask, weights free), P ${state.P}, T ${PLAN.T}, K ${PLAN.K} (${HYPER.negatives}), batch ${PLAN.batch}, λ ${HYPER.lambda} μ ∈ {${PLAN.pilots.mus.join(', ')}} select ${HYPER.selectBy}, wd ${HYPER.weightDecay}, dropout ${HYPER.dropoutZ}/${HYPER.dropoutH}; ${PLAN.workers} workers; budget ${PLAN.budgetHours} h`);

  // ---------- 단위 비용 (단일 스레드, 주 스레드 모델) ----------
  const { model } = state;
  const U = ds.pool.U;
  const gradBuf = new Float64Array(state.P);
  const dec = ds.train.slice(0, 6);
  for (const d of dec.slice(0, 2)) { const f = model.forward(U, Array.from(d.rows), { train: true }); model.backward(f.cache, decisionLoss('pairwise', f.s, { chosen: 0 }).ds, gradBuf); }
  let t = performance.now();
  for (const d of dec) { const f = model.forward(U, Array.from(d.rows), { train: true }); model.backward(f.cache, decisionLoss('pairwise', f.s, { chosen: 0 }).ds, gradBuf); }
  const gradMs = (performance.now() - t) / dec.length;
  const testItem = ds.test.find((d) => d.rows.length >= 40) ?? ds.test[0];
  const cands = Array.from(testItem.rows);
  model.score(U, cands);
  t = performance.now();
  for (let r = 0; r < 3; r++) model.score(U, cands);
  const scoreMs = (performance.now() - t) / 3 / cands.length;
  const tch = teacherFor(teacher.params, teacher);
  const states = data.decisions.slice(200, 210).map((d) => d.player);
  tch.scoreCandidates(states[0]);
  t = performance.now();
  for (const p of states) tch.scoreCandidates(p);
  const teacherMs = (performance.now() - t) / states.length;
  console.log(`\n[unit] single thread: BPTT per training decision (K ${PLAN.K} × T ${PLAN.T}) ${gradMs.toFixed(0)} ms (${(gradMs / PLAN.K / PLAN.T).toFixed(3)} ms per candidate-step); score per candidate ${scoreMs.toFixed(2)} ms; teacher label ${teacherMs.toFixed(0)} ms per decision`);

  // ---------- 병렬 배율 실측 + 오버헤드 보정 (최근 본 학습 실측) ----------
  const tp = await createTrainingPool(state, ds, { workers: PLAN.workers, teacher });
  const jobs = (step) => ds.train.slice(0, benchDecisions).map((d) => ({ type: 'grad', step, loss: 'pairwise', scale: 1, decisions: [{ rows: d.rows, chosen: d.chosen }] }));
  await tp.pool.run(jobs(0));
  t = performance.now();
  await tp.pool.run(jobs(1));
  const wall = performance.now() - t;
  const speedup = (benchDecisions * gradMs) / wall;
  await tp.close();
  const S2 = speedup; // 평가·플레이 (긴 독립 작업, 장벽 영향 작음)
  const modelEpochMs = (train, val) => train * gradMs / speedup + val * PLAN.K * scoreMs / S2;
  const modelScoreBatchMs = (decisions, candsPer) => (decisions * candsPer * scoreMs) / S2;
  const modelDaggerMs = (decisions) => (decisions * (PLAN.playCands * scoreMs + teacherMs)) / S2;
  let stepFactor = 2.3, evalFactor = 2.0, daggerFactor = 2.0, calSource = '가정 (Phase A 실측 배율)';
  for (const [file, label] of [['stage7-c0-phaseA3.json', 'Phase A-3'], ['stage7-c0-phaseA2.json', 'Phase A-2'], ['stage7-c0-phaseA.json', 'Phase A']]) {
    const p = path.join(ROOT, 'data', file);
    if (!existsSync(p)) continue;
    const doc = JSON.parse(readFileSync(p, 'utf8'));
    const r0 = doc.rounds?.[0];
    if (!r0?.train?.history?.length) continue;
    // A-3 부터 에폭 시간에 에폭 끝 평가 (val 손실 + valFull regret, evalMs) 가 들어 있다 — 학습 스텝 배율은 그것을 뺀 시간으로
    const epochMsMeasured = r0.train.history.reduce((s, h) => s + h.ms - (h.evalMs ?? 0), 0) / r0.train.history.length;
    stepFactor = epochMsMeasured / modelEpochMs(r0.trainDecisions, r0.valDecisions);
    const notes = [`에폭 ${fmtMs(epochMsMeasured)}${r0.train.history[0].evalMs ? ' (평가 제외)' : ''} @ ${r0.trainDecisions} → ×${stepFactor.toFixed(2)}`];
    if (r0.test?.ms) { evalFactor = r0.test.ms / modelScoreBatchMs(PLAN.test, PLAN.testCands); notes.push(`테스트 ${fmtMs(r0.test.ms)} → ×${evalFactor.toFixed(2)}`); }
    const r1 = doc.rounds?.find((r) => r.dagger?.ms);
    if (r1) { daggerFactor = r1.dagger.ms / modelDaggerMs(PLAN.daggerDecisions); notes.push(`DAgger 수집 ${fmtMs(r1.dagger.ms)} → ×${daggerFactor.toFixed(2)}`); }
    calSource = `실측 (${label} 라운드 0/1: ${notes.join('; ')})`;
    break;
  }
  console.log(`[unit] ${PLAN.workers} workers: ×${speedup.toFixed(1)} parallel speedup on ${benchDecisions} decisions; overhead factors step ×${stepFactor.toFixed(2)}, score batch ×${evalFactor.toFixed(2)}, DAgger ×${daggerFactor.toFixed(2)} — ${calSource}`);

  // ---------- 합산 ----------
  const valFullMs = modelScoreBatchMs(PLAN.valFull, PLAN.testCands) * evalFactor;            // 에폭마다 valFull 상대 regret (A-3 신규)
  const epochMs = (train, val = PLAN.val) => modelEpochMs(train, val) * stepFactor + valFullMs;
  const testMs = modelScoreBatchMs(PLAN.test, PLAN.testCands) * evalFactor;
  const playMs = (games, decPerGame) => Math.ceil(games / PLAN.workers) * decPerGame * PLAN.playCands * scoreMs; // 게임은 워커당 하나씩 순차
  const daggerMs = modelDaggerMs(PLAN.daggerDecisions) * daggerFactor;
  const mainA3 = (which) => {
    const e0 = PLAN.epochs0[which], ef = PLAN.epochsFt[which], pd = PLAN.playDecisions[which], R = PLAN.rounds;
    const parts = { round0: e0 * epochMs(PLAN.train), perRoundEvals: (R + 1) * (testMs + playMs(PLAN.quickGames, pd)), dagger: R * daggerMs, finetune: 0, final: playMs(PLAN.playGames, pd) };
    for (let r = 1; r <= R; r++) parts.finetune += ef * epochMs(PLAN.train + r * PLAN.daggerDecisions * 0.9);
    return { ...parts, total: parts.round0 + parts.perRoundEvals + parts.dagger + parts.finetune + parts.final };
  };
  const pilotsMs = (train, which) => PLAN.pilots.runs * (PLAN.pilots.epochs * epochMs(train, PLAN.pilots.val) + testMs + playMs(PLAN.playGames, PLAN.playDecisions[which]));
  if (a4) return planA4({ t0, epochMs, testMs, playMs, daggerMs, valFullMs, mainA3, gradMs, scoreMs, teacherMs, speedup, stepFactor, evalFactor, daggerFactor, calSource, teacher });
  const A = { expected: mainA3('expected'), worst: mainA3('worst') };
  console.log(`\n[estimate] epoch on ${PLAN.train} decisions ${fmtMs(epochMs(PLAN.train))} (of which valFull regret ${fmtMs(valFullMs)}); on ${PLAN.pilots.train} ${fmtMs(epochMs(PLAN.pilots.train, PLAN.pilots.val))}; on ${PLAN.pilots.reducedTrain} ${fmtMs(epochMs(PLAN.pilots.reducedTrain, PLAN.pilots.val))}; test eval ${fmtMs(testMs)}; quick eval ${PLAN.quickGames} games ${fmtMs(playMs(PLAN.quickGames, PLAN.playDecisions.expected))}–${fmtMs(playMs(PLAN.quickGames, PLAN.playDecisions.worst))}; final ${PLAN.playGames} games ${fmtMs(playMs(PLAN.playGames, PLAN.playDecisions.expected))}–${fmtMs(playMs(PLAN.playGames, PLAN.playDecisions.worst))}; DAgger collection ${fmtMs(daggerMs)}`);
  console.log(`[estimate] C0 main (A-3) expected ${fmtMs(A.expected.total)} = round 0 ${fmtMs(A.expected.round0)} (${PLAN.epochs0.expected} epochs) + evals ${fmtMs(A.expected.perRoundEvals)} + DAgger ×${PLAN.rounds} ${fmtMs(A.expected.dagger)} + fine-tune ${fmtMs(A.expected.finetune)} (${PLAN.epochsFt.expected} epochs/round) + final ${fmtMs(A.expected.final)}`);
  console.log(`[estimate] C0 main (A-3) worst    ${fmtMs(A.worst.total)} = round 0 ${fmtMs(A.worst.round0)} (${PLAN.epochs0.worst} epochs) + evals ${fmtMs(A.worst.perRoundEvals)} + DAgger ×${PLAN.rounds} ${fmtMs(A.worst.dagger)} + fine-tune ${fmtMs(A.worst.finetune)} (${PLAN.epochsFt.worst} epochs/round) + final ${fmtMs(A.worst.final)}`);
  const pil = { full: { expected: pilotsMs(PLAN.pilots.train, 'expected'), worst: pilotsMs(PLAN.pilots.train, 'worst') }, reduced: { expected: pilotsMs(PLAN.pilots.reducedTrain, 'expected'), worst: pilotsMs(PLAN.pilots.reducedTrain, 'worst') } };
  console.log(`[estimate] μ pilots ${PLAN.pilots.runs} × ${PLAN.pilots.train} decisions × ≤ ${PLAN.pilots.epochs} epochs + eval ≈ ${fmtMs(pil.full.expected)} (worst ${fmtMs(pil.full.worst)}); at ${PLAN.pilots.reducedTrain} ≈ ${fmtMs(pil.reduced.expected)} (worst ${fmtMs(pil.reduced.worst)})`);

  // ---------- 규칙: 파일럿 12k 포함 기대치 > 예산 → 파일럿 8k ----------
  let pilotTrain = PLAN.pilots.train, reducedFrom = null;
  let totalExpected = pil.full.expected + A.expected.total, totalWorst = pil.full.worst + A.worst.total;
  console.log(`[estimate] Phase A-3 total (pilots ${PLAN.pilots.train} + main) expected ${fmtMs(totalExpected)}, worst ${fmtMs(totalWorst)}`);
  if (hours(totalExpected) > PLAN.budgetHours) {
    reducedFrom = pilotTrain; pilotTrain = PLAN.pilots.reducedTrain;
    totalExpected = pil.reduced.expected + A.expected.total; totalWorst = pil.reduced.worst + A.worst.total;
    console.log(`[estimate] expected > ${PLAN.budgetHours} h → μ pilots reduced to ${pilotTrain} decisions: total expected ${fmtMs(totalExpected)}, worst ${fmtMs(totalWorst)}`);
  }
  const overBudget = hours(totalExpected) > PLAN.budgetHours;
  const perRun = (which) => PLAN.epochs0[which] * epochMs(PLAN.phaseBTrain) + testMs + playMs(PLAN.playGames, PLAN.playDecisions[which]);
  const B = { expected: (PLAN.phaseB.length - 0.85) * perRun('expected'), worst: (PLAN.phaseB.length - 0.85) * perRun('worst') }; // D0 는 ~0.15 배
  console.log(`[estimate] Phase B (${PLAN.phaseB.length} runs: ${PLAN.phaseB.join(', ')}; ${PLAN.phaseBTrain} decisions each, null seeds ${PHASE_B.nullSeeds}, 1 round) expected ${fmtMs(B.expected)}, worst ${fmtMs(B.worst)} — train-nulls 가 8 h 예산에 맞춰 뒤에서부터 뺀다 (별도 예산)`);

  const doc = { estimatedAt: new Date().toISOString(), phase: 'A-3', plan: PLAN, unit: { gradMs, scoreMs, teacherMs, speedup, stepFactor, evalFactor, daggerFactor, workers: PLAN.workers, perCandidateStepMs: gradMs / PLAN.K / PLAN.T, epochMs24k: epochMs(PLAN.train), epochMs12k: epochMs(12000, PLAN.pilots.val), epochMs8k: epochMs(8000, PLAN.pilots.val), valFullMs, testMs, daggerMs }, main: A, pilots: pil, choice: { pilotTrain, reducedFrom, totalExpectedMs: totalExpected, totalWorstMs: totalWorst, overBudget }, phaseB: B, elapsedMs: Math.round(performance.now() - t0) };
  writeFileSync(path.join(ROOT, 'data', 'stage7-budget.json'), JSON.stringify(doc, null, 1) + '\n');
  const choice = { chosenAt: doc.estimatedAt, pilotTrain, pilotRuns: PLAN.pilots.runs, mus: PLAN.pilots.mus, pilotEpochs: PLAN.pilots.epochs, reducedFrom, budgetHours: PLAN.budgetHours, totalExpectedMs: Math.round(totalExpected), totalWorstMs: Math.round(totalWorst), overBudget, rule: `expected(pilots ${PLAN.pilots.train} + main) > ${PLAN.budgetHours} h → pilots ${PLAN.pilots.reducedTrain}` };
  writeFileSync(path.join(STAGE7_DIR, 'budget-choice.json'), JSON.stringify(choice, null, 1) + '\n');
  writeFileSync(path.join(STAGE7_DIR, 'budget-choice.cmd'), `set PILOT_TRAIN=${pilotTrain}\r\nset PILOT_EPOCHS=${PLAN.pilots.epochs}\r\n`);
  console.log(`wrote data/stage7-budget.json, data/stage7/budget-choice.json (+ .cmd: PILOT_TRAIN=${pilotTrain}) (${fmtMs(doc.elapsedMs)})`);

  if (overBudget) {
    console.error(`\nWARNING: Phase A-3 expected ${fmtMs(totalExpected)} still > ${PLAN.budgetHours} h after reducing pilots to ${pilotTrain} — 규칙상 더 줄일 축은 없다 (DAgger 라운드·본 학습 24k 는 고정). 진행하되 보고에 명시.`);
    process.exit(0);
  }
  console.log(`\nwithin budget (Phase A-3 expected ${fmtMs(totalExpected)} ≤ ${PLAN.budgetHours} h; worst ${fmtMs(totalWorst)}; pilots ${pilotTrain}${reducedFrom ? ` (reduced from ${reducedFrom})` : ''})`);
}

// ---------- Phase A-4′: 파일럿 없음, CEM(실측) + 재수집 + 본 학습; 규칙 = 기대치 > 예산 → DAgger 2 → 1 ----------
function planA4({ t0, epochMs, testMs, playMs, daggerMs, valFullMs, mainA3, gradMs, scoreMs, teacherMs, speedup, stepFactor, evalFactor, daggerFactor, calSource, teacher }) {
  const teacherFile = path.join(ROOT, 'data', `teacher-attack-${variant}.json`);
  const cemMs = existsSync(teacherFile) ? JSON.parse(readFileSync(teacherFile, 'utf8')).elapsedMs : 0;
  const collectDecisions = 40000;
  const collectMs = collectDecisions * teacherMs / speedup * daggerFactor; // scored 1-ply 라벨 × 결정 (수집은 교사만 — 모델 점수 없음)
  const withRounds = (R) => {
    const saved = PLAN.rounds; PLAN.rounds = R;
    const A = { expected: mainA3('expected'), worst: mainA3('worst') };
    PLAN.rounds = saved;
    return { rounds: R, expected: cemMs + collectMs + A.expected.total, worst: cemMs + collectMs + A.worst.total, main: A };
  };
  console.log(`\n[estimate] A-4′: CEM (measured) ${fmtMs(cemMs)}; recollection ${collectDecisions} decisions ≈ ${fmtMs(collectMs)} (teacher label ${teacherMs.toFixed(2)} ms, ×${daggerFactor.toFixed(2)}); epoch on ${PLAN.train} ${fmtMs(epochMs(PLAN.train))} (valFull ${fmtMs(valFullMs)}); test ${fmtMs(testMs)}; DAgger collection ${fmtMs(daggerMs)}`);
  let choice = withRounds(HYPER.daggerRounds), reducedFrom = null;
  console.log(`[estimate] DAgger ${choice.rounds} rounds: expected ${fmtMs(choice.expected)} (round 0 ${fmtMs(choice.main.expected.round0)} + evals ${fmtMs(choice.main.expected.perRoundEvals)} + DAgger ${fmtMs(choice.main.expected.dagger)} + fine-tune ${fmtMs(choice.main.expected.finetune)} + final ${fmtMs(choice.main.expected.final)}), worst ${fmtMs(choice.worst)}`);
  if (hours(choice.expected) > PLAN.budgetHours) {
    reducedFrom = choice.rounds; choice = withRounds(1);
    console.log(`[estimate] expected > ${PLAN.budgetHours} h → DAgger reduced to 1 round: expected ${fmtMs(choice.expected)}, worst ${fmtMs(choice.worst)}`);
  }
  const overBudget = hours(choice.expected) > PLAN.budgetHours;
  const doc = { estimatedAt: new Date().toISOString(), phase: 'A-4′', teacherVariant: variant, teacher: teacher.source, plan: { ...PLAN, rounds: choice.rounds }, unit: { gradMs, scoreMs, teacherMs, speedup, stepFactor, evalFactor, daggerFactor, calSource, workers: PLAN.workers, epochMs24k: epochMs(PLAN.train), valFullMs, testMs, daggerMs, cemMs, collectMs }, choice: { daggerRounds: choice.rounds, reducedFrom, totalExpectedMs: Math.round(choice.expected), totalWorstMs: Math.round(choice.worst), overBudget, main: choice.main }, elapsedMs: Math.round(performance.now() - t0) };
  writeFileSync(path.join(ROOT, 'data', 'stage7-budget-a4.json'), JSON.stringify(doc, null, 1) + '\n');
  writeFileSync(path.join(STAGE7_DIR, 'budget-choice-a4.json'), JSON.stringify({ chosenAt: doc.estimatedAt, phase: 'A-4′', teacherVariant: variant, daggerRounds: choice.rounds, reducedFrom, budgetHours: PLAN.budgetHours, totalExpectedMs: Math.round(choice.expected), totalWorstMs: Math.round(choice.worst), overBudget, rule: `expected(CEM + recollection + main with DAgger ${HYPER.daggerRounds}) > ${PLAN.budgetHours} h → DAgger 1` }, null, 1) + '\n');
  console.log(`wrote data/stage7-budget-a4.json, data/stage7/budget-choice-a4.json (daggerRounds ${choice.rounds}${reducedFrom ? `, reduced from ${reducedFrom}` : ''}) (${fmtMs(doc.elapsedMs)})`);
  if (overBudget) { console.error(`\nWARNING: A-4′ expected ${fmtMs(choice.expected)} still > ${PLAN.budgetHours} h with DAgger 1 — 규칙상 더 줄일 축은 없다. 진행하되 보고에 명시.`); return; }
  console.log(`\nwithin budget (A-4′ expected ${fmtMs(choice.expected)} ≤ ${PLAN.budgetHours} h; worst ${fmtMs(choice.worst)}; DAgger ${choice.rounds} rounds)`);
}

main().catch((err) => { console.error(err); process.exit(2); });
