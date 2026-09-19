#!/usr/bin/env node
// 7단계 실측 → web/data/stage7.json (홈 · 실험 · 조건 비교가 읽는 유일한 오프라인 수치 파일).
//
// 읽는 것 (전부 실행 산출물이다 — 손으로 적은 수치는 없다):
//   data/stage7-c0.json                          Phase A-4′ 본 학습 (순위 지표 · 게이트 · 20 게임 플레이 · 배선 변화)
//   data/stage7-phaseB-c0.json                   Phase B 프로토콜 C0 기준선 (50 게임 · 사망 원인 4종)
//   data/teacher-attack-1ply-hold-garbage.json   교사 (A-4′ 학습 목표)
//   data/stage7/nulls/masks/*.json               대조군 N1·N2·N3 마스크 (학습은 안 됐다 — sanity 만 있다)
//   data/stage7/train-phaseb.status.json         대조군 학습 상태 (미완료면 그대로 '미학습'으로 싣는다)
//   web/data/summary.json                        6단계 무작위 배치 기준선 (플레이 비교축에만 쓴다)
//
// 없는 것은 만들어 내지 않는다. 대조군 N1/N2/N3 는 마스크만 있고 학습 결과가 없으므로
// trained:false 로 싣고 웹은 그 자리를 '아직 학습하지 않음'으로 그린다.

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(path.join(ROOT, p), 'utf8'));
const maybe = (p) => (existsSync(path.join(ROOT, p)) ? read(p) : null);

const NULL_META = {
  N1: { name: 'degree-preserving shuffle', ko: '차수 보존 재배선', desc: '뉴런마다 in/out 차수를 정확히 보존한 재배선이에요. 위상만 흩고 차수 분포는 그대로 둬요.' },
  N2: { name: 'uniform random', ko: '균등 무작위', desc: '층 블록별 간선 수만 맞춘 완전 무작위 배선이에요.' },
  N3: { name: 'input/output permutation', ko: '입출력 배치 순열', desc: '위상은 그대로 두고 어느 뉴런이 입력·출력인지를 섞어요. 간선 교집합 100%예요.' },
};

function nullModels() {
  const dir = path.join(ROOT, 'data', 'stage7', 'nulls', 'masks');
  const status = maybe('data/stage7/train-phaseb.status.json');
  const out = [];
  for (const key of ['N1', 'N2', 'N3']) {
    const f = path.join(dir, `${key.toLowerCase()}.mask.json`);
    const meta = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null;
    // 학습 산출물은 data/stage7-phaseB-<key>.json 로 떨어진다 (train-phaseb.js). 없으면 미학습.
    const trained = maybe(`data/stage7-phaseB-${key.toLowerCase()}.json`);
    const s = meta?.sanity ?? null;
    out.push({
      key, ...NULL_META[key],
      maskBuilt: !!meta,
      builtAt: meta?.builtAt ?? null,
      separatesWhat: meta?.separates ?? null,
      P: s?.P ?? null, N: s?.N ?? null, E: s?.E ?? null,
      // 대조군이 정말 대조군인지 — 마스크 sanity 의 실측값만 싣는다
      sanity: s ? {
        expectedP: s.expectedP, degreeIdentical: s.degreeIdentical ?? null,
        edgeOverlapWithOriginal: s.edgeOverlapWithOriginal ?? null, chanceOverlap: s.chanceOverlap ?? null,
        ok: s.ok ?? (s.P === s.expectedP),
      } : null,
      trained: !!trained,
      test: trained?.test ?? null,
      play: trained?.play ?? null,
      // 왜 아직 없는지 — 화면에 그대로 적는다
      state: trained ? 'done' : status && status.model === key && !status.done ? 'interrupted' : 'not-started',
      startedAt: status && status.model === key ? status.startedAt ?? null : null,
    });
  }
  return out;
}

