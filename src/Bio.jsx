import { useRef } from "react";
import {
  motion as Motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Reveal from "./components/Reveal";
import ProductPreview from "./components/ProductPreview";

export default function Bio() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.75], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 24]);

  return (
    <section
      ref={sectionRef}
      className="hero"
      id="inicio"
      aria-labelledby="hero-title"
    >
      <Reveal className="hero-heading shell">
        <p className="hero-role">
          Ingeniería multimedia. Desarrollo full-stack.
        </p>
        <h1 id="hero-title">
          Ideas que
          <br />
          <span>cobran vida.</span>
        </h1>
      </Reveal>
      <Motion.div
        className="hero-art shell"
        style={reducedMotion ? undefined : { scale, opacity, y }}
      >
        <ProductPreview />
      </Motion.div>
      <div className="hero-discover shell">
        <a className="discover-link" href="#proyectos">
          Ver mis proyectos <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <a className="discover-hint" href="#enfoque">
          <ArrowDown size={13} aria-hidden="true" /> Sigue explorando
        </a>
      </div>
    </section>
  );
}
