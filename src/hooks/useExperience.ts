import { useCallback, useEffect, useState } from 'react';
import type { View } from '../types/portfolio';
import { parseView, viewHash } from '../utils/navigation';
export default function useExperience(slugs: string[]) {
  const [view, setView] = useState<View>(() => parseView(window.location.hash, slugs));
  const slugKey = slugs.join(',');
  useEffect(() => {
    const update = () => setView(parseView(window.location.hash, slugKey.split(',')));
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, [slugKey]);
  const navigate = useCallback((next: View) => {
    const hash = viewHash(next);
    if (window.location.hash !== hash) window.location.hash = hash;
    setView(next);
  }, []);
  return { view, navigate };
}
