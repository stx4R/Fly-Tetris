#!/usr/bin/env node
// alpha ∈ {0.5, 1.0} 각각의 W_unit 스펙트럼 반경을 거듭제곱법으로 구해 data/spectral.json 에 쓴다.
// 수렴 여부를 명시한다 — 수렴 실패는 exit 1 (값은 근사치로 기록).

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseConnectome } from '../src/connectome.js';
import { computeSpectral } from '../src/spectral.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'data', 'spectral.json');

function main() {
  const connectome = parseConnectome(readFileSync(path.join(ROOT, 'data', 'connectome.json'), 'utf8'));
  const spectral = computeSpectral(connectome, { maxIter: 500, tol: 1e-6, seed: 1 });
  const out = {
    computedAt: new Date().toISOString(),
    dataset: connectome.meta.dataset,
    nodeCount: connectome.meta.nodeCount,
    edgeCount: connectome.meta.edgeCount,
    method: 'power iteration on W_unit^T, positive seeded start, tol 1e-6 relative on ||Ax|| for 3 consecutive iterations',
    ...spectral,
  };
  writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
  let failed = false;
  for (const [alpha, r] of Object.entries(spectral)) {
    console.log(`alpha=${alpha}: rho_unit=${r.rhoUnit.toFixed(6)} (Rayleigh ${r.rayleigh.toFixed(6)}), critical g = 1/rho_unit = ${r.criticalG.toFixed(6)}, `
      + `${r.iterations} iterations, converged=${r.converged}, ${r.ms} ms${r.note ? ` — ${r.note}` : ''}`);
    if (!r.converged) failed = true;
  }
  console.log(`wrote ${path.relative(ROOT, OUT)}`);
  if (failed) { console.error('power iteration did NOT converge for at least one alpha'); process.exit(1); }
}

main();
