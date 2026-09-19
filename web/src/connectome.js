// 커넥톰: 서브샘플 3D (three.js). InstancedMesh 점 + LineSegments 간선 + 반투명 뇌 껍질 GLB.
// highlightActivity(values) 로 대전 재생 시 뉴런을 활성 세기만큼 점등한다 (7단계 모델은 rate RNN 이라 스파이크가 아니라 활성값이다).
// WebGL 이 없으면 null 을 돌려주고 폴백 문구를 보인다.
// setTheme('light'|'dark') 로 배경에 맞춰 층 색을 바꾸고, pause()/resume() 으로 화면 밖에서는 렌더 루프를 멈춘다.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 뉴런 좌표계(정규화 hemibrain: 최장 축이 [-1,1], x 폭 ≈1.86 · y 폭 ≈1.66 · z 폭 ≈2.0)에 brain_shell.glb(bbox x ±0.87, y ±0.95, z ±0.55)를
// 맞추는 수동 보정 상수. 껍질의 얇은 축(z)이 뉴런 구름의 y 에 오도록 x 축으로 -90° 돌리고, 축별로 구름 폭에 맞춰 늘린 뒤 5% 여유.
// 이 값들은 시각적 정렬 판단이며 해부학적 정합이 아니다.
export const SHELL_ALIGN = { rotationX: -Math.PI / 2, scale: [1.86 / 1.74 * 1.05, 2.0 / 1.89 * 1.05, 1.66 / 1.09 * 1.05], offset: [0, 0, 0] };

// 토스 토큰 hex. 밝은 배경: 입력 blue-500 · 중간 grey-400 · KC yellow-500 · DN grey-900 · 점등 blue-500 (나머지는 grey-200 으로 가라앉힘).
// 어두운 배경(navy-900): DN 을 흰색에 가깝게, 점등은 노랑.
const THEMES = {
  light: { input: 0x2887ee, hidden: 0xa7b0b9, kc: 0xfcc63e, output: 0x141f2c, spike: 0x2887ee, dim: 0xdee3e7, shell: 0x2887ee, shellOpacity: 0.07, edgeOpacity: 0.16 },
  dark: { input: 0x2887ee, hidden: 0x87919c, kc: 0xfcc63e, output: 0xf6f8fa, spike: 0xfff1a8, dim: 0x2d3a48, shell: 0x8fb3ff, shellOpacity: 0.1, edgeOpacity: 0.18 },
};
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function createConnectomeView(container, graph, { mobile = false, assetBase = '', theme = 'light', autoRotate = !reduced } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true, powerPreference: 'low-power' });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 2));
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 50);
  camera.position.set(0, 0.55, 2.8);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08; controls.minDistance = 1.2; controls.maxDistance = 8;
  controls.autoRotate = autoRotate && !reduced; controls.autoRotateSpeed = 0.4;
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 1.2); key.position.set(2, 3, 4); scene.add(key);

  // 모바일: 중간층 1/3, 간선 2,000 개
  const nodes = mobile ? graph.nodes.filter((n, i) => n.layer !== 'hidden' || i % 3 === 0) : graph.nodes;
  const keep = new Map(nodes.map((n, k) => [graph.nodes.indexOf(n), k]));
  const edges = (mobile ? graph.edges.slice(0, 2000) : graph.edges).filter(([a, b]) => keep.has(a) && keep.has(b)).map(([a, b, w]) => [keep.get(a), keep.get(b), w]);
  const N = nodes.length;
  let palette = THEMES[theme] ?? THEMES.light;

  // 점
  const geom = new THREE.SphereGeometry(0.011, 8, 6);
  const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const mesh = new THREE.InstancedMesh(geom, mat, N);
  const base = new Float32Array(N * 3);
  const dummy = new THREE.Object3D();
  const colorOf = (n) => (n.layer === 'input' ? palette.input : n.layer === 'output' ? palette.output : n.isKC ? palette.kc : palette.hidden);
  const sizeOf = (n) => (n.layer === 'output' ? 1.6 : n.layer === 'input' ? 1.1 : 1);
  const c = new THREE.Color();
  nodes.forEach((n, k) => {
    base.set(n.xyz, k * 3);
    dummy.position.set(n.xyz[0], n.xyz[1], n.xyz[2]);
    dummy.scale.setScalar(sizeOf(n));
    dummy.updateMatrix();
    mesh.setMatrixAt(k, dummy.matrix);
    mesh.setColorAt(k, c.setHex(colorOf(n)));
  });
  mesh.instanceMatrix.needsUpdate = true; mesh.instanceColor.needsUpdate = true;
  scene.add(mesh);

  // 간선 (양 끝 뉴런 색)
  const pos = new Float32Array(edges.length * 6);
  const col = new Float32Array(edges.length * 6);
  const eg = new THREE.BufferGeometry();
  function paintEdges() {
    edges.forEach(([a, b], e) => {
      pos.set(nodes[a].xyz, e * 6); pos.set(nodes[b].xyz, e * 6 + 3);
      c.setHex(colorOf(nodes[a])); col.set([c.r, c.g, c.b], e * 6);
      c.setHex(colorOf(nodes[b])); col.set([c.r, c.g, c.b], e * 6 + 3);
    });
    eg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    eg.setAttribute('color', new THREE.BufferAttribute(col, 3));
  }
  paintEdges();
  const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: palette.edgeOpacity });
  const lines = new THREE.LineSegments(eg, lineMat);
  scene.add(lines);

  // 뇌 껍질
  const shell = new THREE.Group();
  shell.rotation.x = SHELL_ALIGN.rotationX;
  shell.scale.set(...SHELL_ALIGN.scale);
  shell.position.set(...SHELL_ALIGN.offset);
  scene.add(shell);
  const shellMat = new THREE.MeshPhysicalMaterial({ color: palette.shell, transparent: true, opacity: palette.shellOpacity, roughness: 0.6, metalness: 0, side: THREE.DoubleSide, depthWrite: false });
  new GLTFLoader().load(`${assetBase}models/brain_shell.glb`, (gltf) => {
    gltf.scene.traverse((o) => { if (o.isMesh) o.material = shellMat; });
    shell.add(gltf.scene);
    render();
  }, undefined, () => { /* 껍질 없이도 동작 */ });

  // 필터 상태
  // activity: 뷰 인덱스별 0..1 활성 세기 (Float32Array) 또는 null. null 이면 층 색 그대로 그린다.
  const state = { roi: '', showKC: true, showEdges: true, showShell: true, activity: null };
  const dimColor = new THREE.Color(), litColor = new THREE.Color();
  function applyFilters() {
    const act = state.activity;
    if (act) { dimColor.setHex(palette.dim); litColor.setHex(palette.spike); }
    nodes.forEach((n, k) => {
      const visible = (state.showKC || !n.isKC) && (!state.roi || n.roi === state.roi || n.layer === 'output');
      const a = act ? act[k] : 0;
      // 활성 세기를 크기와 색에 같이 싣는다 (0 = 가라앉음, 1 = 완전 점등)
      const s = (visible ? 1 : 0) * sizeOf(n) * (act ? 0.6 + a * 1.7 : 1);
      dummy.position.set(base[k * 3], base[k * 3 + 1], base[k * 3 + 2]);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(k, dummy.matrix);
      if (act) { c.copy(dimColor).lerp(litColor, a); mesh.setColorAt(k, c); }
      else mesh.setColorAt(k, c.setHex(colorOf(n)));
    });
    mesh.instanceMatrix.needsUpdate = true; mesh.instanceColor.needsUpdate = true;
    lines.visible = state.showEdges;
    lines.material.opacity = act ? palette.edgeOpacity * 0.4 : palette.edgeOpacity;
    shell.visible = state.showShell;
    render();
  }

  let raf = null, paused = false;
  function render() { renderer.render(scene, camera); }
  function loop() { controls.update(); render(); raf = requestAnimationFrame(loop); }
  function startLoop() { if (raf === null && !paused) loop(); }
  function stopLoop() { if (raf !== null) cancelAnimationFrame(raf); raf = null; }
  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return; // 숨겨진 화면
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    render();
  }
  new ResizeObserver(resize).observe(container);
  resize();
  // reduced-motion: 조작할 때만 렌더. 아니면 루프 (감쇠·자동 회전)
  if (reduced) controls.addEventListener('change', render); else startLoop();

  return {
    nodes, edges, mesh,
    setRoi(roi) { state.roi = roi; applyFilters(); },
    setKC(v) { state.showKC = v; applyFilters(); },
    setEdges(v) { state.showEdges = v; applyFilters(); },
    setShell(v) { state.showShell = v; applyFilters(); },
    setAutoRotate(v) { controls.autoRotate = v && !reduced; },
    setTheme(name) {
      palette = THEMES[name] ?? THEMES.light;
      shellMat.color.setHex(palette.shell); shellMat.opacity = palette.shellOpacity;
      paintEdges(); eg.attributes.color.needsUpdate = true;
      applyFilters();
    },
    // 대전 재생: graph.nodes 인덱스별 0..1 활성 → 이 뷰의 인덱스로 옮겨 점등. null 이면 해제.
    highlightActivity(values) {
      if (!values) { if (state.activity) { state.activity = null; applyFilters(); } return; }
      const arr = new Float32Array(N);
      for (let gi = 0; gi < values.length; gi++) { const k = keep.get(gi); if (k !== undefined) arr[k] = values[gi]; }
      state.activity = arr; applyFilters();
    },
    pause() { paused = true; stopLoop(); },
    resume() { paused = false; resize(); if (!reduced) startLoop(); else render(); },
    dispose() { stopLoop(); renderer.dispose(); },
  };
}

