import { memo } from 'react';

export const Background = memo(function Background() {
  return (
    <div className="background-container" aria-hidden="true">
      <svg
        className="background-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft waves in lower region */}
        <path
          d="M0 700 C360 650, 720 750, 1080 680 S1440 720, 1440 700 L1440 900 L0 900 Z"
          style={{ fill: 'var(--color-primary)', opacity: 0.06 }}
        />
        <path
          d="M0 750 C300 710, 600 790, 900 730 S1200 770, 1440 740 L1440 900 L0 900 Z"
          style={{ fill: 'var(--color-secondary)', opacity: 0.05 }}
        />
        <path
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
          d="M-50 300 Q400 200, 700 350 T1500 250"
          style={{ stroke: 'var(--color-secondary)', opacity: 0.06 }}
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M-50 500 Q350 400, 750 500 T1500 450"
          style={{ stroke: 'var(--color-accent)', opacity: 0.05 }}
          fill="none"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
});
