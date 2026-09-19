#!/usr/bin/env node
// 7단계 Phase B — smoke 6항목 (지시 §6). C0 + 끝난 null 전부에 대해.
//
//   1 로드        model.{bin,json} 로드 — P · 마스크 규격이 JSON 메타와 일치, .bin 크기 = 4·P,
//                 null 은 마스크 지문이 생성 시점 기록(nulls/masks/n*.mask.json)과 일치
//   2 추론 일치성  같은 입력 1,000개에 대해 Node 추론 vs 브라우저 추론이 1e-6 이내 (브라우저 결과는 --merge-browser 로 넣는다)
//   3 결정론성     같은 시드로 두 번 플레이 → 조각·행동 시퀀스 완전 동일
//   4 성능 예산    결정당 추론 시간 중앙값·p99 (Node; 브라우저는 병합) — 사람 입력 프레임 예산(16.7 ms) 대비
//   5 파일 크기    .bin 원본·gzip
//   6 마스크 식별  model.json 의 maskType / phaseBNull, 그리고 웹 기본 경로가 C0 로 고정돼 있는지
//
// 브라우저 하네스는 web/dist/phaseb-smoke/ 로 스테이징한다 (build-web 산출물과 섞이지 않게 하위 디렉터리).
// 산출: data/stage7-phaseB-smoke.json
// 옵션: --stage-only (번들만) --merge-browser <json> --pieces N --teacher KEY

import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { parseConnectome } from '../src/connectome.js';
import { createNetAgent } from '../src/stage7-agent.js';
import { applyDecision, createPlayer, decisionCandidates } from '../src/tetris.js';
import { createSparseRNN, sparseLayout } from '../src/sparse-rnn.js';
import { PHASE_B_NULLS } from '../src/stage7-nulls.js';
import { HYPER } from '../src/stage7-train.js';
import { median } from '../src/evaluate.js';
import { buildDataset, fmtMs, loadInputs, loadJson, maskFor, ROOT, STAGE7_DIR, variantOf } from './stage7-lib.js';

const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
const variant = variantOf(argv);
const stageOnly = argv.includes('--stage-only');
const mergeBrowser = opt('merge-browser', null);
const PLAY_PIECES = Number(opt('pieces', 300));
const REF_ROWS = 1000;          // 지시 §6-2 의 "동일 입력 1,000개"
const TIMING_REPS = 20;
const FRAME_BUDGET_MS = 1000 / 60;
const OUT = path.join(ROOT, 'data', 'stage7-phaseB-smoke.json');
const BUNDLE = path.join(ROOT, 'web', 'dist', 'phaseb-smoke');
const log = (s) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${s}`);
const sha = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 16);

function maskHash(mask) {
  const h = createHash('sha256');
  for (const arr of [Int32Array.from(mask.indptr), Int32Array.from(mask.indices), Float64Array.from(mask.wUnit)]) h.update(Buffer.from(arr.buffer));
  return h.digest('hex').slice(0, 16);
}

function modelsPresent() {
  const list = [{ kind: 'C0', json: path.join(STAGE7_DIR, 'c0.model.json'), bin: path.join(STAGE7_DIR, 'c0.model.bin'), condition: 'C0' }];
  for (const k of PHASE_B_NULLS) {
    const j = path.join(STAGE7_DIR, 'nulls', `${k.toLowerCase()}.model.json`);
    if (existsSync(j)) list.push({ kind: k, json: j, bin: path.join(STAGE7_DIR, 'nulls', `${k.toLowerCase()}.model.bin`), condition: k });
  }
  return list.filter((m) => existsSync(m.json) && existsSync(m.bin));
}

// 브라우저 번들 스테이징: src 전체 + 하네스 + 커넥톰 + 모델 + 기준 입력/출력
function stage(models, refs, decisions) {
  mkdirSync(path.join(BUNDLE, 'src'), { recursive: true });
  mkdirSync(path.join(BUNDLE, 'models'), { recursive: true });
  for (const f of readdirSync(path.join(ROOT, 'src'))) if (f.endsWith('.js')) copyFileSync(path.join(ROOT, 'src', f), path.join(BUNDLE, 'src', f));
  copyFileSync(path.join(ROOT, 'data', 'connectome.json'), path.join(BUNDLE, 'connectome.json'));
  for (const m of models) {
    copyFileSync(m.bin, path.join(BUNDLE, 'models', `${m.kind.toLowerCase()}.model.bin`));
    copyFileSync(m.json, path.join(BUNDLE, 'models', `${m.kind.toLowerCase()}.model.json`));
  }
  writeFileSync(path.join(BUNDLE, 'inputs.f32'), Buffer.from(refs.U.buffer, refs.U.byteOffset, refs.U.byteLength));
  writeFileSync(path.join(BUNDLE, 'decisions.json'), JSON.stringify({ uDim: refs.uDim, rows: refs.rows, decisions, models: models.map((m) => m.kind) }));
  writeFileSync(path.join(BUNDLE, 'reference.json'), JSON.stringify(refs.scores));
  copyFileSync(path.join(ROOT, 'web', 'phaseb-smoke.html'), path.join(BUNDLE, 'index.html'));
  copyFileSync(path.join(ROOT, 'web', 'phaseb-smoke.js'), path.join(BUNDLE, 'smoke.js'));
  log(`브라우저 번들 스테이징: ${path.relative(ROOT, BUNDLE)} (http://localhost:8123/phaseb-smoke/)`);
}

