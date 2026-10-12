import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { format, resolveConfig } from 'prettier';

// These drawings contain only SVG geometry, gradients and procedural texture.
// Lettering also uses paths: no photographs or embedded fonts are required.
// Change the drawing or its labels here, then regenerate.
const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'public/desk/svg');
const formatting = await resolveConfig(join(root, 'package.json'));
await mkdir(output, { recursive: true });

const fonts = {
  sketch: {
    family: 'Desk Sketch',
    package: '@fontsource-variable/caveat',
    file: 'caveat-latin-wght-normal.woff2',
  },
  sans: {
    family: 'Desk Sans',
    package: '@fontsource-variable/dm-sans',
    file: 'dm-sans-latin-wght-normal.woff2',
  },
};
const vectorFonts = JSON.parse(
  await readFile(join(root, 'scripts/desk-vector-fonts.json'), 'utf8'),
);

const ink = '#153d68';
const blue = '#0097cc';
const escape = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

function lettering(value, x, y, size, options = {}) {
  const { color = ink, family = 'sketch', weight = 500, anchor = 'start' } = options;
  const variants = vectorFonts[family];
  const closestWeight = Object.keys(variants).reduce((closest, next) =>
    Math.abs(Number(next) - weight) < Math.abs(Number(closest) - weight) ? next : closest,
  );
  const font = variants[closestWeight];
  let advance = 0;
  const paths = [...value].map((character, index) => {
    const glyph = font.glyphs[character];
    if (!glyph) throw new Error(`Missing ${family} glyph: ${character}`);
    if (index) advance += font.kerning[value[index - 1] + character] ?? 0;
    const path = glyph.path ? `<path transform="translate(${advance} 0)" d="${glyph.path}"/>` : '';
    advance += glyph.advance;
    return path;
  });
  const scale = size / font.units;
  const start = x - (anchor === 'middle' ? (advance * scale) / 2 : 0);
  return `<g role="img" aria-label="${escape(value)}" transform="translate(${start} ${y}) scale(${scale} ${-scale})" fill="${color}">${paths.join('')}</g>`;
}

const assets = [];
async function save(name, width, height, title, description, definitions, content) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${name}-title ${name}-description">
  <title id="${name}-title">${escape(title)}</title>
  <desc id="${name}-description">${escape(description)}</desc>
  <defs>
    ${definitions}
  </defs>
  ${content}
</svg>
`;
  await writeFile(
    join(output, `${name}.svg`),
    await format(svg, { ...formatting, parser: 'html' }),
  );
  assets.push({ file: `${name}.svg`, width, height, title });
}

function shadow(id, opacity = 0.23, deviation = 7, dy = 9) {
  return `<filter id="${id}" x="-25%" y="-25%" width="160%" height="170%" color-interpolation-filters="sRGB"><feDropShadow dx="3" dy="${dy}" stdDeviation="${deviation}" flood-color="#30281d" flood-opacity="${opacity}"/></filter>`;
}

function texture(id, opacity = 0.09, seed = 7) {
  return `<filter id="${id}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" seed="${seed}" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="${opacity}"/></feComponentTransfer><feComposite in2="SourceGraphic" operator="in"/><feBlend in="SourceGraphic" mode="soft-light"/></filter>`;
}

const monogram = '<path d="M3 54V10h10l14 23 14-23h36v9H52v10h21v9H52v16H42V27L27 47 12 27v27Z"/>';
function mf(x, y, width = 80, color = '#111822') {
  return `<g transform="translate(${x} ${y}) scale(${width / 80})" fill="${color}">${monogram}</g>`;
}

const icons = {
  react: `<g fill="none" stroke="#00a0d2" stroke-width="2"><ellipse cx="24" cy="24" rx="22" ry="8"/><ellipse cx="24" cy="24" rx="22" ry="8" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="22" ry="8" transform="rotate(120 24 24)"/><circle cx="24" cy="24" r="3.8" fill="#00a0d2" stroke="none"/></g>`,
  javascript: `<rect x="3" y="3" width="42" height="42" rx="3" fill="#ecb32e"/><g fill="none" stroke="#fff" stroke-width="3.5" stroke-linejoin="round"><path d="M23 18v14c0 6-9 6-9 1M38 21c-2-5-12-4-12 2 0 6 12 3 12 10 0 6-11 7-13 1"/></g>`,
  nodejs: `<path d="m24 3 18 10v22L24 45 6 35V13Z" fill="none" stroke="#4c8437" stroke-width="2.8"/><g fill="none" stroke="#4c8437" stroke-width="2.6" stroke-linejoin="round"><path d="M21 15v13c0 6-8 6-8 1M35 18c-2-4-10-3-10 2 0 5 11 3 11 9 0 6-10 6-12 1"/></g>`,
  java: `<g fill="none" stroke="#1675b0" stroke-width="2" stroke-linecap="round"><path d="M11 24c0 14 25 14 25 0M35 25c11-5 10 9 1 8M8 38c4 5 29 5 34-1M15 44h21M11 21c3 2 21 3 25 0"/></g><g fill="none" stroke="#ef6f25" stroke-width="2.5" stroke-linecap="round"><path d="M21 19C6 9 33 10 23 2M29 20C17 13 35 13 33 5"/></g>`,
  python: `<path d="M24 3c-11 0-12 3-12 10v6h13v3H8c-8 0-8 19 0 19h6v-8c0-6 5-10 11-10h10V13c0-7-1-10-11-10Z" fill="#2b86bd"/><path d="M24 45c11 0 12-3 12-10v-6H23v-3h17c8 0 8-19 0-19h-6v8c0 6-5 10-11 10H13v10c0 7 1 10 11 10Z" fill="#f2c03a"/><circle cx="18" cy="9" r="2" fill="#fff"/><circle cx="30" cy="39" r="2" fill="#fff"/>`,
  sql: `<g fill="none" stroke="#153d68" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="24" cy="10" rx="18" ry="7"/><path d="M6 10v28c0 9 36 9 36 0V10M6 24c0 9 36 9 36 0"/></g>`,
  contacto: `<path d="M43 23a19 19 0 0 1-19 19 19.5 19.5 0 0 1-9-2L4 44l4-11A19 19 0 1 1 43 23Z" fill="none" stroke="#171a3b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
};
function icon(name, x, y, size = 36) {
  return `<g transform="translate(${x} ${y}) scale(${size / 48})">${icons[name]}</g>`;
}

