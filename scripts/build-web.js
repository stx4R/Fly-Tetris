#!/usr/bin/env node
// 웹 빌드: web/src/main.js → web/dist/app.js (esbuild, three 포함), index.html·style.css·data/*.json·public/models/*.glb 복사,
// Pretendard 가변 폰트(dynamic subset, node_modules/pretendard)를 dist/fonts 로 복사 (외부 요청 0 유지 — 필요한 유니코드 구간만 내려받는다).
// 산출물 크기를 항목별로 찍고 총량이 25 MB 를 넘으면 exit 1. 외부 네트워크 요청은 없다 (모든 자산이 dist 안에 있다).

import { build } from 'esbuild';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmdirSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildVersus } from './build-versus.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WEB = path.join(ROOT, 'web');
const DIST = path.join(WEB, 'dist');
const LIMIT = 25 * 1024 * 1024;
const mb = (b) => `${(b / 1024 / 1024).toFixed(2)} MB`;
// fs.rmSync/cpSync 의 recursive 옵션 대신 수동 재귀 (일부 실행 샌드박스가 recursive 삭제·복사를 막는다)
function rmrf(p) { if (!existsSync(p)) return; for (const f of readdirSync(p)) { const q = path.join(p, f); if (statSync(q).isDirectory()) rmrf(q); else unlinkSync(q); } rmdirSync(p); }
function cprf(src, dst) { if (statSync(src).isDirectory()) { mkdirSync(dst, { recursive: true }); for (const f of readdirSync(src)) cprf(path.join(src, f), path.join(dst, f)); } else copyFileSync(src, dst); }

// 번들에 들어가는 소스 전부의 해시 (배포마다 바뀌고, 같은 소스면 같다).
function sourceHash() {
  const files = [path.join(WEB, 'index.html'), path.join(WEB, 'style.css')];
  const walkJs = (dir) => { for (const f of readdirSync(dir)) { const p = path.join(dir, f); if (statSync(p).isDirectory()) walkJs(p); else if (f.endsWith('.js')) files.push(p); } };
  walkJs(path.join(WEB, 'src')); walkJs(path.join(WEB, 'play')); walkJs(path.join(ROOT, 'src'));
  const h = createHash('sha1');
  for (const f of files.sort()) h.update(path.relative(ROOT, f)).update(readFileSync(f));
  return h.digest('hex').slice(0, 8);
}

