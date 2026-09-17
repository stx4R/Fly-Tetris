// 배치 단위(placement-level) 테트리스 엔진. 순수 함수, 보드는 Uint8Array(200) 불변 취급.
//
// 보드 인덱스 = row * 10 + col, row 0 이 맨 위. 0 = 빈칸, 1 = 고정 블록.
// 행동 = (col, rot). col 은 회전 상태의 바운딩 박스 왼쪽 열, rot 는 SRS 회전 상태 0..3.
// 2단계 API(위 절반)는 하드드롭만 있다 (중력 애니메이션·소프트드롭·킥 없음): 위에서 수직 낙하해 처음 닿는 곳에 고정.
//
// 6단계 대전 확장(아래 절반, "대전 엔진" 이하): hold 1칸 · next 5 노출 · 가비지 · 가이드라인 공격 계산 · T-스핀(3-corner + 마지막 동작 회전).
// 배치 단위 API 라 "마지막 동작이 회전" 은 엔진이 판정한다: 스폰 위치에서 가이드라인 이동(좌·우·소프트드롭·SRS 킥 회전)으로 도달 가능한
// 정지 위치 전체를 BFS 로 구하고, 회전 한 번으로 그 위치에 도달하는 경로가 있으면 spin=true 를 붙인다 (같은 보드가 나오므로 플레이어는
// 보너스를 위해 회전 마무리를 택한다고 본다). 상태 변이 금지: 모든 함수가 새 객체를 돌려준다.

import { createRng } from './prng.js';

export const WIDTH = 10;
export const HEIGHT = 20;
export const CELLS = WIDTH * HEIGHT;
export const ROTATIONS = 4;
export const ACTIONS = WIDTH * ROTATIONS; // 40

export const PIECES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

// SRS 회전 상태 0(스폰), 1(R), 2, 3(L). 문자 그림을 바운딩 박스로 정규화해 셀 좌표로 만든다.
const SRS = {
  I: ['....\nXXXX\n....\n....', '..X.\n..X.\n..X.\n..X.', '....\n....\nXXXX\n....', '.X..\n.X..\n.X..\n.X..'],
  O: ['XX\nXX', 'XX\nXX', 'XX\nXX', 'XX\nXX'],
  T: ['.X.\nXXX\n...', '.X.\n.XX\n.X.', '...\nXXX\n.X.', '.X.\nXX.\n.X.'],
  S: ['.XX\nXX.\n...', '.X.\n.XX\n..X', '...\n.XX\nXX.', 'X..\nXX.\n.X.'],
  Z: ['XX.\n.XX\n...', '..X\n.XX\n.X.', '...\nXX.\n.XX', '.X.\nXX.\nX..'],
  J: ['X..\nXXX\n...', '.XX\n.X.\n.X.', '...\nXXX\n..X', '.X.\n.X.\nXX.'],
  L: ['..X\nXXX\n...', '.X.\n.X.\n.XX', '...\nXXX\nX..', 'XX.\n.X.\n.X.'],
};

function parseShape(art) {
  const rows = art.split('\n');
  const cells = [];
  rows.forEach((r, y) => [...r].forEach((ch, x) => { if (ch === 'X') cells.push([x, y]); }));
  const minX = Math.min(...cells.map((c) => c[0]));
  const minY = Math.min(...cells.map((c) => c[1]));
  const norm = cells.map(([x, y]) => [x - minX, y - minY]).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  const w = Math.max(...norm.map((c) => c[0])) + 1;
  const h = Math.max(...norm.map((c) => c[1])) + 1;
  // 열별 가장 아래 셀의 dy (낙하 계산용)
  const bottom = new Array(w).fill(-1);
  for (const [x, y] of norm) bottom[x] = Math.max(bottom[x], y);
  return { cells: norm, w, h, bottom };
}

// SHAPES[pieceIndex][rot] = { cells: [[dx,dy]...], w, h, bottom[] }
export const SHAPES = PIECES.map((p) => SRS[p].map(parseShape));

export const pieceIndex = (name) => PIECES.indexOf(name);

export function emptyBoard() {
  return new Uint8Array(CELLS);
}

