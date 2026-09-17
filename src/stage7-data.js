// 7단계 데이터: 결정(6단계 versus-decisions) → 후보별 afterstate 입력 벡터 u, 학습용 K 후보 부분집합, 전체 후보 평가 집합, DAgger 병합(누수 검사).
//
// 입력 u (U_DIM 256, 후보 하나 = 결정에 그 후보를 적용한 뒤의 상태 + 그 배치 자체):
//   [0,200)   afterstate 보드 (줄 제거·가비지 삽입 후), 셀 0/1
//   [200,207) 놓은 조각 one-hot 7            [207,211) 놓은 회전 상태 one-hot 4 (SRS 0..3)
//   [211,219) 적용 후 hold one-hot 7 + 비어 있음 1
//   [219,254) 적용 후 앞으로 올 조각 5 개 × one-hot 7 (current' + next'[0..3] — 교사 빔이 보는 미래)
//   254       적용 후 가비지 큐 높이 min(1, lines / GARBAGE_NORM)     255  적용 후 콤보 min(1, combo / COMBO_NORM)
// 정규화: 모든 성분이 [0, 1]. 표준화는 하지 않는다 (보드·one-hot 은 이진, 두 스칼라는 상한으로 나눈다). meta.uNormalization 에 기록.
//
// 학습은 결정당 K 후보 — 시간이 K 에 선형이라서다 (6단계 예산 §5.4). Phase A 는 hard (교사 선택 + 상위 K−1); Phase A-2 부터 mixed (교사 선택 + 상위 3 + 무작위 4):
// hard 만 쓰면 명백히 나쁜 수의 점수에 제약이 없어 정책 선택의 1/6 이 교사 값 하위 절반이 됐다 (docs/stage7-wiring-constraint.md §5).
// 평가는 **전체 후보** 로만 한다: 평가 함수는 subset 표식이 있는 결정을 거부한다 (K 후보 평가는 top-1 을 부풀린다).

import { GARBAGE_CAP, PIECES, nextQueue, pendingGarbage } from './tetris.js';
import { afterstate } from './versus-data.js';
import { bootstrapCI, kendallTau, mean } from './evaluate.js';
import { createRng } from './prng.js';
import { U_DIM } from './sparse-rnn.js';

export { U_DIM };
export const U_LAYOUT = { board: 0, piece: 200, rot: 207, hold: 211, upcoming: 219, garbage: 254, combo: 255 };
export const GARBAGE_NORM = GARBAGE_CAP;   // 8
export const COMBO_NORM = 10;
export const U_NORMALIZATION = { board: '0/1', onehots: '0/1', garbage: `min(1, pendingLines/${GARBAGE_NORM})`, combo: `min(1, combo/${COMBO_NORM})`, standardized: false };
export const TRAIN_K = 8;

// 적용 후 상태 + 배치 → u (out 에 쓴다; 기본 새 Float32Array)
export function encodeAfterstate(player, event, out = new Float32Array(U_DIM)) {
  out.fill(0);
  const b = player.board;
  for (let c = 0; c < 200; c++) out[c] = b[c] ? 1 : 0;
  out[U_LAYOUT.piece + event.piece] = 1;
  out[U_LAYOUT.rot + (event.rot & 3)] = 1;
  out[U_LAYOUT.hold + (player.hold === null ? PIECES.length : player.hold)] = 1;
  const up = [player.current, ...nextQueue(player, 4)];
  for (let q = 0; q < 5; q++) out[U_LAYOUT.upcoming + q * PIECES.length + up[q]] = 1;
  out[U_LAYOUT.garbage] = Math.min(1, pendingGarbage(player) / GARBAGE_NORM);
  out[U_LAYOUT.combo] = Math.min(1, player.combo / COMBO_NORM);
  return out;
}

// 결정 d 의 후보 k → u
export function encodeCandidate(d, k, out) {
  const { player, event } = afterstate(d, k);
  return encodeAfterstate(player, event, out);
}

