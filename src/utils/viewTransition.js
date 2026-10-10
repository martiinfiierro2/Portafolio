import { flushSync } from 'react-dom';

export function transition(update, kind = 'project') {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !document.startViewTransition) {
    update();
    return;
  }
  const root = document.documentElement;
  root.dataset.transition = kind;
  const animation = document.startViewTransition(() => flushSync(update));
  animation.ready.catch(() => {});
  const clear = () => {
    if (root.dataset.transition === kind) delete root.dataset.transition;
  };
  animation.finished.then(clear, clear);
}
