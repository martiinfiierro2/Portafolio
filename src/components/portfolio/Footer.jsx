import { Triangle } from 'lucide-react';
import FloppyReader from './FloppyReader';

export default function Footer({ name, disk, phase, busy, onEject, onAnimationComplete }) {
  const status =
    phase === 'ejecting'
      ? 'Expulsando…'
      : phase === 'inserting'
        ? 'Leyendo disco…'
        : disk
          ? `Leyendo: ${disk.title}`
          : 'Unidad lista · sin disco';

  return (
    <footer className="floppy-console">
      <div className="floppy-console-credit">
        <span className="floppy-copyright">
          {name} © {new Date().getFullYear()}
        </span>
        <span className="floppy-signoff">Hecho con intención.</span>
      </div>
      <FloppyReader disk={disk} phase={phase} onAnimationComplete={onAnimationComplete} />
      <div className="floppy-console-status">
        <p className="floppy-reading" role="status">
          <span
            className={`reading-light${disk ? ' on' : ''}${busy ? ' working' : ''}`}
            aria-hidden="true"
          />
          {status}
        </p>
        <button className="floppy-eject" disabled={!disk || busy} onClick={onEject}>
          <Triangle size={13} aria-hidden="true" />
          Expulsar
        </button>
      </div>
    </footer>
  );
}
