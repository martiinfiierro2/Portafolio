const objects = {
  laptop: { src: '/desk/svg/portatil.svg', width: 760, height: 470 },
  notebook: { src: '/desk/svg/libreta-tecnologias.svg', width: 520, height: 620 },
  folder: { src: '/desk/svg/carpeta-cv.svg', width: 470, height: 620 },
  phone: { src: '/desk/svg/telefono-contacto.svg', width: 350, height: 510 },
} as const;

export default function DeskObjectArt({ kind }: { kind: keyof typeof objects }) {
  return (
    <img
      className="desk-object-art"
      {...objects[kind]}
      alt=""
      aria-hidden="true"
      decoding="async"
      draggable={false}
    />
  );
}
