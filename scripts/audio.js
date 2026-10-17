// Procedural Web Audio Synthesizer for NASA Space Apps Challenge
// Generates space drone, telemetry beeps, and NASA comm chirps without external audio files

class SpaceAudioSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // start muted until user activates or interacts
    this.ambientGain = null;
    this.ambientOsc1 = null;
    this.ambientOsc2 = null;
    this.filter = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.setupAmbientEngine();
      this.isInitialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported:", e);
    }
  }

  setupAmbientEngine() {
    if (!this.ctx) return;

    // Deep cosmic drone
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.setValueAtTime(160, this.ctx.currentTime);

    // Two detuned low sines for deep space binaural drone
    this.ambientOsc1 = this.ctx.createOscillator();
    this.ambientOsc1.type = "sine";
    this.ambientOsc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1

    this.ambientOsc2 = this.ctx.createOscillator();
    this.ambientOsc2.type = "triangle";
    this.ambientOsc2.frequency.setValueAtTime(55.6, this.ctx.currentTime); // Detuned for slow cosmic beating

    this.ambientOsc1.connect(this.filter);
    this.ambientOsc2.connect(this.filter);
    this.filter.connect(this.ambientGain);
    this.ambientGain.connect(this.ctx.destination);

    this.ambientOsc1.start();
    this.ambientOsc2.start();
  }

  toggleAudio() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    if (this.ambientGain && this.ctx) {
      const now = this.ctx.currentTime;
      if (this.isMuted) {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
      } else {
        this.ambientGain.gain.linearRampToValueAtTime(0.08, now + 1.2);
        this.playTelemetryChirp();
      }
    }
    return !this.isMuted;
  }

  // Futuristic click beep
  playClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1600, now + 0.05);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  // Telemetry chirp (NASA Quindar tone simulator)
  playTelemetryChirp() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      // 2525 Hz is the historic Apollo intro Quindar beep frequency!
      osc.frequency.setValueAtTime(2525, now);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {}
  }

  // Deep Space Radar Ping
  playRadarPing() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.35);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {}
  }

  // DSN Data transmission burst sound
  playTransmissionBurst() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [1046.5, 1318.5, 1567.98, 2093.0]; // C6, E6, G6, C7 arpeggio
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.05;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.04, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.12);
      });
    } catch (e) {}
  }
}

window.spaceAudio = new SpaceAudioSystem();
