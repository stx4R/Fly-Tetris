// S1: 서브샘플 커넥톰 3D (three.js). InstancedMesh 점 + LineSegments 간선 + 반투명 뇌 껍질 GLB.
// highlightStep(indices) 로 S3 재생 시 발화 뉴런을 점등한다. WebGL 이 없으면 null 을 돌려주고 폴백 문구를 보인다.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 뉴런 좌표계(정규화 hemibrain: 최장 축이 [-1,1], x 폭 ≈1.86 · y 폭 ≈1.66 · z 폭 ≈2.0)에 brain_shell.glb(bbox x ±0.87, y ±0.95, z ±0.55)를
// 맞추는 수동 보정 상수. 껍질의 얇은 축(z)이 뉴런 구름의 y 에 오도록 x 축으로 -90° 돌리고, 축별로 구름 폭에 맞춰 늘린 뒤 5% 여유.
// 이 값들은 시각적 정렬 판단이며 해부학적 정합이 아니다.
export const SHELL_ALIGN = { rotationX: -Math.PI / 2, scale: [1.86 / 1.74 * 1.05, 2.0 / 1.89 * 1.05, 1.66 / 1.09 * 1.05], offset: [0, 0, 0] };

const COLORS = { input: 0x38bdf8, hidden: 0x8b93a7, kc: 0xc084fc, output: 0xfb923c, spike: 0xfff7cc };
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function createConnectomeView(container, graph, { mobile = false, assetBase = '' } = {}) {
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
  camera.position.set(0, 0.6, 3.1);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08; controls.minDistance = 1.2; controls.maxDistance = 8;
  controls.autoRotate = !reduced; controls.autoRotateSpeed = 0.4;
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 1.2); key.position.set(2, 3, 4); scene.add(key);

  // 모바일: 중간층 1/3, 간선 2,000 개
  const nodes = mobile ? graph.nodes.filter((n, i) => n.layer !== 'hidden' || i % 3 === 0) : graph.nodes;
  const keep = new Map(nodes.map((n, k) => [graph.nodes.indexOf(n), k]));
  const edges = (mobile ? graph.edges.slice(0, 2000) : graph.edges).filter(([a, b]) => keep.has(a) && keep.has(b)).map(([a, b, w]) => [keep.get(a), keep.get(b), w]);
  const N = nodes.length;

  // 점
  const geom = new THREE.SphereGeometry(0.011, 8, 6);
  const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const mesh = new THREE.InstancedMesh(geom, mat, N);
  const base = new Float32Array(N * 3), scales = new Float32Array(N).fill(1);
  const dummy = new THREE.Object3D();
  const colorOf = (n) => (n.layer === 'input' ? COLORS.input : n.layer === 'output' ? COLORS.output : n.isKC ? COLORS.kc : COLORS.hidden);
  const c = new THREE.Color();
  nodes.forEach((n, k) => {
    base.set(n.xyz, k * 3);
    dummy.position.set(n.xyz[0], n.xyz[1], n.xyz[2]);
    dummy.scale.setScalar(n.layer === 'output' ? 1.6 : n.layer === 'input' ? 1.1 : 1);
    dummy.updateMatrix();
    mesh.setMatrixAt(k, dummy.matrix);
    mesh.setColorAt(k, c.setHex(colorOf(n)));
  });
  mesh.instanceMatrix.needsUpdate = true; mesh.instanceColor.needsUpdate = true;
  scene.add(mesh);

  // 간선
  const pos = new Float32Array(edges.length * 6);
  const col = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], e) => {
    pos.set(nodes[a].xyz, e * 6); pos.set(nodes[b].xyz, e * 6 + 3);
    c.setHex(colorOf(nodes[a])); col.set([c.r, c.g, c.b], e * 6);
    c.setHex(colorOf(nodes[b])); col.set([c.r, c.g, c.b], e * 6 + 3);
  });
  const eg = new THREE.BufferGeometry();
  eg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  eg.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const lines = new THREE.LineSegments(eg, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.18 }));
  scene.add(lines);

  // 뇌 껍질
  const shell = new THREE.Group();
  shell.rotation.x = SHELL_ALIGN.rotationX;
  shell.scale.set(...SHELL_ALIGN.scale);
  shell.position.set(...SHELL_ALIGN.offset);
  scene.add(shell);
  new GLTFLoader().load(`${assetBase}models/brain_shell.glb`, (gltf) => {
    gltf.scene.traverse((o) => {
      if (o.isMesh) o.material = new THREE.MeshPhysicalMaterial({ color: 0x8fb3ff, transparent: true, opacity: 0.1, roughness: 0.6, metalness: 0, side: THREE.DoubleSide, depthWrite: false });
    });
    shell.add(gltf.scene);
    render();
  }, undefined, () => { /* 껍질 없이도 동작 */ });

  // 필터 상태
  const state = { roi: '', showKC: true, showEdges: true, showShell: true, highlighted: null };
  function applyFilters() {
    nodes.forEach((n, k) => {
      const visible = (state.showKC || !n.isKC) && (!state.roi || n.roi === state.roi || n.layer === 'output');
      const lit = state.highlighted && state.highlighted.has(k);
      const s = (visible ? 1 : 0) * (n.layer === 'output' ? 1.6 : n.layer === 'input' ? 1.1 : 1) * (lit ? 2.2 : state.highlighted ? 0.7 : 1);
      dummy.position.set(base[k * 3], base[k * 3 + 1], base[k * 3 + 2]);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(k, dummy.matrix);
      if (lit) mesh.setColorAt(k, c.setHex(COLORS.spike));
      else { mesh.setColorAt(k, c.setHex(colorOf(n))); if (state.highlighted) mesh.getColorAt(k, c).multiplyScalar(0.55), mesh.setColorAt(k, c); }
      scales[k] = s;
    });
    mesh.instanceMatrix.needsUpdate = true; mesh.instanceColor.needsUpdate = true;
    lines.visible = state.showEdges;
    shell.visible = state.showShell;
    render();
  }

  let raf = null;
  function render() { renderer.render(scene, camera); }
  function loop() { controls.update(); render(); raf = requestAnimationFrame(loop); }
  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    render();
  }
  new ResizeObserver(resize).observe(container);
  resize();
  if (reduced) { controls.addEventListener('change', render); } else loop();

  return {
    nodes, edges, mesh,
    setRoi(roi) { state.roi = roi; applyFilters(); },
    setKC(v) { state.showKC = v; applyFilters(); },
    setEdges(v) { state.showEdges = v; applyFilters(); },
    setShell(v) { state.showShell = v; applyFilters(); },
    // S3: 원 그래프 인덱스(graph.nodes 기준) 집합 → 이 뷰의 인덱스로 변환해 점등. null 이면 해제.
    highlightStep(graphIndices) {
      if (!graphIndices) { state.highlighted = null; applyFilters(); return; }
      const set = new Set();
      for (const gi of graphIndices) { const k = keep.get(gi); if (k !== undefined) set.add(k); }
      state.highlighted = set; applyFilters();
    },
    dispose() { if (raf) cancelAnimationFrame(raf); renderer.dispose(); },
  };
}

