import { memo } from 'react';
import { useTimer } from '../../context/TimerContext';
import './SessionCounter.css';

export const SessionCounter = memo(function SessionCounter() {
  const { state, settings } = useTimer();
  const dots = Array.from({ length: settings.cyclesBeforeLongBreak }, (_, i) => i);

  return (
    <div className="session-counter">
      <div className="session-dots">
        {dots.map(i => (
          <span
            key={i}
            className={`session-dot ${
              i < (state.currentCycle - 1) % settings.cyclesBeforeLongBreak
                ? 'session-dot--completed'
                : i === (state.currentCycle - 1) % settings.cyclesBeforeLongBreak && state.mode === 'work'
                ? 'session-dot--active'
                : ''
            }`}
          />
        ))}
      </div>
      <span className="session-label">
        {state.sessionsCompleted} session{state.sessionsCompleted !== 1 ? 's' : ''} completed
      </span>
    </div>
  );
});
