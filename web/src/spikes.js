// S3: 선택 후보의 스텝별 발화 래스터(표본 뉴런, 층별 정렬) + 층별 발화 수 추이 + 재생 (S1 점등 연동).
// 스파이크 기록은 리저버가 실제로 고른 후보에 대해서만 있다 (episode.json). 다른 후보를 고르면 그 사실을 표시한다.

import { svgEl } from './util.js';

const LAYER_COLOR = { input: '#38bdf8', hidden: '#8b93a7', output: '#fb923c' };
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function createSpikesView(episode, graph, view3d) {
  const raster = document.getElementById('raster');
  const chart = document.getElementById('layer-chart');
  const label = document.getElementById('sp-label');
  const T = episode.meta.T;
  // 표본 뉴런을 층별로 정렬한 행 순서 (graph.nodes 인덱스 → 행)
  const order = graph.nodes.map((n, i) => i).sort((a, b) => ({ input: 0, hidden: 1, output: 2 }[graph.nodes[a].layer] - { input: 0, hidden: 1, output: 2 }[graph.nodes[b].layer]) || a - b);
  const rowOf = new Int32Array(graph.nodes.length); order.forEach((gi, r) => { rowOf[gi] = r; });
  const bounds = { input: order.filter((gi) => graph.nodes[gi].layer === 'input').length, output: order.filter((gi) => graph.nodes[gi].layer === 'output').length };
  const state = { d: 0, c: 0, t: 0, playing: false, timer: null };

  function decision() { return episode.decisions[state.d]; }
  function isChosen() { return state.c === decision().chosen; }

  function drawRaster() {
    const d = decision();
    const dpr = Math.min(devicePixelRatio, 2);
    const w = raster.clientWidth, h = raster.clientHeight;
    raster.width = w * dpr; raster.height = h * dpr;
    const ctx = raster.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const left = 44, top = 8, bottom = 22;
    const rows = order.length, colW = (w - left - 8) / T, rowH = (h - top - bottom) / rows;
    // 층 띠
    const bands = [['input', 0, bounds.input], ['hidden', bounds.input, rows - bounds.output], ['output', rows - bounds.output, rows]];
    for (const [layer, r0, r1] of bands) {
      ctx.fillStyle = LAYER_COLOR[layer]; ctx.globalAlpha = 0.12; ctx.fillRect(left, top + r0 * rowH, w - left - 8, (r1 - r0) * rowH); ctx.globalAlpha = 1;
      ctx.fillStyle = LAYER_COLOR[layer]; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText({ input: '입력', hidden: '중간', output: 'DN' }[layer], left - 6, top + (r0 + (r1 - r0) / 2) * rowH + 4);
    }
    if (!isChosen()) {
      ctx.fillStyle = '#9aa3b2'; ctx.textAlign = 'center'; ctx.font = '12px sans-serif';
      ctx.fillText('스파이크 기록은 리저버가 고른 후보에만 있습니다 (초록 테두리 후보를 선택하세요)', left + (w - left) / 2, h / 2);
      return;
    }
    d.spikes.forEach((fired, t) => {
      const x = left + t * colW;
      for (const gi of fired) {
        const r = rowOf[gi];
        ctx.fillStyle = t <= state.t ? LAYER_COLOR[graph.nodes[gi].layer] : '#3a4152';
        ctx.fillRect(x + 1, top + r * rowH - 0.5, Math.max(1, colW - 2), Math.max(1.5, rowH));
      }
    });
    // 현재 스텝 커서
    ctx.strokeStyle = '#f5c542'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(left + (state.t + 1) * colW, top); ctx.lineTo(left + (state.t + 1) * colW, h - bottom); ctx.stroke();
    ctx.fillStyle = '#9aa3b2'; ctx.textAlign = 'center'; ctx.font = '10px sans-serif';
    for (let t = 0; t < T; t += 5) ctx.fillText(`${t}`, left + (t + 0.5) * colW, h - 8);
    ctx.fillText('ms', w - 14, h - 8);
  }

  function drawChart() {
    const d = decision();
    const W = 380, H = 240, left = 40, right = 12, top = 16, bottom = 28;
    chart.setAttribute('viewBox', `0 0 ${W} ${H}`);
    chart.innerHTML = '';
    if (!isChosen()) { chart.appendChild(svgEl('text', { x: W / 2, y: H / 2, 'text-anchor': 'middle', style: 'fill:#9aa3b2' }, '리저버가 고른 후보에 대해서만 기록')); return; }
    const series = ['input', 'hidden', 'output'].map((layer, li) => d.layerCounts.map((row) => row[li]));
    const max = Math.max(1, ...series.flat());
    const x = (t) => left + (t / (T - 1)) * (W - left - right), y = (v) => top + (1 - v / max) * (H - top - bottom);
    const g = svgEl('g', { class: 'axis' });
    for (let k = 0; k <= 4; k++) { const v = (max * k) / 4; g.appendChild(svgEl('line', { x1: left, x2: W - right, y1: y(v), y2: y(v), stroke: '#202737' })); g.appendChild(svgEl('text', { x: left - 4, y: y(v) + 3, 'text-anchor': 'end' }, `${Math.round(v)}`)); }
    for (let t = 0; t < T; t += 5) g.appendChild(svgEl('text', { x: x(t), y: H - 8, 'text-anchor': 'middle' }, `${t}`));
    g.appendChild(svgEl('text', { x: W - right, y: H - 8, 'text-anchor': 'end' }, 'ms'));
    chart.appendChild(g);
    ['input', 'hidden', 'output'].forEach((layer, li) => {
      const pts = series[li].map((v, t) => `${x(t)},${y(v)}`).join(' ');
      chart.appendChild(svgEl('polyline', { points: pts, fill: 'none', stroke: LAYER_COLOR[layer], 'stroke-width': 1.8 }));
      chart.appendChild(svgEl('text', { x: left + 4 + li * 60, y: 12, style: `fill:${LAYER_COLOR[layer]}` }, { input: '입력', hidden: '중간', output: 'DN' }[layer]));
    });
    chart.appendChild(svgEl('line', { x1: x(state.t), x2: x(state.t), y1: top, y2: H - bottom, stroke: '#f5c542' }));
    const tot = d.layerCounts.reduce((s, r) => s + r[0] + r[1] + r[2], 0);
    chart.appendChild(svgEl('text', { x: W - right, y: 12, 'text-anchor': 'end', style: 'fill:#9aa3b2' }, `창 총 발화 ${tot} (전 뉴런 ${episode.meta.layerSizes.input + episode.meta.layerSizes.hidden + episode.meta.layerSizes.output})`));
  }

  function update() {
    label.textContent = `결정 ${state.d + 1} · 스텝 ${state.t + 1} / ${T}` + (isChosen() ? ` · 이 스텝 발화 (표본) ${decision().spikes[state.t].length}` : '');
    drawRaster(); drawChart();
    view3d?.highlightStep(isChosen() ? decision().spikes[state.t] : null);
  }
  function setStep(t) { state.t = ((t % T) + T) % T; update(); }
  function stop() { state.playing = false; if (state.timer) clearInterval(state.timer); state.timer = null; document.getElementById('sp-play').textContent = '▶ 재생'; document.getElementById('sp-play').setAttribute('aria-pressed', 'false'); }
  function play() {
    if (!isChosen()) return;
    state.playing = true; document.getElementById('sp-play').textContent = '❚❚ 일시정지'; document.getElementById('sp-play').setAttribute('aria-pressed', 'true');
    state.timer = setInterval(() => { if (state.t >= T - 1) { stop(); return; } setStep(state.t + 1); }, reduced ? 400 : 180);
  }
  document.getElementById('sp-play').addEventListener('click', () => (state.playing ? stop() : play()));
  document.getElementById('sp-step').addEventListener('click', () => { stop(); setStep(state.t + 1); });
  document.getElementById('sp-reset').addEventListener('click', () => { stop(); setStep(0); });
  new ResizeObserver(() => drawRaster()).observe(raster);
  update();
  return {
    setDecision(d, c) { stop(); state.d = d; state.c = c; state.t = 0; update(); },
    clearHighlight() { view3d?.highlightStep(null); },
  };
}
