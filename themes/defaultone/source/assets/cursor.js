(function () {
  const kanji = ['愛','夢','花','風','月','星','空','海','心','魂','桜','光','水','火','雪','力','美','詩','歌','道'];
  const particles = [];

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', function (e) {
    if (Math.random() > 0.4) return;
    particles.push({
      x: e.clientX,
      y: e.clientY,
      c: kanji[Math.floor(Math.random() * kanji.length)],
      s: Math.random() * 14 + 10,
      o: 1,
      sy: -(Math.random() * 1.5 + 0.5),
      sx: (Math.random() - 0.5) * 1.2,
      col: ['#c8a96e', '#f0d090', '#e8c870', '#ffd700', '#ffb7c5'][Math.floor(Math.random() * 5)]
    });
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.y += p.sy;
      p.x += p.sx;
      p.o -= 0.018;
      ctx.save();
      ctx.globalAlpha = p.o;
      ctx.fillStyle = p.col;
      ctx.font = 'bold ' + p.s + 'px serif';
      ctx.shadowColor = p.col;
      ctx.shadowBlur = 8;
      ctx.fillText(p.c, p.x, p.y);
      ctx.restore();
      if (p.o <= 0) particles.splice(i, 1);
    }
    requestAnimationFrame(animate);
  }
  animate();
})();
