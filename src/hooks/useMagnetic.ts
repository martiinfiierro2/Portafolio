import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { PointerEvent } from 'react';
export default function useMagnetic(strength = 3) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22 });
  const springY = useSpring(y, { stiffness: 260, damping: 22 });
  return {
    style: { x: springX, y: springY },
    onPointerMove(event: PointerEvent<HTMLElement>) {
      if (reduced || event.pointerType !== 'mouse') return;
      const box = event.currentTarget.getBoundingClientRect();
      x.set(((event.clientX - box.left) / box.width - 0.5) * strength * 2);
      y.set(((event.clientY - box.top) / box.height - 0.5) * strength * 2);
    },
    onPointerLeave() {
      x.set(0);
      y.set(0);
    },
  };
}
