import { useState } from 'react';
import { useTimer } from '../../context/TimerContext';
import { useSettings } from '../../context/SettingsContext';
import { useTheme } from '../../context/ThemeContext';
import { TIMER_LIMITS } from '../../utils/constants';
import { BACKGROUND_ELEMENT_GROUPS, PRESET_MAPPINGS, ALL_ELEMENT_IDS } from '../common/Background';
import './SettingsPanel.css';

export function SettingsPanel({ isOpen, onClose }) {
  const { settings: timerSettings, updateSettings: updateTimerSettings } = useTimer();
  const { settings: appSettings, setAnimationType, toggleSound, setVolume, setBackgroundElements, toggleBackgroundElement, resetBackgroundPositions } = useSettings();
  const { currentTheme, setTheme, setCustomTheme, themes } = useTheme();

  const [activeTab, setActiveTab] = useState('timer');
  const [localSettings, setLocalSettings] = useState(timerSettings);

  const handleSave = () => {
    updateTimerSettings(localSettings);
    onClose();
  };

  const handleCustomColorChange = (key, value) => {
    const base = currentTheme.id === 'custom' ? currentTheme.colors : themes[0].colors;
    setCustomTheme({ ...base, [key]: value });
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

        <div className="settings-tabs">
          <button
            className={`settings-tab ${activeTab === 'timer' ? 'settings-tab--active' : ''}`}
            onClick={() => setActiveTab('timer')}
          >
            Timer
          </button>
          <button
            className={`settings-tab ${activeTab === 'theme' ? 'settings-tab--active' : ''}`}
            onClick={() => setActiveTab('theme')}
          >
            Theme
          </button>
        </div>

        <div className="settings-body">
          {activeTab === 'timer' && (
            <>
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
                <h3>Timer Animation</h3>
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
            </>
          )}

          {activeTab === 'theme' && (
            <>
              <div className="settings-section">
                <h3>Theme</h3>
                <div className="theme-grid">
                  {themes.map(theme => (
                    <button
                      key={theme.id}
                      className={`theme-card ${currentTheme.id === theme.id ? 'theme-card--active' : ''}`}
                      onClick={() => setTheme(theme.id)}
                    >
                      <div className="theme-preview" style={{ background: theme.gradient }} />
                      <span className="theme-name">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="settings-section">
                <h3>Custom Colors</h3>
                <div className="custom-colors">
                  {['primary', 'secondary', 'accent', 'background', 'text'].map(key => (
                    <div key={key} className="color-row">
                      <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                      <input
                        type="color"
                        value={currentTheme.colors[key]}
                        onChange={e => handleCustomColorChange(key, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="settings-section">
                <h3>Background</h3>
                <div className="bg-presets">
                  {Object.entries(PRESET_MAPPINGS).map(([key, ids]) => (
                    <button
                      key={key}
                      className="animation-option"
                      onClick={() => setBackgroundElements(ids)}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                  ))}
                  <button className="animation-option" onClick={() => setBackgroundElements(ALL_ELEMENT_IDS)}>All</button>
                  <button className="animation-option" onClick={() => setBackgroundElements([])}>None</button>
                </div>
                {BACKGROUND_ELEMENT_GROUPS.map(group => (
                  <div key={group.group} className="bg-element-group">
                    <h4>{group.group}</h4>
                    <div className="animation-options">
                      {group.elements.map(el => (
                        <button
                          key={el.id}
                          className={`animation-option ${(appSettings.backgroundElements || []).includes(el.id) ? 'animation-option--active' : ''}`}
                          onClick={() => toggleBackgroundElement(el.id)}
                        >
                          {el.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="bg-element-group">
                  <button className="animation-option" onClick={resetBackgroundPositions}>Reset Positions</button>
                </div>
              </div>
            </>
          )}
        </div>

        {activeTab === 'timer' && (
          <div className="settings-footer">
            <button className="btn btn--secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn--primary" onClick={handleSave}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
}