await save(
  'logo-mf',
  80,
  64,
  'Monograma MF',
  'Iniciales de Martín Fierro, dibujadas con un trazado vectorial.',
  '',
  mf(0, 0),
);
for (const [name, drawing] of Object.entries(icons)) {
  await save(
    `icono-${name}`,
    48,
    48,
    `Icono ${name}`,
    'Icono vectorial independiente con fondo transparente.',
    '',
    drawing,
  );
}

// Laptop: the lid and base share their canvas and can animate independently.
const lidOutline =
  'M70 25H685Q706 25 710 47L746 396Q750 422 723 426H38Q10 421 17 397L45 48Q48 25 70 25Z';
const laptopDefinitions = `
  <linearGradient id="laptop-metal" x1="0" y1="0" x2="0.9" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="#a6abb3"/><stop offset="0.22" stop-color="#818792"/><stop offset="0.54" stop-color="#717884"/><stop offset="1" stop-color="#505865"/></linearGradient>
  <radialGradient id="laptop-light" cx="0.13" cy="0.05" r="0.9"><stop stop-color="#fff" stop-opacity="0.44"/><stop offset="0.55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#172232" stop-opacity="0.15"/></radialGradient>
  <linearGradient id="laptop-edge" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#b5bbc3"/><stop offset="0.25" stop-color="#4b5059"/><stop offset="0.7" stop-color="#242830"/><stop offset="1" stop-color="#0d1016"/></linearGradient>
  ${texture('laptop-grain', 0.07)}
  ${shadow('laptop-shadow', 0.28, 8, 10)}
`;
const laptopLid = `
  <g id="lid-metal">
    <path d="${lidOutline}" fill="url(#laptop-metal)" filter="url(#laptop-grain)"/>
    <path d="${lidOutline}" fill="url(#laptop-light)"/>
    <path d="${lidOutline}" fill="none" stroke="#e6e8ec" stroke-opacity="0.7" stroke-width="1.5"/>
    <path d="M21 409Q22 425 43 426H720Q742 425 746 409" fill="none" stroke="#161d28" stroke-opacity="0.35" stroke-width="2"/>
  </g>
  <g id="lid-monogram">${mf(330, 188, 104, '#20232a')}</g>
`;
const laptopEdge = `<path d="M17 396v13q0 26 30 28h664q35-1 35-24v-16q-1 26-29 30H43q-25-1-26-31Z" fill="url(#laptop-edge)"/><path d="M304 431h153l-8 5H313Z" fill="#808791" stroke="#20242d" stroke-width="0.7"/><path d="M44 436h244m184 0h240" stroke="#555d68" stroke-width="1"/>`;
await save(
  'portatil',
  760,
  470,
  'Portátil cerrado con monograma MF',
  'Portátil de aluminio gris en perspectiva cenital, con tapa, canto y sombra vectoriales. No contiene fotografías.',
  laptopDefinitions,
  `<g filter="url(#laptop-shadow)">${laptopEdge}${laptopLid}</g>`,
);
await save(
  'portatil-tapa',
  760,
  470,
  'Tapa del portátil',
  'Tapa independiente, sin sombra exterior, para animar su apertura. El eje de bisagra está en la parte superior.',
  laptopDefinitions,
  laptopLid,
);

