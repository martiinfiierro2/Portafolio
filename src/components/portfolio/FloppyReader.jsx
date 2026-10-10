import { motion as Motion, useReducedMotion } from 'framer-motion';
import FloppyDisk from './FloppyDisk';

// Percentages keep the insertion depth proportional to the disk at every width.
const insertedPosition = { y: '-52%', opacity: 1 };
const ejectedPosition = { y: '-7%', opacity: 0 };

export default function FloppyReader({ disk, phase, onAnimationComplete }) {
  const reduced = useReducedMotion();
  const ejecting = phase === 'ejecting';
  const inserting = phase === 'inserting';
  const animate =
    reduced || (!inserting && !ejecting)
      ? ejecting
        ? ejectedPosition
        : insertedPosition
      : {
          y: ejecting
            ? [insertedPosition.y, ejectedPosition.y, ejectedPosition.y]
            : [ejectedPosition.y, ejectedPosition.y, insertedPosition.y],
          opacity: ejecting ? [1, 1, 0] : [0, 1, 1],
        };

  return (
    <div className="floppy-slot" aria-hidden="true">
      <div className="floppy-slot-housing" />
      <div className="floppy-slot-mouth" />
      <div className="floppy-slot-channel">
        {disk && (
          <Motion.div
            key={disk.id}
            className="floppy-loaded"
            initial={inserting ? ejectedPosition : false}
            animate={animate}
            transition={
              reduced
                ? { duration: 0 }
                : {
                    duration: ejecting ? 0.55 : 0.75,
                    times: ejecting ? [0, 0.78, 1] : [0, 0.18, 1],
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
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
