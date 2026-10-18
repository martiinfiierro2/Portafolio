# DIRECTION SHEET — Colour chapters
seed 628321330 · drawn 2026-10-15 · sector personal-portfolio
Brief: Bocetos web de Martin Fierro. Mantener ilustracion con tecnologias y cabecera flotante. Explorar distribucion, jerarquia y color. No estetica de revista ni poster. No implementar.

| | |
| --- | --- |
| Direction | Colour chapters |
| Hero | Swatch column beside the view |
| Type | kept from the brand |
| Colour | Report blocks |
| Sections | work (Stacked folders with tabs) → about (Team on colour tiles) → contact (Photo strip, three-cell bar) → footer (A footer of tiles) |
| Motion | Colour by chapter |
| Photographs | the "Architecture" set, as atmosphere |

This is the direction for this build. Adopt it. Do not blend it with the layout you would have made anyway,
and do not redraw because it is unfamiliar: unfamiliar is the point. Redraw a slot only when it conflicts
with a stated brand constraint or needs an asset that does not exist, and say why in your report.

The parts of this sheet were written separately and will disagree in small ways. Settle every disagreement in this order:
**house rules** (including type no smaller than 13px and body text of 16px or more) → **the direction** (the idea, the composition habits, where the
one accent goes) → **the type system and the palette** (which face does which job, the five size steps, which colour is the ground and where the
accent goes) → **the hero blueprint** → **the section blueprints**. Under each blueprint below, "Adjusted for this page" lists where it disagrees.
In practice: take geometry from blueprints (columns, proportions, what sits where) and take everything else from above them. Map every size a
blueprint names onto one of your five type steps instead of adding a sixth. Use one button shape, one corner radius and one pair of page margins on
the whole page, whatever individual blueprints say. If a blueprint names a kind of typeface (a light serif, a heavy grotesk), use the dealt face.