const keyboardRows = [
  ['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete'],
  ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
  ['caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'return'],
  ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'shift', 'up'],
];
const key = (label, x, y, width, height = 27) =>
  `<g><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="3" fill="url(#key-fill)" stroke="#8a8e96" stroke-opacity="0.5" stroke-width="0.7"/>${lettering(label, x + width / 2, y + height / 2 + 3, label.length > 3 ? 6 : 8, { family: 'sans', color: '#d2d6de', anchor: 'middle' })}</g>`;
const keyboard = keyboardRows
  .map((row, rowIndex) =>
    row
      .map((label, colIndex) =>
        key(label, 95 + colIndex * 44, 67 + rowIndex * 33, 38, rowIndex ? 27 : 19),
      )
      .join(''),
  )
  .join('');
const bottomRow = [
  ['fn', 95, 38],
  ['control', 139, 38],
  ['option', 183, 38],
  ['cmd', 227, 44],
  ['', 277, 206],
  ['cmd', 489, 44],
  ['option', 539, 38],
  ['left', 583, 38],
  ['right', 627, 38],
];
await save(
  'portatil-base',
  760,
  470,
  'Base y teclado del portátil',
  'Teclado y trackpad vectoriales. Comparte tamaño con la tapa para usarlos como capas en la animación.',
  `${laptopDefinitions}<linearGradient id="key-fill" x2="0" y2="1"><stop stop-color="#22262d"/><stop offset="1" stop-color="#080b10"/></linearGradient><pattern id="speaker-holes" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="0.6" fill="#272e39" opacity="0.5"/></pattern>`,
  `<g filter="url(#laptop-shadow)">${laptopEdge}<path d="${lidOutline}" fill="url(#laptop-metal)" stroke="#c1c6cf" stroke-width="1.3"/><path d="${lidOutline}" fill="url(#laptop-light)"/><rect x="106" y="32" width="548" height="16" rx="7" fill="#1a202a"/><rect x="82" y="55" width="598" height="213" rx="10" fill="#313742"/>${keyboard}${bottomRow.map(([label, x, width]) => key(label, x, 232, width)).join('')}<rect x="56" y="68" width="15" height="180" rx="4" fill="url(#speaker-holes)"/><rect x="690" y="68" width="15" height="180" rx="4" fill="url(#speaker-holes)"/><rect x="258" y="286" width="242" height="118" rx="7" fill="#7c8390" fill-opacity="0.38" stroke="#4d5665" stroke-width="1.2"/><path d="M262 288h234" stroke="#c1c5cd" stroke-opacity="0.5"/></g>`,
);

await save(
  'portatil-pantalla',
  760,
  470,
  'Cara interior de la tapa',
  'Marco oscuro con pantalla clara. Capa vectorial para el reverso de la tapa durante la apertura.',
  `<linearGradient id="screen-paper" x2="1" y2="1"><stop stop-color="#fffdf9"/><stop offset="1" stop-color="#f2f0ea"/></linearGradient><linearGradient id="screen-frame" x2="1" y2="1"><stop stop-color="#343a46"/><stop offset="1" stop-color="#101722"/></linearGradient>`,
  `<path d="${lidOutline}" fill="url(#screen-frame)"/><path d="M76 56H674l32 334H48Z" fill="url(#screen-paper)"/><circle cx="378" cy="41" r="3" fill="#050c15"/><circle cx="378" cy="41" r="1" fill="#506179"/>${mf(84, 77, 50)}${lettering('Proyectos.', 100, 190, 56, { family: 'sans', weight: 750, color: '#112332' })}<rect x="101" y="218" width="163" height="125" rx="9" fill="#dcebf0"/><rect x="290" y="218" width="163" height="125" rx="9" fill="#e8eee4"/><rect x="479" y="218" width="163" height="125" rx="9" fill="#eee4de"/><path d="M101 199h543" stroke="#b2cbd5" stroke-width="1.2"/>`,
);

