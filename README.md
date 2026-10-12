# El escritorio de Martín Fierro

Portfolio construido en React, TypeScript y Vite. La portada reproduce un escritorio cenital de madera: navegación en cuatro post-its, presentación central, libreta de tecnologías, portátil cerrado, carpeta de CV y teléfono de contacto.

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

- **Portada:** la fotografía local `public/desk/cover.webp` contiene los objetos sin texto. Los títulos, anotaciones, etiquetas y enlaces son HTML/SVG accesibles. La composición conserva la proporción 16:9 y se centra en el espacio disponible. En otros formatos el fondo prolonga visualmente la mesa.
- **Navegación:** los post-its Inicio, Proyectos, CV y Contacto son botones reales, con foco visible. Proyectos y la tapa del portátil llevan a la misma colección.
- **Apertura:** el portátil descubre su teclado y levanta la tapa con una transformación 3D; después, la superficie de proyectos se expande desde su posición. El movimiento reducido conserva el recorrido sin la animación.
- **Colección:** cuadrícula de tarjetas con portada y resumen. Los filtros Todos, Web, Apps, Data y Otros usan el campo `collection` de cada proyecto. El filtro y el desplazamiento se conservan al volver de una ficha.
- **Ficha:** portada junto al resumen, tecnologías y enlaces; debajo, funcionalidades, herramientas y aprendizajes. El desarrollo técnico se amplía de forma opcional.
- **CV:** ventana con vista previa y enlaces al documento. El estado pendiente se muestra mientras `cvUrl` sea `null`.
- **Contacto:** enlaces a las redes configuradas y formulario para preparar un correo. No hay envío simulado ni servidor de correo: al configurar `email`, el formulario abre la aplicación de correo con el mensaje. Hasta entonces, el envío permanece deshabilitado.
- **Móvil:** los cuatro post-its siguen visibles. La presentación, el portátil y la libreta se apilan; la carpeta y el teléfono permanecen accesibles como objetos independientes. Las imágenes conservan sus proporciones.

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
public/desk/                  Fondo, fotografía fuente del portátil y objetos transparentes
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
- `prefers-reduced-motion` elimina la apertura 3D y los movimientos de cámara.
- Fuentes y fotografías locales; la colección se carga de forma diferida.

## Publicación

`npm run build` genera `dist/`. Los archivos de fallback para Netlify y Vercel están incluidos. Al desplegar bajo un subdirectorio, configura `base` y las rutas de los medios para ese destino.