## 1. The idea
Every section is a chapter with its own flat colour, floor to ceiling. The page reads like a set of posters hung in a row, held together by one typeface and one grid. The colours are not decoration: they come from the subject (the brand's packaging, the artist's record sleeves, the product's own colour ways, the categories of the content) and each chapter's colour means that chapter. Decide the sequence like a designer orders a book: a strong opener, a quiet second, a surprise in the middle, a dark or very light closer.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
Sections are full-bleed fields, each at least 90svh tall, butted directly against each other with no gap and no divider. Inside every field the same 12-column grid and the same margins apply, and each field holds one thing: a huge heading (8–12vw) with a small paragraph, or one photograph with a caption, or one list. Text colour is chosen per field for strong contrast (ink or paper, never grey). Headings start on the same left edge in every chapter, so the eye feels the system as colours change. The navigation and the footer take the colours of the first and last chapter.

## 3. Type
Kept from the brand. One typeface in two weights. Headings very large and tight; body 18–20px. Because colour is loud, the type stays plain: no italics, no second face.

## 4. Colour — Report blocks
```css
:root {
  --bg: #ffffff;
  --surface: #f6f6f6;
  --ink: #000000;
  --muted: #5f5f5f;
  --accent: #fe7141;
  --accent-ink: #000000;
  --field-1: #fe7141;  --field-1-ink: #000000;
  --field-2: #d1ddd3;  --field-2-ink: #000000;
  --field-3: #f0ff1c;  --field-3-ink: #000000;
  --field-4: #000000;  --field-4-ink: #f4f4f4;
}
```
A white base with flat blocks of orange, sage, acid yellow and black assigned to whole modules: figure tiles, quote panels and chapter bands. Text is black on every colour and off-white on black, and orange is also the button colour.
Four to six flat fields used at full strength, one per section, each with its assigned text colour. No tints, no gradients between them: the hard edge where two fields meet is the look.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node C:/Users/Martin/.agents/skills/design-taste-frontend/scripts/assets.mjs "web"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Sparing. One photograph or object per chapter at most, either cut out and sitting directly on the colour, or a plain rectangle with generous colour around it. Photographs should be simple enough not to fight the field.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Architecture" set (structure, lines, bridges, facades and building interiors)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/620/1600/1000` — White arched bridge spanning grey water under a pale sky · light tone · white, pale grey, charcoal · black-and-white · calm area: bottom · native landscape · photo: Matthew Wiebe
- `https://picsum.photos/id/954/1600/1000` — Narrow opening in a white wall revealing a white staircase · light tone · off-white, pale beige · calm area: left · native landscape · photo: Todd Quackenbush
- `https://picsum.photos/id/618/1600/1000` — Curving glass and steel lattice roof in black and white · light tone · white, grey, black · black-and-white · native landscape · photo: Mika Ruusunen
- `https://picsum.photos/id/942/1600/1000` — White angular concrete building against a black sky · dark tone · black, white, pale grey · black-and-white · calm area: top · native landscape · photo: Carl Nenzen Loven
- `https://picsum.photos/id/1081/1600/1000` — Stepped white modern building corner rising into a pale blue sky · light tone · white, pale blue, soft grey · calm area: top · native landscape · photo: Julien Moreau
- `https://picsum.photos/id/508/1600/1000` — Tall pointed vaults and pale columns of a church interior · light tone · cream, warm grey, soft orange · native portrait · photo: Jeff Sheldon
- `https://picsum.photos/id/887/1600/1000` — White apartment block facade with repeating balconies and windows · light tone · white, pale grey, soft red · native landscape · photo: Roman Kraft
- `https://picsum.photos/id/693/1600/1000` — Red suspension bridge tower rising from fog above rugged cliffs · mid tone · rust red, grey, dark teal · calm area: left · native landscape · photo: Rob Bye
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: fog-and-quiet, object-still, hands-and-making, people — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Swatch column beside the view
A 10px frame of paper colour surrounds the screen. Columns 1–10 are one photograph panel, full height inside the frame, corners radiused 12px, `object-fit: cover`: a wide, calm view with a low horizon and a great deal of sky. The headline is centred in the panel's upper third on two lines of light-weight serif at clamp(72px, 8.6vw, 132px), white, with a neutral scrim behind that band only if the sky is pale. The wordmark sits top-left inside the panel, 28px in. The single action, a white rectangular button, sits bottom-centre, 36px above the panel's lower edge; one supporting sentence at 18px sits bottom-left on columns 1–4, level with it. Columns 11–12 are both the navigation and a preview of the page: a full-height stack of five flat colour blocks of equal height, butted together with no gaps, each holding one text link at 16px in its top-left corner with 20px padding. The five colours are sampled from the photograph, ordered light to dark, and each is the ground colour of the section its link scrolls to. There is no other navigation.

On a phone: The photograph panel takes the top 64svh inside an 8px frame, with the headline at 12vw on two lines in its upper third and the action button at its bottom-centre. The swatch column becomes five full-width bars, each 52px tall with its link at 15px, stacked directly under the panel; the first three show above the fold. The supporting sentence moves into the first section.
Headline: A two-line statement of three to five words, up to about 14 characters per line at 8.6vw, set over the sky.

Adjusted for this page:
- It sets text at 10px, 12px: use your small step (13px or more) instead.
- It names a kind of typeface: use the brand faces.
- It names colours (white): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. work — Stacked folders with tabs (band)
Projects are filed as folders: four to six full-width flat colour bands stacked so that each shows a 64px strip above the next, built with `position: sticky` and increasing `top` offsets (0, 64, 128px) so the bands pile up as the page scrolls. From the top-left edge of each band one or two tabs rise: filled shapes 44px tall and 200–320px wide with shouldered corners cut by `clip-path: polygon()` or an inline SVG path, side by side with 6px gaps, each in a flat colour that contrasts with its band. The project name sits inside the tab at 26–28px; the category sits right-aligned in the band's visible strip at 15px. An open band is 80svh: a 16:10 photograph in columns 1–7 and, top-aligned in columns 9–12, a 60-word description with a link. A two-word heading at 32px precedes the stack.
On a phone: Bands do not stick; they stack in normal flow, each led by one tab 40px tall with the name at 20px and the category beside it. Inside a band the photograph is full width at 4:3 with the description beneath at 16px and 20px padding.

### 2. about — Team on colour tiles (grid)
A one-line heading of two or three words at 28–36px sits top-left; nothing sits to its right. 40px below, a grid of portrait tiles: six columns with 12px gaps across the full content width for 12 or more people, four columns for 4–8. Every tile is a 4:5 photograph treated identically so mixed-quality headshots look like one set: `filter: grayscale(1) contrast(1.15)` with `mix-blend-mode: multiply` over a flat tint, the tints rotating through four palette colours in a fixed order. Square corners or one small radius. Under each tile, left-aligned to its edge with 10px of space: the name at 15px in full ink and the role at 13px in the soft ink, up to two lines. Rows are 36px apart. A leftover tile in the last row stays at the left; it is not centred. No hover lift and no social icons.
On a phone: Two columns with 8px gaps; tiles stay 4:5 with names at 14px beneath. For more than ten people, switch to three columns and show the name only. The heading sits above at 24px. Tints keep their rotation, so the grid reads as a checkerboard of colours.

### 3. contact — Photo strip, three-cell bar (strip)
A saturated flat field about 80svh tall. Across the top, 48px from the section edge, a strip of small photographs runs off both sides: all 150px tall at differing widths (3:4, 1:1, 3:2 in turn), 8px gaps, ten or more, drifting slowly as a marquee. A heading of two to four words at clamp(36px, 4vw, 60px) sits 72px below the strip at the left margin. 40px below the heading, the newsletter or booking form is one bar spanning the content width, 96px tall, divided into three equal cells with 8px gaps. Each cell is a filled block in a tone one step from the field with one radius: the first two are inputs (name, email) with placeholder text centred at 18px, the third is the submit action in the inverse colours with its word centred. Focus changes a cell's fill to the lightest tone. Small print at 13px sits under the first and third cells.
On a phone: The strip is 110px tall and scrolls by touch. The heading follows at 9vw. The three cells stack as full-width filled blocks 60px tall with 8px gaps, the submit block last. Small print sits beneath the stack, left-aligned.

### 4. footer — A footer of tiles (grid)
The footer is the last two rows of a board: filled tiles with 8px gaps and 8–12px outer margins, every cell used. Upper row, each tile 220px tall: a statement tile in columns 1–4 with one sentence at 24px top-left and the legal text at 12px bottom-left; a navigation tile in columns 5–7 with a plain list at 16px; a tile in columns 8–9 giving the city and local time as text; an email tile in columns 10–12 with the address at 20px as a link, bottom-left. Lower row, 320px tall: a tile in the ink colour spanning columns 1–8 with the wordmark set large (about 9vw) and centred, and a tile in the accent colour in columns 9–12 with a two-to-four-word invitation top-left at 28px and an arrow, drawn as inline SVG with 4px strokes, in its bottom-right corner; the whole accent tile is a link.
On a phone: Two columns of tiles with 6px gaps: the wordmark tile full width first at 160px tall, the accent tile full width next, then navigation and email side by side, then time and statement. Every tile keeps 20px padding and top-left text.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Colour by chapter
Each chapter is its own full-bleed field of one palette colour, so the ground changes exactly at section edges as you scroll, never as a global recolouring of the screen. The only movement: the fixed header (or the one pinned element) takes the ink of the chapter beneath it, switching with a 300ms colour transition as each edge passes under it. Do not drive the page background from an observer: in blind tests a page recoloured mid-section, with a paragraph sitting on two colours, read as broken twice.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 9. Where the richness comes from
Colour at scale. A whole screen of one saturated colour is rich on its own, so a chapter needs few elements; it still needs its content at full size, because a coloured screen with one small line on it reads as empty.

## 10. How this direction goes wrong
Check contrast on every field with the palette's assigned ink. Do not put cards on the fields. Do not use more than six colours. Two neighbouring fields should differ clearly in lightness as well as hue.

## 11. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Anidachi** (One Page Love, studied score 7.6) `opl-anidachi`
  Idea: A toy brand built from one custom modular wordmark and one 3D device, both of which change colour with each full-bleed candy-coloured section.
  Hero: A saturated sky-blue field covering the top 92% of the viewport. The custom modular wordmark is repeated in four stacked rows, each spanning the full width inside 30px margins, drawn tone-on-tone in a slightly lighter blue that brightens row by row toward the bottom, so the name works as wallpaper. A tiny white pixel-cat mark sits top-left; a white rounded button with blue text top-right. A 3D flower-shaped toy device hangs on a carabiner from the top edge at centre, barely entered on desktop and fully visible on mobile, where it covers the pattern. A pale ice section starts at the bottom edge.
  Worth taking: Repeat the wordmark as tone-on-tone rows filling the hero, stepping the tint row by row, so the brand name is the background pattern.
- **Warm & Fuzzy** (Awwwards Site of the Day, studied score 7.7) `aww-warm-fuzzy`
  Idea: A showreel-first studio site in which every section takes one flat, loud colour (blue, black, yellow) under heavy grotesk type and a chunky custom wordmark.
  Hero: The showreel plays full-bleed with a visible film-grain overlay and no scrim. A chunky hand-cut wordmark sits top left, 16px from the edges; the same top line continues with a one-sentence status link, a tiny thumbnail beside the latest project's name, and three caps links at the far right, all white over the footage. A small green caps play label floats at dead centre. The tagline is anchored bottom left, 16px from both edges, in white grotesk caps at 47px (3.3vw) on one line spanning 56% of the width. A tiny square pause control sits bottom right.
  Worth taking: Give every section one flat saturated background and change it at each section break, keeping type strictly black or white.
- **Adam Ho, I.S.P.** (One Page Love, studied score 7.6) `opl-adam-ho`
  Idea: A portfolio treated as a self-shuffling information system: fifty oversized coloured index numbers are scattered across the layout on each load, on top of a rigorously labelled archive.
  Hero: White page, 8px margins. A layer of about fifty numerals at 86px (6vw) in a grotesk, each a different colour or a faint grey, is spread over the whole viewport in a rough six-column grid, overlapping everything. Beneath it: top-left a dot, the name and a three-line serif descriptor at 12px; a 200px column of small notes; top-right, filling 45% of the width, the project list set as vertical lines of text rotated 90 degrees, each tag highlighted in a marker colour under a row of coloured dots. From 36% height a hairline starts the first project: tiny labels, then square image tiles running to the right edge.
  Worth taking: Set an index as vertical lines of rotated text packed like book spines, each with a highlighter-colour tag, to fit thirty items into a banner-sized block.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to C:/Users/Martin/OneDrive/Documentos/Github/Portafolio/.taste-skill/direction.json · reprint with `node draw.mjs --show`
