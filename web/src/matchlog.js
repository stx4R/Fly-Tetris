// 대전 기록 저장소. 커넥톰 · 결정 탐색 · 신경 활동 · 플레이 분석 · 대전 기록 · 홈이 전부 여기서 읽는다.
//
// 원칙: **대전에서 실제로 나온 값만** 들어간다. 판을 한 번도 하지 않았으면 비어 있고, 화면은 빈 상태를 그린다.
//
// 담는 것
//   matches   판별 요약 + 조각 단위 타임라인 (양쪽) — 가벼워서 오래 남긴다
//   decisions 초파리 결정의 상세 (후보·모델 점수·교사 점수·DN 창평균·표본 뉴런 활성 트레이스) — 무거워서 최근 것만
//
// 저장: IndexedDB (구조화 복제라 Uint8Array 가 그대로 들어간다). 쓸 수 없는 환경이면 메모리만 쓰고 조용히 넘어간다.

const DB = 'fly-matchlog';
const VER = 1;
export const MAX_MATCHES = 20;
export const MAX_DECISIONS = 60;

let db = null;
const state = { matches: [], decisions: [], loaded: false };
const listeners = new Set();

const emit = () => { for (const fn of listeners) { try { fn(state); } catch (e) { console.warn('matchlog listener', e); } } };
export const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

