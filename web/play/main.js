// 8단계 — 사람 vs 초파리 실시간 대전. 메인 루프·입력·워커 조율 (토스 리디자인).
//
// 사람: 키보드 → kinematics → 고정되면 엔진에 배치
// 초파리: 워커가 c0.model 로 후보를 점수화해 고른 배치 (결정 한 번 265 ms 실측이라 메인 스레드에서 돌리지 않는다)
//
// HUD 정책(시안): 판이 도는 동안 보드 위에는 COMBO 만 띄우고, 조각·공격·줄·테트리스·생각 시간은
// 판이 끝난 뒤 결과 시트에서 사람/초파리 두 열로 비교해 보여준다.
//
// 초파리 착수 간격은 150 ms 고정이다 (사용자가 건드리지 못하게 슬라이더를 두지 않는다).
// 모델 자체는 약화시키지 않는다 — 약화시키면 "이 배선이 둔 수"가 아니게 된다.

import { createMatch, flyPlace, flySnapshot, tickHuman, viewOf } from './match.js';
import { DEFAULT_TUNING, NO_KEYS } from './kinematics.js';
import { ROWS, SHOW_BUFFER, createRenderer, miniGrid } from './render.js';
import { HEIGHT, SHAPES, WIDTH } from '../../src/tetris.js';

const FLY_PLACE_MS = 150; // 초파리 착수 간격 (고정 — 사용자가 조절하지 못한다)

const $ = (id) => document.getElementById(id);
const humanCanvas = $('human'), flyCanvas = $('fly');
const els = {
  human: { hold: $('humanHold'), next: $('humanNext'), garbage: $('humanGarbage'), combo: $('humanCombo'), badge: $('humanBadge') },
  fly: { hold: $('flyHold'), next: $('flyNext'), garbage: $('flyGarbage'), combo: $('flyCombo'), badge: $('flyBadge') },
};
const gravityEl = $('gravity'), gravityOut = $('gravityOut');
const softEl = $('soft'), softOut = $('softOut');
const dasEl = $('das'), dasOut = $('dasOut');
const arrEl = $('arr'), arrOut = $('arrOut');
const settingsScrim = $('settingsScrim'), resultScrim = $('resultScrim');

const KEYMAP = {
  ArrowLeft: 'left', ArrowRight: 'right', ArrowDown: 'softDrop', Space: 'hardDrop',
  ArrowUp: 'cw', KeyX: 'cw', KeyZ: 'ccw', ControlLeft: 'ccw', KeyA: 'flip',
  KeyC: 'hold', ShiftLeft: 'hold',
};
const keys = { ...NO_KEYS };
let paused = false, started = false, settingsOpen = false;

let renderers = null, match = null, worker = null, ready = false;
let pendingId = 0, pendingDecision = null, awaiting = false, flyNextAt = 0, lastThinkMs = null;
let last = 0, rafId = 0;

const tuning = () => ({
  ...DEFAULT_TUNING,
  gravityMs: Number(gravityEl.value), softDropMs: Number(softEl.value),
  dasMs: Number(dasEl.value), arrMs: Number(arrEl.value),
});

// ---------- 결과 시트 ----------
function showResult() {
  const h = match.human, f = match.fly;
  $('resultTitle').textContent = match.winner === 'human' ? '사람이 이겼어요' : match.winner === 'fly' ? '초파리가 이겼어요' : '무승부예요';
  $('resultSub').textContent = match.winner === 'human' ? '초파리가 탑아웃했어요' : match.winner === 'fly' ? '탑아웃했어요' : (match.reason ?? '');
  $('rPiecesA').textContent = h.pieces; $('rPiecesB').textContent = f.pieces;
  $('rAttackA').textContent = h.player.stats.attack; $('rAttackB').textContent = f.player.stats.attack;
  $('rLinesA').textContent = h.player.stats.lines + ' · ' + h.player.stats.tetris;
  $('rLinesB').textContent = f.player.stats.lines + ' · ' + f.player.stats.tetris;
  $('rThink').textContent = lastThinkMs !== null ? lastThinkMs + ' ms/수' : '—';
  resultScrim.classList.add('open');
}
const hideResult = () => resultScrim.classList.remove('open');

function newMatch() {
  for (const k of Object.keys(keys)) keys[k] = false; // 직전 판에서 눌려 있던 키가 새 판으로 새지 않게
  hideResult();
  const seed = (Math.random() * 1e9) | 0;
  match = createMatch({ seedHuman: seed, seedFly: seed, garbageSeed: seed ^ 0x5bf03635, tuning: tuning(), cap: 5000 });
  pendingDecision = null; awaiting = false; pendingId++; lastThinkMs = null;
  flyNextAt = performance.now() + 1200; // 시작 직후 한 박자 여유
  requestFlyDecision();
  draw();
}

