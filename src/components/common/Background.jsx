import { memo } from 'react';
import { useSettings } from '../../context/SettingsContext';

function WavesBackground() {
  return (
    <svg
      className="background-svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soft waves in lower region */}
      <path
        className="background-wave background-wave--1"
        d="M0 700 C360 650, 720 750, 1080 680 S1440 720, 1440 700 L1440 900 L0 900 Z"
        style={{ fill: 'var(--color-primary)', opacity: 0.06 }}
      />
      <path
        className="background-wave background-wave--2"
        d="M0 750 C300 710, 600 790, 900 730 S1200 770, 1440 740 L1440 900 L0 900 Z"
        style={{ fill: 'var(--color-secondary)', opacity: 0.05 }}
      />
      <path
        className="background-wave background-wave--3"
        d="M0 780 C240 760, 480 810, 720 770 S960 800, 1440 780 L1440 900 L0 900 Z"
        style={{ fill: 'var(--color-accent)', opacity: 0.04 }}
      />

      {/* Floating bokeh circles */}
      <circle cx="120" cy="200" r="80"
        className="background-float background-float--1"
        style={{ fill: 'var(--color-primary)', opacity: 0.04 }}
      />
      <circle cx="1300" cy="150" r="100"
        className="background-float background-float--2"
        style={{ fill: 'var(--color-secondary)', opacity: 0.03 }}
      />
      <circle cx="200" cy="600" r="60"
        className="background-float background-float--3"
        style={{ fill: 'var(--color-accent)', opacity: 0.05 }}
      />
      <circle cx="1100" cy="500" r="90"
        className="background-float background-float--4"
        style={{ fill: 'var(--color-primary)', opacity: 0.03 }}
      />
      <circle cx="700" cy="100" r="50"
        className="background-float background-float--5"
        style={{ fill: 'var(--color-secondary)', opacity: 0.04 }}
      />
      <circle cx="900" cy="700" r="70"
        className="background-float background-float--6"
        style={{ fill: 'var(--color-accent)', opacity: 0.03 }}
      />

      {/* Organic flowing lines */}
      <path
        className="background-drift background-drift--1"
        d="M-50 300 Q400 200, 700 350 T1500 250"
        style={{ stroke: 'var(--color-secondary)', opacity: 0.06 }}
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        className="background-drift background-drift--2"
        d="M-50 500 Q350 400, 750 500 T1500 450"
        style={{ stroke: 'var(--color-accent)', opacity: 0.05 }}
        fill="none"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GeometricBackground() {
  return (
    <svg
      className="background-svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Scattered diamonds */}
      <rect x="100" y="120" width="60" height="60" rx="4"
        className="background-spin background-spin--1"
        style={{ fill: 'var(--color-primary)', opacity: 0.04 }}
        transform="rotate(45 130 150)"
      />
      <rect x="1200" y="200" width="80" height="80" rx="4"
        className="background-spin background-spin--2"
        style={{ fill: 'var(--color-secondary)', opacity: 0.03 }}
        transform="rotate(45 1240 240)"
      />
      <rect x="800" y="80" width="40" height="40" rx="2"
        className="background-spin background-spin--3"
        style={{ fill: 'var(--color-accent)', opacity: 0.05 }}
        transform="rotate(45 820 100)"
      />
      <rect x="300" y="650" width="70" height="70" rx="4"
        className="background-spin background-spin--4"
        style={{ fill: 'var(--color-secondary)', opacity: 0.04 }}
        transform="rotate(45 335 685)"
      />

      {/* Hexagon-like shapes */}
      <polygon points="600,300 640,280 680,300 680,340 640,360 600,340"
        className="background-float background-float--1"
        style={{ fill: 'var(--color-primary)', opacity: 0.03 }}
      />
      <polygon points="1050,600 1090,580 1130,600 1130,640 1090,660 1050,640"
        className="background-float background-float--3"
        style={{ fill: 'var(--color-accent)', opacity: 0.04 }}
      />
      <polygon points="150,420 180,405 210,420 210,450 180,465 150,450"
        className="background-float background-float--5"
        style={{ fill: 'var(--color-secondary)', opacity: 0.035 }}
      />

      {/* Thin grid lines */}
      <line x1="0" y1="200" x2="1440" y2="200"
        className="background-drift background-drift--1"
        style={{ stroke: 'var(--color-primary)', opacity: 0.025 }}
        strokeWidth="0.5"
      />
      <line x1="0" y1="500" x2="1440" y2="500"
        className="background-drift background-drift--2"
        style={{ stroke: 'var(--color-secondary)', opacity: 0.02 }}
        strokeWidth="0.5"
      />
      <line x1="400" y1="0" x2="400" y2="900"
        style={{ stroke: 'var(--color-accent)', opacity: 0.02 }}
        strokeWidth="0.5"
      />
      <line x1="1000" y1="0" x2="1000" y2="900"
        style={{ stroke: 'var(--color-primary)', opacity: 0.02 }}
        strokeWidth="0.5"
      />

      {/* Corner triangles */}
      <polygon points="0,0 120,0 0,120"
        className="background-wave background-wave--1"
        style={{ fill: 'var(--color-primary)', opacity: 0.03 }}
      />
      <polygon points="1440,900 1320,900 1440,780"
        className="background-wave background-wave--2"
        style={{ fill: 'var(--color-secondary)', opacity: 0.03 }}
      />
    </svg>
  );
}

function ZenBackground() {
  return (
    <svg
      className="background-svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ripple rings - like a pebble dropped in water */}
      <circle cx="350" cy="350" r="60" fill="none"
        className="background-ripple background-ripple--1"
        style={{ stroke: 'var(--color-primary)', opacity: 0.05 }}
        strokeWidth="0.8"
      />
      <circle cx="350" cy="350" r="100" fill="none"
        className="background-ripple background-ripple--2"
        style={{ stroke: 'var(--color-primary)', opacity: 0.04 }}
        strokeWidth="0.6"
      />
      <circle cx="350" cy="350" r="150" fill="none"
        className="background-ripple background-ripple--3"
        style={{ stroke: 'var(--color-primary)', opacity: 0.03 }}
        strokeWidth="0.5"
      />

      {/* Second ripple set */}
      <circle cx="1100" cy="550" r="50" fill="none"
        className="background-ripple background-ripple--4"
        style={{ stroke: 'var(--color-secondary)', opacity: 0.045 }}
        strokeWidth="0.8"
      />
      <circle cx="1100" cy="550" r="90" fill="none"
        className="background-ripple background-ripple--5"
        style={{ stroke: 'var(--color-secondary)', opacity: 0.035 }}
        strokeWidth="0.6"
      />
      <circle cx="1100" cy="550" r="140" fill="none"
        className="background-ripple background-ripple--6"
        style={{ stroke: 'var(--color-secondary)', opacity: 0.025 }}
        strokeWidth="0.5"
      />

      {/* Smooth pebble shapes */}
      <ellipse cx="720" cy="750" rx="120" ry="30"
        className="background-wave background-wave--1"
        style={{ fill: 'var(--color-accent)', opacity: 0.035 }}
      />
      <ellipse cx="500" cy="800" rx="80" ry="20"
        className="background-wave background-wave--2"
        style={{ fill: 'var(--color-primary)', opacity: 0.03 }}
      />
      <ellipse cx="950" cy="820" rx="100" ry="25"
        className="background-wave background-wave--3"
        style={{ fill: 'var(--color-secondary)', opacity: 0.025 }}
      />

      {/* Raked sand lines */}
      <path
        className="background-drift background-drift--1"
        d="M200 850 Q500 830, 800 850 T1400 840"
        style={{ stroke: 'var(--color-text-muted)', opacity: 0.04 }}
        fill="none" strokeWidth="0.5" strokeLinecap="round"
      />
      <path
        className="background-drift background-drift--2"
        d="M100 870 Q450 855, 850 870 T1440 860"
        style={{ stroke: 'var(--color-text-muted)', opacity: 0.03 }}
        fill="none" strokeWidth="0.5" strokeLinecap="round"
      />

      {/* Floating leaf-like curves */}
      <path
        className="background-float background-float--1"
        d="M900 150 Q930 120, 960 150 Q930 180, 900 150 Z"
        style={{ fill: 'var(--color-accent)', opacity: 0.04 }}
      />
      <path
        className="background-float background-float--4"
        d="M200 250 Q220 225, 240 250 Q220 275, 200 250 Z"
        style={{ fill: 'var(--color-primary)', opacity: 0.035 }}
      />
    </svg>
  );
}

function AuroraBackground() {
  return (
    <svg
      className="background-svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wide aurora bands */}
      <path
        className="background-aurora background-aurora--1"
        d="M-100 200 C200 100, 500 300, 800 150 S1200 250, 1540 180 L1540 350 C1200 400, 800 300, 500 420 S200 280, -100 370 Z"
        style={{ fill: 'var(--color-primary)', opacity: 0.04 }}
      />
      <path
        className="background-aurora background-aurora--2"
        d="M-100 350 C300 280, 600 450, 900 320 S1300 400, 1540 340 L1540 480 C1300 530, 900 440, 600 560 S300 420, -100 490 Z"
        style={{ fill: 'var(--color-secondary)', opacity: 0.035 }}
      />
      <path
        className="background-aurora background-aurora--3"
        d="M-100 500 C250 440, 550 560, 850 480 S1250 540, 1540 500 L1540 600 C1250 650, 850 580, 550 660 S250 560, -100 620 Z"
        style={{ fill: 'var(--color-accent)', opacity: 0.03 }}
      />

      {/* Soft glow spots */}
      <circle cx="300" cy="250" r="150"
        className="background-float background-float--1"
        style={{ fill: 'var(--color-primary)', opacity: 0.025 }}
      />
      <circle cx="900" cy="350" r="180"
        className="background-float background-float--3"
        style={{ fill: 'var(--color-secondary)', opacity: 0.02 }}
      />
      <circle cx="1200" cy="200" r="120"
        className="background-float background-float--5"
        style={{ fill: 'var(--color-accent)', opacity: 0.025 }}
      />

      {/* Shimmer lines */}
      <path
        className="background-drift background-drift--1"
        d="M0 250 Q360 180, 720 270 T1440 220"
        style={{ stroke: 'var(--color-primary)', opacity: 0.05 }}
        fill="none" strokeWidth="1" strokeLinecap="round"
      />
      <path
        className="background-drift background-drift--2"
        d="M0 420 Q400 360, 800 440 T1440 400"
        style={{ stroke: 'var(--color-secondary)', opacity: 0.04 }}
        fill="none" strokeWidth="0.8" strokeLinecap="round"
      />
    </svg>
  );
}

const BACKGROUNDS = {
  waves: WavesBackground,
  geometric: GeometricBackground,
  zen: ZenBackground,
  aurora: AuroraBackground,
};

export const BACKGROUND_OPTIONS = [
  { id: 'waves', label: 'Waves' },
  { id: 'geometric', label: 'Geometric' },
  { id: 'zen', label: 'Zen Garden' },
  { id: 'aurora', label: 'Aurora' },
];

export const Background = memo(function Background() {
  const { settings } = useSettings();
  const bgId = settings.backgroundId || 'waves';
  const BgComponent = BACKGROUNDS[bgId] || WavesBackground;

  return (
    <div className="background-container" aria-hidden="true">
      <BgComponent />
    </div>
  );
});
