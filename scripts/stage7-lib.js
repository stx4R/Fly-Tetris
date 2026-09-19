// 7단계 공용 조율: 입력 로드, 데이터셋(u 풀), 모델 상태(공유 theta), 워커 풀, 한 라운드 학습(Adam + 클리핑 + 코사인 + 조기 종료),
// 전체 후보 평가, 플레이 평가, DAgger 수집, 체크포인트. train-c0 / train-nulls / estimate-budget 이 같이 쓴다.
// 순수 수학은 src/stage7-train.js, 모델은 src/sparse-rnn.js, 데이터는 src/stage7-data.js.

import os from 'node:os';
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { gunzipSync, gzipSync } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPool as createWorkerPool } from './pool.js';
import { parseConnectome } from '../src/connectome.js';
import { buildCondition } from '../src/nullmodels.js';
import { deserialize } from '../src/versus-data.js';
import { DEFAULT_PARAMS, DEFAULT_VARIANT, TEACHER_VARIANTS, variantOf } from '../src/teacher-attack.js';
import { buildMask, calibrateReadout, createDenseMLP, createSparseRNN, denseMatchedShape, initDenseTheta, initSparseTheta, sparseLayout, U_DIM } from '../src/sparse-rnn.js';
import { TRAIN_K, U_NORMALIZATION, appendDecisions, chanceFromItems, createPool as createUPool, metricsFromScores, selectDecisions } from '../src/stage7-data.js';
// (scoreItems 는 아래에 정의 — trainRound 의 valFull regret 에 쓴다)
import { HYPER, clipGradient, cosineLr, createAdam } from '../src/stage7-train.js';
import { valueGapScale } from '../src/rank-train.js';
import { createRng } from '../src/prng.js';
import { bootstrapCI, mean, median, quartiles } from '../src/evaluate.js';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const STAGE7_DIR = path.join(ROOT, 'data', 'stage7');
export const DEFAULT_WORKERS = Math.max(1, Math.min(12, os.cpus().length - 2));
export const fmtMs = (ms) => (ms < 60000 ? `${(ms / 1000).toFixed(0)} s` : ms < 3.6e6 ? `${(ms / 60000).toFixed(1)} min` : `${(ms / 3.6e6).toFixed(2)} h`);
export const pct = (x) => `${(100 * x).toFixed(1)}%`;
export const ci = (c, f = (v) => v.toFixed(3)) => `[${f(c[0])}, ${f(c[1])}]`;
const r3 = (x) => Math.round(x * 1000) / 1000;

// ---------- 입력 ----------

// 교사 변형 (src/teacher-attack.js TEACHER_VARIANTS): beam (A-3 까지) · 1ply · 1ply-hold · 1ply-hold-garbage (A-4′). 스크립트는 --teacher KEY (또는 --ply 1 [--hold] [--garbage]) 로 고른다.
// 변형마다 교사 파일·데이터 파일이 따로다. 빔이 아닌 변형의 교사 파일은 tune-teacher 가 만든다 (없으면 오류 — 기본값으로 대체하지 않는다).
export const TEACHER_FILE = (variant = DEFAULT_VARIANT) => path.join(ROOT, 'data', TEACHER_VARIANTS[variant].file);
export const DATA_FILE = (variant = DEFAULT_VARIANT) => path.join(ROOT, 'data', TEACHER_VARIANTS[variant].dataFile);
export { variantOf };

// 교사 사양 { params, ply, depth, width, hold, variant, source, evaluation } — 워커는 teacherFor(params, spec) 으로 교사를, hold 로 에이전트의 행동 집합을 맞춘다.
export function loadTeacher(variant = DEFAULT_VARIANT) {
  const V = TEACHER_VARIANTS[variant];
  if (!V) throw new Error(`unknown teacher variant ${variant}`);
  const tf = TEACHER_FILE(variant);
  if (existsSync(tf)) { const t = JSON.parse(readFileSync(tf, 'utf8')); return { params: t.params, ...V.search, variant, source: `${path.relative(ROOT, tf)} (tuned ${t.tunedAt})`, evaluation: t.evaluation ?? null }; }
  if (variant !== DEFAULT_VARIANT) throw new Error(`${path.relative(ROOT, tf)} 없음 — tune-teacher 로 먼저 튜닝 (${variant})`);
  return { params: DEFAULT_PARAMS, ...V.search, variant, source: 'DEFAULT_PARAMS', evaluation: null };
}

