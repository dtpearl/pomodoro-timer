// Timer types
export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export interface TimerSettings {
  workDuration: number; // minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  cyclesBeforeLongBreak: number;
  autoStart: boolean;
}

export interface TimerState {
  mode: TimerMode;
  timeRemaining: number; // seconds
  isRunning: boolean;
  sessionsCompleted: number;
  currentCycle: number;
}

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  gradient?: string; // CSS gradient for background
}

// Settings types
export type AnimationType = 'circular' | 'bar' | 'pulsing' | 'minimal';
export type IconSet = 'modern' | 'minimal' | 'playful';

export interface AppSettings {
  animationType: AnimationType;
  iconSet: IconSet;
  soundEnabled: boolean;
  soundVolume: number;
  backgroundId: string | null;
}
