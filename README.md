# Portfolio · Martín Fierro

React + Vite. Una portada con inicio, proyectos, sobre mí y contacto completos, más una ficha independiente para cada proyecto. Claro y oscuro, escritorio SVG original animado y navegación adaptable.

## Desarrollo

```sh
npm install
npm run dev -- --port 5174 --strictPort
```

Abrir http://localhost:5174/. La cabecera flotante y el contenido comparten un ancho máximo de 1100 px. Hasta 760 px la navegación se despliega desde el botón Menú; el interruptor de tema permanece visible.

## Organización

- `src/pages`: portada y ficha de proyecto.
- `src/components/sections`: contenido completo de proyectos, sobre mí y contacto.
- `src/components`: navegación, tarjetas, galería ampliable y vídeo bajo petición.
- `src/data/projects.js`: única definición de los proyectos publicados y sus recursos.
- `src/data/contact.js`: canales reales disponibles.
- `src/styles`: tokens, base, portada/navegación, fichas y transiciones.

Las secciones tienen enlaces `/#inicio`, `/#proyectos`, `/#sobre-mi` y `/#contacto`. Las rutas antiguas `/proyectos`, `/sobre-mi` y `/contacto` redirigen a esas secciones. Las fichas conservan `/proyectos/:slug`. Se han retirado las demos de ejemplo y sus rutas.

## Verificación

```sh
npm run lint
npm run check:structure
npm run build
```

Los recorridos de Playwright CLI y su procedimiento están en `scripts/qa` y `docs/qa/README.md`. El vídeo no se solicita hasta pulsar «Ver recorrido». Las fuentes son locales; el tema se guarda en `localStorage`. Las animaciones respetan movimiento reducido.

Para añadir un proyecto, consultar `docs/PROJECTS.md`. En un alojamiento estático, todas las rutas de la aplicación deben reescribirse a `index.html`.

Los SVG del escritorio y su licencia se conservan sin cambios. `scripts/build-personal-desk.mjs` es su fuente editable y requiere la skill anatomy-asset para regenerarlos; no forma parte de la compilación normal.

## CV y presentación de proyectos

Para publicar el CV, añade el PDF real en `public/cv.pdf` y establece `cv: "/cv.pdf"` en `src/data/contact.js`. «Mi CV» abrirá el documento y permitirá descargarlo como `CV-Martin-Fierro.pdf`. Sin PDF configurado, el modal indica que todavía no está disponible.

Las tarjetas se ordenan como imagen, título, descripción, tecnologías y Abrir proyecto. La cuadrícula tiene dos columnas desde 600 px y una en móvil. Los logotipos se sirven localmente mediante TechnologyList; su catálogo y colores viven en `src/data/technology-icons.js`, con licencia en `public/licenses/simple-icons.md`.
