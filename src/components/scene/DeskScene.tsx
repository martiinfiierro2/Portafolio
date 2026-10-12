import type { MouseEvent, RefObject } from 'react';
import type { PanelKind } from '../../types/portfolio';
import DeskNotebook from './DeskNotebook';
import DeskIntroduction from './DeskIntroduction';
import ClosedLaptop from './ClosedLaptop';
import DeskAccess from './DeskAccess';
import SiteHeader from '../navigation/SiteHeader';
interface Props {
  active: boolean;
  opening: boolean;
  activePanel: PanelKind | null;
  portalRef: RefObject<HTMLDivElement | null>;
  onExplore: (event: MouseEvent<HTMLElement>) => void;
  onPanel: (kind: PanelKind, event: MouseEvent<HTMLElement>) => void;
}
export default function DeskScene({
  active,
  opening,
  activePanel,
  portalRef,
  onExplore,
  onPanel,
}: Props) {
  return (
    <main
      id="escritorio"
      className={`desk-scene${opening ? ' is-opening' : ''}`}
      aria-labelledby="desk-title"
      inert={!active}
      aria-hidden={!active}
    >
      <div className="desk-stage">
        <div className="desk-workspace">
          <img
            className="desk-photograph"
            src="/desk/background.webp"
            alt=""
            aria-hidden="true"
            width="1672"
            height="941"
            decoding="async"
          />
          <SiteHeader
            current="desk"
            onHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onProjects={onExplore}
            onPanel={onPanel}
            busy={opening}
          />
          <DeskIntroduction />
          <DeskNotebook />
          <ClosedLaptop portalRef={portalRef} onExplore={onExplore} opening={opening} />
          {(['cv', 'contact'] as const).map((kind) => (
            <DeskAccess key={kind} kind={kind} selected={activePanel === kind} onOpen={onPanel} />
          ))}
        </div>
      </div>
    </main>
  );
}