export function loadInputs({ data = true, variant = DEFAULT_VARIANT } = {}) {
  const connectome = parseConnectome(readFileSync(path.join(ROOT, 'data', 'connectome.json'), 'utf8'));
  const teacher = loadTeacher(variant);
  if (!data) return { connectome, teacher };
  const df = DATA_FILE(variant);
  if (!existsSync(df)) throw new Error(`${path.relative(ROOT, df)} 없음 — npm run collect-versus${variant !== DEFAULT_VARIANT ? ` -- --teacher ${variant}` : ''} 먼저`);
  const raw = JSON.parse(gunzipSync(readFileSync(df)).toString());
  const s = raw.meta?.teacher?.search ?? {};
  if (variant !== DEFAULT_VARIANT && ((s.ply ?? 3) !== teacher.ply || (s.hold ?? true) !== teacher.hold)) throw new Error(`${path.relative(ROOT, df)} 는 ${variant} 교사 데이터가 아니다 (meta.teacher.search ${JSON.stringify(s)})`);
  const decisions = deserialize(raw);
  const garbage = { rate: raw.meta.garbage.rate, dist: raw.meta.garbage.dist };
  return { connectome, teacher, data: decisions, garbage, dataFile: path.relative(ROOT, df) };
}

// ---------- 데이터셋 ----------

// train K 부분집합 / val K 부분집합 (조기 종료 손실) / test 전체 후보 (6단계와 같은 1204 결정). u 풀은 DAgger 추가분 여유를 포함해 한 번 잡는다.
// valFull: val 결정 앞 valFullDecisions 개의 전체 후보 (에폭마다 상대 regret 으로 조기 종료·최선 선택 — K 부분집합으로 regret 을 재지 않는다)
export function buildDataset(data, { trainDecisions = HYPER.trainDecisions, valDecisions = HYPER.valDecisions, K = TRAIN_K, daggerRows = 0, negatives = HYPER.negatives, hard = HYPER.hardNegatives, valFullDecisions = HYPER.valFullDecisions ?? 0 } = {}) {
  const t0 = performance.now();
  const sel = selectDecisions(data, { trainDecisions, valDecisions });
  const testRows = sel.test.reduce((s, d) => s + d.candidates.length, 0);
  const valFullSel = sel.val.slice(0, valFullDecisions);
  const valFullRows = valFullSel.reduce((s, d) => s + d.candidates.length, 0);
  const capacity = (sel.train.length + sel.val.length) * K + testRows + valFullRows + daggerRows;
  const pool = createUPool(capacity);
  const train = appendDecisions(pool, sel.train, { K, subset: true, negatives, hard, seed: 1 });
  const val = appendDecisions(pool, sel.val, { K, subset: true, negatives, hard, seed: 2 });
  const test = appendDecisions(pool, sel.test, { subset: false });
  const valFull = appendDecisions(pool, valFullSel, { subset: false });
  const gameSeeds = data.games.map((g) => g.seed);
  const meta = {
    trainDecisions: train.length, valDecisions: val.length, valFullDecisions: valFull.length, valFullCandidates: valFullRows, testDecisions: test.length, testCandidates: testRows, testGames: sel.testGames, K,
    trainGames: new Set(train.map((d) => d.gameId)).size, valGames: new Set(val.map((d) => d.gameId)).size, negatives, hardNegatives: negatives === 'mixed' ? hard : K - 1,
    valueScale: valueGapScale(train), uDim: U_DIM, uNormalization: U_NORMALIZATION, poolCapacityRows: capacity, buildMs: Math.round(performance.now() - t0),
  };
  return { pool, train, val, valFull, test, K, negatives, hard, valueScale: meta.valueScale, gameSeeds, meta, nextGameId: data.games.length };
}

// ---------- 모델 상태 ----------

// 조건 → 마스크 (C0/C1/C3/C4/C5; 시드는 null 조건에만)
export function maskFor(connectome, condition, seed = 0) {
  return buildMask(buildCondition(connectome, condition, seed));
}

