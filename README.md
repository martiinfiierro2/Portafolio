# Portfolio de Martín Fierro · portada desde cero

Rama `portada-desde-cero`. React con JavaScript y JSX, sin TypeScript.

La portada contiene el escritorio fotográfico, el nombre Martín Fierro, la navegación y cuatro PNG independientes: portátil, libreta de tecnologías, carpeta CV y teléfono de contacto. Las secciones y sus acciones se desarrollarán en los siguientes pasos.

La escena diurna usa un fondo con el flexo apagado. Las sombras de ventana se dibujan en una capa decorativa común sobre la madera y los objetos; el texto y la navegación permanecen por encima para conservar su legibilidad. El fondo y esa capa comparten proporciones de referencia y el mismo recorte centrado.

En ordenador, las posiciones y los tamaños se calculan respecto al contenedor del escritorio, teniendo en cuenta también su altura. En móvil vertical, la libreta queda arriba a la derecha, el portátil centrado debajo y el CV y el teléfono en las esquinas inferiores. Los cuatro objetos caben dentro de una pantalla, sin desplazamiento, manteniendo las proporciones de sus PNG. En horizontal se usa la composición de escritorio con ajustes para ventanas de poca altura.

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

- `src/App.jsx`: entrada de la aplicación.
- `src/components/DeskScene.jsx`: composición del escritorio, nombre y objetos.
- `src/components/Daylight.jsx`: sombras de ventana e iluminación ambiental compartida.
- `src/components/Navigation.jsx`: menú y disponibilidad de cada sección.
- `src/styles.css`: tipografía, posiciones y adaptación a móvil.
- `public/desk/background.webp`: madera y flexo apagado, con luz diurna difusa.
- `public/desk/*.png`: objetos fotográficos con fondo transparente.

La rama `portfolio-escritorio` conserva la versión anterior. La prueba fotográfica que estaba en curso se ha guardado en un stash local identificado como «Prueba fotográfica antes de la portada desde cero».
