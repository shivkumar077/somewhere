import fs from 'fs';
import path from 'path';

// Generate a soothing, organic, peaceful ambient soundtrack (16-bit 44.1kHz Stereo WAV)
// Theme: Storybook cozy ambient music box / Rhodes chords with gentle warm overtones.
// Seamless loop: 32 seconds duration.

const SAMPLE_RATE = 44100;
const DURATION = 32; // seconds
const TOTAL_SAMPLES = SAMPLE_RATE * DURATION;
const NUM_CHANNELS = 2; // Stereo

console.log(`Generating cozy ambient soundtrack (${DURATION}s, ${SAMPLE_RATE}Hz stereo)...`);

// Chords in progression:
// Chord 1: Cmaj9 (C3, G3, B3, E4, D5) [0s - 8s]
// Chord 2: Fmaj7#11 (F2, C3, A3, E4, G4) [8s - 16s]
// Chord 3: Am9 (A2, E3, C4, G4, B4) [16s - 24s]
// Chord 4: Gsus4 / Dm9 (G2, D3, G3, C4, E4) [24s - 32s]

const chords = [
  { start: 0, end: 8, notes: [130.81, 196.00, 246.94, 329.63, 587.33] },
  { start: 8, end: 16, notes: [87.31, 130.81, 220.00, 329.63, 392.00] },
  { start: 16, end: 24, notes: [110.00, 164.81, 261.63, 392.00, 493.88] },
  { start: 24, end: 32, notes: [98.00, 146.83, 196.00, 261.63, 329.63] },
];

// Melodic chime accents (calm, sporadic storybook sparkle notes)
const melodyNotes = [
  { time: 1.5, freq: 523.25, dur: 3.5, pan: -0.2 }, // C5
  { time: 4.0, freq: 659.25, dur: 3.0, pan: 0.3 },  // E5
  { time: 9.5, freq: 587.33, dur: 3.5, pan: -0.3 }, // D5
  { time: 12.0, freq: 783.99, dur: 3.2, pan: 0.2 }, // G5
  { time: 17.5, freq: 659.25, dur: 3.5, pan: -0.25 },// E5
  { time: 20.0, freq: 493.88, dur: 3.0, pan: 0.2 }, // B4
  { time: 25.5, freq: 523.25, dur: 3.5, pan: -0.15 },// C5
  { time: 28.5, freq: 392.00, dur: 3.2, pan: 0.15 }, // G4
];

const leftBuffer = new Float32Array(TOTAL_SAMPLES);
const rightBuffer = new Float32Array(TOTAL_SAMPLES);

// 1. Synthesize lush ambient chord pads with gentle harmonic richness
for (const chord of chords) {
  const startSample = Math.floor(chord.start * SAMPLE_RATE);
  const endSample = Math.floor(chord.end * SAMPLE_RATE);
  const chordLen = endSample - startSample;

  for (let i = 0; i < chordLen; i++) {
    const globalIdx = (startSample + i) % TOTAL_SAMPLES;
    const progress = i / chordLen; // 0 to 1

    // Smooth bell-curve envelope for each chord (fade in, sustain, fade out)
    const env = Math.sin(progress * Math.PI);

    let chordSampleL = 0;
    let chordSampleR = 0;

    for (let n = 0; n < chord.notes.length; n++) {
      const freq = chord.notes[n];
      const t = (startSample + i) / SAMPLE_RATE;

      // Soft fundamental sine wave + gentle octave overtone
      const fund = Math.sin(2 * Math.PI * freq * t);
      const overtone1 = 0.28 * Math.sin(2 * Math.PI * freq * 2 * t);
      const overtone2 = 0.08 * Math.sin(2 * Math.PI * freq * 3 * t);
      const tone = (fund + overtone1 + overtone2) / 1.36;

      // Subtle detune chorus & stereo spreading
      const detuneL = Math.sin(2 * Math.PI * (freq * 0.9985) * t);
      const detuneR = Math.sin(2 * Math.PI * (freq * 1.0015) * t);

      // Warm vibrato
      const lfo = 1 + 0.003 * Math.sin(2 * Math.PI * 3.5 * t);

      const amp = env * (0.055 / Math.sqrt(n + 1));
      chordSampleL += (tone * 0.7 + detuneL * 0.3) * amp * lfo;
      chordSampleR += (tone * 0.7 + detuneR * 0.3) * amp * lfo;
    }

    leftBuffer[globalIdx] += chordSampleL;
    rightBuffer[globalIdx] += chordSampleR;
  }
}

