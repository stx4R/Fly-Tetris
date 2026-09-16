// DN 107개 발화 수 히트맵. 결정 탐색과 커넥톰 화면 두 곳에서 같은 후보를 그린다.
// 색: 0 = grey-100, 그 외 blue-50 → blue-500 (결정 내 최대값으로 정규화). 리저버가 고른 후보와 다른 DN 은 주황 테두리.

import { el } from './util.js';

const cellColor = (t) => (t <= 0 ? 'var(--grey-100)' : `oklch(${(0.97 - t * 0.346).toFixed(3)} ${(0.02 + t * 0.156).toFixed(3)} 252)`);

// host: .heatmap 요소. counts: 이 후보의 DN 발화 수. max: 결정 내 최대값. ref: 비교 대상(리저버 선택 후보)의 dnCounts, 없으면 테두리 없음.
export function renderHeatmap(host, { counts, max, ref = null, dnTypes = [] }) {
  const frag = document.createDocumentFragment();
  let changed = 0;
  counts.forEach((v, i) => {
    const diff = ref && v !== ref[i];
    if (diff) changed++;
    const cell = el('div', { class: 'cell' + (diff ? ' changed' : ''), title: `${dnTypes[i] ?? 'DN'} #${i}: ${v}회` });
    cell.style.background = cellColor(v / max);
    frag.appendChild(cell);
  });
  host.replaceChildren(frag);
  return { changed };
}
