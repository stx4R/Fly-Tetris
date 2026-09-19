#!/usr/bin/env node
// 7단계 Phase B — 배선 제약 대조군 학습·평가 (지시 §1–§5).
//
// C0(실제 커넥톰 마스크) 와 N1/N2/N3(대조 배선) 를 **완전히 같은 프로토콜**로 비교한다.
// 프로토콜은 data/stage7-c0.json 에 기록된 A-4′ 실측값에서 읽어 와 어긋나면 실행을 거부한다
// (하이퍼파라미터가 다르면 비교가 무효다 — 지시 §3).
//
//   C0  이미 학습된 A-4′ 모델을 그대로 불러와 50 게임 페어링 평가만 다시 한다 (재학습 없음).
//   N1  degree-preserving shuffle   N2  full random (same E)   N3  I/O placement shuffle
//   → 각 null 은 round 0 (교사 데이터, C0 와 동일) + DAgger 2 라운드 (자기 궤적) = 3 라운드.
//
// 평가는 4 모델이 **같은 게임 시드 50개**를 쓴다 (지시 §4 — 페어링이 검정력의 대부분).
// 라운드별 조기 종료(shouldStopDagger)는 Phase B 에서 끄고 항상 3 라운드를 돈다: C0 도 3 라운드를 돌았으므로
// 라운드 수가 모델마다 달라지면 프로토콜이 어긋난다. 개선 검정 결과는 기록만 한다.
//
// Phase A 게이트 미달 상태에서 돌리려면 --force-phase-b 가 필요하고, 그때 모든 산출 JSON 에
// gateStatus / forcedPhaseB 가 박힌다 (지시 §1).
//
// 산출 (모델 하나가 끝날 때마다 즉시 쓴다 — 중간에 죽어도 복구 가능):
//   data/stage7-n{1,2,3}.json · data/stage7-phaseB-c0.json
//   data/stage7/nulls/n{1,2,3}.model.{bin,json} · 체크포인트 data/stage7/b-n{i}-round{r}.*
// 옵션: --only C0,N1 --workers N --games N --teacher KEY --force-phase-b --no-resume

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { deserialize } from '../src/versus-data.js';
import { mergeDagger } from '../src/stage7-data.js';
import { HYPER, analyzeInputWeights, analyzeWeights, shouldStopDagger } from '../src/stage7-train.js';
import { NULL_NAMES, NULL_SEPARATES, PHASE_B_NULLS } from '../src/stage7-nulls.js';
import { buildDataset, calibrateState, ci, clearEpochCheckpoint, createSparseState, createTrainingPool, daggerCollect, DEFAULT_WORKERS, evaluateTest, fmtMs, loadGz, loadInputs, loadJson, loadTheta, maskFor, pct, playEval, playLine, quickEval, ROOT, saveGz, saveJson, saveModel, saveTheta, STAGE7_DIR, trainRound, variantOf } from './stage7-lib.js';
import { classifyDeath } from './stage7-deaths.js';
import { median } from '../src/evaluate.js';
import { buildAndCheck } from './phaseb-masks.js';

