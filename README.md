# Portfolio de Martín Fierro · portada desde cero

Rama `portada-desde-cero`. React con JavaScript y JSX, sin TypeScript.

La página contiene únicamente el fondo fotográfico del escritorio, el nombre Martín Fierro y la navegación. No incluye objetos, proyectos, ventanas, animaciones ni código de las versiones anteriores.

Inicio enlaza a la portada. Proyectos, CV y Contacto están preparados visualmente y deshabilitados hasta desarrollar esas secciones, para evitar enlaces a páginas inexistentes.

## Arranque

Node.js 24 LTS, indicado en `.nvmrc`.

```bash
npm ci
npm run dev
```

Para comprobar el proyecto:

```bash
npm run build
npm run lint
npm run format:check
```

## Archivos

- `src/App.jsx`: fondo y nombre.
- `src/components/Navigation.jsx`: menú y disponibilidad de cada sección.
- `src/styles.css`: tipografía, posiciones y adaptación a móvil.
- `public/desk/background.webp`: fondo existente con madera y flexo.

La rama `portfolio-escritorio` conserva la versión anterior. La prueba fotográfica que estaba en curso se ha guardado en un stash local identificado como «Prueba fotográfica antes de la portada desde cero».
