export type TechnologyId = 'react' | 'javascript' | 'node' | 'java' | 'python' | 'sql';
export interface Technology {
  id: TechnologyId;
  label: string;
  color: string;
}
export interface Profile {
  name: string;
  role: string;
  introduction: string;
  email: string | null;
  linkedinUrl: string | null;
  githubUrl: string;
  cvUrl: string | null;
  technologies: Technology[];
  currentlyLearning: string[];
}
export interface ProjectMedia {
  id: string;
  label: string;
  src: string;
  alt: string;
}
export interface Project {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  year: string | null;
  cover: string;
  coverAlt: string;
  color: string;
  isSample: boolean;
  demoUrl: string | null;
  repositoryUrl: string | null;
  role: string;
  problem: string;
  solution: string;
  features: string[];
  decisions: string[];
  learnings: string[];
  architecture: { title: string; description: string }[];
  media: ProjectMedia[];
}
export type View = { kind: 'desk' } | { kind: 'projects' } | { kind: 'project'; slug: string };
export type PanelKind = 'contact' | 'cv' | 'stack';
export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface PanelState {
  kind: PanelKind;
  origin: Rectangle;
  trigger: HTMLElement;
}
