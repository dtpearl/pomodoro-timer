import { memo } from 'react';
import { useTimer } from '../../context/TimerContext';
import { useSettings } from '../../context/SettingsContext';
import { formatTime, getModeLabel } from '../../utils/formatters';
import './TimerDisplay.css';

export const TimerDisplay = memo(function TimerDisplay() {
  const { state, progress } = useTimer();
  const { settings } = useSettings();
  const { animationType } = settings;

  const radius = 130;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className={`timer-display timer-display--${animationType} ${state.isRunning ? 'timer-display--running' : ''}`}>
      {animationType === 'circular' && (
        <svg className="timer-svg" width={radius * 2} height={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
          {/* Background track */}
          <circle
            className="timer-track"
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <circle
            className="timer-progress"
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${radius} ${radius})`}
          />
        </svg>
      )}

      {animationType === 'bar' && (
        <div className="timer-bar-container">
          <div className="timer-bar-fill" style={{ width: `${progress * 100}%` }} />
        </div>
      )}

      <div className={`timer-content ${animationType === 'pulsing' && state.isRunning ? 'animate-pulse' : ''}`}>
        <span className="timer-mode-label">{getModeLabel(state.mode)}</span>
        <span className="timer-time">{formatTime(state.timeRemaining)}</span>
      </div>
    </div>
  );
});
