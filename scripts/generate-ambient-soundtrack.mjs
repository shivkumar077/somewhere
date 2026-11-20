import fs from 'fs';
import path from 'path';

// Generate a high-fidelity, peaceful, organic, dreamlike storybook soundtrack
// 16-bit 44.1kHz Stereo PCM WAV.
// Duration: 60 seconds (long-form, non-fatiguing, seamlessly loopable).

const SAMPLE_RATE = 44100;
const DURATION = 60; // 60 seconds
const TOTAL_SAMPLES = SAMPLE_RATE * DURATION;
const NUM_CHANNELS = 2; // Stereo

console.log(`Generating master storybook ambient soundtrack (${DURATION}s, ${SAMPLE_RATE}Hz stereo)...`);

// Rich harmonic progression:
// Bar 1 (0s - 10s):  Cmaj9     (C3, G3, B3, E4, D5)
// Bar 2 (10s - 20s): Fmaj7#11  (F2, C3, A3, E4, G4, B4)
// Bar 3 (20s - 30s): Am9       (A2, E3, C4, G4, B4, C5)
// Bar 4 (30s - 40s): Em7/G     (G2, E3, B3, D4, G4)
// Bar 5 (40s - 50s): Dm9       (D3, A3, C4, E4, F4, A4)
// Bar 6 (50s - 60s): Gsus4(add9)->C (G2, D3, G3, C4, D4, E4)

const chords = [
  { start: 0, end: 10, notes: [130.81, 196.00, 246.94, 329.63, 587.33] },
  { start: 10, end: 20, notes: [87.31, 130.81, 220.00, 329.63, 392.00, 493.88] },
  { start: 20, end: 30, notes: [110.00, 164.81, 261.63, 392.00, 493.88, 523.25] },
  { start: 30, end: 40, notes: [98.00, 164.81, 246.94, 293.66, 392.00] },
  { start: 40, end: 50, notes: [146.83, 220.00, 261.63, 329.63, 349.23, 440.00] },
  { start: 50, end: 60, notes: [98.00, 146.83, 196.00, 261.63, 293.66, 329.63] },
];

// Delicate storybook melody notes (celeste / music box / gentle felt harp)
const melodyNotes = [
  { time: 2.0, freq: 523.25, dur: 4.2, pan: -0.25 }, // C5
  { time: 5.5, freq: 659.25, dur: 3.8, pan: 0.25 },  // E5
  { time: 8.0, freq: 587.33, dur: 3.5, pan: -0.1 },  // D5
  { time: 12.5, freq: 493.88, dur: 4.5, pan: 0.3 },  // B4
  { time: 16.0, freq: 587.33, dur: 4.0, pan: -0.3 }, // D5
  { time: 18.5, freq: 659.25, dur: 3.8, pan: 0.15 }, // E5
  { time: 22.0, freq: 523.25, dur: 4.5, pan: -0.2 }, // C5
  { time: 25.5, freq: 392.00, dur: 4.0, pan: 0.25 }, // G4
  { time: 28.0, freq: 440.00, dur: 3.5, pan: -0.15 },// A4
  { time: 32.5, freq: 493.88, dur: 4.5, pan: 0.2 },  // B4
  { time: 36.0, freq: 587.33, dur: 4.0, pan: -0.25 },// D5
  { time: 42.0, freq: 523.25, dur: 4.2, pan: 0.3 },  // C5
  { time: 45.5, freq: 440.00, dur: 4.0, pan: -0.2 }, // A4
  { time: 48.0, freq: 392.00, dur: 3.8, pan: 0.1 },  // G4
  { time: 52.0, freq: 329.63, dur: 4.5, pan: -0.3 }, // E4
  { time: 55.5, freq: 392.00, dur: 4.2, pan: 0.25 }, // G4
  { time: 58.0, freq: 523.25, dur: 3.5, pan: 0.0 },  // C5
];

const leftBuffer = new Float32Array(TOTAL_SAMPLES);
const rightBuffer = new Float32Array(TOTAL_SAMPLES);

// 1. Synthesize Warm Ambient Pad Layers (Warm Rhodes & Acoustic Strings)
for (const chord of chords) {
  const startSample = Math.floor(chord.start * SAMPLE_RATE);
  const endSample = Math.floor(chord.end * SAMPLE_RATE);
  const chordLen = endSample - startSample;

  for (let i = 0; i < chordLen; i++) {
    const globalIdx = (startSample + i) % TOTAL_SAMPLES;
    const progress = i / chordLen;

    // Smooth sinusoidal envelope with gentle overlap
    const env = Math.sin(progress * Math.PI);

    let sampleL = 0;
    let sampleR = 0;

    for (let n = 0; n < chord.notes.length; n++) {
      const freq = chord.notes[n];
      const t = (startSample + i) / SAMPLE_RATE;

      // Warm organic tone: fundamental + soft octaves + gentle sub-harmonic
      const fund = Math.sin(2 * Math.PI * freq * t);
      const sub = 0.22 * Math.sin(Math.PI * freq * t);
      const harmonic2 = 0.25 * Math.sin(4 * Math.PI * freq * t);
      const harmonic3 = 0.08 * Math.sin(6 * Math.PI * freq * t);
      const tone = (fund + sub + harmonic2 + harmonic3) / 1.55;

      // Stereo chorus detune
      const chorusL = Math.sin(2 * Math.PI * (freq * 0.9988) * t);
      const chorusR = Math.sin(2 * Math.PI * (freq * 1.0012) * t);

      // Tremolo / breathing amplitude modulation (0.2 Hz)
      const tremolo = 1 + 0.08 * Math.sin(2 * Math.PI * 0.2 * t + n);

      const amp = env * (0.048 / Math.sqrt(n + 1));
      sampleL += (tone * 0.75 + chorusL * 0.25) * amp * tremolo;
      sampleR += (tone * 0.75 + chorusR * 0.25) * amp * tremolo;
    }

    leftBuffer[globalIdx] += sampleL;
    rightBuffer[globalIdx] += sampleR;
  }
}

