// 7단계: 커넥톰 배선 제약 + 가중치 학습. 커넥톰에서 오는 것은 인접 마스크 M 뿐이고, M 이 1 인 위치의 가중치 W 는 학습 파라미터다.
//
//   x(t+1) = (1−lr)·x(t) + lr·tanh((W⊙M)·x(t) + W_in·u + b),   x(0) = 0,  t = 0..T−1 (입력 u 는 후보 afterstate 하나 — T 스텝 동안 고정)
//   DN 창 평균  m = (1/T) Σ_{t=1..T} x(t)[output]  → 표준화 z = (m − dnMean)/dnStd (초기 순전파 통계로 한 번 고정)
//   점수  s = R2·relu(R1·z + r1b) + r2b  (107 → 64 → 1 MLP 리드아웃)
//
// 파라미터 벡터 theta (Float64Array, SharedArrayBuffer 위에 둘 수 있다 — 워커가 같은 메모리를 읽는다):
//   [ W (E, 마스크 위치의 간선 가중치, CSR 순서) | W_in (U_DIM × nInput, 열 우선: 입력 차원 k 의 열이 연속) | b (N) | R1 (h × nOut) | r1b (h) | R2 (h) | r2b (1) ]
// 초기값: W = rhoTarget / rho_unit × w_unit(alpha 1) — 3단계와 같은 정규화의 커넥톰 시냅스 수 (학습이 여기서 얼마나 멀어지는지 재기 위한 기준점).
//   W_in 의 보드 200 열은 3단계 가우시안 RF (뉴런별 합 1) × inputScale, 나머지 56 열(조각·회전·hold·다음·가비지·콤보)은 균등 (−inputRand, inputRand). b = 0.
//   RF 배정은 커넥톰에서 온 것이 아니라 3단계의 임의 선택이므로 W_in 도 학습한다 (고정하면 입구가 병목으로 남는다).
// 마스크 밖 가중치는 애초에 존재하지 않는다 (희소 저장) — 학습 중 M=0 위치가 0 이 아니게 될 경로가 없다 (test/stage7.test.js 가 밀집 복원으로 확인).
//
// 배치 커널: 후보 B 개를 N×B 행렬(뉴런 행, 후보 열 연속)로 한 번에 돈다. 간선 하나당 인덱스·가중치를 한 번만 읽고 B 개의 곱을 펼친 코드를
// B 별로 생성한다 (new Function). 역전파는 CSR 순서 그대로 — dW[e] = Σ_b dPre[post,b]·x[pre,b] 와 dx[pre,:] += w·dPre[post,:] 는 pre 행에서 쓰므로
// 전치(CSC)가 필요 없다. 실측 0.7 ms / 후보·스텝 (순전파 0.38 + 역전파 0.33, B 8–16), 6단계 추정(7.0 ms, B 1 + CSC)의 1/10.
//
// D0 (dense-matched): 마스크 없는 밀집 MLP u → H1 → H2 → H3 → 1, 파라미터 수를 C0 와 정확히 일치 (denseMatchedShape). 같은 인터페이스.

import { createRng } from './prng.js';
import { buildUnitCSR, spectralRadius } from './spectral.js';
import { assignCenters, SIGMA } from './encode.js';
import { CELLS, WIDTH } from './tetris.js';
import { createArena, instantiate as instantiateWasm, wasmAvailable } from './wasm-kernels.js';

// 커널 백엔드: 'js' (B 별 생성 코드) | 'wasm' (f64x2 SIMD, src/wasm-kernels.js; 결과는 덧셈 순서 차이 안에서 같다). 환경변수 SPARSE_RNN_BACKEND 로 기본값을 바꾼다.
export const DEFAULT_BACKEND = process.env.SPARSE_RNN_BACKEND === 'js' ? 'js' : 'wasm'; // wasm 이 없으면 createSparseRNN 이 js 로 내려간다

export const U_DIM = 256;
export const LEAK = 0.33;
export const UNROLL = 25;
export const READOUT_HIDDEN = 64;
export const RHO_TARGET = 1.0;
export const INPUT_SCALE = 1.0;
export const INPUT_RAND = 0.1;
export const MAX_BATCH = 32;

