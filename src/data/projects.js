export const projects = [
  {
    slug: "portfolio",
    listTitle: "Portfolio",
    listSummary: "Mi perfil y mis proyectos.",
    title: "Portfolio / Martín Fierro",
    category: "Web",
    type: "Sitio personal",
    status: "En evolución",
    isExample: false,
    summary:
      "Un espacio para presentar mi perfil, explorar proyectos y documentar cómo están construidos.",
    overview:
      "Este portfolio reúne mi trabajo como ingeniero multimedia orientado al desarrollo full stack. La interfaz organiza cada proyecto en una ficha propia: contexto, decisiones técnicas, proceso de desarrollo y acceso a una demostración cuando está disponible.",
    role: "Desarrollo de interfaz y estructura de contenidos",
    stack: ["React", "Vite", "CSS", "Framer Motion", "Lucide React"],
    sourceHref: "https://github.com/martiinfiierro2/Portafolio",
    demoHref: "/",
    demoLabel: "Explorar sitio",
    problem:
      "Un enlace al repositorio muestra el código, pero deja fuera el contexto: qué se quería resolver, cómo funciona el proyecto y qué decisiones se tomaron durante su construcción.",
    solution:
      "Un catálogo navegable con búsqueda, filtros y fichas independientes. Los contenidos de cada proyecto viven en un único archivo de datos y se muestran mediante componentes reutilizables.",
    architecture: [
      {
        title: "Datos separados de la interfaz",
        description:
          "Un catálogo central define los textos, el stack, los enlaces y las imágenes. Añadir una ficha no requiere duplicar componentes.",
      },
      {
        title: "Páginas independientes",
        description:
          "Inicio, proyectos, perfil y contacto tienen su propia ruta. Las fichas y las demos también se pueden abrir y compartir directamente.",
      },
      {
        title: "Componentes con una responsabilidad",
        description:
          "El catálogo, las fichas, la galería y las demos se organizan por separado para facilitar su lectura y mantenimiento.",
      },
    ],
    development: [
      {
        title: "Definir el recorrido",
        description:
          "Organizar la presentación personal, el catálogo de proyectos y el contacto. Dar a cada proyecto un espacio donde explicar su construcción.",
      },
      {
        title: "Construir el catálogo",
        description:
          "Centralizar los datos y crear filtros por categoría, búsqueda por texto y navegación a las fichas.",
      },
      {
        title: "Diseñar la experiencia",
        description:
          "Aplicar una identidad técnica, una distribución adaptable y transiciones que respetan la preferencia de movimiento reducido.",
      },
      {
        title: "Revisar la implementación",
        description:
          "Comprobar la compilación, el análisis estático y el comportamiento de navegación en escritorio y móvil.",
      },
    ],
    features: [
      "Búsqueda por nombre, descripción o tecnología.",
      "Filtros de proyectos por categoría.",
      "Fichas con contexto, arquitectura y proceso de desarrollo.",
      "Galería de capturas que se pueden ampliar.",
      "Navegación accesible con teclado y diseño adaptable.",
    ],
    gallery: [
      {
        src: "/projects/portfolio-keyboard-desktop.png",
        alt: "Vista del portfolio de Martín Fierro en escritorio",
        caption: "Interfaz en escritorio",
        type: "desktop",
      },
      {
        src: "/projects/portfolio-keyboard-mobile.png",
        alt: "Vista del portfolio de Martín Fierro en un dispositivo móvil",
        caption: "Distribución en móvil",
        type: "mobile",
      },
    ],
  },
  {
    slug: "taskflow",
    listSummary: "Organización de tareas con estado local.",
    title: "Taskflow",
    category: "Web",
    type: "Gestor de tareas",
    status: "Demo interactiva",
    isExample: true,
    summary:
      "Un tablero para crear tareas, organizar su estado y seguir el progreso sin perder el contexto.",
    overview:
      "Taskflow es un proyecto de ejemplo con una demo interactiva. Permite explorar el recorrido de una tarea en un tablero. Los datos pertenecen a la demostración y se gestionan localmente; no hay un servicio remoto de usuarios o tareas.",
    role: "Ejemplo de interfaz y gestión de estado",
    stack: ["React", "JavaScript", "CSS", "Estado local"],
    sourceHref:
      "https://github.com/martiinfiierro2/Portafolio/blob/feat/portfolio-profesional/src/components/demos/TaskFlowDemo.jsx",
    demoHref: "/demos/taskflow",
    demoLabel: "Abrir demo",
    problem:
      "Un listado plano dificulta distinguir qué tareas están pendientes, cuáles están en marcha y cuáles ya se han terminado.",
    solution:
      "Un tablero que hace visible el estado de cada tarea y ofrece controles directos para crearla y avanzar su progreso.",
    architecture: [
      {
        title: "Estado en el navegador",
        description:
          "Las operaciones de la demo se resuelven en la interfaz. El ejemplo no representa una API ni una base de datos compartida.",
      },
      {
        title: "Flujo de tareas explícito",
        description:
          "Las tareas se agrupan por estado para que los cambios se entiendan sin depender de información adicional.",
      },
    ],
    development: [
      {
        title: "Modelar una tarea",
        description:
          "Definir los campos que permiten identificar cada tarea y seguir su estado dentro del tablero.",
      },
      {
        title: "Construir las interacciones",
        description:
          "Añadir controles para crear tareas y actualizar su progreso con una respuesta inmediata en pantalla.",
      },
      {
        title: "Preparar la demostración",
        description:
          "Usar datos de ejemplo y explicar el alcance local de las operaciones para poder probar la interfaz sin configurar servicios.",
      },
    ],
    features: [
      "Tablero con estados de trabajo.",
      "Creación de tareas desde la demo.",
      "Actualización del progreso en la interfaz.",
      "Datos locales de demostración.",
    ],
    gallery: [
      {
        src: "/projects/taskflow.png",
        alt: "Tablero de la demo Taskflow con tareas organizadas por estado",
        caption: "Tablero interactivo de ejemplo",
        type: "desktop",
      },
    ],
  },
  {
    slug: "pulse-api",
    listSummary: "Respuestas JSON y HTTP simulados.",
    title: "Pulse API",
    category: "Backend",
    type: "Explorador de API",
    status: "Demo simulada",
    isExample: true,
    summary:
      "Un explorador de endpoints para inspeccionar peticiones, respuestas JSON y estados HTTP.",
    overview:
      "Pulse API es un ejemplo interactivo para explorar el contrato de una API. Las peticiones y sus respuestas se simulan en el navegador. La demo ayuda a visualizar endpoints y estructuras JSON; no realiza llamadas a un backend desplegado.",
    role: "Ejemplo de contrato de API e interfaz de exploración",
    stack: ["React", "JavaScript", "JSON", "HTTP simulado"],
    sourceHref:
      "https://github.com/martiinfiierro2/Portafolio/blob/feat/portfolio-profesional/src/components/demos/ApiExplorerDemo.jsx",
    demoHref: "/demos/pulse-api",
    demoLabel: "Abrir demo",
    problem:
      "Leer una lista de endpoints sin ver sus respuestas hace más difícil comprender los datos y los estados que una interfaz debe manejar.",
    solution:
      "Una consola visual donde seleccionar una operación y examinar una respuesta JSON de ejemplo junto a su estado HTTP.",
    architecture: [
      {
        title: "Contrato de ejemplo",
        description:
          "Los endpoints describen operaciones y respuestas simuladas. Su objetivo es mostrar cómo se comunica un cliente con una API.",
      },
      {
        title: "Simulación local",
        description:
          "La demo genera sus resultados en el navegador. No necesita credenciales, conexión a un servicio externo ni una base de datos.",
      },
    ],
    development: [
      {
        title: "Definir los endpoints",
        description:
          "Preparar operaciones de ejemplo y respuestas que permitan inspeccionar el formato de los datos.",
      },
      {
        title: "Crear el explorador",
        description:
          "Conectar la selección de una operación con una vista de respuesta JSON y metadatos HTTP.",
      },
      {
        title: "Explicar el alcance",
        description:
          "Identificar la simulación en la interfaz para distinguir el contrato ilustrado de un servicio real desplegado.",
      },
    ],
    features: [
      "Selección de endpoints de ejemplo.",
      "Inspección de respuestas JSON.",
      "Visualización de estados HTTP simulados.",
      "Pruebas locales sin credenciales.",
    ],
    gallery: [
      {
        src: "/projects/pulse-api.png",
        alt: "Explorador Pulse API con endpoints y una respuesta JSON simulada",
        caption: "Explorador de API simulada",
        type: "desktop",
      },
    ],
  },
  {
    slug: "media-lab",
    listSummary: "Exploración de composiciones CSS.",
    title: "Media Lab",
    category: "Multimedia",
    type: "Galería interactiva",
    status: "Demo interactiva",
    isExample: true,
    summary:
      "Un laboratorio visual para explorar piezas, filtrar contenido y abrir cada elemento en detalle.",
    overview:
      "Media Lab es un proyecto de ejemplo centrado en la navegación de contenido multimedia. La demo utiliza piezas de muestra y controles locales para explorar una galería. No presenta trabajos de clientes ni un catálogo de producción.",
    role: "Ejemplo de interacción y presentación multimedia",
    stack: ["React", "CSS", "JavaScript", "Interacción multimedia"],
    sourceHref:
      "https://github.com/martiinfiierro2/Portafolio/blob/feat/portfolio-profesional/src/components/demos/MediaLabDemo.jsx",
    demoHref: "/demos/media-lab",
    demoLabel: "Abrir demo",
    problem:
      "Una colección visual necesita una estructura que permita explorar contenido sin que la interfaz compita con las piezas.",
    solution:
      "Una galería con filtros y una vista individual. La organización del contenido acompaña la exploración y mantiene controles claros.",
    architecture: [
      {
        title: "Contenido de muestra",
        description:
          "Las piezas y sus metadatos forman una colección local de ejemplo para probar el comportamiento de la galería.",
      },
      {
        title: "Exploración progresiva",
        description:
          "La cuadrícula permite recorrer la colección y la vista individual ofrece más espacio para examinar una pieza.",
      },
    ],
    development: [
      {
        title: "Organizar la colección",
        description:
          "Definir piezas de muestra y categorías para que la navegación tenga una estructura comprensible.",
      },
      {
        title: "Crear la galería",
        description:
          "Construir una distribución adaptable con controles para filtrar el contenido visible.",
      },
      {
        title: "Abrir cada pieza",
        description:
          "Incorporar una vista individual para explorar el contenido seleccionado sin abandonar la demo.",
      },
    ],
    features: [
      "Colección multimedia de ejemplo.",
      "Filtros para explorar la galería.",
      "Vista individual de las piezas.",
      "Interacciones resueltas en el navegador.",
    ],
    gallery: [
      {
        src: "/projects/media-lab.png",
        alt: "Galería interactiva de la demo Media Lab con contenido de ejemplo",
        caption: "Galería multimedia de ejemplo",
        type: "desktop",
      },
    ],
  },
];
