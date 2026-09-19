// 이벤트 구동 LIF 리저버 (3단계). 커넥톰 간선은 CSR 로 한 번 빌드해 불변으로 쓰고,
// 매 스텝 발화한 뉴런의 출력 간선만 따라가 시냅스 입력을 뿌린다 (밀집 행렬곱 없음).
//
// 파라미터 { rhoTarget, alpha, b, kLocal, kGlobal } — g 는 직접 받지 않는다:
//   g = rhoTarget / rho_unit(alpha),  rho_unit 은 src/spectral.js (data/spectral.json) 의 거듭제곱법 결과
//   w_eff(j→i) = g * weight(j→i) / (Σ_pre weight(·→i))^alpha
//
// 이산화 (dt = 1ms, exponential Euler). 스텝 t 에서 V(t+1) 을 만든다:
//   V(t+1) = V_rest + (V(t) + I_syn(t) - V_rest) * exp(-dt/tau_m) - a_i(t) * (1 - exp(-dt/tau_m)) + I_ext + I_inh(t)
//   I_syn(t) = Σ_{j 가 t-1 에 발화} w_eff(j→i)                      (1 스텝 지연, 델타 시냅스; 스텝 시작에 도착해 함께 누설)
//   a_i(t)   = 스파이크 빈도 적응(SFA). 전압 단위: 막전위가 V_rest - a_i 로 이완한다
//              (dV/dt = (-(V - V_rest) - a_i)/tau_m 의 exponential Euler; 스텝당 -a_i(1-e^{-dt/tau_m}) ≈ -a_i/20)
//   a_i(t+1) = a_i(t) * exp(-dt/tau_a) + b * spike_i(t)             (tau_a = 100 ms 고정, b 는 탐색축)
//   I_inh(t) = -kLocal * rate_pool(ROI(i)) - kGlobal * rate_global   (지역 풀 + 전역 풀, 스텝당 증분)
//     rate_pool   = t-1 에 그 ROI 에서 발화한 뉴런 수 / ROI 뉴런 수, roi == null 인 뉴런은 전역 항만
//     rate_global = t-1 발화 뉴런 수 / N
//   V >= V_th 면 발화, V = V_reset, 이후 refractorySteps 스텝 동안 V_reset 에 고정·입력 무시 (적응도 무시, a_i 는 계속 감쇠)
//   → 발화 후 최소 3 스텝 뒤에야 다시 발화 가능 (최대 333 Hz, 50 스텝 창에서 최대 17회)
//
// SFA 의 갱신은 이벤트 구동이다: 증분은 발화한 뉴런에만, 감쇠·소거는 a_i ≠ 0 인 뉴런 목록(adapt list)에만 한다.
// a_i < b * SFA.flush 로 떨어지면 정확히 0 으로 내리고 목록에서 뺀다 (모델의 일부; 이 규칙까지 포함해 naive 매스텝
// 갱신과 비트 수준으로 같다 — test/reservoir.test.js). 밀집 루프는 aVal[i] 를 한 번 읽어 뺄 뿐이다 (a_i 는 매 스텝
// V 갱신에 들어가므로 "마지막 갱신 스텝 기록 후 닫힌형 지수 보정" 으로 미룰 곳이 없고, 닫힌형 pow 는 naive 곱셈열과
// 비트가 어긋난다).
//
// 구현 메모: 불응기 뉴런 = 최근 refractorySteps 스텝의 발화 목록. 발화 시 V 를 큰 음수 센티널로 두어
// 밀집 루프에서 임계값을 넘지 못하게 하고, 불응기가 끝나는 스텝 시작에 V_reset 으로 되돌린다.

import { buildUnitCSR, rhoUnitFor } from './spectral.js';

export const LIF = { dt: 1, tauM: 20, vRest: 0, vTh: 1, vReset: 0, refractorySteps: 2 };
export const SFA = { tauA: 100, flush: 1e-4 }; // a_i < b * flush → 0
export const WINDOW = 50; // 배치 결정 하나당 구동 스텝 수
export const GAPS = [0, 25, 50, 'full']; // 배치 간 감쇠 구간 선택지

const SENTINEL = -1e9; // 불응기 표시 (어떤 입력 합으로도 V_th 에 못 미치는 값)

// 뉴런별 ROI 풀 인덱스. roi == null 은 인덱스 R (여분 슬롯, 지역 억제 0).
export function buildRoiPools(connectome) {
  const N = connectome.neurons.length;
  const names = [...new Set(connectome.neurons.map((n) => n.roi).filter((r) => r !== null))].sort();
  const index = new Map(names.map((r, i) => [r, i]));
  const R = names.length;
  const roiIdx = new Int32Array(N);
  const nRoi = new Int32Array(R + 1);
  for (let i = 0; i < N; i++) {
    const r = connectome.neurons[i].roi;
    roiIdx[i] = r === null ? R : index.get(r);
    nRoi[roiIdx[i]]++;
  }
  return { names, R, roiIdx, nRoi };
}

