/**
 * Mystic Audio Engine
 * Generates dark, ambient retro-witchy music and interactive sound effects using the Web Audio API.
 * This ensures zero load delays, no CORS issues, and total control over interactive playback.
 */

class MysticAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private volumeVal: number = 0.5;
  private bgm: HTMLAudioElement | null = null;

  // Sound nodes
  private lfo: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private droneOscs: OscillatorNode[] = [];
  private droneGain: GainNode | null = null;
  private vinylNode: AudioWorkletNode | ScriptProcessorNode | null = null;
  private vinylGain: GainNode | null = null;

  constructor() {
    // Lazy initialisation on first interaction
  }

  private init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volumeVal, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public async start() {
    this.init();
    
    if (!this.bgm) {
      this.bgm = new Audio("/cjfbgm.mp3");
      this.bgm.loop = true;
    }
    this.bgm.volume = this.volumeVal;

    if (this.ctx && this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    if (this.isPlaying) return;

    this.bgm.play().catch((err) => {
      console.warn("Failed to play background music:", err);
    });

    this.isPlaying = true;
  }

  public stop() {
    if (this.bgm) {
      this.bgm.pause();
    }
    this.isPlaying = false;
  }

  public setVolume(vol: number) {
    this.volumeVal = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volumeVal, this.ctx.currentTime, 0.1);
    }
    if (this.bgm) {
      this.bgm.volume = this.volumeVal;
    }
  }

  public getVolume() {
    return this.volumeVal;
  }

  public isActive() {
    return this.isPlaying;
  }

  /**
   * Generates a mysterious, dark cinematic ambient pad
   * Consists of a major-seventh or minor chord detuned slightly,
   * modulated by a slow LFO filter sweep.
   */
  private startDrone() {
    if (!this.ctx || !this.masterGain) return;

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.droneGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 2.5); // Slow fade in

    // Low-pass filter for a dark, warm sound
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    // LFO to modulate filter cutoff frequency (creates slow, hypnotic movement)
    this.lfo = this.ctx.createOscillator();
    this.lfo.type = "sine";
    this.lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime); // very slow: 0.08Hz

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(180, this.ctx.currentTime); // Modulate by 180Hz

    this.lfo.connect(lfoGain);
    if (this.filter.frequency) {
      this.filter.frequency.setValueAtTime(250, this.ctx.currentTime);
      lfoGain.connect(this.filter.frequency);
    }

    this.lfo.start();

    // Minor/major suspended chord frequencies:
    // C2 (65.41), G2 (98.00), C3 (130.81), Eb3 (155.56), Bb3 (233.08) - C minor 7 / sus4 feel
    const freqs = [65.41, 98.00, 130.81, 155.56, 233.08];

    this.droneOscs = freqs.map((freq) => {
      if (!this.ctx) throw new Error();
      const osc = this.ctx.createOscillator();
      const detuneGain = this.ctx.createGain();
      
      // Vintage warm oscillator - saw or triangle
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      // Add subtle detuning over time
      osc.detune.setValueAtTime((Math.random() - 0.5) * 15, this.ctx.currentTime);

      osc.connect(this.filter!);
      osc.start();
      return osc;
    });

    this.filter.connect(this.droneGain);
    this.droneGain.connect(this.masterGain);
  }

  private stopDrone() {
    try {
      if (this.droneGain && this.ctx) {
        this.droneGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
      }
      setTimeout(() => {
        this.droneOscs.forEach(osc => { try { osc.stop(); } catch(e) {} });
        this.droneOscs = [];
        try { this.lfo?.stop(); } catch(e) {}
        this.lfo = null;
        this.filter = null;
        this.droneGain = null;
      }, 600);
    } catch(e) {
      console.warn("Failed to clean up drone nodes:", e);
    }
  }

  /**
   * Generates a vintage vinyl record crackle
   * Created using white noise + low pass filter + random scratch pops
   */
  private startVinylCrackle() {
    if (!this.ctx || !this.masterGain) return;

    this.vinylGain = this.ctx.createGain();
    this.vinylGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.vinylGain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 1.5);

    // Create a script processor or generate procedural crackle
    const bufferSize = 4096;
    const ctx = this.ctx;
    
    // We can use a standard ScriptProcessorNode (deprecated but highly supported for backwards compatibility)
    // to procedurally generate vinyl scratch/crackle sound
    const createVinylNode = () => {
      const node = ctx.createScriptProcessor(bufferSize, 1, 1);
      let lastOut = 0.0;
      
      node.onaudioprocess = (e) => {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          // White noise base
          const white = Math.random() * 2 - 1;
          
          // Low-pass filter for the rumble/hiss
          lastOut = 0.98 * lastOut + 0.02 * white;
          let r = lastOut * 0.15;

          // Random static dust clicks/scratches
          if (Math.random() < 0.00015) {
            // Click/Pop impulse
            const pop = (Math.random() * 2 - 1) * 0.8;
            r += pop;
          }
          
          output[i] = r;
        }
      };
      return node;
    };

    try {
      this.vinylNode = createVinylNode();
      this.vinylNode.connect(this.vinylGain);
      this.vinylGain.connect(this.masterGain);
    } catch (e) {
      console.warn("ScriptProcessor is not supported or failed to start", e);
    }
  }

  private stopVinylCrackle() {
    try {
      if (this.vinylGain && this.ctx) {
        this.vinylGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
      }
      setTimeout(() => {
        if (this.vinylNode) {
          this.vinylNode.disconnect();
          this.vinylNode = null;
        }
        this.vinylGain = null;
      }, 400);
    } catch(e) {
      console.warn("Failed to clean up vinyl nodes:", e);
    }
  }

  /**
   * Sound effect: Card swipe / shuffle
   * A quick whoosh sound created using filtered white noise
   */
  public playSwipe() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.35, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;

    const swipeFilter = ctx.createBiquadFilter();
    swipeFilter.type = "bandpass";
    swipeFilter.frequency.setValueAtTime(300, now);
    swipeFilter.frequency.exponentialRampToValueAtTime(1000, now + 0.15);
    swipeFilter.frequency.exponentialRampToValueAtTime(200, now + 0.35);
    swipeFilter.Q.setValueAtTime(3.0, now);

    const swipeGain = ctx.createGain();
    swipeGain.gain.setValueAtTime(0, now);
    swipeGain.gain.linearRampToValueAtTime(0.28, now + 0.05);
    swipeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    noiseNode.connect(swipeFilter);
    swipeFilter.connect(swipeGain);
    swipeGain.connect(this.masterGain);

    noiseNode.start(now);
    noiseNode.stop(now + 0.36);
  }

  /**
   * Sound effect: Mystic card flip
   * A beautiful, shimmering chime with multiple high oscillators
   */
  public playFlip() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Arpeggio / Pentatonic chord: F#5 (739.99), A#5 (932.33), C#6 (1108.73), F#6 (1479.98)
    const freqs = [739.99, 932.33, 1108.73, 1479.98];
    
    // Play with small delays to sound like a strum or chime
    freqs.forEach((freq, index) => {
      if (!ctx || !this.masterGain) return;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const delay = index * 0.045; // Staggered delay for chime effect

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);

      gainNode.gain.setValueAtTime(0, now + delay);
      gainNode.gain.linearRampToValueAtTime(0.06, now + delay + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.4);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(now + delay);
      osc.stop(now + delay + 0.45);
    });
  }

  /**
   * Sound effect: Soft cardboard/card rustle tick during drag
   */
  public playDragTick() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(140 + Math.random() * 60, now);
    
    // Quick pitch decay for a "thump" or "click" sound
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.04);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.025, now + 0.003);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, now);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Sound effect: Celestial magic shimmer / stardust beam
   * Multiple frequencies rising in a fast harp-like arpeggio with high Q filter bandpass sweep
   */
  public playMagicShimmer() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51]; // C5, E5, G5, B5, C6, E6
    
    notes.forEach((freq, index) => {
      if (!ctx || !this.masterGain) return;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const delay = index * 0.055;

      // Triangle for warmth, with subtle detune
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + delay);
      
      // Pitch slide up slightly to represent upward magical motion
      osc.frequency.exponentialRampToValueAtTime(freq * 1.35, now + delay + 0.25);

      gainNode.gain.setValueAtTime(0, now + delay);
      gainNode.gain.linearRampToValueAtTime(0.035, now + delay + 0.015);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.35);

      // Add a nice bandpass filter for shimmering sparkle
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1800, now + delay);
      filter.frequency.exponentialRampToValueAtTime(600, now + delay + 0.35);
      filter.Q.setValueAtTime(2.5, now);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(now + delay);
      osc.stop(now + delay + 0.4);
    });
  }
}

// Export singleton instance
export const mysticAudio = new MysticAudioEngine();
