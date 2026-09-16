// 실험 목록·상세. "실험" = summary.json 의 조건별 실행 13개 (C0, C1~C3 × 시드 3, C4~C6). 수치는 전부 실데이터이고 상태는
// 재캘리브레이션 통과 여부(region ok / none)로만 정한다. C0 상세에는 episode(시각화 데이터) 요약과 시각화 화면 링크가 붙는다.

import { el, fmt, fmtCI, pct, icon, COND, COND_ORDER } from './util.js';

const READOUT_KO = { R1: '릿지', R2: '릿지+이차', R3: 'MLP' };
const TARGET_KO = { V1: 'Dellacherie 점수', V2: '6특징 결합' };
const nameOf = (r) => `${COND[r.condition].ko}${r.condition === 'C0' ? ' 재캘리브레이션' : ''}`;
const statusTag = (r) => el('span', { class: 'tag ' + (r.region === 'ok' ? 'tag-green' : 'tag-red') }, r.region === 'ok' ? '완료' : '동작 영역 없음');

export function renderExperiments(summary, episode) {
  const rows = summary.conditions;
  const table = document.getElementById('exp-table');
  const chipsHost = document.getElementById('exp-chips');
  const search = document.getElementById('exp-search');
  const sort = document.getElementById('exp-sort');
  const state = { filter: 'all', q: '', sort: 'order' };

  const matches = (r) => {
    if (state.filter === 'ok' && r.region !== 'ok') return false;
    if (state.filter === 'none' && r.region === 'ok') return false;
    if (!state.q) return true;
    const hay = `${r.key} ${r.condition} ${r.name} ${COND[r.condition].ko} ${nameOf(r)} ${r.seed} ${summary.combo}`.toLowerCase();
    return state.q.split(/\s+/).every((w) => hay.includes(w));
  };
  const order = (r) => COND_ORDER.indexOf(r.condition) * 10 + rows.filter((x) => x.condition === r.condition).indexOf(r);
  const sorters = {
    order: (a, b) => order(a) - order(b),
    tau: (a, b) => (b.regression?.tau ?? -Infinity) - (a.regression?.tau ?? -Infinity) || order(a) - order(b),
    r2: (a, b) => (b.regression?.r2 ?? -Infinity) - (a.regression?.r2 ?? -Infinity) || order(a) - order(b),
  };

  function drawChips() {
    const counts = { all: rows.length, ok: rows.filter((r) => r.region === 'ok').length, none: rows.filter((r) => r.region !== 'ok').length };
    const shown = rows.filter(matches).length;
    chipsHost.replaceChildren(
      ...[['all', '전체'], ['ok', '완료'], ['none', '동작 영역 없음']].map(([k, label]) => {
        const b = el('button', { class: 'chip', 'aria-pressed': String(state.filter === k) }, `${label} ${counts[k]}`);
        b.addEventListener('click', () => { state.filter = k; draw(); });
        return b;
      }),
      el('span', { class: 'count num' }, `${rows.length}개 중 ${shown}개 보는 중`),
    );
  }

  function drawTable() {
    const list = rows.filter(matches).sort(sorters[state.sort]);
    const head = el('div', { class: 'thead' });
    head.append(el('div', {}, '실험'), el('div', {}, '조건'), el('div', { class: 'r' }, '결정 내 τ'), el('div', { class: 'r' }, '풀링 R²'), el('div', { class: 'r' }, '줄 중앙값'), el('div', { class: 'r' }, '상태'));
    const frag = document.createDocumentFragment();
    frag.appendChild(head);
    frag.appendChild(el('div', { class: 'divider' }));
    if (!list.length) frag.appendChild(el('div', { class: 'empty' }, '조건에 맞는 실험이 없어요'));
    list.forEach((r, i) => {
      if (i) frag.appendChild(el('div', { class: 'divider' }));
      const a = el('a', { class: 'tr', href: `#/experiments/${r.key}` });
      const name = el('div', { class: 'td-name' });
      name.append(el('b', {}, nameOf(r)), el('span', {}, `${summary.combo} · 시드 ${r.seed}${r.condition === 'C0' && episode ? ` · 시각화 에피소드 시드 ${episode.meta.seed}` : ''}`));
      const ok = !!r.regression;
      a.append(
        name,
        el('div', { class: 'td-cond' }, `${r.condition} ${r.name}`),
        el('div', { class: 'r' + (r.condition === 'C0' ? ' brand' : ok ? '' : ' dim') }, ok ? fmt(r.regression.tau, 3) : '—'),
        el('div', { class: 'r' + (ok ? '' : ' dim') }, ok ? fmt(r.regression.r2, 3) : '—'),
        el('div', { class: 'r' + (ok ? '' : ' dim') }, r.play ? `${r.play.linesMedian}` : '—'),
        (() => { const d = el('div', { class: 'td-status' }); d.appendChild(statusTag(r)); return d; })(),
      );
      frag.appendChild(a);
    });
    table.replaceChildren(frag);
  }
  function draw() { drawChips(); drawTable(); }
  search.addEventListener('input', () => { state.q = search.value.trim().toLowerCase(); draw(); });
  sort.addEventListener('change', () => { state.sort = sort.value; draw(); });
  draw();
}

