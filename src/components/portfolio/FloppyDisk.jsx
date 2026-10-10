import { useId } from 'react';
import { CalendarDays, Network, MousePointer2 } from 'lucide-react';

const colors = {
  navy: ['#497592', '#244961', '#162f43'],
  sage: ['#a3ad92', '#788568', '#536047'],
  ivory: ['#f2e8d4', '#dccfb5', '#b7a689'],
};

const icons = { meals: CalendarDays, nodes: Network, portfolio: MousePointer2 };

export default function FloppyDisk({ disk, compact = false }) {
  const id = useId();
  const [light, base, dark] = colors[disk.color];
  const Icon = icons[disk.icon];
  if (compact)
    return (
      <svg
        className="floppy-disk floppy-disk-compact"
        viewBox="0 0 240 70"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={`${id}-compact`} x2="0" y2="1">
            <stop stopColor={dark} />
            <stop offset=".65" stopColor={base} />
            <stop offset="1" stopColor={light} />
          </linearGradient>
        </defs>
        <path d="M13 5h214l10 38-6 13H9L3 43Z" fill={`url(#${id}-compact)`} stroke={dark} />
        <path d="M25 8h189l6 27H19Z" fill={light} stroke={dark} />
        <path d="M49 8h116l3 24H46Z" fill="#bcb8ac" stroke="#85867c" strokeWidth=".7" />
        <path d="M13 43h218v10H13Z" fill={base} stroke={dark} />
        <path d="M10 43h220" stroke="#fff" strokeOpacity=".3" />
        <rect x="18" y="46" width="15" height="6" fill={dark} />
        <rect x="207" y="46" width="13" height="6" fill={dark} />
        <path d="M47 35h146l3 19H44Z" fill="#f3e7d4" stroke="#c8b597" strokeWidth=".7" />
        <text
          x="120"
          y="49"
          textAnchor="middle"
          fontSize="11"
          fill="#253340"
          fontFamily="'Segoe UI', system-ui, sans-serif"
        >
          {disk.title}
        </text>
      </svg>
    );
  return (
    <span className="floppy-disk-object" aria-hidden="true">
      <svg className="floppy-disk" viewBox="0 0 220 240" focusable="false">
        <defs>
          <linearGradient id={`${id}-shell`} x2=".8" y2="1">
            <stop stopColor={light} />
            <stop offset="1" stopColor={base} />
          </linearGradient>
          <linearGradient id={`${id}-shutter`} x2="1" y2=".1">
            <stop stopColor="#c2c0b6" />
            <stop offset=".18" stopColor="#ebe8de" />
            <stop offset=".42" stopColor="#c9c7be" />
            <stop offset=".62" stopColor="#a8aaa3" />
            <stop offset=".85" stopColor="#dedcd1" />
            <stop offset="1" stopColor="#eee9dd" />
          </linearGradient>
          <linearGradient id={`${id}-paper`} x2="0" y2="1">
            <stop stopColor="#fcf4e5" />
            <stop offset="1" stopColor="#e9ddc7" />
          </linearGradient>
          <pattern id={`${id}-brushed`} width="3" height="3" patternUnits="userSpaceOnUse">
            <path d="M0 1h3" stroke="#444a47" strokeWidth=".25" opacity=".18" />
          </pattern>
          <pattern id={`${id}-grain`} width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="4" r=".35" fill="#897859" opacity=".3" />
            <circle cx="9" cy="10" r=".3" fill="#897859" opacity=".25" />
          </pattern>
        </defs>
        <path d="M22 17h175l10 13v193H22Z" fill={dark} stroke={dark} strokeWidth="2" />
        <path
          d="M16 12h171l12 13v192H16Z"
          fill={`url(#${id}-shell)`}
          stroke={dark}
          strokeWidth="1.4"
        />
        <path d="m199 25 8 5v193l-8-6Z" fill={dark} />
        <path d="m16 217 6 6h185l-8-6Z" fill={dark} />
        <path d="M20 16h162m-162 0v196" fill="none" stroke="#fff" strokeOpacity=".3" />
        <path d="M194 38v173H33" fill="none" stroke={dark} strokeOpacity=".5" />
        <path d="M26 14h144v81H26Z" fill={dark} opacity=".35" />
        <path
          d="M59 12h102v79H59Z"
          fill={`url(#${id}-shutter)`}
          stroke="#76786e"
          strokeWidth=".7"
        />
        <path d="M59 12h102v79H59Z" fill={`url(#${id}-brushed)`} />
        <path d="M61 14h98M61 14v75" stroke="#fff" strokeOpacity=".7" fill="none" />
        <path d="M60 89h99" stroke="#696f68" strokeOpacity=".45" />
        <rect x="127" y="24" width="23" height="53" rx="1" fill={base} stroke={dark} />
        <path d="M63 16v70m3-70v70" stroke="#fff" strokeOpacity=".24" />
        <rect x="26" y="22" width="9" height="13" fill={dark} />
        <path d="M28 24h5v3h-5Z" fill="#cab89a" />
        <rect x="27" y="110" width="160" height="96" rx="3" fill={dark} opacity=".3" />
        <rect
          x="27"
          y="109"
          width="160"
          height="96"
          rx="3"
          fill={`url(#${id}-paper)`}
          stroke="#b7a68a"
          strokeWidth=".8"
        />
        <rect x="27" y="109" width="160" height="96" rx="3" fill={`url(#${id}-grain)`} />
        <path d="M33 112h148" stroke="#fff" strokeOpacity=".65" />
        <rect x="23" y="195" width="8" height="12" fill={dark} />
        <rect x="184" y="195" width="8" height="12" fill={dark} />
        <path d="M177 36v21l8-11Z" fill={dark} opacity=".55" />
      </svg>
      <span className="floppy-disk-label">
        <span className="floppy-label-meta">
          <span>{disk.number} / MUESTRA</span>
          {Icon && <Icon strokeWidth={1.5} />}
        </span>
        <span className="floppy-label-title">{disk.title}</span>
        <span className="floppy-label-description">{disk.subtitle}</span>
        <span className="floppy-label-technologies">{disk.technologies.join(' · ')}</span>
      </span>
    </span>
  );
}
