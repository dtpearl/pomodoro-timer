import { useState } from 'react';
import { useTimer } from '../../context/TimerContext';
import { useSettings } from '../../context/SettingsContext';
import { TIMER_LIMITS } from '../../utils/constants';
import './SettingsPanel.css';

export function SettingsPanel({ isOpen, onClose }) {
  const { settings: timerSettings, updateSettings: updateTimerSettings } = useTimer();
  const { settings: appSettings, setAnimationType, toggleSound, setVolume } = useSettings();

  const [localSettings, setLocalSettings] = useState(timerSettings);

  const handleSave = () => {
    updateTimerSettings(localSettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel animate-slide-right" onClick={e => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="settings-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="settings-body">
          <div className="settings-section">
            <h3>Timer Durations</h3>
            <div className="setting-row">
              <label>Focus: {localSettings.workDuration} min</label>
              <input
                type="range"
                min={TIMER_LIMITS.workMin}
                max={TIMER_LIMITS.workMax}
                value={localSettings.workDuration}
                onChange={e => setLocalSettings(s => ({ ...s, workDuration: +e.target.value }))}
              />
            </div>
            <div className="setting-row">
              <label>Short Break: {localSettings.shortBreakDuration} min</label>
              <input
                type="range"
                min={TIMER_LIMITS.shortBreakMin}
                max={TIMER_LIMITS.shortBreakMax}
                value={localSettings.shortBreakDuration}
                onChange={e => setLocalSettings(s => ({ ...s, shortBreakDuration: +e.target.value }))}
              />
            </div>
            <div className="setting-row">
              <label>Long Break: {localSettings.longBreakDuration} min</label>
              <input
                type="range"
                min={TIMER_LIMITS.longBreakMin}
                max={TIMER_LIMITS.longBreakMax}
                value={localSettings.longBreakDuration}
                onChange={e => setLocalSettings(s => ({ ...s, longBreakDuration: +e.target.value }))}
              />
            </div>
            <div className="setting-row">
              <label>Cycles before long break: {localSettings.cyclesBeforeLongBreak}</label>
              <input
                type="range"
                min={TIMER_LIMITS.cyclesMin}
                max={TIMER_LIMITS.cyclesMax}
                value={localSettings.cyclesBeforeLongBreak}
                onChange={e => setLocalSettings(s => ({ ...s, cyclesBeforeLongBreak: +e.target.value }))}
              />
            </div>
            <div className="setting-row setting-row--toggle">
              <label>Auto-start next session</label>
              <button
                className={`toggle ${localSettings.autoStart ? 'toggle--on' : ''}`}
                onClick={() => setLocalSettings(s => ({ ...s, autoStart: !s.autoStart }))}
              >
                <span className="toggle-thumb" />
              </button>
            </div>
          </div>

          <div className="settings-section">
            <h3>Animation Style</h3>
            <div className="animation-options">
              {['circular', 'bar', 'pulsing', 'minimal'].map(type => (
                <button
                  key={type}
                  className={`animation-option ${appSettings.animationType === type ? 'animation-option--active' : ''}`}
                  onClick={() => setAnimationType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <h3>Sound</h3>
            <div className="setting-row setting-row--toggle">
              <label>Notification Sound</label>
              <button
                className={`toggle ${appSettings.soundEnabled ? 'toggle--on' : ''}`}
                onClick={toggleSound}
              >
                <span className="toggle-thumb" />
              </button>
            </div>
            {appSettings.soundEnabled && (
              <div className="setting-row">
                <label>Volume: {Math.round(appSettings.soundVolume * 100)}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={appSettings.soundVolume * 100}
                  onChange={e => setVolume(+e.target.value / 100)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="settings-footer">
          <button className="btn btn--secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
