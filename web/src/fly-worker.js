// 8단계 — 초파리 쪽 추론 워커 (esbuild 가 dist/fly-worker.js 로 따로 묶는다, 클래식 워커).
//
// 결정 한 번이 265 ms (유휴·wasm, 후보 46개 기준) 라 메인 스레드에서 돌리면 사람의 프레임이 멈춘다.
// 그래서 모델 로드·착수 결정·기록용 계측을 전부 이 워커에서 한다.
//
// 모델은 data/stage7/c0.model.{bin,json} 그대로다 (Phase A-4′ 학습 결과). 마스크는 connectome.json 을
// 브라우저에서 다시 파싱하지 않고 scripts/build-versus.js 가 구운 추론용 마스크(indptr/indices)를 쓴다.
//
// 착수를 고르면서 화면이 나중에 보여줄 것까지 같이 뽑는다 (한 결정에 한 번만 계산한다):
//   · 후보별 모델 점수 s 와 DN 창평균 107개            ← model.forward 가 둘 다 돌려준다
//   · 후보별 교사 점수                                  ← 학생이 모방하도록 학습된 바로 그 교사 (depth 1)
//   · 고른 후보의 스텝별 뉴런 활성 (표본 뉴런만)        ← 추가 순전파 1회 (B=1, keep=true)
// 이 세 가지가 커넥톰 · 결정 탐색 · 신경 활동 · 플레이 분석 화면의 원천이다. 없는 값은 만들지 않는다.
//
// 메시지
//   → { type:'init', base, sampled }              모델·마스크·교사 로드 (sampled = 트레이스를 남길 뉴런 인덱스)
//   ← { type:'ready', P, E, backend, loadMs, T, nOutput, hold }
//   → { type:'decide', id, snapshot, detail }     스냅샷으로 착수 결정 (detail 이면 기록용 계측까지)
//   ← { type:'decision', id, cand, ms, detail }   cand 가 null 이면 놓을 자리 없음(탑아웃)

import { createSparseRNN, U_DIM } from '../../src/sparse-rnn.js';
import { encodeAfterstate } from '../../src/stage7-data.js';
import { applyDecision, decisionCandidates } from '../../src/tetris.js';
import { createTeacher, currentPieceCandidates } from '../../src/teacher-attack.js';
import { restorePlayer } from '../play/match.js';
import { packBoard, quantize } from './pack.js';

let model = null, teacher = null, info = null;
let hold = true;
let sampled = null;           // Int32Array — 트레이스를 남길 뉴런 (커넥톰 3D 표본과 같은 인덱스)

// 후보 U 행렬 재사용 버퍼
let U = new Float32Array(64 * U_DIM);
let rows = Array.from({ length: 64 }, (_, i) => i);
function ensure(n) {
  if (n * U_DIM > U.length) { U = new Float32Array(n * 2 * U_DIM); rows = Array.from({ length: n * 2 }, (_, i) => i); }
}

async function loadMask(base) {
  const meta = await (await fetch(`${base}/mask.json`)).json();
  const buf = await (await fetch(`${base}/mask.bin`)).arrayBuffer();
  const indptr = new Int32Array(buf, 0, meta.N + 1);
  const indices = new Int32Array(buf, (meta.N + 1) * 4, meta.E);
  return { N: meta.N, E: meta.E, nInput: meta.nInput, nOutput: meta.nOutput, outputStart: meta.outputStart, indptr, indices, rhoUnit: meta.rhoUnit, condition: meta.condition };
}

async function init(base, sampledIdx) {
  const t0 = performance.now();
  const [mask, doc] = await Promise.all([loadMask(base), (await fetch(`${base}/c0.model.json`)).json()]);
  const bin = await (await fetch(`${base}/c0.model.bin`)).arrayBuffer();
  if (bin.byteLength !== doc.P * 4) throw new Error(`c0.model.bin ${bin.byteLength} bytes ≠ 4 × P ${doc.P}`);
  if (mask.N !== doc.mask.N || mask.E !== doc.mask.E) throw new Error(`마스크가 모델과 다르다 (N ${mask.N}/${doc.mask.N}, E ${mask.E}/${doc.mask.E})`);
  const theta = Float64Array.from(new Float32Array(bin, 0, doc.P));
  model = createSparseRNN(mask, theta, {
    T: doc.spec.T, lr: doc.spec.lr, hidden: doc.spec.hidden,
    dnMean: Float64Array.from(doc.spec.dnMean), dnStd: Float64Array.from(doc.spec.dnStd),
  });
  // 교사가 hold 를 쓴 변형(1ply-hold-garbage)으로 학습했으므로 학생 후보 집합도 hold 를 포함한다.
  hold = doc.teacher?.hold ?? true;
  // 같은 후보 집합·같은 순서로 교사 점수를 매긴다 (depth 1 — 빔을 타지 않으므로 Node 전용 코드에 닿지 않는다).
  const tdoc = await (await fetch(`${base}/teacher.json`)).json();
  teacher = createTeacher(tdoc.params, { depth: 1, width: 1, candidates: hold ? decisionCandidates : currentPieceCandidates });

  sampled = sampledIdx && sampledIdx.length ? Int32Array.from(sampledIdx) : null;
  info = {
    P: doc.P, E: mask.E, N: mask.N, backend: model.backend, hold,
    T: model.T, nOutput: mask.nOutput, teacherVariant: tdoc.variant, teacherLabel: tdoc.label,
    sampled: sampled ? sampled.length : 0, loadMs: Math.round(performance.now() - t0),
  };
  return info;
}

