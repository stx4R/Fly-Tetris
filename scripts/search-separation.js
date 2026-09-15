#!/usr/bin/env node
// 5단계 1부: 분리 동작점 탐색 (C0 만). 시드 랜덤 600점:
//   alpha ∈ {0.5, 1}, rho ∈ [1, 5], b ∈ [0.1, 3], k_local ∈ [0, 0.5], k_global ∈ [0, 5], T ∈ {25, 50, 100}, G_IN 배율 ∈ [0.5, 6]
// 점마다: 3단계 하드 제약 (보드 200, 창 T) → 통과하면 분리 지표 (테스트 결정 50: distinctFrac, meanDNDiff, 전파 프로파일;
// 3단계 제약 통과 시 훈련 결정 100 으로 withinKendall). 분리 제약: distinctFrac ≥ 40%, meanDNDiff ≥ 5.
// 선택: 전 제약 통과 중 withinKendall 최대. 통과점이 없으면 selected = null, 최근접점(제약별 미달 폭) 기록.
// 벽시계 상한 3 h — 넘기면 끝낸 점만으로 판단한다. 결과: data/separation-search.json (전 탐색점).
//
// 분리 지표는 3단계 제약을 통과한 점에서만 잰다 (실패점은 폭주·침묵이라 지표가 무의미하고 비용이 크다). 단, ρ·T·G_IN 대
// distinctFrac 관계를 전 범위에서 보기 위해, 실패점 중에서도 --profile-all 이면 분리 지표(withinKendall 제외)를 잰다.

import { readFileSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPool } from './pool.js';
import { createRng } from '../src/prng.js';
import { HARD, HARD_SEP } from '../src/calibration.js';
import { G_IN } from '../src/encode.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'data', 'separation-search.json');

const argv = process.argv.slice(2);
const opt = (name, dflt) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? Number(argv[i + 1]) : dflt; };
const POINTS = opt('points', 600);
const BOARDS = opt('boards', 200);
const TEST_DEC = opt('test-decisions', 50);
const TRAIN_DEC = opt('train-decisions', 100);
const SEED = opt('seed', 2026);
const WORKERS = opt('workers', Math.max(1, Math.min(12, os.cpus().length - 2)));
const HOURS = opt('hours', 3);
const PROFILE_ALL = argv.includes('--profile-all');

export const SEP_RANGE = { alpha: [0.5, 1.0], rhoTarget: [1.0, 5.0], b: [0.1, 3.0], kLocal: [0, 0.5], kGlobal: [0, 5], T: [25, 50, 100], gInMul: [0.5, 6.0] };
const round = (x, p = 4) => Number(x.toFixed(p));
const fmtMs = (ms) => (ms < 60000 ? `${(ms / 1000).toFixed(0)} s` : `${(ms / 60000).toFixed(1)} min`);

function samplePoint(rng) {
  const u = ([lo, hi]) => round(lo + rng.next() * (hi - lo));
  return {
    alpha: SEP_RANGE.alpha[rng.int(2)], rhoTarget: u(SEP_RANGE.rhoTarget), b: u(SEP_RANGE.b), kLocal: u(SEP_RANGE.kLocal), kGlobal: u(SEP_RANGE.kGlobal),
    T: SEP_RANGE.T[rng.int(3)], gInMul: u(SEP_RANGE.gInMul),
  };
}

const fmt = (m) => [
  m.alpha, m.rhoTarget.toFixed(2), 'b', m.b.toFixed(2), 'kL', m.kLocal.toFixed(2), 'kG', m.kGlobal.toFixed(2), 'T', String(m.T).padStart(3), 'G×', m.gInMul.toFixed(2),
  '| mean', m.meanRateHz.toFixed(1).padStart(5), 'med', m.medianRateHz.toFixed(1).padStart(5), 'DN', String(m.dnEverActive).padStart(3), 'ceil', (m.ceilingFrac * 100).toFixed(1),
  m.separation ? `| distinct ${(m.separation.distinctFrac * 100).toFixed(0)}% dnDiff ${m.separation.meanDNDiff.toFixed(1)} prof ${m.separation.profile.input.toFixed(0)}/${m.separation.profile.hidden.toFixed(1)}/${m.separation.profile.output.toFixed(2)}${m.separation.withinKendall !== undefined ? ` τ ${m.separation.withinKendall.toFixed(3)}` : ''}` : '',
  `${m.hard.met}/${Object.keys(m.hard).length - 2}${m.hard.all ? '*' : m.aborted ? 'A' : ''}`,
].join(' ');

