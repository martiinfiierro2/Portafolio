# Guía del código

- `pages/`: pantallas completas, con el CSS junto a cada JSX.
- `components/`: elementos reutilizables y sus estilos. `ProjectKeyboard` contiene la interacción de portada; `ProjectCard` presenta cada proyecto; `SocialMedia` muestra los contactos.
- `components/demos/`: las tres demostraciones locales, con estilos compartidos en `pages/DemoPage.css`.
- `data/`: contenidos de las fichas, experiencia y contacto.
- `styles/tokens.css`: fuente Manrope local, colores de ambos temas, superficies y radios.
- `styles/base.css`: estructura, tipografía compartida, controles, foco y movimiento reducido.
- `assets/`: recursos locales. La ilustración original se conserva sin alteraciones.

`App.jsx` define las rutas y el tema. Cada pantalla es independiente: Home (`/`), Projects (`/proyectos`), About (`/sobre-mi`) y Contact (`/contacto`). Las fichas utilizan `/proyectos/:slug` y las demos, `/demos/:demoId`. `Home.jsx` compone su presentación y `ProjectKeyboard`, sin lógica de scroll entre páginas.

## Teclado

`ProjectKeyboard.jsx` agrupa la escritura de «cd Proyectos», el foco, la iluminación y el audio. Su CSS define el volumen y la perspectiva del objeto. Las flechas recorren las teclas con un único punto de entrada al tabular. Enter enlaza con `/proyectos`; no se captura la escritura de otras páginas.

La animación inicial no reproduce audio. El sonido se sintetiza con Web Audio después de un gesto del visitante. La preferencia de silencio se guarda en `portfolio-keyboard-sound`, y el tema, en `mf-theme`. Los temporizadores y el contexto de audio se liberan al salir de la página.

## Contenido

Edita `data/projects.js` para añadir, quitar o actualizar proyectos. `ProjectCard` utiliza la primera imagen de `gallery` y no recorta la captura. `ProjectDetail` reúne la ficha y su visor accesible; los contenidos que faltan no se renderizan. Consulta [la guía de proyectos](../docs/PROJECTS.md).

Los enlaces de contacto se configuran en `data/contact.js`. Los valores `null` se mantienen pendientes y no navegan a direcciones ficticias. La experiencia y el CV solo aparecen cuando existen datos.

`Reveal` aplica entradas breves al contenido, respetando el movimiento reducido. La cabecera obtiene la sección activa de la ruta y conserva el interruptor animado de sol y luna.

## Verificación

```bash
npm run lint
npm run check:structure
npm run build
```

Comprueba en el navegador ambos temas, el teclado, las rutas, los filtros y la galería después de modificar su comportamiento. La estructura no necesita Tailwind ni un cliente de base de datos.
