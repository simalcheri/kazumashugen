(function () {
  const kanji = ['愛','夢','花','風','月','星','空','海','心','魂','桜','光','水','火','雪','力','美','詩','歌','道'];
  const particles = [];

  // ── 1. Hide default cursor everywhere ──────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = '*, *::before, *::after { cursor: none !important; }';
  document.head.appendChild(style);

  // ── 2. Japanese brush SVG cursor ───────────────────────────────────────────
  const brushSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <rect x="17" y="1" width="6" height="18" rx="2"
        fill="#2a1a0a" stroke="#c8a96e" stroke-width="0.6"/>
  <rect x="15.5" y="17" width="9" height="4" rx="1"
        fill="#b8960c" stroke="#ffd700" stroke-width="0.5"/>
  <path d="M15.5 21 Q12 28 14 35 Q17 39 20 39 Q23 39 26 35 Q28 28 24.5 21 Z"
        fill="#1a1a1a"/>
  <path d="M18 22 Q16 28 17 34 Q18 37 20 38"
        fill="none" stroke="#555" stroke-width="0.8" opacity="0.6"/>
  <ellipse cx="20" cy="37.5" rx="2.2" ry="1.2"
           fill="#111" opacity="0.85"/>
  <rect x="18.5" y="3" width="2" height="10" rx="1"
        fill="#c8a96e" opacity="0.3"/>
</svg>`;

  const encoded = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(brushSVG)));

  const cursorStyle = document.createElement('style');
  cursorStyle.textContent = `
    html, body, * {
      cursor: url("${encoded}") 20 38, none !important;
    }
  `;
  document.head.appendChild(cursorStyle);

  // ── 3. Canvas for floating kanji particles ──────────────────────────────────
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
      ctx.globalAlpha  = p.o;
      ctx.fillStyle    = p.col;
      ctx.font         = 'bold ' + p.s + 'px serif';
      ctx.shadowColor  = p.col;
      ctx.shadowBlur   = 8;
      ctx.fillText(p.c, p.x, p.y);
      ctx.restore();
      if (p.o <= 0) particles.splice(i, 1);
    }
    requestAnimationFrame(animate);
  }
  animate();
})();
