import { ArrowUpRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { profile } from '../../data/profile';
import portrait from '../../img/martin.jpg';
import FloppyDisk from './FloppyDisk';
import TechnologyIcon from '../TechnologyIcon';

export function ProfileView({ load, busy }) {
  return (
    <section className="floppy-profile" aria-labelledby="floppy-profile-title">
      <div className="floppy-intro">
        <p className="floppy-kicker">Desarrollador full-stack junior</p>
        <h1 id="floppy-profile-title" tabIndex={-1}>Hola, soy <em>Martín.</em></h1>
        <p className="floppy-lead">Diseño y desarrollo aplicaciones web con personalidad.</p>
        <p className="floppy-description">{profile.introduction}</p>
        <div className="floppy-actions">
          <button className="floppy-button primary" onClick={() => load(null)} disabled={busy}>Ver proyectos <ArrowRight size={16} /></button>
          {profile.cvUrl ? <a className="floppy-button" href={profile.cvUrl}>Ver CV <ArrowUpRight size={16} /></a> : <button className="floppy-button" disabled>CV pendiente</button>}
        </div>
        <ul className="floppy-technologies" aria-label="Tecnologías">{profile.technologies.map(technology => <li key={technology}><TechnologyIcon name={technology} />{technology}</li>)}</ul>
      </div>
      <div className="floppy-collage">
        <span className="floppy-paper" aria-hidden="true" />
        <span className="floppy-color-paper" aria-hidden="true" />
        <span className="floppy-sun" aria-hidden="true" />
        <div className="floppy-photo"><img src={portrait} alt="Martín Fierro" width="1536" height="2048" decoding="async" /></div>
        <div className="floppy-monogram" aria-hidden="true">M<span>F</span></div>
        <p><span className="floppy-collage-label">De la interfaz a la lógica.</span>Frontend + Backend</p>
        <span className="floppy-portrait-signature" aria-hidden="true">Martín Fierro.</span>
      </div>
    </section>
  );
}

export function CollectionView({ disks, load, busy }) {
  return (
    <section className="floppy-collection" aria-labelledby="floppy-collection-title">
      <div className="floppy-collection-title">
        <p className="floppy-kicker">La colección <span className="floppy-collection-count">{String(disks.length).padStart(2, '0')} discos</span></p>
        <h1 id="floppy-collection-title" tabIndex={-1}>Un disco, una historia.</h1>
        <p>Elige mi perfil o descubre uno de mis proyectos.</p>
        <small>Proyectos de muestra · contenido en desarrollo.</small>
      </div>
      <div className="floppy-disk-grid">
        {disks.map((item, index) => (
          <button className={`floppy-choice choice-${item.color}`} key={item.id} disabled={busy} onClick={() => load(item)} style={{ '--disk-angle': `${[-5, -3, 3, -4][index % 4]}deg` }} aria-label={`Abrir ${item.title}`}>
            <span className="floppy-choice-meta"><span>{item.number}</span>{item.id === 'profile' ? 'Perfil' : 'Proyecto'}</span>
            <span className="floppy-choice-art"><FloppyDisk disk={item} /></span>
            <span className="floppy-choice-copy">
              <span className="floppy-choice-title">{item.title}<ArrowUpRight size={16} aria-hidden="true" /></span>
              <span className="floppy-choice-description">{item.subtitle}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function ProjectView({ disk, load, busy }) {
  return (
    <article className="floppy-project" aria-labelledby="floppy-project-title">
      <button className="floppy-back" disabled={busy} onClick={() => load(null)}><ArrowLeft size={15} />Volver a los discos</button>
      <div className="floppy-project-grid">
        <div className="floppy-project-intro">
          <p className="floppy-kicker"><span className="floppy-project-number">{disk.number}</span>Proyecto de muestra</p>
          <h1 id="floppy-project-title" tabIndex={-1}>{disk.title}</h1>
          <p className="floppy-lead">{disk.description}</p>
          <ul className="floppy-technologies" aria-label="Tecnologías de ejemplo">{disk.technologies.map(item => <li key={item}><TechnologyIcon name={item} />{item}</li>)}</ul>
          <div className="floppy-actions">
            <button className="floppy-button" disabled>Demo pendiente <ArrowUpRight size={16} /></button>
            <button className="floppy-button" disabled>Código pendiente <ArrowUpRight size={16} /></button>
          </div>
        </div>
        <div className="floppy-project-details">
          <section><h2>Qué hace</h2><ul>{disk.features.map((feature, index) => <li key={feature}><span className="floppy-feature-number" aria-hidden="true">0{index + 1}</span>{feature}</li>)}</ul></section>
          <section><h2>Mi aportación</h2><p>Aquí explicaré mi trabajo, las decisiones técnicas y los aprendizajes del proyecto.</p><small>Contenido provisional; no representa un proyecto publicado.</small></section>
        </div>
      </div>
    </article>
  );
}
