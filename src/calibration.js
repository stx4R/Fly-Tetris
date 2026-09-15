// 캘리브레이션 v2 절차: 무작위 보드 + 교사 라벨 생성, 파라미터 한 점의 동작 지표·프로브 평가, 하드 제약.
// scripts/calibrate.js 가 시드 랜덤 탐색을 돌린다.

import { createRng } from './prng.js';
import { ACTIONS, CELLS, PIECES, actionIndex, applyPlacement, createBag, emptyBoard, legalPlacements } from './tetris.js';
import { bestPlacement } from './heuristic.js';
import { WINDOW, createReservoir } from './reservoir.js';
import { createESN } from './esn.js';
import { effectiveRank, meanPairwiseCosineDistance, spikeStats } from './metrics.js';
import { runProbes } from './probe.js';

export const FEATURE_NAMES = ['landingHeight', 'erodedPieceCells', 'rowTransitions', 'columnTransitions', 'holes', 'cumulativeWells'];

// 하드 제약. 통과한 점 중 프로브 (b) top-1 최대를 고른다.
export const HARD = {
  ceilingFrac: 0.05,        // 창 내 ≥15회 발화 비율 < 5%
  topSpikeShare: 0.30,      // 상위 1% 뉴런의 발화 점유율 < 30%
  dnActive: 40,             // 한 번이라도 발화한 DN 수 ≥ 40 / 107
  medianRateHz: [0.5, 40],  // 뉴런별 평균 발화율의 중앙값
};
export const GATE_MARGIN = 0.10; // 최종 게이트: 프로브 (b) top-1 − 셔플 통제군 ≥ +10%p (절대)

// 실제 플레이 분포에 가까운 보드 + 교사 라벨: 시드 게임을 Dellacherie 0.7 / 무작위 합법 배치 0.3 혼합 정책으로
// 0..maxPieces 조각 진행한 뒤의 보드와 그 다음 조각. 게임오버가 나면 그 직전 보드를 쓴다.
// 각 표본: { board, piece, action (교사 선택, 0..39), features (교사 배치의 Dellacherie 6특징), legal (합법 행동 인덱스) }
export function generateBoards(count, { seed = 2026, maxPieces = 80 } = {}) {
  const rng = createRng(seed);
  const samples = [];
  while (samples.length < count) {
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
    const best = bestPlacement(board, piece);
    if (!best) continue; // 합법 배치 없음 (실질적으로 안 나온다)
    samples.push({
      board, piece,
      action: actionIndex(best.col, best.rot),
      features: FEATURE_NAMES.map((k) => best.features[k]),
      legal: legalPlacements(board, piece).map(({ col, rot }) => actionIndex(col, rot)),
    });
  }
  return samples;
}

// 참조 프로브: 같은 릿지 프로브를 리저버 대신 원 입력(보드 200셀 + 조각 one-hot 7)에 적용한다.
// 선형 리드아웃이 이 과제에서 애초에 얼마나 할 수 있는지의 상한 참조 — 게이트(+10%p)가 달성 가능한지 판단하는 기준.
export function inputReference(samples, { seed = 1 } = {}) {
  const X = samples.map((s) => {
    const x = new Float64Array(CELLS + PIECES.length);
    for (let c = 0; c < CELLS; c++) x[c] = s.board[c];
    x[CELLS + s.piece] = 1;
    return x;
  });
  const pr = runProbes(X, samples, ACTIONS, { seed });
  return { top1: pr.top1, controlTop1: pr.control.top1, top1Margin: pr.top1Margin, majorityTop1: pr.majorityTop1, featuresR2: pr.featuresR2, controlFeaturesR2: pr.control.featuresR2, perFeatureR2: pr.perFeatureR2 };
}

export function checkHard(m) {
  const [lo, hi] = HARD.medianRateHz;
  const checks = {
    ceiling: m.ceilingFrac < HARD.ceilingFrac,
    topShare: m.topSpikeShare < HARD.topSpikeShare,
    dnActive: m.dnEverActive >= HARD.dnActive,
    median: m.medianRateHz >= lo && m.medianRateHz <= hi,
  };
  return { ...checks, all: Object.values(checks).every(Boolean), met: Object.values(checks).filter(Boolean).length };
}

