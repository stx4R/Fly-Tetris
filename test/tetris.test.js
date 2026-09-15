import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ACTIONS, HEIGHT, PIECES, ROTATIONS, SHAPES, WIDTH,
  actionFromIndex, actionIndex, applyPlacement, boardFromString, boardToString, createBag, dropRow,
  emptyBoard, legalPlacements, pieceIndex,
} from '../src/tetris.js';
import { createRng } from '../src/prng.js';

const I = pieceIndex('I'), O = pieceIndex('O'), T = pieceIndex('T'), S = pieceIndex('S'), Z = pieceIndex('Z'), J = pieceIndex('J'), L = pieceIndex('L');

test('shapes: 7 pieces × 4 SRS states, 4 cells each, bounding boxes as expected', () => {
  assert.equal(SHAPES.length, 7);
  for (const s of SHAPES) {
    assert.equal(s.length, ROTATIONS);
    for (const r of s) assert.equal(r.cells.length, 4);
  }
  assert.deepEqual([SHAPES[I][0].w, SHAPES[I][0].h], [4, 1]);
  assert.deepEqual([SHAPES[I][1].w, SHAPES[I][1].h], [1, 4]);
  assert.deepEqual([SHAPES[O][0].w, SHAPES[O][0].h], [2, 2]);
  assert.deepEqual([SHAPES[T][0].w, SHAPES[T][0].h], [3, 2]);
  assert.deepEqual([SHAPES[T][1].w, SHAPES[T][1].h], [2, 3]);
  // T 스폰 상태: .X. / XXX
  assert.deepEqual(SHAPES[T][0].cells, [[1, 0], [0, 1], [1, 1], [2, 1]]);
  // S 상태 1: X. / XX / .X
  assert.deepEqual(SHAPES[S][1].cells, [[0, 0], [0, 1], [1, 1], [1, 2]]);
  // L 상태 3: XX / .X / .X
  assert.deepEqual(SHAPES[L][3].cells, [[0, 0], [1, 0], [1, 1], [1, 2]]);
});

test('legalPlacements: empty board counts per piece (10 - width + 1 per rotation)', () => {
  const board = emptyBoard();
  const expect = (p) => SHAPES[p].reduce((n, r) => n + (WIDTH - r.w + 1), 0);
  for (let p = 0; p < PIECES.length; p++) assert.equal(legalPlacements(board, p).length, expect(p), PIECES[p]);
  assert.equal(legalPlacements(board, I).length, 7 + 10 + 7 + 10);
  assert.equal(legalPlacements(board, O).length, 9 * 4);
  assert.equal(legalPlacements(board, T).length, 8 + 9 + 8 + 9);
});

test('applyPlacement: hard drop lands on the surface, board is not mutated', () => {
  const board = boardFromString(`
    ..........
    ......#...
    ###.......`);
  const before = new Uint8Array(board);
  const r = applyPlacement(board, O, 0, 0); // O 조각 열 0 → ### 위에 얹힘
  assert.deepEqual(board, before, 'input board unchanged');
  assert.equal(r.gameOver, false);
  assert.equal(r.linesCleared, 0);
  assert.equal(boardToString(r.board).split('\n').slice(-4).join('\n'), [
    '..........',
    '##........',
    '##....#...',
    '###.......',
  ].join('\n'));
  // 열 6 의 튀어나온 블록 위로 I 를 가로로 놓으면 그 위에 걸린다
  const r2 = applyPlacement(board, I, 4, 0);
  assert.equal(r2.landingRow, HEIGHT - 3);
  assert.equal(boardToString(r2.board).split('\n').slice(-3)[0], '....####..');
});

test('applyPlacement: line clear shifts rows down and counts eroded piece cells', () => {
  // 맨 아래 두 줄이 열 8,9 만 비어 있음. O 를 열 8 에 놓으면 2줄 클리어, 조각 4셀 전부 지워짐
  const board = boardFromString(`
    #.........
    ########..
    ########..`);
  const r = applyPlacement(board, O, 8, 0);
  assert.equal(r.linesCleared, 2);
  assert.equal(r.erodedPieceCells, 4);
  assert.equal(boardToString(r.board).split('\n').slice(-2).join('\n'), '..........\n#.........');
  assert.equal(r.board.reduce((a, b) => a + b, 0), 1);
});

