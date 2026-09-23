// 대전 화면 오른쪽의 초파리 — 패드를 두드리는 3D 모델 (models/fly_tapping.glb, 원본 .blend 에서 scripts/export-fly-tapping.py 로 줄였다).
// 장식이지만 대전 상태를 따른다: 초파리가 실제로 두는 동안(판 진행 중 · 워커 준비됨)만 두드리고,
// 시작 전 · 일시정지 · 판이 끝나면 부드럽게 멈춘다. 멈춰 있으면 그리지 않는다.
// 렌더 루프를 따로 돌리지 않는다 — versus.js 의 rAF 가 update(dt, playing) 를 부른다.
// WebGL 이 없거나 모델을 못 읽으면 빈 자리로 남는다 (대전 자체에는 영향이 없다).

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
// 3/4 구도: 오른쪽 앞 · 조금 위에서 본다 → 초파리가 왼쪽(자기 보드 쪽)을 향한다. glTF 좌표에서 초파리 정면은 +z.
const VIEW_DIR = new THREE.Vector3(0.75, 0.5, 0.75).normalize();
const FILL = 0.92;       // 캔버스 가로·세로 중 빡빡한 쪽의 92% 까지 채운다 (두드리는 다리가 상자 밖으로 조금 나간다)
const EASE_IN_MS = 90, EASE_OUT_MS = 160; // 속도가 목표로 붙는 시상수 — 시작은 빠르게, 멈춤은 조금 느리게

export function createVersusFly(canvas, { url }) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' }); } catch { return null; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  // 홈 장식(createHeroView)과 같은 조명 · 재질 — 무재질 GLB 를 사이트 회색 실루엣으로
  scene.add(new THREE.AmbientLight(0xffffff, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(3, 4, 2); scene.add(key);
  const material = new THREE.MeshStandardMaterial({ color: 0x87919c, roughness: 0.6, metalness: 0.05 });

  let mixer = null, box = null, speed = 0;

  new GLTFLoader().load(url, (gltf) => {
    gltf.scene.traverse((o) => { if (o.isMesh) { o.material = material; o.frustumCulled = false; } });
    scene.add(gltf.scene);
    mixer = new THREE.AnimationMixer(gltf.scene);
    for (const clip of gltf.animations) mixer.clipAction(clip).play(); // 초파리 · 패드 두 클립, 둘 다 2 s 루프
    mixer.update(0);
    gltf.scene.updateMatrixWorld(true);
    box = new THREE.Box3().setFromObject(gltf.scene);
    resize();
  }, undefined, (err) => console.warn('대전 초파리 모델을 읽지 못했어요', err));

  // 카메라 방향은 고정하고, 모델 상자의 8 꼭짓점이 캔버스 안에 들어오는 가장 가까운 거리와 화면 중심을 잡는다.
  const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), VIEW_DIR).normalize();
  const up = new THREE.Vector3().crossVectors(VIEW_DIR, right);
  function fit() {
    const ty = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * FILL, tx = ty * camera.aspect;
    const corners = [];
    for (let i = 0; i < 8; i++) corners.push(new THREE.Vector3(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z));
    const center = box.getCenter(new THREE.Vector3());
    for (let pass = 0; pass < 2; pass++) {
      // 꼭짓점을 카메라 축(right · up · VIEW_DIR)으로 풀어 필요한 거리 → 그 거리에서 투영된 좌우·상하 가운데로 중심을 옮긴다
      let dist = 0;
      const local = corners.map((c) => { const p = c.clone().sub(center); return [p.dot(right), p.dot(up), p.dot(VIEW_DIR)]; });
      for (const [x, y, z] of local) dist = Math.max(dist, Math.abs(x) / tx + z, Math.abs(y) / ty + z);
      let u0 = Infinity, u1 = -Infinity, v0 = Infinity, v1 = -Infinity;
      for (const [x, y, z] of local) { const u = x / (dist - z), v = y / (dist - z); u0 = Math.min(u0, u); u1 = Math.max(u1, u); v0 = Math.min(v0, v); v1 = Math.max(v1, v); }
      if (pass === 1) { camera.position.copy(center).addScaledVector(VIEW_DIR, dist); break; }
      center.addScaledVector(right, ((u0 + u1) / 2) * dist).addScaledVector(up, ((v0 + v1) / 2) * dist);
    }
    camera.lookAt(camera.position.clone().sub(VIEW_DIR));
    camera.updateProjectionMatrix();
  }

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;               // 자리가 접혀 있으면(좁은 화면) 다음 크기 변화를 기다린다
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    if (box) { fit(); renderer.render(scene, camera); }
  }
  new ResizeObserver(resize).observe(canvas);

  return {
    get loaded() { return !!mixer; }, get speed() { return speed; }, // 디버그 훅(__versus.flyModel)에서 읽는다
    // playing: 초파리가 지금 실제로 두고 있는가. 속도(0..1)를 거기로 부드럽게 붙이고, 0 에 멈춰 있으면 그리지 않는다.
    update(dtMs, playing) {
      if (!mixer) return;
      const target = playing && !reduced ? 1 : 0;
      if (speed === target && target === 0) return;
      speed += (target - speed) * (1 - Math.exp(-dtMs / (target > speed ? EASE_IN_MS : EASE_OUT_MS)));
      if (Math.abs(target - speed) < 0.01) speed = target;
      mixer.update((dtMs / 1000) * speed);
      renderer.render(scene, camera);
    },
  };
}