// 희소 모델 상태: 공유 theta + 초기 W 사본 + 주 스레드 모델 인스턴스 (리드아웃 표준화는 calibrate 로).
// shuffleInit: 커넥톰 초기 가중치를 간선 사이에서 순열 (Phase B 보조 — 마스크는 같고 초기값만 커넥톰과 무관; null 조건이 아니라 초기값 대조군)
export function createSparseState(mask, hyper = HYPER, { seed = hyper.seed, shuffleInit = false } = {}) {
  const layout = sparseLayout(mask, { hidden: hyper.hidden });
  const theta = new Float64Array(new SharedArrayBuffer(layout.P * 8));
  let wInit = initSparseTheta(mask, layout, theta, { rhoTarget: hyper.rhoTarget, seed });
  if (shuffleInit) {
    const rng = createRng(seed + 777);
    const w = theta.subarray(layout.off.W, layout.off.W + mask.E);
    for (let i = w.length - 1; i > 0; i--) { const j = rng.int(i + 1); const t = w[i]; w[i] = w[j]; w[j] = t; }
    wInit = Float64Array.from(w);
  }
  const model = createSparseRNN(mask, theta, { T: hyper.T, lr: hyper.leak, hidden: hyper.hidden, dropoutZ: hyper.dropoutZ ?? 0, dropoutH: hyper.dropoutH ?? 0, seed });
  const winInit = Float64Array.from(theta.subarray(layout.off.Win, layout.off.Win + layout.sizes.Win));
  const { off, sizes } = layout;
  const decayRanges = [[off.W, off.W + sizes.W], [off.Win, off.Win + sizes.Win], [off.R1, off.R1 + hyper.hidden * mask.nOutput], [off.R2, off.R2 + hyper.hidden]]; // 편향 b·r1b·r2b 제외
  return { kind: 'sparse', mask, layout, theta, P: layout.P, model, wInit, winInit, connectomeInit: Float64Array.from(mask.wUnit, (v) => v * hyper.rhoTarget / mask.rhoUnit), shuffleInit, decayRanges, spec: () => ({ T: hyper.T, lr: hyper.leak, hidden: hyper.hidden, dnMean: Array.from(model.dnMean), dnStd: Array.from(model.dnStd), dropoutZ: hyper.dropoutZ ?? 0, dropoutH: hyper.dropoutH ?? 0 }) };
}
export function createDenseState(P, { seed = HYPER.seed, hyper = HYPER } = {}) {
  const hidden = denseMatchedShape(P);
  const theta = new Float64Array(new SharedArrayBuffer(P * 8));
  initDenseTheta(theta, hidden, { seed });
  const model = createDenseMLP(theta, hidden, { dropoutH: hyper.dropoutH ?? 0, seed });
  const decayRanges = model.layers.map((l) => [l.W, l.W + l.nIn * l.nOut]); // 가중치 행렬만 (편향 제외)
  return { kind: 'dense', hidden, theta, P, model, decayRanges, spec: () => ({ hidden, dropoutH: hyper.dropoutH ?? 0 }) };
}
// 초기 순전파 통계로 리드아웃 입력 표준화 고정 (희소 모델만). 학습 결정 중 앞 rows 개 후보.
export function calibrateState(state, dataset, rows = 256) {
  if (state.kind !== 'sparse') return null;
  const list = [];
  for (const d of dataset.train) { for (const r of d.rows) { list.push(r); if (list.length >= rows) break; } if (list.length >= rows) break; }
  return calibrateReadout(state.model, dataset.pool.U, list);
}

// ---------- 워커 풀 ----------

export async function createTrainingPool(state, dataset, { workers = DEFAULT_WORKERS, teacher = null } = {}) {
  const grads = Array.from({ length: workers }, () => new Float64Array(new SharedArrayBuffer(state.P * 8)));
  const spec = state.spec();
  const maskData = state.kind === 'sparse' ? { N: state.mask.N, E: state.mask.E, nInput: state.mask.nInput, nOutput: state.mask.nOutput, outputStart: state.mask.outputStart, indptr: state.mask.indptr, indices: state.mask.indices, rhoUnit: state.mask.rhoUnit } : null;
  const pool = createWorkerPool(new URL('./stage7-worker.js', import.meta.url), workers, (i) => ({ kind: state.kind, theta: state.theta, grad: grads[i], U: dataset.pool.U, mask: maskData, spec, teacher: teacher ? { params: teacher.params, ply: teacher.ply ?? 3, depth: teacher.depth, width: teacher.width, hold: teacher.hold ?? true } : null, index: i }));
  await pool.ready;
  return { pool, grads, workers, close: () => pool.close() };
}

// ---------- 에폭 체크포인트 (프로세스가 라운드 중간에 죽어도 에폭 단위로 재개) ----------
// {name}.epoch.json (에폭·스텝·최선·이력) + {name}.epoch.theta.f64 (현재 theta) + {name}.epoch.best.f64 (최선 theta) + {name}.epoch.adam.f64 (m ‖ v)
function saveEpochCheckpoint(name, meta, theta, bestTheta, opt) {
  ensureDir();
  const w = (f, arr) => writeFileSync(path.join(STAGE7_DIR, f), Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength));
  w(`${name}.epoch.theta.f64`, theta); w(`${name}.epoch.best.f64`, bestTheta);
  const mv = new Float64Array(opt.m.length * 2); mv.set(opt.m, 0); mv.set(opt.v, opt.m.length); w(`${name}.epoch.adam.f64`, mv);
  writeFileSync(path.join(STAGE7_DIR, `${name}.epoch.json`), JSON.stringify({ ...meta, adamT: opt.t, savedAt: new Date().toISOString() }) + '\n');
}
function loadEpochCheckpoint(name, P) {
  const f = path.join(STAGE7_DIR, `${name}.epoch.json`);
  if (!existsSync(f)) return null;
  const meta = JSON.parse(readFileSync(f, 'utf8'));
  const r = (file, n) => { const b = readFileSync(path.join(STAGE7_DIR, file)); if (b.length !== n * 8) throw new Error(`${file}: ${b.length} bytes ≠ ${n * 8}`); return new Float64Array(b.buffer.slice(b.byteOffset, b.byteOffset + n * 8)); };
  const mv = r(`${name}.epoch.adam.f64`, 2 * P);
  return { meta, theta: r(`${name}.epoch.theta.f64`, P), best: r(`${name}.epoch.best.f64`, P), m: mv.subarray(0, P), v: mv.subarray(P) };
}
export function clearEpochCheckpoint(name) {
  for (const f of ['epoch.json', 'epoch.theta.f64', 'epoch.best.f64', 'epoch.adam.f64']) { const p = path.join(STAGE7_DIR, `${name}.${f}`); if (existsSync(p)) unlinkSync(p); }
}

