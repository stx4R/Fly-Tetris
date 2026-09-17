// 7단계 워커. 시작 시 workerData 로 모델 사양과 공유 메모리를 받는다:
//   { kind: 'sparse' | 'dense', theta: Float64Array(SAB) 파라미터 (주 스레드가 갱신, 워커는 읽기만), grad: Float64Array(SAB) 이 워커의 기울기 누적,
//     U: Float32Array(SAB) 후보 입력 풀 (n × U_DIM), mask: { N, E, nInput, nOutput, outputStart, indptr(SAB), indices(SAB), rhoUnit } (sparse),
//     spec: { T, lr, hidden, dnMean, dnStd, dropoutZ, dropoutH } (sparse) | { hidden: [H1, H2, H3], dropoutH } (dense), teacher: { params, depth, width } | null, index }
// 작업:
//   grad   { step, loss, decisions: [{ rows, chosen, values? }], scale, lambda, valueScale }  → 각 결정 순전파(train: 드롭아웃 활성) → 손실 (λ > 0 이면 값 마진 가중) → 역전파
//          (기울기 × scale 을 grad 에 누적; step 이 바뀌면 grad 를 먼저 0 으로). 반환 { L, n, worker }
//   loss   { loss, decisions, lambda, valueScale }                → 순전파만 (드롭아웃 비활성), 손실 합. 반환 { L, n }
//   score  { decisions: [{ rows }] }                              → 후보별 점수 (전체 후보 평가용). 반환 Float64Array[]
//   play   { seeds, cap, record, injector }                       → 학습된 정책으로 플레이. record 면 방문 결정을 교사가 라벨한 게임(직렬화) + 통계, 아니면 추적 통계 (우물 유지·테트리스)
//   bench  { decisions, cands, scoreReps }                        → grad 1 결정 / score 후보 소요 (예산 추정용)

import { parentPort, workerData } from 'node:worker_threads';
import { createSparseRNN, createDenseMLP } from '../src/sparse-rnn.js';
import { decisionLoss, valueMarginWeights } from '../src/rank-train.js';
import { createNetAgent, playSoloTracked } from '../src/stage7-agent.js';
import { createTeacher } from '../src/teacher-attack.js';
import { collectGame, makeInjector, serialize } from '../src/versus-data.js';
import { createRng } from '../src/prng.js';

const wd = workerData;
const theta = wd.theta, grad = wd.grad, U = wd.U;
const dropSeed = 1000 + (wd.index ?? 0);
const model = wd.kind === 'sparse'
  ? createSparseRNN(wd.mask, theta, { T: wd.spec.T, lr: wd.spec.lr, hidden: wd.spec.hidden, dnMean: Float64Array.from(wd.spec.dnMean), dnStd: Float64Array.from(wd.spec.dnStd), dropoutZ: wd.spec.dropoutZ ?? 0, dropoutH: wd.spec.dropoutH ?? 0, seed: dropSeed })
  : createDenseMLP(theta, wd.spec.hidden, { dropoutH: wd.spec.dropoutH ?? 0, seed: dropSeed });
const agent = createNetAgent(model);
const teacher = wd.teacher ? createTeacher(wd.teacher.params, { depth: wd.teacher.depth, width: wd.teacher.width }) : null;
let lastStep = -1;

const targetsOf = (job, d) => ({ chosen: d.chosen, pairWeights: job.lambda > 0 && d.values ? valueMarginWeights(d.values, d.chosen, job.lambda, job.valueScale) : null });

function handle(job) {
  switch (job.type) {
    case 'grad': {
      if (job.step !== lastStep) { grad.fill(0); lastStep = job.step; }
      let L = 0;
      for (const d of job.decisions) {
        const f = model.forward(U, Array.from(d.rows), { train: true });
        const { L: l, ds } = decisionLoss(job.loss, f.s, targetsOf(job, d));
        L += l;
        for (let k = 0; k < ds.length; k++) ds[k] *= job.scale;
        model.backward(f.cache, ds, grad);
      }
      return { L, n: job.decisions.length, worker: wd.index };
    }
    case 'loss': {
      let L = 0;
      for (const d of job.decisions) { const s = model.score(U, Array.from(d.rows)); L += decisionLoss(job.loss, s, targetsOf(job, d)).L; }
      return { L, n: job.decisions.length };
    }
    case 'score':
      return job.decisions.map((d) => model.score(U, Array.from(d.rows)));
    case 'play': {
      const injector = job.injector ? makeInjector(job.injector) : null;
      if (job.record) {
        if (!teacher) throw new Error('record requires a teacher');
        const games = job.seeds.map((seed) => {
          const t0 = performance.now();
          const g = collectGame(teacher, { seed, cap: job.cap, epsilon: 0, injector, policy: (p, cands) => agent.pick(p, cands) });
          const agree = g.decisions.filter((d) => d.chosen === d.taken).length;
          return { ...g, agree, ms: performance.now() - t0 };
        });
        const doc = serialize(games.map((g, i) => ({ ...g, id: job.ids[i] })), null, {});
        return { games: doc.games, stats: games.map((g) => ({ seed: g.seed, decisions: g.decisions.length, pieces: g.pieces, dead: g.dead, agree: g.agree, attack: g.stats.attack, lines: g.stats.lines, tetris: g.stats.tetris, garbageReceived: g.stats.garbageReceived, ms: g.ms })) };
      }
      return job.seeds.map((seed) => playSoloTracked(agent, { seed, cap: job.cap, injector, rng: injector ? createRng(seed * 31 + 7) : null }));
    }
    case 'bench': {
      const rows = Array.from(job.decisions[0].rows);
      let t = performance.now();
      for (const d of job.decisions) { const f = model.forward(U, Array.from(d.rows), { train: true }); const { ds } = decisionLoss('pairwise', f.s, { chosen: d.chosen }); model.backward(f.cache, ds, grad); }
      const gradMs = (performance.now() - t) / job.decisions.length;
      t = performance.now();
      for (let r = 0; r < job.scoreReps; r++) model.score(U, job.cands);
      const scoreMs = (performance.now() - t) / job.scoreReps / job.cands.length;
      return { gradMs, scoreMs, rows: rows.length };
    }
    default:
      throw new Error(`unknown job type ${job.type}`);
  }
}

parentPort.on('message', (job) => {
  try {
    parentPort.postMessage({ id: job.id, result: handle(job) });
  } catch (err) {
    parentPort.postMessage({ id: job.id, error: `${err.stack ?? err}` });
  }
});
parentPort.postMessage({ ready: true });
