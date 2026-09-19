// 공격형 교사 (6단계). Dellacherie 는 생존 최적화라 싱글·더블만 지운다 — 사람을 이기려면 가비지를 보내야 한다.
// 이 교사는 Dellacherie 6 특징 + 공격 특징 5 의 선형 평가에 위험 높이 전환을 두고, next 5 + hold 를 쓰는 빔 서치(깊이 3, 폭 8)로 결정한다.
// 1-ply 로는 테트리스 빌드가 나오지 않는다 (test/versus.test.js 에서 빔 > 1-ply 를 확인).
//
// 특징 — 한 전이(부모 상태 → 후보 적용 후 상태)에 대해:
//   과도(transient, 경로를 따라 누적)  landingHeight, erodedPieceCells, attackSent(상쇄 전 공격 라인), comboState(배치 후 콤보 수)
//   상태(state, leaf 의 결과 보드)      rowTransitions, columnTransitions, holes, cumulativeWells,
//                                        wellDepth(우물 1열을 뺀 나머지 열의 최소 높이 − 우물 높이, 4 상한 — 테트리스 준비도),
//                                        tspinSetup(0 없음 / 1 T-슬롯 형태 있음 / 2 TSD 준비: 두 줄이 T 셀 외 전부 채움),
//                                        garbageQueueHeight(상쇄·삽입 뒤 큐에 남은 가비지 줄 수)
//   결과 보드는 가비지 삽입까지 반영한 실제 다음 상태다 (큐는 보이므로 삽입 결과도 안다).
// 위험 전환: 결과 보드 높이 + 남은 가비지 큐 ≥ dangerHeight 면 그 노드는 생존 평가 — Dellacherie 6 특징 × 고정 WEIGHTS, 공격 특징 0.
//   dangerHeight 는 CEM 이 튜닝하는 파라미터다 (scripts/tune-teacher.js → data/teacher-attack.json).
// 경로 값 = Σ 과도 특징·가중치 (각 스텝, 그 스텝의 모드) + 상태 특징·가중치 (leaf, leaf 의 모드).
//
// 두 탐색 모드:
//   beamSearch       표준 빔: 매 깊이에서 경로 값 상위 width 개만 남긴다. 튠·플레이용 (결정당 ~850 전이 평가).
//   scoreCandidates  첫 단계 후보 전체에 각각 폭 width 의 하위 빔(남은 깊이)을 돌려 후보마다 값을 매긴다. 후보 전체의 교사 점수가
//                    필요한 데이터 수집용 (~25배 비쌈). 선택 = argmax. 표준 빔보다 넓게 보므로 선택이 다를 수 있다.
//
// 1-ply 교사 (7단계 Phase A-4, createTeacher1Ply): 같은 특징·같은 위험 전환에 깊이 1, 후보 = 현재 조각의 배치만 (hold 후보 없음, next 미참조).
//   학생(1-ply 네트워크)이 원리적으로 도달할 수 있는 목표 — 빔 교사는 그대로 두고 상한 참조점으로 쓴다. 가중치는 따로 튜닝 (data/teacher-attack-1ply.json).
//   scoreCandidates 와 beamSearch 는 깊이 1 에서 같은 값·같은 선택이다 (하위 빔이 없다).
// Phase A-4′ (hold 없는 1-ply 가 가비지 조건 조각 176.5 로 350 하한 미달 → 사용자 결정): 깊이 1 + hold 후보 (엔진 후보 집합 그대로), CEM 을 가비지 주입 조건에서 다시 튜닝
//   (TEACHER_VARIANTS['1ply-hold-garbage'], scripts/tune-teacher.js --ply 1 --hold --garbage). hold 는 학생도 가진 정보라 정보 비대칭을 만들지 않는다; 탐색 깊이만 1.
//   교사 변형 4 종은 모두 보존한다 (빔 · 1ply 솔로튜닝 · 1ply-hold 솔로튜닝 · 1ply-hold 가비지튜닝) — 보고서 비교 대상.

import { HEIGHT, SHAPES, WIDTH, applyDecision, columnHeights, createPlayer, decisionCandidates, legalPlacementsVersus, pendingGarbage, surfaces } from './tetris.js';
import { WEIGHTS as DELLACHERIE } from './heuristic.js';
import { makeInjector } from './versus-data.js';
import { createRng } from './prng.js';

export const TRANSIENT = ['landingHeight', 'erodedPieceCells', 'attackSent', 'comboState'];
export const STATE = ['rowTransitions', 'columnTransitions', 'holes', 'cumulativeWells', 'wellDepth', 'tspinSetup', 'garbageQueueHeight'];
export const FEATURES = [...TRANSIENT, ...STATE]; // 11
export const SURVIVAL = ['landingHeight', 'erodedPieceCells', 'rowTransitions', 'columnTransitions', 'holes', 'cumulativeWells'];
export const WELL_CAP = 4;

