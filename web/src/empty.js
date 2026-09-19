// 빈 상태. 대전을 한 번도 하지 않았으면 초파리 쪽 화면에는 보여줄 값이 없다 — 지어내지 않고 이걸 그린다.
// 디자인은 BoardinG 콘솔의 빈 상태와 같다 (72px 노란 원 + 가로 막대, 굵은 제목, 설명, CTA, 힌트).

import { el } from './util.js';

export function emptyState({ title = '아직 측정한 결과가 없어요', desc = '', cta = null, href = '#/versus', hint = '' } = {}) {
  const box = el('div', { class: 'empty-state' });
  const icon = el('div', { class: 'empty-icon', 'aria-hidden': 'true' });
  icon.appendChild(el('i'));
  box.append(icon, el('div', { class: 'empty-title' }, title));
  if (desc) box.appendChild(el('p', { class: 'empty-desc' }, desc));
  if (cta) box.appendChild(el('a', { class: 'btn btn-primary btn-lg', href }, cta));
  if (hint) box.appendChild(el('p', { class: 'empty-hint' }, hint));
  return box;
}

// 카드 하나를 통째로 빈 상태로 바꾼다. 화면마다 문구만 다르다.
export function emptyCard(opts) {
  const card = el('div', { class: 'card' });
  card.appendChild(emptyState(opts));
  return card;
}

// 여러 호스트를 한 번에 비운다 (한 화면에 카드가 여럿일 때 첫 카드에만 빈 상태를 놓고 나머지는 숨긴다).
export function showEmpty(host, opts) {
  host.replaceChildren(emptyCard(opts));
}