// 홈 장식: fly.glb / fly_head.glb 를 천천히 도는 실루엣으로. 실패해도 조용히 넘어간다.
export function createHeroView(canvas, { assetBase = '' } = {}) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch { return null; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 20);
  camera.position.set(0, 0.3, 4.2);
  scene.add(new THREE.AmbientLight(0xffffff, 1.1));
  const l = new THREE.DirectionalLight(0xffffff, 1.6); l.position.set(3, 4, 2); scene.add(l);
  const group = new THREE.Group(); scene.add(group);
  const loader = new GLTFLoader();
  const material = new THREE.MeshStandardMaterial({ color: 0x87919c, roughness: 0.6, metalness: 0.05 });
  const place = (file, x, s, y = 0) => loader.load(`${assetBase}models/${file}`, (g) => {
    g.scene.traverse((o) => { if (o.isMesh) o.material = material; });
    g.scene.position.set(x, y, 0); g.scene.scale.setScalar(s); group.add(g.scene); render();
  }, undefined, () => {});
  place('fly.glb', -0.9, 1.05);
  place('fly_head.glb', 1.1, 0.75, -0.05);
  let raf = null;
  function render() { renderer.render(scene, camera); }
  function resize() { const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); render(); }
  function loop() { group.rotation.y += 0.004; render(); raf = requestAnimationFrame(loop); }
  new ResizeObserver(resize).observe(canvas); resize();
  if (!reduced) loop();
  return {
    renderer,
    pause() { if (raf !== null) cancelAnimationFrame(raf); raf = null; },
    resume() { resize(); if (!reduced && raf === null) loop(); },
  };
}
