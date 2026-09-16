// 진입점. 데이터(summary, graph, episode)를 읽고 4개 섹션을 올린다. 3D 가 실패해도 S2·S4 는 동작한다.

import { createConnectomeView, createHeroView } from './connectome.js';
import { createDecisionView } from './decision.js';
import { createSpikesView } from './spikes.js';
import { renderCompare } from './compare.js';
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

function fillNumbers(summary, graph, episode) {
  const c0 = summary.conditions.find((r) => r.key === 'C0');
  const map = {
    'c0.tau': fmt(c0.regression.tau, 3),
    'c0.tauCI': `${fmt(c0.regression.tauCI[0], 3)}, ${fmt(c0.regression.tauCI[1], 3)}`,
    'c0.lines': `${c0.play.linesMedian}`,
    'c0.pieces': `${c0.play.piecesMedian}`,
    'graph.nodes': graph.nodes.length.toLocaleString(),
    'graph.edges': graph.edges.length.toLocaleString(),
    'op.T': `${summary.operating.T}`,
  };
  document.querySelectorAll('[data-num]').forEach((e) => { const k = e.dataset.num; if (k in map) e.textContent = map[k]; });
}

async function main() {
  const [summary, graph, episode] = await Promise.all([load('summary'), load('graph-viz'), load('episode')]);
  fillNumbers(summary, graph, episode);

  // S4 먼저 (3D 와 무관)
  renderCompare(summary);

  // S1
  let view3d = null;
  const wrap = document.getElementById('connectome-canvas');
  try {
    view3d = createConnectomeView(wrap, graph, { mobile });
  } catch (err) { console.warn('3D unavailable', err); }
  if (!view3d) document.getElementById('connectome-fallback').hidden = false;
  else {
    const rois = [...new Set(graph.nodes.map((n) => n.roi).filter(Boolean))].sort();
    const sel = document.getElementById('roi-filter');
    for (const r of rois) sel.appendChild(el('option', { value: r }, r));
    sel.addEventListener('change', () => view3d.setRoi(sel.value));
    document.getElementById('kc-toggle').addEventListener('change', (e) => view3d.setKC(e.target.checked));
    document.getElementById('edge-toggle').addEventListener('change', (e) => view3d.setEdges(e.target.checked));
    document.getElementById('shell-toggle').addEventListener('change', (e) => view3d.setShell(e.target.checked));
    document.getElementById('connectome-hint').textContent = `${mobile ? '모바일: 중간층 1/3, 시냅스 2,000개로 축소 · ' : ''}drag 회전 · wheel 확대`;
  }
  try { createHeroView(document.getElementById('hero-canvas')); } catch (err) { console.warn('hero 3D unavailable', err); }

  // S2 + S3
  const dnTypes = graph.nodes.filter((n) => n.layer === 'output').map((n) => n.type);
  let spikes = null;
  const decision = createDecisionView(episode, summary, dnTypes, (d, c) => spikes?.setDecision(d, c));
  spikes = createSpikesView(episode, graph, view3d);
  spikes.setDecision(decision.state.d, decision.state.c);
}

main().catch((err) => {
  console.error(err);
  const p = el('p', { class: 'caption', style: 'color:#fb923c' }, `데이터를 읽지 못했습니다: ${err.message}`);
  document.querySelector('main').prepend(p);
});
