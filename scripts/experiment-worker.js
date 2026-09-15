// 4단계 실험 워커. 작업 종류:
//   spectral   조건 커넥톰의 rho_unit (alpha 0.5, 1)
//   calibrate  조건 리저버 한 점 평가 (3단계 evaluatePoint, 하드 제약 + 프로브 (a))
//   featurize  afterstate 표본 [from, to) 의 DN 발화율 (+ C0 면 활동량 요약 5)
//   train      리드아웃 학습 + 테스트 회귀 지표
//   play       학습된 리드아웃으로 게임 (시드 목록)
//   baseline   무작위 / 교사 게임
// 조건 커넥톰·스펙트럼·인코더는 키별로 캐시한다 (최근 2개).

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parentPort } from 'node:worker_threads';
import { parseConnectome } from '../src/connectome.js';
import { createEncoder } from '../src/encode.js';
import { computeSpectral } from '../src/spectral.js';
import { evaluatePoint, generateBoards } from '../src/calibration.js';
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

let calBoards = null;
const getBoards = (n, seed) => {
  if (!calBoards || calBoards.length < n || calBoards.seed !== seed) { calBoards = generateBoards(n, { seed }); calBoards.seed = seed; }
  return calBoards.slice(0, n);
};

const cache = new Map(); // key → { connectome, spectral, encoder }
function condition(key, cond, seed) {
  if (cache.has(key)) return cache.get(key);
  const connectome = buildCondition(base, cond, seed);
  const entry = { connectome, spectral: computeSpectral(connectome, { maxIter: 500, tol: 1e-6, seed: 1 }), encoder: createEncoder(connectome), iExts: new Map() };
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
      const ck = `${job.boardSeed}:${job.boards}`;
      if (!e.iExts.has(ck)) e.iExts.set(ck, samples.map((s) => e.encoder.encode(s.board, s.piece)));
      const m = evaluatePoint(e.connectome, e.spectral, samples, e.iExts.get(ck), job.params, { gap: job.gap, seed: job.boardSeed, probe: job.probe === 'hard' ? (r) => r.hard.all : job.probe });
      return { ...m, probe: probeSummary(m.probe) };
    }
    case 'featurize': {
      const e = condition(job.key, job.condition, job.seed);
      const { samples } = getAfterstates();
      const f = createFeaturizer(e.connectome, job.params, e.spectral);
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
      return { dn, act, dim: f.dim, meanRateHz: spikes / n / e.connectome.neurons.length / 0.05, transfer: [dn.buffer, ...(act ? [act.buffer] : [])] };
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
      const f = createFeaturizer(e.connectome, job.params, e.spectral, { mode: job.mode ?? 'dn' });
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
