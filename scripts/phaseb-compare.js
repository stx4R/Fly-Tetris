#!/usr/bin/env node
// 7단계 Phase B — C0 vs null 쌍대 비교 (지시 §4).
//
// 페어링이 검정력의 대부분이다. 두 층위에서 짝을 짓는다:
//   게임 단위  — 4 모델이 같은 게임 시드 50개를 썼다. 시드로 짝지어 Δ 를 낸다 (n = 50).
//   결정 단위  — 테스트 결정 1,453개(전체 후보)는 모든 모델이 공유한다. 각 모델의 theta 를 복원해
//                결정별 rel-regret · top-1 을 다시 계산하고 결정으로 짝짓는다 (n = 1,453).
//
// 통계 (모두 결정적 — 시드 고정):
//   Δmedian   = median(C0) − median(null). 지시 §4 의 표기. 95% CI 는 쌍(게임/결정) 을 리샘플하는
//               쌍대 부트스트랩 10,000회.
//   Δpaired   = 쌍별 차이 d_i = C0_i − null_i 의 평균. 같은 부트스트랩에서 CI.
//   p         = d_i 의 부호를 무작위로 뒤집는 순열검정 10,000회 (양측). 쌍대 데이터의 정확검정.
//   보정      = null 3개에 대해 지표별 Holm–Bonferroni. 보정 전/후 p 를 모두 적는다.
//               (null 이 아직 다 안 끝났으면 가족 크기가 줄어든다 — holmFamilySize 에 기록.)
//
// 판정 문구는 기계적으로 만든다: CI 가 0 을 포함하면 "구분되지 않음", 아니면 "C0 가 N 에 비해 Δ [CI] 우위/열위".
//
// 산출: data/stage7-phaseB-compare.json
// 옵션: --skip-decision (결정 단위 재계산 생략 — 게임 단위만) --workers N --teacher KEY

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createRng } from '../src/prng.js';
import { median, mean } from '../src/evaluate.js';
import { metricsFromScores } from '../src/stage7-data.js';
import { HYPER } from '../src/stage7-train.js';
import { NULL_NAMES, NULL_SEPARATES, PHASE_B_NULLS } from '../src/stage7-nulls.js';
import { buildDataset, createSparseState, createTrainingPool, DEFAULT_WORKERS, fmtMs, loadInputs, loadJson, loadTheta, maskFor, pct, ROOT, scoreItems, variantOf } from './stage7-lib.js';

