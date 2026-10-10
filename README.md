# Portafolio de Martín Fierro

Portafolio en React y Vite con una colección de disquetes: cada disco abre el perfil o un proyecto. El reproductor ocupa todo el contenedor, con cabecera y ranura visibles y desplazamiento del contenido central cuando hace falta.

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
- `src/img/martin.jpg`: fotografía del perfil.

## Navegación

El perfil aparece al abrir la página. «Proyectos» y «Expulsar» llevan a la colección; elegir un disco carga su contenido. «Perfil» vuelve a la presentación. «Contacto» abre un diálogo independiente. La expulsión está desactivada cuando la unidad está vacía.

Las animaciones de inserción y expulsión respetan la preferencia de movimiento reducido. El diseño se adapta a escritorio y móvil, y mantiene el tamaño del reproductor al cambiar de pantalla.

La interfaz combina tipografía moderna, fondo marfil, navegación en pestañas y tarjetas ligeras con el aspecto físico de los disquetes y la ranura. El perfil conserva detalles de papel y una firma tipográfica; las fichas de proyecto presentan el contenido directamente.

Los proyectos actuales son ejemplos identificados como tales. Los enlaces de demo, código y CV quedan pendientes hasta añadir contenido real.
