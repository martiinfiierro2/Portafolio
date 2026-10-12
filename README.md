# El escritorio de Martín Fierro

Portfolio construido en React, TypeScript y Vite. La portada reproduce un escritorio cenital de madera: cabecera con el monograma MF y navegación sencilla, presentación central, libreta de tecnologías, portátil cerrado, carpeta de CV y teléfono de contacto.

El desarrollo está en `portfolio-escritorio`; `main` conserva la versión anterior.

## Arranque

Node.js 24 LTS, indicado en `.nvmrc`. No requiere credenciales ni servicios externos.

```bash
git fetch origin
git switch portfolio-escritorio
npm ci
npm run dev
```

En la nube, inicia Vite con `npm run dev -- --host 0.0.0.0`.

```bash
npm test
npm run lint
npm run format:check
npm run build
```

## Recorrido

- **Portada:** la mesa y el flexo llenan la vista mediante `background.webp`. `DeskObjectArt` muestra cuatro SVG completos: `portatil.svg`, `libreta-tecnologias.svg`, `carpeta-cv.svg` y `telefono-contacto.svg`. La cabecera, la presentación y la indicación para explorar son elementos React/HTML; los textos ya incluidos en los objetos no se duplican con capas visibles de HTML. Los SVG conservan sus proporciones y la libreta mantiene una lista HTML accesible para lectores de pantalla.
- **Navegación:** los enlaces Inicio, Proyectos, CV y Contacto son botones reales, con foco visible. Proyectos y la tapa del portátil llevan a la misma colección.
- **Acceso a proyectos:** el portátil y el botón Proyectos cambian de pantalla directamente. No hay espera, apertura de tapa ni zoom de entrada o salida. Al volver al escritorio se restaura el foco en el botón que inició la navegación.
- **Colección:** cuadrícula de tarjetas con portada y resumen. Los filtros Todos, Web, Apps, Data y Otros usan el campo `collection` de cada proyecto. El filtro y el desplazamiento se conservan al volver de una ficha.
- **Ficha:** portada junto al resumen, tecnologías y enlaces; debajo, funcionalidades, herramientas y aprendizajes. El desarrollo técnico se amplía de forma opcional.
- **CV:** ventana con vista previa y enlaces al documento. El estado pendiente se muestra mientras `cvUrl` sea `null`.
- **Contacto:** enlaces a las redes configuradas y formulario para preparar un correo. No hay envío simulado ni servidor de correo: al configurar `email`, el formulario abre la aplicación de correo con el mensaje. Hasta entonces, el envío permanece deshabilitado.
- **Móvil:** el monograma y los cuatro enlaces siguen visibles. La presentación, el portátil y la libreta se apilan; la carpeta y el teléfono permanecen accesibles como objetos independientes. Se utilizan los mismos cuatro SVG que en ordenador, respetando su inclinación y sus proporciones.

## Módulos

```text
src/
  app/                        Orquestación y transición al espacio digital
  components/
    navigation/               Cabecera compartida con navegación
    scene/                    Presentación, libreta, portátil y accesos
    projects/                 Filtros, tarjetas, fichas, enlaces y galería
    panels/                   Ventanas de CV, Contacto y formulario
  data/                       Perfil y proyectos
  hooks/                      Navegación, viewport y bloqueo de desplazamiento
  types/                      Contratos de datos
  utils/                      Rutas y geometría
  styles/                     Tokens y estilos por experiencia
public/desk/                  Fondo del escritorio y fotografías de referencia
public/desk/svg/              Objetos vectoriales independientes y galería
scripts/                     Generador y contornos vectoriales de las fuentes
public/projects/              Portadas conceptuales de muestra
```

El contenido se configura en `src/data/profile.ts` y `src/data/projects.ts`. Los componentes están separados por elementos y responsabilidad; las ventanas no dependen de la escena y las tarjetas no controlan la navegación global.

## Contenido pendiente

`email`, `linkedinUrl` y `cvUrl` permanecen vacíos hasta que se añadan datos reales. GitHub ya enlaza a `martiinfiierro2`.

Las cuatro fichas son muestras: sus imágenes SVG son ilustraciones conceptuales. Sustituye el contenido y los medios por proyectos documentados, añade `demoUrl` y `repositoryUrl`, y cambia `isSample` a `false`. No hay fechas, métricas o enlaces inventados.

Para añadir un CV, guarda el PDF en `public/` y establece `cvUrl`, por ejemplo `/cv-martin-fierro.pdf`.

## Navegación y accesibilidad

- `#inicio`, `#proyectos` y `#proyecto/slug` permiten recargar y compartir vistas. Atrás y Adelante mantienen la navegación.
- Las superficies inactivas son `inert` durante las transiciones.
- Las ventanas utilizan `dialog` nativo, cierre con Escape y restauración del foco.
- Las tarjetas recuperan el foco al volver del detalle.
- `prefers-reduced-motion` reduce las animaciones de las fichas y las ventanas. El acceso a proyectos es directo en todos los casos.
- Fuentes, fondo y objetos SVG locales; la colección se carga de forma diferida.

## Publicación

`npm run build` genera `dist/`. Los archivos de fallback para Netlify y Vercel están incluidos. Al desplegar bajo un subdirectorio, configura `base` y las rutas de los medios para ese destino.

## Fidelidad a la referencia

La composición sigue la referencia de escritorio: madera clara, acentos en cian, presentación con DM Sans, anotaciones con Caveat, portátil cerrado y tecnologías agrupadas con iconos. Los cuatro objetos son dibujos vectoriales con degradados y sombras; no conservan la textura fotográfica exacta de los originales. La disposición se adapta al formato para evitar recortes y deformaciones.

Para editar los objetos, consulta `public/desk/svg/README.md`. El generador conserva las etiquetas como texto editable en su código y las exporta como trazados SVG. El nombre, la profesión, la descripción y los controles de navegación se editan en sus componentes React.
