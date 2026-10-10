import { motion as Motion, useReducedMotion } from 'framer-motion';
import FloppyDisk from './FloppyDisk';

const insertedPosition = { y: -12, opacity: 1 };
const ejectedPosition = { y: 34, opacity: 0 };

export default function FloppyReader({
  disk,
  phase,
  onAnimationComplete,
}) {
  const reduced = useReducedMotion();
  const ejecting = phase === 'ejecting';

  const transition = reduced
  ? { duration: 0 }
  : {
      y: {
        duration: ejecting ? 0.4 : 0.55,
        ease: ejecting
          ? [0.4, 0, 1, 1]
          : [0.22, 1, 0.36, 1],
      },
      opacity: {
        duration: ejecting ? 0.15 : 0.12,
        delay: ejecting ? 0.25 : 0,
      },
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
            initial={
              phase === 'inserting' ? ejectedPosition : false
            }
            animate={
              ejecting ? ejectedPosition : insertedPosition
            }
            transition={transition}
            onAnimationComplete={() =>
              onAnimationComplete(disk.id, phase)
            }
          >
            <FloppyDisk disk={disk} compact />
          </Motion.div>
        )}
      </div>

      <div className="floppy-slot-lip" />
    </div>
  );
}