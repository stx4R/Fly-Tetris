# Fly

초파리 hemibrain 커넥톰의 **배선 구조**를 제약으로 가진 네트워크로 테트리스(대전 규칙)를 시뮬레이션하는 프로젝트. 최종 산출물은 GitHub Pages 웹(대전 UI) + 보고서.

**프로젝트 주장 (6단계에서 변경).** 1–5단계는 커넥톰의 시냅스 수를 *고정 가중치*로 쓰는 리저버였고, 그 결과는 음성이었다 (결정 내 순위 정보 없음,
플레이 무작위 수준 — `docs/stage5-separation.md`, 근거 장으로 유지). 7단계부터 커넥톰에서 오는 것은 **배선 구조(희소성 마스크)뿐이고 가중치는 학습된다.**
정확한 표현은 "초파리 커넥톰 배선 제약을 가진 네트워크" 다. "초파리가 테트리스를 학습했다" 류의 표현은 어디에도 쓰지 않는다.

**현재 단계: 7단계 Phase A 완료 — 게이트 미달로 정지** (`docs/stage7-wiring-constraint.md`). 커넥톰 마스크 위 가중치 학습으로 결정 내 순위 정보는 생겼지만
(테스트 τ 0.17, 전체 후보 top-1 37.8% — 게이트 35% 통과) 플레이 게이트(공격 중앙값 ≥ 150, 생존 ≥ 70%)는 미달 (4.5, 0%). 진단: 학습 부분집합 밖의 나쁜 수를 거른 적이 없고,
같은 파라미터 수의 밀집 MLP 도 같은 프로토콜에서 같은 방식으로 죽는다 — 배선 제약이 아니라 학습 설정의 한계. 다음 축은 사용자 결정 (문서 §5.3). Phase B(null 비교)는 게이트 통과 후.
계획: 7단계 → 8단계 웹·대전 UI (1차 시각화 콘솔은 배포됨: https://stx4r.github.io/Fly/, `docs/stage8-web-v1.md`) → 9단계 보고서.

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
npm run estimate-budget-stage5  # 4·5단계 실험 소요 추정 (단위 비용·워커 처리량 실측), 8 h 초과 시 exit 1
npm run experiment # 조건 × 리드아웃 × 목표 실험 → data/results.json (--games --cap --null-seeds --combos --quick)
npm run smoke      # data/stage7/c0.model.json 이 있으면 학습된 C0 로 대전 엔진 1000조각 (전체 후보, 단일 스레드, 불법 배치 0 확인); 없으면 4단계 리드아웃 500조각 → 3단계 랜덤 리드아웃 (--stage4/--stage3 로 강제)
npm run tune-teacher    # 6단계: 공격형 교사 CEM 튜닝 (세대 20 × 개체 50, 12 워커 ~15 min) → data/teacher-attack.json, 목표 미달 시 exit 1
npm run collect-versus  # 6단계: 공격형 교사(scored 빔)로 결정 40,000 수집 (hold·next 5·인공 가비지) → data/versus-decisions.json.gz, 누수 검사
npm run rank-train      # 6단계: 고정 리저버 + 손실 비교 (mse/centered/listwise/pairwise × linear/mlp × dn/board/hand) → data/rank-train.json (--decisions 8000 기본, ~4 min)
npm run estimate-budget # 7단계 예산 추정 — 실제 희소 RNN 의 BPTT·점수·교사 라벨 단위 비용 + 워커 병렬 배율 실측 (+ Phase A 실측 스텝 오버헤드 보정) → Phase A-2 기대/상한, 8 h 초과 시 줄일 축을 제안하고 exit 1
node scripts/stage7-pilot.js --lambda 0.5   # 7단계 파일럿 (8k · ≤ 8 에폭): 값 마진 가중 λ {0, 0.5, 2} 비교 → --summarize 가 data/stage7/lambda-choice.json 에 최선 λ 와 근거를 쓴다
npm run train-c0        # 7단계 Phase A-2: C0 학습 (24k 결정 × K 8 mixed negatives, T 25 BPTT, λ, AdamW 감쇠 + 드롭아웃) + DAgger ≤ 5 × 4k (조기 중단) + 게이트 5 항목 (top-1 ≥ 40%, 조각 중앙값 ≥ 400, 공격 중앙값 ≥ 60, 테트리스/게임 중앙값 ≥ 1, 하위 절반 선택 ≤ 5%; 가비지 포함 20 게임) → data/stage7-c0.json, data/stage7/c0.model.{bin,json}; 미달 시 exit 1 (기대 ~6 h, 체크포인트 재개)
npm run train-nulls     # 7단계 Phase B (게이트 통과 후): C0 · C0-listwise · C1×2 · C3×2 · C4 · C5 · D0(밀집, 파라미터 수 일치) · C0-shuffled-init 을 같은 하이퍼파라미터·데이터(24k)로 1 라운드 → data/stage7-results.json (기대 ~20 h, 조건별 체크포인트)
npm run build-viz  # 8단계 1차 시각화 데이터 → web/data/ (서브샘플 그래프·한 게임 기록·요약)
npm run build      # esbuild 번들 → web/dist (총 7.3 MB, 외부 요청 0 — Pretendard 는 node_modules 에서 복사)
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

## 6단계 — 대전 엔진 + 공격형 교사 + 랭킹 학습 (자세히는 `docs/stage6-versus.md`)

- **대전 엔진** (`src/tetris.js` 아래 절반, 순수 함수·상태 불변): hold 1칸(배치당 1회) · next 5 · 가비지 큐(하단 삽입, 한 공격 = 같은 구멍 열, 상쇄: 보낼 라인 < 큐면 차감 후 잔여만 수신, 확정당 최대 8줄) ·
  탑아웃 · `boardHeight`. 공격 = 가이드라인 (1/2/3/4줄 → 0/1/2/4, T-스핀 2/4/6, 콤보 표, 퍼펙트 클리어 +10; B2B 없음). T-스핀 = 3-corner + 마지막 동작 회전 (앞 모서리 둘·TST 킥이면 full, 아니면 mini).
  "마지막 동작이 회전" 은 스폰에서 가이드라인 이동(좌·우·소프트드롭·SRS 킥)으로 도달 가능한 정지 위치 전체를 BFS 로 구해 판정한다 (`reachablePlacements`; TSD·TST·tuck 이 모두 나온다, 조각당 20–35 µs).
- **공격형 교사** (`src/teacher-attack.js`): Dellacherie 6 + attackSent · comboState · wellDepth(테트리스 준비도) · tspinSetup · garbageQueueHeight, 위험 높이 이상은 생존(Dellacherie) 평가, next 5 + hold 빔 서치(깊이 3 · 폭 8).
  CEM(20 × 50, 목적 = 공격 + 0.5 × 생존 조각) 튜닝 → **1000조각 공격 중앙값 377 [371, 382], 생존 100%, 줄의 82% 가 테트리스** (목표 ≥ 250 / ≥ 90%). CEM 은 T-스핀 항을 버렸다 (가중치 음수) — 우물 하나로 테트리스를 연속으로 내는 편이 낫다.
- **데이터** (`data/versus-decisions.json.gz`, 12.4 MB): 223 게임 / **40,129 결정** / 1.70 M 후보 (42.5/결정), 후보 전체에 교사(scored 빔) 값, 게임 단위 60/20/20 분할·누수 0,
  인공 가비지 0.163 줄/조각 (조각당 확률 0.08 로 1–4줄; 큐에 가비지가 있는 결정 9.9%, 가비지를 받은 뒤의 결정 92%). 결과 보드는 저장하지 않고 엔진으로 복원한다.
- **랭킹 학습 검증** (`src/rank-train.js`, 8,019 결정·1,204 테스트 결정): 5단계 최종 동작점의 고정 리저버(C0 점, T 25) 에 손실만 교체. 교사 값 분산의 86.7% 가 결정 간 분산 (5단계 진단 확인).
  **같은 DN 특징에서 mse → listwise 는 Δτ −0.011, Δtop-1 +1.1%p (CI 겹침); 어느 손실이든 τ 0.00–0.03, top-1 16–20%.** 같은 정보(원 보드 200 셀)에 같은 손실을 주면 τ 0.31 / top-1 43% —
  **원인 1(손실)의 기여는 0, 원인 2(고정 가중치의 표현력)가 지배적이다.** 랭킹 손실 자체는 정상 (원 보드에서 top-1 +12–14%p, CI 분리); listwise ≈ pairwise (CI 겹침, pairwise 가 근소 우위).
- **7단계 예산** (`npm run estimate-budget`, 실측 단위 비용: 언롤 스텝당 7.0 ms = 순전파 1.4 + 역전파 5.6, 12 워커 ×7.6): 계획대로(40k 결정 × 42.5 후보 × T 25, 10 epoch) **70 h → 8 h 초과, 멈춤.**
  권장 축소: 결정당 후보 42.5 → 8 (교사 선택 + 상위 7) 그리고 결정 24k → 8k → 4.4 h (상한 8.8 h). 언롤 T 25 → 15 는 그 다음, 간선 가지치기(weight ≥ 5: 간선 63% / 시냅스 90% 유지)는 연구 대상을 바꾸므로 마지막.

## 7단계 — 커넥톰 배선 제약 + 가중치 학습 (자세히는 `docs/stage7-wiring-constraint.md`)

- **모델** (`src/sparse-rnn.js`): 레이트 RNN `x(t+1) = (1−lr)x + lr·tanh((W⊙M)x + W_in·u + b)`, T 25, lr 0.33. M = 커넥톰 인접 마스크 (8,000 뉴런 · 459,168 간선, 고정), W 는 마스크 위치에만 있는 학습 파라미터
  (초기값 = 3단계 α=1 정규화 시냅스 수 × ρ 1.0 — 학습이 커넥톰 초기값에서 얼마나 멀어지는지 재기 위해). W_in (2,316 × 256, RF 초기값) 과 b 도 학습, 출력 DN 107 → 창 평균 → 표준화 → 107→64→1 리드아웃. P = 1,067,041.
  입력 u 256 = afterstate 보드 200 + 놓은 조각 7 + 회전 4 + hold 8 + 다음 5×7 + 가비지 큐 1 + 콤보 1 (전부 [0,1]). 후보별 afterstate, 결정당 K 회 전방.
- **학습**: pairwise 힌지, 결정당 K 8 (교사 선택 + 상위 7), BPTT, Adam 1e-3 코사인, 전역 클리핑 5, 검증(K 8) 조기 종료; **평가는 전체 후보** (K 8 평가는 함수가 거부). DAgger 3 라운드 (정책 플레이 2k 결정에 교사 라벨 → warm start).
  C2 weight-shuffle 은 삭제 — 가중치를 학습하면 C0 와 같은 마스크라 null 이 아니다 (초기값 대조군 `C0-shuffled-init` 은 Phase B 보조). 후보 배치 + 전치 없는 역전파 커널로 6단계 추정(7.0 ms/후보·스텝)의 1/10 (0.59 ms); Phase A 2.98 h.
- **Phase A 결과** (테스트 = 6단계와 같은 1,204 결정, 전체 후보 42.6 개; 단독 플레이 20 게임 × 1000, 교사와 같은 시드): 학습 전 top-1 24.5% → 라운드 0 τ 0.172 / top-1 36.2% → DAgger 라운드 1 38.8% → 3 **37.8% [34.9, 40.7]** (게이트 35% 통과;
  고정 리저버 16–20% 초과, 원 보드 43% 미만). 플레이 **공격 중앙값 4.5 [2.5, 7.5], 생존 0/20, 조각 중앙값 134, 테트리스 0** (교사 377 / 100%) — **게이트 미달, Phase B 미실행.**
  on-policy 교사 일치 24.2 → 27.5 → 29.3% (분포 이동의 크기); DAgger 는 1 라운드에서 공격 3 → 7.5, 조각 114 → 163 을 냈고 그 뒤 정체.
- **W 변화** (커넥톰 초기값 대비): corr 0.825, |Δw| 평균 0.017 (초기 평균 0.017), **간선 39% 가 억제성** (초기 0%). 변한 곳은 입구 — input→hidden corr 0.26, W_in 보드 열 0.49, AOTU/LO/PVLP 의 중간층 뉴런; hidden→output 0.96 · KC 간선 0.97 은 거의 그대로.
- **진단**: 정책 선택의 16% 가 교사 값 하위 절반 (학습 상태에서도 14%) — 학습 부분집합 밖의 수를 거른 적이 없다. 파일럿: 음성 구성을 교사 선택 + 상위 3 + 무작위 4 로 바꾸면 top-1 40.9% [38.0, 43.8]·조각 200 (CI 분리) 이지만 생존은 여전히 0.
  **같은 P 의 밀집 MLP(D0) 도 같은 프로토콜에서 top-1 35.6% · 조각 80 · 테트리스 0 으로 죽는다** — 미달의 원인은 마스크가 아니라 1-ply 모방 · 8k 결정 · hard-negative 설정. 제안 축(음성 구성 · 데이터 8k→24k+ · DAgger 규모 · 플레이 시 얕은 탐색 · 정규화 · 중간 게이트)은 문서 §5.3, 결정은 사용자.

## 8단계 1차 — 웹 시각화 (`web/`, 배포 https://stx4r.github.io/Fly/; 개편 전 "6단계" 로 만든 콘솔)

사이드바 콘솔 7화면(해시 라우터), 프레임워크 없음(three + esbuild 만). 디자인은 토스 디자인 시스템 토큰(블루 단일 강조 · 1px 헤어라인 · 라운드 ladder ·
Pretendard 가변 폰트 self-host · 숫자 고정폭). 모든 수치는 `web/data/*.json`(← `data/*.json`)에서 읽는다.
홈(핵심 수치 4개 · 조건별 τ/R²/줄 막대 · 결론) · 실험(summary 의 조건별 실행 13개 표 + 상세: 동작점·캘리브레이션·분리도·리드아웃 6종) ·
커넥톰 3D(층화 서브샘플 907 뉴런·5,963 시냅스, InstancedMesh + LineSegments, 반투명 뇌 껍질 GLB, ROI/KC 필터, 스파이크 재생 점등) ·
결정 탐색(한 번의 결정: 후보별 DN 히트맵 + 예측 순위 ↔ 실제 순위 bump chart, τ / 스파이크 활동: 래스터·층별 추이) ·
조건 비교(95% CI, C0 와 겹치면 회색 = 차이 없음, C1 동작 영역 없음 카드, ρ_unit 막대, 1부 분리도 구간) · 설정(표시 옵션만, localStorage).
모바일은 사이드바가 상단 바로 접히고 3D 노드·간선 축소, reduced-motion 존중, WebGL 없어도 나머지 화면 동작. 실험을 실행하는 기능은 없다(정적 사이트).
이 사이트는 실패한 결과를 그대로 보여준다 — "학습했다/플레이한다" 는 표현을 쓰지 않는다.

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
  6단계에서 손실을 결정 단위 랭킹 손실로 바꿔도 이 값은 움직이지 않았다 (τ 0.00–0.03) — 고정 가중치 리저버의 표현 한계다 (`docs/stage6-versus.md` §5.3).
- **7단계 학습 부분집합은 hard negatives 뿐이다** (교사 선택 + 상위 7). 정책은 나머지 34 개 후보의 점수를 학습한 적이 없어 결정의 1/6 에서 교사 값 하위 절반의 수를 고른다 — 플레이 게이트 미달의 직접 원인 (`docs/stage7-wiring-constraint.md` §5).
- **7단계 W 변화량은 Adam 의 성질을 반영한다.** lr 1e-3 은 평균 0.017 인 초기 가중치에 스텝당 ~6% 라, 변화량은 기울기 크기가 아니라 방향의 일관성을 잰다. "커넥톰 초기값이 의미 있었는가" 는 초기값 대조군(`C0-shuffled-init`, Phase B) 없이는 답할 수 없다.
- **학습 전 모델이 top-1 24.5%** 를 낸다 (채운 칸이 적은 결과 보드가 활동이 낮은 편향). 7단계 top-1 수치는 이 기준선 위에서 읽어야 한다.
- **대전 엔진의 물리는 배치 단위 근사다.** 조각은 스폰에서 좌·우·소프트드롭·회전으로 도달 가능한 정지 위치에 바로 놓이며 (시간·중력·락 딜레이 없음), 180° 회전·B2B 보너스·T-스핀 mini 의 세부 규칙(가이드라인 변형별 차이)은 구현하지 않았다.

## 구조

```
scripts/extract-connectome.js   neuPrint 호출·캐시·출력 (I/O)
scripts/validate-connectome.js  커넥톰 검증 (I/O)
scripts/spectral.js             거듭제곱법 스펙트럼 반경 → data/spectral.json
scripts/calibrate.js            시드 랜덤 탐색 + 재평가 + 게이트 → data/calibration.json
scripts/collect.js              afterstate 수집 → data/afterstates.json
scripts/search-separation.js    5단계 1부 분리 동작점 탐색
scripts/build-viz-data.js  build-web.js  serve-web.js  deploy-pages.js   8단계 1차 시각화 데이터·번들·로컬 서버·Pages 배포
scripts/tune-teacher.js  teacher-worker.js   6단계 공격형 교사 CEM 튜닝 (워커: evaluate / play / collect)
scripts/collect-versus.js       6단계 대전 결정 데이터 수집
scripts/rank-train.js  rank-worker.js      6단계 랭킹 손실 검증 실행 (리저버 특징은 experiment-worker 의 featurize-boards)
scripts/estimate-budget.js      7단계 예산 추정 (실측 단위 비용 × 계획 축; estimate-budget-stage5.js 는 4·5단계용)
scripts/train-c0.js  train-nulls.js  stage7-lib.js  stage7-worker.js   7단계 Phase A (C0 + DAgger + 게이트) / Phase B (null 비교) / 공용 조율 (데이터셋·풀·라운드 학습·평가·체크포인트) / 워커 (grad·loss·score·play·bench)
scripts/stage7-diagnose.js  stage7-pilot-negatives.js   7단계 진단 (전체 후보 선택 품질: 하위 50% 선택 비율 등) / 파일럿 (음성 구성 mixed · D0 밀집 참조; Phase A 의 일부가 아님)
src/sparse-rnn.js               7단계 모델: 커넥톰 마스크 희소 레이트 RNN (B 별 생성 배치 커널, 전치 없는 BPTT 역전파, 리드아웃 표준화) + D0 밀집 MLP (파라미터 수 정확 일치)
src/stage7-data.js  stage7-train.js  stage7-agent.js   u 인코딩·K 부분집합·전체 후보 평가·DAgger 병합(누수 검사) / Adam·클리핑·코사인·W 변화 분석 / 학습된 정책 에이전트 (전체 후보 argmax)
web/index.html  web/style.css  web/src/{main,router,settings,home,experiments,connectome,decision,heatmap,spikes,compare,util}.js   정적 사이트 소스 (web/data, web/dist 는 생성물)
scripts/estimate-budget-stage5.js  4·5단계 소요 추정
scripts/experiment.js  experiment-worker.js  pool.js  experiment-config.js   4단계 실험 (조건별 캐시, 재개 가능)
scripts/smoke-run.js            500조각 스모크 플레이 (학습 리드아웃 또는 랜덤 리드아웃)
src/connectome.js               층 판정, 2-hop 후보, 절단, primary ROI, 스키마 파서, 그래프 검사
src/tetris.js  src/heuristic.js 엔진(2단계 배치 API + 6단계 대전 엔진: hold·next 5·가비지·공격·T-스핀·BFS 도달 배치), Dellacherie 교사
src/teacher-attack.js           6단계 공격형 교사 (11 특징 + 위험 전환 + 빔 서치 / scored 모드)
src/versus-data.js              6단계 결정 단위 데이터 (수집·직렬화·복원; collectGame 의 policy 옵션 = 7단계 DAgger, 인공 가비지 주입기)
src/rank-train.js               6단계 랭킹 손실 (mse / centered / listwise / pairwise) + linear/MLP 점수 모델 + 평가
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
