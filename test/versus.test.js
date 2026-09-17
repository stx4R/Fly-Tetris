import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ATTACK_PERFECT_CLEAR, GARBAGE_CAP, HEIGHT, NEXT_VISIBLE, PIECES, WIDTH,
  applyDecision, boardFromString, boardHeight, boardToString, classifyTSpin, comboBonus, createBag, createPlayer, decisionCandidates,
  emptyBoard, enqueueGarbage, holdSwap, legalPlacementsVersus, nextQueue, pendingGarbage, pieceIndex, pieceSequence, placePiece, playMatch,
  reachablePlacements, receiveGarbage,
} from '../src/tetris.js';
import { columnTransitions, cumulativeWells, holes, rowTransitions } from '../src/heuristic.js';
import { DEFAULT_PARAMS, boardFeatures, createTeacher, objective, playSolo, tspinSetup, wellDepth } from '../src/teacher-attack.js';
import { createRng } from '../src/prng.js';

const I = pieceIndex('I'), O = pieceIndex('O'), T = pieceIndex('T'), L = pieceIndex('L');
const withBoard = (board, current, extra = {}) => ({ ...createPlayer(1), board, current, ...extra });
const bottom = (board, n) => boardToString(board).split('\n').slice(-n).join('\n');

// ---------- 가비지 상쇄 ----------

test('garbage cancel: attack smaller than the queue is subtracted from the front and nothing is sent; larger attack empties the queue and sends the difference', () => {
  // 더블(공격 1) vs 큐 3+2 → 상쇄 1, 보냄 0, 큐 [2(hole 2), 2(hole 5)]
  let p = withBoard(boardFromString(`
    #.........
    ########..
    ########..`), O); // 위에 블록 하나 — 퍼펙트 클리어가 되지 않게
  p = enqueueGarbage(enqueueGarbage(p, 3, 2), 2, 5);
  assert.equal(pendingGarbage(p), 5);
  const r1 = placePiece(p, { col: 8, rot: 0 });
  assert.equal(r1.event.linesCleared, 2);
  assert.equal(r1.event.attack, 1);
  assert.equal(r1.event.cancelled, 1);
  assert.equal(r1.event.sent, 0);
  assert.deepEqual(r1.player.garbage, [{ lines: 2, hole: 2 }, { lines: 2, hole: 5 }]);
  assert.equal(r1.event.garbageInserted, 0, '줄을 지운 배치에서는 가비지가 들어오지 않는다');
  // 테트리스(공격 4) vs 큐 3 → 큐 비움, 1 보냄
  let q = withBoard(boardFromString(`
    #.........
    #########.
    #########.
    #########.
    #########.`), I);
  q = enqueueGarbage(q, 3, 0);
  const r2 = placePiece(q, { col: 9, rot: 1 });
  assert.equal(r2.event.linesCleared, 4);
  assert.equal(r2.event.attack, 4);
  assert.deepEqual([r2.event.cancelled, r2.event.sent, r2.player.garbage], [3, 1, []]);
  // 클리어 없는 배치 → 큐가 하단에 들어온다 (같은 공격의 줄은 같은 구멍 열), 상쇄 안 됨
  const r3 = placePiece(enqueueGarbage(withBoard(emptyBoard(), O), 3, 4), { col: 0, rot: 0 });
  assert.equal(r3.event.garbageInserted, 3);
  assert.equal(bottom(r3.player.board, 3), ['####.#####', '####.#####', '####.#####'].join('\n'));
  assert.equal(bottom(r3.player.board, 5).split('\n')[0], '##........', 'O 가 가비지 위로 밀려 올라간다');
  assert.equal(r3.player.garbage.length, 0);
});

test('garbage cap: at most GARBAGE_CAP lines enter per lock, the rest stays queued; pushing blocks above the top is a top-out', () => {
  const p = enqueueGarbage(enqueueGarbage(withBoard(emptyBoard(), O), 6, 1), 6, 7);
  const r = placePiece(p, { col: 4, rot: 0 });
  assert.equal(r.event.garbageInserted, GARBAGE_CAP);
  assert.deepEqual(r.player.garbage, [{ lines: 4, hole: 7 }]);
  assert.equal(boardHeight(r.player.board), GARBAGE_CAP + 2);
  const tall = emptyBoard();
  for (let y = 2; y < HEIGHT; y++) tall[y * WIDTH] = 1; // 열 0 이 18 높이
  assert.equal(receiveGarbage(tall, 2, 3).toppedOut, false);
  assert.equal(receiveGarbage(tall, 3, 3).toppedOut, true);
});

// ---------- T-스핀 3-corner ----------

