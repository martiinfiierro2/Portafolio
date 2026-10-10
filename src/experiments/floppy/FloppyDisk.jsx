import { useId } from 'react';
import { CalendarDays, Network, MousePointer2, UserRound } from 'lucide-react';

const colors = { rust: ['#be7050', '#a65538', '#733822'], navy: ['#497592', '#244961', '#162f43'], sage: ['#a3ad92', '#788568', '#536047'], ivory: ['#f2e8d4', '#dccfb5', '#b7a689'] };
const icons = { profile: UserRound, meals: CalendarDays, nodes: Network, portfolio: MousePointer2 };

export default function FloppyDisk({ disk, compact = false }) {
  const id = useId();
  const [light, base, dark] = colors[disk.color];
  const Icon = icons[disk.icon];
  if (compact) return <svg className="floppy-disk floppy-disk-compact" viewBox="0 0 240 70" aria-hidden="true" focusable="false">
    <defs><linearGradient id={`${id}-compact`} x2="0" y2="1"><stop stopColor={dark} /><stop offset=".65" stopColor={base} /><stop offset="1" stopColor={light} /></linearGradient></defs>
    <path d="M13 5h214l10 38-6 13H9L3 43Z" fill={`url(#${id}-compact)`} stroke={dark} />
    <path d="M25 8h189l6 27H19Z" fill={light} stroke={dark} />
    <path d="M49 8h116l3 24H46Z" fill="#bcb8ac" stroke="#85867c" strokeWidth=".7" />
    <path d="M13 43h218v10H13Z" fill={base} stroke={dark} />
    <path d="M10 43h220" stroke="#fff" strokeOpacity=".3" />
    <rect x="18" y="46" width="15" height="6" fill={dark} /><rect x="207" y="46" width="13" height="6" fill={dark} />
  </svg>;
  return <svg className={`floppy-disk${compact ? ' floppy-disk-compact' : ''}`} viewBox="0 0 220 240" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`${id}-shell`} x2=".8" y2="1"><stop stopColor={light} /><stop offset="1" stopColor={base} /></linearGradient>
      <linearGradient id={`${id}-shutter`} x2="1" y2=".7"><stop stopColor="#dad6ca" /><stop offset=".5" stopColor="#aaa99e" /><stop offset="1" stopColor="#ece6d9" /></linearGradient>
    </defs>
    <path d="M22 17h175l10 13v193H22Z" fill={dark} stroke={dark} strokeWidth="2" />
    <path d="M16 12h171l12 13v192H16Z" fill={`url(#${id}-shell)`} stroke={dark} strokeWidth="1.4" />
    <path d="M20 16h162m-162 0v196" fill="none" stroke="#fff" strokeOpacity=".3" />
    <path d="M26 14h144v81H26Z" fill={dark} opacity=".35" />
    <path d="M59 12h102v79H59Z" fill={`url(#${id}-shutter)`} stroke="#76786e" strokeWidth=".7" />
    <rect x="127" y="24" width="23" height="53" rx="1" fill={base} stroke={dark} />
    <path d="M63 16v70m3-70v70" stroke="#fff" strokeOpacity=".24" />
    <rect x="26" y="22" width="9" height="13" fill={dark} /><path d="M28 24h5v3h-5Z" fill="#cab89a" />
    <rect x="27" y="109" width="160" height="96" rx="3" fill="#f3e9d7" stroke="#b7a68a" strokeWidth=".8" />
    <path d="M33 112h148" stroke="#fff" strokeOpacity=".65" />
    <Icon x={89} y={126} size={32} strokeWidth={1.5} color={disk.color === 'rust' ? '#663e30' : '#234457'} />
    <text x="107" y="184" textAnchor="middle" fontSize={disk.title.length > 13 ? '11' : '13'} fill="#253340" fontFamily="Georgia, serif">{disk.number} / {disk.title}</text>
    <rect x="23" y="195" width="8" height="12" fill={dark} /><rect x="184" y="195" width="8" height="12" fill={dark} />
    <path d="M177 36v21l8-11Z" fill={dark} opacity=".55" />
  </svg>;
}
