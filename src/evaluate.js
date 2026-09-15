// 4단계 평가 지표: R², 결정 내 켄달 타우(tau-b), top-1 일치, 부트스트랩 95% 신뢰구간. 순수 함수.

import { createRng } from './prng.js';

export function r2(yTrue, yPred) {
  const n = yTrue.length;
  let mean = 0;
  for (const y of yTrue) mean += y / n;
  let ssRes = 0, ssTot = 0;
  for (let i = 0; i < n; i++) { ssRes += (yTrue[i] - yPred[i]) ** 2; ssTot += (yTrue[i] - mean) ** 2; }
  return ssTot > 0 ? 1 - ssRes / ssTot : 0;
}

// 켄달 타우-b (동점 보정). n ≤ 수십 개인 결정 내 순위용 O(n²).
export function kendallTau(a, b) {
  const n = a.length;
  let conc = 0, disc = 0, tiesA = 0, tiesB = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const da = Math.sign(a[i] - a[j]), db = Math.sign(b[i] - b[j]);
      if (da === 0 && db === 0) continue;
      if (da === 0) { tiesA++; continue; }
      if (db === 0) { tiesB++; continue; }
      if (da === db) conc++; else disc++;
    }
  }
  const denom = Math.sqrt((conc + disc + tiesA) * (conc + disc + tiesB));
  return denom > 0 ? (conc - disc) / denom : 0;
}

// 백분위 부트스트랩. items → statFn(resampledItems) 의 [2.5%, 97.5%].
export function bootstrapCI(items, statFn, { n = 1000, seed = 11 } = {}) {
  const rng = createRng(seed);
  const stats = new Float64Array(n);
  const m = items.length;
  const sample = new Array(m);
  for (let r = 0; r < n; r++) {
    for (let i = 0; i < m; i++) sample[i] = items[rng.int(m)];
    stats[r] = statFn(sample);
  }
  stats.sort();
  return [stats[Math.floor(0.025 * (n - 1))], stats[Math.ceil(0.975 * (n - 1))]];
}

export const median = (arr) => { const s = Float64Array.from(arr).sort(); const n = s.length; return n ? (n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2) : NaN; };
export const quartiles = (arr) => { const s = Float64Array.from(arr).sort(); const q = (p) => s[Math.min(s.length - 1, Math.floor(p * s.length))]; return [q(0.25), median(arr), q(0.75)]; };
export const mean = (arr) => arr.reduce((s, v) => s + v, 0) / arr.length;

// 회귀 성능: 테스트 결정들에 대해 R² (afterstate 단위, 표본 재추출 CI), 결정 내 타우 평균, top-1 일치 (결정 단위 CI).
// decisions: [{ trueValues: number[], predValues: number[], chosenIdx }]
export function regressionMetrics(decisions, { seed = 11 } = {}) {
  const yTrue = [], yPred = [];
  for (const d of decisions) { yTrue.push(...d.trueValues); yPred.push(...d.predValues); }
  const pairs = yTrue.map((y, i) => [y, yPred[i]]);
  const taus = decisions.map((d) => kendallTau(d.trueValues, d.predValues));
  const hits = decisions.map((d) => {
    let best = 0;
    for (let i = 1; i < d.predValues.length; i++) if (d.predValues[i] > d.predValues[best]) best = i;
    return d.trueValues[best] >= d.trueValues[d.chosenIdx] - 1e-9 ? 1 : 0; // 동점 최적도 인정
  });
  return {
    r2: r2(yTrue, yPred),
    r2CI: bootstrapCI(pairs, (s) => r2(s.map((p) => p[0]), s.map((p) => p[1])), { seed }),
    tau: mean(taus),
    tauCI: bootstrapCI(taus, mean, { seed: seed + 1 }),
    top1: mean(hits),
    top1CI: bootstrapCI(hits, mean, { seed: seed + 2 }),
    decisions: decisions.length, afterstates: yTrue.length,
  };
}

// 플레이 성능: 게임별 { lines, pieces } → 중앙값·사분위·CI
export function playMetrics(games, { seed = 11 } = {}) {
  const lines = games.map((g) => g.lines), pieces = games.map((g) => g.pieces);
  return {
    games: games.length,
    linesMedian: median(lines), linesQuartiles: quartiles(lines), linesMean: mean(lines),
    linesMedianCI: bootstrapCI(lines, median, { seed }),
    piecesMedian: median(pieces), piecesQuartiles: quartiles(pieces), piecesMean: mean(pieces),
    piecesMedianCI: bootstrapCI(pieces, median, { seed: seed + 1 }),
    capped: games.filter((g) => g.capped).length,
  };
}

// 두 신뢰구간이 겹치는가 (겹치면 "차이 없음")
export const ciOverlap = (a, b) => !(a[1] < b[0] || b[1] < a[0]);
