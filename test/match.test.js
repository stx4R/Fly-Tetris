// 8단계 — 실시간 대전 상태 머신(web/play/match.js) 검증. 브라우저 없이 헤드리스로 돌린다.
// 사람 쪽은 kinematics 를 통해, 초파리 쪽은 엔진 후보를 통해 두게 하고 규칙(공격 전달·탑아웃·종료)을 확인한다.

import test from 'node:test';
import assert from 'node:assert/strict';
import { createMatch, flyPlace, flySnapshot, tickHuman, viewOf } from '../web/play/match.js';
import { DEFAULT_TUNING, NO_KEYS } from '../web/play/kinematics.js';
import { decisionCandidates, pendingGarbage } from '../src/tetris.js';

const press = (over) => ({ ...NO_KEYS, ...over });

// 사람: 하드드롭 반복 (엣지를 만들려고 누름/뗌을 번갈아 한다)
function humanHardDrop(m) {
  const a = tickHuman(m, 16, press({ hardDrop: true }));
  tickHuman(m, 16, press({}));
  return a;
}
// 초파리 대역: 결과 보드가 가장 낮아지는 후보 (간단한 휴리스틱 — 모델 없이 규칙만 검증)
function flyGreedy(m) {
  const cands = decisionCandidates(m.fly.player);
  if (!cands.length) return null;
  let best = cands[0];
  for (const c of cands) if (c.top > best.top) best = c;
  return best;
}

test('대전은 반드시 끝나고 승자 또는 종료 사유가 남는다', () => {
  const m = createMatch({ seedHuman: 11, seedFly: 22, garbageSeed: 3, cap: 300 });
  let guard = 0;
  while (!m.over && guard++ < 20000) {
    humanHardDrop(m);
    if (m.over) break;
    flyPlace(m, flyGreedy(m));
  }
  assert.ok(m.over, '대전이 끝나지 않았다');
  assert.ok(m.reason, '종료 사유가 없다');
  assert.ok(m.winner === 'human' || m.winner === 'fly' || m.winner === null);
  assert.ok(m.human.pieces > 0 && m.fly.pieces > 0, '양쪽 다 조각을 놓지 못했다');
});

test('한쪽이 보낸 공격이 상대에게 가비지로 전달된다', () => {
  const m = createMatch({ seedHuman: 5, seedFly: 5, garbageSeed: 9, cap: 400 });
  let humanSent = 0, flySent = 0;
  let guard = 0;
  while (!m.over && guard++ < 20000) {
    const a = humanHardDrop(m);
    if (a.event) humanSent += a.event.sent;
    if (m.over) break;
    const e = flyPlace(m, flyGreedy(m));
    if (e) flySent += e.sent;
  }
  if (humanSent > 0) {
    const got = m.fly.player.stats.garbageReceived + pendingGarbage(m.fly.player);
    assert.ok(got > 0, `사람이 ${humanSent} 줄 보냈는데 초파리가 받은 흔적이 없다`);
  }
  if (flySent > 0) {
    const got = m.human.player.stats.garbageReceived + pendingGarbage(m.human.player);
    assert.ok(got > 0, `초파리가 ${flySent} 줄 보냈는데 사람이 받은 흔적이 없다`);
  }
  assert.ok(humanSent + flySent >= 0);
});

test('홀드는 한 조각당 한 번만 되고, 교환 뒤 새 조각이 스폰된다', () => {
  const m = createMatch({ seedHuman: 3, seedFly: 3 });
  const before = m.human.player.current;
  const r1 = tickHuman(m, 16, press({ hold: true }));
  assert.equal(r1.held, true, '홀드가 되지 않았다');
  assert.equal(m.human.player.holdUsed, true);
  assert.notEqual(m.human.player.current, before, '홀드했는데 현재 조각이 그대로다');
  assert.ok(m.human.k, '홀드 뒤 조각이 스폰되지 않았다');

  tickHuman(m, 16, press({}));
  const cur = m.human.player.current;
  const r2 = tickHuman(m, 16, press({ hold: true }));
  assert.equal(r2.held, false, '한 조각에 홀드가 두 번 됐다');
  assert.equal(m.human.player.current, cur);
});

test('flySnapshot 은 워커로 보낼 수 있는 값만 담는다 (구조화 복제 가능)', () => {
  const m = createMatch({ seedHuman: 1, seedFly: 2 });
  const s = flySnapshot(m);
  assert.ok(s.board instanceof Uint8Array);
  assert.equal(s.board.length, 200);
  assert.equal(typeof s.current, 'number');
  assert.equal(s.next.length, 5);
  assert.doesNotThrow(() => structuredClone(s), 'structuredClone 이 실패했다 — 워커로 못 보낸다');
});