// ---------- 마스크 ----------

// 커넥톰(또는 null model 조건) → 마스크 M: CSR (행 = pre), 단위 가중치 w_unit (alpha 1: 수신 뉴런 총 입력 weight 로 나눔), rho_unit.
// 배열은 SharedArrayBuffer 위에 둔다 (워커 공유).
export function buildMask(connectome) {
  const csr = buildUnitCSR(connectome, 1);
  const { N } = csr;
  const E = csr.indices.length;
  const shared = (Ctor, src) => { const a = new Ctor(new SharedArrayBuffer(src.length * Ctor.BYTES_PER_ELEMENT)); a.set(src); return a; };
  const layers = connectome.neurons.map((n) => n.layer);
  const nInput = layers.filter((l) => l === 'input').length;
  const nOutput = layers.filter((l) => l === 'output').length;
  for (let i = 0; i < nInput; i++) if (layers[i] !== 'input') throw new Error('input neurons must occupy indices 0..nInput-1');
  for (let i = N - nOutput; i < N; i++) if (layers[i] !== 'output') throw new Error('output neurons must occupy the last nOutput indices');
  const r = spectralRadius(csr, { seed: 1 });
  return {
    N, E, nInput, nOutput, outputStart: N - nOutput,
    indptr: shared(Int32Array, csr.indptr), indices: shared(Int32Array, csr.indices), wUnit: shared(Float64Array, csr.data),
    rhoUnit: r.rho, rhoConverged: r.converged,
    layers, neurons: connectome.neurons, condition: connectome.meta?.condition ?? { type: 'C0' },
  };
}

// 간선 e 의 pre 뉴런 (CSR 행) — 분석용
export function edgePre(mask) {
  const pre = new Int32Array(mask.E);
  for (let j = 0; j < mask.N; j++) for (let e = mask.indptr[j]; e < mask.indptr[j + 1]; e++) pre[e] = j;
  return pre;
}

// ---------- 파라미터 배치 ----------

export function sparseLayout(mask, { hidden = READOUT_HIDDEN } = {}) {
  const { E, N, nInput, nOutput } = mask;
  const off = {};
  let p = 0;
  off.W = p; p += E;
  off.Win = p; p += U_DIM * nInput;
  off.b = p; p += N;
  off.R1 = p; p += hidden * nOutput;
  off.r1b = p; p += hidden;
  off.R2 = p; p += hidden;
  off.r2b = p; p += 1;
  return { off, P: p, hidden, sizes: { W: E, Win: U_DIM * nInput, b: N, readout: hidden * nOutput + hidden + hidden + 1 } };
}

// 3단계 가우시안 RF (셀 × 입력 뉴런, 뉴런별 합 1). encode.js 의 createEncoder 와 같은 값 — 여기서는 W_in 초기값으로만 쓴다.
function gaussianRF(neurons, nInput) {
  const centers = assignCenters(neurons);
  const rf = new Float64Array(CELLS * nInput);
  const inv2s2 = 1 / (2 * SIGMA * SIGMA);
  for (let i = 0; i < nInput; i++) {
    const [cx, cy] = centers.get(i);
    let sum = 0;
    for (let c = 0; c < CELLS; c++) {
      const dx = (c % WIDTH) + 0.5 - cx, dy = Math.floor(c / WIDTH) + 0.5 - cy;
      const v = Math.exp(-(dx * dx + dy * dy) * inv2s2);
      rf[c * nInput + i] = v; sum += v;
    }
    for (let c = 0; c < CELLS; c++) rf[c * nInput + i] /= sum;
  }
  return rf;
}

