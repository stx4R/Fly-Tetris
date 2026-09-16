// 홈 (대시보드). 핵심 수치 4개 · 조건별 지표 막대(축 없음, C0 파랑 · CI 겹침 회색) · 조건 목록 · 결론 카드. 전부 summary/episode/graph 에서 읽는다.

import { el, fmt, fmtCI, icon, COND, COND_ORDER } from './util.js';

const METRIC = {
  tau: { name: '결정 내 τ', value: (r) => r.regression?.tau, overlap: (r) => r.overlapsC0?.tau, fmt: (v) => fmt(v, 3), floor: 0 },
  r2: { name: '풀링 R²', value: (r) => r.regression?.r2, overlap: (r) => r.overlapsC0?.r2, fmt: (v) => fmt(v, 3), floor: 0.6 },
  lines: { name: '줄 중앙값', value: (r) => r.play?.linesMedian, overlap: (r) => r.overlapsC0?.lines, fmt: (v) => fmt(v, 0), floor: 0 },
};

export function renderHome(summary, graph, episode, { grayOverlap = true } = {}) {
  const rows = summary.conditions;
  const c0 = rows.find((r) => r.key === 'C0');
  const byCond = (c) => rows.filter((r) => r.condition === c);

  // KPI
  const kpis = document.getElementById('home-kpis');
  const kpi = (label, value, sub) => { const k = el('div', { class: 'card kpi' }); k.append(el('div', { class: 'label' }, label), el('div', { class: 'value' }, value), el('div', { class: 'sub' }, sub)); return k; };
  kpis.replaceChildren(
    kpi('결정 내 켄달 τ', fmt(c0.regression.tau, 3), `CI ${fmtCI(c0.regression.tauCI)} · 테스트 결정 ${c0.regression.decisions}개`),
    kpi('줄 중앙값', `${c0.play.linesMedian}`, `${c0.play.games} 게임 · 무작위 배치(${summary.baselines.random.linesMedian})와 차이 없어요`),
    kpi('조각 중앙값', `${c0.play.piecesMedian}`, `CI ${fmtCI(c0.play.piecesMedianCI, 0)} · 무작위 ${summary.baselines.random.piecesMedian} · 교사 ${summary.baselines.teacher.piecesMedian}`),
    kpi('표본 뉴런', graph.nodes.length.toLocaleString(), `시냅스 ${graph.edges.length.toLocaleString()} · DN ${graph.meta.counts.output} · 전체 ${c0.nodeCount.toLocaleString()}`),
  );

  // 조건별 막대
  const bars = document.getElementById('home-bars');
  const name = document.getElementById('home-metric-name');
  const tabs = [...document.querySelectorAll('#home-metric [data-metric]')];
  function drawBars(key) {
    const m = METRIC[key];
    name.textContent = m.name;
    const groups = COND_ORDER.map((c) => {
      const rs = byCond(c).filter((r) => m.value(r) !== undefined && m.value(r) !== null);
      if (!rs.length) return { c, none: true };
      const v = rs.reduce((s, r) => s + m.value(r), 0) / rs.length;
      return { c, v, overlap: rs.every((r) => m.overlap(r)) };
    });
    const max = Math.max(...groups.filter((g) => !g.none).map((g) => g.v - m.floor), 1e-9);
    bars.replaceChildren(...groups.map((g) => {
      const bar = el('div', { class: 'bar' + (g.c === 'C0' ? ' on' : !g.none && !(g.overlap && grayOverlap) ? ' diff' : ''), title: `${g.c} ${COND[g.c].en} · ${COND[g.c].ko}` });
      const h = g.none ? 10 : 10 + Math.max(0, (g.v - m.floor) / max) * 150;
      const b = el('div', { class: 'b' }); b.style.height = `${h}px`;
      bar.append(el('div', { class: 'v' }, g.none ? '—' : m.fmt(g.v)), b, el('div', { class: 'k' }, g.c));
      return bar;
    }));
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.metric === key)));
  }
  let metric = 'tau';
  tabs.forEach((t) => t.addEventListener('click', () => { metric = t.dataset.metric; drawBars(metric); }));
  drawBars(metric);

  // 조건 목록 (7개 조건, 시드는 묶어서)
  const list = document.getElementById('home-recent');
  list.innerHTML = '';
  const shown = ['C0', 'C1', 'C6', 'C3'];
  shown.forEach((c, i) => {
    const rs = byCond(c);
    const ok = rs.filter((r) => r.regression);
    const a = el('a', { class: 'list-row', href: `#/experiments/${rs[0].key}` });
    const avatar = el('div', { class: 'avatar' + (c === 'C0' ? ' on' : '') }, c);
    const main = el('div', { class: 'main' });
    main.append(el('b', {}, `${COND[c].ko} · ${COND[c].en}`), el('span', { class: 'num' }, rs.length > 1 ? `시드 ${rs.length}개 · R3:V2` : `시드 ${rs[0].seed} · R3:V2`));
    const end = el('div', { class: 'end' });
    if (ok.length) {
      const tau = ok.reduce((s, r) => s + r.regression.tau, 0) / ok.length;
      end.append(el('b', { class: c === 'C0' ? 'brand' : '' }, `τ ${fmt(tau, 3)}`), el('span', { class: 'num' }, `R² ${fmt(ok.reduce((s, r) => s + r.regression.r2, 0) / ok.length, 3)}`));
    } else {
      end.append(el('span', { class: 'tag tag-red' }, '동작 영역 없음'), el('span', {}, `시드 ${rs.length}개 전부`));
    }
    a.append(avatar, main, end);
    if (i) list.appendChild(el('div', { class: 'divider' }));
    list.appendChild(a);
  });
  list.appendChild(el('div', { class: 'divider' }));
  const more = el('a', { class: 'list-more', href: '#/experiments' }, `${rows.length}개 실행 전체보기`);
  more.appendChild(icon('i-chev', 20));
  list.appendChild(more);

  // 결론
  const con = document.getElementById('home-conclusion');
  con.innerHTML = `<div class="grow"><div class="title">후보마다 DN 패턴은 다르지만, 그 차이가 배치의 좋고 나쁨과 정렬되지 않아요</div>
    <div class="sub num">분리는 있어요 (distinct ${Math.round(c0.separation.distinctFrac * 100)}%, 후보 쌍 간 다른 DN ${fmt(c0.separation.meanDNDiff, 1)}/107) — 순위 정보가 없어요 (결정 내 τ ${fmt(c0.regression.tau, 3)}, 전 조건 0.06 이하).
    풀링 R² ${fmt(c0.regression.r2, 3)}은 대부분 결정 간 분산이라 활동량 요약(C6 ${fmt(rows.find((r) => r.key === 'C6').regression.r2, 3)})으로도 나와요. 이 사이트는 실패한 결과를 그대로 보여줘요.</div></div>
    <a class="link" href="#/compare">조건 비교 보기 <svg><use href="#i-chev"/></svg></a>`;

  return { setGrayOverlap(v) { grayOverlap = v; drawBars(metric); } };
}
