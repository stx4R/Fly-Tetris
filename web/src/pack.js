// 워커 ↔ 앱 ↔ IndexedDB 가 같이 쓰는 값 포장. 보드는 비트 200개, 실수 벡터는 바이트 양자화.
//
// 보드: 200칸 0/1 → 25바이트 → base64. util.js 의 unpackBoard 와 같은 비트 순서(LSB first)다.
// 실수 벡터: [min, max] 로 정규화한 Uint8 + 스케일. 화면은 히트맵·래스터라 8비트면 충분하고,
//            이걸로 결정 하나가 28 KB 쯤에 들어가 최근 판을 브라우저에 통째로 남길 수 있다.

export const CELLS = 200;

export function packBoard(board) {
  const bytes = new Uint8Array(Math.ceil(CELLS / 8));
  for (let c = 0; c < CELLS; c++) if (board[c]) bytes[c >> 3] |= 1 << (c & 7);
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}

export function unpackBoard(str) {
  const bin = atob(str);
  const board = new Uint8Array(CELLS);
  for (let c = 0; c < CELLS; c++) board[c] = (bin.charCodeAt(c >> 3) >> (c & 7)) & 1;
  return board;
}

// 실수 배열 → { data: Uint8Array, min, max }. 전부 같은 값이면 max = min 이고 data 는 0 이다.
export function quantize(values) {
  let min = Infinity, max = -Infinity;
  for (const v of values) { if (v < min) min = v; if (v > max) max = v; }
  if (!Number.isFinite(min)) { min = 0; max = 0; }
  const span = max - min;
  const data = new Uint8Array(values.length);
  if (span > 0) for (let i = 0; i < values.length; i++) data[i] = Math.round(((values[i] - min) / span) * 255);
  return { data, min, max };
}

export const dequantOne = (q, i) => (q.max > q.min ? q.min + (q.data[i] / 255) * (q.max - q.min) : q.min);

// 양자화 벡터의 i번째 행(길이 n) 을 0..1 로 편 값 (히트맵 색·래스터 밝기용).
export function normRow(q, row, n) {
  const out = new Float32Array(n);
  const base = row * n;
  for (let i = 0; i < n; i++) out[i] = q.data[base + i] / 255;
  return out;
}
