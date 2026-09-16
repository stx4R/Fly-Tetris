// 진입점. 데이터(summary, graph, episode)를 읽고 화면 7개(홈·실험·상세·커넥톰·결정 탐색·조건 비교·설정)를 올린 뒤 해시 라우터로 오간다.
// 화면은 전부 미리 마운트하고 hidden 만 토글하므로 3D 뷰·재생 상태가 화면을 오가도 유지된다. 3D 가 실패해도 나머지는 동작한다.

import { createConnectomeView, createHeroView } from './connectome.js';
import { createDecisionView } from './decision.js';
import { createSpikesView } from './spikes.js';
import { renderCompare } from './compare.js';
import { renderHome } from './home.js';
import { renderExperiments, showExperiment } from './experiments.js';
import { renderHeatmap } from './heatmap.js';
import { bindSettings } from './settings.js';
import { createRouter } from './router.js';
import { fmt, el } from './util.js';

const mobile = matchMedia('(max-width: 767px)').matches || (navigator.hardwareConcurrency ?? 8) <= 4;

// ?debug: 콘솔 오류를 DOM(#debug-log)에 모아 headless 점검(--dump-dom)에서 읽을 수 있게 한다. 배포 페이지 동작에는 영향 없음.
if (location.search.includes('debug')) {
  const log = document.createElement('pre'); log.id = 'debug-log'; document.body.appendChild(log);
  const NL = String.fromCharCode(10);
  const push = (kind, args) => { log.textContent += `[${kind}] ${args.map((a) => (a instanceof Error ? `${a.message} ${a.stack}` : typeof a === 'string' ? a : JSON.stringify(a))).join(' ')}` + NL; };
  for (const k of ['error', 'warn']) { const orig = console[k].bind(console); console[k] = (...a) => { push(k, a); orig(...a); }; }
  addEventListener('error', (e) => push('uncaught', [e.message, e.filename, e.lineno]));
  addEventListener('unhandledrejection', (e) => push('rejection', [String(e.reason?.stack ?? e.reason)]));
  addEventListener('load', () => setTimeout(() => { log.textContent += `[ready] viewport ${innerWidth} scrollWidth ${document.documentElement.scrollWidth}` + NL; }, 3000));
}

async function load(name) {
  const r = await fetch(`data/${name}.json`);
  if (!r.ok) throw new Error(`${name}.json ${r.status}`);
  return r.json();
}

function fillNumbers(summary, graph) {
  const c0 = summary.conditions.find((r) => r.key === 'C0');
  const kc = graph.nodes.filter((n) => n.layer === 'hidden' && n.isKC).length;
  const map = {
    'c0.tau': fmt(c0.regression.tau, 3),
    'c0.tauCI': `${fmt(c0.regression.tauCI[0], 3)}, ${fmt(c0.regression.tauCI[1], 3)}`,
    'c0.decisions': `${c0.regression.decisions}`,
    'c0.lines': `${c0.play.linesMedian}`,
    'c0.pieces': `${c0.play.piecesMedian}`,
    'graph.nodes': graph.nodes.length.toLocaleString(),
    'graph.edges': graph.edges.length.toLocaleString(),
    'graph.input': `${graph.meta.counts.input}`,
    'graph.hidden': `${graph.meta.counts.hidden}`,
    'graph.output': `${graph.meta.counts.output}`,
    'graph.kcPct': `${(100 * kc / graph.meta.counts.hidden).toFixed(1)}%`,
    'op.T': `${summary.operating.T}`,
  };
  document.querySelectorAll('[data-num]').forEach((e) => { const k = e.dataset.num; if (k in map) e.textContent = map[k]; });
  document.getElementById('settings-generated').textContent = new Date(summary.generatedAt).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' });
}

