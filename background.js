function initBackground(canvasId = 'bg') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error('Canvas not found:', canvasId);
    return;
  }
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const PARTICLE_COUNT = 100;

  function createParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        color: ['#ffffff','#d8b4f8','#a78bfa'][Math.floor(Math.random()*3)]
      });
    }
  }
  createParticles();

  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.color;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
      if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;
    }
    requestAnimationFrame(animate);
  }
  animate();
}

window.initBackground = initBackground;
