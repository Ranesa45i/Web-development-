/* ===== LOADER ===== */
  (function() {
    const loader = document.getElementById('loader');
    const pct = document.getElementById('loader-pct');
    let progress = 0;
    const id = setInterval(() => {
      progress += Math.random() * 12 + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(id);
        pct.textContent = '100%';
        setTimeout(() => { loader.classList.add('hidden'); }, 400);
        return;
      }
      pct.textContent = Math.floor(progress) + '%';
    }, 120);
  })();

  /* ===== MATRIX RAIN ===== */
  (function() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    const chars = 'アイウエオカキクケコｱｲｳｴｵ01ABCDEF<>/*#$%CYBORGX2077'.split('');
    const fontSize = 16;
    let drops;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = new Array(Math.floor(canvas.width / fontSize)).fill(1);
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.fillStyle = 'rgba(10, 8, 20, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const isHead = Math.random() > 0.975;
        ctx.fillStyle = isHead ? 'rgba(220,255,255,0.9)' : 'rgba(0,220,255,0.7)';
        ctx.fillText(text, x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ===== MOUSE GLOW ===== */
  (function() {
    const el = document.getElementById('mouse-glow');
    window.addEventListener('mousemove', (e) => {
      el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, oklch(0.85 0.22 210 / 0.12), transparent 50%)`;
    });
  })();

  /* ===== SCROLL REVEAL ===== */
  (function() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '-80px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
  })();

  /* ===== COUNTER ANIMATION ===== */
  (function() {
    const counters = document.querySelectorAll('[data-target]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const to = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const decimals = parseInt(el.dataset.decimals || '0');
        const duration = 2000;
        const start = performance.now();

        function tick(now) {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = eased * to;
          el.textContent = val.toFixed(decimals) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.3 });

    counters.forEach(c => obs.observe(c));
  })();