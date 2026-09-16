// 공용 소도구: 보드 base64 해제, 켄달 τ-b (src/evaluate.js 와 동일 정의), DOM/SVG 생성, 숫자 서식.

export const CELLS = 200;
export function unpackBoard(str) {
  const bin = atob(str);
  const board = new Uint8Array(CELLS);
  for (let c = 0; c < CELLS; c++) board[c] = (bin.charCodeAt(c >> 3) >> (c & 7)) & 1;
  return board;
}

export function kendallTau(a, b) {
  const n = a.length;
  let conc = 0, disc = 0, tiesA = 0, tiesB = 0;
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    const da = Math.sign(a[i] - a[j]), db = Math.sign(b[i] - b[j]);
    if (da === 0 && db === 0) continue;
    if (da === 0) { tiesA++; continue; }
    if (db === 0) { tiesB++; continue; }
    if (da === db) conc++; else disc++;
  }
  const denom = Math.sqrt((conc + disc + tiesA) * (conc + disc + tiesB));
  return denom > 0 ? (conc - disc) / denom : 0;
}

export const fmt = (v, d = 2) => (v === null || v === undefined || Number.isNaN(v) ? '—' : Number(v).toFixed(d));
export const pct = (v, d = 0) => (v === null || v === undefined ? '—' : `${(v * 100).toFixed(d)}%`);

export function el(tag, attrs = {}, text) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) { if (k === 'class') e.className = v; else e.setAttribute(k, v); }
  if (text !== undefined) e.textContent = text;
  return e;
}
export function svgEl(tag, attrs = {}, text) {
  const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (text !== undefined) e.textContent = text;
  return e;
}
