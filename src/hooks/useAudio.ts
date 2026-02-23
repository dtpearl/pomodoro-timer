import { useCallback, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';

export function useAudio() {
  const { settings } = useSettings();
  const audioContextRef = useRef<AudioContext | null>(null);

  const playNotification = useCallback(() => {
    if (!settings.soundEnabled) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;
      const now = ctx.currentTime;
      const volume = settings.soundVolume;

      // Play a pleasant two-tone chime
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5

      frequencies.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, now);

        gainNode.gain.setValueAtTime(0, now + i * 0.15);
        gainNode.gain.linearRampToValueAtTime(volume * 0.3, now + i * 0.15 + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.6);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start(now + i * 0.15);
        oscillator.stop(now + i * 0.15 + 0.7);
      });
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  }, [settings.soundEnabled, settings.soundVolume]);

  return { playNotification };
}
