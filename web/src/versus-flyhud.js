// 대전 화면 오른쪽 위 — 초파리의 KEYS(누르는 버튼)와 LOG(생각하고 내린 결정 한 줄). 둘 다 시각 효과다.
//   KEYS  워커가 고른 배치까지의 최단 입력(web/play/inputs.js)을 착수 직후 순서대로 켠다.
//         엔진은 배치를 바로 놓으므로 버튼 불빛은 보드보다 한 박자 늦게 따라간다.
//   LOG   착수마다 실제 결정 값(후보 수 · 생각 시간 · 회전 · 열 · 결과)을 영문 한 줄로. 최근 LOG_LINES 줄, 위일수록 흐리다.
// 불빛은 versus.js 의 rAF 가 update(now, running) 로 진행시킨다 (탭이 숨으면 같이 멈춘다).

import { PIECES } from '../../src/tetris.js';

const BUTTON_OF = { hold: 'hold', cw: 'cw', ccw: 'ccw', left: 'left', right: 'right', softDrop: 'down', down: 'down', hardDrop: 'drop' };
const LOG_LINES = 4;
// 버튼 하나의 간격(ms). 한 수의 입력을 다음 착수(생각 ~200 ms + 착수 간격) 전에 다 보여주도록 BUDGET 을 버튼 수로 나눈다.
const STEP_MIN = 40, STEP_MAX = 85, BUDGET = 240, ON_RATIO = 0.7; // 간격의 70% 동안 켜고 30% 끈다 (같은 버튼 연타가 따로 보이게)
const ROT = ['', 'R', '2', 'L']; // SRS 회전 표기 (0 은 생략)

function result(e) {
  const n = e.linesCleared;
  let r = e.perfectClear ? 'PERFECT CLEAR'
    : e.tspin ? `T-SPIN${e.tspin === 'mini' ? ' MINI' : ''}${n ? ` ${['', 'SINGLE', 'DOUBLE', 'TRIPLE'][n]}` : ''}`
      : n === 4 ? 'TETRIS' : n ? `+${n} line${n > 1 ? 's' : ''}` : 'no clear';
  if (e.sent > 0) r += ` · atk ${e.sent}`;
  return r;
}

// 예: "#024 hold T · 38 cands · 212ms" + " → R x4 · +2 lines" (cands·ms 는 워커가 준 값이 없으면 뺀다).
// [생각, 착수·결과] 두 조각으로 돌려준다 — 폭이 모자라면 앞 조각만 말줄임해서 착수와 결과는 끝까지 보이게.
export function flyLogLine({ n, piece, useHold, cands = null, ms = null, rot, col, event }) {
  const think = [cands !== null && `${cands} cands`, ms !== null && `${ms}ms`].filter(Boolean).map((s) => ` · ${s}`).join('');
  return [`#${String(n).padStart(3, '0')} ${useHold ? 'hold ' : ''}${PIECES[piece]}${think}`, ` → ${ROT[rot] ? `${ROT[rot]} ` : ''}x${col} · ${result(event)}`];
}

export function createFlyHud(keysEl, logEl) {
  const buttons = Object.fromEntries([...keysEl.querySelectorAll('[data-key]')].map((b) => [b.dataset.key, b]));
  let queue = [], stepMs = STEP_MAX, nextAt = 0, offAt = 0, lit = null;
  const light = (name) => { lit?.classList.remove('on'); lit = name ? buttons[name] ?? null : null; lit?.classList.add('on'); };

  return {
    // 새 수의 입력. 앞 수의 불빛이 아직 남아 있으면 버리고 바로 시작한다.
    press(actions, now) {
      queue = actions.map((a) => BUTTON_OF[a]);
      stepMs = Math.max(STEP_MIN, Math.min(STEP_MAX, BUDGET / queue.length));
      nextAt = now;
    },
    update(now, running) {
      if (!running) { if (queue.length || lit) { queue = []; light(null); } return; }
      if (lit && now >= offAt) light(null);
      if (queue.length && now >= nextAt) { light(queue.shift()); offAt = now + stepMs * ON_RATIO; nextAt = now + stepMs; }
    },
    // 한 줄 추가 (text 는 문자열 또는 flyLogLine 의 [앞, 뒤]). 목록 전체를 한 줄 높이만큼 내렸다가 제자리로 올려
    // "위로 밀려 올라가는" 모양을 낸다.
    log(text) {
      const line = Object.assign(document.createElement('div'), { className: 'vs-logline' });
      for (const part of [text].flat()) line.appendChild(Object.assign(document.createElement('span'), { textContent: part }));
      logEl.appendChild(line);
      while (logEl.children.length > LOG_LINES) logEl.firstChild.remove();
      const h = logEl.lastChild.offsetHeight;
      if (!h) return;                    // 자리가 접혀 있으면(좁은 화면) 움직임 없이 넣기만 한다
      logEl.style.transition = 'none';
      logEl.style.transform = `translateY(${h}px)`;
      void logEl.offsetHeight;           // 위치를 확정한 뒤 전환을 건다
      logEl.style.transition = '';
      logEl.style.transform = '';
    },
  };
}
