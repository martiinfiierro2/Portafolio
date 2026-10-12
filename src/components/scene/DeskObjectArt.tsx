const dimensions = {
  laptop: { width: 1000, height: 625 },
  notebook: { width: 640, height: 853 },
  folder: { width: 640, height: 853 },
  phone: { width: 480, height: 720 },
} as const;

export default function DeskObjectArt({ kind }: { kind: keyof typeof dimensions }) {
  const artwork = (
    <img
      className="desk-object-art"
      src={`/desk/${kind}.webp`}
      {...dimensions[kind]}
      alt=""
      aria-hidden="true"
      decoding="async"
      draggable={false}
    />
  );
  return artwork;
}
