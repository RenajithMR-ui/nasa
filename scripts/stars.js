// Interactive Canvas Starfield and 3D Planetary Simulation
// NASA Space Apps Challenge

class CosmicCanvasManager {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.starCount = 350;
    this.warpMode = false;
    this.warpSpeed = 1;
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.shootingStars = [];

    this.resize();
    this.initStars();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: (Math.random() - 0.5) * this.width * 2,
        y: (Math.random() - 0.5) * this.height * 2,
        z: Math.random() * this.width,
        radius: Math.random() * 1.5 + 0.5,
        baseColor: this.getRandomStarColor(),
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }
  }

  getRandomStarColor() {
    const colors = [
      'rgba(255, 255, 255, ',
      'rgba(200, 225, 255, ',
      'rgba(255, 230, 200, ',
      'rgba(180, 210, 255, ',
      'rgba(255, 200, 180, '
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  triggerWarp(duration = 2000) {
    this.warpMode = true;
    let start = performance.now();
    const easeWarp = (now) => {
      let progress = (now - start) / duration;
      if (progress < 0.5) {
        this.warpSpeed = 1 + (progress / 0.5) * 28;
      } else if (progress < 1) {
        this.warpSpeed = 29 - ((progress - 0.5) / 0.5) * 28;
      } else {
        this.warpMode = false;
        this.warpSpeed = 1;
        return;
      }
      requestAnimationFrame(easeWarp);
    };
    requestAnimationFrame(easeWarp);
  }

  spawnShootingStar() {
    if (Math.random() < 0.015 && this.shootingStars.length < 3) {
      this.shootingStars.push({
        x: Math.random() * this.width,
        y: Math.random() * (this.height / 2),
        len: Math.random() * 80 + 40,
        speed: Math.random() * 12 + 10,
        angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2,
        life: 1.0,
        decay: Math.random() * 0.02 + 0.015
      });
    }
  }

  drawShootingStars() {
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];
      const tailX = s.x - Math.cos(s.angle) * s.len;
      const tailY = s.y - Math.sin(s.angle) * s.len;

      const grad = this.ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      grad.addColorStop(0, 'rgba(0, 229, 255, 0)');
      grad.addColorStop(1, `rgba(255, 255, 255, ${s.life})`);

      this.ctx.beginPath();
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 1.8;
      this.ctx.moveTo(tailX, tailY);
      this.ctx.lineTo(s.x, s.y);
      this.ctx.stroke();

      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.life -= s.decay;

      if (s.life <= 0 || s.x > this.width + 100 || s.y > this.height + 100) {
        this.shootingStars.splice(i, 1);
      }
    }
  }

  animate() {
    this.ctx.fillStyle = 'rgba(5, 7, 15, 0.4)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const cx = this.width / 2;
    const cy = this.height / 2;
    const speed = this.warpMode ? this.warpSpeed : 0.6;

    // Slight parallax offset based on mouse position
    const offsetX = (this.mouse.x - cx) * 0.03;
    const offsetY = (this.mouse.y - cy) * 0.03;

    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.z -= speed;

      if (star.z <= 0) {
        star.z = this.width;
        star.x = (Math.random() - 0.5) * this.width * 2;
        star.y = (Math.random() - 0.5) * this.height * 2;
      }

      const k = 250 / star.z;
      const px = star.x * k + cx + offsetX;
      const py = star.y * k + cy + offsetY;

      if (px >= 0 && px < this.width && py >= 0 && py < this.height) {
        star.twinklePhase += star.twinkleSpeed;
        const alpha = Math.min(1, Math.max(0.15, (1 - star.z / this.width) * (0.7 + 0.3 * Math.sin(star.twinklePhase))));
        const size = Math.max(0.6, (1 - star.z / this.width) * (star.radius * 2));

        if (this.warpMode && this.warpSpeed > 5) {
          // Draw warp streak lines
          const prevK = 250 / (star.z + this.warpSpeed * 3);
          const prevX = star.x * prevK + cx + offsetX;
          const prevY = star.y * prevK + cy + offsetY;

          this.ctx.beginPath();
          this.ctx.strokeStyle = star.baseColor + alpha + ')';
          this.ctx.lineWidth = size * 0.9;
          this.ctx.moveTo(prevX, prevY);
          this.ctx.lineTo(px, py);
          this.ctx.stroke();
        } else {
          this.ctx.beginPath();
          this.ctx.fillStyle = star.baseColor + alpha + ')';
          this.ctx.arc(px, py, size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }

    this.spawnShootingStar();
    this.drawShootingStars();

    requestAnimationFrame(this.animate);
  }
}

// Interactive 3D Canvas Planet Renderer (Luna & Mars)
class PlanetVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.planetType = 'Mars'; // Default
    this.rotation = 0;
    this.radius = 140;
    this.beacons = [];
    this.isDragging = false;
    this.lastMouseX = 0;
    this.autoRotateSpeed = 0.003;
    this.hoveredBeacon = null;

    this.resize();
    this.initEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setPlanet(planet) {
    this.planetType = planet;
    this.updateBeacons();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const size = Math.min(rect.width, 420);
    this.canvas.width = size;
    this.canvas.height = size;
    this.radius = size * 0.36;
    this.updateBeacons();
  }

  updateBeacons() {
    // Generate simulated coordinates on sphere for current celestial relics
    if (this.planetType === 'Mars') {
      this.beacons = [
        { id: 'perseverance-rover', name: 'Perseverance & Ingenuity', lat: 18.38, lon: 77.58, site: 'Jezero Crater' },
        { id: 'curiosity-rover', name: 'Curiosity Rover', lat: -4.59, lon: 137.44, site: 'Gale Crater' },
        { id: 'opportunity-rover', name: 'Opportunity (MER-B)', lat: -1.95, lon: 354.47, site: 'Meridiani Planum' },
        { id: 'spirit-rover', name: 'Spirit (MER-A)', lat: -14.57, lon: 175.47, site: 'Gusev Crater' },
        { id: 'insight-lander', name: 'InSight Lander', lat: 4.5, lon: 135.62, site: 'Elysium Planitia' },
        { id: 'sojourner-pathfinder', name: 'Sojourner (Pathfinder)', lat: 19.33, lon: 335.55, site: 'Ares Vallis' },
        { id: 'viking-1-2', name: 'Viking 1 Lander', lat: 22.48, lon: 312.03, site: 'Chryse Planitia' }
      ];
    } else {
      this.beacons = [
        { id: 'apollo-descent-stages', name: 'Apollo 11 Eagle', lat: 0.67, lon: 23.47, site: 'Sea of Tranquility' },
        { id: 'apollo-lrv', name: 'Apollo 15 & 17 LRVs', lat: 26.13, lon: 3.63, site: 'Hadley Rille & Taurus-Littrow' },
        { id: 'surveyor-program', name: 'Surveyor 1 & 3', lat: -2.47, lon: 316.66, site: 'Ocean of Storms' },
        { id: 'lro-orbiter', name: 'LRO Sentinel Orbit', lat: 75.0, lon: 90.0, site: 'Lunar Polar Halo' },
        { id: 'lcross-satellite', name: 'LCROSS Impact Site', lat: -84.9, lon: 314.5, site: 'Cabeus Crater (South Pole)' }
      ];
    }
  }

  initEvents() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (this.isDragging) {
        const deltaX = e.clientX - this.lastMouseX;
        this.rotation += deltaX * 0.008;
        this.lastMouseX = e.clientX;
      }

      this.checkBeaconHover(mouseX, mouseY);
    });

    this.canvas.addEventListener('click', () => {
      if (this.hoveredBeacon && window.openRelicModal) {
        window.openRelicModal(this.hoveredBeacon.id);
        if (window.spaceAudio) window.spaceAudio.playRadarPing();
      }
    });

    window.addEventListener('resize', () => this.resize());
  }

  checkBeaconHover(mx, my) {
    this.hoveredBeacon = null;
    this.canvas.style.cursor = this.isDragging ? 'grabbing' : 'grab';

    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;

    for (let b of this.beacons) {
      const radLat = (b.lat * Math.PI) / 180;
      const radLon = (b.lon * Math.PI) / 180 + this.rotation;

      const x = cx + this.radius * Math.cos(radLat) * Math.sin(radLon);
      const y = cy - this.radius * Math.sin(radLat);
      const z = Math.cos(radLat) * Math.cos(radLon);

      if (z > 0) {
        const dist = Math.hypot(mx - x, my - y);
        if (dist < 18) {
          this.hoveredBeacon = b;
          this.canvas.style.cursor = 'pointer';
          break;
        }
      }
    }
  }

  animate() {
    if (!this.isDragging) {
      this.rotation += this.autoRotateSpeed;
    }

    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;
    const r = this.radius;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Planet Atmospheric Outer Glow
    const glowGrad = this.ctx.createRadialGradient(cx, cy, r * 0.85, cx, cy, r * 1.35);
    if (this.planetType === 'Mars') {
      glowGrad.addColorStop(0, 'rgba(255, 87, 34, 0.4)');
      glowGrad.addColorStop(0.5, 'rgba(230, 81, 0, 0.15)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      glowGrad.addColorStop(0, 'rgba(129, 212, 250, 0.35)');
      glowGrad.addColorStop(0.5, 'rgba(92, 107, 192, 0.1)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }
    this.ctx.fillStyle = glowGrad;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r * 1.35, 0, Math.PI * 2);
    this.ctx.fill();

    // 2. Planet Body Sphere Base
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
    this.ctx.clip();

    // Planetary texture layers
    if (this.planetType === 'Mars') {
      // Mars rust sphere with atmospheric gradient
      const marsGrad = this.ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r);
      marsGrad.addColorStop(0, '#ff7043');
      marsGrad.addColorStop(0.4, '#d84315');
      marsGrad.addColorStop(0.8, '#872105');
      marsGrad.addColorStop(1, '#2c0b02');
      this.ctx.fillStyle = marsGrad;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Mars latitude dust bands & dark maria features
      this.ctx.fillStyle = 'rgba(74, 20, 140, 0.12)';
      for (let i = -4; i <= 4; i++) {
        let bandY = cy + i * (r / 5);
        this.ctx.beginPath();
        this.ctx.ellipse(cx, bandY, r * 0.95, r * 0.18, 0, 0, Math.PI * 2);
        this.ctx.fill();
      }

      // Rotating surface spots (craters & valleys)
      for (let i = 0; i < 9; i++) {
        let spotLon = i * 0.7 + this.rotation;
        let spotX = cx + r * 0.7 * Math.sin(spotLon);
        let spotY = cy + Math.sin(i * 1.4) * (r * 0.5);
        let spotVisible = Math.cos(spotLon);

        if (spotVisible > 0) {
          this.ctx.fillStyle = `rgba(50, 10, 5, ${spotVisible * 0.28})`;
          this.ctx.beginPath();
          this.ctx.arc(spotX, spotY, 14 + (i % 3) * 8, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }

      // Mars polar ice caps
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      this.ctx.beginPath();
      this.ctx.ellipse(cx, cy - r * 0.88, r * 0.35, r * 0.12, 0, 0, Math.PI * 2);
      this.ctx.fill();
    } else {
      // Lunar Regolith Silver-Gray
      const moonGrad = this.ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r);
      moonGrad.addColorStop(0, '#f0f3fa');
      moonGrad.addColorStop(0.4, '#b0b8c6');
      moonGrad.addColorStop(0.8, '#596275');
      moonGrad.addColorStop(1, '#1b1f28');
      this.ctx.fillStyle = moonGrad;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Lunar Maria (Dark basaltic plains)
      this.ctx.fillStyle = 'rgba(27, 31, 40, 0.35)';
      for (let i = 0; i < 7; i++) {
        let mariaLon = i * 0.9 + this.rotation;
        let mx = cx + r * 0.75 * Math.sin(mariaLon);
        let my = cy + Math.cos(i * 2.1) * (r * 0.45);
        let mVisible = Math.cos(mariaLon);
        if (mVisible > 0) {
          this.ctx.beginPath();
          this.ctx.ellipse(mx, my, (22 + i * 4) * mVisible, 18, 0.3, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }

    // Planetary terminator / shadow curve
    const shadowGrad = this.ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.2, r * 0.2, cx + r * 0.4, cy + r * 0.3, r * 1.05);
    shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    shadowGrad.addColorStop(0.75, 'rgba(2, 4, 10, 0.6)');
    shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
    this.ctx.fillStyle = shadowGrad;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.restore();

    // 3. Draw Orbit Rings & Interactive Landing Site Radar Beacons
    this.drawBeacons(cx, cy, r);

    requestAnimationFrame(this.animate);
  }

  drawBeacons(cx, cy, r) {
    const time = performance.now() * 0.003;

    for (let b of this.beacons) {
      const radLat = (b.lat * Math.PI) / 180;
      const radLon = (b.lon * Math.PI) / 180 + this.rotation;

      const z = Math.cos(radLat) * Math.cos(radLon);

      if (z > -0.1) {
        const x = cx + r * Math.cos(radLat) * Math.sin(radLon);
        const y = cy - r * Math.sin(radLat);
        const isHovered = this.hoveredBeacon && this.hoveredBeacon.id === b.id;
        const opacity = Math.max(0.2, z);

        // Radar ping ring
        const pingRadius = 6 + (Math.sin(time + b.lat) * 0.5 + 0.5) * 10;
        this.ctx.beginPath();
        this.ctx.arc(x, y, pingRadius, 0, Math.PI * 2);
        this.ctx.strokeStyle = this.planetType === 'Mars' 
          ? `rgba(255, 87, 34, ${0.4 * opacity})` 
          : `rgba(0, 229, 255, ${0.4 * opacity})`;
        this.ctx.lineWidth = 1.2;
        this.ctx.stroke();

        // Core marker point
        this.ctx.beginPath();
        this.ctx.arc(x, y, isHovered ? 6 : 4, 0, Math.PI * 2);
        this.ctx.fillStyle = isHovered 
          ? '#ffffff' 
          : (this.planetType === 'Mars' ? '#ffab91' : '#80d8ff');
        this.ctx.shadowColor = this.planetType === 'Mars' ? '#ff5722' : '#00e5ff';
        this.ctx.shadowBlur = 12;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        // Label on hover or prominent beacon
        if (isHovered || z > 0.7) {
          this.ctx.font = '11px "Space Grotesk", monospace, sans-serif';
          this.ctx.fillStyle = isHovered ? '#00e5ff' : 'rgba(255, 255, 255, 0.85)';
          this.ctx.fillText(b.name, x + 9, y - 4);
          if (isHovered) {
            this.ctx.font = '10px monospace';
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
            this.ctx.fillText(`📍 ${b.site}`, x + 9, y + 9);
          }
        }
      }
    }
  }
}
