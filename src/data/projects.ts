import type { Project } from '../types/portfolio';
// Design samples, not published applications. Replace with documented work.
const samples: Pick<
  Project,
  'slug' | 'title' | 'category' | 'collection' | 'description' | 'technologies' | 'color'
>[] = [
  {
    slug: 'monitorizacion',
    title: 'Monitorización de nodos',
    category: 'Sistemas · Full-stack',
    collection: 'data',
    description:
      'Un espacio para visualizar una arquitectura distribuida y entender el estado de sus nodos.',
    technologies: ['Angular', 'Node.js', 'Express', 'MySQL', 'ECharts', 'Leaflet'],
    color: '#396b78',
  },
  {
    slug: 'calendar',
    title: 'Calendar',
    category: 'Producto · Web',
    collection: 'web',
    description:
      'Organización de comidas, calendario y lista de la compra en una misma experiencia.',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    color: '#935b48',
  },
  {
    slug: 'api-backend',
    title: 'API / Backend',
    category: 'Ingeniería · API',
    collection: 'other',
    description: 'La lógica, los datos y las decisiones que dan forma a una aplicación.',
    technologies: ['Node.js', 'SQL'],
    color: '#736483',
  },
  {
    slug: 'frontend',
    title: 'Aplicación móvil',
    category: 'Aplicación · Frontend',
    collection: 'apps',
    description:
      'Una propuesta de interfaz adaptable para organizar la información desde cualquier dispositivo.',
    technologies: ['React', 'CSS'],
    color: '#9c505b',
  },
];
export const projects: Project[] = samples.map((sample, index) => ({
  ...sample,
  number: String(index + 1).padStart(2, '0'),
  year: null,
  cover: `/projects/${sample.slug}.svg`,
  coverAlt: `Ilustración conceptual de ${sample.title}; no es una captura de una aplicación publicada.`,
  isSample: true,
  demoUrl: null,
  repositoryUrl: null,
  role: 'Pendiente de documentar: indica qué desarrollaste y si el proyecto fue individual o en equipo.',
  problem:
    'Añade la necesidad real que motivó el proyecto, su contexto y las personas a las que ayuda.',
  solution: 'Documenta la solución implementada, su alcance y cómo responde al problema.',
  features: [
    'Interacción principal por documentar',
    'Gestión de datos por documentar',
    'Adaptación y accesibilidad por documentar',
  ],
  decisions: [
    'Explica una decisión de arquitectura y su motivo.',
    'Describe un compromiso técnico y cómo lo resolviste.',
  ],
  learnings: [
    'Añade los aprendizajes del proyecto.',
    'Indica qué mejorarías en una siguiente versión.',
  ],
  architecture: [
    { title: 'Interfaz', description: 'Interacciones y presentación de datos.' },
    { title: 'Aplicación', description: 'Lógica de negocio y comunicación.' },
    { title: 'Datos', description: 'Modelo y persistencia de información.' },
  ],
  media: [
    {
      id: 'overview',
      label: 'Vista general',
      src: `/projects/${sample.slug}.svg`,
      alt: `Vista conceptual de ${sample.title}. Captura real pendiente.`,
    },
  ],
}));
