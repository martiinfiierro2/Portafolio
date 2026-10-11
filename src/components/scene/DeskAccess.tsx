import { ArrowRight, MessageCircle } from 'lucide-react';
import type { MouseEvent } from 'react';
import type { PanelKind } from '../../types/portfolio';

interface Props {
  kind: PanelKind;
  selected: boolean;
  onOpen: (kind: PanelKind, event: MouseEvent<HTMLElement>) => void;
}

export default function DeskAccess({ kind, selected, onOpen }: Props) {
  const contact = kind === 'contact';
  return (
    <button
      type="button"
      className={`desk-access desk-access-${kind}${selected ? ' is-open' : ''}`}
      aria-label={contact ? 'Abrir contacto' : 'Abrir CV de Martín Fierro'}
      onClick={(event) => onOpen(kind, event)}
    >
      {contact ? (
        <span className="phone-screen-content">
          <MessageCircle aria-hidden="true" />
          <span className="phone-screen-title">Contacto</span>
          <span className="phone-screen-message">Hablemos</span>
          <ArrowRight className="phone-screen-arrow" aria-hidden="true" />
        </span>
      ) : (
        <span className="folder-cover-copy" aria-hidden="true">
          <span className="folder-cover-title">CV</span>
          <span className="folder-cover-note">
            Mi experiencia
            <br />y más sobre mí.
          </span>
        </span>
      )}
    </button>
  );
}
