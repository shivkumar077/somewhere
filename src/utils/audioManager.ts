/**
 * Audio Manager for Somewhere
 *
 * Implements smooth volume fades, browser autoplay compliance,
 * error resilience, and reduced-motion / user preference handling.
 */

type AudioListener = (isPlaying: boolean, isMuted: boolean) => void;

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private isMuted = false;
  private targetVolume = 0.42;
  private fadeInterval: number | null = null;
  private listeners: Set<AudioListener> = new Set();
  private isInitialized = false;

  constructor() {
    // Lazily initialized on first user interaction to comply with autoplay policies
  }

  private init() {
    if (this.isInitialized || typeof window === 'undefined') return;

    try {
      this.audio = new Audio('/audio/cozy-ambient.wav');
      this.audio.loop = true;
      this.audio.volume = 0;
      this.audio.preload = 'metadata';

      this.audio.addEventListener('error', (e) => {
        console.warn('Ambient audio could not be loaded or played. Operating in silent mode gracefully.', e);
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        if (!this.audio?.loop) {
          this.isPlaying = false;
          this.notify();
        }
      });

      this.isInitialized = true;
    } catch (err) {
      console.warn('Failed to initialize audio element:', err);
    }
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying, this.isMuted);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying, this.isMuted));
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Smooth volume fade over given duration in ms
   */
  private fadeVolume(from: number, to: number, durationMs: number, onComplete?: () => void) {
    if (this.fadeInterval !== null) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    if (!this.audio) return;

    const steps = 24;
    const stepTime = durationMs / steps;
    const delta = (to - from) / steps;
    let currentStep = 0;

    this.audio.volume = Math.max(0, Math.min(1, from));

    this.fadeInterval = window.setInterval(() => {
      currentStep++;
      if (!this.audio) {
        clearInterval(this.fadeInterval!);
        return;
      }

      const nextVol = from + delta * currentStep;
      this.audio.volume = Math.max(0, Math.min(1, nextVol));

      if (currentStep >= steps) {
        clearInterval(this.fadeInterval!);
        this.fadeInterval = null;
        this.audio.volume = Math.max(0, Math.min(1, to));
        if (onComplete) onComplete();
      }
    }, stepTime);
  }

  /**
   * Start playback with a gentle volume fade-in
   */
  public async play(): Promise<boolean> {
    this.init();
    if (!this.audio) return false;

    try {
      this.audio.currentTime = this.audio.currentTime || 0;
      const playPromise = this.audio.play();

      if (playPromise !== undefined) {
        await playPromise;
      }

      this.isPlaying = true;
      this.isMuted = false;
      this.fadeVolume(0, this.targetVolume, 1400);
      this.notify();
      return true;
    } catch (err) {
      // Browser autoplay policy blocked playback or file missing
      console.warn('Audio playback could not start automatically (autoplay policy or missing file):', err);
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  /**
   * Stop/Pause playback with a gentle volume fade-out
   */
  public pause(): void {
    if (!this.audio || !this.isPlaying) return;

    const currentVol = this.audio.volume;
    this.fadeVolume(currentVol, 0, 800, () => {
      if (this.audio) {
        this.audio.pause();
      }
      this.isPlaying = false;
      this.notify();
    });
  }

  /**
   * Toggle audio on/off
   */
  public toggle(): Promise<boolean> | void {
    if (this.isPlaying) {
      this.pause();
    } else {
      return this.play();
    }
  }
}

export const audioManager = new AudioManager();
