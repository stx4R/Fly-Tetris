// 8단계 — 초파리 입력 역산 (순수 로직, DOM 없음 → Node 에서 테스트한다).
//
// 엔진은 배치 단위라 초파리는 실제로 버튼을 누르지 않는다 — 워커는 최종 위치(col, rot, top)만 고른다.
// 대전 화면의 KEYS 위젯은 "그 위치에 두려면 누를 버튼"을 보여주는 시각 효과이고, 그 순서를 여기서 만든다.
// 이동 규칙은 사람 조작(kinematics)·후보 BFS(reachablePlacements)와 같다: 좌 · 우 · 시계/반시계 회전(SRS 킥) · 아래.
// 180° 회전은 쓰지 않는다 (후보 BFS 에도 없다).
//
// 스폰에서 BFS 로 누른 횟수가 가장 적은 경로를 찾는다. 하드드롭했을 때 목표와 같은 셀에 떨어지면 도착이다.
// 반환 동작: 'hold' · 'cw' · 'ccw' · 'left' · 'right' · 'softDrop'(바닥까지) · 'down'(한 칸) · 'hardDrop' (항상 마지막).
// 같은 길이면 회전 → 좌우 → 아래 순서로 먼저 찾은 경로다. 못 찾으면 null (후보가 같은 규칙에서 나오므로 일어나지 않아야 한다).

import { SHAPES, WIDTH, boxToPlacement, hardDropBox, pieceFits, rotateWithKick, spawnPiece } from '../../src/tetris.js';

// 배치가 차지하는 셀 4개를 오름차순으로 묶은 수 (같은 모양이 나오는 회전 — O 전부, S/Z/I 의 두 회전 — 을 같게 본다)
function cellsKey(piece, rot, col, top) {
  const idx = SHAPES[piece][rot].cells.map(([x, y]) => (top + y) * WIDTH + col + x).sort((a, b) => a - b);
  return idx.reduce((k, i) => k * 256 + i + 32, 0);
}

export function inputPath(board, piece, { useHold = false, col, rot, top }) {
  const start = spawnPiece(board, piece);
  if (!start) return null;
  const target = cellsKey(piece, rot, col, top);
  const key = (s) => ((s.rot * 64 + s.bx + 16) * 64) + s.by + 16;
  const from = new Map([[key(start), null]]); // 상태 → [이전 상태, 동작]
  const queue = [start];
  for (let qi = 0; qi < queue.length; qi++) {
    const s = queue[qi];
    const land = hardDropBox(board, piece, s.rot, s.bx, s.by);
    const p = boxToPlacement(piece, s.rot, s.bx, land);
    if (!p.lockOut && cellsKey(piece, p.rot, p.col, p.top) === target) {
      const path = ['hardDrop'];
      for (let k = key(s); from.get(k); k = key(from.get(k)[0])) path.unshift(from.get(k)[1]);
      if (useHold) path.unshift('hold');
      return path;
    }
    const go = (n, action) => { const k = key(n); if (!from.has(k)) { from.set(k, [s, action]); queue.push(n); } };
    for (const [to, action] of [[(s.rot + 1) & 3, 'cw'], [(s.rot + 3) & 3, 'ccw']]) {
      const r = rotateWithKick(board, piece, s.rot, to, s.bx, s.by);
      if (r && (r.rot !== s.rot || r.bx !== s.bx || r.by !== s.by)) go({ rot: r.rot, bx: r.bx, by: r.by }, action);
    }
    if (pieceFits(board, piece, s.rot, s.bx - 1, s.by)) go({ ...s, bx: s.bx - 1 }, 'left');
    if (pieceFits(board, piece, s.rot, s.bx + 1, s.by)) go({ ...s, bx: s.bx + 1 }, 'right');
    if (land > s.by) go({ ...s, by: land }, 'softDrop');
    if (land > s.by + 1) go({ ...s, by: s.by + 1 }, 'down'); // 중간 높이에서 옆 굴로 들어가는 경로용
  }
  return null;
}
