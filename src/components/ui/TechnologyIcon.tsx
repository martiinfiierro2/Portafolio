import { Atom, Coffee, Database } from 'lucide-react';
import type { TechnologyId } from '../../types/portfolio';

const icons = { react: Atom, java: Coffee, sql: Database };

export default function TechnologyIcon({ id, size = 22 }: { id: TechnologyId; size?: number }) {
  if (id === 'javascript' || id === 'node') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
        focusable="false"
      >
        {id === 'javascript' ? (
          <rect x="4" y="3" width="24" height="26" rx="1" />
        ) : (
          <path d="m16 2 12 7v14l-12 7-12-7V9Z" />
        )}
        <text
          x="16"
          y="22"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontFamily="var(--sketch-font)"
          fontSize="18"
        >
          JS
        </text>
      </svg>
    );
  }
  if (id === 'python') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M15.5 3h-3c-3 0-5 1.5-5 4v3h9v2H6c-3 0-4 2-4 5s1.5 5 4 5h3v-4c0-2 1.5-3.5 3.5-3.5H20c2.5 0 4-1.5 4-4V7c0-2.5-2-4-5-4Z" />
        <path d="M16.5 29h3c3 0 5-1.5 5-4v-3h-9v-2H26c3 0 4-2 4-5s-1.5-5-4-5h-2v4c0 2-1.5 3.5-3.5 3.5H12c-2.5 0-4 1.5-4 4V25c0 2.5 2 4 5 4Z" />
        <circle cx="11" cy="7" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="21" cy="25" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  const Icon = icons[id];
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}
