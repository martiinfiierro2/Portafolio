import { useId } from 'react';

export default function Daylight() {
  const id = useId();
  const fadeId = `${id}-fade`;
  const maskId = `${id}-mask`;
  const blurId = `${id}-blur`;
  const ambientId = `${id}-ambient`;

  return (
    <svg
      className="daylight"
      viewBox="0 0 1672 941"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={fadeId} x1="0" y1="0" x2="1" y2="0.75">
          <stop offset="0" stopColor="white" />
          <stop offset="0.6" stopColor="#b0b0b0" />
          <stop offset="0.95" stopColor="black" />
        </linearGradient>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1672" height="941">
          <rect width="1672" height="941" fill={`url(#${fadeId})`} />
        </mask>
        <filter id={blurId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <linearGradient id={ambientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff0d8" stopOpacity="0.09" />
          <stop offset="0.45" stopColor="#fff0d8" stopOpacity="0" />
          <stop offset="1" stopColor="#53412f" stopOpacity="0.045" />
        </linearGradient>
      </defs>
      {/* Match the background's cover crop; one shadow crosses every surface. */}
      <g mask={`url(#${maskId})`}>
        <g filter={`url(#${blurId})`} fill="none" stroke="#413629" strokeOpacity="0.24">
          <path d="M -360 -200 L 510 1080" strokeWidth="33" />
          <path d="M -100 -200 L 770 1080" strokeWidth="25" />
          <path d="M 160 -200 L 1030 1080" strokeWidth="25" />
          <path d="M 420 -200 L 1290 1080" strokeWidth="23" />
        </g>
      </g>
      <rect width="1672" height="941" fill={`url(#${ambientId})`} />
    </svg>
  );
}