async function main() {
  if (mergeBrowser) return merge();
  const models = modelsPresent();
  if (!models.length) { console.error('모델이 없다'); process.exit(1); }
  log(`smoke 대상: ${models.map((m) => m.kind).join(', ')}`);
  const { connectome: _c, teacher, data } = loadInputs({ variant });
  const connectome = parseConnectome(readFileSync(path.join(ROOT, 'data', 'connectome.json'), 'utf8'));
  const c0rec = JSON.parse(readFileSync(path.join(ROOT, 'data', 'stage7-c0.json'), 'utf8'));
  const p = c0rec.config;
  const ds = buildDataset(data, { trainDecisions: p.trainDecisions, valDecisions: p.valDecisions, negatives: p.negatives, hard: p.hardNegatives, valFullDecisions: p.valFullDecisions });

  // 기준 입력 1,000행 (테스트 결정에서 앞에서부터, 결정 경계를 유지 — 결정당 시간 측정용)
  const refDecisions = [];
  const rowList = [];
  for (const d of ds.test) {
    if (rowList.length + d.rows.length > REF_ROWS) break;
    refDecisions.push(Array.from(d.rows, (r) => rowList.push(r) - 1)); // 번들 안에서의 지역 인덱스
  }
  const uDim = ds.pool.uDim ?? 256;
  const U32 = new Float32Array(rowList.length * uDim);
  for (let i = 0; i < rowList.length; i++) U32.set(ds.pool.U.subarray(rowList[i] * uDim, (rowList[i] + 1) * uDim), i * uDim);
  log(`기준 입력: ${rowList.length} 행 (${refDecisions.length} 결정), uDim ${uDim}`);

  const results = [];
  const refScores = {};
  for (const m of models) {
    const doc = JSON.parse(readFileSync(m.json, 'utf8'));
    const bin = readFileSync(m.bin);
    const checks = [];
    const add = (name, ok, detail) => checks.push({ name, ok, detail });

    // ---- 1 로드 ----
    const mask = maskFor(connectome, m.condition, 0);
    const layout = sparseLayout(mask, { hidden: HYPER.hidden });
    add('.bin 크기 = 4·P', bin.length === 4 * doc.P, `${bin.length} vs ${4 * doc.P}`);
    add('P 가 마스크에서 재계산한 값과 일치', layout.P === doc.P, `${layout.P} vs ${doc.P}`);
    add('마스크 규격(N/E/nInput/nOutput) 이 JSON 메타와 일치', mask.N === doc.mask.N && mask.E === doc.mask.E && mask.nInput === doc.mask.nInput && mask.nOutput === doc.mask.nOutput, `N ${mask.N}/${doc.mask.N} E ${mask.E}/${doc.mask.E}`);
    add('rho_unit 일치', Math.abs(mask.rhoUnit - doc.mask.rhoUnit) < 1e-9, `${mask.rhoUnit} vs ${doc.mask.rhoUnit}`);
    const mh = maskHash(mask);
    if (m.kind !== 'C0') {
      const rec = loadJson(path.join('nulls', 'masks', `${m.kind.toLowerCase()}.mask.json`));
      add('마스크가 생성 시점 기록과 같은 조건', !!rec && rec.condition.type === doc.mask.condition.type && rec.seed === (doc.mask.condition.seed ?? 0), rec ? `${rec.kind} seed ${rec.seed}` : '기록 없음');
    }
    const f32 = new Float32Array(bin.buffer, bin.byteOffset, doc.P);
    const theta = Float64Array.from(f32);
    const model = createSparseRNN(mask, theta, { T: doc.spec.T, lr: doc.spec.lr, hidden: doc.spec.hidden, dnMean: Float64Array.from(doc.spec.dnMean), dnStd: Float64Array.from(doc.spec.dnStd) });
    add('Node 에서 모델 인스턴스 생성', !!model.score, `backend ${model.backend}`);

    // ---- 2 기준 출력 (브라우저와 비교할 값) ----
    const Uref = Float64Array.from(U32);
    const scores = refDecisions.map((rows) => Array.from(model.score(Uref, rows)));
    refScores[m.kind] = scores;

    // ---- 4 결정당 추론 시간 (Node) ----
    const times = [];
    for (let rep = 0; rep < TIMING_REPS; rep++) for (const rows of refDecisions) { const t = performance.now(); model.score(Uref, rows); times.push(performance.now() - t); }
    times.sort((a, b) => a - b);
    const nodeTiming = { decisions: refDecisions.length * TIMING_REPS, medianMs: median(times), p99Ms: times[Math.floor(0.99 * (times.length - 1))], meanCandidates: rowList.length / refDecisions.length, backend: model.backend };

    // ---- 3 결정론성 ----
    const hold = doc.teacher?.hold ?? true;
    const play = (seed) => {
      const agent = createNetAgent(model, { hold });
      let pl = createPlayer(seed);
      const pieces = [], actions = [];
      for (let i = 0; i < PLAY_PIECES && !pl.dead; i++) {
        const cands = decisionCandidates(pl);
        if (!cands.length) break;
        const c = agent.pick(pl, cands);
        pieces.push(pl.current);
        actions.push(`${c.rot ?? c.rotation ?? 0}:${c.x ?? c.col ?? 0}:${c.hold ? 'H' : '-'}`);
        applyDecision(pl, c);
      }
      return { pieces: pieces.join(','), actions: actions.join('|'), n: actions.length };
    };
    const r1 = play(4242), r2 = play(4242);
    add('같은 시드 두 번 → 조각 시퀀스 동일', r1.pieces === r2.pieces, `${r1.n} 결정`);
    add('같은 시드 두 번 → 행동 시퀀스 동일', r1.actions === r2.actions, `${r1.n} 결정`);

    // ---- 5 파일 크기 ----
    const gz = gzipSync(bin, { level: 9 });
    const size = { binBytes: bin.length, gzipBytes: gz.length, jsonBytes: statSync(m.json).size, binMB: +(bin.length / 1048576).toFixed(2), gzipMB: +(gz.length / 1048576).toFixed(2) };

    // ---- 6 마스크 식별 ----
    add('model.json 에 마스크 식별자', m.kind === 'C0' ? !!doc.mask?.condition?.type : (!!doc.maskType && doc.phaseBNull === m.kind), m.kind === 'C0' ? `condition ${doc.mask?.condition?.type}` : `maskType ${doc.maskType}`);

    results.push({
      model: m.kind, file: path.relative(ROOT, m.json), P: doc.P, maskHash: mh, binHash: sha(bin),
      gateStatus: doc.gateStatus ?? null, forcedPhaseB: doc.forcedPhaseB ?? null, maskType: doc.maskType ?? doc.mask?.condition?.type ?? null,
      checks, load: checks.every((c) => c.ok), determinism: { pieces: r1.pieces === r2.pieces, actions: r1.actions === r2.actions, decisions: r1.n },
      nodeTiming, size, browser: null,
    });
    log(`${m.kind}: 로드 ${checks.every((c) => c.ok) ? 'ok' : 'FAIL'}, 결정론성 ${r1.actions === r2.actions ? 'ok' : 'FAIL'} (${r1.n} 결정), Node 결정당 ${nodeTiming.medianMs.toFixed(2)} ms (p99 ${nodeTiming.p99Ms.toFixed(2)}), .bin ${size.binMB} MB (gzip ${size.gzipMB} MB), backend ${model.backend}`);
  }

  stage(models, { U: U32, uDim, rows: rowList.length, scores: refScores }, refDecisions);

  // ---- 6 웹 기본 경로 ----
  const webDefault = { checked: [], ok: true, note: '' };
  const buildWeb = path.join(ROOT, 'scripts', 'build-web.js');
  if (existsSync(buildWeb)) {
    const s = readFileSync(buildWeb, 'utf8');
    const mentionsNull = /nulls\/(n1|n2|n3)/i.test(s);
    webDefault.checked.push({ file: 'scripts/build-web.js', mentionsNullModel: mentionsNull });
    webDefault.ok = !mentionsNull;
    webDefault.note = mentionsNull ? '빌드가 null 모델을 참조한다 — 기본 로드가 C0 인지 확인 필요' : '빌드가 null 모델을 참조하지 않는다 (기본 로드는 C0)';
  } else webDefault.note = 'scripts/build-web.js 없음';

  const doc = {
    ranAt: new Date().toISOString(), phase: 'B', gateStatus: results[0]?.gateStatus ?? null, forcedPhaseB: results[0]?.forcedPhaseB ?? null,
    refInputs: { rows: rowList.length, decisions: refDecisions.length, uDim, tolerance: 1e-6 },
    frameBudgetMs: FRAME_BUDGET_MS, models: results, webDefault,
    browserBundle: path.relative(ROOT, BUNDLE).replace(/\\/g, '/'),
    browser: { done: false, note: '브라우저 추론(항목 2·4)은 web/dist/phaseb-smoke/ 를 띄워 측정한 뒤 --merge-browser 로 병합한다' },
  };
  writeFileSync(OUT, JSON.stringify(doc, null, 1) + '\n');
  log(`wrote ${path.relative(ROOT, OUT)} — 브라우저 항목(2·4) 은 아직 미측정`);
}

