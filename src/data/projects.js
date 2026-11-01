// Published projects: content and media have one source of truth.
export const projects = [
  {
    "slug": "calendar",
    "title": "Calendar",
    "layout": "mobile",
    "type": "Proyecto personal",
    "status": "En desarrollo",
    "summary": "Planificar las comidas, saber qué comprar y consultar lo que ya tienes.",
    "lead": "Comidas, compra y nevera, en una sola aplicación.",
    "context": [
      "Calendar conecta la planificación semanal y diaria con la lista de la compra y los ingredientes disponibles. Tres partes de una misma tarea, reunidas en una aplicación."
    ],
    "role": "Desarrollo full-stack",
    "stack": [
      "React",
      "Node.js",
      "PostgreSQL",
      "Express",
      "Sequelize"
    ],
    "cardStack": [
      "React",
      "Node.js",
      "PostgreSQL"
    ],
    "sourceHref": "https://github.com/martiinfiierro2/Calendar",
    "views": [
      {
        "label": "Planificación",
        "caption": "Vista semanal y detalle del día: las comidas organizadas en el calendario. Datos de demostración.",
        "images": [
          {
            "src": "/projects/calendar/semana.png",
            "alt": "Planificación semanal de comidas en Calendar",
            "caption": "Calendario semanal · Datos de demostración"
          },
          {
            "src": "/projects/calendar/dia.png",
            "alt": "Vista diaria con las comidas planificadas",
            "caption": "Vista diaria · Datos de demostración"
          }
        ]
      },
      {
        "label": "Compra",
        "caption": "Una lista para consultar los ingredientes pendientes de comprar. Datos de demostración.",
        "images": [
          {
            "src": "/projects/calendar/compra.png",
            "alt": "Lista de la compra con ingredientes pendientes",
            "caption": "Compra · Datos de demostración"
          }
        ]
      },
      {
        "label": "Nevera",
        "caption": "Los ingredientes disponibles, conectados con la planificación. Datos de demostración.",
        "images": [
          {
            "src": "/projects/calendar/nevera.png",
            "alt": "Ingredientes disponibles en la nevera de Calendar",
            "caption": "Nevera · Datos de demostración"
          }
        ]
      }
    ],
    "notes": [
      [
        "De la semana al día",
        "La vista semanal ayuda a organizar las comidas; la diaria permite consultar el detalle de cada jornada."
      ],
      [
        "Qué falta y qué hay",
        "Compra y nevera reúnen los ingredientes pendientes y los que ya hay disponibles."
      ]
    ]
  },
  {
    "slug": "monitorizacion-sistemas-distribuidos",
    "title": "Monitorización distribuida",
    "layout": "desktop",
    "type": "Trabajo de Fin de Grado",
    "status": "Disponible en local",
    "summary": "Consultar el estado de los procesos y entender cómo se conectan.",
    "lead": "Procesos, estados y conexiones a simple vista.",
    "context": [
      "Una interfaz para consultar si los procesos responden, cómo se relacionan y dónde se encuentran. Grafo, mapa y detalle representan los mismos datos desde perspectivas distintas."
    ],
    "role": "Desarrollo de la interfaz de monitorización e integración con los servicios y el catálogo de nodos",
    "stack": [
      "Angular",
      "TypeScript",
      "Node.js",
      "MySQL",
      "RxJS",
      "ECharts",
      "Leaflet"
    ],
    "cardStack": [
      "Angular",
      "Node.js",
      "MySQL"
    ],
    "sourceHref": "https://github.com/martiinfiierro2/Monitorizacion-Sistemas-Distribuidos",
    "views": [
      {
        "label": "Grafo",
        "caption": "Relaciones de supervisión y asignación entre los nodos del sistema. Datos de demostración.",
        "images": [
          {
            "src": "/projects/monitorizacion-sistemas-distribuidos/grafo.png",
            "alt": "Grafo de coordinadores, balanceadores y procesadores con sus relaciones de asignación y supervisión",
            "caption": "Topología y disponibilidad · Datos de demostración"
          }
        ]
      },
      {
        "label": "Mapa",
        "caption": "La ubicación de los nodos y el acceso a la información de cada proceso. Datos de demostración.",
        "images": [
          {
            "src": "/projects/monitorizacion-sistemas-distribuidos/mapa.png",
            "alt": "Mapa mundial con marcadores de coordinadores, balanceadores y procesadores",
            "caption": "Vista geográfica con datos de demostración"
          }
        ]
      },
      {
        "label": "Catálogo",
        "caption": "Las fichas utilizadas por la representación, organizadas en un catálogo. Datos de demostración.",
        "images": [
          {
            "src": "/projects/monitorizacion-sistemas-distribuidos/catalogo.png",
            "alt": "Catálogo de nodos con búsqueda, direcciones, puertos, coordenadas y acciones sobre las fichas",
            "caption": "Catálogo de nodos · Datos de demostración"
          }
        ]
      },
      {
        "label": "Detalle",
        "caption": "Estado, configuración y relaciones devueltos por el nodo seleccionado. Datos de demostración.",
        "images": [
          {
            "src": "/projects/monitorizacion-sistemas-distribuidos/detalle.png",
            "alt": "Panel de detalle con información devuelta por un proceso monitorizado",
            "caption": "Detalle de nodo · Datos de demostración"
          }
        ]
      }
    ],
    "notes": [
      [
        "Refresco sin saltos",
        "Cada ronda se publica al completarse. Mientras llegan las respuestas, se conserva el último estado completo."
      ],
      [
        "Conexiones con significado",
        "El grafo distingue supervisión y asignación. Sus enlaces muestran relaciones del sistema, no tráfico de red."
      ],
      [
        "Catálogo y ejecución",
        "Cambiar la ficha de un nodo modifica su representación; no arranca, detiene ni reconfigura el ejecutable."
      ]
    ],
    "video": {
      "src": "/projects/monitorizacion-sistemas-distribuidos/demo.webm",
      "poster": "/projects/monitorizacion-sistemas-distribuidos/grafo.png",
      "caption": "Recorrido de la interfaz · 28 segundos · Datos de demostración"
    }
  }
];
