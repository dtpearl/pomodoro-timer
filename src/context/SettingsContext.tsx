import { createContext, useContext, useCallback, ReactNode } from 'react';
import { AppSettings, AnimationType, IconSet } from '../types';
import { DEFAULT_APP_SETTINGS } from '../utils/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface SettingsContextValue {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  setAnimationType: (type: AnimationType) => void;
  setIconSet: (set: IconSet) => void;
  toggleSound: () => void;
  setVolume: (volume: number) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLocalStorage<AppSettings>('pomo-app-settings', DEFAULT_APP_SETTINGS);

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, [setSettings]);

  const setAnimationType = useCallback((type: AnimationType) => updateSettings({ animationType: type }), [updateSettings]);
  const setIconSet = useCallback((set: IconSet) => updateSettings({ iconSet: set }), [updateSettings]);
  const toggleSound = useCallback(() => setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled })), [setSettings]);
  const setVolume = useCallback((volume: number) => updateSettings({ soundVolume: volume }), [updateSettings]);

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
