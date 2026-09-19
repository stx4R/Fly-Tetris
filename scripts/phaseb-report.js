#!/usr/bin/env node
// 7단계 Phase B — reports/stage7-phaseB.md 생성 (지시 §10).
// 입력: data/stage7-phaseB-compare.json · stage7-phaseB-smoke.json · stage7-phaseB-c0.json · stage7-n{1,2,3}.json
//       data/stage7/nulls/masks/n*.mask.json · data/stage7-c0.json (Phase A 게이트)
// 결론(§10-7) 은 규칙으로 고른다 — 1차 판정 지표(결정 단위 rel-regret · top-1)의 쌍대 CI 와 Holm 보정 p 로만 판정한다.
// 금지: "초파리가 학습했다" 류 표현, 통계적으로 지지되지 않는 인과 서술, "경향"·"시사한다" 로 약한 결과를 포장하는 문장.
// 옵션: --out <path>

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { NULL_NAMES, NULL_SEPARATES, PHASE_B_NULLS } from '../src/stage7-nulls.js';
import { ROOT } from './stage7-lib.js';

const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
const OUT = opt('out', path.join(ROOT, 'reports', 'stage7-phaseB.md'));
const read = (p) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null);
const D = (f) => path.join(ROOT, 'data', f);
const pct = (x) => (x === null || x === undefined ? '—' : `${(100 * x).toFixed(1)}%`);
const n3 = (x, d = 3) => (Number.isFinite(x) ? x.toFixed(d) : '—');
const ciTxt = (c, d = 1) => (Array.isArray(c) ? `[${n3(c[0], d)}, ${n3(c[1], d)}]` : '—');
const kst = (iso) => (iso ? new Date(iso).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }) : '—');
const hrs = (ms) => (Number.isFinite(ms) ? `${(ms / 3.6e6).toFixed(2)} h` : '—');

