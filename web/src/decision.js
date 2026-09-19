// 결정 탐색 — 대전에서 초파리가 실제로 한 결정 하나를 펼쳐 본다.
//
// 한 결정에서 합법 배치 각각의 결과 보드를 배선 제약 네트워크에 넣어 DN 107개의 창평균을 얻고,
// 학습된 MLP 리드아웃이 점수를 매긴다. 오른쪽 두 순위(모델 점수 / 교사 점수)를 잇는 선이 얼마나
// 엉키는지가 이 모델이 '순위를 아는가'의 모습이다. 기준축인 교사는 학생이 모방하도록 학습된 바로 그 교사다.
//
// 데이터는 전부 matchlog (대전 기록) 에서 온다. 판을 한 번도 하지 않았으면 빈 상태를 그린다.

import { fmt, el, svgEl } from './util.js';
import { unpackBoard } from './pack.js';
import { renderHeatmap, distinctCount } from './heatmap.js';
import { emptyState } from './empty.js';
import { decisionsOf, getState } from './matchlog.js';

const W = 10, H = 20;
const PIECES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
// 보드 색 (토스 토큰 hex): 빈칸 grey-100, 고정 블록 grey-400, 이번 배치 blue-500, 사라진 칸 red-bg
const CELL = { empty: '#eef1f4', fixed: '#a7b0b9', placed: '#2887ee', gone: '#ffe1e1' };
const STROKE = { brand: '#2887ee', chosen: '#007738', other: '#c5cbd2' };
const GRID = '#e3e7ec';

