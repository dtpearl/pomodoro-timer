import { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
import { DEFAULT_TIMER_SETTINGS } from '../utils/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { minutesToSeconds } from '../utils/formatters';

const TimerContext = createContext(null);

function getInitialDuration(mode, settings) {
  switch (mode) {
    case 'work': return minutesToSeconds(settings.workDuration);
    case 'shortBreak': return minutesToSeconds(settings.shortBreakDuration);
    case 'longBreak': return minutesToSeconds(settings.longBreakDuration);
  }
}

function timerReducer(state, action) {
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

export function TimerProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('pomo-timer-settings', DEFAULT_TIMER_SETTINGS);

  const initialState = {
    mode: 'work',
    timeRemaining: minutesToSeconds(settings.workDuration),
    isRunning: false,
    sessionsCompleted: 0,
    currentCycle: 1,
  };

  const [state, dispatch] = useReducer(timerReducer, initialState);
  const intervalRef = useRef(null);

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

  const updateSettings = useCallback((newSettings) => {
    setSettings(newSettings);
  }, [setSettings]);

  return (
    <TimerContext.Provider value={{ state, settings, start, pause, reset, skip, updateSettings, progress, totalDuration }}>
      {children}
    </TimerContext.Provider>
  );
}

function getNextMode(currentMode, currentCycle, cyclesBeforeLong) {
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