function main() {
  const a = read('data/stage7-c0.json');                 // Phase A-4′
  const b = maybe('data/stage7-phaseB-c0.json');         // Phase B 프로토콜 C0 (50 게임)
  const teacherFile = read('data/teacher-attack-1ply-hold-garbage.json');
  const summary6 = maybe('web/data/summary.json');

  const gate = a.gate;
  const criteria = [
    { key: 'piecesMedian', label: '조각 중앙값', unit: '조각', desc: '한 판에서 놓은 조각 수 (상한 1000)' },
    { key: 'attackMedian', label: '공격 중앙값', unit: '줄', desc: '보낸 가비지 줄 수' },
    { key: 'tetrisMedian', label: '테트리스/게임', unit: '회', desc: '한 번에 4줄을 지운 횟수' },
    { key: 'relRegret', label: '상대 regret', unit: '', desc: '고른 후보가 교사 최선보다 얼마나 나쁜가 (0 = 최선)', lower: true },
    { key: 'garbageDeathShare', label: '가비지 사망 비율', unit: '', desc: '죽은 판 중 가비지에 눌려 죽은 비율', lower: true },
  ].map((c) => ({
    ...c,
    threshold: gate.thresholds[c.key],
    measured: gate.measured[c.key],
    ci: gate.measured[`${c.key}CI`] ?? null,
    teacher: gate.teacher[c.key] ?? null,
    ratio: gate.ratios[c.key] ?? null,
    passed: !!gate.passed[c.key],
  }));

  const out = {
    generatedAt: new Date().toISOString(),
    stage: 7,
    phase: a.phase,                       // 'A-4′'
    ranAt: a.ranAt,
    elapsedHours: a.elapsedMs / 3600000,
    // 무엇이 커넥톰에서 오고 무엇이 학습되는가 — 화면 문구가 이 값을 인용한다
    model: {
      condition: 'C0', name: 'real connectome',
      N: a.model.N, E: a.model.E, P: a.model.P,
      nInput: a.model.nInput, nOutput: a.model.nOutput,
      rhoUnit: a.model.rhoUnit,
      T: a.hyper.T ?? 25, hidden: a.hyper.hidden ?? 64,
      sizes: a.model.sizes,
      constantDNs: a.model.readoutStandardization?.constantDNs ?? null,
    },
    teacher: {
      variant: a.teacherVariant,
      label: teacherFile.variantLabel,
      tunedAt: teacherFile.tunedAt,
      search: teacherFile.search,
      garbage: teacherFile.cemGarbage ?? null,
      params: teacherFile.params,
      play: gate.teacher,                 // 조각 1000 · 공격 319.5 · 테트리스 41.5 · 생존 0.8 …
    },
    // 순위 지표 — 같은 테스트 분할에서 학습 전 / 학습 후 / 우연
    ranking: {
      decisions: a.gate.measured ? b?.test?.decisions ?? a.untrained.decisions : a.untrained.decisions,
      candidates: a.untrained.candidates,
      candidatesPerDecision: a.untrained.candidatesPerDecision,
      trained: b?.test ?? {
        tau: gate.measured.tau, top1: gate.measured.top1, top1CI: gate.measured.top1CI,
        relRegret: gate.measured.relRegret, relRegretCI: gate.measured.relRegretCI,
        bottomHalfRate: gate.measured.bottomHalfRate,
      },
      untrained: a.untrained,
      chance: a.untrained.chance,
    },
    // 플레이 — 20 게임(A-4′ 게이트)과 50 게임(Phase B 기준선) 둘 다 싣는다
    play: {
      gate20: a.play,
      base50: b?.play ?? null,
      deaths50: b?.deaths ?? null,
      holdsPerPiece: { student20: gate.measured.holdsPerPiece, student50: b?.holdsPerPiece ?? null, teacher: gate.teacher.holdsPerPiece },
      lineComposition: { student: gate.measured.lineComposition, teacher: gate.teacher.lineComposition },
      wellRun: { student: gate.measured.wellRun, teacher: gate.teacher.wellRun },
      random: summary6?.baselines?.random ?? null,
    },
    gate: { phase: gate.phase, criteria, passCount: criteria.filter((c) => c.passed).length, total: criteria.length },
    rounds: (a.improvement?.perRound ?? []).map((r) => ({
      round: r.round, relRegret: r.relRegret, top1: r.top1, tau: r.tau,
      bottomHalfRate: r.bottomHalfRate, quickPiecesMedian: r.quickPiecesMedian,
      onPolicyAgreement: r.onPolicyAgreement,
    })),
    // 배선이 학습으로 얼마나 움직였나 (9단계 보고서 근거 — 웹은 '고정 vs 학습'을 이 수치로 설명한다)
    weights: {
      corr: a.weights.overall.corr,
      meanAbsDelta: a.weights.overall.meanAbsDelta,
      meanInit: a.weights.overall.meanInit,
      inhibitoryFrac: a.weights.overall.inhibitoryFrac,
      normInit: a.weights.norms.init, normFinal: a.weights.norms.final,
      byBlock: Object.fromEntries(Object.entries(a.weights.byBlock ?? {}).map(([k, v]) => [k, { edges: v.edges, corr: v.corr, meanAbsDelta: v.meanAbsDelta, inhibitoryFrac: v.inhibitoryFrac }])),
      input: { board: { corr: a.inputWeights.board.corr, meanAbsDelta: a.inputWeights.board.meanAbsDelta }, other: { corr: a.inputWeights.other.corr, meanAbsDelta: a.inputWeights.other.meanAbsDelta } },
    },
    data: {
      trainDecisions: a.data.trainDecisions, valDecisions: a.data.valDecisions,
      testDecisions: a.data.testDecisions, testCandidates: a.data.testCandidates,
      trainGames: a.data.trainGames, dataFile: path.basename(String(a.data.dataFile).replace(/\\/g, '/')),
      hyper: { loss: a.hyper.loss, lambda: a.hyper.lambda, mu: a.hyper.mu, K: a.hyper.K, daggerRounds: a.hyper.daggerRounds, dropoutZ: a.hyper.dropoutZ, dropoutH: a.hyper.dropoutH, weightDecay: a.hyper.weightDecay },
    },
    nulls: nullModels(),
    // 6단계(고정 스파이킹 리저버 + 학습 리드아웃)는 별개의 완결 실험이다 — 요약만 남긴다
    stage6: summary6 ? {
      generatedAt: summary6.generatedAt, combo: summary6.combo, operating: summary6.operating,
      conditions: summary6.conditions.map((r) => ({
        key: r.key, condition: r.condition, name: r.name, seed: r.seed, region: r.region,
        tau: r.regression?.tau ?? null, tauCI: r.regression?.tauCI ?? null,
        r2: r.regression?.r2 ?? null, top1: r.regression?.top1 ?? null,
        linesMedian: r.play?.linesMedian ?? null, piecesMedian: r.play?.piecesMedian ?? null,
      })),
      baselines: summary6.baselines,
    } : null,
  };

  const outPath = path.join(ROOT, 'web', 'data', 'stage7.json');
  writeFileSync(outPath, JSON.stringify(out, null, 1) + '\n');
  const kb = (statSync(outPath).size / 1024).toFixed(1);
  console.log(`web/data/stage7.json (${kb} KB) — ${out.phase} · 게이트 ${out.gate.passCount}/${out.gate.total} · 대조군 ${out.nulls.filter((n) => n.trained).length}/${out.nulls.length} 학습`);
  for (const n of out.nulls) console.log(`  ${n.key} ${n.ko}: 마스크 ${n.maskBuilt ? 'OK' : '없음'} · 학습 ${n.trained ? '완료' : n.state === 'interrupted' ? '중단' : '미시작'}`);
}

main();
