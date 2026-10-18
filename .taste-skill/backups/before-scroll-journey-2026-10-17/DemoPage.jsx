import { ArrowLeft, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import TaskFlowDemo from "./demos/TaskFlowDemo";
import ApiExplorerDemo from "./demos/ApiExplorerDemo";
import MediaLabDemo from "./demos/MediaLabDemo";
import "./DemoPage.css";

const demos = {
  taskflow: {
    title: "TaskFlow / workspace",
    description:
      "Organiza tareas y explora un flujo de trabajo completo. Los cambios se guardan únicamente en este navegador.",
    component: TaskFlowDemo,
  },
  "pulse-api": {
    title: "Pulse API / playground",
    description:
      "Explora respuestas de una API simulada. Todos los endpoints y datos funcionan localmente, sin enviar peticiones a un servidor.",
    component: ApiExplorerDemo,
  },
  "media-lab": {
    title: "Media Lab / experimentos",
    description:
      "Un laboratorio de composiciones generadas con CSS. Filtra piezas, consulta su ficha y ajusta su presentación en tiempo real.",
    component: MediaLabDemo,
  },
};

export default function DemoPage({ demoId }) {
  const demo = demos[demoId];

  if (!demo) {
    return (
      <section className="demo-page shell" aria-labelledby="demo-title">
        <Link className="demo-back" to="/proyectos">
          <ArrowLeft size={16} aria-hidden="true" /> Volver a proyectos
        </Link>
        <h1 id="demo-title" tabIndex={-1}>
          Demo no encontrada
        </h1>
        <p>Consulta el catálogo para abrir un proyecto disponible.</p>
      </section>
    );
  }

  const Demo = demo.component;

  return (
    <section className="demo-page shell" aria-labelledby="demo-title">
      <header className="demo-header">
        <Link className="demo-back" to={`/proyectos/${demoId}`}>
          <ArrowLeft size={16} aria-hidden="true" /> Volver al proyecto
        </Link>
        <div className="demo-heading-row">
          <div>
            <p className="eyebrow">ENTORNO INTERACTIVO</p>
            <h1 id="demo-title" tabIndex={-1}>
              {demo.title}
            </h1>
          </div>
          <span className="demo-badge">
            <FlaskConical size={15} aria-hidden="true" />
            Demo de ejemplo · datos locales
          </span>
        </div>
        <p className="demo-description">{demo.description}</p>
      </header>
      <div className="demo-workspace">
        <Demo />
      </div>
    </section>
  );
}
