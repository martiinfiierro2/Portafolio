import { ArrowUpRight, Code2 } from "lucide-react";
import Reveal from "./components/Reveal";

export default function Footer() {
  return (
    <footer id="contacto" className="footer">
      <div className="shell">
        <Reveal className="contact">
          <div>
            <p className="eyebrow">03 / CONECTEMOS</p>
            <h2>
              Las buenas ideas
              <br />
              empiezan conversando<span>.</span>
            </h2>
          </div>
          <a
            className="button primary"
            href="https://github.com/martiinfiierro2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Code2 size={19} /> Encuéntrame en GitHub{" "}
            <ArrowUpRight size={18} />
          </a>
        </Reveal>
        <div className="footer-bottom">
          <a className="wordmark" href="#inicio">
            mf<span>.</span>
          </a>
          <span>© {new Date().getFullYear()} Martín Fierro</span>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </div>
    </footer>
  );
}
