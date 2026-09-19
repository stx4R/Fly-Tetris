// Dellacherie 교사 정책: 6 특징 × 고정 가중치의 선형 평가. 3단계 학습 데이터 생성용, 지금은 엔진 검증용.
//
// 특징 정의 (Thiery & Scherrer 2009 / Fahey 구현 관례):
//   landingHeight       고정된 조각의 세로 중심 높이 (바닥 = 0), 라인 클리어 전
//   erodedPieceCells    지운 줄 수 × 그 줄들에 있던 현재 조각 셀 수
//   rowTransitions      각 행에서 채움↔빔 전환 수. 좌우 벽은 채움으로 본다
//   columnTransitions   각 열에서 채움↔빔 전환 수. 바닥은 채움, 천장(보드 위)은 빔으로 본다
//   holes               위에 채워진 셀이 하나라도 있는 빈 셀 수
//   cumulativeWells     우물 셀(양옆이 채움/벽)마다 그 셀부터 아래로 이어지는 빈 셀 수를 더함
//                       → 깊이 d 우물은 1+2+…+d 로 누적

import { HEIGHT, SHAPES, WIDTH, applyPlacement, legalPlacements } from './tetris.js';

export const WEIGHTS = {
  landingHeight: -4.500158825082766,
  erodedPieceCells: 3.4181268101392694,
  rowTransitions: -3.2178882868487753,
  columnTransitions: -9.348695305445199,
  holes: -7.899265427351652,
  cumulativeWells: -3.3855972247263626,
};

const at = (board, x, y) => board[y * WIDTH + x];

export function rowTransitions(board) {
  let n = 0;
  for (let y = 0; y < HEIGHT; y++) {
    let prev = 1; // 왼쪽 벽
    for (let x = 0; x < WIDTH; x++) {
      const c = at(board, x, y);
      if (c !== prev) n++;
      prev = c;
    }
    if (prev !== 1) n++; // 오른쪽 벽
  }
  return n;
}

export function columnTransitions(board) {
  let n = 0;
  for (let x = 0; x < WIDTH; x++) {
    let prev = 0; // 천장
    for (let y = 0; y < HEIGHT; y++) {
      const c = at(board, x, y);
      if (c !== prev) n++;
      prev = c;
    }
    if (prev !== 1) n++; // 바닥
  }
  return n;
}

export function holes(board) {
  let n = 0;
  for (let x = 0; x < WIDTH; x++) {
    let covered = false;
    for (let y = 0; y < HEIGHT; y++) {
      if (at(board, x, y)) covered = true;
      else if (covered) n++;
    }
  }
  return n;
}

export function cumulativeWells(board) {
  let n = 0;
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      if (at(board, x, y)) continue;
      const left = x === 0 ? 1 : at(board, x - 1, y);
      const right = x === WIDTH - 1 ? 1 : at(board, x + 1, y);
      if (!left || !right) continue;
      for (let yy = y; yy < HEIGHT && !at(board, x, yy); yy++) n++;
    }
  }
  return n;
}

// 배치 하나를 평가. 게임오버 배치는 null.
export function evaluatePlacement(board, piece, col, rot) {
  const r = applyPlacement(board, piece, col, rot);
  if (r.gameOver) return null;
  const h = SHAPES[piece][rot & 3].h;
  const features = {
    landingHeight: HEIGHT - r.landingRow - 0.5 - (h - 1) / 2, // 조각 세로 중심 높이. 바닥면 = 0, 바닥 행 셀 중심 = 0.5
    erodedPieceCells: r.linesCleared * r.erodedPieceCells,
    rowTransitions: rowTransitions(r.board),
    columnTransitions: columnTransitions(r.board),
    holes: holes(r.board),
    cumulativeWells: cumulativeWells(r.board),
  };
  let score = 0;
  for (const k in WEIGHTS) score += WEIGHTS[k] * features[k];
  return { col, rot, score, features, board: r.board, linesCleared: r.linesCleared };
}

// 합법 배치 중 최고점. 동점은 먼저 나온 것 (rot 오름차순, col 오름차순). 합법 배치가 없으면 null.
export function bestPlacement(board, piece) {
  let best = null;
  for (const { col, rot } of legalPlacements(board, piece)) {
    const e = evaluatePlacement(board, piece, col, rot);
    if (e && (best === null || e.score > best.score)) best = e;
  }
  return best;
}
