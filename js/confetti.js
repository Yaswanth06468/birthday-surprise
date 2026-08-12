/**
 * Confetti & Floating Hearts Emitter
 */

class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.isRunning = false;
    this.animationFrame = null;

    this.colors = ['#ff758c', '#ff7eb3', '#f78ca0', '#fe9a8b', '#ffd1dc', '#ffffff', '#ffd700'];
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(count = 100) {
    this.resizeCanvas();
    for (let i = 0; i < count; i++) {
      this.particles.push(new ConfettiParticle(
        window.innerWidth / 2,
        window.innerHeight / 2,
        this.colors[Math.floor(Math.random() * this.colors.length)]
      ));
    }
    if (!this.isRunning) {
      this.isRunning = true;
      this.loop();
    }
  }

  shower(durationMs = 3000) {
    this.resizeCanvas();
    const interval = setInterval(() => {
      for (let i = 0; i < 8; i++) {
        this.particles.push(new ShowerParticle(
          Math.random() * window.innerWidth,
          -10,
          this.colors[Math.floor(Math.random() * this.colors.length)]
        ));
      }
    }, 50);

    if (!this.isRunning) {
      this.isRunning = true;
      this.loop();
    }

    setTimeout(() => {
      clearInterval(interval);
    }, durationMs);
  }

  loop() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update();
      p.draw(this.ctx);
      if (p.alpha <= 0 || p.y > window.innerHeight + 20) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length > 0) {
      this.animationFrame = requestAnimationFrame(() => this.loop());
    } else {
      this.isRunning = false;
    }
  }
}

class ConfettiParticle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = Math.random() * 8 + 6;
    this.vx = (Math.random() - 0.5) * 14;
    this.vy = (Math.random() - 0.7) * 16;
    this.gravity = 0.4;
    this.friction = 0.98;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.2;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.008;
    this.isHeart = Math.random() > 0.4;
  }

  update() {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
    this.alpha -= this.decay;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;

    if (this.isHeart) {
      ctx.beginPath();
      const topCurveHeight = this.size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
      ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, this.size, 0, this.size);
      ctx.bezierCurveTo(0, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight, this.size / 2, topCurveHeight);
      ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.fill();
    } else {
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
    }

    ctx.restore();
  }
}

class ShowerParticle extends ConfettiParticle {
  constructor(x, y, color) {
    super(x, y, color);
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = Math.random() * 4 + 2;
    this.gravity = 0.1;
  }
}

if (typeof window !== "undefined") {
  window.ConfettiEngine = ConfettiEngine;
}
