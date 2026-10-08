import { ArrowUpRight } from 'lucide-react';
import { profile } from '../../data/profile';

export default function ContactSection() {
  return <section className="contact-section container" id="contacto" aria-labelledby="contact-heading"><div><p className="eyebrow">Contacto</p><h2 id="contact-heading">Sigamos en contacto.</h2><p>Por ahora puedes encontrarme en GitHub. Añadiré mis otros canales de contacto próximamente.</p></div><a className="button button-secondary" href={profile.githubUrl} target="_blank" rel="noreferrer">Mi perfil de GitHub <ArrowUpRight size={18} /></a></section>;
}
