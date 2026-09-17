// 4단계 실험 워커. 작업 종류:
//   spectral   조건 커넥톰의 rho_unit (alpha 0.5, 1)
//   calibrate  조건 리저버 한 점 평가 (3단계 evaluatePoint, 하드 제약 + 프로브 (a))
//   featurize  afterstate 표본 [from, to) 의 DN 발화율 (+ C0 면 활동량 요약 5)
//   train      리드아웃 학습 + 테스트 회귀 지표
//   play       학습된 리드아웃으로 게임 (시드 목록)
//   baseline   무작위 / 교사 게임
//   separation 결정 내 분리 지표 (distinctFrac, meanDNDiff, 전파 프로파일, withinKendall) — 5단계
//   featurize-boards  임의 보드 묶음의 DN 발화율 — 6단계 rank-train (대전 데이터 후보 afterstate)
// 모든 리저버 작업은 T (창 스텝) 와 gIn (인코더 이득) 을 받는다 (기본 50, G_IN).
// 조건 커넥톰·스펙트럼·인코더는 키별로 캐시한다 (최근 2개).

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parentPort } from 'node:worker_threads';
import { parseConnectome } from '../src/connectome.js';
import { createEncoder } from '../src/encode.js';
import { computeSpectral } from '../src/spectral.js';
import { checkHard, evaluatePoint, generateBoards } from '../src/calibration.js';
import { measureSeparation } from '../src/separation.js';
import { G_IN } from '../src/encode.js';
import { buildCondition } from '../src/nullmodels.js';
import { deserialize, FEATURE_WEIGHTS } from '../src/afterstate.js';
import { readoutFromJSON, targetRows, trainReadout, valueOf } from '../src/readout.js';
import { regressionMetrics } from '../src/evaluate.js';
import { createAgent, createFeaturizer, playGame, randomAgent, teacherAgent } from '../src/play.js';
import { createRng } from '../src/prng.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = parseConnectome(readFileSync(path.join(ROOT, 'data', 'connectome.json'), 'utf8'));

let afterstates = null;
const getAfterstates = () => (afterstates ??= deserialize(JSON.parse(readFileSync(path.join(ROOT, 'data', 'afterstates.json'), 'utf8'))));