let waitingId = 0;
function requestFlyDecision() {
  if (!ready || !match || match.over || awaiting || pendingDecision) return;
  awaiting = true;
  waitingId = ++pendingId;
  worker.postMessage({ type: 'decide', id: waitingId, snapshot: flySnapshot(match) });
}

function onWorkerMessage(ev) {
  const m = ev.data;
  if (m.type === 'ready') {
    ready = true;
    els.fly.badge.textContent = '생각 중';
    els.fly.badge.className = 'vs-badge';
    if (started) requestFlyDecision();
    return;
  }
  if (m.type === 'decision') {
    awaiting = false;
    if (m.id !== waitingId) return; // 리매치 등으로 버려진 결정
    pendingDecision = m.cand;
    lastThinkMs = m.ms;
    return;
  }
  if (m.type === 'error') {
    awaiting = false;
    els.fly.badge.textContent = '오류';
    els.fly.badge.className = 'vs-badge quiet';
    console.error('초파리 오류:', m.error);
  }
}

// ---------- DOM HUD ----------
// 미니 조각 셀도 보드 셀에 비례한다 (시안: 셀 30px 일 때 HOLD 14px · NEXT 12px)
const miniPx = (ratio) => Math.max(5, Math.round((renderers?.human.cell ?? 30) * ratio));
function drawSide(side, view) {
  const e = els[side];
  // HOLD
  e.hold.replaceChildren();
  if (view.hold === null || view.hold === undefined) {
    const s = document.createElement('span');
    s.className = 'empty';
    s.textContent = '없어요';
    e.hold.appendChild(s);
  } else {
    const g = miniGrid(view.hold, SHAPES, miniPx(0.4667));
    if (view.holdUsed) g.classList.add('used');
    e.hold.appendChild(g);
  }
  // NEXT 5
  e.next.replaceChildren();
  for (const p of (view.next ?? []).slice(0, 5)) e.next.appendChild(miniGrid(p, SHAPES, miniPx(0.4)));
  // 대기 가비지 (트랙 높이 대비 비율)
  const pending = Math.min(20, view.pending ?? 0);
  e.garbage.style.height = (pending / 20) * 100 + '%';
  e.garbage.classList.toggle('high', pending >= 4);
  // COMBO — 판 위에는 이것만 띄운다
  e.combo.innerHTML = view.combo > 1 ? view.combo + '<span>COMBO</span>' : '';
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
  }
}

// ---------- 루프 ----------
// 한 프레임의 게임 로직. frame() 이 rAF 로 부르고, 테스트에서는 __versus.step(dt) 로 직접 부른다
// (브라우저 탭이 숨겨지면 rAF 가 멈춰 자동 검증을 할 수 없기 때문).
function step(dt, now = performance.now()) {
  if (!match || match.over || paused || settingsOpen || !started) { draw(); return; }

  match.tuning = tuning();
  tickHuman(match, dt, keys);

  // 초파리: 결정은 미리 받아 두고(계산과 대기를 겹친다) 착수 간격이 되면 놓는다
  if (!match.over) {
    if (!pendingDecision && !awaiting) requestFlyDecision();
    if (pendingDecision && now >= flyNextAt) {
      flyPlace(match, pendingDecision);
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
}

// ---------- 입력 ----------
const dropFocus = () => { const a = document.activeElement; if (a && a !== document.body && typeof a.blur === 'function') a.blur(); };

addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && settingsOpen) { closeSettings(); return; }
  const k = KEYMAP[e.code];
  const game = !!k || e.code === 'KeyR' || e.code === 'KeyP';
  if (!game) return;
  if (settingsOpen) return;     // 설정이 열려 있으면 슬라이더 조작을 방해하지 않는다
  e.preventDefault();           // 스페이스·화살표의 기본 스크롤과 버튼 활성화를 막는다
  dropFocus();
  if (e.repeat) return;         // OS 자동 반복은 무시 — 반복은 DAS/ARR 이 담당한다
  if (e.code === 'KeyR') { newMatch(); started = true; return; }
  if (e.code === 'KeyP') { paused = !paused; draw(); return; }
  if (!started) started = true;
  keys[k] = true;
}, { passive: false });
addEventListener('keyup', (e) => {
  const k = KEYMAP[e.code];
  if (!k) return;
  e.preventDefault();
  keys[k] = false;
}, { passive: false });
addEventListener('blur', () => { for (const k of Object.keys(keys)) keys[k] = false; });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { for (const k of Object.keys(keys)) keys[k] = false; return; }
  // 탭이 숨겨진 동안 rAF 가 멈춘다. 돌아왔을 때 그동안의 시간이 한꺼번에 흐르지 않도록 시계를 다시 맞춘다.
  last = performance.now();
  flyNextAt = Math.max(flyNextAt, last + 300);
});