async function main() {
  const [summary, graph, episode] = await Promise.all([load('summary'), load('graph-viz'), load('episode')]);
  fillNumbers(summary, graph);

  // 표시 설정 (초기값도 한 번 흘러온다) — 뷰들이 만들어진 뒤 반영되도록 핸들러는 늦게 묶는다
  let view3d = null, hero = null, home = null, grayOverlap = true;
  const settings = bindSettings((key, value) => {
    if (key === 'grayOverlap') { grayOverlap = value; renderCompare(summary, { grayOverlap }); home?.setGrayOverlap(value); }
    if (key === 'autoRotate') view3d?.setAutoRotate(value);
    if (key === 'darkViz') { view3d?.setTheme(value ? 'dark' : 'light'); document.getElementById('connectome-canvas').classList.toggle('dark', value); }
  });

  // 홈 · 실험 (3D 와 무관). 조건 비교는 위 설정 초기 호출에서 이미 그렸다.
  home = renderHome(summary, graph, episode, { grayOverlap: settings.grayOverlap });
  renderExperiments(summary, episode);

  // 커넥톰 3D
  const wrap = document.getElementById('connectome-canvas');
  wrap.classList.toggle('dark', !!settings.darkViz);
  try {
    view3d = createConnectomeView(wrap, graph, { mobile, theme: settings.darkViz ? 'dark' : 'light', autoRotate: settings.autoRotate });
  } catch (err) { console.warn('3D unavailable', err); }
  const hint = document.getElementById('connectome-hint');
  if (!view3d) { document.getElementById('connectome-fallback').hidden = false; document.getElementById('connectome-controls').querySelectorAll('input, select').forEach((i) => { i.disabled = true; }); }
  else {
    const rois = [...new Set(graph.nodes.map((n) => n.roi).filter(Boolean))].sort();
    const sel = document.getElementById('roi-filter');
    for (const r of rois) sel.appendChild(el('option', { value: r }, r));
    sel.addEventListener('change', () => view3d.setRoi(sel.value));
    document.getElementById('kc-toggle').addEventListener('change', (e) => view3d.setKC(e.target.checked));
    document.getElementById('edge-toggle').addEventListener('change', (e) => view3d.setEdges(e.target.checked));
    document.getElementById('shell-toggle').addEventListener('change', (e) => view3d.setShell(e.target.checked));
    for (const t of (mobile ? ['모바일: 중간층 1/3 · 시냅스 2,000'] : []).concat(['드래그 회전', '휠 확대'])) hint.appendChild(el('span', { class: 'tag' }, t));
  }
  try { hero = createHeroView(document.getElementById('hero-canvas')); } catch (err) { console.warn('hero 3D unavailable', err); }

  // 결정 탐색 (한 번의 결정 + 스파이크) — 커넥톰 화면의 두 번째 히트맵도 같은 후보를 따라간다
  const dnTypes = graph.nodes.filter((n) => n.layer === 'output').map((n) => n.type);
  const heat2 = document.getElementById('dn-heatmap-2');
  let spikes = null;
  const decision = createDecisionView(episode, summary, dnTypes, (d, c, info) => {
    spikes?.setDecision(d, c);
    renderHeatmap(heat2, { counts: info.counts, max: info.max, ref: info.ref, dnTypes });
    document.getElementById('heat2-title').textContent = `결정 ${d + 1} · 결정 내 최대값 ${info.max}회로 정규화 · 107개`;
    document.getElementById('heat2-max').textContent = `${info.max}`;
    document.getElementById('heat2-info').textContent = `후보 ${info.n}개 중 서로 다른 DN 벡터 ${info.distinct}개` + (info.isChosen ? ' · 리저버가 고른 후보' : ` · 리저버가 고른 후보와 다른 DN ${info.changed}/107`);
  });
  spikes = createSpikesView(episode, graph, view3d);
  spikes.bindControls(document.getElementById('spikes-play'));
  spikes.bindControls(document.getElementById('connectome-play'));
  spikes.setDecision(decision.state.d, decision.state.c);

  // 결정 탐색 탭
  const tabs = [...document.querySelectorAll('#decision-tabs [data-tab]')];
  function setTab(name) {
    document.getElementById('tab-decision').hidden = name !== 'decision';
    document.getElementById('tab-spikes').hidden = name !== 'spikes';
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === name)));
    if (name === 'spikes') spikes.redraw();
  }
  tabs.forEach((t) => t.addEventListener('click', () => { const q = t.dataset.tab === 'spikes' ? '?tab=spikes' : ''; if (location.hash !== `#/decision${q}`) location.hash = `#/decision${q}`; else setTab(t.dataset.tab); }));

  // 라우터
  createRouter({
    home: () => 'page-home',
    experiments: ({ segs }) => (segs[1] ? (showExperiment(summary, episode, graph, segs[1]) ? 'page-experiment' : 'page-experiments') : 'page-experiments'),
    connectome: () => 'page-connectome',
    decision: ({ params }) => { setTab(params.tab === 'spikes' ? 'spikes' : 'decision'); return 'page-decision'; },
    compare: () => 'page-compare',
    settings: () => 'page-settings',
  }, {
    onChange(id) {
      // 화면 밖의 3D 는 렌더 루프를 멈춘다 (배터리). 돌아오면 크기를 다시 맞춘다.
      if (id === 'page-connectome') view3d?.resume(); else view3d?.pause();
      if (id === 'page-home') hero?.resume(); else hero?.pause();
      if (id === 'page-decision') spikes.redraw();
    },
  });
}

main().catch((err) => {
  console.error(err);
  const p = el('div', { class: 'card', style: 'margin:24px;color:var(--red-500);font-weight:600' }, `데이터를 읽지 못했어요: ${err.message}`);
  document.querySelector('.content').prepend(p);
  document.querySelectorAll('.page').forEach((s) => { s.hidden = true; });
});