// 열 x 에서 가장 위 고정 블록의 row. 비어 있으면 HEIGHT.
function surface(board, x) {
  for (let y = 0; y < HEIGHT; y++) if (board[y * WIDTH + x]) return y;
  return HEIGHT;
}

// 조각을 (col, rot) 로 하드드롭했을 때 바운딩 박스 윗행. 보드 위로 삐져나오면 음수.
// col 이 바운딩 박스 기준으로 보드를 벗어나면 null.
export function dropRow(board, piece, col, rot) {
  const s = SHAPES[piece][rot & 3];
  if (col < 0 || col + s.w > WIDTH) return null;
  let top = HEIGHT;
  for (let x = 0; x < s.w; x++) {
    const r = surface(board, col + x) - 1 - s.bottom[x];
    if (r < top) top = r;
  }
  return top;
}

export const actionIndex = (col, rot) => col * ROTATIONS + rot;
export const actionFromIndex = (a) => ({ col: Math.floor(a / ROTATIONS), rot: a % ROTATIONS });

// 조각이 보드 안에 완전히 들어가는 (col, rot) 목록. 비어 있으면 게임 오버.
export function legalPlacements(board, piece) {
  const out = [];
  for (let rot = 0; rot < ROTATIONS; rot++) {
    const s = SHAPES[piece][rot];
    for (let col = 0; col + s.w <= WIDTH; col++) {
      if (dropRow(board, piece, col, rot) >= 0) out.push({ col, rot });
    }
  }
  return out;
}

// 하드드롭 + 고정 + 라인 클리어. 새 보드를 돌려준다.
// 조각이 보드 위로 삐져나오는 배치는 gameOver=true, 보드는 그대로 (복사본).
// landingRow / erodedPieceCells 는 Dellacherie 특징 계산용 부가 정보.
// top 을 주면 그 행에 고정한다 (대전 엔진의 회전 마무리 배치 — 수직 낙하 정지 행과 다를 수 있다). 기본은 dropRow.
export function applyPlacement(board, piece, col, rot, top) {
  const s = SHAPES[piece][rot & 3];
  if (top === undefined) top = dropRow(board, piece, col, rot);
  if (top === null) throw new RangeError(`placement out of bounds: piece ${PIECES[piece]} col ${col} rot ${rot}`);
  if (top < 0) return { board: new Uint8Array(board), linesCleared: 0, gameOver: true, landingRow: top, erodedPieceCells: 0 };

  const next = new Uint8Array(board);
  for (const [dx, dy] of s.cells) next[(top + dy) * WIDTH + col + dx] = 1;

  // 라인 클리어: 꽉 찬 행을 지우고 위를 내린다
  const pieceRows = new Set(s.cells.map(([, dy]) => top + dy));
  let linesCleared = 0;
  let erodedPieceCells = 0;
  let write = HEIGHT - 1;
  for (let y = HEIGHT - 1; y >= 0; y--) {
    let full = true;
    for (let x = 0; x < WIDTH; x++) if (!next[y * WIDTH + x]) { full = false; break; }
    if (full) {
      linesCleared++;
      if (pieceRows.has(y)) erodedPieceCells += s.cells.filter(([, dy]) => top + dy === y).length;
      continue;
    }
    if (write !== y) next.copyWithin(write * WIDTH, y * WIDTH, (y + 1) * WIDTH);
    write--;
  }
  if (write >= 0) next.fill(0, 0, (write + 1) * WIDTH);

  return { board: next, linesCleared, gameOver: false, landingRow: top, erodedPieceCells };
}

// 표준 7-bag: 7종을 섞어 순서대로 내고, 다 쓰면 다시 섞는다. next piece 는 노출하지 않는다.
export function createBag(rng) {
  let bag = [];
  return {
    next() {
      if (bag.length === 0) bag = rng.shuffle([0, 1, 2, 3, 4, 5, 6]);
      return bag.pop();
    },
  };
}

export function boardToString(board) {
  const lines = [];
  for (let y = 0; y < HEIGHT; y++) {
    let s = '';
    for (let x = 0; x < WIDTH; x++) s += board[y * WIDTH + x] ? '#' : '.';
    lines.push(s);
  }
  return lines.join('\n');
}

