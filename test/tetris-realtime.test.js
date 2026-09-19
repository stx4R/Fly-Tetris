// 8단계 실시간 조작 API 검증.
// 핵심 불변식: **사람이 셀 단위로 움직여 도달할 수 있는 배치 집합 = 초파리가 후보로 보는 배치 집합**.
// 사람 쪽(kinematics)과 초파리 쪽(reachablePlacements)이 다른 규칙을 쓰면 대전이 공정하지 않으므로,
// 새 API(pieceFits · rotateWithKick · isResting · boxToPlacement)만으로 BFS 한 결과가
// reachablePlacements 와 같은 집합인지 확인한다.

import test from 'node:test';
import assert from 'node:assert/strict';
import { createRng } from '../src/prng.js';
import {
  BUFFER, HEIGHT, PIECES, WIDTH,
  boxToPlacement, emptyBoard, hardDropBox, isResting, pieceCells, pieceFits,
  reachablePlacements, rotateWithKick, spawnPiece,
} from '../src/tetris.js';

// 새 API 만 써서 도달 가능한 정지 배치를 모은다 (엔진의 스카이라인 최적화를 쓰지 않는 순수 BFS).
function bfsPlacements(board, piece) {
  const start = spawnPiece(board, piece);
  if (!start) return [];
  const key = (rot, bx, by) => `${rot}:${bx}:${by}`;
  const seen = new Set([key(start.rot, start.bx, start.by)]);
  const queue = [start];
  const out = new Set();
  while (queue.length) {
    const s = queue.pop();
    const push = (rot, bx, by) => { const k = key(rot, bx, by); if (!seen.has(k)) { seen.add(k); queue.push({ rot, bx, by }); } };
    if (pieceFits(board, piece, s.rot, s.bx - 1, s.by)) push(s.rot, s.bx - 1, s.by);
    if (pieceFits(board, piece, s.rot, s.bx + 1, s.by)) push(s.rot, s.bx + 1, s.by);
    if (pieceFits(board, piece, s.rot, s.bx, s.by + 1)) push(s.rot, s.bx, s.by + 1);
    for (const to of [(s.rot + 1) & 3, (s.rot + 3) & 3]) {
      const r = rotateWithKick(board, piece, s.rot, to, s.bx, s.by);
      if (r) push(r.rot, r.bx, r.by);
    }
    if (isResting(board, piece, s.rot, s.bx, s.by)) {
      const p = boxToPlacement(piece, s.rot, s.bx, s.by);
      if (!p.lockOut) out.add(`${p.rot}:${p.col}:${p.top}`);
    }
  }
  return [...out].sort();
}

const engineSet = (board, piece) => [...new Set(reachablePlacements(board, piece).map((p) => `${p.rot}:${p.col}:${p.top}`))].sort();

// 바닥부터 fillRows 줄을 구멍 있는 무작위 줄로 채운다 (가비지 비슷한 실제 보드)
function randomBoard(rng, fillRows) {
  const b = emptyBoard();
  for (let i = 0; i < fillRows; i++) {
    const y = HEIGHT - 1 - i;
    const hole = rng.int(WIDTH);
    for (let x = 0; x < WIDTH; x++) if (x !== hole && rng.int(100) < 85) b[y * WIDTH + x] = 1;
  }
  return b;
}

test('실시간 API 로 BFS 한 도달 배치 집합 = reachablePlacements (빈 보드)', () => {
  const b = emptyBoard();
  for (let piece = 0; piece < PIECES.length; piece++) {
    assert.deepEqual(bfsPlacements(b, piece), engineSet(b, piece), `piece ${PIECES[piece]}`);
  }
});

test('실시간 API 로 BFS 한 도달 배치 집합 = reachablePlacements (무작위 보드 120개)', () => {
  const rng = createRng(20260919);
  let compared = 0;
  for (let t = 0; t < 120; t++) {
    const board = randomBoard(rng, 1 + rng.int(14));
    for (let piece = 0; piece < PIECES.length; piece++) {
      const mine = bfsPlacements(board, piece);
      const theirs = engineSet(board, piece);
      assert.deepEqual(mine, theirs, `board ${t} piece ${PIECES[piece]}`);
      compared++;
    }
  }
  assert.ok(compared === 120 * PIECES.length);
});

