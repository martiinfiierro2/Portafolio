# Martín Fierro / Portfolio

Portafolio de ingeniería multimedia y desarrollo full-stack construido con React y Vite. La página principal se recorre con scroll: portada, enfoque, proyectos, perfil y contacto. Incluye un catálogo con búsqueda y categorías, fichas individuales de proyectos y demos interactivas locales.

## Desarrollo

Usa Node.js 24 (Vite requiere Node >=20.19 o >=22.12) y npm:

```bash
npm ci
npm run dev
```

```bash
npm run lint
npm run build
npm run preview
```

## Estructura

- `src/data/projects.js`: contenido de todas las fichas, tecnologías, proceso, capturas y enlaces.
- `src/components/DeveloperIllustration.jsx`: ilustración de Martín con variantes para cada tema en `public/illustrations/`.
- `src/components/Experience.jsx`: sección del enfoque de trabajo.
- `src/components/Projects.jsx`: catálogo y filtros.
- `src/components/ProjectDetail.jsx`: ficha reutilizable.
- `src/components/ProjectMedia.jsx`: capturas ampliables.
- `src/components/demos/`: TaskFlow, Pulse API y Media Lab.
- `src/hooks/useHashRoute.js`: navegación mediante hash para hosting estático.
- `src/hooks/useActiveSection.js`: seguimiento de la sección visible en la cabecera.
- `src/styles/`: estilos separados por interfaz, catálogo, fichas y demos; `src/index.css` agrupa sus importaciones.
- `src/assets/fonts/`: fuentes locales; Clash Display en negrita para títulos y Manrope para textos y controles.

Consulta [cómo añadir proyectos](docs/PROJECTS.md) para crear nuevas fichas sin duplicar componentes. Cada proyecto tiene una dirección propia, por ejemplo `#/proyectos/taskflow`, que se puede abrir directamente o compartir.

## Demos de ejemplo

TaskFlow guarda tareas únicamente en el navegador. Pulse API simula respuestas JSON en memoria. Media Lab genera composiciones con CSS y permite ajustar su presentación. Son ejemplos identificados en la interfaz; no usan un servidor, cuentas ni datos de clientes.

El catálogo se mantiene en el archivo de datos. No incluye un panel de administración remoto. Para añadir una demo propia, enlaza su URL desplegada; para una demo integrada, añade un componente y regístralo en `DemoPage.jsx`.

Los temas respetan la elección guardada en el navegador y las animaciones respetan la preferencia de movimiento reducido. Los enlaces de demo y código se muestran solo cuando están definidos.
