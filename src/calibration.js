// 캘리브레이션 절차: 무작위 보드 생성 + (g, k) 한 점의 동작 지표. scripts/calibrate.js 가 격자를 돌린다.

import { createRng } from './prng.js';
import { applyPlacement, createBag, emptyBoard, legalPlacements } from './tetris.js';
import { bestPlacement } from './heuristic.js';
import { WINDOW, createReservoir } from './reservoir.js';
import { effectiveRank, meanPairwiseCosineDistance, spikeStats } from './metrics.js';

export const TARGETS = {
  meanRateHz: [1, 20],   // 평균 발화율 범위
  saturatedFrac: 0.05,   // 창 내 20회 이상 발화 비율 상한
  activeFrac: 0.30,      // 창 내 1회 이상 발화 비율 하한
  rank: 50,              // DN 발화율 행렬 유효 랭크 하한
};

// 실제 플레이 분포에 가까운 보드: 시드 게임을 Dellacherie 0.7 / 무작위 합법 배치 0.3 혼합 정책으로
// 0..maxPieces 조각 진행한 뒤의 보드와 그 다음 조각. 게임오버가 나면 그 직전 보드를 쓴다.
export function generateBoards(count, { seed = 2026, maxPieces = 80 } = {}) {
  const rng = createRng(seed);
  const boards = [];
  while (boards.length < count) {
    const bag = createBag(rng);
    let board = emptyBoard();
    const len = rng.int(maxPieces + 1);
    let piece = bag.next();
    for (let p = 0; p < len; p++) {
      const legal = legalPlacements(board, piece);
      if (legal.length === 0) break;
      const mv = rng.next() < 0.7 ? bestPlacement(board, piece) : legal[rng.int(legal.length)];
      const r = applyPlacement(board, piece, mv.col, mv.rot);
      if (r.gameOver) break;
      board = r.board;
      piece = bag.next();
    }
    boards.push({ board, piece });
  }
  return boards;
}

// (g, k) 한 점을 평가. iExts 는 미리 인코딩한 전류 벡터 (보드 순서 고정).
// 프로토콜: 리셋 한 번 → 보드를 순서대로 창 T 씩 연속 구동 (플레이와 동일, 배치 간 리셋 없음).
export function evaluatePoint(connectome, iExts, { g, k }, T = WINDOW) {
  const res = createReservoir(connectome, { g, k });
  res.reset();
  const countsList = [];
  const dnRates = [];
  const t0 = performance.now();
  for (const iExt of iExts) {
    const { counts } = res.run(iExt, T);
    countsList.push(counts);
    dnRates.push(res.outputRates(counts, T));
  }
  const msPerWindow = (performance.now() - t0) / iExts.length;
  const stats = spikeStats(countsList, res.N, T);
  const separation = meanPairwiseCosineDistance(dnRates);
  const rank = effectiveRank(dnRates);
  const dnEverActive = countsList.reduce((set, c) => {
    for (let i = res.outputStart; i < res.N; i++) if (c[i]) set.add(i);
    return set;
  }, new Set()).size;
  return { g, k, ...stats, separation, rank, dnEverActive, msPerWindow };
}

export function meetsTargets(m) {
  const [lo, hi] = TARGETS.meanRateHz;
  return m.meanRateHz >= lo && m.meanRateHz <= hi
    && m.saturatedFrac < TARGETS.saturatedFrac
    && m.activeFrac > TARGETS.activeFrac
    && m.rank > TARGETS.rank;
}
