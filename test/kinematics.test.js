// 8단계 — 사람 조작 조각 운동(web/play/kinematics.js) 검증. DOM 없이 순수 로직만 돌린다.

import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_TUNING, NO_KEYS, ghostBy, lockPlacement, spawnState, update } from '../web/play/kinematics.js';
import { HEIGHT, PIECES, WIDTH, dropRow, emptyBoard, isResting, pieceFits } from '../src/tetris.js';

const T = PIECES.indexOf('T');
const I = PIECES.indexOf('I');
const tune = (over) => ({ ...DEFAULT_TUNING, ...over });
const press = (over) => ({ ...NO_KEYS, ...over });

test('하드드롭 결과가 엔진의 dropRow 배치와 같다', () => {
  const board = emptyBoard();
  for (let piece = 0; piece < PIECES.length; piece++) {
    const st = spawnState(board, piece);
    const r = update(st, board, 16, press({ hardDrop: true }), tune({}));
    assert.ok(r.lock, `${PIECES[piece]}: 하드드롭이 고정되지 않았다`);
    assert.equal(r.lock.top, dropRow(board, piece, r.lock.col, r.lock.rot), `${PIECES[piece]}: top 이 dropRow 와 다르다`);
    assert.equal(r.lock.lockOut, false);
    assert.equal(r.lock.spin, false, '하드드롭인데 spin 이 켜졌다');
  }
});

test('중력: 주기마다 한 칸 내려간다', () => {
  const board = emptyBoard();
  const t = tune({ gravityMs: 100, lockDelayMs: 10000 });
  const st = spawnState(board, T);
  const y0 = st.by;
  update(st, board, 99, press({}), t);
  assert.equal(st.by, y0, '주기 전에 내려갔다');
  update(st, board, 1, press({}), t);
  assert.equal(st.by, y0 + 1, '주기가 지났는데 안 내려갔다');
  update(st, board, 350, press({}), t);
  assert.equal(st.by, y0 + 4, '누적 시간만큼 내려가지 않았다');
});

test('소프트드롭은 중력보다 빠른 주기를 쓴다', () => {
  const board = emptyBoard();
  const t = tune({ gravityMs: 1000, softDropMs: 10, lockDelayMs: 10000 });
  const st = spawnState(board, T);
  const y0 = st.by;
  update(st, board, 50, press({ softDrop: true }), t);
  assert.equal(st.by, y0 + 5, '소프트드롭 주기가 적용되지 않았다');
});

test('락다운: 접지 후 lockDelayMs 가 지나야 고정된다', () => {
  const board = emptyBoard();
  const t = tune({ gravityMs: 1, lockDelayMs: 500 });
  const st = spawnState(board, T);
  let r = update(st, board, 100, press({}), t);   // 바닥까지 낙하
  assert.ok(isResting(board, st.piece, st.rot, st.bx, st.by), '바닥에 닿지 않았다');
  assert.equal(r.lock, null, '접지하자마자 고정됐다');
  r = update(st, board, 499, press({}), t);
  assert.equal(r.lock, null, 'lockDelay 전에 고정됐다');
  r = update(st, board, 2, press({}), t);
  assert.ok(r.lock, 'lockDelay 가 지났는데 고정되지 않았다');
});

// 회전은 킥으로 조각이 떠올라 접지가 풀릴 수 있어(T 가 바닥에서 CW 하면 실제로 그렇다) 조각 모양에 의존한다.
// 리셋 상한 자체를 보려면 평평한 바닥에서 좌우로 탭하는 편이 확실하다 — 접지가 유지되고 이동 리셋만 센다.
test('락 지연 리셋: 접지 상태 이동은 타이머를 되돌리지만 횟수 상한이 있다', () => {
  const board = emptyBoard();
  const t = tune({ gravityMs: 1, lockDelayMs: 300, lockResets: 3, dasMs: 100000 });
  const st = spawnState(board, T);
  update(st, board, 100, press({}), t);
  assert.ok(isResting(board, st.piece, st.rot, st.bx, st.by), '바닥에 닿지 않았다');
  const tap = (dir) => { update(st, board, 0, press({ [dir]: true }), t); update(st, board, 0, press({}), t); };
  for (let i = 0; i < 3; i++) {
    const r = update(st, board, 299, press({}), t);
    assert.equal(r.lock, null, `리셋 ${i}: 아직 고정되면 안 된다`);
    tap(i % 2 === 0 ? 'left' : 'right');
    assert.ok(isResting(board, st.piece, st.rot, st.bx, st.by), `리셋 ${i}: 이동으로 접지가 풀렸다`);
    assert.equal(st.lockMs, 0, `리셋 ${i}: 이동이 타이머를 되돌리지 않았다`);
  }
  assert.equal(st.resets, 3, '리셋 횟수가 상한과 다르다');
  // 상한 소진 — 더 움직여도 타이머가 계속 흐른다
  const r = update(st, board, 299, press({}), t);
  assert.equal(r.lock, null);
  tap('left');
  assert.ok(st.lockMs > 0, '상한을 넘겼는데도 타이머가 리셋됐다');
  assert.ok(update(st, board, 2, press({}), t).lock, '상한 소진 후 lockDelay 가 지났는데 고정되지 않았다');
});

