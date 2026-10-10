import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Layers2 } from 'lucide-react';
import { profile } from '../data/profile';
import useDocumentTitle from '../hooks/useDocumentTitle';
import ProjectWorkspace from '../components/project-deck/ProjectWorkspace';
export default function Home() {
  useDocumentTitle('Inicio');
  return (
    <div className="home-grid page-container">
      <section className="profile-block" aria-labelledby="home-title">
        <p className="eyebrow intro-greeting">¡Hola! Soy</p>
        <h1 id="home-title" tabIndex={-1}>
          {profile.name.split(' ')[0]}{' '}
          <span className="name-highlight">{profile.name.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="profile-role">{profile.role}</p>
        <p className="profile-description">{profile.introduction}</p>
        <div className="button-row">
          <Link className="button primary" to="/projects">
            Ver proyectos <ArrowRight size={17} />
          </Link>
          <Link className="button secondary" to="/cv">
            <FileText size={16} />
            Ver CV
          </Link>
        </div>
        <ul className="profile-notes">
          <li>
            <Layers2 size={15} />
            Frontend + Backend
          </li>
          <li>React · Node.js</li>
        </ul>
        <p className="profile-footnote">Cada proyecto, una pieza de mi evolución.</p>
      </section>
      <ProjectWorkspace />
    </div>
  );
}