test('T-spin: hand-made TSD slot (one overhang) is reached only by a rotation-last path → full T-spin double, attack 4; mirror image identical', () => {
  for (const art of [`
    ...#......
    ###...####
    ####.#####`, `
    .....#....
    ###...####
    ####.#####`]) {
    const board = boardFromString(art);
    const cand = legalPlacementsVersus(board, T).find((c) => c.rot === 2 && c.col === 3 && c.top === 18);
    assert.ok(cand, 'TSD position is reachable');
    assert.equal(cand.spin, true);
    assert.equal(cand.drop, false, '수직 낙하로는 오버행 때문에 못 들어간다');
    assert.equal(classifyTSpin(board, T, 3, 2, 18, cand), 'full');
    const r = placePiece(withBoard(board, T), cand);
    assert.deepEqual([r.event.linesCleared, r.event.tspin, r.event.attack], [2, 'full', 4]);
    assert.equal(bottom(r.player.board, 1), '...##.....'.replace('...##.....', art.trim().split('\n')[0].trim()));
  }
});

test('T-spin: both overhangs make the slot unreachable; a vertically dropped T with 3 corners is only a mini (front corner open); 2 corners is no T-spin', () => {
  const both = boardFromString(`
    ...#.#....
    ###...####
    ####.#####`);
  assert.equal(legalPlacementsVersus(both, T).find((c) => c.rot === 2 && c.col === 3 && c.top === 18), undefined);
  // 2칸 홈에 세로로 떨어진 T (rot 1): 모서리 3개 채움(벽 포함) 이지만 앞쪽(오른쪽) 위 모서리가 비어 mini
  const notch = boardFromString(`
    #.........
    #.........
    #.#.......`);
  const c = legalPlacementsVersus(notch, T).find((x) => x.rot === 1 && x.col === 1);
  assert.equal(classifyTSpin(notch, T, 1, 1, c.top, c), 'mini');
  // 평평한 바닥에 놓인 T (rot 0): 아래 모서리 2개만 → null
  const flat = emptyBoard();
  const f = legalPlacementsVersus(flat, T).find((x) => x.rot === 0 && x.col === 3);
  assert.equal(classifyTSpin(flat, T, 3, 0, f.top, f), null);
  assert.equal(classifyTSpin(flat, O, 3, 0, 18, { spin: true }), null, 'T 가 아니면 null');
  assert.equal(classifyTSpin(both, T, 3, 2, 18, { spin: false }), null, '마지막 동작이 회전이 아니면 null');
});

test('T-spin triple: T slides under the lip and enters with the 5th kick → 3 lines, full, attack 6', () => {
  const board = boardFromString(`
    ..........
    ..#.......
    ..........
    ##.#######
    #..#######
    ##.#######`);
  const cand = legalPlacementsVersus(board, T).find((c) => c.rot === 3 && c.col === 1 && c.top === 17);
  assert.ok(cand);
  assert.deepEqual([cand.spin, cand.drop, cand.kick5], [true, false, true]);
  const r = placePiece(withBoard(board, T), cand);
  assert.deepEqual([r.event.linesCleared, r.event.tspin, r.event.attack], [3, 'full', 6]);
});

// ---------- hold ----------

test('hold: once per placement — second swap throws; placing resets; empty hold takes next[0] and advances the queue', () => {
  const p = createPlayer(11);
  const next = nextQueue(p);
  assert.equal(next.length, NEXT_VISIBLE);
  const h = holdSwap(p);
  assert.equal(h.hold, p.current);
  assert.equal(h.current, next[0], '빈 hold 로 교환하면 next[0] 이 현재 조각');
  assert.deepEqual(nextQueue(h), [...next.slice(1), p.seq.at(p.drawn + NEXT_VISIBLE)]);
  assert.throws(() => holdSwap(h), /hold already used/);
  assert.equal(p.holdUsed, false, '원본 상태는 변하지 않는다');
  const cand = legalPlacementsVersus(h.board, h.current)[0];
  const { player: q } = placePiece(h, cand);
  assert.equal(q.holdUsed, false);
  const h2 = holdSwap(q); // 이제 hold 에 조각이 있으니 교환
  assert.equal(h2.current, q.hold);
  assert.equal(h2.hold, q.current);
  assert.equal(h2.drawn, q.drawn, '차 있는 hold 와의 교환은 큐를 소비하지 않는다');
  // 후보 목록: hold 를 쓴 상태에서는 현재 조각의 배치만
  assert.ok(decisionCandidates(h).every((c) => !c.useHold));
  assert.ok(decisionCandidates(p).some((c) => c.useHold) === (next[0] !== p.current));
});

