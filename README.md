# VFB-Tetris

초파리 hemibrain 커넥톰의 실제 시냅스 연결을 고정 리저버로 쓰고, 리드아웃만 학습시켜 테트리스를
플레이하는 시뮬레이터. 최종 산출물은 GitHub Pages 정적 웹 시각화 + 보고서.

**현재 단계: 6단계 완료 — 웹 시각화 배포: https://stx4r.github.io/Fly/** (`docs/stage6-web.md`). 시뮬레이션 결과는 `docs/stage5-separation.md`.
보고서는 7단계.

## 사용

```bash
# 토큰: 환경변수 NEUPRINT_TOKEN 또는 .env / .env.local (커밋 금지)
npm run extract    # neuPrint → data/raw/ 캐시 → data/connectome.json (뉴런별 primary ROI 포함)
npm run validate   # 스키마 + 그래프 검사 (roi null < 10% 포함), 실패 시 exit 1
npm test           # node:test 단위 테스트
npm run spectral   # W_unit 스펙트럼 반경 (alpha 0.5, 1.0) → data/spectral.json, 수렴 실패 시 exit 1
npm run calibrate  # 시드 랜덤 탐색 → 상위 20점 재평가 → 프로브 선택 → 게이트. 게이트 미달/통과점 없음 시 exit 1 (워커 8개, ~6분)
npm run calibrate-esn  # Plan B: 같은 CSR 위 ESN 을 같은 프로브·게이트로 (게이트 미달 시에만, ~16분)
npm run collect    # afterstate 30,000+ 수집 → data/afterstates.json (게임 단위 60/20/20 분할, 누수 검사)
npm run search-separation -- --profile-all   # 5단계 1부: 분리 동작점 탐색 600점 → data/separation-search.json (3 h 상한)
npm run estimate-budget  # 실험 소요 추정 (단위 비용·워커 처리량 실측), 8 h 초과 시 exit 1
npm run experiment # 조건 × 리드아웃 × 목표 실험 → data/results.json (--games --cap --null-seeds --combos --quick)
npm run smoke      # results.json 의 C0 학습 리드아웃으로 afterstate 플레이 500조각 (없으면 3단계 랜덤 리드아웃 경로)
npm run build-viz  # 6단계 시각화 데이터 → web/data/ (서브샘플 그래프·한 게임 기록·요약)
npm run build      # esbuild 번들 → web/dist (총 4.4 MB, 외부 요청 0)
npm run serve      # 로컬 점검 http://localhost:8123
npm run deploy     # web/dist → gh-pages 브랜치 → GitHub Pages
```

`data/raw/` 는 API raw 응답 캐시다. 재실행 시 API 를 다시 호출하지 않는다. 처음부터 다시 뽑으려면 지운다.

## 데이터 (1단계)

