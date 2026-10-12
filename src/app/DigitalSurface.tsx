import type { ReactNode } from 'react';

export default function DigitalSurface({ children }: { children: ReactNode }) {
  return (
    <div className="digital-surface">
      <div className="digital-content">{children}</div>
    </div>
  );
}
