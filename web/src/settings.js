// 설정 (localStorage) — 화면은 하나다. 예전 대전 화면 안에 따로 있던 조작 설정 모달을 여기로 합쳤다.
//
//  표시   autoRotate  3D 뷰 자동 회전 (reduced-motion 이면 기본 꺼짐)
//         darkViz     3D 뷰 어두운 배경
//         grayOverlap 조건 비교에서 신뢰구간이 겹치는 항목을 회색으로
//         tabular     본문 숫자까지 고정폭
//  조작   gravityMs · softDropMs · dasMs · arrMs  — 사람 쪽 입력 감도. 초파리에는 영향이 없다
//         (초파리 착수 간격 150 ms 와 모델은 설정에 두지 않는다 — 약화시키면 '이 배선이 둔 수'가 아니게 된다).

const KEY = 'fly.settings.v2';
const OLD = 'fly.settings.v1';
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

export const TOGGLES = { autoRotate: !reduced, darkViz: false, grayOverlap: true, tabular: false };
export const TUNING = { gravityMs: 800, softDropMs: 12, dasMs: 120, arrMs: 12 };
export const DEFAULTS = { ...TOGGLES, ...TUNING };

// 슬라이더 범위 — 예전 대전 모달의 값을 그대로 옮겼다.
export const TUNE_META = {
  gravityMs: { label: '중력', desc: '한 칸 자동으로 내려가는 주기', min: 100, max: 1500, step: 50 },
  softDropMs: { label: '소프트드롭', desc: '↓ 를 누르고 있을 때 한 칸 주기', min: 4, max: 60, step: 2 },
  dasMs: { label: 'DAS', desc: '좌우를 누르고 자동 반복이 시작되기까지', min: 40, max: 220, step: 10 },
  arrMs: { label: 'ARR', desc: '자동 반복 주기 (0 이면 즉시 벽까지)', min: 0, max: 80, step: 1 },
};

export const KEY_HELP = [
  [['←', '→'], '이동'], [['↓'], '소프트드롭'], [['Space'], '하드드롭'],
  [['↑', 'X'], '회전'], [['Z'], '반대 회전'], [['A'], '180°'],
  [['C', 'Shift'], '홀드'], [['P'], '일시정지'], [['R'], '리매치'],
];

export function loadSettings() {
  try {
    const cur = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (cur) return { ...DEFAULTS, ...cur };
    const old = JSON.parse(localStorage.getItem(OLD) ?? 'null'); // v1 (표시 설정만) 이어받기
    return { ...DEFAULTS, ...(old ?? {}) };
  } catch { return { ...DEFAULTS }; }
}
const save = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* 사설 모드 등 */ } };

// 설정 화면의 스위치·슬라이더를 묶고, 바뀔 때마다 onChange(key, value, all) 를 부른다. 초기값도 한 번 흘려보낸다.
export function bindSettings(onChange) {
  const state = loadSettings();
  const toggles = [...document.querySelectorAll('[data-setting]')];
  const tunes = [...document.querySelectorAll('[data-tune]')];

  const apply = () => {
    for (const el of toggles) el.checked = !!state[el.dataset.setting];
    for (const el of tunes) {
      el.value = String(state[el.dataset.tune]);
      const out = document.getElementById(`${el.dataset.tune}-out`);
      if (out) out.textContent = `${state[el.dataset.tune]} ms`;
    }
    document.body.classList.toggle('tabular', !!state.tabular);
  };

  for (const el of toggles) {
    el.addEventListener('change', () => {
      state[el.dataset.setting] = el.checked;
      save(state); apply();
      onChange?.(el.dataset.setting, el.checked, state);
    });
  }
  for (const el of tunes) {
    el.addEventListener('input', () => {
      const v = Number(el.value);
      state[el.dataset.tune] = v;
      const out = document.getElementById(`${el.dataset.tune}-out`);
      if (out) out.textContent = `${v} ms`;
      save(state);
      onChange?.(el.dataset.tune, v, state);
    });
  }
  document.getElementById('settings-reset')?.addEventListener('click', () => {
    Object.assign(state, DEFAULTS);
    save(state);
    apply();
    for (const k of Object.keys(DEFAULTS)) onChange?.(k, state[k], state);
  });

  apply();
  for (const k of Object.keys(DEFAULTS)) onChange?.(k, state[k], state);
  return state;
}

// 대전 루프가 매 프레임 읽는 값 (kinematics 의 DEFAULT_TUNING 에 덮어쓴다).
export const tuningOf = (s) => ({ gravityMs: s.gravityMs, softDropMs: s.softDropMs, dasMs: s.dasMs, arrMs: s.arrMs });