export function createReservoir(connectome, params, { spectral } = {}) {
  const { rhoTarget, alpha, b = 0, kLocal = 0, kGlobal = 0 } = params;
  if ('g' in params) throw new Error('g is derived from rhoTarget / rho_unit(alpha); it cannot be given directly');
  if (!(rhoTarget >= 0)) throw new Error(`rhoTarget must be >= 0, got ${rhoTarget}`);
  if (!spectral) throw new Error('spectral (rho_unit per alpha) is required; run `npm run spectral`');
  for (const [name, v] of Object.entries({ b, kLocal, kGlobal })) if (!(v >= 0)) throw new Error(`${name} must be >= 0, got ${v}`);

  const N = connectome.neurons.length;
  const layers = connectome.neurons.map((n) => n.layer);
  const nInput = layers.filter((l) => l === 'input').length;
  const nOutput = layers.filter((l) => l === 'output').length;
  const outputStart = N - nOutput;
  // 뉴런 순서 가정: input 블록 → hidden → output 블록 (connectome.js 가 보장)
  for (let i = 0; i < N; i++) {
    const expect = i < nInput ? 'input' : i < outputStart ? 'hidden' : 'output';
    if (layers[i] !== expect) throw new Error(`neurons must be ordered input/hidden/output (index ${i} is ${layers[i]})`);
  }

  const rhoUnit = rhoUnitFor(spectral, alpha);
  const g = rhoTarget / rhoUnit;
  const unit = buildUnitCSR(connectome, alpha);
  const data = new Float64Array(unit.data.length);
  for (let e = 0; e < data.length; e++) data[e] = g * unit.data[e];
  const { indptr, indices, inWeight } = unit;
  const pools = buildRoiPools(connectome);
  const R = LIF.refractorySteps;

  // 핫 루프 상태. 클로저 캡처 대신 plain object 로 들고 kernel 에 넘긴다 —
  // 인스턴스를 여러 개 만들면 V8 이 클로저 문맥 특화를 버려 몇 배 느려지는 것을 피하기 위해.
  const st = {
    N, nInput, indptr, indices, data,
    kLocal, kGlobal, b,
    decay: Math.exp(-LIF.dt / LIF.tauM),
    cA: 1 - Math.exp(-LIF.dt / LIF.tauM), // 적응 전압 → 스텝당 증분
    decayA: Math.exp(-LIF.dt / SFA.tauA),
    flushA: b * SFA.flush,
    V: new Float64Array(N),
    // 발화 목록 링: lists[0] = t-1, lists[1] = t-2, …, lists[R] = t-(R+1) (이번 스텝에 복원될 뉴런)
    lists: Array.from({ length: R + 1 }, () => new Int32Array(N)),
    counts: new Int32Array(R + 1),
    // ROI 풀
    roiIdx: pools.roiIdx, nRoi: pools.nRoi, nPools: pools.R,
    roiSpikes: new Int32Array(pools.R + 1),
    inhRoi: new Float64Array(pools.R + 1),
    // SFA: 값 + 0 이 아닌 뉴런 목록
    aVal: new Float64Array(N),
    adapt: new Int32Array(N),
    adaptPos: new Int32Array(N).fill(-1), // 목록 내 위치, 없으면 -1
    adaptCount: 0,
  };
  const zero = new Float32Array(N);

  function reset() {
    st.V.fill(LIF.vRest);
    st.counts.fill(0);
    st.aVal.fill(0);
    st.adaptPos.fill(-1);
    st.adaptCount = 0;
  }

  // 한 스텝. counts 가 있으면 발화 뉴런의 카운트를 올린다. 이번 스텝 발화 수를 돌려준다.
  const step = (iExt, counts) => stepKernel(st, iExt, counts);

  // 같은 외부 전류로 T 스텝 구동. 창 동안 뉴런별 발화 수 (Uint16Array N) 를 돌려준다. 상태는 이어진다.
  function run(iExt, T = WINDOW) {
    const counts = new Uint16Array(N);
    let total = 0;
    for (let t = 0; t < T; t++) total += step(iExt, counts);
    return { counts, total };
  }

  // 배치 간 감쇠 구간: 외부 입력 0 으로 gap 스텝, 'full' 이면 완전 리셋. 그동안의 발화 수를 돌려준다.
  function runGap(gap) {
    if (gap === 'full') { reset(); return 0; }
    let total = 0;
    for (let t = 0; t < gap; t++) total += step(zero);
    return total;
  }

  // 창 발화 수 → 출력층(DN) 발화율 Hz
  function outputRates(counts, T = WINDOW) {
    const r = new Float32Array(nOutput);
    const scale = 1000 / (T * LIF.dt);
    for (let i = 0; i < nOutput; i++) r[i] = counts[outputStart + i] * scale;
    return r;
  }

  // 검사용: 불응기 중인 뉴런 마스크
  function refractory() {
    const m = new Uint8Array(N);
    for (let r = 0; r < R; r++) for (let s = 0; s < st.counts[r]; s++) m[st.lists[r][s]] = 1;
    return m;
  }

  return {
    N, nInput, nOutput, outputStart,
    params: { rhoTarget, alpha, b, kLocal, kGlobal, tauA: SFA.tauA }, g, rhoUnit,
    csr: { indptr, indices, data, inWeight },
    pools,
    step, run, runGap, reset, outputRates,
    voltage: () => st.V,
    adaptation: () => st.aVal,
    adaptCount: () => st.adaptCount,
    refractory,
    pending: () => st.lists[0].subarray(0, st.counts[0]),
  };
}

