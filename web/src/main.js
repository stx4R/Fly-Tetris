// 진입점. 데이터(graph-viz, stage7)와 대전 기록을 읽고 화면들을 올린 뒤 해시 라우터로 오간다.
// 화면은 전부 미리 마운트하고 hidden 만 토글하므로 3D 뷰·재생 상태가 화면을 오가도 유지된다. 3D 가 실패해도 나머지는 동작한다.
//
// 대전에서 나오는 값(커넥톰 · 결정 탐색 · 신경 활동 · 플레이 분석 · 대전 기록 · 홈의 전적)은 matchlog 에서,
// 오프라인 실측(홈의 연구 수치 · 실험 · 조건 비교)은 web/data/stage7.json 에서 온다.

import { createConnectomeView, createHeroView } from './connectome.js';
import { createDecisionView } from './decision.js';
import { createActivityView } from './activity.js';
import { createAnalysisView } from './analysis.js';
import { createMatchesView } from './matches.js';
import { createVersusView } from './versus.js';
import { renderCompare } from './compare.js';
import { renderHome } from './home.js';
import { renderExperiments, showExperiment } from './experiments.js';
import { bindSettings, KEY_HELP, TUNE_META } from './settings.js';
import { loadMatchLog, subscribe } from './matchlog.js';
import { emptyCard } from './empty.js';
import { createRouter } from './router.js';
import { el, fmt, pct } from './util.js';

const mobile = matchMedia('(max-width: 767px)').matches || (navigator.hardwareConcurrency ?? 8) <= 4;

// ?debug: 콘솔 오류를 DOM(#debug-log)에 모아 headless 점검에서 읽을 수 있게 한다. 배포 페이지 동작에는 영향 없음.
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

// [data-num] 자리에 실측값을 꽂는다. 화면 문구가 인용하는 수치는 전부 여기를 거친다.
function fillNumbers(s7, graph) {
  const kc = graph.nodes.filter((n) => n.layer === 'hidden' && n.isKC).length;
  const map = {
    'm.N': s7.model.N.toLocaleString(),
    'm.E': s7.model.E.toLocaleString(),
    'm.P': s7.model.P.toLocaleString(),
    'm.T': `${s7.model.T}`,
    'm.nOut': `${s7.model.nOutput}`,
    'm.phase': s7.phase,
    'gate.pass': `${s7.gate.passCount}/${s7.gate.total}`,
    'rank.tau': fmt(s7.ranking.trained.tau, 3),
    'rank.top1': pct(s7.ranking.trained.top1, 1),
    'rank.regret': fmt(s7.ranking.trained.relRegret, 3),
    'play.pieces': `${s7.play.gate20.piecesMedian}`,
    'teacher.pieces': `${s7.teacher.play.piecesMedian}`,
    'graph.nodes': graph.nodes.length.toLocaleString(),
    'graph.edges': graph.edges.length.toLocaleString(),
    'graph.input': `${graph.meta.counts.input}`,
    'graph.hidden': `${graph.meta.counts.hidden}`,
    'graph.output': `${graph.meta.counts.output}`,
    'graph.kcPct': `${(100 * kc / graph.meta.counts.hidden).toFixed(1)}%`,
  };
  document.querySelectorAll('[data-num]').forEach((e) => { const k = e.dataset.num; if (k in map) e.textContent = map[k]; });
  const gen = document.getElementById('settings-generated');
  if (gen) gen.textContent = new Date(s7.generatedAt).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' });
}

// 설정 화면의 조작 슬라이더·키 안내는 메타에서 만든다 (마크업 중복을 줄이고 범위를 한 곳에 둔다).
function buildSettingsControls() {
  const host = document.getElementById('settings-tuning');
  const rows = Object.entries(TUNE_META).flatMap(([key, m], i) => {
    const row = el('div', { class: 'row lg' });
    const grow = el('div', { class: 'grow' });
    grow.append(el('div', { class: 'title' }, m.label), el('div', { class: 'desc' }, m.desc));
    const ctrl = el('div', { class: 'slider' });
    const input = el('input', { type: 'range', min: String(m.min), max: String(m.max), step: String(m.step), 'data-tune': key, 'aria-label': m.label });
    ctrl.append(el('output', { id: `${key}-out`, class: 'num' }), input);
    row.append(grow, ctrl);
    return i ? [el('div', { class: 'divider' }), row] : [row];
  });
  host.replaceChildren(...rows);

  const keys = document.getElementById('settings-keys');
  keys.replaceChildren(...KEY_HELP.map(([ks, label]) => {
    const s = el('span');
    for (const k of ks) s.appendChild(el('kbd', {}, k));
    s.appendChild(el('em', {}, label));
    return s;
  }));
}

