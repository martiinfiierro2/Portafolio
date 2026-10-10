import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { profile } from '../data/profile';
import useDocumentTitle from '../hooks/useDocumentTitle';
import usePortfolioNavigation from '../hooks/usePortfolioNavigation';
export default function Home() {
  useDocumentTitle('Inicio');
  const navigateTo = usePortfolioNavigation();
  return (
    <div className="home-page page-container" style={{ viewTransitionName: 'portfolio-scene' }}>
      <section className="home-intro" aria-labelledby="home-title">
        <p className="eyebrow intro-greeting">¡Hola! Soy</p>
        <h1 id="home-title" tabIndex={-1}>
          {profile.name.split(' ')[0]}{' '}
          <span className="name-highlight">{profile.name.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="profile-role">{profile.role}</p>
        <p className="home-tagline">{profile.tagline}</p>
        <Link
          className="collection-entry"
          to="/projects"
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            navigateTo('/projects');
          }}
        >
          <span className="collection-entry-line" aria-hidden="true" />
          <span>Explorar colección</span>
          <ArrowDown size={19} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
