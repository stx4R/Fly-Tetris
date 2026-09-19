#!/usr/bin/env node
// 8단계 — 사람 vs 초파리 대전 페이지 번들 생성.
//
// 브라우저에서 connectome.json(7.7 MB)을 다시 파싱해 마스크를 만들지 않고, 추론에 필요한 부분만 구워서 쓴다.
// createSparseRNN 이 마스크에서 읽는 것은 N · E · nInput · nOutput · outputStart · indptr · indices 뿐이고
// wUnit 은 학습 초기화용이라 뺀다 → mask.bin 은 indptr(N+1) + indices(E) 의 Int32 이어붙임, 약 1.8 MB.
//
// 번들은 저장소 구조를 그대로 흉내 낸다 (상대 import 가 저장소와 번들에서 똑같이 풀리도록):
//   web/dist/versus/index.html          ← web/versus.html
//   web/dist/versus/web/play/*.js       ← web/play/*.js
//   web/dist/versus/src/*.js            ← src/*.js
//   web/dist/versus/model/{mask.bin,mask.json,c0.model.bin,c0.model.json}
//
// 옵션: --out <dir>

import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { parseConnectome } from '../src/connectome.js';
import { maskFor, ROOT, STAGE7_DIR } from './stage7-lib.js';

const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
const DEFAULT_OUT = path.resolve(opt('out', path.join(ROOT, 'web', 'dist', 'versus')));
const log = (s) => console.log(`[build-versus] ${s}`);
const mb = (n) => `${(n / 1048576).toFixed(2)} MB`;

// build-web.js 가 dist 를 비우고 다시 만들므로, 그쪽에서 이 함수를 불러 versus 번들을 같이 굽는다.
export function buildVersus(outDir) {
  const OUT = outDir ?? DEFAULT_OUT;
  const modelJson = path.join(STAGE7_DIR, 'c0.model.json');
  const modelBin = path.join(STAGE7_DIR, 'c0.model.bin');
  if (!existsSync(modelJson) || !existsSync(modelBin)) throw new Error('data/stage7/c0.model.{bin,json} 없음 — 7단계 학습 산출물이 필요하다');

  mkdirSync(path.join(OUT, 'web', 'play'), { recursive: true });
  mkdirSync(path.join(OUT, 'src'), { recursive: true });
  mkdirSync(path.join(OUT, 'model'), { recursive: true });

  // ---- 추론용 마스크 굽기 ----
  const connectome = parseConnectome(readFileSync(path.join(ROOT, 'data', 'connectome.json'), 'utf8'));
  const mask = maskFor(connectome, 'C0');
  const indptr = Int32Array.from(mask.indptr);
  const indices = Int32Array.from(mask.indices);
  if (indptr.length !== mask.N + 1) throw new Error(`indptr ${indptr.length} ≠ N+1 ${mask.N + 1}`);
  if (indices.length !== mask.E) throw new Error(`indices ${indices.length} ≠ E ${mask.E}`);
  const buf = Buffer.concat([Buffer.from(indptr.buffer), Buffer.from(indices.buffer)]);
  writeFileSync(path.join(OUT, 'model', 'mask.bin'), buf);
  writeFileSync(path.join(OUT, 'model', 'mask.json'), JSON.stringify({
    N: mask.N, E: mask.E, nInput: mask.nInput, nOutput: mask.nOutput, outputStart: mask.outputStart,
    rhoUnit: mask.rhoUnit, condition: mask.condition,
    layout: { indptr: { offset: 0, length: mask.N + 1, dtype: 'int32' }, indices: { offset: (mask.N + 1) * 4, length: mask.E, dtype: 'int32' } },
    note: '추론 전용 마스크. wUnit 은 학습 초기화용이라 뺐다 (createSparseRNN 은 쓰지 않는다).',
    builtAt: new Date().toISOString(),
  }, null, 1) + '\n');
  log(`mask.bin ${mb(buf.length)} (gzip ${mb(gzipSync(buf, { level: 9 }).length)}) — N ${mask.N}, E ${mask.E}`);

  // ---- 모델 ----
  for (const f of ['c0.model.bin', 'c0.model.json']) copyFileSync(path.join(STAGE7_DIR, f), path.join(OUT, 'model', f));
  log(`c0.model.bin ${mb(statSync(modelBin).size)}`);

  // ---- 소스 ----
  let n = 0;
  for (const f of readdirSync(path.join(ROOT, 'src'))) if (f.endsWith('.js')) { copyFileSync(path.join(ROOT, 'src', f), path.join(OUT, 'src', f)); n++; }
  for (const f of readdirSync(path.join(ROOT, 'web', 'play'))) if (f.endsWith('.js')) copyFileSync(path.join(ROOT, 'web', 'play', f), path.join(OUT, 'web', 'play', f));
  copyFileSync(path.join(ROOT, 'web', 'versus.html'), path.join(OUT, 'index.html'));
  log(`src ${n} 파일, web/play ${readdirSync(path.join(ROOT, 'web', 'play')).length} 파일`);

  const total = ['model/mask.bin', 'model/c0.model.bin'].reduce((s, f) => s + statSync(path.join(OUT, f)).size, 0);
  log(`완료 → ${path.relative(ROOT, OUT)} (모델 페이로드 ${mb(total)}; connectome.json 7.36 MB 를 받지 않는다)`);
  log(`서버: npm run serve → http://localhost:8123/versus/index.html`);
}

if (process.argv[1]?.endsWith('build-versus.js')) buildVersus(DEFAULT_OUT);