async function main() {
  const [graph, s7] = await Promise.all([load('graph-viz'), load('stage7')]);
  fillNumbers(s7, graph);
  buildSettingsControls();
  await loadMatchLog();

  let view3d = null, hero = null, home = null;
  const settings = bindSettings((key, value) => {
    if (key === 'autoRotate') view3d?.setAutoRotate(value);
    if (key === 'darkViz') { view3d?.setTheme(value ? 'dark' : 'light'); document.getElementById('connectome-canvas')?.classList.toggle('dark', value); }
  });

  // 오프라인 실측 화면
  home = renderHome(s7, graph);
  renderExperiments(s7);
  renderCompare(s7);

  // 커넥톰 3D
  const wrap = document.getElementById('connectome-canvas');
  wrap.classList.toggle('dark', !!settings.darkViz);
  try {
    view3d = createConnectomeView(wrap, graph, { mobile, theme: settings.darkViz ? 'dark' : 'light', autoRotate: settings.autoRotate });
  } catch (err) { console.warn('3D unavailable', err); }
  const hint = document.getElementById('connectome-hint');
  if (!view3d) {
    document.getElementById('connectome-fallback').hidden = false;
    document.getElementById('connectome-controls').querySelectorAll('input, select').forEach((i) => { i.disabled = true; });
  } else {
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

  // 대전에서 나오는 화면들
  const dnTypes = graph.nodes.filter((n) => n.layer === 'output').map((n) => n.type);
  const activity = createActivityView(graph, view3d);
  const decision = createDecisionView((dec) => {
    activity.setDecision(dec);
    // 커넥톰 화면의 히트맵·요약도 같은 결정을 따라간다
    paintConnectomeSide(dec);
  });
  decision.setDnTypes(dnTypes);
  activity.bindControls(document.getElementById('act-play'));
  activity.bindControls(document.getElementById('connectome-play'));

  const matches = createMatchesView();
  const analysis = createAnalysisView(s7);

  // 커넥톰 화면 — 3D 위에 점등할 대전 데이터가 있는지에 따라 빈 상태 ↔ 결정 요약
  function paintConnectomeSide(dec) {
    const host = document.getElementById('connectome-decision');
    const emptyHost = document.getElementById('connectome-empty');
    const playRow = document.getElementById('connectome-play');
    if (!host) return;
    if (emptyHost) emptyHost.hidden = !!dec;
    if (playRow) playRow.hidden = !dec;
    if (!dec) {
      host.hidden = true;
      host.replaceChildren();
      if (emptyHost) emptyHost.replaceChildren(emptyCard({
        desc: '아래 3D 는 커넥톰 자체(배선)예요. 여기에 점등할 뉴런 활성은 대전에서 초파리가 수를 둘 때 생겨요.',
        cta: '대전하기', href: '#/versus',
        hint: '한 판 두면 결정마다 25 스텝의 활성을 재생할 수 있어요',
      }));
      return;
    }
    host.hidden = false;
    const q = dec.trace;
    host.innerHTML = `<div class="card-title">지금 재생 중인 결정</div>
      <div class="card-sub num">조각 ${dec.pieces + 1}번째 · 후보 ${dec.candidates.length}개 · 생각 ${dec.ms} ms</div>
      <p class="card-note num">표본 ${q ? q.n.toLocaleString() : '—'} 뉴런 · 창 ${q ? q.T : s7.model.T} 스텝 · 활성 범위 ${q ? `${fmt(q.min, 3)} ~ ${fmt(q.max, 3)}` : '—'}.
      점의 크기와 색이 그 스텝의 |활성| 세기예요.</p>`;
  }

  // 대전
  const versus = createVersusView({
    settings,
    sampled: graph.nodes.map((n) => n.i),
    onRecord: () => { refreshAll(); },
  });

  let refreshTimer = 0;
  function refreshAll() {
    // 대전 중에는 결정이 초당 몇 개씩 들어온다 — 화면 갱신은 묶어서 한다.
    if (refreshTimer) return;
    refreshTimer = setTimeout(() => {
      refreshTimer = 0;
      home.refresh();
      decision.refresh();
      matches.refresh();
      analysis.refresh();
    }, 400);
  }
  subscribe(() => refreshAll());

  // 첫 렌더
  decision.render();
  matches.render();
  analysis.render();
  if (!decision.decision) { activity.setDecision(null); paintConnectomeSide(null); }

  // 라우터
  createRouter({
    home: () => 'page-home',
    versus: () => 'page-versus',
    matches: () => 'page-matches',
    connectome: () => 'page-connectome',
    decision: () => 'page-decision',
    activity: () => 'page-activity',
    analysis: () => 'page-analysis',
    experiments: ({ segs }) => (segs[1] ? (showExperiment(s7, segs[1]) ? 'page-experiment' : 'page-experiments') : 'page-experiments'),
    compare: () => 'page-compare',
    settings: () => 'page-settings',
  }, {
    onChange(id) {
      // 화면 밖의 3D 는 렌더 루프를 멈춘다 (배터리). 돌아오면 크기를 다시 맞춘다.
      if (id === 'page-connectome') view3d?.resume(); else view3d?.pause();
      if (id === 'page-home') hero?.resume(); else hero?.pause();
      if (id === 'page-versus') versus.activate(); else versus.deactivate();
      if (id === 'page-activity') activity.redraw();
      if (id === 'page-decision') decision.refresh();
      if (id === 'page-matches') matches.refresh();
      if (id === 'page-analysis') analysis.refresh();
    },
  });
}

main().catch((err) => {
  console.error(err);
  const p = el('div', { class: 'card', style: 'margin:24px;color:var(--red-500);font-weight:600' }, `데이터를 읽지 못했어요: ${err.message}`);
  document.querySelector('.content').prepend(p);
  document.querySelectorAll('.page').forEach((s) => { s.hidden = true; });
});
