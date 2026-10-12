import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { profile } from '../../data/profile';
export default function ContactForm() {
  const [status, setStatus] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile.email) return;
    const values = new FormData(event.currentTarget);
    const name = String(values.get('name') ?? '').trim();
    const email = String(values.get('email') ?? '').trim();
    const message = String(values.get('message') ?? '').trim();
    const subject = encodeURIComponent(`Portfolio · ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.assign(`mailto:${profile.email}?subject=${subject}&body=${body}`);
    setStatus('Se ha solicitado abrir tu aplicación de correo con el mensaje preparado.');
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <p>O prepara un mensaje directo.</p>
      <label htmlFor="contact-name">
        Nombre
        <input id="contact-name" name="name" autoComplete="name" maxLength={120} required />
      </label>
      <label htmlFor="contact-email">
        Email
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
        />
      </label>
      <label htmlFor="contact-message">
        Mensaje
        <textarea id="contact-message" name="message" rows={3} maxLength={4000} required />
      </label>
      <button className="button primary" type="submit" disabled={!profile.email}>
        Preparar email <ArrowRight size={17} aria-hidden="true" />
      </button>
      <p className="form-note" role="status">
        {status ||
          (profile.email
            ? 'Se abrirá tu aplicación de correo para enviar el mensaje.'
            : 'El envío estará disponible cuando se configure el email. Puedes contactar por GitHub.')}
      </p>
    </form>
  );
}