// 학습 부분집합: 교사 선택 + 나머지 중 교사 값 상위 K−1 (동점은 낮은 인덱스; hard negatives). 후보가 K 이하면 전부. 반환 [chosen, ...] (chosen 이 위치 0).
// mixed: 상위 hard 개 + 나머지에서 무작위 (K−1−hard) 개 — 쉬운 음성(명백히 나쁜 수)도 학습에 넣는 변형 (진단·제안용; rng 필요).
export function trainingSubset(candidates, chosen, K = TRAIN_K, { mixed = false, hard = 3, rng = null } = {}) {
  const others = candidates.map((c, i) => i).filter((i) => i !== chosen).sort((a, b) => candidates[b].value - candidates[a].value || a - b);
  if (!mixed) return [chosen, ...others.slice(0, Math.max(0, K - 1))];
  const top = others.slice(0, hard), rest = others.slice(hard);
  for (let i = rest.length - 1; i > 0; i--) { const j = rng.int(i + 1); [rest[i], rest[j]] = [rest[j], rest[i]]; }
  return [chosen, ...top, ...rest.slice(0, Math.max(0, K - 1 - hard))];
}

// ---------- 데이터셋 ----------
// pool: Float32Array(SharedArrayBuffer, capacityRows × U_DIM). 결정 항목 { rows: Int32Array (pool 행), chosen (rows 내 위치), values, gameId, subset: bool }.

export function createPool(capacityRows) {
  const U = new Float32Array(new SharedArrayBuffer(capacityRows * U_DIM * 4));
  return { U, capacity: capacityRows, used: 0 };
}

// 결정 목록을 pool 에 넣는다. subset=true 면 K 후보만, 아니면 전체 후보. 반환 항목 배열.
export function appendDecisions(pool, decisions, { K = TRAIN_K, subset, negatives = 'hard', hard = 3, seed = 1 } = {}) {
  const items = [];
  const buf = new Float32Array(U_DIM);
  const rng = createRng(seed);
  for (const d of decisions) {
    const idx = subset ? trainingSubset(d.candidates, d.chosen, K, { mixed: negatives === 'mixed', hard, rng }) : d.candidates.map((_, i) => i);
    if (pool.used + idx.length > pool.capacity) throw new Error(`pool capacity ${pool.capacity} exceeded`);
    const rows = new Int32Array(idx.length);
    idx.forEach((k, q) => { encodeCandidate(d, k, buf); pool.U.set(buf, pool.used * U_DIM); rows[q] = pool.used++; });
    items.push({ rows, chosen: subset ? 0 : d.chosen, values: idx.map((k) => d.candidates[k].value), gameId: d.gameId, index: d.index, subset: !!subset });
  }
  return items;
}

// 6단계 rank-train 이 쓴 테스트 결정 (게임 id 순으로 8000 결정이 될 때까지의 게임 중 test 분할) — 7단계 표를 6단계 표와 직접 비교하기 위한 같은 1204 결정.
export function stage6Games(data, target = 8000) {
  const games = [];
  let n = 0;
  for (const g of data.games) { if (n >= target) break; games.push(g); n += g.decisions.length; }
  return games;
}

// 분할된 결정 선택: train 은 train 게임을 id 순으로 trainDecisions 까지, val 은 val 게임을 valDecisions 까지, test 는 6단계와 같은 집합.
export function selectDecisions(data, { trainDecisions = 8000, valDecisions = 2000, stage6Target = 8000 } = {}) {
  const part = { train: new Set(data.split.train), val: new Set(data.split.val), test: new Set(data.split.test) };
  const take = (ids, limit) => { const out = []; for (const g of data.games) { if (out.length >= limit) break; if (!ids.has(g.id)) continue; for (const d of g.decisions) { if (out.length >= limit) break; out.push(d); } } return out; };
  const s6 = stage6Games(data, stage6Target);
  const test = s6.flatMap((g) => (part.test.has(g.id) ? g.decisions : []));
  return { train: take(part.train, trainDecisions), val: take(part.val, valDecisions), test, testGames: s6.filter((g) => part.test.has(g.id)).map((g) => g.id) };
}

