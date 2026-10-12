import type { Profile } from '../types/portfolio';

export const profile: Profile = {
  name: 'Martín Fierro',
  role: 'Desarrollador full-stack junior',
  introduction: 'Construyo aplicaciones web robustas y de utilidad.',
  email: null,
  linkedinUrl: null,
  githubUrl: 'https://github.com/martiinfiierro2',
  cvUrl: null,
  technologies: [
    { id: 'react', label: 'React', color: '#008fbf', category: 'frontend' },
    { id: 'javascript', label: 'JavaScript', color: '#a87303', category: 'frontend' },
    { id: 'node', label: 'Node.js', color: '#49743b', category: 'backend' },
    { id: 'java', label: 'Java', color: '#bd2427', category: 'backend' },
    { id: 'python', label: 'Python', color: '#126aa2', category: 'backend' },
    { id: 'sql', label: 'SQL', color: '#123c75', category: 'database' },
  ],
};
