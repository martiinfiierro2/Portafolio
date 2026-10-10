import { motion as Motion, useReducedMotion } from 'framer-motion';
import FloppyDisk from './FloppyDisk';

const insertedPosition = { y: -12, opacity: 1 };
const ejectedPosition = { y: 16, opacity: 0 };

export default function FloppyReader({ disk, phase, onAnimationComplete }) {
  const reduced = useReducedMotion();
  return (
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
            onAnimationComplete={() => onAnimationComplete(disk.id, phase)}
          >
            <FloppyDisk disk={disk} compact />
          </Motion.div>
        )}
      </div>
      <div className="floppy-slot-lip" />
    </div>
  );
}
