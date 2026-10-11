import type { Profile, TechnologyCategory } from '../types/portfolio';
export const technologyCategories: { id: TechnologyCategory; label: string }[] = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Datos / SQL' },
];

export const profile: Profile = {
  name: 'Martín Fierro',
  role: 'Desarrollador full-stack junior',
  introduction: 'Construyo aplicaciones web robustas y de utilidad.',
  email: null,
  linkedinUrl: null,
  githubUrl: 'https://github.com/martiinfiierro2',
  cvUrl: null,
  technologies: [
    { id: 'react', label: 'React', color: '#28798b', category: 'frontend' },
    { id: 'javascript', label: 'JavaScript', color: '#866613', category: 'frontend' },
    { id: 'node', label: 'Node.js', color: '#49743b', category: 'backend' },
    { id: 'java', label: 'Java', color: '#a45336', category: 'backend' },
    { id: 'python', label: 'Python', color: '#366789', category: 'backend' },
    { id: 'sql', label: 'SQL', color: '#696085', category: 'database' },
  ],
};
