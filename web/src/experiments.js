// 실험 — 7단계(커넥톰 배선 제약 + 가중치 학습)의 실행들. 수치는 전부 web/data/stage7.json 실측이다.
//
// 지금 있는 실행
//   A4  C0 real · Phase A-4′ 본 학습        완료 (순위 지표 · 게이트 5기준 · 20 게임)
//   B0  C0 real · Phase B 프로토콜 기준선    완료 (50 게임 · 사망 원인 4종 · 복원 검증)
//   N1  차수 보존 재배선                     마스크만 준비 · 학습 중단
//   N2  균등 무작위                          마스크만 준비 · 미시작
//   N3  입출력 배치 순열                     마스크만 준비 · 미시작
//
// 대조군이 없는 것은 없는 대로 적는다 — 빈 칸을 채우지 않는다.
// 맨 아래에 6단계(고정 스파이킹 리저버 + 학습 리드아웃)의 완결 실험을 접어서 남긴다.

import { el, fmt, pct, icon } from './util.js';

const STATE_TAG = {
  done: ['완료', 'tag-green'],
  interrupted: ['학습 중단', 'tag-red'],
  'not-started': ['미학습', 'tag'],
};

function runsOf(s7) {
  const r = s7.ranking, g = s7.gate;
  const runs = [{
    key: 'A4', kind: 'stage7', condition: 'C0', ko: '실제 배선', en: 'real connectome',
    name: `${s7.phase} 본 학습`, state: 'done',
    tau: r.trained.tau, top1: r.trained.top1, relRegret: r.trained.relRegret,
    pieces: s7.play.gate20.piecesMedian, games: s7.play.gate20.games,
    sub: `교사 ${s7.teacher.variant} · DAgger ${s7.data.hyper.daggerRounds} 라운드 · 게이트 ${g.passCount}/${g.total}`,
  }];
  if (s7.play.base50) {
    runs.push({
      key: 'B0', kind: 'stage7', condition: 'C0', ko: '실제 배선', en: 'real connectome',
      name: 'Phase B 프로토콜 기준선', state: 'done',
      tau: r.trained.tau, top1: r.trained.top1, relRegret: r.trained.relRegret,
      pieces: s7.play.base50.piecesMedian, games: s7.play.base50.games,
      sub: `대조군과 짝지을 공유 시드 ${s7.play.base50.games} 게임 · 사망 원인 4종`,
    });
  }
  for (const n of s7.nulls) {
    runs.push({
      key: n.key, kind: 'null', condition: n.key, ko: n.ko, en: n.name, name: '대조군',
      state: n.state, tau: n.test?.tau ?? null, top1: n.test?.top1 ?? null, relRegret: n.test?.relRegret ?? null,
      pieces: n.play?.piecesMedian ?? null, games: n.play?.games ?? null,
      sub: n.maskBuilt ? `마스크 준비됨 · P ${n.P?.toLocaleString()} (C0 와 동일)` : '마스크 없음',
      nullMeta: n,
    });
  }
  return runs;
}

