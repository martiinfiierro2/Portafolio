import { m, useReducedMotion } from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';
import useMagnetic from '../../hooks/useMagnetic';

interface Props {
  children: ReactNode;
  className: string;
  label: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function ObjectButton({ children, className, label, onClick }: Props) {
  const magnetic = useMagnetic();
  const reduced = useReducedMotion();
  return (
    <m.button
      type="button"
      className={`scene-object ${className}`}
      aria-label={label}
      {...magnetic}
      whileHover={reduced ? undefined : { translateY: -5 }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      onClick={onClick}
    >
      {children}
    </m.button>
  );
}