// 상세. 존재하지 않는 key 면 false.
export function showExperiment(summary, episode, graph, key) {
  const r = summary.conditions.find((x) => x.key === key);
  if (!r) return false;
  const c = r.condition;
  document.getElementById('exp-title').textContent = nameOf(r);
  document.getElementById('exp-status').replaceChildren(statusTag(r));
  document.getElementById('exp-params').textContent = r.params
    ? `${c} · 시드 ${r.seed} · ρ ${fmt(r.params.rhoTarget, 2)} · T ${summary.operating.T} · G_IN ×${fmt(summary.operating.gInMul, 2)}`
    : `${c} · 시드 ${r.seed} · 재캘리브레이션 통과 0/${r.calibration.points}`;
  const actions = document.getElementById('exp-actions');
  actions.replaceChildren(
    (() => { const a = el('a', { class: 'btn btn-secondary', href: 'https://github.com/stx4R/Fly/blob/main/docs/stage5-separation.md', target: '_blank', rel: 'noopener' }, '보고서 '); a.appendChild(icon('i-ext')); return a; })(),
    el('a', { class: 'btn btn-primary', href: c === 'C0' ? '#/decision' : '#/compare' }, c === 'C0' ? '결정 탐색 열기' : '조건 비교에서 보기'),
  );

  const body = document.getElementById('exp-body');
  body.innerHTML = '';
  const kv = (title, pairs) => {
    const card = el('div', { class: 'card' });
    card.appendChild(el('div', { class: 'card-title' }, title));
    const list = el('div', { class: 'kv' });
    pairs.forEach(([k, v, desc], i) => {
      if (i) list.appendChild(el('div', { class: 'divider' }));
      const row = el('div', { class: 'row' });
      const g = el('div', { class: 'grow' }); g.appendChild(el('div', { class: 'title' }, k)); if (desc) g.appendChild(el('div', { class: 'desc' }, desc));
      row.append(g, el('div', { class: 'val num' }, v));
      list.appendChild(row);
    });
    card.appendChild(list);
    return card;
  };
  const kpi = (label, value, sub) => { const k = el('div', { class: 'card kpi' }); k.append(el('div', { class: 'label' }, label), el('div', { class: 'value' }, value), el('div', { class: 'sub' }, sub)); return k; };

  // 조건 설명
  const intro = el('div', { class: 'card notice' });
  intro.innerHTML = `<div class="grow"><div class="title">${c} ${r.name} · ${COND[c].ko}</div><div class="sub">${COND[c].desc} 그래프 ${r.nodeCount.toLocaleString()} 뉴런 · ${r.edgeCount.toLocaleString()} 시냅스. 리드아웃 ${summary.combo}, 재캘리브레이션 ${r.calibration.points}점.</div></div>`;
  body.appendChild(intro);

  if (!r.regression) {
    // 동작 영역 없음
    const fb = r.calibration.failBy;
    const card = el('div', { class: 'card tint' });
    card.innerHTML = `<div class="card-title">동작 영역 없음</div><p>재캘리브레이션 ${r.calibration.points}점 중 하드 제약 통과 <b>0</b>이에요. 제약별 탈락: DN 활성 부족 ${fb.dnActive}, median 발화율 ${fb.median}, distinct ${fb.distinct}, dnDiff ${fb.dnDiff}.
      같은 제약·같은 창(T ${summary.operating.T} ms)·같은 입력 이득(×${fmt(summary.operating.gInMul, 2)})에서 네트워크를 켤 수 없었어요. 회귀·플레이는 실행하지 않았어요.</p>`;
    body.appendChild(card);
    const grid = el('div', { class: 'detail-grid' });
    grid.append(
      kv('ρ_unit', [['alpha 1', fmt(r.rhoUnit.alpha1, 4), '수신 가중치 합 정규화'], ['alpha 0.5', fmt(r.rhoUnit.alpha05, 1), '제곱근 정규화']]),
      kv('하드 제약', [['ceiling', `< ${pct(summary.hard.ceilingFrac)}`], ['상위 1% 점유', `< ${pct(summary.hard.topSpikeShare)}`], ['활성 DN', `≥ ${summary.hard.dnActive}`], ['median 발화율', `${summary.hard.medianRateHz[0]}–${summary.hard.medianRateHz[1]} Hz`], ['distinct', `≥ ${pct(summary.hardSep.distinctFrac)}`], ['dnDiff', `≥ ${summary.hardSep.meanDNDiff}`]]),
    );
    body.appendChild(grid);
    return true;
  }

  const kpis = el('div', { class: 'kpis' });
  kpis.append(
    kpi('풀링 R²', fmt(r.regression.r2, 3), `CI ${fmtCI(r.regression.r2CI)} · afterstate ${r.regression.afterstates.toLocaleString()}`),
    kpi('결정 내 켄달 τ', fmt(r.regression.tau, 3), `CI ${fmtCI(r.regression.tauCI)} · 결정 ${r.regression.decisions}개`),
    kpi('top-1', pct(r.regression.top1, 1), `CI [${pct(r.regression.top1CI[0], 1)}, ${pct(r.regression.top1CI[1], 1)}]`),
    kpi('줄 중앙값', `${r.play.linesMedian}`, `${r.play.games} 게임 · 조각 중앙값 ${r.play.piecesMedian} · CI ${fmtCI(r.play.linesMedianCI, 0)}`),
  );
  body.appendChild(kpis);

  if (c !== 'C0' && r.overlapsC0) {
    const o = r.overlapsC0;
    const same = [['R²', o.r2], ['τ', o.tau], ['줄 수', o.lines]];
    const call = el('div', { class: 'callout' });
    call.append(el('span', { class: 'tag tag-white' }, 'C0 대비'), el('span', {}, same.map(([k, v]) => `${k}: ${v ? '신뢰구간 겹침 (차이 없음)' : '신뢰구간 분리'}`).join(' · ')));
    body.appendChild(call);
  }

  if (c === 'C0' && episode) {
    const viz = el('div', { class: 'card' });
    viz.innerHTML = `<div class="card-head"><div class="grow"><div class="card-title">이 실험의 시각화</div><div class="card-sub num">에피소드 시드 ${episode.meta.seed} · ${episode.meta.decisions} 결정 · ${episode.meta.pieces} 조각 · ${episode.meta.lines} 줄 · 후보 평균 ${fmt(episode.decisions.reduce((s, d) => s + d.candidates.length, 0) / episode.decisions.length, 1)} · 표본 ${graph.nodes.length} 뉴런</div></div></div>`;
    const links = el('div', { class: 'viz-links' });
    [['#/connectome', '커넥톰 3D'], ['#/decision', '한 번의 결정'], ['#/decision?tab=spikes', '스파이크 활동'], ['#/compare', '조건 비교']].forEach(([href, t]) => links.appendChild(el('a', { class: 'chip', href }, t)));
    viz.appendChild(links);
    body.appendChild(viz);
  }

  const p = r.params, pt = r.point, sp = r.separation;
  const grid = el('div', { class: 'detail-grid' });
  grid.append(
    kv('동작점', [['rho_target', fmt(p.rhoTarget, 4), `g = rho / rho_unit = ${fmt(p.g, 3)}`], ['alpha', `${p.alpha}`], ['b (SFA)', fmt(p.b, 4)], ['k_local', fmt(p.kLocal, 4)], ['k_global', fmt(p.kGlobal, 4)], ['gap', `${p.gap}`], ['T · G_IN', `${summary.operating.T} ms · ×${fmt(summary.operating.gInMul, 2)}`, '1부 선택점, 전 조건 고정']]),
    kv('캘리브레이션 · 발화', [['통과', `${r.calibration.passCount} / ${r.calibration.points}`, `탈락: DN ${r.calibration.failBy.dnActive} · median ${r.calibration.failBy.median} · distinct ${r.calibration.failBy.distinct}`], ['평균 발화율', `${fmt(pt.meanRateHz, 1)} Hz`], ['중앙값 발화율', `${fmt(pt.medianRateHz, 1)} Hz`], ['활성 DN', `${pt.dnEverActive} / 107`], ['상위 1% 점유', pct(pt.topSpikeShare, 1)], ['활성 비율', pct(pt.activeFrac, 1)]]),
    kv('결정 내 분리도', [['distinct', pct(sp.distinctFrac, 1), '서로 다른 DN 벡터 비율'], ['dnDiff', `${fmt(sp.meanDNDiff, 1)} / 107`, '후보 쌍 간 다른 DN 수'], ['withinKendall', fmt(sp.withinKendall, 3)], ['전파 프로파일', `입력 ${fmt(sp.profile.input, 0)} · 중간 ${fmt(sp.profile.hidden, 0)} · DN ${fmt(sp.profile.output, 1)}`]]),
    kv('ρ_unit · 그래프', [['alpha 1', fmt(r.rhoUnit.alpha1, 4)], ['alpha 0.5', fmt(r.rhoUnit.alpha05, 1)], ['뉴런 · 시냅스', `${r.nodeCount.toLocaleString()} · ${r.edgeCount.toLocaleString()}`]]),
  );
  body.appendChild(grid);

  // 리드아웃 6종
  const ro = el('div', { class: 'card' });
  ro.innerHTML = `<div class="card-head"><div class="grow"><div class="card-title">리드아웃 × 목표</div><div class="card-sub">R1 릿지 · R2 릿지+이차 · R3 MLP / V1 Dellacherie 점수 · V2 6특징 결합. 본 비교는 ${summary.combo}.</div></div></div>`;
  const t = el('table', { class: 'mini-table' });
  t.innerHTML = '<thead><tr><th>리드아웃</th><th>목표</th><th class="r">R²</th><th class="r">τ</th><th class="r">top-1</th></tr></thead>';
  const tb = el('tbody');
  for (const [k, v] of Object.entries(r.readouts)) {
    const [R, V] = k.split(':');
    const tr = el('tr', { class: k === summary.combo ? 'on' : '' });
    tr.append(el('td', {}, `${R} ${READOUT_KO[R]}`), el('td', {}, `${V} ${TARGET_KO[V]}`), el('td', { class: 'r' }, fmt(v.r2, 3)), el('td', { class: 'r' }, fmt(v.tau, 3)), el('td', { class: 'r' }, pct(v.top1, 1)));
    tb.appendChild(tr);
  }
  t.appendChild(tb);
  const wrap = el('div', { class: 'table-wrap' }); wrap.appendChild(t); ro.appendChild(wrap);
  body.appendChild(ro);
  return true;
}
