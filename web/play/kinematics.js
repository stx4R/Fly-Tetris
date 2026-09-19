// 8단계 — 사람 조작용 조각 운동 상태 머신 (순수 로직, DOM 없음 → Node 에서 테스트한다).
//
// 엔진(src/tetris.js)은 "최종 배치 (col, rot, top)" 단위다. 이 모듈은 셀 단위 실시간 조작을 받아
// 조각이 고정되는 순간 그 배치를 만들어 낸다. 도달 가능한 배치 집합은 초파리가 보는 후보 집합과
// 정확히 같다 (test/tetris-realtime.test.js 가 교차 검증).
//
// 구현한 것: 좌우 DAS/ARR · 소프트드롭 · 하드드롭 · CW/CCW/180 회전(SRS 킥) · 홀드 요청 ·
//            중력 · 확장 배치 락다운(이동·회전으로 지연 리셋, 횟수 상한, 더 낮은 행에 닿으면 상한 회복).
// 홀드 교환 자체는 엔진(holdSwap)이 하므로 여기서는 요청만 올린다.
//
// T-스핀 판정에 필요한 두 플래그를 그대로 넘긴다:
//   spin  = 고정 직전 마지막 성공 동작이 회전이었다
//   kick5 = 그 회전이 5번째 킥(TST 킥)을 썼다

import { boxToPlacement, hardDropBox, isResting, pieceFits, rotateWithKick, spawnPiece } from '../../src/tetris.js';

export const DEFAULT_TUNING = {
  gravityMs: 800,     // 중력으로 한 칸 내려가는 주기
  softDropMs: 30,     // 소프트드롭 주기
  dasMs: 133,         // 좌우 키를 누르고 자동 반복이 시작되기까지
  arrMs: 20,          // 자동 반복 주기 (0 이면 즉시 벽까지)
  lockDelayMs: 500,   // 접지 후 고정까지
  lockResets: 15,     // 이동·회전으로 락 지연을 리셋할 수 있는 횟수
};

export const NO_KEYS = { left: false, right: false, softDrop: false, hardDrop: false, cw: false, ccw: false, flip: false, hold: false };

// 새 조각. 스폰이 막히면 null (이 엔진에서는 버퍼 스폰이라 사실상 일어나지 않는다 — 탑아웃은 고정 시 lockOut 으로 잡는다).
export function spawnState(board, piece) {
  const s = spawnPiece(board, piece);
  if (!s) return null;
  return {
    piece, rot: s.rot, bx: s.bx, by: s.by,
    lockMs: 0, resets: 0, gravMs: 0, repeatMs: 0, dasDir: 0, dasMs: 0,
    lowestBy: s.by, spin: false, kick5: false, prev: { ...NO_KEYS },
  };
}

const tryMove = (st, board, dx, dy) => {
  if (!pieceFits(board, st.piece, st.rot, st.bx + dx, st.by + dy)) return false;
  st.bx += dx; st.by += dy;
  return true;
};

const tryRotate = (st, board, to) => {
  const r = rotateWithKick(board, st.piece, st.rot, to, st.bx, st.by);
  if (!r || (r.rot === st.rot && r.bx === st.bx && r.by === st.by)) return false;
  st.rot = r.rot; st.bx = r.bx; st.by = r.by; st.kick5 = r.kick5;
  return true;
};

// 성공한 조작 뒤 락 지연 처리: 접지 상태면 리셋 (상한까지)
function onAction(st, board, tuning, wasRotate) {
  st.spin = wasRotate;
  if (!wasRotate) st.kick5 = false;
  if (st.by > st.lowestBy) { st.lowestBy = st.by; st.resets = 0; }   // 더 낮은 행에 처음 닿으면 상한 회복
  if (isResting(board, st.piece, st.rot, st.bx, st.by) && st.resets < tuning.lockResets) { st.lockMs = 0; st.resets++; }
}

// 고정 → 엔진이 받는 배치. lockOut 이면 탑아웃이다.
export function lockPlacement(st) {
  const p = boxToPlacement(st.piece, st.rot, st.bx, st.by);
  return { col: p.col, rot: p.rot, top: p.top, spin: st.spin, kick5: st.kick5, lockOut: p.lockOut };
}