// 살아남는 후보만 인코딩해 점수와 DN 창평균을 함께 얻는다 (createNetAgent.scoreLive 와 같은 집합·같은 순서).
function scoreCandidates(p) {
  const cands = hold ? decisionCandidates(p) : currentPieceCandidates(p);
  ensure(cands.length);
  const live = [], after = [];
  for (const c of cands) {
    const r = applyDecision(p, c);
    if (r.player.dead || r.event.toppedOut) continue;
    encodeAfterstate(r.player, r.event, U.subarray(live.length * U_DIM, (live.length + 1) * U_DIM));
    live.push(c);
    after.push(r);
  }
  if (!live.length) return { cands, live, after, scores: null, dn: null };
  // forward 는 점수와 DN 창평균을 한 번에 준다. MAX_BATCH 를 넘으면 나눠 돌린다 (score() 와 같은 방식).
  const nOut = info.nOutput;
  const scores = new Float64Array(live.length);
  const dn = new Float64Array(live.length * nOut);
  for (let from = 0; from < live.length; from += 32) {
    const to = Math.min(live.length, from + 32);
    const r = model.forward(U, rows.slice(from, to), { keep: false });
    scores.set(r.s, from);
    dn.set(r.dn, from * nOut);
  }
  return { cands, live, after, scores, dn };
}

const argmax = (s) => { let a = 0; for (let k = 1; k < s.length; k++) if (s[k] > s[a]) a = k; return a; };

// 고른 후보 하나를 keep=true 로 다시 흘려 표본 뉴런의 스텝별 활성을 꺼낸다.
// scratch 는 재사용되므로 forward 직후에 바로 복사한다. wasm 백엔드에서는 xs 항목이 { arr } 뷰다.
function traceChosen(row) {
  if (!sampled) return null;
  const r = model.forward(U, [row], { keep: true });
  const xs = r.cache?.sc?.xs;
  if (!xs) return null;
  const B = r.cache.B;                       // wasm 은 짝수 배치라 2 가 된다 (같은 행을 복제)
  const T = model.T, n = sampled.length;
  const flat = new Float64Array(T * n);
  for (let t = 1; t <= T; t++) {
    const x = xs[t].arr ?? xs[t];
    const base = (t - 1) * n;
    for (let i = 0; i < n; i++) flat[base + i] = x[sampled[i] * B];
  }
  return { T, n, ...quantize(flat) };
}

function decide(snapshot, detail) {
  const t0 = performance.now();
  const p = restorePlayer(snapshot);
  const { cands, live, after, scores, dn } = scoreCandidates(p);
  if (!live.length) return { cand: cands.length ? cands[0] : null, detail: null, decideMs: performance.now() - t0 };
  const pick = argmax(scores);
  const chosen = live[pick];
  const out = { useHold: !!chosen.useHold, col: chosen.col, rot: chosen.rot, top: chosen.top, spin: !!chosen.spin, kick5: !!chosen.kick5 };
  // 착수 결정은 여기서 끝난다. 아래는 화면에 보여줄 계측이라 '생각 시간'에 넣지 않는다.
  const decideMs = performance.now() - t0;
  if (!detail) return { cand: out, detail: null, decideMs };

  // 교사 점수 — 같은 후보 집합이다 (둘 다 살아남는 후보만, 같은 순서).
  const t = teacher.scoreCandidates(p);
  const teacherScores = new Float64Array(live.length);
  const same = t.candidates.length === live.length;
  for (let i = 0; i < live.length; i++) teacherScores[i] = same ? t.candidates[i].value : NaN;
  const teacherOrder = [...live.keys()].sort((a, b) => teacherScores[b] - teacherScores[a]);
  const teacherRank = new Int32Array(live.length);
  teacherOrder.forEach((k, r) => { teacherRank[k] = r; });

  const nOut = info.nOutput;
  const d = {
    piece: p.current, hold: p.hold, holdUsed: p.holdUsed,
    pending: snapshot.pending ?? 0, combo: p.combo, pieces: p.pieces,
    boardBefore: packBoard(p.board),
    chosen: pick,
    teacherAligned: same,
    teacherBest: same ? teacherOrder[0] : -1,
    candidates: live.map((c, i) => ({
      useHold: !!c.useHold, col: c.col, rot: c.rot, piece: c.piece ?? p.current,
      lines: after[i].event.linesCleared, sent: after[i].event.sent, tspin: !!after[i].event.tspin,
      board: packBoard(after[i].player.board),
      score: scores[i], teacher: teacherScores[i], teacherRank: teacherRank[i],
    })),
    dn: { n: nOut, ...quantize(dn) },
    trace: traceChosen(pick),
  };
  return { cand: out, detail: d, decideMs };
}

self.onmessage = async (ev) => {
  const msg = ev.data;
  try {
    if (msg.type === 'init') { self.postMessage({ type: 'ready', ...(await init(msg.base, msg.sampled)) }); return; }
    if (msg.type === 'decide') {
      if (!model) throw new Error('워커가 아직 준비되지 않았다');
      const t0 = performance.now();
      const { cand, detail, decideMs } = decide(msg.snapshot, !!msg.detail);
      self.postMessage({
        type: 'decision', id: msg.id, cand, detail,
        ms: Math.round(decideMs),                                    // 착수 결정만 (생각 시간)
        totalMs: Math.round(performance.now() - t0),                 // 계측 포함
      });
      return;
    }
  } catch (e) {
    self.postMessage({ type: 'error', id: msg?.id ?? null, error: String(e?.stack ?? e) });
  }
};
