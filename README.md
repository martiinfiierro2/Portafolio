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

Cada página o sección principal reúne su contenido en un JSX y tiene al lado un CSS con el mismo nombre. El título y la ilustración de la portada se editan juntos; la galería y su visor forman parte de la ficha del proyecto.

| Apartado                  | Componente                         | Estilos                            |
| ------------------------- | ---------------------------------- | ---------------------------------- |
| Cabecera y menú           | `src/Header.jsx`                   | `src/Header.css`                   |
| Portada, enfoque y perfil | `src/Home.jsx`                     | `src/Home.css`                     |
| Catálogo y filtros        | `src/components/Projects.jsx`      | `src/components/Projects.css`      |
| Ficha y galería           | `src/components/ProjectDetail.jsx` | `src/components/ProjectDetail.css` |
| Página de demos           | `src/components/DemoPage.jsx`      | `src/components/DemoPage.css`      |
| Contacto y pie            | `src/Footer.jsx`                   | `src/Footer.css`                   |

`src/index.css` contiene únicamente los estilos compartidos: fuentes, temas, tipografía, controles, etiquetas de proyectos y reglas generales de adaptación y accesibilidad. Cada componente importa su propio CSS, que incluye también sus ajustes para móvil; no hay un archivo responsive separado.

Las tres demos de `src/components/demos/` conservan sus componentes porque son aplicaciones independientes. Comparten `DemoPage.css` dentro del mismo apartado, sin crear un CSS por cada detalle. `Reveal.jsx` y los hooks de navegación son utilidades reutilizadas en varias páginas.

El contenido de las fichas está en `src/data/projects.js` y las ilustraciones en `public/illustrations/`. Las fuentes locales de `src/assets/fonts/` son Clash Display en negrita para títulos y Manrope para textos y controles.

Consulta [cómo añadir proyectos](docs/PROJECTS.md) para crear nuevas fichas sin duplicar componentes. Cada proyecto tiene una dirección propia, por ejemplo `#/proyectos/taskflow`, que se puede abrir directamente o compartir.

## Demos de ejemplo

TaskFlow guarda tareas únicamente en el navegador. Pulse API simula respuestas JSON en memoria. Media Lab genera composiciones con CSS y permite ajustar su presentación. Son ejemplos identificados en la interfaz; no usan un servidor, cuentas ni datos de clientes.

El catálogo se mantiene en el archivo de datos. No incluye un panel de administración remoto. Para añadir una demo propia, enlaza su URL desplegada; para una demo integrada, añade un componente y regístralo en `DemoPage.jsx`.

Los temas respetan la elección guardada en el navegador y las animaciones respetan la preferencia de movimiento reducido. Los enlaces de demo y código se muestran solo cuando están definidos.
