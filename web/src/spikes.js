// 스파이크 활동: 선택 후보의 스텝별 발화 래스터(표본 뉴런, 층별 정렬) + 층별 발화 수 추이 + 재생 (커넥톰 3D 점등 연동).
// 스파이크 기록은 리저버가 실제로 고른 후보에 대해서만 있다 (episode.json). 다른 후보를 고르면 그 사실을 표시한다.
// 재생 컨트롤은 결정 탐색 화면과 커넥톰 화면 두 곳에 있어 bindControls 로 같은 상태에 묶는다.

import { svgEl, icon } from './util.js';

// 토스 토큰 hex (canvas 는 CSS 변수를 못 읽는다)
const LAYER_COLOR = { input: '#2887ee', hidden: '#a7b0b9', output: '#141f2c' };
const LAYER_KO = { input: '입력', hidden: '중간', output: 'DN' };
const INK = { muted: '#6a7480', future: '#c5cbd2', cursor: '#ff8800' };
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function createSpikesView(episode, graph, view3d) {
  const raster = document.getElementById('raster');
  const chart = document.getElementById('layer-chart');
  const T = episode.meta.T;
  // 표본 뉴런을 층별로 정렬한 행 순서 (graph.nodes 인덱스 → 행)
  const rank = { input: 0, hidden: 1, output: 2 };
  const order = graph.nodes.map((n, i) => i).sort((a, b) => rank[graph.nodes[a].layer] - rank[graph.nodes[b].layer] || a - b);
  const rowOf = new Int32Array(graph.nodes.length); order.forEach((gi, r) => { rowOf[gi] = r; });
  const bounds = { input: order.filter((gi) => graph.nodes[gi].layer === 'input').length, output: order.filter((gi) => graph.nodes[gi].layer === 'output').length };
  const state = { d: 0, c: 0, t: 0, playing: false, timer: null };
  const controls = []; // { play, step, reset, label }

  function decision() { return episode.decisions[state.d]; }
  function isChosen() { return state.c === decision().chosen; }

  function drawRaster() {
    if (raster.clientWidth === 0) return; // 숨겨진 탭
    const d = decision();
    const dpr = Math.min(devicePixelRatio, 2);
    const w = raster.clientWidth, h = raster.clientHeight;
    raster.width = w * dpr; raster.height = h * dpr;
    const ctx = raster.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const left = 48, top = 12, bottom = 26, right = 12;
    const rows = order.length, colW = (w - left - right) / T, rowH = (h - top - bottom) / rows;
    const font = getComputedStyle(document.body).fontFamily;
    // 층 띠
    const bands = [['input', 0, bounds.input], ['hidden', bounds.input, rows - bounds.output], ['output', rows - bounds.output, rows]];
    for (const [layer, r0, r1] of bands) {
      ctx.fillStyle = LAYER_COLOR[layer]; ctx.globalAlpha = 0.08; ctx.fillRect(left, top + r0 * rowH, w - left - right, (r1 - r0) * rowH); ctx.globalAlpha = 1;
      ctx.fillStyle = LAYER_COLOR[layer]; ctx.font = `600 11px ${font}`; ctx.textAlign = 'right';
      ctx.fillText(LAYER_KO[layer], left - 8, top + (r0 + (r1 - r0) / 2) * rowH + 4);
    }
    if (!isChosen()) {
      ctx.fillStyle = INK.muted; ctx.textAlign = 'center'; ctx.font = `500 13px ${font}`;
      ctx.fillText('스파이크 기록은 리저버가 고른 후보에만 있어요 (초록 테두리 후보를 선택하세요)', left + (w - left - right) / 2, h / 2);
      return;
    }
    d.spikes.forEach((fired, t) => {
      const x = left + t * colW;
      for (const gi of fired) {
        const r = rowOf[gi];
        ctx.fillStyle = t <= state.t ? LAYER_COLOR[graph.nodes[gi].layer] : INK.future;
        ctx.fillRect(x + 1, top + r * rowH - 0.5, Math.max(1, colW - 2), Math.max(1.5, rowH));
      }
    });
    // 현재 스텝 커서
    ctx.strokeStyle = INK.cursor; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(left + (state.t + 1) * colW, top); ctx.lineTo(left + (state.t + 1) * colW, h - bottom); ctx.stroke();
    ctx.fillStyle = INK.muted; ctx.textAlign = 'center'; ctx.font = `500 10px ${font}`;
    for (let t = 0; t < T; t += 5) ctx.fillText(`${t}`, left + (t + 0.5) * colW, h - 9);
    ctx.fillText('ms', w - 16, h - 9);
  }

  function drawChart() {
    const d = decision();
    // 요소의 가로세로비에 viewBox 를 맞춰 카드 높이를 꽉 채운다 (글자 크기는 가로폭 기준으로만 늘어난다)
    const W = 380, H = chart.clientWidth ? Math.round(W * chart.clientHeight / chart.clientWidth) : 240, left = 40, right = 12, top = 18, bottom = 28;
    chart.setAttribute('viewBox', `0 0 ${W} ${H}`);
    chart.innerHTML = '';
    if (!isChosen()) { chart.appendChild(svgEl('text', { x: W / 2, y: H / 2, 'text-anchor': 'middle', style: `fill:${INK.muted}` }, '리저버가 고른 후보에 대해서만 기록이 있어요')); return; }
    const series = ['input', 'hidden', 'output'].map((layer, li) => d.layerCounts.map((row) => row[li]));
    const max = Math.max(1, ...series.flat());
    const x = (t) => left + (t / (T - 1)) * (W - left - right), y = (v) => top + (1 - v / max) * (H - top - bottom);
    const g = svgEl('g', { class: 'axis' });
    for (let k = 0; k <= 4; k++) { const v = (max * k) / 4; g.appendChild(svgEl('line', { x1: left, x2: W - right, y1: y(v), y2: y(v) })); g.appendChild(svgEl('text', { x: left - 6, y: y(v) + 3, 'text-anchor': 'end' }, `${Math.round(v)}`)); }
    for (let t = 0; t < T; t += 5) g.appendChild(svgEl('text', { x: x(t), y: H - 8, 'text-anchor': 'middle' }, `${t}`));
    g.appendChild(svgEl('text', { x: W - right, y: H - 8, 'text-anchor': 'end' }, 'ms'));
    chart.appendChild(g);
    ['input', 'hidden', 'output'].forEach((layer, li) => {
      const pts = series[li].map((v, t) => `${x(t)},${y(v)}`).join(' ');
      chart.appendChild(svgEl('polyline', { points: pts, fill: 'none', stroke: LAYER_COLOR[layer], 'stroke-width': 2, 'stroke-linejoin': 'round' }));
      chart.appendChild(svgEl('text', { x: left + 4 + li * 52, y: 12, style: `fill:${LAYER_COLOR[layer]};font-weight:600` }, LAYER_KO[layer]));
    });
    chart.appendChild(svgEl('line', { x1: x(state.t), x2: x(state.t), y1: top, y2: H - bottom, stroke: INK.cursor, 'stroke-width': 1.5 }));
    const tot = d.layerCounts.reduce((s, r) => s + r[0] + r[1] + r[2], 0);
    const N = episode.meta.layerSizes.input + episode.meta.layerSizes.hidden + episode.meta.layerSizes.output;
    chart.appendChild(svgEl('text', { x: W - right, y: 12, 'text-anchor': 'end', style: `fill:${INK.muted}` }, `창 총 발화 ${tot.toLocaleString()} (전 뉴런 ${N.toLocaleString()})`));
  }

  function setPlayButtons() {
    for (const c of controls) {
      c.play.replaceChildren(icon(state.playing ? 'i-pause' : 'i-play'), document.createTextNode(state.playing ? '일시정지' : '재생'));
      c.play.setAttribute('aria-pressed', String(state.playing));
      c.play.disabled = !isChosen();
      c.step.disabled = !isChosen();
    }
  }
  function update() {
    const text = `결정 ${state.d + 1} · 스텝 ${state.t + 1} / ${T}` + (isChosen() ? ` · 이 스텝 발화 (표본) ${decision().spikes[state.t].length}` : ' · 리저버가 고른 후보를 선택하면 재생할 수 있어요');
    for (const c of controls) c.label.textContent = text;
    drawRaster(); drawChart(); setPlayButtons();
    view3d?.highlightStep(isChosen() ? decision().spikes[state.t] : null);
  }
  function setStep(t) { state.t = ((t % T) + T) % T; update(); }
  function stop() { state.playing = false; if (state.timer) clearInterval(state.timer); state.timer = null; setPlayButtons(); }
  function play() {
    if (!isChosen()) return;
    if (state.t >= T - 1) state.t = 0;
    state.playing = true; setPlayButtons();
    state.timer = setInterval(() => { if (state.t >= T - 1) { stop(); return; } setStep(state.t + 1); }, reduced ? 400 : 180);
  }

  // 컨트롤 묶기: host 안의 [data-sp=play|step|reset|label]
  function bindControls(host) {
    const c = { play: host.querySelector('[data-sp="play"]'), step: host.querySelector('[data-sp="step"]'), reset: host.querySelector('[data-sp="reset"]'), label: host.querySelector('[data-sp="label"]') };
    c.play.addEventListener('click', () => (state.playing ? stop() : play()));
    c.step.addEventListener('click', () => { stop(); setStep(state.t + 1); });
    c.reset.addEventListener('click', () => { stop(); setStep(0); });
    controls.push(c);
    setPlayButtons();
    c.label.textContent = `결정 ${state.d + 1} · 스텝 ${state.t + 1} / ${T}`;
  }

  new ResizeObserver(() => drawRaster()).observe(raster);
  new ResizeObserver(() => drawChart()).observe(chart);
  update();
  return {
    bindControls,
    setDecision(d, c) { stop(); state.d = d; state.c = c; state.t = 0; update(); },
    redraw() { drawRaster(); drawChart(); },
    clearHighlight() { view3d?.highlightStep(null); },
  };
}
