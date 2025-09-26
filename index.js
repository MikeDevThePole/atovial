const objects = [undefined];
const free_list = new Set();

const decoder = new TextDecoder();
const encoder = new TextEncoder();

const store = (value) => {
  let id;
  if (free_list.size > 0) {
    id = free_list.values().next().value;
    free_list.delete(id);
    objects[id] = value;
  } else {
    id = objects.length;
    objects.push(value);
  }
  return id;
};
const drop = (id) => {
  objects[id] = undefined;
  free_list.add(id);
};

const { module, instance } = await WebAssembly.instantiateStreaming(
  fetch("index.wasm"),
  {
    "": {
      a: () => store(new Uint8Array(WebAssembly.Module.customSections(module, "assets")[0])),
      b: (obj) => drop(obj),
      c: () => store(document),
      d: (obj, a) => objects[obj].append(objects[a]),
      e: () => store({}),
      f: (obj, val) => objects[obj].alpha = !!val,
      g: (obj, val) => objects[obj].antialias = !!val,
      h: (obj, val) => objects[obj].desynchronized = !!val,
      i: (obj, val) => objects[obj].preserveDrawingBuffer = !!val,
      j: (obj, val_ptr, val_len) => objects[obj].colorSpace = decoder.decode(new Uint8Array(memory.buffer, val_ptr, val_len)),
      k: (obj) => objects[obj].length,
      l: (obj, dst) => new Uint8Array(memory.buffer, dst).set(objects[obj]),
      m: () => performance.now(),
      n: (obj) => store(objects[obj].body),
      o: (obj, a_ptr, a_len) => store(objects[obj].createElement(decoder.decode(new Uint8Array(memory.buffer, a_ptr, a_len)))),
      p: (self, settings) => store(objects[self].getContext("webgl2", objects[settings])),
      q: (obj) => store(objects[obj].createProgram()),
      r: (obj, a) => objects[obj].linkProgram(objects[a]),
      s: (obj, a, b_ptr, b_len) => store(objects[obj].getUniformLocation(objects[a], decoder.decode(new Uint8Array(memory.buffer, b_ptr, b_len)))),
      t: (obj) => store(objects[obj].createBuffer()),
      u: (obj, a, b) => objects[obj].bindBuffer(a, objects[b]),
      v: (obj, a, b_ptr, b_len, c) => objects[obj].bufferData(a, new Uint8Array(memory.buffer, b_ptr, b_len), c),
      w: (obj) => store(objects[obj].createVertexArray()),
      x: (obj, a) => objects[obj].bindVertexArray(objects[a]),
      y: (obj, a) => objects[obj].enableVertexAttribArray(a),
      z: (obj, a, b, c, d, e, f) => objects[obj].vertexAttribPointer(a, b, c, !!d, e, f),
      A: (obj) => store(objects[obj].createTexture()),
      B: (obj, a) => objects[obj].activeTexture(a),
      C: (obj, a, b) => objects[obj].bindTexture(a, objects[b]),
      D: (obj, a, b, c) => objects[obj].texParameteri(a, b, c),
      E: (obj, a, b, c, d, e, f, g, h, i_ptr, i_len) => objects[obj].texImage2D(a, b, c, d, e, f, g, h, new Uint8Array(memory.buffer, i_ptr, i_len)),
      F: (obj, a) => objects[obj].enable(a),
      G: (obj, a) => objects[obj].depthFunc(a),
      H: (obj, a) => objects[obj].cullFace(a),
      I: (obj, a, b) => objects[obj].blendFunc(a, b),
      J: (obj, a) => objects[obj].generateMipmap(a),
      K: (obj, a) => objects[obj].useProgram(objects[a]),
      L: (obj, a, b) => objects[obj].uniform1i(objects[a], b),
      M: (obj, a_ptr, a_len, b) => objects[obj].addEventListener(decoder.decode(new Uint8Array(memory.buffer, a_ptr, a_len)), objects[b]),
      N: (obj, val_ptr, val_len) => objects[obj].innerText = decoder.decode(new Uint8Array(memory.buffer, val_ptr, val_len)),
      O: (val) => store(table.get(val)),
      P: () => innerWidth,
      Q: () => innerHeight,
      R: () => devicePixelRatio,
      S: (obj, val) => objects[obj].width = val,
      T: (obj, val) => objects[obj].height = val,
      U: (obj, a) => store(objects[obj].createShader(a)),
      V: (obj, a, b_ptr, b_len) => objects[obj].shaderSource(objects[a], decoder.decode(new Uint8Array(memory.buffer, b_ptr, b_len))),
      W: (obj, a) => objects[obj].compileShader(objects[a]),
      X: (obj, a, b) => objects[obj].attachShader(objects[a], objects[b]),
      Y: (obj, a) => objects[obj].deleteShader(objects[a]),
      Z: (obj) => objects[obj].movementX,
      ab: (obj) => objects[obj].movementY,
      bb: (val) => store(((func = table.get(val)) => (a) => func(store(a)))()),
      cb: (obj) => objects[obj].requestFullscreen().then(() => objects[obj].requestPointerLock()),
      db: (obj) => store(objects[obj].touches),
      eb: (obj, idx) => store(objects[obj][idx]),
      fb: (obj) => objects[obj].identifier,
      gb: (obj) => objects[obj].screenX,
      hb: (obj) => objects[obj].screenY,
      ib: (obj) => objects[obj].preventDefault(),
      jb: (obj, val_ptr, val_len) => objects[obj].returnValue = decoder.decode(new Uint8Array(memory.buffer, val_ptr, val_len)),
      kb: (callback) => requestAnimationFrame(objects[callback]),
      lb: (obj, a) => objects[obj].clear(a),
      mb: (obj, a, b, c_ptr, c_len) => objects[obj].uniformMatrix4fv(objects[a], !!b, new Float32Array(memory.buffer, c_ptr, c_len)),
      nb: (obj, a) => objects[obj].deleteTexture(objects[a]),
      ob: (obj, a, b, c, d) => objects[obj].viewport(a, b, c, d),
      pb: (obj, a, b, c, d, e) => objects[obj].texStorage2D(a, b, c, d, e),
      qb: (obj) => store(objects[obj].createFramebuffer()),
      rb: (obj, a, b) => objects[obj].bindFramebuffer(a, objects[b]),
      sb: (obj, a, b, c, d, e) => objects[obj].framebufferTexture2D(a, b, c, objects[d], e),
      tb: (obj) => store(objects[obj].createRenderbuffer()),
      ub: (obj, a, b) => objects[obj].bindRenderbuffer(a, objects[b]),
      vb: (obj, a, b, c, d) => objects[obj].renderbufferStorage(a, b, c, d),
      wb: (obj, a, b, c, d) => objects[obj].framebufferRenderbuffer(a, b, c, objects[d]),
      xb: (obj, a) => objects[obj].depthMask(!!a),
      yb: (obj, a, b, c) => objects[obj].drawArrays(a, b, c),
      zb: (obj, a) => objects[obj].deleteBuffer(objects[a]),
      Ab: (obj, a) => objects[obj].deleteVertexArray(objects[a]),
      Bb: (obj, a, b) => objects[obj].pixelStorei(a, b),
      Cb: (obj, a, b, c, d, e, f, g, h, i, j_ptr, j_len) => objects[obj].texImage3D(a, b, c, d, e, f, g, h, i, new Uint8Array(memory.buffer, j_ptr, j_len)),
      Db: (obj, a, b_ptr, b_len) => objects[obj].uniform3fv(objects[a], new Float32Array(memory.buffer, b_ptr, b_len)),
      Eb: (obj, a, b, c, d) => objects[obj].drawElements(a, b, c, d),
      Fb: (ptr, len) => console.error(decoder.decode(new Uint8Array(memory.buffer, ptr, len))),
      Gb: (obj) => store(objects[obj].code),
      Hb: (obj, a) => objects[obj].deleteFramebuffer(objects[a]),
      Ib: (obj, a) => objects[obj].deleteRenderbuffer(objects[a]),
      Jb: (obj) => store(encoder.encode(objects[obj])),
    },
  }
);

const { __indirect_function_table: table, memory, _start } = instance.exports;
_start();
