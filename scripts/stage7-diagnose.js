#!/usr/bin/env node
// 7단계 진단: 학습된 모델이 **전체 후보** 중 무엇을 고르는지 — 게이트 지표(top-1)가 놓치는 실패 양상을 잰다.
//   pick percentile   모델 선택의 교사 값 순위 백분위 (1 = 최선, 0 = 최악), 결정 평균
//   catastrophe rate  모델 선택이 교사 값 하위 50% / 하위 25% 인 결정 비율 — 학습 부분집합(교사 선택 + 상위 7) 에 한 번도 안 들어간 "쉬운 음성" 을 얼마나 고르는가
//   in-subset rate    모델 선택이 학습 부분집합(상위 8) 안에 있는 결정 비율
//   value gap         교사 값 (최선 − 선택) 의 중앙값 · 평균
//   held-out train    학습 결정 표본에서 같은 지표 (일반화 격차)
// 옵션: --model c0 (data/stage7/{name}.model.json) --workers N --train-sample N

import { HYPER } from '../src/stage7-train.js';
import { median, mean } from '../src/evaluate.js';
import { buildDataset, calibrateState, createSparseState, createDenseState, createTrainingPool, DEFAULT_WORKERS, fmtMs, loadInputs, loadModel, maskFor, pct, scoreItems, variantOf } from './stage7-lib.js';
import { appendDecisions, metricsFromScores, selectDecisions, trainingSubset } from '../src/stage7-data.js';

const argv = process.argv.slice(2);
const opt = (name, def) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? argv[i + 1] : def; };
const name = opt('model', 'c0');
const workers = Number(opt('workers', DEFAULT_WORKERS));
const trainSample = Number(opt('train-sample', 300));

// 선택 품질은 metricsFromScores 와 같은 정의 (순위 = 교사 값이 선택보다 큰 후보 수; 동점은 불리하게 세지 않는다)
function diagnose(items, scores) {
  const m = metricsFromScores(items, scores);
  const inSubset = [], gap = [];
  for (let i = 0; i < items.length; i++) {
    const d = items[i], s = scores[i], n = d.values.length;
    let a = 0;
    for (let k = 1; k < n; k++) if (s[k] > s[a]) a = k;
    inSubset.push(trainingSubset(d.values.map((value) => ({ value })), d.chosen, HYPER.K).includes(a) ? 1 : 0);
    gap.push(d.values[d.chosen] - d.values[a]);
  }
  return { decisions: items.length, tau: m.tau, top1: m.top1, pickPercentile: m.pickPercentile, bottomHalfRate: m.bottomHalfRate, bottomHalfRateCI: m.bottomHalfRateCI, bottomQuarterRate: m.bottomQuarterRate, inSubsetRate: mean(inSubset), gapMedian: median(gap), gapMean: mean(gap) };
}
const line = (m) => `τ ${m.tau.toFixed(3)} top-1 ${pct(m.top1)}, pick percentile ${m.pickPercentile.toFixed(3)}, pick in bottom half ${pct(m.bottomHalfRate)} [${m.bottomHalfRateCI.map(pct).join(', ')}], bottom quarter ${pct(m.bottomQuarterRate)}, pick inside hard-8 subset ${pct(m.inSubsetRate)}, value gap median ${m.gapMedian.toFixed(1)} mean ${m.gapMean.toFixed(1)}`;

const connectome0 = () => loadInputs({ data: false }).connectome;

async function main() {
  const t0 = performance.now();
  const loaded0 = loadModel(name, connectome0());
  const { connectome, teacher, data } = loadInputs({ variant: loaded0?.doc?.teacher?.variant ?? variantOf(process.argv.slice(2)) }); // 모델이 학습된 교사 변형의 데이터·교사
  const loaded = loadModel(name, connectome);
  if (!loaded) { console.error(`data/stage7/${name}.model.json 없음`); process.exit(1); }
  const { doc } = loaded;
  const ds = buildDataset(data, { trainDecisions: 8000, valDecisions: 2000, daggerRows: trainSample * 60 }); // 여유 행: 학습 결정 표본을 전체 후보로
  // 학습 결정 표본을 전체 후보로 (일반화 격차)
  const sel = selectDecisions(data, { trainDecisions: 8000, valDecisions: 2000 });
  const step = Math.max(1, Math.floor(sel.train.length / trainSample));
  const trainFull = appendDecisions(ds.pool, sel.train.filter((_, i) => i % step === 0).slice(0, trainSample), { subset: false });
  let state;
  if (doc.kind === 'sparse') {
    state = createSparseState(maskFor(connectome, doc.mask.condition.type, doc.mask.condition.seed ?? 0), { ...HYPER, dropoutZ: 0, dropoutH: 0 });
    state.theta.set(loaded.theta); state.model.dnMean.set(doc.spec.dnMean); state.model.dnStd.set(doc.spec.dnStd);
  } else { state = createDenseState(doc.P); state.theta.set(loaded.theta); }
  console.log(`model ${name}: ${doc.kind}, P ${doc.P}, trained ${doc.trainedAt}${doc.rounds ? `, rounds ${doc.rounds}` : ''}; test ${ds.test.length} decisions (full candidates), train sample ${trainFull.length} decisions (full candidates)`);
  const tp = await createTrainingPool(state, ds, { workers, teacher });
  const test = diagnose(ds.test, await scoreItems(tp, ds.test));
  const train = diagnose(trainFull, await scoreItems(tp, trainFull));
  await tp.close();
  console.log(`test:  ${line(test)}`);
  console.log(`train: ${line(train)}`);
  console.log(JSON.stringify({ model: name, test, train }));
  console.log(`(${fmtMs(performance.now() - t0)})`);
}

main().catch((err) => { console.error(err); process.exit(2); });