// ---------- 한 라운드 학습 ----------

// 반환 { history: [{ epoch, train, val, lr, clippedFrac, ms }], best: { epoch, valLoss }, epochs, steps, ms }. theta 는 최선 검증 손실 시점으로 되돌린다.
// opts.checkpoint = 이름 이면 에폭마다 체크포인트를 쓰고, 같은 이름·같은 설정(학습 결정 수·에폭 상한)의 체크포인트가 있으면 그 다음 에폭부터 재개한다
// (done 표식이 있으면 학습을 건너뛰고 저장된 결과를 돌려준다 — 라운드 학습 뒤 평가 도중에 죽어도 다시 학습하지 않는다). 에폭별 셔플은 seed + epoch 로 재현.
export async function trainRound(tp, state, dataset, opts = {}) {
  const { loss = HYPER.loss, batch = HYPER.batch, lr = HYPER.lr, lrMin = HYPER.lrMin, clip = HYPER.clip, maxEpochs = HYPER.maxEpochs, patience = HYPER.patience, seed = 1, log = null, adam = null, jobDecisions = 1,
    lambda = HYPER.lambda, weightDecay = HYPER.weightDecay, checkpoint = null, mu = HYPER.mu ?? 0, selectBy = HYPER.selectBy ?? 'valLoss' } = opts;
  const { pool, grads } = tp;
  const { train, val, K } = dataset;
  const valFull = dataset.valFull ?? [];
  const useRegret = selectBy === 'relRegret' && valFull.length > 0; // 최선 모델·조기 종료 기준: valFull 의 상대 regret (전체 후보)
  const valueScale = dataset.valueScale ?? valueGapScale(train);
  const P = state.P;
  const theta = state.theta;
  const opt = adam ?? createAdam(P, { weightDecay, decayRanges: state.decayRanges ?? [] });
  const gsum = new Float64Array(P);
  const order = train.map((_, i) => i);
  const stepsPerEpoch = Math.ceil(train.length / batch);
  const total = maxEpochs * stepsPerEpoch;
  let step = 0, stale = 0, clippedSteps = 0, startEpoch = 1;
  let best = { loss: Infinity, theta: Float64Array.from(theta), epoch: 0 };
  let history = [];
  const t0 = performance.now();
  const valJobs = () => { const jobs = []; for (let i = 0; i < val.length; i += 40) jobs.push({ type: 'loss', loss, lambda, valueScale, mu, decisions: val.slice(i, i + 40).map((d) => ({ rows: d.rows, chosen: d.chosen, values: d.values, holes: d.holes })) }); return jobs; };
  const valLoss = async () => { const r = await pool.run(valJobs()); return r.reduce((s, x) => s + x.L, 0) / val.length; };
  const valRegret = async () => { if (!useRegret) return null; const scores = await scoreItems(tp, valFull); const m = metricsFromScores(valFull, scores); return { relRegret: m.relRegret, regret: m.regret, top1: m.top1, tau: m.tau, bottomHalfRate: m.bottomHalfRate }; };
  const finish = (resumedMs = 0) => {
    theta.set(best.theta);
    return { history, best: { epoch: best.epoch, valLoss: best.loss, criterion: useRegret ? 'relRegret' : 'valLoss' }, epochs: history.length, steps: step, stepsPerEpoch, clippedFrac: clippedSteps / Math.max(1, step), ms: Math.round(performance.now() - t0) + resumedMs, adam: opt, loss, K, batch, lr, maxEpochs, patience, lambda, mu, selectBy: useRegret ? 'relRegret' : 'valLoss', valueScale, weightDecay, negatives: dataset.negatives, dropout: { z: state.model.dropoutZ ?? 0, h: state.model.dropoutH ?? 0 } };
  };
  const ck = checkpoint ? loadEpochCheckpoint(checkpoint, P) : null;
  let resumedMs = 0;
  if (ck && ck.meta.trainLength === train.length && ck.meta.maxEpochs === maxEpochs && ck.meta.loss === loss && ck.meta.lambda === lambda && (ck.meta.mu ?? 0) === mu && (ck.meta.selectBy ?? 'valLoss') === selectBy) {
    theta.set(ck.theta); opt.restore(ck.m, ck.v, ck.meta.adamT);
    best = { loss: ck.meta.best.loss, theta: Float64Array.from(ck.best), epoch: ck.meta.best.epoch };
    history = ck.meta.history; step = ck.meta.step; stale = ck.meta.stale; clippedSteps = ck.meta.clippedSteps; startEpoch = ck.meta.epoch + 1; resumedMs = ck.meta.elapsedMs ?? 0;
    log?.({ resumed: true, epoch: ck.meta.epoch, done: !!ck.meta.done, message: `resumed from epoch checkpoint ${checkpoint} (epoch ${ck.meta.epoch}, step ${step}, best ${best.epoch} ${best.loss.toFixed(4)}${ck.meta.done ? ', round already complete' : ''})` });
    if (ck.meta.done) return finish(resumedMs);
  } else if (ck) log?.({ message: `epoch checkpoint ${checkpoint} ignored (config differs)` });
  const save = (epoch, done) => { if (checkpoint) saveEpochCheckpoint(checkpoint, { epoch, step, stale, clippedSteps, best: { loss: best.loss, epoch: best.epoch }, history, trainLength: train.length, maxEpochs, loss, lambda, mu, selectBy, done, elapsedMs: Math.round(performance.now() - t0) + resumedMs }, theta, best.theta, opt); };
  let stoppedEarly = false;
  const dbg = process.env.STAGE7_DEBUG ? (label) => { const cs = (a) => { let x = 0; for (let i = 0; i < a.length; i++) x += a[i] * (1 + (i % 7)); return x; }; console.log(`[dbg] ${label}: step ${step} t ${opt.t} theta ${cs(theta)} m ${cs(opt.m)} v ${cs(opt.v)} dnMean ${cs(state.model.dnMean)} dnStd ${cs(state.model.dnStd)}`); } : null;
  for (let epoch = startEpoch; epoch <= maxEpochs; epoch++) {
    const te = performance.now();
    dbg?.(`epoch ${epoch} start`);
    const rng = createRng(seed + 101 + epoch * 7919);
    for (let i = 0; i < order.length; i++) order[i] = i; // 에폭의 순서는 에폭 시드에만 의존 (재개 시 앞 에폭의 순열을 이어받지 않도록)
    for (let i = order.length - 1; i > 0; i--) { const j = rng.int(i + 1); [order[i], order[j]] = [order[j], order[i]]; }
    let trainLoss = 0, nb = 0, gnorm = 0;
    for (let s0 = 0; s0 < order.length; s0 += batch) {
      const idx = order.slice(s0, s0 + batch);
      const jobs = [];
      for (let q = 0; q < idx.length; q += jobDecisions) jobs.push({ type: 'grad', step, loss, lambda, valueScale, mu, scale: 1 / idx.length, decisions: idx.slice(q, q + jobDecisions).map((i) => ({ rows: train[i].rows, chosen: train[i].chosen, values: train[i].values, holes: train[i].holes })) });
      const used = new Set();
      const res = await pool.run(jobs, (r) => used.add(r.worker));
      trainLoss += res.reduce((s, r) => s + r.L, 0) / idx.length; nb++;
      gsum.fill(0);
      for (const w of used) { const g = grads[w]; for (let p = 0; p < P; p++) gsum[p] += g[p]; }
      const c = clipGradient(gsum, clip);
      gnorm += c.norm; if (c.clipped) clippedSteps++;
      const lrNow = cosineLr(lr, lrMin, step, total);
      opt.step(theta, gsum, lrNow);
      step++;
      if (log && nb % 50 === 0) log({ epoch, step, batchLoss: trainLoss / nb, gradNorm: c.norm, lr: lrNow, elapsedMs: performance.now() - t0 });
    }
    const tv = performance.now();
    const v = await valLoss();
    const vr = await valRegret();
    const crit = useRegret ? vr.relRegret : v; // 최선 선택·조기 종료 기준값 (작을수록 좋음)
    const rec = { epoch, train: trainLoss / nb, val: v, valRegret: vr, criterion: crit, lr: cosineLr(lr, lrMin, step, total), gradNorm: gnorm / nb, clippedFrac: clippedSteps / step, ms: Math.round(performance.now() - te), evalMs: Math.round(performance.now() - tv) };
    history.push(rec);
    log?.(rec);
    if (crit < best.loss - 1e-9) { best = { loss: crit, theta: Float64Array.from(theta), epoch }; stale = 0; } else if (++stale >= patience) stoppedEarly = true;
    save(epoch, stoppedEarly || epoch === maxEpochs);
    if (stoppedEarly) break;
  }
  return finish(resumedMs);
}

