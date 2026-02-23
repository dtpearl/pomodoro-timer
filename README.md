# Pomodoro Timer

A modern, customizable Pomodoro timer built with React and TypeScript. Features 8 color themes, 4 animation styles, and fully configurable timer settings.

## Features

- **Customizable timer** — Set work (1-90 min), short break (1-30 min), long break (5-60 min), and cycles before long break (1-10)
- **8 preset themes** — Ocean, Sunset, Forest, Midnight, Candy, Lavender, Citrus, Aurora
- **Custom color picker** — Create your own color palette
- **4 animation styles** — Circular progress, bar, pulsing, minimal
- **Audio notifications** — Web Audio API chime when sessions complete
- **Auto-start** — Optionally auto-advance between work and break sessions
- **Session tracking** — Visual progress dots and session counter
- **Browser tab title** — Shows countdown and mode while timer is running
- **Persistent settings** — All preferences saved to localStorage

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

- [Vite](https://vitejs.dev/) — Build tool
- [React 19](https://react.dev/) — UI framework
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- CSS Custom Properties — Theming
- Web Audio API — Notifications

## Project Structure

```
src/
├── components/
│   ├── timer/       # TimerDisplay, TimerControls, SessionCounter
│   ├── settings/    # SettingsPanel
│   ├── theme/       # ThemeSelector with presets + custom colors
│   ├── common/      # Notification toast
│   └── App.tsx      # Main layout
├── context/         # TimerContext, ThemeContext, SettingsContext
├── hooks/           # useLocalStorage, useAudio
├── types/           # TypeScript interfaces
├── utils/           # Themes, constants, formatters
└── styles/          # Global CSS, animations
```

## License

MIT
