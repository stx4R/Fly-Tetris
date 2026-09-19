// 7단계 학습 수학 (순수 함수): Adam + 전역 노름 클리핑 + 코사인 감쇠, 학습된 W 의 커넥톰 초기값 대비 변화량 분석.
// 학습 루프 자체(워커 풀·에폭·조기 종료)는 scripts/stage7-lib.js — 여기는 워커 없이 테스트할 수 있는 부분만.

import { bootstrapCI, mean } from './evaluate.js';
import { edgePre } from './sparse-rnn.js';

// Phase A-2 (2026-09-17): mixed negatives · 학습 24k · DAgger 5 × 4k (조기 중단) · AdamW 감쇠 + 드롭아웃 · 값 마진 가중 λ (파일럿으로 선택). 전 조건 공유.
export const HYPER = {
  loss: 'pairwise', K: 8, negatives: 'mixed', hardNegatives: 3, batch: 32, lr: 1e-3, lrMin: 0, clip: 5, beta1: 0.9, beta2: 0.999, eps: 1e-8,
  weightDecay: 0.01, dropoutZ: 0.1, dropoutH: 0.2,   // 정규화 — C0 에서 한 번 정해 전 조건 공유 (AdamW 식 분리 감쇠 × lr; 드롭아웃은 리드아웃 입력 z 와 은닉층, 평가 시 비활성)
  lambda: 2,                                         // 값 마진 가중 (A-2 파일럿 선택; data/stage7/lambda-choice.json 이 있으면 그 값)
  mu: 0,                                             // 구멍 페널티 계수 (Phase A-3: μ ∈ {0, 1, 4} 파일럿 → data/stage7/mu-choice.json)
  selectBy: 'relRegret', valFullDecisions: 2000,     // 에폭 최선·조기 종료 기준 = valFull(전체 후보 2,000 결정) 의 상대 regret (Phase A-3; 이전엔 val 손실)
  trainDecisions: 24000, valDecisions: 4000,
  maxEpochs: 15, patience: 3,                 // 라운드 0 (Phase B 도 동일)
  daggerRounds: 2, daggerDecisions: 4000, daggerCap: 250, ftLr: 5e-4, ftMaxEpochs: 5, ftPatience: 2, // DAgger 재학습 (warm start); A-3: 2 라운드 (분포 이동은 병목이 아님)
  quickGames: 5, earlyStopRounds: 2,          // 라운드마다 5 게임 조각 수 중앙값; 2 라운드 연속 개선이 CI 안에서 0 이면 남은 라운드 건너뜀
  rhoTarget: 1.0, T: 25, leak: 0.33, hidden: 64, seed: 1,
};
// Phase B 예산 축소 (사용자 결정, 2026-09-18): null 시드 2 → 1, 학습 결정 24k → 12k (전 조건 동일 — C0 도 12k 로 다시 학습), 8 h 초과면 C4·C5 부터 제외 (C1·C3·D0 는 유지).
export const PHASE_B = { trainDecisions: 12000, valDecisions: 4000, nullSeeds: 1, budgetHours: 8, expectedEpochs: 10 };

// 전역 L2 노름 클리핑 (in place). 반환 { norm, clipped }
export function clipGradient(grad, clip) {
  let s = 0;
  for (let p = 0; p < grad.length; p++) s += grad[p] * grad[p];
  const norm = Math.sqrt(s);
  if (clip > 0 && norm > clip) { const f = clip / norm; for (let p = 0; p < grad.length; p++) grad[p] *= f; return { norm, clipped: true }; }
  return { norm, clipped: false };
}

// 코사인 감쇠: step ∈ [0, total] → lr
export const cosineLr = (lr0, lrMin, step, total) => (total <= 0 ? lr0 : lrMin + 0.5 * (lr0 - lrMin) * (1 + Math.cos(Math.PI * Math.min(1, step / total))));

