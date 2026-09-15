// DN 발화율 (nOutput) → 행동 (col, rot). 선형 리드아웃 nOutput × 40, 불법 배치 마스킹 후 argmax.
// 2단계에서는 시드 기반 랜덤 초기화만 한다. 학습은 3단계.

import { ACTIONS, actionFromIndex, actionIndex } from './tetris.js';
import { createRng } from './prng.js';

export function createDecoder({ nOutput, seed = 1, weights = null }) {
  const W = new Float32Array(nOutput * ACTIONS); // W[o * ACTIONS + a]
  if (weights) {
    if (weights.length !== W.length) throw new Error(`weights length ${weights.length} != ${W.length}`);
    W.set(weights);
  } else {
    const rng = createRng(seed);
    const scale = 1 / Math.sqrt(nOutput);
    for (let i = 0; i < W.length; i++) W[i] = rng.uniform(-scale, scale);
  }

  // rates: Float32Array(nOutput). legal: [{col, rot}]. 합법 배치가 없으면 null.
  // 동점은 낮은 행동 인덱스.
  function decode(rates, legal) {
    if (legal.length === 0) return null;
    const logits = new Float32Array(ACTIONS);
    for (let o = 0; o < nOutput; o++) {
      const r = rates[o];
      if (r === 0) continue;
      const base = o * ACTIONS;
      for (let a = 0; a < ACTIONS; a++) logits[a] += r * W[base + a];
    }
    let best = -1;
    let bestVal = -Infinity;
    for (const { col, rot } of legal) {
      const a = actionIndex(col, rot);
      if (logits[a] > bestVal || (logits[a] === bestVal && a < best)) { bestVal = logits[a]; best = a; }
    }
    return { action: best, ...actionFromIndex(best), logits };
  }

  return {
    nOutput,
    W,
    decode,
    toJSON: () => ({ nOutput, nActions: ACTIONS, layout: 'W[o * nActions + a]', data: Array.from(W) }),
  };
}

export function decoderFromJSON(json) {
  if (json.nActions !== ACTIONS) throw new Error(`nActions ${json.nActions} != ${ACTIONS}`);
  return createDecoder({ nOutput: json.nOutput, weights: json.data });
}
