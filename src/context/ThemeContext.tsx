import { createContext, useContext, useEffect, ReactNode } from 'react';
import { Theme, ThemeColors } from '../types';
import { PRESET_THEMES, DEFAULT_THEME } from '../utils/themes';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ThemeContextValue {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  setCustomTheme: (colors: ThemeColors) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeToDOM(theme: Theme) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-secondary', theme.colors.secondary);
  root.style.setProperty('--color-accent', theme.colors.accent);
  root.style.setProperty('--color-background', theme.colors.background);
  root.style.setProperty('--color-surface', theme.colors.surface);
  root.style.setProperty('--color-text', theme.colors.text);
  root.style.setProperty('--color-text-muted', theme.colors.textMuted);
  if (theme.gradient) {
    root.style.setProperty('--theme-gradient', theme.gradient);
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useLocalStorage<string>('pomo-theme-id', DEFAULT_THEME.id);
  const [customColors, setCustomColors] = useLocalStorage<ThemeColors | null>('pomo-custom-colors', null);

  const currentTheme = themeId === 'custom' && customColors
    ? { id: 'custom', name: 'Custom', colors: customColors, gradient: `linear-gradient(135deg, ${customColors.primary} 0%, ${customColors.secondary} 50%, ${customColors.accent} 100%)` }
    : PRESET_THEMES.find(t => t.id === themeId) || DEFAULT_THEME;

  useEffect(() => {
    applyThemeToDOM(currentTheme);
  }, [currentTheme]);

  const setTheme = (id: string) => {
    setThemeId(id);
  };

  const setCustomTheme = (colors: ThemeColors) => {
    setCustomColors(colors);
    setThemeId('custom');
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, setCustomTheme, themes: PRESET_THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
