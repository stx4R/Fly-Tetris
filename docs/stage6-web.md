# 6단계 — 웹 시각화 + GitHub Pages (2026-09-16)

배포 URL: **https://stx4r.github.io/Fly/** (gh-pages 브랜치, 루트). 새 실험 없음 — `data/*.json` 만 시각화한다.

## 구성

| 단계 | 명령 | 산출물 |
|---|---|---|
| 시각화 데이터 | `npm run build-viz` | `web/data/graph-viz.json` 178 KB · `episode.json` 237 KB · `summary.json` 133 KB |
| 번들 | `npm run build` (esbuild, three 0.186 번들) | `web/dist/` **4.41 MB** (gitignore) |
| 로컬 점검 | `npm run serve` → http://localhost:8123 | |
| 배포 | `npm run deploy` | `web/dist` → `gh-pages` (git plumbing: 임시 인덱스 → write-tree → commit-tree → update-ref → push -f) |

`docs/` 대신 `gh-pages` 를 고른 이유: `docs/` 는 단계 보고서(md) 소스 폴더이고, 빌드 산출물(GLB 3.3 MB + 번들)을 main 이력에 매번 쌓지 않기 위해.
Pages 는 `gh api -X POST repos/stx4R/Fly/pages -f source[branch]=gh-pages -f source[path]=/` 로 활성화 (legacy build, `.nojekyll` 포함).

번들 구성: brain_shell.glb 1.22 MB · fly.glb 1.01 MB · fly_head.glb 0.99 MB · app.js 0.63 MB (three 2.22 MB 소스 → 압축 후 0.63) ·
episode.json 0.23 · graph-viz.json 0.17 · summary.json 0.13 · index.html 0.01 · style.css 0.01. 외부 네트워크 요청 0 (fetch 는 `data/*.json` 만, 폰트는 시스템).

## 데이터

- **graph-viz.json**: 입력 200(시드 무작위) / 중간 600((ROI, isKC) 층별 최대 잔여 비례 배분 — ROI 분포 층당 오차 ≤ 1개, KC 비율 15.2% → 15.2%) / 출력 107 전부 = 907 뉴런.
  간선은 샘플 내부의 것만 **5,963** (30,000 상한이 걸리지 않았다 — 표본이 8000 의 11% 라 간선은 1.3%). 좌표: soma 있으면 hemibrain 복셀 좌표(8 nm),
  없으면(표본 139개) 같은 primary ROI 의 soma 평균 + 시드 지터 ±3%. bbox 중심 [17214, 21970, 21690] 을 빼고 최장 축(z, 36,876 복셀)이 [-1, 1] 이 되게
  등방 스케일 2/36876 (meta.coordinates 에 기록).
- **episode.json**: 시드 100, 상한 1000 → **25 조각, 0 줄, 25 결정** (평균 후보 20.8, 결정 내 τ 평균 0.066), 237 KB. 리저버는 실험의 C0 재캘리브레이션 점
  (α1, ρ 4.19, b 1.52, k_local 0.25, k_global 0.73; T 25·G_IN×1.62 는 1부 선택점) + C0 R3:V2 리드아웃 — 리드아웃이 학습된 바로 그 리저버다.
  결정마다 보드·후보(결과 보드, DN 발화 수 107, 예측 가치, Dellacherie 점수·6특징, 줄 제거 수)·선택. 스파이크 타이밍은 선택 후보에 대해 표본 907 뉴런의
  스텝별 발화 + 전 뉴런 층별 발화 수.
- **summary.json**: results/separation-search/spectral 에서 화면용 수치 + CI + C0/C6 대비 CI 겹침 판정 + 1부 구간 평균 + 600 탐색점 축약.
- 테스트 (`test/viz.test.js`, 전체 **74/74**): 서브샘플의 ROI/KC 비율 보존, episode 후보 가치 = 저장된 DN 발화 수로 리드아웃 재계산 (1e-6) + DN 발화 수 =
  리저버 재실행, summary 수치 = 원본 + CI 겹침 = ciOverlap.