// Notebook: both files share exactly the same drawing, with or without writing.
const notebookDefinitions = `
  <linearGradient id="notebook-cover" x2="1" y2="1"><stop stop-color="#234350"/><stop offset="0.6" stop-color="#152e39"/><stop offset="1" stop-color="#071b25"/></linearGradient>
  <linearGradient id="notebook-paper" x2="1" y2="1"><stop stop-color="#fffdf7"/><stop offset="0.45" stop-color="#faf8f1"/><stop offset="1" stop-color="#eae6dc"/></linearGradient>
  <linearGradient id="notebook-spine" x2="1" y2="0"><stop stop-color="#a89d85"/><stop offset="0.2" stop-color="#e2d6bf"/><stop offset="0.65" stop-color="#f2e9d9"/><stop offset="1" stop-color="#fffdf7"/></linearGradient>
  <linearGradient id="notebook-ring" x2="0.6" y2="1"><stop stop-color="#6f6858"/><stop offset="0.32" stop-color="#101312"/><stop offset="0.55" stop-color="#958973"/><stop offset="0.72" stop-color="#211f1b"/><stop offset="1" stop-color="#635a49"/></linearGradient>
  <pattern id="notebook-grid" x="80" y="40" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M12 0H0v12" fill="none" stroke="#c6ccd0" stroke-opacity="0.48" stroke-width="0.55"/></pattern>
  <clipPath id="notebook-page-clip"><rect x="86" y="33" width="365" height="522" rx="9"/></clipPath>
  ${texture('notebook-paper-grain', 0.035, 3)}
  ${shadow('notebook-shadow', 0.3, 6, 8)}
`;
const rings = Array.from({ length: 22 }, (_, index) => {
  const y = 52 + index * 23;
  return `<g><ellipse cx="94" cy="${y + 6}" rx="4.5" ry="6" fill="#766952"/><path d="M93 ${y + 10}C44 ${y + 15} 44 ${y - 12} 95 ${y - 7}" fill="none" stroke="#090d10" stroke-width="5.8" stroke-linecap="round"/><path d="M93 ${y + 9}C47 ${y + 14} 47 ${y - 11} 95 ${y - 7}" fill="none" stroke="url(#notebook-ring)" stroke-width="3.4" stroke-linecap="round"/><path d="M66 ${y - 6}q10-4 26-1" stroke="#c2bda8" stroke-width="0.8" fill="none" opacity="0.7"/></g>`;
}).join('');

const notebookPaper = `
  <rect x="78" y="29" width="383" height="539" rx="12" fill="url(#notebook-cover)"/>
  <rect x="85" y="42" width="372" height="520" rx="10" fill="#afa48c"/>
  <path d="M96 555h347M95 557h349M95 559h347" stroke="#eee9df" stroke-width="0.8"/>
  <rect x="86" y="33" width="365" height="522" rx="9" fill="url(#notebook-paper)" filter="url(#notebook-paper-grain)"/>
  <rect x="86" y="33" width="365" height="522" rx="9" fill="url(#notebook-grid)"/>
  <path d="M86 43q0-10 10-10h18v522H97q-11 0-11-10Z" fill="url(#notebook-spine)" opacity="0.65"/>
  <path d="M116 34v520" stroke="#b1b8b8" stroke-width="0.8" opacity="0.4"/>
  <rect x="86" y="33" width="365" height="522" rx="9" fill="none" stroke="#e5dfd2" stroke-width="0.8"/>
`;
const notebookWriting = `
  <g id="notebook-writing" clip-path="url(#notebook-page-clip)">
    ${lettering('Tecnologías', 128, 93, 41, { weight: 550 })}
    <path d="M129 102q104 2 242 0" stroke="${ink}" stroke-width="1.4" fill="none"/>
    <g id="frontend">
      ${lettering('Frontend', 127, 151, 33, { weight: 600 })}
      ${icon('react', 132, 170, 35)}
      ${lettering('React', 184, 199, 32, { color: '#008fbf' })}
      ${icon('javascript', 132, 224, 35)}
      ${lettering('JavaScript', 184, 253, 32, { color: '#a87303' })}
    </g>
    <g id="backend">
      ${lettering('Backend', 127, 302, 33, { weight: 600 })}
      ${icon('nodejs', 132, 318, 35)}
      ${lettering('Node.js', 184, 347, 32, { color: '#49743b' })}
      ${icon('java', 132, 371, 35)}
      ${lettering('Java', 178, 400, 30, { color: '#bd2427' })}
      ${icon('python', 274, 371, 35)}
      ${lettering('Python', 318, 400, 30, { color: '#126aa2' })}
    </g>
    <g id="database">
      ${lettering('Datos / SQL', 127, 462, 33, { weight: 600 })}
      ${icon('sql', 132, 483, 35)}
      ${lettering('SQL', 184, 512, 32, { color: '#123c75' })}
    </g>
  </g>
`;
for (const [name, writing] of [
  ['libreta', ''],
  ['libreta-tecnologias', notebookWriting],
]) {
  await save(
    name,
    520,
    620,
    writing ? 'Libreta con tecnologías' : 'Libreta sin anotaciones',
    writing
      ? 'Libreta cuadriculada con React y JavaScript en Frontend; Node.js, Java y Python en Backend; SQL en Datos. Papel, espiral, iconos y texto vectoriales.'
      : 'Libreta cuadriculada con espiral metálica, sin contenido, para escribir sobre ella en HTML.',
    notebookDefinitions,
    `<g transform="rotate(9 260 310)" filter="url(#notebook-shadow)">${notebookPaper}${writing}${rings}</g>`,
  );
}

