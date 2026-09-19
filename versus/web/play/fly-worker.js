// 8단계 — 초파리 쪽 추론 워커.
//
// 결정 한 번이 265 ms (유휴·wasm 실측, 후보 46개 기준) 라 메인 스레드에서 돌리면 사람의 프레임이 멈춘다.
// 그래서 모델 로드와 착수 결정을 전부 이 워커에서 한다. 메인 스레드는 스냅샷을 보내고 후보를 받는다.
//
// 모델은 data/stage7/c0.model.{bin,json} 그대로다 (Phase A-4′ 학습 결과). 마스크는 connectome.json 을
// 브라우저에서 다시 파싱하지 않고 scripts/build-versus.js 가 구운 추론용 마스크(indptr/indices)를 쓴다 —
// createSparseRNN 은 마스크에서 N·E·nInput·nOutput·outputStart·indptr·indices 만 읽는다 (wUnit 은 학습 초기화용).
//
// 메시지
//   → { type: 'init', base }                     모델·마스크 로드
//   ← { type: 'ready', P, E, backend, loadMs }
//   → { type: 'decide', id, snapshot }           스냅샷으로 착수 결정
//   ← { type: 'decision', id, cand, ms, candidates }   cand 가 null 이면 놓을 자리 없음(탑아웃)

import { createSparseRNN } from '../../src/sparse-rnn.js';
import { createNetAgent } from '../../src/stage7-agent.js';
import { restorePlayer } from './match.js';

let agent = null;
let info = null;

async function loadMask(base) {
  const meta = await (await fetch(`${base}/mask.json`)).json();
  const buf = await (await fetch(`${base}/mask.bin`)).arrayBuffer();
  const indptr = new Int32Array(buf, 0, meta.N + 1);
  const indices = new Int32Array(buf, (meta.N + 1) * 4, meta.E);
  return { N: meta.N, E: meta.E, nInput: meta.nInput, nOutput: meta.nOutput, outputStart: meta.outputStart, indptr, indices, rhoUnit: meta.rhoUnit, condition: meta.condition };
}

async function init(base) {
  const t0 = performance.now();
  const [mask, doc] = await Promise.all([loadMask(base), (await fetch(`${base}/c0.model.json`)).json()]);
  const bin = await (await fetch(`${base}/c0.model.bin`)).arrayBuffer();
  if (bin.byteLength !== doc.P * 4) throw new Error(`c0.model.bin ${bin.byteLength} bytes ≠ 4 × P ${doc.P}`);
  if (mask.N !== doc.mask.N || mask.E !== doc.mask.E) throw new Error(`마스크가 모델과 다르다 (N ${mask.N}/${doc.mask.N}, E ${mask.E}/${doc.mask.E})`);
  const theta = Float64Array.from(new Float32Array(bin, 0, doc.P));
  const model = createSparseRNN(mask, theta, {
    T: doc.spec.T, lr: doc.spec.lr, hidden: doc.spec.hidden,
    dnMean: Float64Array.from(doc.spec.dnMean), dnStd: Float64Array.from(doc.spec.dnStd),
  });
  // 교사가 hold 를 쓴 변형(1ply-hold-garbage)으로 학습했으므로 학생 후보 집합도 hold 를 포함한다.
  agent = createNetAgent(model, { hold: doc.teacher?.hold ?? true });
  info = { P: doc.P, E: mask.E, backend: model.backend, hold: doc.teacher?.hold ?? true, loadMs: Math.round(performance.now() - t0) };
  return info;
}

self.onmessage = async (ev) => {
  const msg = ev.data;
  try {
    if (msg.type === 'init') {
      const r = await init(msg.base);
      self.postMessage({ type: 'ready', ...r });
      return;
    }
    if (msg.type === 'decide') {
      if (!agent) throw new Error('워커가 아직 준비되지 않았다');
      const t0 = performance.now();
      const p = restorePlayer(msg.snapshot);
      const cand = agent.choose(p);
      self.postMessage({
        type: 'decision', id: msg.id, ms: Math.round(performance.now() - t0),
        cand: cand ? { useHold: !!cand.useHold, col: cand.col, rot: cand.rot, top: cand.top, spin: !!cand.spin, kick5: !!cand.kick5 } : null,
      });
      return;
    }
  } catch (e) {
    self.postMessage({ type: 'error', id: msg?.id ?? null, error: String(e?.stack ?? e) });
  }
};
