// 8단계 — 사람 vs 초파리 실시간 대전. 메인 루프·입력·워커 조율.
//
// 사람: 키보드 → kinematics → 고정되면 엔진에 배치
// 초파리: 워커가 c0.model 로 후보를 점수화해 고른 배치 (결정 한 번 265 ms 실측이라 메인 스레드에서 돌리지 않는다)
// 착수 간격은 슬라이더로 조절한다. 모델을 약화시키지 않는다 — 약화시키면 "이 배선이 둔 수"가 아니게 된다.

import { createMatch, flyPlace, flySnapshot, tickHuman, viewOf } from './match.js';
import { DEFAULT_TUNING, NO_KEYS } from './kinematics.js';
import { createRenderer } from './render.js';

const $ = (id) => document.getElementById(id);
const humanCanvas = $('human'), flyCanvas = $('fly');
const statusEl = $('status'), bannerEl = $('banner'), thinkEl = $('think'), speedEl = $('speed'), speedOut = $('speedOut'), gravityEl = $('gravity'), gravityOut = $('gravityOut');

const KEYMAP = {
  ArrowLeft: 'left', ArrowRight: 'right', ArrowDown: 'softDrop', Space: 'hardDrop',
  ArrowUp: 'cw', KeyX: 'cw', KeyZ: 'ccw', ControlLeft: 'ccw', KeyA: 'flip',
  KeyC: 'hold', ShiftLeft: 'hold',
};
const keys = { ...NO_KEYS };
let paused = false, started = false;

let renderers = null, match = null, worker = null, ready = false;
let pendingId = 0, pendingDecision = null, awaiting = false, flyNextAt = 0, lastThinkMs = null;
let last = 0, rafId = 0;

function tuning() {
  return { ...DEFAULT_TUNING, gravityMs: Number(gravityEl.value) };
}

function setBanner(text, tone = '') {
  bannerEl.textContent = text;
  bannerEl.className = tone;
  bannerEl.style.display = text ? 'block' : 'none';
}

function newMatch() {
  const seed = (Math.random() * 1e9) | 0;
  match = createMatch({ seedHuman: seed, seedFly: seed, garbageSeed: seed ^ 0x5bf03635, tuning: tuning(), cap: 5000 });
  pendingDecision = null; awaiting = false; pendingId++; lastThinkMs = null;
  flyNextAt = performance.now() + 1200; // 시작 직후 한 박자 여유
  setBanner('');
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
    statusEl.textContent = `초파리 준비됨 — P ${m.P.toLocaleString()} · 간선 ${m.E.toLocaleString()} · 백엔드 ${m.backend} · 로드 ${(m.loadMs / 1000).toFixed(1)}s`;
    if (started) requestFlyDecision();
    return;
  }
  if (m.type === 'decision') {
    awaiting = false;
    if (m.id !== waitingId) return; // 리매치 등으로 버려진 결정
    pendingDecision = m.cand;
    lastThinkMs = m.ms;
    thinkEl.textContent = `${m.ms} ms`;
    return;
  }
  if (m.type === 'error') {
    awaiting = false;
    statusEl.textContent = `초파리 오류: ${m.error}`;
    setBanner('초파리 워커 오류 — 콘솔 확인', 'bad');
  }
}

function draw() {
  if (!match) return;
  const over = match.over;
  renderers.human.draw(viewOf(match, 'human'), { label: '사람', highlight: !over, status: over && match.winner === 'human' ? 'WIN' : '' });
  renderers.fly.draw(viewOf(match, 'fly'), { label: '초파리 (C0)', highlight: !over, status: lastThinkMs !== null ? `${lastThinkMs} ms/수` : '' });
}

function frame(now) {
  rafId = requestAnimationFrame(frame);
  const dt = Math.min(100, now - last);
  last = now;
  if (!match || match.over || paused || !started) { draw(); return; }

  match.tuning = tuning();
  tickHuman(match, dt, keys);

  // 초파리: 결정은 미리 받아 두고(계산과 대기를 겹친다) 착수 간격이 되면 놓는다
  if (!match.over) {
    if (!pendingDecision && !awaiting) requestFlyDecision();
    if (pendingDecision && now >= flyNextAt) {
      flyPlace(match, pendingDecision);
      pendingDecision = null;
      flyNextAt = now + Number(speedEl.value);
      if (!match.over) requestFlyDecision();
    }
  }

  if (match.over) {
    const who = match.winner === 'human' ? '사람 승' : match.winner === 'fly' ? '초파리 승' : '무승부';
    setBanner(`${who} — ${match.reason}  (R 키로 다시)`, match.winner === 'human' ? 'good' : 'bad');
  }
  draw();
}

// ---------- 입력 ----------
addEventListener('keydown', (e) => {
  if (e.code === 'KeyR') { newMatch(); started = true; return; }
  if (e.code === 'KeyP') { paused = !paused; setBanner(paused ? '일시정지 (P)' : ''); return; }
  const k = KEYMAP[e.code];
  if (!k) return;
  e.preventDefault();
  if (!started) { started = true; setBanner(''); }
  keys[k] = true;
});
addEventListener('keyup', (e) => {
  const k = KEYMAP[e.code];
  if (!k) return;
  e.preventDefault();
  keys[k] = false;
});
addEventListener('blur', () => { for (const k of Object.keys(keys)) keys[k] = false; });

speedEl.addEventListener('input', () => { speedOut.textContent = `${speedEl.value} ms`; });
gravityEl.addEventListener('input', () => { gravityOut.textContent = `${gravityEl.value} ms`; });
$('restart').addEventListener('click', () => { newMatch(); started = true; });

// ---------- 시작 ----------
// 한 쪽이 쓰는 가로 셀 수 (홀드 5 + 간격 + 가비지 바 + 간격 + 보드 10 + 간격 + 넥스트 5)
const CELLS_PER_SIDE = 21.8;
function pickCell() {
  const avail = Math.max(320, innerWidth - 60) - 28; // 본문 패딩 + 보드 사이 간격
  return Math.max(11, Math.min(24, Math.floor(avail / (2 * CELLS_PER_SIDE))));
}
function buildRenderers() {
  const cell = pickCell();
  renderers = { human: createRenderer(humanCanvas, { cell }), fly: createRenderer(flyCanvas, { cell }) };
  draw();
}
addEventListener('resize', () => { if (renderers && pickCell() !== renderers.human.cell) buildRenderers(); });

function boot() {
  buildRenderers();
  speedOut.textContent = `${speedEl.value} ms`;
  gravityOut.textContent = `${gravityEl.value} ms`;

  worker = new Worker(new URL('./fly-worker.js', import.meta.url), { type: 'module' });
  worker.onmessage = onWorkerMessage;
  worker.onerror = (e) => { statusEl.textContent = `워커 로드 실패: ${e.message}`; setBanner('초파리 워커를 띄우지 못했다', 'bad'); };
  statusEl.textContent = '초파리 모델 로드 중…';
  worker.postMessage({ type: 'init', base: new URL('../../model', import.meta.url).href });

  newMatch();
  setBanner('아무 키나 눌러 시작 — ←→ 이동 · ↓ 소프트드롭 · Space 하드드롭 · ↑/X 회전 · Z 반대회전 · A 180° · C 홀드 · P 일시정지 · R 리매치');
  last = performance.now();
  rafId = requestAnimationFrame(frame);
}

boot();
