import { useState, useTransition } from "react";
import { ArrowRight, CheckCircle2, Terminal } from "lucide-react";

const endpoints = {
  users: {
    label: "Usuarios de ejemplo",
    description: "Una colección local de perfiles de prueba.",
    data: {
      users: [
        { id: "user-01", name: "Usuario de ejemplo 01", role: "developer" },
        { id: "user-02", name: "Usuario de ejemplo 02", role: "reviewer" },
      ],
      total: 2,
    },
  },
  projects: {
    label: "Proyectos de ejemplo",
    description: "Los experimentos disponibles en este portafolio.",
    data: {
      projects: [
        { id: "taskflow", title: "TaskFlow", type: "web-app", example: true },
        {
          id: "pulse-api",
          title: "Pulse API",
          type: "api-demo",
          example: true,
        },
        {
          id: "media-lab",
          title: "Media Lab",
          type: "multimedia",
          example: true,
        },
      ],
      total: 3,
    },
  },
  health: {
    label: "Estado de la simulación",
    description:
      "Información sobre este entorno local, sin servicios externos.",
    data: {
      status: "ok",
      environment: "local-demo",
      source: "in-memory",
      networkRequests: false,
      authentication: "not-required",
    },
  },
};

export default function ApiExplorerDemo() {
  const [endpoint, setEndpoint] = useState("users");
  const [response, setResponse] = useState(null);
  const [isPending, startTransition] = useTransition();

  function executeRequest(event) {
    event.preventDefault();

    startTransition(() => {
      setResponse({
        endpoint,
        status: 200,
        body: { source: "local-simulation", ...endpoints[endpoint].data },
      });
    });
  }

  return (
    <div className="api-layout">
      <form className="api-controls" onSubmit={executeRequest}>
        <p className="demo-section-label">CONFIGURAR CONSULTA</p>
        <h2>Una API para explorar.</h2>
        <p>
          Prueba tres respuestas preparadas y consulta su estructura JSON. Esta
          simulación no realiza solicitudes de red.
        </p>
        <label className="api-label" htmlFor="api-method">
          Método
        </label>
        <select id="api-method" className="api-input" defaultValue="GET">
          <option value="GET">GET</option>
        </select>
        <label className="api-label" htmlFor="api-endpoint">
          Endpoint local
        </label>
        <select
          id="api-endpoint"
          className="api-input"
          value={endpoint}
          onChange={(event) => setEndpoint(event.target.value)}
          aria-describedby="api-endpoint-description"
        >
          {Object.entries(endpoints).map(([key, value]) => (
            <option key={key} value={key}>
              /api/{key} — {value.label}
            </option>
          ))}
        </select>
        <p className="api-hint" id="api-endpoint-description">
          {endpoints[endpoint].description}
        </p>
        <button
          className="button button-primary api-submit"
          disabled={isPending}
        >
          {isPending ? "Preparando respuesta…" : "Ejecutar consulta"}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
        <div className="api-request-preview">
          <span>GET</span>
          <code>/api/{endpoint}</code>
          <small>SIMULADA</small>
        </div>
      </form>
      <section className="api-console" aria-labelledby="api-response-title">
        <header className="api-console-header">
          <span id="api-response-title">
            <Terminal size={16} aria-hidden="true" /> response.json
          </span>
          <span className="api-status" role="status">
            {isPending ? (
              "Preparando…"
            ) : response ? (
              <>
                <CheckCircle2 size={14} aria-hidden="true" /> {response.status}{" "}
                OK · local
              </>
            ) : (
              "Sin ejecutar"
            )}
          </span>
        </header>
        {response ? (
          <>
            <p className="api-response-meta">GET /api/{response.endpoint}</p>
            <pre
              className="api-response"
              tabIndex={0}
              aria-label="Respuesta JSON"
            >
              <code>{JSON.stringify(response.body, null, 2)}</code>
            </pre>
          </>
        ) : (
          <div className="api-empty">
            <Terminal size={32} aria-hidden="true" />
            <p>Elige un endpoint y ejecuta la consulta.</p>
            <span>La respuesta aparecerá aquí.</span>
          </div>
        )}
      </section>
    </div>
  );
}
