# Revisión del portfolio — 15 de octubre de 2026

Skill: design-taste-frontend v2. Revisión, sin cambios en los componentes.
Alcance visual: página principal en tema oscuro, 1440×900, 768×1024 y 390×844. Las fichas y demos se incluyen únicamente en el análisis estático; no se han inspeccionado visualmente. Tema claro e interacciones completas pendientes de comprobación.

## Evidencia automática

- lint.mjs src: 53 coincidencias FAIL y 40 WARN. Son coincidencias de código, incluyen demos, estilos de estados y controles. No equivalen a 53 defectos visuales independientes. Los bordes de campos y las convenciones de interfaces reales requieren revisión contextual.
- inspect.mjs http://127.0.0.1:5173/: 10 FAIL y 4 WARN. Informe completo: inspect/report.json.
- Ambos titulares de perfil y contacto ocupan tres líneas en los tres anchos.
- Texto corriente predominante: 14px; siete bloques menores de 13px; quince tamaños detectados en escritorio.
- Fuentes locales cargadas: Manrope y Clash Display.
- Cinco imágenes detectadas, incluyendo la ilustración de portada y las capturas de proyectos. La ilustración no acredita por sí sola el mínimo de fotografías de la rúbrica.
- Movimiento detectado en 29 elementos en escritorio. No hay vídeo. Su ausencia es defendible si no existe una grabación propia que pruebe mejor los proyectos.
- No se reportó desbordamiento horizontal. Eso no certifica toda la accesibilidad ni todas las interacciones.

## Crítica visual

ROUND 1
Seen in one second: el nombre Martín Fierro y el retrato con portátil; la especialidad se reconoce inmediatamente después.
Idea (one sentence): presentar a Martín como desarrollador full-stack mediante un retrato y un inventario de tecnologías; el recurso identifica la categoría pero apenas diferencia su manera de trabajar.
Live thing: búsqueda y filtros del catálogo; las demos son destinos enlazados, no se han probado en esta revisión.
Layout words by section: hero=split / proyectos=grid / perfil=split / contacto=split / footer=franja.
Scores: design 6.5 · usability 5 · creativity 5.5 · content 5 → overall 5.7
Caps applied: FAIL del inspector limita el total a 6; ornamentación y titulares de tres líneas limitan a 6.5; enfoque intercambiable limita creatividad a 6; contenido pendiente limita contenido a 5. La puntuación es un juicio según esta skill, no una nota oficial de Awwwards.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Contacto termina en un bloque azul sin destinos visibles (desktop-page-02.jpg, mobile-page-01.jpg). SocialMedia.jsx contiene cuatro botones sin onClick ni enlace; los iconos se ocultan hasta hover/foco. Sustituirlos por enlaces visibles y etiquetados a canales reales, con una acción directa para escribir. Prioridad alta: bloquea la finalidad del portfolio.
2. El catálogo oscurece y uniformiza las pruebas de trabajo (desktop-page-01.jpg, mobile-page-01.jpg). Cuatro tarjetas idénticas, capturas oscuras y la primera repite la portada. Destacar el proyecto real más sólido con una captura grande, papel desempeñado y una decisión técnica concreta; diferenciar proyectos propios y ejercicios, conservando la identificación honesta de ejemplos. Mantener colores útiles de las capturas.
3. Perfil y contacto ocupan mucho espacio con poco contenido (desktop-page-01.jpg, desktop-page-02.jpg, tablet-page-01.jpg). Hay experiencia pendiente, CV desactivado y titulares genéricos de tres líneas. Completar datos reales o retirar bloques pendientes, compactar alturas y usar títulos como «Sobre mí» y «Hablemos».

### Catorce pasadas

1. Foco: nombre y figura se reconocen; el mosaico de tecnologías introduce muchos detalles pequeños.
2. Masas: hero con dos masas claras; proyectos con módulos equivalentes; cierre con escasa densidad.
3. Identidad: al cambiar el nombre, la promesa «claras, modernas y funcionales» serviría a muchos desarrolladores. Faltan decisiones y trabajo que solo pertenezcan a Martín.
4. Bordes: hero, catálogo centrado y mitades posteriores cambian el eje. Conviene compartir una retícula y sus márgenes.
5. Espacio: gran vacío superior en tableta y largos vacíos en las secciones finales. Ajustar altura al contenido.
6. Tipo: buena diferencia entre títulos y cuerpo; exceso de escalones pequeños. Llevar texto corriente a 16–18px y reducir la escala a unas cinco funciones.
7. Color: fondo azul oscuro, superficie algo más clara y acento azul coherentes. Conservar el sistema; retirar círculos y halos que no aportan información.
8. Imágenes: material propio disponible, pero capturas pequeñas y desaturadas en tema oscuro. El retrato contiene texto rasterizado difícil de leer en móvil. Presentar habilidades como texto y probar el trabajo con capturas legibles.
9. Repetición: perfil y contacto repiten dos columnas; catálogo con tarjetas iguales. Introducir jerarquía entre proyectos y componer el cierre como contacto directo.
10. Móvil: la portada se reorganiza con imagen sobre acciones y conserva nombre, especialidad y CTA en el primer encuadre de 390×844. Los titulares posteriores necesitan edición.
11. Plenitud: inicio y catálogo tienen contenido; experiencia y cierre transmiten que faltan piezas. Evitar alturas de pantalla para información breve.
12. Sustancia: se entiende quién es y qué hace; faltan experiencia, CV y contacto funcional. Las demos están declaradas como ejemplos, lo cual debe conservarse.
13. Colisiones: no se aprecia recorte horizontal. La cabecera fija tapa partes del contenido al pasar por ella durante el scroll, como se ve en las hojas; estas capturas no bastan para afirmar que las anclas aterricen mal.
14. Competidor y elemento vivo: filtros útiles pero comunes; una demo real o un antes/después basado en un proyecto propio daría una interacción más distintiva.

## Hallazgos adicionales del código

- Header.jsx: la hamburguesa móvil se dibuja en un pseudo-elemento de nav; no hay botón con estado aria-expanded. El desplegable depende de hover/focus-within. Reemplazar por un control explícito y comprobar tacto, teclado y cierre. Es un riesgo identificado en código; no se ha completado una prueba en dispositivo táctil.
- Header.jsx: el selector de tema contiene un checkbox dentro de un button. Usar un único control semántico y comprobar foco.
- Los controles y metadatos de catálogo son pequeños; los bordes de formularios no se consideran por sí mismos un problema.
- Sombras, etiquetas superiores en mayúsculas y líneas finas incumplen el estilo particular de esta skill. Son prioridades menores que contacto, contenido y legibilidad.

## Orden recomendado

1. Hacer funcional y visible el contacto; aportar CV real o retirar la promesa pendiente.
2. Poner el trabajo más convincente primero, con evidencia visual y explicación propia.
3. Simplificar textos y escala tipográfica, compactar perfil y cierre.
4. Resolver controles móviles y teclado; después limpiar ornamentos.
5. Repetir capturas en ambos temas y verificar anclas, filtros, fichas y demos.

No se ha sorteado una dirección nueva, generado imágenes ni cambiado el diseño: el encargo es una revisión. No se han añadido datos, testimonios ni experiencia inventados.
