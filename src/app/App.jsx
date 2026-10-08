import Header from '../components/Header';
import PortfolioExperience from '../components/portfolio/PortfolioExperience';
import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';
import '../styles/tokens.css';
import '../styles/global.css';
import '../styles/portfolio.css';

export default function App() {
  return <><a className="skip-link" href="#inicio">Saltar al contenido</a><Header /><main><PortfolioExperience /><AboutSection /><ContactSection /></main><footer className="site-footer container"><span>© {new Date().getFullYear()} Martín Fierro</span><span>Diseñado para conectar ideas.</span></footer></>;
}