## 페이지

- **S1 커넥톰**: InstancedMesh 907 점 + LineSegments 5,963 간선, 층별 색(입력 청록, 중간 회색, KC 보라, DN 주황), ROI 필터, KC/시냅스/껍질 토글, OrbitControls
  (감쇠, 자동 회전은 reduced-motion 이면 끔). 모바일(폭 < 768 또는 논리 코어 ≤ 4): 중간층 1/3 (400 뉴런), 간선 2,000, DPR ≤ 1.25. WebGL 실패 시 폴백 문구, S2·S4 는 독립 동작.
- **GLB 정렬 상수** (`web/src/connectome.js` `SHELL_ALIGN`): 세 GLB 모두 [-1, 1] 근처로 정규화된 무재질 메시. brain_shell bbox x ±0.87 · y ±0.95 · z ±0.55 (얇은 축 z)
  vs 뉴런 구름 폭 x 1.86 · y 1.66 · z 2.0 → 껍질을 **x 축 −90° 회전**(얇은 축이 구름의 y 로), 축별 스케일 **[1.86/1.74, 2.0/1.89, 1.66/1.09] × 1.05**
  = [1.12, 1.11, 1.60], 오프셋 0. 시각적 정렬이지 해부학적 정합이 아니다(껍질은 생성된 일반 뇌 형상, hemibrain 은 반구). fly.glb / fly_head.glb 는 헤더 장식
  (스케일 1.05 / 0.75, x −0.9 / +1.1, 천천히 회전).
- **S2 한 번의 결정**: 시작 결정 = 후보 ≥ 10 인 결정 중 서로 다른 DN 벡터 비율 최대(빈 보드 초반 결정은 리저버가 거의 침묵). 보드(놓인 셀 노랑) + 후보 썸네일,
  DN 107 히트맵(결정 내 최대값 정규화, 리저버 선택 후보와 다른 DN 테두리), bump chart(A 예측 순위 ↔ B 실제 순위, 선 뒤엉킴), 결정별 τ 와 테스트 전체 τ + CI.
  캡션: "후보마다 DN 패턴은 다르지만, 그 차이가 배치의 좋고 나쁨과 정렬되지 않는다."
- **S3 스파이크**: 25 스텝 래스터(층별 정렬, 표본 907 행) + 층별 발화 수 라인차트 + 재생/스텝/처음, S1 점등 연동. 스파이크 기록은 리저버가 고른 후보에만 있음을 표시.
- **S4 조건 비교**: R² / τ / 줄 수 — 조건별 점 + 95% CI, **C0 와 CI 가 겹치는 조건은 회색**, C1 은 "동작 영역 없음 (3 시드 전부)". C1 카드(C3 대비). ρ_unit(α 0.5) 막대(시드 범위 표시,
  α 1 ≈ 1.0 주석). 1부 ρ·T·G_IN 구간별 distinctFrac. 모든 수치는 summary.json 에서.

## 점검

headless Chrome (`--headless=new --dump-dom` + `?debug` 콘솔 캡처): 로컬·배포 모두 콘솔 오류/경고 0, 526/742/1254 px 에서 가로 넘침 0 (scrollWidth = viewport).
배포 자산 9개 전부 200. (이 세션의 브라우저 도구가 이름 충돌로 막혀 headless CLI 로 검증했다.)

## 예상과 달랐던 점

- 실행 샌드박스가 node 의 `fs.rmSync/cpSync({recursive})` 를 exit 127 로 죽여서(메시지 없음) 빌드 스크립트는 수동 재귀 삭제·복사를 쓴다.
- 간선 30,000 상한은 의미가 없었다 (표본 내부 간선 5,963). 더 촘촘한 3D 를 원하면 표본 수를 늘려야 한다 (2 MB 한도까지 여유 10배).
- 첫 결정(빈 보드)은 DN 벡터 34개 중 1개만 서로 달라 아무것도 보여주지 못한다 — 시작 결정 선택 규칙을 넣었다.
