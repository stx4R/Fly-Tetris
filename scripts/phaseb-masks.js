#!/usr/bin/env node
// 7단계 Phase B — 대조군 마스크 N1/N2/N3 생성 + sanity check (지시 §2).
// 마스크는 (connectome, kind, seed) 에서 결정적으로 재생성되므로 간선 459,168개를 그대로 저장하지 않고
// 재현 사양 + 내용 해시 + 입출력 뉴런 집합 해시 + sanity check 결과를 저장한다 (검증 가능, 파일 작음).
// 하나라도 실패하면 종료 코드 1 — Phase B 학습은 시작하지 않는다.
// 산출: data/stage7/nulls/masks/n{1,2,3}.mask.json
// 옵션: --only N1,N3 --seed 0

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parseConnectome } from '../src/connectome.js';
import { PHASE_B_NULLS, buildPhaseBNull, nullSanity } from '../src/stage7-nulls.js';
import { sparseLayout } from '../src/sparse-rnn.js';
import { HYPER } from '../src/stage7-train.js';
import { ROOT, STAGE7_DIR, fmtMs } from './stage7-lib.js';

const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
const only = opt('only', null)?.split(',').map((s) => s.trim().toUpperCase());
const seed = Number(opt('seed', 0));
export const MASK_DIR = path.join(STAGE7_DIR, 'nulls', 'masks');
const log = (s) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${s}`);

// 재색인에 무관한 내용 해시: 뉴런 id 쌍으로 본 간선 집합 + 역할 집합
function fingerprint(c) {
  const id = c.neurons.map((n) => n.id);
  const edges = c.edges.map((e) => `${id[e[0]]}>${id[e[1]]}`).sort();
  const inputs = c.neurons.filter((n) => n.layer === 'input').map((n) => n.id).sort((a, b) => a - b);
  const outputs = c.neurons.filter((n) => n.layer === 'output').map((n) => n.id).sort((a, b) => a - b);
  const h = (arr) => createHash('sha256').update(arr.join(',')).digest('hex').slice(0, 16);
  return { edges: h(edges), inputNeurons: h(inputs), readoutNeurons: h(outputs) };
}

export function buildAndCheck(connectome, kind, seedV, expectedP) {
  const t0 = performance.now();
  const nullC = buildPhaseBNull(connectome, kind, seedV);
  const nInput = nullC.neurons.filter((n) => n.layer === 'input').length;
  const nOutput = nullC.neurons.filter((n) => n.layer === 'output').length;
  // P 는 마스크만으로 결정된다 (E + U_DIM·nInput + N + readout) — 무거운 buildMask 없이 계산
  const P = sparseLayout({ E: nullC.edges.length, N: nullC.neurons.length, nInput, nOutput }, { hidden: HYPER.hidden }).P;
  const sanity = nullSanity(connectome, nullC, kind, { expectedP, actualP: P });
  return { nullC, sanity, fingerprint: fingerprint(nullC), condition: nullC.meta.condition, ms: Math.round(performance.now() - t0) };
}

function main() {
  const connectome = parseConnectome(readFileSync(path.join(ROOT, 'data', 'connectome.json'), 'utf8'));
  const nInput0 = connectome.neurons.filter((n) => n.layer === 'input').length;
  const nOutput0 = connectome.neurons.filter((n) => n.layer === 'output').length;
  const c0P = sparseLayout({ E: connectome.edges.length, N: connectome.neurons.length, nInput: nInput0, nOutput: nOutput0 }, { hidden: HYPER.hidden }).P;
  log(`C0: N ${connectome.neurons.length}, E ${connectome.edges.length}, input ${nInput0}, readout ${nOutput0}, P ${c0P}`);
  if (!existsSync(MASK_DIR)) mkdirSync(MASK_DIR, { recursive: true });
  const c0fp = fingerprint(connectome);
  const kinds = PHASE_B_NULLS.filter((k) => !only || only.includes(k));
  const out = [];
  let allPass = true;
  for (const kind of kinds) {
    const { sanity, fingerprint: fp, condition, ms } = buildAndCheck(connectome, kind, seed, c0P);
    log(`${kind} ${sanity.name}: ${sanity.pass ? 'PASS' : 'FAIL'} (${fmtMs(ms)})`);
    for (const c of sanity.checks) log(`    ${c.ok ? 'ok  ' : 'FAIL'} ${c.name} — ${c.detail}`);
    const doc = {
      builtAt: new Date().toISOString(), kind, name: sanity.name, separates: sanity.separates, seed,
      reproduce: `node scripts/phaseb-masks.js --only ${kind} --seed ${seed}  (src/stage7-nulls.js buildPhaseBNull; 결정적)`,
      condition, fingerprint: fp, c0Fingerprint: c0fp, sanity,
      note: '간선 목록은 저장하지 않는다 — (connectome.json, kind, seed) 에서 결정적으로 재생성되고 fingerprint 로 검증된다.',
    };
    writeFileSync(path.join(MASK_DIR, `${kind.toLowerCase()}.mask.json`), JSON.stringify(doc, null, 1) + '\n');
    out.push(doc);
    if (!sanity.pass) allPass = false;
  }
  console.log(`\n=== Phase B 마스크 sanity check (seed ${seed}) ===`);
  console.log(`${'null'.padEnd(5)} ${'name'.padEnd(36)} ${'N'.padStart(5)} ${'E'.padStart(8)} ${'P'.padStart(9)} ${'원본 간선 교집합'.padEnd(18)} ${'차수'.padEnd(10)} ${'입출력'.padEnd(10)} 판정`);
  for (const d of out) {
    const s = d.sanity;
    console.log(`${d.kind.padEnd(5)} ${s.name.padEnd(36)} ${String(s.N).padStart(5)} ${String(s.E).padStart(8)} ${String(s.P).padStart(9)} ${`${(100 * s.edgeOverlapWithOriginal).toFixed(2)}% (우연 ${(100 * s.chanceOverlap).toFixed(2)}%)`.padEnd(18)} ${(s.degreeIdentical ? '원본 동일' : '이항').padEnd(10)} ${(s.inputSetSameAsC0 ? '원본 유지' : '재추출').padEnd(10)} ${s.pass ? 'PASS' : 'FAIL'}`);
  }
  console.log(`\nin-degree (중앙값/최대): C0 ${out[0]?.sanity.inDegreeOriginal.median}/${out[0]?.sanity.inDegreeOriginal.max}` + out.map((d) => ` · ${d.kind} ${d.sanity.inDegree.median}/${d.sanity.inDegree.max}`).join(''));
  if (!allPass) { console.error('\nsanity check 실패 — Phase B 를 시작하지 않는다 (지시 §9).'); process.exit(1); }
  console.log(`\nwrote ${path.relative(ROOT, MASK_DIR)}/n{${kinds.map((k) => k.slice(1)).join(',')}}.mask.json`);
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` || process.argv[1]?.endsWith('phaseb-masks.js')) main();