- 소스: [neuPrint](https://neuprint.janelia.org) `hemibrain:v1.2.1`, Cypher via `/api/custom/custom`
- 입력층: type `LC*`, `LPLC*` (시각 투사 뉴런; `LCNO*` 는 중앙복합체 뉴런이라 제외)
- 출력층: type `DN*` (하강뉴런; `DN1*`/`DN2*`/`DN3*` 는 일주기 시계 뉴런이라 제외)
  + 정확한 리터럴 allowlist `Giant Fiber`(=DNp01), `MDN`, `oviDNa`, `oviDNb`, `vpoDN`
- 중간층: 입력층에서 2-hop 이내 도달 가능 AND 출력층으로 2-hop 이내 도달하는, type 이 붙은 Traced 뉴런
- 간선: `ConnectsTo.weight` (시냅스 수) ≥ 3. 총 노드가 8000 을 넘으면 중간층을 부분그래프 내
  total synaptic weight 상위 순으로 잘라 맞춤 (입력·출력층은 전부 유지)
- 뉴런 플래그 `isKC` (버섯체 Kenyon cell), `isAllowlisted` — 4단계 ablation 태그. 제거하지 않는다.
- 뉴런별 `roi`: neuPrint `roiInfo` 에서 데이터셋의 primary ROI (`:Meta.primaryRois`, 63개 최하위 ROI) 중
  pre+post 시냅스 수 최대인 것. super-ROI(예: `VLNP(R)` ⊃ `PVLP(R)`) 는 하위를 포함해 항상 이기므로 후보에서 제외.
  8000 뉴런 중 null 3개, 44개 ROI. `meta.roiCounts` 에 ROI 별 수. 지역 억제 풀의 단위다.

출력: `data/connectome.json` (minified, 런타임 번들용), `data/connectome.meta.json` (meta 만 pretty).
`edges` 의 인덱스는 `neurons` 배열 위치 인덱스다 (bodyId 아님). 뉴런 순서는 input → hidden → output 블록.

## 시뮬레이션 코어 (2단계)

- **테트리스** (`src/tetris.js`): 10×20, 7-bag, SRS 4 회전 상태, 배치 단위 API (하드드롭만).
  행동 = (col, rot) 40개. next piece 는 노출하지 않는다.
- **교사** (`src/heuristic.js`): Dellacherie 6 특징 고정 가중치. 시드 10개 × 2000조각 전부 생존.
- **리저버** (`src/reservoir.js`): 이벤트 구동 LIF. dt 1ms, τ_m 20ms, V_th 1, 불응기 2ms.
  `w_eff = g·weight/(수신 뉴런 총 입력 weight)^alpha`, **g 는 직접 주지 않고 `g = rho_target / rho_unit(alpha)`**
  (`src/spectral.js` 의 거듭제곱법, `data/spectral.json`). 배치당 50 스텝, 출력 = DN 107개의 창 발화 수.
  모든 간선은 흥분성 (hemibrain v1.2.1 에 신경전달물질 라벨 없음). 3단계 추가분:
  - 스파이크 빈도 적응(SFA): `a_i(t+1) = a_i·e^{-dt/100ms} + b·spike_i`, 막전위가 `V_rest − a_i` 로 이완
    (스텝당 `−a_i(1−e^{-dt/τm})`). 이벤트 구동: 증분은 발화 뉴런에만, 감쇠·소거는 a≠0 목록에만.
    `a_i < b·1e-4` 면 정확히 0 (모델의 일부, naive 매스텝 갱신과 비트 일치 — 테스트).
  - 억제 `I_inh(i) = −k_local·(직전 스텝 ROI(i) 내 발화 수 / ROI 뉴런 수) − k_global·(직전 스텝 발화 수 / N)`.
    roi null 인 뉴런은 전역 항만.
  - 배치 간 감쇠 구간 `gap` ∈ {0, 25, 50 스텝 (입력 0), 'full' (완전 리셋)}. 에피소드 간은 항상 리셋.
- **인코딩** (`src/encode.js`): 입력 뉴런마다 10×20 격자 위 가우시안 RF (σ = 2셀). 셀 값 빈칸 0 /
  고정 블록 1 / 현재 조각(스폰 위치) 2. `I_ext = G_IN · Σ RF·value`, RF 는 뉴런별 합 1 로 정규화.
- **디코딩** (`src/decode.js`): 107×40 선형 리드아웃, 불법 배치 마스킹 후 argmax. 2단계는 시드 랜덤 초기화만.
- **결정성**: 모든 난수는 xorshift128+ (`src/prng.js`). 같은 시드·입력이면 비트 동일.

## 캘리브레이션 v2 (3단계)

- **지표** (`src/metrics.js`): meanRate, medianRate(뉴런별 평균 발화율의 중앙값), activeFrac,
  ceilingFrac(창 내 ≥15회 = 불응기 한계, 폭주 하드 제약), topSpikeShare(상위 1% 뉴런의 발화 점유율 = 승자독식 측정치).
  유효 랭크·분리도는 보조. 2단계의 "20회 포화" 지표는 도달 불가라 삭제.
- **프로브** (`src/probe.js`, 릿지 회귀 닫힌형, 학습 루프 아님): (a) DN 발화율 → 교사 배치의 Dellacherie 6특징 R²,
  (b) DN 발화율 → 교사 배치(40클래스) 합법 마스킹 top-1, (c) 통제군 = 표본별 뉴런 축 셔플. 5-fold CV, λ 는 내부 4-fold.
- **탐색** (`scripts/calibrate.js`): rho_target ∈ [0.8, 1.3], b ∈ [0, 2], k_local ∈ [0, 20], k_global ∈ [0, 5],
  alpha ∈ {0.5, 1}, gap ∈ {0, 25, 50, full}. 시드 랜덤 1200점(보드 200) → 하드 제약(ceiling < 5%, top1% share < 30%,
  발화 DN ≥ 40, median ∈ [0.5, 40] Hz) 통과 상위 20점을 보드 2000개로 재평가 → 프로브 (b) 최대 선택 →
  게이트 (b) − 통제군 ≥ +10%p. 스펙 범위에 통과점이 없으면 rho ≤ 5.0 확장 탐색을 `extended` 로 따로 기록한다
  (하드 제약은 그대로). b = 0 고정 / k_local = 0 고정 부분 탐색 300점씩은 보고용.
- **참조 프로브** `inputReference`: 같은 프로브를 원 입력(보드 200셀 + 조각 one-hot)에 적용 — 선형 리드아웃의 과제 상한.
- **Plan B** (`src/esn.js`, `scripts/calibrate-esn.js`): 같은 CSR 위 누설 레이트 유닛 `x ← (1−lr)x + lr·tanh(Wx + s·I_ext)`,
  W 는 rho_target 로 직접 스케일. 탐색축 rho, lr, 입력 스케일, alpha, gap. 하드 제약은 포화(|x|>0.9) < 5%, 활성 DN ≥ 40,
  분리도 ≥ 0.01 (입력 무관 고정점 배제).

### 3단계 결과 (요약 — 자세히는 `docs/stage3-calibration.md`)

- 스펙 범위 rho ∈ [0.8, 1.3] 통과 **0/1200** (전부 침묵). 확장 rho ≤ 5: **4/1200**; k_local = 0 부분 탐색 **29/300**; b = 0 부분 탐색 **0/300**.
  통과점은 전부 alpha 1, rho 3.3–5, k_local ≤ 0.33, b > 0. **승자독식을 깬 것은 SFA** (b = 0 이면 mean 30–50 Hz 에 median 0 Hz 로 양극화);
  지역 억제는 k_local > 0.5 에서 네트워크를 통째로 끈다.
- 선택점 rho 4.15 / alpha 1 / b 0.35 / k_local 0.03 / k_global 1.27 / gap full: mean 33 Hz, median 25 Hz, ceiling 0%, 상위 1% 점유 3.4%,
  DN 97/107, 랭크 92. 프로브 (b) top-1 15.4% vs 통제 14.2% → **게이트(+10%p) 미달**. 프로브 (a) 특징 R² 0.51.
- **Plan B (ESN)** 도 미달: 39/240 통과, 선택점 rho 1.21 / alpha 0.5 / lr 0.33 / 입력 스케일 7.2 / gap 50 → top-1 15.5% vs 14.2% (+1.3p),
  특징 R² 0.50 (상위 10점 0.59–0.60). 스파이킹·레이트·원 입력 세 표현이 프로브 (b) 에서 똑같이 우연 수준이다.
- **게이트는 원 입력으로도 못 넘는다**: 보드 셀 + 조각을 그대로 넣은 선형 프로브가 19.1% vs 14.8% (+4.3p, 2000 보드).
  교사의 행동은 보드의 비선형 함수라 프로브 (b) 는 이 과제에서 선형 디코딩 가능성의 척도가 아니다. 특징 R² 로 보면 원 입력 0.61,
  스파이킹 0.51, ESN 0.50–0.60 — 셋 다 비슷하고, 셔플 통제군(0.45–0.56)이 높아 뉴런 정체성이 담는 몫은 어디서나 작다.
- gap: 완전 리셋에서만 특징 R² 0.45–0.51, gap 0/25/50 은 0.13–0.15. 지속 어트랙터가 50 스텝 감쇠로는 안 사라진다.
- smoke: 660 배치/s (reservoir 1.33 ms/배치, gap full), 불법 배치 0, 도달불가 DN 7개 발화 0.

## 6단계 — 웹 시각화 (`web/`, 배포 https://stx4r.github.io/Fly/)

단일 페이지 4 섹션, 프레임워크 없음(three + esbuild 만). 모든 수치는 `web/data/*.json`(← `data/*.json`)에서 읽는다.
S1 커넥톰 3D(층화 서브샘플 907 뉴런·5,963 시냅스, InstancedMesh + LineSegments, 반투명 뇌 껍질 GLB, ROI/KC 필터) ·
S2 한 번의 결정(후보별 DN 히트맵 + 예측 순위 ↔ 실제 순위 bump chart, τ) · S3 스파이크 래스터·층별 추이·3D 점등 재생 ·
S4 조건 비교(95% CI, C0 와 겹치면 회색 = 차이 없음, C1 동작 영역 없음 카드, ρ_unit 막대, 1부 분리도 구간). 모바일은 3D 노드·간선 축소, reduced-motion 존중,
WebGL 없어도 S2·S4 동작. 이 사이트는 실패한 결과를 그대로 보여준다 — "학습했다/플레이한다" 는 표현을 쓰지 않는다.

## 5단계 결과 요약 (자세히는 `docs/stage5-separation.md`)

- **1부 분리 탐색** (C0, 600점, 11 min): 분리 제약(distinct ≥ 40%, dnDiff ≥ 5)은 3단계 제약 통과점에서 거의 자동 (16/17). 그러나 결정 내
  켄달 τ 는 전 범위 −0.05~+0.06 — **분리는 있으나 순위 정보가 없다.** 임계점 가설 기각: 분리는 rho·G_IN·T 와 단조 증가(= 활동량),
  낮은 rho 는 침묵. alpha 0.5 는 0/295 (침묵). 선택점 alpha 1, rho 4.81, b 2.65, T 25, G_IN×1.62.
- 4단계 §3 의 "중간층 0.6/5577" 은 처음 25개(빈 보드) 결정의 표본 편향이었다. 셔플 50 결정에서는 중간층 150–620 뉴런이 달라진다.
- **2부** (13 조건, 7.8 min): **C1 degree-shuffle 은 3 시드 모두 동작 영역 없음** (0/300, 침묵). rho_unit α0.5: real 59.2 = KC/direct-ablated ≫
  weight/degree-shuffle 33.6–34.0 ≫ ER 27.8 (가중치 순열만으로 떨어진다). 풀링 R² 는 C0 0.817 이 C2(0.72–0.79)·C3(0.69–0.74) 위 (CI 분리),
  C6 활동량 대비 +0.055; 결정 내 τ 는 C0 0.058 이 null 과 겹침 (차이 없음); 플레이는 전 조건 무작위 수준 (줄 중앙값 0, 교사 398).
  R3−R1: C0 ΔR² +0.024, Δτ +0.068 (CI 분리, 작음). V1 vs V2: 차이 없음.

## 4단계 (afterstate + null model) — 파이프라인

- 정식화: 각 합법 배치의 결과 보드 → 리저버(후보마다 완전 리셋) → 가치 → argmax. 목표 V1(Dellacherie 점수) / V2(6특징 → 고정 가중치 결합).
  리드아웃 R1 릿지 / R2 릿지+이차 / R3 MLP(직접 구현), 전 조건 동일. 조건 C0 real, C1 차수 보존 재배선, C2 가중치 순열, C3 층 블록 ER,
  C4 KC 제거, C5 직접 간선 제거(1,531개), C6 활동량 요약 5개(교란 통제). C1–C3 시드 5개. 조건마다 ρ_unit 재계산·300점 재캘리브레이션.
- 데이터: 40 게임 → 30,723 afterstate, 게임 단위 24/8/8 분할. 평가: 테스트 R²·결정 내 켄달 τ·top-1, 플레이 20 게임 × 2000 조각, 부트스트랩 95% CI.
- 4단계 당시 예산 추정 39 h → 5단계에서 T 25·축 축소로 42 min. 5단계 동작점·분리 제약은 `data/separation-search.json` 에서 자동 반영
  (`experiment-config.js resolveOperating`, `--ignore-separation` 으로 4단계 설정 복귀).

### 알려진 한계

- **RF 배정은 임의적이다.** type 별 bodyId 순서로 격자에 균등 분산했을 뿐, 실제 LC 뉴런의 시야
  지도(망막위상)와 무관하다. soma 좌표는 1,360개가 null 이고 망막위상과의 대응을 검증할 수 없어 쓰지 않았다.
- **선형 스펙트럼 판정은 LIF 절벽을 4배 낮게 예측한다.** alpha 0.5 에서 rho_unit = 59.2 → rho = 1 은 g = 0.0169
  인데 2단계 관측 절벽은 g ≈ 0.07 (rho ≈ 4). 문턱·누설이 있는 LIF 는 단위 입력당 스파이크 이득이 1 보다 훨씬 작아
  선형화가 보수적이다. 그래서 스펙의 rho_target ∈ [0.8, 1.3] 은 중간층이 거의 침묵하는 영역이고 (median 0 Hz),
  확장 탐색(rho ≤ 5) 이 필요했다.
- 2ms 불응기에서 50 스텝 창의 최대 발화 수는 17이라 "창 내 20회 이상" 포화 기준은 물리적으로 도달 불가다 (삭제).
- **프로브 (b)(교사 행동 top-1) 는 선형으로는 원 입력에서도 +4.3p 가 한계**라 +10%p 게이트를 어떤 표현도 못 넘는다. 4단계 학습의
  성패 예측에는 특징 R² (프로브 (a)) 와 비선형 리드아웃이 필요하다.
- k_local ∈ [0, 20] 은 스텝당 증분 규약에서 유효 범위(< 0.5)보다 약 50배 넓어 탐색 표본의 96% 가 침묵 영역에 떨어졌다.
- **afterstate 후보들은 DN 발화 수로 구분은 되지만(distinct 70–90%, dnDiff 7–17) 순위 정보가 없다** (결정 내 τ ≤ 0.075, 전 조건·전 탐색점).
  플레이는 전 조건 무작위 수준. 4단계의 "중간층 0.6/5577" 은 빈 보드 표본 편향이었다 (`docs/stage5-separation.md` §1).

## 구조

```
scripts/extract-connectome.js   neuPrint 호출·캐시·출력 (I/O)
scripts/validate-connectome.js  커넥톰 검증 (I/O)
scripts/spectral.js             거듭제곱법 스펙트럼 반경 → data/spectral.json
scripts/calibrate.js            시드 랜덤 탐색 + 재평가 + 게이트 → data/calibration.json
scripts/collect.js              afterstate 수집 → data/afterstates.json
scripts/search-separation.js    5단계 1부 분리 동작점 탐색
scripts/build-viz-data.js  build-web.js  serve-web.js  deploy-pages.js   6단계 시각화 데이터·번들·로컬 서버·Pages 배포
web/index.html  web/style.css  web/src/{main,connectome,decision,spikes,compare,util}.js   정적 사이트 소스 (web/data, web/dist 는 생성물)
scripts/estimate-budget.js      4단계 소요 추정
scripts/experiment.js  experiment-worker.js  pool.js  experiment-config.js   4단계 실험 (조건별 캐시, 재개 가능)
scripts/smoke-run.js            500조각 스모크 플레이 (학습 리드아웃 또는 랜덤 리드아웃)
src/connectome.js               층 판정, 2-hop 후보, 절단, primary ROI, 스키마 파서, 그래프 검사
src/tetris.js  src/heuristic.js 엔진, Dellacherie 교사
src/spectral.js                 단위 CSR (alpha 정규화), 거듭제곱법
src/reservoir.js                이벤트 구동 LIF + SFA + ROI 억제 풀 + gap
src/encode.js  src/decode.js    보드 → 전류, DN 발화율 → 행동
src/calibration.js src/metrics.js src/probe.js  보드·교사 라벨 생성, 지표, 릿지 프로브
src/nullmodels.js               C1–C5 null model / ablation 그래프
src/afterstate.js src/readout.js src/evaluate.js src/play.js   afterstate 데이터, 리드아웃 3종, 지표·CI, 에이전트
src/separation.js               결정 내 분리도·전파 프로파일·withinKendall
src/viz.js                      서브샘플 그래프·에피소드 기록·요약 (시각화 데이터)
src/prng.js                     xorshift128+
test/                           node:test 단위 테스트
```
