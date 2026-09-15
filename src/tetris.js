// 배치 단위(placement-level) 테트리스 엔진. 순수 함수, 보드는 Uint8Array(200) 불변 취급.
//
// 보드 인덱스 = row * 10 + col, row 0 이 맨 위. 0 = 빈칸, 1 = 고정 블록.
// 행동 = (col, rot). col 은 회전 상태의 바운딩 박스 왼쪽 열, rot 는 SRS 회전 상태 0..3.
// 하드드롭만 있다 (중력 애니메이션·소프트드롭·킥 없음): 위에서 수직 낙하해 처음 닿는 곳에 고정.

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
export function applyPlacement(board, piece, col, rot) {
  const s = SHAPES[piece][rot & 3];
  const top = dropRow(board, piece, col, rot);
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