const folderCover =
  'M62 111C137 109 239 112 326 110Q340 110 341 123L350 541Q351 557 333 560L73 565Q55 565 54 550L49 128Q49 112 62 111Z';
const folderDefinitions = `
  <linearGradient id="folder-blue" x1="0" y1="0" x2="1" y2="0.8"><stop stop-color="#428abd"/><stop offset="0.64" stop-color="#12689f"/><stop offset="1" stop-color="#074572"/></linearGradient>
  <linearGradient id="folder-back" x2="0.8" y2="1"><stop stop-color="#f1d3a5"/><stop offset="0.55" stop-color="#dab27d"/><stop offset="1" stop-color="#b98954"/></linearGradient>
  <linearGradient id="folder-paper" x1="0.1" y1="0" x2="0.85" y2="1"><stop stop-color="#f8dcb0"/><stop offset="0.34" stop-color="#efd0a0"/><stop offset="0.7" stop-color="#e8c393"/><stop offset="1" stop-color="#dbae7a"/></linearGradient>
  <radialGradient id="folder-glow" cx="0.1" cy="0.08" r="0.9"><stop stop-color="#fff9e8" stop-opacity="0.34"/><stop offset="0.65" stop-color="#fff9e8" stop-opacity="0"/><stop offset="1" stop-color="#95632c" stop-opacity="0.08"/></radialGradient>
  <linearGradient id="folder-edge" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f5d4a3"/><stop offset="0.24" stop-color="#8b602f"/><stop offset="0.48" stop-color="#bd8c55"/><stop offset="0.72" stop-color="#744c26"/><stop offset="1" stop-color="#d4a66e"/></linearGradient>
  <linearGradient id="folder-fold" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#f9deba"/><stop offset="0.24" stop-color="#e7be8c"/><stop offset="0.5" stop-color="#a47743"/><stop offset="0.7" stop-color="#e2b984"/><stop offset="1" stop-color="#f1d1a5"/></linearGradient>
  <linearGradient id="folder-window-shadow" x1="0.03" y1="0" x2="0.98" y2="0.62"><stop stop-color="#6d593e" stop-opacity="0"/><stop offset="0.21" stop-color="#6d593e" stop-opacity="0"/><stop offset="0.33" stop-color="#6d593e" stop-opacity="0.13"/><stop offset="0.43" stop-color="#6d593e" stop-opacity="0.03"/><stop offset="0.62" stop-color="#6d593e" stop-opacity="0"/><stop offset="0.74" stop-color="#6d593e" stop-opacity="0.14"/><stop offset="0.91" stop-color="#6d593e" stop-opacity="0"/></linearGradient>
  <linearGradient id="folder-clip" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#282b27"/><stop offset="0.17" stop-color="#dddace"/><stop offset="0.36" stop-color="#73766c"/><stop offset="0.57" stop-color="#f7f3df"/><stop offset="0.76" stop-color="#9a9a89"/><stop offset="1" stop-color="#30332f"/></linearGradient>
  <linearGradient id="folder-documents" x2="0.5" y2="1"><stop stop-color="#fffdf8"/><stop offset="1" stop-color="#e9dfcd"/></linearGradient>
  <clipPath id="folder-cover-clip"><path d="${folderCover}"/></clipPath>
  <filter id="folder-grain" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" seed="11" stitchTiles="stitch" result="fibres"/>
    <feColorMatrix in="fibres" type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.19"/></feComponentTransfer>
    <feComposite in2="SourceGraphic" operator="in"/>
    <feBlend in="SourceGraphic" mode="soft-light" result="fine-paper"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.048" numOctaves="2" seed="6" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.075"/></feComponentTransfer>
    <feComposite in2="SourceGraphic" operator="in"/>
    <feBlend in="fine-paper" mode="multiply"/>
  </filter>
  <filter id="folder-layer-shadow" x="-15%" y="-15%" width="140%" height="145%" color-interpolation-filters="sRGB"><feDropShadow dx="2" dy="4" stdDeviation="2.5" flood-color="#684323" flood-opacity="0.32"/></filter>
  <filter id="folder-clip-shadow" x="-70%" y="-20%" width="260%" height="155%" color-interpolation-filters="sRGB"><feDropShadow dx="2" dy="3" stdDeviation="1.4" flood-color="#2d2418" flood-opacity="0.5"/></filter>
  ${shadow('folder-shadow', 0.29, 7, 9)}
`;
const folderDrawing = `
  <g id="blue-backing">
    <path d="M98 63Q98 49 113 49H343Q359 49 359 65L375 535Q375 549 358 551L112 557Z" fill="url(#folder-blue)" stroke="#095180" stroke-width="1.2"/>
    <path d="M349 58 369 534Q369 546 357 548" fill="none" stroke="#75aed0" stroke-width="1.2" stroke-opacity="0.55"/>
  </g>
  <g id="folder-back" filter="url(#folder-layer-shadow)">
    <path d="M66 102V76Q66 62 80 62H172Q184 62 190 70L204 85H328Q343 85 344 101L361 538Q362 559 341 563L77 572Q58 572 58 552Z" fill="url(#folder-back)" stroke="#c49663" stroke-width="0.8"/>
    <path d="M68 102V77Q68 64 81 64H174Q183 64 189 72L204 88H329" fill="none" stroke="#fff1d5" stroke-width="1.3" opacity="0.7"/>
  </g>
  <g id="documents">
    <path d="M78 91 319 84 338 543 76 552Z" fill="#e4d5ba" stroke="#b9a586" stroke-width="0.7"/>
    <path d="M74 96 319 90 337 544 72 553Z" fill="#f4ecdd" stroke="#d2c2a4" stroke-width="0.6"/>
    <path d="M72 101 317 96 334 545 69 555Z" fill="url(#folder-documents)" stroke="#e3d8c5" stroke-width="0.5"/>
    <path d="m75 98 242-5M73 104l244-5" stroke="#fffdf8" stroke-width="1.3"/>
  </g>
  <path d="M70 115 327 109Q344 109 345 127L355 542Q356 561 334 565L76 572Q54 572 54 550Z" fill="url(#folder-edge)"/>
  <g id="kraft-front" filter="url(#folder-layer-shadow)">
    <path d="${folderCover}" fill="url(#folder-paper)" filter="url(#folder-grain)"/>
    <path d="${folderCover}" fill="url(#folder-glow)"/>
    <path d="${folderCover}" fill="url(#folder-window-shadow)"/>
    <path d="M62 111C137 109 239 112 326 110Q340 110 341 123L350 541" fill="none" stroke="#fff0d3" stroke-width="1.3" opacity="0.85"/>
    <path d="M62 113C135 111 239 114 325 112" fill="none" stroke="#c99b65" stroke-width="0.45" opacity="0.4"/>
    <path d="M54 135 59 538Q59 556 72 558" fill="none" stroke="#fce5c5" stroke-width="1.4" opacity="0.6"/>
    <path d="M73 565 331 560Q349 557 350 541" fill="none" stroke="#8d6031" stroke-width="1.4" opacity="0.65"/>
  </g>
  <g id="folded-bottom">
    <path d="M57 541Q55 555 68 559L334 556Q345 555 350 545L350 553Q342 565 325 568L72 576Q55 574 53 560Z" fill="url(#folder-edge)"/>
    <path d="M67 559q-11-2-9-15l3-416" fill="none" stroke="url(#folder-fold)" stroke-width="6"/>
    <path d="M65 562 331 558" fill="none" stroke="#4f361e" stroke-width="2.1" opacity="0.78"/>
    <path d="M73 568 325 563" fill="none" stroke="#f5dab1" stroke-width="1" opacity="0.9"/>
    <path d="M73 571 324 566" fill="none" stroke="#b78650" stroke-width="0.8"/>
  </g>
  <g id="paperclip" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#folder-clip-shadow)">
    <path d="M273 136V80c0-16 19-16 19 0v58c0 14-16 14-16 0V88c0-9 10-9 10 0v45" stroke="#393b33" stroke-width="4.3"/>
    <path d="M273 136V80c0-16 19-16 19 0v58c0 14-16 14-16 0V88c0-9 10-9 10 0v45" stroke="url(#folder-clip)" stroke-width="3"/>
    <path d="M273 132V80q0-11 9-12M277 89v43" stroke="#fffae7" stroke-width="0.65" opacity="0.9"/>
  </g>
`;
const folderWriting = `
  <g id="folder-writing" clip-path="url(#folder-cover-clip)">
    ${lettering('CV', 95, 302, 79, { family: 'sans', weight: 750, color: '#074d76' })}
    <path d="M96 324q60-2 121-1" fill="none" stroke="#074d76" stroke-width="1.5"/>
    ${lettering('Mi experiencia', 95, 382, 33, { weight: 550, color: '#074d76' })}
    ${lettering('y más sobre mí.', 95, 419, 33, { weight: 550, color: '#074d76' })}
  </g>
`;
for (const [name, writing] of [
  ['carpeta', ''],
  ['carpeta-cv', folderWriting],
]) {
  await save(
    name,
    470,
    620,
    writing ? 'Carpeta de CV' : 'Carpeta sin anotaciones',
    'Carpeta de papel kraft con documentos, respaldo azul y clip metálico. Todas las capas son vectoriales.',
    folderDefinitions,
    `<g transform="rotate(-12 235 310)" filter="url(#folder-shadow)">${folderDrawing}${writing}</g>`,
  );
}

