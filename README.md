# VFB-Tetris

초파리 hemibrain 커넥톰의 실제 시냅스 연결을 고정 리저버로 쓰고, 리드아웃만 학습시켜 테트리스를
플레이하는 시뮬레이터. 최종 산출물은 GitHub Pages 정적 웹 시각화 + 보고서.

**현재 단계: 2단계 — 테트리스 엔진 + 스파이킹 리저버 + 인코딩/디코딩 + 캘리브레이션**
(학습 루프·null model·ablation 은 3단계, 렌더링은 4단계)

## 사용

```bash
# 토큰: 환경변수 NEUPRINT_TOKEN 또는 .env / .env.local (커밋 금지)
npm run extract    # neuPrint → data/raw/ 캐시 → data/connectome.json
npm run validate   # 스키마 + 그래프 검사, 실패 시 exit 1
npm test           # node:test 단위 테스트
npm run calibrate  # (g, k) 격자 탐색 → data/calibration.json (전 목표 만족점이 없으면 exit 1)
npm run smoke      # 캘리브레이션 점 + 랜덤 리드아웃으로 500조각 플레이, 처리량 측정
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
- 뉴런 플래그 `isKC` (버섯체 Kenyon cell), `isAllowlisted` — 3단계 ablation 태그. 제거하지 않는다.

출력: `data/connectome.json` (minified, 런타임 번들용), `data/connectome.meta.json` (meta 만 pretty).
`edges` 의 인덱스는 `neurons` 배열 위치 인덱스다 (bodyId 아님). 뉴런 순서는 input → hidden → output 블록.

## 시뮬레이션 코어 (2단계)

- **테트리스** (`src/tetris.js`): 10×20, 7-bag, SRS 4 회전 상태, 배치 단위 API (하드드롭만).
  행동 = (col, rot) 40개. next piece 는 노출하지 않는다.
- **교사** (`src/heuristic.js`): Dellacherie 6 특징 고정 가중치. 시드 10개 × 2000조각 전부 생존.
- **리저버** (`src/reservoir.js`): 이벤트 구동 LIF. dt 1ms, τ 20ms, V_th 1, 불응기 2ms.
  `w_eff = g·weight/√(수신 뉴런 총 입력 weight)`. 전역 억제 `I_inh = -k·(직전 스텝 발화 수/N)`.
  배치당 50 스텝, 출력 = DN 107개의 창 발화 수. 배치 간 리셋 없음, 에피소드 간 리셋.
  모든 간선은 흥분성 (hemibrain v1.2.1 에 신경전달물질 라벨 없음).
- **인코딩** (`src/encode.js`): 입력 뉴런마다 10×20 격자 위 가우시안 RF (σ = 2셀). 셀 값 빈칸 0 /
  고정 블록 1 / 현재 조각(스폰 위치) 2. `I_ext = G_IN · Σ RF·value`, RF 는 뉴런별 합 1 로 정규화.
- **디코딩** (`src/decode.js`): 107×40 선형 리드아웃, 불법 배치 마스킹 후 argmax. 2단계는 시드 랜덤 초기화만.
- **결정성**: 모든 난수는 xorshift128+ (`src/prng.js`). 같은 시드·입력이면 비트 동일.

### 알려진 한계

- **RF 배정은 임의적이다.** type 별 bodyId 순서로 격자에 균등 분산했을 뿐, 실제 LC 뉴런의 시야
  지도(망막위상)와 무관하다. soma 좌표는 1,360개가 null 이고 망막위상과의 대응을 검증할 수 없어 쓰지 않았다.
- **캘리브레이션 목표를 만족하는 (g, k) 가 없다.** 모든 간선이 흥분성이고 억제가 전역 균일이라
  강하게 재귀 연결된 AVLP 군집이 불응기 한계(~300 Hz)로 점화하며 나머지를 억제하는 승자독식 상태와,
  전부 침묵하는 상태 사이에 완만한 중간 영역이 없다. `data/calibration.json` 의 격자 결과 참고.
  `smoke` 는 이 경우 "만족한 목표 수 최다, 동률 시 분리도 최대" 인 fallback 점을 경고와 함께 쓴다.
- 2ms 불응기에서 50 스텝 창의 최대 발화 수는 17이라 "창 내 20회 이상" 포화 기준은 물리적으로
  도달 불가다. 참고용으로 ≥ 15회(≥ 300 Hz) 비율(`ceilingFrac`)을 같이 낸다.

## 구조

```
scripts/extract-connectome.js   neuPrint 호출·캐시·출력 (I/O)
scripts/validate-connectome.js  커넥톰 검증 (I/O)
scripts/calibrate.js            (g, k) 격자 탐색 → data/calibration.json
scripts/smoke-run.js            500조각 스모크 플레이, 처리량
src/connectome.js               층 판정, 2-hop 후보, 절단, 스키마 파서, 그래프 검사
src/tetris.js  src/heuristic.js 엔진, Dellacherie 교사
src/reservoir.js                CSR + 이벤트 구동 LIF
src/encode.js  src/decode.js    보드 → 전류, DN 발화율 → 행동
src/calibration.js src/metrics.js  보드 생성·지표 (분리도, 유효 랭크)
src/prng.js                     xorshift128+
test/                           node:test 단위 테스트
```
