import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectsSection from "../components/sections/ProjectsSection";
import AboutSection from "../components/sections/AboutSection";
import ContactSection from "../components/sections/ContactSection";
import CvPreview from "../components/CvPreview";

export default function Home({ dark }) {
  const [peeling, setPeeling] = useState(false);
  const timer = useRef(null);
  const navigate = useNavigate();
  useEffect(() => () => clearTimeout(timer.current), []);

  function explore(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (peeling) return;
    const instant = event.detail === 0 || matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      setPeeling(false);
      navigate("/#proyectos", { state: { scrollBehavior: instant ? "instant" : "smooth" } });
    };
    if (instant) return finish();
    setPeeling(true);
    timer.current = setTimeout(finish, 260);
  }

  return (
    <>
      <section className="hero wide" id="inicio" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title" tabIndex={-1}>Martín Fierro</h1>
          <p className="hero-role">Desarrollador full-stack</p>
          <p className="hero-intro">Diseño interfaces y conecto la lógica y los datos que las hacen funcionar.</p>
          <div className="hero-actions">
            <a className={`sticker${peeling ? " peeling" : ""}`} href="/#proyectos" onClick={explore}><span className="sticker-label">Mis proyectos</span></a>
            <CvPreview />
          </div>
        </div>
        <figure className="desk-scene"><img className="desk" src={dark ? "/illustrations/personal-desk-dark.svg" : "/illustrations/personal-desk.svg"} width={995} height={775} fetchPriority="high" alt="Mi escritorio: dos pantallas, torre de ordenador, café, libreta y silla azul" /></figure>
      </section>
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
