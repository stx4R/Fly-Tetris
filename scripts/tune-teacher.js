#!/usr/bin/env node
// 공격형 교사 가중치 튜닝 (6단계): CEM (cross-entropy method), 자체 대전 없이 단일 플레이 목적함수
//   J = 보낸 공격 라인 총합 + 0.5 × 생존 조각 수   (시드 평균)
// 세대 20, 개체 50, 상위 10% 로 평균·표준편차 갱신. 시드 고정. 세대 안에서는 모든 개체가 같은 시드(공통 난수)로 평가된다.
// 결과 → data/teacher-attack.json (파라미터 + CEM 이력 + 1000조각 평가: 공격 라인 분포 · 테트리스/T-스핀 비율 · 생존율).
// 목표: 1000조각 기준 공격 라인 중앙값 ≥ 250, 생존율 ≥ 90%. 미달이면 exit 1 (보고: 빔을 키우기 전에 특징 설계를 의심하라).
//
// --ply 1 (7단계 Phase A-4, `npm run tune-teacher-1ply`): 같은 CEM (목적함수·세대·개체·시드 동일) 으로 1-ply 교사 (현재 조각만, hold·next 미참조) 의
//   가중치를 따로 튜닝 → data/teacher-attack-1ply.json. 빔 교사 파일은 건드리지 않는다 (상한 참조점). 평가에 가비지 포함 20 게임의 배치별 추적을 붙여
//   사망 원인 분류 (scripts/stage7-deaths.js 규칙) · 우물 유지 · 줄 구성을 기록한다 — 이 수치가 A-4 게이트의 기준점이다.
//   목표 (A-4 전제): 가비지 포함 조각 중앙값 ≥ 350. 미달이면 exit 1 — (A) 교사 약화로는 목표 달성이 불가능하다는 보고.
// --ply 1 --hold: 깊이 1 + hold 후보 (엔진 후보 집합) → data/teacher-attack-1ply-hold.json (A-4 대조 변형, 솔로 튜닝).
// --ply 1 --hold --garbage (Phase A-4′, `npm run tune-teacher-a4`): CEM 평가를 가비지 주입 조건 (0.08/조각, 1–4 줄 — 수집·게이트와 같은 분포) 에서 수행.
//   J 는 6단계 형태 그대로 (공격 + 0.5 × 조각); 가비지 rng 분산 때문에 개체당 게임 2 → 4. 세대·개체·시드는 동일. → data/teacher-attack-1ply-hold-garbage.json.
//   결과 가중치가 생존 쪽으로 치우쳤는지 (솔로 튜닝 1ply-hold 와 가중치·솔로 공격 비교, 엘리트 J 의 공격/생존 항 비중) 를 보고한다.
//   교사 파일은 변형마다 따로라 서로 덮어쓰지 않는다 (src/teacher-attack.js TEACHER_VARIANTS).
//
// 옵션: --generations N --population N --games N(개체당 시드 수) --cap N(CEM 게임 조각 상한) --eval-games N --workers N --quick --ply 1 [--hold] [--garbage] | --teacher KEY