async function main() {
  const pool = createPool(new URL('./experiment-worker.js', import.meta.url), WORKERS);
  const t0 = performance.now();
  await pool.ready;
  console.log(`separation search: ${POINTS} points, ${BOARDS} boards, test decisions ${TEST_DEC}, train decisions ${TRAIN_DEC}, ${WORKERS} workers, wall cap ${HOURS} h`);
  const rng = createRng(SEED + 5);
  const specs = Array.from({ length: POINTS }, () => samplePoint(rng));
  const deadline = t0 + HOURS * 3600e3 * 0.95; // 마무리 여유
  const points = [];
  const batch = WORKERS * 2;
  let next = 0, stopped = false;
  try {
    while (next < specs.length) {
      if (performance.now() > deadline) { stopped = true; console.log(`\nwall cap reached after ${points.length} points — stopping`); break; }
      const chunk = specs.slice(next, next + batch);
      const jobs = chunk.map((p) => ({
        type: 'calibrate', key: 'C0', condition: 'C0', seed: 0,
        params: { rhoTarget: p.rhoTarget, alpha: p.alpha, b: p.b, kLocal: p.kLocal, kGlobal: p.kGlobal }, gap: 'full', T: p.T, gIn: round(G_IN * p.gInMul, 6),
        boards: BOARDS, boardSeed: SEED, probe: false,
        separation: { test: TEST_DEC, train: TRAIN_DEC, seed: SEED },
      }));
      const results = await pool.run(jobs);
      results.forEach((m, i) => {
        const p = chunk[i];
        const rec = { ...m, gInMul: p.gInMul, index: next + i };
        delete rec.probe;
        points.push(rec);
        if (m.hard.all || (next + i) % 20 === 0 || m.separation) console.log(`${String(next + i).padStart(4)} ${fmt(rec)}`);
      });
      next += chunk.length;
    }
    // 3단계 제약 실패점의 분리 프로파일 (선택, 보고서 그림용)
    if (PROFILE_ALL) {
      const failed = points.filter((m) => !m.separation && !m.aborted);
      console.log(`\nprofiling ${failed.length} points that failed the stage-3 constraints (no withinKendall)`);
      const seps = await pool.run(failed.map((m) => ({ type: 'separation', key: 'C0', condition: 'C0', seed: 0, params: { rhoTarget: m.rhoTarget, alpha: m.alpha, b: m.b, kLocal: m.kLocal, kGlobal: m.kGlobal }, T: m.T, gIn: m.gIn, test: TEST_DEC, seedSet: SEED })));
      failed.forEach((m, i) => { m.separationProfileOnly = seps[i]; });
    }
  } finally {
    await pool.close();
  }

  const pass = points.filter((m) => m.hard.all && m.separation);
  const selected = pass.length ? [...pass].sort((a, b) => b.separation.withinKendall - a.separation.withinKendall)[0] : null;
  // 최근접점: 3단계 제약 통과점 중 (distinctFrac 미달 + meanDNDiff 미달) 정규화 합이 최소
  const stage3pass = points.filter((m) => m.separation);
  const shortfall = (m) => ({
    distinctFrac: Math.max(0, HARD_SEP.distinctFrac - m.separation.distinctFrac),
    meanDNDiff: Math.max(0, HARD_SEP.meanDNDiff - m.separation.meanDNDiff),
  });
  const nearest = [...stage3pass].map((m) => ({ m, s: shortfall(m) })).sort((a, b) => (a.s.distinctFrac / HARD_SEP.distinctFrac + a.s.meanDNDiff / HARD_SEP.meanDNDiff) - (b.s.distinctFrac / HARD_SEP.distinctFrac + b.s.meanDNDiff / HARD_SEP.meanDNDiff)).slice(0, 10)
    .map(({ m, s }) => ({ index: m.index, alpha: m.alpha, rhoTarget: m.rhoTarget, b: m.b, kLocal: m.kLocal, kGlobal: m.kGlobal, T: m.T, gInMul: m.gInMul, distinctFrac: m.separation.distinctFrac, meanDNDiff: m.separation.meanDNDiff, profile: m.separation.profile, withinKendall: m.separation.withinKendall, shortfall: s, meanRateHz: m.meanRateHz, medianRateHz: m.medianRateHz }));
  const out = {
    searchedAt: new Date().toISOString(), range: SEP_RANGE, hard: HARD, hardSep: HARD_SEP,
    protocol: { points: POINTS, evaluated: points.length, boards: BOARDS, testDecisions: TEST_DEC, trainDecisions: TRAIN_DEC, seed: SEED, gap: 'full', wallCapHours: HOURS, stoppedByWallCap: stopped, elapsedMs: performance.now() - t0 },
    counts: { evaluated: points.length, stage3Pass: stage3pass.length, allPass: pass.length, aborted: points.filter((m) => m.aborted).length },
    selected, nearest, points,
  };
  writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
  console.log(`\n${points.length}/${POINTS} points evaluated in ${fmtMs(performance.now() - t0)}; stage-3 constraints pass ${stage3pass.length}, all constraints (incl. separation) pass ${pass.length}`);
  if (selected) {
    const s = selected;
    console.log(`SELECTED: alpha ${s.alpha} rho ${s.rhoTarget} b ${s.b} kL ${s.kLocal} kG ${s.kGlobal} T ${s.T} G_IN× ${s.gInMul} — distinct ${(s.separation.distinctFrac * 100).toFixed(0)}%, dnDiff ${s.separation.meanDNDiff.toFixed(1)}, τ ${s.separation.withinKendall.toFixed(3)}, profile ${JSON.stringify(s.separation.profile)}`);
  } else {
    console.log('NO point passes the separation constraints. nearest (stage-3 pass, smallest normalized shortfall):');
    for (const n of nearest.slice(0, 5)) console.log(`  ${n.alpha} rho ${n.rhoTarget} b ${n.b} T ${n.T} G× ${n.gInMul}: distinct ${(n.distinctFrac * 100).toFixed(0)}% (short ${(n.shortfall.distinctFrac * 100).toFixed(0)}p), dnDiff ${n.meanDNDiff.toFixed(1)} (short ${n.shortfall.meanDNDiff.toFixed(1)}), τ ${n.withinKendall?.toFixed(3)}`);
  }
  console.log(`wrote ${path.relative(ROOT, OUT)}`);
  process.exitCode = selected ? 0 : 1;
}

main().catch((err) => { console.error(err); process.exit(2); });
