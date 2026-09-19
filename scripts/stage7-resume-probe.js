#!/usr/bin/env node
// 에폭 체크포인트/재개 검증용 프로브 (test/stage7.test.js 가 자식 프로세스로 띄우고 중간에 강제 종료한다).
// 실제 데이터·커넥톰 없이 작은 커넥톰(13 뉴런) + 합성 결정으로 stage7-lib 의 trainRound 를 돈다 — 워커 풀·체크포인트 경로는 본 학습과 같다.
// 옵션: --name NAME (체크포인트 이름, data/stage7/{NAME}.epoch.*) --epochs N --slow MS (스텝마다 대기 — 에폭 중간 종료 유도) --lambda F --no-checkpoint
// 산출: data/stage7/{NAME}.probe.json { history, best, adamT, thetaSum, mSum, vSum, thetaEqualsBest, resumedFrom, ignored }

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { buildMask } from '../src/sparse-rnn.js';
import { createRng } from '../src/prng.js';
import { HYPER } from '../src/stage7-train.js';
import { U_DIM, createPool } from '../src/stage7-data.js';
import { createSparseState, calibrateState, createTrainingPool, trainRound, STAGE7_DIR } from './stage7-lib.js';

const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? argv[i + 1] : def; };
const CFG = { name: opt('name', 'probe-resume'), epochs: Number(opt('epochs', 3)), slow: Number(opt('slow', 0)), lambda: Number(opt('lambda', 0)), checkpoint: !argv.includes('--no-checkpoint') };

function tinyConnectome(seed = 9, E = 40) {
  const rng = createRng(seed);
  const neurons = [];
  for (let i = 0; i < 6; i++) neurons.push({ id: i, type: 'LC1', layer: 'input', roi: 'LO(R)', isKC: false });
  for (let i = 0; i < 10; i++) neurons.push({ id: 10 + i, type: 'H', layer: 'hidden', roi: 'SMP(R)', isKC: false });
  for (let i = 0; i < 4; i++) neurons.push({ id: 20 + i, type: 'DNp01', layer: 'output', roi: 'GNG', isKC: false });
  const N = neurons.length, edges = [], seen = new Set();
  while (edges.length < E) {
    const a = rng.int(N), b = rng.int(N);
    if (a === b || seen.has(a * N + b)) continue;
    if (neurons[b].layer === 'input' && rng.next() < 0.7) continue;
    seen.add(a * N + b); edges.push([a, b, 3 + rng.int(10)]);
  }
  return { meta: { condition: { type: 'C0' } }, neurons, edges: edges.sort((x, y) => x[0] - y[0] || x[1] - y[1]) };
}

async function main() {
  const mask = buildMask(tinyConnectome());
  const hyper = { ...HYPER, T: 4, hidden: 5, dropoutZ: 0, dropoutH: 0 }; // 결정적 (드롭아웃 없음) — 재개 전후 비교용
  const state = createSparseState(mask, hyper);
  const rng = createRng(3);
  const K = 4, nTrain = 64, nVal = 16;
  const pool = createPool((nTrain + nVal) * K);
  const item = (rows) => ({ rows: Int32Array.from(rows), chosen: 0, values: rows.map((_, k) => 10 - k + rng.uniform(-0.5, 0.5)), subset: true });
  const items = (n) => Array.from({ length: n }, () => { const rows = []; for (let k = 0; k < K; k++) { for (let q = 0; q < U_DIM; q++) pool.U[pool.used * U_DIM + q] = rng.next() < 0.3 ? 1 : 0; rows.push(pool.used++); } return item(rows); });
  const ds = { pool, train: items(nTrain), val: items(nVal), test: [], K, negatives: 'mixed', hard: 3, valueScale: 5, gameSeeds: [], meta: {} };
  calibrateState(state, ds, 32);
  const tp = await createTrainingPool(state, ds, { workers: 2 });
  let resumedFrom = null, ignored = false;
  const slowPool = CFG.slow > 0 ? { ...tp, pool: { ...tp.pool, run: async (jobs, cb) => { const r = await tp.pool.run(jobs, cb); if (jobs[0]?.type === 'grad') await new Promise((res) => setTimeout(res, CFG.slow)); return r; } } } : tp;
  const r = await trainRound(slowPool, state, ds, { maxEpochs: CFG.epochs, patience: 99, batch: 32, lambda: CFG.lambda, checkpoint: CFG.checkpoint ? CFG.name : null, seed: 5, log: (h) => { if (h.resumed) resumedFrom = h.epoch; if (h.message?.includes('ignored')) ignored = true; if (h.val !== undefined) console.log(`epoch ${h.epoch} val ${h.val.toFixed(6)}`); if (h.message) console.log(h.message); } });
  await tp.close();
  const sum = (a) => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * (1 + (i % 7)); return s; };
  let thetaEqualsBest = null;
  const bestFile = path.join(STAGE7_DIR, `${CFG.name}.epoch.best.f64`);
  if (existsSync(bestFile)) { const b = readFileSync(bestFile); const bt = new Float64Array(b.buffer.slice(b.byteOffset, b.byteOffset + b.length)); thetaEqualsBest = bt.length === state.theta.length && state.theta.every((v, i) => v === bt[i]); }
  const out = { name: CFG.name, epochs: r.epochs, history: r.history.map((h) => ({ epoch: h.epoch, val: h.val, train: h.train })), best: r.best, steps: r.steps, adamT: r.adam.t, thetaSum: sum(state.theta), mSum: sum(r.adam.m), vSum: sum(r.adam.v), thetaEqualsBest, resumedFrom, ignored };
  writeFileSync(path.join(STAGE7_DIR, `${CFG.name}.probe.json`), JSON.stringify(out) + '\n');
  console.log(JSON.stringify(out));
}

main().catch((err) => { console.error(err); process.exit(2); });