// theta 를 초기화한다 (W = rhoTarget/rhoUnit × w_unit, W_in = RF + 작은 난수, b = 0, 리드아웃 He 초기화). 반환: 초기 W 사본 (Δw 분석용).
export function initSparseTheta(mask, layout, theta, { rhoTarget = RHO_TARGET, inputScale = INPUT_SCALE, inputRand = INPUT_RAND, seed = 1 } = {}) {
  const { off, hidden } = layout;
  const { E, N, nInput, nOutput } = mask;
  const rng = createRng(seed);
  theta.fill(0);
  const g = rhoTarget / mask.rhoUnit;
  for (let e = 0; e < E; e++) theta[off.W + e] = g * mask.wUnit[e];
  const rf = gaussianRF(mask.neurons, nInput);
  for (let c = 0; c < CELLS; c++) for (let i = 0; i < nInput; i++) theta[off.Win + c * nInput + i] = inputScale * rf[c * nInput + i];
  for (let k = CELLS; k < U_DIM; k++) for (let i = 0; i < nInput; i++) theta[off.Win + k * nInput + i] = rng.uniform(-inputRand, inputRand);
  const s1 = Math.sqrt(2 / nOutput) * Math.sqrt(3), s2 = Math.sqrt(1 / hidden) * Math.sqrt(3);
  for (let i = 0; i < hidden * nOutput; i++) theta[off.R1 + i] = rng.uniform(-s1, s1);
  for (let i = 0; i < hidden; i++) theta[off.R2 + i] = rng.uniform(-s2, s2);
  return Float64Array.from(theta.subarray(off.W, off.W + E));
}

// ---------- 커널 생성 (B 별) ----------

const R = (n, f) => Array.from({ length: n }, (_, b) => f(b)).join(' ');
const kernelCache = new Map();

// fwd: pre = W x (CSR 뿌림), xNext = (1−lr) x + lr tanh(pre + I).   bwd: dPre = dNext·lr·(1−a²), dW += Σ_b dPre·x, dx = (1−lr) dNext + Wᵀ dPre, dI += dPre.
export function kernelsFor(B, lr) {
  const key = `${B}:${lr}`;
  if (kernelCache.has(key)) return kernelCache.get(key);
  const keep = 1 - lr;
  const fwdSrc = `
    return function fwd(N, indptr, indices, w, x, I, xNext, pre) {
      pre.fill(0);
      for (let j = 0; j < N; j++) { const xo = j * ${B}; const st = indptr[j], end = indptr[j + 1]; if (st === end) continue;
        ${R(B, (b) => `const x${b} = x[xo + ${b}];`)}
        for (let e = st; e < end; e++) { const io = indices[e] * ${B}, we = w[e]; ${R(B, (b) => `pre[io + ${b}] += we * x${b};`)} } }
      const NB = N * ${B};
      for (let q = 0; q < NB; q++) xNext[q] = ${keep} * x[q] + ${lr} * Math.tanh(pre[q] + I[q]);
    }`;
  const bwdSrc = `
    return function bwd(N, indptr, indices, w, x, xNext, dNext, dPre, dx, dW, dI) {
      const NB = N * ${B};
      for (let q = 0; q < NB; q++) { const a = (xNext[q] - ${keep} * x[q]) * ${1 / lr}; const d = dNext[q] * ${lr} * (1 - a * a); dPre[q] = d; dI[q] += d; dx[q] = ${keep} * dNext[q]; }
      for (let j = 0; j < N; j++) { const xo = j * ${B}; const st = indptr[j], end = indptr[j + 1]; if (st === end) continue;
        ${R(B, (b) => `const x${b} = x[xo + ${b}]; let g${b} = 0;`)}
        for (let e = st; e < end; e++) { const io = indices[e] * ${B}, we = w[e]; let s = 0;
          ${R(B, (b) => `{ const d = dPre[io + ${b}]; s += d * x${b}; g${b} += we * d; }`)} dW[e] += s; }
        ${R(B, (b) => `dx[xo + ${b}] += g${b};`)} }
    }`;
  const k = { fwd: new Function(fwdSrc)(), bwd: new Function(bwdSrc)() };
  kernelCache.set(key, k);
  return k;
}

// ---------- 희소 RNN 모델 ----------

