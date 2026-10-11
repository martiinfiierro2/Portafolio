import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Mail, ContactRound, GitBranch, Copy, Check } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import { profile } from '../../data/profile';

export default function ContactPanel() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();
  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );
  async function copyEmail() {
    if (!profile.email) return;
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopyState('idle'), 2500);
  }
  const contacts = [
    {
      title: 'Email',
      value: profile.email ?? 'Por añadir',
      href: profile.email ? `mailto:${profile.email}` : null,
      Icon: Mail,
    },
    {
      title: 'LinkedIn',
      value: profile.linkedinUrl ? 'Conectemos' : 'Por añadir',
      href: profile.linkedinUrl,
      Icon: ContactRound,
    },
    { title: 'GitHub', value: 'Código e ideas', href: profile.githubUrl, Icon: GitBranch },
  ];
  return (
    <>
      <p className="panel-introduction">
        Una oportunidad, una idea o una conversación. Me encantará conocerla.
      </p>
      <ul className="contact-list">
        {contacts.map(({ title, value, href, Icon }) => (
          <li key={title}>
            {href ? (
              <a
                href={href}
                target={title === 'Email' ? undefined : '_blank'}
                rel={title === 'Email' ? undefined : 'noreferrer'}
              >
                <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                <span>
                  <strong>{title}</strong>
                  <small>{value}</small>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ) : (
              <div className="contact-pending">
                <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                <span>
                  <strong>{title}</strong>
                  <small>{value}</small>
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
      {profile.email && (
        <m.button
          className="copy-email"
          aria-label="Copiar email"
          onClick={() => void copyEmail()}
          whileTap={reduced ? undefined : { scale: 0.98 }}
        >
          {copyState === 'copied' ? (
            <Check size={17} aria-hidden="true" />
          ) : (
            <Copy size={17} aria-hidden="true" />
          )}
          <span role="status">
            {copyState === 'copied'
              ? 'Email copiado'
              : copyState === 'failed'
                ? 'No se pudo copiar; usa el enlace Email'
                : 'Copiar email'}
          </span>
        </m.button>
      )}
    </>
  );
}
