// 공격형 교사 워커 (6단계). 작업 종류:
//   evaluate   파라미터 벡터 목록 × 시드 목록 → 개체별 { J, games } (CEM 세대 평가, 표준 빔)
//   play       파라미터 하나 × 시드 목록 → 게임 통계 (표준 빔 또는 scored 모드, 선택적 인공 가비지 주입)
//   collect    파라미터 하나 × 게임 시드 목록 → 결정 기록 (scored 모드 + ε 탐색 + 인공 가비지) — collect-versus 용
// 순수 CPU 작업이라 상태 캐시가 없다.

import { parentPort } from 'node:worker_threads';
import { createTeacher, objective, playSolo, vectorToParams } from '../src/teacher-attack.js';
import { createRng } from '../src/prng.js';
import { collectGame, makeInjector } from '../src/versus-data.js';

function handle(job) {
  switch (job.type) {
    case 'evaluate': {
      return job.vectors.map((v) => {
        const teacher = createTeacher(vectorToParams(Float64Array.from(v)), { depth: job.depth, width: job.width });
        const games = job.seeds.map((seed) => playSolo(teacher, { seed, cap: job.cap }));
        return { J: objective(games), games: games.map((g) => ({ seed: g.seed, attack: g.attack, pieces: g.pieces, tetris: g.tetris, tspin: g.tspin })) };
      });
    }
    case 'play': {
      const teacher = createTeacher(job.params, { depth: job.depth, width: job.width });
      const agent = job.scored ? { choose: teacher.chooseScored } : teacher;
      const injector = job.garbage ? makeInjector(job.garbage) : null;
      return job.seeds.map((seed) => playSolo(agent, { seed, cap: job.cap, injector, rng: injector ? createRng(seed * 31 + 7) : null }));
    }
    case 'collect': {
      const teacher = createTeacher(job.params, { depth: job.depth, width: job.width });
      const injector = job.garbage ? makeInjector(job.garbage) : null;
      return job.gameSeeds.map((seed) => collectGame(teacher, { seed, cap: job.cap, epsilon: job.epsilon, injector }));
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
