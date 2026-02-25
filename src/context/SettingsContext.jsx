import { createContext, useContext, useCallback } from 'react';
import { DEFAULT_APP_SETTINGS } from '../utils/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('pomo-app-settings', DEFAULT_APP_SETTINGS);

  const updateSettings = useCallback((updates) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, [setSettings]);

  const setAnimationType = useCallback((type) => updateSettings({ animationType: type }), [updateSettings]);
  const setIconSet = useCallback((set) => updateSettings({ iconSet: set }), [updateSettings]);
  const toggleSound = useCallback(() => setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled })), [setSettings]);
  const setVolume = useCallback((volume) => updateSettings({ soundVolume: volume }), [updateSettings]);
  const setBackgroundElements = useCallback((ids) => updateSettings({ backgroundElements: ids }), [updateSettings]);
  const toggleBackgroundElement = useCallback((id) => {
    setSettings(prev => {
      const current = prev.backgroundElements || [];
      const next = current.includes(id) ? current.filter(e => e !== id) : [...current, id];
      return { ...prev, backgroundElements: next };
    });
  }, [setSettings]);
  const setBackgroundPosition = useCallback((id, x, y) => {
    setSettings(prev => ({
      ...prev,
      backgroundPositions: { ...prev.backgroundPositions, [id]: { x, y } },
    }));
  }, [setSettings]);
  const resetBackgroundPositions = useCallback(() => updateSettings({ backgroundPositions: {} }), [updateSettings]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, setAnimationType, setIconSet, toggleSound, setVolume, setBackgroundElements, toggleBackgroundElement, setBackgroundPosition, resetBackgroundPositions }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
}
