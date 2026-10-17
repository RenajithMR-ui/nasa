// NASA Space Apps Challenge - Main Application Controller
// Orchestrates Intro Animation, Planetary HUD, Card Explorer, Dossier Modal, Comparison Tool, and DSN Transmission Deck

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Canvas Stars and Planetary Visualizer
  const cosmicCanvas = new CosmicCanvasManager('starfield-canvas');
  const planetVis = new PlanetVisualizer('planet-canvas');

  // State
  let currentPlanet = 'all'; // 'all', 'Moon', 'Mars'
  let currentFilterType = 'all';
  let searchQuery = '';
  let activeModalVehicle = null;

  // Cache DOM Elements
  const introOverlay = document.getElementById('intro-overlay');
  const enterBtn = document.getElementById('enter-app-btn');
  const skipIntroBtn = document.getElementById('skip-intro-btn');
  const replayIntroBtn = document.getElementById('replay-intro-btn');
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioIcon = document.getElementById('audio-icon');

  const planetPills = document.querySelectorAll('.planet-pill');
  const filterPills = document.querySelectorAll('.filter-pill');
  const searchInput = document.getElementById('relic-search');
  const relicsGrid = document.getElementById('relics-grid');
  const resultsCounter = document.getElementById('results-count');

  // Modal Elements
  const modalOverlay = document.getElementById('dossier-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // Comparison Elements
  const compSelect1 = document.getElementById('comp-select-1');
  const compSelect2 = document.getElementById('comp-select-2');

  // Transmission Console Elements
  const transmitForm = document.getElementById('transmit-form');
  const messageInput = document.getElementById('transmit-message');
  const targetSelect = document.getElementById('transmit-target');
  const senderInput = document.getElementById('transmit-sender');
  const transmissionLogs = document.getElementById('transmission-logs');

  // ================= 1. INTRO SPLASH & LOGO ANIMATION =================
  const telemetryLogs = [
    "[COMM-LINK INITIALIZED: DEEP SPACE NETWORK GOLDSTONE 70M DISH]",
    "[UPLINK VERIFIED: S-BAND & X-BAND SUB-SYSTEMS ONLINE]",
    "[QUERYING CELESTIAL RELICS ON THE MOON & MARS]",
    "[NASA SPACE APPS CHALLENGE: ARCHIVES COMPILED SUCCESSFULLY]",
    ">> READY FOR TELEMETRY EXPLORATION <<"
  ];

  let logIndex = 0;
  const introTerminal = document.getElementById('intro-terminal');

  function typeTelemetryLogs() {
    if (!introTerminal || logIndex >= telemetryLogs.length) return;
    const p = document.createElement('div');
    p.className = 'terminal-line';
    p.textContent = telemetryLogs[logIndex];
    introTerminal.appendChild(p);
    introTerminal.scrollTop = introTerminal.scrollHeight;
    logIndex++;
    if (logIndex < telemetryLogs.length) {
      setTimeout(typeTelemetryLogs, 420);
    }
  }

  // Start typing intro sequence
  setTimeout(typeTelemetryLogs, 600);

  function enterApplication() {
    if (window.spaceAudio) {
      window.spaceAudio.init();
      window.spaceAudio.playTelemetryChirp();
    }
    cosmicCanvas.triggerWarp(1800);
    introOverlay.classList.add('fade-out');
    setTimeout(() => {
      introOverlay.style.display = 'none';
      introOverlay.classList.remove('fade-out');
    }, 1200);
  }

  if (enterBtn) enterBtn.addEventListener('click', enterApplication);
  if (skipIntroBtn) skipIntroBtn.addEventListener('click', enterApplication);

  if (replayIntroBtn) {
    replayIntroBtn.addEventListener('click', () => {
      introOverlay.style.display = 'flex';
      introTerminal.innerHTML = '';
      logIndex = 0;
      typeTelemetryLogs();
      if (window.spaceAudio) window.spaceAudio.playClick();
    });
  }

  // Audio Toggle
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      const isSoundOn = window.spaceAudio.toggleAudio();
      audioIcon.textContent = isSoundOn ? '🔊' : '🔇';
      audioToggleBtn.classList.toggle('active', isSoundOn);
    });
  }

  // ================= 2. PLANET & HUD CONTROLS =================
  planetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      planetPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentPlanet = pill.dataset.planet;

      if (window.spaceAudio) window.spaceAudio.playClick();

      // Update 3D Globe Visualizer if Moon or Mars chosen
      if (currentPlanet === 'Moon' || currentPlanet === 'Mars') {
        planetVis.setPlanet(currentPlanet);
        updatePlanetHUD(currentPlanet);
      } else {
        // Toggle to Mars by default on 3D globe but show all cards
        planetVis.setPlanet('Mars');
        updatePlanetHUD('Mars');
      }

      renderRelicCards();
    });
  });

  function updatePlanetHUD(planet) {
    const stats = PLANETARY_STATS[planet];
    if (!stats) return;

    const nameEl = document.getElementById('hud-planet-name');
    const distEl = document.getElementById('hud-distance');
    const delayEl = document.getElementById('hud-light-delay');
    const gravEl = document.getElementById('hud-gravity');
    const tempEl = document.getElementById('hud-temp');
    const summaryEl = document.getElementById('hud-summary');
    const globeBadge = document.getElementById('globe-target-badge');

    if (nameEl) nameEl.textContent = stats.name;
    if (distEl) distEl.textContent = stats.distance;
    if (delayEl) delayEl.textContent = stats.lightDelay;
    if (gravEl) gravEl.textContent = stats.gravity;
    if (tempEl) tempEl.textContent = stats.surfaceTemp;
    if (summaryEl) summaryEl.textContent = stats.summary;
    if (globeBadge) {
      globeBadge.textContent = planet.toUpperCase();
      globeBadge.style.borderColor = stats.accentGlow;
      globeBadge.style.color = stats.accentGlow;
    }
  }

  // Filter Pills (Rover, Lander, Orbiter, etc.)
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilterType = pill.dataset.type;
      if (window.spaceAudio) window.spaceAudio.playClick();
      renderRelicCards();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderRelicCards();
    });
  }

  // ================= 3. RENDER RELIC CARDS =================
  function renderRelicCards() {
    relicsGrid.innerHTML = '';

    const filtered = CELESTIAL_DATA.filter(item => {
      // Planet Filter
      if (currentPlanet !== 'all' && item.target !== currentPlanet) {
        return false;
      }
      // Type Filter
      if (currentFilterType !== 'all') {
        if (currentFilterType === 'Rover' && !item.type.includes('Rover')) return false;
        if (currentFilterType === 'Lander' && !item.type.includes('Lander')) return false;
        if (currentFilterType === 'Orbiter' && !item.type.includes('Orbiter') && !item.type.includes('Satellite')) return false;
        if (currentFilterType === 'Active' && !item.status.includes('Active')) return false;
      }
      // Search Filter
      if (searchQuery) {
        const matchName = item.name.toLowerCase().includes(searchQuery);
        const matchSite = item.site.toLowerCase().includes(searchQuery);
        const matchStory = item.story.toLowerCase().includes(searchQuery);
        const matchTag = item.tagline.toLowerCase().includes(searchQuery);
        if (!matchName && !matchSite && !matchStory && !matchTag) return false;
      }
      return true;
    });

    if (resultsCounter) {
      resultsCounter.textContent = `Showing ${filtered.length} of ${CELESTIAL_DATA.length} NASA Relics & Sentinels`;
    }

    if (filtered.length === 0) {
      relicsGrid.innerHTML = `
        <div class="no-results-box">
          <div class="no-results-icon">📡</div>
          <h3>No Celestial Relics Found</h3>
          <p>No missions match your current filter parameters. Try adjusting your search query or reset the planetary filters.</p>
          <button class="action-btn" onclick="document.getElementById('relic-search').value=''; window.resetFilters();">Reset All Filters</button>
        </div>
      `;
      return;
    }

    filtered.forEach((relic, index) => {
      const card = document.createElement('article');
      card.className = `relic-card ${relic.target.toLowerCase()}-card`;
      card.style.animationDelay = `${index * 0.06}s`;

      const targetBadgeClass = relic.target === 'Mars' ? 'badge-mars' : 'badge-moon';
      const statusClass = relic.status.includes('Active') ? 'status-active' : 'status-completed';

      card.innerHTML = `
        <div class="card-media-wrapper">
          <img src="${relic.image}" alt="${relic.name}" class="card-img" loading="lazy" />
          <div class="card-overlay-gradient"></div>
          <span class="badge ${targetBadgeClass}">${relic.target.toUpperCase()}</span>
          <span class="badge badge-type">${relic.type}</span>
          <div class="status-indicator ${statusClass}">
            <span class="pulse-dot"></span>
            ${relic.status}
          </div>
        </div>

        <div class="card-content">
          <h3 class="card-title">${relic.name}</h3>
          <p class="card-site">📍 ${relic.site}</p>
          <p class="card-tagline">"${relic.tagline}"</p>

          <div class="card-quick-stats">
            <div class="stat-item">
              <span class="stat-label">Touchdown / Orbit</span>
              <span class="stat-val">${relic.landingDate.split('(')[0]}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Lifespan</span>
              <span class="stat-val">${relic.lifespan.split('(')[0]}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Mass</span>
              <span class="stat-val">${relic.mass.split('(')[0]}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Odometer</span>
              <span class="stat-val">${relic.distanceTraveled.split('(')[0]}</span>
            </div>
          </div>

          <div class="card-footer">
            <button class="dossier-btn" data-id="${relic.id}">
              <span>Access Mission Dossier</span>
              <span class="arrow-icon">→</span>
            </button>
          </div>
        </div>
      `;

      card.querySelector('.dossier-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openRelicModal(relic.id);
      });

      card.addEventListener('click', () => {
        openRelicModal(relic.id);
      });

      relicsGrid.appendChild(card);
    });
  }

  window.resetFilters = () => {
    currentPlanet = 'all';
    currentFilterType = 'all';
    searchQuery = '';
    planetPills.forEach(p => p.classList.toggle('active', p.dataset.planet === 'all'));
    filterPills.forEach(p => p.classList.toggle('active', p.dataset.type === 'all'));
    renderRelicCards();
  };

  // ================= 4. MISSION DOSSIER MODAL =================
  window.openRelicModal = function(relicId) {
    const relic = CELESTIAL_DATA.find(r => r.id === relicId);
    if (!relic) return;
    activeModalVehicle = relic;

    if (window.spaceAudio) window.spaceAudio.playRadarPing();

    document.getElementById('modal-img').src = relic.image;
    document.getElementById('modal-img').alt = relic.name;
    document.getElementById('modal-title').textContent = relic.name;
    document.getElementById('modal-target').textContent = `${relic.target.toUpperCase()} • ${relic.type.toUpperCase()}`;
    document.getElementById('modal-site').textContent = `📍 ${relic.site}`;

    const statusBadge = document.getElementById('modal-status');
    statusBadge.textContent = relic.status;
    statusBadge.className = `modal-status-badge ${relic.status.includes('Active') ? 'status-active' : 'status-completed'}`;

    document.getElementById('modal-story').innerHTML = relic.story.replace(/\n\n/g, '<br><br>');
    document.getElementById('modal-legacy').textContent = relic.legacy;
    document.getElementById('modal-final-msg').textContent = relic.finalMessage;

    // Technical Specs List
    const specsList = document.getElementById('modal-specs');
    specsList.innerHTML = `
      <div class="spec-row"><span class="spec-name">Target Body:</span><span class="spec-value">${relic.target}</span></div>
      <div class="spec-row"><span class="spec-name">Earth Launch:</span><span class="spec-value">${relic.launchDate}</span></div>
      <div class="spec-row"><span class="spec-name">Touchdown / Orbit:</span><span class="spec-value">${relic.landingDate}</span></div>
      <div class="spec-row"><span class="spec-name">Surface Coordinates:</span><span class="spec-value">${relic.site}</span></div>
      <div class="spec-row"><span class="spec-name">Total Mass:</span><span class="spec-value">${relic.mass}</span></div>
      <div class="spec-row"><span class="spec-name">Power Architecture:</span><span class="spec-value">${relic.powerSource}</span></div>
      <div class="spec-row"><span class="spec-name">Mission Duration:</span><span class="spec-value">${relic.lifespan}</span></div>
      <div class="spec-row"><span class="spec-name">Total Distance Traversed:</span><span class="spec-value">${relic.distanceTraveled}</span></div>
    `;

    // Scientific Instruments
    const instrumentsList = document.getElementById('modal-instruments');
    instrumentsList.innerHTML = '';
    relic.instruments.forEach(inst => {
      const li = document.createElement('li');
      li.innerHTML = `🔬 ${inst}`;
      instrumentsList.appendChild(li);
    });

    // Relics left on board
    const relicsLeft = document.getElementById('modal-relics-left');
    relicsLeft.innerHTML = '';
    relic.relicsOnboard.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `⭐ ${item}`;
      relicsLeft.appendChild(li);
    });

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (window.spaceAudio) window.spaceAudio.playClick();
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Audio Playback simulation button in modal
  const playTelemetryAudioBtn = document.getElementById('modal-audio-play');
  if (playTelemetryAudioBtn) {
    playTelemetryAudioBtn.addEventListener('click', () => {
      if (window.spaceAudio) {
        window.spaceAudio.init();
        window.spaceAudio.playTelemetryChirp();
        setTimeout(() => window.spaceAudio.playRadarPing(), 250);
      }
    });
  }

  // ================= 5. VEHICLE COMPARISON MATRIX =================
  function initComparisonMatrix() {
    // Populate select elements
    CELESTIAL_DATA.forEach(r => {
      const opt1 = document.createElement('option');
      opt1.value = r.id;
      opt1.textContent = `${r.name} (${r.target})`;
      compSelect1.appendChild(opt1);

      const opt2 = document.createElement('option');
      opt2.value = r.id;
      opt2.textContent = `${r.name} (${r.target})`;
      compSelect2.appendChild(opt2);
    });

    // Defaults: Perseverance (Mars) vs Apollo LRV (Moon)
    compSelect1.value = 'perseverance-rover';
    compSelect2.value = 'apollo-lrv';

    const updateComparison = () => {
      const v1 = CELESTIAL_DATA.find(r => r.id === compSelect1.value);
      const v2 = CELESTIAL_DATA.find(r => r.id === compSelect2.value);
      if (!v1 || !v2) return;

      // Extract approximate numeric values for comparison bars
      const getNumericMass = (str) => parseFloat(str.replace(/,/g, '')) || 250;
      const m1 = getNumericMass(v1.mass);
      const m2 = getNumericMass(v2.mass);
      const maxMass = Math.max(m1, m2, 1200);

      const getNumericDist = (str) => parseFloat(str.replace(/,/g, '')) || 1;
      const d1 = getNumericDist(v1.distanceTraveled);
      const d2 = getNumericDist(v2.distanceTraveled);
      const maxDist = Math.max(d1, d2, 50);

      document.getElementById('comp-card-1').innerHTML = `
        <div class="comp-header">
          <img src="${v1.image}" alt="${v1.name}" class="comp-thumb" />
          <div>
            <h4>${v1.name}</h4>
            <span class="badge ${v1.target === 'Mars' ? 'badge-mars' : 'badge-moon'}">${v1.target}</span>
            <span class="badge badge-type">${v1.type}</span>
          </div>
        </div>
        <p class="comp-tag">"${v1.tagline}"</p>
        <div class="comp-meter-block">
          <div class="meter-label"><span>Mass</span><span>${v1.mass}</span></div>
          <div class="meter-bar-track"><div class="meter-fill" style="width: ${(m1 / maxMass) * 100}%;"></div></div>
        </div>
        <div class="comp-meter-block">
          <div class="meter-label"><span>Distance</span><span>${v1.distanceTraveled}</span></div>
          <div class="meter-bar-track"><div class="meter-fill" style="width: ${(d1 / maxDist) * 100}%;"></div></div>
        </div>
        <div class="comp-detail-box">
          <p><strong>Power:</strong> ${v1.powerSource}</p>
          <p><strong>Scientific Payloads:</strong> ${v1.instruments.length} instruments</p>
          <p><strong>Touchdown Site:</strong> ${v1.site}</p>
          <p><strong>Status:</strong> ${v1.status}</p>
        </div>
      `;

      document.getElementById('comp-card-2').innerHTML = `
        <div class="comp-header">
          <img src="${v2.image}" alt="${v2.name}" class="comp-thumb" />
          <div>
            <h4>${v2.name}</h4>
            <span class="badge ${v2.target === 'Mars' ? 'badge-mars' : 'badge-moon'}">${v2.target}</span>
            <span class="badge badge-type">${v2.type}</span>
          </div>
        </div>
        <p class="comp-tag">"${v2.tagline}"</p>
        <div class="comp-meter-block">
          <div class="meter-label"><span>Mass</span><span>${v2.mass}</span></div>
          <div class="meter-bar-track"><div class="meter-fill" style="width: ${(m2 / maxMass) * 100}%;"></div></div>
        </div>
        <div class="comp-meter-block">
          <div class="meter-label"><span>Distance</span><span>${v2.distanceTraveled}</span></div>
          <div class="meter-bar-track"><div class="meter-fill" style="width: ${(d2 / maxDist) * 100}%;"></div></div>
        </div>
        <div class="comp-detail-box">
          <p><strong>Power:</strong> ${v2.powerSource}</p>
          <p><strong>Scientific Payloads:</strong> ${v2.instruments.length} instruments</p>
          <p><strong>Touchdown Site:</strong> ${v2.site}</p>
          <p><strong>Status:</strong> ${v2.status}</p>
        </div>
      `;
    };

    compSelect1.addEventListener('change', () => {
      updateComparison();
      if (window.spaceAudio) window.spaceAudio.playClick();
    });

    compSelect2.addEventListener('change', () => {
      updateComparison();
      if (window.spaceAudio) window.spaceAudio.playClick();
    });

    updateComparison();
  }

  // ================= 6. DEEP SPACE TRANSMISSION DECK =================
  function initTransmissionDeck() {
    // Waveform canvas animation
    const waveCanvas = document.getElementById('waveform-canvas');
    if (waveCanvas) {
      const wCtx = waveCanvas.getContext('2d');
      let wavePhase = 0;
      function drawWave() {
        wCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
        wCtx.beginPath();
        wCtx.strokeStyle = '#00e5ff';
        wCtx.lineWidth = 2;
        const cy = waveCanvas.height / 2;

        for (let x = 0; x < waveCanvas.width; x++) {
          const y = cy + Math.sin(x * 0.05 + wavePhase) * 14 * Math.sin(x * 0.02);
          if (x === 0) wCtx.moveTo(x, y);
          else wCtx.lineTo(x, y);
        }
        wCtx.stroke();
        wavePhase += 0.08;
        requestAnimationFrame(drawWave);
      }
      drawWave();
    }

    // Default transmissions
    const defaultLogs = [
      { sender: "NASA Space Apps Team", target: "Moon", message: "To the Apollo 11 descent stage: humanity remembers your first footsteps.", timestamp: "2026-10-17 00:00 UTC", delay: "1.28s" },
      { sender: "Planetary Society", target: "Mars", message: "Opportunity, thank you for 14 heroic years in Perseverance Valley.", timestamp: "2026-10-16 23:42 UTC", delay: "12.4m" },
      { sender: "Cosmic Explorer", target: "Mars", message: "Keep climbing Mount Sharp, Curiosity. Earth is watching every Sol.", timestamp: "2026-10-16 21:15 UTC", delay: "12.4m" }
    ];

    let storedLogs = [];
    try {
      storedLogs = JSON.parse(localStorage.getItem('nasa_transmissions')) || defaultLogs;
    } catch (e) {
      storedLogs = defaultLogs;
    }

    function renderLogs() {
      if (!transmissionLogs) return;
      transmissionLogs.innerHTML = '';
      storedLogs.slice(0, 8).forEach(log => {
        const item = document.createElement('div');
        item.className = 'transmission-item';
        item.innerHTML = `
          <div class="trans-meta">
            <span class="trans-sender">👨‍🚀 ${log.sender}</span>
            <span class="badge ${log.target === 'Mars' ? 'badge-mars' : 'badge-moon'}">${log.target}</span>
            <span class="trans-delay">Latency: ${log.delay}</span>
            <span class="trans-time">${log.timestamp}</span>
          </div>
          <p class="trans-msg">"${log.message}"</p>
        `;
        transmissionLogs.appendChild(item);
      });
    }

    renderLogs();

    if (transmitForm) {
      transmitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = messageInput.value.trim();
        const sender = senderInput.value.trim() || 'Anonymous Explorer';
        const target = targetSelect.value;

        if (!msg) return;

        const delay = target === 'Moon' ? '1.28s' : '14m 18s';
        const newLog = {
          sender,
          target,
          message: msg,
          timestamp: new Date().toUTCString().replace('GMT', 'UTC'),
          delay
        };

        storedLogs.unshift(newLog);
        try {
          localStorage.setItem('nasa_transmissions', JSON.stringify(storedLogs));
        } catch (err) {}

        renderLogs();
        messageInput.value = '';

        if (window.spaceAudio) {
          window.spaceAudio.playTransmissionBurst();
        }

        // Pulse the transmit button
        const submitBtn = transmitForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'SIGNAL BROADCASTED!';
        submitBtn.style.background = '#00e676';
        setTimeout(() => {
          submitBtn.textContent = 'TRANSMIT VIA DEEP SPACE NETWORK';
          submitBtn.style.background = '';
        }, 2200);
      });
    }
  }

  // Initialize all subsystems
  renderRelicCards();
  initComparisonMatrix();
  initTransmissionDeck();
  updatePlanetHUD('Mars');
});
