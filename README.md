# Martín Fierro / Portfolio

Portfolio de ingeniería multimedia y desarrollo full-stack con React, React Router y Vite. Un teclado interactivo da acceso a los proyectos; inicio, proyectos, sobre mí y contacto tienen páginas independientes.

## Desarrollo

Usa Node.js 24 y npm:

```bash
npm ci
npm run dev
```

```bash
npm run lint
npm run check:structure
npm run build
npm run preview
```

`check:structure` recorre los imports desde `src/main.jsx` y avisa de módulos JS, JSX o CSS sin uso y de imports relativos que no se pueden resolver.

## Organización

```text
src/
  pages/          Home, Projects, About, Contact, ProjectDetail y DemoPage
  components/     Header, Footer, ProjectKeyboard, ProjectCard, SocialMedia…
    demos/        TaskFlowDemo, ApiExplorerDemo y MediaLabDemo
  data/           Proyectos, experiencia y enlaces de contacto
  styles/         tokens.css (fuente, temas y colores), base.css (estilos comunes)
  assets/         Fuente Manrope e ilustración original
  App.jsx         Rutas, tema y comportamiento de navegación
  index.css       Entrada de los estilos globales
scripts/
  audit-source.mjs
public/projects/  Capturas de los proyectos
```

Cada página y componente visual importa su CSS del mismo directorio, incluidos sus ajustes de móvil. La interfaz utiliza CSS nativo y una única fuente variable local, Manrope. Los colores y superficies de ambos temas se ajustan en `src/styles/tokens.css`.

Consulta [la guía del código](src/README.md) y [cómo añadir proyectos](docs/PROJECTS.md). Los datos y enlaces se editan en `src/data/`; los contactos sin configurar mantienen su valor `null`.

## Teclado

`ProjectKeyboard` construye el objeto con CSS, sin una imagen ni una escena 3D externa. Escribe «cd Proyectos»; las teclas neutras se iluminan durante la pulsación y Enter abre el catálogo. Incluye repetición, sonido opcional y navegación con flechas. La introducción es silenciosa; el sonido solo se activa después de una interacción y respeta la preferencia guardada. Con movimiento reducido se muestra directamente el comando completo.

El enlace «Descargar CV» del inicio utiliza `cv` en `src/data/contact.js`. Añade el PDF a `public/` y configura su ruta, por ejemplo `/cv.pdf`; mientras el valor sea `null`, el control indica que todavía no está disponible. El hero, el menú móvil y las tarjetas tienen entradas breves que se omiten con movimiento reducido.

## Rutas y despliegue

React Router gestiona `/`, `/proyectos`, `/sobre-mi`, `/contacto`, `/proyectos/:slug`, `/demos/:demoId` y una página 404. La navegación actualiza el título, vuelve al inicio y mueve el foco al encabezado de cada página. Los enlaces antiguos `/#inicio`, `/#proyectos`, `/#sobre-mi`, `/#contacto` y `#/...` redirigen a sus rutas actuales.

El hosting debe servir `index.html` en las rutas de la aplicación que no correspondan a archivos reales para permitir accesos y recargas directas. Vite incluye ese fallback en desarrollo y preview; GitHub Pages requiere configurarlo por separado o utilizar un hosting con soporte para SPA.

## Catálogo y demos

El catálogo incluye tarjetas con capturas completas, búsqueda por texto, filtros por categoría, fichas y una galería ampliable. Las fichas solo muestran las acciones y secciones que tienen datos.

Taskflow guarda tareas en el navegador; Pulse API simula respuestas JSON en memoria; Media Lab genera composiciones CSS ajustables. Son demostraciones identificadas como ejemplos y no requieren backend. El catálogo no utiliza un panel remoto de administración.

Los temas guardan la elección en el navegador y las animaciones respetan `prefers-reduced-motion`.
