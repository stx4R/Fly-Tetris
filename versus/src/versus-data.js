// 대전 결정 데이터 (6단계). 결정 단위: 상태(보드·가비지 큐·hold·next 5·콤보) + 후보 전체 + 교사 점수 + 교사 선택.
// 4단계 afterstate 데이터와 달리 배치(batch) 단위가 후보가 아니라 결정이다 — 랭킹 손실(src/rank-train.js)의 단위.
//
// 결정 행 [board(base64), current, hold(-1=없음), drawn, next5, garbage[[lines,hole]], combo, chosen, taken, received(그때까지 받은 가비지 줄), candidates].
// 저장은 결과 보드를 넣지 않는다: 엔진이 결정적이라 (상태, 후보) 에서 applyDecision 으로 정확히 복원된다 (deserialize 의 afterstate()).
// 후보 필드 [useHold, col, rot, top, spin, kick5, value(교사 점수, 소수 3자리), attack, lines, tspin(0 없음/1 mini/2 full), danger].
// 게임 단위 60/20/20 분할은 afterstate.js 의 splitByGame / assertNoLeak 을 그대로 쓴다.
//
// 상태 방문 정책: 교사(scored 모드) 선택 (1−ε) / 무작위 후보 ε. 기록되는 라벨(chosen·value)은 정책과 무관한 교사의 것이다.
// 인공 가비지: 조각마다 확률 rate 로 1–4 줄을 큐에 넣는다 (실제 대전 분포 근사; 비율은 meta.garbage 에 기록).

import { createRng } from './prng.js';
import { WIDTH, applyDecision, createPlayer, enqueueGarbage, nextQueue, pendingGarbage, pieceSequence } from './tetris.js';
import { packBoard, unpackBoard } from './afterstate.js';

export { splitByGame, assertNoLeak } from './afterstate.js';

// 인공 가비지 주입기: 조각마다 확률 rate 로 1–4 줄 (분포 dist) 을 새 구멍 열로 큐에 넣는다. 실제 대전 분포의 근사. (6단계 수집·7단계 DAgger 공용)
export function makeInjector({ rate, dist = [0.4, 0.3, 0.15, 0.15] }) {
  return (player, rng) => {
    if (rng.next() >= rate) return player;
    let u = rng.next(), lines = 1;
    for (let k = 0; k < dist.length; k++) { u -= dist[k]; if (u <= 0) { lines = k + 1; break; } }
    return enqueueGarbage(player, lines, rng.int(WIDTH));
  };
}

const TSPIN_CODE = { null: 0, mini: 1, full: 2 };
const TSPIN_NAME = [null, 'mini', 'full'];

// 한 게임을 교사로 플레이하며 결정을 기록한다. 반환 { seed, decisions, pieces, dead, stats, injectedLines, injectedEvents }
// policy(player, cands) → 후보 인덱스 를 주면 방문 정책이 그것으로 바뀐다 (7단계 DAgger: 학습된 정책이 방문, 라벨은 여전히 교사). ε 은 그때 무시.
export function collectGame(teacher, { seed, cap = 250, epsilon = 0.1, injector = null, policy = null } = {}) {
  let p = createPlayer(seed);
  const rng = createRng(seed * 7 + 3);
  const decisions = [];
  let injectedLines = 0, injectedEvents = 0, dead = false;
  while (!p.dead && decisions.length < cap) {
    const { candidates, chosen } = teacher.scoreCandidates(p);
    if (chosen < 0) { dead = true; break; } // 살아남는 후보가 없다 = 사망
    const taken = policy ? policy(p, candidates.map((c) => c.cand)) : rng.next() < epsilon ? rng.int(candidates.length) : chosen;
    decisions.push({
      board: p.board, current: p.current, hold: p.hold, drawn: p.drawn, next: nextQueue(p), garbage: p.garbage, combo: p.combo, received: p.stats.garbageReceived,
      candidates: candidates.map((c) => ({ useHold: c.cand.useHold, piece: c.cand.piece, col: c.cand.col, rot: c.cand.rot, top: c.cand.top, spin: c.cand.spin, kick5: c.cand.kick5, value: c.value, attack: c.event.attack, lines: c.event.linesCleared, tspin: c.event.tspin, danger: c.danger })),
      chosen, taken,
    });
    p = applyDecision(p, candidates[taken].cand).player;
    if (injector && !p.dead) {
      const before = pendingGarbage(p);
      p = injector(p, rng);
      const d = pendingGarbage(p) - before;
      if (d > 0) { injectedLines += d; injectedEvents++; }
    }
  }
  return { seed, decisions, pieces: p.pieces, dead: p.dead || dead, stats: p.stats, injectedLines, injectedEvents };
}

