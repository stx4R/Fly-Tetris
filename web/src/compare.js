// S4: 조건 비교. summary.json 의 수치만 쓴다 (CI 겹침 판정도 summary 가 미리 계산한 값).
//  - R² / τ / 줄 수: 조건별 점추정 + 95% CI. C0 와 CI 가 겹치는 조건은 회색 (차이 없음).
//  - C1 카드: 동작 영역 없음.
//  - rho_unit(α 0.5) 막대 + α 1 주석.
//  - 1부: rho·T·G_IN 구간별 distinctFrac.

import { el, svgEl, fmt, pct } from './util.js';

const ORDER = ['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
const LABEL = { C0: 'C0 real', C1: 'C1 degree-shuffle', C2: 'C2 weight-shuffle', C3: 'C3 erdos-renyi', C4: 'C4 KC-ablated', C5: 'C5 direct-ablated', C6: 'C6 activity-only' };

function chartCard(title, note) {
  const card = el('div', { class: 'chart' });
  card.appendChild(el('h3', {}, title));
  const svg = svgEl('svg', { role: 'img', 'aria-label': title });
  card.appendChild(svg);
  if (note) card.appendChild(el('p', { class: 'note' }, note));
  return { card, svg };
}

// 조건별 점 + CI. rows: [{ label, value, ci, cls, key }] . 같은 조건의 시드는 같은 줄에 나란히.
function ciChart(svg, groups, { min, max, fmtTick, baselines = [] }) {
  const W = 420, rowH = 22, left = 150, right = 16, top = 12, bottom = 26;
  const H = top + groups.length * rowH + bottom + baselines.length * rowH;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML = '';
  const x = (v) => left + ((v - min) / (max - min)) * (W - left - right);
  const g = svgEl('g', { class: 'axis' });
  const ticks = 4;
  for (let k = 0; k <= ticks; k++) { const v = min + ((max - min) * k) / ticks; g.appendChild(svgEl('line', { x1: x(v), x2: x(v), y1: top, y2: H - bottom, stroke: '#202737' })); g.appendChild(svgEl('text', { x: x(v), y: H - 10, 'text-anchor': 'middle' }, fmtTick(v))); }
  svg.appendChild(g);
  const all = [...groups, ...baselines];
  all.forEach((grp, r) => {
    const y = top + r * rowH + rowH / 2;
    svg.appendChild(svgEl('text', { x: left - 8, y: y + 4, 'text-anchor': 'end', style: grp.baseline ? 'fill:#9aa3b2' : '' }, grp.label));
    if (grp.none) { svg.appendChild(svgEl('text', { x: left + 6, y: y + 4, style: 'fill:#c084fc' }, '동작 영역 없음 (3 시드 전부)')); return; }
    grp.items.forEach((it, k) => {
      const yy = y + (k - (grp.items.length - 1) / 2) * 6;
      const color = it.cls === 'c0' ? '#f5c542' : it.cls === 'baseline' ? '#9aa3b2' : it.overlap ? '#6b7280' : '#38bdf8';
      if (it.ci) svg.appendChild(svgEl('line', { x1: x(Math.max(min, it.ci[0])), x2: x(Math.min(max, it.ci[1])), y1: yy, y2: yy, stroke: color, 'stroke-width': 2, opacity: 0.9 }));
      svg.appendChild(svgEl('circle', { cx: x(Math.min(max, Math.max(min, it.value))), cy: yy, r: 3.2, fill: color }));
    });
  });
  // 범례
  const lg = svgEl('g');
  [['#f5c542', 'C0'], ['#38bdf8', 'C0 와 CI 분리'], ['#6b7280', 'C0 와 CI 겹침 = 차이 없음']].forEach(([c, t], i) => {
    lg.appendChild(svgEl('circle', { cx: left + 6 + i * 130, cy: top - 2, r: 3, fill: c }));
    lg.appendChild(svgEl('text', { x: left + 13 + i * 130, y: top + 2, style: 'font-size:9px;fill:#9aa3b2' }, t));
  });
  svg.appendChild(lg);
}

export function renderCompare(summary) {
  const host = document.getElementById('compare-charts');
  const rows = summary.conditions;
  const byCond = (c) => rows.filter((r) => r.condition === c);
  const groupsFor = (metric) => ORDER.map((c) => {
    const rs = byCond(c);
    if (rs.every((r) => !r.regression)) return { label: LABEL[c], none: true, items: [] };
    return { label: LABEL[c], items: rs.filter((r) => r.regression).map((r) => ({ value: metric.value(r), ci: metric.ci(r), overlap: metric.overlap(r), cls: c === 'C0' ? 'c0' : '' })) };
  });
  const seeds = byCond('C2').length;
  const r2 = chartCard(`풀링 R² (R3:V2, 테스트 afterstate ${rows[0].regression.afterstates.toLocaleString()})`, `점수 자체의 회귀. 대부분 결정 간(보드 채움) 분산이다 — C6 활동량 요약 5개만으로도 ${fmt(rows.find((r) => r.key === 'C6').regression.r2, 3)}. C1·C2·C3 는 시드 ${seeds}개.`);
  ciChart(r2.svg, groupsFor({ value: (r) => r.regression.r2, ci: (r) => r.regression.r2CI, overlap: (r) => r.overlapsC0.r2 }), { min: 0.6, max: 0.9, fmtTick: (v) => v.toFixed(2) });
  host.appendChild(r2.card);
  const tau = chartCard(`결정 내 켄달 τ (R3:V2, 테스트 결정 ${rows[0].regression.decisions})`, '같은 결정의 후보 순위를 맞추는가. 전 조건 0.06 이하 — 순위 정보가 없다.');
  ciChart(tau.svg, groupsFor({ value: (r) => r.regression.tau, ci: (r) => r.regression.tauCI, overlap: (r) => r.overlapsC0.tau }), { min: -0.1, max: 0.15, fmtTick: (v) => v.toFixed(2) });
  host.appendChild(tau.card);
  const play = chartCard(`플레이: 클리어 줄 수 중앙값 (20 게임, 상한 ${summary.conditions[0].play?.games ? 1000 : 1000})`, `전 조건이 무작위 배치와 겹친다. 조각 중앙값 ${rows.filter((r) => r.play).map((r) => r.play.piecesMedian).sort((a, b) => a - b)[0]}–${rows.filter((r) => r.play).map((r) => r.play.piecesMedian).sort((a, b) => b - a)[0]} (무작위 ${summary.baselines.random.piecesMedian}). 교사(Dellacherie)는 ${summary.baselines.teacher.linesMedian}줄 — 축 밖.`);
  ciChart(play.svg, groupsFor({ value: (r) => r.play.linesMedian, ci: (r) => r.play.linesMedianCI, overlap: (r) => r.overlapsC0.lines }), { min: 0, max: 3, fmtTick: (v) => v.toFixed(0), baselines: [{ label: '무작위 배치', baseline: true, items: [{ value: summary.baselines.random.linesMedian, ci: summary.baselines.random.linesMedianCI, cls: 'baseline' }] }] });
  host.appendChild(play.card);

  // C1 카드
  const c1 = byCond('C1');
  const c3 = byCond('C3');
  const card = document.getElementById('c1-card');
  card.innerHTML = `<h3>C1 degree-shuffle: 동작 영역 없음</h3>
    <p>각 뉴런의 in/out 차수와 출력 가중치를 정확히 보존한 재배선인데도, 시드 ${c1.length}개 모두 재캘리브레이션 300점 중 통과 <b>0</b>
    (${c1.map((r) => `${r.calibration.failBy.dnActive ?? 0}/300 이 DN 활성 부족`).join(', ')}). 같은 제약·같은 창·같은 입력 이득에서 네트워크를 켤 수 없었다.
    차수는 그대로지만 층 블록 구조(입력→중간 간선의 몰림)가 흩어져 중간층으로 가는 피드포워드 구동이 묽어진다.</p>
    <p>대비: <b>C3 erdos-renyi</b>는 배선이 완전 무작위여도 층 블록별 간선 수를 보존해 시드 ${c3.length}개 모두 켜진다 (통과 ${c3.map((r) => r.calibration.passCount).join(' / ')}/300).
    C0 real 은 ${byCond('C0')[0].calibration.passCount}/300.</p>`;

  // rho_unit
  const rhoHost = document.getElementById('rho-chart');
  const rho = chartCard('ρ_unit (alpha 0.5): 단위 가중치 행렬의 스펙트럼 반경', `alpha 1 (수신 가중치 합 정규화) 에서는 전 조건 ${fmt(Math.min(...rows.filter((r) => r.rhoUnit).map((r) => r.rhoUnit.alpha1)), 4)}–${fmt(Math.max(...rows.filter((r) => r.rhoUnit).map((r) => r.rhoUnit.alpha1)), 4)} 로 구분되지 않는다 (위상 불변). 가중치 순열만으로 ${fmt(byCond('C0')[0].rhoUnit.alpha05, 1)} → ${fmt(byCond('C2')[0].rhoUnit.alpha05, 1)}: 큰 반경은 배선이 아니라 가중치가 배선과 짝지어진 방식에서 온다.`);
  {
    const items = ORDER.filter((c) => c !== 'C6').map((c) => ({ label: LABEL[c], values: byCond(c).map((r) => r.rhoUnit.alpha05) }));
    const W = 420, rowH = 24, left = 150, right = 40, top = 10, bottom = 26, H = top + items.length * rowH + bottom;
    const max = 65;
    rho.svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const x = (v) => left + (v / max) * (W - left - right);
    const g = svgEl('g', { class: 'axis' });
    for (let v = 0; v <= 60; v += 20) { g.appendChild(svgEl('line', { x1: x(v), x2: x(v), y1: top, y2: H - bottom, stroke: '#202737' })); g.appendChild(svgEl('text', { x: x(v), y: H - 10, 'text-anchor': 'middle' }, `${v}`)); }
    rho.svg.appendChild(g);
    items.forEach((it, r) => {
      const y = top + r * rowH;
      rho.svg.appendChild(svgEl('text', { x: left - 8, y: y + rowH / 2 + 4, 'text-anchor': 'end' }, it.label));
      const mean = it.values.reduce((a, b) => a + b, 0) / it.values.length;
      rho.svg.appendChild(svgEl('rect', { x: left, y: y + 4, width: x(mean) - left, height: rowH - 8, fill: it.label.startsWith('C0') ? '#f5c542' : '#38bdf8', opacity: 0.85 }));
      it.values.forEach((v) => rho.svg.appendChild(svgEl('line', { x1: x(v), x2: x(v), y1: y + 3, y2: y + rowH - 3, stroke: '#e6e9ef' })));
      rho.svg.appendChild(svgEl('text', { x: x(mean) + 5, y: y + rowH / 2 + 4 }, it.values.length > 1 ? `${fmt(Math.min(...it.values), 1)}–${fmt(Math.max(...it.values), 1)}` : fmt(mean, 1)));
    });
  }
  rhoHost.appendChild(rho.card);

  // 1부 구간별 distinctFrac
  const sHost = document.getElementById('search-chart');
  const s = summary.search;
  const bins = chartCard(`1부 탐색 ${s.evaluated}점: 결정 내 분리도 (distinctFrac) 구간 평균`, `분리는 rho·G_IN·T 모두에서 단조 증가 = 활동량. 낮은 rho 는 임계점이 아니라 침묵. 그러나 통과점 ${s.stage3Pass}개의 결정 내 τ 는 ${fmt(s.withinKendall.min, 3)}~${fmt(s.withinKendall.max, 3)} (중앙값 ${fmt(s.withinKendall.median, 3)}) — 분리는 있어도 순위 정보는 없다. alpha 0.5: 통과 ${s.alpha05Pass}/${s.alpha05Total}.`);
  {
    const groups = [['rho', s.bins.rho], ['T (ms)', s.bins.T], ['G_IN ×', s.bins.gInMul]];
    const W = 420, H = 190, left = 34, right = 10, top = 14, bottom = 30, gap = 18;
    bins.svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const totalBars = groups.reduce((n, [, b]) => n + b.length, 0);
    const bw = (W - left - right - gap * (groups.length - 1)) / totalBars;
    const y = (v) => top + (1 - v) * (H - top - bottom);
    const g = svgEl('g', { class: 'axis' });
    for (let v = 0; v <= 1; v += 0.25) { g.appendChild(svgEl('line', { x1: left, x2: W - right, y1: y(v), y2: y(v), stroke: '#202737' })); g.appendChild(svgEl('text', { x: left - 4, y: y(v) + 3, 'text-anchor': 'end' }, pct(v))); }
    bins.svg.appendChild(g);
    let xx = left;
    groups.forEach(([name, b]) => {
      bins.svg.appendChild(svgEl('text', { x: xx + (b.length * bw) / 2, y: H - 4, 'text-anchor': 'middle', style: 'fill:#9aa3b2' }, name));
      b.forEach((bin) => {
        const v = bin.distinctFrac ?? 0;
        bins.svg.appendChild(svgEl('rect', { x: xx + 2, y: y(v), width: bw - 4, height: y(0) - y(v), fill: '#38bdf8', opacity: 0.85 }));
        bins.svg.appendChild(svgEl('text', { x: xx + bw / 2, y: H - 16, 'text-anchor': 'middle', style: 'font-size:9px;fill:#9aa3b2' }, bin.label));
        bins.svg.appendChild(svgEl('text', { x: xx + bw / 2, y: y(v) - 3, 'text-anchor': 'middle', style: 'font-size:9px' }, `${Math.round(v * 100)}`));
        xx += bw;
      });
      xx += gap;
    });
  }
  sHost.appendChild(bins.card);

  const foot = document.getElementById('compare-foot');
  const sel = s.selected;
  foot.innerHTML = `동작점(1부 선택): alpha ${sel.alpha}, rho ${sel.rhoTarget}, b ${sel.b}, k_local ${sel.kLocal}, k_global ${sel.kGlobal}, 창 ${sel.T} ms, G_IN×${fmt(sel.gInMul, 2)} —
    distinct ${pct(sel.separation.distinctFrac)}, 후보 쌍 간 다른 DN ${fmt(sel.separation.meanDNDiff, 1)}/107, 전파 프로파일 입력 ${fmt(sel.separation.profile.input, 0)} / 중간 ${fmt(sel.separation.profile.hidden, 0)} / DN ${fmt(sel.separation.profile.output, 1)}.
    2부에서는 조건마다 T·G_IN·alpha 를 고정하고 rho·b·k 만 재캘리브레이션했다 (C0: rho ${byCond('C0')[0].params.rhoTarget}, b ${byCond('C0')[0].params.b}). 하드 제약: ceiling < ${pct(summary.hard.ceilingFrac)}, 상위 1% 점유 < ${pct(summary.hard.topSpikeShare)}, DN ≥ ${summary.hard.dnActive}, median ${summary.hard.medianRateHz[0]}–${summary.hard.medianRateHz[1]} Hz, distinct ≥ ${pct(summary.hardSep.distinctFrac)}, dnDiff ≥ ${summary.hardSep.meanDNDiff}.`;
}