// ---------- 평가 ----------

// 결정 목록의 후보별 점수 (워커 풀)
export async function scoreItems(tp, items, { perJob = 20 } = {}) {
  const jobs = [];
  for (let i = 0; i < items.length; i += perJob) jobs.push({ type: 'score', decisions: items.slice(i, i + perJob).map((d) => ({ rows: d.rows })) });
  return (await tp.pool.run(jobs)).flat();
}
// 테스트 결정 (전체 후보) 의 결정 내 τ · top-1 (+ 우연 기준선)
export async function evaluateTest(tp, items, opts = {}) {
  const t0 = performance.now();
  const scores = await scoreItems(tp, items, opts);
  const m = metricsFromScores(items, scores);
  return { ...m, chance: chanceFromItems(items), ms: Math.round(performance.now() - t0) };
}

export const EVAL_SEEDS = Array.from({ length: 20 }, (_, k) => 50000 + k); // 6단계 교사 평가와 같은 시드

// 정책 플레이 평가 (Phase A-2 게이트: 20 게임 × 1000 조각, 가비지 주입 포함 — injector 를 준다). 반환 요약 (tune-teacher 의 summary 와 같은 필드 + 테트리스/우물 유지 분포)
export async function playEval(tp, { seeds = EVAL_SEEDS, cap = 1000, injector = null, trace = false } = {}) {
  const t0 = performance.now();
  const games = (await tp.pool.run(seeds.map((seed) => ({ type: 'play', seeds: [seed], cap, record: false, injector, trace })))).flat();
  return { ...summarizePlay(games), cap, injector, ms: Math.round(performance.now() - t0) };
}
// 빠른 평가 (DAgger 조기 중단용): 게임 수 적음, 시드 순서 유지 → 라운드 간 짝지은 비교
export async function quickEval(tp, { seeds, cap = 1000, injector = null } = {}) {
  const t0 = performance.now();
  const games = (await tp.pool.run(seeds.map((seed) => ({ type: 'play', seeds: [seed], cap, record: false, injector })))).flat();
  return { seeds, pieces: games.map((g) => g.pieces), attack: games.map((g) => g.attack), tetris: games.map((g) => g.tetris), piecesMedian: median(games.map((g) => g.pieces)), piecesMedianCI: bootstrapCI(games.map((g) => g.pieces), median, { seed: 17 }), ms: Math.round(performance.now() - t0) };
}
export function summarizePlay(games) {
  const attack = games.map((g) => g.attack), pieces = games.map((g) => g.pieces), tetris = games.map((g) => g.tetris);
  const lines = games.reduce((s, g) => s + g.lines, 0);
  const tetrisLines = games.reduce((s, g) => s + g.tetris * 4, 0);
  const runs = games.flatMap((g) => g.wellRuns ?? []);
  const runLengths = runs.map((r) => r.length);
  const totalPieces = Math.max(1, games.reduce((s, g) => s + g.pieces, 0));
  const deadGames = games.filter((g) => g.dead && g.holesAtDeath !== null && g.holesAtDeath !== undefined);
  const holesAtDeath = deadGames.map((g) => g.holesAtDeath);
  const lineCounts = [0, 0, 0, 0, 0];
  for (const g of games) if (g.lineCounts) for (let k = 0; k < 5; k++) lineCounts[k] += g.lineCounts[k];
  const clears = lineCounts[1] + lineCounts[2] + lineCounts[3] + lineCounts[4];
  return {
    games: games.length, attackMedian: median(attack), attackQuartiles: quartiles(attack), attackMean: r3(mean(attack)), attackMedianCI: bootstrapCI(attack, median, { seed: 11 }),
    attackPer1000: r3(1000 * games.reduce((s, g) => s + g.attack, 0) / totalPieces),
    survival: games.filter((g) => g.survived).length / games.length, survivalCI: bootstrapCI(games.map((g) => (g.survived ? 1 : 0)), mean, { seed: 12 }),
    piecesMedian: median(pieces), piecesMedianCI: bootstrapCI(pieces, median, { seed: 13 }), piecesQuartiles: quartiles(pieces), linesTotal: lines, linesPer1000: r3(1000 * lines / totalPieces),
    tetrises: games.reduce((s, g) => s + g.tetris, 0), tetrisMedian: median(tetris), tetrisMedianCI: bootstrapCI(tetris, median, { seed: 14 }), tetrisPer1000: r3(1000 * games.reduce((s, g) => s + g.tetris, 0) / totalPieces),
    tspins: games.reduce((s, g) => s + g.tspin, 0), tetrisLineShare: r3(tetrisLines / Math.max(1, lines)),
    wellRuns: { count: runs.length, lengthMedian: runs.length ? median(runLengths) : 0, lengthQuartiles: runs.length ? quartiles(runLengths) : [0, 0, 0], lengthP90: runs.length ? Float64Array.from(runLengths).sort()[Math.floor(0.9 * (runs.length - 1))] : 0, lengthMax: runs.length ? Math.max(...runLengths) : 0, endedWithTetris: runs.length ? runs.filter((r) => r.tetrises > 0).length / runs.length : 0, wellPieceShare: r3(games.reduce((s, g) => s + (g.wellPieces ?? 0), 0) / totalPieces), lengths: runLengths },
    garbageReceived: games.reduce((s, g) => s + (g.garbageReceived ?? 0), 0),
    holesAtDeathMedian: holesAtDeath.length ? median(holesAtDeath) : null, holesAtDeathCI: holesAtDeath.length ? bootstrapCI(holesAtDeath, median, { seed: 15 }) : null, holesAtDeath, deadGames: deadGames.length,
    holesMedianInPlay: games.some((g) => g.holesMedian !== undefined) ? median(games.map((g) => g.holesMedian)) : null,
    lineComposition: { single: lineCounts[1], double: lineCounts[2], triple: lineCounts[3], tetris: lineCounts[4], clears, shares: clears ? [1, 2, 3, 4].map((k) => r3(lineCounts[k] / clears)) : null },
    perfectClears: games.reduce((s, g) => s + g.perfectClear, 0), maxCombo: Math.max(...games.map((g) => g.maxCombo)), holds: games.reduce((s, g) => s + g.holds, 0),
    msPerPiece: r3(games.reduce((s, g) => s + g.ms, 0) / totalPieces),
    games_: games.map((g) => ({ seed: g.seed, attack: g.attack, pieces: g.pieces, survived: g.survived, lines: g.lines, tetris: g.tetris, tspin: g.tspin, maxCombo: g.maxCombo, holds: g.holds, garbageReceived: g.garbageReceived, wellRuns: (g.wellRuns ?? []).length, wellPieces: g.wellPieces ?? 0, holesAtDeath: g.holesAtDeath ?? null, holesMedian: g.holesMedian ?? null, lineCounts: g.lineCounts ?? null, trace: g.trace ?? null })),
  };
}
export const playLine = (s) => `attack median ${s.attackMedian} ${ci(s.attackMedianCI, (v) => v.toFixed(0))} (per 1000 ${s.attackPer1000}), pieces median ${s.piecesMedian} ${ci(s.piecesMedianCI, (v) => v.toFixed(0))}, survival ${pct(s.survival)}, tetris/game median ${s.tetrisMedian} ${ci(s.tetrisMedianCI, (v) => v.toFixed(1))} (total ${s.tetrises}, share ${pct(s.tetrisLineShare)}), lines/1000 ${s.linesPer1000} [1/2/3/4: ${s.lineComposition.single}/${s.lineComposition.double}/${s.lineComposition.triple}/${s.lineComposition.tetris}], holes at death median ${s.holesAtDeathMedian ?? '—'}${s.holesAtDeathCI ? ` ${ci(s.holesAtDeathCI, (v) => v.toFixed(0))}` : ''} (in play ${s.holesMedianInPlay ?? '—'}), well runs ${s.wellRuns.count} (length median ${s.wellRuns.lengthMedian}, max ${s.wellRuns.lengthMax}, ended with tetris ${pct(s.wellRuns.endedWithTetris)}), garbage received ${s.garbageReceived}, ${s.msPerPiece} ms/piece`;

