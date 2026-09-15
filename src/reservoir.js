// 이벤트 구동 LIF 리저버. 커넥톰 간선은 CSR 로 한 번 빌드해 불변으로 쓰고,
// 매 스텝 발화한 뉴런의 출력 간선만 따라가 시냅스 입력을 뿌린다 (밀집 행렬곱 없음).
//
// 이산화 (dt = 1ms, exponential Euler):
//   V(t+1) = V_rest + (V(t) + I_syn(t) - V_rest) * exp(-dt/tau_m) + I_ext + I_inh(t)
//   I_syn(t) = Σ_{j 가 t-1 에 발화} w_eff(j→i)           (1 스텝 지연, 델타 시냅스; 스텝 시작에 도착해 함께 누설)
//   I_inh(t) = -k * (t-1 발화 뉴런 수 / N)                (전역 억제 풀, 전 뉴런 균일)
//   V >= V_th 면 발화, V = V_reset, 이후 refractorySteps 스텝 동안 V_reset 에 고정·입력 무시
//   → 발화 후 최소 3 스텝 뒤에야 다시 발화 가능 (최대 333 Hz, 50 스텝 창에서 최대 17회)
//   w_eff(j→i) = g * weight(j→i) / sqrt(Σ_pre weight(·→i))   (수신 뉴런 총 입력 weight 로 정규화)
//
// 구현 메모: 불응기 뉴런 = 최근 refractorySteps 스텝의 발화 목록. 발화 시 V 를 큰 음수 센티널로 두어
// 밀집 루프에서 임계값을 넘지 못하게 하고, 불응기가 끝나는 스텝 시작에 V_reset 으로 되돌린다.
// 덕분에 뉴런별 불응기 카운터 배열을 매 스텝 읽지 않는다.

export const LIF = { dt: 1, tauM: 20, vRest: 0, vTh: 1, vReset: 0, refractorySteps: 2 };
export const WINDOW = 50; // 배치 결정 하나당 구동 스텝 수

const SENTINEL = -1e9; // 불응기 표시 (어떤 입력 합으로도 V_th 에 못 미치는 값)

// connectome.json → 출력 인접 CSR. 인덱스는 neurons 배열 위치 그대로.
export function buildCSR(connectome, g) {
  const N = connectome.neurons.length;
  const edges = connectome.edges;
  const E = edges.length;
  const inWeight = new Float64Array(N);
  const outDeg = new Int32Array(N);
  for (const [pre, post, w] of edges) { inWeight[post] += w; outDeg[pre]++; }

  const indptr = new Int32Array(N + 1);
  for (let i = 0; i < N; i++) indptr[i + 1] = indptr[i] + outDeg[i];
  const indices = new Int32Array(E);
  const data = new Float32Array(E);
  const fill = indptr.slice(0, N);
  for (const [pre, post, w] of edges) {
    const p = fill[pre]++;
    indices[p] = post;
    data[p] = g * w / Math.sqrt(inWeight[post]);
  }
  return { indptr, indices, data, inWeight };
}

export function createReservoir(connectome, { g, k }) {
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

  const { indptr, indices, data, inWeight } = buildCSR(connectome, g);
  const R = LIF.refractorySteps;

  // 핫 루프 상태. 클로저 캡처 대신 plain object 로 들고 kernel 에 넘긴다 —
  // 인스턴스를 여러 개 만들면 V8 이 클로저 문맥 특화를 버려 몇 배 느려지는 것을 피하기 위해.
  const st = {
    N, nInput, k, indptr, indices, data,
    decay: Math.exp(-LIF.dt / LIF.tauM),
    V: new Float64Array(N),
    // 발화 목록 링: lists[0] = t-1, lists[1] = t-2, …, lists[R] = t-(R+1) (이번 스텝에 복원될 뉴런)
    lists: Array.from({ length: R + 1 }, () => new Int32Array(N)),
    counts: new Int32Array(R + 1),
  };

  function reset() {
    st.V.fill(LIF.vRest);
    st.counts.fill(0);
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
    csr: { indptr, indices, data, inWeight },
    step, run, reset, outputRates,
    voltage: () => st.V,
    refractory,
    pending: () => st.lists[0].subarray(0, st.counts[0]),
  };
}

// 한 스텝의 실제 계산. 상태를 지역 변수로 내려 받아 돌린다.
function stepKernel(st, iExt, counts) {
  const { N, nInput, indptr, indices, data, decay, V, lists } = st;
  const { vRest, vTh } = LIF;
  const R = LIF.refractorySteps;
  const spikeCounts = st.counts;

  // 0. 불응기가 끝나는 뉴런 (R+1 스텝 전 발화) 을 V_reset 으로 복원. 이 버퍼가 이번 스텝의 발화 목록이 된다.
  const cur = lists[R];
  for (let s = 0, m = spikeCounts[R]; s < m; s++) V[cur[s]] = LIF.vReset;

  // 1. 직전 스텝 발화 → 하류로 전파 (이벤트 구동: 발화한 뉴런의 출력 간선만 본다)
  const prev = lists[0];
  const nPrev = spikeCounts[0];
  for (let s = 0; s < nPrev; s++) {
    const j = prev[s];
    const end = indptr[j + 1];
    for (let e = indptr[j]; e < end; e++) V[indices[e]] += data[e];
  }
  const inh = -st.k * nPrev / N;

  // 2. 누설 + 외부 전류(입력층 블록만) + 억제 + 임계값
  let n = 0;
  for (let i = 0; i < nInput; i++) {
    const v = vRest + (V[i] - vRest) * decay + iExt[i] + inh;
    if (v >= vTh) { V[i] = SENTINEL; cur[n++] = i; } else V[i] = v;
  }
  for (let i = nInput; i < N; i++) {
    const v = vRest + (V[i] - vRest) * decay + inh;
    if (v >= vTh) { V[i] = SENTINEL; cur[n++] = i; } else V[i] = v;
  }
  if (counts) for (let s = 0; s < n; s++) counts[cur[s]]++;

  // 3. 링 회전: cur 가 t-1 자리로
  for (let r = R; r > 0; r--) { lists[r] = lists[r - 1]; spikeCounts[r] = spikeCounts[r - 1]; }
  lists[0] = cur;
  spikeCounts[0] = n;
  return n;
}