const bindSlider = (el, out) => {
  const show = () => { out.textContent = el.value + ' ms'; };
  el.addEventListener('input', show);
  show();
};

function openSettings() { settingsOpen = true; settingsScrim.classList.add('open'); }
function closeSettings() { settingsOpen = false; settingsScrim.classList.remove('open'); dropFocus(); }
$('openSettings').addEventListener('click', openSettings);
$('closeSettings').addEventListener('click', closeSettings);
settingsScrim.addEventListener('click', (e) => { if (e.target === settingsScrim) closeSettings(); });
$('restart').addEventListener('click', (e) => { newMatch(); started = true; e.currentTarget.blur(); });
$('again').addEventListener('click', (e) => { newMatch(); started = true; e.currentTarget.blur(); });

// ---------- 크기 ----------
// 보드는 10칸 × 22칸(버퍼 2 포함). 패널 안에서 남는 높이·너비에 맞춰 셀 크기를 정한다.
// 가로로 필요한 셀 수: 사이드 2.8 + 간격 0.4667 + 가비지 0.333 + 간격 0.4667 + 보드 10 = 14.0667
// (시안 비율, 셀 30px 기준 84 + 14 + 10 + 14 + 300 = 422px)
const COLS_TOTAL = 2.8 + 0.4667 + 0.3333 + 0.4667 + WIDTH;
const PANEL_PAD = 40;   // .vs-panel 좌우·상하 padding 20 × 2
const PANEL_GAP = 14;   // .vs-panel 내부 gap (머리 ↔ 판)
const ROW_GAP = 16;     // 두 패널 사이
// 패널이 내용 폭을 따라가므로 셀 크기는 패널이 아니라 **쓸 수 있는 영역**에서 구한다 (순환 참조 방지).
function pickCell() {
  const row = document.querySelector('.vs-row');
  const head = document.querySelector('.vs-phead');
  const availH = (row?.clientHeight ?? 640) - PANEL_PAD - (head?.offsetHeight ?? 44) - PANEL_GAP;
  const availW = ((row?.clientWidth ?? 960) - ROW_GAP) / 2 - PANEL_PAD;
  return Math.max(10, Math.min(64, Math.floor(Math.min(availH / ROWS, availW / COLS_TOTAL))));
}
function buildRenderers() {
  const cell = pickCell();
  document.documentElement.style.setProperty('--cell', cell + 'px'); // CSS 치수가 전부 여기에 비례한다
  renderers = { human: createRenderer(humanCanvas, { cell }), fly: createRenderer(flyCanvas, { cell }) };
  // 대기 가비지 바는 보드의 '판' 영역(버퍼 제외)과 같은 높이·위치에 둔다
  for (const side of ['human', 'fly']) {
    const track = document.getElementById(side + 'GarbageTrack');
    if (track) { track.style.marginTop = SHOW_BUFFER * cell + 'px'; track.style.height = HEIGHT * cell + 'px'; }
  }
  draw();
}
addEventListener('resize', () => { if (renderers && pickCell() !== renderers.human.cell) buildRenderers(); });

// 디버그 훅 — 콘솔·자동화에서 상태를 들여다본다 (게임 로직에는 관여하지 않는다)
globalThis.__versus = {
  get match() { return match; }, keys,
  get started() { return started; }, get paused() { return paused; }, get ready() { return ready; },
  get cell() { return renderers?.human.cell; }, tuning, flyPlaceMs: FLY_PLACE_MS,
  step,
  press(code) { dispatchEvent(new KeyboardEvent('keydown', { code, bubbles: true, cancelable: true })); },
  release(code) { dispatchEvent(new KeyboardEvent('keyup', { code, bubbles: true, cancelable: true })); },
};

function boot() {
  bindSlider(gravityEl, gravityOut);
  bindSlider(softEl, softOut);
  bindSlider(dasEl, dasOut);
  bindSlider(arrEl, arrOut);

  worker = new Worker(new URL('./fly-worker.js', import.meta.url), { type: 'module' });
  worker.onmessage = onWorkerMessage;
  worker.onerror = (e) => { els.fly.badge.textContent = '오류'; console.error('워커를 띄우지 못했어요:', e.message); };
  worker.postMessage({ type: 'init', base: new URL('../../model', import.meta.url).href });

  newMatch();
  buildRenderers();
  last = performance.now();
  rafId = requestAnimationFrame(frame);
}

boot();