// ---------- DAgger 수집 ----------

// 현재 정책으로 플레이한 상태에 교사 라벨 → 직렬화 게임 목록 (deserialize 로 결정 복원). 게임 id 는 fromId 부터, 시드는 seedBase + k.
export async function daggerCollect(tp, { target = 2000, cap = 250, injector, fromId, seedBase, workers = DEFAULT_WORKERS, log = null }) {
  const t0 = performance.now();
  const games = [], stats = [];
  let count = 0, k = 0, batch = 0, perGame = cap / 2; // 게임당 결정 수 추정 (첫 배치는 워커 × 2 게임, 이후는 관측 평균)
  while (count < target) {
    const need = batch === 0 ? workers * 2 : Math.max(2, Math.ceil((target - count) / perGame * 1.2));
    const jobs = [];
    for (let j = 0; j < need; j += 2) {
      const n = Math.min(2, need - j);
      const seeds = Array.from({ length: n }, () => seedBase + k++);
      jobs.push({ type: 'play', seeds, ids: seeds.map((_, q) => fromId + games.length + j + q), cap, record: true, injector });
    }
    const tb = performance.now();
    const res = await tp.pool.run(jobs);
    for (const r of res) for (let q = 0; q < r.games.length; q++) { if (count >= target) break; const g = r.games[q]; g.id = fromId + games.length; games.push(g); stats.push(r.stats[q]); count += g.decisions.length; }
    perGame = Math.max(1, count / games.length);
    batch++;
    log?.(`  dagger batch ${batch}: ${games.length} games, ${count} decisions (${fmtMs(performance.now() - tb)})`);
  }
  const dec = stats.reduce((s, g) => s + g.decisions, 0);
  return {
    games, decisions: count, ms: Math.round(performance.now() - t0),
    stats: { games: games.length, decisions: dec, deadGames: stats.filter((g) => g.dead).length, decisionsMedian: median(stats.map((g) => g.decisions)), agreeWithTeacher: stats.reduce((s, g) => s + g.agree, 0) / Math.max(1, dec), attackPer1000: r3(1000 * stats.reduce((s, g) => s + g.attack, 0) / Math.max(1, stats.reduce((s, g) => s + g.pieces, 0))), tetrises: stats.reduce((s, g) => s + (g.tetris ?? 0), 0), garbageReceived: stats.reduce((s, g) => s + g.garbageReceived, 0) },
  };
}