// CEM 초기 평균 (튜닝 전 기본값). Dellacherie 원 가중치는 우물을 벌점(cumulativeWells −3.4 × 1+2+3+4)해 테트리스를 절대 쌓지 않으므로,
// 손으로 몇 점을 찔러 400조각에서 테트리스가 나오는 영역(attack ~120/400)을 초기 평균으로 둔다. 튜닝 결과는 data/teacher-attack.json.
export const DEFAULT_PARAMS = {
  weights: {
    landingHeight: -1.5, erodedPieceCells: DELLACHERIE.erodedPieceCells, rowTransitions: -2, columnTransitions: -6,
    holes: -10, cumulativeWells: -0.3,
    attackSent: 15, comboState: 0.5, wellDepth: 25, tspinSetup: 3, garbageQueueHeight: -1.5,
  },
  dangerHeight: 13,
};

// 테트리스용 우물 깊이: 열 x 를 우물로 볼 때 (나머지 9 열의 최소 높이 − h[x]) 의 최대. 구멍이 없으면 "우물 열만 비어 있는 행의 수" 와
// 같다 — I 를 세워 넣으면 그만큼 지운다. WELL_CAP(4) 상한 (더 깊어도 한 번의 테트리스 이상은 안 된다; 초과분은 cumulativeWells 가 벌점).
export function wellDepth(board) { return wellDepthFrom(columnHeights(board)); }
export function wellDepthFrom(h) {
  // 최소·두 번째 최소 높이로 "나머지 열의 최소" 를 O(W) 에 구한다
  let m1 = Infinity, m2 = Infinity, i1 = -1;
  for (let x = 0; x < WIDTH; x++) { if (h[x] < m1) { m2 = m1; m1 = h[x]; i1 = x; } else if (h[x] < m2) m2 = h[x]; }
  let best = 0;
  for (let x = 0; x < WIDTH; x++) {
    const others = x === i1 ? m2 : m1;
    const d = others - h[x];
    if (d > best) best = d;
  }
  return Math.min(WELL_CAP, best);
}

// T-슬롯 감지 (TSD 형태). 스템 열 c, 평평한 행 y = surface(c) − 2:
//   벽 (c±1, y+1) 채움, 평평한 행의 (c±1, y) 빔, 오버행은 (c−1, y−1) / (c+1, y−1) 중 정확히 하나, 열린 쪽 열은 y+1 이 표면
//   (위가 비어 T 가 세로로 들어와 회전할 수 있다). 0 없음 / 1 형태만 / 2 두 줄이 T 셀 외 전부 채움 (TSD 준비).
export function tspinSetup(board) {
  const s = surfaces(board);
  const at = (x, y) => board[y * WIDTH + x];
  let best = 0;
  for (let c = 1; c < WIDTH - 1; c++) {
    const y = s[c] - 2;
    if (y < 1) continue;
    if (!at(c - 1, y + 1) || !at(c + 1, y + 1)) continue;
    if (at(c - 1, y) || at(c + 1, y)) continue;
    const ovL = at(c - 1, y - 1) === 1, ovR = at(c + 1, y - 1) === 1;
    if (ovL === ovR) continue;
    const open = ovL ? c + 1 : c - 1;
    if (s[open] !== y + 1) continue;
    let ready = true;
    for (let x = 0; x < WIDTH && ready; x++) {
      if (x < c - 1 || x > c + 1) { if (!at(x, y)) ready = false; }
      if (x !== c) { if (!at(x, y + 1)) ready = false; }
    }
    best = Math.max(best, ready ? 2 : 1);
    if (best === 2) break;
  }
  return best;
}

