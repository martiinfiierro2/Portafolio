import { lazy, Suspense } from 'react';
import UsbPortfolio from './app/App';

const FloppyPortfolio = lazy(() => import('./experiments/floppy/FloppyPortfolio'));

export default function App() {
  if (window.location.pathname.replace(/\/$/, '') === '/disquetes') {
    return <Suspense fallback={<p>Cargando propuesta de disquetes…</p>}><FloppyPortfolio /></Suspense>;
  }
  return <UsbPortfolio />;
}
