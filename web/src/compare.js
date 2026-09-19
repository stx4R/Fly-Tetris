// 조건 비교 — 7단계 실측만 쓴다 (web/data/stage7.json).
//
// 비교 축이 6단계와 다르다. 6단계는 조건 C0~C6 를 나란히 놓았지만, 7단계는 대조군(N1·N2·N3)이 아직
// 학습되지 않았다. 그래서 지금 비교할 수 있는 것은
//   · 플레이: 초파리 ↔ 교사(학습 목표) ↔ 무작위 배치
//   · 순위:   학습 후 ↔ 학습 전 ↔ 우연 (같은 테스트 분할)
//   · 게이트: 교사 대비 비율 5기준
// 이고, 대조군 자리는 '아직 학습하지 않음'으로 그대로 그린다.

import { el, svgEl, fmt, pct } from './util.js';

const INK = { c0: '#2887ee', teacher: '#141f2c', baseline: '#87919c', none: '#f03848', ok: '#007738', muted: '#6a7480' };

function chartCard(title, note) {
  const card = el('div', { class: 'card chart' });
  card.appendChild(el('div', { class: 'card-title' }, title));
  const svg = svgEl('svg', { role: 'img', 'aria-label': title });
  card.appendChild(svg);
  if (note) card.appendChild(el('p', { class: 'note' }, note));
  return { card, svg };
}

// 가로 점+CI 차트. rows: [{ label, value, ci, color, none }]
function ciChart(svg, rows, { min, max, fmtTick, ticks = 4 }) {
  const W = 440, rowH = 24, left = 150, right = 16, top = 12, bottom = 26;
  const H = top + rows.length * rowH + bottom;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.replaceChildren();
  const x = (v) => left + ((v - min) / (max - min)) * (W - left - right);
  const g = svgEl('g', { class: 'axis' });
  for (let k = 0; k <= ticks; k++) {
    const v = min + ((max - min) * k) / ticks;
    g.appendChild(svgEl('line', { x1: x(v), x2: x(v), y1: top, y2: H - bottom }));
    g.appendChild(svgEl('text', { x: x(v), y: H - 10, 'text-anchor': 'middle' }, fmtTick(v)));
  }
  svg.appendChild(g);
  rows.forEach((r, i) => {
    const y = top + i * rowH + rowH / 2;
    svg.appendChild(svgEl('text', { x: left - 10, y: y + 4, 'text-anchor': 'end', style: r.color === INK.c0 ? `fill:${INK.c0};font-weight:600` : r.none ? `fill:${INK.muted}` : '' }, r.label));
    if (r.none) { svg.appendChild(svgEl('text', { x: left + 6, y: y + 4, style: `fill:${INK.none};font-weight:600;font-size:10px` }, '아직 학습하지 않음')); return; }
    if (r.ci) svg.appendChild(svgEl('line', { x1: x(Math.max(min, r.ci[0])), x2: x(Math.min(max, r.ci[1])), y1: y, y2: y, stroke: r.color, 'stroke-width': 2, 'stroke-linecap': 'round', opacity: 0.9 }));
    const cx = x(Math.min(max, Math.max(min, r.value)));
    // 값 라벨은 점 오른쪽에 붙이되, 오른쪽 끝에 닿으면 왼쪽으로 넘긴다 (글자가 잘리지 않게)
    const cix = r.ci ? x(Math.min(max, r.ci[1])) : cx;
    const flip = cix + 46 > W - right;
    svg.appendChild(svgEl('circle', { cx, cy: y, r: 3.6, fill: r.color }));
    svg.appendChild(svgEl('text', { x: flip ? x(Math.max(min, r.ci?.[0] ?? r.value)) - 8 : cix + 8, y: y + 3.5, 'text-anchor': flip ? 'end' : 'start', style: `fill:${INK.muted};font-size:10px` }, r.text ?? ''));
  });
}