// 헤더 장식: fly.glb / fly_head.glb 를 천천히 도는 실루엣으로. 실패해도 조용히 넘어간다.
export function createHeroView(canvas, { assetBase = '' } = {}) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch { return null; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 20);
  camera.position.set(0, 0.3, 4.2);
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const l = new THREE.DirectionalLight(0xfff1d6, 1.4); l.position.set(3, 4, 2); scene.add(l);
  const group = new THREE.Group(); scene.add(group);
  const loader = new GLTFLoader();
  const place = (file, x, s, y = 0) => loader.load(`${assetBase}models/${file}`, (g) => {
    g.scene.traverse((o) => { if (o.isMesh) o.material = new THREE.MeshStandardMaterial({ color: 0xb9c3d6, roughness: 0.55, metalness: 0.1 }); });
    g.scene.position.set(x, y, 0); g.scene.scale.setScalar(s); group.add(g.scene); render();
  }, undefined, () => {});
  place('fly.glb', -0.9, 1.05);
  place('fly_head.glb', 1.1, 0.75, -0.05);
  function render() { renderer.render(scene, camera); }
  function resize() { const w = canvas.clientWidth, h = canvas.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); render(); }
  new ResizeObserver(resize).observe(canvas); resize();
  if (!reduced) { const loop = () => { group.rotation.y += 0.004; render(); requestAnimationFrame(loop); }; loop(); }
  return { renderer };
}
