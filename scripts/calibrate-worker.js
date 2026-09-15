// scripts/calibrate.js 의 워커: 커넥톰·보드를 한 번 올리고, 받은 파라미터 점을 evaluatePoint 로 평가해 돌려준다.
// 점의 표본 추출은 메인 스레드가 시드 하나로 순서대로 하므로 워커 수와 무관하게 결과는 결정적이다.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parentPort, workerData } from 'node:worker_threads';
import { parseConnectome } from '../src/connectome.js';
import { createEncoder } from '../src/encode.js';
import { evaluateESNPoint, evaluatePoint, generateBoards } from '../src/calibration.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const connectome = parseConnectome(readFileSync(path.join(ROOT, 'data', 'connectome.json'), 'utf8'));
const spectral = JSON.parse(readFileSync(path.join(ROOT, 'data', 'spectral.json'), 'utf8'));
const encoder = createEncoder(connectome);
const samples = generateBoards(workerData.boards, { seed: workerData.seed });
const iExts = samples.map((s) => encoder.encode(s.board, s.piece));

const probeSummary = (pr) => pr && {
  top1: pr.top1, controlTop1: pr.control.top1, top1Margin: pr.top1Margin, majorityTop1: pr.majorityTop1,
  featuresR2: pr.featuresR2, controlFeaturesR2: pr.control.featuresR2, perFeatureR2: pr.perFeatureR2,
};

parentPort.on('message', (job) => {
  const { id, model = 'lif', params, gap, boards, probe, seed } = job;
  const m = model === 'esn'
    ? evaluateESNPoint(connectome, spectral, samples.slice(0, boards), iExts.slice(0, boards), params, { gap, seed, probe })
    : evaluatePoint(connectome, spectral, samples.slice(0, boards), iExts.slice(0, boards), params, {
      gap, seed, probe: probe === 'hard' ? (r) => r.hard.all : probe,
    });
  parentPort.postMessage({ id, result: { ...m, probe: probeSummary(m.probe) } });
});
parentPort.postMessage({ ready: true });
