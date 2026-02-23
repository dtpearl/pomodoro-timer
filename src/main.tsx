import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import { TimerProvider } from './context/TimerContext';
import { SettingsProvider } from './context/SettingsContext';
import App from './components/App';
import './styles/global.css';
import './styles/animations.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SettingsProvider>
        <TimerProvider>
          <App />
        </TimerProvider>
      </SettingsProvider>
    </ThemeProvider>
  </StrictMode>
);
