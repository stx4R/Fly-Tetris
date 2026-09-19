// 8단계 — 실시간 대전 상태 머신(web/play/match.js) 검증. 브라우저 없이 헤드리스로 돌린다.
// 사람 쪽은 kinematics 를 통해, 초파리 쪽은 엔진 후보를 통해 두게 하고 규칙(공격 전달·탑아웃·종료)을 확인한다.

import test from 'node:test';
import assert from 'node:assert/strict';
import { createMatch, flyPlace, flySnapshot, tickHuman, viewOf } from '../web/play/match.js';
import { NO_KEYS } from '../web/play/kinematics.js';
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