export function boardFromString(str) {
  const rows = str.trim().split('\n').map((r) => r.trim());
  const board = emptyBoard();
  const offset = HEIGHT - rows.length; // 아래 정렬
  rows.forEach((r, i) => [...r].forEach((ch, x) => { if (ch === '#') board[(offset + i) * WIDTH + x] = 1; }));
  return board;
}

// =====================================================================================================================
// 대전 엔진 (6단계). 이 아래는 모두 순수 함수 — 플레이어 상태는 plain object, 보드는 새 Uint8Array 로 복사해 돌려준다.
//
// 플레이어 상태 { seed, seq, drawn, current, hold, holdUsed, board, garbage: [{ lines, hole }], combo, pieces, dead, stats }
//   seq/drawn  순수 7-bag: pieceSequence(seed).at(k) 가 k 번째 조각. drawn = 큐에서 꺼낸 조각 수 (current 포함).
//   hold       1칸. holdSwap 은 배치당 1회 (holdUsed) — 조각을 놓기(placePiece) 전까지 다시 못 쓴다.
//   garbage    받을 가비지 큐 (FIFO). 공격 상쇄 뒤 남은 것이 조각 확정 직후, 그 배치가 줄을 지우지 않았을 때 하단에 들어간다.
//              한 번의 공격(enqueue 1회)으로 들어온 줄들은 같은 구멍 열을 쓴다 (표준 관행). 한 번에 최대 GARBAGE_CAP 줄.
//   combo      연속 클리어 수 (첫 클리어 = 1, 클리어 없는 배치에서 0).
//
// 공격 (가이드라인 준거, B2B 보너스는 구현하지 않음):
//   줄 1/2/3/4 → 0/1/2/4,  T-스핀(full) 1/2/3 → 2/4/6,  T-스핀 mini 는 일반 줄 취급,
//   콤보 보너스 COMBO_TABLE (1–2 +0, 3–4 +1, 5–6 +2, 7–10 +3, 11+ +4),  퍼펙트 클리어 +10.
//   상쇄: 보낼 라인 < 받을 큐면 큐에서 차감하고 0 을 보낸다 (잔여만 수신). 보낼 라인 ≥ 큐면 큐를 비우고 차액을 보낸다.
// T-스핀: 조각이 T 이고 배치가 회전 마무리(spin) 이며 T 박스 3×3 의 네 모서리 중 3개 이상이 채움(벽·바닥 포함). 앞쪽(가리키는 쪽)
//   두 모서리가 모두 채움이거나 5번째 킥(TST 킥)으로 들어왔으면 full, 아니면 mini.

export const NEXT_VISIBLE = 5;
export const GARBAGE_CAP = 8;                 // 한 배치 확정 시 들어가는 최대 가비지 줄 수 (잔여는 큐에 남는다)
export const ATTACK_LINES = [0, 0, 1, 2, 4];  // 인덱스 = 지운 줄 수
export const ATTACK_TSPIN = [0, 2, 4, 6];     // 인덱스 = T-스핀(full) 으로 지운 줄 수
export const ATTACK_PERFECT_CLEAR = 10;
export const COMBO_TABLE = [[2, 0], [4, 1], [6, 2], [10, 3], [Infinity, 4]]; // [콤보 상한, 보너스]

export function comboBonus(combo) {
  if (combo <= 0) return 0;
  for (const [max, bonus] of COMBO_TABLE) if (combo <= max) return bonus;
  return COMBO_TABLE[COMBO_TABLE.length - 1][1];
}

// ---------- SRS 박스 좌표 · 킥 ----------

// 문자 그림 그대로의 박스 좌표 (정규화 전). 회전은 박스를 고정한 채 셀만 바꾸고 킥으로 평행이동한다.
function parseBox(art) {
  const rows = art.split('\n');
  const cells = [];
  rows.forEach((r, y) => [...r].forEach((ch, x) => { if (ch === 'X') cells.push([x, y]); }));
  return { cells, size: rows.length, minX: Math.min(...cells.map((c) => c[0])), minY: Math.min(...cells.map((c) => c[1])) };
}
export const BOXES = PIECES.map((p) => SRS[p].map(parseBox));

