#!/usr/bin/env node
// 공격형 교사 가중치 튜닝 (6단계): CEM (cross-entropy method), 자체 대전 없이 단일 플레이 목적함수
//   J = 보낸 공격 라인 총합 + 0.5 × 생존 조각 수   (시드 평균)
// 세대 20, 개체 50, 상위 10% 로 평균·표준편차 갱신. 시드 고정. 세대 안에서는 모든 개체가 같은 시드(공통 난수)로 평가된다.
// 결과 → data/teacher-attack.json (파라미터 + CEM 이력 + 1000조각 평가: 공격 라인 분포 · 테트리스/T-스핀 비율 · 생존율).
// 목표: 1000조각 기준 공격 라인 중앙값 ≥ 250, 생존율 ≥ 90%. 미달이면 exit 1 (보고: 빔을 키우기 전에 특징 설계를 의심하라).
//
// 옵션: --generations N --population N --games N(개체당 시드 수) --cap N(CEM 게임 조각 상한) --eval-games N --workers N --quick

import os from 'node:os';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPool } from './pool.js';
import { createRng } from '../src/prng.js';
import { DEFAULT_PARAMS, FEATURES, PARAM_DIM, paramsToVector, vectorToParams } from '../src/teacher-attack.js';
import { median, quartiles, mean, bootstrapCI } from '../src/evaluate.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'data', 'teacher-attack.json');

const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? Number(argv[i + 1]) : def; };
const quick = argv.includes('--quick');
const CFG = {
  seed: 2026,
  generations: opt('generations', quick ? 2 : 20),
  population: opt('population', quick ? 8 : 50),
  eliteFrac: 0.1,
  gamesPerIndividual: opt('games', 2),
  cap: opt('cap', quick ? 150 : 700),          // CEM 평가 게임의 조각 상한 (최종 평가는 1000)
  evalGames: opt('eval-games', quick ? 4 : 20),
  evalCap: 1000,
  depth: 3, width: 8,
  workers: opt('workers', Math.max(1, Math.min(12, os.cpus().length - 2))),
  target: { attackMedian: 250, survival: 0.9 },
  sigmaFloorFrac: 0.1, // σ 하한 = 초기 σ × 이 비율 × (1 − 진행률)
};

const fmtMs = (ms) => (ms < 60000 ? `${(ms / 1000).toFixed(0)} s` : `${(ms / 60000).toFixed(1)} min`);
const r3 = (x) => Number(x.toFixed(3));

