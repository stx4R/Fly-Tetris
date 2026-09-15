#!/usr/bin/env node
// 캘리브레이션 v2: 시드 랜덤 탐색 → 하드 제약 통과 상위 20점을 보드 2000개로 재평가 → 프로브 (b) top-1 최대 선택 → 최종 게이트.
//
//   탐색축  rho_target ∈ [0.8, 1.3], b ∈ [0, 2], k_local ∈ [0, 20], k_global ∈ [0, 5] (연속·균등),
//           alpha ∈ {0.5, 1.0}, gap ∈ {0, 25, 50, 'full'} (이산)
//   하드 제약  ceilingFrac < 5%, topSpikeShare < 30%, 발화 DN ≥ 40/107, medianRate ∈ [0.5, 40] Hz
//   최종 게이트  선택점의 프로브 (b) top-1 − 셔플 통제군 ≥ +10%p (절대). 미달이면 exit 1 (Plan B 대상).
//
// 확장 탐색: 스펙 범위(rho ≤ 1.3)에서 하드 제약 통과점이 없으면 rho_target ∈ [0.8, 5.0] 으로 같은 탐색을 한 번 더 하고
// 결과를 `extended` 로 따로 기록한다 (data/spectral.json 의 rho_unit 기준으로 2단계 절벽 g≈0.07 은 rho≈4 에 해당).
// 하드 제약 값은 어느 탐색에서도 바꾸지 않는다.
//
// 부분 탐색(보고용): b = 0 고정 / k_local = 0 고정으로 각 300점 — SFA 와 지역 억제 중 무엇이 승자독식을 깨는지.
//
// 점 평가는 worker_threads 로 병렬. 점의 표본 추출은 메인 스레드가 시드 하나로 순서대로 하므로 결과는 워커 수와 무관하다.
// 옵션: --points N (탐색점, 기본 1200) --boards N (탐색 보드, 200) --final N (재평가 보드, 2000) --top N (20)
//       --partial N (부분 탐색 점수, 300) --seed N --workers N (기본 cpu 수 − 2, 최대 8)

import { readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Worker } from 'node:worker_threads';
import { G_IN, SIGMA } from '../src/encode.js';
import { GAPS, LIF, SFA, WINDOW } from '../src/reservoir.js';
import { GATE_MARGIN, HARD, generateBoards, inputReference } from '../src/calibration.js';
import { createRng } from '../src/prng.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'data', 'calibration.json');

const argv = process.argv.slice(2);
const opt = (name, dflt) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? Number(argv[i + 1]) : dflt; };
const POINTS = opt('points', 1200);
const BOARDS = opt('boards', 200);
const FINAL_BOARDS = opt('final', 2000);
const TOP = opt('top', 20);
const PARTIAL = opt('partial', 300);
const SEED = opt('seed', 2026);
const WORKERS = opt('workers', Math.max(1, Math.min(8, os.cpus().length - 2)));

const SPEC_RANGE = { rhoTarget: [0.8, 1.3], b: [0, 2], kLocal: [0, 20], kGlobal: [0, 5], alpha: [0.5, 1.0], gap: GAPS };
const EXTENDED_RANGE = { ...SPEC_RANGE, rhoTarget: [0.8, 5.0] };

const round = (x, p = 4) => Number(x.toFixed(p));

// 시드 랜덤 표본 하나. fixed 로 축을 고정할 수 있다 (부분 탐색).
function samplePoint(rng, range, fixed = {}) {
  const u = ([lo, hi]) => round(lo + rng.next() * (hi - lo));
  const p = {
    rhoTarget: u(range.rhoTarget), b: u(range.b), kLocal: u(range.kLocal), kGlobal: u(range.kGlobal),
    alpha: range.alpha[rng.int(range.alpha.length)], gap: range.gap[rng.int(range.gap.length)],
  };
  return { ...p, ...fixed };
}

