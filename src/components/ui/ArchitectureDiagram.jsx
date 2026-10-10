import { ArrowRight } from 'lucide-react';
export default function ArchitectureDiagram({ nodes }) {
  return (
    <ol className="architecture" aria-label="Esquema de arquitectura orientativo">
      {nodes.map((node, index) => (
        <li key={`${node.label}-${index}`}>
          <div>
            <strong>{node.label}</strong>
            <span>{node.detail}</span>
          </div>
          {index < nodes.length - 1 && <ArrowRight size={18} aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}