const phoneDefinitions = `
  <linearGradient id="phone-metal" x2="1" y2="1"><stop stop-color="#aeb0ae"/><stop offset="0.2" stop-color="#4e555c"/><stop offset="0.5" stop-color="#12171d"/><stop offset="0.8" stop-color="#666b6d"/><stop offset="1" stop-color="#1b2028"/></linearGradient>
  <linearGradient id="phone-frame" x2="1" y2="1"><stop stop-color="#222830"/><stop offset="0.6" stop-color="#080c12"/><stop offset="1" stop-color="#181f26"/></linearGradient>
  <linearGradient id="phone-screen" x2="0.5" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#f4f6fa"/></linearGradient>
  <linearGradient id="phone-reflection" x2="1" y2="1"><stop stop-color="#fff" stop-opacity="0.15"/><stop offset="0.45" stop-color="#fff" stop-opacity="0"/></linearGradient>
  ${shadow('phone-shadow', 0.34, 5, 7)}
`;
const phoneDrawing = `
  <rect x="65" y="41" width="206" height="423" rx="30" fill="url(#phone-metal)"/>
  <rect x="69" y="43" width="200" height="415" rx="28" fill="url(#phone-frame)" stroke="#d5d7d5" stroke-width="0.7"/>
  <rect x="77" y="51" width="184" height="398" rx="22" fill="url(#phone-screen)"/>
  <path d="M112 51h112v7q0 13-13 13h-86q-13 0-13-13Z" fill="#10151c"/>
  <rect x="151" y="55" width="36" height="3" rx="1.5" fill="#3a434b"/>
  <circle cx="200" cy="58" r="3.5" fill="#090f1a"/><circle cx="200" cy="58" r="1.6" fill="#1d384e"/>
  <path d="M78 78v340q0 24 22 24" fill="none" stroke="#fff" stroke-opacity="0.4" stroke-width="1.2"/>
  <rect x="63" y="111" width="3" height="18" rx="1" fill="#5e6265"/><rect x="63" y="145" width="3" height="29" rx="1" fill="#53585f"/><rect x="63" y="183" width="3" height="29" rx="1" fill="#53585f"/><rect x="271" y="141" width="3" height="50" rx="1" fill="#4e545b"/>
  <rect x="137" y="433" width="64" height="3.5" rx="2" fill="#1c2131" opacity="0.7"/>
  <rect x="77" y="51" width="184" height="398" rx="22" fill="url(#phone-reflection)"/>
`;
const phoneWriting = `
  <g id="phone-writing">
    ${icon('contacto', 144, 194, 50)}
    ${lettering('Contacto', 169, 286, 27, { family: 'sans', weight: 750, anchor: 'middle', color: '#171a3b' })}
    ${lettering('Hablemos', 169, 320, 23, { anchor: 'middle', color: '#171a3b' })}
    <path d="M157 348h26m-7-7 7 7-7 7" fill="none" stroke="#171a3b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
`;
for (const [name, writing] of [
  ['telefono', ''],
  ['telefono-contacto', phoneWriting],
]) {
  await save(
    name,
    350,
    510,
    writing ? 'Teléfono de contacto' : 'Teléfono con pantalla vacía',
    'Teléfono negro con pantalla blanca, marco metálico y cámara. Fondo transparente y piezas vectoriales.',
    phoneDefinitions,
    `<g transform="rotate(-16 175 255)" filter="url(#phone-shadow)">${phoneDrawing}${writing}</g>`,
  );
}

