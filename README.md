# El escritorio de Martín Fierro

Portfolio interactivo en React, Vite y TypeScript. La presentación ocupa el centro de la mesa; la libreta de una página agrupa las tecnologías y el botón central «Ver mis proyectos» da acceso a la colección; la tapa del portátil también permite entrar. El teléfono abre Contacto y la carpeta de documentos abre el CV.

Esta implementación está en `portfolio-escritorio`. `main` conserva el código anterior.

## Arranque

Usa Node.js 24 LTS y npm. No necesita servicios externos, credenciales ni variables de entorno.

```bash
git fetch origin
git switch portfolio-escritorio
npm ci
npm run dev
```

En el entorno en la nube:

```bash
npm ci --cache /workspace/.npm-cache
npm run dev -- --host 0.0.0.0
```

Comprobaciones y producción:

```bash
npm test
npm run lint
npm run typecheck
npm run format:check
npm run build
npm run preview
```

Las pruebas de navegación utilizan el soporte nativo de TypeScript de Node 22.18 o superior. Se recomienda Node 24, indicado en `.nvmrc`.

## La experiencia

- **Escritorio:** una escena fotorealista cenital con portátil cerrado, carpeta de CV, teléfono y libreta de tecnologías sobre una mesa clara. Ocupa todo el ancho y alto del navegador en ordenador. Los objetos son imágenes WebP independientes con transparencia; mantienen sus proporciones al adaptarse al formato. Todos los textos, iconos y botones siguen siendo HTML/SVG configurables y accesibles.
- **Presentación:** DM Sans identifica el nombre y el texto principal; Caveat da un aspecto de anotación a la libreta y la carpeta. Las fuentes se alojan localmente. La libreta agrupa las tecnologías por Frontend, Backend y Datos / SQL. Los iconos mantienen un trazo de boceto.
- **Accesos:** `ProjectEntry` presenta el botón central «Ver mis proyectos» con una pequeña nota y flecha en escritorio. El portátil conserva su monograma MF oscuro y permite entrar por su tapa. `DeskAccess` integra Contacto dentro del teléfono y el CV y su descripción sobre la carpeta. Cada objeto tiene un botón real y foco visible; las imágenes y sus controles escalan juntos sin deformarse ni perder la alineación.
- **Proyectos:** la tapa del portátil se mide al entrar. Una superficie digital se expande desde esa geometría hasta ocupar el navegador en unos 850 ms. La vuelta invierte el recorrido. Las transformaciones principales usan escala, desplazamiento y opacidad.
- **Índice editorial:** imágenes amplias y composición alternada. El hover levanta la imagen y muestra un acceso; ese acceso también se ve en dispositivos táctiles. Las fichas son páginas completas dentro del espacio digital, con una transición compartida de su portada.
- **CV:** la carpeta abre una ventana grande desde su posición. Un PDF configurado se puede visualizar y descargar. Si falta, se muestra un estado pendiente real.
- **Contacto:** el móvil abre una ventana con Email, LinkedIn y GitHub. Copiar email aparece solo cuando existe un email configurado; informa del éxito o del fallo del portapapeles.
- **Móvil:** una disposición vertical conserva la presentación arriba, la libreta con tecnologías agrupadas en el centro, el guardafolios y el teléfono a los lados, y el portátil cerrado abajo. Los textos y los accesos escalan con los objetos. Mantiene los mismos recorridos de entrada y vuelta.

## Estructura

```text
src/
  app/
    App.tsx                    Orquestación de vistas, ventanas y foco
    DigitalSurface.tsx         Transición entre tapa del portátil y espacio digital
  components/
    scene/                     Escena, presentación, libreta y accesos a los objetos
    projects/                  Índice, fichas, enlaces y galería
    panels/                    Ventanas de CV y Contacto
    ui/                        Elementos visuales reutilizables
  data/
    profile.ts                 Información personal y enlaces
    projects.ts                Contenido de proyectos
  hooks/                       Navegación, viewport, scroll y microinteracciones
  types/portfolio.ts           Contratos de los datos y vistas
  utils/navigation.ts          Rutas y geometría de la cámara
  styles/                      Tokens, base, escena, proyectos, ventanas y fuentes
public/projects/               Medios locales de proyectos
public/desk/                   Objetos WebP con transparencia
tests/navigation.test.mjs     Pruebas de rutas, geometría e integridad de medios
```