// Dellacherie 보드 특징 4 + 열 높이 를 한 번에 (heuristic.js 의 함수들과 값이 같다 — test/versus.test.js). 핫 루프용.
const RUN = new Int32Array(HEIGHT); // boardFeatures 작업 버퍼 (열 안에서 y 부터 아래로 이어지는 빈 셀 수)
export function boardFeatures(board) {
  let rowT = 0, colT = 0, nHoles = 0, wells = 0;
  const heights = new Int32Array(WIDTH);
  const run = RUN;
  for (let x = 0; x < WIDTH; x++) {
    let prev = 0, covered = false;
    for (let y = 0; y < HEIGHT; y++) {
      const c = board[y * WIDTH + x];
      if (c !== prev) colT++;
      prev = c;
      if (c) { if (!covered) { covered = true; heights[x] = HEIGHT - y; } } else if (covered) nHoles++;
    }
    if (prev !== 1) colT++;
    let r = 0;
    for (let y = HEIGHT - 1; y >= 0; y--) { r = board[y * WIDTH + x] ? 0 : r + 1; run[y] = r; }
    for (let y = 0; y < HEIGHT; y++) {
      if (board[y * WIDTH + x]) continue;
      const left = x === 0 ? 1 : board[y * WIDTH + x - 1], right = x === WIDTH - 1 ? 1 : board[y * WIDTH + x + 1];
      if (left && right) wells += run[y];
    }
  }
  for (let y = 0; y < HEIGHT; y++) {
    let prev = 1;
    const row = y * WIDTH;
    for (let x = 0; x < WIDTH; x++) { const c = board[row + x]; if (c !== prev) rowT++; prev = c; }
    if (prev !== 1) rowT++;
  }
  return { rowTransitions: rowT, columnTransitions: colT, holes: nHoles, cumulativeWells: wells, heights };
}

// 상태 특징 7 (결과 보드 + 남은 큐)
export function stateFeatures(player) {
  const b = player.board;
  const f = boardFeatures(b);
  return {
    rowTransitions: f.rowTransitions, columnTransitions: f.columnTransitions, holes: f.holes, cumulativeWells: f.cumulativeWells,
    wellDepth: wellDepthFrom(f.heights), tspinSetup: tspinSetup(b), garbageQueueHeight: pendingGarbage(player), heights: f.heights,
  };
}
// 과도 특징 4 (전이 이벤트)
export function transientFeatures(event) {
  const h = SHAPES[event.piece][event.rot & 3].h;
  return {
    landingHeight: HEIGHT - event.landingRow - 0.5 - (h - 1) / 2,
    erodedPieceCells: event.linesCleared * event.erodedPieceCells,
    attackSent: event.attack,
    comboState: event.combo,
  };
}

// 현재 조각의 배치만 (hold 후보 없음). 1-ply 교사의 후보 집합 — 상태의 hold·next 를 읽지 않는다.
export function currentPieceCandidates(p) {
  return legalPlacementsVersus(p.board, p.current).map((c) => ({ useHold: false, piece: p.current, ...c }));
}

// candidates(player) → 후보 목록: 기본은 엔진의 decisionCandidates (현재 ∪ hold). 1-ply 교사는 currentPieceCandidates.
export function createTeacher(params = DEFAULT_PARAMS, { depth = 3, width = 8, candidates = decisionCandidates } = {}) {
  const { weights, dangerHeight } = params;
  const wTrans = TRANSIENT.map((k) => weights[k]), wState = STATE.map((k) => weights[k]);
  const sTrans = ['landingHeight', 'erodedPieceCells'].map((k) => DELLACHERIE[k]);
  const sState = ['rowTransitions', 'columnTransitions', 'holes', 'cumulativeWells'].map((k) => DELLACHERIE[k]);

  // 부모 노드에서 후보 하나를 적용한 자식. 사망 배치는 null.
  function child(node, cand) {
    const { player, event } = applyDecision(node.player, cand);
    if (event.toppedOut || player.dead) return null;
    const tf = transientFeatures(event), sf = stateFeatures(player);
    let maxH = 0; for (let x = 0; x < WIDTH; x++) if (sf.heights[x] > maxH) maxH = sf.heights[x];
    const danger = maxH + sf.garbageQueueHeight >= dangerHeight;
    let trans, state;
    if (danger) {
      trans = sTrans[0] * tf.landingHeight + sTrans[1] * tf.erodedPieceCells;
      state = sState[0] * sf.rowTransitions + sState[1] * sf.columnTransitions + sState[2] * sf.holes + sState[3] * sf.cumulativeWells;
    } else {
      trans = 0; for (let i = 0; i < TRANSIENT.length; i++) trans += wTrans[i] * tf[TRANSIENT[i]];
      state = 0; for (let i = 0; i < STATE.length; i++) state += wState[i] * sf[STATE[i]];
    }
    const acc = node.acc + trans;
    return { player, acc, total: acc + state, first: node.first ?? cand, cand, danger, event, tf, sf };
  }
  function expand(node) {
    const out = [];
    for (const cand of candidates(node.player)) { const c = child(node, cand); if (c) out.push(c); }
    return out;
  }
  const byTotal = (a, b) => b.total - a.total;

  // nodes 에서 levels 깊이만큼 빔을 내려 가장 좋은 leaf 노드 (도달한 가장 깊은 층에서). 자식이 없으면 null.
  function descend(nodes, levels) {
    let best = null;
    for (let d = 0; d < levels; d++) {
      const children = [];
      for (const n of nodes) children.push(...expand(n));
      if (children.length === 0) break;
      children.sort(byTotal);
      best = children[0];
      // 전치(transposition) 제거: 두 조각을 순서만 바꿔 놓은 경로는 같은 상태다 — 빔 자리를 서로 다른 상태에 쓴다
      nodes = [];
      const seen = new Set();
      for (const c of children) {
        const key = `${c.player.hold}:${c.player.drawn}:${Buffer.from(c.player.board).toString('latin1')}`;
        if (seen.has(key)) continue;
        seen.add(key);
        nodes.push(c);
        if (nodes.length >= width) break;
      }
    }
    return best;
  }

  // 표준 빔 서치. 반환 후보 | null (합법 후보 없음 = 사망)
  function beamSearch(player) {
    const best = descend([{ player, acc: 0, first: null }], depth);
    return best ? best.first : null;
  }

  // 후보 전체에 값을 매긴다. 반환 { candidates: [{ cand, value, event, features }], chosen: index | -1 }
  function scoreCandidates(player) {
    const firsts = expand({ player, acc: 0, first: null });
    const candidates = firsts.map((f) => {
      const deeper = depth > 1 ? descend([f], depth - 1) : null;
      return { cand: f.cand, value: deeper ? deeper.total : f.total, event: f.event, features: { ...f.tf, ...f.sf, heights: undefined }, danger: f.danger };
    });
    let chosen = -1;
    for (let i = 0; i < candidates.length; i++) if (chosen < 0 || candidates[i].value > candidates[chosen].value) chosen = i;
    return { candidates, chosen };
  }

  return {
    params, depth, width, candidates,
    beamSearch, scoreCandidates, expand, child,
    choose: beamSearch,
    // 데이터 수집용 에이전트: scoreCandidates 의 argmax
    chooseScored(player) { const r = scoreCandidates(player); return r.chosen >= 0 ? r.candidates[r.chosen].cand : null; },
  };
}

