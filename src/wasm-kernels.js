// 희소 RNN 커널의 WebAssembly SIMD (f64x2) 판. src/sparse-rnn.js 의 JS 커널과 같은 계산을 한다 — 결과는 덧셈 순서 차이(1e-16 상대) 안에서 같다 (test/stage7.test.js).
// 외부 도구 없이 바이너리를 직접 조립한다 (wat2wasm 이 의존성에 없다). 후보 배치 폭 B 는 짝수여야 한다 (호출자가 채운다).
//
//   fwdMatvec(N, indptr, indices, W, x, pre, B)          pre[post,:] += W[e]·x[pre,:]  (CSR 행 = pre 뉴런; 오프셋은 바이트)
//   bwdPre(count, x, xNext, dNext, dPre, dI, dx, keep, lr) a = (xNext − keep·x)/lr; d = dNext·lr·(1 − a²); dPre = d; dI += d; dx = keep·dNext   (원소별, count 는 N·B)
//   bwdMatvec(N, indptr, indices, W, x, dPre, dx, dW, B)  dW[e] += Σ_b dPre[post,b]·x[pre,b];  dx[pre,:] += W[e]·dPre[post,:]
//   tanhStep(count, x, I, pre, xNext, keep, lr)          xNext = keep·x + lr·tanh(pre + I) — tanh 는 exp 를 직접 구현: v 를 [−20, 20] 으로 자르고 y = 2v,
//                                                          k = nearest(y/ln2), r = y − k·ln2 (hi/lo 분할), exp(r) = Σ_{n≤13} rⁿ/n! (|r| ≤ 0.347 → 상대 오차 < 1e-17), 2^k 는 지수 비트로,
//                                                          tanh = (e^{2v} − 1)/(e^{2v} + 1). Math.tanh 와의 차이는 ~1e-16 (test/stage7.test.js 가 JS 커널과 대조).

// ---------- 바이너리 인코더 ----------
const u32 = (v) => { const out = []; do { let b = v & 0x7f; v >>>= 7; if (v) b |= 0x80; out.push(b); } while (v); return out; };
const s32 = (v) => { const out = []; for (;;) { const b = v & 0x7f; v >>= 7; if ((v === 0 && (b & 0x40) === 0) || (v === -1 && (b & 0x40) !== 0)) { out.push(b); return out; } out.push(b | 0x80); } };
const f64 = (v) => Array.from(new Uint8Array(Float64Array.of(v).buffer));
const str = (s) => [...u32(s.length), ...Array.from(Buffer.from(s, 'utf8'))];
const vec = (items) => [...u32(items.length), ...items.flat()];
const section = (id, body) => [id, ...u32(body.length), ...body];

const I32 = 0x7f, F64 = 0x7c, V128 = 0x7b;
// 명령
const op = {
  block: [0x02, 0x40], loop: [0x03, 0x40], end: 0x0b, br: 0x0c, br_if: 0x0d, ret: 0x0f, // 블록 타입 0x40 = 빈 결과
  get: (i) => [0x20, ...u32(i)], set: (i) => [0x21, ...u32(i)], tee: (i) => [0x22, ...u32(i)],
  i32c: (v) => [0x41, ...s32(v)], f64c: (v) => [0x44, ...f64(v)],
  i32load: [0x28, 0x02, 0x00], f64load: [0x2b, 0x03, 0x00], f64store: [0x39, 0x03, 0x00],
  i32add: 0x6a, i32sub: 0x6b, i32mul: 0x6c, i32shl: 0x74, i32eq: 0x46, i32ne: 0x47, i32lt_s: 0x48, i32ge_s: 0x4e, i32lt_u: 0x49,
  f64add: 0xa0, f64sub: 0xa1, f64mul: 0xa2, i64c: (v) => [0x42, ...s32(v)],
  // SIMD (0xfd 접두 + LEB128 opcode)
  v128load: [0xfd, 0x00, 0x03, 0x00], v128store: [0xfd, 0x0b, 0x03, 0x00], f64x2splat: [0xfd, 0x14],
  f64x2lane: (l) => [0xfd, 0x21, l], f64x2add: [0xfd, ...u32(0xf0)], f64x2sub: [0xfd, ...u32(0xf1)], f64x2mul: [0xfd, ...u32(0xf2)],
  f64x2div: [0xfd, ...u32(0xf3)], f64x2min: [0xfd, ...u32(0xf4)], f64x2max: [0xfd, ...u32(0xf5)], f64x2nearest: [0xfd, ...u32(0x94)],
  i32x4truncF64Zero: [0xfd, ...u32(0xfc)], i64x2extendLowS: [0xfd, ...u32(0xc7)], i64x2shl: [0xfd, ...u32(0xcb)], i64x2add: [0xfd, ...u32(0xce)], i64x2splat: [0xfd, 0x12],
};

