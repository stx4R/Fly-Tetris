#!/usr/bin/env node
// 로컬 정적 서버 (web/dist). 배포 전 점검용. 포트 8123.
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'web', 'dist');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.glb': 'model/gltf-binary', '.png': 'image/png', '.woff2': 'font/woff2' };
createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(DIST, url === '/' ? 'index.html' : url);
  if (!file.startsWith(DIST) || !existsSync(file) || statSync(file).isDirectory()) { res.writeHead(404); res.end('not found'); return; }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
  createReadStream(file).pipe(res);
}).listen(8123, () => console.log('http://localhost:8123'));
