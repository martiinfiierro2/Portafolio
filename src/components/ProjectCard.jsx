import { ArrowUpRight } from "lucide-react";
import ProjectLink from "./ProjectLink";
import TechnologyList from "./TechnologyList";

export default function ProjectCard({ project, headingLevel = "h2" }) {
  const Heading = headingLevel;
  const mobile = project.layout === "mobile";

  return (
    <article className="project-item">
      <ProjectLink className="project-card" to={`/proyectos/${project.slug}`} aria-label={`Ver proyecto: ${project.title}`}>
        <div className={`project-art ${mobile ? "phones" : "graph"}`} style={{ viewTransitionName: `project-${project.slug}` }} aria-hidden="true">
          {project.views[0].images.map(image => (
            <img key={image.src} src={image.src} alt="" width={mobile ? 460 : 1440} height={900} loading="lazy" decoding="async" />
          ))}
        </div>
        <div className="project-copy">
          <Heading>{project.title}</Heading>
          <p className="project-description">{project.summary}</p>
          <TechnologyList technologies={project.cardStack} compact label="Tecnologías principales" />
          <span className="project-open">Abrir proyecto <ArrowUpRight aria-hidden="true" /></span>
        </div>
      </ProjectLink>
    </article>
  );
}