import os from 'node:os';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPool } from './pool.js';
import { createRng } from '../src/prng.js';
import { DEFAULT_PARAMS, FEATURES, PARAM_DIM, TEACHER_VARIANTS, paramsToVector, variantOf, vectorToParams } from '../src/teacher-attack.js';
import { median, quartiles, mean, bootstrapCI } from '../src/evaluate.js';
import { summarizePlay, playLine } from './stage7-lib.js';
import { classifyDeath } from './stage7-deaths.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? Number(argv[i + 1]) : def; };
const quick = argv.includes('--quick');
const variant = variantOf(argv);
const V = TEACHER_VARIANTS[variant];
const { search } = V;
const ply = search.ply;
const holdVariant = ply === 1 && search.hold;
const OUT = path.join(ROOT, 'data', V.file);
const CFG = {
  seed: 2026,
  generations: opt('generations', quick ? 2 : 20),
  population: opt('population', quick ? 8 : 50),
  eliteFrac: 0.1,
  gamesPerIndividual: opt('games', V.gamesPerIndividual),   // 가비지 조건은 4 (rng 분산), 솔로는 2 (6단계)
  cap: opt('cap', quick ? 150 : 700),          // CEM 평가 게임의 조각 상한 (최종 평가는 1000)
  evalGames: opt('eval-games', quick ? 4 : 20),
  evalCap: 1000,
  variant, ply: search.ply, depth: search.depth, width: search.width, hold: search.hold,
  cemGarbage: V.garbage,                       // CEM 평가의 가비지 주입 (null = 솔로)
  workers: opt('workers', Math.max(1, Math.min(12, os.cpus().length - 2))),
  target: ply === 1 ? { piecesMedianGarbage: 350 } : { attackMedian: 250, survival: 0.9 },
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
  console.log(`CEM [${variant}]: ${CFG.generations} generations × ${CFG.population} individuals, elite ${nElite}, ${CFG.gamesPerIndividual} games/individual (cap ${CFG.cap}${CFG.cemGarbage ? `, garbage ${CFG.cemGarbage.rate}/piece injected` : ', solo'}), ${ply === 1 ? (holdVariant ? '1-ply teacher + hold candidates (depth 1; next[0] only while hold is empty)' : '1-ply teacher (current piece only, no hold/next)') : `beam depth ${CFG.depth} width ${CFG.width}`}, ${CFG.workers} workers → ${path.relative(ROOT, OUT)}`);
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
    for (let i = 0; i < vectors.length; i += chunk) jobs.push({ type: 'evaluate', vectors: vectors.slice(i, i + chunk), seeds, cap: CFG.cap, ply: CFG.ply, depth: CFG.depth, width: CFG.width, hold: CFG.hold, garbage: CFG.cemGarbage });
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
    const eliteGarbage = CFG.cemGarbage ? mean(elite.flatMap((e) => e.games.map((g) => g.garbageReceived ?? 0))) : null;
    const eliteSurvived = CFG.cemGarbage ? mean(elite.flatMap((e) => e.games.map((g) => (g.pieces >= CFG.cap ? 1 : 0)))) : null;
    history.push({ gen, bestJ: r3(Js[0]), eliteMeanJ: r3(mean(Js.slice(0, nElite))), meanJ: r3(mean(Js)), eliteAttack: r3(eliteAttack), elitePieces: r3(elitePieces), eliteTetris: r3(eliteTetris), eliteGarbageReceived: eliteGarbage === null ? null : r3(eliteGarbage), eliteSurvival: eliteSurvived === null ? null : r3(eliteSurvived), jShareAttack: r3(eliteAttack / (eliteAttack + 0.5 * elitePieces)), mu: Array.from(mu, r3), sigma: Array.from(sigma, r3), ms: Math.round(performance.now() - tg) });
    console.log(`gen ${String(gen).padStart(2)}  best J ${Js[0].toFixed(1)}  elite J ${mean(Js.slice(0, nElite)).toFixed(1)}  mean J ${mean(Js).toFixed(1)}  | elite attack ${eliteAttack.toFixed(1)} / pieces ${elitePieces.toFixed(0)} / tetris ${eliteTetris.toFixed(1)} (cap ${CFG.cap})${CFG.cemGarbage ? ` / garbage ${eliteGarbage.toFixed(0)} / survived ${(100 * eliteSurvived).toFixed(0)}%` : ''}  J share attack ${(100 * eliteAttack / (eliteAttack + 0.5 * elitePieces)).toFixed(0)}%  ${fmtMs(performance.now() - tg)}`);
    console.log(`        mu ${Array.from(mu, (m) => m.toFixed(2)).join(' ')}`);
  }
  const params = vectorToParams(mu);

  // ---------- 최종 평가: 1000 조각, 표준 빔 (플레이 모드) ----------
  const evalSeeds = Array.from({ length: CFG.evalGames }, (_, k) => 50000 + k);
  const playJobs = (extra) => evalSeeds.map((seed) => ({ type: 'play', params, seeds: [seed], cap: CFG.evalCap, ply: CFG.ply, depth: CFG.depth, width: CFG.width, hold: CFG.hold, ...extra }));
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
  // 1-ply: 배치별 추적 (사망 원인·우물·줄 구성 — A-4 게이트 기준점). 빔: 6단계와 같은 통계만.
  const garbageGames = (await pool.run(playJobs({ garbage, trace: ply === 1 }))).flat();
  const garbageSummary = summary(garbageGames);
  console.log(`[eval] with injected garbage (rate ${garbage.rate}/piece, 1–4 lines): attack median ${garbageSummary.attackMedian}, survival ${(garbageSummary.survival * 100).toFixed(0)}%, pieces median ${garbageSummary.piecesMedian}, received ${garbageGames.reduce((s, g) => s + g.garbageReceived, 0)} lines  ${fmtMs(performance.now() - tgb)}`);
  await pool.close();

  let tracked = null;
  if (ply === 1) {
    const s = summarizePlay(garbageGames);
    const deaths = s.games_.filter((g) => g.trace && !g.survived).map((g) => ({ seed: g.seed, pieces: g.pieces, ...classifyDeath(g.trace) }));
    const counts = {};
    for (const d of deaths) counts[d.cause] = (counts[d.cause] ?? 0) + 1;
    for (const g of s.games_) delete g.trace;
    tracked = { ...s, deaths: { counts, rows: deaths, garbageShare: deaths.length ? (counts.garbage ?? 0) / deaths.length : 0 } };
    console.log(`[eval] 1-ply with garbage (tracked): ${playLine(s)}`);
    console.log(`[eval] 1-ply deaths ${deaths.length}/${s.games}: ${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(', ') || 'none'} (garbage share ${(100 * tracked.deaths.garbageShare).toFixed(0)}%); well-run length median ${s.wellRuns.lengthMedian} p90 ${s.wellRuns.lengthP90} max ${s.wellRuns.lengthMax}; lines 1/2/3/4 ${s.lineComposition.single}/${s.lineComposition.double}/${s.lineComposition.triple}/${s.lineComposition.tetris}`);
  }

  // 가비지 조건 튜닝 (A-4′): 결과 가중치가 생존 쪽으로 치우쳤는가 — 솔로 튜닝 같은 구성(1ply-hold) 과 가중치·솔로 공격 비교 + 최종 엘리트 J 의 항 비중
  let bias = null;
  if (CFG.cemGarbage) {
    const soloKey = variant.replace(/-garbage$/, '');
    const soloFile = path.join(ROOT, 'data', TEACHER_VARIANTS[soloKey]?.file ?? '');
    const solo = soloKey !== variant && existsSync(soloFile) ? JSON.parse(readFileSync(soloFile, 'utf8')) : null;
    const last = history[history.length - 1];
    bias = {
      comparedTo: solo ? path.relative(ROOT, soloFile) : null,
      finalElite: { attack: last.eliteAttack, pieces: last.elitePieces, cap: CFG.cap, jShareAttack: last.jShareAttack, survival: last.eliteSurvival, garbageReceived: last.eliteGarbageReceived },
      weights: FEATURES.map((k) => ({ feature: k, garbageTuned: r3(params.weights[k]), soloTuned: solo ? r3(solo.params.weights[k]) : null })).concat([{ feature: 'dangerHeight', garbageTuned: params.dangerHeight, soloTuned: solo ? solo.params.dangerHeight : null }]),
      soloPlay: { garbageTuned: { attackMedian: soloSummary.attackMedian, tetrises: soloSummary.tetrises, survival: soloSummary.survival }, soloTuned: solo ? { attackMedian: solo.evaluation.solo.attackMedian, tetrises: solo.evaluation.solo.tetrises, survival: solo.evaluation.solo.survival } : null },
      garbagePlay: { garbageTuned: { piecesMedian: garbageSummary.piecesMedian, attackMedian: garbageSummary.attackMedian, survival: garbageSummary.survival }, soloTuned: solo ? { piecesMedian: solo.evaluation.garbage.piecesMedian, attackMedian: solo.evaluation.garbage.attackMedian, survival: solo.evaluation.garbage.survival } : null },
    };
    console.log(`\n[bias] final elite (cap ${CFG.cap}, garbage): attack ${last.eliteAttack} / pieces ${last.elitePieces} → J share attack ${(100 * last.jShareAttack).toFixed(0)}% (solo stage-6 tuning had all elites at cap, so J was attack-dominated)`);
    console.log(`[bias] weights garbage-tuned vs solo-tuned (${bias.comparedTo ?? 'no solo file'}): ${bias.weights.map((w) => `${w.feature} ${w.garbageTuned}${w.soloTuned !== null ? `/${w.soloTuned}` : ''}`).join(', ')}`);
    if (solo) console.log(`[bias] solo play attack median ${soloSummary.attackMedian} (solo-tuned ${solo.evaluation.solo.attackMedian}); garbage play pieces ${garbageSummary.piecesMedian} / attack ${garbageSummary.attackMedian} / survival ${(100 * garbageSummary.survival).toFixed(0)}% (solo-tuned ${solo.evaluation.garbage.piecesMedian} / ${solo.evaluation.garbage.attackMedian} / ${(100 * solo.evaluation.garbage.survival).toFixed(0)}%)`);
  }

  const met = ply === 1 ? garbageSummary.piecesMedian >= CFG.target.piecesMedianGarbage : soloSummary.attackMedian >= CFG.target.attackMedian && soloSummary.survival >= CFG.target.survival;
  const doc = {
    tunedAt: new Date().toISOString(), elapsedMs: Math.round(performance.now() - t0), config: CFG, features: FEATURES, variant, variantLabel: V.label,
    params, search: { ...search }, cemGarbage: CFG.cemGarbage, bias,
    mu0: Array.from(mu0), sigma0: Array.from(sigma0), muFinal: Array.from(mu, r3), sigmaFinal: Array.from(sigma, r3), bestEver: { J: r3(bestEver.J), gen: bestEver.gen, params: vectorToParams(Float64Array.from(bestEver.v)) },
    history,
    evaluation: { solo: soloSummary, scored: scoredSummary, garbage: { ...garbageSummary, injection: garbage }, ...(tracked ? { garbageTracked: tracked } : {}) },
    target: CFG.target, targetMet: met,
    note: ply === 1
      ? (holdVariant
        ? (CFG.cemGarbage
          ? 'Phase A-4′ 교사: 깊이 1 + hold 후보, CEM 을 가비지 주입 조건에서 튜닝 (튜닝 조건 = 평가 조건). hold 가 비어 있을 때만 next[0] 을 hold 조각으로 참조. 가비지 포함 평가가 A-4′ 게이트의 기준점.'
          : '대조 변형 (A-4 정지 근거): 깊이 1 + hold 후보, 솔로 튜닝. hold 가 비어 있을 때만 next[0] 을 hold 조각으로 참조. A-4 규격(현재 조각만)의 교사가 아니다 — 사용자 결정용 측정.')
        : '1-ply 교사 (Phase A-4): 같은 특징의 선형 평가, 깊이 1, 현재 조각만 (hold·next 미참조). 빔 교사(data/teacher-attack.json)는 상한 참조점. 가비지 포함 평가가 A-4 게이트의 기준점.')
      : '교사 점수·선택은 사람이 설계한 특징의 선형 평가 + 빔 서치다. 커넥톰과 무관한 지도 신호 생성기.',
  };
  writeFileSync(OUT, JSON.stringify(doc, null, 1) + '\n');
  console.log(`\nwrote ${path.relative(ROOT, OUT)}  (${fmtMs(doc.elapsedMs)})`);
  console.log(`params: ${FEATURES.map((k) => `${k} ${params.weights[k].toFixed(2)}`).join(', ')}, dangerHeight ${params.dangerHeight}`);
  if (!met) {
    if (ply === 1) console.error(`\nTARGET NOT MET: 1-ply teacher pieces median with garbage ${garbageSummary.piecesMedian} < ${CFG.target.piecesMedianGarbage} — (A) 교사 약화로는 A-4 목표(조각 ≥ 250, 교사의 70%)에 닿을 수 없다. 멈추고 보고; 다음은 (B).`);
    else console.error(`\nTARGET NOT MET: attack median ${soloSummary.attackMedian} (≥ ${CFG.target.attackMedian}), survival ${(soloSummary.survival * 100).toFixed(0)}% (≥ ${CFG.target.survival * 100}%). 빔 폭·깊이를 올리기 전에 특징 설계를 의심할 것.`);
    process.exit(1);
  }
  console.log('target met');
}

main().catch((err) => { console.error(err); process.exit(2); });
