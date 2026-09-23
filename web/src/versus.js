// 8단계 — 사람 vs 초파리 실시간 대전. 콘솔 SPA 의 한 라우트(#/versus)로 돈다.
//
// 사람: 키보드 → kinematics → 고정되면 엔진에 배치
// 초파리: 워커가 c0.model 로 후보를 점수화해 고른 배치 (결정 한 번 265 ms 실측이라 메인 스레드에서 돌리지 않는다)
//
// HUD 정책: 판이 도는 동안 보드 위에는 COMBO 만 띄우고, 조각·공격·줄·테트리스·생각 시간은
// 판이 끝난 뒤 결과 모달(화면 정중앙)에서 사람/초파리 두 열로 비교해 보여준다.
//
// 초파리 착수 간격은 150 ms 고정이다 (사용자가 건드리지 못하게 슬라이더를 두지 않는다).
// 모델 자체는 약화시키지 않는다 — 약화시키면 "이 배선이 둔 수"가 아니게 된다.
// 사람 쪽 입력 감도(중력·소프트드롭·DAS·ARR)는 설정 화면에서 온다.
//
// 워커·모델(6 MB)은 이 화면에 처음 들어올 때 띄운다. 다른 화면만 보는 사람은 받지 않는다.
// 오른쪽의 두드리는 초파리 3D(versus-fly.js, 2 MB)도 같은 때 읽는다.

import { createMatch, flyPlace, flySnapshot, tickHuman, viewOf } from '../play/match.js';
import { DEFAULT_TUNING, NO_KEYS } from '../play/kinematics.js';
import { ROWS, SHOW_BUFFER, createRenderer, miniGrid } from '../play/render.js';
import { HEIGHT, SHAPES, WIDTH } from '../../src/tetris.js';
import { boardFeatures, wellDepth } from '../../src/teacher-attack.js';
import { addDecision, endMatch, sampleQuality, startMatch } from './matchlog.js';
import { tuningOf } from './settings.js';
import { createVersusFly } from './versus-fly.js';

const FLY_PLACE_MS = 150;     // 초파리 착수 간격 (고정 — 사용자가 조절하지 못한다)
const DECIDE_TIMEOUT_MS = 8000; // 결정이 이만큼 안 오면 워커가 막힌 것으로 보고 다시 요청한다

const $ = (id) => document.getElementById(id);