// ---------- 체크포인트 ----------

export function ensureDir() { if (!existsSync(STAGE7_DIR)) mkdirSync(STAGE7_DIR, { recursive: true }); }
export function saveTheta(name, theta) { ensureDir(); writeFileSync(path.join(STAGE7_DIR, `${name}.theta.f64`), Buffer.from(theta.buffer, theta.byteOffset, theta.byteLength)); }
export function loadTheta(name, theta) {
  const f = path.join(STAGE7_DIR, `${name}.theta.f64`);
  if (!existsSync(f)) return false;
  const buf = readFileSync(f);
  if (buf.length !== theta.byteLength) throw new Error(`${f}: ${buf.length} bytes ≠ ${theta.byteLength}`);
  theta.set(new Float64Array(buf.buffer, buf.byteOffset, theta.length));
  return true;
}
export function saveJson(name, doc) { ensureDir(); writeFileSync(path.join(STAGE7_DIR, name), JSON.stringify(doc, null, 1) + '\n'); }
export function loadJson(name) { const f = path.join(STAGE7_DIR, name); return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null; }
export function saveGz(name, doc) { ensureDir(); writeFileSync(path.join(STAGE7_DIR, name), gzipSync(Buffer.from(JSON.stringify(doc)), { level: 6 })); }
export function loadGz(name) { const f = path.join(STAGE7_DIR, name); return existsSync(f) ? JSON.parse(gunzipSync(readFileSync(f)).toString()) : null; }

