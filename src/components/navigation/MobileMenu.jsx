import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowUpRight } from 'lucide-react';
const links = [
  ['/', 'Inicio'],
  ['/#proyectos', 'Proyectos'],
  ['/#cv', 'CV'],
  ['/#contacto', 'Contacto'],
];
export default function MobileMenu({ open, onClose, profile, onNavigate }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const media = window.matchMedia('(min-width: 768px)');
    const resize = () => {
      if (media.matches) onClose();
    };
    media.addEventListener('change', resize);
    return () => {
      document.body.style.overflow = previous;
      media.removeEventListener('change', resize);
    };
  }, [open, onClose]);
  return (
    <dialog className="mobile-menu" ref={ref} onClose={onClose} aria-label="Menú principal">
      <div className="mobile-menu-heading">
        <Link to="/" className="wordmark" onClick={onClose}>
          MF<span>.</span>
        </Link>
        <button className="icon-button" onClick={onClose} aria-label="Cerrar menú">
          <X size={22} />
        </button>
      </div>
      <nav aria-label="Navegación móvil">
        {links.map(([to, label]) => (
          <Link
            key={to}
            to={to}
            onClick={(event) => {
              onClose();
              onNavigate(event, to);
            }}
          >
            {label}
            <ArrowUpRight size={20} />
          </Link>
        ))}
      </nav>
      <div className="mobile-menu-social">
        {profile.linkedinUrl && (
          <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={16} />
          </a>
        )}
        <a href={profile.githubUrl} target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight size={16} />
        </a>
      </div>
    </dialog>
  );
}
