#!/usr/bin/env node
// 4·5단계 실험: 조건(C0–C6, null 시드) × 리드아웃(R1–R3) × 목표(V1/V2) → data/results.json
//
//   조건마다  spectral → 재캘리브레이션(300점, 하드 제약 [+ 분리 제약], 선택 기준은 동작점 모드에 따라 withinKendall / 프로브 (a))
//            → afterstate 특징 추출 → 리드아웃 학습·회귀 지표 → 플레이(설정된 조합만)
//   C6 은 C0 리저버의 활동량 요약 5개를 리드아웃 입력으로 쓴다. 기준선: 무작위 / 교사.
//   결과는 조건 단위로 data/experiment/<key>-<hash>.json 에 캐시된다. 해시는 플레이 설정을 제외하므로 회귀 전용 실행(--games 0) 뒤
//   플레이 실행이 캘리브레이션·리드아웃을 재사용하고, 아직 없는 조합만 플레이한다.
//   설정·축 옵션은 experiment-config.js (--games --cap --null-seeds --workers --combos --quick --ignore-separation).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPool } from './pool.js';
import { parseConfig, playCombos, reservoirKeys } from './experiment-config.js';
import { createRng } from '../src/prng.js';
import { HARD } from '../src/calibration.js';
import { CONDITION_NAMES } from '../src/nullmodels.js';
import { playMetrics } from '../src/evaluate.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'data', 'results.json');
const CACHE_DIR = path.join(ROOT, 'data', 'experiment');

const round = (x, p = 4) => Number(x.toFixed(p));
const fmtMs = (ms) => (ms < 60000 ? `${(ms / 1000).toFixed(0)} s` : `${(ms / 60000).toFixed(1)} min`);

function samplePoint(rng, range) {
  const u = ([lo, hi]) => round(lo + rng.next() * (hi - lo));
  return { rhoTarget: u(range.rhoTarget), b: u(range.b), kLocal: u(range.kLocal), kGlobal: u(range.kGlobal), alpha: range.alpha[rng.int(range.alpha.length)], gap: range.gap[rng.int(range.gap.length)] };
}

// ---------- 조건 하나 ----------

// 선택 점수: 동작점 모드에 따라 withinKendall (분리 제약 모드) 또는 프로브 (a) 특징 R²
const scoreOf = (cfg, m) => (cfg.operating.selectBy === 'withinKendall' ? (m.separation?.withinKendall ?? -Infinity) : (m.probe?.featuresR2 ?? -Infinity));

