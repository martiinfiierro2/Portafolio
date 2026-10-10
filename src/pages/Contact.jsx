import { useEffect, useRef, useState } from 'react';
import { Mail, Copy, Check, Code2, ArrowUpRight, Contact as ContactIcon } from 'lucide-react';
import { profile } from '../data/profile';
import useDocumentTitle from '../hooks/useDocumentTitle';
export default function Contact() {
  useDocumentTitle('Contacto');
  const [copyState, setCopyState] = useState('idle');
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState('copied');
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopyState('idle'), 2500);
    } catch {
      setCopyState('error');
    }
  }
  return (
    <div className="contact-page narrow-container">
      <header className="page-heading">
        <p className="eyebrow">Contacto</p>
        <h1 tabIndex={-1}>¿Construimos algo?</h1>
        <p>Estoy abierto a oportunidades junior, colaboraciones y proyectos.</p>
      </header>
      <div className="contact-options">
        <section>
          <span className="contact-icon">
            <Mail size={23} />
          </span>
          <div>
            <h2>Email</h2>
            {profile.email ? (
              <a className="text-link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            ) : (
              <p className="muted">Dirección pendiente de añadir.</p>
            )}
          </div>
          <button
            className="button secondary copy-button"
            onClick={copyEmail}
            disabled={!profile.email}
          >
            {copyState === 'copied' ? <Check size={15} /> : <Copy size={15} />}{' '}
            {copyState === 'copied' ? 'Copiado' : 'Copiar email'}
          </button>
        </section>
        <section>
          <span className="contact-icon">
            <ContactIcon size={23} />
          </span>
          <div>
            <h2>LinkedIn</h2>
            <p className="muted">Conectemos profesionalmente.</p>
          </div>
          {profile.linkedinUrl ? (
            <a className="text-link" href={profile.linkedinUrl} target="_blank" rel="noreferrer">
              Ver perfil <ArrowUpRight size={17} />
            </a>
          ) : (
            <span className="pending-label">Enlace pendiente</span>
          )}
        </section>
        <section>
          <span className="contact-icon">
            <Code2 size={23} />
          </span>
          <div>
            <h2>GitHub</h2>
            <p className="muted">Código, ideas y proyectos.</p>
          </div>
          <a className="text-link" href={profile.githubUrl} target="_blank" rel="noreferrer">
            Ver perfil <ArrowUpRight size={17} />
          </a>
        </section>
      </div>
      <p role="status" className="copy-status">
        {copyState === 'error'
          ? 'No se pudo copiar. Puedes seleccionar la dirección y copiarla manualmente.'
          : copyState === 'copied'
            ? 'Email copiado al portapapeles.'
            : ''}
      </p>
      <p className="contact-signoff">Las buenas ideas empiezan con una conversación.</p>
    </div>
  );
}