// ---------- DAgger 병합 ----------
// 새 게임(정책이 방문한 상태 + 교사 라벨)은 train 에 들어가고, 게임 단위로 valFraction 만큼은 val 에 들어간다 (조기 종료 손실이 학습 분포를 따라가게;
// test 에는 절대 넣지 않는다 — test 는 6단계와 같은 교사 분포 1204 결정으로 고정). 게임 id 는 기존 최대 + 1 부터, 시드는 기존 게임과 겹치지 않아야 한다.
// 누수 검사: 새 id 가 기존 어느 분할에도 없고, 새 시드가 기존 어느 게임 시드와도 같지 않으며, test 항목은 그대로이고, 새 val 게임과 새 train 게임이 서로소다.
export function mergeDagger(dataset, newGames, { valFraction = 0.1 } = {}) {
  const known = new Set([...dataset.train, ...dataset.val, ...dataset.test].map((d) => d.gameId));
  const seeds = new Set(dataset.gameSeeds ?? []);
  const ids = new Set();
  for (const g of newGames) {
    if (known.has(g.id)) throw new Error(`DAgger game ${g.id} collides with an existing game id`);
    if (ids.has(g.id)) throw new Error(`DAgger game ${g.id} appears twice`);
    if (seeds.has(g.seed)) throw new Error(`DAgger game seed ${g.seed} collides with an existing game seed`);
    for (const d of g.decisions) if (d.gameId !== g.id) throw new Error('decision gameId mismatch');
    ids.add(g.id); seeds.add(g.seed);
  }
  const testBefore = dataset.test.length;
  const nVal = Math.floor(newGames.length * valFraction);
  const valGames = newGames.slice(newGames.length - nVal), trainGames = newGames.slice(0, newGames.length - nVal);
  const addedTrain = appendDecisions(dataset.pool, trainGames.flatMap((g) => g.decisions), { K: dataset.K, subset: true, negatives: dataset.negatives, hard: dataset.hard, seed: 1000 + dataset.train.length });
  const addedVal = appendDecisions(dataset.pool, valGames.flatMap((g) => g.decisions), { K: dataset.K, subset: true, negatives: dataset.negatives, hard: dataset.hard, seed: 2000 + dataset.val.length });
  const trainIds = new Set(trainGames.map((g) => g.id));
  for (const g of valGames) if (trainIds.has(g.id)) throw new Error('DAgger val game also in train');
  dataset.train.push(...addedTrain);
  dataset.val.push(...addedVal);
  for (const g of newGames) dataset.gameSeeds.push(g.seed);
  if (dataset.test.length !== testBefore) throw new Error('test changed during DAgger merge');
  return { train: addedTrain.length, val: addedVal.length, trainGames: trainGames.length, valGames: valGames.length };
}

// ---------- 평가 (전체 후보만) ----------

// items: [{ rows, chosen, values, subset }], scores: items 와 같은 순서의 Float64Array 배열 (후보별 점수). 결정 내 τ · top-1 · regret, 부트스트랩 95% CI.
// 선택 품질 (Phase A-2 게이트): 모델 선택의 교사 순위 백분위 (1 = 최선), 선택이 교사 값 하위 50% / 25% 인 결정 비율 (bottomHalfRate ≤ 5% 가 게이트).
export function metricsFromScores(items, scores, { seed = 11 } = {}) {
  const taus = [], hits = [], regrets = [], pctl = [], bottomHalf = [], bottomQuarter = [];
  let candidates = 0;
  for (let i = 0; i < items.length; i++) {
    const d = items[i], s = scores[i];
    if (d.subset) throw new Error('evaluation must use the full candidate set (decision is a K-subset)');
    if (s.length !== d.rows.length || s.length !== d.values.length) throw new Error('score/candidate length mismatch');
    candidates += s.length;
    taus.push(kendallTau(d.values, Array.from(s)));
    let a = 0;
    for (let k = 1; k < s.length; k++) if (s[k] > s[a]) a = k;
    hits.push(d.values[a] >= d.values[d.chosen] - 1e-9 ? 1 : 0);
    regrets.push(d.values[d.chosen] - d.values[a]);
    const n = s.length;
    let rank = 0; // 교사 값이 선택보다 큰 후보 수 (동점은 선택보다 앞선 것으로 치지 않는다)
    for (let k = 0; k < n; k++) if (d.values[k] > d.values[a] + 1e-9) rank++;
    pctl.push(n > 1 ? 1 - rank / (n - 1) : 1);
    bottomHalf.push(rank >= n / 2 ? 1 : 0);
    bottomQuarter.push(rank >= 0.75 * n ? 1 : 0);
  }
  return {
    decisions: items.length, candidates, candidatesPerDecision: candidates / items.length,
    tau: mean(taus), tauCI: bootstrapCI(taus, mean, { seed }),
    top1: mean(hits), top1CI: bootstrapCI(hits, mean, { seed: seed + 1 }),
    regret: mean(regrets),
    pickPercentile: mean(pctl), bottomHalfRate: mean(bottomHalf), bottomHalfRateCI: bootstrapCI(bottomHalf, mean, { seed: seed + 2 }), bottomQuarterRate: mean(bottomQuarter),
  };
}

export function chanceFromItems(items, { seed = 3 } = {}) {
  const rng = createRng(seed);
  return metricsFromScores(items, items.map((d) => Float64Array.from({ length: d.rows.length }, () => rng.next())), { seed });
}
