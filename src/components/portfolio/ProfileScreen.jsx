import { FileText, ArrowUpRight, Sparkles } from 'lucide-react';
import { profile } from '../../data/profile';

export default function ProfileScreen() {
  return <div className="profile-screen">
    <div className="screen-art" aria-hidden="true"><span /><span /><span /></div>
    <div className="profile-content">
      <p className="eyebrow">Hola, soy</p>
      <h1>{profile.name}</h1>
      <p className="profile-role">{profile.role}</p>
      <p className="introduction">{profile.introduction}</p>
      <ul className="technology-list" aria-label="Tecnologías">{profile.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
      <div className="profile-actions">
        {profile.cvUrl ? <a className="button button-primary" href={profile.cvUrl}><FileText size={18} />Ver CV</a> : <button className="button button-primary" disabled aria-describedby="cv-note"><FileText size={18} />CV próximamente</button>}
        <a className="button button-secondary" href="#contacto">Contactar <ArrowUpRight size={18} /></a>
      </div>
      {!profile.cvUrl && <p className="availability-note" id="cv-note">El CV estará disponible aquí.</p>}
    </div>
    <div className="screen-hint"><Sparkles size={17} /><span>Explora las memorias del selector. La conexión estará disponible próximamente.</span></div>
  </div>;
}
