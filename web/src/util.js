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

// 조건 라벨 (README §4단계 정의). 화면 전체에서 같은 이름을 쓴다.
export const COND_ORDER = ['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
export const COND = {
  C0: { en: 'real', ko: '실제 배선', desc: 'hemibrain 위상을 그대로 써요. 기준 조건이에요.' },
  C1: { en: 'degree-shuffle', ko: '차수 보존 재배선', desc: '각 뉴런의 in/out 차수와 출력 가중치를 보존한 재배선이에요.' },
  C2: { en: 'weight-shuffle', ko: '가중치 순열', desc: '배선은 그대로 두고 가중치만 간선 사이에서 섞어요.' },
  C3: { en: 'erdos-renyi', ko: '층 블록 ER', desc: '층 블록별 간선 수만 보존한 완전 무작위 배선이에요.' },
  C4: { en: 'KC-ablated', ko: 'KC 제거', desc: '버섯체 Kenyon cell을 제거한 ablation이에요.' },
  C5: { en: 'direct-ablated', ko: '직접 간선 제거', desc: '입력→출력 직접 간선 1,531개를 제거했어요.' },
  C6: { en: 'activity-only', ko: '활동량 요약', desc: 'DN 발화 대신 활동량 요약 5개만 리드아웃에 넣는 교란 통제예요.' },
};
export const condLabel = (c) => `${c} ${COND[c]?.en ?? ''}`.trim();
export const fmtCI = (ci, d = 3) => (ci ? `[${fmt(ci[0], d)}, ${fmt(ci[1], d)}]` : '—');

// <svg><use href="#id"/></svg> 아이콘 (index.html 의 심볼 스프라이트)
export function icon(id, size = 18) {
  const s = svgEl('svg', { width: size, height: size, 'aria-hidden': 'true' });
  s.appendChild(svgEl('use', { href: `#${id}` }));
  return s;
}
