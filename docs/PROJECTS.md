# Añadir un proyecto al portfolio

El catálogo se define en `src/data/projects.js`. Las tarjetas y las fichas se
generan a partir de ese array; no necesitas duplicar componentes.

## 1. Crea una entrada

Copia una entrada existente y utiliza un `slug` único, en minúsculas y con
guiones. Su dirección será `/proyectos/tu-proyecto`.

```js
{
  slug: "tu-proyecto",
  title: "Nombre del proyecto",
  category: "Web",
  type: "Aplicación web",
  status: "En desarrollo",
  isExample: false,
  summary: "Una descripción breve para la tarjeta.",
  overview: "Contexto, objetivo y alcance real del proyecto.",
  role: "Tu participación concreta",
  stack: ["React", "Node.js"],
  demoHref: "https://tu-demo.example",
  demoLabel: "Abrir demo",
  sourceHref: "https://github.com/tu-usuario/tu-proyecto",
  problem: "Qué problema querías resolver.",
  solution: "Cómo lo abordaste.",
  architecture: [
    { title: "Una decisión técnica", description: "El motivo y su resultado." },
  ],
  development: [
    { title: "Primer paso", description: "Qué construiste y cómo." },
  ],
  features: ["Una funcionalidad que se pueda explorar"],
  gallery: [
    {
      src: "/projects/tu-proyecto/escritorio.png",
      alt: "Descripción concreta de lo que muestra la captura",
      caption: "Vista en escritorio",
      type: "desktop",
    },
  ],
}
```

Sustituye las direcciones del ejemplo antes de publicar. Si no tienes una demo,
un repositorio público o capturas, omite esos campos. La ficha solo muestra las
secciones y los botones para los que existen datos. No añadas enlaces `#` como
relleno.

## 2. Añade capturas

Copia las imágenes en `public/projects/`. El valor de `src` comienza en
`/projects/`, sin el prefijo `public`. Usa nombres estables, imágenes optimizadas
y un texto `alt` que describa la pantalla. Las capturas se pueden ampliar en un
diálogo que admite teclado, Escape y retorno del foco a la miniatura.

`type: "mobile"` utiliza el formato vertical en la galería. Para otras capturas,
usa `"desktop"` u omite `type`.

## 3. Documenta el trabajo real

- `summary`: una frase breve que explique el resultado.
- `overview`: contexto, usuarios y alcance.
- `problem` y `solution`: necesidad y respuesta concreta.
- `architecture`: decisiones técnicas y sus motivos.
- `development`: pasos del desarrollo, en orden.
- `features`: funcionalidades disponibles.
- `role`: tu aportación, especialmente en trabajos de equipo.
- `status`: estado actual, sin afirmar un despliegue que no existe.

Las categorías se extraen automáticamente de las entradas. El buscador consulta
el título, la descripción breve, la categoría y el stack. Una categoría nueva
aparece en los filtros sin cambios en el componente.

## Demos de ejemplo

Taskflow, Pulse API y Media Lab son ejemplos claramente identificados con
`isExample: true`. Sus demos viven en `/demos/taskflow`, `/demos/pulse-api` y
`/demos/media-lab`. Usan datos locales o simulados y no representan proyectos de
clientes ni servicios de backend desplegados.

Puedes sustituirlos por tus proyectos reales o mantenerlos como ejercicios. Si
añades una nueva demo interna, implementa su componente y regístrala en
`src/components/DemoPage.jsx`; añadir `demoHref` por sí solo no crea una demo.
Para enlazarla con React Router, utiliza `demoHref: "/demos/tu-proyecto"`.

Las tarjetas utilizan la primera captura de `gallery` como portada. Elige una
imagen que permita reconocer el proyecto de un vistazo. Cuando no hay capturas,
la tarjeta muestra una portada sencilla con el nombre del proyecto.

## Comprobación

Ejecuta `npm run lint` y `npm run build`. Comprueba la ficha, los filtros, las
imágenes y cada enlace en la vista previa antes de publicar.