async function calibrateCondition(pool, cfg, rk, log) {
  const { points, boards, top, finalBoards, range } = cfg.calibration;
  const op = cfg.operating;
  const sepMode = op.constraints === 'separation';
  const sepJob = sepMode ? { ...cfg.calibration.separation, seed: cfg.seed } : undefined;
  const rng = createRng(cfg.seed + 31);
  const jobs = Array.from({ length: points }, () => {
    const { gap, ...params } = samplePoint(rng, range);
    return { type: 'calibrate', key: rk.key, condition: rk.condition, seed: rk.seed, params, gap, T: op.T, gIn: op.gIn, boards, boardSeed: cfg.seed, probe: 'hard', separation: sepJob };
  });
  const t0 = performance.now();
  const results = await pool.run(jobs);
  const pass = results.filter((m) => m.hard.all && (sepMode ? m.separation : m.probe));
  const failBy = {};
  for (const m of results) for (const [k, ok] of Object.entries(m.hard)) if (k !== 'all' && k !== 'met' && !ok) failBy[k] = (failBy[k] ?? 0) + 1;
  log(`  calibrate (${op.constraints} constraints, select by ${op.selectBy}, T ${op.T}, G_IN×${op.gInMul}): ${pass.length}/${points} pass (fail counts ${JSON.stringify(failBy)}), ${fmtMs(performance.now() - t0)}`);
  const summary = (m) => ({ rhoTarget: m.rhoTarget, alpha: m.alpha, b: m.b, kLocal: m.kLocal, kGlobal: m.kGlobal, meanRateHz: m.meanRateHz, medianRateHz: m.medianRateHz, dnEverActive: m.dnEverActive, topSpikeShare: m.topSpikeShare, featuresR2: m.probe?.featuresR2, separation: m.separation && { distinctFrac: m.separation.distinctFrac, meanDNDiff: m.separation.meanDNDiff, withinKendall: m.separation.withinKendall, profile: m.separation.profile } });
  if (pass.length === 0) return { selected: null, passCount: 0, points: results.length, failBy, region: 'none', stage3Pass: results.filter((m) => m.hard.ceiling && m.hard.topShare && m.hard.dnActive && m.hard.median).map(summary) };
  const cands = [...pass].sort((a, b) => scoreOf(cfg, b) - scoreOf(cfg, a)).slice(0, top);
  const finals = await pool.run(cands.map((c) => ({
    type: 'calibrate', key: rk.key, condition: rk.condition, seed: rk.seed,
    params: { rhoTarget: c.rhoTarget, alpha: c.alpha, b: c.b, kLocal: c.kLocal, kGlobal: c.kGlobal }, gap: c.gap, T: op.T, gIn: op.gIn, boards: finalBoards, boardSeed: cfg.seed, probe: true,
    separation: sepMode ? { test: 50, train: 100, seed: cfg.seed } : undefined,
  })));
  const feasible = finals.filter((m) => m.hard.all);
  const selected = (feasible.length ? feasible : finals).sort((a, b) => scoreOf(cfg, b) - scoreOf(cfg, a))[0];
  log(`  selected alpha ${selected.alpha} rho ${selected.rhoTarget} b ${selected.b} kL ${selected.kLocal} kG ${selected.kGlobal}: mean ${selected.meanRateHz.toFixed(1)} Hz, median ${selected.medianRateHz.toFixed(1)}, DN ${selected.dnEverActive}, top1% ${(selected.topSpikeShare * 100).toFixed(1)}%, features R² ${selected.probe?.featuresR2?.toFixed(3)}`
    + (selected.separation ? `, distinct ${(selected.separation.distinctFrac * 100).toFixed(0)}%, dnDiff ${selected.separation.meanDNDiff.toFixed(1)}, τ ${selected.separation.withinKendall?.toFixed(3)}, profile ${selected.separation.profile.input.toFixed(0)}/${selected.separation.profile.hidden.toFixed(0)}/${selected.separation.profile.output.toFixed(1)}` : '') + ` (${finalBoards} boards)`);
  return { selected, passCount: pass.length, points: results.length, failBy, region: 'ok', top: finals, searchPass: pass.map(summary) };
}

async function featurizeCondition(pool, cfg, rk, params, nSamples, log, withActivity) {
  const chunk = 500;
  const jobs = [];
  for (let from = 0; from < nSamples; from += chunk) jobs.push({ type: 'featurize', key: rk.key, condition: rk.condition, seed: rk.seed, params, T: cfg.operating.T, gIn: cfg.operating.gIn, from, to: Math.min(nSamples, from + chunk), activity: withActivity });
  const t0 = performance.now();
  const parts = await pool.run(jobs);
  const dim = parts[0].dim;
  const X = new Float32Array(nSamples * dim);
  const A = withActivity ? new Float32Array(nSamples * 5) : null;
  let rate = 0;
  parts.forEach((p, i) => { X.set(p.dn, jobs[i].from * dim); if (A) A.set(p.act, jobs[i].from * 5); rate += p.meanRateHz * (jobs[i].to - jobs[i].from) / nSamples; });
  log(`  featurize: ${nSamples} afterstates × ${dim} DN, mean rate ${rate.toFixed(1)} Hz, ${fmtMs(performance.now() - t0)}`);
  return { X, A, dim, meanRateHz: rate };
}

