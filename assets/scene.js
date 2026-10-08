// Procedural misty-mountain backdrops drawn on <canvas data-scene="...">.
(function () {
  var PRESETS = {
    hero: { seed: 11, layers: 7, top: .40, bottom: .98, horizon: .62,
      skyTop: [26, 34, 38], skyLow: [150, 152, 143], glow: [232, 214, 180], sun: [.74, .40],
      far: [134, 140, 136], near: [14, 19, 17], fog: [214, 214, 206] },
    dusk: { seed: 47, layers: 6, top: .46, bottom: 1.0, horizon: .70,
      skyTop: [20, 24, 28], skyLow: [98, 92, 82], glow: [214, 168, 114], sun: [.24, .58],
      far: [92, 94, 90], near: [11, 14, 13], fog: [180, 170, 152] }
  };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function rng(s) { return function () { s |= 0; s = s + 0x6D2B79F5 | 0; var t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function noise1(seed) {
    var r = rng(seed), v = []; for (var i = 0; i < 512; i++) v.push(r());
    return function (x) { var i = Math.floor(x), f = x - i, a = v[i & 511], b = v[(i + 1) & 511]; f = f * f * (3 - 2 * f); return a + (b - a) * f; };
  }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function mix(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]; }
  function rgb(c, a) { return 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + (a == null ? 1 : a) + ')'; }
  function mk(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

  function Scene(canvas, o) {
    this.c = canvas; this.x = canvas.getContext('2d'); this.o = o; this.t = 0; this.visible = true; this.bw = 0; this.bh = 0;
    this.build();
    var self = this;
    if ('ResizeObserver' in window) new ResizeObserver(function () {
      // phones resize the viewport while the URL bar slides; only rebuild on real changes
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (Math.abs(w - self.bw) > 2 || Math.abs(h - self.bh) / (self.bh || 1) > .18) { self.build(); self.draw(); }
    }).observe(canvas);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { self.visible = e[0].isIntersecting; }).observe(canvas);
  }
  Scene.prototype.build = function () {
    var o = this.o, w = this.c.clientWidth || 800, h = this.c.clientHeight || 600;
    var small = w < 700, dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
    this.bw = w; this.bh = h; this.w = w; this.h = h; this.d = dpr;
    this.c.width = Math.round(w * dpr); this.c.height = Math.round(h * dpr);
    var sky = mk(this.c.width, this.c.height), s = sky.getContext('2d'); s.scale(dpr, dpr);
    var g = s.createLinearGradient(0, 0, 0, h); g.addColorStop(0, rgb(o.skyTop)); g.addColorStop(o.horizon, rgb(o.skyLow)); g.addColorStop(1, rgb(o.skyLow));
    s.fillStyle = g; s.fillRect(0, 0, w, h);
    var sx = w * o.sun[0], sy = h * o.sun[1], sg = s.createRadialGradient(sx, sy, 0, sx, sy, Math.max(w, h) * .55);
    sg.addColorStop(0, rgb(o.glow, .55)); sg.addColorStop(.25, rgb(o.glow, .18)); sg.addColorStop(1, rgb(o.glow, 0));
    s.fillStyle = sg; s.fillRect(0, 0, w, h);
    this.sky = sky;
    var n = small ? Math.max(5, o.layers - 1) : o.layers, pad = Math.round(w * .12);
    // ridges are drawn against a width that never drops below 900px so phones get real mountain shapes, not spikes
    var scaleW = Math.max(w, 900);
    this.layers = [];
    for (var L = 0; L < n; L++) {
      var k = L / (n - 1), lw = w + pad * 2, cv = mk(Math.round(lw * dpr), this.c.height), x = cv.getContext('2d'); x.scale(dpr, dpr);
      var nz = noise1(o.seed + L * 97), nz2 = noise1(o.seed + L * 131 + 7);
      var base = h * lerp(o.top, o.bottom, Math.pow(k, 1.15)), amp = h * lerp(.16, .07, k), freq = lerp(1.4, 3.2, k) / scaleW * 3;
      var col = mix(o.far, o.near, Math.pow(k, .85));
      x.beginPath(); x.moveTo(0, h);
      for (var px = 0; px <= lw; px += 2) {
        var X = px * freq, y = nz(X) + nz(X * 2.1) * .5 + nz(X * 4.3) * .25 + nz(X * 9.1) * .12, ridge = base - y * amp;
        if (k > .45) ridge -= nz2(px * .35 * 900 / scaleW) * nz2(px * .09 + 3) * h * lerp(0, .022, k);
        x.lineTo(px, ridge);
      }
      x.lineTo(lw, h); x.closePath();
      var lg = x.createLinearGradient(0, base - amp, 0, h); lg.addColorStop(0, rgb(col)); lg.addColorStop(1, rgb(mix(col, o.near, .4)));
      x.fillStyle = lg; x.fill();
      var fg = x.createLinearGradient(0, base - amp * .2, 0, base + h * .12);
      fg.addColorStop(0, rgb(o.fog, 0)); fg.addColorStop(.6, rgb(o.fog, lerp(.38, .12, k))); fg.addColorStop(1, rgb(o.fog, 0));
      x.fillStyle = fg; x.fillRect(0, base - amp * .2, lw, h * .2);
      this.layers.push({ cv: cv, k: k, pad: pad });
    }
    this.mist = [];
    var mr = rng(o.seed + 999);
    for (var m = 0; m < 3; m++) {
      var mw = w * 1.6, mc = mk(Math.round(mw * dpr), Math.round(h * .4 * dpr)), mx = mc.getContext('2d'); mx.scale(dpr, dpr);
      for (var b = 0; b < 26; b++) {
        var cx = mr() * mw, cy = h * .2 * (.85 + mr() * .3), rr = Math.min(w * (.08 + mr() * .14), h * .17);
        var rg = mx.createRadialGradient(cx, cy, 0, cx, cy, rr); rg.addColorStop(0, rgb(o.fog, .16)); rg.addColorStop(1, rgb(o.fog, 0));
        mx.fillStyle = rg; mx.fillRect(cx - rr, cy - rr, rr * 2, rr * 2);
      }
      this.mist.push({ cv: mc, y: h * lerp(o.top + .05, o.bottom - .05, m / 2), speed: lerp(4, 10, m / 2), w: mw });
    }
  };
  Scene.prototype.draw = function () {
    var x = this.x, d = this.d, h = this.h, t = this.t;
    x.setTransform(1, 0, 0, 1, 0, 0);
    x.drawImage(this.sky, 0, 0);
    var rect = this.c.getBoundingClientRect(), sc = Math.max(-1, Math.min(1, -rect.top / (h || 1)));
    for (var i = 0; i < this.layers.length; i++) {
      var L = this.layers[i], drift = Math.sin(t * .00004 * (1 + L.k) + i) * L.pad * .35 * L.k, par = -sc * h * .12 * (1 - L.k);
      x.drawImage(L.cv, (-L.pad + drift) * d, par * d);
      if (i % 2 === 1) {
        var M = this.mist[(i - 1) / 2];
        if (M) { var off = (t * .001 * M.speed) % M.w; x.drawImage(M.cv, -off * d, (M.y - h * .2 + par) * d); x.drawImage(M.cv, (M.w - off) * d, (M.y - h * .2 + par) * d); }
      }
    }
  };

  function start() {
    var scenes = [].slice.call(document.querySelectorAll('canvas[data-scene]')).map(function (c) {
      return new Scene(c, PRESETS[c.dataset.scene] || PRESETS.hero);
    });
    scenes.forEach(function (s) { s.draw(); });
    if (reduce || window.HAOSU_STATIC) return;
    var last = performance.now();
    (function loop(now) {
      var dt = Math.min(64, now - last); last = now;
      if (!document.hidden) scenes.forEach(function (s) { if (s.visible) { s.t += dt; s.draw(); } });
      requestAnimationFrame(loop);
    })(last);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
