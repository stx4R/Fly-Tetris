// worker_threads 풀. 워커는 시작 시 { ready: true } 를 보내고, 작업 { id, ... } 마다 { id, result } 또는 { id, error } 를 돌려준다.
// run(jobs, onResult) 은 jobs 순서의 결과 배열을 돌려준다 (완료 순서는 무관). jobs[i].transfer 가 있으면 postMessage 전송 목록으로 쓴다.
// workerData 는 객체 또는 (워커 인덱스) → 객체 함수 (7단계: 워커마다 자기 기울기 SharedArrayBuffer 를 받는다).

import { Worker } from 'node:worker_threads';

export function createPool(workerUrl, n, workerData = {}) {
  const workers = [];
  const ready = [];
  for (let i = 0; i < n; i++) {
    const w = new Worker(workerUrl, { workerData: typeof workerData === 'function' ? workerData(i) : workerData });
    workers.push(w);
    ready.push(new Promise((resolve, reject) => {
      w.once('message', (m) => (m.ready ? resolve() : reject(new Error('worker did not report ready'))));
      w.once('error', reject);
    }));
  }
  let busy = false;
  async function run(jobs, onResult) {
    if (busy) throw new Error('pool is busy');
    busy = true;
    const results = new Array(jobs.length);
    let next = 0, done = 0;
    try {
      await Promise.all(workers.map((w) => new Promise((resolve, reject) => {
        const feed = () => {
          if (next >= jobs.length) { w.off('message', onMessage); w.off('error', onError); resolve(); return; }
          const id = next++;
          const { transfer, ...job } = jobs[id];
          w.postMessage({ id, ...job }, transfer ?? []);
        };
        const onMessage = ({ id, result, error }) => {
          if (error) { w.off('message', onMessage); w.off('error', onError); reject(new Error(`job ${id}: ${error}`)); return; }
          results[id] = result;
          onResult?.(result, ++done, id);
          feed();
        };
        const onError = (err) => reject(err);
        w.on('message', onMessage);
        w.on('error', onError);
        feed();
      })));
    } finally {
      busy = false;
    }
    return results;
  }
  return { size: n, ready: Promise.all(ready), run, close: () => Promise.all(workers.map((w) => w.terminate())) };
}
