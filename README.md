# El escritorio de Martín Fierro

Portfolio interactivo en React, Vite y TypeScript. El ordenador muestra la presentación y se convierte en la interfaz de proyectos; el teléfono abre Contacto, la carpeta abre el CV y el disco externo muestra `developer_info.json`.

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

- **Escritorio:** una escena fotorealista completa, con una mesa blanca, portátil, teléfono, carpeta, disco externo y elementos de trabajo bajo la misma luz. Dos imágenes WebP locales componen las versiones horizontal y vertical. Los objetos forman parte de la escena; la información del portátil sigue siendo HTML legible, seleccionable y configurable.
- **Accesos:** `DeskAccess` coloca botones reales sobre el teléfono, la carpeta y el disco. Sus etiquetas visibles y el foco indican qué se puede abrir. La imagen y los controles escalan juntos con coordenadas proporcionales; no hay zonas de clic en píxeles fijos. El teclado también permite entrar en los proyectos.
- **Proyectos:** la pantalla física se mide al entrar. Una superficie digital se expande desde esa geometría hasta ocupar el navegador en unos 850 ms. La vuelta invierte el recorrido. Las transformaciones principales usan escala, desplazamiento y opacidad.
- **Índice editorial:** imágenes amplias y composición alternada. El hover levanta la imagen y muestra un acceso; ese acceso también se ve en dispositivos táctiles. Las fichas son páginas completas dentro del espacio digital, con una transición compartida de su portada.
- **CV:** la carpeta abre una ventana grande desde su posición. Un PDF configurado se puede visualizar y descargar. Si falta, se muestra un estado pendiente real.
- **Contacto:** el móvil abre una ventana con Email, LinkedIn y GitHub. Copiar email aparece solo cuando existe un email configurado; informa del éxito o del fallo del portapapeles.
- **Stack:** el LED se ilumina al consultar información adicional en un formato JSON discreto.
- **Móvil:** una escena vertical propia muestra el ordenador arriba y los tres accesos debajo, sobre la misma mesa. En pantallas pequeñas se priorizan nombre, profesión, tecnologías y acceso a proyectos; la descripción permanece disponible para lectores de pantalla. Mantiene los mismos recorridos de entrada y vuelta.

## Estructura

```text
src/
  app/
    App.tsx                    Orquestación de vistas, ventanas y foco
    DigitalSurface.tsx         Transición entre pantalla física y espacio digital
  components/
    scene/                     Escena, pantalla HTML y accesos a los objetos
    projects/                  Índice, fichas, enlaces y galería
    panels/                    Ventanas de CV, Contacto y Stack
    ui/                        Elementos visuales reutilizables
  data/
    profile.ts                 Información personal y enlaces
    projects.ts                Contenido de proyectos
  hooks/                       Navegación, viewport, scroll y microinteracciones
  types/portfolio.ts           Contratos de los datos y vistas
  utils/navigation.ts          Rutas y geometría de la cámara
  styles/                      Tokens, base, escena, proyectos, ventanas y fuentes
public/projects/               Medios locales de proyectos
public/desk/                   Escenas WebP de escritorio y móvil
tests/navigation.test.mjs     Pruebas de rutas, geometría e integridad de medios
```

Los módulos se separan por responsabilidad. El contenido no está incrustado en los componentes; añadir un proyecto no exige modificar la navegación o la animación. Los estilos de cada experiencia se mantienen separados y los colores y fuentes comparten tokens.

La geometría visual de la escena está en `src/styles/scene.css`: las variables `--screen-*` alinean `LaptopScreen` con la pantalla fotografiada y las clases `desk-access-*` posicionan los botones. El breakpoint de 900 px coincide con el `source` del elemento `picture`. Al sustituir una escena, conserva su relación de aspecto y recalibra esos porcentajes; no uses recortes con `object-fit: cover`, que separarían los controles de sus objetos.

## Configurar tu información

Edita `src/data/profile.ts`:

- `email`: habilita el enlace y la acción de copiar.
- `linkedinUrl`: tu URL real.
- `githubUrl`: ya utiliza `https://github.com/martiinfiierro2`.
- `cvUrl`: ruta como `/cv-martin-fierro.pdf`, con el archivo en `public/`, o una URL accesible. Permanece `null` hasta que añadas el documento.
- `currentlyLearning`: alimenta el disco externo cuando hay contenido.
- `technologies`: las seis tecnologías de la portada solicitadas: React, JavaScript, Node.js, Java, Python y SQL.

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
