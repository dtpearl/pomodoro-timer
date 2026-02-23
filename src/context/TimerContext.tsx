import { createContext, useContext, useReducer, useCallback, useEffect, useRef, ReactNode } from 'react';
import { TimerState, TimerSettings, TimerMode } from '../types';
import { DEFAULT_TIMER_SETTINGS } from '../utils/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { minutesToSeconds } from '../utils/formatters';

type TimerAction =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'TICK' }
  | { type: 'COMPLETE' }
  | { type: 'SKIP' }
  | { type: 'SET_MODE'; mode: TimerMode; duration: number };

interface TimerContextValue {
  state: TimerState;
  settings: TimerSettings;
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  updateSettings: (settings: TimerSettings) => void;
  progress: number;
  totalDuration: number;
}

const TimerContext = createContext<TimerContextValue | null>(null);

function getInitialDuration(mode: TimerMode, settings: TimerSettings): number {
  switch (mode) {
    case 'work': return minutesToSeconds(settings.workDuration);
    case 'shortBreak': return minutesToSeconds(settings.shortBreakDuration);
    case 'longBreak': return minutesToSeconds(settings.longBreakDuration);
  }
}

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'START':
      return { ...state, isRunning: true };
    case 'PAUSE':
      return { ...state, isRunning: false };
    case 'TICK':
      return { ...state, timeRemaining: Math.max(0, state.timeRemaining - 1) };
    case 'RESET':
      return { ...state, isRunning: false, timeRemaining: state.timeRemaining };
    case 'SET_MODE':
      return { ...state, mode: action.mode, timeRemaining: action.duration, isRunning: false };
    case 'COMPLETE':
      if (state.mode === 'work') {
        const newSessions = state.sessionsCompleted + 1;
        const newCycle = state.currentCycle + 1;
        return { ...state, sessionsCompleted: newSessions, currentCycle: newCycle, isRunning: false };
      }
      return { ...state, isRunning: false };
    case 'SKIP':
      return { ...state, isRunning: false };
    default:
      return state;
  }
}

export function TimerProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLocalStorage<TimerSettings>('pomo-timer-settings', DEFAULT_TIMER_SETTINGS);

  const initialState: TimerState = {
    mode: 'work',
    timeRemaining: minutesToSeconds(settings.workDuration),
    isRunning: false,
    sessionsCompleted: 0,
    currentCycle: 1,
  };

  const [state, dispatch] = useReducer(timerReducer, initialState);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalDuration = getInitialDuration(state.mode, settings);
  const progress = totalDuration > 0 ? 1 - state.timeRemaining / totalDuration : 0;

  // Timer interval
  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.isRunning]);

  // Handle timer completion
  useEffect(() => {
    if (state.timeRemaining === 0 && state.isRunning) {
      dispatch({ type: 'COMPLETE' });
    }
  }, [state.timeRemaining, state.isRunning]);

  // After completion, advance to next mode
  useEffect(() => {
    if (state.timeRemaining === 0 && !state.isRunning) {
      const nextMode = getNextMode(state.mode, state.currentCycle, settings.cyclesBeforeLongBreak);
      const nextDuration = getInitialDuration(nextMode, settings);
      dispatch({ type: 'SET_MODE', mode: nextMode, duration: nextDuration });
      if (settings.autoStart) {
        setTimeout(() => dispatch({ type: 'START' }), 500);
      }
    }
  }, [state.timeRemaining, state.isRunning, state.mode, state.currentCycle, settings]);

  const start = useCallback(() => dispatch({ type: 'START' }), []);
  const pause = useCallback(() => dispatch({ type: 'PAUSE' }), []);

  const reset = useCallback(() => {
    dispatch({ type: 'PAUSE' });
    const duration = getInitialDuration(state.mode, settings);
    dispatch({ type: 'SET_MODE', mode: state.mode, duration });
  }, [state.mode, settings]);

  const skip = useCallback(() => {
    dispatch({ type: 'PAUSE' });
    const nextMode = getNextMode(state.mode, state.currentCycle, settings.cyclesBeforeLongBreak);
    const nextDuration = getInitialDuration(nextMode, settings);
    if (state.mode === 'work') {
      dispatch({ type: 'COMPLETE' });
    }
    dispatch({ type: 'SET_MODE', mode: nextMode, duration: nextDuration });
  }, [state.mode, state.currentCycle, settings]);

  const updateSettings = useCallback((newSettings: TimerSettings) => {
    setSettings(newSettings);
    const duration = getInitialDuration(state.mode, newSettings);
    dispatch({ type: 'PAUSE' });
    dispatch({ type: 'SET_MODE', mode: state.mode, duration });
  }, [state.mode, setSettings]);

  return (
    <TimerContext.Provider value={{ state, settings, start, pause, reset, skip, updateSettings, progress, totalDuration }}>
      {children}
    </TimerContext.Provider>
  );
}

function getNextMode(currentMode: TimerMode, currentCycle: number, cyclesBeforeLong: number): TimerMode {
  if (currentMode === 'work') {
    return currentCycle >= cyclesBeforeLong ? 'longBreak' : 'shortBreak';
  }
  return 'work';
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) throw new Error('useTimer must be used within a TimerProvider');
  return context;
}