// 한 스텝의 실제 계산. 상태를 지역 변수로 내려 받아 돌린다.
function stepKernel(st, iExt, counts) {
  const { N, nInput, indptr, indices, data, decay, cA, V, lists, roiIdx, roiSpikes, inhRoi, nRoi, nPools, aVal, adapt, adaptPos } = st;
  const { vRest, vTh } = LIF;
  const R = LIF.refractorySteps;
  const spikeCounts = st.counts;

  // 0. 불응기가 끝나는 뉴런 (R+1 스텝 전 발화) 을 V_reset 으로 복원. 이 버퍼가 이번 스텝의 발화 목록이 된다.
  const cur = lists[R];
  for (let s = 0, m = spikeCounts[R]; s < m; s++) V[cur[s]] = LIF.vReset;

  // 1. 직전 스텝 발화 → 하류로 전파 (이벤트 구동: 발화한 뉴런의 출력 간선만 본다) + ROI 별 발화 수
  const prev = lists[0];
  const nPrev = spikeCounts[0];
  roiSpikes.fill(0);
  for (let s = 0; s < nPrev; s++) {
    const j = prev[s];
    roiSpikes[roiIdx[j]]++;
    const end = indptr[j + 1];
    for (let e = indptr[j]; e < end; e++) V[indices[e]] += data[e];
  }
  const inhG = -st.kGlobal * nPrev / N;
  if (st.kLocal > 0) {
    for (let r = 0; r < nPools; r++) inhRoi[r] = -st.kLocal * roiSpikes[r] / nRoi[r];
  }
  // inhRoi[nPools] (roi null) 은 항상 0

  // 2. 누설 + 적응 + 외부 전류(입력층 블록만) + 억제 + 임계값
  let n = 0;
  for (let i = 0; i < nInput; i++) {
    const v = vRest + (V[i] - vRest) * decay - aVal[i] * cA + iExt[i] + inhG + inhRoi[roiIdx[i]];
    if (v >= vTh) { V[i] = SENTINEL; cur[n++] = i; } else V[i] = v;
  }
  for (let i = nInput; i < N; i++) {
    const v = vRest + (V[i] - vRest) * decay - aVal[i] * cA + inhG + inhRoi[roiIdx[i]];
    if (v >= vTh) { V[i] = SENTINEL; cur[n++] = i; } else V[i] = v;
  }
  if (counts) for (let s = 0; s < n; s++) counts[cur[s]]++;

  // 3. SFA 갱신 (이벤트 구동): 목록의 뉴런만 감쇠·소거, 발화한 뉴런만 증분 (목록 진입)
  if (st.b > 0) {
    const decayA = st.decayA, flushA = st.flushA, b = st.b;
    let m = st.adaptCount;
    for (let s = 0; s < m;) {
      const i = adapt[s];
      const a = aVal[i] * decayA;
      if (a < flushA) {
        aVal[i] = 0;
        m--;
        const last = adapt[m];   // 마지막 원소를 s 자리로 (last === i 인 경우도 아래 순서로 -1 이 남는다)
        adapt[s] = last;
        adaptPos[last] = s;
        adaptPos[i] = -1;
      } else {
        aVal[i] = a;
        s++;
      }
    }
    for (let s = 0; s < n; s++) {
      const i = cur[s];
      if (adaptPos[i] < 0) { adaptPos[i] = m; adapt[m++] = i; }
      aVal[i] += b;
    }
    st.adaptCount = m;
  }

  // 4. 링 회전: cur 가 t-1 자리로
  for (let r = R; r > 0; r--) { lists[r] = lists[r - 1]; spikeCounts[r] = spikeCounts[r - 1]; }
  lists[0] = cur;
  spikeCounts[0] = n;
  return n;
}
