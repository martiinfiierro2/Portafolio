import { ArrowUpRight, Braces, Download, MessageCircle } from 'lucide-react';
import type { MouseEvent } from 'react';
import type { PanelKind } from '../../types/portfolio';

interface Props {
  kind: PanelKind;
  selected: boolean;
  onOpen: (kind: PanelKind, event: MouseEvent<HTMLElement>) => void;
}

const accesses = {
  contact: { label: 'Contacto', accessibleLabel: 'Abrir contacto', Icon: MessageCircle },
  cv: { label: 'CV', accessibleLabel: 'Abrir CV de Martín Fierro', Icon: Download },
  stack: { label: 'Stack', accessibleLabel: 'Abrir información del stack', Icon: Braces },
};

export default function DeskAccess({ kind, selected, onOpen }: Props) {
  const { label, accessibleLabel, Icon } = accesses[kind];

  return (
    <button
      type="button"
      className={`desk-access desk-access-${kind}${selected ? ' is-open' : ''}`}
      aria-label={accessibleLabel}
      onClick={(event) => onOpen(kind, event)}
    >
      <span className="desk-access-label">
        <Icon size={14} aria-hidden="true" />
        {label}
        <ArrowUpRight className="access-arrow" size={12} aria-hidden="true" />
      </span>
    </button>
  );
}
