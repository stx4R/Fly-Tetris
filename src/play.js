// afterstate 에이전트와 플레이 루프. 결정마다 모든 합법 후보의 결과 보드를 리저버(후보마다 완전 리셋)에 넣어 DN 벡터를 얻고,
// 학습된 리드아웃으로 스칼라 가치를 매겨 argmax (동점은 낮은 행동 인덱스). 기준선: 무작위 배치 / 교사(Dellacherie).

import { createRng } from './prng.js';
import { applyPlacement, createBag, emptyBoard, legalPlacements } from './tetris.js';
import { createEncoder } from './encode.js';
import { WINDOW, createReservoir } from './reservoir.js';
import { candidateAfterstates } from './afterstate.js';
import { bestPlacement } from './heuristic.js';

// 리드아웃 입력 5개 (C6 활동량 전용 통제): 총 스파이크 수, 발화 DN 수, 평균 발화율, 중앙 발화율, 상위 1% 점유율. 창 발화 수에서 계산.
export function activitySummary(counts, N, outputStart, T = WINDOW) {
  let total = 0, dnActive = 0;
  for (let i = 0; i < N; i++) total += counts[i];
  for (let i = outputStart; i < N; i++) if (counts[i]) dnActive++;
  const sorted = Uint16Array.from(counts).sort();
  const med = N % 2 ? sorted[(N - 1) / 2] : (sorted[N / 2 - 1] + sorted[N / 2]) / 2;
  const nTop = Math.max(1, Math.round(N * 0.01));
  let top = 0;
  for (let i = N - nTop; i < N; i++) top += sorted[i];
  const scale = 1000 / T;
  return Float32Array.from([total, dnActive, total / N * scale, med * scale, total > 0 ? top / total : 0]);
}

// 리저버 특징 추출기: board → 리드아웃 입력 (mode 'dn' = DN 발화율 107, 'activity' = 요약 5)
export function createFeaturizer(connectome, params, spectral, { mode = 'dn' } = {}) {
  const res = createReservoir(connectome, params, { spectral });
  const enc = createEncoder(connectome);
  function featurize(board) {
    res.reset();
    const { counts } = res.run(enc.encode(board), WINDOW);
    return mode === 'activity' ? activitySummary(counts, res.N, res.outputStart) : res.outputRates(counts);
  }
  // 두 모드를 한 번에 (C0 특징 추출 시 C6 요약도 같이)
  function featurizeBoth(board) {
    res.reset();
    const { counts } = res.run(enc.encode(board), WINDOW);
    return { dn: res.outputRates(counts), activity: activitySummary(counts, res.N, res.outputStart), counts };
  }
  return { featurize, featurizeBoth, reservoir: res, dim: mode === 'activity' ? 5 : res.nOutput };
}

// value(x) 는 특징 벡터 → 스칼라. 에이전트: choose(board, piece) → { col, rot, action } | null
export function createAgent(featurize, value) {
  return {
    choose(board, piece) {
      const cands = candidateAfterstates(board, piece);
      if (cands.length === 0) {
        const legal = legalPlacements(board, piece);
        return legal.length ? { ...legal[0], action: legal[0].col * 4 + legal[0].rot } : null; // 전부 게임오버 배치 → 아무거나
      }
      let best = null, bestVal = -Infinity;
      for (const c of cands) {
        const v = value(featurize(c.board));
        if (v > bestVal || (v === bestVal && c.action < best.action)) { bestVal = v; best = c; }
      }
      return { col: best.col, rot: best.rot, action: best.action };
    },
  };
}

export const randomAgent = (rng) => ({
  choose(board, piece) { const legal = legalPlacements(board, piece); return legal.length ? legal[rng.int(legal.length)] : null; },
});
export const teacherAgent = () => ({
  choose(board, piece) { const b = bestPlacement(board, piece); return b ? { col: b.col, rot: b.rot } : null; },
});

// 한 게임. cap 조각 상한. 반환 { pieces, lines, capped, ms }
export function playGame(agent, { seed, cap = 2000 } = {}) {
  const rng = createRng(seed);
  const bag = createBag(rng);
  let board = emptyBoard();
  let pieces = 0, lines = 0;
  const t0 = performance.now();
  while (pieces < cap) {
    const piece = bag.next();
    const mv = agent.choose(board, piece);
    if (!mv) break;
    const r = applyPlacement(board, piece, mv.col, mv.rot);
    if (r.gameOver) break;
    board = r.board;
    lines += r.linesCleared;
    pieces++;
  }
  return { seed, pieces, lines, capped: pieces >= cap, ms: performance.now() - t0 };
}