// theta 는 호출자가 준다 (SharedArrayBuffer 위 Float64Array 또는 일반). spec: { T, lr, hidden, dnMean, dnStd, dropoutZ, dropoutH }.
// forward(U, rows, { train }) → { s, cache }; backward(cache, ds, grad) 는 dL/dtheta 를 grad 에 누적. U 는 Float32Array(n × U_DIM), rows 는 행 인덱스 배열.
// 드롭아웃 (Phase A-2): train=true 일 때만 리드아웃 입력 z (dropoutZ) 와 은닉층 h (dropoutH) 에 inverted dropout — 평가·플레이(train=false) 에서는 비활성.
export function createSparseRNN(mask, theta, { T = UNROLL, lr = LEAK, hidden = READOUT_HIDDEN, dnMean = null, dnStd = null, dropoutZ = 0, dropoutH = 0, seed = 1, backend = DEFAULT_BACKEND } = {}) {
  const layout = sparseLayout(mask, { hidden });
  const { off, P } = layout;
  if (theta.length !== P) throw new Error(`theta length ${theta.length} ≠ P ${P}`);
  const { N, E, nInput, nOutput, outputStart, indptr, indices } = mask;
  const W = theta.subarray(off.W, off.W + E);
  const dnM = dnMean ?? new Float64Array(nOutput), dnS = dnStd ?? new Float64Array(nOutput).fill(1);
  const dropRng = createRng(seed * 7919 + 1);
  const dropMask = (n, p) => { const m = new Float64Array(n); const k = 1 / (1 - p); for (let q = 0; q < n; q++) m[q] = dropRng.next() < p ? 0 : k; return m; };
  const keep = 1 - lr;
  // ---- WASM 백엔드: 커널 배열은 WASM 메모리 안에 두고 JS 는 뷰로 접근한다 (grow 뒤 뷰 재생성) ----
  const useWasm = backend === 'wasm' && wasmAvailable();
  let arena = null, wk = null, wv = null;
  const views = []; // { name, off, n, kind: 'f64' | 'i32', set: (arr) => ... }
  if (useWasm) {
    arena = createArena((8 * E * 2 + 4 * E + 4 * (N + 1)) + (N * 8 * 8) * 12);
    wk = instantiateWasm(arena.memory);
    wv = { indptr: arena.alloc(4 * (N + 1)), indices: arena.alloc(4 * E), W: arena.alloc(8 * E), dW: arena.alloc(8 * E) };
    arena.i32(wv.indptr, N + 1).set(indptr); arena.i32(wv.indices, E).set(indices);
    arena.onGrow(() => { for (const v of views) v.arr = v.kind === 'f64' ? arena.f64(v.off, v.n) : arena.i32(v.off, v.n); });
  }
  const wasmArr = (n) => { const off = arena.alloc(8 * n); const v = { off, n, kind: 'f64', arr: null }; v.arr = arena.f64(off, n); views.push(v); return v; };
  const scratch = new Map();
  function scratchFor(B, keepStates) {
    const key = `${B}:${keepStates ? 1 : 0}`;
    if (!scratch.has(key)) {
      const NB = N * B;
      if (useWasm) {
        const mk = () => wasmArr(NB);
        const sc = { I: mk(), pre: mk(), xs: Array.from({ length: keepStates ? T + 1 : 2 }, mk), dPre: mk(), dxA: mk(), dxB: mk(), dI: mk() };
        scratch.set(key, sc);
      } else {
        const mk = () => new Float64Array(NB);
        scratch.set(key, { I: mk(), pre: mk(), xs: Array.from({ length: keepStates ? T + 1 : 2 }, mk), dPre: mk(), dxA: mk(), dxB: mk(), dI: mk() });
      }
    }
    return scratch.get(key);
  }
  // 뷰/배열 접근 (wasm 이면 {arr, off}, js 면 Float64Array)
  const A = (v) => (useWasm ? v.arr : v);
  function tanhStep(x, I, xNext, pre, NB) { for (let q = 0; q < NB; q++) xNext[q] = keep * x[q] + lr * Math.tanh(pre[q] + I[q]); }

  // I[i,b] = b_i + Σ_k W_in[k,i] u_b[k] (i < nInput), b_i (그 외)
  function inputCurrent(U, rows, B, I) {
    for (let i = 0; i < N; i++) { const bi = theta[off.b + i]; const base = i * B; for (let b = 0; b < B; b++) I[base + b] = bi; }
    for (let b = 0; b < B; b++) {
      const u = U.subarray(rows[b] * U_DIM, (rows[b] + 1) * U_DIM);
      for (let k = 0; k < U_DIM; k++) {
        const uk = u[k];
        if (uk === 0) continue;
        const col = off.Win + k * nInput;
        for (let i = 0; i < nInput; i++) I[i * B + b] += theta[col + i] * uk;
      }
    }
  }

  // 리드아웃 순전파: z (B × nOut, 드롭아웃 적용 후) → h (B × hidden, 드롭아웃 mh 적용 후), s (B)
  function readoutForward(z, B, mh) {
    const h = new Float64Array(B * hidden), pre = new Float64Array(B * hidden), s = new Float64Array(B);
    for (let b = 0; b < B; b++) {
      let out = theta[off.r2b];
      for (let q = 0; q < hidden; q++) {
        let a = theta[off.r1b + q];
        const row = off.R1 + q * nOutput, zb = b * nOutput;
        for (let o = 0; o < nOutput; o++) a += theta[row + o] * z[zb + o];
        pre[b * hidden + q] = a;
        const r = (a > 0 ? a : 0) * (mh ? mh[b * hidden + q] : 1);
        h[b * hidden + q] = r;
        out += theta[off.R2 + q] * r;
      }
      s[b] = out;
    }
    return { h, pre, s };
  }

  function forward(U, rowsIn, { keep: keepStates = true, train = false } = {}) {
    const Breal = rowsIn.length;
    if (Breal < 1) throw new Error('empty batch');
    // wasm 커널은 B 가 짝수여야 한다 (f64x2) — 홀수면 마지막 행을 복제해 채우고 결과는 잘라낸다
    const rows = useWasm && (Breal & 1) ? [...rowsIn, rowsIn[Breal - 1]] : rowsIn;
    const B = rows.length;
    const sc = scratchFor(B, keepStates);
    const I = A(sc.I), pre = A(sc.pre);
    inputCurrent(U, rows, B, I);
    const NB = N * B;
    A(sc.xs[0]).fill(0);
    const dn = new Float64Array(B * nOutput);
    const k = useWasm ? null : kernelsFor(B, lr);
    if (useWasm) arena.f64(wv.W, E).set(W);
    let xi = 0;
    for (let t = 0; t < T; t++) {
      const ni = keepStates ? t + 1 : (t + 1) & 1;
      const x = A(sc.xs[xi]), xNext = A(sc.xs[ni]);
      if (useWasm) { pre.fill(0); wk.fwdMatvec(N, wv.indptr, wv.indices, wv.W, sc.xs[xi].off, sc.pre.off, B); tanhStep(x, I, xNext, pre, NB); }
      else k.fwd(N, indptr, indices, W, x, I, xNext, pre);
      for (let o = 0; o < nOutput; o++) { const base = (outputStart + o) * B; for (let b = 0; b < B; b++) dn[b * nOutput + o] += xNext[base + b]; }
      xi = ni;
    }
    const z = new Float64Array(B * nOutput);
    const mz = train && dropoutZ > 0 ? dropMask(B * nOutput, dropoutZ) : null;
    const mh = train && dropoutH > 0 ? dropMask(B * hidden, dropoutH) : null;
    for (let q = 0; q < B * nOutput; q++) { dn[q] /= T; const o = q % nOutput; z[q] = (dnS[o] > 0 ? (dn[q] - dnM[o]) / dnS[o] : 0) * (mz ? mz[q] : 1); }
    const ro = readoutForward(z, B, mh);
    const s = B === Breal ? ro.s : ro.s.slice(0, Breal), dnOut = B === Breal ? dn : dn.slice(0, Breal * nOutput);
    return { s, dn: dnOut, cache: keepStates ? { B, Breal, rows, U, z, mz, mh, h: ro.h, hpre: ro.pre, sc } : null, NB };
  }

  // ds (B) → grad 누적. 커널의 dW 누적은 grad 의 W 구간 뷰에 직접 한다.
  function backward(cache, dsIn, grad) {
    const { B, Breal, rows, U, z, mz, mh, h, hpre, sc } = cache;
    const ds = B === Breal ? dsIn : (() => { const p = new Float64Array(B); p.set(dsIn); return p; })(); // 채운 행은 ds 0 → 기울기 기여 없음
    const k = useWasm ? null : kernelsFor(B, lr);
    const xs = sc.xs, dPre = A(sc.dPre), dI = A(sc.dI);
    const NB = N * B;
    const gW = grad.subarray(off.W, off.W + E);
    // 리드아웃 역전파
    const dz = new Float64Array(B * nOutput);
    for (let b = 0; b < B; b++) {
      const d = ds[b];
      if (d === 0) continue;
      grad[off.r2b] += d;
      for (let q = 0; q < hidden; q++) {
        const r = h[b * hidden + q];
        grad[off.R2 + q] += d * r;
        if (hpre[b * hidden + q] <= 0) continue;
        const g = theta[off.R2 + q] * d * (mh ? mh[b * hidden + q] : 1);
        if (g === 0) continue;
        grad[off.r1b + q] += g;
        const row = off.R1 + q * nOutput, zb = b * nOutput;
        for (let o = 0; o < nOutput; o++) { grad[row + o] += g * z[zb + o]; dz[zb + o] += g * theta[row + o]; }
      }
    }
    // dL/dx_t[output] = dz · (드롭아웃 마스크) / dnStd / T (t = 1..T)
    const inject = new Float64Array(B * nOutput);
    for (let q = 0; q < B * nOutput; q++) { const o = q % nOutput; inject[q] = dnS[o] > 0 ? dz[q] * (mz ? mz[q] : 1) / dnS[o] / T : 0; }
    const addInject = (dx) => { for (let o = 0; o < nOutput; o++) { const base = (outputStart + o) * B; for (let b = 0; b < B; b++) dx[base + b] += inject[b * nOutput + o]; } };
    let dNext = sc.dxA, dx = sc.dxB;
    A(dNext).fill(0); addInject(A(dNext));
    dI.fill(0);
    if (useWasm) { arena.f64(wv.W, E).set(W); arena.f64(wv.dW, E).fill(0); }
    for (let t = T - 1; t >= 0; t--) {
      if (useWasm) {
        wk.bwdPre(NB, xs[t].off, xs[t + 1].off, dNext.off, sc.dPre.off, sc.dI.off, dx.off, keep, lr);
        wk.bwdMatvec(N, wv.indptr, wv.indices, wv.W, xs[t].off, sc.dPre.off, dx.off, wv.dW, B);
      } else k.bwd(N, indptr, indices, W, xs[t], xs[t + 1], dNext, dPre, dx, gW, dI);
      if (t >= 1) addInject(A(dx));
      [dNext, dx] = [dx, dNext];
    }
    if (useWasm) { const dW = arena.f64(wv.dW, E); for (let e = 0; e < E; e++) gW[e] += dW[e]; }
    // dI → db, dW_in
    for (let i = 0; i < N; i++) { let s = 0; const base = i * B; for (let b = 0; b < B; b++) s += dI[base + b]; grad[off.b + i] += s; }
    for (let b = 0; b < B; b++) {
      const u = U.subarray(rows[b] * U_DIM, (rows[b] + 1) * U_DIM);
      for (let kk = 0; kk < U_DIM; kk++) {
        const uk = u[kk];
        if (uk === 0) continue;
        const col = off.Win + kk * nInput;
        for (let i = 0; i < nInput; i++) grad[col + i] += dI[i * B + b] * uk;
      }
    }
  }

  // 큰 배치는 MAX_BATCH 이하로 고르게 나눠 점수만 낸다 (평가·플레이용, 캐시 없음)
  function score(U, rows, { maxBatch = MAX_BATCH } = {}) {
    const out = new Float64Array(rows.length);
    const chunks = Math.ceil(rows.length / maxBatch);
    for (let c = 0, from = 0; c < chunks; c++) {
      const to = Math.min(rows.length, from + Math.ceil((rows.length - from) / (chunks - c)));
      const r = forward(U, rows.slice(from, to), { keep: false });
      out.set(r.s, from);
      from = to;
    }
    return out;
  }
  // DN 창 평균만 (표준화 통계 계산용)
  function dnMeans(U, rows) { return forward(U, rows, { keep: false }).dn; }

  return { kind: 'sparse', mask, layout, off, P, T, lr, hidden, dropoutZ, dropoutH, backend: useWasm ? 'wasm' : 'js', theta, dnMean: dnM, dnStd: dnS, forward, backward, score, dnMeans };
}