async function trainCondition(pool, cfg, X, dim, log, seed) {
  const jobs = [];
  for (const readout of cfg.readouts) for (const target of cfg.targets) {
    const copy = X.slice();
    jobs.push({ type: 'train', readout, target, X: copy, dim, seed, transfer: [copy.buffer] });
  }
  const t0 = performance.now();
  const results = await pool.run(jobs);
  const out = {};
  results.forEach((r, i) => {
    const { readout, target } = jobs[i];
    out[`${readout}:${target}`] = r;
    const m = r.metrics;
    log(`  ${readout}:${target}  R² ${m.r2.toFixed(3)} [${m.r2CI.map((v) => v.toFixed(3)).join(', ')}]  τ ${m.tau.toFixed(3)} [${m.tauCI.map((v) => v.toFixed(3)).join(', ')}]  top-1 ${(m.top1 * 100).toFixed(1)}%  (${fmtMs(r.info.trainMs)}${r.info.bestEpoch ? `, epoch ${r.info.bestEpoch}` : ''})`);
  });
  log(`  train: ${fmtMs(performance.now() - t0)}`);
  return out;
}

// existing: 이미 있는 플레이 결과 (같은 games·cap 인 조합은 건너뛴다)
async function playCondition(pool, cfg, rk, params, mode, trained, log, existing = {}) {
  const combos = playCombos(cfg).filter(([r, t]) => trained[`${r}:${t}`]);
  const out = { ...existing };
  if (cfg.play.games === 0) return out;
  const seeds = Array.from({ length: cfg.play.games }, (_, i) => 100 + i);
  const per = Math.max(1, Math.ceil(seeds.length / pool.size));
  const jobs = [];
  for (const [readout, target] of combos) {
    const combo = `${readout}:${target}`;
    if (out[combo] && out[combo].settings?.games === cfg.play.games && out[combo].settings?.cap === cfg.play.cap) { log(`  play ${combo}: cached`); continue; }
    for (let s = 0; s < seeds.length; s += per) jobs.push({ type: 'play', key: rk.key, condition: rk.condition, seed: rk.seed, params, T: cfg.operating.T, gIn: cfg.operating.gIn, mode, readout: trained[combo].readout, target, seeds: seeds.slice(s, s + per), cap: cfg.play.cap, combo });
  }
  if (jobs.length === 0) return out;
  const t0 = performance.now();
  const results = await pool.run(jobs);
  const games = {};
  jobs.forEach((j, i) => { (games[j.combo] ??= []).push(...results[i]); });
  for (const combo of Object.keys(games)) {
    const pm = playMetrics(games[combo]);
    out[combo] = { games: games[combo], metrics: pm, settings: { games: cfg.play.games, cap: cfg.play.cap } };
    log(`  play ${combo}: lines median ${pm.linesMedian} [${pm.linesMedianCI.join(', ')}] (Q1 ${pm.linesQuartiles[0]}, Q3 ${pm.linesQuartiles[2]}), pieces median ${pm.piecesMedian}, capped ${pm.capped}/${pm.games}`);
  }
  log(`  play: ${fmtMs(performance.now() - t0)}`);
  return out;
}

// ---------- 메인 ----------

