#!/usr/bin/env node
// data/connectome.json 을 스키마 + 그래프 성질로 검사한다. 하나라도 실패하면 exit 1.

import { readFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkGraph, parseConnectome } from '../src/connectome.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FILE = path.join(ROOT, 'data', 'connectome.json');
const MAX_GZIP_BYTES = 8 * 1024 * 1024;

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

function main() {
  let raw;
  try {
    raw = readFileSync(FILE, 'utf8');
  } catch (err) {
    console.error(`cannot read ${path.relative(ROOT, FILE)}: ${err.message} (run \`npm run extract\` first)`);
    process.exit(1);
  }

  let connectome;
  try {
    connectome = parseConnectome(raw);
    console.log('ok   schema');
  } catch (err) {
    console.error(`FAIL schema: ${err.message}`);
    process.exit(1);
  }

  const results = checkGraph(connectome);
  const rawSize = statSync(FILE).size;
  const gzSize = gzipSync(raw).length;
  results.push({
    name: `gzip size <= ${mb(MAX_GZIP_BYTES)}`,
    ok: gzSize <= MAX_GZIP_BYTES,
    detail: `raw ${mb(rawSize)} (${rawSize} B), gzip ${mb(gzSize)} (${gzSize} B, zlib default level)`,
  });

  let failed = 0;
  for (const r of results) {
    if (!r.ok) failed++;
    console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.name}: ${r.detail}`);
  }

  const { meta } = connectome;
  console.log(`\n${meta.dataset} extracted ${meta.extractedAt}`);
  console.log(`nodes ${meta.nodeCount} (input ${meta.layerSizes.input}, hidden ${meta.layerSizes.hidden}, output ${meta.layerSizes.output}), edges ${meta.edgeCount}, threshold ${meta.weightThreshold}`);

  if (failed) {
    console.error(`\n${failed} check(s) failed`);
    process.exit(1);
  }
  console.log('\nall checks passed');
}

main();