// 표본 후보의 DN 창 평균으로 리드아웃 입력 표준화 통계 (상수 DN 은 std 0 → z 0). 초기화 직후 한 번 계산해 모델 상수로 고정한다.
export function calibrateReadout(model, U, rows, { maxBatch = MAX_BATCH } = {}) {
  const { nOutput } = model.mask;
  const mean = new Float64Array(nOutput), sq = new Float64Array(nOutput);
  let n = 0;
  for (let from = 0; from < rows.length; from += maxBatch) {
    const dn = model.dnMeans(U, rows.slice(from, from + maxBatch));
    const B = dn.length / nOutput;
    for (let b = 0; b < B; b++) for (let o = 0; o < nOutput; o++) { const v = dn[b * nOutput + o]; mean[o] += v; sq[o] += v * v; }
    n += B;
  }
  const std = new Float64Array(nOutput);
  let maxStd = 0;
  for (let o = 0; o < nOutput; o++) { mean[o] /= n; std[o] = Math.sqrt(Math.max(0, sq[o] / n - mean[o] * mean[o])); if (std[o] > maxStd) maxStd = std[o]; }
  for (let o = 0; o < nOutput; o++) if (std[o] < maxStd * 1e-6) std[o] = 0;
  model.dnMean.set(mean); model.dnStd.set(std);
  return { mean, std, n };
}

