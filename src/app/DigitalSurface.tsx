import { m, useIsPresent, usePresenceData, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { Rectangle } from '../types/portfolio';
import { screenTransform } from '../utils/navigation';

interface Props {
  origin: Rectangle | null;
  busy: boolean;
  onEntered: () => void;
  children: ReactNode;
}

export default function DigitalSurface({ origin, busy, onEntered, children }: Props) {
  const reduced = useReducedMotion();
  const present = useIsPresent();
  const presenceOrigin = usePresenceData() as Rectangle | null;
  const rectangle = present ? origin : (presenceOrigin ?? origin);
  const start = rectangle
    ? screenTransform(rectangle, { width: window.innerWidth, height: window.innerHeight })
    : { x: 0, y: 0, scaleX: 1, scaleY: 1 };
  return (
    <m.div
      className="digital-surface"
      style={{ transformOrigin: '0 0' }}
      initial={
        reduced || !origin
          ? { opacity: reduced ? 1 : 0 }
          : { ...start, opacity: 1, borderRadius: 10, boxShadow: '0 0 0 3px #626b70' }
      }
      animate={{
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        borderRadius: 0,
        boxShadow: '0 0 0 0px #626b70',
      }}
      exit={
        reduced
          ? { opacity: 0 }
          : {
              ...start,
              opacity: 0,
              borderRadius: 10,
              boxShadow: '0 0 0 3px #626b70',
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                opacity: { delay: 0.55, duration: 0.25 },
              },
            }
      }
      transition={{
        duration: reduced ? 0 : origin ? 0.85 : 0.2,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: reduced ? 0 : 0.25 },
      }}
      onAnimationComplete={() => {
        if (present) onEntered();
      }}
      inert={busy || !present}
    >
      <m.div
        className="digital-content"
        initial={{ opacity: reduced ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced || !origin ? 0 : 0.35, duration: reduced ? 0 : 0.3 }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
