// 표시 설정 (localStorage). 데이터에는 손대지 않고 보는 방식만 바꾼다.
//  autoRotate  3D 뷰 자동 회전 (reduced-motion 이면 기본 꺼짐)
//  darkViz     3D 뷰 어두운 배경
//  grayOverlap 조건 비교에서 C0 와 CI 가 겹치는 조건을 회색으로
//  tabular     본문 숫자까지 고정폭

const KEY = 'fly.settings.v1';
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const DEFAULTS = { autoRotate: !reduced, darkViz: false, grayOverlap: true, tabular: false };

export function loadSettings() {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }; } catch { return { ...DEFAULTS }; }
}
function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* 사설 모드 등 */ } }

// 설정 화면의 스위치를 묶고, 바뀔 때마다 onChange(key, value, all) 를 부른다. 초기값도 한 번 흘려보낸다.
export function bindSettings(onChange) {
  const state = loadSettings();
  const inputs = [...document.querySelectorAll('[data-setting]')];
  const apply = () => {
    for (const el of inputs) el.checked = !!state[el.dataset.setting];
    document.body.classList.toggle('tabular', !!state.tabular);
  };
  for (const el of inputs) {
    el.addEventListener('change', () => {
      state[el.dataset.setting] = el.checked;
      save(state); apply();
      onChange?.(el.dataset.setting, el.checked, state);
    });
  }
  document.getElementById('settings-reset')?.addEventListener('click', () => {
    Object.assign(state, DEFAULTS);
    try { localStorage.removeItem(KEY); } catch { /* noop */ }
    apply();
    for (const k of Object.keys(DEFAULTS)) onChange?.(k, state[k], state);
  });
  apply();
  for (const k of Object.keys(DEFAULTS)) onChange?.(k, state[k], state);
  return state;
}