export function createDecisionView(onCandidate) {
  const host = document.getElementById('decision-body');
  const grid = document.getElementById('decision-grid');
  const notice = document.getElementById('dec-notice');
  const emptyHost = document.getElementById('decision-empty');
  const matchSel = document.getElementById('dec-match');
  const boardCanvas = document.getElementById('dec-board');
  const strip = document.getElementById('dec-strip');
  const heat = document.getElementById('dec-heat');
  const bump = document.getElementById('dec-bump');
  const label = document.getElementById('dec-label');
  const state = { matchId: null, d: 0, c: 0 };
  let decs = [];
  let rendered = false;   // 마지막으로 그린 것이 '내용 있음' 이었나 (빈 상태 ↔ 내용 전환 감지)

  // 셀은 빈틈 없이 채우고 그 위에 1px 헤어라인 격자를 긋는다 (대전 보드와 같은 방식).
  function drawBoard(canvas, before, after, cell) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const a = after[i], b = before ? before[i] : 0;
      ctx.fillStyle = !a && !b ? CELL.empty : a && !b ? CELL.placed : a ? CELL.fixed : CELL.gone;
      ctx.fillRect(x * cell, y * cell, cell, cell);
    }
    if (cell >= 6) { // 후보 썸네일(3px 셀)에는 격자를 긋지 않는다 — 다 덮인다
      ctx.strokeStyle = GRID; ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 1; x < W; x++) { ctx.moveTo(x * cell + 0.5, 0); ctx.lineTo(x * cell + 0.5, H * cell); }
      for (let y = 1; y < H; y++) { ctx.moveTo(0, y * cell + 0.5); ctx.lineTo(W * cell, y * cell + 0.5); }
      ctx.stroke();
    }
  }

  function fillMatchSelect() {
    const ms = getState().matches.filter((m) => decisionsOf(m.id).length);
    matchSel.replaceChildren(...ms.map((m, i) => {
      const n = decisionsOf(m.id).length;
      const when = new Date(m.startedAt).toLocaleString('ko-KR', { dateStyle: 'short', timeStyle: 'short' });
      const res = m.winner === 'human' ? '내가 이김' : m.winner === 'fly' ? '초파리가 이김' : m.endedAt ? '무승부' : '진행 중';
      return el('option', { value: String(m.id), selected: i === 0 && state.matchId === null ? 'selected' : undefined }, `${when} · ${res} · 결정 ${n}`);
    }));
    if (state.matchId !== null) matchSel.value = String(state.matchId);
  }

  function pickDecision() {
    // 시작 결정: 후보 사이에서 DN 패턴이 가장 많이 갈리는 결정 (갈리지 않는 결정은 보여줄 게 없다)
    let best = 0, bestFrac = -1;
    decs.forEach((d, i) => {
      if (d.candidates.length < 4) return;
      const f = distinctCount(d.dn, d.candidates.length) / d.candidates.length;
      if (f > bestFrac) { bestFrac = f; best = i; }
    });
    return best;
  }

  function renderDecision() {
    const d = decs[state.d];
    const before = unpackBoard(d.boardBefore);
    label.textContent = `결정 ${state.d + 1}/${decs.length} · ${PIECES[d.piece] ?? '?'} · 후보 ${d.candidates.length} · 생각 ${d.ms} ms`;
    strip.replaceChildren(...d.candidates.map((cand, k) => {
      const cv = el('canvas', {
        width: String(W * 3), height: String(H * 3), role: 'option',
        title: `${cand.useHold ? 'HOLD · ' : ''}col ${cand.col} rot ${cand.rot} · 모델 ${fmt(cand.score, 2)} · 교사 ${fmt(cand.teacher, 1)}`,
      });
      drawBoard(cv, before, unpackBoard(cand.board), 3);
      cv.addEventListener('click', () => { state.c = k; renderCandidate(); });
      return cv;
    }));
    renderCandidate();
  }

  function renderCandidate() {
    const d = decs[state.d];
    const cand = d.candidates[state.c];
    const before = unpackBoard(d.boardBefore);
    drawBoard(boardCanvas, before, unpackBoard(cand.board), 20);
    [...strip.children].forEach((cv, k) => {
      cv.className = `${k === state.c ? 'selected ' : ''}${k === d.chosen ? 'chosen' : ''}`;
      cv.setAttribute('aria-selected', String(k === state.c));
    });
    const isChosen = state.c === d.chosen;
    document.getElementById('dec-info').innerHTML =
      `후보 <b>${cand.useHold ? 'HOLD · ' : ''}col ${cand.col} · rot ${cand.rot}</b>${cand.lines ? ` · ${cand.lines}줄 제거` : ''}${cand.sent ? ` · 공격 ${cand.sent}` : ''}${isChosen ? ' · <span class="chosen">초파리가 고른 배치</span>' : ''}<br>`
      + `모델 점수 <b>${fmt(cand.score, 2)}</b> · 교사 점수 <b>${fmt(cand.teacher, 1)}</b>${d.teacherAligned ? ` · 교사 순위 <b>${cand.teacherRank + 1}/${d.candidates.length}</b>` : ''}`;

    const { changed } = renderHeatmap(heat, { q: d.dn, row: state.c, ref: isChosen ? null : d.chosen, dnTypes });
    const distinct = distinctCount(d.dn, d.candidates.length);
    document.getElementById('dec-heat-title').textContent = `창 ${traceT(d)} 스텝 평균 · 이 결정의 최솟값~최댓값으로 정규화 · ${d.dn.n}개`;
    document.getElementById('dec-heat-min').textContent = fmt(d.dn.min, 3);
    document.getElementById('dec-heat-max').textContent = fmt(d.dn.max, 3);
    document.getElementById('dec-heat-info').innerHTML =
      `이 결정의 후보 ${d.candidates.length}개 중 서로 다른 DN 벡터 <b>${distinct}</b>개`
      + (isChosen ? '' : ` · 초파리가 고른 후보와 다른 DN <b>${changed}</b>/${d.dn.n} (주황 테두리)`);
    renderBump(d);
    onCandidate?.(d, state.c);
  }

  const traceT = (d) => d.trace?.T ?? 25;

  function renderBump(d) {
    const n = d.candidates.length;
    const byPred = [...d.candidates.keys()].sort((a, b) => d.candidates[b].score - d.candidates[a].score || a - b);
    const byTrue = [...d.candidates.keys()].sort((a, b) => d.candidates[b].teacher - d.candidates[a].teacher || a - b);
    const rowH = 16, top = 26, left = 76, right = 76, width = 380, height = top + n * rowH + 10;
    bump.setAttribute('viewBox', `0 0 ${width} ${height}`);
    bump.replaceChildren();
    const g = svgEl('g');
    g.appendChild(svgEl('text', { x: left, y: 14, 'text-anchor': 'end', style: 'font-weight:600' }, 'A 모델 순위'));
    g.appendChild(svgEl('text', { x: width - right, y: 14, style: 'font-weight:600' }, 'B 교사 순위'));
    const yOf = (rank) => top + rank * rowH + rowH / 2;
    const posPred = new Map(byPred.map((k, r) => [k, r])), posTrue = new Map(byTrue.map((k, r) => [k, r]));
    d.candidates.forEach((c, k) => {
      const y1 = yOf(posPred.get(k)), y2 = yOf(posTrue.get(k));
      const sel = k === state.c, ch = k === d.chosen;
      g.appendChild(svgEl('line', { x1: left + 4, y1, x2: width - right - 4, y2, stroke: sel ? STROKE.brand : ch ? STROKE.chosen : STROKE.other, 'stroke-width': sel || ch ? 2 : 1, opacity: sel || ch ? 1 : 0.8 }));
    });
    const styleOf = (k) => (k === state.c ? `fill:${STROKE.brand};font-weight:600` : k === d.chosen ? `fill:${STROKE.chosen};font-weight:600` : '');
    const tag = (c) => `${c.useHold ? 'h' : ''}c${c.col} r${c.rot}`;
    byPred.forEach((k, r) => { const t = svgEl('text', { x: left, y: yOf(r) + 4, 'text-anchor': 'end', style: styleOf(k) }, `${r + 1}. ${tag(d.candidates[k])}`); t.style.cursor = 'pointer'; t.addEventListener('click', () => { state.c = k; renderCandidate(); }); g.appendChild(t); });
    byTrue.forEach((k, r) => { const t = svgEl('text', { x: width - right, y: yOf(r) + 4, style: styleOf(k) }, `${r + 1}. ${tag(d.candidates[k])}`); t.style.cursor = 'pointer'; t.addEventListener('click', () => { state.c = k; renderCandidate(); }); g.appendChild(t); });
    bump.appendChild(g);

    const chosenRank = posTrue.get(d.chosen) + 1;
    const vals = d.candidates.map((c) => c.teacher);
    const best = Math.max(...vals), worst = Math.min(...vals);
    const regret = best - vals[d.chosen];
    document.getElementById('dec-rank-info').innerHTML =
      `초파리가 고른 배치의 교사 순위 <b>${chosenRank} / ${n}</b> · 상대 regret <b>${fmt(best > worst ? regret / (best - worst) : 0, 3)}</b> (0 이면 교사 최선)<br>`
      + '초록 = 초파리가 고른 배치, 파랑 = 보는 중인 후보. 두 순위를 잇는 선이 평행할수록 모델이 교사의 순위를 그대로 안다는 뜻이에요.';
  }

  let dnTypes = [];
  function render() {
    decs = decisionsOf(state.matchId);
    const ok = decs.length > 0;
    rendered = ok;
    grid.hidden = !ok; notice.hidden = !ok;
    document.getElementById('dec-controls').hidden = !ok;
    emptyHost.hidden = ok;
    if (!ok) {
      emptyHost.replaceChildren(emptyState({
        desc: '대전에서 초파리가 수를 두면 그 결정의 후보 배치·DN 창평균·교사 순위가 여기에 쌓여요.',
        cta: '대전하기', href: '#/versus',
        hint: '한 판만 해도 최근 결정 수십 개를 볼 수 있어요',
      }));
      return;
    }
    fillMatchSelect();
    if (state.d >= decs.length) state.d = pickDecision();
    state.c = decs[state.d].chosen;
    renderDecision();
  }

  document.getElementById('dec-prev').addEventListener('click', () => { state.d = (state.d - 1 + decs.length) % decs.length; state.c = decs[state.d].chosen; renderDecision(); });
  document.getElementById('dec-next').addEventListener('click', () => { state.d = (state.d + 1) % decs.length; state.c = decs[state.d].chosen; renderDecision(); });
  matchSel.addEventListener('change', () => { state.matchId = Number(matchSel.value); decs = decisionsOf(state.matchId); state.d = pickDecision(); state.c = decs[state.d]?.chosen ?? 0; renderDecision(); });

  return {
    state,
    setDnTypes(types) { dnTypes = types; },
    refresh() {
      // 대전 중에는 결정이 초당 몇 개씩 쌓인다. 보고 있는 결정이 튀지 않도록,
      // "비었다 ↔ 찼다"가 바뀔 때만 다시 그리고 그 밖에는 판 목록만 갱신한다.
      const now = decisionsOf(state.matchId).length > 0;
      if (rendered !== now) render();
      else if (now) {
        decs = decisionsOf(state.matchId);
        if (state.d >= decs.length) { state.d = decs.length - 1; state.c = decs[state.d].chosen; renderDecision(); }
        fillMatchSelect();
      }
    },
    render,
    get decision() { return decs[state.d] ?? null; },
    get candidate() { return state.c; },
  };
}
