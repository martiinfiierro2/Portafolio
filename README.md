# Portfolio de Martín Fierro

Portfolio personal en React y Vite, con una colección interactiva de tarjetas de proyectos. Esta versión sustituye completamente la interfaz anterior en la rama `cambio_portafolio`. La rama `work` conserva el portfolio anterior.

## Desarrollo

Requiere Node.js 22.12 o superior y npm. No requiere servicios externos, base de datos, variables de entorno ni credenciales para arrancar.

```bash
npm ci
npm run dev
```

Para verificar y preparar producción:

```bash
npm test
npm run lint
npm run format:check
npm run build
npm run preview
```

En el entorno en la nube, si la caché habitual de npm no es escribible:

```bash
npm ci --cache /workspace/.npm-cache
npm run dev -- --host 0.0.0.0
```

## Estética

Fondo pistacho `#E6EDCE` con manchas suaves de lima y salvia. Las cartas y el detalle abierto mantienen el mismo blanco sólido `#FFFFFF`. Texto verde profundo `#29382B`, secundarios `#53604C` y acentos frambuesa `#983D59` para selección, enlaces y acciones. Una textura de papel muy fina y manchas crema y salvia dan profundidad al fondo. El inicio incorpora un motivo discreto de círculos; las cartas conservan sus portadas provisionales y ganan un canto fino y sombras en varias capas, sin transparencia ni reflejos de cristal.

Cormorant Garamond identifica el nombre principal con el apellido en cursiva; Space Grotesk se utiliza en los títulos y DM Sans en textos y controles. Las tres fuentes se alojan localmente. Las cartas tienen una composición editorial con folio grande, icono compacto, título protagonista y tecnologías en etiquetas. La carta central es mayor y frontal, las vecinas giran en perspectiva y el carrusel se puede arrastrar con ratón o deslizar en móvil sin impedir el scroll vertical. Las cartas muestran símbolo, título, descripción breve y hasta tres tecnologías. Al abrirlas se expanden al detalle, con resumen y portada en dos columnas en escritorio y apilados en móvil.

## Página única

- `/`: presentación con nombre y profesión; al deslizar, el nombre se difumina y aparece la baraja de proyectos, sin inspector lateral.
- `/#proyectos`: colección navegable con flechas, teclado y gestos, centrada bajo la cabecera al pulsar Proyectos. Al abrir una tarjeta, el caso de estudio se expande desde sus dimensiones y posición hasta un diálogo sobre la página. Una sola animación de Framer Motion expande el diálogo desde la geometría de la carta y lo devuelve al cerrar. Las aperturas duplicadas se bloquean; Escape puede interrumpir la expansión sin dejar la página bloqueada. El detalle se desplaza dentro de una superficie de altura estable. Al cerrarlo se recuperan el foco, la tarjeta y la posición de scroll.
- `/#contacto`: contacto al final de la misma página.
- Las rutas anteriores `/projects` y `/contact` redirigen a sus secciones; `/cv` vuelve al inicio. `/projects/:slug` abre el proyecto sobre la página principal mediante `?project=slug#proyectos`. `/index.html` sigue redirigiendo a Inicio. Las rutas antiguas o no reconocidas vuelven a `/` y sustituyen la entrada del historial, evitando que un enlace guardado deje al visitante en una pantalla 404.

## Organización

```text
src/
  App.jsx                         Rutas y estado compartido de selección
  components/
    layout/                       Estructura de página y footer
    navigation/                   Header y menú móvil accesible
    project-deck/                 Tarjetas, controles, diálogo y galería
    ui/                           Tecnologías, enlaces y esquema de arquitectura
  data/
    profile.js                    Datos personales y enlaces
    projects.js                   Todas las fichas y sus medios
  hooks/                          Selección, títulos y navegación con transición
  pages/                          Página principal y contenido de ficha y contacto
  styles/                         Estética global, responsive y fuentes locales
  utils/                          Cálculo circular de la baraja y gestos, con pruebas
public/
  covers/                         Ilustraciones conceptuales SVG
  favicon.svg
  _redirects                      Fallback SPA para Netlify
vercel.json                       Fallback SPA para Vercel
```

## Contenido pendiente de completar

Las cinco fichas iniciales son **muestras**, no proyectos publicados ni una declaración de experiencia real. Sus stacks son orientativos. Las ilustraciones SVG no son capturas de aplicaciones existentes. No se han inventado métricas, empresas, fechas, títulos académicos ni enlaces a demos o repositorios.

En `src/data/profile.js`, completa:

- `email` y `linkedinUrl`.
- Tu presentación y disponibilidad, si quieres ajustar el texto.

En `src/data/projects.js`, sustituye las muestras por tus proyectos. Cada ficha contiene `slug`, `number`, `title`, `shortDescription`, `fullDescription`, `icon`, `color`, `tint`, `technologies`, `technologyNote`, `type`, `role`, `status`, `year`, `cover`, `coverAlt`, `media`, `problem`, `solution`, `features`, `architecture`, `architectureNote`, `decisions`, `learnings`, `demoUrl`, `repositoryUrl`, `featured` e `isPlaceholder`.

Confirma el contenido antes de establecer `isPlaceholder: false`. Reemplaza los textos pendientes y las imágenes conceptuales, incluida `architectureNote`, la nota de arquitectura del caso de estudio. Usa `technologyNote` para explicar la elección del stack. Los enlaces ausentes se muestran deshabilitados, sin destinos ficticios.

Las entradas de `media` usan `id`, `label`, `type`, `src`, `alt` y `caption`. `type: 'architecture'` utiliza los nodos de `architecture`; `presentation: 'mobile'` presenta una imagen vertical. Guarda capturas optimizadas en `public/projects/` y referencia sus rutas desde los datos. Elimina fichas de muestra que no representen proyectos reales. Para más de siete proyectos, los puntos se sustituyen automáticamente por un selector.

## Interacción y accesibilidad

El header muestra un indicador frambuesa del progreso de lectura. Las cartas laterales tienen menor escala, sombras más discretas y símbolos menos saturados; sus textos conservan contraste. El cierre de contacto utiliza una frase grande y únicamente enlaces reales configurados, sin filas de datos pendientes.

- Flechas, puntos o selector para cambiar de tarjeta; flechas del teclado y Enter en la baraja.
- Deslizamiento horizontal en móvil, conservando el scroll vertical.
- Selección recordada en `sessionStorage` al volver a la colección de Proyectos.
- Tabs de galería con flechas, Inicio y Fin; menú móvil con cierre por Escape y foco gestionado por un diálogo nativo.
- Anclas para acceder a proyectos y contacto en la misma página. El detalle usa un diálogo nativo con cierre por Escape, foco contenido y restauración del foco al cerrar.
- `prefers-reduced-motion` elimina el desplazamiento animado, el desenfoque y las animaciones de apertura y cierre. El header no tiene separador. La apertura de las cartas no depende de la API View Transitions.
- Fuentes Cormorant Garamond, Space Grotesk y DM Sans alojadas localmente; iconos Lucide y medios SVG ligeros. Las capturas secundarias se cargan de forma diferida.

## Publicación

Ejecuta `npm run build` y publica `dist/`. Vercel y Netlify cuentan con fallback incluido para permitir abrir o recargar rutas como `/projects/calendar`. En otros servidores, configura las rutas desconocidas para devolver `index.html`; no sustituyas los archivos estáticos existentes. GitHub Pages requiere configurar explícitamente rutas y base si se publica bajo un subdirectorio.

No hay un formulario que simule envíos: Contacto usa enlaces directos. Añadir un formulario requiere conectar un servicio real y sus estados de envío.