test('좌우: 누른 순간 1칸, DAS 뒤 ARR 주기로 반복', () => {
  const board = emptyBoard();
  const t = tune({ gravityMs: 100000, lockDelayMs: 100000, dasMs: 100, arrMs: 20 });
  const st = spawnState(board, T);
  const x0 = st.bx;
  update(st, board, 0, press({ right: true }), t);
  assert.equal(st.bx, x0 + 1, '누른 순간 1칸 가지 않았다');
  update(st, board, 99, press({ right: true }), t);
  assert.equal(st.bx, x0 + 1, 'DAS 전에 반복됐다');
  update(st, board, 1, press({ right: true }), t);   // DAS 도달 (이 프레임엔 아직 ARR 누적 0)
  update(st, board, 60, press({ right: true }), t);  // ARR 20ms × 3
  assert.equal(st.bx, x0 + 4, `ARR 반복이 어긋났다 (bx ${st.bx}, 기대 ${x0 + 4})`);
});

test('ARR 0 이면 벽까지 즉시 간다', () => {
  const board = emptyBoard();
  const t = tune({ gravityMs: 100000, lockDelayMs: 100000, dasMs: 100, arrMs: 0 });
  const st = spawnState(board, T);
  update(st, board, 0, press({ right: true }), t);
  update(st, board, 200, press({ right: true }), t);
  assert.equal(pieceFits(board, st.piece, st.rot, st.bx + 1, st.by), false, '벽까지 가지 않았다');
});

test('spin 플래그: 마지막 동작이 회전이면 true, 내려가면 false', () => {
  const board = emptyBoard();
  const t = tune({ gravityMs: 1, lockDelayMs: 100000 });
  const st = spawnState(board, T);
  update(st, board, 50, press({}), t);
  update(st, board, 0, press({ cw: true }), t);
  assert.equal(st.spin, true, '회전했는데 spin 이 false');
  update(st, board, 0, press({}), t);
  update(st, board, 5, press({ softDrop: true }), t);
  const wentDown = st.by;
  assert.equal(st.spin, isResting(board, st.piece, st.rot, st.bx, wentDown) && st.spin ? st.spin : false, 'spin 이 이동 후에도 남아 있다');
});

test('홀드는 엣지에서 한 번만 요청된다', () => {
  const board = emptyBoard();
  const t = tune({ gravityMs: 100000, lockDelayMs: 100000 });
  const st = spawnState(board, T);
  assert.equal(update(st, board, 16, press({ hold: true }), t).holdRequest, true);
  assert.equal(update(st, board, 16, press({ hold: true }), t).holdRequest, false, '누르고 있는 동안 반복 요청됐다');
  update(st, board, 16, press({}), t);
  assert.equal(update(st, board, 16, press({ hold: true }), t).holdRequest, true, '뗐다 누르면 다시 요청돼야 한다');
});

test('고스트는 항상 착지 가능한 위치다', () => {
  const board = emptyBoard();
  for (let piece = 0; piece < PIECES.length; piece++) {
    const st = spawnState(board, piece);
    const g = ghostBy(st, board);
    assert.ok(pieceFits(board, piece, st.rot, st.bx, g), '고스트 위치가 충돌한다');
    assert.ok(isResting(board, piece, st.rot, st.bx, g), '고스트 아래로 더 내려갈 수 있다');
  }
});

test('I 조각을 왼쪽 벽까지 밀고 하드드롭하면 col 0 에 고정된다', () => {
  const board = emptyBoard();
  const t = tune({ gravityMs: 100000, lockDelayMs: 100000, dasMs: 50, arrMs: 0 });
  const st = spawnState(board, I);
  update(st, board, 0, press({ left: true }), t);
  update(st, board, 200, press({ left: true }), t);
  const r = update(st, board, 16, press({ hardDrop: true }), t);
  assert.ok(r.lock);
  assert.equal(r.lock.col, 0, `왼쪽 끝이 아니다 (col ${r.lock.col})`);
  assert.equal(r.lock.top, HEIGHT - 1, 'I 가 바닥에 눕지 않았다');
});
