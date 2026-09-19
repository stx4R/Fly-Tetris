// 홈 — 대전이 가운데, 연구 수치가 그 옆.
//
// 위: 대전 CTA + 내 전적 (판을 하지 않았으면 그 자리만 빈 상태).
// 아래: 7단계 실측 — 교사 대비 비율 5기준(게이트)과 순위 지표. 전부 web/data/stage7.json 에서 읽는다.
//
// 문구 원칙: 커넥톰에서 오는 것은 배선(희소성 마스크)뿐이고 가중치는 학습된 것이다.
// "초파리가 테트리스를 학습했다" 로 읽히는 표현은 쓰지 않는다. 미달한 결과는 미달한 대로 적는다.

import { el, fmt, pct, icon } from './util.js';
import { emptyState } from './empty.js';
import { totals } from './matchlog.js';

export function renderHome(stage7, graph) {
  const g = stage7.gate;
  const rank = stage7.ranking;

  // ---------- 연구 수치 KPI ----------
  const kpis = document.getElementById('home-kpis');
  const kpi = (label, value, sub, cls = '') => {
    const k = el('div', { class: `card kpi${cls ? ` ${cls}` : ''}` });
    k.append(el('div', { class: 'label' }, label), el('div', { class: 'value' }, value), el('div', { class: 'sub' }, sub));
    return k;
  };
  const pieces = g.criteria.find((c) => c.key === 'piecesMedian');
  const attack = g.criteria.find((c) => c.key === 'attackMedian');
  const regret = g.criteria.find((c) => c.key === 'relRegret');
  kpis.replaceChildren(
    kpi('게이트', `${g.passCount} / ${g.total}`, `${g.phase} · 교사 대비 기준 5개 중 통과 수`),
    kpi('상대 regret', fmt(regret.measured, 3), `CI [${fmt(regret.ci?.[0], 3)}, ${fmt(regret.ci?.[1], 3)}] · 0 이면 매 수가 교사 최선`),
    kpi('조각 중앙값', `${pieces.measured}`, `교사 ${pieces.teacher} 의 ${pct(pieces.ratio, 0)} · 기준 ${pieces.threshold}`),
    kpi('공격 중앙값', `${attack.measured}`, `교사 ${attack.teacher} 의 ${pct(attack.ratio, 0)} · 기준 ${fmt(attack.threshold, 1)}`),
  );

  // ---------- 게이트 5기준 ----------
  const gateHost = document.getElementById('home-gate');
  gateHost.replaceChildren(...g.criteria.flatMap((c, i) => {
    const row = el('div', { class: 'row lg' });
    const grow = el('div', { class: 'grow' });
    grow.append(el('div', { class: 'title' }, c.label), el('div', { class: 'desc' }, c.desc));
    const val = el('div', { class: 'val num' });
    val.append(
      el('b', { class: c.passed ? 'ok' : 'no' }, `${fmt(c.measured, c.key === 'relRegret' || c.key === 'garbageDeathShare' ? 3 : 1)}`),
      el('span', { class: 'muted' }, ` ${c.lower ? '≤' : '≥'} ${fmt(c.threshold, c.key === 'relRegret' || c.key === 'garbageDeathShare' ? 2 : 1)}`),
    );
    const tag = el('span', { class: `tag ${c.passed ? 'tag-green' : 'tag-red'}` }, c.passed ? '통과' : '미달');
    row.append(grow, val, tag);
    return i ? [el('div', { class: 'divider' }), row] : [row];
  }));

  // ---------- 내 대전 ----------
  const mine = document.getElementById('home-mine');
  function drawMine() {
    const t = totals();
    if (!t) {
      mine.replaceChildren(emptyState({
        title: '아직 대전한 기록이 없어요',
        desc: '초파리와 한 판 두면 전적이 여기에 남고, 커넥톰·결정 탐색·신경 활동 화면이 그 판의 값으로 채워져요.',
        cta: '대전하기', href: '#/versus',
        hint: '키보드 방향키와 스페이스로 둬요',
      }));
      return;
    }
    const head = el('div', { class: 'card-head' });
    const grow = el('div', { class: 'grow' });
    grow.append(el('div', { class: 'card-title' }, `${t.wins}승 ${t.losses}패${t.draws ? ` ${t.draws}무` : ''}`), el('div', { class: 'card-sub num' }, `${t.games}판 · 초파리 생각 시간 중앙값 ${t.thinkMedian ?? '—'} ms/수 · 기록한 결정 ${t.decisions}개`));
    const right = el('div', { class: 'right' });
    right.appendChild(el('a', { class: 'btn btn-secondary btn-sm', href: '#/matches' }, '대전 기록'));
    head.append(grow, right);
    const stats = el('div', { class: 'mini-stats' });
    [
      ['조각 중앙값', `${t.humanPiecesMedian ?? 0}`, `${t.flyPiecesMedian ?? 0}`],
      ['공격 중앙값', `${t.humanAttackMedian ?? 0}`, `${t.flyAttackMedian ?? 0}`],
      ['지운 줄 합계', `${t.humanLines}`, `${t.flyLines}`],
      ['테트리스 합계', `${t.humanTetris}`, `${t.flyTetris}`],
    ].forEach(([k, a, b]) => {
      const c = el('div', { class: 'ms' });
      c.append(el('span', { class: 'k' }, k), el('b', { class: 'a num' }, a), el('span', { class: 'vs' }, 'vs'), el('b', { class: 'b num' }, b));
      stats.appendChild(c);
    });
    mine.replaceChildren(head, stats, el('p', { class: 'card-note' }, '왼쪽이 나, 오른쪽이 초파리예요. 기록은 이 브라우저에만 남아요.'));
  }
  drawMine();

  // ---------- 순위 지표 (학습 전 / 후 / 우연) ----------
  const bars = document.getElementById('home-bars');
  const METRIC = {
    top1: { name: '교사 최선을 고른 비율', fmt: (v) => pct(v, 1), max: 1 },
    relRegret: { name: '상대 regret (낮을수록 좋아요)', fmt: (v) => fmt(v, 3), max: 0.6, invert: true },
    tau: { name: '결정 내 켄달 τ', fmt: (v) => fmt(v, 3), max: 0.7 },
  };
  const metricTabs = [...document.querySelectorAll('#home-metric [data-metric]')];
  const nameEl = document.getElementById('home-metric-name');
  function drawBars(key) {
    const m = METRIC[key];
    nameEl.textContent = m.name;
    const groups = [
      { k: '학습 후', v: rank.trained[key], on: true },
      { k: '학습 전', v: rank.untrained[key] },
      { k: '우연', v: rank.chance[key] },
    ];
    bars.replaceChildren(...groups.map((gr) => {
      const bar = el('div', { class: `bar${gr.on ? ' on' : ' diff'}`, title: `${gr.k} · ${m.fmt(gr.v)}` });
      const h = 10 + Math.max(0, Math.min(1, (gr.v ?? 0) / m.max)) * 150;
      const b = el('div', { class: 'b' }); b.style.height = `${h}px`;
      bar.append(el('div', { class: 'v' }, m.fmt(gr.v)), b, el('div', { class: 'k' }, gr.k));
      return bar;
    }));
    metricTabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.metric === key)));
  }
  let metric = 'top1';
  metricTabs.forEach((t) => t.addEventListener('click', () => { metric = t.dataset.metric; drawBars(metric); }));
  drawBars(metric);

  // ---------- 조건(모델) 목록 ----------
  const list = document.getElementById('home-recent');
  const rows = [
    { key: 'C0', ko: '실제 배선', en: 'real connectome', trained: true, note: `τ ${fmt(rank.trained.tau, 3)} · top-1 ${pct(rank.trained.top1, 1)}` },
    ...stage7.nulls.map((n) => ({ key: n.key, ko: n.ko, en: n.name, trained: n.trained, note: n.trained ? `τ ${fmt(n.test?.tau, 3)}` : '아직 학습하지 않음' })),
  ];
  list.replaceChildren(...rows.flatMap((r, i) => {
    const a = el('a', { class: 'list-row', href: '#/experiments' });
    const avatar = el('div', { class: `avatar${r.key === 'C0' ? ' on' : ''}` }, r.key);
    const main = el('div', { class: 'main' });
    main.append(el('b', {}, `${r.ko} · ${r.en}`), el('span', { class: 'num' }, r.key === 'C0' ? `P ${stage7.model.P.toLocaleString()} · E ${stage7.model.E.toLocaleString()}` : '마스크만 준비됨 · 같은 P'));
    const end = el('div', { class: 'end' });
    if (r.trained) end.append(el('b', { class: r.key === 'C0' ? 'brand' : '' }, r.note));
    else end.append(el('span', { class: 'tag' }, '미학습'), el('span', {}, '대조군'));
    a.append(avatar, main, end);
    return i ? [el('div', { class: 'divider' }), a] : [a];
  }));
  list.appendChild(el('div', { class: 'divider' }));
  const more = el('a', { class: 'list-more', href: '#/experiments' }, '실험 전체보기');
  more.appendChild(icon('i-chev', 20));
  list.appendChild(more);

  // ---------- 결론 ----------
  const con = document.getElementById('home-conclusion');
  con.innerHTML = `<div class="grow"><div class="title">순위는 배웠지만 판을 오래 끌지는 못해요</div>
    <div class="sub num">같은 테스트 분할에서 학습 전 → 후로 교사 최선 선택이 ${pct(rank.untrained.top1, 1)} → ${pct(rank.trained.top1, 1)},
    상대 regret ${fmt(rank.untrained.relRegret, 3)} → ${fmt(rank.trained.relRegret, 3)} 로 움직였어요 (우연은 ${pct(rank.chance.top1, 1)} · ${fmt(rank.chance.relRegret, 3)}).
    그런데 실제 플레이는 조각 중앙값 ${pieces.measured} — 교사 ${pieces.teacher} 의 ${pct(pieces.ratio, 0)}에 그쳐요. 결정당 regret 이 게임 길이와 정렬되지 않는다는 뜻이고,
    게이트 ${g.passCount}/${g.total} 로 멈춘 상태를 그대로 보여줘요. 커넥톰에서 오는 것은 배선(마스크 ${stage7.model.E.toLocaleString()} 간선)뿐이고 가중치 ${stage7.model.P.toLocaleString()}개는 학습된 값이에요.</div></div>
    <a class="link" href="#/compare">조건 비교 보기 <svg><use href="#i-chev"/></svg></a>`;

  // 사이드바 각주 (표본 그래프)
  const note = document.getElementById('home-graph-note');
  if (note) note.textContent = `커넥톰 3D 는 전체 ${stage7.model.N.toLocaleString()} 뉴런 중 ${graph.nodes.length.toLocaleString()}개를 층화 표본으로 뽑아 그려요.`;

  return { refresh: drawMine };
}
