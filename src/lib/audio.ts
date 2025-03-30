import { theme } from '@/styles/theme';

class AudioManager {
  private static instance: AudioManager;
  private sounds: Map<string, HTMLAudioElement>;
  private music: HTMLAudioElement | null;
  private isMuted: boolean;
  private volume: number;

  private constructor() {
    this.sounds = new Map();
    this.music = null;
    this.isMuted = false;
    this.volume = 1.0;
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public async loadSound(name: string, url: string): Promise<void> {
    try {
      const audio = new Audio(url);
      audio.volume = this.volume;
      this.sounds.set(name, audio);
    } catch (error) {
      console.error(`Failed to load sound: ${name}`, error);
    }
  }

  public async loadMusic(url: string): Promise<void> {
    try {
      this.music = new Audio(url);
      this.music.volume = this.volume;
      this.music.loop = true;
    } catch (error) {
      console.error('Failed to load music', error);
    }
  }

  public playSound(name: string): void {
    if (this.isMuted) return;
    const sound = this.sounds.get(name);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(error => {
        console.error(`Failed to play sound: ${name}`, error);
      });
    }
  }

  public playMusic(): void {
    if (this.isMuted || !this.music) return;
    this.music.play().catch(error => {
      console.error('Failed to play music', error);
    });
  }

  public stopMusic(): void {
    if (this.music) {
      this.music.pause();
      this.music.currentTime = 0;
    }
  }

  public setMute(muted: boolean): void {
    this.isMuted = muted;
    if (muted) {
      this.stopMusic();
    } else {
      this.playMusic();
    }
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach(sound => {
      sound.volume = this.volume;
    });
    if (this.music) {
      this.music.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }
}

export const audioManager = AudioManager.getInstance(); 