// 함수 본문 조립 도우미: locals 는 [[count, type], ...], body 는 바이트 배열 (end 포함)
const func = (locals, body) => { const b = [...vec(locals.map(([c, t]) => [...u32(c), t])), ...body.flat(Infinity)]; return [...u32(b.length), ...b]; };

function buildModule() {
  // 타입: 0 = fwdMatvec (7 i32), 1 = bwdPre (7 i32 + 2 f64), 2 = bwdMatvec (9 i32), 3 = tanhStep (5 i32 + 2 f64)
  const types = [
    [0x60, ...vec(Array(7).fill([I32])), ...vec([])],
    [0x60, ...vec([...Array(7).fill([I32]), [F64], [F64]]), ...vec([])],
    [0x60, ...vec(Array(9).fill([I32])), ...vec([])],
    [0x60, ...vec([...Array(5).fill([I32]), [F64], [F64]]), ...vec([])],
  ];
  const imports = [[...str('env'), ...str('mem'), 0x02, 0x00, ...u32(1)]]; // memory, min 1 page, no max
  const funcs = [[0], [1], [2], [3]];
  const exports = [[...str('fwdMatvec'), 0x00, ...u32(0)], [...str('bwdPre'), 0x00, ...u32(1)], [...str('bwdMatvec'), 0x00, ...u32(2)], [...str('tanhStep'), 0x00, ...u32(3)]];

  // ----- fwdMatvec(N=0, indptr=1, indices=2, W=3, x=4, pre=5, B=6) -----
  // locals: j=7, e=8, end=9, xo=10, io=11, b=12, Bb=13 (B*8 bytes), p=14 (addr), wv=15 (v128)
  const fwd = func([[8, I32], [1, V128]], [
    op.get(6), op.i32c(3), op.i32shl, op.set(13),           // Bb = B << 3
    op.i32c(0), op.set(7),                                  // j = 0
    op.block, op.loop,                                      // for j
      op.get(7), op.get(0), op.i32ge_s, op.br_if, 1,        //   if j >= N break
      op.get(1), op.get(7), op.i32c(2), op.i32shl, op.i32add, op.i32load, op.set(8),                 // e = indptr[j]
      op.get(1), op.get(7), op.i32c(2), op.i32shl, op.i32add, op.i32c(4), op.i32add, op.i32load, op.set(9), // end = indptr[j+1]
      op.get(4), op.get(7), op.get(13), op.i32mul, op.i32add, op.set(10),                            // xo = x + j*Bb
      op.block, op.loop,                                    //   for e
        op.get(8), op.get(9), op.i32ge_s, op.br_if, 1,      //     if e >= end break
        op.get(5), op.get(2), op.get(8), op.i32c(2), op.i32shl, op.i32add, op.i32load, op.get(13), op.i32mul, op.i32add, op.set(11), // io = pre + indices[e]*Bb
        op.get(3), op.get(8), op.i32c(3), op.i32shl, op.i32add, op.f64load, op.f64x2splat, op.set(15),  // wv = splat(W[e])
        op.i32c(0), op.set(12),                             //     b = 0
        op.block, op.loop,                                  //     for b (bytes) step 16
          op.get(12), op.get(13), op.i32ge_s, op.br_if, 1,
          op.get(11), op.get(12), op.i32add, op.tee(14),    //       p = io + b
          op.get(14), op.v128load,                          //       pre pair
          op.get(15), op.get(10), op.get(12), op.i32add, op.v128load, op.f64x2mul, op.f64x2add,  // + wv * x pair
          op.v128store,
          op.get(12), op.i32c(16), op.i32add, op.set(12), op.br, 0,
        op.end, op.end,
        op.get(8), op.i32c(1), op.i32add, op.set(8), op.br, 0,
      op.end, op.end,
      op.get(7), op.i32c(1), op.i32add, op.set(7), op.br, 0,
    op.end, op.end,
    op.end,
  ]);

  // ----- bwdPre(count=0, x=1, xNext=2, dNext=3, dPre=4, dI=5, dx=6, keep=7, lr=8) -----
  // locals: q=9 (byte offset), endB=10, kv=11 (v128 keep), lv=12 (lr), il=13 (1/lr), one=14, a=15, d=16, dn=17
  const bwdPre = func([[2, I32], [7, V128]], [
    op.get(0), op.i32c(3), op.i32shl, op.set(10),                 // endB = count*8
    op.get(7), op.f64x2splat, op.set(11),
    op.get(8), op.f64x2splat, op.set(12),
    op.f64c(1), op.get(8), 0xa3 /* f64.div */, op.f64x2splat, op.set(13),
    op.f64c(1), op.f64x2splat, op.set(14),
    op.i32c(0), op.set(9),
    op.block, op.loop,
      op.get(9), op.get(10), op.i32ge_s, op.br_if, 1,
      // a = (xNext − keep*x) * il
      op.get(2), op.get(9), op.i32add, op.v128load,
      op.get(11), op.get(1), op.get(9), op.i32add, op.v128load, op.f64x2mul, op.f64x2sub,
      op.get(13), op.f64x2mul, op.set(15),
      // dn = dNext
      op.get(3), op.get(9), op.i32add, op.v128load, op.set(17),
      // d = dn * lr * (1 − a*a)
      op.get(17), op.get(12), op.f64x2mul, op.get(14), op.get(15), op.get(15), op.f64x2mul, op.f64x2sub, op.f64x2mul, op.set(16),
      // dPre = d
      op.get(4), op.get(9), op.i32add, op.get(16), op.v128store,
      // dI += d
      op.get(5), op.get(9), op.i32add, op.get(5), op.get(9), op.i32add, op.v128load, op.get(16), op.f64x2add, op.v128store,
      // dx = keep * dn
      op.get(6), op.get(9), op.i32add, op.get(11), op.get(17), op.f64x2mul, op.v128store,
      op.get(9), op.i32c(16), op.i32add, op.set(9), op.br, 0,
    op.end, op.end,
    op.end,
  ]);

  // ----- bwdMatvec(N=0, indptr=1, indices=2, W=3, x=4, dPre=5, dx=6, dW=7, B=8) -----
  // locals: j=9, e=10, end=11, xo=12, dxo=13, io=14, b=15, Bb=16, p=17, wv=18 (v128), sv=19 (v128 acc), dv=20 (v128)
  const bwdMatvec = func([[9, I32], [3, V128]], [
    op.get(8), op.i32c(3), op.i32shl, op.set(16),
    op.i32c(0), op.set(9),
    op.block, op.loop,
      op.get(9), op.get(0), op.i32ge_s, op.br_if, 1,
      op.get(1), op.get(9), op.i32c(2), op.i32shl, op.i32add, op.i32load, op.set(10),
      op.get(1), op.get(9), op.i32c(2), op.i32shl, op.i32add, op.i32c(4), op.i32add, op.i32load, op.set(11),
      op.get(4), op.get(9), op.get(16), op.i32mul, op.i32add, op.set(12),   // xo
      op.get(6), op.get(9), op.get(16), op.i32mul, op.i32add, op.set(13),   // dxo
      op.block, op.loop,
        op.get(10), op.get(11), op.i32ge_s, op.br_if, 1,
        op.get(5), op.get(2), op.get(10), op.i32c(2), op.i32shl, op.i32add, op.i32load, op.get(16), op.i32mul, op.i32add, op.set(14), // io = dPre + indices[e]*Bb
        op.get(3), op.get(10), op.i32c(3), op.i32shl, op.i32add, op.f64load, op.f64x2splat, op.set(18),  // wv
        op.f64c(0), op.f64x2splat, op.set(19),                                                            // sv = 0
        op.i32c(0), op.set(15),
        op.block, op.loop,
          op.get(15), op.get(16), op.i32ge_s, op.br_if, 1,
          op.get(14), op.get(15), op.i32add, op.v128load, op.set(20),                                     // dv = dPre pair
          op.get(19), op.get(20), op.get(12), op.get(15), op.i32add, op.v128load, op.f64x2mul, op.f64x2add, op.set(19), // sv += dv * x
          op.get(13), op.get(15), op.i32add, op.tee(17), op.get(17), op.v128load, op.get(18), op.get(20), op.f64x2mul, op.f64x2add, op.v128store, // dx += wv * dv
          op.get(15), op.i32c(16), op.i32add, op.set(15), op.br, 0,
        op.end, op.end,
        // dW[e] += lane0 + lane1
        op.get(7), op.get(10), op.i32c(3), op.i32shl, op.i32add, op.tee(17),
        op.get(17), op.f64load, op.get(19), op.f64x2lane(0), op.f64add, op.get(19), op.f64x2lane(1), op.f64add,
        op.f64store,
        op.get(10), op.i32c(1), op.i32add, op.set(10), op.br, 0,
      op.end, op.end,
      op.get(9), op.i32c(1), op.i32add, op.set(9), op.br, 0,
    op.end, op.end,
    op.end,
  ]);

  // ----- tanhStep(count=0, x=1, I=2, pre=3, xNext=4, keep=5, lr=6) -----
  // locals: q=7, endB=8 (i32); v128: kv=9 keep, lv=10 lr, hi=11 (+20), lo=12 (−20), invln2=13, ln2hi=14, ln2lo=15, one=16, v=17, k=18, r=19, p=20, bias=21 (i64 1023)
  const LN2_HI = 6.93147180369123816490e-01, LN2_LO = 1.90821492927058770002e-10, INV_LN2 = 1.44269504088896338700e+00;
  const fact = (n) => { let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; };
  const horner = [];
  for (let n = 12; n >= 0; n--) horner.push(op.get(20), op.get(19), op.f64x2mul, op.f64c(1 / fact(n)), op.f64x2splat, op.f64x2add, op.set(20)); // p = p·r + 1/n!
  const tanhStep = func([[2, I32], [13, V128]], [
    op.get(0), op.i32c(3), op.i32shl, op.set(8),
    op.get(5), op.f64x2splat, op.set(9), op.get(6), op.f64x2splat, op.set(10),
    op.f64c(20), op.f64x2splat, op.set(11), op.f64c(-20), op.f64x2splat, op.set(12),
    op.f64c(INV_LN2), op.f64x2splat, op.set(13), op.f64c(LN2_HI), op.f64x2splat, op.set(14), op.f64c(LN2_LO), op.f64x2splat, op.set(15),
    op.f64c(1), op.f64x2splat, op.set(16), op.i64c(1023), op.i64x2splat, op.set(21),
    op.i32c(0), op.set(7),
    op.block, op.loop,
      op.get(7), op.get(8), op.i32ge_s, op.br_if, 1,
      // v = clamp(pre + I, −20, 20); y = 2v (v 에 바로 곱한다)
      op.get(3), op.get(7), op.i32add, op.v128load, op.get(2), op.get(7), op.i32add, op.v128load, op.f64x2add,
      op.get(11), op.f64x2min, op.get(12), op.f64x2max, op.get(16), op.get(16), op.f64x2add, op.f64x2mul, op.set(17),   // v = 2·clamp
      // k = nearest(v · inv_ln2); r = (v − k·ln2hi) − k·ln2lo
      op.get(17), op.get(13), op.f64x2mul, op.f64x2nearest, op.set(18),
      op.get(17), op.get(18), op.get(14), op.f64x2mul, op.f64x2sub, op.get(18), op.get(15), op.f64x2mul, op.f64x2sub, op.set(19),
      // p = 1/13!; Horner 내려가며 p = p·r + 1/n!  (n = 12..0)
      op.f64c(1 / fact(13)), op.f64x2splat, op.set(20),
      ...horner,
      // t = p · 2^k  (2^k = ((k + 1023) << 52) 의 비트)
      op.get(20), op.get(18), op.i32x4truncF64Zero, op.i64x2extendLowS, op.get(21), op.i64x2add, op.i32c(52), op.i64x2shl, op.f64x2mul, op.set(20),
      // th = (t − 1)/(t + 1); xNext = keep·x + lr·th
      op.get(4), op.get(7), op.i32add,
      op.get(9), op.get(1), op.get(7), op.i32add, op.v128load, op.f64x2mul,
      op.get(10), op.get(20), op.get(16), op.f64x2sub, op.get(20), op.get(16), op.f64x2add, op.f64x2div, op.f64x2mul, op.f64x2add,
      op.v128store,
      op.get(7), op.i32c(16), op.i32add, op.set(7), op.br, 0,
    op.end, op.end,
    op.end,
  ]);

  const bytes = [
    0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00,
    ...section(1, vec(types)),
    ...section(2, vec(imports)),
    ...section(3, vec(funcs)),
    ...section(7, vec(exports)),
    ...section(10, vec([fwd, bwdPre, bwdMatvec, tanhStep])),
  ];
  return Uint8Array.from(bytes);
}

