import { useLayoutEffect } from 'react';
export default function useScrollLock(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [locked]);
}
