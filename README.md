# Portafolio de Martín Fierro

Portafolio en React y Vite con una colección de disquetes: cada disco abre un proyecto. El reproductor ocupa todo el contenedor, con cabecera y ranura visibles y desplazamiento del contenido central cuando hace falta.

## Desarrollo

```bash
npm ci
npm run dev
```

La página principal `/` abre el perfil. Los enlaces anteriores `/disquetes` y `/disquetes/` también muestran el portafolio.

```bash
npm run build
npm run lint
npm run format:check
```

El código usa una indentación de dos espacios. Para aplicar el formato automáticamente:

```bash
npm run format
```

## Organización

- `src/components/portfolio/`: pantallas, disquetes SVG, controles, animaciones y estilos del reproductor.
- `src/components/TechnologyIcon.jsx`: iconos de las tecnologías.
- `src/data/profile.js`: información personal y enlace al CV.
- `src/data/disks.js`: colección y contenido de los proyectos.
- `src/index.css`: estilos base.

## Navegación

El perfil aparece al abrir la página, sin fotografía y con la unidad vacía. No hay un disquete de perfil. «Proyectos» y «Expulsar» llevan a la colección; elegir un disco carga su contenido. «Perfil» vuelve a la presentación. «Contacto» abre un diálogo independiente. La expulsión está desactivada cuando la unidad está vacía.

Las animaciones de inserción y expulsión respetan la preferencia de movimiento reducido. El diseño se adapta a escritorio y móvil, y mantiene el tamaño del reproductor al cambiar de pantalla.

La portada usa una composición tipográfica sencilla. La colección muestra disquetes grandes, sin tarjetas alrededor; el nombre, la descripción breve y las tecnologías están en la etiqueta de cada disco. Las fichas de proyecto presentan el contenido directamente. El perfil se abre desde la navegación; si hay un proyecto insertado, primero se expulsa su disquete.

Los proyectos actuales son ejemplos identificados como tales. Los enlaces de demo, código y CV quedan pendientes hasta añadir contenido real.
