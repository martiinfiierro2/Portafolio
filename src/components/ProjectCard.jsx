import { Link } from "react-router-dom";
import { ArrowUpRight, Layers } from "lucide-react";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  const preview = project.gallery?.[0];
  return (
    <article className="catalog-card">
      <Link className="catalog-card-link" to={`/proyectos/${project.slug}`} aria-label={`Ver ${project.title}${project.isExample ? ", proyecto de ejemplo" : ""}`}>
        <div className="catalog-preview" data-project={project.slug} aria-hidden="true">
          {preview?.src ? <img src={preview.src} alt="" loading="lazy" decoding="async" width={1200} height={675} /> : <Layers size={36} strokeWidth={1.2} />}
        </div>
        <div className="catalog-card-body">
          <div className="catalog-card-copy">
            <h2>{project.listTitle ?? project.title}</h2>
            <p>{project.listSummary ?? project.summary}</p>
          </div>
          <ArrowUpRight className="catalog-arrow" size={26} strokeWidth={1.5} aria-hidden="true" />
        </div>
      </Link>
    </article>
  );
}
