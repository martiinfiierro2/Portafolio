import { useId } from 'react';

const palettes = {
  mint: ['#ddfff1', '#9de4ca', '#6bbb9f'],
  lavender: ['#eae0ff', '#bca0ed', '#9475c9'],
  rose: ['#ffe2e9', '#efaabb', '#ca8494'],
  blue: ['#e4f2ff', '#a9ccef', '#7ba4cd'],
  sand: ['#fff2d9', '#e9cda1', '#bea476'],
};
const symbols = {
  shop: <><path d="M-12-11h4l4 18h15l4-13H-6" /><circle cx="-2" cy="13" r="2" /><circle cx="10" cy="13" r="2" /></>,
  tasks: <><rect x="-10" y="-13" width="20" height="26" rx="3" /><path d="M-5-6h2m4 0h5M-5 0h2m4 0h5M-5 6h2m4 0h5" /></>,
  game: <><path d="M-7-8h14c5 0 7 6 9 14 1 6-3 7-7 2L5 5H-5l-4 3c-4 5-8 4-7-2 2-8 4-14 9-14Z" /><path d="M-8-3v8m-4-4h8m12-2h.1m3 4h.1" /></>,
  notes: <><path d="M-9-13H4l6 6v20H-9Z M4-13v6h6M-4-2h9M-4 4h9M-4 9h6" /></>,
  chart: <><path d="M-12-13v26h25M-6 8V0M1 8V-7M8 8v-19" /></>,
};

export default function UsbDrive({ name, color = 'lavender', icon = 'tasks', selected = false }) {
  const id = useId();
  const [light, mid, dark] = palettes[color] || palettes.lavender;
  return <><svg className="usb-drive usb-drive-horizontal" viewBox="0 0 260 110" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`${id}-metal`} x2="0" y2="1"><stop stopColor="#fbfbfc" /><stop offset=".45" stopColor="#b8bac1" /><stop offset="1" stopColor="#ebedf0" /></linearGradient>
      <linearGradient id={`${id}-body`} x2="0" y2="1"><stop stopColor={light} /><stop offset=".65" stopColor={mid} /><stop offset="1" stopColor={dark} /></linearGradient>
    </defs>
    <rect x="12" y="31" width="52" height="49" rx="3" fill={`url(#${id}-metal)`} stroke="#92949e" />
    <path d="M15 34h46M15 77h46M39 34v43" stroke="#fff" strokeOpacity=".6" />
    <rect x="23" y="41" width="11" height="9" rx="1" fill="#3d4049" /><rect x="23" y="61" width="11" height="9" rx="1" fill="#3d4049" />
    <rect x="56" y="24" width="193" height="69" rx="12" fill={dark} />
    <rect x="53" y="19" width="193" height="69" rx="12" fill={`url(#${id}-body)`} stroke={dark} />
    <rect x="57" y="23" width="185" height="61" rx="9" fill="none" stroke="#fff" strokeOpacity=".5" />
    <path d="M66 25h162" stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
    <g transform="translate(87 53)" fill="none" stroke="#28273f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{symbols[icon] || symbols.tasks}</g>
    <text x="113" y="58" fontSize="14" fontWeight="600" fill="#28273f" fontFamily="inherit">{name}</text>
    <rect x="226" y="44" width="5" height="19" rx="2.5" fill={selected ? '#268363' : dark} />
    {selected && <rect x="226" y="44" width="5" height="7" rx="2.5" fill="#b7ffcd" />}
  </svg>
  <svg className="usb-drive usb-drive-vertical" viewBox="0 0 110 260" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`${id}-vertical-metal`}><stop stopColor="#fbfbfc" /><stop offset=".45" stopColor="#b8bac1" /><stop offset="1" stopColor="#ebedf0" /></linearGradient>
      <linearGradient id={`${id}-vertical-body`}><stop stopColor={light} /><stop offset=".65" stopColor={mid} /><stop offset="1" stopColor={dark} /></linearGradient>
    </defs>
    <rect x="31" y="12" width="49" height="52" rx="3" fill={`url(#${id}-vertical-metal)`} stroke="#92949e" />
    <path d="M34 15v46M77 15v46M34 39h43" stroke="#fff" strokeOpacity=".6" />
    <rect x="41" y="23" width="9" height="11" rx="1" fill="#3d4049" /><rect x="61" y="23" width="9" height="11" rx="1" fill="#3d4049" />
    <rect x="24" y="56" width="69" height="193" rx="12" fill={dark} />
    <rect x="19" y="53" width="69" height="193" rx="12" fill={`url(#${id}-vertical-body)`} stroke={dark} />
    <rect x="23" y="57" width="61" height="185" rx="9" fill="none" stroke="#fff" strokeOpacity=".5" />
    <path d="M25 66v162" stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
    <g transform="translate(54 133)" fill="none" stroke="#28273f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{symbols[icon] || symbols.tasks}</g>
    <text x="54" y="176" textAnchor="middle" textLength={name.length > 8 ? 57 : undefined} lengthAdjust="spacingAndGlyphs" fontSize="12" fontWeight="600" fill="#28273f" fontFamily="inherit">{name}</text>
    <rect x="70" y="72" width="5" height="19" rx="2.5" fill={selected ? '#268363' : dark} />
    {selected && <rect x="70" y="72" width="5" height="7" rx="2.5" fill="#b7ffcd" />}
  </svg></>;
}