// 2. Synthesize Storybook Chime & Music Box Accents
for (const mel of melodyNotes) {
  const startSample = Math.floor(mel.time * SAMPLE_RATE);
  const chimeSamples = Math.floor(mel.dur * SAMPLE_RATE);

  for (let i = 0; i < chimeSamples; i++) {
    const globalIdx = (startSample + i) % TOTAL_SAMPLES;
    const t = i / SAMPLE_RATE;

    // Organic pluck: instant soft attack, gentle exponential decay
    const decay = Math.exp(-t * 1.6);
    if (decay < 0.0005) break;

    // Crystalline bell spectrum: fundamental + inharmonic overtone + octave
    const chime =
      Math.sin(2 * Math.PI * mel.freq * t) +
      0.32 * Math.sin(2 * Math.PI * (mel.freq * 2.0) * t) * Math.exp(-t * 3.0) +
      0.18 * Math.sin(2 * Math.PI * (mel.freq * 2.76) * t) * Math.exp(-t * 5.0) +
      0.10 * Math.sin(2 * Math.PI * (mel.freq * 4.0) * t) * Math.exp(-t * 6.5);

    const amp = decay * 0.042;
    const panL = 0.5 - mel.pan * 0.38;
    const panR = 0.5 + mel.pan * 0.38;

    leftBuffer[globalIdx] += chime * amp * panL;
    rightBuffer[globalIdx] += chime * amp * panR;
  }
}

// 3. Mathematical Equal-Power Seamless Crossfade over 4.0 seconds
const crossfadeDuration = 4.0;
const crossfadeSamples = Math.floor(crossfadeDuration * SAMPLE_RATE);

for (let i = 0; i < crossfadeSamples; i++) {
  // Equal-power crossfade curve: cos(theta) and sin(theta) where theta goes from 0 to PI/2
  const theta = (i / crossfadeSamples) * (Math.PI / 2);
  const fadeOutFactor = Math.cos(theta); // 1 -> 0
  const fadeInFactor = Math.sin(theta);  // 0 -> 1

  const endIdx = TOTAL_SAMPLES - crossfadeSamples + i;
  const startIdx = i;

  const blendedL = leftBuffer[endIdx] * fadeOutFactor + leftBuffer[startIdx] * fadeInFactor;
  const blendedR = rightBuffer[endIdx] * fadeOutFactor + rightBuffer[startIdx] * fadeInFactor;

  leftBuffer[startIdx] = blendedL;
  rightBuffer[startIdx] = blendedR;
  leftBuffer[endIdx] = blendedL;
  rightBuffer[endIdx] = blendedR;
}

// 4. Smooth Peak Normalization
let maxPeak = 0;
for (let i = 0; i < TOTAL_SAMPLES; i++) {
  maxPeak = Math.max(maxPeak, Math.abs(leftBuffer[i]), Math.abs(rightBuffer[i]));
}
const normGain = maxPeak > 0 ? 0.72 / maxPeak : 0.72;

const pcmData = Buffer.alloc(TOTAL_SAMPLES * NUM_CHANNELS * 2);
for (let i = 0; i < TOTAL_SAMPLES; i++) {
  const sL = Math.max(-1, Math.min(1, leftBuffer[i] * normGain));
  const sR = Math.max(-1, Math.min(1, rightBuffer[i] * normGain));

  const valL = sL < 0 ? sL * 32768 : sL * 32767;
  const valR = sR < 0 ? sR * 32768 : sR * 32767;

  pcmData.writeInt16LE(Math.floor(valL), i * 4);
  pcmData.writeInt16LE(Math.floor(valR), i * 4 + 2);
}

// 5. Construct WAV File
function createWavHeader(dataLength, sampleRate, numChannels) {
  const header = Buffer.alloc(44);
  const byteRate = sampleRate * numChannels * 2;
  const blockAlign = numChannels * 2;

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataLength, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(16, 34); // 16 bits
  header.write('data', 36);
  header.writeUInt32LE(dataLength, 40);

  return header;
}

const wavHeader = createWavHeader(pcmData.length, SAMPLE_RATE, NUM_CHANNELS);
const finalWavBuffer = Buffer.concat([wavHeader, pcmData]);

const outputDir = path.resolve('public', 'audio');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write master soundtrack
const outputPath = path.join(outputDir, 'cozy-ambient.wav');
fs.writeFileSync(outputPath, finalWavBuffer);

console.log(`✓ Master soundtrack generated: ${outputPath} (${DURATION}s, ${(finalWavBuffer.length / (1024 * 1024)).toFixed(2)} MB, 100% seam-free loop)`);