async function main() {
  for (const f of ['data/graph-viz.json', 'data/summary.json']) {
    if (!existsSync(path.join(WEB, f))) { console.error(`missing web/${f} — run \`npm run build-viz\` first`); process.exit(1); }
  }
  if (!existsSync(path.join(WEB, 'data', 'stage7.json'))) { console.error('missing web/data/stage7.json — run `npm run build-stage7-web` first'); process.exit(1); }
  rmrf(DIST);
  mkdirSync(DIST, { recursive: true });
  // 빌드 id — 소스 내용의 해시. 번들 안(define)과 index.html 양쪽에 같은 값이 들어가야 해서 번들 전에 정한다.
  const BUILD = sourceHash();
  // 앱과 추론 워커를 따로 묶는다. 워커는 클래식(IIFE) 이라 모듈 워커 지원 여부를 타지 않는다.
  const common = {
    bundle: true, minify: true, format: 'iife', target: ['es2020'], sourcemap: false, logLevel: 'warning', metafile: true,
    define: { __BUILD_ID__: JSON.stringify(BUILD) },
  };
  const result = await build({ ...common, entryPoints: [path.join(WEB, 'src', 'main.js')], outfile: path.join(DIST, 'app.js') });
  await build({ ...common, entryPoints: [path.join(WEB, 'src', 'fly-worker.js')], outfile: path.join(DIST, 'fly-worker.js') });
  for (const f of ['index.html', 'style.css', 'favicon.svg']) cprf(path.join(WEB, f), path.join(DIST, f));
  // 캐시 무효화: 파일 이름은 그대로 두고 쿼리에 빌드 id 를 붙인다.
  // GitHub Pages 는 index.html 과 자산 모두에 max-age=600 을 준다 → 이름이 안 바뀌면 배포 직후
  // **캐시된 옛 index.html + 새 app.js** 조합이 생겨 없어진 요소를 만지다 화면이 통째로 깨진다 (v0.13.0 배포에서 실제로 났다).
  // 쿼리로 짝을 고정하고, 그래도 어긋나면 app.js 가 스스로 한 번 새로고침한다 (web/src/main.js).
  const htmlPath = path.join(DIST, 'index.html');
  writeFileSync(htmlPath, readFileSync(htmlPath, 'utf8')
    .replace('href="style.css"', `href="style.css?v=${BUILD}"`)
    .replace('<script src="app.js"></script>', `<script>window.__BUILD__=${JSON.stringify(BUILD)}</script>
<script src="app.js?v=${BUILD}"></script>`));
  cprf(path.join(ROOT, 'public', 'Profile.png'), path.join(DIST, 'avatar.png')); // 사이드바 프로필 (원본 public/Profile.png)
  // 런타임에 쓰는 데이터만 복사한다 (6단계 summary·episode 는 stage7.json 안에 요약만 들어갔다)
  mkdirSync(path.join(DIST, 'data'), { recursive: true });
  for (const f of ['graph-viz.json', 'stage7.json']) copyFileSync(path.join(WEB, 'data', f), path.join(DIST, 'data', f));
  cprf(path.join(ROOT, 'public', 'models'), path.join(DIST, 'models'));
  const FONT = path.join(ROOT, 'node_modules', 'pretendard', 'dist', 'web', 'variable');
  if (!existsSync(FONT)) { console.error('missing node_modules/pretendard — run `npm install`'); process.exit(1); }
  mkdirSync(path.join(DIST, 'fonts'), { recursive: true });
  copyFileSync(path.join(FONT, 'pretendardvariable-dynamic-subset.css'), path.join(DIST, 'fonts', 'pretendard.css'));
  cprf(path.join(FONT, 'woff2-dynamic-subset'), path.join(DIST, 'fonts', 'woff2-dynamic-subset'));
  writeFileSync(path.join(DIST, '.nojekyll'), '');
  buildVersus(DIST); // 8단계 대전 추론 페이로드: dist/model/* (+ 옛 /versus/ 링크 리다이렉트)
  const sizes = [];
  const walk = (dir, rel = '') => { for (const f of readdirSync(dir)) { const p = path.join(dir, f); const r = path.posix.join(rel, f); if (statSync(p).isDirectory()) walk(p, r); else sizes.push([r, statSync(p).size]); } };
  walk(DIST);
  sizes.sort((a, b) => b[1] - a[1]);
  const total = sizes.reduce((s, [, b]) => s + b, 0);
  // 폰트 subset 92개는 한 줄로 묶어 찍는다
  const fonts = sizes.filter(([f]) => f.startsWith('fonts/'));
  const shown = sizes.filter(([f]) => !f.startsWith('fonts/')).concat([[`fonts/ (${fonts.length} files, dynamic subset)`, fonts.reduce((s, [, b]) => s + b, 0)]]).sort((a, b) => b[1] - a[1]);
  for (const [f, b] of shown) console.log(`${mb(b).padStart(9)}  ${f}`);
  console.log(`${mb(total).padStart(9)}  TOTAL (limit ${mb(LIMIT)})`);
  const three = Object.entries(result.metafile.inputs).filter(([k]) => k.includes('node_modules/three')).reduce((s, [, v]) => s + v.bytes, 0);
  console.log(`build ${BUILD} (app.js · fly-worker.js · style.css · data · model 요청에 ?v= 로 붙는다)`);
  console.log(`app.js inputs: three ${mb(three)} (pre-minify), app ${mb(Object.entries(result.metafile.inputs).filter(([k]) => k.startsWith('web/')).reduce((s, [, v]) => s + v.bytes, 0))}`);
  if (total > LIMIT) { console.error('bundle exceeds 25 MB'); process.exit(1); }
}

main().catch((err) => { console.error(err); process.exit(1); });
