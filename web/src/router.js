// 해시 라우터. GitHub Pages 정적 호스팅이라 경로는 전부 #/ 뒤에 둔다.
//  #/            홈          #/experiments        실험 목록      #/experiments/C3s1   실험 상세
//  #/connectome  커넥톰      #/decision           결정 탐색      #/compare            조건 비교      #/settings  설정
// 페이지는 전부 index.html 에 미리 있고 라우터는 hidden 만 토글한다 (3D 뷰·재생 상태가 화면을 오가도 유지되게).

export function parseHash(hash = location.hash) {
  const raw = hash.replace(/^#\/?/, '');
  const [pathPart, query = ''] = raw.split('?');
  const segs = pathPart.split('/').filter(Boolean);
  const params = Object.fromEntries(new URLSearchParams(query));
  return { segs, params, page: segs[0] || 'home' };
}

export function createRouter(routes, { onChange } = {}) {
  const pages = [...document.querySelectorAll('.page')];
  const navLinks = [...document.querySelectorAll('.nav a[data-route]')];
  let current = null;

  function show(id) {
    for (const p of pages) p.hidden = p.id !== id;
    const page = document.getElementById(id);
    const route = page?.dataset.page;
    for (const a of navLinks) { if (a.dataset.route === route) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); }
    document.title = `${page?.dataset.title ?? 'Fly'} — Fly · 초파리 커넥톰 리저버`;
    return page;
  }

  function resolve() {
    const r = parseHash();
    const handler = routes[r.page] ?? routes.home;
    const id = handler(r) ?? 'page-home';
    const prev = current;
    current = id;
    show(id);
    scrollTo({ top: 0, behavior: 'instant' });
    onChange?.(id, prev, r);
  }

  addEventListener('hashchange', resolve);
  resolve();
  return { resolve, get current() { return current; } };
}

export const go = (hash) => { location.hash = hash; };
