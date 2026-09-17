#!/usr/bin/env node
// 7단계 예산 추정 (Phase A-2: C0 학습 24k + DAgger ≤ 5 × 4k + 게이트 평가; λ 파일럿과 Phase B 는 참고 출력).
// 실제 모델(커넥톰 마스크 희소 RNN, T 25, K 8)로 단위 비용을 실측하고 — 결정 하나의 BPTT(순전파+역전파, 드롭아웃 활성), 후보 하나의 점수(순전파), 교사 라벨 —
// 워커 풀의 병렬 배율을 같은 grad 작업으로 실측한 뒤 계획의 축으로 곱한다. 기대치가 --budget-hours (기본 8) 를 넘으면 줄일 축을 제안하고 exit 1.
// 실측 보정: Phase A 에서 스텝당 실제 벽시계는 (32 결정 × 단일 스레드 비용 / 병렬 배율) 의 약 2.3 배였다 (동기화 장벽 + E-코어 편차 + 주 스레드 합산).
// 그 배율을 data/stage7-c0-phaseA.json 의 라운드 0 실측에서 다시 계산해 곱한다 (없으면 2.3 가정).
//
// 계획 (scripts/train-c0.js 와 같은 상수, src/stage7-train.js HYPER):
//   라운드 0   train 24,000 결정 × K 8 × T 25, 미니배치 32, 에폭 기대 10 / 상한 15 (조기 종료), 검증 4,000 결정 × K 8 (순전파)
//   라운드마다 테스트 1,204 결정 × 전체 후보 42.6 점수 + 빠른 평가 5 게임 × ≤ 1000 조각 (가비지) × 전체 후보
//   DAgger ≤ 5 정책 플레이 4,000 결정 (전체 후보 점수 + 교사 라벨) → 재학습 (warm start) 에폭 기대 3 / 상한 5, 데이터 24k → 28k → … → 44k; 조기 중단 기대 3 라운드
//   최종      20 게임 × 1000 조각 (가비지) 전체 후보
// 옵션: --workers N --budget-hours H --bench-decisions N

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { buildDataset, calibrateState, createSparseState, createTrainingPool, DEFAULT_WORKERS, fmtMs, loadInputs, maskFor, ROOT } from './stage7-lib.js';
import { HYPER } from '../src/stage7-train.js';
import { createTeacher } from '../src/teacher-attack.js';
import { decisionLoss } from '../src/rank-train.js';

const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? Number(argv[i + 1]) : def; };
const PLAN = {
  workers: opt('workers', DEFAULT_WORKERS), budgetHours: opt('budget-hours', 8),
  train: HYPER.trainDecisions, val: HYPER.valDecisions, test: 1204, testCands: 42.6, K: HYPER.K, T: HYPER.T, batch: HYPER.batch,
  epochs0: { expected: 10, worst: HYPER.maxEpochs }, rounds: { expected: 3, worst: HYPER.daggerRounds }, daggerDecisions: HYPER.daggerDecisions, epochsFt: { expected: 3, worst: HYPER.ftMaxEpochs },
  quickGames: HYPER.quickGames, playGames: 20, playCap: 1000, playDecisions: { expected: 500, worst: 1000 }, playCands: 45,
  pilots: { runs: 4, train: 8000, val: 2000, epochs: 8 },
  phaseB: ['C0 listwise', 'C1 s0', 'C1 s1', 'C3 s0', 'C3 s1', 'C4', 'C5', 'D0', 'C0 shuffled-init'],
};
const hours = (ms) => ms / 3.6e6;

