// 8단계 — 사람 vs 초파리 실시간 대전 상태 머신 (순수 로직, DOM 없음).
//
// 규칙은 전부 엔진(src/tetris.js)이 정한다. 이 모듈은 "턴 교대"인 playMatch 를 "양쪽이 각자 속도로 둔다"로
// 바꾼 것뿐이고, 한 조각을 놓을 때 하는 일은 playMatch 와 같다:
//   applyDecision/placePiece → event.sent > 0 이면 상대에게 enqueueGarbage(줄 수, 무작위 구멍 열)
// 공격표·상쇄·콤보·T-스핀·가비지 큐·홀드·넥스트 5 는 모두 엔진 것을 그대로 쓴다.
//
// 사람 쪽은 kinematics 가 만든 배치를, 초파리 쪽은 워커가 고른 후보를 넣는다.
// 가비지 구멍 열은 공용 RNG 하나로 뽑아 재현 가능하게 둔다.

import { WIDTH, applyDecision, createPlayer, enqueueGarbage, holdPiece, holdSwap, nextQueue, pendingGarbage, placePiece } from '../../src/tetris.js';
import { createRng } from '../../src/prng.js';
import { DEFAULT_TUNING, carryFrom, ghostBy, spawnState, update } from './kinematics.js';

export const SIDES = ['human', 'fly'];

export function createMatch({ seedHuman = 1, seedFly = 1, garbageSeed = 7, tuning = DEFAULT_TUNING, cap = 2000 } = {}) {
  const human = createPlayer(seedHuman);
  const fly = createPlayer(seedFly);
  return {
    rng: createRng(garbageSeed), tuning, cap,
    human: { player: human, k: spawnState(human.board, human.current), lastEvent: null, pieces: 0, keys: null },
    fly: { player: fly, k: null, lastEvent: null, pieces: 0 },
    over: false, winner: null, reason: null,
    log: [], // 최근 사건 (렌더의 공격 표시용) { side, sent, cancelled, lines, tspin, combo, at }
  };
}

const other = (side) => (side === 'human' ? 'fly' : 'human');

function finish(m, winner, reason) {
  m.over = true;
  m.winner = winner;
  m.reason = reason;
}

// 한 조각을 놓은 뒤 공통 처리: 공격 전달 · 사망 판정 · 기록
function afterPlace(m, side, player, event) {
  const me = m[side];
  me.player = player;
  me.lastEvent = event;
  me.pieces++;
  if (event.sent > 0) {
    const op = m[other(side)];
    op.player = enqueueGarbage(op.player, event.sent, m.rng.int(WIDTH));
  }
  m.log.push({ side, sent: event.sent, cancelled: event.cancelled, lines: event.linesCleared, tspin: event.tspin, combo: event.combo, at: m[side].pieces });
  if (m.log.length > 40) m.log.shift();
  if (player.dead || event.toppedOut) { finish(m, other(side), `${side} 탑아웃`); return true; }
  if (me.pieces >= m.cap) { finish(m, null, '조각 상한'); return true; }
  return false;
}

// ---------- 사람 ----------

// 한 프레임. keys 는 지금 눌려 있는 키 (엣지 판정은 kinematics 가 한다).
// 반환 { locked, held, event } — 렌더·효과음용.
export function tickHuman(m, dt, keys) {
  if (m.over) return { locked: false, held: false, event: null };
  const h = m.human;
  if (!h.k) { // 스폰 실패 (사실상 없음 — 버퍼 스폰)
    finish(m, 'fly', 'human 스폰 불가');
    return { locked: false, held: false, event: null };
  }
  h.keys = keys;
  const r = update(h.k, h.player.board, dt, keys, m.tuning);

  if (r.holdRequest && !h.player.holdUsed) {
    const carry = carryFrom(h.k, keys);
    h.player = holdSwap(h.player);
    h.k = spawnState(h.player.board, h.player.current, carry);
    return { locked: false, held: true, event: null };
  }
  if (!r.lock) return { locked: false, held: false, event: null };

  const { player, event } = placePiece(h.player, { col: r.lock.col, rot: r.lock.rot, top: r.lock.top, spin: r.lock.spin, kick5: r.lock.kick5 });
  const carry = carryFrom(h.k, keys);
  const done = afterPlace(m, 'human', player, event);
  h.k = done ? null : spawnState(player.board, player.current, carry);
  return { locked: true, held: false, event };
}

// ---------- 초파리 ----------

// 워커에 보낼 상태. player.seq 는 at(k) 메서드라 구조화 복제가 안 되므로 seed 만 보내고 워커가 되살린다
// (pieceSequence 는 seed 에서 결정적). 후보 계산과 점수화는 워커가 한다.
export function flySnapshot(m) {
  const p = m.fly.player;
  return {
    board: Uint8Array.from(p.board), current: p.current, hold: p.hold, holdUsed: p.holdUsed,
    seed: p.seed, drawn: p.drawn, combo: p.combo, pieces: p.pieces, dead: p.dead,
    garbage: p.garbage.map((g) => ({ ...g })), stats: { ...p.stats },
    next: nextQueue(p, 5), pending: pendingGarbage(p),
  };
}

// 스냅샷 → 엔진이 받는 플레이어 (워커에서 쓴다). seq 는 seed 로 재생성된다.
export function restorePlayer(s) {
  const base = createPlayer(s.seed);
  return {
    ...base, board: Uint8Array.from(s.board), current: s.current, hold: s.hold, holdUsed: s.holdUsed,
    drawn: s.drawn, combo: s.combo, pieces: s.pieces, dead: s.dead,
    garbage: s.garbage.map((g) => ({ ...g })), stats: { ...s.stats },
  };
}

// 워커가 고른 후보 { useHold, col, rot, top, spin, kick5 } 적용. 후보가 null 이면 놓을 자리가 없다 = 탑아웃.
export function flyPlace(m, cand) {
  if (m.over) return null;
  if (!cand) { finish(m, 'human', 'fly 놓을 자리 없음'); return null; }
  const { player, event } = applyDecision(m.fly.player, cand);
  afterPlace(m, 'fly', player, event);
  return event;
}

// ---------- 렌더용 스냅샷 ----------

export function viewOf(m, side) {
  const s = m[side];
  const p = s.player;
  const v = {
    board: p.board, current: p.current, hold: p.hold, holdUsed: p.holdUsed,
    next: nextQueue(p, 5), pending: pendingGarbage(p), stats: p.stats, combo: p.combo, pieces: s.pieces, dead: p.dead,
    piece: null, ghost: null,
  };
  if (side === 'human' && s.k) {
    v.piece = { piece: s.k.piece, rot: s.k.rot, bx: s.k.bx, by: s.k.by };
    v.ghost = { piece: s.k.piece, rot: s.k.rot, bx: s.k.bx, by: ghostBy(s.k, p.board) };
  }
  return v;
}

export { holdPiece, pendingGarbage };
