import { useState } from "react";
import Header from "./Header";
import Bio from "./Bio";
import Footer from "./Footer";
import Projects from "./components/Projects";
import About from "./components/About";

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className="site" data-theme={dark ? "dark" : "light"}>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header dark={dark} onToggleTheme={() => setDark(!dark)} />
      <main id="contenido">
        <Bio />
        <Projects />
        <About />
      </main>
      <Footer />
    </div>
  );
}