await save(
  'flecha-proyectos',
  320,
  220,
  'Explora mis proyectos',
  'Anotación manuscrita azul con flecha curva para señalar el portátil.',
  '',
  `${lettering('Explora', 123, 48, 38, { color: blue })}${lettering('mis proyectos', 98, 91, 38, { color: blue })}<g fill="none" stroke="${blue}" stroke-linecap="round" stroke-linejoin="round"><path d="M281 109 121 122" stroke-width="1.6"/><path d="M122 78C70 96 49 133 32 183m-5-30 5 31 29-11" stroke-width="3.3"/><path d="m5 135 8 10m14-32 1 13m23-29-5 10" stroke-width="3"/></g>`,
);
await save(
  'saludo',
  305,
  90,
  'Hola, soy',
  'Saludo manuscrito con flecha, sobre fondo transparente.',
  '',
  `${lettering('Hola, soy', 12, 60, 49, { color: blue })}<path d="m201 44 82-15m-13-5 13 5-9 10" fill="none" stroke="${blue}" stroke-width="2.5" stroke-linecap="round"/>`,
);
await save(
  'descripcion',
  580,
  90,
  'Presentación breve',
  'Construyo aplicaciones web robustas y de utilidad, de la interfaz a la lógica.',
  '',
  `${lettering('Construyo aplicaciones web robustas', 290, 34, 28, { family: 'sans', color: '#3b434b', anchor: 'middle' })}${lettering('y de utilidad, de la interfaz a la lógica.', 290, 73, 28, { family: 'sans', color: '#3b434b', anchor: 'middle' })}`,
);
await save(
  'navegacion',
  920,
  80,
  'Cabecera de navegación',
  'Monograma MF y etiquetas Inicio, Proyectos, CV y Contacto. Este dibujo no sustituye los enlaces accesibles de la web.',
  '',
  `${mf(10, 6, 60, '#162238')}${lettering('Inicio', 422, 47, 23, { family: 'sans', color: blue, weight: 600 })}${lettering('Proyectos', 529, 47, 23, { family: 'sans', color: '#132c53' })}${lettering('CV', 687, 47, 23, { family: 'sans', color: '#132c53' })}${lettering('Contacto', 775, 47, 23, { family: 'sans', color: '#132c53' })}<path d="M423 59h54" stroke="${blue}" stroke-width="2"/>`,
);

