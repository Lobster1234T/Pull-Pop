/*
 * <avatar-club-animation> — анимированная заставка для компьютерного клуба «Аватар».
 * Один файл, без зависимостей, работает в любом проекте (HTML, React, Vue, Next и т.д.).
 *
 * Атрибуты (все необязательные):
 *   text      — крупный заголовок            (по умолчанию "AVATAR")
 *   subtitle  — строка под заголовком        (по умолчанию "КОМПЬЮТЕРНЫЙ КЛУБ")
 *   color-a   — первый акцентный цвет #rrggbb (по умолчанию #8a5cff)
 *   color-b   — второй акцентный цвет #rrggbb (по умолчанию #19e3ff)
 *   font      — CSS font-family              (по умолчанию Unbounded, "Arial Black", sans-serif)
 *   speed     — скорость, 1 = обычная        (по умолчанию 1)
 *
 * Методы: play(), pause(), replay()
 * Событие: "intro-end" — когда закончилось появление букв.
 */
(function () {
  'use strict';
  if (typeof customElements === 'undefined' || customElements.get('avatar-club-animation')) return;

  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function easeOutBack(x) { var c1 = 1.3, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); }
  function hash(n) { var x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); }
  function parseHex(hex, fallback) {
    var m = /^#?([0-9a-f]{6})$/i.exec((hex || '').trim());
    var v = parseInt((m ? m[1] : fallback), 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  }
  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }

  var STYLE = ':host{display:block;position:relative;width:100%;aspect-ratio:16/9;background:#05060d;overflow:hidden;contain:layout paint}' +
    'canvas{position:absolute;inset:0;width:100%;height:100%;display:block}';

  class AvatarClubAnimation extends HTMLElement {
    static get observedAttributes() { return ['text', 'subtitle', 'color-a', 'color-b', 'font', 'speed']; }

    constructor() {
      super();
      var root = this.attachShadow({ mode: 'open' });
      root.innerHTML = '<style>' + STYLE + '</style><canvas role="img"></canvas>';
      this._cv = root.querySelector('canvas');
      this._ctx = this._cv.getContext('2d');
      this._T = 0;
      this._playing = true;
      this._visible = true;
      this._introDone = false;
      this._raf = 0;
      this._last = 0;
      this._w = 0; this._h = 0; this._dpr = 1;
      this._parts = [];
      for (var i = 0; i < 90; i++) {
        this._parts.push({ x: Math.random(), y: Math.random(), s: 0.6 + Math.random() * 1.8, v: 0.4 + Math.random() * 1.2, ph: Math.random() * 6.28, k: Math.random() });
      }
      this._tick = this._tick.bind(this);
      this._resize = this._resize.bind(this);
      this._reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (this._reduce) { this._T = 4; this._playing = false; }
    }

    connectedCallback() {
      this._cv.setAttribute('aria-label', (this.getAttribute('text') || 'AVATAR') + ' — ' + (this.getAttribute('subtitle') || 'компьютерный клуб'));
      if (typeof ResizeObserver === 'function') {
        this._ro = new ResizeObserver(this._resize);
        this._ro.observe(this);
      } else {
        window.addEventListener('resize', this._resize);
      }
      if (typeof IntersectionObserver === 'function') {
        this._io = new IntersectionObserver((e) => { this._visible = e[0].isIntersecting; });
        this._io.observe(this);
      }
      this._resize();
      if (!this._reduce) {
        this._last = performance.now();
        this._raf = requestAnimationFrame(this._tick);
      }
    }

    disconnectedCallback() {
      cancelAnimationFrame(this._raf);
      if (this._ro) this._ro.disconnect();
      if (this._io) this._io.disconnect();
      window.removeEventListener('resize', this._resize);
    }

    attributeChangedCallback() {
      if (this._cv && this._w) this._draw(this._T);
    }

    play() { this._playing = true; }
    pause() { this._playing = false; }
    replay() { this._T = 0; this._introDone = false; this._playing = true; }

    _resize() {
      var w = this.clientWidth, h = this.clientHeight;
      if (!w || !h) return;
      this._w = w; this._h = h;
      this._dpr = Math.min(window.devicePixelRatio || 1, 2);
      this._cv.width = Math.round(w * this._dpr);
      this._cv.height = Math.round(h * this._dpr);
      var p = document.createElement('canvas'); p.width = 1; p.height = 3;
      var pc = p.getContext('2d'); pc.fillStyle = 'rgba(0,0,0,0.2)'; pc.fillRect(0, 0, 1, 1);
      this._scan = this._ctx.createPattern(p, 'repeat');
      this._draw(this._T);
    }

    _tick(now) {
      this._raf = requestAnimationFrame(this._tick);
      var dt = Math.min((now - this._last) / 1000, 0.1);
      this._last = now;
      if (!this._visible) return;
      var speed = parseFloat(this.getAttribute('speed')) || 1;
      if (this._playing) this._T += dt * speed;
      if (!this._introDone && this._T > 2.4) {
        this._introDone = true;
        this.dispatchEvent(new CustomEvent('intro-end'));
      }
      this._draw(this._T);
    }

    _draw(T) {
      var c = this._ctx, w = this._w, h = this._h;
      if (!w || !h) return;
      var A = parseHex(this.getAttribute('color-a'), '8a5cff');
      var B = parseHex(this.getAttribute('color-b'), '19e3ff');
      var font = this.getAttribute('font') || 'Unbounded, "Arial Black", sans-serif';
      var text = this.getAttribute('text') || 'AVATAR';
      var sub = this.getAttribute('subtitle');
      if (sub === null) sub = 'КОМПЬЮТЕРНЫЙ КЛУБ';

      c.setTransform(this._dpr, 0, 0, this._dpr, 0, 0);
      c.globalCompositeOperation = 'source-over';
      c.globalAlpha = 1;
      c.shadowBlur = 0;
      c.fillStyle = '#05060d';
      c.fillRect(0, 0, w, h);

      var cx = w / 2, hz = h * 0.64, m = Math.min(w, h);

      /* фоновое свечение */
      var g = c.createRadialGradient(cx, hz * 0.78, 0, cx, hz * 0.78, w * 0.62);
      g.addColorStop(0, rgba(A, 0.3)); g.addColorStop(1, rgba(A, 0));
      c.fillStyle = g; c.fillRect(0, 0, w, h);

      /* сетка пола в перспективе */
      var gridIn = clamp(T / 1.2, 0, 1), i;
      c.save();
      c.beginPath(); c.rect(0, hz, w, h - hz); c.clip();
      c.lineWidth = 1;
      c.strokeStyle = rgba(A, 0.5 * gridIn);
      c.beginPath();
      for (i = -24; i <= 24; i++) { c.moveTo(cx, hz); c.lineTo(cx + i * w * 0.09, h); }
      c.stroke();
      var off = (T * 0.55) % 1, n = 16;
      for (var k = 0; k <= n; k++) {
        var z = (k + off) / n;
        if (z > 1) continue;
        var y = hz + (h - hz) * Math.pow(z, 2.4);
        c.strokeStyle = rgba(B, (0.12 + 0.6 * z) * gridIn);
        c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke();
      }
      c.restore();
      var hg = c.createLinearGradient(0, 0, w, 0);
      hg.addColorStop(0, rgba(B, 0)); hg.addColorStop(0.5, rgba(B, 0.9 * gridIn)); hg.addColorStop(1, rgba(B, 0));
      c.fillStyle = hg; c.fillRect(0, hz - 1, w, 2);

      /* расходящиеся шестиугольники */
      var tcy = h * 0.4;
      if (T > 0.8) {
        c.lineWidth = 1.5;
        for (var j = 0; j < 3; j++) {
          var p = ((T - 0.8) * 0.2 + j / 3) % 1;
          var r = p * Math.max(w, h) * 0.55;
          c.strokeStyle = rgba(j % 2 ? A : B, (1 - p) * 0.4 * clamp((T - 0.8) / 0.6, 0, 1));
          c.beginPath();
          for (var v = 0; v < 6; v++) {
            var a = Math.PI / 6 + v * Math.PI / 3;
            var px = cx + Math.cos(a) * r, py = tcy + Math.sin(a) * r;
            if (v) c.lineTo(px, py); else c.moveTo(px, py);
          }
          c.closePath(); c.stroke();
        }
      }

      /* частицы */
      c.globalCompositeOperation = 'lighter';
      for (i = 0; i < this._parts.length; i++) {
        var q = this._parts[i];
        var qy = (((q.y - T * q.v * 0.04) % 1) + 1) % 1;
        var qx = q.x + Math.sin(T * 0.5 + q.ph) * 0.012;
        c.fillStyle = rgba(q.k < 0.5 ? A : B, (0.25 + 0.5 * Math.abs(Math.sin(T * 1.2 + q.ph))) * gridIn);
        c.beginPath(); c.arc(qx * w, qy * h, q.s, 0, 6.2832); c.fill();
      }
      c.globalCompositeOperation = 'source-over';

      /* заголовок */
      var chars = text.split(''), N = chars.length;
      c.textBaseline = 'middle'; c.textAlign = 'left';
      c.font = '800 100px ' + font;
      var wd = [], total = 0;
      for (i = 0; i < N; i++) { wd[i] = c.measureText(chars[i]).width; total += wd[i]; }
      var fs = Math.min(h * 0.26, 100 * (w * 0.88) / Math.max(total, 1));
      var ratio = fs / 100; total *= ratio;
      for (i = 0; i < N; i++) wd[i] *= ratio;
      c.font = '800 ' + fs + 'px ' + font;
      var x0 = cx - total / 2, ty = tcy;

      var gs = 0;
      if (T > 2.2) {
        var ph1 = T % 3.4; if (ph1 < 0.22) gs = 1 - ph1 / 0.22;
        var ph2 = (T + 1.7) % 5.1; if (ph2 < 0.12) gs = Math.max(gs, 0.7 * (1 - ph2 / 0.12));
      }
      var d = fs * (0.012 + 0.05 * gs);

      function letters(ox, oy, color, alpha) {
        var x = x0;
        for (var s = 0; s < N; s++) {
          var pr = clamp((T - 0.2 - s * 0.1) / 0.75, 0, 1);
          var e = easeOutBack(pr);
          c.save();
          c.translate(x + wd[s] / 2 + ox, ty + (1 - e) * -fs * 1.4 + oy);
          var sc = 0.6 + 0.4 * e; c.scale(sc, sc);
          c.globalAlpha = clamp(pr * 2.2, 0, 1) * alpha;
          c.fillStyle = color;
          c.fillText(chars[s], -wd[s] / 2, 0);
          c.restore();
          x += wd[s];
        }
      }
      c.globalCompositeOperation = 'lighter';
      letters(-d, 0, rgba(A, 1), 0.9);
      letters(d, 0, rgba(B, 1), 0.9);
      c.globalCompositeOperation = 'source-over';
      c.shadowColor = rgba(B, 0.9); c.shadowBlur = fs * 0.3;
      letters(0, 0, '#f4f6ff', 1);
      c.shadowBlur = 0;
      if (gs > 0) {
        c.globalCompositeOperation = 'lighter';
        for (var sl = 0; sl < 4; sl++) {
          var seed = Math.floor(T * 30) + sl * 7;
          var y0 = ty - fs * 0.5 + hash(seed) * fs, hh = fs * (0.06 + 0.12 * hash(seed + 1));
          var dx = (hash(seed + 2) - 0.5) * fs * 0.6 * gs;
          c.save(); c.beginPath(); c.rect(0, y0, w, hh); c.clip();
          letters(dx, 0, rgba(B, 1), 0.9);
          c.restore();
        }
        c.globalCompositeOperation = 'source-over';
      }
      c.globalAlpha = 1;

      /* подзаголовок */
      if (sub) {
        var sa = clamp((T - 1.6) / 0.6, 0, 1);
        var ss = Math.max(11, fs * 0.14), sp = ss * 0.55, sy = ty + fs * 0.78;
        c.font = '800 ' + ss + 'px ' + font;
        var sw = 0, sws = [];
        for (i = 0; i < sub.length; i++) { sws[i] = c.measureText(sub[i]).width + sp; sw += sws[i]; }
        sw -= sp;
        if (sw > w * 0.92) { ss *= w * 0.92 / sw; sp *= w * 0.92 / sw; sw = w * 0.92; }
        var sx = cx - sw / 2;
        c.font = '800 ' + ss + 'px ' + font;
        c.globalAlpha = sa; c.fillStyle = 'rgba(244,246,255,0.85)';
        for (i = 0; i < sub.length; i++) { c.fillText(sub[i], sx, sy); sx += c.measureText(sub[i]).width + sp; }
        var ll = clamp((T - 1.8) / 0.9, 0, 1), lw = Math.min(w * 0.16, sw * 0.4) * ll;
        c.fillStyle = rgba(B, 0.9);
        c.fillRect(cx - sw / 2 - ss - lw, sy - 0.5, lw, 1.5);
        c.fillRect(cx + sw / 2 + ss, sy - 0.5, lw, 1.5);
        c.globalAlpha = 1;
      }

      /* угловые рамки */
      var ca = clamp((T - 0.3) / 0.6, 0, 1), mg = m * 0.045, ln = m * 0.06;
      c.strokeStyle = rgba(B, 0.85 * ca); c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(mg, mg + ln); c.lineTo(mg, mg); c.lineTo(mg + ln, mg);
      c.moveTo(w - mg - ln, mg); c.lineTo(w - mg, mg); c.lineTo(w - mg, mg + ln);
      c.moveTo(mg, h - mg - ln); c.lineTo(mg, h - mg); c.lineTo(mg + ln, h - mg);
      c.moveTo(w - mg - ln, h - mg); c.lineTo(w - mg, h - mg); c.lineTo(w - mg, h - mg - ln);
      c.stroke();

      /* линия сканирования, строки и виньетка */
      var by = ((T * 0.15) % 1.3 - 0.15) * h, bh = h * 0.12;
      var bg = c.createLinearGradient(0, by - bh, 0, by + bh);
      bg.addColorStop(0, rgba(B, 0)); bg.addColorStop(0.5, rgba(B, 0.07)); bg.addColorStop(1, rgba(B, 0));
      c.fillStyle = bg; c.fillRect(0, by - bh, w, bh * 2);
      if (this._scan) { c.fillStyle = this._scan; c.fillRect(0, 0, w, h); }
      var vg = c.createRadialGradient(cx, h / 2, m * 0.45, cx, h / 2, Math.max(w, h) * 0.7);
      vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.6)');
      c.fillStyle = vg; c.fillRect(0, 0, w, h);
    }
  }

  customElements.define('avatar-club-animation', AvatarClubAnimation);
})();
