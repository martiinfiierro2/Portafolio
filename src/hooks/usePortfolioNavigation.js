import { useLocation, useNavigate } from 'react-router-dom';
import { transition } from '../utils/viewTransition';

export default function usePortfolioNavigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (path) => {
    if (path === pathname) return;
    const kind = pathname === '/' && path === '/projects' ? 'collection' : 'page';
    transition(() => navigate(path), kind);
  };
}
