#!/usr/bin/env node
// 8단계 — 대전(사람 vs 초파리) 추론 페이로드 굽기.
//
// 대전 화면은 이제 콘솔 SPA 의 한 라우트(#/versus)다. 코드는 esbuild 가 app.js·fly-worker.js 로 묶으므로
// 여기서는 **브라우저가 받아야 하는 데이터**만 굽는다:
//
//   web/dist/model/mask.bin        추론용 마스크 = indptr(N+1) + indices(E) 의 Int32 이어붙임 (약 1.8 MB)
//   web/dist/model/mask.json       규격 + 레이아웃
//   web/dist/model/c0.model.bin    학습된 theta (Float32, 4·P)
//   web/dist/model/c0.model.json   모델 스펙 (T · lr · hidden · dnMean · dnStd · teacher)
//   web/dist/model/teacher.json    A-4′ 교사 파라미터 — 결정 탐색의 '교사 순위' 기준축을 브라우저에서 다시 계산한다
//   web/dist/versus/index.html     옛 배포 링크(/versus/) 호환용 리다이렉트
//
// createSparseRNN 이 마스크에서 읽는 것은 N · E · nInput · nOutput · outputStart · indptr · indices 뿐이고
// wUnit 은 학습 초기화용이라 뺀다. connectome.json 7.36 MB 를 브라우저가 받지 않는다.
//
// 옵션: --out <dir>  (기본 web/dist)

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { parseConnectome } from '../src/connectome.js';
import { maskFor, ROOT, STAGE7_DIR } from './stage7-lib.js';

const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
const DEFAULT_OUT = path.resolve(opt('out', path.join(ROOT, 'web', 'dist')));
const log = (s) => console.log(`[build-versus] ${s}`);
const mb = (n) => `${(n / 1048576).toFixed(2)} MB`;

const REDIRECT = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8">
<title>Fly</title>
<meta http-equiv="refresh" content="0; url=../index.html#/versus">
<link rel="canonical" href="../index.html#/versus">
</head><body>
<p>대전 화면은 <a href="../index.html#/versus">콘솔 안(#/versus)</a>으로 옮겼어요.</p>
<script>location.replace('../index.html#/versus');</script>
</body></html>
`;

// build-web.js 가 dist 를 비우고 다시 만들므로, 그쪽에서 이 함수를 불러 페이로드를 같이 굽는다.
export function buildVersus(distDir) {
  const DIST = distDir ?? DEFAULT_OUT;
  const OUT = path.join(DIST, 'model');
  const modelJson = path.join(STAGE7_DIR, 'c0.model.json');
  const modelBin = path.join(STAGE7_DIR, 'c0.model.bin');
  if (!existsSync(modelJson) || !existsSync(modelBin)) throw new Error('data/stage7/c0.model.{bin,json} 없음 — 7단계 학습 산출물이 필요하다');
  mkdirSync(OUT, { recursive: true });

  // ---- 추론용 마스크 ----
  const connectome = parseConnectome(readFileSync(path.join(ROOT, 'data', 'connectome.json'), 'utf8'));
  const mask = maskFor(connectome, 'C0');
  const indptr = Int32Array.from(mask.indptr);
  const indices = Int32Array.from(mask.indices);
  if (indptr.length !== mask.N + 1) throw new Error(`indptr ${indptr.length} ≠ N+1 ${mask.N + 1}`);
  if (indices.length !== mask.E) throw new Error(`indices ${indices.length} ≠ E ${mask.E}`);
  const buf = Buffer.concat([Buffer.from(indptr.buffer), Buffer.from(indices.buffer)]);
  writeFileSync(path.join(OUT, 'mask.bin'), buf);
  writeFileSync(path.join(OUT, 'mask.json'), JSON.stringify({
    N: mask.N, E: mask.E, nInput: mask.nInput, nOutput: mask.nOutput, outputStart: mask.outputStart,
    rhoUnit: mask.rhoUnit, condition: mask.condition,
    layout: { indptr: { offset: 0, length: mask.N + 1, dtype: 'int32' }, indices: { offset: (mask.N + 1) * 4, length: mask.E, dtype: 'int32' } },
    note: '추론 전용 마스크. wUnit 은 학습 초기화용이라 뺐다 (createSparseRNN 은 쓰지 않는다).',
    builtAt: new Date().toISOString(),
  }, null, 1) + '\n');
  log(`mask.bin ${mb(buf.length)} (gzip ${mb(gzipSync(buf, { level: 9 }).length)}) — N ${mask.N}, E ${mask.E}`);

  // ---- 모델 ----
  for (const f of ['c0.model.bin', 'c0.model.json']) copyFileSync(path.join(STAGE7_DIR, f), path.join(OUT, f));
  log(`c0.model.bin ${mb(statSync(modelBin).size)}`);

  // ---- 교사 (결정 탐색의 기준 순위) ----
  // 학생이 모방하도록 학습된 바로 그 교사다. 브라우저에서 깊이 1 로만 돌리므로 빔(Buffer 사용)은 타지 않는다.
  const doc = JSON.parse(readFileSync(modelJson, 'utf8'));
  const variant = doc.teacher?.variant ?? doc.data?.teacherVariant ?? '1ply-hold-garbage';
  const tFile = path.join(ROOT, 'data', `teacher-attack-${variant}.json`);
  if (!existsSync(tFile)) throw new Error(`교사 파일 없음: ${path.relative(ROOT, tFile)}`);
  const teacher = JSON.parse(readFileSync(tFile, 'utf8'));
  writeFileSync(path.join(OUT, 'teacher.json'), JSON.stringify({
    variant, label: teacher.variantLabel, tunedAt: teacher.tunedAt,
    search: teacher.search, params: teacher.params,
    note: '학생이 모방하도록 학습된 교사. 브라우저는 depth 1 로만 쓴다 (scoreCandidates).',
  }, null, 1) + '\n');
  log(`teacher.json — ${variant} (${teacher.variantLabel})`);

  // ---- 옛 링크 호환 ----
  mkdirSync(path.join(DIST, 'versus'), { recursive: true });
  writeFileSync(path.join(DIST, 'versus', 'index.html'), REDIRECT);

  const total = ['mask.bin', 'c0.model.bin'].reduce((s, f) => s + statSync(path.join(OUT, f)).size, 0);
  log(`완료 → ${path.relative(ROOT, OUT)} (모델 페이로드 ${mb(total)}; connectome.json 7.36 MB 를 받지 않는다)`);
}

if (process.argv[1]?.endsWith('build-versus.js')) buildVersus(DEFAULT_OUT);
