// 캘리브레이션 지표. 순수 함수.

// 창 발화 수 배열들(뉴런 N 개 × 창 B 개) → 발화 통계
//   meanRateHz     전 뉴런·전 창 평균 발화율 (허브에 끌려간다)
//   medianRateHz   뉴런별 평균 발화율의 중앙값
//   activeFrac     창당 최소 1회 발화한 뉴런 비율 (창 평균)
//   ceilingFrac    창당 ceilingAt 회 이상 발화 = 불응기 한계 근처(≥ 300 Hz) 비율. 폭주 하드 제약.
//                  (2단계의 "20회 이상 포화" 는 2ms 불응기·50스텝 창에서 도달 불가(최대 17회)라 삭제)
//   topSpikeShare  총 발화 수 기준 상위 topFrac(1%) 뉴런이 차지하는 전체 발화 비율. 승자독식의 직접 측정치.
export function spikeStats(countsList, N, T, { ceilingAt = 15, topFrac = 0.01 } = {}) {
  const B = countsList.length;
  const perNeuron = new Float64Array(N);
  let total = 0, active = 0, ceiling = 0;
  for (const counts of countsList) {
    for (let i = 0; i < N; i++) {
      const c = counts[i];
      perNeuron[i] += c;
      total += c;
      if (c > 0) active++;
      if (c >= ceilingAt) ceiling++;
    }
  }
  const secPerWindow = T / 1000;
  const sorted = Float64Array.from(perNeuron).sort();
  const median = N % 2 ? sorted[(N - 1) / 2] : (sorted[N / 2 - 1] + sorted[N / 2]) / 2;
  const nTop = Math.max(1, Math.round(N * topFrac));
  let top = 0;
  for (let i = N - nTop; i < N; i++) top += sorted[i];
  return {
    meanRateHz: total / (B * N) / secPerWindow,
    medianRateHz: median / B / secPerWindow,
    activeFrac: active / (B * N),
    ceilingFrac: ceiling / (B * N),
    topSpikeShare: total > 0 ? top / total : 0,
  };
}

// 벡터들의 평균 쌍별 코사인 거리 (1 - cos). 영벡터끼리는 0, 영벡터와 비영벡터는 1.
export function meanPairwiseCosineDistance(vectors) {
  const n = vectors.length;
  if (n < 2) return 0;
  const norms = vectors.map((v) => Math.hypot(...v));
  let sum = 0;
  for (let a = 0; a < n; a++) {
    for (let b = a + 1; b < n; b++) {
      const na = norms[a], nb = norms[b];
      if (na === 0 && nb === 0) continue;
      if (na === 0 || nb === 0) { sum += 1; continue; }
      let dot = 0;
      const va = vectors[a], vb = vectors[b];
      for (let i = 0; i < va.length; i++) dot += va[i] * vb[i];
      sum += 1 - dot / (na * nb);
    }
  }
  return sum / (n * (n - 1) / 2);
}

// 대칭 행렬 (Float64Array n×n, row-major) 의 고유값. 순환 Jacobi. 입력은 복사해서 쓴다.
export function symmetricEigenvalues(A, n, { maxSweeps = 100, tol = 1e-14 } = {}) {
  const a = Float64Array.from(A);
  for (let sweep = 0; sweep < maxSweeps; sweep++) {
    let off = 0;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += a[p * n + q] ** 2;
    let diag = 0;
    for (let p = 0; p < n; p++) diag += a[p * n + p] ** 2;
    if (off <= tol * tol * Math.max(diag, 1e-300)) break;
    for (let p = 0; p < n; p++) {
      for (let q = p + 1; q < n; q++) {
        const apq = a[p * n + q];
        if (apq === 0) continue;
        const app = a[p * n + p], aqq = a[q * n + q];
        const theta = (aqq - app) / (2 * apq);
        const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
        const c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let kk = 0; kk < n; kk++) {
          const akp = a[kk * n + p], akq = a[kk * n + q];
          a[kk * n + p] = c * akp - s * akq;
          a[kk * n + q] = s * akp + c * akq;
        }
        for (let kk = 0; kk < n; kk++) {
          const apk = a[p * n + kk], aqk = a[q * n + kk];
          a[p * n + kk] = c * apk - s * aqk;
          a[q * n + kk] = s * apk + c * aqk;
        }
      }
    }
  }
  const ev = new Float64Array(n);
  for (let p = 0; p < n; p++) ev[p] = a[p * n + p];
  return ev.sort((x, y) => y - x);
}

// 행렬 X (rows: 벡터 배열, 각 길이 d) 의 유효 랭크 = 특이값 σ > relTol · σ_max 인 개수. 보조 지표.
// Gram 행렬 XᵀX (d×d) 의 고유값 λ = σ² 로 계산하므로 σ 기준 relTol 은 λ 기준 relTol² 이다.
export function effectiveRank(rows, relTol = 1e-6) {
  if (rows.length === 0) return 0;
  const d = rows[0].length;
  const G = new Float64Array(d * d);
  for (const r of rows) {
    for (let i = 0; i < d; i++) {
      const ri = r[i];
      if (ri === 0) continue;
      for (let j = i; j < d; j++) G[i * d + j] += ri * r[j];
    }
  }
  for (let i = 0; i < d; i++) for (let j = i + 1; j < d; j++) G[j * d + i] = G[i * d + j];
  const ev = symmetricEigenvalues(G, d);
  const lmax = ev[0];
  if (!(lmax > 0)) return 0;
  const cut = lmax * relTol * relTol;
  let rank = 0;
  for (const l of ev) if (l > cut) rank++;
  return rank;
}