// 한 프레임. keys 는 "지금 눌려 있는가" 만 주면 된다 — 회전·하드드롭·홀드의 엣지 판정은 여기서 한다.
// 반환 { lock, holdRequest, moved, rotated }. lock 이 있으면 호출자가 placePiece 로 넘기고 새 조각을 스폰한다.
export function update(st, board, dt, keys, tuning = DEFAULT_TUNING) {
  const k = { ...NO_KEYS, ...keys };
  const p = st.prev;
  let moved = false, rotated = false;

  // 홀드 (엣지) — 교환은 호출자가 한다
  const holdRequest = k.hold && !p.hold;

  // 회전 (엣지). 동시에 눌리면 CW 우선.
  if (k.cw && !p.cw) rotated = tryRotate(st, board, (st.rot + 1) & 3) || rotated;
  else if (k.ccw && !p.ccw) rotated = tryRotate(st, board, (st.rot + 3) & 3) || rotated;
  else if (k.flip && !p.flip) rotated = tryRotate(st, board, (st.rot + 2) & 3) || rotated;
  if (rotated) onAction(st, board, tuning, true);

  // 좌우: 누른 순간 1칸, 이후 DAS → ARR
  const dir = k.left && !k.right ? -1 : k.right && !k.left ? 1 : 0;
  if (dir === 0) { st.dasDir = 0; st.dasMs = 0; st.repeatMs = 0; }
  else {
    if (st.dasDir !== dir) { // 새로 누름
      st.dasDir = dir; st.dasMs = 0; st.repeatMs = 0;
      if (tryMove(st, board, dir, 0)) { moved = true; onAction(st, board, tuning, false); }
    } else {
      st.dasMs += dt;
      if (st.dasMs >= tuning.dasMs) {
        if (tuning.arrMs <= 0) { // 즉시 벽까지
          while (tryMove(st, board, dir, 0)) { moved = true; }
          if (moved) onAction(st, board, tuning, false);
        } else {
          st.repeatMs += dt;
          while (st.repeatMs >= tuning.arrMs) {
            st.repeatMs -= tuning.arrMs;
            if (tryMove(st, board, dir, 0)) { moved = true; onAction(st, board, tuning, false); } else break;
          }
        }
      }
    }
  }

  // 하드드롭 (엣지) — 즉시 고정
  if (k.hardDrop && !p.hardDrop) {
    const by = hardDropBox(board, st.piece, st.rot, st.bx, st.by);
    if (by !== st.by) { st.by = by; st.spin = false; st.kick5 = false; }
    st.prev = k;
    return { lock: lockPlacement(st), holdRequest: false, moved: true, rotated, hardDrop: true };
  }

  // 중력 / 소프트드롭
  const period = k.softDrop ? tuning.softDropMs : tuning.gravityMs;
  let fell = false;
  st.gravMs += dt;
  while (st.gravMs >= period) {
    st.gravMs -= period;
    if (tryMove(st, board, 0, 1)) { moved = true; fell = true; st.spin = false; st.kick5 = false; if (st.by > st.lowestBy) { st.lowestBy = st.by; st.resets = 0; } }
    else { st.gravMs = 0; break; }
  }

  // 락다운. 이번 프레임에 막 착지했으면 지연은 다음 프레임부터 센다 (낙하에 쓴 시간을 지연으로 먹지 않는다).
  // 리셋 상한을 다 쓰면 더는 lockMs 가 0 으로 돌아가지 않으므로 무한 버티기는 불가능하다.
  let lock = null;
  if (isResting(board, st.piece, st.rot, st.bx, st.by)) {
    if (fell) st.lockMs = 0;
    else st.lockMs += dt;
    if (st.lockMs >= tuning.lockDelayMs) lock = lockPlacement(st);
  } else st.lockMs = 0;

  st.prev = k;
  return { lock, holdRequest, moved, rotated, hardDrop: false };
}

// 고스트 조각 (착지 예상 위치)
export const ghostBy = (st, board) => hardDropBox(board, st.piece, st.rot, st.bx, st.by);
