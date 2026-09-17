// 7단계 학습된 정책의 에이전트. 결정마다 **전체 후보** 의 afterstate 를 u 로 만들어 모델 점수 argmax (K=8 은 학습 부분집합일 뿐, 플레이·평가는 전체 후보).
// choose(player) → 후보 | null (6단계 playSolo / playMatch 인터페이스), pick(player, cands) → 인덱스 (collectGame 의 policy 인터페이스, DAgger).
// 사망하는 후보(적용 후 dead)는 제외; 살아남는 후보가 없으면 첫 후보 (어차피 사망).

import { applyDecision, createPlayer, decisionCandidates } from './tetris.js';
import { wellDepth } from './teacher-attack.js';
import { U_DIM, encodeAfterstate } from './stage7-data.js';

export function createNetAgent(model) {
  let U = new Float32Array(64 * U_DIM);
  let rows = Array.from({ length: 64 }, (_, i) => i);
  function scoreLive(p, cands) {
    if (cands.length * U_DIM > U.length) { U = new Float32Array(cands.length * 2 * U_DIM); rows = Array.from({ length: cands.length * 2 }, (_, i) => i); }
    const live = [];
    for (const c of cands) {
      const r = applyDecision(p, c);
      if (r.player.dead || r.event.toppedOut) continue;
      encodeAfterstate(r.player, r.event, U.subarray(live.length * U_DIM, (live.length + 1) * U_DIM));
      live.push(c);
    }
    if (!live.length) return { live, scores: null };
    return { live, scores: model.score(U, rows.slice(0, live.length)) };
  }
  const argmax = (s) => { let a = 0; for (let k = 1; k < s.length; k++) if (s[k] > s[a]) a = k; return a; };
  return {
    kind: 'net',
    choose(p) {
      const cands = decisionCandidates(p);
      if (!cands.length) return null;
      const { live, scores } = scoreLive(p, cands);
      return live.length ? live[argmax(scores)] : cands[0];
    },
    pick(p, cands) {
      const { live, scores } = scoreLive(p, cands);
      if (!live.length) return 0;
      return cands.indexOf(live[argmax(scores)]);
    },
    scoreLive,
  };
}

// 추적 플레이 (Phase A-2 게이트): playSolo 와 같은 규칙에 우물 유지·테트리스 기록을 붙인다.
//   우물 = wellDepth(board) ≥ WELL_MIN (한 열이 나머지 열의 최솟값보다 2 이상 낮음 — 테트리스 준비 상태). 연속 배치 구간(run)의 길이와 그 구간 안/끝에서 테트리스가 났는지 기록.
// 반환: playSolo 의 통계 + { wellRuns: [{ length, tetrises }], wellPieces (우물이 있던 조각 수), tetrisPieces (테트리스가 난 조각 번호) }
export function playSoloTracked(agent, { seed, cap = 1000, injector = null, rng = null, wellMin = 2 } = {}) {
  let p = createPlayer(seed);
  const t0 = performance.now();
  const wellRuns = [];
  let run = null, wellPieces = 0;
  const tetrisPieces = [];
  while (p.pieces < cap && !p.dead) {
    const cand = agent.choose(p);
    if (!cand) break;
    const { player, event } = applyDecision(p, cand);
    p = player;
    if (event.linesCleared === 4) { tetrisPieces.push(p.pieces); if (run) run.tetrises++; }
    const depth = p.dead ? 0 : wellDepth(p.board);
    if (depth >= wellMin) { if (!run) run = { start: p.pieces, length: 0, tetrises: 0 }; run.length++; wellPieces++; }
    else if (run) { wellRuns.push(run); run = null; }
    if (injector && !p.dead) p = injector(p, rng, p.pieces);
  }
  if (run) wellRuns.push(run);
  return {
    seed, pieces: p.pieces, survived: p.pieces >= cap, attack: p.stats.attack, sent: p.stats.sent, lines: p.stats.lines, tetris: p.stats.tetris, tspin: p.stats.tspin, tspinMini: p.stats.tspinMini,
    perfectClear: p.stats.perfectClear, maxCombo: p.stats.maxCombo, holds: p.stats.holds, garbageReceived: p.stats.garbageReceived, ms: performance.now() - t0,
    wellRuns, wellPieces, tetrisPieces,
  };
}