// 파라미터 한 점을 평가. iExts 는 표본 순서대로 미리 인코딩한 전류 벡터.
// 프로토콜: 리셋 한 번 → 표본을 순서대로 [gap 구간 → 창 T] 연속 구동 (플레이와 동일).
// earlyAbort: 처음 abortAfter 창에서 ceilingFrac 이 하드 제약의 abortFactor 배를 넘으면 중단 (하드 제약은 어차피 탈락).
// probe: true/false 또는 (지표 → boolean) 함수 — 지표를 본 뒤 프로브를 돌릴지 정한다.
export function evaluatePoint(connectome, spectral, samples, iExts, params, {
  T = WINDOW, gap = 0, probe = true, seed = 1, earlyAbort = true, abortAfter = 40, abortFactor = 2,
} = {}) {
  const res = createReservoir(connectome, params, { spectral });
  res.reset();
  const countsList = [];
  const dnRates = [];
  let aborted = false;
  const t0 = performance.now();
  for (let s = 0; s < iExts.length; s++) {
    res.runGap(gap);
    const { counts } = res.run(iExts[s], T);
    countsList.push(counts);
    dnRates.push(res.outputRates(counts, T));
    if (earlyAbort && countsList.length === abortAfter && countsList.length < iExts.length) {
      const partial = spikeStats(countsList, res.N, T);
      if (partial.ceilingFrac > HARD.ceilingFrac * abortFactor) { aborted = true; break; }
    }
  }
  const msPerPlacement = (performance.now() - t0) / countsList.length;
  const stats = spikeStats(countsList, res.N, T);
  const dnEverActive = countsList.reduce((set, c) => {
    for (let i = res.outputStart; i < res.N; i++) if (c[i]) set.add(i);
    return set;
  }, new Set()).size;
  const m = {
    ...params, gap, g: res.g,
    ...stats, dnEverActive,
    separation: meanPairwiseCosineDistance(dnRates),
    rank: effectiveRank(dnRates),
    msPerPlacement, boards: countsList.length, aborted,
  };
  m.hard = checkHard(m);
  const wantProbe = typeof probe === 'function' ? probe(m) : probe;
  if (wantProbe && !aborted) m.probe = runProbes(dnRates, samples.slice(0, countsList.length), ACTIONS, { seed });
  return m;
}

// Plan B 의 하드 제약 (스파이킹 제약의 레이트 모델 대응): 포화(|x| > 0.9) 비율 < 5% (≈ ceilingFrac), 활성 DN ≥ 40,
// 분리도(DN 상태의 평균 쌍별 코사인 거리) ≥ 0.01 — 입력과 무관한 고정점으로 붕괴한 점(모든 보드가 같은 DN 상태)을 거른다.
export const HARD_ESN = { saturatedFrac: 0.05, dnActive: HARD.dnActive, separation: 0.01 };

export function checkHardESN(m) {
  const checks = {
    saturated: m.saturatedFrac < HARD_ESN.saturatedFrac,
    dnActive: m.dnEverActive >= HARD_ESN.dnActive,
    separation: m.separation >= HARD_ESN.separation,
  };
  return { ...checks, all: Object.values(checks).every(Boolean), met: Object.values(checks).filter(Boolean).length };
}

// Plan B: ESN 한 점을 같은 프로토콜·프로브로 평가.
export function evaluateESNPoint(connectome, spectral, samples, iExts, params, { T = WINDOW, gap = 0, probe = true, seed = 1 } = {}) {
  const esn = createESN(connectome, params, { spectral });
  esn.reset();
  const dnStates = [];
  let meanAbs = 0, saturated = 0;
  const dnActive = new Set();
  const t0 = performance.now();
  for (let s = 0; s < iExts.length; s++) {
    esn.runGap(gap);
    const r = esn.run(iExts[s], T);
    dnStates.push(r.dn);
    meanAbs += r.meanAbs / iExts.length;
    saturated += r.saturatedFrac / iExts.length;
    for (let i = 0; i < esn.nOutput; i++) if (Math.abs(r.dn[i]) > 1e-6) dnActive.add(i);
  }
  const msPerPlacement = (performance.now() - t0) / iExts.length;
  const m = {
    ...params, gap, g: esn.g, model: 'esn',
    meanAbs, saturatedFrac: saturated, dnEverActive: dnActive.size,
    separation: meanPairwiseCosineDistance(dnStates), rank: effectiveRank(dnStates),
    msPerPlacement, boards: iExts.length,
  };
  m.hard = checkHardESN(m);
  if (probe) m.probe = runProbes(dnStates, samples, ACTIONS, { seed });
  return m;
}