// Adam (+ AdamW 식 분리 가중치 감쇠: decayRanges 의 파라미터에 theta −= lr·wd·theta — 편향은 제외)
export function createAdam(P, { beta1 = HYPER.beta1, beta2 = HYPER.beta2, eps = HYPER.eps, weightDecay = 0, decayRanges = [] } = {}) {
  const m = new Float64Array(P), v = new Float64Array(P);
  let t = 0;
  return {
    m, v, get t() { return t; }, weightDecay, decayRanges,
    step(theta, grad, lr) {
      t++;
      const c1 = 1 - beta1 ** t, c2 = 1 - beta2 ** t;
      for (let p = 0; p < P; p++) {
        const g = grad[p];
        m[p] = beta1 * m[p] + (1 - beta1) * g;
        v[p] = beta2 * v[p] + (1 - beta2) * g * g;
        theta[p] -= lr * (m[p] / c1) / (Math.sqrt(v[p] / c2) + eps);
      }
      if (weightDecay > 0) { const f = 1 - lr * weightDecay; for (const [a, b] of decayRanges) for (let p = a; p < b; p++) theta[p] *= f; }
    },
    reset() { m.fill(0); v.fill(0); t = 0; },
    restore(mm, vv, tt) { m.set(mm); v.set(vv); t = tt; }, // 에폭 체크포인트 재개
  };
}

// ---------- DAgger 조기 중단 ----------
// quick: 라운드별 { round, pieces: [게임별 조각 수] } (같은 시드 순서 → 짝지은 차이). 라운드 r 의 개선 = mean_i (pieces_r[i] − pieces_{r−1}[i]),
// 부트스트랩 95% CI 가 0 을 포함하면 "개선이 CI 안에서 0". 그런 라운드가 consecutive 번 연속이면 중단.
export function daggerImprovement(prev, cur, { seed = 21 } = {}) {
  const n = Math.min(prev.length, cur.length);
  const d = Array.from({ length: n }, (_, i) => cur[i] - prev[i]);
  const ci = bootstrapCI(d, mean, { seed });
  return { delta: mean(d), deltaCI: ci, zeroInCI: ci[0] <= 0 && ci[1] >= 0, improved: ci[0] > 0, n };
}
export function shouldStopDagger(quick, { consecutive = HYPER.earlyStopRounds } = {}) {
  const flags = [];
  for (let i = 1; i < quick.length; i++) { const imp = daggerImprovement(quick[i - 1].pieces, quick[i].pieces); flags.push({ round: quick[i].round, ...imp }); }
  let run = 0;
  for (const f of flags) run = f.improved ? 0 : run + 1;
  return { stop: run >= consecutive, run, flags };
}

// ---------- 학습된 W vs 커넥톰 초기값 ----------

const pearson = (a, b) => {
  const n = a.length; let ma = 0, mb = 0;
  for (let i = 0; i < n; i++) { ma += a[i]; mb += b[i]; }
  ma /= n; mb /= n;
  let sab = 0, saa = 0, sbb = 0;
  for (let i = 0; i < n; i++) { const da = a[i] - ma, db = b[i] - mb; sab += da * db; saa += da * da; sbb += db * db; }
  return saa > 0 && sbb > 0 ? sab / Math.sqrt(saa * sbb) : 0;
};
const percentile = (sorted, p) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))];
const summarize = (idx, w0, w1) => {
  const n = idx.length;
  if (!n) return null;
  const d = new Float64Array(n), a = new Float64Array(n), b = new Float64Array(n);
  let neg = 0, flipped = 0, rel = 0, nRel = 0;
  for (let q = 0; q < n; q++) {
    const e = idx[q]; a[q] = w0[e]; b[q] = w1[e]; d[q] = Math.abs(w1[e] - w0[e]);
    if (w1[e] < 0) neg++; if (w1[e] * w0[e] < 0) flipped++;
    if (Math.abs(w0[e]) > 1e-6) { rel += d[q] / Math.abs(w0[e]); nRel++; } // 상대 변화는 초기값이 사실상 0 인 항 (RF 꼬리) 을 뺀다
  }
  const ds = Float64Array.from(d).sort();
  return {
    edges: n, meanAbsDelta: mean(d), medianAbsDelta: percentile(ds, 0.5), p90AbsDelta: percentile(ds, 0.9), p99AbsDelta: percentile(ds, 0.99), maxAbsDelta: ds[n - 1],
    meanRelDelta: nRel ? rel / nRel : 0, relEdges: nRel, inhibitoryFrac: neg / n, signFlipFrac: flipped / n, corr: pearson(a, b),
    meanInit: mean(a), meanFinal: mean(b),
  };
};

