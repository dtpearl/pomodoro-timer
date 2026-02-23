import { useState, useEffect, memo } from 'react';
import { getModeLabel } from '../../utils/formatters';
import { TimerMode } from '../../types';
import './Notification.css';

interface NotificationProps {
  mode: TimerMode;
  show: boolean;
  onDismiss: () => void;
}

export const Notification = memo(function Notification({ mode, show, onDismiss }: NotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onDismiss, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  if (!show) return null;

  const nextMode = mode === 'work' ? 'Take a break!' : 'Time to focus!';
  const emoji = mode === 'work' ? '🎉' : '💪';

  return (
    <div className="notification animate-notification">
      <div className="notification-content">
        <span className="notification-emoji">{emoji}</span>
        <div className="notification-text">
          <strong>{getModeLabel(mode)} complete!</strong>
          <span>{nextMode}</span>
        </div>
      </div>
      <button className="notification-dismiss" onClick={onDismiss}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
});
