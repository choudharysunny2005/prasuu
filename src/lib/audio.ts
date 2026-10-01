// Elegant Web Audio API synthesizer for celestial, romantic micro-interactions
// No external MP3 files needed - 100% reliable, zero latency, high-fidelity sound synthesis

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a warm, celestial chime chord with gentle reverb-like decay
 */
export function playChimeTone() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const frequencies = [528, 660, 792, 1056]; // Solfeggio 528Hz love frequency & pure harmonics
  const now = ctx.currentTime;

  frequencies.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + idx * 0.04);

    gain.gain.setValueAtTime(0, now + idx * 0.04);
    gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), now + idx * 0.04 + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.04);
    osc.stop(now + idx * 0.04 + 2.6);
  });
}

/**
 * Plays a deep, smooth cinematic warp / transition swoosh
 */
export function playWarpSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Pink noise / filtered sweep
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0.0;

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = data[i];
    data[i] *= 3.5;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(150, now);
  filter.frequency.exponentialRampToValueAtTime(1800, now + 0.9);
  filter.frequency.exponentialRampToValueAtTime(80, now + 2.2);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.7);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + 2.3);

  // Play sparkling high overtone chime
  setTimeout(() => {
    playChimeTone();
  }, 700);
}

/**
 * Plays a delicate, magical paper opening / envelope unseal sound
 */
export function playEnvelopeOpenSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Soft textured paper unseal
  const bufferSize = ctx.sampleRate * 0.8;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.exponentialRampToValueAtTime(3200, now + 0.35);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + 0.55);

  // Follow with a soothing warm harmonic chord
  const chord = [440, 554.37, 659.25, 880]; // A major harmonic
  chord.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + 0.15 + idx * 0.03);

    oscGain.gain.setValueAtTime(0, now + 0.15 + idx * 0.03);
    oscGain.gain.linearRampToValueAtTime(0.06 / (idx + 1), now + 0.2 + idx * 0.03);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.start(now + 0.15 + idx * 0.03);
    osc.stop(now + 2.1);
  });
}

/**
 * Plays a sparkling crystal chime when exploring a memory
 */
export function playMemorySelectSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [659.25, 830.61, 987.77, 1318.51]; // E major crystal arpeggio

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now + idx * 0.05);

    gain.gain.setValueAtTime(0, now + idx * 0.05);
    gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), now + idx * 0.05 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 1.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.05);
    osc.stop(now + idx * 0.05 + 1.7);
  });
}

/**
 * Plays a bubbly, sparkling pop chime when catching a heart
 */
export function playHeartPopSound(pitchMultiplier = 1) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const baseFreq = 587.33 * pitchMultiplier; // D5 scaled

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(baseFreq * 0.8, now);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.08);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.26);
}

/**
 * Plays a triumphant, sweet victory chord when catching all 10 hearts
 */
export function playVictoryFanfare() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const chords = [
    [523.25, 659.25, 783.99, 1046.5], // C major
    [587.33, 739.99, 880.0, 1174.66], // D major
    [659.25, 830.61, 987.77, 1318.51], // E major
  ];

  chords.forEach((chord, chordIdx) => {
    chord.forEach((freq, noteIdx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + chordIdx * 0.22 + noteIdx * 0.02);

      gain.gain.setValueAtTime(0, now + chordIdx * 0.22 + noteIdx * 0.02);
      gain.gain.linearRampToValueAtTime(0.08 / (noteIdx + 1), now + chordIdx * 0.22 + noteIdx * 0.02 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + chordIdx * 0.22 + noteIdx * 0.02 + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + chordIdx * 0.22 + noteIdx * 0.02);
      osc.stop(now + chordIdx * 0.22 + noteIdx * 0.02 + 1.9);
    });
  });
}



