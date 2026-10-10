import { FileText, ArrowUpRight, Sparkles, ArrowRight } from 'lucide-react';
import { profile } from '../../data/profile';
import IdentityArtwork from './IdentityArtwork';
import TechnologyIcon from '../TechnologyIcon';

export default function ProfileScreen() {
  return (
    <div className="profile-screen">
      <div className="profile-composition">
        <div className="profile-content">
          <p className="eyebrow">Hola, soy</p>
          <h1>{profile.name.split(' ')[0]} <span>{profile.name.split(' ').slice(1).join(' ')}</span></h1>
          <p className="profile-role">{profile.role}</p>
          <p className="introduction">{profile.introduction}</p>
          <ul className="technology-list" aria-label="Tecnologías">
            {profile.technologies.map(technology => <li key={technology}><TechnologyIcon name={technology} />{technology}</li>)}
          </ul>
          <div className="profile-actions">
            <a className="button button-primary" href="#proyectos">Ver proyectos <ArrowRight size={18} /></a>
            <a className="button button-secondary" href="#contacto">Contactar <ArrowUpRight size={18} /></a>
          </div>
          {profile.cvUrl ? (
            <a className="profile-cv-link" href={profile.cvUrl}><FileText size={15} />Ver CV</a>
          ) : (
            <p className="availability-note"><FileText size={14} />CV en preparación</p>
          )}
        </div>
        <div className="profile-art"><IdentityArtwork /></div>
      </div>
      <div className="screen-hint"><Sparkles size={17} /><span>Una memoria, un proyecto. Elige por dónde empezar.</span><ArrowUpRight size={16} /></div>
    </div>
  );
}
