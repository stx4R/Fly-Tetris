// S2: 한 번의 결정. 보드 + 후보 선택, 선택 후보의 DN 발화 수 히트맵, 예측 순위 vs 실제 순위 bump chart.

import { unpackBoard, kendallTau, fmt, el, svgEl } from './util.js';

const W = 10, H = 20;
const PIECES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

export function createDecisionView(episode, summary, dnTypes, onCandidate) {
  const decs = episode.decisions;
  const boardCanvas = document.getElementById('board-canvas');
  const strip = document.getElementById('candidate-strip');
  const heat = document.getElementById('dn-heatmap');
  const bump = document.getElementById('bump');
  const label = document.getElementById('dec-label');
  const state = { d: 0, c: 0 };
  const c0 = summary.conditions.find((r) => r.key === 'C0');

  function drawBoard(canvas, before, after, cell) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const a = after[i], b = before ? before[i] : 0;
      if (!a && !b) { ctx.fillStyle = '#12161f'; ctx.fillRect(x * cell, y * cell, cell - 1, cell - 1); continue; }
      ctx.fillStyle = a && !b ? '#f5c542' : a ? '#3d4a63' : '#4a2530';
      ctx.fillRect(x * cell, y * cell, cell - 1, cell - 1);
    }
  }

  function renderDecision() {
    const d = decs[state.d];
    const before = unpackBoard(d.board);
    label.textContent = `결정 ${state.d + 1} / ${decs.length} · 조각 ${PIECES[d.piece]} · 후보 ${d.candidates.length}`;
    strip.innerHTML = '';
    d.candidates.forEach((cand, k) => {
      const cv = el('canvas', { width: 10 * 3, height: 20 * 3, role: 'option', title: `col ${cand.col} rot ${cand.rot} · 가치 ${fmt(cand.value, 2)} · 점수 ${fmt(cand.score, 2)}` });
      drawBoard(cv, before, unpackBoard(cand.board), 3);
      cv.className = (k === state.c ? 'selected ' : '') + (k === d.chosen ? 'chosen' : '');
      cv.addEventListener('click', () => { state.c = k; renderCandidate(); });
      strip.appendChild(cv);
    });
    renderCandidate();
  }

  function renderCandidate() {
    const d = decs[state.d];
    const cand = d.candidates[state.c];
    const before = unpackBoard(d.board);
    drawBoard(boardCanvas, before, unpackBoard(cand.board), 20);
    [...strip.children].forEach((cv, k) => { cv.className = (k === state.c ? 'selected ' : '') + (k === d.chosen ? 'chosen' : ''); });
    document.getElementById('board-info').innerHTML = `후보 <b>col ${cand.col} · rot ${cand.rot}</b>${cand.linesCleared ? ` · ${cand.linesCleared}줄 제거` : ''}${state.c === d.chosen ? ' · <span style="color:var(--ok)">리저버가 고른 배치</span>' : ''}<br>리저버 예측 가치 ${fmt(cand.value, 2)} · 실제 Dellacherie 점수 ${fmt(cand.score, 2)}`;
    // 히트맵: 이번 결정 안에서의 최대값으로 정규화, 다른 후보(직전 선택)와 다른 DN 표시
    const max = Math.max(1, ...d.candidates.flatMap((x) => x.dnCounts));
    const chosen = d.candidates[d.chosen];
    heat.innerHTML = '';
    let changed = 0;
    cand.dnCounts.forEach((v, i) => {
      const t = v / max;
      const cell = el('div', { class: 'cell' + (v !== chosen.dnCounts[i] && state.c !== d.chosen ? ' changed' : ''), title: `${dnTypes[i] ?? 'DN'} #${i}: ${v}회` });
      cell.style.background = v === 0 ? '#1a1f2b' : `rgb(${Math.round(60 + 190 * t)}, ${Math.round(110 + 80 * t)}, ${Math.round(40 + 40 * (1 - t))})`;
      heat.appendChild(cell);
      if (v !== chosen.dnCounts[i]) changed++;
    });
    const distinct = new Set(d.candidates.map((x) => x.dnCounts.join(','))).size;
    document.getElementById('heat-title').textContent = `(창 ${episode.meta.T} ms, 최대 ${max}회)`;
    document.getElementById('heat-info').innerHTML = `이 결정의 후보 ${d.candidates.length}개 중 서로 다른 DN 벡터 <b>${distinct}</b>개` + (state.c !== d.chosen ? ` · 리저버가 고른 후보와 다른 DN <b>${changed}</b>/107 (노란 테두리)` : '');
    renderBump(d);
    onCandidate?.(state.d, state.c);
  }

  function renderBump(d) {
    const n = d.candidates.length;
    const byPred = d.candidates.map((c, k) => k).sort((a, b) => d.candidates[b].value - d.candidates[a].value || a - b);
    const byTrue = d.candidates.map((c, k) => k).sort((a, b) => d.candidates[b].score - d.candidates[a].score || a - b);
    const rowH = 16, top = 26, left = 70, right = 70, width = 360, height = top + n * rowH + 10;
    bump.setAttribute('viewBox', `0 0 ${width} ${height}`);
    bump.innerHTML = '';
    const g = svgEl('g');
    g.appendChild(svgEl('text', { x: left, y: 14, 'text-anchor': 'end', style: 'font-weight:600' }, 'A 예측 순위'));
    g.appendChild(svgEl('text', { x: width - right, y: 14, style: 'font-weight:600' }, 'B 실제 순위'));
    const yOf = (rank) => top + rank * rowH + rowH / 2;
    const posPred = new Map(byPred.map((k, r) => [k, r])), posTrue = new Map(byTrue.map((k, r) => [k, r]));
    d.candidates.forEach((c, k) => {
      const y1 = yOf(posPred.get(k)), y2 = yOf(posTrue.get(k));
      const sel = k === state.c, ch = k === d.chosen;
      g.appendChild(svgEl('line', { x1: left + 4, y1, x2: width - right - 4, y2, stroke: sel ? 'var(--accent)' : ch ? 'var(--ok)' : '#5b6478', 'stroke-width': sel || ch ? 2 : 1, opacity: sel || ch ? 1 : 0.6 }));
    });
    byPred.forEach((k, r) => { const c = d.candidates[k]; const t = svgEl('text', { x: left, y: yOf(r) + 4, 'text-anchor': 'end', style: k === state.c ? 'fill:var(--accent)' : k === d.chosen ? 'fill:var(--ok)' : '' }, `${r + 1}. c${c.col} r${c.rot}`); t.style.cursor = 'pointer'; t.addEventListener('click', () => { state.c = k; renderCandidate(); }); g.appendChild(t); });
    byTrue.forEach((k, r) => { const c = d.candidates[k]; const t = svgEl('text', { x: width - right, y: yOf(r) + 4, style: k === state.c ? 'fill:var(--accent)' : k === d.chosen ? 'fill:var(--ok)' : '' }, `${r + 1}. c${c.col} r${c.rot}`); t.style.cursor = 'pointer'; t.addEventListener('click', () => { state.c = k; renderCandidate(); }); g.appendChild(t); });
    bump.appendChild(g);
    const tau = kendallTau(d.candidates.map((c) => c.score), d.candidates.map((c) => c.value));
    document.getElementById('rank-info').innerHTML = `이 결정의 켄달 τ <b>${fmt(tau, 3)}</b> · 테스트 분할 전체(결정 ${c0.regression.decisions}개) τ <b>${fmt(c0.regression.tau, 3)}</b> [${fmt(c0.regression.tauCI[0], 3)}, ${fmt(c0.regression.tauCI[1], 3)}]<br>초록 = 리저버가 고른 배치, 노랑 = 선택 중인 후보. 리저버가 고른 배치의 실제 순위: ${posTrue.get(d.chosen) + 1} / ${n}`;
  }

  document.getElementById('dec-prev').addEventListener('click', () => { state.d = (state.d - 1 + decs.length) % decs.length; state.c = decs[state.d].chosen; renderDecision(); });
  document.getElementById('dec-next').addEventListener('click', () => { state.d = (state.d + 1) % decs.length; state.c = decs[state.d].chosen; renderDecision(); });
  // 시작 결정: 서로 다른 DN 벡터 비율이 가장 높은 결정 (빈 보드 초반 결정은 리저버가 거의 침묵해 아무것도 보여주지 못한다)
  const distinctFrac = (d) => (d.candidates.length >= 10 ? new Set(d.candidates.map((x) => x.dnCounts.join(','))).size / d.candidates.length : -1);
  state.d = decs.reduce((best, d, i) => (distinctFrac(d) >= distinctFrac(decs[best]) ? i : best), 0);
  state.c = decs[state.d].chosen;
  renderDecision();
  return { state, get decision() { return decs[state.d]; } };
}