export function serialize(games, split, meta) {
  const decisions = games.reduce((s, g) => s + g.decisions.length, 0);
  const candidates = games.reduce((s, g) => s + g.decisions.reduce((t, d) => t + d.candidates.length, 0), 0);
  return {
    meta: { ...meta, games: games.length, decisions, candidates, split, candidateFields: ['useHold', 'col', 'rot', 'top', 'spin', 'kick5', 'value', 'attack', 'lines', 'tspin', 'danger'] },
    games: games.map((g) => ({
      id: g.id, seed: g.seed, pieces: g.pieces, dead: g.dead, injectedLines: g.injectedLines, injectedEvents: g.injectedEvents,
      stats: g.stats,
      decisions: g.decisions.map((d) => [
        packBoard(d.board), d.current, d.hold === null ? -1 : d.hold, d.drawn, d.next, d.garbage.map((q) => [q.lines, q.hole]), d.combo, d.chosen, d.taken, d.received,
        d.candidates.map((c) => [c.useHold ? 1 : 0, c.col, c.rot, c.top, c.spin ? 1 : 0, c.kick5 ? 1 : 0, Number(c.value.toFixed(3)), c.attack, c.lines, TSPIN_CODE[c.tspin], c.danger ? 1 : 0]),
      ]),
    })),
  };
}

// 역직렬화. 결정 { gameId, index, player(복원된 상태), candidates: [{ useHold, piece, col, rot, top, spin, kick5, value, attack, lines, tspin, danger }], chosen, taken }.
// afterstate(decision, k) → { player, event } (applyDecision 재실행 — 결과 보드는 player.board).
export function deserialize(doc) {
  const decisions = [];
  const games = doc.games.map((g) => {
    const seq = pieceSequence(g.seed);
    const base = createPlayer(g.seed);
    const decs = g.decisions.map((row) => {
      const [board, current, hold, drawn, next, garbage, combo, chosen, taken, received, cands] = row;
      const player = { ...base, seq, board: unpackBoard(board), current, hold: hold < 0 ? null : hold, holdUsed: false, drawn, garbage: garbage.map(([lines, h]) => ({ lines, hole: h })), combo };
      const holdPiece = player.hold === null ? seq.at(drawn) : player.hold;
      const dec = {
        gameId: g.id, index: decisions.length, player, next, received,
        candidates: cands.map((c) => ({ useHold: c[0] === 1, piece: c[0] === 1 ? holdPiece : current, col: c[1], rot: c[2], top: c[3], spin: c[4] === 1, kick5: c[5] === 1, value: c[6], attack: c[7], lines: c[8], tspin: TSPIN_NAME[c[9]], danger: c[10] === 1 })),
        chosen, taken,
      };
      decisions.push(dec);
      return dec;
    });
    return { id: g.id, seed: g.seed, pieces: g.pieces, dead: g.dead, injectedLines: g.injectedLines, injectedEvents: g.injectedEvents, stats: g.stats, decisions: decs };
  });
  return { games, decisions, split: doc.meta.split, meta: doc.meta };
}

export const afterstate = (decision, k) => applyDecision(decision.player, decision.candidates[k]);

// 분할별 결정 인덱스
export function decisionIndices(data, part) {
  const ids = new Set(data.split[part]);
  return data.decisions.filter((d) => ids.has(d.gameId)).map((d) => d.index);
}
