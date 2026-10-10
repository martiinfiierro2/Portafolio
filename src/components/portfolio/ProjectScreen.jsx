import { ExternalLink, Code2, LogOut } from 'lucide-react';

export default function ProjectScreen({ project, onDisconnect, busy }) {
  return (
    <article className="project-screen" aria-labelledby="project-title">
      <div className="project-topline">
        <span className="example-label">Proyecto de muestra</span>
        <span className="connection-badge"><span />USB conectado</span>
      </div>
      <div className="project-body">
        <div className="project-layout">
          <div className="project-information">
            <p className="eyebrow">Explora el proyecto</p>
            <h1 id="project-title" tabIndex={-1}>{project.title}</h1>
            <p className="project-description">{project.description}</p>
            <ul className="technology-list" aria-label="Tecnologías de ejemplo">
              {project.technologies.map(item => <li key={item}>{item}</li>)}
            </ul>
            <div className="profile-actions">
              <button className="button button-secondary" disabled><ExternalLink size={17} />Demo pendiente</button>
              <button className="button button-secondary" disabled><Code2 size={17} />Código pendiente</button>
            </div>
          </div>
          <div className={`project-preview preview-${project.color}`} aria-hidden="true">
            <div className="preview-toolbar"><i /><i /><i /><span>{project.title}</span></div>
            <div className="preview-body">
              <div className="preview-sidebar"><span /><span /><span /></div>
              <div className="preview-content">
                <strong>{project.previewHeading}</strong>
                {project.previewItems.map(item => <div key={item} className="preview-row"><span />{item}<i /></div>)}
              </div>
            </div>
            <div className="preview-caption">Vista de ejemplo</div>
          </div>
        </div>
        <p className="example-note">Contenido provisional para probar la experiencia. No representa un proyecto publicado.</p>
      </div>
      <button className="disconnect-button" onClick={onDisconnect} disabled={busy}><LogOut size={17} />Desconectar y volver a mi perfil</button>
    </article>
  );
}
