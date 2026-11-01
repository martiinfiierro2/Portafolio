# Añadir un proyecto

Todas las tarjetas y fichas se generan desde `src/data/projects.js`. Para publicar otro proyecto, añade una entrada al array `projects`; no hay que crear una página ni añadir una ruta.

Campos:

| Campo | Uso |
| --- | --- |
| `slug` | Identificador único para `/proyectos/:slug` |
| `title`, `type`, `status` | Nombre, naturaleza y estado reales |
| `layout` | `mobile` para capturas verticales o `desktop` para horizontales |
| `summary` | Descripción breve de la tarjeta |
| `lead`, `context` | Introducción y párrafos de la ficha |
| `role` | Participación propia |
| `cardStack`, `stack` | Tecnologías de la tarjeta y de la ficha |
| `sourceHref` | Repositorio real |
| `views` | Grupos de capturas con `label`, `caption` e `images` |
| `notes` | Pares de título y explicación de las decisiones |
| `video` | Opcional: `src`, `poster`, `caption` |

Cada imagen tiene `src`, `alt` y `caption`. Los archivos se alojan en `public/projects/<slug>/`. La primera vista también ilustra la tarjeta. La composición depende de `layout`, no del nombre del proyecto.

Publica únicamente hechos y medios reales. Mantén la indicación de datos de demostración donde corresponda. La galería gestiona carga, errores y ampliación; el vídeo se solicita solo después de pulsar su botón.

La tarjeta compacta utiliza `cardStack` con logotipo y nombre. Los logotipos conocidos se definen en `src/data/technology-icons.js`; una tecnología nueva sin icono configurado conserva su nombre y un símbolo neutro. No es necesario cambiar el componente para añadir un proyecto.
