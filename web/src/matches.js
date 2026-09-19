// 대전 기록 — 내가 초파리와 둔 판들. 전적 · 판별 요약 · 공격 주고받기 타임라인.
// 전부 matchlog 에서 읽는다 (대전을 하지 않았으면 빈 상태).

import { el, fmt, svgEl } from './util.js';
import { emptyState } from './empty.js';
import { clearAll, decisionsOf, getState, rankingFrom, totals } from './matchlog.js';

const INK = { human: '#2887ee', fly: '#141f2c', grid: '#e3e7ec', muted: '#6a7480', red: '#f03848' };
const RESULT = { human: ['내가 이김', 'tag-green'], fly: ['초파리가 이김', 'tag-red'] };

export function createMatchesView() {
  const body = document.getElementById('matches-body');
  const emptyHost = document.getElementById('matches-empty');
  const kpis = document.getElementById('matches-kpis');
  const list = document.getElementById('matches-list');
  const timeline = document.getElementById('matches-timeline');
  const tlCard = document.getElementById('matches-timeline-card');
  const summaryCard = document.getElementById('matches-summary-card');
  const listCard = document.getElementById('matches-list-card');
  let selected = null;

  document.getElementById('matches-clear')?.addEventListener('click', () => {
    if (!confirm('대전 기록을 모두 지울까요? 되돌릴 수 없어요.')) return;
    clearAll();
  });

  const kpi = (label, value, sub) => {
    const k = el('div', { class: 'card kpi' });
    k.append(el('div', { class: 'label' }, label), el('div', { class: 'value' }, value), el('div', { class: 'sub' }, sub));
    return k;
  };

  function drawTimeline(m) {
    timeline.replaceChildren();
    const events = m.timeline ?? [];
    const maxAt = Math.max(1, m.human?.pieces ?? 1, m.fly?.pieces ?? 1);
    const W = 640, rowH = 54, top = 24, bottom = 26, left = 56, right = 14;
    const H = top + rowH * 2 + bottom;
    timeline.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const x = (at) => left + (at / maxAt) * (W - left - right);
    const maxSent = Math.max(1, ...events.map((e) => e.sent ?? 0));

    const g = svgEl('g', { class: 'axis' });
    for (let k = 0; k <= 4; k++) {
      const at = Math.round((maxAt * k) / 4);
      g.appendChild(svgEl('line', { x1: x(at), x2: x(at), y1: top - 6, y2: H - bottom }));
      // 마지막 눈금에 단위를 붙인다 (따로 띄우면 눈금 숫자와 겹친다)
      g.appendChild(svgEl('text', { x: x(at), y: H - 10, 'text-anchor': k === 4 ? 'end' : 'middle' }, k === 4 ? `${at} 조각` : `${at}`));
    }
    timeline.appendChild(g);

    [['human', '사람', 0], ['fly', '초파리', 1]].forEach(([side, ko, r]) => {
      const y0 = top + r * rowH;
      timeline.appendChild(svgEl('text', { x: left - 10, y: y0 + rowH / 2 + 4, 'text-anchor': 'end', style: `fill:${side === 'human' ? INK.human : INK.fly};font-weight:600` }, ko));
      timeline.appendChild(svgEl('line', { x1: left, x2: W - right, y1: y0 + rowH - 10, y2: y0 + rowH - 10, stroke: INK.grid, 'stroke-width': 1 }));
      for (const e of events) {
        if (e.side !== side || !(e.sent > 0)) continue;
        const h = 6 + (e.sent / maxSent) * (rowH - 22);
        const bar = svgEl('rect', { x: x(e.at) - 1.5, y: y0 + rowH - 10 - h, width: 3, height: h, rx: 1.5, fill: side === 'human' ? INK.human : INK.fly, opacity: 0.9 });
        bar.appendChild(svgEl('title', {}, `${ko} ${e.at}번째 조각 · 공격 ${e.sent}줄${e.tspin ? ' · T-스핀' : ''}${e.combo > 1 ? ` · ${e.combo} 콤보` : ''}`));
        timeline.appendChild(bar);
      }
    });
    timeline.appendChild(svgEl('text', { x: left, y: 14, style: `fill:${INK.muted}` }, `막대 하나가 보낸 공격 한 번 (높이 = 줄 수, 최대 ${maxSent}줄)`));
  }

  function drawList() {
    const ms = getState().matches.filter((m) => m.endedAt);
    const frag = document.createDocumentFragment();
    ms.forEach((m, i) => {
      if (i) frag.appendChild(el('div', { class: 'divider' }));
      const row = el('button', { class: `list-row as-button${selected === m.id ? ' on' : ''}`, type: 'button' });
      const [text, cls] = RESULT[m.winner] ?? ['무승부', 'tag'];
      const avatar = el('div', { class: `avatar${m.winner === 'human' ? ' on' : ''}` }, m.winner === 'human' ? '승' : m.winner === 'fly' ? '패' : '무');
      const main = el('div', { class: 'main' });
      main.append(
        el('b', {}, new Date(m.startedAt).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })),
        el('span', { class: 'num' }, `조각 ${m.human?.pieces ?? 0} vs ${m.fly?.pieces ?? 0} · 공격 ${m.human?.attack ?? 0} vs ${m.fly?.attack ?? 0} · 결정 기록 ${decisionsOf(m.id).length}`),
      );
      const end = el('div', { class: 'end' });
      end.append(el('span', { class: `tag ${cls}` }, text), el('span', { class: 'num' }, m.think ? `${m.think.median} ms/수` : '—'));
      row.append(avatar, main, end);
      row.addEventListener('click', () => { selected = m.id; render(); });
      frag.appendChild(row);
    });
    list.replaceChildren(frag);
  }

  function render() {
    const t = totals();
    const ok = !!t;
    for (const c of [summaryCard, listCard, tlCard]) if (c) c.hidden = !ok;
    emptyHost.hidden = ok;
    if (!ok) {
      emptyHost.replaceChildren(emptyState({
        desc: '초파리와 한 판 두면 전적과 공격 주고받기가 여기에 쌓여요. 판을 고르면 다른 화면들도 그 판을 따라가요.',
        cta: '대전하기', href: '#/versus',
        hint: '기록은 이 브라우저에만 남아요 (최근 20판)',
      }));
      return;
    }
    kpis.replaceChildren(
      kpi('전적', `${t.wins}승 ${t.losses}패${t.draws ? ` ${t.draws}무` : ''}`, `${t.games}판 · 기록은 이 브라우저에만 남아요`),
      kpi('조각 중앙값', `${t.humanPiecesMedian ?? 0} vs ${t.flyPiecesMedian ?? 0}`, '왼쪽이 나, 오른쪽이 초파리예요'),
      kpi('공격 중앙값', `${t.humanAttackMedian ?? 0} vs ${t.flyAttackMedian ?? 0}`, `합계 ${t.humanAttack} vs ${t.flyAttack}줄`),
      kpi('초파리 생각 시간', t.thinkMedian !== null ? `${t.thinkMedian} ms` : '—', '한 수를 고르는 데 걸린 시간의 중앙값'),
    );

    if (!selected || !getState().matches.some((m) => m.id === selected && m.endedAt)) {
      selected = getState().matches.find((m) => m.endedAt)?.id ?? null;
    }
    drawList();
    const m = getState().matches.find((x) => x.id === selected);
    if (m) {
      drawTimeline(m);
      const r = rankingFrom(decisionsOf(m.id));
      const foot = document.getElementById('matches-timeline-foot');
      const reason = m.winner === 'human' ? '초파리가 탑아웃했어요' : m.winner === 'fly' ? '내가 탑아웃했어요' : (m.reason ?? '');
      foot.innerHTML = `${new Date(m.startedAt).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })} · ${reason}`
        + ` · 내 줄 ${m.human?.lines ?? 0}(테트리스 ${m.human?.tetris ?? 0}) · 초파리 줄 ${m.fly?.lines ?? 0}(테트리스 ${m.fly?.tetris ?? 0})`
        + ` · 받은 가비지 ${m.human?.garbageReceived ?? 0} vs ${m.fly?.garbageReceived ?? 0}`
        + (r ? ` · 이 판의 초파리 결정 ${r.decisions}개: 교사 최선 선택 ${(r.top1 * 100).toFixed(0)}% · 상대 regret ${fmt(r.relRegret, 3)}` : '');
    }
  }

  return { render, refresh: render, select(id) { selected = id; render(); } };
}
