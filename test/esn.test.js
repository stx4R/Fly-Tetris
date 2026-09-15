import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createESN } from '../src/esn.js';
import { computeSpectral } from '../src/spectral.js';

const neuron = (id, type, layer, roi) => ({ id, type, layer, instance: type, soma: null, isKC: false, isAllowlisted: false, roi });
function smallConnectome() {
  const neurons = [
    neuron(10, 'LC4', 'input', 'A'), neuron(11, 'LC4', 'input', 'B'),
    neuron(20, 'A', 'hidden', 'A'), neuron(21, 'B', 'hidden', 'A'), neuron(22, 'C', 'hidden', 'B'),
    neuron(30, 'DNp04', 'output', null), neuron(31, 'DNp02', 'output', 'A'),
  ];
  const edges = [[0, 2, 10], [0, 3, 5], [1, 3, 5], [1, 4, 20], [2, 5, 8], [3, 5, 4], [3, 6, 6], [4, 6, 2], [4, 2, 3], [2, 4, 3], [5, 2, 1], [0, 5, 7], [4, 5, 2]];
  return { meta: {}, neurons, edges };
}

test('ESN: one step matches x ← (1-lr)x + lr·tanh(W x + inputScale·I_ext) by hand; g derived from rho; direct g refused', () => {
  const c = smallConnectome();
  const spectral = computeSpectral(c, { tol: 1e-10, maxIter: 5000 });
  const esn = createESN(c, { rhoTarget: 1.0, alpha: 1.0, lr: 0.4, inputScale: 3 }, { spectral });
  assert.ok(Math.abs(esn.g - 1 / spectral['1'].rhoUnit) < 1e-15);
  assert.throws(() => createESN(c, { rhoTarget: 1, alpha: 1, lr: 0.4, inputScale: 1, g: 2 }, { spectral }), /cannot be given directly/);
  const iExt = new Float32Array(7);
  iExt[0] = 0.2; iExt[1] = -0.1;
  esn.reset();
  esn.step(iExt);
  const x1 = Array.from(esn.state());
  // 첫 스텝: x = 0 이므로 W x = 0 → x1 = lr·tanh(inputScale·I_ext) (입력층만), 나머지 0
  assert.ok(Math.abs(x1[0] - 0.4 * Math.tanh(3 * iExt[0])) < 1e-12);
  assert.ok(Math.abs(x1[1] - 0.4 * Math.tanh(3 * iExt[1])) < 1e-12);
  for (let i = 2; i < 7; i++) assert.equal(x1[i], 0);
  // 둘째 스텝: 손으로 W x1 계산 (CSR 행 = pre)
  const inW = new Float64Array(7);
  for (const [, post, w] of c.edges) inW[post] += w;
  const pre = new Float64Array(7);
  for (const [a, b, w] of c.edges) pre[b] += esn.g * (w / inW[b]) * x1[a];
  esn.step(iExt);
  const x2 = esn.state();
  for (let i = 0; i < 7; i++) {
    const expect = 0.6 * x1[i] + 0.4 * Math.tanh(pre[i] + (i < 2 ? 3 * iExt[i] : 0));
    assert.ok(Math.abs(x2[i] - expect) < 1e-12, `x2[${i}] ${x2[i]} vs ${expect}`);
  }
});

test('ESN: with rho < 1 and no input the state decays to zero (echo state); run/runGap/reset behave', () => {
  const c = smallConnectome();
  const spectral = computeSpectral(c, { tol: 1e-10, maxIter: 5000 });
  const esn = createESN(c, { rhoTarget: 0.8, alpha: 0.5, lr: 0.5, inputScale: 10 }, { spectral });
  const iExt = new Float32Array(7);
  iExt[0] = 0.3; iExt[1] = 0.3;
  const r = esn.run(iExt, 50);
  assert.equal(r.dn.length, 2);
  assert.ok(r.meanAbs > 0);
  esn.runGap(2000);
  assert.ok(Math.max(...Array.from(esn.state()).map(Math.abs)) < 1e-6, 'decayed');
  esn.run(iExt, 50);
  esn.runGap('full');
  assert.ok(Array.from(esn.state()).every((v) => v === 0));
  // 결정성
  const a = createESN(c, { rhoTarget: 1.2, alpha: 1, lr: 0.3, inputScale: 5 }, { spectral });
  const b = createESN(c, { rhoTarget: 1.2, alpha: 1, lr: 0.3, inputScale: 5 }, { spectral });
  assert.deepEqual(Array.from(a.run(iExt, 100).dn), Array.from(b.run(iExt, 100).dn));
});
