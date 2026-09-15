// xorshift128+ (Vigna 2014) 를 32비트 반쪽 두 개로 구현한 시드 PRNG. 의존성 없음, 결정적.
// 64비트 상태 s0, s1 을 각각 (hi, lo) uint32 로 든다.

// 32비트 정수 시드 → 4개의 32비트 상태 워드 (splitmix32 변형). 전부 0 이 되는 경우는 없다.
function seedWords(seed) {
  let x = (seed >>> 0) ^ 0x9e3779b9;
  const words = new Uint32Array(4);
  for (let i = 0; i < 4; i++) {
    x = (x + 0x9e3779b9) >>> 0;
    let z = x;
    z = Math.imul(z ^ (z >>> 16), 0x85ebca6b) >>> 0;
    z = Math.imul(z ^ (z >>> 13), 0xc2b2ae35) >>> 0;
    words[i] = (z ^ (z >>> 16)) >>> 0;
  }
  if (words.every((w) => w === 0)) words[0] = 1;
  return words;
}

export function createRng(seed = 1) {
  const w = seedWords(seed);
  let s0h = w[0], s0l = w[1], s1h = w[2], s1l = w[3];

  // 64비트 결과의 상위 53비트 → [0, 1)
  function next() {
    // result = s0 + s1 (mod 2^64)
    const lo = (s0l + s1l) >>> 0;
    const carry = lo < s0l ? 1 : 0;
    const hi = (s0h + s1h + carry) >>> 0;

    // xorshift: x = s0; y = s1; s0 = y; x ^= x << 23; x ^= x >>> 18; x ^= y; x ^= y >>> 5; s1 = x
    let xh = s0h, xl = s0l;
    const yh = s1h, yl = s1l;
    s0h = yh; s0l = yl;
    // x ^= x << 23
    xh = (xh ^ ((xh << 23) | (xl >>> 9))) >>> 0;
    xl = (xl ^ (xl << 23)) >>> 0;
    // x ^= x >>> 18
    xl = (xl ^ ((xl >>> 18) | (xh << 14))) >>> 0;
    xh = (xh ^ (xh >>> 18)) >>> 0;
    // x ^= y
    xh = (xh ^ yh) >>> 0;
    xl = (xl ^ yl) >>> 0;
    // x ^= y >>> 5
    xl = (xl ^ ((yl >>> 5) | (yh << 27))) >>> 0;
    xh = (xh ^ (yh >>> 5)) >>> 0;
    s1h = xh; s1l = xl;

    return (hi * 2097152 + (lo >>> 11)) / 9007199254740992; // (hi * 2^21 + lo >>> 11) / 2^53
  }

  return {
    next,
    // [0, n) 정수
    int: (n) => Math.floor(next() * n),
    uniform: (a, b) => a + (b - a) * next(),
    // Fisher–Yates, 제자리
    shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
      }
      return arr;
    },
  };
}
