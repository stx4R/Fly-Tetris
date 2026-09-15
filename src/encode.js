// 보드 → 입력층 외부 전류.
//
// 각 입력 뉴런에 10×20 격자 위 수용야(RF) 중심을 결정적으로 배정한다:
//   type 별로 bodyId 오름차순 정렬 → n 개를 nx × ny 부분 격자(nx = ceil(sqrt(n/2)), ny = ceil(n/nx))
//   에 균등 배치. soma 좌표는 쓰지 않는다 (1,360개 null, 망막위상 대응 검증 불가). 이 배정은
//   임의적이며 실제 LC 뉴런의 시야 지도와 무관하다 — README 의 한계 항목.
// RF 는 가우시안(sigma = 2셀), 뉴런별로 200셀 합이 1 이 되게 정규화.
// 셀 값: 빈칸 0, 고정 블록 1.0, 현재 조각(스폰 위치, 회전 0) 2.0.
//   I_ext(i) = G_IN * Σ_cells RF(i, cell) * value(cell)

import { CELLS, HEIGHT, SHAPES, WIDTH } from './tetris.js';

export const SIGMA = 2;
export const G_IN = 0.1;   // RF 전체가 값 1.0 으로 찼을 때 스텝당 ΔV. 정상상태 V = G_IN/(1-e^{-1/20}) ≈ 2.05 V_th
export const VALUE_BLOCK = 1.0;
export const VALUE_PIECE = 2.0;

// 입력 뉴런별 RF 중심 [cx, cy] (셀 단위, 셀 중심 좌표계: 셀 (x, y) 의 중심은 (x + 0.5, y + 0.5))
export function assignCenters(neurons) {
  const input = neurons.map((n, i) => ({ ...n, index: i })).filter((n) => n.layer === 'input');
  const byType = new Map();
  for (const n of input) {
    if (!byType.has(n.type)) byType.set(n.type, []);
    byType.get(n.type).push(n);
  }
  const centers = new Map(); // neuron index → [cx, cy]
  for (const type of [...byType.keys()].sort()) {
    const group = byType.get(type).sort((a, b) => a.id - b.id);
    const n = group.length;
    const nx = Math.max(1, Math.ceil(Math.sqrt(n / 2)));
    const ny = Math.ceil(n / nx);
    group.forEach((neuron, kk) => {
      const i = kk % nx;
      const j = Math.floor(kk / nx);
      centers.set(neuron.index, [((i + 0.5) * WIDTH) / nx, ((j + 0.5) * HEIGHT) / ny]);
    });
  }
  return centers;
}

export function createEncoder(connectome) {
  const N = connectome.neurons.length;
  const centers = assignCenters(connectome.neurons);
  const inputIdx = [...centers.keys()].sort((a, b) => a - b);
  const nInput = inputIdx.length;
  for (let i = 0; i < nInput; i++) if (inputIdx[i] !== i) throw new Error('input neurons must occupy indices 0..nInput-1');

  // rf[cell * nInput + i] : 셀별로 뉴런 축이 연속이라 셀 단위 누적이 빠르다
  const rf = new Float32Array(CELLS * nInput);
  const centerArr = new Float32Array(nInput * 2);
  const inv2s2 = 1 / (2 * SIGMA * SIGMA);
  for (let i = 0; i < nInput; i++) {
    const [cx, cy] = centers.get(i);
    centerArr[2 * i] = cx;
    centerArr[2 * i + 1] = cy;
    let sum = 0;
    for (let c = 0; c < CELLS; c++) {
      const dx = (c % WIDTH) + 0.5 - cx;
      const dy = Math.floor(c / WIDTH) + 0.5 - cy;
      const v = Math.exp(-(dx * dx + dy * dy) * inv2s2);
      rf[c * nInput + i] = v;
      sum += v;
    }
    for (let c = 0; c < CELLS; c++) rf[c * nInput + i] /= sum;
  }

  // 보드 + 현재 조각 → 셀 값 (Float32Array 200)
  function cellValues(board, piece) {
    const values = new Float32Array(CELLS);
    for (let c = 0; c < CELLS; c++) if (board[c]) values[c] = VALUE_BLOCK;
    if (piece !== undefined && piece !== null) {
      const s = SHAPES[piece][0];
      const col = Math.floor((WIDTH - s.w) / 2);
      for (const [dx, dy] of s.cells) values[dy * WIDTH + col + dx] = VALUE_PIECE;
    }
    return values;
  }

  // 전체 N 길이 전류 벡터. 입력층 블록만 0 이 아니다.
  function encode(board, piece) {
    const values = cellValues(board, piece);
    const iExt = new Float32Array(N);
    for (let c = 0; c < CELLS; c++) {
      const v = values[c];
      if (v === 0) continue;
      const base = c * nInput;
      const scale = G_IN * v;
      for (let i = 0; i < nInput; i++) iExt[i] += scale * rf[base + i];
    }
    return iExt;
  }

  return { N, nInput, centers: centerArr, rf, cellValues, encode };
}
