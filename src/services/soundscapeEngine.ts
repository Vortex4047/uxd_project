/**
 * Real Web Audio API Atmospheric Soundscape Synthesizer
 * Generates procedural binaural rain, vinyl crackle, and 432Hz ambient chord swells.
 */

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private rainGain: GainNode | null = null;
  private vinylGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private rainNode: AudioNode | null = null;
  private vinylNode: AudioNode | null = null;
  private droneOscillators: OscillatorNode[] = [];
  private isInitialized = false;
  private isMuted = false;

  private initContext() {
    if (this.isInitialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master music volume
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.musicGain.connect(this.ctx.destination);

      // Rain sound generation (Pink noise with bandpass)
      this.setupRainGenerator();

      // Vinyl sound generation (Random impulses + lowpass filtered pink noise)
      this.setupVinylGenerator();

      // 432Hz Harmonic Bed Drone (F# minor / Dreamy ambient chord tuned to 432Hz)
      this.setupHarmonicDrone();

      this.isInitialized = true;
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  }

  private setupRainGenerator() {
    if (!this.ctx) return;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter for gentle rain frequency profile
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.rainGain);
    this.rainGain.connect(this.ctx.destination);
    whiteNoise.start(0);
    this.rainNode = whiteNoise;
  }

  private setupVinylGenerator() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const vinylBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = vinylBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // 99.8% silence, occasional gentle crackle click
      if (Math.random() < 0.002) {
        data[i] = (Math.random() * 2 - 1) * 0.35;
      } else {
        data[i] = (Math.random() * 2 - 1) * 0.005; // soft floor hiss
      }
    }

    const source = this.ctx.createBufferSource();
    source.buffer = vinylBuffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);

    this.vinylGain = this.ctx.createGain();
    this.vinylGain.gain.setValueAtTime(0.15, this.ctx.currentTime);

    source.connect(filter);
    filter.connect(this.vinylGain);
    this.vinylGain.connect(this.ctx.destination);
    source.start(0);
    this.vinylNode = source;
  }

  private setupHarmonicDrone() {
    if (!this.ctx) return;
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0, this.ctx.currentTime); // start silent until playback
    this.droneGain.connect(this.ctx.destination);

    // 432Hz Pythagorean pure intervals: 216Hz, 324Hz, 432Hz
    const freqs = [216, 324, 432, 540];
    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.droneGain) return;
      const osc = this.ctx.createOscillator();
      const pan = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      const subGain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      subGain.gain.setValueAtTime(0.04 / (idx + 1), this.ctx.currentTime);

      if (pan) {
        pan.pan.setValueAtTime(idx % 2 === 0 ? -0.4 : 0.4, this.ctx.currentTime);
        osc.connect(subGain);
        subGain.connect(pan);
        pan.connect(this.droneGain);
      } else {
        osc.connect(subGain);
        subGain.connect(this.droneGain);
      }

      osc.start(0);
      this.droneOscillators.push(osc);
    });
  }

  public setRainVolume(volPct: number) {
    this.initContext();
    if (this.rainGain && this.ctx) {
      const targetGain = (volPct / 100) * 0.5;
      this.rainGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
  }

  public setVinylVolume(volPct: number) {
    this.initContext();
    if (this.vinylGain && this.ctx) {
      const targetGain = (volPct / 100) * 0.4;
      this.vinylGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
  }

  public setMusicVolume(volPct: number) {
    this.initContext();
    if (this.musicGain && this.ctx) {
      const targetGain = (volPct / 100);
      this.musicGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
  }

  public setPlaybackState(isPlaying: boolean) {
    this.initContext();
    if (this.droneGain && this.ctx) {
      // Fade in/out the 432Hz ambient chord when playing
      const targetGain = isPlaying ? 0.08 : 0.0;
      this.droneGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.3);
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.ctx) {
      if (this.isMuted) {
        this.ctx.suspend();
      } else {
        this.ctx.resume();
      }
    }
    return this.isMuted;
  }
}

export const soundscape = new SoundscapeEngine();
