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

번들 구성: fonts/ 2.87 MB (Pretendard Variable dynamic subset 92개 — 브라우저는 쓰이는 유니코드 구간만 내려받는다) · brain_shell.glb 1.22 MB ·
fly.glb 1.01 MB · fly_head.glb 0.99 MB · app.js 0.66 MB (three 2.22 MB 소스 → 압축 후 0.66) · episode.json 0.23 · graph-viz.json 0.17 · summary.json 0.13 ·
style.css 0.02 · index.html 0.02 = **7.34 MB**. 외부 네트워크 요청 0 (fetch 는 `data/*.json` 만, 폰트는 `node_modules/pretendard` 에서 빌드 때 복사).

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

## 페이지 (디자인 개혁, 2026-09-16)

토스 디자인 시스템 토큰으로 다시 짠 사이드바 콘솔. 색은 화면당 토스 블루(`oklch(0.624 0.176 254)`) 하나, 보더는 1px 헤어라인, 카드 r20 · 버튼 r12/r16 · 칩 999px,
본문 15px/1.5 Pretendard, 표·수치는 `tabular-nums`. 해시 라우터(`#/`, `#/experiments[/key]`, `#/connectome`, `#/decision[?tab=spikes]`, `#/compare`, `#/settings`),
화면은 전부 미리 마운트하고 `hidden` 만 토글해 3D 뷰·재생 상태가 화면을 오가도 유지된다(화면 밖 3D 는 렌더 루프 정지). 폭 < 900 이면 사이드바가 상단 바 + 가로 스크롤 탭으로 접힌다.
Claude Design 목업(8화면)에서 로그인·온보딩·새 실험·결과 4화면은 실험 실행 백엔드를 전제한 것이라 제외했고, "실험" 목록은 `summary.json` 의 조건별 실행 13개(C0, C1~C3 × 시드 3, C4~C6)로 채웠다.

- **홈**: 핵심 수치 4개(결정 내 τ + CI · 줄 중앙값 · 조각 중앙값 · 표본 뉴런), 조건별 막대(τ / R² / 줄 전환, 축 없음, C0 파랑 · CI 겹침 회색 · 분리 진회색, 시드는 평균), 조건 목록, 결론 카드.
- **실험**: 검색(조건·이름·시드)·상태 칩·정렬(조건순 / τ / R²). 행 → 상세: KPI 4개 + 동작점 · 캘리브레이션·발화 · 분리도 · ρ_unit · 리드아웃 6종 표, C1 은 "동작 영역 없음" 카드(failBy). C0 상세에는 에피소드 요약 + 시각화 4곳 링크.
- **커넥톰** (S1): 3D 카드 + 보기 설정(ROI · KC · 시냅스 · 껍질 스위치) + 선택 후보 DN 히트맵(결정 탐색 상태를 따라감) + 스파이크 재생 컨트롤(같은 상태). 밝은 배경 기본: 입력 blue-500 · 중간 grey-400 · KC yellow-500 · DN grey-900, 점등 = blue-500 확대 + 나머지 grey-200. 설정에서 어두운 배경(navy-900, DN 흰색, 점등 노랑)으로 전환.
- **결정 탐색** (S2 + S3): 세그먼트 "한 번의 결정 / 스파이크 활동". 보드는 빈칸 grey-100 · 고정 grey-400 · 이번 배치 blue-500, 후보 선택 파랑 테두리 · 리저버 선택 초록. 히트맵 0 = grey-100, 그 외 blue-50→blue-500, 리저버 선택 후보와 다른 DN 은 주황 테두리.
- **조건 비교** (S4): 2열 카드 그리드(R² · τ · 줄 수 · C1 카드 / ρ_unit · 1부 구간). C0 파랑, CI 분리 grey-900, 겹침 grey-400 (설정에서 회색 처리 끄기 가능).
- **설정**: 3D 자동 회전 · 3D 어두운 배경 · CI 겹침 회색 처리 · 본문 숫자 고정폭 (localStorage `fly.settings.v1`), 데이터·소스 링크. 계정·삭제 같은 항목은 없다.

## 섹션별 구현 메모 (이전 단일 페이지 S1–S4 와 동일한 모듈)

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

headless Chrome (`--headless=new --dump-dom` + `?debug` 콘솔 캡처) + 앱 내 브라우저: 콘솔 오류/경고 0, 375/884/899/1024/1440 px 전 화면에서 가로 넘침 0 (scrollWidth ≤ viewport).
스파이크 재생 시 커넥톰 3D 점등 확인. 단위 테스트 74/74.

## 예상과 달랐던 점

- 실행 샌드박스가 node 의 `fs.rmSync/cpSync({recursive})` 를 exit 127 로 죽여서(메시지 없음) 빌드 스크립트는 수동 재귀 삭제·복사를 쓴다.
- 간선 30,000 상한은 의미가 없었다 (표본 내부 간선 5,963). 더 촘촘한 3D 를 원하면 표본 수를 늘려야 한다 (2 MB 한도까지 여유 10배).
- 첫 결정(빈 보드)은 DN 벡터 34개 중 1개만 서로 달라 아무것도 보여주지 못한다 — 시작 결정 선택 규칙을 넣었다.
