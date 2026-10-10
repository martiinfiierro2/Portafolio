import { ArrowUpRight, ArrowRight } from 'lucide-react';
import TechnologyList from '../../TechnologyList';

export default function ProfileView({ profile, onProjects, busy }) {
  return (
    <section className="floppy-profile" aria-labelledby="floppy-profile-title">
      <div className="floppy-intro">
        <p className="floppy-kicker">{profile.role}</p>
        <h1 id="floppy-profile-title" tabIndex={-1}>
          Hola, soy <em>{profile.name.split(' ')[0]}.</em>
        </h1>
        <p className="floppy-lead">Ideas que se convierten en aplicaciones.</p>
        <p className="floppy-description">{profile.introduction}</p>
        <div className="floppy-actions">
          <button className="floppy-button primary" onClick={onProjects} disabled={busy}>
            Ver proyectos <ArrowRight size={16} />
          </button>
          {profile.cvUrl ? (
            <a className="floppy-button" href={profile.cvUrl}>
              Ver CV <ArrowUpRight size={16} />
            </a>
          ) : (
            <button className="floppy-button" disabled>
              CV pendiente
            </button>
          )}
        </div>
        <TechnologyList technologies={profile.technologies} />
      </div>
      <p className="floppy-profile-note">Una colección de proyectos, disco a disco.</p>
    </section>
  );
}
