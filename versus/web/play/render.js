// 8단계 — 대전 보드 렌더 (캔버스). 토스 리디자인 기준.
//
// 캔버스는 **보드만** 그린다. HOLD·NEXT·대기 가비지·COMBO 는 DOM 이 맡는다 (versus.html).
// 캔버스 크기 = 10칸 × (20 + 버퍼 2)칸. 엔진이 조각을 버퍼(y = -2, -1)에서 스폰하므로 그 두 줄을
// 흐리게 같이 그려야 새 조각이 보인다.
//
// 색은 콘솔(web/style.css)과 같은 토스 토큰을 쓴다: 빈 칸 grey-100, 격자 grey-200, 쌓인 블록 grey-400.
// 조각 7색만 예외로 유채색을 쓴다 — 조각 색은 크롬이 아니라 콘텐츠라서다. 7색 모두 토스 base 에서 파생했고
// blue-500 은 CTA 와 J 조각에만 나온다.
//
// 주의 — 좌표계가 둘이다.
//   SHAPES[piece][rot].cells : 정규화 좌표 (minX/minY 를 뺀 것). (col, top) 과 짝이다.
//   pieceCells(piece, rot, bx, by) : 박스 좌표에서의 실제 보드 셀. kinematics 의 (bx, by) 와 짝이다.
// 현재 조각·고스트는 (bx, by) 로 들고 있으므로 반드시 pieceCells 를 써야 한다 (28개 회전 중 14개가 어긋난다).

import { HEIGHT, WIDTH, pieceCells } from '../../src/tetris.js';

// I O T S Z J L — 토스 base 파생 (근거는 시안 1c)
export const PIECE_COLORS = [
  'oklch(0.700 0.130 205)', // I  blue 에서 hue 만 이동
  'oklch(0.840 0.171 87)',  // O  yellow
  'oklch(0.624 0.176 300)', // T  blue-500 과 동일 L·C
  'oklch(0.600 0.150 154)', // S  green-500 +L (면적색이라 한 단계 밝게)
  'oklch(0.628 0.218 22)',  // Z  red-500 (가비지 경고와 같은 hue)
  'oklch(0.624 0.176 254)', // J  blue-500
  'oklch(0.748 0.183 56)',  // L  orange-500
];
const EMPTY = 'oklch(0.957 0.005 247)';   // grey-100
const GRID = 'oklch(0.913 0.008 247)';    // grey-200
const STACK = 'oklch(0.752 0.016 251)';   // grey-400
const BUFFER_BG = 'oklch(0.978 0.003 247)'; // grey-50 — 스폰 구간은 보드보다 밝게

export const SHOW_BUFFER = 2;
export const ROWS = HEIGHT + SHOW_BUFFER;

export const boardSize = (cell) => ({ width: WIDTH * cell, height: ROWS * cell });

export function createRenderer(canvas, { cell = 30 } = {}) {
  const size = boardSize(cell);
  const dpr = Math.min(2, globalThis.devicePixelRatio || 1);
  canvas.width = Math.round(size.width * dpr);
  canvas.height = Math.round(size.height * dpr);
  canvas.style.width = `${size.width}px`;
  canvas.style.height = `${size.height}px`;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const rowY = (y) => (y + SHOW_BUFFER) * cell;   // 보드 좌표 y (음수 = 버퍼)
  const r = Math.max(2, Math.round(cell * 0.12)); // 셀 라운드 (시안의 3px @ 30px 셀)

  const cellRect = (x, y, color, alpha = 1) => {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x * cell + 1, rowY(y) + 1, cell - 2, cell - 2, r);
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  function draw(view) {
    // 바탕 — 버퍼 구간은 한 단계 밝게 해서 "여기는 아직 판이 아니다"를 보여준다
    ctx.fillStyle = BUFFER_BG;
    ctx.fillRect(0, 0, size.width, SHOW_BUFFER * cell);
    ctx.fillStyle = EMPTY;
    ctx.fillRect(0, SHOW_BUFFER * cell, size.width, HEIGHT * cell);

    // 1px 헤어라인 격자
    ctx.strokeStyle = GRID;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 1; x < WIDTH; x++) { ctx.moveTo(x * cell + 0.5, 0); ctx.lineTo(x * cell + 0.5, size.height); }
    for (let y = 1; y < ROWS; y++) { ctx.moveTo(0, y * cell + 0.5); ctx.lineTo(size.width, y * cell + 0.5); }
    ctx.stroke();
    // 버퍼와 판의 경계
    ctx.strokeStyle = 'oklch(0.840 0.012 248)'; // grey-300
    ctx.beginPath();
    ctx.moveTo(0, SHOW_BUFFER * cell + 0.5); ctx.lineTo(size.width, SHOW_BUFFER * cell + 0.5);
    ctx.stroke();

    // 쌓인 블록
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) if (view.board[y * WIDTH + x]) cellRect(x, y, STACK);
    }

    // 고스트 → 현재 조각 (겹치면 현재 조각이 위)
    const piece = (pc, alpha) => {
      for (const [gx, gy] of pieceCells(pc.piece, pc.rot, pc.bx, pc.by)) {
        if (gy >= -SHOW_BUFFER && gy < HEIGHT && gx >= 0 && gx < WIDTH) cellRect(gx, gy, PIECE_COLORS[pc.piece], alpha);
      }
    };
    if (view.ghost) piece(view.ghost, 0.20);
    if (view.piece) piece(view.piece, 1);
  }

  return { draw, size, cell };
}

// HOLD·NEXT 의 DOM 미니 조각 — 정규화 좌표(SHAPES)로 자체 그리드를 만든다 (보드 좌표와 무관).
export function miniGrid(piece, shapes, cellPx) {
  const s = shapes[piece][0];
  const el = document.createElement('div');
  el.className = 'vs-mini';
  el.style.gridTemplateColumns = `repeat(${s.w}, ${cellPx}px)`;
  el.style.gridTemplateRows = `repeat(${s.h}, ${cellPx}px)`;
  const filled = new Set(s.cells.map(([x, y]) => y * s.w + x));
  for (let i = 0; i < s.w * s.h; i++) {
    const d = document.createElement('div');
    if (filled.has(i)) d.style.background = PIECE_COLORS[piece];
    el.appendChild(d);
  }
  return el;
}