// SRS 킥 오프셋 [dx, dy], 보드 좌표 (y 아래로 증가). KICKS[piece][from][to] — 인접 회전 전이만 (90°).
const K_JLSTZ = {
  '0>1': [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  '1>0': [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  '1>2': [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  '2>1': [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  '2>3': [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  '3>2': [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  '3>0': [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  '0>3': [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
};
const K_I = {
  '0>1': [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
  '1>0': [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
  '1>2': [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
  '2>1': [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
  '2>3': [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
  '3>2': [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
  '3>0': [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
  '0>3': [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
};
export const kicksFor = (piece, from, to) => (PIECES[piece] === 'I' ? K_I : K_JLSTZ)[`${from}>${to}`];

const T_PIECE = PIECES.indexOf('T');
const O_PIECE = PIECES.indexOf('O');

// 보드 위 스폰·이동용 여분 행 (보이지 않음). 조각은 여기서 스폰해 좌우 이동·회전할 수 있고, 여기에 걸쳐 고정되는 위치는 탑아웃(lock out) 이라
// 후보에서 뺀다. 가비지가 블록을 이 영역으로 밀어 올리면 탑아웃 (receiveGarbage).
export const BUFFER = 2;

// 열별 표면 행 (비어 있으면 HEIGHT)
export function surfaces(board) {
  const s = new Int32Array(WIDTH);
  for (let x = 0; x < WIDTH; x++) s[x] = surface(board, x);
  return s;
}
export function columnHeights(board) {
  const s = surfaces(board);
  return Array.from(s, (v) => HEIGHT - v);
}
// 가장 높은 열의 높이 (빈 보드 0)
export function boardHeight(board) {
  let h = 0;
  for (let x = 0; x < WIDTH; x++) { const v = HEIGHT - surface(board, x); if (v > h) h = v; }
  return h;
}

// 스폰 박스 위치: 회전 0, 가로 중앙, 조각 전체가 버퍼 안 (가이드라인의 스카이라인 위 스폰).
export function spawnBox(piece) {
  const b = BOXES[piece][0];
  const maxY = Math.max(...b.cells.map((c) => c[1]));
  return { bx: Math.floor((WIDTH - b.size) / 2), by: -(maxY + 1) };
}

// 가이드라인 이동으로 도달 가능한 정지 위치 전체 (BFS). 이동 = 좌 / 우 / 아래 1칸(소프트드롭) / 시계·반시계 회전(SRS 킥, 순서대로 첫 성공).
// 정지 = 아래로 못 내려가는 상태. 각 정지 위치에 마지막 동작 종류를 붙인다:
//   spin   어떤 도달 가능 상태에서 회전 한 번으로 이 위치에 온다 (마지막 동작 = 회전 → T-스핀 판정에 쓴다)
//   drop   좌·우·아래 이동으로 온다 (마지막 동작 = 이동/낙하)
//   kick5  회전 경로 중 5번째 킥(TST 킥)을 쓴 것이 있다
// 스폰 위치가 막혀 있으면 [] (block out). 버퍼에 걸쳐 고정되는 위치(lock out)는 뺀다. 반환은 (rot, col, top) 정렬.
//
// 비용: 스카이라인(가장 높은 열) 위의 빈 영역에서는 조각이 자유롭게 움직이므로 그 영역 전체를 탐색하지 않고, (rot, bx) 마다 빈 영역의
// 가장 낮은 행을 시드로 넣어 그 아래만 BFS 한다. 스카이라인이 버퍼에 닿을 만큼 높으면(사망 직전) 스폰에서 전부 탐색한다.
const FLAT = PIECES.map((_, p) => BOXES[p].map((b) => ({
  xs: Int8Array.from(b.cells.map((c) => c[0])), ys: Int8Array.from(b.cells.map((c) => c[1])),
  minX: b.minX, maxX: Math.max(...b.cells.map((c) => c[0])), minY: b.minY, maxY: Math.max(...b.cells.map((c) => c[1])), size: b.size,
})));
const KICKS = PIECES.map((_, p) => Array.from({ length: 16 }, (_, ft) => {
  const from = ft >> 2, to = ft & 3;
  return (to === (from + 1) % 4 || to === (from + 3) % 4) && p !== O_PIECE ? kicksFor(p, from, to) : null;
}));

function fitsFlat(board, f, bx, by) {
  const { xs, ys } = f;
  for (let k = 0; k < 4; k++) {
    const x = bx + xs[k], y = by + ys[k];
    if (x < 0 || x >= WIDTH || y < -BUFFER || y >= HEIGHT) return false;
    if (y >= 0 && board[y * WIDTH + x]) return false;
  }
  return true;
}

export function reachablePlacements(board, piece) {
  const flats = FLAT[piece];
  const size = flats[0].size;
  const NX = WIDTH + size - 1, NY = HEIGHT + BUFFER + size - 1;
  const idx = (rot, bx, by) => (rot * NX + bx + size - 1) * NY + by + BUFFER + size - 1;
  const flags = new Uint8Array(4 * NX * NY); // bit0 도달, bit1 spin, bit2 drop, bit3 kick5
  const { bx: sx, by: sy } = spawnBox(piece);
  if (!fitsFlat(board, flats[0], sx, sy)) return [];
  const queue = new Int32Array(4 * NX * NY);
  let qn = 0;
  const visit = (rot, bx, by, bit) => {
    const i = idx(rot, bx, by);
    if ((flags[i] & 1) === 0) queue[qn++] = i;
    flags[i] |= 1 | bit;
  };
  // 시드: 스카이라인 위 빈 영역의 가장 낮은 행 (rot, bx 마다). 조각 전체가 필드(버퍼 포함) 안에 있어야 한다.
  let minSurface = HEIGHT;
  for (let x = 0; x < WIDTH; x++) { const s = surface(board, x); if (s < minSurface) minSurface = s; }
  let seeded = false;
  const nRot = piece === O_PIECE ? 1 : 4;
  for (let rot = 0; rot < nRot; rot++) {
    const f = flats[rot];
    const by = minSurface - 1 - f.maxY;
    if (by + f.minY < -BUFFER) continue;
    for (let bx = -f.minX; bx + f.maxX < WIDTH; bx++) { visit(rot, bx, by, 4); seeded = true; }
  }
  if (!seeded) visit(0, sx, sy, 4);
  for (let qi = 0; qi < qn; qi++) {
    const i = queue[qi];
    const by = (i % NY) - BUFFER - size + 1, r = Math.floor(i / NY), bx = (r % NX) - size + 1, rot = Math.floor(r / NX);
    const f = flats[rot];
    if (fitsFlat(board, f, bx - 1, by)) visit(rot, bx - 1, by, 4);
    if (fitsFlat(board, f, bx + 1, by)) visit(rot, bx + 1, by, 4);
    if (fitsFlat(board, f, bx, by + 1)) visit(rot, bx, by + 1, 4);
    if (nRot === 1) continue;
    for (const to of [(rot + 1) & 3, (rot + 3) & 3]) {
      const tf = flats[to];
      const kicks = KICKS[piece][(rot << 2) | to];
      for (let k = 0; k < kicks.length; k++) {
        const nx = bx + kicks[k][0], ny = by + kicks[k][1];
        if (!fitsFlat(board, tf, nx, ny)) continue;
        visit(to, nx, ny, 2 | (k === 4 ? 8 : 0));
        break; // 첫 번째로 들어가는 킥이 회전 결과
      }
    }
  }
  const out = [];
  for (let qi = 0; qi < qn; qi++) {
    const i = queue[qi];
    const by = (i % NY) - BUFFER - size + 1, r = Math.floor(i / NY), bx = (r % NX) - size + 1, rot = Math.floor(r / NX);
    const f = flats[rot];
    if (fitsFlat(board, f, bx, by + 1)) continue; // 정지 아님
    if (by + f.minY < 0) continue;                // lock out
    const fl = flags[i];
    out.push({ col: bx + f.minX, rot, top: by + f.minY, spin: (fl & 2) !== 0, drop: (fl & 4) !== 0, kick5: (fl & 8) !== 0 });
  }
  return out.sort((a, b) => a.rot - b.rot || a.col - b.col || a.top - b.top);
}

// 대전용 합법 배치 = reachablePlacements 를 결과 셀 집합으로 합친 것 (O 의 4 회전, S/Z/I 의 2 회전은 같은 보드). 플래그는 OR.
export function legalPlacementsVersus(board, piece) {
  const byCells = new Map();
  for (const p of reachablePlacements(board, piece)) {
    const s = SHAPES[piece][p.rot];
    let key = 0; // 셀 인덱스 4개 (오름차순) 를 200진법으로
    for (let k = s.cells.length - 1; k >= 0; k--) key = key * 200 + (p.top + s.cells[k][1]) * WIDTH + p.col + s.cells[k][0];
    const prev = byCells.get(key);
    if (prev) { prev.spin = prev.spin || p.spin; prev.drop = prev.drop || p.drop; prev.kick5 = prev.kick5 || p.kick5; } else byCells.set(key, { ...p });
  }
  return [...byCells.values()].sort((a, b) => a.rot - b.rot || a.col - b.col || a.top - b.top);
}

// T-스핀 분류. board 는 고정 직전 보드 (이번 조각 셀 제외). (col, rot, top) 은 정규화(바운딩 박스) 좌표. 반환 null | 'mini' | 'full'.
export function classifyTSpin(board, piece, col, rot, top, { spin, kick5 = false }) {
  if (piece !== T_PIECE || !spin) return null;
  const box = BOXES[piece][rot & 3];
  const bx = col - box.minX, by = top - box.minY; // 3×3 박스 원점
  const filled = (x, y) => x < 0 || x >= WIDTH || y >= HEIGHT || (y >= 0 && board[y * WIDTH + x] === 1);
  const tl = filled(bx, by), tr = filled(bx + 2, by), bl = filled(bx, by + 2), br = filled(bx + 2, by + 2);
  const n = tl + tr + bl + br;
  if (n < 3) return null;
  const front = [[tl, tr], [tr, br], [bl, br], [tl, bl]][rot & 3]; // 가리키는 쪽 모서리 두 개
  return (front[0] && front[1]) || kick5 ? 'full' : 'mini';
}

// 가비지 k 줄을 하단에 삽입 (구멍 열 hole). 위로 밀린 블록이 보드를 벗어나면 toppedOut.
export function receiveGarbage(board, lines, hole) {
  if (lines <= 0) return { board: new Uint8Array(board), toppedOut: false };
  const next = new Uint8Array(CELLS);
  let toppedOut = false;
  for (let c = 0; c < lines * WIDTH; c++) if (board[c]) { toppedOut = true; break; }
  next.set(board.subarray(lines * WIDTH), 0);
  for (let y = HEIGHT - lines; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) next[y * WIDTH + x] = x === hole ? 0 : 1;
  return { board: next, toppedOut };
}

// ---------- 순수 7-bag ----------

// 시드의 조각 열. at(k) 는 k 번째 조각 (0-based). createBag(createRng(seed)) 의 next() 순서와 같다. 결정적·추가 전용.
const sequences = new Map();
export function pieceSequence(seed) {
  if (sequences.has(seed)) return sequences.get(seed);
  if (sequences.size >= 512) sequences.clear(); // 워커에서 게임 수천 판을 돌릴 때의 메모리 상한
  const rng = createRng(seed);
  const pieces = [];
  const seq = {
    seed,
    at(k) {
      while (pieces.length <= k) { const bag = rng.shuffle([0, 1, 2, 3, 4, 5, 6]); while (bag.length) pieces.push(bag.pop()); }
      return pieces[k];
    },
  };
  sequences.set(seed, seq);
  return seq;
}

// ---------- 플레이어 상태 ----------

export function createPlayer(seed) {
  const seq = pieceSequence(seed);
  return {
    seed, seq, drawn: 1, current: seq.at(0), hold: null, holdUsed: false,
    board: emptyBoard(), garbage: [], combo: 0, pieces: 0, dead: false,
    stats: { attack: 0, sent: 0, cancelled: 0, lines: 0, tetris: 0, tspin: 0, tspinMini: 0, perfectClear: 0, garbageReceived: 0, maxCombo: 0, holds: 0 },
  };
}

export const nextQueue = (p, n = NEXT_VISIBLE) => Array.from({ length: n }, (_, i) => p.seq.at(p.drawn + i));
export const pendingGarbage = (p) => p.garbage.reduce((s, g) => s + g.lines, 0);
// hold 를 쓰면 놓게 되는 조각 (hold 가 비어 있으면 next[0])
export const holdPiece = (p) => (p.hold === null ? p.seq.at(p.drawn) : p.hold);

// hold 교환. 배치당 1회 — 이미 썼으면 throw. hold 가 비어 있으면 next[0] 이 현재 조각이 된다.
export function holdSwap(p) {
  if (p.holdUsed) throw new Error('hold already used for this placement');
  if (p.hold === null) return { ...p, hold: p.current, current: p.seq.at(p.drawn), drawn: p.drawn + 1, holdUsed: true, stats: { ...p.stats, holds: p.stats.holds + 1 } };
  return { ...p, hold: p.current, current: p.hold, holdUsed: true, stats: { ...p.stats, holds: p.stats.holds + 1 } };
}

// 가비지 큐에 넣는다 (한 번의 공격 = 같은 구멍 열).
export function enqueueGarbage(p, lines, hole) {
  if (lines <= 0) return p;
  if (!(hole >= 0 && hole < WIDTH)) throw new RangeError(`garbage hole out of range: ${hole}`);
  return { ...p, garbage: [...p.garbage, { lines, hole }] };
}

// 현재 조각을 (col, rot[, top]) 에 고정. 라인 클리어 → 공격 계산 → 가비지 상쇄 → (클리어 없으면) 가비지 삽입 → 다음 조각.
// 반환 { player, event }. event: { piece, col, rot, top, spin, linesCleared, tspin, perfectClear, combo, attack(상쇄 전), sent(상쇄 후),
//   cancelled, garbageInserted, toppedOut, landingRow, erodedPieceCells, board(라인 클리어 후·가비지 전) }
export function placePiece(p, { col, rot, top, spin = false, kick5 = false }) {
  if (p.dead) throw new Error('player is dead');
  const piece = p.current;
  const r = applyPlacement(p.board, piece, col, rot, top);
  const t = r.landingRow;
  const base = { piece, col, rot, top: t, spin, landingRow: t, erodedPieceCells: r.erodedPieceCells };
  if (r.gameOver) {
    return { player: { ...p, dead: true, holdUsed: false }, event: { ...base, linesCleared: 0, tspin: null, perfectClear: false, combo: 0, attack: 0, sent: 0, cancelled: 0, garbageInserted: 0, toppedOut: true, board: r.board } };
  }
  // T-스핀은 고정 직전 보드(이번 조각 셀 제외)에서 모서리를 본다
  const tspin = classifyTSpin(p.board, piece, col, rot, t, { spin, kick5 });
  const lines = r.linesCleared;
  const combo = lines > 0 ? p.combo + 1 : 0;
  let perfectClear = false;
  if (lines > 0) { perfectClear = true; for (let c = 0; c < CELLS; c++) if (r.board[c]) { perfectClear = false; break; } }
  let attack = 0;
  if (lines > 0) {
    attack = (tspin === 'full' ? ATTACK_TSPIN[lines] : ATTACK_LINES[lines]) + comboBonus(combo) + (perfectClear ? ATTACK_PERFECT_CLEAR : 0);
  }
  // 상쇄
  let garbage = p.garbage;
  let sent = attack, cancelled = 0;
  if (attack > 0 && garbage.length) {
    let remain = attack;
    garbage = [];
    for (const g of p.garbage) {
      if (remain >= g.lines) { remain -= g.lines; cancelled += g.lines; } else if (remain > 0) { garbage.push({ lines: g.lines - remain, hole: g.hole }); cancelled += remain; remain = 0; } else garbage.push(g);
    }
    sent = remain;
  }
  // 가비지 삽입: 이 배치가 줄을 지우지 않았을 때, 큐 앞에서부터 최대 GARBAGE_CAP 줄
  let board = r.board;
  let garbageInserted = 0, toppedOut = false;
  if (lines === 0 && garbage.length) {
    let budget = GARBAGE_CAP;
    const rest = [];
    for (const g of garbage) {
      if (budget <= 0) { rest.push(g); continue; }
      const k = Math.min(budget, g.lines);
      const rg = receiveGarbage(board, k, g.hole);
      board = rg.board; toppedOut = toppedOut || rg.toppedOut; garbageInserted += k; budget -= k;
      if (k < g.lines) rest.push({ lines: g.lines - k, hole: g.hole });
    }
    garbage = rest;
  }
  const stats = {
    ...p.stats,
    attack: p.stats.attack + attack, sent: p.stats.sent + sent, cancelled: p.stats.cancelled + cancelled, lines: p.stats.lines + lines,
    tetris: p.stats.tetris + (lines === 4 ? 1 : 0), tspin: p.stats.tspin + (tspin === 'full' && lines > 0 ? 1 : 0), tspinMini: p.stats.tspinMini + (tspin === 'mini' && lines > 0 ? 1 : 0),
    perfectClear: p.stats.perfectClear + (perfectClear ? 1 : 0), garbageReceived: p.stats.garbageReceived + garbageInserted, maxCombo: Math.max(p.stats.maxCombo, combo),
  };
  const player = {
    ...p, board, garbage, combo, holdUsed: false, pieces: p.pieces + 1, dead: toppedOut, stats,
    current: p.seq.at(p.drawn), drawn: p.drawn + 1,
  };
  return { player, event: { ...base, linesCleared: lines, tspin, perfectClear, combo, attack, sent, cancelled, garbageInserted, toppedOut, board: r.board } };
}

// 한 결정의 후보 전체: 현재 조각의 배치 ∪ (hold 미사용이면) hold 조각의 배치. 후보 { useHold, piece, col, rot, top, spin, drop, kick5 }.
// 게임오버가 되는 배치(top < 0)는 legalPlacements 단계에서 이미 빠진다. hold 조각이 현재 조각과 같으면 hold 쪽은 생략 (같은 보드).
export function decisionCandidates(p) {
  const out = [];
  for (const c of legalPlacementsVersus(p.board, p.current)) out.push({ useHold: false, piece: p.current, ...c });
  if (!p.holdUsed) {
    const hp = holdPiece(p);
    if (hp !== p.current) for (const c of legalPlacementsVersus(p.board, hp)) out.push({ useHold: true, piece: hp, ...c });
  }
  return out;
}

// 결정 적용: hold 여부 + 배치. 반환 { player, event }
export function applyDecision(p, cand) {
  const q = cand.useHold ? holdSwap(p) : p;
  return placePiece(q, cand);
}

// 두 플레이어 교대 대전 (턴 = 양쪽이 한 조각씩). agent.choose(player) → 후보 | null. 상대의 sent 는 hole 을 rng 로 골라 큐에 넣는다.
// cap 조각(플레이어당) 상한. 반환 { winner: 0|1|null, pieces, a, b } (a/b 는 최종 상태).
export function playMatch(agents, { seedA, seedB, seed = 1, cap = 1000 } = {}) {
  const rng = createRng(seed);
  const players = [createPlayer(seedA), createPlayer(seedB)];
  let pieces = 0;
  while (pieces < cap) {
    for (let i = 0; i < 2; i++) {
      const me = players[i], other = players[1 - i];
      const cand = agents[i].choose(me);
      if (!cand) { players[i] = { ...me, dead: true }; break; }
      const { player, event } = applyDecision(me, cand);
      players[i] = player;
      if (event.sent > 0) players[1 - i] = enqueueGarbage(other, event.sent, rng.int(WIDTH));
      if (player.dead) break;
    }
    if (players[0].dead || players[1].dead) break;
    pieces++;
  }
  const [a, b] = players;
  const winner = a.dead && !b.dead ? 1 : b.dead && !a.dead ? 0 : null;
  return { winner, pieces, a, b };
}
