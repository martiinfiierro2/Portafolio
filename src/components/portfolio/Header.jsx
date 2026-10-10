import { ArrowUpRight } from 'lucide-react';

export default function Header({ name, githubUrl, view, busy, onProfile, onProjects, onContact }) {
  return (
    <header className="floppy-header">
      <a
        href="#perfil"
        className="floppy-brand"
        aria-disabled={busy || undefined}
        onClick={(event) => {
          event.preventDefault();
          if (!busy) onProfile();
        }}
      >
        <span className="floppy-brand-mark" aria-hidden="true">
          MF
        </span>
        {name}
      </a>
      <nav aria-label="Navegación del portafolio">
        <button
          className={view === 'profile' ? 'active' : ''}
          aria-current={view === 'profile' ? 'page' : undefined}
          disabled={busy}
          onClick={onProfile}
        >
          Perfil
        </button>
        <button
          className={view !== 'profile' ? 'active' : ''}
          aria-current={view !== 'profile' ? 'page' : undefined}
          disabled={busy}
          onClick={onProjects}
        >
          Proyectos
        </button>
        <button onClick={onContact}>Contacto</button>
      </nav>
      <a className="floppy-header-link" href={githubUrl} target="_blank" rel="noreferrer">
        GitHub <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </header>
  );
}
