import { Database } from 'lucide-react';
import type { TechnologyId } from '../../types/portfolio';
export default function TechnologyMark({ id }: { id: TechnologyId }) {
  if (id === 'sql')
    return <Database className="technology-mark" strokeWidth={1.8} aria-hidden="true" />;
  return (
    <svg className="technology-mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {id === 'react' && (
        <g fill="none" stroke="#00a0d2" strokeWidth="2">
          <ellipse cx="24" cy="24" rx="22" ry="8" />
          <ellipse cx="24" cy="24" rx="22" ry="8" transform="rotate(60 24 24)" />
          <ellipse cx="24" cy="24" rx="22" ry="8" transform="rotate(120 24 24)" />
          <circle cx="24" cy="24" r="3.8" fill="#00a0d2" stroke="none" />
        </g>
      )}
      {id === 'javascript' && (
        <>
          <rect x="3" y="3" width="42" height="42" rx="3" fill="#ecb32e" />
          <text
            x="26"
            y="34"
            fontSize="24"
            fontFamily="Arial,sans-serif"
            fontWeight="700"
            textAnchor="middle"
            fill="#fff"
          >
            JS
          </text>
        </>
      )}
      {id === 'node' && (
        <>
          <path d="m24 3 18 10v22L24 45 6 35V13Z" fill="none" stroke="#4c8437" strokeWidth="2.8" />
          <text
            x="24"
            y="31"
            fontSize="19"
            fontFamily="Arial,sans-serif"
            fontWeight="650"
            textAnchor="middle"
            fill="#4c8437"
          >
            JS
          </text>
        </>
      )}
      {id === 'java' && (
        <>
          <g fill="none" stroke="#1675b0" strokeWidth="2" strokeLinecap="round">
            <path d="M11 24c0 14 25 14 25 0M35 25c11-5 10 9 1 8M8 38c4 5 29 5 34-1M15 44h21M11 21c3 2 21 3 25 0" />
          </g>
          <g fill="none" stroke="#ef6f25" strokeWidth="2.5" strokeLinecap="round">
            <path d="M21 19C6 9 33 10 23 2M29 20C17 13 35 13 33 5" />
          </g>
        </>
      )}
      {id === 'python' && (
        <>
          <path
            d="M24 3c-11 0-12 3-12 10v6h13v3H8c-8 0-8 19 0 19h6v-8c0-6 5-10 11-10h10V13c0-7-1-10-11-10Z"
            fill="#2b86bd"
          />
          <path
            d="M24 45c11 0 12-3 12-10v-6H23v-3h17c8 0 8-19 0-19h-6v8c0 6-5 10-11 10H13v10c0 7 1 10 11 10Z"
            fill="#f2c03a"
          />
          <circle cx="18" cy="9" r="2" fill="white" />
          <circle cx="30" cy="39" r="2" fill="white" />
        </>
      )}
    </svg>
  );
}
