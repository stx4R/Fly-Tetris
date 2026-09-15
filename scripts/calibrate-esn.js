#!/usr/bin/env node
// Plan B 캘리브레이션: 같은 커넥톰 CSR 위의 ESN (src/esn.js) 을 같은 보드·프로브·게이트로 탐색한다.
// 스파이킹 모델의 최종 게이트가 미달일 때만 돌린다 (scripts/calibrate.js 가 exit 1 로 끝난 뒤).
//
//   탐색축  rho_target ∈ [0.8, 1.3] (여기서는 스펙트럼 반경이 곧 동역학 판정이라 스펙 범위 그대로), lr ∈ [0.05, 1],
//           inputScale ∈ [0.5, 50] (로그 균등), alpha ∈ {0.5, 1.0}, gap ∈ {0, 25, 50, 'full'}
//   하드 제약 (스파이킹 제약의 대응): 포화(|x| > 0.9) 비율 < 5%, 활성 DN ≥ 40, 분리도 ≥ 0.01 (입력 무관 고정점 배제)
//   시드 랜덤 240점(보드 200) → 하드 제약 통과 중 프로브 (b) top-1 상위 10점을 보드 2000개로 재평가 → 최대 선택 → 게이트 +10%p
//
// 옵션: --points N (240) --boards N (200) --final N (2000) --top N (10) --seed N --workers N

import { readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Worker } from 'node:worker_threads';
import { G_IN, SIGMA } from '../src/encode.js';
import { GAPS, WINDOW } from '../src/reservoir.js';
import { GATE_MARGIN, HARD_ESN, generateBoards } from '../src/calibration.js';
import { createRng } from '../src/prng.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'data', 'calibration-esn.json');

const argv = process.argv.slice(2);
const opt = (name, dflt) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? Number(argv[i + 1]) : dflt; };
const POINTS = opt('points', 240);
const BOARDS = opt('boards', 200);
const FINAL_BOARDS = opt('final', 2000);
const TOP = opt('top', 10);
const SEED = opt('seed', 2026);
const WORKERS = opt('workers', Math.max(1, Math.min(8, os.cpus().length - 2)));

const RANGE = { rhoTarget: [0.8, 1.3], lr: [0.05, 1], inputScaleLog: [Math.log(0.5), Math.log(50)], alpha: [0.5, 1.0], gap: GAPS };
const round = (x, p = 4) => Number(x.toFixed(p));

function samplePoint(rng) {
  const u = ([lo, hi]) => lo + rng.next() * (hi - lo);
  return {
    rhoTarget: round(u(RANGE.rhoTarget)), lr: round(u(RANGE.lr)), inputScale: round(Math.exp(u(RANGE.inputScaleLog))),
    alpha: RANGE.alpha[rng.int(RANGE.alpha.length)], gap: RANGE.gap[rng.int(RANGE.gap.length)],
  };
}

function fmt(m) {
  const pr = m.probe;
  return [
    m.rhoTarget.toFixed(3), m.alpha, m.lr.toFixed(2), m.inputScale.toFixed(2).padStart(6), String(m.gap).padStart(4),
    m.meanAbs.toFixed(3), (m.saturatedFrac * 100).toFixed(1).padStart(5), String(m.dnEverActive).padStart(3), m.rank.toString().padStart(3),
    m.msPerPlacement.toFixed(1).padStart(6), `${m.hard.met}/3${m.hard.all ? '*' : ' '}`,
    pr ? `${(pr.top1 * 100).toFixed(1).padStart(5)}/${(pr.controlTop1 * 100).toFixed(1).padStart(5)} R2 ${pr.featuresR2.toFixed(2)}/${pr.controlFeaturesR2.toFixed(2)}` : '',
  ].join(' ');
}
const HEADER = 'rho   α   lr   inScale  gap mean|x| sat%  DN rank     ms hard  top1/ctrl';

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
  async function run(jobs, onResult) {
    const results = new Array(jobs.length);
    let next = 0, done = 0;
    await Promise.all(workers.map((w) => new Promise((resolve, reject) => {
      const feed = () => {
        if (next >= jobs.length) { w.off('message', onMessage); w.off('error', reject); resolve(); return; }
        const id = next++;
        w.postMessage({ id, model: 'esn', ...jobs[id], seed: SEED });
      };
      const onMessage = ({ id, result }) => { results[id] = result; onResult?.(result, ++done, id); feed(); };
      w.on('message', onMessage);
      w.on('error', reject);
      feed();
    })));
    return results;
  }
  return { ready: Promise.all(ready), run, close: () => Promise.all(workers.map((w) => w.terminate())) };
}

