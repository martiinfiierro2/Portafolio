export default function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'instant'
    : 'smooth';
  if (id === 'proyectos') {
    const stage = section.querySelector('.deck-stage') ?? section;
    const bounds = stage.getBoundingClientRect();
    const headerHeight =
      document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
    const viewportCenter = headerHeight + (window.innerHeight - headerHeight) / 2;
    window.scrollTo({
      top: Math.max(0, window.scrollY + bounds.top + bounds.height / 2 - viewportCenter),
      behavior,
    });
    return;
  }
  section.scrollIntoView({ behavior });
}
