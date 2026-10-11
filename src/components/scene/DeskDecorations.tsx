interface Props {
  subdued: boolean;
}

function WorkNotebook() {
  return (
    <svg className="desk-notebook" viewBox="0 0 210 260" fill="none">
      <rect x="14" y="11" width="180" height="238" rx="9" fill="#e5eeec" />
      <rect x="20" y="7" width="172" height="237" rx="7" fill="#fff" stroke="#bacac7" />
      <path d="M43 8V243" stroke="#d7e3df" />
      {[35, 64, 93, 122, 151, 180, 209].map((y) => (
        <path key={y} d={`M53 ${y}H177`} stroke="#e8eeec" />
      ))}
      {[31, 57, 83, 109, 135, 161, 187, 213].map((y) => (
        <path
          key={y}
          d={`M14 ${y}C3 ${y - 7} 3 ${y + 8} 23 ${y + 5}`}
          stroke="#78948d"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
      <g fill="#396b78" fontFamily="var(--font)">
        <text x="57" y="31" fontSize="10" fontWeight="600">
          NOTAS DE TRABAJO
        </text>
        <text x="57" y="57" fontSize="12">
          Una idea, paso a paso.
        </text>
        <text x="74" y="87" fontSize="11">
          Simplificar
        </text>
        <text x="74" y="116" fontSize="11">
          Construir
        </text>
        <text x="74" y="145" fontSize="11">
          Probar y mejorar
        </text>
      </g>
      <g stroke="#7b9a92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="56" y="77" width="10" height="10" rx="2" />
        <path d="M58 82L61 85L67 78" />
        <rect x="56" y="106" width="10" height="10" rx="2" />
        <rect x="56" y="135" width="10" height="10" rx="2" />
        <rect x="57" y="168" width="29" height="22" rx="3" />
        <path d="M89 179H112M108 175L112 179L108 183" />
        <rect x="117" y="168" width="46" height="22" rx="3" />
        <path d="M63 179L67 175M63 179L67 183M78 175L82 179L78 183M74 173L71 185" />
      </g>
      <text x="128" y="183" fontSize="10" fill="#396b78" fontFamily="var(--font)">
        API
      </text>
      <path d="M58 219Q110 210 161 216" stroke="#bd9982" strokeWidth="2" strokeLinecap="round" />
      <path d="M174 236V255L180 251L186 255V236" fill="#396b78" />
    </svg>
  );
}

function DeskLamp() {
  return (
    <svg className="desk-lamp" viewBox="0 0 180 240" fill="none">
      <ellipse cx="106" cy="221" rx="56" ry="9" fill="#e7eeeb" />
      <path d="M67 217Q106 201 145 217V222H67Z" fill="#dae5e1" stroke="#819b92" strokeWidth="2" />
      <path d="M105 211L145 130L81 53" stroke="#819b92" strokeWidth="6" strokeLinecap="round" />
      <path d="M115 211L156 131L88 51" stroke="#c5d5ce" strokeWidth="3" strokeLinecap="round" />
      <circle cx="149" cy="131" r="7" fill="#f9fcfa" stroke="#819b92" strokeWidth="2" />
      <circle cx="85" cy="54" r="5" fill="#f9fcfa" stroke="#819b92" strokeWidth="2" />
      <path d="M46 32Q64 18 82 34L103 68L37 78Z" fill="#e3ede7" stroke="#819b92" strokeWidth="2" />
      <path d="M38 78L103 68" stroke="#396b78" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M47 81L40 103M68 81L70 103M88 77L98 95"
        stroke="#e9d9b5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M102 222Q104 236 160 235" stroke="#b7c8c0" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CoffeeCup() {
  return (
    <svg className="desk-coffee" viewBox="0 0 150 150" fill="none">
      <ellipse cx="70" cy="87" rx="59" ry="43" fill="#edf1ed" />
      <ellipse cx="69" cy="80" rx="54" ry="40" fill="#fbfcf9" stroke="#cbd6ce" strokeWidth="1.5" />
      <path
        d="M109 64H121Q139 66 131 88Q125 100 107 95"
        fill="#fff"
        stroke="#9faeaa"
        strokeWidth="2"
      />
      <path d="M120 74Q131 76 120 87H110" stroke="#cbd6ce" strokeWidth="2" />
      <path d="M30 64L34 91Q69 118 105 91L109 64" fill="#fff" stroke="#9faeaa" strokeWidth="2" />
      <ellipse cx="69" cy="64" rx="39" ry="27" fill="#fff" stroke="#9faeaa" strokeWidth="2" />
      <ellipse cx="69" cy="64" rx="31" ry="20" fill="#bd9982" />
      <path
        d="M57 61Q69 51 83 61M51 69Q68 81 89 68"
        stroke="#e8ccb3"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M57 27Q50 18 58 10M77 24Q70 15 78 7"
        stroke="#d7dfda"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Pencils() {
  return (
    <svg className="desk-pencils" viewBox="0 0 220 100" fill="none">
      <g transform="rotate(-15 110 50)">
        <path d="M25 38H185V50H25Z" fill="#dce9e4" stroke="#8da99e" strokeWidth="1.5" />
        <path d="M39 38V50M25 44H183" stroke="#8da99e" strokeWidth="1.5" />
        <path d="M185 38L204 44L185 50Z" fill="#ede1cf" stroke="#b7a790" strokeWidth="1.5" />
        <path d="M199 42L204 44L199 46" fill="#536561" />
      </g>
      <g transform="rotate(8 110 50)">
        <path d="M26 68H173V79H26Z" fill="#f0e2d6" stroke="#b89e89" strokeWidth="1.5" />
        <path d="M39 68V79M40 73H173" stroke="#b89e89" strokeWidth="1.5" />
        <path d="M173 68L190 74L173 79Z" fill="#ede1cf" stroke="#b7a790" strokeWidth="1.5" />
        <path d="M186 72L190 74L186 76" fill="#536561" />
      </g>
    </svg>
  );
}

export default function DeskDecorations({ subdued }: Props) {
  return (
    <div className={`desk-decorations${subdued ? ' is-subdued' : ''}`} aria-hidden="true">
      <WorkNotebook />
      <DeskLamp />
      <CoffeeCup />
      <Pencils />
    </div>
  );
}
