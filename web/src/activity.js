// 신경 활동 — 초파리가 대전에서 고른 배치 하나를 넣었을 때, 표본 뉴런의 스텝별 활성.
//
// 7단계 모델은 rate RNN 이다: x(t+1) = (1−lr)·x(t) + lr·tanh((W⊙M)·x(t) + W_in·u + b).
// 그래서 여기 그리는 것은 스파이크가 아니라 **활성값**이고, 값은 음수일 수 있다 (tanh).
// 래스터는 밝기로, 층별 추이는 평균 |활성| 로 그린다. 기록은 초파리가 실제로 고른 후보 하나에만 있다
// (후보 40개 전부의 25스텝 전체 상태를 남기면 결정 하나가 1 MB 를 넘는다).
//
// 재생 컨트롤은 이 화면과 커넥톰 화면 두 곳에 있어 bindControls 로 같은 상태에 묶는다.

import { svgEl, icon, fmt } from './util.js';
import { emptyState } from './empty.js';

const LAYER_COLOR = { input: '#2887ee', hidden: '#a7b0b9', output: '#141f2c' };
const LAYER_KO = { input: '입력 LC/LPLC', hidden: '중간', output: '출력 DN' };
const INK = { muted: '#6a7480', cursor: '#ff8800', grid: '#e3e7ec' };
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function createActivityView(graph, view3d) {
  const raster = document.getElementById('act-raster');
  const chart = document.getElementById('act-chart');
  const grid = document.getElementById('activity-grid');
  const emptyHost = document.getElementById('activity-empty');

  // 표본 뉴런을 층별로 정렬한 행 순서 (graph.nodes 인덱스 = 트레이스 열 인덱스)
  const rank = { input: 0, hidden: 1, output: 2 };
  const order = graph.nodes.map((n, i) => i).sort((a, b) => rank[graph.nodes[a].layer] - rank[graph.nodes[b].layer] || a - b);
  const rowOf = new Int32Array(graph.nodes.length); order.forEach((gi, r) => { rowOf[gi] = r; });
  const counts = { input: 0, hidden: 0, output: 0 };
  for (const n of graph.nodes) counts[n.layer]++;

  const state = { dec: null, t: 0, playing: false, timer: null };
  const controls = [];

  const T = () => state.dec?.trace?.T ?? 25;
  const has = () => !!state.dec?.trace;
  // 트레이스 값 → 0..1 (음수 포함 범위를 0..1 로 편 것). 그대로 밝기로 쓴다.
  const val = (t, i) => state.dec.trace.data[t * state.dec.trace.n + i] / 255;
  const real = (u) => { const q = state.dec.trace; return q.max > q.min ? q.min + u * (q.max - q.min) : q.min; };
  // 밝기는 활성의 **크기**다. 양자화 위치(0..1)를 그대로 쓰면 값 0 이 중간 밝기가 되어 화면이 뿌예진다.
  const maxAbs = () => { const q = state.dec.trace; return Math.max(1e-6, Math.abs(q.min), Math.abs(q.max)); };
  const mag = (t, i) => Math.abs(real(val(t, i))) / maxAbs();

  function drawRaster() {
    if (!has() || raster.clientWidth === 0) return;
    const dpr = Math.min(devicePixelRatio, 2);
    const w = raster.clientWidth, h = raster.clientHeight;
    raster.width = w * dpr; raster.height = h * dpr;
    const ctx = raster.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const left = 74, top = 12, bottom = 26, right = 12;
    const rows = order.length, steps = T();
    const colW = (w - left - right) / steps, rowH = (h - top - bottom) / rows;
    const font = getComputedStyle(document.body).fontFamily;

    const bands = [['input', 0, counts.input], ['hidden', counts.input, rows - counts.output], ['output', rows - counts.output, rows]];
    for (const [layer, r0, r1] of bands) {
      ctx.fillStyle = LAYER_COLOR[layer]; ctx.globalAlpha = 0.06;
      ctx.fillRect(left, top + r0 * rowH, w - left - right, (r1 - r0) * rowH);
      ctx.globalAlpha = 1;
      ctx.fillStyle = LAYER_COLOR[layer]; ctx.font = `600 11px ${font}`; ctx.textAlign = 'right';
      ctx.fillText(LAYER_KO[layer], left - 8, top + (r0 + (r1 - r0) / 2) * rowH + 4);
    }
    // 활성 — 밝기로 그린다. 지난 스텝은 층 색, 앞으로 올 스텝은 옅게.
    for (let t = 0; t < steps; t++) {
      const x = left + t * colW;
      const future = t > state.t;
      for (let gi = 0; gi < order.length; gi++) {
        const u = mag(t, gi);
        if (u < 0.03) continue;
        const r = rowOf[gi];
        ctx.globalAlpha = future ? u * 0.22 : u;
        ctx.fillStyle = LAYER_COLOR[graph.nodes[gi].layer];
        ctx.fillRect(x, top + r * rowH, Math.max(1, colW), Math.max(1, rowH));
      }
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = INK.cursor; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(left + (state.t + 1) * colW, top); ctx.lineTo(left + (state.t + 1) * colW, h - bottom); ctx.stroke();
    ctx.fillStyle = INK.muted; ctx.textAlign = 'center'; ctx.font = `500 10px ${font}`;
    for (let t = 0; t < steps; t += 5) ctx.fillText(`${t}`, left + (t + 0.5) * colW, h - 9);
    ctx.fillText('스텝', w - 22, h - 9);
  }

  function drawChart() {
    if (!has()) return;
    const steps = T();
    const W = 380, H = chart.clientWidth ? Math.round(W * chart.clientHeight / chart.clientWidth) : 240;
    const left = 46, right = 12, top = 18, bottom = 28;
    chart.setAttribute('viewBox', `0 0 ${W} ${H}`);
    chart.replaceChildren();
    // 층별 평균 |활성| (실값 기준 — 0 이 진짜 0 이 되도록 역양자화한다)
    const series = { input: new Float64Array(steps), hidden: new Float64Array(steps), output: new Float64Array(steps) };
    for (let t = 0; t < steps; t++) {
      const acc = { input: 0, hidden: 0, output: 0 };
      for (let gi = 0; gi < order.length; gi++) acc[graph.nodes[gi].layer] += Math.abs(real(val(t, gi)));
      for (const k of ['input', 'hidden', 'output']) series[k][t] = counts[k] ? acc[k] / counts[k] : 0;
    }
    const max = Math.max(1e-6, ...['input', 'hidden', 'output'].flatMap((k) => [...series[k]]));
    const x = (t) => left + (t / Math.max(1, steps - 1)) * (W - left - right);
    const y = (v) => top + (1 - v / max) * (H - top - bottom);
    const g = svgEl('g', { class: 'axis' });
    for (let k = 0; k <= 4; k++) { const v = (max * k) / 4; g.appendChild(svgEl('line', { x1: left, x2: W - right, y1: y(v), y2: y(v) })); g.appendChild(svgEl('text', { x: left - 6, y: y(v) + 3, 'text-anchor': 'end' }, v.toFixed(2))); }
    for (let t = 0; t < steps; t += 5) g.appendChild(svgEl('text', { x: x(t), y: H - 8, 'text-anchor': 'middle' }, `${t}`));
    g.appendChild(svgEl('text', { x: W - right, y: H - 8, 'text-anchor': 'end' }, '스텝'));
    chart.appendChild(g);
    ['input', 'hidden', 'output'].forEach((layer, li) => {
      const pts = [...series[layer]].map((v, t) => `${x(t)},${y(v)}`).join(' ');
      chart.appendChild(svgEl('polyline', { points: pts, fill: 'none', stroke: LAYER_COLOR[layer], 'stroke-width': 2, 'stroke-linejoin': 'round' }));
      chart.appendChild(svgEl('text', { x: left + 4 + li * 68, y: 12, style: `fill:${LAYER_COLOR[layer]};font-weight:600` }, LAYER_KO[layer]));
    });
    chart.appendChild(svgEl('line', { x1: x(state.t), x2: x(state.t), y1: top, y2: H - bottom, stroke: INK.cursor, 'stroke-width': 1.5 }));
    chart.appendChild(svgEl('text', { x: W - right, y: 12, 'text-anchor': 'end', style: `fill:${INK.muted}` }, `표본 ${order.length} 뉴런 (전체 ${graph.meta?.total?.toLocaleString?.() ?? '8,000'})`));
  }

  function setPlayButtons() {
    for (const c of controls) {
      c.play.replaceChildren(icon(state.playing ? 'i-pause' : 'i-play'), document.createTextNode(state.playing ? '일시정지' : '재생'));
      c.play.setAttribute('aria-pressed', String(state.playing));
      c.play.disabled = !has();
      c.step.disabled = !has();
      c.reset.disabled = !has();
    }
  }

  function update() {
    const text = has()
      ? `스텝 ${state.t + 1} / ${T()} · 이 스텝 평균 |활성| ${fmt(stepMean(), 3)}`
      : '대전에서 초파리가 수를 두면 재생할 수 있어요';
    for (const c of controls) c.label.textContent = text;
    drawRaster(); drawChart(); setPlayButtons();
    view3d?.highlightActivity(has() ? activityAt(state.t) : null);
    const info = document.getElementById('act-info');
    if (info && has()) {
      const q = state.dec.trace;
      info.innerHTML = `활성 범위 <b>${fmt(q.min, 3)} ~ ${fmt(q.max, 3)}</b> (tanh 상태) · 창 ${T()} 스텝 · 표본 ${q.n} 뉴런`
        + ` · 결정 생각 시간 <b>${state.dec.ms} ms</b> · 후보 ${state.dec.candidates.length}개`;
    }
  }

  function stepMean() {
    let s = 0;
    for (let gi = 0; gi < order.length; gi++) s += Math.abs(real(val(state.t, gi)));
    return s / order.length;
  }
  // 커넥톰 3D 로 보낼 값: graph.nodes 인덱스 → 0..1 세기
  function activityAt(t) {
    const out = new Float32Array(order.length);
    for (let gi = 0; gi < order.length; gi++) {
      const v = Math.abs(real(val(t, gi)));
      out[gi] = v;
    }
    let max = 0; for (const v of out) if (v > max) max = v;
    if (max > 0) for (let i = 0; i < out.length; i++) out[i] /= max;
    return out;
  }

  function setStep(t) { const n = T(); state.t = ((t % n) + n) % n; update(); }
  function stop() { state.playing = false; if (state.timer) clearInterval(state.timer); state.timer = null; setPlayButtons(); }
  function play() {
    if (!has()) return;
    if (state.t >= T() - 1) state.t = 0;
    state.playing = true; setPlayButtons();
    state.timer = setInterval(() => { if (state.t >= T() - 1) { stop(); return; } setStep(state.t + 1); }, reduced ? 400 : 180);
  }

  function bindControls(host) {
    if (!host) return;
    const c = { play: host.querySelector('[data-sp="play"]'), step: host.querySelector('[data-sp="step"]'), reset: host.querySelector('[data-sp="reset"]'), label: host.querySelector('[data-sp="label"]') };
    c.play.addEventListener('click', () => (state.playing ? stop() : play()));
    c.step.addEventListener('click', () => { stop(); setStep(state.t + 1); });
    c.reset.addEventListener('click', () => { stop(); setStep(0); });
    controls.push(c);
    setPlayButtons();
  }

  function renderShell() {
    const ok = has();
    if (grid) grid.hidden = !ok;
    const notice = document.getElementById('act-notice');
    if (notice) notice.hidden = !ok;
    const playRow = document.getElementById('act-play');
    if (playRow) playRow.hidden = !ok;
    if (emptyHost) {
      emptyHost.hidden = ok;
      if (!ok) emptyHost.replaceChildren(emptyState({
        desc: '초파리가 고른 배치를 배선 제약 네트워크에 넣었을 때, 표본 뉴런 907개의 스텝별 활성을 여기서 재생해요.',
        cta: '대전하기', href: '#/versus',
        hint: '커넥톰 3D 화면에서도 같은 재생을 볼 수 있어요',
      }));
    }
  }

  new ResizeObserver(() => drawRaster()).observe(raster);
  new ResizeObserver(() => drawChart()).observe(chart);

  return {
    bindControls,
    // 결정 탐색에서 고른 결정을 따라간다.
    setDecision(dec) { stop(); state.dec = dec; state.t = 0; renderShell(); update(); },
    redraw() { renderShell(); drawRaster(); drawChart(); },
    clearHighlight() { view3d?.highlightActivity(null); },
    get hasTrace() { return has(); },
  };
}
