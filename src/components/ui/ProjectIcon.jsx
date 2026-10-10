import { CalendarDays, Network, PanelsTopLeft, Braces, Sparkles } from 'lucide-react';
const icons = {
  calendar: CalendarDays,
  network: Network,
  layout: PanelsTopLeft,
  code: Braces,
  sparkles: Sparkles,
};
export default function ProjectIcon({ name, ...props }) {
  const Icon = icons[name] ?? Braces;
  return <Icon aria-hidden="true" strokeWidth={1.6} {...props} />;
}
