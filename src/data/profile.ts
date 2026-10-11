import type { Profile } from '../types/portfolio';
export const profile: Profile = {
  name: 'Martín Fierro',
  role: 'Desarrollador full-stack junior',
  introduction:
    'Construyo aplicaciones web cuidando tanto la interfaz como la lógica que hay detrás.',
  email: null,
  linkedinUrl: null,
  githubUrl: 'https://github.com/martiinfiierro2',
  cvUrl: null,
  currentlyLearning: [],
  technologies: [
    { id: 'react', label: 'React', color: '#28798b' },
    { id: 'javascript', label: 'JavaScript', color: '#866613' },
    { id: 'node', label: 'Node.js', color: '#49743b' },
    { id: 'java', label: 'Java', color: '#a45336' },
    { id: 'python', label: 'Python', color: '#366789' },
    { id: 'sql', label: 'SQL', color: '#696085' },
  ],
};
