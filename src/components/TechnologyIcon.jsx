import { Atom, Braces, Database, Hexagon, Wind, PanelsTopLeft } from 'lucide-react';

const icons = { React: Atom, 'Node.js': Hexagon, JavaScript: Braces, PostgreSQL: Database, 'Tailwind CSS': Wind, CSS: PanelsTopLeft };

export default function TechnologyIcon({ name }) {
  const Icon = icons[name] || Braces;
  return <Icon size={15} strokeWidth={1.6} aria-hidden="true" />;
}
