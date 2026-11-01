import { ArrowLeft, ArrowUpRight, Play } from "lucide-react";
import ProjectGallery from "../components/ProjectGallery";
import ProjectLink from "../components/ProjectLink";
import ProjectVideo from "../components/ProjectVideo";
import SectionLink from "../components/SectionLink";
import { projects } from "../data/projects";

export default function ProjectDetail({ project }) {
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <article className={`case-page ${project.layout === "mobile" ? "calendar" : "monitorizacion"}`}>
      <section className="case-heading wide" aria-labelledby="case-title">
        <SectionLink className="back" section="proyectos"><ArrowLeft aria-hidden="true" />Todos los proyectos</SectionLink>
        <div className="case-heading-grid">
          <div><h1 id="case-title" tabIndex={-1}>{project.title}</h1><p className="lead">{project.lead}</p></div>
          <div className="case-meta">
            <p>{project.type}<br /><span>{project.status}</span></p>
            <a className="text-link" href={project.sourceHref} target="_blank" rel="noopener noreferrer">Ver código <ArrowUpRight aria-hidden="true" /><span className="sr-only"> (nueva pestaña)</span></a>
            {project.video && <a className="text-link" href="#recorrido">Ver recorrido <Play aria-hidden="true" /></a>}
          </div>
        </div>
      </section>
      <ProjectGallery views={project.views} slug={project.slug} calendar={project.layout === "mobile"} />
      <section className="case-story wide" aria-labelledby="project-context">
        <h2 id="project-context">El proyecto.</h2>
        <div>
          {project.context.map(text => <p className="story-lead" key={text}>{text}</p>)}
          <dl className="credits">
            <div><dt>Mi trabajo</dt><dd>{project.role}</dd></div>
            <div><dt>Hecho con</dt><dd><ul className="credit-stack">{project.stack.map(technology => <li key={technology}>{technology}</li>)}</ul></dd></div>
          </dl>
        </div>
      </section>
      <section className="decisions" aria-labelledby="decisions-title">
        <div className="wide">
          <h2 id="decisions-title">Decisiones<br />de desarrollo.</h2>
          <div className="decision-list">{project.notes.map(([heading, text]) => <div key={heading}><h3>{heading}</h3><p>{text}</p></div>)}</div>
        </div>
      </section>
      {project.video && <ProjectVideo video={project.video} title={project.title} />}
      {projects.length > 1 && <section className="next wide" aria-label="Siguiente proyecto">
        <p>Siguiente proyecto</p><ProjectLink className="next-link" to={`/proyectos/${next.slug}`}><span>{next.title}</span><ArrowUpRight aria-hidden="true" /></ProjectLink>
      </section>}
    </article>
  );
}