// 1-ply 교사 (Phase A-4): 깊이 1 · 현재 조각의 배치만. hold 후보가 없고 하위 빔이 없으므로 상태의 hold·next 는 값에도 선택에도 들어가지 않는다
// (결과 보드·큐·콤보만). ply: 1 표식은 워커·에이전트가 같은 행동 집합(hold 없음)으로 맞추는 데 쓴다.
export function createTeacher1Ply(params = DEFAULT_PARAMS) {
  return { ...createTeacher(params, { depth: 1, width: 1, candidates: currentPieceCandidates }), ply: 1, hold: false };
}
export const SEARCH_1PLY = { ply: 1, depth: 1, width: 1, hold: false };
// 깊이 1 + hold 후보 (Phase A-4′ 교사; A-4 에서는 대조 변형): hold 가 비어 있을 때만 next[0] 을 (hold 조각으로) 참조한다. 하위 빔 없음.
export const SEARCH_1PLY_HOLD = { ply: 1, depth: 1, width: 1, hold: true };
export const SEARCH_BEAM = { ply: 3, depth: 3, width: 8, hold: true };

// 교사 변형 (파일 이름 · 탐색 · 튜닝 조건). key 는 스크립트의 --teacher 옵션 값. 데이터 파일은 versus-decisions[-key].json.gz (beam 은 접미사 없음, 6단계 이름 유지).
//   garbage: CEM 평가에 인공 가비지 주입 (rate/dist 는 6단계 수집·7단계 게이트와 같은 0.08, 1–4 줄) — 튜닝 조건 = 평가 조건 (A-4′ 필수).
export const CEM_GARBAGE = { rate: 0.08, dist: [0.4, 0.3, 0.15, 0.15] };
export const TEACHER_VARIANTS = {
  beam: { file: 'teacher-attack.json', dataFile: 'versus-decisions.json.gz', search: SEARCH_BEAM, garbage: null, gamesPerIndividual: 2, label: 'beam depth 3 width 8 (stage 6)' },
  '1ply': { file: 'teacher-attack-1ply.json', dataFile: 'versus-decisions-1ply.json.gz', search: SEARCH_1PLY, garbage: null, gamesPerIndividual: 2, label: '1-ply, current piece only (no hold/next), solo-tuned (A-4)' },
  '1ply-hold': { file: 'teacher-attack-1ply-hold.json', dataFile: 'versus-decisions-1ply-hold.json.gz', search: SEARCH_1PLY_HOLD, garbage: null, gamesPerIndividual: 2, label: '1-ply + hold candidates, solo-tuned (A-4 contrast)' },
  '1ply-hold-garbage': { file: 'teacher-attack-1ply-hold-garbage.json', dataFile: 'versus-decisions-1ply-hold-garbage.json.gz', search: SEARCH_1PLY_HOLD, garbage: CEM_GARBAGE, gamesPerIndividual: 4, label: '1-ply + hold candidates, garbage-tuned (A-4′ teacher)' },
};
export const DEFAULT_VARIANT = 'beam';
// tune-teacher 의 플래그 → 변형 key
export const variantKey = ({ ply = 3, hold = false, garbage = false } = {}) => (ply !== 1 ? 'beam' : hold ? (garbage ? '1ply-hold-garbage' : '1ply-hold') : '1ply');
// 스크립트 argv → 변형 key: --teacher KEY (우선) / --ply 1 (+ --hold, --garbage) / 기본 beam
export function variantOf(argv) {
  const i = argv.indexOf('--teacher');
  if (i >= 0) { const k = argv[i + 1]; if (!TEACHER_VARIANTS[k]) throw new Error(`unknown teacher variant ${k} (one of ${Object.keys(TEACHER_VARIANTS).join(', ')})`); return k; }
  const p = argv.indexOf('--ply');
  return variantKey({ ply: p >= 0 ? Number(argv[p + 1]) : 3, hold: argv.includes('--hold'), garbage: argv.includes('--garbage') });
}