test('applyPlacement: partial erosion — I vertical clearing one line keeps 3 cells', () => {
  const board = boardFromString(`
    #########.`);
  const r = applyPlacement(board, I, 9, 1);
  assert.equal(r.linesCleared, 1);
  assert.equal(r.erodedPieceCells, 1);
  const rows = boardToString(r.board).split('\n');
  assert.deepEqual(rows.slice(-3), ['.........#', '.........#', '.........#']);
});

test('game over: a placement that does not fit below the top row returns gameOver, and legalPlacements omits it', () => {
  const board = emptyBoard();
  for (let y = 1; y < HEIGHT; y++) for (let x = 0; x < WIDTH - 1; x++) board[y * WIDTH + x] = 1; // 19줄 높이 벽, 열 9 비움
  assert.equal(dropRow(board, O, 0, 0), -1);
  const r = applyPlacement(board, O, 0, 0);
  assert.equal(r.gameOver, true);
  assert.deepEqual(r.board, board);
  const legal = legalPlacements(board, O);
  assert.ok(!legal.some((p) => p.col === 0 && p.rot === 0));
  // 열 8-9 는 아직 가능 (열 9 가 비어 있어서 O 가 걸침 없이 못 들어가지만 top=... 확인)
  const legalI = legalPlacements(board, I);
  assert.deepEqual(legalI.filter((p) => p.rot === 1).map((p) => p.col), [9]); // 세로 I 는 열 9 에만
  const full = new Uint8Array(board).fill(1);
  for (let p = 0; p < PIECES.length; p++) assert.equal(legalPlacements(full, p).length, 0, 'no legal placement → game over');
});

test('applyPlacement: out-of-range column throws', () => {
  assert.throws(() => applyPlacement(emptyBoard(), I, 7, 0), RangeError);
  assert.throws(() => applyPlacement(emptyBoard(), O, -1, 0), RangeError);
});

test('7-bag: every 7 draws contain each piece exactly once; deterministic per seed', () => {
  const draw = (seed, n) => { const bag = createBag(createRng(seed)); return Array.from({ length: n }, () => bag.next()); };
  const seq = draw(3, 70);
  for (let i = 0; i < 70; i += 7) assert.deepEqual([...seq.slice(i, i + 7)].sort(), [0, 1, 2, 3, 4, 5, 6]);
  assert.deepEqual(draw(3, 70), seq);
  assert.notDeepEqual(draw(4, 70), seq);
  // 긴 시퀀스에서 분포는 정확히 균등
  const long = draw(11, 7000);
  const counts = new Array(7).fill(0);
  for (const p of long) counts[p]++;
  assert.deepEqual(counts, new Array(7).fill(1000));
});

test('action index round-trips over all 40 actions', () => {
  const seen = new Set();
  for (let col = 0; col < WIDTH; col++) for (let rot = 0; rot < ROTATIONS; rot++) {
    const a = actionIndex(col, rot);
    assert.deepEqual(actionFromIndex(a), { col, rot });
    seen.add(a);
  }
  assert.equal(seen.size, ACTIONS);
});

test('prng: deterministic, in [0,1), roughly uniform', () => {
  const a = createRng(99), b = createRng(99);
  for (let i = 0; i < 1000; i++) assert.equal(a.next(), b.next());
  const r = createRng(5);
  let sum = 0;
  const buckets = new Array(10).fill(0);
  for (let i = 0; i < 100000; i++) { const x = r.next(); assert.ok(x >= 0 && x < 1); sum += x; buckets[Math.floor(x * 10)]++; }
  assert.ok(Math.abs(sum / 100000 - 0.5) < 0.01);
  for (const c of buckets) assert.ok(Math.abs(c - 10000) < 500, `bucket ${c}`);
  const z = createRng(0);
  assert.ok(z.next() !== z.next());
});