// 밀집 복원 (테스트·소규모 분석용). N×N 행렬, 마스크 밖은 0.
export function denseW(mask, theta, layout) {
  const { N, indptr, indices } = mask;
  const M = new Float64Array(N * N);
  for (let j = 0; j < N; j++) for (let e = indptr[j]; e < indptr[j + 1]; e++) M[j * N + indices[e]] = theta[layout.off.W + e];
  return M;
}

// ---------- D0: 파라미터 수를 맞춘 밀집 MLP ----------

// u(U_DIM) → H1 → H2 → H3 → 1 (ReLU). 파라미터 수 = Σ_l (n_{l−1}+1)·n_l. 정확히 P 가 되는 (H1, H2, H3) 중 폭의 편차(max − min)가 최소인 것.
// (은닉 2층 u→H1→H2→1 은 (H1+2) | (P−1+2·U_DIM+2) 라는 정수 조건이 붙어 P 에 따라 해가 없다 — 실제 C0 의 P 1,067,041 이 그 경우다. 3층은 자유도가 하나 더 있어 항상 해가 있다.)
export function denseMatchedShape(P, inDim = U_DIM) {
  let best = null, bestSpread = Infinity;
  const guess = Math.max(1, Math.floor(Math.sqrt(P / 2)));
  const lo = Math.max(1, Math.floor(guess * 0.5)), hi = Math.ceil(guess * 1.6);
  for (let H1 = lo; H1 <= hi; H1++) {
    for (let H2 = lo; H2 <= hi; H2++) {
      const rest = P - 1 - (inDim + 1) * H1 - (H1 + 1) * H2; // = (H2 + 1)·H3 + H3 = H3·(H2 + 2)
      if (rest <= 0) break;
      if (rest % (H2 + 2) !== 0) continue;
      const H3 = rest / (H2 + 2);
      if (H3 < 1) continue;
      const spread = Math.max(H1, H2, H3) - Math.min(H1, H2, H3);
      if (spread < bestSpread) { bestSpread = spread; best = [H1, H2, H3]; }
    }
  }
  if (!best) throw new Error(`no exact dense shape for P ${P}`);
  return best;
}
export const denseParamCount = (hidden, inDim = U_DIM) => { const sizes = [inDim, ...hidden, 1]; let p = 0; for (let l = 1; l < sizes.length; l++) p += (sizes[l - 1] + 1) * sizes[l]; return p; };

