// 초파리 입력 역산(web/play/inputs.js) 검증: 모든 후보에 경로가 있고, 그 경로를 실시간 API 로 그대로 눌러 보면
// 후보와 같은 셀에 떨어진다. KEYS 위젯은 시각 효과지만 보드에 놓이는 조각과 어긋나면 안 된다.

import test from 'node:test';
import assert from 'node:assert/strict';
import { createRng } from '../src/prng.js';
import {
  HEIGHT, PIECES, SHAPES, WIDTH,
  boxToPlacement, createPlayer, decisionCandidates, emptyBoard, hardDropBox, pieceFits, pieceIndex, rotateWithKick, spawnPiece,
} from '../src/tetris.js';
import { inputPath } from '../web/play/inputs.js';

const cells = (piece, rot, col, top) => SHAPES[piece][rot].cells.map(([x, y]) => (top + y) * WIDTH + col + x).sort((a, b) => a - b).join(',');

// 경로를 한 동작씩 실행해 떨어진 배치의 셀을 돌려준다. 막히는 동작이 있으면 실패.
function replay(board, piece, path) {
  let s = spawnPiece(board, piece);
  for (const a of path) {
    if (a === 'hold') continue;
    if (a === 'hardDrop') { const p = boxToPlacement(piece, s.rot, s.bx, hardDropBox(board, piece, s.rot, s.bx, s.by)); return cells(piece, p.rot, p.col, p.top); }
    if (a === 'cw' || a === 'ccw') { const r = rotateWithKick(board, piece, s.rot, (s.rot + (a === 'cw' ? 1 : 3)) & 3, s.bx, s.by); assert.ok(r, `${a} 가 막혔다`); s = { rot: r.rot, bx: r.bx, by: r.by }; continue; }
    const dx = a === 'left' ? -1 : a === 'right' ? 1 : 0;
    const by = a === 'softDrop' ? hardDropBox(board, piece, s.rot, s.bx, s.by) : a === 'down' ? s.by + 1 : s.by;
    assert.ok(pieceFits(board, piece, s.rot, s.bx + dx, by), `${a} 가 막혔다`);
    s = { ...s, bx: s.bx + dx, by };
  }
  assert.fail('hardDrop 으로 끝나지 않았다');
}

function randomBoard(rng, fillRows) {
  const b = emptyBoard();
  for (let i = 0; i < fillRows; i++) {
    const y = HEIGHT - 1 - i;
    const hole = rng.int(WIDTH);
    for (let x = 0; x < WIDTH; x++) if (x !== hole && rng.int(100) < 85) b[y * WIDTH + x] = 1;
  }
  return b;
}

test('inputPath: 빈 보드의 기본 경로 (그대로 떨어뜨리기 · 벽까지 옮기기 · 회전 · 홀드)', () => {
  const b = emptyBoard();
  const T = pieceIndex('T'), I = pieceIndex('I');
  const spawnCol = (piece) => boxToPlacement(piece, 0, spawnPiece(b, piece).bx, 0).col;
  const floorTop = (piece, rot) => HEIGHT - 1 - Math.max(...SHAPES[piece][rot].cells.map(([, y]) => y)); // 빈 보드 바닥에 닿는 top
  assert.deepEqual(inputPath(b, T, { col: spawnCol(T), rot: 0, top: floorTop(T, 0) }), ['hardDrop']);
  assert.deepEqual(inputPath(b, I, { col: 0, rot: 0, top: floorTop(I, 0) }), ['left', 'left', 'left', 'hardDrop']);
  assert.deepEqual(inputPath(b, T, { col: spawnCol(T) + 1, rot: 1, top: floorTop(T, 1) }), ['cw', 'hardDrop']);
  assert.deepEqual(inputPath(b, T, { useHold: true, col: spawnCol(T), rot: 0, top: floorTop(T, 0) }), ['hold', 'hardDrop']);
});

test('inputPath: 무작위 보드의 모든 후보에 경로가 있고, 그대로 누르면 후보와 같은 셀에 떨어진다', () => {
  const rng = createRng(20260924);
  let checked = 0, tucks = 0;
  for (let t = 0; t < 80; t++) {
    const player = { ...createPlayer(1 + t), board: randomBoard(rng, 1 + rng.int(14)) };
    for (const c of decisionCandidates(player)) {
      const path = inputPath(player.board, c.piece, c);
      assert.ok(path, `board ${t} ${PIECES[c.piece]} (${c.col},${c.rot},${c.top}) 경로 없음`);
      assert.equal(path[0] === 'hold', !!c.useHold, '홀드 후보에만 hold 가 앞에 붙는다');
      assert.equal(path.at(-1), 'hardDrop');
      assert.equal(replay(player.board, c.piece, path), cells(c.piece, c.rot, c.col, c.top), `board ${t} ${PIECES[c.piece]} (${c.col},${c.rot},${c.top})`);
      if (path.includes('softDrop') || path.includes('down')) tucks++;
      checked++;
    }
  }
  assert.ok(checked > 2000, `후보 ${checked}개만 확인했다`);
  assert.ok(tucks > 0, '밀어 넣기(소프트드롭 뒤 이동·회전) 경로가 한 번도 나오지 않았다');
});