export function renderExperiments(s7) {
  const table = document.getElementById('exp-table');
  const chipsHost = document.getElementById('exp-chips');
  const search = document.getElementById('exp-search');
  const state = { filter: 'all', q: '' };
  const runs = runsOf(s7);

  const matches = (r) => {
    if (state.filter === 'done' && r.state !== 'done') return false;
    if (state.filter === 'todo' && r.state === 'done') return false;
    if (!state.q) return true;
    const hay = `${r.key} ${r.condition} ${r.ko} ${r.en} ${r.name} ${r.sub}`.toLowerCase();
    return state.q.split(/\s+/).every((w) => hay.includes(w));
  };

  function drawChips() {
    const counts = { all: runs.length, done: runs.filter((r) => r.state === 'done').length, todo: runs.filter((r) => r.state !== 'done').length };
    const shown = runs.filter(matches).length;
    chipsHost.replaceChildren(
      ...[['all', '전체'], ['done', '완료'], ['todo', '미학습']].map(([k, label]) => {
        const b = el('button', { class: 'chip', 'aria-pressed': String(state.filter === k) }, `${label} ${counts[k]}`);
        b.addEventListener('click', () => { state.filter = k; draw(); });
        return b;
      }),
      el('span', { class: 'count num' }, `${runs.length}개 중 ${shown}개 보는 중`),
    );
  }

  function drawTable() {
    const list = runs.filter(matches);
    const head = el('div', { class: 'thead' });
    head.append(el('div', {}, '실행'), el('div', {}, '조건'), el('div', { class: 'r' }, '결정 내 τ'), el('div', { class: 'r' }, 'top-1'), el('div', { class: 'r' }, '조각 중앙값'), el('div', { class: 'r' }, '상태'));
    const frag = document.createDocumentFragment();
    frag.append(head, el('div', { class: 'divider' }));
    if (!list.length) frag.appendChild(el('div', { class: 'empty' }, '조건에 맞는 실행이 없어요'));
    list.forEach((r, i) => {
      if (i) frag.appendChild(el('div', { class: 'divider' }));
      const a = el('a', { class: 'tr', href: `#/experiments/${r.key}` });
      const name = el('div', { class: 'td-name' });
      name.append(el('b', {}, `${r.ko} · ${r.name}`), el('span', {}, r.sub));
      const done = r.state === 'done';
      const [tag, cls] = STATE_TAG[r.state] ?? STATE_TAG['not-started'];
      a.append(
        name,
        el('div', { class: 'td-cond' }, `${r.condition} ${r.en}`),
        el('div', { class: `r${r.condition === 'C0' ? ' brand' : done ? '' : ' dim'}` }, done ? fmt(r.tau, 3) : '—'),
        el('div', { class: `r${done ? '' : ' dim'}` }, done ? pct(r.top1, 1) : '—'),
        el('div', { class: `r${done ? '' : ' dim'}` }, r.pieces !== null && r.pieces !== undefined ? `${r.pieces}` : '—'),
        (() => { const d = el('div', { class: 'td-status' }); d.appendChild(el('span', { class: `tag ${cls}` }, tag)); return d; })(),
      );
      frag.appendChild(a);
    });
    table.replaceChildren(frag);
  }

  function draw() { drawChips(); drawTable(); }
  search.addEventListener('input', () => { state.q = search.value.trim().toLowerCase(); draw(); });
  draw();

  // ---------- 6단계 보관 ----------
  const arch = document.getElementById('exp-stage6');
  if (!s7.stage6) { arch.hidden = true; return; }
  const s6 = s7.stage6;
  const det = el('details', { class: 'card archive' });
  det.appendChild(el('summary', {}, `이전 단계 — 6단계 고정 스파이킹 리저버 + 학습 리드아웃 (${s6.conditions.length}개 실행, ${new Date(s6.generatedAt).toLocaleDateString('ko-KR')})`));
  det.appendChild(el('p', { class: 'card-note' }, `배선과 가중치를 모두 커넥톰에서 가져와 고정하고 리드아웃(${s6.combo})만 학습한 별개의 완결 실험이에요. 결정 내 순위 정보가 없다는 음성 결과로 끝났고, 7단계는 여기서 "가중치를 학습한다"로 바꾼 거예요. 삭제하지 않고 그대로 남겨 둬요.`));
  const t = el('table', { class: 'mini-table' });
  t.innerHTML = '<thead><tr><th>실행</th><th>조건</th><th class="r">τ</th><th class="r">R²</th><th class="r">줄 중앙값</th><th class="r">상태</th></tr></thead>';
  const tb = el('tbody');
  for (const r of s6.conditions) {
    const tr = el('tr', { class: r.key === 'C0' ? 'on' : '' });
    tr.append(
      el('td', {}, r.key), el('td', {}, `${r.condition} ${r.name}`),
      el('td', { class: 'r' }, r.tau === null ? '—' : fmt(r.tau, 3)),
      el('td', { class: 'r' }, r.r2 === null ? '—' : fmt(r.r2, 3)),
      el('td', { class: 'r' }, r.linesMedian === null ? '—' : `${r.linesMedian}`),
      el('td', { class: 'r' }, r.region === 'ok' ? '완료' : '동작 영역 없음'),
    );
    tb.appendChild(tr);
  }
  t.appendChild(tb);
  const wrap = el('div', { class: 'table-wrap' }); wrap.appendChild(t);
  det.appendChild(wrap);
  arch.replaceChildren(det);
}

