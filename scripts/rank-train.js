#!/usr/bin/env node
// 6단계 검증 실행 (규모 축소): 5단계 최종 동작점의 고정 리저버(C0 재캘리브레이션 점, T 25, G_IN×1.62)에 랭킹 손실만 적용해 학습하고,
// 회귀 손실(5단계) 대비 결정 내 τ · top-1 이 얼마나 오르는지 잰다. 목적은 성능이 아니라 원인 1(손실 오설계)의 크기 측정이다.
//
//   입력 3종  dn    리저버 DN 발화율 107 (후보 afterstate 보드 → 완전 리셋 → 25 스텝)        ← 6단계의 대상
//             board 원 보드 200 셀 (리저버가 받는 것과 같은 정보)                                ← 원인 2(표현) 통제: 표현이 완벽하면 어디까지 가나
//             hand  교사의 11 특징 + 위험 플래그 (교사 값은 이 특징의 깊이 3 빔 값 — 1-ply 함수가 아니라 상한은 아니다)  ← 참조
//   손실 4종  mse(5단계 회귀) · centered(결정 내 중심화 회귀) · listwise(softmax CE) · pairwise(hinge)
//   모델 2종  linear · mlp(64)
// 데이터: data/versus-decisions.json.gz 의 게임을 id 순으로 --decisions (기본 8000) 결정이 될 때까지 (게임 단위 분할은 저장된 것).
// 결과 → data/rank-train.json + 비교 표 출력. 옵션: --decisions N --workers N --max-epochs N --inputs dn,board,hand --quick

import os from 'node:os';
import { readFileSync, writeFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPool } from './pool.js';
import { deserialize, afterstate } from '../src/versus-data.js';
import { FEATURES, stateFeatures, transientFeatures } from '../src/teacher-attack.js';
import { LOSSES, MODELS, TRAIN, chanceMetrics } from '../src/rank-train.js';
import { mean } from '../src/evaluate.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'data', 'versus-decisions.json.gz');
const OUT = path.join(ROOT, 'data', 'rank-train.json');

const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? argv[i + 1] : def; };
const quick = argv.includes('--quick');
const CFG = {
  decisions: Number(opt('decisions', quick ? 300 : 8000)),
  workers: Number(opt('workers', Math.max(1, Math.min(12, os.cpus().length - 2)))),
  inputs: String(opt('inputs', 'dn,board,hand')).split(','),
  losses: LOSSES, models: MODELS,
  train: { ...TRAIN, maxEpochs: Number(opt('max-epochs', quick ? 5 : TRAIN.maxEpochs)), patience: quick ? 2 : TRAIN.patience },
  seed: 1,
};
const fmtMs = (ms) => (ms < 60000 ? `${(ms / 1000).toFixed(0)} s` : `${(ms / 60000).toFixed(1)} min`);
const pct = (x) => `${(100 * x).toFixed(1)}%`;
const ci = (c, f = (v) => v.toFixed(3)) => `[${f(c[0])}, ${f(c[1])}]`;

