import { useEffect } from 'react';
import { profile } from '../data/profile';
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `${title} · ${profile.name}`;
  }, [title]);
}
