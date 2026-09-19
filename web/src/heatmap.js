// DN 107개의 창평균 히트맵. 결정 탐색과 커넥톰 화면 두 곳에서 같은 후보를 그린다.
//
// 7단계 모델은 rate RNN 이라 DN 이 내놓는 것은 스파이크 수가 아니라 **창(25 스텝) 평균 활성**이고,
// 값은 음수일 수 있다. 그래서 0 이 아니라 '이 결정 안의 최솟값 → 최댓값'으로 정규화하고 눈금에 둘 다 적는다.
// 색: blue-50 → blue-500. 리저버가 고른 후보와 다른 DN 은 주황 테두리.

import { el } from './util.js';

const cellColor = (t) => `oklch(${(0.97 - t * 0.346).toFixed(3)} ${(0.02 + t * 0.156).toFixed(3)} 252)`;

// host: .heatmap 요소. q: { n, data, min, max } (양자화된 결정 전체), row: 후보 인덱스, ref: 비교 대상 후보 인덱스(없으면 null).
export function renderHeatmap(host, { q, row, ref = null, dnTypes = [] }) {
  const n = q.n;
  const base = row * n, refBase = ref === null ? -1 : ref * n;
  const frag = document.createDocumentFragment();
  let changed = 0;
  for (let i = 0; i < n; i++) {
    const v = q.data[base + i];
    const diff = refBase >= 0 && v !== q.data[refBase + i];
    if (diff) changed++;
    const real = q.max > q.min ? q.min + (v / 255) * (q.max - q.min) : q.min;
    const cell = el('div', { class: `cell${diff ? ' changed' : ''}`, title: `${dnTypes[i] ?? 'DN'} #${i}: ${real.toFixed(4)}` });
    cell.style.background = cellColor(v / 255);
    frag.appendChild(cell);
  }
  host.replaceChildren(frag);
  return { changed };
}

// 후보 사이에 DN 패턴이 실제로 갈리는지 — 서로 다른 벡터 수 (양자화된 바이트 기준).
export function distinctCount(q, rows) {
  const seen = new Set();
  for (let r = 0; r < rows; r++) seen.add(q.data.slice(r * q.n, (r + 1) * q.n).join(','));
  return seen.size;
}
