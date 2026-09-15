import { test } from 'node:test';
import assert from 'node:assert/strict';
import { G_IN, VALUE_BLOCK, VALUE_PIECE, assignCenters, createEncoder } from '../src/encode.js';
import { CELLS, HEIGHT, WIDTH, boardFromString, emptyBoard, pieceIndex } from '../src/tetris.js';

const neuron = (id, type, layer) => ({ id, type, layer, instance: type, soma: null, isKC: false, isAllowlisted: false });
function connectome(inputTypes) {
  const neurons = inputTypes.map(([id, type]) => neuron(id, type, 'input'));
  neurons.push(neuron(900, 'A', 'hidden'), neuron(901, 'DNp04', 'output'));
  return { meta: {}, neurons, edges: [] };
}

test('assignCenters: per-type bodyId order, uniform sub-grid inside 10×20, deterministic', () => {
  // LC4 × 4 → nx = ceil(sqrt(2)) = 2, ny = 2 → (2.5,5) (7.5,5) (2.5,15) (7.5,15) in bodyId order
  const c = connectome([[40, 'LC4'], [10, 'LC4'], [30, 'LC4'], [20, 'LC4'], [5, 'LC6'], [7, 'LC6']]);
  const centers = assignCenters(c.neurons);
  assert.equal(centers.size, 6);
  const byId = (id) => centers.get(c.neurons.findIndex((n) => n.id === id));
  assert.deepEqual(byId(10), [2.5, 5]);
  assert.deepEqual(byId(20), [7.5, 5]);
  assert.deepEqual(byId(30), [2.5, 15]);
  assert.deepEqual(byId(40), [7.5, 15]);
  // LC6 × 2 → nx 1, ny 2 → (5,5) (5,15)
  assert.deepEqual(byId(5), [5, 5]);
  assert.deepEqual(byId(7), [5, 15]);
  for (const [cx, cy] of centers.values()) assert.ok(cx > 0 && cx < WIDTH && cy > 0 && cy < HEIGHT);
  // 같은 입력이면 같은 결과 (뉴런 배열 순서를 바꿔도 bodyId 기준이라 동일)
  const shuffled = { ...c, neurons: [c.neurons[3], c.neurons[0], c.neurons[5], c.neurons[1], c.neurons[4], c.neurons[2], c.neurons[6], c.neurons[7]] };
  const centers2 = assignCenters(shuffled.neurons);
  const byId2 = (id) => centers2.get(shuffled.neurons.findIndex((n) => n.id === id));
  for (const id of [10, 20, 30, 40, 5, 7]) assert.deepEqual(byId2(id), byId(id));
});

test('RF: every neuron sums to 1 over the grid, finite, peaked at its center', () => {
  const c = connectome([[1, 'LC4'], [2, 'LC4'], [3, 'LPLC2']]);
  const enc = createEncoder(c);
  assert.equal(enc.nInput, 3);
  for (let i = 0; i < enc.nInput; i++) {
    let sum = 0, best = -1, bestV = -1;
    for (let cell = 0; cell < CELLS; cell++) {
      const v = enc.rf[cell * enc.nInput + i];
      assert.ok(Number.isFinite(v) && v >= 0);
      sum += v;
      if (v > bestV) { bestV = v; best = cell; }
    }
    assert.ok(Math.abs(sum - 1) < 1e-5, `neuron ${i} RF sum ${sum}`);
    const cx = enc.centers[2 * i], cy = enc.centers[2 * i + 1];
    const px = (best % WIDTH) + 0.5, py = Math.floor(best / WIDTH) + 0.5;
    assert.ok(Math.hypot(px - cx, py - cy) <= Math.SQRT1_2 + 1e-9, 'peak cell is the one nearest the center');
  }
});

test('encode: empty board with no piece → zero current; full board → G_IN * VALUE_BLOCK everywhere in the input block', () => {
  const c = connectome([[1, 'LC4'], [2, 'LC4'], [3, 'LC10']]);
  const enc = createEncoder(c);
  const zero = enc.encode(emptyBoard(), null);
  assert.equal(zero.length, c.neurons.length);
  assert.ok(Array.from(zero).every((v) => v === 0));
  const full = enc.encode(new Uint8Array(CELLS).fill(1), null);
  for (let i = 0; i < enc.nInput; i++) assert.ok(Math.abs(full[i] - G_IN * VALUE_BLOCK) < 1e-5);
  for (let i = enc.nInput; i < full.length; i++) assert.equal(full[i], 0, 'non-input neurons get no external current');
});

test('encode: the current piece is drawn at spawn (top centre) with VALUE_PIECE and dominates nearby RFs; deterministic', () => {
  const c = connectome([[1, 'LC4'], [2, 'LC4'], [3, 'LC4'], [4, 'LC4']]); // 중심 (2.5,5) (7.5,5) (2.5,15) (7.5,15)
  const enc = createEncoder(c);
  const O = pieceIndex('O');
  const values = enc.cellValues(emptyBoard(), O);
  // O 스폰: 폭 2 → col 4, rows 0..1
  assert.equal(values[0 * WIDTH + 4], VALUE_PIECE);
  assert.equal(values[1 * WIDTH + 5], VALUE_PIECE);
  assert.equal(values.reduce((a, b) => a + b, 0), 4 * VALUE_PIECE);
  const a = enc.encode(emptyBoard(), O);
  const b = enc.encode(emptyBoard(), O);
  assert.deepEqual(Array.from(a), Array.from(b));
  // 위쪽 뉴런 (cy=5) 이 아래쪽 (cy=15) 보다 큰 전류를 받는다
  assert.ok(a[0] > a[2] && a[1] > a[3]);
  // 바닥 블록은 아래쪽 뉴런을 더 자극
  const bottom = enc.encode(boardFromString('##########'), null);
  assert.ok(bottom[2] > bottom[0] && bottom[3] > bottom[1]);
});