// 2. Synthesize gentle, crystal-soft storybook music box chimes
for (const mel of melodyNotes) {
  const startSample = Math.floor(mel.time * SAMPLE_RATE);
  const chimeSamples = Math.floor(mel.dur * SAMPLE_RATE);

  for (let i = 0; i < chimeSamples; i++) {
    const globalIdx = (startSample + i) % TOTAL_SAMPLES;
    const t = i / SAMPLE_RATE;

    // Fast organic pluck attack, exponential smooth decay
    const decay = Math.exp(-t * 2.2);
    if (decay < 0.001) break;

    // Warm bell sound: fundamental + mellow 2nd & 4th partials
    const bell =
      Math.sin(2 * Math.PI * mel.freq * t) +
      0.35 * Math.sin(2 * Math.PI * (mel.freq * 2.01) * t) * Math.exp(-t * 3.5) +
      0.15 * Math.sin(2 * Math.PI * (mel.freq * 4.02) * t) * Math.exp(-t * 6.0);

    const amp = decay * 0.045;
    const panL = 0.5 - mel.pan * 0.4;
    const panR = 0.5 + mel.pan * 0.4;

    leftBuffer[globalIdx] += bell * amp * panL;
    rightBuffer[globalIdx] += bell * amp * panR;
  }
}

// 3. Seamless loop windowing (crossfade outer 1.5 seconds so there's zero pop/click at loop point)
const crossfadeSamples = Math.floor(1.5 * SAMPLE_RATE);
for (let i = 0; i < crossfadeSamples; i++) {
  const factor = i / crossfadeSamples;
  // Blend end into start and start into end
  const endIdx = TOTAL_SAMPLES - crossfadeSamples + i;
  const startIdx = i;

  const blendL = leftBuffer[startIdx] * factor + leftBuffer[endIdx] * (1 - factor);
  const blendR = rightBuffer[startIdx] * factor + rightBuffer[endIdx] * (1 - factor);

  leftBuffer[startIdx] = blendL;
  rightBuffer[startIdx] = blendR;
  leftBuffer[endIdx] = blendL;
  rightBuffer[endIdx] = blendR;
}

// 4. Normalize and convert Float32 to 16-bit PCM Buffer
let maxPeak = 0;
for (let i = 0; i < TOTAL_SAMPLES; i++) {
  maxPeak = Math.max(maxPeak, Math.abs(leftBuffer[i]), Math.abs(rightBuffer[i]));
}
const normGain = maxPeak > 0 ? 0.78 / maxPeak : 0.78;

const pcmData = Buffer.alloc(TOTAL_SAMPLES * NUM_CHANNELS * 2);
for (let i = 0; i < TOTAL_SAMPLES; i++) {
  const sL = Math.max(-1, Math.min(1, leftBuffer[i] * normGain));
  const sR = Math.max(-1, Math.min(1, rightBuffer[i] * normGain));

  const valL = sL < 0 ? sL * 32768 : sL * 32767;
  const valR = sR < 0 ? sR * 32768 : sR * 32767;

  pcmData.writeInt16LE(Math.floor(valL), i * 4);
  pcmData.writeInt16LE(Math.floor(valR), i * 4 + 2);
}

// 5. Construct valid WAV header
function createWavHeader(dataLength, sampleRate, numChannels) {
  const header = Buffer.alloc(44);
  const byteRate = sampleRate * numChannels * 2;
  const blockAlign = numChannels * 2;

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataLength, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  header.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(16, 34); // BitsPerSample
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

const outputPath = path.join(outputDir, 'cozy-ambient.wav');
fs.writeFileSync(outputPath, finalWavBuffer);

console.log(`✓ Successfully generated cozy soundtrack: ${outputPath} (${(finalWavBuffer.length / (1024 * 1024)).toFixed(2)} MB)`);
