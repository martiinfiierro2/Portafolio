const objects = [
  {
    kind: 'lamp',
    src: '/desk/lampara.png',
    alt: '',
    decorative: true,
    width: 1122,
    height: 1402,
  },
  {
    kind: 'notebook',
    src: '/desk/libreta-tecnologias.png',
    alt: 'Libreta de tecnologías: React, JavaScript, Node.js, Java y SQL.',
    width: 1024,
    height: 1536,
  },
  {
    kind: 'laptop',
    src: '/desk/portatil.png',
    alt: 'Portátil cerrado con las iniciales MF, donde se presentan los proyectos.',
    width: 1630,
    height: 965,
  },
  {
    kind: 'cv',
    src: '/desk/carpeta-cv.png',
    alt: 'Carpeta CV: mi experiencia y más sobre mí.',
    width: 1082,
    height: 1454,
  },
  {
    kind: 'contact',
    src: '/desk/telefono-contacto.png',
    alt: 'Teléfono con la pantalla de contacto: hablemos.',
    width: 1024,
    height: 1536,
  },
];

export default function SceneObjects() {
  return objects.map(({ kind, src, alt, decorative, width, height }) => (
    <img
      key={kind}
      className={`scene-object scene-object--${kind}`}
      src={src}
      alt={alt}
      aria-hidden={decorative || undefined}
      width={width}
      height={height}
      draggable={false}
    />
  ));
}
