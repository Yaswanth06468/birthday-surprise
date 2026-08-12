/**
 * Fireworks Engine for Birthday Surprise
 * Lightweight, high performance, canvas-based particles
 */

class FireworksEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.fireworks = [];
    this.isRunning = false;
    this.animationFrame = null;

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.particles = [];
    this.fireworks = [];
  }

  launch(x, y) {
    const startX = window.innerWidth * (0.2 + Math.random() * 0.6);
    const startY = window.innerHeight;
    const targetX = x || window.innerWidth * (0.1 + Math.random() * 0.8);
    const targetY = y || window.innerHeight * (0.1 + Math.random() * 0.4);

    this.fireworks.push(new Firework(startX, startY, targetX, targetY));
  }

  burstBatch(count = 5) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        if (this.isRunning) {
          this.launch();
        }
      }, i * 300);
    }
  }

  loop() {
    if (!this.isRunning) return;

    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalCompositeOperation = 'lighter';

    // Update fireworks
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      const fw = this.fireworks[i];
      fw.update();
      fw.draw(this.ctx);
      if (fw.arrived) {
        this.createParticles(fw.targetX, fw.targetY);
        this.fireworks.splice(i, 1);
      }
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update();
      p.draw(this.ctx);
      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }

    this.animationFrame = requestAnimationFrame(() => this.loop());
  }

  createParticles(x, y) {
    const particleCount = 45;
    const hue = Math.floor(Math.random() * 360);
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(x, y, hue));
    }
  }
}

class Firework {
  constructor(sx, sy, tx, ty) {
    this.x = sx;
    this.y = sy;
    this.sx = sx;
    this.sy = sy;
    this.targetX = tx;
    this.targetY = ty;
    this.distanceToTarget = Math.hypot(tx - sx, ty - sy);
    this.distanceTraveled = 0;
    this.coordinates = [];
    this.coordinateCount = 3;
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    this.angle = Math.atan2(ty - sy, tx - sx);
    this.speed = 3;
    this.acceleration = 1.04;
    this.brightness = Math.random() * 40 + 50;
    this.arrived = false;
  }

  update() {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    this.speed *= this.acceleration;
    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;
    this.distanceTraveled = Math.hypot(this.x - this.sx, this.y - this.sy);

    if (this.distanceTraveled >= this.distanceToTarget) {
      this.arrived = true;
    } else {
      this.x += vx;
      this.y += vy;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = 'hsl(' + Math.floor(Math.random() * 360) + ', 100%, ' + this.brightness + '%)';
    ctx.stroke();
  }
}

class Particle {
  constructor(x, y, hue) {
    this.x = x;
    this.y = y;
    this.coordinates = [];
    this.coordinateCount = 5;
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 8 + 1;
    this.friction = 0.95;
    this.gravity = 0.8;
    this.hue = hue + (Math.random() * 40 - 20);
    this.brightness = Math.random() * 30 + 60;
    this.alpha = 1;
    this.decay = Math.random() * 0.02 + 0.015;
  }

  update() {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);
    this.speed *= this.friction;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.alpha -= this.decay;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

if (typeof window !== "undefined") {
  window.FireworksEngine = FireworksEngine;
}
