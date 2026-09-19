// 유효 가중치 행렬의 스펙트럼 반경. 리저버의 g 는 여기서 구한 rho_unit 으로만 유도된다 (g = rho_target / rho_unit).
//
// W_unit(alpha): w(j→i) = weight(j→i) / (Σ_pre weight(·→i))^alpha   (g = 1 일 때의 유효 가중치)
//   alpha = 0.5 : 2단계 정규화 (총 입력 weight 의 제곱근)
//   alpha = 1.0 : 총 입력 weight 로 나눔 → 모든 뉴런의 입력 가중치 합이 1
//
// 거듭제곱법: x ← A x / ‖A x‖, A = W_unitᵀ (동역학 연산자: 발화 벡터 x → 시냅스 입력 y, y[post] += w·x[pre]).
// 가중치가 전부 양수라 Perron-Frobenius 로 지배 고유값은 실수·양수이고, 양의 초기 벡터에서 ‖A x_k‖ 가 그 값으로 수렴한다.
// 수렴 판정: ‖A x‖ 의 상대 변화가 tol 미만으로 3회 연속. 수렴 실패 시(복소 지배쌍 등으로 진동) 마지막 window 회의
// Rayleigh 몫 xᵀAx 이동 평균을 근사치로 쓰고 converged: false 를 명시한다.

import { createRng } from './prng.js';

// connectome.json → 출력 인접 CSR (행 = pre). 인덱스는 neurons 배열 위치 그대로. 가중치는 g 를 곱하기 전 단위값.
export function buildUnitCSR(connectome, alpha) {
  if (!(alpha >= 0)) throw new Error(`alpha must be a non-negative number, got ${alpha}`);
  const N = connectome.neurons.length;
  const edges = connectome.edges;
  const E = edges.length;
  const inWeight = new Float64Array(N);
  const outDeg = new Int32Array(N);
  for (const [pre, post, w] of edges) { inWeight[post] += w; outDeg[pre]++; }

  const indptr = new Int32Array(N + 1);
  for (let i = 0; i < N; i++) indptr[i + 1] = indptr[i] + outDeg[i];
  const indices = new Int32Array(E);
  const data = new Float64Array(E);
  const fill = indptr.slice(0, N);
  for (const [pre, post, w] of edges) {
    const p = fill[pre]++;
    indices[p] = post;
    data[p] = w / Math.pow(inWeight[post], alpha);
  }
  return { N, alpha, indptr, indices, data, inWeight };
}

// y = A x = W_unitᵀ x (in-place into y)
export function applyTranspose(csr, x, y) {
  const { N, indptr, indices, data } = csr;
  y.fill(0);
  for (let j = 0; j < N; j++) {
    const xj = x[j];
    if (xj === 0) continue;
    const end = indptr[j + 1];
    for (let e = indptr[j]; e < end; e++) y[indices[e]] += data[e] * xj;
  }
}

export function spectralRadius(csr, { maxIter = 500, tol = 1e-6, seed = 1, window = 50, streak = 3 } = {}) {
  const { N } = csr;
  const rng = createRng(seed);
  let x = new Float64Array(N);
  let y = new Float64Array(N);
  for (let i = 0; i < N; i++) x[i] = rng.uniform(0.5, 1.5);
  normalize(x);

  const rayleigh = [];
  let lambda = 0;
  let prev = NaN;
  let stable = 0;
  let converged = false;
  let iterations = 0;
  for (let it = 1; it <= maxIter; it++) {
    iterations = it;
    applyTranspose(csr, x, y);
    let dot = 0;
    for (let i = 0; i < N; i++) dot += x[i] * y[i];
    lambda = normalize(y);          // ‖A x‖ (x 는 단위벡터)
    rayleigh.push(dot);             // xᵀ A x
    if (lambda === 0) { converged = true; break; } // 영행렬
    stable = Math.abs(lambda - prev) <= tol * lambda ? stable + 1 : 0;
    prev = lambda;
    [x, y] = [y, x];
    if (stable >= streak) { converged = true; break; }
  }

  if (converged) return { rho: lambda, rayleigh: rayleigh[rayleigh.length - 1], converged, iterations };
  const tail = rayleigh.slice(-window);
  const avg = tail.reduce((s, v) => s + v, 0) / tail.length;
  return {
    rho: avg, rayleigh: avg, converged, iterations,
    lastNorm: lambda,
    note: `power iteration did not converge in ${maxIter} iterations; rho is the mean Rayleigh quotient over the last ${tail.length}`,
  };
}

function normalize(v) {
  let s = 0;
  for (let i = 0; i < v.length; i++) s += v[i] * v[i];
  const n = Math.sqrt(s);
  if (n > 0) for (let i = 0; i < v.length; i++) v[i] /= n;
  return n;
}

export const ALPHAS = [0.5, 1.0];

// alpha 별 rho_unit. data/spectral.json 의 내용이자 createReservoir 가 받는 형태.
export function computeSpectral(connectome, opts = {}) {
  const byAlpha = {};
  for (const alpha of ALPHAS) {
    const csr = buildUnitCSR(connectome, alpha);
    const t0 = performance.now();
    const r = spectralRadius(csr, opts);
    byAlpha[String(alpha)] = { alpha, rhoUnit: r.rho, criticalG: 1 / r.rho, ...r, ms: Math.round(performance.now() - t0) };
    delete byAlpha[String(alpha)].rho;
  }
  return byAlpha;
}

// spectral.json → rhoUnit 조회. 없는 alpha 는 에러 (g 를 직접 넣는 우회로를 두지 않는다).
export function rhoUnitFor(spectral, alpha) {
  const entry = spectral?.[String(alpha)];
  if (!entry || !(entry.rhoUnit > 0)) throw new Error(`spectral data has no rhoUnit for alpha=${alpha}; run \`npm run spectral\``);
  return entry.rhoUnit;
}