function open() {
  return new Promise((resolve) => {
    if (!globalThis.indexedDB) return resolve(null);
    let req;
    try { req = indexedDB.open(DB, VER); } catch { return resolve(null); }
    req.onupgradeneeded = () => {
      const d = req.result;
      if (!d.objectStoreNames.contains('matches')) d.createObjectStore('matches', { keyPath: 'id' });
      if (!d.objectStoreNames.contains('decisions')) d.createObjectStore('decisions', { keyPath: 'id' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
    req.onblocked = () => resolve(null);
  });
}

const all = (store) => new Promise((resolve) => {
  if (!db) return resolve([]);
  try {
    const req = db.transaction(store, 'readonly').objectStore(store).getAll();
    req.onsuccess = () => resolve(req.result ?? []);
    req.onerror = () => resolve([]);
  } catch { resolve([]); }
});

function write(store, put = [], del = []) {
  if (!db) return;
  try {
    const tx = db.transaction(store, 'readwrite');
    const os = tx.objectStore(store);
    for (const v of put) os.put(v);
    for (const k of del) os.delete(k);
  } catch (e) { console.warn('matchlog write', e); }
}

export async function loadMatchLog() {
  if (state.loaded) return state;
  db = await open();
  const [m, d] = await Promise.all([all('matches'), all('decisions')]);
  state.matches = m.sort((a, b) => b.startedAt - a.startedAt).slice(0, MAX_MATCHES);
  state.decisions = d.sort((a, b) => a.id - b.id).slice(-MAX_DECISIONS);
  state.loaded = true;
  state.storage = db ? 'indexeddb' : 'memory';
  emit();
  return state;
}

// 디버그 훅 — 콘솔·자동화에서 기록 상태를 들여다본다 (__versus 와 같은 용도).
globalThis.__matchlog = {
  get state() { return state; }, get db() { return !!db; },
  totals: () => totals(), clear: () => clearAll(),
};

export const getState = () => state;
export const hasData = () => state.decisions.length > 0 || state.matches.length > 0;
export const latestMatch = () => state.matches[0] ?? null;
// 항상 새 배열을 준다. 내부 배열을 그대로 넘기면 화면이 들고 있는 목록이 대전 중에 저절로 길어져서
// "달라졌는지" 비교가 무력화된다 (결정이 쌓여도 화면이 다시 그려지지 않았다).
export const decisionsOf = (matchId) => (matchId ? state.decisions.filter((d) => d.matchId === matchId) : state.decisions.slice());

// ---------- 쓰기 ----------

// 판 시작. id 는 시작 시각(ms) — 정렬 키이자 결정의 matchId 다.
export function startMatch(meta) {
  const m = {
    id: Date.now(), startedAt: Date.now(), endedAt: null, winner: null, reason: null,
    seed: meta?.seed ?? null, flyPlaceMs: meta?.flyPlaceMs ?? null, model: meta?.model ?? null,
    human: null, fly: null, think: null, timeline: [], decisionCount: 0,
    // 조각을 놓을 때마다의 보드 품질 (양쪽) — 플레이 분석이 읽는다. { side, at, height, holes, well, lines, sent, hold }
    quality: [],
  };
  state.matches.unshift(m);
  const drop = state.matches.splice(MAX_MATCHES);
  if (drop.length) write('matches', [], drop.map((x) => x.id));
  emit();
  return m.id;
}

const side = (s) => ({
  pieces: s.pieces, attack: s.player.stats.attack, sent: s.player.stats.sent, lines: s.player.stats.lines,
  tetris: s.player.stats.tetris, tspin: s.player.stats.tspin, tspinMini: s.player.stats.tspinMini,
  maxCombo: s.player.stats.maxCombo, holds: s.player.stats.holds, garbageReceived: s.player.stats.garbageReceived,
  perfectClear: s.player.stats.perfectClear, dead: s.player.dead,
});

// 판 종료 — match 객체(web/play/match.js) 와 초파리 생각 시간 목록을 받아 요약을 확정한다.
export function endMatch(id, match, thinkMs) {
  const m = state.matches.find((x) => x.id === id);
  if (!m) return;
  const t = [...thinkMs].sort((a, b) => a - b);
  m.endedAt = Date.now();
  m.winner = match.winner; m.reason = match.reason;
  m.human = side(match.human); m.fly = side(match.fly);
  m.think = t.length ? { n: t.length, median: t[t.length >> 1], min: t[0], max: t[t.length - 1], mean: t.reduce((a, b) => a + b, 0) / t.length } : null;
  m.timeline = match.log.map((e) => ({ ...e }));
  m.decisionCount = state.decisions.filter((d) => d.matchId === id).length;
  write('matches', [m]);
  emit();
}

// 조각 하나를 놓은 직후의 보드 품질. 판이 끝날 때 match 와 같이 저장된다 (매번 쓰지 않는다 — 판당 수백 개다).
const MAX_QUALITY = 4000;
export function sampleQuality(id, sample) {
  const m = state.matches.find((x) => x.id === id);
  if (!m || m.quality.length >= MAX_QUALITY) return;
  m.quality.push(sample);
}

let decSeq = 0;
// 초파리 결정 상세. 워커가 준 detail 을 그대로 담고, 링 버퍼 밖으로 밀려난 것은 지운다.
export function addDecision(matchId, detail, ms) {
  const d = { id: Date.now() * 1000 + (decSeq++ % 1000), matchId, at: Date.now(), ms, ...detail };
  state.decisions.push(d);
  const drop = state.decisions.splice(0, Math.max(0, state.decisions.length - MAX_DECISIONS));
  write('decisions', [d], drop.map((x) => x.id));
  emit();
  return d;
}

export function clearAll() {
  const mIds = state.matches.map((m) => m.id), dIds = state.decisions.map((d) => d.id);
  state.matches = []; state.decisions = [];
  write('matches', [], mIds);
  write('decisions', [], dIds);
  emit();
}

// ---------- 파생 ----------

// 화면 여러 곳이 쓰는 합계. 판이 없으면 null.
export function totals() {
  const ms = state.matches.filter((m) => m.endedAt);
  if (!ms.length) return null;
  const wins = ms.filter((m) => m.winner === 'human').length;
  const losses = ms.filter((m) => m.winner === 'fly').length;
  const sum = (f) => ms.reduce((s, m) => s + (f(m) ?? 0), 0);
  const med = (f) => { const v = ms.map(f).filter((x) => x !== null && x !== undefined).sort((a, b) => a - b); return v.length ? v[v.length >> 1] : null; };
  const think = ms.map((m) => m.think?.median).filter((x) => x != null).sort((a, b) => a - b);
  return {
    games: ms.length, wins, losses, draws: ms.length - wins - losses,
    humanPieces: sum((m) => m.human?.pieces), flyPieces: sum((m) => m.fly?.pieces),
    humanAttack: sum((m) => m.human?.attack), flyAttack: sum((m) => m.fly?.attack),
    humanLines: sum((m) => m.human?.lines), flyLines: sum((m) => m.fly?.lines),
    humanTetris: sum((m) => m.human?.tetris), flyTetris: sum((m) => m.fly?.tetris),
    humanPiecesMedian: med((m) => m.human?.pieces), flyPiecesMedian: med((m) => m.fly?.pieces),
    humanAttackMedian: med((m) => m.human?.attack), flyAttackMedian: med((m) => m.fly?.attack),
    thinkMedian: think.length ? think[think.length >> 1] : null,
    decisions: state.decisions.length,
  };
}

// 결정 상세에서 나오는 순위 지표 — 교사 순위 대비 학생이 몇 등을 골랐나.
// 오프라인 실측(web/data/stage7.json)과 같은 정의라 나란히 놓을 수 있다.
export function rankingFrom(decisions = state.decisions) {
  const use = decisions.filter((d) => d.teacherAligned && d.candidates.length > 1);
  if (!use.length) return null;
  let top1 = 0, sumPct = 0, bottomHalf = 0, sumRegret = 0, sumSpan = 0, tauSum = 0, tauN = 0;
  for (const d of use) {
    const n = d.candidates.length;
    const rank = d.candidates[d.chosen].teacherRank;      // 0 = 교사 최선
    if (rank === 0) top1++;
    sumPct += 1 - rank / (n - 1);
    if (rank >= n / 2) bottomHalf++;
    const vals = d.candidates.map((c) => c.teacher);
    const best = Math.max(...vals), worst = Math.min(...vals);
    sumRegret += best - vals[d.chosen];
    sumSpan += best - worst;
    // 결정 내 켄달 τ-b (모델 점수 순위 ↔ 교사 점수 순위)
    const a = d.candidates.map((c) => c.score), b = vals;
    let conc = 0, disc = 0, tiesA = 0, tiesB = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const da = Math.sign(a[i] - a[j]), dbv = Math.sign(b[i] - b[j]);
      if (da === 0 && dbv === 0) continue;
      if (da === 0) { tiesA++; continue; }
      if (dbv === 0) { tiesB++; continue; }
      if (da === dbv) conc++; else disc++;
    }
    const den = Math.sqrt((conc + disc + tiesA) * (conc + disc + tiesB));
    if (den > 0) { tauSum += (conc - disc) / den; tauN++; }
  }
  return {
    decisions: use.length,
    candidatesPerDecision: use.reduce((s, d) => s + d.candidates.length, 0) / use.length,
    top1: top1 / use.length,
    pickPercentile: sumPct / use.length,
    bottomHalfRate: bottomHalf / use.length,
    relRegret: sumSpan > 0 ? sumRegret / sumSpan : 0,
    tau: tauN ? tauSum / tauN : null,
  };
}
