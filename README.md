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
npm test
npm run format:check
```

El código usa una indentación de dos espacios. Para aplicar el formato automáticamente:

```bash
npm run format
```

## Organización

- `FloppyPortfolio.jsx`: conecta los datos, el reproductor y los componentes; no implementa sus detalles visuales.
- `Header.jsx`: marca y navegación. Recibe `name`, `githubUrl`, `view`, `busy` y las acciones `onProfile`, `onProjects`, `onContact`.
- `Footer.jsx`: créditos, estado y expulsión. Recibe `name`, `disk`, `phase`, `busy`, `onEject`, `onAnimationComplete`.
- `FloppyReader.jsx`: ranura y animación física; comunica cuándo termina una inserción o expulsión, sin modificar el estado.
- `PortfolioContent.jsx`: cambio de pantalla, desplazamiento y foco accesible.
- `views/`: una pantalla por módulo: presentación, colección y detalle del proyecto. Reciben sus datos y acciones mediante props.
- `ContactDialog.jsx`: diálogo controlado con `open`, `onClose` y `githubUrl`; gestiona su referencia internamente.
- `src/hooks/useFloppyPlayer.js`: acciones del reproductor. Su reducer mantiene la navegación, el disco activo y las fases de conexión.
- `src/hooks/playerReducer.test.js`: verifica las transiciones y protege frente a clics y finalizaciones tardías durante las animaciones.
- `src/components/TechnologyList.jsx`: lista de tecnologías compartida por perfil y proyectos.
- `src/data/`: información personal y colección de proyectos.
- `floppy.css` y `src/index.css`: estilos compartidos del reproductor y base de la aplicación.

Los componentes usan exportaciones por defecto e importaciones sin llaves; el reducer exporta sus funciones por nombre. Los módulos visuales no reciben setters de estado ni referencias internas del reproductor. Para ampliar la colección basta con añadir los datos de un proyecto; la secuencia de conexión se mantiene en un único lugar.

## Navegación

El perfil aparece al abrir la página, sin fotografía y con la unidad vacía. No hay un disquete de perfil. «Proyectos» y «Expulsar» llevan a la colección; elegir un disco carga su contenido. «Perfil» vuelve a la presentación. «Contacto» abre un diálogo independiente. La expulsión está desactivada cuando la unidad está vacía.

Las animaciones de inserción y expulsión respetan la preferencia de movimiento reducido. El diseño se adapta a escritorio y móvil, y mantiene el tamaño del reproductor al cambiar de pantalla.

La portada usa una composición tipográfica sencilla. La colección muestra disquetes grandes, sin tarjetas alrededor; el nombre, la descripción breve y las tecnologías están en la etiqueta de cada disco. Las fichas de proyecto presentan el contenido directamente. El perfil se abre desde la navegación; si hay un proyecto insertado, primero se expulsa su disquete.

Los proyectos actuales son ejemplos identificados como tales. Los enlaces de demo, código y CV quedan pendientes hasta añadir contenido real.
