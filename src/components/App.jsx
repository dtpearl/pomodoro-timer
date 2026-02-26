import { useState } from "react";
import { useTimer } from "../context/TimerContext";
import { TimerDisplay } from "./timer/TimerDisplay";
import { TimerControls } from "./timer/TimerControls";
import { SessionCounter } from "./timer/SessionCounter";
import { SettingsPanel } from "./settings/SettingsPanel";
import { Background } from "./common/Background";
import { getModeLabel } from "../utils/formatters";
import "./App.css";

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { durationConflict, resolveDurationConflict, state } = useTimer();

  return (
    <div className="app">
      <Background />
      <header className="app-header">
        <div className="app-logo">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>Pomodoro</span>
        </div>
        <button
          className="header-btn"
          onClick={() => setSettingsOpen(true)}
          title="Settings"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </header>

      <main className="app-main">
        <div className="timer-wrapper animate-fade-in">
          <TimerDisplay />
          <TimerControls />
          <SessionCounter />
        </div>
      </main>

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {durationConflict && (
        <div className="conflict-overlay">
          <div className="conflict-dialog">
            <h3>Timer Duration Exceeded</h3>
            <p>
              You've already exceeded the new{" "}
              {getModeLabel(state.mode).toLowerCase()} duration.
            </p>
            <p>Reset the current timer or skip to the next session?</p>
            <div className="conflict-actions">
              <button
                className="btn btn--secondary"
                onClick={() => resolveDurationConflict("reset")}
              >
                Reset Timer
              </button>
              <button
                className="btn btn--primary"
                onClick={() => resolveDurationConflict("skip")}
              >
                Skip to Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
