#!/usr/bin/env node
// 웹 빌드: web/src/main.js → web/dist/app.js (esbuild, three 포함), index.html·style.css·data/*.json·public/models/*.glb 복사.
// 산출물 크기를 항목별로 찍고 총량이 25 MB 를 넘으면 exit 1. 외부 네트워크 요청은 없다 (모든 자산이 dist 안에 있다).

import { build } from 'esbuild';
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmdirSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WEB = path.join(ROOT, 'web');
const DIST = path.join(WEB, 'dist');
const LIMIT = 25 * 1024 * 1024;
const mb = (b) => `${(b / 1024 / 1024).toFixed(2)} MB`;
// fs.rmSync/cpSync 의 recursive 옵션 대신 수동 재귀 (일부 실행 샌드박스가 recursive 삭제·복사를 막는다)
function rmrf(p) { if (!existsSync(p)) return; for (const f of readdirSync(p)) { const q = path.join(p, f); if (statSync(q).isDirectory()) rmrf(q); else unlinkSync(q); } rmdirSync(p); }
function cprf(src, dst) { if (statSync(src).isDirectory()) { mkdirSync(dst, { recursive: true }); for (const f of readdirSync(src)) cprf(path.join(src, f), path.join(dst, f)); } else copyFileSync(src, dst); }

async function main() {
  for (const f of ['data/graph-viz.json', 'data/episode.json', 'data/summary.json']) {
    if (!existsSync(path.join(WEB, f))) { console.error(`missing web/${f} — run \`npm run build-viz\` first`); process.exit(1); }
  }
  rmrf(DIST);
  mkdirSync(DIST, { recursive: true });
  const result = await build({
    entryPoints: [path.join(WEB, 'src', 'main.js')],
    bundle: true, minify: true, format: 'iife', target: ['es2020'], sourcemap: false,
    outfile: path.join(DIST, 'app.js'), logLevel: 'warning', metafile: true,
  });
  cprf(path.join(WEB, 'index.html'), path.join(DIST, 'index.html'));
  cprf(path.join(WEB, 'style.css'), path.join(DIST, 'style.css'));
  cprf(path.join(WEB, 'data'), path.join(DIST, 'data'));
  cprf(path.join(ROOT, 'public', 'models'), path.join(DIST, 'models'));
  writeFileSync(path.join(DIST, '.nojekyll'), '');
  const sizes = [];
  const walk = (dir, rel = '') => { for (const f of readdirSync(dir)) { const p = path.join(dir, f); const r = path.posix.join(rel, f); if (statSync(p).isDirectory()) walk(p, r); else sizes.push([r, statSync(p).size]); } };
  walk(DIST);
  sizes.sort((a, b) => b[1] - a[1]);
  const total = sizes.reduce((s, [, b]) => s + b, 0);
  for (const [f, b] of sizes) console.log(`${mb(b).padStart(9)}  ${f}`);
  console.log(`${mb(total).padStart(9)}  TOTAL (limit ${mb(LIMIT)})`);
  const three = Object.entries(result.metafile.inputs).filter(([k]) => k.includes('node_modules/three')).reduce((s, [, v]) => s + v.bytes, 0);
  console.log(`app.js inputs: three ${mb(three)} (pre-minify), app ${mb(Object.entries(result.metafile.inputs).filter(([k]) => k.startsWith('web/')).reduce((s, [, v]) => s + v.bytes, 0))}`);
  if (total > LIMIT) { console.error('bundle exceeds 25 MB'); process.exit(1); }
}

main().catch((err) => { console.error(err); process.exit(1); });
