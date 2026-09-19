#!/usr/bin/env node
// 7단계 사망 원인 분류 (게이트 미달 보고용). 학습된 C0 로 게이트와 같은 20 게임(시드 50000+, 1000 조각, 가비지 0.08/조각)을 다시 돌려 배치마다
// [높이, 구멍, 우물 깊이, 누적 가비지, 지운 줄] 을 기록하고, 사망 시점의 지배 요인을 규칙으로 분류한다:
//   garbage   마지막 40 조각의 가비지 수신 ≥ 10 줄, 또는 그 수신이 사망 시 높이의 절반 이상
//   well-fill 마지막 30 조각 안에 우물 깊이 ≥ 3 이 있다가 사망 전 0–1 로 메워짐 (높이 ≥ 12 상태에서)
//   holes     사망 시 구멍 ≥ 6 이고 마지막 40 조각 동안 구멍이 ≥ 4 늘었음
//   stack     그 외 (구멍·가비지 없이 스택 자체가 높아짐)
// 우선순위 garbage > well-fill > holes > stack. 결과 → data/stage7/c0-deaths.json + 표.
// 옵션: --model c0 --games N --workers N

import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { HYPER } from '../src/stage7-train.js';
import { median, mean } from '../src/evaluate.js';
import { buildDataset, createSparseState, createTrainingPool, DEFAULT_WORKERS, fmtMs, loadInputs, loadModel, maskFor, STAGE7_DIR, variantOf } from './stage7-lib.js';

const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? argv[i + 1] : def; };
const name = opt('model', 'c0'), games = Number(opt('games', 20)), workers = Number(opt('workers', DEFAULT_WORKERS));

export function classifyDeath(trace) {
  const n = trace.length;
  if (!n) return { cause: 'none' };
  const at = (i) => trace[Math.max(0, Math.min(n - 1, i))];
  const last = at(n - 1), back40 = at(n - 41), back30 = n - 31;
  const height = last[0], holes = last[1], garbage40 = last[3] - back40[3], holes40 = holes - back40[1];
  let maxWell = 0, wellFilled = false;
  for (let i = Math.max(0, back30); i < n; i++) maxWell = Math.max(maxWell, trace[i][2]);
  if (maxWell >= 3) { for (let i = Math.max(0, back30); i < n; i++) if (trace[i][2] >= 3) { for (let j = i + 1; j < n; j++) if (trace[j][2] <= 1 && trace[j][0] >= 12) { wellFilled = true; break; } if (wellFilled) break; } }
  const cause = garbage40 >= 10 || garbage40 >= height / 2 ? 'garbage' : wellFilled ? 'well-fill' : holes >= 6 && holes40 >= 4 ? 'holes' : 'stack';
  return { cause, height, holes, holes40, garbage40, maxWell30: maxWell, wellFilled, pieces: n };
}

async function main() {
  const t0 = performance.now();
  const loaded = loadModel(name, loadInputs({ data: false }).connectome);
  if (!loaded) { console.error(`data/stage7/${name}.model.json 없음`); process.exit(1); }
  const { connectome, teacher, data, garbage } = loadInputs({ variant: loaded.doc.teacher?.variant ?? variantOf(argv) }); // 모델이 학습된 교사 변형 (hold 후보 집합도 같이 맞춰진다)
  const ds = buildDataset(data, { trainDecisions: 64, valDecisions: 16 });
  const state = createSparseState(maskFor(connectome, loaded.doc.mask.condition.type, loaded.doc.mask.condition.seed ?? 0), { ...HYPER, dropoutZ: 0, dropoutH: 0 });
  state.theta.set(loaded.theta); state.model.dnMean.set(loaded.doc.spec.dnMean); state.model.dnStd.set(loaded.doc.spec.dnStd);
  const tp = await createTrainingPool(state, ds, { workers, teacher });
  const seeds = Array.from({ length: games }, (_, k) => 50000 + k);
  const res = (await tp.pool.run(seeds.map((seed) => ({ type: 'play', seeds: [seed], cap: 1000, record: false, injector: garbage, trace: true })))).flat();
  await tp.close();
  const rows = res.map((g) => ({ seed: g.seed, pieces: g.pieces, dead: g.dead, tetris: g.tetris, attack: g.attack, garbage: g.garbageReceived, ...classifyDeath(g.trace), wellRuns: g.wellRuns.map((r) => r.length), maxHeightTrace: Math.max(...g.trace.map((t) => t[0])), holesTrace: { median: median(g.trace.map((t) => t[1])), max: Math.max(...g.trace.map((t) => t[1])) } }));
  const counts = {};
  for (const r of rows) counts[r.cause] = (counts[r.cause] ?? 0) + 1;
  console.log(`${'seed'.padEnd(6)} ${'pieces'.padStart(6)} ${'cause'.padEnd(10)} ${'height'.padStart(6)} ${'holes'.padStart(5)} ${'Δholes40'.padStart(8)} ${'garb40'.padStart(6)} ${'garb'.padStart(5)} ${'well30'.padStart(6)} ${'filled'.padEnd(6)} ${'tetris'.padStart(6)} ${'attack'.padStart(6)}  holes(med/max)`);
  for (const r of rows) console.log(`${String(r.seed).padEnd(6)} ${String(r.pieces).padStart(6)} ${r.cause.padEnd(10)} ${String(r.height).padStart(6)} ${String(r.holes).padStart(5)} ${String(r.holes40).padStart(8)} ${String(r.garbage40).padStart(6)} ${String(r.garbage).padStart(5)} ${String(r.maxWell30).padStart(6)} ${String(r.wellFilled).padEnd(6)} ${String(r.tetris).padStart(6)} ${String(r.attack).padStart(6)}  ${r.holesTrace.median}/${r.holesTrace.max}`);
  console.log(`\ncauses: ${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(', ')}; holes at death median ${median(rows.map((r) => r.holes))}, garbage in last 40 pieces median ${median(rows.map((r) => r.garbage40))}, total garbage/game median ${median(rows.map((r) => r.garbage))}; mean holes over play ${mean(rows.map((r) => r.holesTrace.median)).toFixed(1)}`);
  writeFileSync(path.join(STAGE7_DIR, `${name}-deaths.json`), JSON.stringify({ ranAt: new Date().toISOString(), model: name, games, counts, rows }, null, 1) + '\n');
  console.log(`wrote data/stage7/${name}-deaths.json (${fmtMs(performance.now() - t0)})`);
}

if (process.argv[1] && /stage7-deaths\.js$/.test(process.argv[1])) main().catch((err) => { console.error(err); process.exit(2); });
