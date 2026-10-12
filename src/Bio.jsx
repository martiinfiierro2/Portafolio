import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Database,
  Monitor,
  Terminal,
} from "lucide-react";
import portrait from "./img/martin.jpg";
import Reveal from "./components/Reveal";

const layers = [
  { icon: Monitor, label: "Frontend", value: "Interfaces & interacción" },
  { icon: Database, label: "Backend", value: "APIs & datos" },
  { icon: Braces, label: "Multimedia", value: "Tecnología & experiencia" },
];

export default function Bio() {
  return (
    <section className="hero shell" id="inicio" aria-labelledby="hero-title">
      <Reveal className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> INGENIERÍA MULTIMEDIA / FULL-STACK
        </p>
        <h1 id="hero-title">
          De la interfaz
          <br />a la <span className="accent">arquitectura.</span>
        </h1>
        <p className="hero-description">
          Soy Martín Fierro. Desarrollo experiencias digitales conectando
          interfaces, lógica y datos. Aquí puedes explorar mis proyectos y cómo
          están construidos.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#proyectos">
            Explorar proyectos <ArrowDown size={17} />
          </a>
          <a
            className="button secondary"
            href="https://github.com/martiinfiierro2"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="hero-identity">
          <img src={portrait} alt="Martín Fierro" width="38" height="38" />
          <div>
            <strong>Martín Fierro</strong>
            <span>Ingeniería multimedia · Desarrollo full-stack</span>
          </div>
        </div>
      </Reveal>
      <Reveal className="system-panel" delay={0.12}>
        <div className="panel-bar">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
          <span>
            <Terminal size={13} /> engineer.config.ts
          </span>
          <span className="panel-label">PROFILE</span>
        </div>
        <div
          className="code-panel"
          aria-label="Perfil de desarrollo de Martín Fierro"
        >
          <div>
            <span className="line-number">01</span>
            <code>
              <span className="code-purple">const</span> engineer = {"{"}
            </code>
          </div>
          <div>
            <span className="line-number">02</span>
            <code>
              {" "}
              name: <span className="code-green">"Martín Fierro"</span>,
            </code>
          </div>
          <div>
            <span className="line-number">03</span>
            <code>
              {" "}
              field:{" "}
              <span className="code-green">"Multimedia Engineering"</span>,
            </code>
          </div>
          <div>
            <span className="line-number">04</span>
            <code>
              {" "}
              focus:{" "}
              <span className="code-green">"Full-stack development"</span>,
            </code>
          </div>
          <div>
            <span className="line-number">05</span>
            <code> approach: [</code>
          </div>
          <div>
            <span className="line-number">06</span>
            <code>
              {" "}
              <span className="code-green">"build"</span>,{" "}
              <span className="code-green">"test"</span>,{" "}
              <span className="code-green">"iterate"</span>
            </code>
          </div>
          <div>
            <span className="line-number">07</span>
            <code> ]</code>
          </div>
          <div>
            <span className="line-number">08</span>
            <code>{"}"};</code>
          </div>
        </div>
        <div className="system-flow">
          <span>UI</span>
          <span className="flow-connector" />
          <span>API</span>
          <span className="flow-connector" />
          <span>DATA</span>
        </div>
        <div className="panel-footer">
          <span>
            <span className="status-dot" /> Idea → sistema
          </span>
          <span>React / JavaScript</span>
        </div>
      </Reveal>
      <Reveal className="hero-layers">
        {layers.map(({ icon: Icon, label, value }) => (
          <div key={label}>
            <Icon size={19} />
            <span>
              <strong>{label}</strong>
              <small>{value}</small>
            </span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
