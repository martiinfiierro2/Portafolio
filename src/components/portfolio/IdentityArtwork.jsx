import { useId } from 'react';

export default function IdentityArtwork() {
  const id = useId();
  return (
    <svg className="identity-artwork" viewBox="0 0 340 360" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-face`} x2="1" y2="1"><stop stopColor="#e4d7ff" /><stop offset="1" stopColor="#a78adb" /></linearGradient>
        <linearGradient id={`${id}-edge`} x2="0" y2="1"><stop stopColor="#9979ca" /><stop offset="1" stopColor="#6947a4" /></linearGradient>
        <radialGradient id={`${id}-halo`}><stop stopColor="#dfd2ff" /><stop offset="1" stopColor="#efe8ff" stopOpacity="0" /></radialGradient>
        <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#b5a5d1" opacity=".35" /></pattern>
      </defs>
      <circle cx="174" cy="182" r="170" fill={`url(#${id}-halo)`} />
      <rect x="10" y="15" width="320" height="320" fill={`url(#${id}-grid)`} />
      <ellipse cx="180" cy="276" rx="102" ry="19" fill="#78609b" opacity=".09" />
      <path d="M75 118 239 81 286 220 122 259Z" fill={`url(#${id}-edge)`} stroke="#7753ac" strokeWidth="1.5" />
      <path d="M75 105 239 68 286 207 122 246Z" fill={`url(#${id}-face)`} stroke="#b9a0de" />
      <path d="m82 108 153-34 44 129" fill="none" stroke="#f8f3ff" strokeWidth="2" />
      <path d="m125 235 149-34" stroke="#7553a7" opacity=".3" />
      <g transform="matrix(1 -.23 .3 .9 106 135)">
        <text x="0" y="60" fill="#51327f" fontSize="67" fontWeight="700" letterSpacing="-7" fontFamily="inherit">mf.</text>
        <path d="M1 82h109" stroke="#76539e" opacity=".45" />
        <text x="0" y="99" fill="#51327f" fontSize="8" letterSpacing="2.7" fontFamily="inherit">FULL STACK</text>
      </g>
      <g transform="translate(28 228) rotate(-8)">
        <rect x="2" y="5" width="68" height="62" rx="16" fill="#5d419c" opacity=".15" />
        <rect width="68" height="62" rx="16" fill="#fff" stroke="#e4d9f3" />
        <path d="m26 21-10 10 10 10m16-20 10 10-10 10m-4-23-8 26" fill="none" stroke="#7651bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform="translate(251 41) rotate(8)">
        <rect x="2" y="5" width="60" height="60" rx="16" fill="#3b836f" opacity=".12" />
        <rect width="60" height="60" rx="16" fill="#e3f7ee" stroke="#c4e5d7" />
        <g fill="none" stroke="#488b73" strokeWidth="2"><ellipse cx="30" cy="20" rx="12" ry="5" /><path d="M18 20v18c0 7 24 7 24 0V20M18 29c0 7 24 7 24 0" /></g>
      </g>
      <path d="m262 269 5-8 5 8-5 8Z" fill="#9a7bc6" />
      <circle cx="65" cy="78" r="5" fill="#b9a3dc" />
      <path d="M307 139v12m-6-6h12" stroke="#c2b0dc" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
