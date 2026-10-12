# Boceto móvil con PNG · Martín Fierro

Rama independiente `boceto-movil-png`, creada desde `portada-desde-cero`.

Este boceto reproduce únicamente la estética de la web dentro del teléfono de referencia. No incluye marco exterior, barra de estado, apertura de proyectos, descarga de CV, formulario ni navegación funcional.

La madera, la lámpara apagada, la libreta, el portátil, la carpeta CV y el móvil son PNG independientes. El MF de la cabecera, el menú, la presentación y las anotaciones son elementos de React y CSS. Las sombras de ventana siguen en una capa decorativa común que respeta las transparencias de los objetos.

En un móvil vertical, la portada ocupa la pantalla completa. En ordenador se presenta como una composición vertical centrada, sin marco de teléfono, para revisar el boceto. Los objetos se dimensionan respecto a esa composición para mantener sus proporciones.

## Arranque

Node.js 24 LTS, indicado en `.nvmrc`.

```bash
npm ci
npm run dev
```

Comprobaciones:

```bash
npm run build
npm run lint
npm run format:check
```

## Estructura

- `src/components/MobileStudy.jsx`: composición de la portada.
- `src/components/SceneHeader.jsx`: MF y símbolo de menú.
- `src/components/SceneIntro.jsx`: nombre, profesión y presentación.
- `src/components/SceneObjects.jsx`: catálogo de PNG independientes.
- `src/components/ProjectAnnotation.jsx`: nota y flecha hacia el portátil.
- `src/components/Daylight.jsx`: capa de iluminación compartida.
- `src/styles.css`: posiciones, tamaños y tipografía DM Sans / Caveat.
- `public/desk/*.png`: imágenes de la escena.

`portada-desde-cero` conserva la versión anterior del escritorio y su iluminación.
