import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Contact({ embedded = false }) {
  useDocumentTitle(embedded ? 'Inicio' : 'Contacto');
  const Heading = embedded ? 'h2' : 'h1';
  return (
    <div className="contact-page narrow-container">
      <header className="page-heading">
        <p className="eyebrow">Sigamos la conversación</p>
        <Heading tabIndex={-1}>
          ¿Construimos <em>algo?</em>
        </Heading>
        <p>Estoy abierto a oportunidades junior, colaboraciones y proyectos.</p>
      </header>
      <div className="contact-links" aria-label="Enlaces de contacto">
        {profile.email && (
          <a className="contact-link" href={`mailto:${profile.email}`}>
            Email <ArrowUpRight size={21} aria-hidden="true" />
          </a>
        )}
        {profile.linkedinUrl && (
          <a className="contact-link" href={profile.linkedinUrl} target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={21} aria-hidden="true" />
          </a>
        )}
        <a className="contact-link" href={profile.githubUrl} target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight size={21} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