// mask (buildMask), w0 = 초기 W (E), w1 = 학습된 W (E). 전체 · 층 블록별 (pre층>post층) · post 뉴런 ROI 별 (간선 수 상위) · KC 관련.
export function analyzeWeights(mask, w0, w1, { topRois = 12 } = {}) {
  const { E, N, indptr, indices, layers, neurons } = mask;
  const pre = edgePre(mask);
  const all = Array.from({ length: E }, (_, e) => e);
  const byBlock = {}, byRoi = {}, byPreRoi = {};
  for (let e = 0; e < E; e++) {
    const j = pre[e], i = indices[e];
    const bk = `${layers[j]}>${layers[i]}`;
    (byBlock[bk] ??= []).push(e);
    const roi = neurons[i].roi ?? 'null';
    (byRoi[roi] ??= []).push(e);
    const proi = neurons[j].roi ?? 'null';
    (byPreRoi[proi] ??= []).push(e);
  }
  const kcEdges = [], nonKc = [];
  for (let e = 0; e < E; e++) (neurons[pre[e]].isKC || neurons[indices[e]].isKC ? kcEdges : nonKc).push(e);
  // 뉴런별 (post 기준) 총 |Δw| — 가장 많이 바뀐 뉴런
  const perPost = new Float64Array(N);
  for (let e = 0; e < E; e++) perPost[indices[e]] += Math.abs(w1[e] - w0[e]);
  const topNeurons = Array.from({ length: N }, (_, i) => i).sort((a, b) => perPost[b] - perPost[a]).slice(0, 10).map((i) => ({ index: i, type: neurons[i].type, layer: layers[i], roi: neurons[i].roi, sumAbsDelta: perPost[i], inDegree: 0 }));
  for (const t of topNeurons) { let c = 0; for (let e = 0; e < E; e++) if (indices[e] === t.index) c++; t.inDegree = c; }
  const roiRows = Object.entries(byRoi).sort((a, b) => b[1].length - a[1].length).slice(0, topRois).map(([roi, idx]) => ({ roi, ...summarize(idx, w0, w1) }));
  const roiByChange = Object.entries(byRoi).filter(([, idx]) => idx.length >= 500).map(([roi, idx]) => ({ roi, ...summarize(idx, w0, w1) })).sort((a, b) => b.meanAbsDelta - a.meanAbsDelta).slice(0, topRois);
  let norm0 = 0, norm1 = 0;
  for (let e = 0; e < E; e++) { norm0 += w0[e] * w0[e]; norm1 += w1[e] * w1[e]; }
  return {
    overall: summarize(all, w0, w1),
    norms: { init: Math.sqrt(norm0), final: Math.sqrt(norm1) },
    byBlock: Object.fromEntries(Object.entries(byBlock).sort().map(([k, idx]) => [k, summarize(idx, w0, w1)])),
    byPostRoi: roiRows, byPostRoiMostChanged: roiByChange,
    byPreRoiMostChanged: Object.entries(byPreRoi).filter(([, idx]) => idx.length >= 500).map(([roi, idx]) => ({ roi, ...summarize(idx, w0, w1) })).sort((a, b) => b.meanAbsDelta - a.meanAbsDelta).slice(0, topRois),
    kc: { kcEdges: summarize(kcEdges, w0, w1), otherEdges: summarize(nonKc, w0, w1) },
    topPostNeurons: topNeurons,
  };
}

// W_in 변화: 보드 200 열 (RF 초기값) 과 나머지 56 열
export function analyzeInputWeights(win0, win1, nInput, { boardCols = 200 } = {}) {
  const nb = boardCols * nInput;
  const board = Array.from({ length: nb }, (_, q) => q), rest = Array.from({ length: win0.length - nb }, (_, q) => nb + q);
  return { board: summarize(board, win0, win1), other: summarize(rest, win0, win1) };
}
