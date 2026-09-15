// afterstate 데이터: 방문한 위치의 모든 합법 후보 배치에 대해 결과 보드(줄 제거 후)·Dellacherie 점수·6특징을 기록한다.
// 게임 단위 분할(60/20/20) — 같은 게임의 afterstate 가 훈련·테스트에 같이 들어가면 누수다.
//
// 상태 방문 정책: 교사(Dellacherie) 0.7 / 무작위 합법 배치 0.3 혼합 (캘리브레이션 보드 생성과 같은 분포). 순수 교사 플레이는
// 보드를 늘 낮고 깨끗하게 유지해 afterstate 분포가 좁아지므로 탐색 잡음을 섞는다. 기록되는 목표값은 정책과 무관하게
// 각 후보의 실제 Dellacherie 점수·특징이다. 각 게임은 0..warmupMax 조각의 (기록하지 않는) 워밍업 후 decisionsPerGame 결정을 기록한다.

import { createRng } from './prng.js';
import { CELLS, actionIndex, applyPlacement, createBag, emptyBoard, legalPlacements, pieceIndex } from './tetris.js';
import { WEIGHTS, evaluatePlacement } from './heuristic.js';
import { FEATURE_NAMES } from './calibration.js';

export { FEATURE_NAMES };
export const FEATURE_WEIGHTS = FEATURE_NAMES.map((k) => WEIGHTS[k]);

// 보드 (200 × 0/1) ↔ base64 (25 바이트)
export function packBoard(board) {
  const bytes = new Uint8Array(Math.ceil(CELLS / 8));
  for (let c = 0; c < CELLS; c++) if (board[c]) bytes[c >> 3] |= 1 << (c & 7);
  return Buffer.from(bytes).toString('base64');
}
export function unpackBoard(str) {
  const bytes = Buffer.from(str, 'base64');
  const board = new Uint8Array(CELLS);
  for (let c = 0; c < CELLS; c++) board[c] = (bytes[c >> 3] >> (c & 7)) & 1;
  return board;
}

// 한 위치의 모든 합법 후보. 게임오버가 되는 배치는 뺀다 (evaluatePlacement 가 null).
export function candidateAfterstates(board, piece) {
  const out = [];
  for (const { col, rot } of legalPlacements(board, piece)) {
    const e = evaluatePlacement(board, piece, col, rot);
    if (!e) continue;
    out.push({
      action: actionIndex(col, rot), col, rot,
      board: e.board, score: e.score, linesCleared: e.linesCleared,
      features: FEATURE_NAMES.map((k) => e.features[k]),
    });
  }
  return out;
}

export function collectAfterstates({ games = 40, decisionsPerGame = 25, warmupMax = 30, epsilon = 0.3, seed = 4 } = {}) {
  const rng = createRng(seed);
  const out = [];
  for (let g = 0; g < games; g++) {
    const gameSeed = rng.int(2 ** 31);
    const grng = createRng(gameSeed);
    const bag = createBag(grng);
    let board = emptyBoard();
    let piece = bag.next();
    const warmup = grng.int(warmupMax + 1);
    const decisions = [];
    let dead = false;
    for (let p = 0; p < warmup + decisionsPerGame && !dead; p++) {
      const cands = candidateAfterstates(board, piece);
      if (cands.length === 0) { dead = true; break; }
      let best = cands[0];
      for (const c of cands) if (c.score > best.score) best = c;
      const pick = grng.next() < epsilon ? cands[grng.int(cands.length)] : best;
      if (p >= warmup) decisions.push({ piece, board, chosen: best.action, candidates: cands });
      const r = applyPlacement(board, piece, pick.col, pick.rot);
      if (r.gameOver) { dead = true; break; }
      board = r.board;
      piece = bag.next();
    }
    out.push({ id: g, seed: gameSeed, warmup, decisions });
  }
  return out;
}

// 게임 단위 분할. 게임을 시드로 섞어 비율대로 나눈다. 반환: { train, val, test } (게임 id 배열)
export function splitByGame(gameIds, { ratios = [0.6, 0.2, 0.2], seed = 5 } = {}) {
  const rng = createRng(seed);
  const ids = [...gameIds];
  for (let i = ids.length - 1; i > 0; i--) { const j = rng.int(i + 1); [ids[i], ids[j]] = [ids[j], ids[i]]; }
  const nTrain = Math.round(ids.length * ratios[0]);
  const nVal = Math.round(ids.length * ratios[1]);
  return { train: ids.slice(0, nTrain).sort((a, b) => a - b), val: ids.slice(nTrain, nTrain + nVal).sort((a, b) => a - b), test: ids.slice(nTrain + nVal).sort((a, b) => a - b) };
}

// 분할 누수 검사: 세 집합이 서로소이고 전체를 덮는가. 누수가 있으면 throw.
export function assertNoLeak(split, gameIds) {
  const seen = new Map();
  for (const part of ['train', 'val', 'test']) {
    for (const id of split[part]) {
      if (seen.has(id)) throw new Error(`game ${id} in both ${seen.get(id)} and ${part}`);
      seen.set(id, part);
    }
  }
  for (const id of gameIds) if (!seen.has(id)) throw new Error(`game ${id} in no split`);
  return true;
}

// 직렬화 (data/afterstates.json). 보드는 base64 로.
export function serialize(games, split, params) {
  const afterstates = games.reduce((s, g) => s + g.decisions.reduce((t, d) => t + d.candidates.length, 0), 0);
  const decisions = games.reduce((s, g) => s + g.decisions.length, 0);
  return {
    meta: { ...params, games: games.length, decisions, afterstates, split, features: FEATURE_NAMES, featureWeights: FEATURE_WEIGHTS },
    games: games.map((g) => ({
      id: g.id, seed: g.seed, warmup: g.warmup,
      decisions: g.decisions.map((d) => ({
        piece: d.piece, board: packBoard(d.board), chosen: d.chosen,
        candidates: d.candidates.map((c) => [c.action, packBoard(c.board), Number(c.score.toFixed(6)), c.linesCleared, ...c.features]),
      })),
    })),
  };
}

// 역직렬화: 후보를 평탄한 표본 배열로. 각 표본 { gameId, decision, action, board (Uint8Array), score, linesCleared, features, chosen }
export function deserialize(doc) {
  const samples = [];
  const decisions = [];
  for (const g of doc.games) {
    g.decisions.forEach((d, di) => {
      const dec = { gameId: g.id, index: decisions.length, piece: d.piece, board: unpackBoard(d.board), chosen: d.chosen, samples: [] };
      decisions.push(dec);
      for (const c of d.candidates) {
        const s = { gameId: g.id, decision: dec.index, action: c[0], board: unpackBoard(c[1]), score: c[2], linesCleared: c[3], features: c.slice(4), chosen: c[0] === d.chosen };
        dec.samples.push(samples.length);
        samples.push(s);
      }
    });
  }
  return { samples, decisions, split: doc.meta.split, meta: doc.meta };
}

export const pieceName = (i) => ['I', 'O', 'T', 'S', 'Z', 'J', 'L'][i];
export { pieceIndex };