async function main() {
  const spectral = JSON.parse(readFileSync(path.join(ROOT, 'data', 'spectral.json'), 'utf8'));
  const boards = Math.max(BOARDS, FINAL_BOARDS);
  generateBoards(BOARDS, { seed: SEED }); // 워커와 같은 생성기 (검증용 호출)
  console.log(`ESN (Plan B): ${POINTS} points, ${BOARDS} boards, window ${WINDOW}, G_IN ${G_IN}, ${WORKERS} workers`);
  const pool = createPool(WORKERS, boards);
  const t0 = performance.now();
  await pool.ready;
  console.log(`workers ready in ${((performance.now() - t0) / 1000).toFixed(0)} s`);

  const rng = createRng(SEED + 1);
  const out = {
    calibratedAt: new Date().toISOString(),
    model: 'esn',
    protocol: {
      boards: BOARDS, finalBoards: FINAL_BOARDS, seed: SEED, window: WINDOW, sequential: true,
      note: 'x(t+1) = (1-lr) x + lr tanh(W x + inputScale·I_ext); 출력 = 창 동안 DN 상태 평균. 프로브·게이트는 스파이킹 모델과 동일.',
      encoder: { G_IN, sigma: SIGMA }, range: RANGE, hard: HARD_ESN, gateMargin: GATE_MARGIN,
    },
    rhoUnit: { 0.5: spectral['0.5'].rhoUnit, 1: spectral['1'].rhoUnit },
  };
  try {
    console.log(`\n== ESN search: ${POINTS} points\n${HEADER}`);
    const jobs = Array.from({ length: POINTS }, () => { const { gap, ...params } = samplePoint(rng); return { params, gap, boards: BOARDS, probe: true }; });
    const t1 = performance.now();
    const points = await pool.run(jobs, (m, done, id) => { if (done % 20 === 0 || m.probe.top1Margin >= GATE_MARGIN) console.log(`${String(id).padStart(4)} ${fmt(m)}`); });
    const pass = points.filter((p) => p.hard.all);
    console.log(`ESN search: ${pass.length}/${POINTS} pass hard constraints, ${pass.filter((p) => p.probe.top1Margin >= GATE_MARGIN).length} clear the gate margin at ${BOARDS} boards, ${((performance.now() - t1) / 1000).toFixed(0)} s`);
    out.search = { count: POINTS, boards: BOARDS, passCount: pass.length, points };
    if (pass.length === 0) { console.error('NO ESN point passes the hard constraints'); writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n'); process.exitCode = 1; return; }

    const candidates = [...pass].sort((a, b) => b.probe.top1 - a.probe.top1 || b.probe.top1Margin - a.probe.top1Margin).slice(0, TOP);
    console.log(`\n== re-evaluating top ${candidates.length} with ${FINAL_BOARDS} boards\n${HEADER}`);
    const finals = await pool.run(candidates.map((c) => {
      const { rhoTarget, alpha, lr, inputScale, gap } = c;
      return { params: { rhoTarget, alpha, lr, inputScale }, gap, boards: FINAL_BOARDS, probe: true };
    }), (m) => console.log(fmt(m)));
    finals.forEach((m, i) => { m.searchTop1 = candidates[i].probe.top1; });
    out.top = finals;
    out.topGapDistribution = Object.fromEntries(GAPS.map((g) => [String(g), candidates.filter((c) => String(c.gap) === String(g)).length]));
    const feasible = finals.filter((m) => m.hard.all);
    const selected = [...(feasible.length ? feasible : finals)].sort((a, b) => b.probe.top1 - a.probe.top1)[0];
    out.selected = selected;
    out.feasibleCount = { search: pass.length, reevaluated: feasible.length };
    out.gate = { passed: selected.probe.top1Margin >= GATE_MARGIN, top1: selected.probe.top1, controlTop1: selected.probe.controlTop1, margin: selected.probe.top1Margin, required: GATE_MARGIN };
    const s = selected;
    let lif = null;
    try { lif = JSON.parse(readFileSync(path.join(ROOT, 'data', 'calibration.json'), 'utf8')); } catch { /* 스파이킹 결과 없음 */ }
    console.log(`\nselected ESN: rho ${s.rhoTarget} alpha ${s.alpha} lr ${s.lr} inputScale ${s.inputScale} gap ${s.gap} (g = ${s.g.toFixed(5)})`);
    console.log(`  mean|x| ${s.meanAbs.toFixed(3)}, saturated ${(s.saturatedFrac * 100).toFixed(1)}%, DN active ${s.dnEverActive}/107, separation ${s.separation.toFixed(3)}, rank ${s.rank}, ${s.msPerPlacement.toFixed(1)} ms/placement`);
    console.log(`  probe (b) top-1 ${(s.probe.top1 * 100).toFixed(1)}% vs shuffle control ${(s.probe.controlTop1 * 100).toFixed(1)}% (margin ${(s.probe.top1Margin * 100).toFixed(1)}p, majority ${(s.probe.majorityTop1 * 100).toFixed(1)}%)`);
    console.log(`  probe (a) features R² ${s.probe.featuresR2.toFixed(3)} vs control ${s.probe.controlFeaturesR2.toFixed(3)}; per feature ${s.probe.perFeatureR2.map((v) => v.toFixed(2)).join(' ')}`);
    if (lif?.selected) {
      const l = lif.selected.probe;
      console.log(`  vs spiking selected point: top-1 ${(l.top1 * 100).toFixed(1)}% (margin ${(l.top1Margin * 100).toFixed(1)}p), features R² ${l.featuresR2.toFixed(3)}`);
    }
    const ref = lif?.inputReference?.[FINAL_BOARDS];
    if (ref) console.log(`  vs raw-input reference: top-1 ${(ref.top1 * 100).toFixed(1)}% (margin ${(ref.top1Margin * 100).toFixed(1)}p), features R² ${ref.featuresR2.toFixed(3)}`);
    out.comparison = { spiking: lif?.selected ? { params: (({ rhoTarget, alpha, b, kLocal, kGlobal, gap }) => ({ rhoTarget, alpha, b, kLocal, kGlobal, gap }))(lif.selected), probe: lif.selected.probe } : null, inputReference: ref ?? null };
    writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
    console.log(`top-${TOP} gap distribution: ${JSON.stringify(out.topGapDistribution)}; total ${((performance.now() - t0) / 60000).toFixed(1)} min`);
    console.log(`wrote ${path.relative(ROOT, OUT)}`);
    if (!out.gate.passed) { console.error(`ESN GATE FAILED: margin ${(s.probe.top1Margin * 100).toFixed(1)}p < ${GATE_MARGIN * 100}p`); process.exitCode = 1; return; }
    console.log('ESN gate passed');
  } finally {
    await pool.close();
  }
}

main().catch((err) => { console.error(err); process.exit(2); });
