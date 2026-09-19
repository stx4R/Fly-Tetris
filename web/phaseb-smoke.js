// 7단계 Phase B smoke — 브라우저 추론 하네스 (지시 §6 항목 2·4).
// Node 와 **같은 소스**(src/*.js 를 그대로 복사해 번들에 넣는다)로 같은 입력 1,000행을 점수화하고,
// scripts/phaseb-smoke.js 가 만든 reference.json 과 비교한다. 결과는 화면과 window.__phasebSmoke 에 남는다.
// 여기서 재는 시간은 순수 추론 시간(결정당 score 호출)이다 — 렌더링·입력 처리는 포함하지 않는다.

import { parseConnectome } from './src/connectome.js';
import { buildMask, createSparseRNN } from './src/sparse-rnn.js';
import { buildCondition } from './src/nullmodels.js';
import { PHASE_B_NULLS, buildPhaseBNull } from './src/stage7-nulls.js';

const TIMING_REPS = 20;
const out = document.getElementById('out');
const status = document.getElementById('status');
const say = (s) => { status.textContent = s; console.log(s); };
// 토스 리디자인 DOM (없으면 조용히 건너뛴다 — 로직은 그대로)
const $ = (id) => document.getElementById(id);
const setChip = (el, text, cls) => { if (!el) return; el.textContent = text; el.className = 'chip' + (cls ? ' ' + cls : ''); };
const setBar = (pct) => { const b = $('loadBar'); if (b) b.style.width = Math.round(pct * 100) + '%'; };

function maskFor(connectome, condition) {
  if (PHASE_B_NULLS.includes(condition)) return buildMask(buildPhaseBNull(connectome, condition, 0));
  return buildMask(buildCondition(connectome, condition, 0));
}
const median = (a) => { const s = [...a].sort((x, y) => x - y); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };

async function run() {
  const t0 = performance.now();
  say('기준 입력 로드 중…');
  const meta = await (await fetch('decisions.json')).json();
  const reference = await (await fetch('reference.json')).json();
  const uBuf = await (await fetch('inputs.f32')).arrayBuffer();
  const U = Float64Array.from(new Float32Array(uBuf));
  setBar(0.2);
  say(`커넥톰 로드 중… (입력 ${meta.rows} 행 / ${meta.decisions.length} 결정)`);
  const connectome = parseConnectome(await (await fetch('connectome.json')).text());
  setBar(0.5);

  const models = {};
  for (const kind of meta.models) {
    say(`${kind}: 마스크 생성 중…`);
    const tm = performance.now();
    const doc = await (await fetch(`models/${kind.toLowerCase()}.model.json`)).json();
    const mask = maskFor(connectome, kind === 'C0' ? (doc.mask?.condition?.type ?? 'C0') : kind);
    const bin = await (await fetch(`models/${kind.toLowerCase()}.model.bin`)).arrayBuffer();
    const theta = Float64Array.from(new Float32Array(bin, 0, doc.P));
    const model = createSparseRNN(mask, theta, { T: doc.spec.T, lr: doc.spec.lr, hidden: doc.spec.hidden, dnMean: Float64Array.from(doc.spec.dnMean), dnStd: Float64Array.from(doc.spec.dnStd) });
    const maskMs = performance.now() - tm;
    setBar(0.85);
    if ($('modelSub')) $('modelSub').textContent = `${kind} · P ${doc.P.toLocaleString()} · 간선 ${mask.E.toLocaleString()} · 마스크 ${Math.round(maskMs)} ms`;
    setChip($('loadChip'), '불러왔어요', 'ok');

    say(`${kind}: 추론 중…`);
    const ref = reference[kind];
    let maxAbsDiff = 0, maxRelDiff = 0, compared = 0;
    const scores = meta.decisions.map((rows) => Array.from(model.score(U, rows)));
    for (let i = 0; i < scores.length; i++) for (let k = 0; k < scores[i].length; k++) {
      const a = scores[i][k], b = ref[i][k];
      const d = Math.abs(a - b);
      if (d > maxAbsDiff) maxAbsDiff = d;
      const rel = d / Math.max(1e-12, Math.abs(b));
      if (rel > maxRelDiff) maxRelDiff = rel;
      compared++;
    }
    const times = [];
    for (let rep = 0; rep < TIMING_REPS; rep++) for (const rows of meta.decisions) { const t = performance.now(); model.score(U, rows); times.push(performance.now() - t); }
    times.sort((a, b) => a - b);
    models[kind] = {
      P: doc.P, backend: model.backend, maskBuildMs: Math.round(maskMs), compared, maxAbsDiff, maxRelDiff,
      medianMs: median(times), p99Ms: times[Math.floor(0.99 * (times.length - 1))], samples: times.length,
      meanCandidates: meta.rows / meta.decisions.length,
      sharedArrayBuffer: typeof SharedArrayBuffer !== 'undefined',
    };
    setBar(1);
    const pass = maxAbsDiff <= 1e-6;
    setChip($('resultChip'), pass ? '통과' : '불일치', pass ? 'ok' : 'bad');
    if ($('mMax')) $('mMax').textContent = maxAbsDiff.toExponential(1).replace('e', 'e−').replace('e−+', 'e+');
    if ($('mMs')) $('mMs').textContent = `${median(times).toFixed(0)} ms`;
    if ($('mBackend')) $('mBackend').textContent = model.backend;
    say(`${kind}: maxAbsDiff ${maxAbsDiff.toExponential(3)}, 결정당 ${median(times).toFixed(2)} ms (backend ${model.backend})`);
  }

  const result = {
    ranAt: new Date().toISOString(), userAgent: navigator.userAgent,
    backend: Object.values(models)[0]?.backend ?? null,
    hardwareConcurrency: navigator.hardwareConcurrency ?? null,
    totalMs: Math.round(performance.now() - t0), models,
  };
  window.__phasebSmoke = result;
  out.textContent = JSON.stringify(result, null, 1);
  document.getElementById('done').textContent = 'DONE';
  say(`완료 (${(result.totalMs / 1000).toFixed(1)} s) — 아래 JSON 을 phaseb-smoke.js --merge-browser 로 넣는다`);
}

run().catch((e) => { say(`ERROR: ${e?.stack ?? e}`); document.getElementById('done').textContent = 'ERROR'; window.__phasebSmoke = { error: String(e?.stack ?? e) }; });
