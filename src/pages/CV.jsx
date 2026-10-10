import { Download, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import useDocumentTitle from '../hooks/useDocumentTitle';
export default function CV() {
  useDocumentTitle('CV');
  return (
    <div className="cv-page narrow-container">
      <header className="page-heading">
        <p className="eyebrow">Currículum</p>
        <h1 tabIndex={-1}>{profile.name}</h1>
        <p className="cv-role">{profile.role}</p>
        {profile.cvUrl ? (
          <a className="button primary" href={profile.cvUrl} download>
            <Download size={16} />
            Descargar CV
          </a>
        ) : (
          <>
            <button className="button secondary" disabled>
              <Download size={16} />
              CV pendiente
            </button>
            <p className="data-note">El documento estará disponible cuando añada mi CV.</p>
          </>
        )}
      </header>
      <section className="cv-section">
        <h2>Experiencia</h2>
        {profile.experience.length ? (
          <ol className="timeline">
            {profile.experience.map((item) => (
              <li key={`${item.title}-${item.period}`}>
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <p>{item.organization}</p>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="placeholder-copy">
            Información pendiente de completar. Aquí añadiré mi experiencia real.
          </p>
        )}
      </section>
      <section className="cv-section">
        <h2>Formación</h2>
        {profile.education.length ? (
          <ol className="timeline">
            {profile.education.map((item) => (
              <li key={`${item.title}-${item.period}`}>
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <p>{item.organization}</p>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="placeholder-copy">
            Información pendiente de completar. Aquí añadiré mis estudios y fechas.
          </p>
        )}
      </section>
      <section className="cv-section">
        <h2>Tecnologías</h2>
        <div className="cv-skills">
          {profile.skills.map((group) => (
            <div key={group.category}>
              <h3>{group.category}</h3>
              {group.items.length ? (
                <p>{group.items.join(' · ')}</p>
              ) : (
                <p className="placeholder-copy">Por confirmar</p>
              )}
            </div>
          ))}
        </div>
      </section>
      <Link className="text-link" to="/projects">
        Ver cómo las aplico en proyectos <ArrowUpRight size={17} />
      </Link>
    </div>
  );
}
