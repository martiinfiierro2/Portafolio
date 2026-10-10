import FloppyDisk from '../FloppyDisk';

export default function CollectionView({ projects, onSelect, busy }) {
  return (
    <section className="floppy-collection" aria-labelledby="floppy-collection-title">
      <div className="floppy-collection-title">
        <p className="floppy-kicker">
          <span className="floppy-collection-count">
            {String(projects.length).padStart(2, '0')} discos
          </span>
        </p>
        <h1 id="floppy-collection-title" tabIndex={-1}>
          Un disco, un proyecto.
        </h1>
      </div>
      <div className="floppy-disk-grid">
        {projects.map((item, index) => (
          <button
            className="floppy-choice"
            key={item.id}
            disabled={busy}
            onClick={() => onSelect(item)}
            style={{ '--disk-angle': `${[-5, -3, 3, -4][index % 4]}deg` }}
            aria-label={`Abrir ${item.title}, proyecto de muestra. ${item.subtitle}. ${item.technologies.join(', ')}`}
          >
            <FloppyDisk disk={item} />
          </button>
        ))}
      </div>
    </section>
  );
}
