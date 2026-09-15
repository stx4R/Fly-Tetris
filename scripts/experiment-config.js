// 4·5단계 실험 설정. estimate-budget / collect / experiment / smoke 가 같은 값을 쓴다.
// CLI 로 덮어쓸 수 있는 축: --games N --cap N --null-seeds N --workers N --combos R3:V2,R1:V1 --quick
//
// 5단계 확정: null 시드 3, 플레이 조합 R3:V2 만, 조각 상한 1000. 동작점(T, G_IN, alpha, 제약 종류)은 data/separation-search.json 의
// 결과로 정한다: 통과점 있음 → 그 alpha·T·G_IN 고정 + 분리 제약 포함 재캘리브레이션(withinKendall 최대);
// 없음 → 4단계 설정(alpha 1, T 50, G_IN 배율 1, 3단계 제약, 프로브 (a) R² 최대).

import os from 'node:os';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GAPS } from '../src/reservoir.js';
import { G_IN } from '../src/encode.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const DEFAULTS = {
  seed: 2026,
  nullSeeds: 3,                                   // C1·C2·C3 각각의 시드 수 (5단계 확정)
  conditions: ['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
  readouts: ['R1', 'R2', 'R3'],
  targets: ['V1', 'V2'],
  // 재캘리브레이션 (3단계 절차 축소판). alpha 1, gap full 고정. 선택 기준: 하드 제약 통과 중 프로브 (a) 특징 R² 최대
  calibration: {
    points: 300, boards: 200, top: 3, finalBoards: 1000,
    range: { rhoTarget: [3, 5], b: [0.1, 2.0], kLocal: [0, 0.5], kGlobal: [0, 5], alpha: [1], gap: ['full'] },
    separation: { test: 30, train: 60 }, // 분리 제약 모드에서 점마다 재는 결정 수 (3단계 제약 통과점에서만)
  },
  // 동작점: separation-search.json 이 있으면 resolveOperating() 이 덮어쓴다
  operating: { T: 50, gIn: G_IN, gInMul: 1, constraints: 'stage3', selectBy: 'featuresR2', source: 'stage4-default' },
  collect: { games: 40, decisionsPerGame: 25, warmupMax: 30, epsilon: 0.3, seed: 4, target: 30000, splitSeed: 5 },
  play: { games: 20, cap: 1000, combos: [['R3', 'V2']] },  // combos: 'all' | [['R3','V2'], ...] — 모든 조건에 동일 적용
  baselines: { games: 20 },
  workers: Math.max(1, Math.min(12, os.cpus().length - 2)),
  budgetHours: 8,
};

// 1부 결과로 동작점을 정한다. --ignore-separation 이면 4단계 기본값 유지.
export function resolveOperating(cfg, argv = []) {
  const file = path.join(ROOT, 'data', 'separation-search.json');
  if (argv.includes('--ignore-separation') || !existsSync(file)) return cfg;
  const search = JSON.parse(readFileSync(file, 'utf8'));
  if (search.selected) {
    const s = search.selected;
    cfg.operating = { T: s.T, gIn: s.gIn, gInMul: s.gInMul, constraints: 'separation', selectBy: 'withinKendall', source: 'separation-search selected', alpha: s.alpha };
    cfg.calibration.range = { ...search.range, alpha: [s.alpha], gap: ['full'] };
    delete cfg.calibration.range.T; delete cfg.calibration.range.gInMul;
  } else {
    cfg.operating = { ...cfg.operating, source: 'separation-search found no passing point → stage-4 point (alpha 1, T 50, G_IN×1, stage-3 constraints)' };
  }
  return cfg;
}

export function parseConfig(argv = process.argv.slice(2)) {
  const cfg = JSON.parse(JSON.stringify(DEFAULTS));
  resolveOperating(cfg, argv);
  const opt = (name) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? argv[i + 1] : undefined; };
  if (opt('games')) cfg.play.games = Number(opt('games'));
  if (opt('cap')) cfg.play.cap = Number(opt('cap'));
  if (opt('null-seeds')) cfg.nullSeeds = Number(opt('null-seeds'));
  if (opt('workers')) cfg.workers = Number(opt('workers'));
  if (opt('combos')) cfg.play.combos = opt('combos') === 'all' ? 'all' : opt('combos').split(',').map((s) => s.split(':'));
  if (opt('points')) cfg.calibration.points = Number(opt('points'));
  if (argv.includes('--quick')) {           // 파이프라인 점검용 축소 설정 (결과 아님)
    cfg.nullSeeds = 1; cfg.play.games = 2; cfg.play.cap = 100; cfg.calibration.points = 24; cfg.calibration.finalBoards = 300;
    cfg.baselines.games = 2; cfg.play.combos = [['R1', 'V1'], ['R3', 'V2']]; cfg.calibration.separation = { test: 6, train: 10 }; cfg.quick = true;
  }
  return cfg;
}

// 조건 키 목록: C0, C1s0..s4, C2s0.., C3s0.., C4, C5 (C6 은 C0 의 리저버를 공유하므로 리저버 키에는 없다)
export function reservoirKeys(cfg) {
  const keys = [];
  for (const c of cfg.conditions) {
    if (c === 'C6') continue;
    if (['C1', 'C2', 'C3'].includes(c)) for (let s = 0; s < cfg.nullSeeds; s++) keys.push({ key: `${c}s${s}`, condition: c, seed: cfg.seed * 7 + s * 101 + Number(c[1]) });
    else keys.push({ key: c, condition: c, seed: 0 });
  }
  return keys;
}

export function playCombos(cfg) {
  if (cfg.play.combos === 'all') return cfg.readouts.flatMap((r) => cfg.targets.map((t) => [r, t]));
  return cfg.play.combos;
}

export { GAPS };