async function main() {
  const cfg = parseConfig();
  const { play: _play, baselines: _bl, workers: _w, ...hashed } = cfg; // 플레이 설정은 해시에서 뺀다 (회귀 전용 → 플레이 실행 재사용)
  const cfgHash = createHash('sha1').update(JSON.stringify(hashed)).digest('hex').slice(0, 8);
  mkdirSync(CACHE_DIR, { recursive: true });
  const afterMeta = JSON.parse(readFileSync(path.join(ROOT, 'data', 'afterstates.json'), 'utf8')).meta;
  const nSamples = afterMeta.afterstates;
  const keys = reservoirKeys(cfg);
  const combos = playCombos(cfg);
  console.log(`config ${cfgHash}: ${keys.length} reservoir conditions (+C6), readouts ${cfg.readouts.join('/')}, targets ${cfg.targets.join('/')}, play ${cfg.play.games} games × cap ${cfg.play.cap} × combos ${combos.map((c) => c.join(':')).join(',')}, ${cfg.workers} workers${cfg.quick ? ' [QUICK — pipeline check, not results]' : ''}`);
  console.log(`operating point: ${cfg.operating.source} — T ${cfg.operating.T}, G_IN ${cfg.operating.gIn} (×${cfg.operating.gInMul}), constraints ${cfg.operating.constraints}, select by ${cfg.operating.selectBy}, alpha range ${JSON.stringify(cfg.calibration.range.alpha)}, rho ${JSON.stringify(cfg.calibration.range.rhoTarget)}`);
  console.log(`afterstates: ${nSamples} (${afterMeta.games} games, split ${afterMeta.split.train.length}/${afterMeta.split.val.length}/${afterMeta.split.test.length})`);

  const pool = createPool(new URL('./experiment-worker.js', import.meta.url), cfg.workers);
  const tStart = performance.now();
  await pool.ready;
  console.log(`workers ready in ${fmtMs(performance.now() - tStart)}`);

  const results = { config: cfg, configHash: cfgHash, startedAt: new Date().toISOString(), hard: HARD, conditions: {}, baselines: {} };
  const save = (rec, key) => writeFileSync(path.join(CACHE_DIR, `${key}-${cfgHash}.json`), JSON.stringify(rec));
  const log = (s) => console.log(s);
  try {
    // 기준선
    const bPath = path.join(CACHE_DIR, `baselines-cap${cfg.play.cap}.json`);
    if (existsSync(bPath)) results.baselines = JSON.parse(readFileSync(bPath, 'utf8'));
    else if (cfg.baselines.games > 0 && cfg.play.games > 0) {
      const seeds = Array.from({ length: cfg.baselines.games }, (_, i) => 100 + i);
      for (const kind of ['random', 'teacher']) {
        const per = Math.max(1, Math.ceil(seeds.length / pool.size));
        const jobs = []; for (let s = 0; s < seeds.length; s += per) jobs.push({ type: 'baseline', kind, seeds: seeds.slice(s, s + per), cap: cfg.play.cap });
        const games = (await pool.run(jobs)).flat();
        results.baselines[kind] = { games, metrics: playMetrics(games) };
        log(`baseline ${kind}: lines median ${results.baselines[kind].metrics.linesMedian} [${results.baselines[kind].metrics.linesMedianCI.join(', ')}], pieces median ${results.baselines[kind].metrics.piecesMedian}`);
      }
      writeFileSync(bPath, JSON.stringify(results.baselines));
    }

    let c0Activity = null;
    for (const rk of keys) {
      const cPath = path.join(CACHE_DIR, `${rk.key}-${cfgHash}.json`);
      if (existsSync(cPath)) {
        const rec = JSON.parse(readFileSync(cPath, 'utf8'));
        results.conditions[rk.key] = rec;
        log(`\n== ${rk.key} (${CONDITION_NAMES[rk.condition]}): cached (calibration/readouts)`);
        if (rk.key === 'C0' && rec.activityFeatures) c0Activity = Float32Array.from(rec.activityFeatures);
        if (rec.params && rec.readouts) {
          const { gap, g, ...params } = rec.params;
          rec.play = await playCondition(pool, cfg, rk, params, 'dn', rec.readouts, log, rec.play ?? {});
          save(rec, rk.key);
        }
        continue;
      }
      log(`\n== ${rk.key} (${CONDITION_NAMES[rk.condition]}${rk.seed ? `, seed ${rk.seed}` : ''})`);
      const t0 = performance.now();
      const spectral = (await pool.run([{ type: 'spectral', key: rk.key, condition: rk.condition, seed: rk.seed }]))[0];
      log(`  ${spectral.nodeCount} nodes, ${spectral.edgeCount} edges; rho_unit alpha1 ${spectral.rhoUnit['1'].toFixed(4)} (converged ${spectral.converged['1']}), alpha0.5 ${spectral.rhoUnit['0.5'].toFixed(3)}`);
      const rec = { key: rk.key, condition: rk.condition, name: CONDITION_NAMES[rk.condition], seed: rk.seed, spectral };
      const cal = await calibrateCondition(pool, cfg, rk, log);
      rec.calibration = cal;
      if (!cal.selected) {
        rec.region = 'none';
        log(`  NO operating region — condition reported as-is, no readout/play`);
      } else {
        const p = cal.selected;
        const params = { rhoTarget: p.rhoTarget, alpha: p.alpha, b: p.b, kLocal: p.kLocal, kGlobal: p.kGlobal };
        rec.params = { ...params, gap: p.gap, g: p.g };
        const feats = await featurizeCondition(pool, cfg, rk, params, nSamples, log, rk.key === 'C0');
        rec.meanRateHz = feats.meanRateHz;
        rec.readouts = await trainCondition(pool, cfg, feats.X, feats.dim, log, cfg.seed);
        rec.play = await playCondition(pool, cfg, rk, params, 'dn', rec.readouts, log);
        if (rk.key === 'C0') { c0Activity = feats.A; rec.activityFeatures = Array.from(feats.A); }
      }
      rec.elapsedMs = performance.now() - t0;
      results.conditions[rk.key] = rec;
      save(rec, rk.key);
      log(`  ${rk.key} done in ${fmtMs(rec.elapsedMs)}`);
    }

    // C6: C0 리저버의 활동량 요약 5개
    if (cfg.conditions.includes('C6') && c0Activity && results.conditions.C0?.params) {
      const cPath = path.join(CACHE_DIR, `C6-${cfgHash}.json`);
      if (existsSync(cPath)) {
        const rec = JSON.parse(readFileSync(cPath, 'utf8'));
        results.conditions.C6 = rec;
        log(`\n== C6 (activity-only): cached`);
        const { gap, g, ...params } = results.conditions.C0.params;
        rec.play = await playCondition(pool, cfg, { key: 'C0', condition: 'C0', seed: 0 }, params, 'activity', rec.readouts, log, rec.play ?? {});
        save(rec, 'C6');
      } else {
        log(`\n== C6 (activity-only, C0 reservoir, 5 summary inputs)`);
        const t0 = performance.now();
        const rk = { key: 'C0', condition: 'C0', seed: 0 };
        const { gap, g, ...params } = results.conditions.C0.params;
        const rec = { key: 'C6', condition: 'C6', name: CONDITION_NAMES.C6, params: results.conditions.C0.params, spectral: results.conditions.C0.spectral };
        rec.readouts = await trainCondition(pool, cfg, c0Activity, 5, log, cfg.seed);
        rec.play = await playCondition(pool, cfg, rk, params, 'activity', rec.readouts, log);
        rec.elapsedMs = performance.now() - t0;
        results.conditions.C6 = rec;
        save(rec, 'C6');
      }
    }
  } finally {
    await pool.close();
  }
  results.elapsedMs = performance.now() - tStart;
  results.finishedAt = new Date().toISOString();
  // 캐시 파일의 대용량 필드는 results.json 에서 뺀다
  for (const rec of Object.values(results.conditions)) delete rec.activityFeatures;
  writeFileSync(OUT, JSON.stringify(results, null, 1) + '\n');
  console.log(`\ntotal ${fmtMs(results.elapsedMs)}; wrote ${path.relative(ROOT, OUT)}`);
}

main().catch((err) => { console.error(err); process.exit(2); });
