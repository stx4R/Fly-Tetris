#!/usr/bin/env node
// afterstate 데이터 수집 → data/afterstates.json. 목표 30,000 afterstate, 게임 단위 60/20/20 분할, 누수 검사.

import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertNoLeak, collectAfterstates, serialize, splitByGame } from '../src/afterstate.js';
import { parseConfig } from './experiment-config.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'data', 'afterstates.json');

function main() {
  const cfg = parseConfig().collect;
  const t0 = performance.now();
  let games = collectAfterstates(cfg);
  let count = () => games.reduce((s, g) => s + g.decisions.reduce((t, d) => t + d.candidates.length, 0), 0);
  // 목표에 못 미치면 게임을 더 돈다 (시드 이어서)
  let extra = 0;
  while (count() < cfg.target) {
    extra++;
    const more = collectAfterstates({ ...cfg, games: 5, seed: cfg.seed + 1000 * extra });
    more.forEach((g) => { g.id = games.length; games.push(g); });
  }
  const ids = games.map((g) => g.id);
  const split = splitByGame(ids, { seed: cfg.splitSeed });
  assertNoLeak(split, ids);
  const doc = serialize(games, split, { ...cfg, collectedAt: new Date().toISOString() });
  writeFileSync(OUT, JSON.stringify(doc) + '\n');
  const m = doc.meta;
  const perSplit = (part) => games.filter((g) => split[part].includes(g.id)).reduce((s, g) => s + g.decisions.reduce((t, d) => t + d.candidates.length, 0), 0);
  console.log(`${m.games} games, ${m.decisions} decisions, ${m.afterstates} afterstates (${((performance.now() - t0) / 1000).toFixed(1)} s)`);
  console.log(`split by game: train ${split.train.length} games / ${perSplit('train')} afterstates, val ${split.val.length} / ${perSplit('val')}, test ${split.test.length} / ${perSplit('test')} — leak check passed`);
  const dead = games.filter((g) => g.decisions.length < cfg.decisionsPerGame).length;
  const filled = games.flatMap((g) => g.decisions.map((d) => d.board.reduce((a, v) => a + v, 0)));
  console.log(`games ended early: ${dead}; filled cells at decisions: mean ${(filled.reduce((a, b) => a + b, 0) / filled.length).toFixed(1)}, max ${Math.max(...filled)}`);
  console.log(`wrote ${path.relative(ROOT, OUT)}`);
}

main();
