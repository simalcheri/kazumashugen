(function () {
  const kanji = ['愛','夢','花','風','月','星','空','海','心','魂','桜','光','水','火','雪','力','美','詩','歌','道'];
  const particles = [];

  // ── 1. Hide default cursor ─────────────────────────────────────────────────
  const hideStyle = document.createElement('style');
  hideStyle.textContent = '*, *::before, *::after { cursor: none !important; }';
  document.head.appendChild(hideStyle);

  // ── 2. Tilted fountain pen SVG (40° like a natural arrow) ─────────────────
  const penSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
  <g transform="translate(28,28) rotate(40) translate(-6,-5)">
    <rect x="-6" y="-28" width="12" height="28" rx="3.5" fill="#1a1a2e" stroke="#c8a96e" stroke-width="0.8"/>
    <rect x="-4" y="-26" width="3" height="20" rx="1.5" fill="#ffffff" opacity="0.1"/>
    <rect x="4" y="-27" width="2" height="20" rx="1" fill="#ffd700"/>
    <rect x="-7" y="0" width="14" height="7" rx="1.5" fill="#0f0f1e" stroke="#c8a96e" stroke-width="0.6"/>
    <path d="M-6 7 L6 7 L4 13 L-4 13 Z" fill="#c8a96e"/>
    <path d="M-4 13 L4 13 L0 22 Z" fill="#e8e8e8" stroke="#aaa" stroke-width="0.4"/>
    <line x1="0" y1="13" x2="0" y2="22" stroke="#888" stroke-width="0.5"/>
    <rect x="-6" y="-29" width="12" height="3" rx="1.5" fill="#ffd700" opacity="0.8"/>
    <ellipse cx="0" cy="23" rx="1.2" ry="0.8" fill="#1e3a5f" opacity="0.9"/>
  </g>
</svg>`;

  const encoded = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(penSVG)));

  const cursorStyle = document.createElement('style');
  cursorStyle.textContent = `html, body, * { cursor: url("${encoded}") 8 48, none !important; }`;
  document.head.appendChild(cursorStyle);

  // ── 3. Kanji particles canvas ──────────────────────────────────────────────
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', function (e) {
    if (Math.random() > 0.4) return;
    particles.push({
      x:   e.clientX,
      y:   e.clientY,
      c:   kanji[Math.floor(Math.random() * kanji.length)],
      s:   Math.random() * 14 + 10,
      o:   1,
      sy:  -(Math.random() * 1.5 + 0.5),
      sx:  (Math.random() - 0.5) * 1.2,
      col: ['#c8a96e','#f0d090','#e8c870','#ffd700','#ffb7c5'][Math.floor(Math.random() * 5)]
    });
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.y  += p.sy;
      p.x  += p.sx;
      p.o  -= 0.018;
      ctx.save();
      ctx.globalAlpha = p.o;
      ctx.fillStyle   = p.col;
      ctx.font        = 'bold ' + p.s + 'px serif';
      ctx.shadowColor = p.col;
      ctx.shadowBlur  = 8;
      ctx.fillText(p.c, p.x, p.y);
      ctx.restore();
      if (p.o <= 0) particles.splice(i, 1);
    }
    requestAnimationFrame(animate);
  }
  animate();
})();