function merge() {
  const doc = JSON.parse(readFileSync(OUT, 'utf8'));
  const b = JSON.parse(readFileSync(mergeBrowser, 'utf8'));
  let worst = 0;
  for (const r of doc.models) {
    const br = b.models?.[r.model];
    if (!br) continue;
    r.browser = br;
    if (Number.isFinite(br.maxAbsDiff)) worst = Math.max(worst, br.maxAbsDiff);
  }
  doc.browser = {
    done: true, ranAt: b.ranAt ?? null, userAgent: b.userAgent ?? null, backend: b.backend ?? null,
    maxAbsDiff: worst, tolerance: doc.refInputs.tolerance, parity: worst <= doc.refInputs.tolerance,
    note: worst <= doc.refInputs.tolerance ? 'Node 와 브라우저 추론이 허용오차 안에서 일치' : '불일치 — 8단계 웹이 성립하지 않는다 (지시 §9: 즉시 보고)',
  };
  writeFileSync(OUT, JSON.stringify(doc, null, 1) + '\n');
  console.log(`병합 완료: maxAbsDiff ${worst.toExponential(3)} (허용 ${doc.refInputs.tolerance}) → ${doc.browser.parity ? 'PASS' : 'FAIL'}`);
  for (const r of doc.models) if (r.browser) console.log(`  ${r.model}: 결정당 브라우저 중앙값 ${r.browser.medianMs?.toFixed(2)} ms (p99 ${r.browser.p99Ms?.toFixed(2)}), Node ${r.nodeTiming.medianMs.toFixed(2)} ms; 프레임 예산 ${doc.frameBudgetMs.toFixed(1)} ms 대비 ${(r.browser.medianMs / doc.frameBudgetMs).toFixed(1)}배`);
}

main().catch((err) => { console.error(err); process.exit(2); });