const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
const variant = variantOf(argv);
const skipDecision = argv.includes('--skip-decision');
const B = 10000;
const log = (s) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${s}`);

// ---------- 쌍대 통계 ----------

// a, b 는 같은 길이의 짝지어진 배열 (a = C0, b = null). higherIsBetter 는 판정 문구 방향에만 쓴다.
function pairedStats(a, b, { seed = 7, higherIsBetter = true } = {}) {
  const n = a.length;
  const d = a.map((x, i) => x - b[i]);
  const dMedian = median(a) - median(b);
  const dPaired = mean(d);
  const rng = createRng(seed);
  const bootMedian = new Float64Array(B), bootPaired = new Float64Array(B);
  const ra = new Float64Array(n), rb = new Float64Array(n);
  for (let t = 0; t < B; t++) {
    let s = 0;
    for (let i = 0; i < n; i++) { const j = rng.int(n); ra[i] = a[j]; rb[i] = b[j]; s += a[j] - b[j]; }
    bootMedian[t] = median(Array.from(ra)) - median(Array.from(rb));
    bootPaired[t] = s / n;
  }
  const q = (arr, p) => { const s = Float64Array.from(arr).sort(); return s[Math.min(s.length - 1, Math.max(0, Math.floor(p * (s.length - 1))))]; };
  const ciMedian = [q(bootMedian, 0.025), q(bootMedian, 0.975)];
  const ciPaired = [q(bootPaired, 0.025), q(bootPaired, 0.975)];
  // 부호 뒤집기 순열검정 (양측): |평균| 이 관측치 이상인 비율
  const rng2 = createRng(seed + 991);
  const obs = Math.abs(dPaired);
  let ge = 0;
  for (let t = 0; t < B; t++) {
    let s = 0;
    for (let i = 0; i < n; i++) s += rng2.int(2) ? d[i] : -d[i];
    if (Math.abs(s / n) >= obs - 1e-12) ge++;
  }
  const p = (ge + 1) / (B + 1);
  const separated = !(ciMedian[0] <= 0 && ciMedian[1] >= 0);
  const better = higherIsBetter ? dMedian > 0 : dMedian < 0;
  return { n, c0: median(a), null: median(b), dMedian, dMedianCI: ciMedian, dPaired, dPairedCI: ciPaired, p, separated, c0Better: separated ? better : null };
}

const fmt = (v, dp = 3) => (Number.isFinite(v) ? v.toFixed(dp) : '—');
function verdict(name, st, unit = '', dp = 1) {
  if (!st.separated) return `구분되지 않음 (Δ ${fmt(st.dMedian, dp)}${unit} [${fmt(st.dMedianCI[0], dp)}, ${fmt(st.dMedianCI[1], dp)}], CI 가 0 포함)`;
  return `C0 가 ${name} 에 비해 Δ ${fmt(st.dMedian, dp)}${unit} [${fmt(st.dMedianCI[0], dp)}, ${fmt(st.dMedianCI[1], dp)}] ${st.c0Better ? '우위' : '열위'}`;
}

// Holm–Bonferroni: [{key, p}] → 보정 p
function holm(entries) {
  const sorted = [...entries].sort((x, y) => x.p - y.p);
  const m = sorted.length;
  let prev = 0;
  const out = {};
  sorted.forEach((e, i) => { const adj = Math.min(1, Math.max(prev, (m - i) * e.p)); prev = adj; out[e.key] = adj; });
  return { adjusted: out, familySize: m };
}

// ---------- 모델 복원 (결정 단위 재계산용) ----------

async function scoreModel(kind, connectome, ds, workers, teacher, records) {
  const rec = records[kind];
  const mask = maskFor(connectome, kind === 'C0' ? 'C0' : kind, 0);
  const state = createSparseState(mask, HYPER);
  const specDoc = kind === 'C0' ? loadJson('c0.model.json') : loadJson(`nulls/${kind.toLowerCase()}.model.json`);
  if (!specDoc?.spec) throw new Error(`${kind}: 모델 사양 JSON 이 없다`);
  state.model.dnMean.set(Float64Array.from(specDoc.spec.dnMean));
  state.model.dnStd.set(Float64Array.from(specDoc.spec.dnStd));
  const lastRound = rec.rounds?.length ? rec.rounds[rec.rounds.length - 1].round : 2;
  const tag = kind === 'C0' ? `a4-c0-round${lastRound}` : `b-${kind.toLowerCase()}-round${lastRound}`;
  if (!loadTheta(tag, state.theta)) throw new Error(`data/stage7/${tag}.theta.f64 없음`);
  const tp = await createTrainingPool(state, ds, { workers, teacher });
  const t0 = performance.now();
  const scores = await scoreItems(tp, ds.test);
  const m = metricsFromScores(ds.test, scores, { perDecision: true });
  await tp.close();
  log(`${kind}: 결정 단위 재계산 (${tag}) — rel-regret ${m.relRegret.toFixed(4)}, top-1 ${pct(m.top1)}, 기록값 ${rec.test.relRegret.toFixed(4)} / ${pct(rec.test.top1)}  (${fmtMs(performance.now() - t0)})`);
  if (Math.abs(m.relRegret - rec.test.relRegret) > 1e-6) throw new Error(`${kind}: 재계산 rel-regret 이 기록과 다르다 (${m.relRegret} vs ${rec.test.relRegret}) — 복원이 틀렸다`);
  return m.perDecision;
}

async function main() {
  const c0File = path.join(ROOT, 'data', 'stage7-phaseB-c0.json');
  if (!existsSync(c0File)) { console.error('data/stage7-phaseB-c0.json 없음 — train-phaseb.js --only C0 을 먼저'); process.exit(1); }
  const records = { C0: JSON.parse(readFileSync(c0File, 'utf8')) };
  const present = [];
  for (const k of PHASE_B_NULLS) {
    const f = path.join(ROOT, 'data', `stage7-n${k[1]}.json`);
    if (existsSync(f)) { records[k] = JSON.parse(readFileSync(f, 'utf8')); present.push(k); }
  }
  if (!present.length) { console.error('끝난 null 이 없다 — train-phaseb.js --only N1 을 먼저'); process.exit(1); }
  log(`비교 대상: C0 vs ${present.join(', ')}${present.length < 3 ? `  (아직 ${PHASE_B_NULLS.filter((k) => !present.includes(k)).join(', ')} 미완 — Holm 가족 크기 ${present.length})` : ''}`);

  // ---------- 게임 단위 (시드로 짝짓기) ----------
  const gamesOf = (k) => { const m = new Map(); for (const g of records[k].play.games_) m.set(g.seed, g); return m; };
  const c0games = gamesOf('C0');
  const seeds = records.C0.playSeeds.filter((s) => present.every((k) => gamesOf(k).has(s)));
  log(`게임 단위: 공유 시드 ${seeds.length}개 (C0 ${records.C0.play.games} 게임)`);
  const GAME_METRICS = [
    { key: 'piecesMedian', label: '조각', pick: (g) => g.pieces, dp: 1, higher: true },
    { key: 'attackMedian', label: '공격', pick: (g) => g.attack, dp: 1, higher: true },
    { key: 'tetrisPerGame', label: '테트리스/게임', pick: (g) => g.tetris, dp: 2, higher: true },
    { key: 'lines', label: '지운 줄', pick: (g) => g.lines, dp: 1, higher: true },
    { key: 'survived', label: '생존', pick: (g) => (g.survived ? 1 : 0), dp: 3, higher: true },
    { key: 'holdsPerPiece', label: 'holds/piece', pick: (g) => g.holds / Math.max(1, g.pieces), dp: 3, higher: null },
    { key: 'holesAtDeath', label: '사망 시 구멍', pick: (g) => g.holesAtDeath, dp: 1, higher: false },
  ];
  const gameComparisons = {};
  for (const m of GAME_METRICS) {
    gameComparisons[m.key] = { label: m.label, higherIsBetter: m.higher, byNull: {} };
    for (const k of present) {
      const ng = gamesOf(k);
      const pairs = seeds.map((s) => [m.pick(c0games.get(s)), m.pick(ng.get(s))]).filter((p) => p[0] !== null && p[1] !== null && Number.isFinite(p[0]) && Number.isFinite(p[1]));
      if (!pairs.length) continue;
      const st = pairedStats(pairs.map((p) => p[0]), pairs.map((p) => p[1]), { seed: 7, higherIsBetter: m.higher !== false });
      gameComparisons[m.key].byNull[k] = { ...st, verdict: m.higher === null ? `Δ ${fmt(st.dMedian, m.dp)} [${fmt(st.dMedianCI[0], m.dp)}, ${fmt(st.dMedianCI[1], m.dp)}]${st.separated ? '' : ' (CI 가 0 포함 — 구분되지 않음)'}` : verdict(k, st, '', m.dp) };
    }
    const h = holm(Object.entries(gameComparisons[m.key].byNull).map(([key, v]) => ({ key, p: v.p })));
    gameComparisons[m.key].holm = h.adjusted;
    gameComparisons[m.key].holmFamilySize = h.familySize;
    for (const k of Object.keys(gameComparisons[m.key].byNull)) gameComparisons[m.key].byNull[k].pHolm = h.adjusted[k];
  }

  // ---------- 결정 단위 ----------
  let decisionComparisons = null;
  let perDecision = null;
  if (!skipDecision) {
    const workers = Number(opt('workers', DEFAULT_WORKERS));
    const { connectome, teacher, data } = loadInputs({ variant });
    const p = records.C0.protocol;
    const ds = buildDataset(data, { trainDecisions: p.trainDecisions, valDecisions: p.valDecisions, negatives: p.negatives, hard: p.hardNegatives, valFullDecisions: p.valFullDecisions });
    perDecision = {};
    for (const k of ['C0', ...present]) perDecision[k] = await scoreModel(k, connectome, ds, workers, teacher, records);
    const DEC_METRICS = [
      { key: 'relRegret', label: '상대 regret', dp: 4, higher: false },
      { key: 'top1', label: 'top-1 일치율', dp: 4, higher: true },
      { key: 'tau', label: 'τ', dp: 4, higher: true },
      { key: 'bottomHalf', label: '하위 절반 선택률', dp: 4, higher: false },
    ];
    decisionComparisons = {};
    for (const m of DEC_METRICS) {
      decisionComparisons[m.key] = { label: m.label, higherIsBetter: m.higher, byNull: {} };
      for (const k of present) {
        const st = pairedStats(perDecision.C0[m.key], perDecision[k][m.key], { seed: 23, higherIsBetter: m.higher });
        // 결정 단위는 중앙값이 둔하다 (0/1 지표) — 평균 차이를 주 통계로 본다
        st.c0Mean = mean(perDecision.C0[m.key]); st.nullMean = mean(perDecision[k][m.key]);
        st.separated = !(st.dPairedCI[0] <= 0 && st.dPairedCI[1] >= 0);
        st.c0Better = st.separated ? (m.higher ? st.dPaired > 0 : st.dPaired < 0) : null;
        st.verdict = st.separated
          ? `C0 가 ${k} 에 비해 Δ ${fmt(st.dPaired, m.dp)} [${fmt(st.dPairedCI[0], m.dp)}, ${fmt(st.dPairedCI[1], m.dp)}] ${st.c0Better ? '우위' : '열위'}`
          : `구분되지 않음 (Δ ${fmt(st.dPaired, m.dp)} [${fmt(st.dPairedCI[0], m.dp)}, ${fmt(st.dPairedCI[1], m.dp)}], CI 가 0 포함)`;
        decisionComparisons[m.key].byNull[k] = st;
      }
      const h = holm(Object.entries(decisionComparisons[m.key].byNull).map(([key, v]) => ({ key, p: v.p })));
      decisionComparisons[m.key].holm = h.adjusted;
      decisionComparisons[m.key].holmFamilySize = h.familySize;
      for (const k of Object.keys(decisionComparisons[m.key].byNull)) decisionComparisons[m.key].byNull[k].pHolm = h.adjusted[k];
    }
  }

  // ---------- 표 ----------
  console.log(`\n=== Phase B 쌍대 비교 (C0 vs ${present.join(', ')}; 게임 ${seeds.length} 공유 시드, 부트스트랩 ${B}회, 부호뒤집기 순열 ${B}회) ===`);
  console.log(`게이트 상태 ${records.C0.gateStatus} · forcedPhaseB ${records.C0.forcedPhaseB}\n`);
  const row = (label, st, dp) => `${label.padEnd(16)} C0 ${fmt(st.c0, dp).padStart(8)}  null ${fmt(st.null, dp).padStart(8)}  Δ ${fmt(st.dMedian, dp).padStart(8)} [${fmt(st.dMedianCI[0], dp)}, ${fmt(st.dMedianCI[1], dp)}]  p ${st.p.toFixed(4)} → Holm ${st.pHolm.toFixed(4)}  ${st.separated ? (st.c0Better ? 'C0 우위' : 'C0 열위') : '구분 안 됨'}`;
  for (const k of present) {
    console.log(`--- C0 vs ${k} (${NULL_NAMES[k]}) — 분리하는 것: ${NULL_SEPARATES[k]} ---`);
    for (const m of GAME_METRICS) { const st = gameComparisons[m.key]?.byNull[k]; if (st) console.log('  ' + row(m.label, st, m.dp)); }
    if (decisionComparisons) for (const key of Object.keys(decisionComparisons)) {
      const st = decisionComparisons[key].byNull[k];
      console.log(`  ${decisionComparisons[key].label.padEnd(16)} C0 ${fmt(st.c0Mean, 4).padStart(8)}  null ${fmt(st.nullMean, 4).padStart(8)}  Δ ${fmt(st.dPaired, 4).padStart(8)} [${fmt(st.dPairedCI[0], 4)}, ${fmt(st.dPairedCI[1], 4)}]  p ${st.p.toFixed(4)} → Holm ${st.pHolm.toFixed(4)}  ${st.separated ? (st.c0Better ? 'C0 우위' : 'C0 열위') : '구분 안 됨'}`);
    }
    console.log('');
  }

  const doc = {
    ranAt: new Date().toISOString(), phase: 'B', gateStatus: records.C0.gateStatus, forcedPhaseB: records.C0.forcedPhaseB,
    models: ['C0', ...present], pending: PHASE_B_NULLS.filter((k) => !present.includes(k)),
    playSeeds: seeds, pairedGames: seeds.length, bootstrapResamples: B, permutations: B,
    method: {
      pairing: '게임은 공유 시드로, 결정은 테스트 결정 id 로 짝짓는다',
      dMedian: 'median(C0) − median(null), 쌍대 부트스트랩 10,000회 CI',
      dPaired: '쌍별 차이의 평균, 같은 부트스트랩에서 CI (결정 단위의 주 통계)',
      p: '쌍별 차이의 부호 뒤집기 순열검정 10,000회, 양측',
      correction: 'null 개수에 대한 Holm–Bonferroni (지표별)',
      primary: '1차 판정 지표는 rel-regret 과 top-1 (결정 단위) — 조각 중앙값은 C0 에서 CI 폭이 중앙값에 육박해 검정력이 부족하다',
    },
    summary: Object.fromEntries(['C0', ...present].map((k) => [k, {
      name: k === 'C0' ? 'real connectome' : NULL_NAMES[k], piecesMedian: records[k].play.piecesMedian, piecesMedianCI: records[k].play.piecesMedianCI,
      attackMedian: records[k].play.attackMedian, attackMedianCI: records[k].play.attackMedianCI, tetrises: records[k].play.tetrises, tetrisMedian: records[k].play.tetrisMedian,
      survival: records[k].play.survival, relRegret: records[k].test.relRegret, relRegretCI: records[k].test.relRegretCI, top1: records[k].test.top1, top1CI: records[k].test.top1CI, tau: records[k].test.tau,
      holdsPerPiece: records[k].holdsPerPiece, deaths: records[k].deaths.counts, garbageDeathShare: records[k].deaths.garbageDeathShare,
      wellRun: { median: records[k].play.wellRuns.lengthMedian, p90: records[k].play.wellRuns.lengthP90, max: records[k].play.wellRuns.lengthMax },
      lineComposition: records[k].play.lineComposition, untrainedTop1: records[k].untrained?.top1 ?? null, notLearned: records[k].notLearned ?? null, retried: records[k].retried ?? false,
      weights: records[k].weights.vsInit, norms: records[k].weights.norms, inputWeights: records[k].inputWeights,
    }])),
    gameComparisons, decisionComparisons,
    c0TwentyGameReference: { note: 'A-4′ 의 20 게임 수치 (같은 시드 앞 20개) — 50 게임 수치와 병기한다', piecesMedian: 178.5, attackMedian: 20, tetrisMedian: 1, holdsPerPiece: 0.367, deaths: { garbage: 10, 'well-fill': 6, holes: 4 } },
  };
  writeFileSync(path.join(ROOT, 'data', 'stage7-phaseB-compare.json'), JSON.stringify(doc, null, 1) + '\n');
  log(`wrote data/stage7-phaseB-compare.json`);
}

main().catch((err) => { console.error(err); process.exit(2); });
