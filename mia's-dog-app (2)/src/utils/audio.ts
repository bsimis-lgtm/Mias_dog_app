// Web Audio API Synthesizer for Mia's Dog App Sound FX.
// Avoids 404s and asset load errors by generating audio dynamically on user interaction.

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

function getAudioContext(): AudioContext | null {
  if (!soundEnabled) return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Simple Pop Sound (Standard tap clicking)
export function playPopSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}

// Sparkle Chime Sound (When heart/favorites are toggled)
export function playSparkleSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  const now = ctx.currentTime;

  notes.forEach((freq, idx) => {
    const time = now + idx * 0.08;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.08, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 0.25);
  });
}

// Cheerful synthesized "Woof" sound
// Pitch defaults to 'medium'. Small breeds can use 'high' and giant breeds can use 'low'.
export function playWoofSound(pitch: "high" | "medium" | "low" = "medium") {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Custom pitch parameters
  let startFreq = 380;
  let endFreq = 160;
  let duration = 0.16;
  let woofGap = 0.08; // gap between double woofs

  if (pitch === "high") {
    startFreq = 700;
    endFreq = 350;
    duration = 0.11;
    woofGap = 0.04;
  } else if (pitch === "low") {
    startFreq = 220;
    endFreq = 95;
    duration = 0.22;
    woofGap = 0.12;
  }

  // Play a realistic cartoon double woof ("Woof-woof!")
  const playSingleBark = (startTime: number, isSecond: boolean) => {
    const osc = ctx.createOscillator();
    const bandpass = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "triangle";
    const currentStartFreq = isSecond ? startFreq * 0.95 : startFreq;
    const currentEndFreq = isSecond ? endFreq * 0.95 : endFreq;

    osc.frequency.setValueAtTime(currentStartFreq, startTime);
    osc.frequency.exponentialRampToValueAtTime(currentEndFreq, startTime + duration);

    // Bandpass filter to make it sound barking instead of clean beep code
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(currentStartFreq * 1.2, startTime);
    bandpass.Q.setValueAtTime(0.7, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  playSingleBark(now, false);
  
  // Double bark for high/medium, single soft grumble/bark for low giants
  if (pitch !== "low") {
    playSingleBark(now + duration + woofGap, true);
  }
}