function fmt(m) {
  const pr = m.probe;
  return [
    m.rhoTarget.toFixed(3), m.alpha, m.b.toFixed(2), m.kLocal.toFixed(2), m.kGlobal.toFixed(2), String(m.gap).padStart(4),
    m.meanRateHz.toFixed(1).padStart(6), m.medianRateHz.toFixed(1).padStart(5), (m.ceilingFrac * 100).toFixed(1).padStart(5),
    (m.topSpikeShare * 100).toFixed(0).padStart(3), String(m.dnEverActive).padStart(3), m.rank.toString().padStart(3),
    m.msPerPlacement.toFixed(1).padStart(5), `${m.hard.met}/4${m.aborted ? 'A' : m.hard.all ? '*' : ' '}`,
    pr ? `${(pr.top1 * 100).toFixed(0).padStart(3)}/${(pr.controlTop1 * 100).toFixed(0).padStart(3)} R2 ${pr.featuresR2.toFixed(2)}` : '',
  ].join(' ');
}
const HEADER = 'rho   α   b    kL    kG    gap  meanHz medHz ceil% top  DN rank    ms hard  top1/ctrl';

// ---------- 워커 풀 ----------

function createPool(n, boards) {
  const workers = [];
  const ready = [];
  for (let i = 0; i < n; i++) {
    const w = new Worker(new URL('./calibrate-worker.js', import.meta.url), { workerData: { boards, seed: SEED } });
    workers.push(w);
    ready.push(new Promise((resolve, reject) => {
      w.once('message', (m) => (m.ready ? resolve() : reject(new Error('worker did not report ready'))));
      w.once('error', reject);
    }));
  }
  // jobs: [{ params, gap, boards, probe }] → 같은 순서의 결과 배열. onResult(result, doneCount) 는 완료 순서로 호출.
  async function run(jobs, onResult) {
    const results = new Array(jobs.length);
    let next = 0, done = 0;
    await Promise.all(workers.map((w) => new Promise((resolve, reject) => {
      const feed = () => {
        if (next >= jobs.length) { w.off('message', onMessage); w.off('error', reject); resolve(); return; }
        const id = next++;
        w.postMessage({ id, ...jobs[id], seed: SEED });
      };
      const onMessage = ({ id, result }) => {
        results[id] = result;
        onResult?.(result, ++done, id);
        feed();
      };
      w.on('message', onMessage);
      w.on('error', reject);
      feed();
    })));
    return results;
  }
  return { ready: Promise.all(ready), run, close: () => Promise.all(workers.map((w) => w.terminate())) };
}

async function search(pool, label, range, count, rng, fixed = {}) {
  console.log(`\n== ${label}: ${count} points, ${BOARDS} boards, rho ∈ [${range.rhoTarget}] ${Object.keys(fixed).length ? `fixed ${JSON.stringify(fixed)}` : ''}`);
  console.log(HEADER);
  const jobs = Array.from({ length: count }, () => {
    const { gap, ...params } = samplePoint(rng, range, fixed);
    return { params, gap, boards: BOARDS, probe: 'hard' };
  });
  const t0 = performance.now();
  const points = await pool.run(jobs, (m, done, id) => {
    if (m.hard.all || done % 50 === 0) console.log(`${String(id).padStart(4)} ${fmt(m)}`);
  });
  const pass = points.filter((p) => p.hard.all);
  console.log(`${label}: ${pass.length}/${count} pass hard constraints, ${points.filter((p) => p.aborted).length} aborted early, ${((performance.now() - t0) / 1000).toFixed(0)} s`);
  return { label, range, fixed, count, boards: BOARDS, passCount: pass.length, points };
}