// 표준정규 (Box–Muller)
function gaussian(rng) {
  let u = 0, v = 0;
  while (u === 0) u = rng.next();
  v = rng.next();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

async function main() {
  const t0 = performance.now();
  const rng = createRng(CFG.seed);
  const pool = createPool(new URL('./teacher-worker.js', import.meta.url), CFG.workers);
  await pool.ready;
  const D = PARAM_DIM;
  const mu0 = paramsToVector(DEFAULT_PARAMS);
  const sigma0 = Float64Array.from(mu0, (m, i) => (i === D - 1 ? 2 : Math.max(1, 0.5 * Math.abs(m))));
  let mu = Float64Array.from(mu0), sigma = Float64Array.from(sigma0);
  const nElite = Math.max(2, Math.round(CFG.population * CFG.eliteFrac));
  console.log(`CEM: ${CFG.generations} generations × ${CFG.population} individuals, elite ${nElite}, ${CFG.gamesPerIndividual} games/individual (cap ${CFG.cap}), beam depth ${CFG.depth} width ${CFG.width}, ${CFG.workers} workers`);
  console.log(`params (${D}): ${FEATURES.join(', ')}, dangerHeight`);
  console.log(`mu0: ${Array.from(mu0, r3).join(' ')}`);

  const history = [];
  let bestEver = null;
  for (let gen = 0; gen < CFG.generations; gen++) {
    const tg = performance.now();
    const seeds = Array.from({ length: CFG.gamesPerIndividual }, (_, k) => 10000 + gen * 100 + k);
    const vectors = Array.from({ length: CFG.population }, () => Array.from(mu, (m, i) => m + sigma[i] * gaussian(rng)));
    // 개체를 워커 수 × 2 묶음으로 나눠 던진다 (개체 하나가 게임 2판 = 수 초)
    const chunk = Math.max(1, Math.ceil(CFG.population / (CFG.workers * 3)));
    const jobs = [];
    for (let i = 0; i < vectors.length; i += chunk) jobs.push({ type: 'evaluate', vectors: vectors.slice(i, i + chunk), seeds, cap: CFG.cap, depth: CFG.depth, width: CFG.width });
    const results = (await pool.run(jobs)).flat();
    const scored = results.map((r, i) => ({ ...r, v: vectors[i] })).sort((a, b) => b.J - a.J);
    const elite = scored.slice(0, nElite);
    const newMu = new Float64Array(D), newSigma = new Float64Array(D);
    for (const e of elite) for (let i = 0; i < D; i++) newMu[i] += e.v[i] / nElite;
    for (const e of elite) for (let i = 0; i < D; i++) newSigma[i] += (e.v[i] - newMu[i]) ** 2 / nElite;
    const progress = (gen + 1) / CFG.generations;
    for (let i = 0; i < D; i++) newSigma[i] = Math.sqrt(newSigma[i]) + CFG.sigmaFloorFrac * sigma0[i] * (1 - progress);
    mu = newMu; sigma = newSigma;
    const Js = scored.map((s) => s.J);
    if (!bestEver || scored[0].J > bestEver.J) bestEver = { J: scored[0].J, v: scored[0].v, gen };
    const eliteAttack = mean(elite.flatMap((e) => e.games.map((g) => g.attack)));
    const elitePieces = mean(elite.flatMap((e) => e.games.map((g) => g.pieces)));
    const eliteTetris = mean(elite.flatMap((e) => e.games.map((g) => g.tetris)));
    history.push({ gen, bestJ: r3(Js[0]), eliteMeanJ: r3(mean(Js.slice(0, nElite))), meanJ: r3(mean(Js)), eliteAttack: r3(eliteAttack), elitePieces: r3(elitePieces), eliteTetris: r3(eliteTetris), mu: Array.from(mu, r3), sigma: Array.from(sigma, r3), ms: Math.round(performance.now() - tg) });
    console.log(`gen ${String(gen).padStart(2)}  best J ${Js[0].toFixed(1)}  elite J ${mean(Js.slice(0, nElite)).toFixed(1)}  mean J ${mean(Js).toFixed(1)}  | elite attack ${eliteAttack.toFixed(1)} / pieces ${elitePieces.toFixed(0)} / tetris ${eliteTetris.toFixed(1)} (cap ${CFG.cap})  ${fmtMs(performance.now() - tg)}`);
    console.log(`        mu ${Array.from(mu, (m) => m.toFixed(2)).join(' ')}`);
  }
  const params = vectorToParams(mu);

  // ---------- 최종 평가: 1000 조각, 표준 빔 (플레이 모드) ----------
  const evalSeeds = Array.from({ length: CFG.evalGames }, (_, k) => 50000 + k);
  const playJobs = (extra) => evalSeeds.map((seed) => ({ type: 'play', params, seeds: [seed], cap: CFG.evalCap, depth: CFG.depth, width: CFG.width, ...extra }));
  const te = performance.now();
  const solo = (await pool.run(playJobs({}))).flat();
  const summary = (games) => {
    const attack = games.map((g) => g.attack), pieces = games.map((g) => g.pieces);
    const survived = games.filter((g) => g.survived).length / games.length;
    const lines = games.reduce((s, g) => s + g.lines, 0);
    const tetrisLines = games.reduce((s, g) => s + g.tetris * 4, 0);
    const tspinLines = games.reduce((s, g) => s + g.tspin, 0);
    const tetrises = games.reduce((s, g) => s + g.tetris, 0), tspins = games.reduce((s, g) => s + g.tspin, 0);
    return {
      games: games.length, attackMedian: median(attack), attackQuartiles: quartiles(attack), attackMean: r3(mean(attack)), attackMedianCI: bootstrapCI(attack, median, { seed: 11 }),
      attackPer1000: r3(1000 * games.reduce((s, g) => s + g.attack, 0) / games.reduce((s, g) => s + g.pieces, 0)),
      survival: survived, piecesMedian: median(pieces), linesTotal: lines, tetrises, tspins,
      tetrisLineShare: r3(tetrisLines / Math.max(1, lines)), tspinClearShare: r3(tspins / Math.max(1, games.reduce((s, g) => s + g.tetris + g.tspin + g.tspinMini, 0) + 1e-9)),
      tspinMini: games.reduce((s, g) => s + g.tspinMini, 0), perfectClears: games.reduce((s, g) => s + g.perfectClear, 0), maxCombo: Math.max(...games.map((g) => g.maxCombo)),
      msPerPiece: r3(games.reduce((s, g) => s + g.ms, 0) / games.reduce((s, g) => s + g.pieces, 0)),
      games_: games.map((g) => ({ seed: g.seed, attack: g.attack, pieces: g.pieces, lines: g.lines, tetris: g.tetris, tspin: g.tspin, tspinMini: g.tspinMini, perfectClear: g.perfectClear, maxCombo: g.maxCombo, holds: g.holds })),
    };
  };
  const soloSummary = summary(solo);
  console.log(`\n[eval] solo ${CFG.evalGames} games × cap ${CFG.evalCap}, standard beam: attack median ${soloSummary.attackMedian} [${soloSummary.attackMedianCI.map((v) => v.toFixed(0)).join(', ')}] (Q1/Q3 ${soloSummary.attackQuartiles[0]}/${soloSummary.attackQuartiles[2]}, mean ${soloSummary.attackMean}), per 1000 pieces ${soloSummary.attackPer1000}, survival ${(soloSummary.survival * 100).toFixed(0)}%, tetris line share ${(soloSummary.tetrisLineShare * 100).toFixed(0)}%, tetrises ${soloSummary.tetrises}, T-spins ${soloSummary.tspins} (mini ${soloSummary.tspinMini}), PC ${soloSummary.perfectClears}, ${soloSummary.msPerPiece} ms/piece  ${fmtMs(performance.now() - te)}`);
  // scored 모드 (데이터 수집 교사) — 더 비싸므로 게임 수를 줄인다
  const nScored = Math.max(2, Math.round(CFG.evalGames / 4));
  const ts = performance.now();
  const scoredGames = (await pool.run(playJobs({ scored: true }).slice(0, nScored))).flat();
  const scoredSummary = summary(scoredGames);
  console.log(`[eval] scored mode (collection teacher) ${nScored} games: attack median ${scoredSummary.attackMedian}, per 1000 ${scoredSummary.attackPer1000}, survival ${(scoredSummary.survival * 100).toFixed(0)}%, tetris share ${(scoredSummary.tetrisLineShare * 100).toFixed(0)}%, ${scoredSummary.msPerPiece} ms/piece  ${fmtMs(performance.now() - ts)}`);
  // 인공 가비지 하에서의 생존 (수집 분포와 같은 주입률)
  const garbage = { rate: 0.08, dist: [0.4, 0.3, 0.15, 0.15] };
  const tgb = performance.now();
  const garbageGames = (await pool.run(playJobs({ garbage }))).flat();
  const garbageSummary = summary(garbageGames);
  console.log(`[eval] with injected garbage (rate ${garbage.rate}/piece, 1–4 lines): attack median ${garbageSummary.attackMedian}, survival ${(garbageSummary.survival * 100).toFixed(0)}%, pieces median ${garbageSummary.piecesMedian}, received ${garbageGames.reduce((s, g) => s + g.garbageReceived, 0)} lines  ${fmtMs(performance.now() - tgb)}`);
  await pool.close();

  const met = soloSummary.attackMedian >= CFG.target.attackMedian && soloSummary.survival >= CFG.target.survival;
  const doc = {
    tunedAt: new Date().toISOString(), elapsedMs: Math.round(performance.now() - t0), config: CFG, features: FEATURES,
    params, search: { depth: CFG.depth, width: CFG.width },
    mu0: Array.from(mu0), sigma0: Array.from(sigma0), muFinal: Array.from(mu, r3), sigmaFinal: Array.from(sigma, r3), bestEver: { J: r3(bestEver.J), gen: bestEver.gen, params: vectorToParams(Float64Array.from(bestEver.v)) },
    history,
    evaluation: { solo: soloSummary, scored: scoredSummary, garbage: { ...garbageSummary, injection: garbage } },
    target: CFG.target, targetMet: met,
    note: '교사 점수·선택은 사람이 설계한 특징의 선형 평가 + 빔 서치다. 커넥톰과 무관한 지도 신호 생성기.',
  };
  writeFileSync(OUT, JSON.stringify(doc, null, 1) + '\n');
  console.log(`\nwrote ${path.relative(ROOT, OUT)}  (${fmtMs(doc.elapsedMs)})`);
  console.log(`params: ${FEATURES.map((k) => `${k} ${params.weights[k].toFixed(2)}`).join(', ')}, dangerHeight ${params.dangerHeight}`);
  if (!met) {
    console.error(`\nTARGET NOT MET: attack median ${soloSummary.attackMedian} (≥ ${CFG.target.attackMedian}), survival ${(soloSummary.survival * 100).toFixed(0)}% (≥ ${CFG.target.survival * 100}%). 빔 폭·깊이를 올리기 전에 특징 설계를 의심할 것.`);
    process.exit(1);
  }
  console.log('target met');
}

main().catch((err) => { console.error(err); process.exit(2); });
