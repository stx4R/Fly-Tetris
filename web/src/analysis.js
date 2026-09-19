// 플레이 분석 — 대전에서 나온 값만으로 "초파리가 어떻게 두는가"를 본다.
//
//  · 보드 품질 추이: 조각을 놓을 때마다의 구멍 수·최고 높이를 사람/초파리 나란히 (versus.js 가 매 배치마다 잰 값)
//  · 선택 성향: 초파리가 고른 후보가 교사 순위에서 몇 번째였나 (백분위 분포) · hold 사용 · 줄 구성
//  · 순위 지표: 내 대전에서 나온 값 ↔ 오프라인 테스트 분할 실측 (web/data/stage7.json) 을 나란히
//
// 판을 하지 않았으면 빈 상태.

import { el, fmt, pct, svgEl } from './util.js';
import { emptyState } from './empty.js';
import { decisionsOf, getState, rankingFrom } from './matchlog.js';

const INK = { human: '#2887ee', fly: '#141f2c', muted: '#6a7480', grid: '#e3e7ec', warn: '#ff8800' };

export function createAnalysisView(stage7) {
  const emptyHost = document.getElementById('analysis-empty');
  const cards = document.getElementById('analysis-cards');
  const matchSel = document.getElementById('an-match');
  let selected = null;

  function lineChart(svg, series, { yLabel, yMax = null, xMax }) {
    const W = 460, H = 210, left = 42, right = 12, top = 16, bottom = 28;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.replaceChildren();
    const max = yMax ?? Math.max(1, ...series.flatMap((s) => s.points.map((p) => p[1])));
    const x = (v) => left + (v / Math.max(1, xMax)) * (W - left - right);
    const y = (v) => top + (1 - v / max) * (H - top - bottom);
    const g = svgEl('g', { class: 'axis' });
    for (let k = 0; k <= 4; k++) {
      const v = (max * k) / 4;
      g.appendChild(svgEl('line', { x1: left, x2: W - right, y1: y(v), y2: y(v) }));
      g.appendChild(svgEl('text', { x: left - 6, y: y(v) + 3, 'text-anchor': 'end' }, `${Math.round(v)}`));
    }
    for (let k = 0; k <= 4; k++) {
      const v = Math.round((xMax * k) / 4);
      g.appendChild(svgEl('text', { x: x(v), y: H - 9, 'text-anchor': k === 4 ? 'end' : 'middle' }, k === 4 ? `${v} 조각` : `${v}`));
    }
    svg.appendChild(g);
    series.forEach((s, i) => {
      if (s.points.length > 1) {
        svg.appendChild(svgEl('polyline', { points: s.points.map(([a, b]) => `${x(a)},${y(b)}`).join(' '), fill: 'none', stroke: s.color, 'stroke-width': 1.8, 'stroke-linejoin': 'round', opacity: 0.95 }));
      }
      svg.appendChild(svgEl('text', { x: left + 4 + i * 62, y: 11, style: `fill:${s.color};font-weight:600` }, s.label));
    });
    svg.appendChild(svgEl('text', { x: W - right, y: 11, 'text-anchor': 'end', style: `fill:${INK.muted}` }, yLabel));
  }

  function bars(svg, items, { fmtV = (v) => `${v}`, color = INK.fly, note = '' }) {
    const W = 460, rowH = 26, left = 120, right = 44, top = 8, bottom = note ? 24 : 8;
    const H = top + items.length * rowH + bottom;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.replaceChildren();
    const max = Math.max(1e-9, ...items.map((i) => i.value));
    items.forEach((it, r) => {
      const y = top + r * rowH;
      svg.appendChild(svgEl('text', { x: left - 10, y: y + rowH / 2 + 4, 'text-anchor': 'end' }, it.label));
      const w = (it.value / max) * (W - left - right);
      svg.appendChild(svgEl('rect', { x: left, y: y + 4, width: Math.max(1, w), height: rowH - 10, rx: 3, fill: it.color ?? color, opacity: 0.9 }));
      svg.appendChild(svgEl('text', { x: left + w + 6, y: y + rowH / 2 + 4, style: `fill:${INK.muted}` }, fmtV(it.value)));
    });
    if (note) svg.appendChild(svgEl('text', { x: left, y: H - 8, style: `fill:${INK.muted};font-size:9px` }, note));
  }

  function fillMatchSelect() {
    const ms = getState().matches.filter((m) => (m.quality?.length ?? 0) > 0 || decisionsOf(m.id).length);
    matchSel.replaceChildren(...ms.map((m) => {
      const when = new Date(m.startedAt).toLocaleString('ko-KR', { dateStyle: 'short', timeStyle: 'short' });
      const res = m.winner === 'human' ? '내가 이김' : m.winner === 'fly' ? '초파리가 이김' : m.endedAt ? '무승부' : '진행 중';
      return el('option', { value: String(m.id) }, `${when} · ${res}`);
    }));
    if (selected) matchSel.value = String(selected);
    return ms;
  }

  function render() {
    const ms = getState().matches.filter((m) => (m.quality?.length ?? 0) > 0 || decisionsOf(m.id).length);
    const ok = ms.length > 0;
    cards.hidden = !ok;
    document.getElementById('an-controls').hidden = !ok;
    emptyHost.hidden = ok;
    if (!ok) {
      emptyHost.replaceChildren(emptyState({
        desc: '조각을 놓을 때마다의 구멍·높이와, 초파리가 교사 순위에서 몇 번째를 골랐는지를 여기에 모아요.',
        cta: '대전하기', href: '#/versus',
        hint: '사람 쪽과 초파리 쪽을 같은 축에 놓고 봐요',
      }));
      return;
    }
    fillMatchSelect();
    if (!selected || !ms.some((m) => m.id === selected)) selected = ms[0].id;
    matchSel.value = String(selected);
    const m = getState().matches.find((x) => x.id === selected);
    const q = m?.quality ?? [];
    const decs = decisionsOf(selected);

    // 1) 보드 품질
    const xMax = Math.max(1, ...q.map((s) => s.at));
    const pick = (side, key) => q.filter((s) => s.side === side).map((s) => [s.at, s[key]]);
    lineChart(document.getElementById('an-holes'), [
      { label: '사람', color: INK.human, points: pick('human', 'holes') },
      { label: '초파리', color: INK.fly, points: pick('fly', 'holes') },
    ], { yLabel: '구멍 수', xMax });
    lineChart(document.getElementById('an-height'), [
      { label: '사람', color: INK.human, points: pick('human', 'height') },
      { label: '초파리', color: INK.fly, points: pick('fly', 'height') },
    ], { yLabel: '최고 높이 (칸)', yMax: 20, xMax });

    // 2) 선택 성향 — 교사 순위 백분위 (0 = 교사 최선)
    const aligned = decs.filter((d) => d.teacherAligned && d.candidates.length > 1);
    const buckets = [0, 0, 0, 0, 0];
    for (const d of aligned) {
      const r = d.candidates[d.chosen].teacherRank / (d.candidates.length - 1);
      buckets[Math.min(4, Math.floor(r * 5))]++;
    }
    const total = aligned.length || 1;
    bars(document.getElementById('an-rank'), [
      { label: '상위 20% 안', value: buckets[0] / total, color: '#007738' },
      { label: '20–40%', value: buckets[1] / total },
      { label: '40–60%', value: buckets[2] / total },
      { label: '60–80%', value: buckets[3] / total },
      { label: '하위 20%', value: buckets[4] / total, color: '#f03848' },
    ], { fmtV: (v) => pct(v, 0), note: `초파리 결정 ${aligned.length}개 · 교사 순위에서 몇 번째를 골랐나` });

    // 3) 줄 구성 + hold
    const lineCount = [0, 0, 0, 0];
    let holds = 0;
    for (const d of decs) if (d.candidates[d.chosen]?.useHold) holds++;
    for (const s of q.filter((x) => x.side === 'fly')) if (s.lines >= 1) lineCount[s.lines - 1]++;
    const clears = lineCount.reduce((a, b) => a + b, 0) || 1;
    bars(document.getElementById('an-lines'), [
      { label: '싱글', value: lineCount[0] / clears },
      { label: '더블', value: lineCount[1] / clears },
      { label: '트리플', value: lineCount[2] / clears },
      { label: '테트리스', value: lineCount[3] / clears, color: '#2887ee' },
    ], { fmtV: (v) => pct(v, 0), note: `초파리가 지운 줄 ${clears - (clears === 1 && !lineCount.some(Boolean) ? 1 : 0)}회 기준 · hold 사용 ${decs.length ? pct(holds / decs.length, 0) : '—'}` });

    // 4) 순위 지표 — 내 대전 ↔ 오프라인 실측
    const mine = rankingFrom(decs);
    const off = stage7?.ranking?.trained ?? null;
    const kpis = document.getElementById('an-summary');
    const row = (label, a, b, sub) => {
      const k = el('div', { class: 'card kpi' });
      k.append(el('div', { class: 'label' }, label), el('div', { class: 'value' }, a), el('div', { class: 'sub' }, `${b}${sub ? ` · ${sub}` : ''}`));
      return k;
    };
    kpis.replaceChildren(
      row('교사 최선을 고른 비율', mine ? pct(mine.top1, 1) : '—', `오프라인 ${off ? pct(off.top1, 1) : '—'}`, `내 대전 결정 ${mine?.decisions ?? 0}개`),
      row('상대 regret', mine ? fmt(mine.relRegret, 3) : '—', `오프라인 ${off ? fmt(off.relRegret, 3) : '—'}`, '0 이면 항상 교사 최선'),
      row('결정 내 켄달 τ', mine?.tau != null ? fmt(mine.tau, 3) : '—', `오프라인 ${off ? fmt(off.tau, 3) : '—'}`, '모델 순위 ↔ 교사 순위'),
      row('하위 절반을 고른 비율', mine ? pct(mine.bottomHalfRate, 1) : '—', `오프라인 ${off ? pct(off.bottomHalfRate, 1) : '—'}`, '낮을수록 좋아요'),
    );

    const foot = document.getElementById('an-foot');
    const fq = q.filter((s) => s.side === 'fly'), hq = q.filter((s) => s.side === 'human');
    const medOf = (arr, key) => { const v = arr.map((s) => s[key]).sort((a, b) => a - b); return v.length ? v[v.length >> 1] : null; };
    foot.innerHTML = `이 판: 초파리 조각 ${fq.length} · 구멍 중앙값 ${medOf(fq, 'holes') ?? '—'} · 최고 높이 중앙값 ${medOf(fq, 'height') ?? '—'} · 우물 깊이 중앙값 ${medOf(fq, 'well') ?? '—'}`
      + ` / 사람 조각 ${hq.length} · 구멍 ${medOf(hq, 'holes') ?? '—'} · 높이 ${medOf(hq, 'height') ?? '—'} · 우물 ${medOf(hq, 'well') ?? '—'}.`
      + (off ? ` 오프라인 실측(테스트 분할 ${stage7.ranking.decisions} 결정)은 같은 정의로 잰 값이에요 — 대전은 판마다 결정 수가 적어 값이 크게 흔들려요.` : '');
  }

  matchSel.addEventListener('change', () => { selected = Number(matchSel.value); render(); });
  return { render, refresh: render };
}