async function main() {
  const t0 = performance.now();
  const dataFile = path.join(ROOT, 'data', 'versus-decisions.json.gz');
  if (!existsSync(dataFile)) { console.error('data/versus-decisions.json.gz 없음 — npm run collect-versus 먼저'); process.exit(2); }
  const { connectome, teacher, data } = loadInputs();
  const mask = maskFor(connectome, 'C0');
  const state = createSparseState(mask, HYPER);
  const benchDecisions = opt('bench-decisions', 48);
  const ds = buildDataset(data, { trainDecisions: Math.max(96, benchDecisions), valDecisions: 16 });
  calibrateState(state, ds, 128);
  console.log(`plan: N ${mask.N}, E ${mask.E} (connectome mask, weights free), P ${state.P}, T ${PLAN.T}, K ${PLAN.K} (${HYPER.negatives}), batch ${PLAN.batch}, wd ${HYPER.weightDecay}, dropout ${HYPER.dropoutZ}/${HYPER.dropoutH}; ${PLAN.workers} workers; budget ${PLAN.budgetHours} h`);

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
  const tch = createTeacher(teacher.params, { depth: teacher.depth, width: teacher.width });
  const states = data.decisions.slice(200, 210).map((d) => d.player);
  tch.scoreCandidates(states[0]);
  t = performance.now();
  for (const p of states) tch.scoreCandidates(p);
  const teacherMs = (performance.now() - t) / states.length;
  console.log(`\n[unit] single thread: BPTT per training decision (K ${PLAN.K} × T ${PLAN.T}) ${gradMs.toFixed(0)} ms (${(gradMs / PLAN.K / PLAN.T).toFixed(3)} ms per candidate-step); score per candidate ${scoreMs.toFixed(2)} ms; teacher label ${teacherMs.toFixed(0)} ms per decision`);

  // ---------- 병렬 배율 실측 + 스텝 오버헤드 보정 ----------
  const tp = await createTrainingPool(state, ds, { workers: PLAN.workers, teacher });
  const jobs = (step) => ds.train.slice(0, benchDecisions).map((d) => ({ type: 'grad', step, loss: 'pairwise', scale: 1, decisions: [{ rows: d.rows, chosen: d.chosen }] }));
  await tp.pool.run(jobs(0));
  t = performance.now();
  await tp.pool.run(jobs(1));
  const wall = performance.now() - t;
  const speedup = (benchDecisions * gradMs) / wall;
  await tp.close();
  let stepFactor = 2.3, stepSource = '가정 (Phase A 실측 배율)';
  const phaseA = path.join(ROOT, 'data', 'stage7-c0-phaseA.json');
  if (existsSync(phaseA)) {
    const r0 = JSON.parse(readFileSync(phaseA, 'utf8')).rounds?.[0];
    if (r0?.train?.history?.length) {
      const epochMsMeasured = r0.train.history.reduce((s, h) => s + h.ms, 0) / r0.train.history.length;
      const ideal = (r0.trainDecisions * gradMs + r0.valDecisions * PLAN.K * scoreMs) / speedup;
      stepFactor = epochMsMeasured / ideal; stepSource = `실측 (Phase A 라운드 0: 에폭 ${fmtMs(epochMsMeasured)} vs 이상 ${fmtMs(ideal)})`;
    }
  }
  console.log(`[unit] ${PLAN.workers} workers: ×${speedup.toFixed(1)} parallel speedup on ${benchDecisions} decisions; per-step overhead factor ×${stepFactor.toFixed(2)} — ${stepSource}`);

  // ---------- 합산 ----------
  const S = speedup / stepFactor; // 학습 스텝의 실효 배율 (동기화 포함)
  const S2 = speedup;             // 평가·플레이 (긴 독립 작업, 장벽 영향 작음)
  const epochMs = (train) => train * gradMs / S + PLAN.val * PLAN.K * scoreMs / S2;
  const testMs = (PLAN.test * PLAN.testCands * scoreMs) / S2;
  const playMs = (games, decPerGame) => Math.ceil(games / PLAN.workers) * decPerGame * PLAN.playCands * scoreMs; // 게임은 워커당 하나씩 순차
  const daggerMs = (PLAN.daggerDecisions * (PLAN.playCands * scoreMs + teacherMs)) / S2;
  const phaseA2 = (which) => {
    const e0 = PLAN.epochs0[which], ef = PLAN.epochsFt[which], pd = PLAN.playDecisions[which], R = PLAN.rounds[which];
    const parts = { round0: e0 * epochMs(PLAN.train), perRoundEvals: (R + 1) * (testMs + playMs(PLAN.quickGames, pd)), dagger: R * daggerMs, finetune: 0, final: playMs(PLAN.playGames, pd) };
    for (let r = 1; r <= R; r++) parts.finetune += ef * epochMs(PLAN.train + r * PLAN.daggerDecisions * 0.9);
    return { ...parts, total: parts.round0 + parts.perRoundEvals + parts.dagger + parts.finetune + parts.final };
  };
  const A = { expected: phaseA2('expected'), worst: phaseA2('worst') };
  console.log(`\n[estimate] epoch on ${PLAN.train} decisions ${fmtMs(epochMs(PLAN.train))}; test eval ${fmtMs(testMs)}; quick eval ${PLAN.quickGames} games ${fmtMs(playMs(PLAN.quickGames, PLAN.playDecisions.expected))}–${fmtMs(playMs(PLAN.quickGames, PLAN.playDecisions.worst))}; final ${PLAN.playGames} games ${fmtMs(playMs(PLAN.playGames, PLAN.playDecisions.expected))}–${fmtMs(playMs(PLAN.playGames, PLAN.playDecisions.worst))}; DAgger collection ${fmtMs(daggerMs)}`);
  console.log(`[estimate] Phase A-2 expected ${fmtMs(A.expected.total)} = round 0 ${fmtMs(A.expected.round0)} (${PLAN.epochs0.expected} epochs) + evals ${fmtMs(A.expected.perRoundEvals)} + DAgger ×${PLAN.rounds.expected} ${fmtMs(A.expected.dagger)} + fine-tune ${fmtMs(A.expected.finetune)} (${PLAN.epochsFt.expected} epochs/round) + final ${fmtMs(A.expected.final)}`);
  console.log(`[estimate] Phase A-2 worst    ${fmtMs(A.worst.total)} = round 0 ${fmtMs(A.worst.round0)} (${PLAN.epochs0.worst} epochs) + evals ${fmtMs(A.worst.perRoundEvals)} + DAgger ×${PLAN.rounds.worst} ${fmtMs(A.worst.dagger)} + fine-tune ${fmtMs(A.worst.finetune)} (${PLAN.epochsFt.worst} epochs/round) + final ${fmtMs(A.worst.final)}`);
  const pilotMs = PLAN.pilots.runs * (PLAN.pilots.epochs * (PLAN.pilots.train * gradMs / S + PLAN.pilots.val * PLAN.K * scoreMs / S2) + testMs + playMs(PLAN.playGames, PLAN.playDecisions.expected));
  console.log(`[estimate] λ pilots (${PLAN.pilots.runs} runs × ${PLAN.pilots.train} decisions × ≤ ${PLAN.pilots.epochs} epochs + eval) ≈ ${fmtMs(pilotMs)} — 참고 (본 학습 전)`);
  const perRun = (which) => PLAN.epochs0[which] * epochMs(PLAN.train) + testMs + playMs(PLAN.playGames, PLAN.playDecisions[which]);
  const B = { expected: PLAN.phaseB.length * perRun('expected'), worst: PLAN.phaseB.length * perRun('worst') };
  console.log(`[estimate] Phase B (${PLAN.phaseB.length} runs, 24k each, 1 round; D0/C4 cheaper) expected ${fmtMs(B.expected)}, worst ${fmtMs(B.worst)} — 참고 (조건별 체크포인트로 나눠 돌릴 수 있다)`);

  const doc = { estimatedAt: new Date().toISOString(), plan: PLAN, unit: { gradMs, scoreMs, teacherMs, speedup, stepFactor, workers: PLAN.workers, perCandidateStepMs: gradMs / PLAN.K / PLAN.T }, phaseA2: A, pilotsMs: pilotMs, phaseB: B, elapsedMs: Math.round(performance.now() - t0) };
  writeFileSync(path.join(ROOT, 'data', 'stage7-budget.json'), JSON.stringify(doc, null, 1) + '\n');
  console.log(`wrote data/stage7-budget.json (${fmtMs(doc.elapsedMs)})`);

  if (hours(A.expected.total) > PLAN.budgetHours) {
    console.error(`\nESTIMATE EXCEEDS BUDGET: Phase A-2 expected ${fmtMs(A.expected.total)} > ${PLAN.budgetHours} h — 멈춤.`);
    console.error(`줄일 축 (제안만): (1) DAgger 재학습 에폭 상한 5 → 3, (2) 라운드 0 에폭 상한 15 → 10, (3) DAgger 라운드당 결정 4k → 2k, (4) 커널 가속 (WASM SIMD) — 동역학·데이터를 바꾸지 않는다.`);
    process.exit(1);
  }
  console.log(`\nwithin budget (Phase A-2 expected ${fmtMs(A.expected.total)} ≤ ${PLAN.budgetHours} h; worst ${fmtMs(A.worst.total)})`);
}

main().catch((err) => { console.error(err); process.exit(2); });