// CEM 개체 평가 (teacher-worker 의 evaluate 작업): 시드마다 게임 하나, J = objective. garbage 가 있으면 인공 가비지 주입 —
// 주입 rng 는 시드에서만 나오므로 (play 평가와 같은 seed·31+7) 같은 세대의 모든 개체가 같은 조각열 + 같은 가비지 도착 일정을 본다 (공통 난수).
export function evaluateIndividual(teacher, { seeds, cap, garbage = null }) {
  const games = seeds.map((seed) => { const injector = garbage ? makeInjector(garbage) : null; return playSolo(teacher, { seed, cap, injector, rng: injector ? createRng(seed * 31 + 7) : null }); });
  return { J: objective(games), games };
}
// 탐색 사양 { ply?, depth, width, hold? } → 교사 (워커·스크립트 공용). ply 1 이면 1-ply 교사 (hold false 기본; hold true 면 엔진 후보 집합의 깊이 1), 아니면 빔 교사.
export function teacherFor(params, search = SEARCH_BEAM) {
  if (search?.ply !== 1) return createTeacher(params, { depth: search?.depth ?? 3, width: search?.width ?? 8 });
  if (search.hold) return { ...createTeacher(params, { depth: 1, width: 1 }), ply: 1, hold: true };
  return createTeacher1Ply(params);
}

// 단일 플레이 (가비지 없음, 또는 injector 로 인공 가비지). agent.choose(player) → 후보 | null.
// injector(player, rng, pieceIndex) → player (가비지 큐에 넣거나 그대로). 반환 게임 통계.
export function playSolo(agent, { seed, cap = 1000, injector = null, rng = null } = {}) {
  let p = createPlayer(seed);
  const t0 = performance.now();
  while (p.pieces < cap && !p.dead) {
    const cand = agent.choose(p);
    if (!cand) break;
    p = applyDecision(p, cand).player;
    if (injector && !p.dead) p = injector(p, rng, p.pieces);
  }
  return { seed, pieces: p.pieces, survived: p.pieces >= cap, attack: p.stats.attack, sent: p.stats.sent, lines: p.stats.lines, tetris: p.stats.tetris, tspin: p.stats.tspin, tspinMini: p.stats.tspinMini, perfectClear: p.stats.perfectClear, maxCombo: p.stats.maxCombo, holds: p.stats.holds, garbageReceived: p.stats.garbageReceived, ms: performance.now() - t0 };
}


// CEM 목적함수: 보낸 공격 라인 총합 + 0.5 × 생존 조각 수 (시드 평균)
export const objective = (games) => games.reduce((s, g) => s + g.attack + 0.5 * g.pieces, 0) / games.length;

// 파라미터 벡터 ↔ 객체 (CEM 용). 순서: FEATURES 11 + dangerHeight
export const PARAM_DIM = FEATURES.length + 1;
export function paramsToVector(p) { return Float64Array.from([...FEATURES.map((k) => p.weights[k]), p.dangerHeight]); }
export function vectorToParams(v) {
  const weights = {};
  FEATURES.forEach((k, i) => { weights[k] = v[i]; });
  return { weights, dangerHeight: Math.max(4, Math.min(HEIGHT, Math.round(v[FEATURES.length]))) };
}
