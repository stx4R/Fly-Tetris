// 공격형 교사 워커 (6단계). 작업 종류:
//   evaluate   파라미터 벡터 목록 × 시드 목록 → 개체별 { J, games } (CEM 세대 평가, 표준 빔; garbage 가 있으면 가비지 주입 조건 — A-4′)
//   play       파라미터 하나 × 시드 목록 → 게임 통계 (표준 빔 또는 scored 모드, 선택적 인공 가비지 주입; trace 면 배치별 추적 — 사망 원인 분류용)
//   collect    파라미터 하나 × 게임 시드 목록 → 결정 기록 (scored 모드 + ε 탐색 + 인공 가비지) — collect-versus 용
// 작업의 { ply, depth, width } 가 교사를 정한다 (ply 1 = 1-ply 교사, Phase A-4; 아니면 빔). 순수 CPU 작업이라 상태 캐시가 없다.

import { parentPort } from 'node:worker_threads';
import { evaluateIndividual, playSolo, teacherFor, vectorToParams } from '../src/teacher-attack.js';
import { playSoloTracked } from '../src/stage7-agent.js';
import { createRng } from '../src/prng.js';
import { collectGame, makeInjector } from '../src/versus-data.js';

export function handle(job) {
  switch (job.type) {
    case 'evaluate': {
      return job.vectors.map((v) => {
        const teacher = teacherFor(vectorToParams(Float64Array.from(v)), job);
        const { J, games } = evaluateIndividual(teacher, { seeds: job.seeds, cap: job.cap, garbage: job.garbage ?? null });
        return { J, games: games.map((g) => ({ seed: g.seed, attack: g.attack, pieces: g.pieces, tetris: g.tetris, tspin: g.tspin, garbageReceived: g.garbageReceived, holds: g.holds })) };
      });
    }
    case 'play': {
      const teacher = teacherFor(job.params, job);
      const agent = job.scored ? { choose: teacher.chooseScored } : teacher;
      const injector = job.garbage ? makeInjector(job.garbage) : null;
      const play = job.trace ? (a, o) => playSoloTracked(a, { ...o, trace: true }) : playSolo;
      return job.seeds.map((seed) => play(agent, { seed, cap: job.cap, injector, rng: injector ? createRng(seed * 31 + 7) : null }));
    }
    case 'collect': {
      const teacher = teacherFor(job.params, job);
      const injector = job.garbage ? makeInjector(job.garbage) : null;
      return job.gameSeeds.map((seed) => collectGame(teacher, { seed, cap: job.cap, epsilon: job.epsilon, injector }));
    }
    default:
      throw new Error(`unknown job type ${job.type}`);
  }
}

// 워커로 띄워졌을 때만 (테스트는 handle 을 직접 import 한다)
if (parentPort) {
  parentPort.on('message', (job) => {
    try {
      parentPort.postMessage({ id: job.id, result: handle(job) });
    } catch (err) {
      parentPort.postMessage({ id: job.id, error: `${err.stack ?? err}` });
    }
  });
  parentPort.postMessage({ ready: true });
}