async function main() {
  const t0 = performance.now();
  // ---------- 데이터 ----------
  const data = deserialize(JSON.parse(gunzipSync(readFileSync(DATA)).toString()));
  const games = [];
  let nDec = 0;
  for (const g of data.games) { if (nDec >= CFG.decisions) break; games.push(g); nDec += g.decisions.length; }
  const decisions = games.flatMap((g) => g.decisions);
  const partOf = (gid) => (data.split.train.includes(gid) ? 'train' : data.split.val.includes(gid) ? 'val' : 'test');
  const parts = { train: [], val: [], test: [] };
  decisions.forEach((d, i) => parts[partOf(d.gameId)].push(i));
  const n = decisions.reduce((s, d) => s + d.candidates.length, 0);
  console.log(`data: ${games.length}/${data.games.length} games, ${decisions.length} decisions, ${n} candidates (${(n / decisions.length).toFixed(1)}/decision); split train ${parts.train.length} / val ${parts.val.length} / test ${parts.test.length} decisions (game-level, stored split)`);
  console.log(`teacher: ${data.meta.teacher.source}; garbage injection ${data.meta.garbage.linesPerPiece.toFixed(3)} lines/piece; decisions with pending garbage ${pct(data.meta.garbage.decisionsWithPendingGarbage / data.meta.decisions)}`);

  // 후보 afterstate 보드 (엔진 재실행) + hand 특징
  const offsets = new Int32Array(decisions.length + 1);
  const chosen = new Int32Array(decisions.length);
  const values = new Float64Array(n);
  const boards = new Uint8Array(n * 200);
  const HAND_DIM = FEATURES.length + 1;
  const hand = new Float32Array(new SharedArrayBuffer(n * HAND_DIM * 4));
  let k = 0;
  const tb = performance.now();
  decisions.forEach((d, i) => {
    offsets[i] = k; chosen[i] = d.chosen;
    d.candidates.forEach((c, j) => {
      const { player, event } = afterstate(d, j);
      boards.set(player.board, k * 200);
      values[k] = c.value;
      const tf = transientFeatures(event), sf = stateFeatures(player);
      FEATURES.forEach((f, q) => { hand[k * HAND_DIM + q] = tf[f] ?? sf[f]; });
      hand[k * HAND_DIM + FEATURES.length] = c.danger ? 1 : 0;
      k++;
    });
  });
  offsets[decisions.length] = k;
  // 교사 값의 분산 분해: 결정 간 / 결정 내
  const all = Array.from(values), mu = mean(all);
  const varAll = mean(all.map((v) => (v - mu) ** 2));
  let within = 0;
  decisions.forEach((d, i) => { const vs = all.slice(offsets[i], offsets[i + 1]); const m = mean(vs); within += vs.reduce((s, v) => s + (v - m) ** 2, 0); });
  within /= n;
  console.log(`teacher values: var ${varAll.toFixed(1)}, within-decision ${within.toFixed(1)} (${pct(within / varAll)}), between-decision ${pct(1 - within / varAll)} — 5단계 회귀 손실은 결정 간 분산에 지배된다  (afterstates rebuilt in ${fmtMs(performance.now() - tb)})`);

  // ---------- 리저버 특징 (고정 리저버, 5단계 최종 동작점) ----------
  const results = JSON.parse(readFileSync(path.join(ROOT, 'data', 'results.json'), 'utf8'));
  const c0 = results.conditions.C0;
  const { rhoTarget, alpha, b, kLocal, kGlobal } = c0.params;
  const params = { rhoTarget, alpha, b, kLocal, kGlobal };
  const T = results.config.operating.T, gIn = results.config.operating.gIn;
  const DN_DIM = 107;
  const dn = new Float32Array(new SharedArrayBuffer(n * DN_DIM * 4));
  let featMs = 0, meanRate = 0;
  if (CFG.inputs.includes('dn')) {
    console.log(`\nreservoir: C0 recalibrated point (alpha ${alpha}, rho ${rhoTarget}, b ${b}, k_local ${kLocal}, k_global ${kGlobal}), T ${T}, G_IN ${gIn} — 5단계 R3:V2 리드아웃이 학습된 바로 그 리저버`);
    const pool = createPool(new URL('./experiment-worker.js', import.meta.url), CFG.workers);
    await pool.ready;
    const chunk = 2000;
    const jobs = [];
    for (let from = 0; from < n; from += chunk) {
      const to = Math.min(n, from + chunk);
      jobs.push({ type: 'featurize-boards', boards: boards.slice(from * 200, to * 200), params, T, gIn, from, transfer: [] });
    }
    jobs.forEach((j) => { j.transfer = [j.boards.buffer]; });
    const tf = performance.now();
    let done = 0;
    const rates = [];
    await pool.run(jobs, (r, d) => { dn.set(r.dn, r.from * DN_DIM); rates.push(r.meanRateHz); done = d; if (done % 20 === 0) process.stdout.write(`  featurize ${done}/${jobs.length}\r`); });
    featMs = performance.now() - tf;
    meanRate = mean(rates);
    await pool.close();
    console.log(`featurized ${n} candidate boards in ${fmtMs(featMs)} (${(n / featMs * 1000).toFixed(0)} windows/s aggregate, mean rate ${meanRate.toFixed(1)} Hz)`);
    // 결정 내 분리: 서로 다른 DN 벡터 비율 (5단계 distinctFrac 과 같은 정의, 발화율은 정수 카운트의 스케일이라 정확 비교 가능)
    let distinct = 0;
    for (let i = 0; i < decisions.length; i++) { const keys = new Set(); for (let q = offsets[i]; q < offsets[i + 1]; q++) keys.add(Array.from(dn.subarray(q * DN_DIM, (q + 1) * DN_DIM)).join(',')); distinct += keys.size / (offsets[i + 1] - offsets[i]); }
    console.log(`within-decision distinct DN vectors: ${pct(distinct / decisions.length)} (5단계 C0: 73%)`);
  }
  const board = new Float32Array(new SharedArrayBuffer(n * 200 * 4));
  for (let q = 0; q < n * 200; q++) board[q] = boards[q];

  // ---------- 학습 (입력 × 손실 × 모델) ----------
  const inputs = { dn: { X: dn.buffer, dim: DN_DIM }, board: { X: board.buffer, dim: 200 }, hand: { X: hand.buffer, dim: HAND_DIM } };
  const jobs = [];
  for (const input of CFG.inputs) for (const model of CFG.models) for (const loss of CFG.losses) {
    jobs.push({ type: 'train', input, model, loss, X: inputs[input].X, dim: inputs[input].dim, n, offsets, chosen, values, parts, opts: { ...CFG.train, seed: CFG.seed } });
  }
  // MLP 작업이 오래 걸리므로 먼저 배치한다
  jobs.sort((a, b) => (a.model === 'mlp' ? 0 : 1) - (b.model === 'mlp' ? 0 : 1) || (a.input === 'board' ? 0 : 1) - (b.input === 'board' ? 0 : 1));
  console.log(`\ntraining ${jobs.length} rankers (${CFG.inputs.join('/')} × ${CFG.models.join('/')} × ${CFG.losses.join('/')}), Adam lr ${CFG.train.lr}, batch ${CFG.train.batch} decisions, ≤ ${CFG.train.maxEpochs} epochs, patience ${CFG.train.patience}, ${CFG.workers} workers`);
  const pool = createPool(new URL('./rank-worker.js', import.meta.url), Math.min(CFG.workers, jobs.length));
  await pool.ready;
  const tt = performance.now();
  const trained = await pool.run(jobs, (r, d) => console.log(`  [${d}/${jobs.length}] ${r.input.padEnd(5)} ${r.model.padEnd(6)} ${r.loss.padEnd(8)} τ ${r.metrics.tau.toFixed(3)} top-1 ${pct(r.metrics.top1)}${r.metrics.r2 !== undefined ? ` R² ${r.metrics.r2.toFixed(3)}` : ''}  (${r.epochs} epochs, best ${r.best.epoch}, ${fmtMs(r.trainMs)})`));
  await pool.close();
  const trainMs = performance.now() - tt;

  // ---------- 표 ----------
  const testDecs = parts.test.map((i) => ({ X: Array.from({ length: offsets[i + 1] - offsets[i] }, () => null), values: Array.from(values.subarray(offsets[i], offsets[i + 1])), chosen: chosen[i] }));
  const chance = chanceMetrics(testDecs);
  const rows = trained.sort((a, b) => CFG.inputs.indexOf(a.input) - CFG.inputs.indexOf(b.input) || CFG.models.indexOf(a.model) - CFG.models.indexOf(b.model) || CFG.losses.indexOf(a.loss) - CFG.losses.indexOf(b.loss));
  console.log(`\n=== test decisions ${parts.test.length} (${testDecs.reduce((s, d) => s + d.values.length, 0)} candidates), 95% bootstrap CI over decisions ===`);
  console.log(`chance (random scores): τ ${chance.tau.toFixed(3)} ${ci(chance.tauCI)}, top-1 ${pct(chance.top1)} ${ci(chance.top1CI, pct)}`);
  console.log(`${'input'.padEnd(6)} ${'model'.padEnd(7)} ${'loss'.padEnd(9)} ${'τ (within-decision)'.padEnd(28)} ${'top-1'.padEnd(26)} ${'R² (pooled, mse only)'.padEnd(26)} epochs`);
  for (const r of rows) {
    const m = r.metrics;
    console.log(`${r.input.padEnd(6)} ${r.model.padEnd(7)} ${r.loss.padEnd(9)} ${`${m.tau.toFixed(3)} ${ci(m.tauCI)}`.padEnd(28)} ${`${pct(m.top1)} ${ci(m.top1CI, pct)}`.padEnd(26)} ${(m.r2 !== undefined ? `${m.r2.toFixed(3)} ${ci(m.r2CI)}` : '—').padEnd(26)} ${r.epochs}`);
  }
  // 핵심 비교: dn 입력, mse → listwise (모델별)
  const find = (input, model, loss) => rows.find((r) => r.input === input && r.model === model && r.loss === loss)?.metrics;
  const sep = (a, b) => (a[1] < b[0] || b[1] < a[0] ? 'CI 분리' : 'CI 겹침');
  console.log('\n=== 원인 1 의 크기: 같은 고정 리저버 특징(dn), 손실만 바꿈 ===');
  const deltas = {};
  for (const model of CFG.models) {
    const base = find('dn', model, 'mse');
    if (!base) continue;
    for (const loss of ['centered', 'listwise', 'pairwise']) {
      const m = find('dn', model, loss);
      if (!m) continue;
      deltas[`${model}:${loss}`] = { dTau: m.tau - base.tau, dTop1: m.top1 - base.top1, tauSep: sep(m.tauCI, base.tauCI), top1Sep: sep(m.top1CI, base.top1CI) };
      console.log(`dn ${model.padEnd(6)} mse → ${loss.padEnd(8)}  Δτ ${(m.tau - base.tau >= 0 ? '+' : '')}${(m.tau - base.tau).toFixed(3)} (${sep(m.tauCI, base.tauCI)})   Δtop-1 ${(m.top1 - base.top1 >= 0 ? '+' : '')}${pct(m.top1 - base.top1)} (${sep(m.top1CI, base.top1CI)})`);
    }
  }
  console.log('\n=== 원인 2 의 크기: 같은 손실(listwise), 입력만 바꿈 (표현 상한 대비) ===');
  for (const model of CFG.models) {
    const d = find('dn', model, 'listwise'), b = find('board', model, 'listwise'), h = find('hand', model, 'listwise');
    if (d && b) console.log(`${model.padEnd(6)} listwise  dn τ ${d.tau.toFixed(3)} / top-1 ${pct(d.top1)}   board τ ${b.tau.toFixed(3)} / top-1 ${pct(b.top1)}   ${h ? `hand τ ${h.tau.toFixed(3)} / top-1 ${pct(h.top1)}` : ''}   (chance top-1 ${pct(chance.top1)})`);
  }
  const s5 = { r3v2: c0.readouts['R3:V2'].metrics, r1v1: c0.readouts['R1:V1'].metrics };
  console.log(`\n(5단계 참조, 다른 데이터·다른 교사: C0 R3:V2 τ ${s5.r3v2.tau.toFixed(3)} top-1 ${pct(s5.r3v2.top1)} R² ${s5.r3v2.r2.toFixed(3)}; R1:V1 τ ${s5.r1v1.tau.toFixed(3)} top-1 ${pct(s5.r1v1.top1)})`);

  const doc = {
    ranAt: new Date().toISOString(), elapsedMs: Math.round(performance.now() - t0), config: { ...CFG, reservoir: { params, T, gIn, source: 'results.json C0 params + operating' } },
    data: { file: path.relative(ROOT, DATA), games: games.length, decisions: decisions.length, candidates: n, split: { train: parts.train.length, val: parts.val.length, test: parts.test.length }, teacherValueVariance: { total: varAll, within, betweenShare: 1 - within / varAll }, garbage: data.meta.garbage },
    reservoir: { meanRateHz: meanRate, featurizeMs: Math.round(featMs) },
    chance, results: rows.map((r) => ({ input: r.input, model: r.model, loss: r.loss, metrics: r.metrics, val: r.val, best: r.best, epochs: r.epochs, trainMs: Math.round(r.trainMs), params: r.params, history: r.history })),
    deltas, stage5Reference: s5, trainMs: Math.round(trainMs),
    note: '고정 리저버 (가중치 = 커넥톰 시냅스 수) + 리드아웃만 학습. 7단계에서 가중치를 풀기 전의 원인 1 크기 측정.',
  };
  writeFileSync(OUT, JSON.stringify(doc, null, 1) + '\n');
  console.log(`\nwrote ${path.relative(ROOT, OUT)}  (total ${fmtMs(doc.elapsedMs)}, training ${fmtMs(trainMs)})`);
}

main().catch((err) => { console.error(err); process.exit(2); });