// ---------- 상세 ----------
export function showExperiment(s7, key) {
  const runs = runsOf(s7);
  const r = runs.find((x) => x.key === key);
  if (!r) return false;
  document.getElementById('exp-title').textContent = `${r.ko} · ${r.name}`;
  const [tag, cls] = STATE_TAG[r.state] ?? STATE_TAG['not-started'];
  document.getElementById('exp-status').replaceChildren(el('span', { class: `tag ${cls}` }, tag));
  document.getElementById('exp-params').textContent = `${r.condition} ${r.en} · N ${s7.model.N.toLocaleString()} · E ${s7.model.E.toLocaleString()} · P ${s7.model.P.toLocaleString()} · T ${s7.model.T}`;
  const actions = document.getElementById('exp-actions');
  actions.replaceChildren(
    (() => { const a = el('a', { class: 'btn btn-secondary', href: 'https://github.com/stx4R/Fly#readme', target: '_blank', rel: 'noopener' }, '보고서 '); a.appendChild(icon('i-ext')); return a; })(),
    el('a', { class: 'btn btn-primary', href: r.state === 'done' ? '#/versus' : '#/compare' }, r.state === 'done' ? '이 모델과 대전하기' : '조건 비교에서 보기'),
  );

  const body = document.getElementById('exp-body');
  const kv = (title, pairs) => {
    const card = el('div', { class: 'card' });
    card.appendChild(el('div', { class: 'card-title' }, title));
    const list = el('div', { class: 'kv' });
    pairs.forEach(([k, v, desc], i) => {
      if (i) list.appendChild(el('div', { class: 'divider' }));
      const row = el('div', { class: 'row' });
      const g = el('div', { class: 'grow' });
      g.appendChild(el('div', { class: 'title' }, k));
      if (desc) g.appendChild(el('div', { class: 'desc' }, desc));
      row.append(g, el('div', { class: 'val num' }, v));
      list.appendChild(row);
    });
    card.appendChild(list);
    return card;
  };
  const kpi = (label, value, sub) => { const k = el('div', { class: 'card kpi' }); k.append(el('div', { class: 'label' }, label), el('div', { class: 'value' }, value), el('div', { class: 'sub' }, sub)); return k; };

  const out = [];
  const intro = el('div', { class: 'card notice' });

  if (r.kind === 'null') {
    const n = r.nullMeta;
    intro.innerHTML = `<div class="grow"><div class="title">${n.key} ${n.name} · ${n.ko}</div><div class="sub">${n.desc} 분리하려는 것: ${n.separatesWhat ?? '—'}</div></div>`;
    out.push(intro);
    const card = el('div', { class: 'card tint' });
    card.innerHTML = `<div class="card-title">아직 학습하지 않았어요</div>
      <p>마스크는 만들어져 있고 sanity 도 통과했지만 (${n.builtAt ? new Date(n.builtAt).toLocaleString('ko-KR') : '—'}), 가중치 학습은 ${n.state === 'interrupted' ? `${n.startedAt ? new Date(n.startedAt).toLocaleString('ko-KR') : ''} 에 시작했다가 중단됐어요` : '아직 시작하지 않았어요'}.
      그래서 이 조건의 τ · top-1 · 플레이 수치는 <b>없어요</b>. 없는 값을 추정해서 채우지 않아요.</p>`;
    out.push(card);
    out.push(kv('마스크 sanity (실측)', [
      ['파라미터 수 P', `${n.P?.toLocaleString() ?? '—'}`, `C0 와 같아야 해요 (기대 ${n.sanity?.expectedP?.toLocaleString() ?? '—'})`],
      ['뉴런 · 간선', `${n.N?.toLocaleString() ?? '—'} · ${n.E?.toLocaleString() ?? '—'}`, 'C0 와 동일'],
      ['차수 분포 보존', n.sanity?.degreeIdentical === null ? '—' : n.sanity?.degreeIdentical ? '예' : '아니오'],
      ['원본 간선 교집합', n.sanity?.edgeOverlapWithOriginal != null ? pct(n.sanity.edgeOverlapWithOriginal, 2) : '—', n.sanity?.chanceOverlap != null ? `우연 수준 ${pct(n.sanity.chanceOverlap, 2)}` : ''],
    ]));
    body.replaceChildren(...out);
    return true;
  }

  const rank = s7.ranking, play = r.key === 'B0' ? s7.play.base50 : s7.play.gate20;
  intro.innerHTML = `<div class="grow"><div class="title">${r.condition} ${r.en} · ${r.name}</div>
    <div class="sub">커넥톰에서 오는 것은 배선(희소성 마스크 ${s7.model.E.toLocaleString()} 간선)뿐이고, 마스크가 1인 자리의 가중치 ${s7.model.P.toLocaleString()}개는 학습된 값이에요.
    교사는 ${s7.teacher.label}, 학습 데이터는 결정 ${s7.data.trainDecisions.toLocaleString()}개예요. ${r.sub}</div></div>`;
  out.push(intro);

  const kpis = el('div', { class: 'kpis' });
  kpis.append(
    kpi('결정 내 켄달 τ', fmt(rank.trained.tau, 3), `CI ${rank.trained.tauCI ? `[${fmt(rank.trained.tauCI[0], 3)}, ${fmt(rank.trained.tauCI[1], 3)}]` : '—'} · 테스트 결정 ${rank.decisions.toLocaleString()}개`),
    kpi('top-1', pct(rank.trained.top1, 1), `CI [${pct(rank.trained.top1CI[0], 1)}, ${pct(rank.trained.top1CI[1], 1)}] · 우연 ${pct(rank.chance.top1, 1)}`),
    kpi('상대 regret', fmt(rank.trained.relRegret, 3), `학습 전 ${fmt(rank.untrained.relRegret, 3)} · 우연 ${fmt(rank.chance.relRegret, 3)}`),
    kpi('조각 중앙값', `${play.piecesMedian}`, `${play.games} 게임 · CI [${fmt(play.piecesMedianCI?.[0], 0)}, ${fmt(play.piecesMedianCI?.[1], 0)}] · 교사 ${s7.teacher.play.piecesMedian}`),
  );
  out.push(kpis);

  if (r.key === 'A4') {
    const g = s7.gate;
    const gc = el('div', { class: 'card' });
    gc.appendChild(el('div', { class: 'card-title' }, `게이트 ${g.passCount} / ${g.total} — 교사 대비 기준`));
    const list = el('div', { class: 'kv' });
    g.criteria.forEach((c, i) => {
      if (i) list.appendChild(el('div', { class: 'divider' }));
      const row = el('div', { class: 'row' });
      const grow = el('div', { class: 'grow' });
      grow.append(el('div', { class: 'title' }, c.label), el('div', { class: 'desc' }, `${c.desc}${c.teacher != null ? ` · 교사 ${fmt(c.teacher, 1)}` : ''}`));
      row.append(grow, el('div', { class: 'val num' }, `${fmt(c.measured, 3)} ${c.lower ? '≤' : '≥'} ${fmt(c.threshold, 2)}`), el('span', { class: `tag ${c.passed ? 'tag-green' : 'tag-red'}` }, c.passed ? '통과' : '미달'));
      list.appendChild(row);
    });
    gc.append(list, el('p', { class: 'card-note' }, '조각과 공격이 교사 대비 기준에 못 미쳐 여기서 멈췄어요. 순위 지표는 올랐는데 플레이 길이는 따라오지 않았다는 뜻이에요.'));
    out.push(gc);

    if (s7.rounds.length) {
      const rc = el('div', { class: 'card' });
      rc.appendChild(el('div', { class: 'card-title' }, `DAgger 라운드 ${s7.rounds.length}개`));
      const t = el('table', { class: 'mini-table' });
      t.innerHTML = '<thead><tr><th>라운드</th><th class="r">상대 regret</th><th class="r">top-1</th><th class="r">τ</th><th class="r">빠른 플레이 조각</th><th class="r">정책 일치율</th></tr></thead>';
      const tb = el('tbody');
      for (const x of s7.rounds) {
        const tr = el('tr');
        tr.append(el('td', {}, `r${x.round}`), el('td', { class: 'r' }, fmt(x.relRegret, 4)), el('td', { class: 'r' }, pct(x.top1, 1)), el('td', { class: 'r' }, fmt(x.tau, 3)), el('td', { class: 'r' }, `${x.quickPiecesMedian}`), el('td', { class: 'r' }, x.onPolicyAgreement == null ? '—' : pct(x.onPolicyAgreement, 1)));
        tb.appendChild(tr);
      }
      t.appendChild(tb);
      const wrap = el('div', { class: 'table-wrap' }); wrap.appendChild(t);
      rc.append(wrap, el('p', { class: 'card-note' }, '순위 지표(regret·top-1)는 라운드를 거치며 조금씩 좋아지지만 빠른 플레이의 조각 수는 따라 오르지 않아요.'));
      out.push(rc);
    }
  }

  if (r.key === 'B0' && s7.play.deaths50) {
    const d = s7.play.deaths50;
    const dc = el('div', { class: 'card' });
    dc.appendChild(el('div', { class: 'card-title' }, `사망 원인 ${d.total} 게임`));
    const list = el('div', { class: 'kv' });
    const KO = { garbage: '가비지에 눌림', 'well-fill': '우물을 스스로 메움', holes: '구멍 누적', stack: '스택이 천장까지' };
    Object.entries(d.counts).forEach(([k, v], i) => {
      if (i) list.appendChild(el('div', { class: 'divider' }));
      const row = el('div', { class: 'row' });
      const g = el('div', { class: 'grow' }); g.appendChild(el('div', { class: 'title' }, KO[k] ?? k));
      row.append(g, el('div', { class: 'val num' }, `${v} / ${d.total} (${pct(v / d.total, 0)})`));
      list.appendChild(row);
    });
    dc.append(list, el('p', { class: 'card-note' }, `생존 ${pct(play.survival, 0)} · 가비지 사망 비율 ${pct(d.garbageDeathShare, 0)} · hold 사용 ${fmt(s7.play.holdsPerPiece.student50, 3)}/조각 (교사 ${fmt(s7.play.holdsPerPiece.teacher, 3)}).`));
    out.push(dc);
  }

  const w = s7.weights;
  const grid = el('div', { class: 'detail-grid' });
  grid.append(
    kv('플레이', [
      ['게임 수', `${play.games}`, `상한 ${s7.play.gate20.games === play.games ? '1000' : '1000'} 조각`],
      ['조각 중앙값', `${play.piecesMedian}`, `사분위 ${play.piecesQuartiles?.join(' · ') ?? '—'}`],
      ['공격 중앙값', `${play.attackMedian}`, `1000 조각당 ${fmt(play.attackPer1000, 1)}`],
      ['테트리스', `${play.tetrises}회`, `중앙값 ${play.tetrisMedian} · 줄 점유 ${pct(play.tetrisLineShare, 1)}`],
      ['생존율', pct(play.survival, 0), `무작위 배치 기준선 조각 ${s7.play.random?.piecesMedian ?? '—'}`],
    ]),
    kv('배선이 학습으로 움직인 정도', [
      ['corr(초기, 최종)', fmt(w.corr, 3), '초기값은 커넥톰 시냅스 수를 정규화한 값이에요'],
      ['평균 |Δw|', fmt(w.meanAbsDelta, 4), `초기 평균 가중치 ${fmt(w.meanInit, 5)}`],
      ['억제성 비율', pct(w.inhibitoryFrac, 1), '커넥톰 가중치는 전부 양수라 초기에는 0%였어요'],
      ['‖W‖', `${fmt(w.normInit, 2)} → ${fmt(w.normFinal, 2)}`],
      ['W_in 보드 열 corr', fmt(w.input.board.corr, 3), '3단계 가우시안 RF 초기값 대비'],
    ]),
    kv('데이터 · 하이퍼', [
      ['학습 결정', s7.data.trainDecisions.toLocaleString(), `검증 ${s7.data.valDecisions.toLocaleString()} · 테스트 ${s7.data.testDecisions.toLocaleString()}`],
      ['손실', `${s7.data.hyper.loss} (λ ${s7.data.hyper.lambda}, μ ${s7.data.hyper.mu})`, `K ${s7.data.hyper.K} · DAgger ${s7.data.hyper.daggerRounds}`],
      ['정규화', `dropout ${s7.data.hyper.dropoutZ} / ${s7.data.hyper.dropoutH}`, `weight decay ${s7.data.hyper.weightDecay}`],
      ['수집 파일', s7.data.dataFile],
      ['걸린 시간', `${fmt(s7.elapsedHours, 2)} h`, new Date(s7.ranAt).toLocaleString('ko-KR')],
    ]),
    kv('모델', [
      ['뉴런 · 간선', `${s7.model.N.toLocaleString()} · ${s7.model.E.toLocaleString()}`],
      ['입력 · 출력', `${s7.model.nInput.toLocaleString()} · ${s7.model.nOutput}`, 'LC/LPLC → DN'],
      ['파라미터 P', s7.model.P.toLocaleString(), `W ${s7.model.sizes.W.toLocaleString()} · W_in ${s7.model.sizes.Win.toLocaleString()} · b ${s7.model.sizes.b.toLocaleString()} · 리드아웃 ${s7.model.sizes.readout.toLocaleString()}`],
      ['창 T · ρ_unit', `${s7.model.T} · ${fmt(s7.model.rhoUnit, 4)}`],
    ]),
  );
  out.push(grid);
  body.replaceChildren(...out);
  return true;
}