// 이 엔진은 조각을 항상 버퍼(y < 0) 안에서 스폰하고 fitsFlat 은 y < 0 을 충돌로 보지 않는다.
// 따라서 스폰 자체는 막히지 않는다 — 탑아웃은 "놓을 자리가 없다(도달 배치 0개)" 로 나타난다.
// 실시간 UI 는 이 규칙을 그대로 따라야 하므로 두 성질을 다 고정해 둔다.
test('스폰은 버퍼에서 이뤄져 막히지 않고, 꽉 찬 보드에서는 양쪽 모두 도달 배치가 0개다 (탑아웃)', () => {
  const rng = createRng(7);
  for (let t = 0; t < 60; t++) {
    const board = randomBoard(rng, 19);
    for (let piece = 0; piece < PIECES.length; piece++) {
      assert.notEqual(spawnPiece(board, piece), null, '스폰이 막혔다 — 버퍼 스폰 가정이 깨졌다');
    }
  }
  const full = emptyBoard();
  for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) full[y * WIDTH + x] = 1;
  for (let piece = 0; piece < PIECES.length; piece++) {
    assert.equal(reachablePlacements(full, piece).length, 0, `${PIECES[piece]}: 꽉 찬 보드인데 엔진에 후보가 있다`);
    assert.deepEqual(bfsPlacements(full, piece), [], `${PIECES[piece]}: 꽉 찬 보드인데 실시간 BFS 에 배치가 있다`);
  }
});

test('hardDropBox 는 더 내려갈 수 없는 위치를 돌려준다', () => {
  const rng = createRng(11);
  for (let t = 0; t < 40; t++) {
    const board = randomBoard(rng, 1 + rng.int(10));
    for (let piece = 0; piece < PIECES.length; piece++) {
      const s = spawnPiece(board, piece);
      if (!s) continue;
      const by = hardDropBox(board, piece, s.rot, s.bx, s.by);
      assert.ok(pieceFits(board, piece, s.rot, s.bx, by), '하드드롭 위치가 충돌한다');
      assert.ok(isResting(board, piece, s.rot, s.bx, by), '하드드롭했는데 더 내려갈 수 있다');
      assert.ok(by >= s.by, '하드드롭이 위로 올라갔다');
    }
  }
});

test('boxToPlacement 의 셀 좌표가 pieceCells 와 일치하고 lockOut 은 버퍼 판정과 같다', () => {
  const b = emptyBoard();
  for (let piece = 0; piece < PIECES.length; piece++) {
    const s = spawnPiece(b, piece);
    const cells = pieceCells(piece, s.rot, s.bx, s.by);
    assert.equal(cells.length, 4);
    for (const [x, y] of cells) {
      assert.ok(x >= 0 && x < WIDTH, '셀이 보드 좌우를 벗어난다');
      assert.ok(y >= -BUFFER && y < HEIGHT, '셀이 버퍼 위/바닥 아래로 나간다');
    }
    const p = boxToPlacement(piece, s.rot, s.bx, s.by);
    const minY = Math.min(...cells.map((c) => c[1]));
    assert.equal(p.top, minY, 'top 이 셀 최소 y 와 다르다');
    assert.equal(p.lockOut, minY < 0, 'lockOut 판정이 버퍼 판정과 다르다');
  }
});

test('rotateWithKick: O 는 회전하지 않고, 킥이 모두 막히면 null 이다', () => {
  const b = emptyBoard();
  const O = PIECES.indexOf('O');
  const s = spawnPiece(b, O);
  const r = rotateWithKick(b, O, 0, 1, s.bx, s.by);
  assert.equal(r.rot, 0, 'O 가 회전했다');
  assert.equal(r.bx, s.bx);
  assert.equal(r.by, s.by);

  // 꽉 찬 보드에서 I 를 좁은 틈에 두고 회전 시도 → 모든 킥이 막힌다
  const full = emptyBoard();
  for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) full[y * WIDTH + x] = 1;
  const I = PIECES.indexOf('I');
  assert.equal(rotateWithKick(full, I, 0, 1, 3, 0), null, '꽉 찬 보드에서 회전이 성공했다');
});
