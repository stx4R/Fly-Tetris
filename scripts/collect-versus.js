#!/usr/bin/env node
// 대전 결정 데이터 수집 (6단계) → data/versus-decisions.json.gz
// 공격형 교사(data/teacher-attack.json, scored 모드: 후보 전체에 깊이 3·폭 8 하위 빔 값)로 hold·next 5·가비지가 있는 상태에서 플레이하며
// 결정마다 상태 · 후보 전체 · 교사 점수 · 교사 선택을 기록한다. 목표 40,000 결정. 게임 단위 60/20/20 분할 + 누수 검사.
// 인공 가비지: 조각마다 확률 rate 로 1–4 줄 주입 (실제 대전 분포 근사) — 주입률은 meta.garbage 에 기록.
// 상태 방문: 교사 선택 (1−ε) / 무작위 후보 ε. 라벨은 늘 교사의 것.
//
// 옵션: --target N(결정 수) --cap N(게임당 결정 상한) --epsilon F --garbage-rate F --workers N --quick

import os from 'node:os';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPool } from './pool.js';
import { assertNoLeak, serialize, splitByGame } from '../src/versus-data.js';
import { DEFAULT_PARAMS } from '../src/teacher-attack.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'data', 'versus-decisions.json.gz');
const TEACHER = path.join(ROOT, 'data', 'teacher-attack.json');

const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? Number(argv[i + 1]) : def; };
const quick = argv.includes('--quick');
const CFG = {
  seed: 6060, splitSeed: 5,
  target: opt('target', quick ? 400 : 40000),
  cap: opt('cap', quick ? 40 : 250),             // 게임당 기록 결정 상한 (게임 단위 분할에 게임 수를 충분히 하기 위해)
  epsilon: opt('epsilon', 0.1),
  garbage: { rate: opt('garbage-rate', 0.08), dist: [0.4, 0.3, 0.15, 0.15] }, // 조각당 주입 확률, 줄 수 1–4 분포
  workers: opt('workers', Math.max(1, Math.min(12, os.cpus().length - 2))),
  depth: 3, width: 8,
};
const fmtMs = (ms) => (ms < 60000 ? `${(ms / 1000).toFixed(0)} s` : `${(ms / 60000).toFixed(1)} min`);

async function main() {
  const t0 = performance.now();
  let params = DEFAULT_PARAMS, teacherSource = 'DEFAULT_PARAMS (data/teacher-attack.json 없음)';
  if (existsSync(TEACHER)) { const t = JSON.parse(readFileSync(TEACHER, 'utf8')); params = t.params; teacherSource = `data/teacher-attack.json (tuned ${t.tunedAt})`; }
  console.log(`teacher: ${teacherSource}; scored beam depth ${CFG.depth} width ${CFG.width}; target ${CFG.target} decisions, cap ${CFG.cap}/game, ε ${CFG.epsilon}, garbage rate ${CFG.garbage.rate}/piece; ${CFG.workers} workers`);
  const pool = createPool(new URL('./teacher-worker.js', import.meta.url), CFG.workers);
  await pool.ready;

  const games = [];
  let count = 0, batch = 0;
  const gamesPerJob = 2;
  while (count < CFG.target) {
    // 부족분에 맞춰 게임 수를 던진다 (게임이 일찍 죽을 수 있어 여유 20%)
    const need = Math.ceil((CFG.target - count) / CFG.cap * 1.2) + CFG.workers;
    const jobs = [];
    for (let j = 0; j < need; j += gamesPerJob) {
      const gameSeeds = Array.from({ length: Math.min(gamesPerJob, need - j) }, (_, k) => CFG.seed + games.length * 1000 + (batch * 100000) + j + k);
      jobs.push({ type: 'collect', params, gameSeeds, cap: CFG.cap, epsilon: CFG.epsilon, garbage: CFG.garbage, depth: CFG.depth, width: CFG.width });
    }
    const tb = performance.now();
    const results = (await pool.run(jobs)).flat();
    for (const g of results) { if (count >= CFG.target) break; g.id = games.length; games.push(g); count += g.decisions.length; }
    batch++;
    console.log(`batch ${batch}: ${games.length} games, ${count} decisions (${fmtMs(performance.now() - tb)})`);
  }
  await pool.close();

  const ids = games.map((g) => g.id);
  const split = splitByGame(ids, { seed: CFG.splitSeed });
  assertNoLeak(split, ids);
  const injectedLines = games.reduce((s, g) => s + g.injectedLines, 0), pieces = games.reduce((s, g) => s + g.pieces, 0);
  const withGarbage = games.reduce((s, g) => s + g.decisions.filter((d) => d.garbage.length > 0).length, 0);
  const garbageOnBoard = games.reduce((s, g) => s + g.decisions.filter((d) => d.received > 0).length, 0);
  const meta = {
    ...CFG, teacher: { source: teacherSource, params, search: { depth: CFG.depth, width: CFG.width }, mode: 'scored' },
    garbage: { ...CFG.garbage, injectedLines, injectedEvents: games.reduce((s, g) => s + g.injectedEvents, 0), linesPerPiece: injectedLines / pieces, decisionsWithPendingGarbage: withGarbage, decisionsAfterReceivingGarbage: garbageOnBoard },
    pieces, deadGames: games.filter((g) => g.dead).length, collectedAt: new Date().toISOString(),
    labels: 'value = 교사(scored beam) 후보 값, chosen = argmax, taken = 실제 둔 후보 (ε 탐색)',
  };
  const doc = serialize(games, split, meta);
  const json = JSON.stringify(doc);
  writeFileSync(OUT, gzipSync(Buffer.from(json), { level: 6 }));
  const m = doc.meta;
  const per = (part) => games.filter((g) => split[part].includes(g.id)).reduce((s, g) => s + g.decisions.length, 0);
  console.log(`\n${m.games} games, ${m.decisions} decisions, ${m.candidates} candidates (${(m.candidates / m.decisions).toFixed(1)}/decision), ${pieces} pieces, dead games ${meta.deadGames}  (${fmtMs(performance.now() - t0)})`);
  console.log(`split by game: train ${split.train.length} games / ${per('train')} decisions, val ${split.val.length} / ${per('val')}, test ${split.test.length} / ${per('test')} — leak check passed`);
  console.log(`garbage: injected ${injectedLines} lines in ${meta.garbage.injectedEvents} events = ${meta.garbage.linesPerPiece.toFixed(3)} lines/piece (rate ${CFG.garbage.rate}); decisions with pending garbage ${withGarbage} (${(100 * withGarbage / m.decisions).toFixed(1)}%), after having received garbage ${garbageOnBoard} (${(100 * garbageOnBoard / m.decisions).toFixed(1)}%)`);
  const chosenIsTaken = games.reduce((s, g) => s + g.decisions.filter((d) => d.chosen === d.taken).length, 0);
  const tspins = games.reduce((s, g) => s + g.stats.tspin, 0), tetris = games.reduce((s, g) => s + g.stats.tetris, 0), attack = games.reduce((s, g) => s + g.stats.attack, 0);
  console.log(`teacher choice taken ${(100 * chosenIsTaken / m.decisions).toFixed(1)}%; attack ${attack} (${(1000 * attack / pieces).toFixed(0)}/1000 pieces incl. exploration), tetrises ${tetris}, T-spins ${tspins}`);
  console.log(`wrote ${path.relative(ROOT, OUT)} (${(json.length / 1e6).toFixed(1)} MB json → ${(readFileSync(OUT).length / 1e6).toFixed(1)} MB gz)`);
}

main().catch((err) => { console.error(err); process.exit(2); });
