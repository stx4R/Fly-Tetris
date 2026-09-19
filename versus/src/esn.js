// Plan B: 같은 커넥톰 CSR 위의 누설 레이트 유닛 리저버 (ESN). 스파이킹 모델과 나란히 비교하기 위한 것.
//
//   x(t+1) = (1 - lr) x(t) + lr · tanh(W x(t) + u(t))
//   W      = (rho_target / rho_unit(alpha)) · W_unit(alpha)   (src/spectral.js 와 동일한 단위 CSR, 스펙트럼 반경을 직접 맞춘다)
//   u(t)   = inputScale · I_ext   (입력층 블록만 0 이 아닌 인코더 전류, W_in = 입력층에 대한 항등)
//
// 출력 = 창 동안 출력층(DN) 상태의 평균 (스파이킹 모델의 창 발화 수에 대응). 배치 간 gap 은 u = 0 으로 구동, 'full' 은 x = 0.

import { buildUnitCSR, rhoUnitFor } from './spectral.js';
import { WINDOW } from './reservoir.js';

export function createESN(connectome, params, { spectral } = {}) {
  const { rhoTarget, alpha, lr, inputScale } = params;
  if ('g' in params) throw new Error('g is derived from rhoTarget / rho_unit(alpha); it cannot be given directly');
  if (!(rhoTarget >= 0) || !(lr > 0 && lr <= 1) || !(inputScale >= 0)) throw new Error(`bad ESN params ${JSON.stringify(params)}`);
  if (!spectral) throw new Error('spectral (rho_unit per alpha) is required');

  const N = connectome.neurons.length;
  const layers = connectome.neurons.map((n) => n.layer);
  const nInput = layers.filter((l) => l === 'input').length;
  const nOutput = layers.filter((l) => l === 'output').length;
  const outputStart = N - nOutput;

  const rhoUnit = rhoUnitFor(spectral, alpha);
  const g = rhoTarget / rhoUnit;
  const unit = buildUnitCSR(connectome, alpha);
  const data = new Float64Array(unit.data.length);
  for (let e = 0; e < data.length; e++) data[e] = g * unit.data[e];
  const { indptr, indices } = unit;

  const st = { N, nInput, indptr, indices, data, lr, inputScale, x: new Float64Array(N), pre: new Float64Array(N) };
  const zero = new Float32Array(N);

  const reset = () => st.x.fill(0);
  const step = (iExt) => stepKernel(st, iExt);

  // 같은 입력으로 T 스텝. 출력층 상태의 창 평균 (Float32Array nOutput) + 활동 통계용 상태 스냅샷.
  function run(iExt, T = WINDOW) {
    const dn = new Float64Array(nOutput);
    let absSum = 0, sat = 0;
    for (let t = 0; t < T; t++) {
      step(iExt);
      for (let i = 0; i < nOutput; i++) dn[i] += st.x[outputStart + i];
    }
    for (let i = 0; i < N; i++) { const a = Math.abs(st.x[i]); absSum += a; if (a > 0.9) sat++; }
    return { dn: Float32Array.from(dn, (v) => v / T), meanAbs: absSum / N, saturatedFrac: sat / N };
  }

  function runGap(gap) {
    if (gap === 'full') { reset(); return; }
    for (let t = 0; t < gap; t++) step(zero);
  }

  return { N, nInput, nOutput, outputStart, params: { rhoTarget, alpha, lr, inputScale }, g, rhoUnit, step, run, runGap, reset, state: () => st.x };
}

function stepKernel(st, iExt) {
  const { N, nInput, indptr, indices, data, lr, inputScale, x, pre } = st;
  pre.fill(0);
  for (let j = 0; j < N; j++) {
    const xj = x[j];
    if (xj === 0) continue;
    const end = indptr[j + 1];
    for (let e = indptr[j]; e < end; e++) pre[indices[e]] += data[e] * xj;
  }
  for (let i = 0; i < nInput; i++) pre[i] += inputScale * iExt[i];
  const keep = 1 - lr;
  for (let i = 0; i < N; i++) x[i] = keep * x[i] + lr * Math.tanh(pre[i]);
}
