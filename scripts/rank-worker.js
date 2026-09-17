// 랭킹 학습 워커 (6단계). 작업 { type: 'train', input, model, loss, X: SharedArrayBuffer(Float32 n×dim), dim, n,
//   offsets: Int32Array(D+1) 결정별 후보 시작 인덱스, chosen: Int32Array(D), values: Float64Array(n), parts: { train, val, test } 결정 인덱스, opts }
// 공유 버퍼를 복사하지 않고 행 뷰(subarray)로 읽는다. 반환 { metrics, history(축약), best, epochs, trainMs }

import { parentPort } from 'node:worker_threads';
import { rankMetrics, trainRanker } from '../src/rank-train.js';

function decisionsOf(job, X, indices) {
  return indices.map((i) => {
    const from = job.offsets[i], to = job.offsets[i + 1];
    const rows = [];
    for (let k = from; k < to; k++) rows.push(X.subarray(k * job.dim, (k + 1) * job.dim));
    return { X: rows, values: Array.from(job.values.subarray(from, to)), chosen: job.chosen[i] };
  });
}

function handle(job) {
  if (job.type !== 'train') throw new Error(`unknown job type ${job.type}`);
  const X = new Float32Array(job.X);
  const train = decisionsOf(job, X, job.parts.train), val = decisionsOf(job, X, job.parts.val), test = decisionsOf(job, X, job.parts.test);
  const t0 = performance.now();
  const ranker = trainRanker({ model: job.model, loss: job.loss }, train, val, job.opts);
  const trainMs = performance.now() - t0;
  const metrics = rankMetrics(ranker, test, { seed: 11 });
  const valMetrics = rankMetrics(ranker, val, { seed: 13 });
  return {
    input: job.input, model: job.model, loss: job.loss, metrics, val: { tau: valMetrics.tau, top1: valMetrics.top1 },
    best: ranker.best, epochs: ranker.epochs, trainMs, history: ranker.history.map((h) => [h.epoch, Number(h.train.toFixed(5)), Number(h.val.toFixed(5))]),
    params: ranker.scorer.theta.length,
  };
}

parentPort.on('message', (job) => {
  try {
    parentPort.postMessage({ id: job.id, result: handle(job) });
  } catch (err) {
    parentPort.postMessage({ id: job.id, error: `${err.stack ?? err}` });
  }
});
parentPort.postMessage({ ready: true });
