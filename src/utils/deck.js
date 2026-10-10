export function wrapIndex(index, count) {
  return count > 0 ? ((index % count) + count) % count : 0;
}
export function relativePosition(index, activeIndex, count) {
  const position = wrapIndex(index - activeIndex, count);
  return position > count / 2 ? position - count : position;
}
export function resolveProject(slug, projects) {
  return projects.find((project) => project.slug === slug) ?? projects[0] ?? null;
}
export function swipeDirection(dx, dy, threshold = 45) {
  return Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy) * 1.25 ? (dx < 0 ? 1 : -1) : 0;
}