let moduleCache = null;
export function wasmModule() {
  if (!moduleCache) moduleCache = new WebAssembly.Module(buildModule());
  return moduleCache;
}
export function wasmAvailable() {
  try { wasmModule(); return true; } catch (e) { return false; }
}

// memory: WebAssembly.Memory. 반환 { fwdMatvec, bwdPre, bwdMatvec } (인자는 바이트 오프셋)
export function instantiate(memory) {
  const inst = new WebAssembly.Instance(wasmModule(), { env: { mem: memory } });
  return inst.exports;
}

// 간단한 범프 할당기 (16 바이트 정렬, 필요하면 grow). 뷰는 grow 뒤에 다시 만들어야 한다 (refresh 콜백).
export function createArena(initialBytes = 64 << 20) {
  const pages = (b) => Math.ceil(b / 65536);
  const memory = new WebAssembly.Memory({ initial: pages(initialBytes) });
  let top = 16;
  const listeners = [];
  return {
    memory,
    alloc(bytes) {
      const off = top;
      top += Math.ceil(bytes / 16) * 16;
      if (top > memory.buffer.byteLength) { memory.grow(pages(top - memory.buffer.byteLength) + 64); for (const f of listeners) f(); }
      return off;
    },
    onGrow(f) { listeners.push(f); },
    f64(off, n) { return new Float64Array(memory.buffer, off, n); },
    i32(off, n) { return new Int32Array(memory.buffer, off, n); },
    get bytes() { return memory.buffer.byteLength; },
  };
}