const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
const variant = variantOf(argv);
const forcePhaseB = argv.includes('--force-phase-b');
const resume = !argv.includes('--no-resume');
const NULLS_DIR = path.join(STAGE7_DIR, 'nulls');
const log = (s) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${s}`);
const STATUS = path.join(STAGE7_DIR, 'train-phaseb.status.json');
let statusDoc = { phase: 'B', pid: process.pid, startedAt: new Date().toISOString(), done: false };
const status = (patch) => { statusDoc = { ...statusDoc, ...patch, updatedAt: new Date().toISOString() }; try { writeFileSync(STATUS, JSON.stringify(statusDoc, null, 1) + '\n'); } catch {} };

// 4 모델이 공유하는 게임 시드 (지시 §4). 앞 20개는 A-4′ 최종 평가와 같은 시드라 20 vs 50 게임 비교가 가능하다.
const PLAY_GAMES = Number(opt('games', 50));
const PLAY_SEEDS = Array.from({ length: PLAY_GAMES }, (_, k) => 50000 + k);

function protocolFromC0(c0) {
  const c = c0.config;
  return {
    rounds: c.rounds, daggerDecisions: c.daggerDecisions, daggerCap: c.daggerCap, daggerSeedBase: c.daggerSeedBase, daggerValFraction: c.daggerValFraction,
    trainDecisions: c.trainDecisions, valDecisions: c.valDecisions, valFullDecisions: c.valFullDecisions,
    loss: c.loss, lambda: c.lambda, mu: c.mu, selectBy: c.selectBy, negatives: c.negatives, hardNegatives: c.hardNegatives,
    weightDecay: c.weightDecay, dropoutZ: c.dropoutZ, dropoutH: c.dropoutH,
    round0: c.round0, finetune: c.finetune, playCap: c.playCap, quickGames: c.quickGames, quickSeedBase: c.quickSeedBase,
    teacherVariant: c.teacherVariant, seed: HYPER.seed,
  };
}

async function buildState(connectome, kind, ds, c0doc) {
  const mask = maskFor(connectome, kind, 0);
  const state = createSparseState(mask, HYPER);
  if (kind === 'C0') {
    // A-4′ 최종 모델을 그대로 복원한다: 리드아웃 표준화는 저장된 사양에서, theta 는 라운드 2 체크포인트(Float64)에서.
    const spec = loadJson('c0.model.json')?.spec;
    if (!spec) throw new Error('data/stage7/c0.model.json 없음 — C0 를 복원할 수 없다');
    state.model.dnMean.set(Float64Array.from(spec.dnMean));
    state.model.dnStd.set(Float64Array.from(spec.dnStd));
    const tag = `${(c0doc.phase ?? '').startsWith('A-4') ? 'a4' : 'a3'}-c0-round${c0doc.rounds.length - 1}`;
    if (!loadTheta(tag, state.theta)) throw new Error(`data/stage7/${tag}.theta.f64 없음 — C0 최종 가중치를 불러올 수 없다`);
    log(`C0: 복원 완료 (${tag}.theta.f64, dnMean/dnStd 는 c0.model.json)`);
  } else {
    calibrateState(state, ds, 256);
  }
  return { mask, state };
}

async function runModel(kind, ctx) {
  const { connectome, teacher, data, garbage, dataFile, c0doc, proto, workers, gateStatus } = ctx;
  const isC0 = kind === 'C0';
  const outFile = path.join(ROOT, 'data', isC0 ? 'stage7-phaseB-c0.json' : `stage7-n${kind[1]}.json`);
  if (resume && existsSync(outFile)) { log(`${kind}: ${path.relative(ROOT, outFile)} 이미 있음 — 건너뜀`); return JSON.parse(readFileSync(outFile, 'utf8')); }
  const t0 = performance.now();
  status({ stage: 'start', model: kind });

  // ---------- 마스크 sanity check (지시 §2 — 실패하면 즉시 중단) ----------
  let sanity = null;
  if (!isC0) {
    const c0P = c0doc.model?.P ?? 1067041;
    const r = buildAndCheck(connectome, kind, 0, c0P);
    sanity = r.sanity;
    log(`${kind} ${NULL_NAMES[kind]}: sanity ${sanity.pass ? 'PASS' : 'FAIL'} — N ${sanity.N}, E ${sanity.E}, P ${sanity.P} (C0 ${c0P}), 원본 간선 교집합 ${(100 * sanity.edgeOverlapWithOriginal).toFixed(2)}% (우연 ${(100 * sanity.chanceOverlap).toFixed(2)}%), 차수 ${sanity.degreeIdentical ? '원본 동일' : '이항'}, 입출력 ${sanity.inputSetSameAsC0 ? '원본 유지' : '재추출'}`);
    if (!sanity.pass) { for (const c of sanity.checks.filter((x) => !x.ok)) log(`    FAIL ${c.name} — ${c.detail}`); throw new Error(`${kind} sanity check 실패 — 중단 (지시 §9)`); }
  }

  // ---------- 데이터셋 (round 0 은 C0 와 같은 교사 데이터·같은 시드 → 결정적으로 동일) ----------
  const ds = buildDataset(data, { trainDecisions: proto.trainDecisions, valDecisions: proto.valDecisions, negatives: proto.negatives, hard: proto.hardNegatives, valFullDecisions: proto.valFullDecisions, daggerRows: 0 });
  if (ds.meta.trainDecisions !== c0doc.data.trainDecisions || ds.meta.testDecisions !== c0doc.data.testDecisions) {
    throw new Error(`데이터셋이 C0 와 다르다 (train ${ds.meta.trainDecisions} vs ${c0doc.data.trainDecisions}, test ${ds.meta.testDecisions} vs ${c0doc.data.testDecisions}) — 비교 무효`);
  }
  const { mask, state } = await buildState(connectome, kind, ds, c0doc);
  let tp = await createTrainingPool(state, ds, { workers, teacher });

  const rounds = [];
  const quickHistory = [];
  const quickSeeds = Array.from({ length: proto.quickGames }, (_, k) => proto.quickSeedBase + k);
  let untrained = null;
  let notLearned = null;
  let retried = false;
  let nextGameId = ds.nextGameId;
  let adam = null;

  if (!isC0) {
    untrained = await evaluateTest(tp, ds.test);
    log(`${kind}: untrained (init only) test rel-regret ${untrained.relRegret.toFixed(4)}, top-1 ${pct(untrained.top1)} ${ci(untrained.top1CI, pct)}; chance ${pct(untrained.chance.top1)}  (${fmtMs(untrained.ms)})`);
    const untrainedTop1 = c0doc.untrained?.top1 ?? 0.232;

    for (let r = 0; r <= proto.rounds; r++) {
      const tr = performance.now();
      const tag = `b-${kind.toLowerCase()}-round${r}`;
      let dagger = null;
      if (r >= 1) {
        const file = `b-${kind.toLowerCase()}-dagger${r}.json.gz`;
        status({ stage: 'dagger', model: kind, round: r });
        let doc = resume ? loadGz(file) : null;
        if (doc) log(`${kind} round ${r}: DAgger 데이터 불러옴 (${doc.games.length} games, ${doc.decisions} decisions)`);
        else {
          log(`${kind} round ${r}: DAgger — 자기 궤적 ${proto.daggerDecisions} 결정 (cap ${proto.daggerCap}/game, garbage ${garbage.rate}/piece), 교사가 모든 후보에 라벨. 시드 기준은 C0 와 동일`);
          const dg = await daggerCollect(tp, { target: proto.daggerDecisions, cap: proto.daggerCap, injector: garbage, fromId: nextGameId, seedBase: proto.daggerSeedBase + r * 100_000, workers, log });
          doc = { round: r, games: dg.games, decisions: dg.decisions, stats: dg.stats, ms: dg.ms };
          saveGz(file, doc);
        }
        nextGameId = Math.max(nextGameId, ...doc.games.map((g) => g.id)) + 1;
        const games = deserialize({ games: doc.games, meta: { split: null } }).games;
        const m = mergeDagger(ds, games, { valFraction: proto.daggerValFraction });
        dagger = { ...doc.stats, merged: m, ms: doc.ms };
        log(`${kind} round ${r}: DAgger ${doc.stats.games} games / ${doc.stats.decisions} decisions (dead ${doc.stats.deadGames}, on-policy 일치율 ${pct(doc.stats.agreeWithTeacher)}, attack/1000 ${doc.stats.attackPer1000}, tetrises ${doc.stats.tetrises}) → train ${ds.train.length} / val ${ds.val.length}  (${fmtMs(doc.ms)})`);
      }
      const prev = resume ? loadJson(`${tag}.json`) : null;
      if (prev && loadTheta(tag, state.theta)) {
        log(`${kind} round ${r}: 체크포인트 불러옴 (rel-regret ${prev.test.relRegret.toFixed(4)}, top-1 ${pct(prev.test.top1)}, quick pieces ${prev.quick.piecesMedian}) — 건너뜀`);
        rounds.push({ ...prev, dagger: dagger ?? prev.dagger, resumed: true });
        quickHistory.push({ round: r, pieces: prev.quick.pieces });
        adam = null;
        continue;
      }
      const opts = r === 0 ? proto.round0 : proto.finetune;
      for (let attempt = 0; attempt < 2; attempt++) {
        log(`${kind} round ${r}: 학습 ${ds.train.length} 결정 (val ${ds.val.length}), ${proto.loss} λ ${proto.lambda} μ ${proto.mu}, lr ${opts.lr} cosine → ${opts.lrMin}, ≤ ${opts.maxEpochs} epochs, patience ${opts.patience}, batch ${opts.batch}, wd ${proto.weightDecay}${adam ? ', Adam 상태 이어감' : ''}${attempt ? ` [재시도 ${attempt}]` : ''}`);
        status({ stage: 'training', model: kind, round: r, epoch: 0, trainDecisions: ds.train.length, maxEpochs: opts.maxEpochs, attempt });
        const train = await trainRound(tp, state, ds, {
          ...opts, loss: proto.loss, lambda: proto.lambda, mu: proto.mu, selectBy: proto.selectBy, weightDecay: proto.weightDecay,
          seed: 1 + r + (attempt ? 1000 : 0), adam, checkpoint: resume && !attempt ? tag : null,
          log: (h) => {
            if (h.message) log(`  ${h.message}`);
            else if (h.epoch !== undefined && h.val !== undefined) {
              log(`  epoch ${h.epoch}: train ${h.train.toFixed(4)} val ${h.val.toFixed(4)}${h.valRegret ? ` valFull rel-regret ${h.valRegret.relRegret.toFixed(4)} (top-1 ${pct(h.valRegret.top1)})` : ''} lr ${h.lr.toExponential(2)} |g| ${h.gradNorm.toFixed(2)} clipped ${pct(h.clippedFrac)} (${fmtMs(h.ms)})`);
              status({ stage: 'training', model: kind, round: r, epoch: h.epoch, val: h.val, valRelRegret: h.valRegret?.relRegret ?? null, epochMs: h.ms });
            }
          },
        });
        adam = train.adam;
        log(`${kind} round ${r}: ${train.epochs} epochs (best ${train.best.epoch} by ${train.best.criterion} ${train.best.valLoss.toFixed(4)}), ${train.steps} steps  (${fmtMs(train.ms)})`);
        status({ stage: 'evaluating', model: kind, round: r });
        const test = await evaluateTest(tp, ds.test);
        log(`${kind} round ${r}: test rel-regret ${test.relRegret.toFixed(4)} ${ci(test.relRegretCI, (v) => v.toFixed(3))}, τ ${test.tau.toFixed(3)}, top-1 ${pct(test.top1)} ${ci(test.top1CI, pct)}, bottom-half ${pct(test.bottomHalfRate)}  (${fmtMs(test.ms)})`);
        const q = await quickEval(tp, { seeds: quickSeeds, cap: proto.playCap, injector: garbage });
        log(`${kind} round ${r}: quick ${q.seeds.length} games: pieces ${q.pieces.join('/')} → median ${q.piecesMedian}, attack ${q.attack.join('/')}, tetrises ${q.tetris.join('/')}  (${fmtMs(q.ms)})`);
        // 지시 §9: 미학습 수준에서 개선이 없으면 재시도 1회, 그래도 안 되면 그 사실을 결과로 기록하고 계속 간다.
        const learned = test.top1 > untrainedTop1 + 0.03;
        if (r === 0 && !learned && attempt === 0) {
          retried = true;
          log(`${kind} round 0: top-1 ${pct(test.top1)} ≤ 미학습 기준 ${pct(untrainedTop1)} + 3%p — 학습이 되지 않았다. 시드를 바꿔 재시도 1회 (지시 §9).`);
          adam = null;
          continue;
        }
        if (r === 0 && !learned) { notLearned = { round: 0, top1: test.top1, untrainedTop1, retried: true, note: '같은 프로토콜로 학습이 되지 않았다 — 결과로 기록하고 남은 라운드를 계속 돌린다 (지시 §9).' }; log(`${kind}: 재시도 후에도 미학습 수준 — 기록하고 계속 진행`); }
        const rec = { round: r, trainDecisions: ds.train.length, valDecisions: ds.val.length, dagger, train: { ...train, adam: undefined }, test, quick: q, attempt, ms: Math.round(performance.now() - tr) };
        rounds.push(rec);
        quickHistory.push({ round: r, pieces: q.pieces });
        saveTheta(tag, state.theta);
        saveJson(`${tag}.json`, rec);
        clearEpochCheckpoint(tag);
        break;
      }
      // 개선 검정은 기록만 한다 (Phase B 는 조기 종료하지 않는다 — 라운드 수를 C0 와 맞춘다)
      if (r >= 1) {
        const es = shouldStopDagger(quickHistory, { consecutive: 99 });
        const f = es.flags[es.flags.length - 1];
        if (f) log(`${kind} round ${r}: 쌍대 개선 vs round ${r - 1}: Δpieces ${f.delta.toFixed(1)} ${ci(f.deltaCI, (v) => v.toFixed(0))} → ${f.improved ? '개선' : '개선 없음 (CI 가 0 포함)'} [기록만; Phase B 는 조기 종료 안 함]`);
      }
    }
  }

  // ---------- 최종 평가: 4 모델 공유 시드 50 게임 (페어링) ----------
  status({ stage: 'final-eval', model: kind });
  const play = await playEval(tp, { seeds: PLAY_SEEDS, cap: proto.playCap, injector: garbage, trace: true });
  log(`${kind}: 최종 플레이 ${play.games} games × ${proto.playCap} (공유 시드, 가비지): ${playLine(play)}  (${fmtMs(play.ms)})`);
  const deaths = play.games_.filter((g) => g.trace && !g.survived).map((g) => ({ seed: g.seed, pieces: g.pieces, ...classifyDeath(g.trace) }));
  const deathCounts = {};
  for (const d of deaths) deathCounts[d.cause] = (deathCounts[d.cause] ?? 0) + 1;
  const garbageDeathShare = deaths.length ? (deathCounts.garbage ?? 0) / deaths.length : 0;
  const totalPieces = play.games_.reduce((s, g) => s + g.pieces, 0);
  const holdsPerPiece = play.holds / Math.max(1, totalPieces);
  log(`${kind}: 사망 ${deaths.length}/${play.games} — ${Object.entries(deathCounts).map(([k, v]) => `${k} ${v}`).join(', ')} (가비지 비중 ${pct(garbageDeathShare)}); holds/piece ${holdsPerPiece.toFixed(3)}`);
  for (const g of play.games_) delete g.trace;
  const test = isC0 ? await evaluateTest(tp, ds.test) : rounds[rounds.length - 1].test;
  if (isC0) log(`C0: test rel-regret ${test.relRegret.toFixed(4)} ${ci(test.relRegretCI, (v) => v.toFixed(3))}, top-1 ${pct(test.top1)} ${ci(test.top1CI, pct)} (A-4′ 기록 ${c0doc.gate.measured.relRegret.toFixed(4)} / ${pct(c0doc.gate.measured.top1)})`);
  await tp.close();
  tp = null;

  // ---------- 배선 변화 측정 (지시 §5) ----------
  const wFinal = state.theta.subarray(state.layout.off.W, state.layout.off.W + mask.E);
  const weights = analyzeWeights(mask, state.wInit, wFinal);
  const winFinal = state.theta.subarray(state.layout.off.Win, state.layout.off.Win + state.layout.sizes.Win);
  const inputWeights = analyzeInputWeights(state.winInit, winFinal, mask.nInput);
  const o = weights.overall;
  log(`${kind}: W vs init — corr ${o.corr.toFixed(4)}, |Δw| mean ${o.meanAbsDelta.toExponential(3)} (init ${o.meanInit.toExponential(3)}), 억제성 ${pct(o.inhibitoryFrac)}, ‖W‖ ${weights.norms.init.toFixed(2)} → ${weights.norms.final.toFixed(2)}; W_in 보드열 corr ${inputWeights.board.corr.toFixed(3)}`);

  const doc = {
    ranAt: new Date().toISOString(), phase: 'B', model: kind, name: isC0 ? 'real connectome (A-4′ 학습 모델)' : NULL_NAMES[kind], separates: isC0 ? null : NULL_SEPARATES[kind],
    gateStatus, forcedPhaseB: forcePhaseB, teacherVariant: variant,
    protocol: proto, protocolSource: 'data/stage7-c0.json (A-4′ 실측)', retrained: !isC0,
    sanity, model: { P: state.P, N: mask.N, E: mask.E, nInput: mask.nInput, nOutput: mask.nOutput, rhoUnit: mask.rhoUnit, condition: mask.condition },
    data: { ...ds.meta, teacher: teacher.source, dataFile, garbage },
    untrained, notLearned, retried, rounds, quickHistory,
    playSeeds: PLAY_SEEDS, play, deaths: { total: deaths.length, counts: deathCounts, garbageDeathShare, list: deaths },
    test, holdsPerPiece, weights: { vsInit: o, byBlock: weights.byBlock, byPostRoiMostChanged: weights.byPostRoiMostChanged, kc: weights.kc, norms: weights.norms }, inputWeights,
    elapsedMs: Math.round(performance.now() - t0),
    note: 'Phase A 게이트 미달(3/5) 상태의 학생으로 돌린 Phase B — gateStatus/forcedPhaseB 참조. 조기 종료 없음(라운드 수를 C0 와 맞춤).',
  };
  writeFileSync(outFile, JSON.stringify(doc, null, 1) + '\n');
  if (!isC0) {
    if (!existsSync(NULLS_DIR)) mkdirSync(NULLS_DIR, { recursive: true });
    saveModel(`nulls/${kind.toLowerCase()}`, state, {
      maskType: `${kind.toLowerCase()}-${NULL_NAMES[kind].replace(/[^a-z]+/gi, '-').toLowerCase().replace(/^-|-$/g, '')}`,
      phaseBNull: kind, gateStatus, forcedPhaseB: forcePhaseB,
      teacher: { variant, ply: teacher.ply, depth: teacher.depth, width: teacher.width, hold: teacher.hold },
      test: { relRegret: test.relRegret, tau: test.tau, top1: test.top1 },
      play: { games: play.games, piecesMedian: play.piecesMedian, attackMedian: play.attackMedian },
      note: '대조군 모델 — 8단계 웹의 기본 로드 대상이 아니다 (기본은 data/stage7/c0.model.json).',
    });
  }
  log(`${kind}: wrote ${path.relative(ROOT, outFile)}  (${fmtMs(doc.elapsedMs)})`);
  status({ stage: 'model-done', model: kind, elapsedMs: doc.elapsedMs });
  return doc;
}

async function main() {
  const t0 = performance.now();
  try { writeFileSync(path.join(STAGE7_DIR, 'train-phaseb.pid'), `${process.pid}\n`); } catch {}
  const c0File = path.join(ROOT, 'data', 'stage7-c0.json');
  if (!existsSync(c0File)) { console.error('data/stage7-c0.json 없음 — Phase A 를 먼저 돌려야 한다'); process.exit(2); }
  const c0doc = JSON.parse(readFileSync(c0File, 'utf8'));
  const passed = c0doc.gate?.passed ?? {};
  const nPassed = Object.values(passed).filter(Boolean).length;
  const nTotal = Object.keys(passed).length;
  const gateStatus = c0doc.gate?.all ? `passed(${nPassed}/${nTotal})` : `failed(${nPassed}/${nTotal})`;
  if (!c0doc.gate?.all && !forcePhaseB) {
    console.error(`Phase A 게이트 미달 (${gateStatus}) — Phase B 는 --force-phase-b 로만 실행한다 (지시 §1).`);
    console.error(`미달 항목: ${Object.entries(passed).filter(([, v]) => !v).map(([k]) => k).join(', ')}`);
    process.exit(1);
  }
  if ((c0doc.teacherVariant ?? 'beam') !== variant) { console.error(`C0 는 교사 ${c0doc.teacherVariant} 로 학습됐다 — --teacher ${c0doc.teacherVariant} 로 맞출 것`); process.exit(2); }
  const proto = protocolFromC0(c0doc);
  const workers = Number(opt('workers', DEFAULT_WORKERS));
  const only = opt('only', null)?.split(',').map((s) => s.trim().toUpperCase());
  const order = ['C0', ...PHASE_B_NULLS].filter((k) => !only || only.includes(k));
  log(`Phase B: ${order.join(' → ')}; 게이트 ${gateStatus}${forcePhaseB ? ' (forcedPhaseB)' : ''}; 프로토콜 = data/stage7-c0.json 실측 (rounds ${proto.rounds + 1}, train ${proto.trainDecisions}, λ ${proto.lambda}, μ ${proto.mu}, select ${proto.selectBy}, wd ${proto.weightDecay}, dropout ${proto.dropoutZ}/${proto.dropoutH}); 플레이 ${PLAY_GAMES} 게임 공유 시드 ${PLAY_SEEDS[0]}..${PLAY_SEEDS[PLAY_SEEDS.length - 1]}; ${workers} workers`);
  status({ stage: 'loading', order, gateStatus, forcedPhaseB: forcePhaseB, playGames: PLAY_GAMES });
  const { connectome, teacher, data, garbage, dataFile } = loadInputs({ variant });
  const ctx = { connectome, teacher, data, garbage, dataFile, c0doc, proto, workers, gateStatus };
  const done = [];
  for (const kind of order) {
    const doc = await runModel(kind, ctx);
    done.push({ model: kind, file: kind === 'C0' ? 'data/stage7-phaseB-c0.json' : `data/stage7-n${kind[1]}.json`, piecesMedian: doc.play.piecesMedian, attackMedian: doc.play.attackMedian, relRegret: doc.test.relRegret, top1: doc.test.top1 });
    status({ stage: 'progress', completed: done.map((d) => d.model) });
    console.log(`\n--- 진행 ---`);
    for (const d of done) console.log(`  ${d.model.padEnd(4)} pieces ${String(d.piecesMedian).padStart(5)}  attack ${String(d.attackMedian).padStart(4)}  rel-regret ${d.relRegret.toFixed(4)}  top-1 ${pct(d.top1)}`);
    console.log('');
  }
  status({ stage: 'done', done: true, completed: done.map((d) => d.model), elapsedMs: Math.round(performance.now() - t0) });
  log(`Phase B 학습·평가 완료: ${done.map((d) => d.model).join(', ')}  (총 ${fmtMs(performance.now() - t0)})`);
  log('다음: node scripts/phaseb-compare.js (쌍대 비교) → node scripts/phaseb-smoke.js → node scripts/phaseb-report.js');
}

main().catch((err) => { console.error(err); status({ stage: 'error', error: String(err?.stack ?? err) }); process.exit(2); });