// ---------- 콤보 표 · 퍼펙트 클리어 ----------

test('combo table: 1–2 +0, 3–4 +1, 5–6 +2, 7–10 +3, 11+ +4; consecutive singles accumulate the bonus; perfect clear adds 10', () => {
  assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 20].map(comboBonus), [0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4]);
  // 열 9 만 빈 5 줄에 세로 I 를 넣으면 4줄 테트리스 + 1줄이 남는다 → 대신 O 로 2줄씩: 열 8,9 빈 10줄 → O 5개 = 5 연속 더블
  const board = boardFromString(Array(10).fill('########..').join('\n'));
  let p = withBoard(board, O);
  const attacks = [], combos = [];
  for (let i = 0; i < 5; i++) {
    const r = placePiece(p, { col: 8, rot: 0 });
    attacks.push(r.event.attack); combos.push(r.event.combo);
    p = { ...r.player, current: O };
  }
  assert.deepEqual(combos, [1, 2, 3, 4, 5]);
  assert.deepEqual(attacks, [1, 1, 2, 2, 3 + ATTACK_PERFECT_CLEAR], '더블 1 + 콤보 보너스 0,0,1,1,2 — 마지막은 보드를 비우므로 퍼펙트 클리어 +10');
});

test('perfect clear: the last clear that empties the board gets +10', () => {
  const p = withBoard(boardFromString('########..\n########..'), O);
  const r = placePiece(p, { col: 8, rot: 0 });
  assert.equal(r.event.perfectClear, true);
  assert.equal(r.event.attack, 1 + ATTACK_PERFECT_CLEAR);
  assert.equal(r.player.board.every((c) => c === 0), true);
});

// ---------- 도달 가능성 · 7-bag · 결정성 ----------

test('reachablePlacements: tuck under an overhang is reachable by movement only (spin=false, drop=true); spawn blocked → []; lock-out positions excluded', () => {
  // 열 0 위에 오버행: 행 15 열 0-1 채움, 아래 비어 있음 → O 를 왼쪽으로 밀어 넣을 수 있다 (수직 낙하만으로는 불가)
  const board = boardFromString(`
    ##........
    ..........
    ..........
    ..........
    ..........`);
  const o = legalPlacementsVersus(board, O).find((c) => c.col === 0 && c.top === 18);
  assert.ok(o, 'O tucked under the lip');
  assert.equal(o.drop, true);
  assert.equal(o.spin, false, 'O 는 회전이 없다');
  // 가득 찬 보드: 모든 정지 위치가 버퍼에 걸쳐 lock out → []
  assert.deepEqual(reachablePlacements(new Uint8Array(200).fill(1), T), []);
  // 열 4 가 20 높이: 조각은 버퍼에서 좌우로 넘어가 양쪽에 놓일 수 있지만, 열 4 위에 얹히는 배치는 lock out
  const pillar = emptyBoard();
  for (let y = 0; y < HEIGHT; y++) pillar[y * WIDTH + 4] = 1;
  const tp = legalPlacementsVersus(pillar, T);
  assert.ok(tp.some((c) => c.col + 2 < 4) && tp.some((c) => c.col > 4));
  assert.ok(tp.every((c) => c.top >= 0));
  // lock-out: 19 높이 벽 위에 얹히는 배치는 버퍼에 걸치므로 제외 — 열 0 만 빈 19줄 벽에서 세로 I 만 열 0 에 들어간다
  const wall = emptyBoard();
  for (let y = 1; y < HEIGHT; y++) for (let x = 1; x < WIDTH; x++) wall[y * WIDTH + x] = 1;
  const iw = legalPlacementsVersus(wall, I);
  assert.ok(iw.every((c) => c.top >= 0));
  assert.ok(iw.some((c) => c.col === 0 && c.rot % 2 === 1));
});

test('pure 7-bag: pieceSequence matches createBag order; every 7 contain each piece once; players with the same seed are identical', () => {
  const seq = pieceSequence(77);
  const bag = createBag(createRng(77));
  for (let k = 0; k < 70; k++) assert.equal(seq.at(k), bag.next());
  for (let i = 0; i < 70; i += 7) assert.deepEqual(Array.from({ length: 7 }, (_, j) => seq.at(i + j)).sort(), [0, 1, 2, 3, 4, 5, 6]);
  const teacher = createTeacher(DEFAULT_PARAMS, { depth: 2, width: 4 });
  const a = playSolo(teacher, { seed: 5, cap: 40 }), b = playSolo(teacher, { seed: 5, cap: 40 });
  assert.deepEqual({ ...a, ms: 0 }, { ...b, ms: 0 });
});

// ---------- 교사 특징 · 빔 서치 ----------

