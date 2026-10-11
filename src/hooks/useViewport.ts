import { useSyncExternalStore } from 'react';
function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}
function snapshot() {
  return `${window.innerWidth}:${window.innerHeight}`;
}
export default function useViewport() {
  const value = useSyncExternalStore(subscribe, snapshot);
  const [width, height] = value.split(':').map(Number);
  return { width, height };
}