Los módulos se separan por responsabilidad. El contenido no está incrustado en los componentes; añadir un proyecto no exige modificar la navegación o la animación. Los estilos de cada experiencia se mantienen separados y los colores y fuentes comparten tokens.

El footer comparte el ancho de la escena y mantiene sus márgenes en cada formato. La libreta presenta Frontend en filas, Backend en columnas y SQL junto a su símbolo. En móvil utiliza una disposición compacta por grupos. La nota de la carpeta se reserva para escritorio; el acceso CV siempre está visible.

La geometría de la escena está en `src/styles/scene.css`. Cada objeto conserva su relación de aspecto y su contenido HTML se posiciona dentro del mismo componente. `DeskObjectArt` centraliza las imágenes decorativas de los objetos; `DeskIntroduction` contiene la presentación y `ProjectEntry`; `DeskNotebook` presenta las tecnologías sobre el papel. En ordenador, los tamaños consideran tanto el ancho como el alto disponibles. Por debajo de 900 px, los elementos pasan a una cuadrícula vertical con desplazamiento natural. No hay accesorios decorativos ni imágenes de fondo con controles superpuestos.

## Configurar tu información

Edita `src/data/profile.ts`:

- `email`: habilita el enlace y la acción de copiar.
- `linkedinUrl`: tu URL real.
- `githubUrl`: ya utiliza `https://github.com/martiinfiierro2`.
- `cvUrl`: ruta como `/cv-martin-fierro.pdf`, con el archivo en `public/`, o una URL accesible. Permanece `null` hasta que añadas el documento.
- `technologies`: React, JavaScript, Node.js, Java, Python y SQL. Cada entrada indica `category`: `frontend`, `backend` o `database`. Los títulos de los grupos están en `technologyCategories`; los grupos vacíos no se muestran.

No hay formularios que simulen envíos ni enlaces de contacto inventados.

## Añadir proyectos reales

Las tres entradas iniciales son **fichas de muestra**. Sus ilustraciones SVG son conceptuales, no capturas de aplicaciones publicadas. Los stacks de muestra son orientativos y no declaran experiencia real. No se han inventado fechas, métricas, clientes ni enlaces.

Edita `src/data/projects.ts` y utiliza el contrato `Project` de `src/types/portfolio.ts`. Cada ficha admite portada, descripción, tecnologías, aportación, reto, solución, funcionalidades, decisiones, aprendizajes, arquitectura y múltiples imágenes de galería. Sustituye los textos de ejemplo y establece `isSample: false` solo cuando documentes el proyecto real. Los campos `demoUrl` y `repositoryUrl` son opcionales; no se inventa un destino cuando faltan.

Guarda capturas optimizadas en `public/projects/`, preferiblemente WebP o AVIF, con textos alternativos descriptivos. Añadir elementos a `media` activa la galería con navegación por teclado. Sustituye el esquema orientativo de arquitectura por el real.

## Navegación y accesibilidad

- `#inicio`: escritorio.
- `#proyectos`: índice digital.
- `#proyecto/monitorizacion`: ficha directa. Permite recargar, compartir, Atrás y Adelante. Una ficha desconocida vuelve al índice; los hashes desconocidos muestran el escritorio.
- Los objetos y accesos son botones reales con nombres accesibles y foco visible.
- Las ventanas utilizan `dialog` nativo: foco contenido, cierre por Escape, clic en el fondo y restauración del foco al objeto de origen.
- Al abrir una ficha se enfoca su título; al volver se restaura el acceso y el desplazamiento del índice.
- Las superficies inactivas se marcan `inert` durante las transiciones. No hay un cursor personalizado que sustituya al del navegador.
- `prefers-reduced-motion` elimina parallax y recorridos de cámara, conservando todas las funciones.
- Las fuentes se alojan localmente. La interfaz de proyectos se carga de forma diferida; las imágenes del índice usan lazy loading. No hay animaciones continuas de fondo.

## Publicación

`npm run build` genera `dist/`. Vercel y Netlify disponen de fallback SPA incluido. La navegación interna utiliza hashes, así que las fichas se pueden compartir sin exigir rutas distintas al servidor. Si publicas bajo un subdirectorio, configura `base` en `vite.config.ts` y las rutas de medios para ese destino.
