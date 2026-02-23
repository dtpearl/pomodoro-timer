import { useTheme } from '../../context/ThemeContext';
import './ThemeSelector.css';

export function ThemeSelector({ isOpen, onClose }) {
  const { currentTheme, setTheme, setCustomTheme, themes } = useTheme();

  const handleCustomColorChange = (key, value) => {
    const base = currentTheme.id === 'custom' ? currentTheme.colors : themes[0].colors;
    setCustomTheme({ ...base, [key]: value });
  };

  if (!isOpen) return null;

  return (
    <div className="theme-overlay" onClick={onClose}>
      <div className="theme-panel animate-slide-right" onClick={e => e.stopPropagation()}>
        <div className="theme-header">
          <h2>Theme</h2>
          <button className="theme-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="theme-body">
          <div className="theme-section">
            <h3>Presets</h3>
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

          <div className="theme-section">
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
        </div>
      </div>
    </div>
  );
}
