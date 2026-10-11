interface Props {
  subdued: boolean;
}

function WorkNotebook() {
  return (
    <div className="desk-notebook">
      <img
        src="/desk/notebook.webp"
        alt=""
        width="512"
        height="560"
        draggable={false}
        decoding="async"
      />
      <div className="notebook-annotations">
        <span className="notebook-heading">Notas de trabajo</span>
        <span>Una idea, paso a paso.</span>
        <span>✓ Simplificar</span>
        <span>□ Construir</span>
        <span>□ Probar y mejorar</span>
        <span className="notebook-diagram">interfaz → API → datos</span>
        <span className="notebook-note">Menos ruido. Más claridad.</span>
      </div>
    </div>
  );
}

const objects = [
  { name: 'lamp', className: 'desk-lamp', width: 420, height: 448 },
  { name: 'coffee', className: 'desk-coffee', width: 360, height: 329 },
  { name: 'pencils', className: 'desk-pencils', width: 600, height: 300 },
];

export default function DeskDecorations({ subdued }: Props) {
  return (
    <div className={`desk-decorations${subdued ? ' is-subdued' : ''}`} aria-hidden="true">
      <WorkNotebook />
      {objects.map((object) => (
        <img
          key={object.name}
          className={object.className}
          src={`/desk/${object.name}.webp`}
          alt=""
          width={object.width}
          height={object.height}
          draggable={false}
          decoding="async"
        />
      ))}
    </div>
  );
}
