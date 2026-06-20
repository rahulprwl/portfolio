import { useEffect, useRef } from "react";

// Developer-themed floating glyphs
const GLYPHS = [
  "const",
  "=>",
  "{}",
  "[]",
  "async",
  "await",
  "npm",
  "git",
  "push",
  "import",
  "export",
  "class",
  "return",
  "===",
  "!==",
  "&&",
  "||",
  "??",
  "</>",
  "<div>",
  "fn()",
  "if()",
  "for()",
  "new",
  "null",
  "true",
  "false",
  "try",
  "catch",
  "type",
  "interface",
  "extends",
  "React",
  "useState",
  "useEffect",
  "0x1f",
  "API",
  "REST",
  "SQL",
  "JWT",
  "SSH",
  "C#",
  "Python",
  "Java",
  "Docker",
  "Kubernetes",
  "Cloud",
  "AWS",
  "Azure",
  "GCP",
  "Linux",
  "Bash",
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animId;
    let W, H;
    let particles = [];
    let glyphs = [];

    // ─── Resize ───────────────────────────────────────────────────────────────
    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    // ─── Dot particles ────────────────────────────────────────────────────────
    const PARTICLE_COUNT = 55;
    function initParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: randomBetween(0, W),
        y: randomBetween(0, H),
        r: randomBetween(0.8, 2.2),
        vx: randomBetween(-0.12, 0.12),
        vy: randomBetween(-0.08, 0.08),
        alpha: randomBetween(0.15, 0.45),
      }));
    }

    // ─── Floating code glyphs ─────────────────────────────────────────────────
    const GLYPH_COUNT = 22;
    function initGlyphs() {
      glyphs = Array.from({ length: GLYPH_COUNT }, () => ({
        text: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        x: randomBetween(0, W),
        y: randomBetween(0, H),
        vy: randomBetween(-0.18, -0.06),
        vx: randomBetween(-0.05, 0.05),
        alpha: randomBetween(0.04, 0.14),
        size: Math.floor(randomBetween(10, 18)),
        drift: randomBetween(0, Math.PI * 2),
        driftSpeed: randomBetween(0.003, 0.008),
      }));
    }

    initParticles();
    initGlyphs();

    // ─── Draw dot grid ────────────────────────────────────────────────────────
    function drawGrid() {
      const spacing = 36;
      const dotR = 0.8;
      ctx.fillStyle = "rgba(99,102,241,0.18)";
      for (let x = spacing / 2; x < W; x += spacing) {
        for (let y = spacing / 2; y < H; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // ─── Draw radial glows ────────────────────────────────────────────────────
    function drawGlows() {
      // Main central glow
      const gx = W * 0.5,
        gy = H * 0.38;
      const rMain = Math.min(W, H) * 0.72;
      const gMain = ctx.createRadialGradient(gx, gy, 0, gx, gy, rMain);
      gMain.addColorStop(0, "rgba(99,102,241,0.10)");
      gMain.addColorStop(0.45, "rgba(99,102,241,0.04)");
      gMain.addColorStop(1, "rgba(99,102,241,0)");
      ctx.fillStyle = gMain;
      ctx.fillRect(0, 0, W, H);

      // Secondary top-right accent
      const ax = W * 0.82,
        ay = H * 0.12;
      const rAcc = Math.min(W, H) * 0.38;
      const gAcc = ctx.createRadialGradient(ax, ay, 0, ax, ay, rAcc);
      gAcc.addColorStop(0, "rgba(139,92,246,0.09)");
      gAcc.addColorStop(1, "rgba(139,92,246,0)");
      ctx.fillStyle = gAcc;
      ctx.fillRect(0, 0, W, H);

      // Bottom-left accent
      const bx = W * 0.12,
        by = H * 0.88;
      const rBl = Math.min(W, H) * 0.32;
      const gBl = ctx.createRadialGradient(bx, by, 0, bx, by, rBl);
      gBl.addColorStop(0, "rgba(79,70,229,0.07)");
      gBl.addColorStop(1, "rgba(79,70,229,0)");
      ctx.fillStyle = gBl;
      ctx.fillRect(0, 0, W, H);
    }

    // ─── Draw connecting lines between close particles ─────────────────────
    function drawLines() {
      const MAX_DIST = 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const fade = 1 - dist / MAX_DIST;
            ctx.strokeStyle = `rgba(99,102,241,${fade * 0.12})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // ─── Animate ──────────────────────────────────────────────────────────────
    let t = 0;
    function tick() {
      t++;
      ctx.clearRect(0, 0, W, H);

      // 1. dot grid
      drawGrid();

      // 2. glows
      drawGlows();

      // 3. connecting lines
      drawLines();

      // 4. particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.alpha})`;
        ctx.fill();
      }

      // 5. floating code glyphs
      ctx.font = "";
      for (const g of glyphs) {
        g.y += g.vy;
        g.drift += g.driftSpeed;
        g.x += Math.sin(g.drift) * 0.3 + g.vx;

        // wrap
        if (g.y < -40) {
          g.y = H + 20;
          g.x = randomBetween(0, W);
          g.text = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        if (g.x < -80) g.x = W + 20;
        if (g.x > W + 80) g.x = -20;

        ctx.font = `${g.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `rgba(129,140,248,${g.alpha})`;
        ctx.fillText(g.text, g.x, g.y);
      }

      animId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
