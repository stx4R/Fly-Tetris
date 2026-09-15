import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  WEIGHTS, bestPlacement, columnTransitions, cumulativeWells, evaluatePlacement, holes, rowTransitions,
} from '../src/heuristic.js';
import { boardFromString, emptyBoard, pieceIndex } from '../src/tetris.js';

const I = pieceIndex('I'), O = pieceIndex('O'), T = pieceIndex('T');

test('rowTransitions counts wall boundaries: empty row = 2, full row = 0', () => {
  assert.equal(rowTransitions(emptyBoard()), 2 * 20);
  const oneFull = boardFromString('##########');
  assert.equal(rowTransitions(oneFull), 2 * 19);
  // #.#.#.#.#. : 벽#→# 0, 셀 간 전환 9, 마지막 . →벽# 1 = 10
  const alt = boardFromString('#.#.#.#.#.');
  assert.equal(rowTransitions(alt), 2 * 19 + 10);
  assert.equal(holes(emptyBoard()), 0);
  assert.equal(cumulativeWells(emptyBoard()), 0);
});

test('columnTransitions: floor counts as filled, ceiling as empty', () => {
  assert.equal(columnTransitions(emptyBoard()), 10);
  // 열 0 에 블록 하나 (바닥): 천장빈→…→# 1 전환, #→바닥# 0 → 그 열은 1. 나머지 9 열도 1 씩 → 10
  assert.equal(columnTransitions(boardFromString('#.........')), 10);
  // 열 0: # 위 . 위 # → 천장→. 0, .→# 1, #→. 1, .→# 1, #→바닥 0 = 3
  const b = boardFromString(`
    #.........
    ..........
    #.........`);
  assert.equal(columnTransitions(b), 3 + 9);
});

test('holes: empty cells under a filled cell in the same column', () => {
  const b = boardFromString(`
    ###.......
    #.#.......
    #.........`);
  // 열 0: 없음. 열 1: 행 2,3 비어 있고 위에 # → 2. 열 2: 행 3 → 1. 총 3
  assert.equal(holes(b), 3);
});

test('cumulativeWells: depth d well contributes 1+2+…+d', () => {
  // 열 0 이 깊이 3 우물 (오른쪽 열 1 이 3 높이, 왼쪽은 벽)
  const b = boardFromString(`
    .#........
    .#........
    .#........`);
  // 행 17: 우물셀, 아래로 빈 셀 3 (행 17,18,19) → 3; 행 18: 2; 행 19: 1 → 6.
  // 열 2: 왼쪽 # 오른쪽 . → 우물 아님. 열 9: 오른쪽 벽, 왼쪽 열 8 빈 → 아님
  assert.equal(cumulativeWells(b), 6);
  // 양쪽이 채워진 1칸 우물
  const c = boardFromString('#.#.......');
  // 열 1 행 19: 좌 #, 우 # → 아래로 빈 셀 1 → 1. 열 3: 좌 #, 우 . → 아님
  assert.equal(cumulativeWells(c), 1);
});

test('evaluatePlacement: features and score for a concrete placement', () => {
  const board = boardFromString(`
    #########.`);
  // 세로 I 를 열 9 에: 1 줄 지움, 조각 1 셀 지워짐 → eroded = 1*1 = 1.
  // 착지: 행 16..19, h=4 → landingHeight = 20 - 16 - 0.5 - 1.5 = 2.0
  // 결과 보드: 열 9 에 3 셀 (행 17..19)
  const e = evaluatePlacement(board, I, 9, 1);
  assert.deepEqual(e.features, {
    landingHeight: 2,
    erodedPieceCells: 1,
    rowTransitions: 2 * 17 + 3 * 2, // 빈 행 17개 × 2, 열 9 만 채워진 행 3개 × (벽#→. 1, .→# 1, #→벽# 0) = 2
    columnTransitions: 10,           // 열 9: 천장→. 0 … .→# 1, #→바닥 0 = 1; 나머지 9열 1 씩
    holes: 0,
    cumulativeWells: 0,              // 열 8 행 17..19: 좌 . → 우물 아님
  });
  const expected = Object.keys(WEIGHTS).reduce((s, k) => s + WEIGHTS[k] * e.features[k], 0);
  assert.ok(Math.abs(e.score - expected) < 1e-9);
});

test('bestPlacement prefers clearing a line over creating holes', () => {
  const board = boardFromString(`
    #########.`);
  const best = bestPlacement(board, I);
  assert.deepEqual([best.col, best.rot % 2], [9, 1]);
  assert.equal(best.linesCleared, 1);
  // 빈 보드에서 O 는 바닥 어딘가 (landingHeight 최소) — 홀·우물 없이
  const o = bestPlacement(emptyBoard(), O);
  assert.equal(o.features.landingHeight, 1);
  assert.equal(o.features.holes, 0);
});

test('bestPlacement returns null when nothing is legal', () => {
  const full = new Uint8Array(200).fill(1);
  assert.equal(bestPlacement(full, T), null);
});
