import { Code2, Database } from "lucide-react";
import { technologyIcons } from "../data/technology-icons";

export default function TechnologyList({ technologies, compact = false, label = "Tecnologías" }) {
  return (
    <ul className={`technology-list${compact ? " compact" : ""}`} aria-label={label}>
      {technologies.map(name => {
        const icon = technologyIcons[name];
        const Fallback = name === "SQL" ? Database : Code2;
        return (
          <li key={name}>
            <span className="tech-logo" aria-hidden="true" style={icon ? { "--tech-light": icon.light, "--tech-dark": icon.dark } : undefined}>
              {icon ? <svg viewBox="0 0 24 24" fill="currentColor"><path d={icon.path} /></svg> : <Fallback />}
            </span>
            <span>{name}</span>
          </li>
        );
      })}
    </ul>
  );
}