function main() {
  const cmp = read(D('stage7-phaseB-compare.json'));
  if (!cmp) { console.error('data/stage7-phaseB-compare.json 없음 — phaseb-compare.js 를 먼저'); process.exit(1); }
  const smoke = read(D('stage7-phaseB-smoke.json'));
  const phaseA = read(D('stage7-c0.json'));
  const recs = { C0: read(D('stage7-phaseB-c0.json')) };
  for (const k of PHASE_B_NULLS) { const r = read(D(`stage7-n${k[1]}.json`)); if (r) recs[k] = r; }
  const nulls = cmp.models.filter((m) => m !== 'C0');
  const L = [];
  const p = (s = '') => L.push(s);

  p(`# 7단계 Phase B — 배선 제약 대조군 보고`);
  p();
  p(`> **Phase A 게이트 미달 상태에서 돌린 Phase B다.** 게이트 \`${cmp.gateStatus}\`, \`forcedPhaseB: ${cmp.forcedPhaseB}\`.`);
  p(`> 학생 C0 는 조각·공격 기준을 통과하지 못했다 (조각 178.5 < 700, 공격 20 < 191.7). Phase B 는 그 병목을 고치지 않고,`);
  p(`> 같은 학생·같은 프로토콜에서 **배선 마스크만 바꿨을 때 차이가 나는가**만 측정한다.`);
  if (cmp.pending?.length) p(`>\n> ⚠ 아직 끝나지 않은 대조군: ${cmp.pending.join(', ')} — 아래 Holm 보정의 가족 크기가 ${nulls.length} 로 작다. 전부 끝나면 다시 계산해야 한다.`);
  p();

  // ---------- 1 실행 사실 ----------
  p(`## 1. 실행 사실`);
  p();
  p(`| 모델 | 배선 | 실행 | 소요 | P | E | 라운드 |`);
  p(`|---|---|---|---|---|---|---|`);
  for (const k of cmp.models) {
    const r = recs[k];
    if (!r) continue;
    p(`| ${k} | ${k === 'C0' ? '실제 커넥톰' : NULL_NAMES[k]} | ${kst(r.ranAt)} | ${hrs(r.elapsedMs)} | ${r.model.P.toLocaleString()} | ${r.model.E.toLocaleString()} | ${k === 'C0' ? 'A-4′ 학습 모델 재평가 (재학습 없음)' : `${r.rounds.length} (round 0 + DAgger ${r.rounds.length - 1})`} |`);
  }
  p();
  const proto = recs.C0?.protocol ?? {};
  p(`프로토콜은 \`data/stage7-c0.json\` (A-4′ 실측) 에서 읽어 고정했고, 어긋나면 실행이 거부된다:`);
  p(`train ${proto.trainDecisions} 결정 · val ${proto.valDecisions} · λ ${proto.lambda} · μ ${proto.mu} · select ${proto.selectBy} · AdamW wd ${proto.weightDecay} · dropout ${proto.dropoutZ}/${proto.dropoutH} · round0 ≤ ${proto.round0?.maxEpochs} epochs (patience ${proto.round0?.patience}, lr ${proto.round0?.lr}) · finetune ≤ ${proto.finetune?.maxEpochs} (lr ${proto.finetune?.lr}) · DAgger ${proto.daggerDecisions} 결정/라운드 (cap ${proto.daggerCap}, 시드 기준 C0 와 동일).`);
  p();
  p(`평가는 4 모델이 **같은 게임 시드 ${cmp.pairedGames}개**(${cmp.playSeeds?.[0]}–${cmp.playSeeds?.[cmp.playSeeds.length - 1]})를 쓴다. 결정 단위 지표는 같은 테스트 결정 1,453개(전체 후보)에서 잰다.`);
  p(`Phase B 는 라운드 조기 종료를 쓰지 않는다 — C0 도 3 라운드를 돌았으므로 라운드 수가 모델마다 달라지면 프로토콜이 어긋난다. 라운드별 개선 검정 결과는 기록만 한다.`);
  p();

  // ---------- 2 마스크 sanity ----------
  p(`## 2. 마스크 sanity check`);
  p();
  p(`세 대조군 모두 N · E · 입력 뉴런 수 · readout 뉴런 수가 같아 **P 가 정확히 동일**하다 (1,067,041).`);
  p();
  p(`| null | 배선 | 분리하는 것 | 원본 간선 교집합 | in/out 차수 | 입출력 뉴런 | 판정 |`);
  p(`|---|---|---|---|---|---|---|`);
  for (const k of nulls) {
    const s = recs[k]?.sanity ?? read(path.join(ROOT, 'data', 'stage7', 'nulls', 'masks', `${k.toLowerCase()}.mask.json`))?.sanity;
    if (!s) continue;
    p(`| ${k} | ${NULL_NAMES[k]} | ${NULL_SEPARATES[k]} | ${(100 * s.edgeOverlapWithOriginal).toFixed(2)}% (우연 ${(100 * s.chanceOverlap).toFixed(2)}%) | ${s.degreeIdentical ? '원본과 동일' : `이항 (중앙 ${s.inDegree.median}, 최대 ${s.inDegree.max}; 원본 ${s.inDegreeOriginal.median}/${s.inDegreeOriginal.max})`} | ${s.inputSetSameAsC0 ? '원본 유지' : '재추출'} | ${s.pass ? 'PASS' : 'FAIL'} |`);
  }
  p();
  p(`**사양과 구현의 차이 (N3).** 지시 §2 의 N3 는 "ROI 라벨만 순열"이지만, 이 코드베이스에서 입력/출력층 소속은 ROI 가 아니라`);
  p(`뉴런 type 으로 정해진다 (\`src/connectome.js\` \`classifyLayer\`: LC/LPLC → input, DN → output). ROI 라벨은 보고·시각화에만 쓰인다.`);
  p(`따라서 라벨만 순열하면 모델은 C0 와 비트 단위로 같아져 대조군이 성립하지 않는다. N3 는 사양의 의도("보드 입력이 들어가는 위치와`);
  p(`행동이 읽히는 위치가 해부학적으로 어긋난다")를 따라, 라벨 순열에 더해 입력·readout 뉴런 집합을 순열된 라벨의 ROI 프로파일 기준으로`);
  p(`다시 뽑는다. 간선 집합은 재색인 아래에서 정확히 보존된다 (교집합 100%).`);
  p();
  p(`**N1 의 잔존 간선.** 차수 보존 교환은 시도 4,591,680회 중 4,291,545회가 수용됐는데도 원본 간선의 2.94% 가 남는다 (우연 0.72%).`);
  p(`in-degree 최대가 1,134 인 무거운 꼬리 때문에 허브 사이 간선은 교환이 자주 기각된다. 이 2.94% 는 N1 의 구조적 하한이다.`);
  p();
  p(`**시냅스 부호.** 커넥톰 간선 가중치는 459,168개가 전부 양수(3–4299)다. 초기 흥분/억제 비율은 100/0 이고 억제성은 학습으로만 생긴다.`);
  p(`"부호 비율 보존"은 세 조건 모두 자명하게 성립한다 — 이 항목은 대조군을 구분하지 못한다.`);
  p();

  // ---------- 3 주요 지표 ----------
  p(`## 3. 모델별 주요 지표`);
  p();
  const S = cmp.summary;
  const ref = cmp.c0TwentyGameReference;
  p(`| 지표 | C0 (50게임) | C0 (20게임, A-4′) | ${nulls.map((k) => k).join(' | ')} |`);
  p(`|---|---|---|${nulls.map(() => '---').join('|')}|`);
  const row = (label, f, ref20) => p(`| ${label} | ${f('C0')} | ${ref20} | ${nulls.map((k) => f(k)).join(' | ')} |`);
  row('조각 중앙값 [CI]', (k) => `${S[k].piecesMedian} ${ciTxt(S[k].piecesMedianCI, 0)}`, `${ref.piecesMedian} [135, 271]`);
  row('공격 중앙값 [CI]', (k) => `${S[k].attackMedian} ${ciTxt(S[k].attackMedianCI, 0)}`, `${ref.attackMedian} [16, 49]`);
  row('테트리스/게임 (총계)', (k) => `${S[k].tetrisMedian} (${S[k].tetrises})`, `${ref.tetrisMedian} (30)`);
  row('상대 regret [CI]', (k) => `${n3(S[k].relRegret, 4)} ${ciTxt(S[k].relRegretCI, 3)}`, '0.0846 [0.077, 0.092]');
  row('top-1 [CI]', (k) => `${pct(S[k].top1)} ${ciTxt(S[k].top1CI?.map((v) => 100 * v), 1)}%`, '46.1% [43.6, 48.8]');
  row('τ', (k) => n3(S[k].tau), '0.544');
  row('생존율', (k) => pct(S[k].survival), '0.0%');
  row('holds/piece', (k) => n3(S[k].holdsPerPiece), String(ref.holdsPerPiece));
  row('가비지 사망 비중', (k) => pct(S[k].garbageDeathShare), '50.0%');
  row('사망 원인', (k) => Object.entries(S[k].deaths).map(([a, b]) => `${a} ${b}`).join(', '), 'garbage 10, well-fill 6, holes 4');
  row('우물 길이 중앙/p90/max', (k) => `${S[k].wellRun.median}/${S[k].wellRun.p90}/${S[k].wellRun.max}`, '2/6/15');
  row('줄 1/2/3/4', (k) => { const c = S[k].lineComposition; return `${c.single}/${c.double}/${c.triple}/${c.tetris}`; }, '1497/202/37/30');
  row('미학습 top-1', (k) => pct(S[k].untrainedTop1), '23.2%');
  p();
  p(`**C0 의 20게임 vs 50게임.** 같은 모델·같은 시드 체계인데 조각 중앙값이 ${ref.piecesMedian} → ${S.C0.piecesMedian} 로 움직였다.`);
  p(`A-4′ 의 20게임 수치를 덮어쓰지 않고 둘 다 적는다. 50게임에서는 사망 원인에 \`stack\` 이 새로 나타난다 (${S.C0.deaths.stack ?? 0}건).`);
  p(`이 차이 자체가 게임 단위 지표의 분산이 크다는 증거다.`);
  p();
  for (const k of nulls) if (S[k].notLearned) p(`⚠ **${k} 는 같은 프로토콜로 학습되지 않았다** (round 0 top-1 ${pct(S[k].notLearned.top1)} ≤ 미학습 ${pct(S[k].notLearned.untrainedTop1)} + 3%p). 시드를 바꿔 1회 재시도했고 결과는 동일하다. 이것도 결과로 기록한다.`);
  for (const k of nulls) if (S[k].retried && !S[k].notLearned) p(`ℹ ${k} 는 round 0 에서 재시도 1회를 했다 (지시 §9).`);
  p();

  // ---------- 4 쌍대 비교 ----------
  p(`## 4. 쌍대 비교 (C0 − null)`);
  p();
  p(`게임은 공유 시드 ${cmp.pairedGames}개로, 결정은 테스트 결정 1,453개로 짝지었다.`);
  p(`Δ 의 95% CI 는 쌍을 리샘플하는 쌍대 부트스트랩 ${cmp.bootstrapResamples.toLocaleString()}회, p 는 쌍별 차이의 부호 뒤집기 순열검정 ${cmp.permutations.toLocaleString()}회(양측),`);
  p(`보정은 대조군 ${nulls.length}개에 대한 Holm–Bonferroni다. 판정은 기계적이다: CI 가 0 을 포함하면 "구분되지 않음".`);
  p();
  p(`### 4.1 결정 단위 — 1차 판정 지표`);
  p();
  if (cmp.decisionComparisons) {
    p(`| 지표 | null | C0 | null | Δ (C0−null) [95% CI] | p | p (Holm) | 판정 |`);
    p(`|---|---|---|---|---|---|---|---|`);
    for (const key of Object.keys(cmp.decisionComparisons)) {
      const m = cmp.decisionComparisons[key];
      for (const k of nulls) {
        const st = m.byNull[k];
        if (!st) continue;
        p(`| ${m.label} | ${k} | ${n3(st.c0Mean, 4)} | ${n3(st.nullMean, 4)} | ${n3(st.dPaired, 4)} ${ciTxt(st.dPairedCI, 4)} | ${st.p.toFixed(4)} | ${st.pHolm.toFixed(4)} | ${st.separated ? (st.c0Better ? '**C0 우위**' : '**C0 열위**') : '구분되지 않음'} |`);
      }
    }
  } else p(`(결정 단위 재계산을 건너뛴 실행 — \`--skip-decision\`)`);
  p();
  p(`### 4.2 게임 단위`);
  p();
  p(`| 지표 | null | C0 | null | Δmedian [95% CI] | p | p (Holm) | 판정 |`);
  p(`|---|---|---|---|---|---|---|---|`);
  for (const key of Object.keys(cmp.gameComparisons)) {
    const m = cmp.gameComparisons[key];
    for (const k of nulls) {
      const st = m.byNull[k];
      if (!st) continue;
      p(`| ${m.label} | ${k} | ${n3(st.c0, 2)} | ${n3(st.null, 2)} | ${n3(st.dMedian, 2)} ${ciTxt(st.dMedianCI, 2)} | ${st.p.toFixed(4)} | ${st.pHolm.toFixed(4)} | ${st.separated ? (st.c0Better ? '**C0 우위**' : '**C0 열위**') : '구분되지 않음'} |`);
    }
  }
  p();
  p(`**1차 판정 지표를 결정 단위(rel-regret · top-1)로 두는 이유.** 조각 중앙값은 C0 에서 CI 폭이 중앙값에 육박한다`);
  p(`(${S.C0.piecesMedian} ${ciTxt(S.C0.piecesMedianCI, 0)}). 게임 ${cmp.pairedGames}개를 페어링해도 배선 효과를 검출할 검정력이 부족할 수 있다.`);
  p(`조각 중앙값이 구분되지 않는 것은 "차이 없음"의 증거가 아니라 "검정력 부족"일 수 있다 — 이 구분을 흐리지 않는다.`);
  p(`결정 단위 지표는 표본이 1,453개이고 CI 폭이 훨씬 좁아 같은 크기의 배선 효과를 훨씬 민감하게 잡는다.`);
  p();

  // ---------- 5 배선 변화 ----------
  p(`## 5. 배선 변화 측정 (학습이 초기 가중치를 얼마나 밀어냈는가)`);
  p();
  p(`| 항목 | ${cmp.models.join(' | ')} |`);
  p(`|---|${cmp.models.map(() => '---').join('|')}|`);
  const wrow = (label, f) => p(`| ${label} | ${cmp.models.map((k) => f(S[k])).join(' | ')} |`);
  wrow('corr(초기 w0, 학습된 w)', (s) => n3(s.weights.corr, 4));
  wrow('\\|Δw\\| 평균 (초기 평균)', (s) => `${s.weights.meanAbsDelta.toExponential(3)} (${s.weights.meanInit.toExponential(3)})`);
  wrow('‖W‖ 초기 → 학습후', (s) => `${n3(s.norms.init, 2)} → ${n3(s.norms.final, 2)}`);
  wrow('억제성 시냅스 비율 (초기 0%)', (s) => pct(s.weights.inhibitoryFrac));
  wrow('W_in 보드 열 corr / 그 외', (s) => `${n3(s.inputWeights.board.corr)} / ${n3(s.inputWeights.other.corr)}`);
  p();
  p(`해석은 여기 한 문단에만 둔다. corr(w0, w) 가 낮을수록 같은 성능을 내기 위해 초기 가중치를 더 많이 버렸다는 뜻이다.`);
  const corrs = cmp.models.map((k) => ({ k, v: S[k].weights.corr }));
  const c0corr = corrs.find((x) => x.k === 'C0').v;
  const lower = corrs.filter((x) => x.k !== 'C0' && x.v < c0corr - 0.02).map((x) => x.k);
  const higher = corrs.filter((x) => x.k !== 'C0' && x.v > c0corr + 0.02).map((x) => x.k);
  if (lower.length) p(`측정된 사실: ${lower.join(', ')} 의 corr 가 C0(${n3(c0corr, 3)}) 보다 0.02 이상 낮다. 이 차이에 대한 CI 는 계산하지 않았으므로(모델당 시드 1개) 통계적 판정은 하지 않는다.`);
  else if (higher.length) p(`측정된 사실: ${higher.join(', ')} 의 corr 가 C0(${n3(c0corr, 3)}) 보다 0.02 이상 높다. CI 가 없으므로 통계적 판정은 하지 않는다.`);
  else p(`측정된 사실: 대조군의 corr 가 C0(${n3(c0corr, 3)}) 와 0.02 이내다. 모델당 시드가 1개라 CI 가 없으므로 통계적 판정은 하지 않는다.`);
  p();

  // ---------- 6 smoke ----------
  p(`## 6. smoke 결과`);
  p();
  if (!smoke) p(`(아직 실행하지 않음)`);
  else {
    p(`| 항목 | 결과 |`);
    p(`|---|---|`);
    const okAll = smoke.models.every((m) => m.load);
    p(`| 1 모델 로드 (P · 마스크 규격 · .bin 크기) | ${okAll ? 'PASS' : 'FAIL'} — ${smoke.models.map((m) => `${m.model} P ${m.P.toLocaleString()}`).join(', ')} |`);
    p(`| 2 Node ↔ 브라우저 추론 일치 (${smoke.refInputs.rows}행 / ${smoke.refInputs.decisions}결정, 허용 ${smoke.refInputs.tolerance}) | ${smoke.browser?.done ? `${smoke.browser.parity ? 'PASS' : '**FAIL**'} — maxAbsDiff ${smoke.browser.maxAbsDiff?.toExponential(3)}` : '미측정'} |`);
    p(`| 3 결정론성 (같은 시드 2회) | ${smoke.models.every((m) => m.determinism.pieces && m.determinism.actions) ? 'PASS' : 'FAIL'} — 조각·행동 시퀀스 동일 (${smoke.models[0]?.determinism.decisions} 결정) |`);
    const t = smoke.models.map((m) => `${m.model} Node ${m.nodeTiming.medianMs.toFixed(1)} ms${m.browser ? ` / 브라우저 ${m.browser.medianMs.toFixed(1)} ms` : ''}`).join(', ');
    const worstBrowser = Math.max(...smoke.models.map((m) => m.browser?.medianMs ?? m.nodeTiming.medianMs));
    p(`| 4 결정당 추론 시간 (중앙값) | ${t} — 프레임 예산 ${smoke.frameBudgetMs.toFixed(1)} ms 대비 **${(worstBrowser / smoke.frameBudgetMs).toFixed(0)}배 초과** |`);
    p(`| 5 파일 크기 | ${smoke.models.map((m) => `${m.model} .bin ${m.size.binMB} MB (gzip ${m.size.gzipMB} MB)`).join(', ')} |`);
    p(`| 6 마스크 식별 · 웹 기본 경로 | ${smoke.models.every((m) => m.checks.find((c) => c.name.includes('마스크 식별자'))?.ok) ? 'PASS' : 'FAIL'} — ${smoke.webDefault.note} |`);
    p();
    p(`추론 시간은 순수 score 호출 시간이다 (렌더링·입력 처리 제외). 결정당 후보는 평균 ${smoke.models[0]?.nodeTiming.meanCandidates.toFixed(0)}개.`);
    p(`8단계 웹에서 사람과 같은 프레임 예산 안에 넣으려면 이 수치가 ${smoke.frameBudgetMs.toFixed(1)} ms 아래여야 한다 — 현재는 그렇지 않다.`);
    p(`브라우저가 마스크를 만들려면 \`connectome.json\` (7.7 MB) 도 받아야 하므로 실제 배포 페이로드는 모델 파일보다 크다.`);
  }
  p();

  // ---------- 7 결론 ----------
  p(`## 7. 결론`);
  p();
  const primary = ['relRegret', 'top1'];
  const verdicts = [];
  for (const key of primary) {
    const m = cmp.decisionComparisons?.[key];
    if (!m) continue;
    for (const k of nulls) {
      const st = m.byNull[k];
      if (st) verdicts.push({ metric: m.label, k, separated: st.separated, c0Better: st.c0Better, d: st.dPaired, ci: st.dPairedCI, pHolm: st.pHolm });
    }
  }
  const c0Wins = verdicts.filter((v) => v.separated && v.c0Better);
  const c0Losses = verdicts.filter((v) => v.separated && !v.c0Better);
  let choice, body;
  if (c0Losses.length && !c0Wins.length) {
    choice = '(iii) 무작위 배선이 더 낫다';
    body = c0Losses.map((v) => `${v.k} 가 ${v.metric} 에서 C0 보다 낫다 (Δ ${n3(v.d, 4)} ${ciTxt(v.ci, 4)}, Holm p ${v.pHolm.toFixed(4)})`).join('; ');
  } else if (c0Wins.length && !c0Losses.length) {
    choice = '(i) 커넥톰 배선이 무작위 배선보다 낫다';
    body = c0Wins.map((v) => `${v.k} 대비 ${v.metric} 에서 Δ ${n3(v.d, 4)} ${ciTxt(v.ci, 4)} (Holm p ${v.pHolm.toFixed(4)})`).join('; ');
  } else if (c0Wins.length && c0Losses.length) {
    choice = '(i)/(iii) 혼재 — 지표·대조군에 따라 방향이 다르다';
    body = `C0 우위: ${c0Wins.map((v) => `${v.k}/${v.metric}`).join(', ')}; C0 열위: ${c0Losses.map((v) => `${v.k}/${v.metric}`).join(', ')}`;
  } else {
    choice = '(ii) 구분되지 않는다';
    body = `1차 판정 지표 ${verdicts.length}개 비교 전부에서 Δ 의 95% CI 가 0 을 포함한다`;
  }
  p(`**${choice}**`);
  p();
  p(`근거: ${body}.`);
  p();
  if (choice.startsWith('(ii)')) {
    p(`이것이 검정력 부족인지 진짜 무차이인지: 결정 단위 지표는 표본 1,453개에 CI 폭이 ${(() => { const st = cmp.decisionComparisons?.relRegret?.byNull[nulls[0]]; return st ? n3(st.dPairedCI[1] - st.dPairedCI[0], 4) : '—'; })()} 수준이라,`);
    p(`C0 와 대조군의 rel-regret 차이가 그 폭보다 컸다면 검출됐을 것이다. 즉 이 크기 이상의 배선 효과는 없다고 말할 수 있고,`);
    p(`그보다 작은 효과에 대해서는 이 실험이 답하지 못한다. 게임 단위 지표는 CI 가 넓어 검정력 부족 쪽에 가깝다.`);
  }
  p();
  p(`어느 경우든 이 결론은 **게이트를 통과하지 못한 학생**(조각 178.5, 교사 대비 18%) 위에서 얻은 것이다.`);
  p(`학생이 더 강해지면 배선의 기여가 달라질 수 있는지에 대해 이 실험은 답하지 않는다.`);
  p();

  // ---------- 8 검정력 한계 ----------
  p(`## 8. 검정력 한계`);
  p();
  p(`| 제약 | 결론을 어디까지 약화시키는가 |`);
  p(`|---|---|`);
  p(`| 시드 1개 | 마스크마다 난수 시드가 하나뿐이다. "이 N1 마스크"와 C0 의 비교이지 "차수 보존 재배선 일반"과의 비교가 아니다. 마스크 생성 시드에 따른 변동 폭은 측정하지 않았다. |`);
  p(`| 게임 ${cmp.pairedGames}개 | 조각 중앙값 CI 폭이 중앙값에 육박한다. 게임 단위 지표에서 "구분되지 않음"은 검정력 부족과 구별되지 않는다. 페어링으로 많이 좁혔지만 충분하지는 않다. |`);
  p(`| 학생이 게이트 미달 | 조각 ${S.C0.piecesMedian}, 교사 대비 18%. 배선의 기여가 성능 상한 근처에서만 드러난다면 이 실험은 그것을 볼 수 없다. |`);
  p(`| 학습 시드 1개 | 모델마다 학습 시드가 하나다. 학습 자체의 재현 변동은 측정하지 않았다 (C0 의 A-4′ 20게임 vs B 50게임 차이가 그 하한을 보여준다). |`);
  p();

  // ---------- 9 다음 축 ----------
  p(`## 9. 물어보고 싶은 것 — 다음 축`);
  p();
  p(`| 후보 | 내용 | 예상 비용 | 기각 조건 |`);
  p(`|---|---|---|---|`);
  p(`| (a) 마스크 시드 다중화 | N1·N2·N3 를 시드 3–5개로 반복해 "이 마스크"가 아니라 "이 종류의 배선"과 비교 | null 1개당 ~6 h × 추가 시드 수 (3 시드면 ~54 h) | 시드 간 분산이 C0−null 차이보다 크면 단일 시드 결론은 무효 |`);
  p(`| (b) 학생 병목 먼저 (Phase A 재개) | 목적함수를 생존·길이와 정렬하거나 학생 용량을 키워 게이트를 통과시킨 뒤 Phase B 재실행 | 설계 + 학습 수 일 | 학생이 강해져도 C0−null 차이가 그대로면 배선은 기여하지 않는다 |`);
  p(`| (c) 게임 수 확대 | 페어링 게임을 200–500 개로 늘려 게임 단위 검정력 확보 | 모델당 ~30–80 min (학습 없음) | 조각 중앙값 CI 가 충분히 좁아졌는데도 구분되지 않으면 "진짜 무차이" 쪽 증거 |`);
  p(`| (d) 지금 결과로 9단계 보고서 | 현 결과를 한계와 함께 그대로 싣고 8단계(웹)로 이동 | 없음 | smoke 2 가 실패하면 8단계가 성립하지 않는다 |`);
  p();
  p(`추가로 결정이 필요한 지점: smoke 항목 4 에서 결정당 추론이 프레임 예산을 크게 넘는다. 8단계 웹을 "사람과 실시간 대전"으로 갈지,`);
  p(`"턴제/관전형"으로 낮출지가 갈린다.`);
  p();
  p(`---`);
  p(`생성: \`node scripts/phaseb-report.js\` · 입력: \`data/stage7-phaseB-compare.json\`, \`data/stage7-phaseB-smoke.json\`, \`data/stage7-n*.json\``);

  mkdirSync(path.dirname(OUT), { recursive: true });
  writeFileSync(OUT, L.join('\n') + '\n');
  console.log(`wrote ${path.relative(ROOT, OUT)} (${L.length} 줄) — 결론: ${choice}`);
}

main();