await writeFile(join(output, 'manifest.json'), `${JSON.stringify(assets, null, 2)}\n`);
const licenses = await Promise.all(
  Object.values(fonts).map(
    async (font) =>
      `${font.package}\n\n${await readFile(join(root, 'node_modules', font.package, 'LICENSE'), 'utf8')}`,
  ),
);
await writeFile(join(output, 'FONT-LICENSES.txt'), licenses.join('\n\n---\n\n'));
const gallery = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Objetos SVG · Martín Fierro</title>
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; padding: 32px; font: 16px/1.5 system-ui, sans-serif; color: #172333; background: #f4f5f6; }
      main { max-width: 1200px; margin: auto; }
      h1 { margin: 0 0 8px; font-size: clamp(26px, 4vw, 40px); }
      .intro { max-width: 760px; margin-bottom: 28px; color: #4a5663; }
      .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(270px, 100%), 1fr)); gap: 20px; }
      article { overflow: hidden; border: 1px solid #d9dfe5; border-radius: 14px; background: #fff; }
      .art { display: grid; place-items: center; height: 300px; padding: 18px; background-color: #fff; background-image: linear-gradient(45deg, #f0f1f3 25%, transparent 25%), linear-gradient(-45deg, #f0f1f3 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f1f3 75%), linear-gradient(-45deg, transparent 75%, #f0f1f3 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0; }
      img { max-width: 100%; max-height: 100%; width: auto; height: auto; }
      article[data-icon] img { width: 80px; height: 80px; }
      .info { padding: 16px; }
      h2 { font-size: 17px; margin: 0 0 6px; }
      p { margin: 0 0 12px; }
      a { color: #065e89; text-underline-offset: 3px; }
      a:focus-visible { outline: 3px solid #086f9e; outline-offset: 5px; }
      .links { display: flex; gap: 20px; flex-wrap: wrap; }
    </style>
  </head>
  <body>
    <main>
      <h1>Objetos SVG del escritorio</h1>
      <p class="intro">Dibujos independientes con fondo transparente. No contienen fotografías ni recursos externos. La portada utiliza el portátil completo, la libreta con tecnologías, la carpeta de CV con texto y el teléfono con contacto. Aquí puedes revisar todas las variantes y piezas.</p>
      <section class="gallery" aria-label="Archivos SVG">
        ${assets.map((asset) => `<article ${asset.file.startsWith('icono-') || asset.file === 'logo-mf.svg' ? 'data-icon' : ''}><div class="art"><img src="${asset.file}" alt="${escape(asset.title)}" width="${asset.width}" height="${asset.height}" /></div><div class="info"><h2>${escape(asset.title)}</h2><p>${asset.file} · ${asset.width} × ${asset.height}</p><div class="links"><a href="${asset.file}">Abrir SVG</a><a href="${asset.file}" download>Descargar</a></div></div></article>`).join('\n')}
      </section>
    </main>
  </body>
</html>`;
await writeFile(
  join(output, 'index.html'),
  await format(gallery, { ...formatting, parser: 'html' }),
);
console.log(`Created ${assets.length} independent SVG drawings in public/desk/svg.`);