function denseOffsets(hidden, inDim) {
  const sizes = [inDim, ...hidden, 1];
  const layers = [];
  let p = 0;
  for (let l = 1; l < sizes.length; l++) { layers.push({ nIn: sizes[l - 1], nOut: sizes[l], W: p, b: p + sizes[l - 1] * sizes[l] }); p += (sizes[l - 1] + 1) * sizes[l]; }
  return { layers, P: p };
}

// dropoutH: 은닉층 출력마다 inverted dropout (train=true 일 때만) — 희소 모델과 같은 값을 공유한다
export function createDenseMLP(theta, hidden, { inDim = U_DIM, dropoutH = 0, seed = 1 } = {}) {
  const { layers, P } = denseOffsets(hidden, inDim);
  if (theta.length !== P) throw new Error(`theta length ${theta.length} ≠ P ${P}`);
  const L = layers.length;
  const dropRng = createRng(seed * 7919 + 3);
  const dropMask = (n, p) => { const m = new Float64Array(n); const k = 1 / (1 - p); for (let q = 0; q < n; q++) m[q] = dropRng.next() < p ? 0 : k; return m; };
  function forward(U, rows, { keep = true, train = false } = {}) {
    const B = rows.length;
    const acts = [], pres = [], masks = [];
    let a = new Float64Array(B * inDim);
    for (let b = 0; b < B; b++) a.set(U.subarray(rows[b] * inDim, (rows[b] + 1) * inDim), b * inDim);
    acts.push(a);
    for (let l = 0; l < L; l++) {
      const { nIn, nOut, W, b: bo } = layers[l];
      const pre = new Float64Array(B * nOut), out = new Float64Array(B * nOut);
      const m = train && dropoutH > 0 && l < L - 1 ? dropMask(B * nOut, dropoutH) : null;
      for (let b = 0; b < B; b++) {
        const ab = b * nIn;
        for (let q = 0; q < nOut; q++) {
          let v = theta[bo + q];
          const row = W + q * nIn;
          for (let k = 0; k < nIn; k++) { const x = a[ab + k]; if (x !== 0) v += theta[row + k] * x; }
          pre[b * nOut + q] = v; out[b * nOut + q] = l === L - 1 ? v : (v > 0 ? v : 0) * (m ? m[b * nOut + q] : 1);
        }
      }
      pres.push(pre); acts.push(out); masks.push(m); a = out;
    }
    const s = Float64Array.from(a);
    return { s, dn: null, cache: keep ? { B, acts, pres, masks } : null };
  }
  function backward(cache, ds, grad) {
    const { B, acts, pres, masks } = cache;
    let dOut = Float64Array.from(ds); // 마지막 층 출력 (B × 1)
    for (let l = L - 1; l >= 0; l--) {
      const { nIn, nOut, W, b: bo } = layers[l];
      const a = acts[l], pre = pres[l], m = masks[l];
      const dIn = new Float64Array(B * nIn);
      for (let b = 0; b < B; b++) {
        const ab = b * nIn;
        for (let q = 0; q < nOut; q++) {
          let g = dOut[b * nOut + q];
          if (g === 0) continue;
          if (l < L - 1 && pre[b * nOut + q] <= 0) continue;
          if (m) { g *= m[b * nOut + q]; if (g === 0) continue; }
          grad[bo + q] += g;
          const row = W + q * nIn;
          for (let k = 0; k < nIn; k++) { const x = a[ab + k]; if (x !== 0) grad[row + k] += g * x; dIn[ab + k] += g * theta[row + k]; }
        }
      }
      dOut = dIn;
    }
  }
  function score(U, rows) { return forward(U, rows, { keep: false }).s; }
  return { kind: 'dense', hidden, layers, P, dropoutH, theta, forward, backward, score };
}

export function initDenseTheta(theta, hidden, { inDim = U_DIM, seed = 1 } = {}) {
  const rng = createRng(seed);
  const { layers } = denseOffsets(hidden, inDim);
  theta.fill(0);
  layers.forEach(({ nIn, nOut, W }, l) => {
    const s = Math.sqrt((l === layers.length - 1 ? 1 : 2) / nIn) * Math.sqrt(3);
    for (let i = 0; i < nIn * nOut; i++) theta[W + i] = rng.uniform(-s, s);
  });
}
