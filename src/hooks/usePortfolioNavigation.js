import { useNavigate } from 'react-router-dom';
export default function usePortfolioNavigation() {
  const navigate = useNavigate();
  return (path) => {
    navigate(path);
    const id = path.split('#')[1];
    requestAnimationFrame(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (id === 'cv') {
        const details = document.querySelector('#cv details');
        if (details) details.open = true;
      }
      if (id)
        document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
      else if (path === '/') window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' });
    });
  };
}
