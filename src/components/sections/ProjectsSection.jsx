import ProjectCard from "../ProjectCard";
import { projects } from "../../data/projects";

export default function ProjectsSection() {
  return (
    <section className="work wide" id="proyectos" aria-labelledby="work-title">
      <div className="section-heading">
        <h2 id="work-title" tabIndex={-1}>Mi trabajo,<br />en pantalla.</h2>
        <p>La interfaz, lo que hace y cómo está construida. Entra en cada proyecto para verlo de cerca.</p>
      </div>
      <div className="project-list">
        {projects.map(project => 
          <ProjectCard key={project.slug} project={project} headingLevel="h3" />
        )}
      </div>
    </section>
  );
}