// 분리 측정용 결정 표본: 분할별로 시드 셔플 후 앞 n 개. { boards, scores }
const decisionSets = new Map();
function decisionSet(part, n, seed) {
  const key = `${part}:${n}:${seed}`;
  if (decisionSets.has(key)) return decisionSets.get(key);
  const { samples, decisions, split } = getAfterstates();
  const g = new Set(split[part]);
  const idx = decisions.filter((d) => g.has(d.gameId)).map((d) => d.index);
  const rng = createRng(seed);
  for (let i = idx.length - 1; i > 0; i--) { const j = rng.int(i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  const set = idx.slice(0, n).map((i) => ({ boards: decisions[i].samples.map((k) => samples[k].board), scores: decisions[i].samples.map((k) => samples[k].score) }));
  decisionSets.set(key, set);
  return set;
}

let calBoards = null;
const getBoards = (n, seed) => {
  if (!calBoards || calBoards.length < n || calBoards.seed !== seed) { calBoards = generateBoards(n, { seed }); calBoards.seed = seed; }
  return calBoards.slice(0, n);
};

const cache = new Map(); // key → { connectome, spectral, encoders, iExts }
function condition(key, cond, seed) {
  if (cache.has(key)) return cache.get(key);
  const connectome = buildCondition(base, cond, seed);
  const entry = { connectome, spectral: computeSpectral(connectome, { maxIter: 500, tol: 1e-6, seed: 1 }), encoders: new Map(), iExts: new Map() };
  entry.encoder = (gIn = G_IN) => { if (!entry.encoders.has(gIn)) entry.encoders.set(gIn, createEncoder(connectome, { gIn })); return entry.encoders.get(gIn); };
  if (cache.size >= 2) cache.delete(cache.keys().next().value);
  cache.set(key, entry);
  return entry;
}

const probeSummary = (pr) => pr && {
  top1: pr.top1, controlTop1: pr.control.top1, top1Margin: pr.top1Margin, majorityTop1: pr.majorityTop1,
  featuresR2: pr.featuresR2, controlFeaturesR2: pr.control.featuresR2, perFeatureR2: pr.perFeatureR2,
};

function handle(job) {
  switch (job.type) {
    case 'spectral': {
      const e = condition(job.key, job.condition, job.seed);
      const { meta } = e.connectome;
      return { rhoUnit: { 0.5: e.spectral['0.5'].rhoUnit, 1: e.spectral['1'].rhoUnit }, converged: { 0.5: e.spectral['0.5'].converged, 1: e.spectral['1'].converged }, nodeCount: meta.nodeCount, edgeCount: meta.edgeCount, condition: meta.condition };
    }
    case 'calibrate': {
      const e = condition(job.key, job.condition, job.seed);
      const samples = getBoards(job.boards, job.boardSeed);
      const gIn = job.gIn ?? G_IN, T = job.T ?? 50;
      const ck = `${job.boardSeed}:${job.boards}:${gIn}`;
      if (!e.iExts.has(ck)) e.iExts.set(ck, samples.map((s) => e.encoder(gIn).encode(s.board, s.piece)));
      // 프로브는 3단계 하드 제약 통과 시에만; 분리 지표(job.separation = { test, train, seed })도 통과 시에만 잰다
      const m = evaluatePoint(e.connectome, e.spectral, samples, e.iExts.get(ck), job.params, { T, gap: job.gap, seed: job.boardSeed, probe: job.probe === 'hard' ? (r) => r.hard.all : job.probe });
      m.gIn = gIn;
      if (job.separation && m.hard.all && !m.aborted) {
        const f = createFeaturizer(e.connectome, job.params, e.spectral, { T, gIn });
        const dims = { N: f.reservoir.N, nInput: f.reservoir.nInput, outputStart: f.reservoir.outputStart };
        const sep = measureSeparation(f.featurizeBoth, decisionSet('test', job.separation.test, job.separation.seed), dims,
          job.separation.train ? { trainDecisions: decisionSet('train', job.separation.train, job.separation.seed + 1) } : {});
        delete sep.withinKendallTaus;
        m.separation = sep;
        m.hard = checkHard(m, sep);
      } else if (job.separation) {
        m.hard = { ...m.hard, distinct: false, dnDiff: false, all: false };
      }
      return { ...m, probe: probeSummary(m.probe) };
    }
    case 'separation': {
      const e = condition(job.key, job.condition, job.seed);
      const f = createFeaturizer(e.connectome, job.params, e.spectral, { T: job.T ?? 50, gIn: job.gIn ?? G_IN });
      const dims = { N: f.reservoir.N, nInput: f.reservoir.nInput, outputStart: f.reservoir.outputStart };
      const sep = measureSeparation(f.featurizeBoth, decisionSet('test', job.test, job.seedSet ?? 1), dims,
        job.train ? { trainDecisions: decisionSet('train', job.train, (job.seedSet ?? 1) + 1) } : {});
      return sep;
    }
    case 'featurize': {
      const e = condition(job.key, job.condition, job.seed);
      const { samples } = getAfterstates();
      const f = createFeaturizer(e.connectome, job.params, e.spectral, { T: job.T ?? 50, gIn: job.gIn ?? G_IN });
      const n = job.to - job.from;
      const dn = new Float32Array(n * f.dim);
      const act = job.activity ? new Float32Array(n * 5) : null;
      let spikes = 0;
      for (let i = 0; i < n; i++) {
        const r = f.featurizeBoth(samples[job.from + i].board);
        dn.set(r.dn, i * f.dim);
        if (act) act.set(r.activity, i * 5);
        spikes += r.activity[0];
      }
      return { dn, act, dim: f.dim, meanRateHz: spikes / n / e.connectome.neurons.length / (f.T / 1000), transfer: [dn.buffer, ...(act ? [act.buffer] : [])] };
    }
    case 'featurize-boards': {
      // 6단계 rank-train: 임의 보드 묶음(Uint8Array n×200) 의 DN 발화율. 조건은 C0 (실제 커넥톰) 고정.
      const e = condition(job.key ?? 'C0', job.condition ?? 'C0', job.seed ?? 0);
      const f = createFeaturizer(e.connectome, job.params, e.spectral, { T: job.T ?? 50, gIn: job.gIn ?? G_IN });
      const n = job.boards.length / 200;
      const dn = new Float32Array(n * f.dim);
      let spikes = 0;
      for (let i = 0; i < n; i++) {
        const r = f.featurizeBoth(job.boards.subarray(i * 200, (i + 1) * 200));
        dn.set(r.dn, i * f.dim);
        spikes += r.activity[0];
      }
      return { dn, dim: f.dim, from: job.from, meanRateHz: spikes / n / e.connectome.neurons.length / (f.T / 1000), transfer: [dn.buffer] };
    }
    case 'train': {
      const { samples, decisions, split } = getAfterstates();
      const dim = job.dim;
      const X = Array.from({ length: samples.length }, (_, i) => Float64Array.from(job.X.subarray(i * dim, (i + 1) * dim)));
      const Y = targetRows(samples, job.target);
      const setOf = (part) => new Set(split[part]);
      const idx = (part) => { const g = setOf(part); return samples.map((s, i) => (g.has(s.gameId) ? i : -1)).filter((i) => i >= 0); };
      const tr = idx('train'), va = idx('val'), te = idx('test');
      const t0 = performance.now();
      const model = trainReadout(job.readout, tr.map((i) => X[i]), tr.map((i) => Y[i]), va.map((i) => X[i]), va.map((i) => Y[i]), { seed: job.seed ?? 1 });
      const trainMs = performance.now() - t0;
      const testGames = setOf('test');
      const decs = decisions.filter((d) => testGames.has(d.gameId)).map((d) => ({
        trueValues: d.samples.map((i) => samples[i].score),
        predValues: d.samples.map((i) => valueOf(job.target, model.predict(X[i]), FEATURE_WEIGHTS)),
        chosenIdx: d.samples.findIndex((i) => samples[i].chosen),
      }));
      const metrics = regressionMetrics(decs, { seed: 11 });
      // V2: 특징별 R² 도
      let perFeatureR2 = null;
      if (job.target === 'V2') {
        perFeatureR2 = Array.from({ length: 6 }, (_, c) => {
          const yt = te.map((i) => Y[i][c]), yp = te.map((i) => model.predict(X[i])[c]);
          const mean = yt.reduce((s, v) => s + v, 0) / yt.length;
          let sr = 0, st = 0; for (let k = 0; k < yt.length; k++) { sr += (yt[k] - yp[k]) ** 2; st += (yt[k] - mean) ** 2; }
          return st > 0 ? 1 - sr / st : 0;
        });
      }
      const { history, ...info } = model.info;
      return { readout: model.toJSON(), metrics, perFeatureR2, info: { ...info, trainMs, nTrain: tr.length, nVal: va.length, nTest: te.length } };
    }
    case 'play': {
      const e = condition(job.key, job.condition, job.seed);
      const f = createFeaturizer(e.connectome, job.params, e.spectral, { mode: job.mode ?? 'dn', T: job.T ?? 50, gIn: job.gIn ?? G_IN });
      const predict = readoutFromJSON(job.readout);
      const value = (x) => valueOf(job.target, predict(x), FEATURE_WEIGHTS);
      const agent = createAgent(f.featurize, value);
      return job.seeds.map((seed) => playGame(agent, { seed, cap: job.cap }));
    }
    case 'baseline': {
      return job.seeds.map((seed) => {
        const agent = job.kind === 'random' ? randomAgent(createRng(seed + 999)) : teacherAgent();
        return playGame(agent, { seed, cap: job.cap });
      });
    }
    default:
      throw new Error(`unknown job type ${job.type}`);
  }
}

parentPort.on('message', (job) => {
  try {
    const result = handle(job);
    const transfer = result?.transfer;
    if (transfer) delete result.transfer;
    parentPort.postMessage({ id: job.id, result }, transfer ?? []);
  } catch (err) {
    parentPort.postMessage({ id: job.id, error: `${err.stack ?? err}` });
  }
});
parentPort.postMessage({ ready: true });
