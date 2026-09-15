// 결정 내 분리도: 같은 결정의 후보 afterstate 들이 DN 발화 수로 구분되는가. 순수 함수 + 리저버 구동 래퍼.
//
//   distinctFrac    결정 내 서로 다른 DN 발화 수 벡터의 수 / 후보 수 (결정 평균)
//   meanDNDiff      후보 쌍 간 발화 수가 다른 DN 개수 평균
//   profile         전파 프로파일: 후보 쌍 간 발화 수가 다른 뉴런 수 — 입력층 / 중간층 / 출력층 (쌍 평균)
//   withinKendall   결정 내 중심화 목표(Dellacherie 점수 − 결정 평균)로 훈련 결정에 릿지를 맞추고, 테스트 결정에서 결정 내 켄달 τ-b 평균
//
// 리저버 결과는 창 발화 수 정수 벡터라 "서로 다른" 은 정확히 같은 벡터인지로 판정한다.
// 같은 결정에서 보드가 완전히 같은 후보(O 조각의 4 회전, S/Z/I 의 2 회전 등)는 하나로 합친다 — 그러지 않으면 distinctFrac 의
// 상한이 조각 종류에 따라 25–50% 로 깎여 지표가 조각 정체성을 재게 된다.

import { kendallTau, mean } from './evaluate.js';
import { trainRidge } from './readout.js';

// countsByDecision: 결정별 후보들의 전 뉴런 창 발화 수 배열. layerOf(i) → 'input'|'hidden'|'output'. outputStart 이후가 DN.
export function separationFromCounts(countsByDecision, { outputStart, N, nInput }) {
  let distinctSum = 0, pairs = 0, dnDiffSum = 0;
  const prof = { input: 0, hidden: 0, output: 0 };
  for (const cands of countsByDecision) {
    const keys = new Set(cands.map((c) => Array.from(c.subarray(outputStart, N)).join(',')));
    distinctSum += keys.size / cands.length;
    for (let a = 0; a < cands.length; a++) {
      for (let b = a + 1; b < cands.length; b++) {
        const A = cands[a], B = cands[b];
        let ni = 0, nh = 0, no = 0;
        for (let i = 0; i < nInput; i++) if (A[i] !== B[i]) ni++;
        for (let i = nInput; i < outputStart; i++) if (A[i] !== B[i]) nh++;
        for (let i = outputStart; i < N; i++) if (A[i] !== B[i]) no++;
        prof.input += ni; prof.hidden += nh; prof.output += no;
        dnDiffSum += no;
        pairs++;
      }
    }
  }
  const D = countsByDecision.length;
  return {
    decisions: D, pairs,
    distinctFrac: D ? distinctSum / D : 0,
    meanDNDiff: pairs ? dnDiffSum / pairs : 0,
    profile: pairs ? { input: prof.input / pairs, hidden: prof.hidden / pairs, output: prof.output / pairs } : { input: 0, hidden: 0, output: 0 },
    layerSizes: { input: nInput, hidden: outputStart - nInput, output: N - outputStart },
  };
}

// 결정 내 중심화 릿지의 테스트 켄달 τ. trainDec/testDec: [{ X: [DN 벡터...], scores: [...] }]
export function withinKendall(trainDec, testDec) {
  const nVal = Math.max(1, Math.floor(trainDec.length * 0.2));
  const rows = (decs) => {
    const X = [], Y = [];
    for (const d of decs) { const m = mean(d.scores); d.X.forEach((x, j) => { X.push(Float64Array.from(x)); Y.push(Float64Array.from([d.scores[j] - m])); }); }
    return { X, Y };
  };
  const tr = rows(trainDec.slice(0, trainDec.length - nVal)), va = rows(trainDec.slice(trainDec.length - nVal));
  if (tr.X.length === 0 || va.X.length === 0) return { tau: 0, taus: [], lambdaRel: null };
  const model = trainRidge(tr.X, tr.Y, va.X, va.Y);
  const taus = testDec.map((d) => kendallTau(d.scores, d.X.map((x) => model.predict(Float64Array.from(x))[0])));
  return { tau: taus.length ? mean(taus) : 0, taus, lambdaRel: model.info.lambdaRel };
}

// 리저버 구동 래퍼. featurizeBoth(board) → { counts, dn }. decisions: [{ boards: [...], scores: [...] }]
// withKendall 이면 trainDecisions 로 릿지를 맞춰 withinKendall 도 낸다.
export function dedupeDecision(d) {
  const seen = new Map();
  d.boards.forEach((b, j) => { const key = Buffer.from(b).toString('latin1'); if (!seen.has(key)) seen.set(key, j); });
  const keep = [...seen.values()];
  return { boards: keep.map((j) => d.boards[j]), scores: keep.map((j) => d.scores[j]) };
}

export function measureSeparation(featurizeBoth, testDecisions, dims, { trainDecisions = null } = {}) {
  const countsByDecision = [];
  const testDec = [];
  let candidates = 0, unique = 0;
  for (const raw of testDecisions) {
    const d = dedupeDecision(raw);
    candidates += raw.boards.length; unique += d.boards.length;
    if (d.boards.length < 2) continue;
    const runs = d.boards.map((b) => featurizeBoth(b));
    countsByDecision.push(runs.map((r) => r.counts));
    testDec.push({ X: runs.map((r) => r.dn), scores: d.scores });
  }
  const sep = separationFromCounts(countsByDecision, dims);
  sep.candidates = candidates; sep.uniqueCandidates = unique;
  if (trainDecisions) {
    const trainDec = trainDecisions.map(dedupeDecision).filter((d) => d.boards.length >= 2).map((d) => ({ X: d.boards.map((b) => featurizeBoth(b).dn), scores: d.scores }));
    const wk = withinKendall(trainDec, testDec);
    sep.withinKendall = wk.tau;
    sep.withinKendallTaus = wk.taus;
    sep.lambdaRel = wk.lambdaRel;
  }
  return sep;
}
