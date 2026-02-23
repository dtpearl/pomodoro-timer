import { TimerSettings, AppSettings } from '../types';

export const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  cyclesBeforeLongBreak: 4,
  autoStart: false,
};

export const DEFAULT_APP_SETTINGS: AppSettings = {
  animationType: 'circular',
  iconSet: 'modern',
  soundEnabled: true,
  soundVolume: 0.7,
  backgroundId: null,
};

export const TIMER_LIMITS = {
  workMin: 1,
  workMax: 90,
  shortBreakMin: 1,
  shortBreakMax: 30,
  longBreakMin: 5,
  longBreakMax: 60,
  cyclesMin: 1,
  cyclesMax: 10,
};
