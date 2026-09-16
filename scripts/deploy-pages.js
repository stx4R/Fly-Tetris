#!/usr/bin/env node
// GitHub Pages 배포: web/dist 를 gh-pages 브랜치의 루트로 커밋하고 push 한다 (git plumbing — 작업 트리·main 이력에 손대지 않는다).
// 선택 이유: docs/ 는 단계 보고서(md)가 있는 소스 폴더라 빌드 산출물(GLB 3.3 MB + 번들)을 main 이력에 매번 쌓지 않으려고 gh-pages 를 쓴다.
// 사전: npm run build-viz && npm run build. 옵션: --no-push (브랜치만 갱신).

import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'web', 'dist');
const BRANCH = 'gh-pages';
const sh = (cmd, env = {}) => execSync(cmd, { cwd: ROOT, env: { ...process.env, ...env }, stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();

function main() {
  if (!existsSync(path.join(DIST, 'index.html'))) { console.error('web/dist/index.html missing — run `npm run build` first'); process.exit(1); }
  const head = sh('git rev-parse --short HEAD');
  const indexFile = path.join(ROOT, '.git', 'gh-pages-index');
  if (existsSync(indexFile)) rmSync(indexFile);
  const env = { GIT_INDEX_FILE: indexFile };
  sh(`git --work-tree="${DIST}" add -A -f .`, env);
  const tree = sh('git write-tree', env);
  let parent = '';
  try { parent = sh(`git rev-parse --verify refs/heads/${BRANCH}`); } catch { /* 첫 배포 */ }
  const commit = sh(`git commit-tree ${tree} ${parent ? `-p ${parent}` : ''} -m "pages: build from ${head}"`);
  sh(`git update-ref refs/heads/${BRANCH} ${commit}`);
  rmSync(indexFile);
  console.log(`${BRANCH} ← ${commit.slice(0, 7)} (tree ${tree.slice(0, 7)}, from main ${head}${parent ? `, parent ${parent.slice(0, 7)}` : ', orphan'})`);
  if (process.argv.includes('--no-push')) return;
  console.log(sh(`git push -f origin ${BRANCH}:${BRANCH}`) || 'pushed');
}

main();
