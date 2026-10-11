import { Atom, Braces, Coffee, Database, Hexagon, CodeXml } from 'lucide-react';
import type { TechnologyId } from '../../types/portfolio';

const icons = {
  react: Atom,
  javascript: Braces,
  node: Hexagon,
  java: Coffee,
  python: CodeXml,
  sql: Database,
};
export default function TechnologyIcon({ id, size = 22 }: { id: TechnologyId; size?: number }) {
  const Icon = icons[id];
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}
