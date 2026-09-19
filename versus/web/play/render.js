// 8단계 — 대전 화면 렌더 (캔버스). 한 쪽(사람/초파리)이 캔버스 하나를 쓴다.
// 레이아웃: [홀드] [대기 가비지 바] [보드 10×20] [넥스트 5]
//
// 엔진 보드는 0/1 만 담는다 (조각 종류를 남기지 않는다) — 그래서 쌓인 블록은 한 가지 색이고,
// 조각 색은 지금 움직이는 조각·고스트·홀드·넥스트에만 쓴다. 실제보다 화려하게 보이려고 색을 지어내지 않는다.

import { HEIGHT, PIECES, SHAPES, WIDTH, pieceCells } from '../../src/tetris.js';

// 주의 — 좌표계가 둘이다.
//   SHAPES[piece][rot].cells : 정규화 좌표 (바운딩 박스 기준, minX/minY 를 뺀 것). (col, top) 과 짝이다.
//   pieceCells(piece, rot, bx, by) : 박스 좌표 (bx, by) 에서의 실제 보드 셀. kinematics 의 (bx, by) 와 짝이다.
// 현재 조각·고스트는 (bx, by) 로 들고 있으므로 반드시 pieceCells 를 써야 한다. SHAPES 를 (bx, by) 에 그대로
// 더하면 28개 회전 중 14개가 최대 2칸 어긋나고(특히 I), 그리는 위치와 실제로 고정되는 위치가 달라진다.

export const PIECE_COLORS = ['#22d3ee', '#facc15', '#c084fc', '#4ade80', '#f87171', '#60a5fa', '#fb923c']; // I O T S Z J L
const STACK = '#94a3b8';
const GRID = 'rgba(148,163,184,0.14)';
const FRAME = 'rgba(148,163,184,0.45)';

const HOLD_CELLS = 5, NEXT_CELLS = 5, BAR_CELLS = 0.6, GAP = 0.4;
// 엔진은 조각을 버퍼(y = -2, -1)에서 스폰한다. 그 두 줄을 그리지 않으면 새 조각이 한 칸 떨어질 때까지 보이지 않아
// 사람이 조작할 수 없다. 그래서 버퍼를 흐리게 같이 그린다.
export const SHOW_BUFFER = 2;
export const TOP_PAD = 2.2; // 제목 줄과 HOLD/NEXT 라벨이 겹치지 않도록

export function rendererSize(cell) {
  const w = (HOLD_CELLS + GAP + BAR_CELLS + GAP + WIDTH + GAP + NEXT_CELLS) * cell;
  const h = (HEIGHT + SHOW_BUFFER + TOP_PAD) * cell;
  return { width: Math.round(w), height: Math.round(h) };
}