test('boardFeatures equals the Dellacherie functions on random boards; wellDepth and tspinSetup on hand-made boards', () => {
  const rng = createRng(9);
  for (let i = 0; i < 200; i++) {
    const b = emptyBoard();
    const fill = rng.next() * 0.8;
    for (let c = 0; c < 200; c++) if (rng.next() < fill) b[c] = 1;
    const f = boardFeatures(b);
    assert.deepEqual([f.rowTransitions, f.columnTransitions, f.holes, f.cumulativeWells], [rowTransitions(b), columnTransitions(b), holes(b), cumulativeWells(b)]);
  }
  assert.equal(wellDepth(emptyBoard()), 0);
  assert.equal(wellDepth(boardFromString('####.#####\n####.#####\n####.#####')), 3);
  assert.equal(wellDepth(boardFromString('####.#####\n####.###.#\n####.#####')), 3, '구멍 하나는 나머지 열의 최소 높이를 바꾸지 않는다');
  assert.equal(wellDepth(boardFromString(Array(6).fill('.#########').join('\n'))), 4, '상한 4');
  assert.equal(tspinSetup(emptyBoard()), 0);
  assert.equal(tspinSetup(boardFromString('...#......\n###...####\n####.#####')), 2, 'TSD 준비');
  assert.equal(tspinSetup(boardFromString('...#......\n#.#...####\n####.#####')), 1, '형태만 (윗줄이 안 찼다)');
  assert.equal(tspinSetup(boardFromString('...#.#....\n###...####\n####.#####')), 0, '양쪽 오버행은 슬롯이 아니다');
});

test('beam search (depth 3, width 8) sends more attack than 1-ply with the same weights over the same seeds', () => {
  const seeds = [1, 2];
  const run = (opts) => seeds.map((seed) => playSolo(createTeacher(DEFAULT_PARAMS, opts), { seed, cap: 250 }));
  const ply1 = run({ depth: 1, width: 1 }), beam = run({ depth: 3, width: 8 });
  const sum = (gs) => gs.reduce((s, g) => s + g.attack, 0);
  assert.ok(sum(beam) > sum(ply1), `beam ${sum(beam)} vs 1-ply ${sum(ply1)}`);
  assert.ok(beam.every((g) => g.pieces === 250) && ply1.every((g) => g.pieces === 250), 'both survive 250 pieces');
  assert.ok(objective(beam) > objective(ply1));
});

test('scoreCandidates gives every live candidate a value and the argmax is a legal candidate; a dead-only decision returns chosen -1', () => {
  const teacher = createTeacher(DEFAULT_PARAMS, { depth: 2, width: 4 });
  let p = createPlayer(3);
  for (let i = 0; i < 10; i++) p = applyDecision(p, teacher.choose(p)).player;
  const { candidates, chosen } = teacher.scoreCandidates(p);
  assert.equal(candidates.length, decisionCandidates(p).length);
  assert.ok(chosen >= 0);
  assert.ok(candidates.every((c) => Number.isFinite(c.value) && c.features.holes >= 0));
  assert.equal(candidates[chosen].value, Math.max(...candidates.map((c) => c.value)));
  const full = withBoard(new Uint8Array(200).fill(1), T);
  assert.equal(teacher.scoreCandidates(full).chosen, -1);
  assert.equal(teacher.choose(full), null);
});

test('playMatch: garbage sent by one player is queued for the other with a hole column; the match ends when someone dies or at the cap', () => {
  const greedy = createTeacher(DEFAULT_PARAMS, { depth: 1, width: 1 });
  const m = playMatch([greedy, greedy], { seedA: 1, seedB: 2, seed: 3, cap: 60 });
  assert.ok(m.pieces <= 60);
  assert.ok(m.a.stats.sent + m.b.stats.sent > 0, 'somebody attacked');
  assert.equal(m.a.stats.garbageReceived + pendingGarbage(m.a) + m.a.stats.cancelled, m.b.stats.sent, 'B 가 보낸 것 = A 가 받은 것 + 남은 큐 + 상쇄한 것');
  assert.equal(m.b.stats.garbageReceived + pendingGarbage(m.b) + m.b.stats.cancelled, m.a.stats.sent);
});

test('engine state is never mutated by decisions', () => {
  const p = createPlayer(2);
  const snap = JSON.stringify({ ...p, seq: undefined, board: Array.from(p.board) });
  const cands = decisionCandidates(p);
  for (const c of cands.slice(0, 5)) applyDecision(p, c);
  enqueueGarbage(p, 2, 3);
  assert.equal(JSON.stringify({ ...p, seq: undefined, board: Array.from(p.board) }), snap);
});
