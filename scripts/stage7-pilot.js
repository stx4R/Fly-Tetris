#!/usr/bin/env node
// 7단계 파일럿 (Phase A/B 의 일부가 아니다). 라운드 0 프로토콜을 파일럿 규모(기본 8k 결정 · ≤ 8 에폭)로 돌려 한 축만 바꿔 비교한다:
//   --lambda F        값 마진 가중 λ (Phase A-2: {0, 0.5, 2.0} 3 점 비교 → 최선 λ 만 본 학습에)
//   --mu F            구멍 페널티 μ (Phase A-3: {0, 1, 4} 3 점, 12k 또는 예산에 따라 8k; 선택 = 테스트 상대 regret 최소)
//   --negatives       hard | mixed (기본 HYPER)      --reg on|off   AdamW 감쇠 + 드롭아웃 (기본 on = HYPER 값)      --model sparse|dense
// 평가: 테스트 1,204 결정 전체 후보 (τ · top-1 · regret · 하위 50% 선택률) + 가비지 포함 20 게임 × 1000 (조각 · 공격 · 테트리스 · 우물 유지 · 사망 시 구멍).
// 결과 → data/stage7/pilot-{tag}.json. `--summarize lambda` 는 pilot-lambda*.json 을 표로 내고 규칙(하위 50% 선택률 최소)으로 λ 를 골라 lambda-choice.json 에,
// `--summarize mu` 는 pilot-mu*.json 을 표로 내고 규칙(상대 regret 최소, 동률(< 0.005) 이면 사망 시 구멍 중앙값 최소)으로 μ 를 골라 mu-choice.json 에 쓴다.
// 옵션: --tag NAME --epochs N --train N --val N --games N --workers N

import { readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { HYPER } from '../src/stage7-train.js';
import { buildDataset, calibrateState, ci, createDenseState, createSparseState, createTrainingPool, DEFAULT_WORKERS, evaluateTest, fmtMs, loadInputs, loadJson, maskFor, pct, playEval, playLine, saveJson, STAGE7_DIR, trainRound } from './stage7-lib.js';

const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? argv[i + 1] : def; };
const log = (s) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${s}`);

function summarizeMu() {
  const files = readdirSync(STAGE7_DIR).filter((f) => /^pilot-mu.*\.json$/.test(f)).sort();
  const rows = files.map((f) => loadJson(f)).filter(Boolean);
  if (!rows.length) { console.error('pilot-mu*.json 없음'); process.exit(1); }
  console.log(`${'pilot'.padEnd(12)} ${'μ'.padStart(3)} ${'train'.padStart(6)} ${'ep'.padStart(3)} ${'rel regret'.padEnd(22)} ${'regret'.padEnd(8)} ${'top-1'.padEnd(8)} ${'τ'.padEnd(7)} ${'bottom-half'.padEnd(8)} ${'pieces med'.padEnd(16)} ${'attack'.padEnd(12)} ${'tetris/game'.padEnd(11)} ${'holes@death'.padEnd(12)} lines 1/2/3/4`);
  for (const r of rows) {
    const t = r.test, p = r.play, lc = p.lineComposition ?? {};
    console.log(`${r.tag.padEnd(12)} ${String(r.config.mu).padStart(3)} ${String(r.config.train).padStart(6)} ${String(r.train.epochs).padStart(3)} ${`${t.relRegret.toFixed(3)} ${ci(t.relRegretCI)}`.padEnd(22)} ${t.regret.toFixed(1).padEnd(8)} ${pct(t.top1).padEnd(8)} ${t.tau.toFixed(3).padEnd(7)} ${pct(t.bottomHalfRate).padEnd(8)} ${`${p.piecesMedian} ${ci(p.piecesMedianCI, (v) => v.toFixed(0))}`.padEnd(16)} ${`${p.attackMedian} ${ci(p.attackMedianCI, (v) => v.toFixed(0))}`.padEnd(12)} ${String(p.tetrisMedian).padEnd(11)} ${String(p.holesAtDeathMedian ?? '—').padEnd(12)} ${lc.single ?? '?'}/${lc.double ?? '?'}/${lc.triple ?? '?'}/${lc.tetris ?? '?'}`);
  }
  const best = [...rows].sort((a, b) => (Math.abs(a.test.relRegret - b.test.relRegret) < 0.005 ? (a.play.holesAtDeathMedian ?? 99) - (b.play.holesAtDeathMedian ?? 99) : a.test.relRegret - b.test.relRegret))[0];
  const base = rows.find((r) => r.config.mu === 0);
  const choice = {
    mu: best.config.mu, tag: best.tag, chosenAt: new Date().toISOString(),
    rule: 'lowest test relative regret among μ candidates; ties (< 0.005) broken by median holes at death',
    candidates: rows.map((r) => ({ tag: r.tag, mu: r.config.mu, train: r.config.train, relRegret: r.test.relRegret, relRegretCI: r.test.relRegretCI, regret: r.test.regret, top1: r.test.top1, tau: r.test.tau, bottomHalfRate: r.test.bottomHalfRate, piecesMedian: r.play.piecesMedian, attackMedian: r.play.attackMedian, tetrisMedian: r.play.tetrisMedian, tetrises: r.play.tetrises, holesAtDeathMedian: r.play.holesAtDeathMedian, holesMedianInPlay: r.play.holesMedianInPlay, lineComposition: r.play.lineComposition })),
    vsMu0: base ? { dRelRegret: best.test.relRegret - base.test.relRegret, separated: best.test.relRegretCI[1] < base.test.relRegretCI[0], dHolesAtDeath: (best.play.holesAtDeathMedian ?? 0) - (base.play.holesAtDeathMedian ?? 0), dPieces: best.play.piecesMedian - base.play.piecesMedian } : null,
  };
  writeFileSync(path.join(STAGE7_DIR, 'mu-choice.json'), JSON.stringify(choice, null, 1) + '\n');
  console.log(`\nμ choice: ${choice.mu} (${best.tag}) — relative regret ${best.test.relRegret.toFixed(3)}${base && best !== base ? ` vs μ=0 ${base.test.relRegret.toFixed(3)} (${choice.vsMu0.separated ? 'CI separated' : 'CI overlap'}); holes at death ${best.play.holesAtDeathMedian} vs ${base.play.holesAtDeathMedian}` : ''}; wrote data/stage7/mu-choice.json`);
}

function summarize() {
  const files = readdirSync(STAGE7_DIR).filter((f) => /^pilot-lambda.*\.json$/.test(f)).sort();
  const rows = files.map((f) => loadJson(f)).filter(Boolean);
  if (!rows.length) { console.error('pilot-lambda*.json 없음'); process.exit(1); }
  console.log(`${'pilot'.padEnd(16)} ${'λ'.padStart(4)} ${'neg'.padEnd(6)} ${'reg'.padEnd(4)} ${'ep'.padStart(3)} ${'τ'.padEnd(22)} ${'top-1'.padEnd(24)} ${'bottom-half'.padEnd(22)} ${'pieces med'.padEnd(16)} ${'attack med'.padEnd(14)} ${'tetris/game'.padEnd(12)} well-run med/max`);
  for (const r of rows) {
    const t = r.test, p = r.play;
    console.log(`${r.tag.padEnd(16)} ${String(r.config.lambda).padStart(4)} ${r.config.negatives.padEnd(6)} ${(r.config.reg ? 'on' : 'off').padEnd(4)} ${String(r.train.epochs).padStart(3)} ${`${t.tau.toFixed(3)} ${ci(t.tauCI)}`.padEnd(22)} ${`${pct(t.top1)} ${ci(t.top1CI, pct)}`.padEnd(24)} ${`${pct(t.bottomHalfRate)} ${ci(t.bottomHalfRateCI, pct)}`.padEnd(22)} ${`${p.piecesMedian} ${ci(p.piecesMedianCI, (v) => v.toFixed(0))}`.padEnd(16)} ${`${p.attackMedian} ${ci(p.attackMedianCI, (v) => v.toFixed(0))}`.padEnd(14)} ${String(p.tetrisMedian).padEnd(12)} ${p.wellRuns.lengthMedian}/${p.wellRuns.lengthMax}`);
  }
  // 선택 규칙: mixed + reg 인 λ 후보 중 하위 50% 선택률 최소; 동률(차이 < 0.5%p)이면 조각 수 중앙값 최대
  const cands = rows.filter((r) => r.config.negatives === HYPER.negatives && r.config.reg && r.config.model === 'sparse');
  if (!cands.length) { console.error('λ 후보 실행 없음'); process.exit(1); }
  const best = [...cands].sort((a, b) => (Math.abs(a.test.bottomHalfRate - b.test.bottomHalfRate) < 0.005 ? b.play.piecesMedian - a.play.piecesMedian : a.test.bottomHalfRate - b.test.bottomHalfRate))[0];
  const base = cands.find((r) => r.config.lambda === 0);
  const choice = {
    lambda: best.config.lambda, tag: best.tag, chosenAt: new Date().toISOString(),
    rule: 'lowest bottom-half pick rate among mixed+reg λ candidates; ties (< 0.5%p) broken by pieces median',
    candidates: cands.map((r) => ({ tag: r.tag, lambda: r.config.lambda, bottomHalfRate: r.test.bottomHalfRate, bottomHalfRateCI: r.test.bottomHalfRateCI, top1: r.test.top1, tau: r.test.tau, piecesMedian: r.play.piecesMedian, attackMedian: r.play.attackMedian, tetrisMedian: r.play.tetrisMedian })),
    vsLambda0: base ? { dBottomHalf: best.test.bottomHalfRate - base.test.bottomHalfRate, dTop1: best.test.top1 - base.test.top1, dPieces: best.play.piecesMedian - base.play.piecesMedian, separated: best.test.bottomHalfRateCI[1] < base.test.bottomHalfRateCI[0] } : null,
  };
  writeFileSync(path.join(STAGE7_DIR, 'lambda-choice.json'), JSON.stringify(choice, null, 1) + '\n');
  console.log(`\nλ choice: ${choice.lambda} (${best.tag}) — bottom-half ${pct(best.test.bottomHalfRate)}${base && best !== base ? ` vs λ=0 ${pct(base.test.bottomHalfRate)} (${choice.vsLambda0.separated ? 'CI separated' : 'CI overlap'})` : ''}; wrote data/stage7/lambda-choice.json`);
}

async function main() {
  if (argv.includes('--summarize')) return opt('summarize', 'lambda') === 'mu' ? summarizeMu() : summarize();
  const t0 = performance.now();
  const lambdaChoice = loadJson('lambda-choice.json');
  const CFG = {
    model: opt('model', 'sparse'), negatives: opt('negatives', HYPER.negatives), lambda: Number(opt('lambda', lambdaChoice?.lambda ?? HYPER.lambda)), mu: Number(opt('mu', 0)), reg: opt('reg', 'on') !== 'off',
    epochs: Number(opt('epochs', 8)), train: Number(opt('train', 8000)), val: Number(opt('val', 2000)), games: Number(opt('games', 20)), workers: Number(opt('workers', DEFAULT_WORKERS)),
  };
  CFG.tag = opt('tag', `${CFG.model === 'dense' ? 'dense-' : ''}${CFG.negatives}-lambda${CFG.lambda}${CFG.mu ? `-mu${CFG.mu}` : ''}${CFG.reg ? '' : '-noreg'}`);
  const hyper = CFG.reg ? HYPER : { ...HYPER, weightDecay: 0, dropoutZ: 0, dropoutH: 0 };
  const { connectome, teacher, data, garbage } = loadInputs();
  const ds = buildDataset(data, { trainDecisions: CFG.train, valDecisions: CFG.val, negatives: CFG.negatives, hard: hyper.hardNegatives, valFullDecisions: Math.min(hyper.valFullDecisions ?? 0, CFG.val) });
  let state;
  if (CFG.model === 'dense') state = createDenseState(createSparseState(maskFor(connectome, 'C0'), hyper).P, { seed: hyper.seed, hyper });
  else { state = createSparseState(maskFor(connectome, 'C0'), hyper); calibrateState(state, ds, 256); }
  log(`pilot ${CFG.tag}: ${CFG.model}${state.hidden ? ` (${state.hidden.join('→')})` : ''} P ${state.P}; train ${ds.train.length} × K ${ds.K} [${CFG.negatives}], val ${ds.val.length} (valFull ${ds.valFull.length}), ≤ ${CFG.epochs} epochs; λ ${CFG.lambda} (value-gap scale ${ds.valueScale.toFixed(2)}), μ ${CFG.mu}; select by ${hyper.selectBy}; reg ${CFG.reg ? `wd ${hyper.weightDecay}, dropout z ${hyper.dropoutZ} / h ${hyper.dropoutH}` : 'off'}; ${CFG.workers} workers`);
  const tp = await createTrainingPool(state, ds, { workers: CFG.workers, teacher });
  const train = await trainRound(tp, state, ds, { maxEpochs: CFG.epochs, patience: hyper.patience, loss: hyper.loss, lambda: CFG.lambda, mu: CFG.mu, selectBy: hyper.selectBy, weightDecay: hyper.weightDecay, seed: 1, log: (h) => { if (h.val !== undefined) log(`  epoch ${h.epoch}: train ${h.train.toFixed(4)} val ${h.val.toFixed(4)}${h.valRegret ? ` valFull rel-regret ${h.valRegret.relRegret.toFixed(4)} top-1 ${pct(h.valRegret.top1)}` : ''} (${fmtMs(h.ms)})`); } });
  delete train.adam;
  const test = await evaluateTest(tp, ds.test);
  log(`test: rel-regret ${test.relRegret.toFixed(4)} ${ci(test.relRegretCI, (v) => v.toFixed(3))}, regret ${test.regret.toFixed(2)}, τ ${test.tau.toFixed(3)} ${ci(test.tauCI)}, top-1 ${pct(test.top1)} ${ci(test.top1CI, pct)}, bottom-half picks ${pct(test.bottomHalfRate)} ${ci(test.bottomHalfRateCI, pct)}, pick percentile ${test.pickPercentile.toFixed(3)}`);
  const play = await playEval(tp, { seeds: Array.from({ length: CFG.games }, (_, k) => 50000 + k), cap: 1000, injector: garbage });
  log(`play (garbage ${garbage.rate}/piece): ${playLine(play)}`);
  await tp.close();
  const doc = { ranAt: new Date().toISOString(), tag: CFG.tag, config: CFG, hyper, note: 'pilot (round-0 protocol at pilot scale), not part of Phase A-2 or B', train: { epochs: train.epochs, best: train.best, history: train.history, ms: train.ms, valueScale: train.valueScale }, test, play, elapsedMs: Math.round(performance.now() - t0) };
  saveJson(`pilot-${CFG.tag}.json`, doc);
  log(`wrote data/stage7/pilot-${CFG.tag}.json (${fmtMs(doc.elapsedMs)})`);
}

main().catch((err) => { console.error(err); process.exit(2); });
