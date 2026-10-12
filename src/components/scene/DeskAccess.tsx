import type { MouseEvent } from 'react';
import type { PanelKind } from '../../types/portfolio';
import DeskObjectArt from './DeskObjectArt';

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
      <DeskObjectArt kind={contact ? 'phone' : 'folder'} />
    </button>
  );
}
