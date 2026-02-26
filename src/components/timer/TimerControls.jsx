import { memo } from 'react';
import { useTimer } from '../../context/TimerContext';
import './TimerControls.css';

export const TimerControls = memo(function TimerControls() {
  const { state, start, pause, reset, skip, fastForward } = useTimer();

  return (
    <div className="timer-controls">
      <button className="control-btn control-btn--secondary" onClick={reset} title="Reset">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 1 9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
          <path d="M3 22v-6h6" />
        </svg>
      </button>

      <button
        className="control-btn control-btn--primary"
        onClick={state.isRunning ? pause : start}
        title={state.isRunning ? 'Pause' : 'Start'}
      >
        {state.isRunning ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6,4 20,12 6,20" />
          </svg>
        )}
      </button>

      <button className="control-btn control-btn--secondary" onClick={skip} title="Skip">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5,4 15,12 5,20" />
          <rect x="15" y="4" width="4" height="16" rx="1" />
        </svg>
      </button>

      {import.meta.env.DEV && (
        <button className="control-btn control-btn--secondary" onClick={fastForward} title="Fast Forward 1min (dev)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="3,4 13,12 3,20" />
            <polygon points="11,4 21,12 11,20" />
          </svg>
        </button>
      )}
    </div>
  );
});