async function main() {
  const spectral = JSON.parse(readFileSync(path.join(ROOT, 'data', 'spectral.json'), 'utf8'));
  const boards = Math.max(BOARDS, FINAL_BOARDS);
  const all = generateBoards(boards, { seed: SEED });
  const filled = all.slice(0, BOARDS).reduce((s, b) => s + b.board.reduce((a, v) => a + v, 0), 0) / BOARDS;
  console.log(`${boards} boards (seed ${SEED}, mean ${filled.toFixed(1)} filled cells in the first ${BOARDS}), window ${WINDOW}, G_IN ${G_IN}, ${WORKERS} workers`);
  console.log(`rho_unit: alpha 0.5 → ${spectral['0.5'].rhoUnit.toFixed(4)} (critical g ${spectral['0.5'].criticalG.toFixed(4)}), alpha 1 → ${spectral['1'].rhoUnit.toFixed(4)}`);

  const pool = createPool(WORKERS, boards);
  const t0 = performance.now();
  // 워커가 뜨는 동안 참조 프로브: 원 입력(보드 셀 + 조각)에 같은 프로브 → 선형 리드아웃의 과제 상한
  const reference = { [BOARDS]: inputReference(all.slice(0, BOARDS), { seed: SEED }), [FINAL_BOARDS]: inputReference(all, { seed: SEED }) };
  for (const [n, r] of Object.entries(reference)) {
    console.log(`input reference (${n} boards): top-1 ${(r.top1 * 100).toFixed(1)}% vs control ${(r.controlTop1 * 100).toFixed(1)}% (margin ${(r.top1Margin * 100).toFixed(1)}p, majority ${(r.majorityTop1 * 100).toFixed(1)}%), features R² ${r.featuresR2.toFixed(3)}`);
  }
  await pool.ready;
  console.log(`workers ready in ${((performance.now() - t0) / 1000).toFixed(0)} s`);

  const rng = createRng(SEED);
  const out = {
    calibratedAt: new Date().toISOString(),
    protocol: {
      boards: BOARDS, finalBoards: FINAL_BOARDS, seed: SEED, window: WINDOW, sequential: true,
      note: '리셋 한 번 후 표본을 순서대로 [gap → 창] 연속 구동. 지표는 각 창의 발화 수, 프로브는 창별 DN 발화율.',
      encoder: { G_IN, sigma: SIGMA }, lif: LIF, sfa: SFA,
      hard: HARD, gateMargin: GATE_MARGIN,
      earlyAbort: 'ceilingFrac > 2 × 5% after 40 boards → aborted (hard constraint fails regardless)',
      probes: 'search: hard-pass points only; re-evaluation: all',
    },
    rhoUnit: { 0.5: spectral['0.5'].rhoUnit, 1: spectral['1'].rhoUnit },
    inputReference: reference,
  };

  try {
    // 1. 스펙 범위 탐색
    out.search = await search(pool, 'spec search', SPEC_RANGE, POINTS, rng);
    let pool_ = out.search;

    // 2. 통과점이 없으면 확장 범위
    if (out.search.passCount === 0) {
      console.log('\nNO point in the spec range passes the hard constraints → extended rho range (reported separately)');
      out.extended = await search(pool, 'extended search', EXTENDED_RANGE, POINTS, rng);
      pool_ = out.extended;
    }
    const activeRange = pool_.range;

    // 3. 부분 탐색 (보고용)
    out.partial = {
      noSFA: await search(pool, 'partial: b = 0', activeRange, PARTIAL, rng, { b: 0 }),
      noLocal: await search(pool, 'partial: k_local = 0', activeRange, PARTIAL, rng, { kLocal: 0 }),
    };

    // 4. 상위 TOP 점 재평가 (보드 FINAL_BOARDS)
    const candidates = [...pool_.points, ...out.partial.noSFA.points, ...out.partial.noLocal.points]
      .filter((p) => p.hard.all && p.probe)
      .sort((a, b) => b.probe.top1 - a.probe.top1 || b.probe.top1Margin - a.probe.top1Margin)
      .slice(0, TOP);
    console.log(`\n== re-evaluating top ${candidates.length} hard-pass points with ${FINAL_BOARDS} boards`);
    console.log(HEADER);
    const finals = await pool.run(candidates.map((c) => {
      const { rhoTarget, alpha, b, kLocal, kGlobal, gap } = c;
      return { params: { rhoTarget, alpha, b, kLocal, kGlobal }, gap, boards: FINAL_BOARDS, probe: true };
    }), (m) => console.log(fmt(m)));
    finals.forEach((m, i) => { m.searchTop1 = candidates[i].probe.top1; });
    out.top = finals;
    out.topGapDistribution = Object.fromEntries(GAPS.map((g) => [String(g), candidates.filter((c) => String(c.gap) === String(g)).length]));

    // 5. 선택 + 게이트
    const feasible = finals.filter((m) => m.hard.all && m.probe);
    const selected = feasible.length ? [...feasible].sort((a, b) => b.probe.top1 - a.probe.top1)[0] : null;
    out.selected = selected;
    out.feasibleCount = { search: pool_.passCount, reevaluated: feasible.length };
    out.gate = selected
      ? { passed: selected.probe.top1Margin >= GATE_MARGIN, top1: selected.probe.top1, controlTop1: selected.probe.controlTop1, margin: selected.probe.top1Margin, required: GATE_MARGIN }
      : { passed: false, reason: 'no point passes the hard constraints' };
    out.fallback = selected ? null
      : [...pool_.points].sort((a, b) => b.hard.met - a.hard.met || (b.probe?.top1 ?? -1) - (a.probe?.top1 ?? -1))[0];
    writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');

    console.log(`\nhard-pass: spec ${out.search.passCount}/${POINTS}${out.extended ? `, extended ${out.extended.passCount}/${POINTS}` : ''}; re-evaluated feasible ${feasible.length}/${finals.length}; total ${((performance.now() - t0) / 60000).toFixed(1)} min`);
    console.log(`top-${TOP} gap distribution: ${JSON.stringify(out.topGapDistribution)}`);
    if (!selected) {
      console.error('NO point passes the hard constraints. selected = null; fallback (most constraints met) recorded for smoke-run.');
      console.error(`wrote ${path.relative(ROOT, OUT)}`);
      process.exitCode = 1;
      return;
    }
    const s = selected;
    console.log(`selected: rho ${s.rhoTarget} alpha ${s.alpha} b ${s.b} kLocal ${s.kLocal} kGlobal ${s.kGlobal} gap ${s.gap} (g = ${s.g.toFixed(5)})`);
    console.log(`  mean ${s.meanRateHz.toFixed(2)} Hz, median ${s.medianRateHz.toFixed(2)} Hz, active ${(s.activeFrac * 100).toFixed(1)}%, ceiling ${(s.ceilingFrac * 100).toFixed(2)}%, `
      + `top1% share ${(s.topSpikeShare * 100).toFixed(1)}%, DN active ${s.dnEverActive}/107, separation ${s.separation.toFixed(3)}, rank ${s.rank}`);
    console.log(`  probe (b) top-1 ${(s.probe.top1 * 100).toFixed(1)}% vs shuffle control ${(s.probe.controlTop1 * 100).toFixed(1)}% (margin ${(s.probe.top1Margin * 100).toFixed(1)}p, majority baseline ${(s.probe.majorityTop1 * 100).toFixed(1)}%)`);
    console.log(`  probe (a) features R² ${s.probe.featuresR2.toFixed(3)} vs control ${s.probe.controlFeaturesR2.toFixed(3)}; per feature ${s.probe.perFeatureR2.map((v) => v.toFixed(2)).join(' ')}`);
    console.log(`wrote ${path.relative(ROOT, OUT)}`);
    const ref = reference[FINAL_BOARDS];
    console.log(`  input reference at ${FINAL_BOARDS} boards: top-1 ${(ref.top1 * 100).toFixed(1)}% (margin ${(ref.top1Margin * 100).toFixed(1)}p), features R² ${ref.featuresR2.toFixed(3)}`);
    if (!out.gate.passed) {
      console.error(`GATE FAILED: margin ${(s.probe.top1Margin * 100).toFixed(1)}p < ${GATE_MARGIN * 100}p → Plan B`
        + (ref.top1Margin < GATE_MARGIN ? ` (note: the raw-input reference also fails the gate, margin ${(ref.top1Margin * 100).toFixed(1)}p)` : ''));
      process.exitCode = 1;
      return;
    }
    console.log('gate passed');
  } finally {
    await pool.close();
  }
}

main().catch((err) => { console.error(err); process.exit(2); });
