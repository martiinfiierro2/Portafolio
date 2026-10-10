import './floppy.css';
import { Triangle } from 'lucide-react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import FloppyDisk from './FloppyDisk';

const insertedPosition = { y: -12, opacity: 0 };
const ejectedPosition = { y: 16, opacity: 0 };

export default function Footer({ disk, setPhase, showView, setContentDisk, phase, reduced, busy, pending, emptyViewRef }) {

    function completeAnimation() {
        if (phase === 'ejecting') {
        if (pending) {
            setDisk(pending);
            setPhase('inserting');
        } else {
            setDisk(null);
            showView(emptyViewRef.current);
            setPhase('idle');
        }
        } else if (phase === 'inserting') {
        setContentDisk(disk);
        showView('project');
        setPhase('idle');
        }
    }

    return(
        <footer className="floppy-console">
            <div className="floppy-console-credit">
                <span className="floppy-copyright">Martín Fierro © {new Date().getFullYear()}</span>
                <span className="floppy-signoff">Hecho con intención.</span>
            </div>
            <div className="floppy-slot" aria-hidden="true">
                <div className="floppy-slot-housing" />
                <div className="floppy-slot-mouth" />
                <div className="floppy-slot-channel">
                {disk && (
                    <Motion.div
                    key={disk.id}
                    className="floppy-loaded"
                    initial={phase === 'inserting' ? ejectedPosition : false}
                    animate={phase === 'ejecting' ? ejectedPosition : insertedPosition}
                    transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                    onAnimationComplete={completeAnimation}
                    >
                    <FloppyDisk disk={disk} compact />
                    </Motion.div>
                )}
                </div>
                <div className="floppy-slot-lip" />
            </div>
            <div className="floppy-console-status">
                <p className="floppy-reading" role="status">
                <span className={disk ? 'reading-light on' : 'reading-light'} />
                {phase === 'ejecting'
                    ? 'Expulsando…'
                    : phase === 'inserting'
                    ? 'Leyendo disco…'
                    : disk
                        ? `Leyendo: ${disk.title}`
                        : 'Unidad lista · sin disco'}
                </p>
                <button className="floppy-eject" disabled={!disk || busy} onClick={() => load(null)}>
                <Triangle size={13} />
                Expulsar
                </button>
            </div>
        </footer>
    );
}