export function createVersusView({ settings, sampled = null, onRecord = null, build = '' } = {}) {
  const ver = build ? `?v=${build}` : '';
  const humanCanvas = $('vs-human'), flyCanvas = $('vs-fly');
  const els = {
    human: { hold: $('vs-humanHold'), next: $('vs-humanNext'), garbage: $('vs-humanGarbage'), combo: $('vs-humanCombo'), badge: $('vs-humanBadge') },
    fly: { hold: $('vs-flyHold'), next: $('vs-flyNext'), garbage: $('vs-flyGarbage'), combo: $('vs-flyCombo'), badge: $('vs-flyBadge') },
  };
  const resultScrim = $('vs-resultScrim');

  const KEYMAP = {
    ArrowLeft: 'left', ArrowRight: 'right', ArrowDown: 'softDrop', Space: 'hardDrop',
    ArrowUp: 'cw', KeyX: 'cw', KeyZ: 'ccw', ControlLeft: 'ccw', KeyA: 'flip',
    KeyC: 'hold', ShiftLeft: 'hold',
  };
  const keys = { ...NO_KEYS };
  let paused = false, started = false, active = false;

  let renderers = null, match = null, worker = null, ready = false, workerFailed = false;
  let pendingId = 0, waitingId = 0, pendingDecision = null, awaiting = false, askedAt = 0;
  let flyNextAt = 0, lastThinkMs = null, thinkMs = [], matchId = null, recorded = false;
  let last = 0, rafId = 0, flyModel = null;

  const tuning = () => ({ ...DEFAULT_TUNING, ...tuningOf(settings) });

  // ---------- 결과 모달 ----------
  function showResult() {
    if (recorded) return;
    recorded = true;
    const h = match.human, f = match.fly;
    $('vs-resultTitle').textContent = match.winner === 'human' ? '사람이 이겼어요' : match.winner === 'fly' ? '초파리가 이겼어요' : '무승부예요';
    $('vs-resultSub').textContent = match.winner === 'human' ? '초파리가 탑아웃했어요' : match.winner === 'fly' ? '탑아웃했어요' : (match.reason ?? '');
    $('vs-rPiecesA').textContent = h.pieces; $('vs-rPiecesB').textContent = f.pieces;
    $('vs-rAttackA').textContent = h.player.stats.attack; $('vs-rAttackB').textContent = f.player.stats.attack;
    $('vs-rLinesA').textContent = `${h.player.stats.lines} · ${h.player.stats.tetris}`;
    $('vs-rLinesB').textContent = `${f.player.stats.lines} · ${f.player.stats.tetris}`;
    $('vs-rThink').textContent = lastThinkMs !== null ? `${lastThinkMs} ms/수` : '—';
    resultScrim.classList.add('open');
    if (matchId) { endMatch(matchId, match, thinkMs); onRecord?.(); }
  }
  const hideResult = () => resultScrim.classList.remove('open');

  function newMatch() {
    for (const k of Object.keys(keys)) keys[k] = false; // 직전 판에서 눌려 있던 키가 새 판으로 새지 않게
    hideResult();
    const seed = (Math.random() * 1e9) | 0;
    match = createMatch({ seedHuman: seed, seedFly: seed, garbageSeed: seed ^ 0x5bf03635, tuning: tuning(), cap: 5000 });
    pendingDecision = null; awaiting = false; pendingId++; lastThinkMs = null;
    thinkMs = []; recorded = false;
    matchId = startMatch({ seed, flyPlaceMs: FLY_PLACE_MS, model: 'C0 (7단계 A-4′)' });
    flyNextAt = performance.now() + 1200; // 시작 직후 한 박자 여유
    requestFlyDecision();
    draw();
  }

  // 조각을 놓을 때마다의 보드 품질 — 플레이 분석이 사람/초파리를 나란히 놓는 데 쓴다.
  function sample(side, event) {
    if (!matchId) return;
    const s = match[side];
    const f = boardFeatures(s.player.board);
    let height = 0;
    for (let x = 0; x < f.heights.length; x++) if (f.heights[x] > height) height = f.heights[x];
    sampleQuality(matchId, {
      side, at: s.pieces, height, holes: f.holes, well: s.player.dead ? 0 : wellDepth(s.player.board),
      lines: event?.linesCleared ?? 0, sent: event?.sent ?? 0, pending: s.player.garbage.reduce((a, g) => a + g.lines, 0),
    });
  }

  function requestFlyDecision() {
    if (!ready || !match || match.over || awaiting || pendingDecision) return;
    awaiting = true;
    askedAt = performance.now();
    waitingId = ++pendingId;
    worker.postMessage({ type: 'decide', id: waitingId, snapshot: flySnapshot(match), detail: true });
  }

  function onWorkerMessage(ev) {
    const m = ev.data;
    if (m.type === 'ready') {
      ready = true;
      setFlyBadge('생각 중', false);
      requestFlyDecision();
      return;
    }
    if (m.type === 'decision') {
      awaiting = false;
      if (m.id !== waitingId) return;   // 리매치 등으로 버려진 결정
      pendingDecision = m.cand;
      lastThinkMs = m.ms;
      thinkMs.push(m.ms);
      if (m.detail && matchId) { addDecision(matchId, m.detail, m.ms); onRecord?.(); }
      return;
    }
    if (m.type === 'error') {
      awaiting = false;
      setFlyBadge('오류', true);
      console.error('초파리 오류:', m.error);
    }
  }

  function setFlyBadge(text, quiet) {
    els.fly.badge.textContent = text;
    els.fly.badge.className = quiet ? 'vs-badge quiet' : 'vs-badge';
  }

  function bootWorker() {
    if (worker || workerFailed) return;
    try {
      // 클래식 워커 (esbuild 가 IIFE 로 굽는다) — 모듈 워커 지원 여부를 타지 않는다.
      worker = new Worker(new URL(`fly-worker.js${ver}`, document.baseURI));
    } catch (err) {
      workerFailed = true;
      setFlyBadge('워커를 띄울 수 없어요', true);
      console.error('워커를 띄우지 못했어요:', err);
      return;
    }
    worker.onmessage = onWorkerMessage;
    worker.onerror = (e) => {
      workerFailed = true; awaiting = false;
      setFlyBadge('오류', true);
      console.error('워커를 띄우지 못했어요:', e.message ?? e);
    };
    worker.postMessage({ type: 'init', base: new URL('model', document.baseURI).href, ver, sampled });
  }

  // ---------- DOM HUD ----------
  // 미니 조각 셀도 보드 셀에 비례한다 (셀 30px 일 때 HOLD 14px · NEXT 12px)
  const miniPx = (ratio) => Math.max(5, Math.round((renderers?.human.cell ?? 30) * ratio));
  function drawSide(side, view) {
    const e = els[side];
    e.hold.replaceChildren();
    if (view.hold === null || view.hold === undefined) {
      e.hold.appendChild(Object.assign(document.createElement('span'), { className: 'empty', textContent: '없어요' }));
    } else {
      const g = miniGrid(view.hold, SHAPES, miniPx(0.4667));
      if (view.holdUsed) g.classList.add('used');
      e.hold.appendChild(g);
    }
    e.next.replaceChildren();
    for (const p of (view.next ?? []).slice(0, 5)) e.next.appendChild(miniGrid(p, SHAPES, miniPx(0.4)));
    const pending = Math.min(20, view.pending ?? 0);
    e.garbage.style.height = `${(pending / 20) * 100}%`;
    e.garbage.classList.toggle('high', pending >= 4);
    e.combo.innerHTML = view.combo > 1 ? `${view.combo}<span>COMBO</span>` : '';
  }

  function draw() {
    if (!match || !renderers) return;
    for (const side of ['human', 'fly']) {
      const view = viewOf(match, side);
      renderers[side].draw(view);
      drawSide(side, view);
    }
    if (!match.over) {
      els.human.badge.textContent = paused ? '일시정지' : started ? '두는 중' : '대기 중';
      els.human.badge.className = paused || !started ? 'vs-badge quiet' : 'vs-badge';
      if (ready && !workerFailed) setFlyBadge(awaiting ? '생각 중' : '두는 중', false);
    }
  }

  // ---------- 루프 ----------
  function step(dt, now = performance.now()) {
    if (!match || match.over || paused || !started) { draw(); return; }
    match.tuning = tuning();
    const hr = tickHuman(match, dt, keys);
    if (hr.locked) sample('human', hr.event);

    if (!match.over) {
      // 결정이 오지 않으면(워커가 막히거나 메시지가 유실되면) 다시 묻는다 — 초파리가 영영 멈추지 않게.
      if (awaiting && now - askedAt > DECIDE_TIMEOUT_MS) { awaiting = false; console.warn('초파리 결정이 늦어 다시 요청해요'); }
      if (!pendingDecision && !awaiting) requestFlyDecision();
      if (pendingDecision && now >= flyNextAt) {
        const ev = flyPlace(match, pendingDecision);
        if (ev) sample('fly', ev);
        pendingDecision = null;
        flyNextAt = now + FLY_PLACE_MS;
        if (!match.over) requestFlyDecision();
      }
    }
    if (match.over) showResult();
    draw();
  }

  function frame(now) {
    rafId = requestAnimationFrame(frame);
    const dt = Math.min(100, now - last);
    last = now;
    step(dt, now);
    // 오른쪽 초파리는 초파리가 실제로 두는 동안만 두드린다 (시작 전 · 일시정지 · 판 종료 · 워커 준비 전에는 멈춤)
    flyModel?.update(dt, started && !paused && !!match && !match.over && ready && !workerFailed);
  }

  // ---------- 입력 ----------
  const dropFocus = () => { const a = document.activeElement; if (a && a !== document.body && typeof a.blur === 'function') a.blur(); };

  function onKeyDown(e) {
    if (!active) return;
    const k = KEYMAP[e.code];
    const game = !!k || e.code === 'KeyR' || e.code === 'KeyP';
    if (!game) return;
    e.preventDefault();           // 스페이스·화살표의 기본 스크롤과 버튼 활성화를 막는다
    dropFocus();
    if (e.repeat) return;         // OS 자동 반복은 무시 — 반복은 DAS/ARR 이 담당한다
    if (e.code === 'KeyR') { newMatch(); started = true; return; }
    if (e.code === 'KeyP') { paused = !paused; draw(); return; }
    if (!started) started = true;
    keys[k] = true;
  }
  function onKeyUp(e) {
    if (!active) return;
    const k = KEYMAP[e.code];
    if (!k) return;
    e.preventDefault();
    keys[k] = false;
  }
  const clearKeys = () => { for (const k of Object.keys(keys)) keys[k] = false; };

  addEventListener('keydown', onKeyDown, { passive: false });
  addEventListener('keyup', onKeyUp, { passive: false });
  addEventListener('blur', clearKeys);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearKeys(); return; }
    // 탭이 숨겨진 동안 rAF 가 멈춘다. 돌아왔을 때 그동안의 시간이 한꺼번에 흐르지 않도록 시계를 다시 맞춘다.
    last = performance.now();
    flyNextAt = Math.max(flyNextAt, last + 300);
  });

  $('vs-restart').addEventListener('click', (e) => { newMatch(); started = true; e.currentTarget.blur(); });
  $('vs-again').addEventListener('click', (e) => { newMatch(); started = true; e.currentTarget.blur(); });
  resultScrim.addEventListener('click', (e) => { if (e.target === resultScrim) hideResult(); });

  // ---------- 크기 ----------
  // 보드는 10칸 × 22칸(버퍼 2 포함). 패널 안에서 남는 높이·너비에 맞춰 셀 크기를 정한다.
  // 가로로 필요한 셀 수: 사이드 2.8 + 간격 0.4667 + 가비지 0.333 + 간격 0.4667 + 보드 10 = 14.0667
  const COLS_TOTAL = 2.8 + 0.4667 + 0.3333 + 0.4667 + WIDTH;
  const PANEL_PAD = 40, PANEL_GAP = 14, ROW_GAP = 16;
  // 오른쪽 초파리 자리(.vs-flymodel)의 최소 폭 (셀 단위, style.css 의 min-width 와 같은 값). 보드가 우선이라
  // 이 자리를 남기느라 셀이 10% 넘게 작아지면 초파리를 빼고 두 판만 둔다.
  const FLY_MIN_COLS = 7, FLY_MAX_SHRINK = 0.9;
  const clampCell = (c) => Math.max(10, Math.min(64, Math.floor(c)));
  function pickLayout() {
    const row = document.querySelector('.vs-row');
    const head = document.querySelector('.vs-phead');
    const h = row?.clientHeight ?? 0, w = row?.clientWidth ?? 0;
    if (!h || !w) return { cell: renderers?.human.cell ?? 30, fly: !!row?.classList.contains('with-fly') }; // 화면 밖(hidden)이면 지금 값을 유지한다
    // 좁은 화면에서는 두 판을 세로로 쌓는다 (CSS) — 그때는 높이가 아니라 가로폭만 제약이고, 초파리는 뺀다.
    const stacked = row && getComputedStyle(row).flexDirection === 'column';
    if (stacked) return { cell: clampCell((w - PANEL_PAD) / COLS_TOTAL), fly: false };
    const byH = (h - PANEL_PAD - (head?.offsetHeight ?? 44) - PANEL_GAP) / ROWS;
    const plain = clampCell(Math.min(byH, ((w - ROW_GAP) / 2 - PANEL_PAD) / COLS_TOTAL));
    const withFly = clampCell(Math.min(byH, (w - 2 * ROW_GAP - 2 * PANEL_PAD) / (2 * COLS_TOTAL + FLY_MIN_COLS)));
    return withFly >= plain * FLY_MAX_SHRINK ? { cell: withFly, fly: true } : { cell: plain, fly: false };
  }
  function buildRenderers(force = false) {
    const { cell, fly } = pickLayout();
    document.querySelector('.vs-row')?.classList.toggle('with-fly', fly);
    if (!force && renderers && renderers.human.cell === cell) return;
    document.documentElement.style.setProperty('--cell', `${cell}px`); // CSS 치수가 전부 여기에 비례한다
    renderers = { human: createRenderer(humanCanvas, { cell }), fly: createRenderer(flyCanvas, { cell }) };
    // 대기 가비지 바는 보드의 '판' 영역(버퍼 제외)과 같은 높이·위치에 둔다
    for (const side of ['human', 'fly']) {
      const track = $(`vs-${side}GarbageTrack`);
      if (track) { track.style.marginTop = `${SHOW_BUFFER * cell}px`; track.style.height = `${HEIGHT * cell}px`; }
    }
    draw();
  }
  // 창 크기뿐 아니라 화면 전환·폰트 로드로도 레이아웃이 바뀐다 → 관찰해서 다시 맞춘다.
  const ro = new ResizeObserver(() => { if (active) buildRenderers(); });
  const row = document.querySelector('.vs-row');
  if (row) ro.observe(row);
  addEventListener('resize', () => { if (active) buildRenderers(); });
  document.fonts?.ready?.then(() => { if (active) buildRenderers(); });

  // ---------- 화면 전환 ----------
  function activate() {
    if (active) return;
    active = true;
    document.body.classList.add('playing');
    bootWorker();
    flyModel ??= createVersusFly($('vs-flyModel'), { url: `models/fly_tapping.glb${ver}` });
    if (!match) newMatch();
    buildRenderers(true);
    last = performance.now();
    flyNextAt = Math.max(flyNextAt, last + 300);
    if (!rafId) rafId = requestAnimationFrame(frame);
  }
  function deactivate() {
    if (!active) return;
    active = false;
    document.body.classList.remove('playing');
    hideResult();   // 결과 모달은 화면 위에 떠 있으므로 대전을 떠날 때 반드시 닫는다
    clearKeys();
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  // 디버그 훅 — 콘솔·자동화에서 상태를 들여다본다 (게임 로직에는 관여하지 않는다)
  globalThis.__versus = {
    get match() { return match; }, keys,
    get started() { return started; }, get paused() { return paused; }, get ready() { return ready; },
    get active() { return active; }, get awaiting() { return awaiting; }, get failed() { return workerFailed; },
    get pending() { return pendingDecision; }, get nextAt() { return flyNextAt - performance.now(); }, get matchId() { return matchId; },
    get cell() { return renderers?.human.cell; }, get flyModel() { return flyModel; }, tuning, flyPlaceMs: FLY_PLACE_MS,
    step, newMatch,
    press(code) { dispatchEvent(new KeyboardEvent('keydown', { code, bubbles: true, cancelable: true })); },
    release(code) { dispatchEvent(new KeyboardEvent('keyup', { code, bubbles: true, cancelable: true })); },
  };

  return { activate, deactivate, get active() { return active; } };
}
