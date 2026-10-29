export const projects = [
  {
    slug: "monitorizacion-sistemas-distribuidos",
    caseStudy: {
      headline: "Monitorización distribuida",
      intro: "Del estado de cada proceso a una visión de todo el sistema.",
      statement: "Un sistema, varias miradas.",
      statementBody: "Este TFG convierte las respuestas de los ejecutables en un lugar donde ver qué ocurre, seguir las relaciones y acercarse a cada nodo. Grafo, mapa, catálogo y detalle muestran el mismo sistema desde distintas perspectivas.",
      roles: [
        {
          name: "Coordinador",
          image: "/projects/monitorizacion-sistemas-distribuidos/roles/coordinador.png"
        },
        {
          name: "Balanceador",
          image: "/projects/monitorizacion-sistemas-distribuidos/roles/balanceador.png"
        },
        {
          name: "Procesador",
          image: "/projects/monitorizacion-sistemas-distribuidos/roles/procesador.png"
        }
      ],
      views: [
        {
          image: "grafo.png",
          label: "Conexiones",
          description: "Sigue las relaciones entre coordinadores, balanceadores y procesadores. Las líneas distinguen la supervisión de la asignación operativa."
        },
        {
          image: "mapa.png",
          label: "Mapa",
          description: "El mismo sistema desde otra perspectiva: sus nodos sobre el mapa, con acceso directo a la información de cada proceso."
        },
        {
          image: "catalogo.png",
          label: "Catálogo",
          description: "Un lugar para localizar las fichas por nombre, tipo o dirección y organizar los datos que utiliza la representación."
        },
        {
          image: "detalle.png",
          label: "Detalle",
          description: "Abre un nodo para consultar lo que está respondiendo: estado, configuración, procesadores registrados y destinos seleccionados."
        }
      ]
    },
    listTitle: "Monitorización distribuida",
    listSummary: "Estado y conexiones de procesos en grafo y mapa.",
    title: "Monitorización de sistemas distribuidos",
    category: "Web",
    type: "Trabajo de Fin de Grado",
    status: "Disponible en local",
    isExample: false,
    summary: "Consulta qué procesos responden, cómo se conectan y dónde se sitúan, desde un grafo y un mapa.",
    overview: "Proyecto desarrollado como Trabajo de Fin de Grado, centrado en representar los datos que exponen coordinadores, balanceadores y procesadores. La interfaz de escritorio reúne la topología del sistema, la ubicación de los nodos y el detalle de cada proceso. Un catálogo persistente permite organizar las fichas utilizadas en la representación. Editar estas fichas no arranca, detiene ni reconfigura los ejecutables monitorizados.",
    role: "Desarrollo de la interfaz de monitorización e integración con los servicios y el catálogo de nodos",
    stack: [
      "Angular 17",
      "TypeScript",
      "RxJS",
      "Angular Material",
      "Node.js",
      "Express",
      "MySQL / MariaDB",
      "Sequelize",
      "ECharts",
      "Leaflet"
    ],
    sourceHref: "https://github.com/martiinfiierro2/Monitorizacion-Sistemas-Distribuidos",
    problem: "Consultar cada proceso por separado dificulta entender qué componentes responden, qué función cumple cada uno y cómo se relacionan. Además, sus respuestas llegan en momentos distintos, lo que puede producir estados visuales contradictorios durante las actualizaciones.",
    solution: "Una interfaz con grafo, mapa y detalle de nodo, filtros compartidos y un catálogo central. Las consultas se realizan periódicamente y cada ronda publica sus resultados de forma conjunta, conservando la información anterior mientras llegan las respuestas.",
    architecture: [
      {
        title: "Dos vistas sobre una misma topología",
        description: "El grafo con ECharts y el mapa con Leaflet comparten el cálculo de relaciones para representar los mismos datos. Los enlaces distinguen supervisión y asignación operativa; no son una medición de tráfico."
      },
      {
        title: "Actualización por rondas completas",
        description: "RxJS coordina las consultas con concurrencia limitada y tiempos de espera individuales. La última ronda completa permanece visible hasta terminar la siguiente y se evita solapar rondas, de modo que una consulta pendiente no aparezca temporalmente como una desconexión."
      },
      {
        title: "Catálogo separado de los procesos",
        description: "Una API con Node.js y Express gestiona las fichas en MySQL/MariaDB mediante Sequelize y actúa como proxy para consultar los procesos. El catálogo guarda los datos de representación sin controlar la ejecución de los servicios."
      },
      {
        title: "Interfaz Angular sobre Fuse",
        description: "La aplicación parte de la base visual de Fuse y utiliza Angular Material. La composición de las vistas, los controles de navegación y el detalle de nodo se adaptan al espacio disponible en ventanas de escritorio."
      }
    ],
    development: [
      {
        title: "Organizar los nodos y sus consultas",
        description: "Integrar el catálogo de direcciones, puertos, tipos y coordenadas con las respuestas que expone cada proceso, y distinguir disponibilidad, configuración y relaciones."
      },
      {
        title: "Construir las vistas de monitorización",
        description: "Representar el sistema mediante grafo y mapa, añadir filtros compartidos y abrir el detalle de cada nodo desde ambas vistas."
      },
      {
        title: "Revisar la actualización y la navegación",
        description: "Corregir las inconsistencias del refresco, conservar el encuadre entre consultas y ajustar el zoom, el desplazamiento y los paneles de detalle al uso en escritorio."
      },
      {
        title: "Comprobar los recorridos y los fallos",
        description: "Verificar reglas de topología y actualización con pruebas Node.js y recorrer las vistas con Playwright CLI, incluyendo respuestas lentas, tiempos de espera, filtros y operaciones del catálogo."
      }
    ],
    features: [
      "Grafo interactivo con relaciones de supervisión y asignación.",
      "Mapa geográfico con marcadores por tipo de nodo y acceso a su detalle.",
      "Filtros por grupo inferido, tipo y disponibilidad.",
      "Consulta del estado, configuración y datos disponibles según el rol del nodo.",
      "Refresco periódico que conserva la última ronda completa y el encuadre.",
      "Catálogo con búsqueda, paginación, edición, visibilidad y exportación de fichas."
    ],
    gallery: [
      {
        src: "/projects/monitorizacion-sistemas-distribuidos/grafo.png",
        label: "Grafo",
        alt: "Grafo de coordinadores, balanceadores y procesadores con sus relaciones de asignación y supervisión",
        caption: "Topología y disponibilidad · Datos de demostración",
        type: "desktop"
      },
      {
        src: "/projects/monitorizacion-sistemas-distribuidos/mapa.png",
        label: "Mapa",
        alt: "Mapa mundial con marcadores de coordinadores, balanceadores y procesadores",
        caption: "Vista geográfica con datos de demostración",
        type: "desktop"
      },
      {
        src: "/projects/monitorizacion-sistemas-distribuidos/catalogo.png",
        label: "Catálogo",
        alt: "Catálogo de nodos con búsqueda, direcciones, puertos, coordenadas y acciones sobre las fichas",
        caption: "Catálogo de nodos · Datos de demostración",
        type: "desktop"
      },
      {
        src: "/projects/monitorizacion-sistemas-distribuidos/detalle.png",
        label: "Detalle",
        alt: "Panel de detalle con información devuelta por un proceso monitorizado",
        caption: "Detalle de nodo · Datos de demostración",
        type: "desktop"
      }
    ],
    video: {
      src: "/projects/monitorizacion-sistemas-distribuidos/demo.webm",
      poster: "/projects/monitorizacion-sistemas-distribuidos/grafo.png",
      caption: "Recorrido de la interfaz · 28 segundos · Datos de demostración",
      description: "El vídeo muestra los filtros y el zoom del grafo, la vista geográfica, la búsqueda en el catálogo y la consulta del detalle y la configuración de un nodo. Es una grabación sin audio con datos de demostración."
    }
  },
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