export function renderCompare(s7) {
  const host = document.getElementById('compare-charts');
  const extra = document.getElementById('compare-extra');
  host.replaceChildren(); extra.replaceChildren();

  const p20 = s7.play.gate20, p50 = s7.play.base50, tp = s7.teacher.play, rnd = s7.play.random;
  const nullRows = s7.nulls.map((n) => ({ label: `${n.key} ${n.ko}`, none: true }));

  // 1) 조각 중앙값
  const piecesMax = Math.max(1000, tp.piecesMedian) * 1.02;
  const c1 = chartCard('플레이: 조각 중앙값 (상한 1000)',
    `한 판에서 몇 수를 두고 버티는가예요. 교사는 ${tp.piecesMedian} (생존 ${pct(tp.survival, 0)}), 초파리는 ${p20.piecesMedian} — 교사의 ${pct(p20.piecesMedian / tp.piecesMedian, 0)}예요. 무작위 배치는 ${rnd?.piecesMedian ?? '—'}.`);
  ciChart(c1.svg, [
    { label: 'C0 실제 배선 (20게임)', value: p20.piecesMedian, ci: p20.piecesMedianCI, color: INK.c0, text: `${p20.piecesMedian}` },
    ...(p50 ? [{ label: 'C0 실제 배선 (50게임)', value: p50.piecesMedian, ci: p50.piecesMedianCI, color: INK.c0, text: `${p50.piecesMedian}` }] : []),
    ...nullRows,
    { label: '교사 (학습 목표)', value: tp.piecesMedian, color: INK.teacher, text: `${tp.piecesMedian}` },
    ...(rnd ? [{ label: '무작위 배치', value: rnd.piecesMedian, ci: rnd.piecesMedianCI, color: INK.baseline, text: `${rnd.piecesMedian}` }] : []),
  ], { min: 0, max: piecesMax, fmtTick: (v) => `${Math.round(v)}` });
  host.appendChild(c1.card);

  // 2) 공격 중앙값
  const c2 = chartCard('플레이: 공격 중앙값 (보낸 가비지 줄)',
    `공격은 줄을 여러 개 한 번에 지울수록 커져요. 초파리가 지운 줄의 ${pct(p20.tetrisLineShare, 1)}만 테트리스(4줄)예요 — 교사는 ${pct(tp.lineComposition.shares[3], 1)}.`);
  ciChart(c2.svg, [
    { label: 'C0 실제 배선 (20게임)', value: p20.attackMedian, ci: p20.attackMedianCI, color: INK.c0, text: `${p20.attackMedian}` },
    ...(p50 ? [{ label: 'C0 실제 배선 (50게임)', value: p50.attackMedian, ci: p50.attackMedianCI, color: INK.c0, text: `${p50.attackMedian}` }] : []),
    ...nullRows,
    { label: '교사 (학습 목표)', value: tp.attackMedian, color: INK.teacher, text: `${tp.attackMedian}` },
  ], { min: 0, max: Math.max(tp.attackMedian * 1.05, 50), fmtTick: (v) => `${Math.round(v)}` });
  host.appendChild(c2.card);

  // 3) 순위 — 학습 후 / 전 / 우연
  const r = s7.ranking;
  const c3 = chartCard(`순위: 교사 최선을 고른 비율 (테스트 결정 ${r.decisions.toLocaleString()}개, 후보 평균 ${fmt(r.candidatesPerDecision, 1)})`,
    '같은 테스트 분할에서 학습 전 · 학습 후 · 우연을 나란히 놓았어요. 순위는 분명히 올랐어요 — 이 축에서는 배선 위 학습이 작동해요.');
  ciChart(c3.svg, [
    { label: '학습 후', value: r.trained.top1, ci: r.trained.top1CI, color: INK.c0, text: pct(r.trained.top1, 1) },
    { label: '학습 전 (초기 가중치)', value: r.untrained.top1, ci: r.untrained.top1CI, color: INK.baseline, text: pct(r.untrained.top1, 1) },
    { label: '우연 (무작위 선택)', value: r.chance.top1, ci: r.chance.top1CI, color: INK.baseline, text: pct(r.chance.top1, 1) },
  ], { min: 0, max: 0.6, fmtTick: (v) => pct(v, 0) });
  host.appendChild(c3.card);

  const c4 = chartCard('순위: 상대 regret (낮을수록 교사 최선에 가까워요)',
    '고른 후보가 교사 최선보다 얼마나 나쁜가를 그 결정의 최선~최악 폭으로 나눈 값이에요. 0 이면 매번 교사 최선을 골랐다는 뜻이에요.');
  ciChart(c4.svg, [
    { label: '학습 후', value: r.trained.relRegret, ci: r.trained.relRegretCI, color: INK.c0, text: fmt(r.trained.relRegret, 3) },
    { label: '학습 전 (초기 가중치)', value: r.untrained.relRegret, ci: r.untrained.relRegretCI, color: INK.baseline, text: fmt(r.untrained.relRegret, 3) },
    { label: '우연 (무작위 선택)', value: r.chance.relRegret, ci: r.chance.relRegretCI, color: INK.baseline, text: fmt(r.chance.relRegret, 3) },
  ], { min: 0, max: 0.6, fmtTick: (v) => v.toFixed(2) });
  host.appendChild(c4.card);

  // 4) 게이트 — 교사 대비 비율
  const g = s7.gate;
  const gate = chartCard(`게이트 ${g.passCount} / ${g.total}: 교사 대비 비율`,
    '기준선(1.0)은 그 항목의 통과선이에요. 조각과 공격이 크게 모자라 여기서 멈췄어요. 순위 지표는 오르는데 플레이 길이는 오르지 않는 것이 7단계의 결론이에요.');
  {
    const items = g.criteria.map((c) => {
      const ratio = c.lower
        ? (c.measured > 0 ? c.threshold / c.measured : 2)   // 낮을수록 좋은 항목은 뒤집어 '여유'로 본다
        : c.measured / (c.threshold || 1);
      return { label: c.label, ratio: Math.min(2, ratio), passed: c.passed, raw: c };
    });
    const W = 440, rowH = 26, left = 150, right = 54, top = 12, bottom = 26;
    const H = top + items.length * rowH + bottom;
    gate.svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const x = (v) => left + (v / 2) * (W - left - right);
    const ax = svgEl('g', { class: 'axis' });
    for (const v of [0, 0.5, 1, 1.5, 2]) {
      ax.appendChild(svgEl('line', { x1: x(v), x2: x(v), y1: top, y2: H - bottom, stroke: v === 1 ? INK.muted : undefined }));
      ax.appendChild(svgEl('text', { x: x(v), y: H - 10, 'text-anchor': 'middle' }, `${v}×`));
    }
    gate.svg.appendChild(ax);
    items.forEach((it, i) => {
      const y = top + i * rowH;
      gate.svg.appendChild(svgEl('text', { x: left - 10, y: y + rowH / 2 + 4, 'text-anchor': 'end' }, it.label));
      gate.svg.appendChild(svgEl('rect', { x: left, y: y + 5, width: Math.max(1, x(it.ratio) - left), height: rowH - 12, rx: 3, fill: it.passed ? INK.ok : INK.none, opacity: 0.85 }));
      gate.svg.appendChild(svgEl('text', { x: x(it.ratio) + 6, y: y + rowH / 2 + 4, style: `fill:${INK.muted};font-size:10px` }, `${it.ratio >= 2 ? '≥2' : it.ratio.toFixed(2)}×`));
    });
    gate.svg.appendChild(svgEl('line', { x1: x(1), x2: x(1), y1: top, y2: H - bottom, stroke: INK.teacher, 'stroke-width': 1.5, 'stroke-dasharray': '3 3' }));
  }
  host.appendChild(gate.card);

  // 5) 줄 구성 — 학생 vs 교사
  const lc = s7.play.lineComposition;
  const lines = chartCard('지운 줄의 구성',
    `초파리는 싱글이 ${pct(lc.student.shares[0], 1)}로 대부분이에요. 테트리스를 쌓으려면 우물을 길게 유지해야 하는데, 우물 길이 중앙값이 ${s7.play.wellRun.student.median} (교사 ${s7.play.wellRun.teacher.median}) 이에요.`);
  {
    const names = ['싱글', '더블', '트리플', '테트리스'];
    const W = 440, top = 16, bottom = 28, left = 40, right = 12, rowH = 40;
    const H = top + rowH * 2 + bottom;
    lines.svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    lines.svg.replaceChildren();
    const colors = ['#c5cbd2', '#a7b0b9', '#6a7480', '#2887ee'];
    [['초파리', lc.student.shares, 0], ['교사', lc.teacher.shares, 1]].forEach(([ko, shares, r]) => {
      const y = top + r * rowH;
      lines.svg.appendChild(svgEl('text', { x: left - 8, y: y + 20, 'text-anchor': 'end', style: 'font-weight:600' }, ko));
      let xx = left;
      shares.forEach((sh, k) => {
        const w = sh * (W - left - right);
        if (w > 0) {
          const rect = svgEl('rect', { x: xx, y: y + 6, width: w, height: 24, fill: colors[k], opacity: 0.95 });
          rect.appendChild(svgEl('title', {}, `${names[k]} ${pct(sh, 1)}`));
          lines.svg.appendChild(rect);
          if (w > 34) lines.svg.appendChild(svgEl('text', { x: xx + w / 2, y: y + 22, 'text-anchor': 'middle', style: `fill:${k === 3 || k === 2 ? '#fff' : '#141f2c'};font-size:10px;font-weight:600` }, pct(sh, 0)));
        }
        xx += w;
      });
    });
    names.forEach((n, k) => {
      lines.svg.appendChild(svgEl('rect', { x: left + k * 78, y: H - 18, width: 9, height: 9, rx: 2, fill: colors[k] }));
      lines.svg.appendChild(svgEl('text', { x: left + k * 78 + 13, y: H - 10, style: `fill:${INK.muted};font-size:10px` }, n));
    });
  }
  extra.appendChild(lines.card);

  // 6) 대조군 카드 — 없는 것을 없다고 적는다
  const nc = el('div', { class: 'card tint' });
  nc.innerHTML = `<div class="card-title">대조군 ${s7.nulls.filter((n) => n.trained).length} / ${s7.nulls.length} 학습됨</div>
    <p>"실제 배선이라서 되는 것인가"를 가르려면 같은 파라미터 수로 배선만 바꾼 대조군을 같은 절차로 학습해야 해요.
    마스크 3종은 만들어져 있고 sanity 도 통과했지만(전부 P ${s7.nulls[0]?.P?.toLocaleString() ?? '—'} 로 C0 와 정확히 같아요), 가중치 학습은 아직이에요.
    그래서 이 페이지에는 <b>C0 의 자리만 채워져 있고 대조군 줄은 비어 있어요.</b> 값을 추정해 채우지 않아요.</p>`;
  const t = el('table', { class: 'mini-table' });
  t.innerHTML = '<thead><tr><th>대조군</th><th>분리하려는 것</th><th class="r">원본 간선 교집합</th><th class="r">차수 보존</th><th class="r">상태</th></tr></thead>';
  const tb = el('tbody');
  for (const n of s7.nulls) {
    const tr = el('tr');
    tr.append(
      el('td', {}, `${n.key} ${n.ko}`),
      el('td', {}, n.separatesWhat ?? '—'),
      el('td', { class: 'r' }, n.sanity?.edgeOverlapWithOriginal != null ? `${pct(n.sanity.edgeOverlapWithOriginal, 2)} (우연 ${pct(n.sanity.chanceOverlap, 2)})` : '—'),
      el('td', { class: 'r' }, n.sanity?.degreeIdentical ? '예' : '아니오'),
      el('td', { class: 'r' }, n.trained ? '학습 완료' : n.state === 'interrupted' ? '학습 중단' : '미시작'),
    );
    tb.appendChild(tr);
  }
  t.appendChild(tb);
  const wrap = el('div', { class: 'table-wrap' }); wrap.appendChild(t);
  nc.appendChild(wrap);
  extra.appendChild(nc);

  const foot = document.getElementById('compare-foot');
  foot.innerHTML = `${s7.phase} · ${new Date(s7.ranAt).toLocaleString('ko-KR')} · ${fmt(s7.elapsedHours, 2)} h 학습 · 교사 ${s7.teacher.label}`
    + ` · 학습 결정 ${s7.data.trainDecisions.toLocaleString()} / 검증 ${s7.data.valDecisions.toLocaleString()} / 테스트 ${s7.data.testDecisions.toLocaleString()}`
    + ` · 손실 ${s7.data.hyper.loss}(λ ${s7.data.hyper.lambda}, μ ${s7.data.hyper.mu}) · DAgger ${s7.data.hyper.daggerRounds} 라운드.`
    + ` 커넥톰에서 오는 것은 배선뿐이고 가중치 ${s7.model.P.toLocaleString()}개는 학습된 값이에요 — corr(초기, 최종) ${fmt(s7.weights.corr, 3)}, 억제성 ${pct(s7.weights.inhibitoryFrac, 1)}(초기 0%).`;
}
