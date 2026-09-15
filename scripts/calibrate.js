#!/usr/bin/env node
// (g, k) 격자 탐색. 각 점에서 무작위 보드 200개를 넣고 5개 지표를 재고, 전 목표를 만족하는 점 중
// 분리도 최대를 골라 data/calibration.json 에 저장한다. 격자 전체 결과도 같이 저장한다.
//
// 만족하는 점이 없으면 selected = null 로 저장하고 exit 1. 이때 fallback 으로 "발화율 범위와 포화 상한
// (동역학이 정상인지 보는 하드 제약) 을 만족하는 점 중 분리도 최대" 를 따로 적어 두는데, 이는 smoke-run 이
// 돌아가게 하기 위한 표시일 뿐 목표를 맞춘 것이 아니다. 하드 제약을 만족하는 점조차 없으면 만족한 목표 수
// 최다 → 분리도 최대 순.

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseConnectome } from '../src/connectome.js';
import { createEncoder, G_IN, SIGMA } from '../src/encode.js';
import { LIF, WINDOW } from '../src/reservoir.js';
import { TARGETS, evaluatePoint, generateBoards, meetsTargets } from '../src/calibration.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'data', 'calibration.json');

const GRID = {
  g: [0, 0.02, 0.03, 0.05, 0.07, 0.085, 0.1, 0.12, 0.15, 0.2],
  k: [0, 1, 2, 5, 10, 20, 50],
};
const BOARDS = 200;
const SEED = 2026;

const targetsMet = (m) => {
  const [lo, hi] = TARGETS.meanRateHz;
  return [
    m.meanRateHz >= lo && m.meanRateHz <= hi,
    m.saturatedFrac < TARGETS.saturatedFrac,
    m.activeFrac > TARGETS.activeFrac,
    m.rank > TARGETS.rank,
  ].filter(Boolean).length;
};

function main() {
  const connectome = parseConnectome(readFileSync(path.join(ROOT, 'data', 'connectome.json'), 'utf8'));
  const encoder = createEncoder(connectome);
  const boards = generateBoards(BOARDS, { seed: SEED });
  const iExts = boards.map((b) => encoder.encode(b.board, b.piece));
  const filled = boards.reduce((s, b) => s + b.board.reduce((a, v) => a + v, 0), 0) / BOARDS;
  console.log(`${BOARDS} boards (seed ${SEED}, mean ${filled.toFixed(1)} filled cells), window ${WINDOW} steps, G_IN ${G_IN}`);
  console.log(`grid: g ∈ {${GRID.g.join(', ')}} × k ∈ {${GRID.k.join(', ')}} = ${GRID.g.length * GRID.k.length} points\n`);
  console.log('g\tk\tmeanHz\tactive%\tsat20%\tceil15%\tsep\trank\tDNact\tms/win\tmet');

  const grid = [];
  for (const g of GRID.g) {
    for (const k of GRID.k) {
      const m = evaluatePoint(connectome, iExts, { g, k });
      m.targetsMet = targetsMet(m);
      m.ok = meetsTargets(m);
      grid.push(m);
      console.log([
        g, k, m.meanRateHz.toFixed(2), (m.activeFrac * 100).toFixed(1), (m.saturatedFrac * 100).toFixed(2),
        (m.ceilingFrac * 100).toFixed(2), m.separation.toFixed(3), m.rank, m.dnEverActive, m.msPerWindow.toFixed(2),
        `${m.targetsMet}/4${m.ok ? ' OK' : ''}`,
      ].join('\t'));
    }
  }

  const feasible = grid.filter((m) => m.ok);
  const bySeparation = (a, b) => b.separation - a.separation || a.g - b.g || a.k - b.k;
  const selected = feasible.length ? [...feasible].sort(bySeparation)[0] : null;
  const [lo, hi] = TARGETS.meanRateHz;
  const sane = grid.filter((m) => m.meanRateHz >= lo && m.meanRateHz <= hi && m.saturatedFrac < TARGETS.saturatedFrac);
  const fallback = selected ? null
    : sane.length ? [...sane].sort(bySeparation)[0]
      : [...grid].sort((a, b) => b.targetsMet - a.targetsMet || bySeparation(a, b))[0];

  const out = {
    calibratedAt: new Date().toISOString(),
    protocol: {
      boards: BOARDS, seed: SEED, window: WINDOW, sequential: true,
      note: '리셋 한 번 후 보드를 순서대로 연속 구동 (플레이와 동일). 지표는 각 창의 발화 수로 계산.',
      encoder: { G_IN, sigma: SIGMA },
      lif: LIF,
    },
    targets: TARGETS,
    grid,
    selected,
    fallback,
  };
  writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');

  console.log(`\nfeasible points: ${feasible.length}/${grid.length}`);
  if (selected) {
    console.log(`selected g=${selected.g} k=${selected.k}: mean ${selected.meanRateHz.toFixed(2)} Hz, active ${(selected.activeFrac * 100).toFixed(1)}%, `
      + `saturated ${(selected.saturatedFrac * 100).toFixed(2)}%, separation ${selected.separation.toFixed(3)}, rank ${selected.rank}`);
    console.log(`wrote ${path.relative(ROOT, OUT)}`);
    return;
  }
  console.error('\nNO (g, k) satisfies all targets. selected = null.');
  console.error(`fallback (rate band + saturation OK, then max separation; targets met ${fallback.targetsMet}/4): g=${fallback.g} k=${fallback.k} — `
    + `mean ${fallback.meanRateHz.toFixed(2)} Hz, active ${(fallback.activeFrac * 100).toFixed(1)}%, separation ${fallback.separation.toFixed(3)}, rank ${fallback.rank}`);
  console.error(`wrote ${path.relative(ROOT, OUT)} (grid + fallback only)`);
  process.exit(1);
}

main();
