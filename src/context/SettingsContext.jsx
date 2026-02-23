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

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, setAnimationType, setIconSet, toggleSound, setVolume }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
}