// 최종 모델 (8단계 웹·smoke 용): theta Float32 + 사양 json
export function saveModel(name, state, extra = {}) {
  ensureDir();
  const f32 = Float32Array.from(state.theta);
  writeFileSync(path.join(STAGE7_DIR, `${name}.model.bin`), Buffer.from(f32.buffer));
  const doc = { kind: state.kind, P: state.P, dtype: 'float32', file: `${name}.model.bin`, ...extra }; // extra.teacher = { ply, hold } 면 플레이 행동 집합 (hold 없음) 도 기록된다
  if (state.kind === 'sparse') Object.assign(doc, { spec: state.spec(), layout: { off: state.layout.off, sizes: state.layout.sizes }, mask: { N: state.mask.N, E: state.mask.E, nInput: state.mask.nInput, nOutput: state.mask.nOutput, rhoUnit: state.mask.rhoUnit, condition: state.mask.condition }, uNormalization: U_NORMALIZATION });
  else Object.assign(doc, { spec: state.spec() });
  writeFileSync(path.join(STAGE7_DIR, `${name}.model.json`), JSON.stringify(doc, null, 1) + '\n');
  return doc;
}
export function loadModel(name, connectome) {
  const doc = loadJson(`${name}.model.json`);
  if (!doc) return null;
  const buf = readFileSync(path.join(STAGE7_DIR, doc.file));
  const f32 = new Float32Array(buf.buffer, buf.byteOffset, doc.P);
  const theta = Float64Array.from(f32);
  if (doc.kind === 'sparse') {
    const mask = maskFor(connectome, doc.mask.condition.type, doc.mask.condition.seed ?? 0);
    const model = createSparseRNN(mask, theta, { T: doc.spec.T, lr: doc.spec.lr, hidden: doc.spec.hidden, dnMean: Float64Array.from(doc.spec.dnMean), dnStd: Float64Array.from(doc.spec.dnStd) });
    return { doc, model, mask, theta };
  }
  return { doc, model: createDenseMLP(theta, doc.spec.hidden), theta };
}
