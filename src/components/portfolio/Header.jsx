import { ArrowUpRight } from 'lucide-react';
import { profile } from '../../data/profile';
import './floppy.css';

export default function Header({ view, busy, load }) {
  return(
    <header className="floppy-header">
        <a
            href="#perfil"
            className="floppy-brand"
            onClick={(event) => {
              event.preventDefault();
              load(null, 'profile');
            }}
        >
        <span className="floppy-brand-mark" aria-hidden="true">
             MF
        </span>
        {profile.name}
        </a>
        <nav aria-label="Navegación de disquetes">
            <button
              className={view === 'profile' ? 'active' : ''}
              aria-current={view === 'profile' ? 'page' : undefined}
              disabled={busy}
              onClick={() => load(null, 'profile')}
            >
              Perfil
            </button>
            <button
              className={view !== 'profile' ? 'active' : ''}
              aria-current={view !== 'profile' ? 'page' : undefined}
              disabled={busy}
              onClick={() => load(null)}
            >
              Proyectos
            </button>
            <button>Contacto</button>
        </nav>
        <a
            className="floppy-header-link"
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
        >
            GitHub <ArrowUpRight size={14} aria-hidden="true" />
        </a>
    </header>
  )
}