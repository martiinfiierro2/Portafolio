import type { Rectangle, View } from '../types/portfolio.ts';
export function parseView(hash: string, slugs: readonly string[]): View {
  if (hash === '#proyectos') return { kind: 'projects' };
  if (hash.startsWith('#proyecto/')) {
    try {
      const slug = decodeURIComponent(hash.slice(10));
      return slugs.includes(slug) ? { kind: 'project', slug } : { kind: 'projects' };
    } catch {
      return { kind: 'projects' };
    }
  }
  return { kind: 'desk' };
}
export function viewHash(view: View): string {
  if (view.kind === 'project') return `#proyecto/${encodeURIComponent(view.slug)}`;
  return view.kind === 'projects' ? '#proyectos' : '#inicio';
}
export function readRectangle(element: HTMLElement): Rectangle {
  const { x, y, width, height } = element.getBoundingClientRect();
  return { x, y, width, height };
}
export function screenTransform(rectangle: Rectangle, viewport: { width: number; height: number }) {
  return {
    x: rectangle.x,
    y: rectangle.y,
    scaleX: rectangle.width / Math.max(1, viewport.width),
    scaleY: rectangle.height / Math.max(1, viewport.height),
  };
}
