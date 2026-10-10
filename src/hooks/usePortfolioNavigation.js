import { useNavigate } from 'react-router-dom';
import scrollToSection from '../utils/scrollToSection';
export default function usePortfolioNavigation() {
  const navigate = useNavigate();
  return (path) => {
    navigate(path);
    const id = path.split('#')[1];
    requestAnimationFrame(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (id) scrollToSection(id);
      else if (path === '/') window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' });
    });
  };
}