export function createRenderer(canvas, { cell = 22 } = {}) {
  const size = rendererSize(cell);
  const dpr = Math.min(2, globalThis.devicePixelRatio || 1);
  canvas.width = Math.round(size.width * dpr);
  canvas.height = Math.round(size.height * dpr);
  canvas.style.width = `${size.width}px`;
  canvas.style.height = `${size.height}px`;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const holdX = 0;
  const barX = (HOLD_CELLS + GAP) * cell;
  const boardX = barX + (BAR_CELLS + GAP) * cell;
  const nextX = boardX + (WIDTH + GAP) * cell;
  const bufY = TOP_PAD * cell;                  // 버퍼 영역(보이는 스폰 구간) 윗변
  const topY = bufY + SHOW_BUFFER * cell;       // 보드 y=0 의 윗변
  const rowY = (y) => topY + y * cell;          // 보드 좌표 y (음수 = 버퍼)

  const block = (x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x + 0.5, y + 0.5, cell - 1, cell - 1);
    ctx.fillStyle = 'rgba(255,255,255,0.14)';
    ctx.fillRect(x + 0.5, y + 0.5, cell - 1, Math.max(1, cell * 0.16));
  };

  // 4×4 미니 그리드에 조각 하나 (홀드·넥스트)
  const mini = (piece, cx, cy, mcell, dim = false) => {
    if (piece === null || piece === undefined) return;
    const s = SHAPES[piece][0];
    const w = s.w, cells = s.cells;
    const ox = cx + ((4 - w) * mcell) / 2;
    const oy = cy;
    for (const [dx, dy] of cells) {
      ctx.globalAlpha = dim ? 0.35 : 1;
      block(ox + dx * mcell, oy + dy * mcell, PIECE_COLORS[piece]);
      ctx.globalAlpha = 1;
    }
  };

  function draw(view, { label = '', status = '', highlight = false } = {}) {
    ctx.clearRect(0, 0, size.width, size.height);

    // 제목
    ctx.fillStyle = highlight ? '#e2e8f0' : '#94a3b8';
    ctx.font = `600 ${Math.round(cell * 0.62)}px ui-sans-serif, system-ui, sans-serif`;
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(label, holdX, cell * 0.95);
    if (status) {
      ctx.fillStyle = '#64748b';
      ctx.font = `${Math.round(cell * 0.5)}px ui-monospace, monospace`;
      ctx.fillText(status, boardX, cell * 0.95);
    }

    // 버퍼(스폰 구간) — 보드보다 어둡게, 경계선으로 구분
    ctx.fillStyle = 'rgba(15,23,42,0.28)';
    ctx.fillRect(boardX, bufY, WIDTH * cell, SHOW_BUFFER * cell);
    // 보드 배경 · 격자
    ctx.fillStyle = 'rgba(15,23,42,0.55)';
    ctx.fillRect(boardX, topY, WIDTH * cell, HEIGHT * cell);
    ctx.strokeStyle = GRID;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 1; x < WIDTH; x++) { ctx.moveTo(boardX + x * cell + 0.5, bufY); ctx.lineTo(boardX + x * cell + 0.5, topY + HEIGHT * cell); }
    for (let y = 1; y < HEIGHT; y++) { ctx.moveTo(boardX, rowY(y) + 0.5); ctx.lineTo(boardX + WIDTH * cell, rowY(y) + 0.5); }
    ctx.stroke();
    ctx.strokeStyle = 'rgba(148,163,184,0.3)';
    ctx.beginPath(); ctx.moveTo(boardX, topY + 0.5); ctx.lineTo(boardX + WIDTH * cell, topY + 0.5); ctx.stroke();

    // 쌓인 블록
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        if (view.board[y * WIDTH + x]) block(boardX + x * cell, rowY(y), STACK);
      }
    }

    // 고스트 → 현재 조각 순서로 (겹치면 현재 조각이 위)
    const drawPiece = (pc, alpha) => {
      ctx.globalAlpha = alpha;
      for (const [gx, gy] of pieceCells(pc.piece, pc.rot, pc.bx, pc.by)) {
        if (gy >= -SHOW_BUFFER && gy < HEIGHT && gx >= 0 && gx < WIDTH) block(boardX + gx * cell, rowY(gy), PIECE_COLORS[pc.piece]);
      }
      ctx.globalAlpha = 1;
    };
    if (view.ghost) drawPiece(view.ghost, 0.22);
    if (view.piece) drawPiece(view.piece, 1);

    // 보드 테두리
    ctx.strokeStyle = FRAME;
    ctx.strokeRect(boardX + 0.5, bufY + 0.5, WIDTH * cell - 1, (HEIGHT + SHOW_BUFFER) * cell - 1);

    // 대기 가비지 바 (아래에서 위로)
    ctx.fillStyle = 'rgba(148,163,184,0.18)';
    ctx.fillRect(barX, topY, BAR_CELLS * cell, HEIGHT * cell);
    const pending = Math.min(HEIGHT, view.pending ?? 0);
    if (pending > 0) {
      ctx.fillStyle = pending >= 4 ? '#ef4444' : '#f59e0b';
      ctx.fillRect(barX, topY + (HEIGHT - pending) * cell, BAR_CELLS * cell, pending * cell);
    }

    // 홀드
    const mcell = cell * 0.62;
    ctx.fillStyle = '#64748b';
    ctx.font = `${Math.round(cell * 0.46)}px ui-sans-serif, system-ui, sans-serif`;
    ctx.fillText('HOLD', holdX, topY - cell * 0.18);
    mini(view.hold, holdX, topY + cell * 0.2, mcell, view.holdUsed);

    // 넥스트 5
    ctx.fillStyle = '#64748b';
    ctx.fillText('NEXT', nextX, topY - cell * 0.18);
    (view.next ?? []).slice(0, 5).forEach((p, i) => mini(p, nextX, topY + cell * 0.2 + i * mcell * 3.2, mcell));

    // 통계
    ctx.fillStyle = '#64748b';
    ctx.font = `${Math.round(cell * 0.46)}px ui-monospace, monospace`;
    const st = view.stats ?? {};
    const lines = [`조각 ${view.pieces}`, `공격 ${st.attack ?? 0}`, `줄 ${st.lines ?? 0}`, `테트리스 ${st.tetris ?? 0}`];
    lines.forEach((t, i) => ctx.fillText(t, holdX, topY + cell * 5.4 + i * cell * 0.72));
    if (view.combo > 1) {
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(`${view.combo} COMBO`, holdX, topY + cell * 5.4 + 4 * cell * 0.72);
    }
  }

  return { draw, size, cell };
}
