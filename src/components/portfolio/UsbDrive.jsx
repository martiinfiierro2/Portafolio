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

// Una misma geometría para ambas orientaciones: profundidad hacia la cara inferior.
function MetalConnector({ gradientId, vertical = false }) {
  return <g transform={vertical ? 'matrix(0 1 1 0 0 0)' : undefined}>
    <path d="M15 36h52v46l-3 3H15Z" fill="#828792" stroke="#747985" strokeWidth=".8" />
    <path d="M12 80l3 5h49l-3-5Z" fill="#8a909b" />
    <path d="M64 34l3 5v43l-3-5Z" fill="#717783" />
    <rect x="12" y="31" width="52" height="49" rx="2" fill={`url(#${gradientId})`} stroke="#9499a3" />
    <path d="M14 33h48M14 33v45" fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="1.3" />
    <path d="M15 78h47M62 35v41" fill="none" stroke="#777e8a" strokeOpacity=".65" />
    <path d="M40 34v43" stroke="#747d8b" strokeOpacity=".25" />
    <path d="M41 34v43" stroke="#fff" strokeOpacity=".5" />
    {[41, 61].map(y => <g key={y}>
      <rect x="22" y={y - 1} width="13" height="11" rx="1.5" fill="#9299a5" />
      <rect x="23" y={y} width="11" height="9" rx="1" fill="#262b35" />
      <path d={`M24 ${y + 1}h9v2H24Z`} fill="#10141b" />
      <path d={`M23 ${y + 9}h11`} stroke="#f7f8fa" strokeWidth="1" />
    </g>)}
    <path d="M49 32h7v47h-7Z" fill="#fff" opacity=".16" />
    <path d="M53 32h8v48h-8Z" fill="#202530" opacity=".12" />
  </g>;
}

export default function UsbDrive({ name, color = 'lavender', icon = 'tasks', selected = false }) {
  const id = useId();
  const [light, mid, dark] = palettes[color] || palettes.lavender;
  return <><svg className="usb-drive usb-drive-horizontal" viewBox="0 0 260 110" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`${id}-metal`} x2="0" y2="1"><stop stopColor="#fbfbfc" /><stop offset=".25" stopColor="#e3e6ec" /><stop offset=".5" stopColor="#a5acb8" /><stop offset=".72" stopColor="#d9dde5" /><stop offset="1" stopColor="#ebedf0" /></linearGradient>
      <linearGradient id={`${id}-body`} x2="0" y2="1"><stop stopColor={light} /><stop offset=".65" stopColor={mid} /><stop offset="1" stopColor={dark} /></linearGradient>
    </defs>
    <MetalConnector gradientId={`${id}-metal`} />
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
      <linearGradient id={`${id}-vertical-metal`}><stop stopColor="#fbfbfc" /><stop offset=".25" stopColor="#e3e6ec" /><stop offset=".5" stopColor="#a5acb8" /><stop offset=".72" stopColor="#d9dde5" /><stop offset="1" stopColor="#ebedf0" /></linearGradient>
      <linearGradient id={`${id}-vertical-body`}><stop stopColor={light} /><stop offset=".65" stopColor={mid} /><stop offset="1" stopColor={dark} /></linearGradient>
    </defs>
    <MetalConnector gradientId={`${id}-vertical-metal`} vertical />
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