test('viewOf 는 사람 쪽에 현재 조각과 고스트를 준다', () => {
  const m = createMatch({ seedHuman: 8, seedFly: 8 });
  const v = viewOf(m, 'human');
  assert.ok(v.piece, '현재 조각이 없다');
  assert.ok(v.ghost, '고스트가 없다');
  assert.ok(v.ghost.by >= v.piece.by, '고스트가 조각보다 위에 있다');
  assert.equal(v.next.length, 5);
  const f = viewOf(m, 'fly');
  assert.equal(f.piece, null, '초파리 쪽에는 실시간 조각이 없어야 한다');
});

test('탑아웃하면 상대가 승자가 된다', () => {
  const m = createMatch({ seedHuman: 4, seedFly: 4, cap: 5000 });
  // 사람만 계속 두고 초파리는 가만히 둔다 → 사람이 먼저 쌓여 죽는다
  let guard = 0;
  while (!m.over && guard++ < 20000) humanHardDrop(m);
  assert.ok(m.over);
  assert.equal(m.winner, 'fly', `사람이 죽었는데 승자가 ${m.winner}`);
  assert.match(m.reason, /human/);
});

// ---------- 키를 누르고 있을 때의 동작 (조각이 바뀌어도 "새로 눌렀다"로 세면 안 된다) ----------
// 조각이 고정되면 새 kinematics 상태가 생기는데, 거기서 prev 를 비우면 누르고 있던 키가 매 조각마다
// 새 엣지로 잡혀 하드드롭이 연발된다. 2026-09-19 에 실제로 났던 버그.

test('하드드롭 키를 계속 누르고 있어도 조각 하나만 떨어진다', () => {
  const m = createMatch({ seedHuman: 21, seedFly: 21, cap: 500 });
  const held = press({ hardDrop: true });
  for (let i = 0; i < 120; i++) tickHuman(m, 16, held);   // 약 2초간 계속 누름
  assert.equal(m.human.pieces, 1, `연발로 ${m.human.pieces} 개가 떨어졌다`);
});

test('하드드롭을 뗐다 다시 누르면 다음 조각이 떨어진다', () => {
  const m = createMatch({ seedHuman: 21, seedFly: 21, cap: 500 });
  tickHuman(m, 16, press({ hardDrop: true }));
  assert.equal(m.human.pieces, 1);
  tickHuman(m, 16, press({}));                            // 뗌
  tickHuman(m, 16, press({ hardDrop: true }));            // 다시 누름
  assert.equal(m.human.pieces, 2, '뗐다 눌렀는데 떨어지지 않았다');
});

test('홀드 키를 계속 누르고 있어도 한 번만 교환된다', () => {
  const m = createMatch({ seedHuman: 31, seedFly: 31, cap: 500 });
  const held = press({ hold: true });
  const first = tickHuman(m, 16, held);
  assert.equal(first.held, true);
  const after = m.human.player.current;
  for (let i = 0; i < 60; i++) tickHuman(m, 16, held);
  assert.equal(m.human.player.current, after, '누르고 있는 동안 홀드가 반복됐다');
});

test('회전 키를 계속 누르고 있어도 한 번만 돈다 (조각이 바뀌어도)', () => {
  const m = createMatch({ seedHuman: 41, seedFly: 41, cap: 500, tuning: { ...DEFAULT_TUNING, gravityMs: 100000, lockDelayMs: 100000 } });
  const held = press({ cw: true });
  tickHuman(m, 16, held);
  const rot = m.human.k.rot;
  for (let i = 0; i < 60; i++) tickHuman(m, 16, held);
  assert.equal(m.human.k.rot, rot, '누르고 있는 동안 계속 회전했다');
});

test('좌우를 누른 채 조각이 바뀌면 DAS 가 이어진다 (다시 누를 필요 없음)', () => {
  const t = { ...DEFAULT_TUNING, gravityMs: 100000, lockDelayMs: 100000, dasMs: 100, arrMs: 20 };
  const m = createMatch({ seedHuman: 51, seedFly: 51, cap: 500, tuning: t });
  const left = press({ left: true });
  for (let i = 0; i < 40; i++) tickHuman(m, 16, left);     // 벽까지 이동
  const atWall = m.human.k.bx;
  // 왼쪽을 누른 채 하드드롭 → 새 조각
  tickHuman(m, 16, { ...left, hardDrop: true });
  assert.equal(m.human.pieces, 1);
  const fresh = m.human.k;
  assert.ok(fresh, '새 조각이 스폰되지 않았다');
  assert.equal(fresh.dasDir, -1, 'DAS 방향이 초기화됐다');
  assert.ok(fresh.dasMs >= t.dasMs, `DAS 충전이 초기화됐다 (${fresh.dasMs})`);
  // 다음 프레임부터 바로 ARR 로 움직여야 한다
  const x0 = fresh.bx;
  tickHuman(m, 100, left);
  assert.ok(m.human.k.bx < x0, 'DAS 가 이어지지 않아 새 조각이 제자리다');
  assert.ok(atWall >= 0);
});
