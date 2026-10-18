# DIRECTION SHEET — The contact sheet
seed 1811628034 · drawn 2026-10-16 · sector personal-portfolio
Brief: Exploracion libre de portfolio web con contenido de muestra. Ocho opciones independientes del portfolio actual. Claro y oscuro. No revista ni poster. Solo bocetos.

| | |
| --- | --- |
| Direction | The contact sheet |
| Hero | Sheet with a text cell |
| Type | Archivo |
| Colour | Three stones |
| Sections | work (One strip per project) → about (Portrait as drop cap) → contact (Sentence, portrait, two links) |
| Motion | Shutter image |
| Photographs | the "Fog and quiet" set, as atmosphere |

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
Show everything at once, small, in order. The work is laid out like a photographer's contact sheet or an archive drawer: dozens of small frames in strict rows, with all text set at one small size. Nothing is featured, which is the point: the volume and consistency of the body of work is the statement, and the visitor does the choosing. It suits people and studios whose strength is range and output.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
The name, or one sentence about the work, sits at display size (6–9vw) across the top of the first screen, and the sheet begins directly under it, still inside the first screen. The first screen opens with three or four short blocks of small text across the top on a 12-column grid (who, what, where to reach them), all at 14–16px, and immediately below, the sheet begins: rows of thumbnails at a fixed height (90–140px) with their natural widths, 6–10px gaps, each project forming a run of four to eight frames preceded by its title in the same small text. The sheet fills the whole page width edge to edge with 16–20px margins. Hovering a run dims the others and shows that project's one-line description in a fixed position. A single enlarged frame may interrupt the sheet once per screen at four times the size.

## 3. Type — Archivo
A sturdy grotesque kept at regular weight even at 88px, so the page reads as composed rather than loud. Suits finance, infrastructure and research pages that need to look sober and current.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600&display=swap" rel="stylesheet">
```
- Display: **Archivo** — weight 400 · tracking -0.02em · leading 1.0 · sentence case; never bold, inactive items fade to grey
- Text: **Archivo** — 400 for body, 600 for buttons and short emphasis · leading 1.5 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
One face. The name at display size on the first screen; everything else at one text size and one small size; hierarchy below the name comes from position and from a single brighter ink for titles.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Three stones
```css
:root {
  --bg: #eeecea;
  --surface: #e4e1dd;
  --ink: #333231;
  --muted: #6b6763;
  --accent: #5c6b54;
  --accent-ink: #ffffff;
  --field-1: #cdc3b6;  --field-1-ink: #333231;
}
```
Three close stone tones share the interface: the lightest for the page, the middle one for panels, the darkest for a single band, all with charcoal type. Saturated colour is left to the photographs and their backdrops; the grey-green fills the button only.
Black or white ground, so the thumbnails are the only colour.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node C:/Users/Martin/.agents/skills/design-taste-frontend/scripts/assets.mjs "contenido muestra"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Many images: at least 24 frames to make a sheet. They can be project photographs from the dealt set cropped to mixed ratios, or page captures of the work. Square corners, no captions on the frames.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Fog and quiet" set (misty, muted, minimal landscapes and empty horizons; calm areas for text)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/255/1600/1000` — Gravel path leading to a cluster of bare trees on a hill · mid tone · olive green, pale grey · calm area: top · native landscape · photo: Jon Ottosson
- `https://picsum.photos/id/594/1600/1000` — Small boathouse at the end of a jetty on dark water at night · dark tone · black, deep purple, warm white · calm area: top · native landscape · photo: Aurélien bellanger
- `https://picsum.photos/id/989/1600/1000` — Low cloud covering a forested lakeshore under a pale sky · light tone · pale grey, dark teal, soft blue · calm area: top · native landscape · photo: Paul Jarvis
- `https://picsum.photos/id/266/1600/1000` — Three ships on a distant horizon across a calm blue sea · mid tone · pale blue, deep blue · calm area: all · native landscape · photo: John Maravelakis
- `https://picsum.photos/id/941/1600/1000` — Small island on a pale, glassy sea beneath soft clouds · light tone · pale blue, soft white, grey · calm area: bottom · native landscape · photo: Ivan Slade
- `https://picsum.photos/id/269/1600/1000` — Gulls perched on a concrete wall beside a pale still sea · light tone · white, pale blue, grey · calm area: left · native landscape · photo: Jill Heyer
- `https://picsum.photos/id/228/1600/1000` — Single round hay bale in a field under dense fog · mid tone · grey green, golden tan · calm area: top · native landscape · photo: Michal Kubicek
- `https://picsum.photos/id/552/1600/1000` — Tiny sailboat on a calm sea with distant hills, black and white · mid tone · grey, white, black · black-and-white · calm area: all · native landscape · photo: Hugo Kerr
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: architecture, object-still, hands-and-making, people — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Sheet with a text cell
The whole viewport is a sheet of photographs: six columns with 12px gaps and 12px outer margins, each column a vertical stack of frames at natural ratios with square corners. Each column starts at a different vertical offset (0, -90, -40, -130, -20, -70px) so rows never line up and the top and bottom frames are cropped by the viewport. Every frame has a flat strip 28px tall fused to its bottom edge in a solid palette colour, carrying one line of 13px text (a title or a place); strip colours rotate through four values. There is no header. In columns 3-4, starting at 28% of the height, one cell of the sheet is not a photograph but a filled panel in the tone opposite to the ground, 410px tall, sitting on the grid like any other frame with the same gaps on all sides. Inside it, top-left aligned on 24px padding: the wordmark at 28px, one sentence at 20px on up to three lines, the single action as a filled rectangle, and three text links on one line at the panel's foot.

On a phone: The text panel spans the full width as the first block, about 40% of the screen height, with the wordmark at 7vw, the sentence at 17px and the action full width. Under it the sheet resumes in two columns with 8px gaps, the right column started 60px higher than the left, colour strips kept on every frame. The links sit in one row at the panel's foot.
Headline: The wordmark at 28px plus one sentence of up to 70 characters inside the panel; nothing is set at display size.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.
- Its action is a text link: the primary action on the first screen is a real button (filled or solid-bordered, 44px or taller), placed where the blueprint puts the link. A second action may stay a link.

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. work — One strip per project (strip)
The left 13% of the width is a `position: sticky` column holding the section name at 28px and, beneath it, two text filters at 15px, the active one in full ink. To its right each project is one horizontal strip of four to six images, all exactly 190px tall at their natural widths (`height: 190px; width: auto`), 8px apart, the last one cut off by the right viewport edge with `overflow: hidden`. Under each strip, one line at 13px spread across the strip's width: project name flush left, a three-word descriptor at the centre, the year flush right. 45px separate one strip from the next, so four projects fit on a 900px screen and ten make a page. Square corners; no captions on individual frames. Hovering a strip dims the other strips to 40% opacity. There is no heading beyond the section name in the rail.
On a phone: The rail becomes a single line above the list: section name left, filters right. Strips are 120px tall and each scrolls sideways on its own with `overflow-x: auto` and scroll snapping. The caption line keeps the name left and the year right; the descriptor is dropped.

Adjusted for this page:
- It fades text: anything a visitor reads, inactive items of a list included, is `--ink` or `--muted` at full strength (contrast 4.5:1 or more). The active item is told apart by `--ink` against `--muted`, weight or the accent, not by fading the rest.

### 2. about — Portrait as drop cap (statement)
No heading. One biography paragraph of 50–80 words is set large at clamp(24px, 2.5vw, 38px), regular weight, leading 1.2, across columns 3–12 of the grid. A square portrait is floated at the paragraph's start with `float: left`: its side equals three lines of text (3.6em), with 0.5em of space to its right, so the first three lines wrap beside it and the fourth returns to the paragraph's left edge, like a drop capital. Square corners. The person's name, the first words of the paragraph, is in full ink; the rest may be in a softer ink with linked names in full ink and underlined. A second paragraph follows after one blank line in the soft ink at the same size. Columns 1–2 hold three short facts (place, since when, how to reach) at 14px, top-aligned with the portrait. Section padding 140px.
On a phone: Text at 22px with leading 1.25, full width. The portrait keeps its float but grows to four lines tall, about 110px square. The three facts move below the second paragraph as a single row of three small blocks at 13px.

### 3. contact — Sentence, portrait, two links (band)
One closing row of three elements hanging from the same top line, with open ground between them, on a 12-column grid. Columns 1–5: a sentence of 12–18 words at clamp(26px, 3vw, 44px), four lines, leading 1.1, saying what kind of enquiries are welcome; it is set as a paragraph and there is no separate heading. Columns 8–9: one small square portrait or photograph of the place, 150–170px, with square corners. Columns 10–12: a short question at 18px in medium weight, then 20px below it two underlined links stacked at 18px (the email address and one booking or social link), and beneath them a line at 14px in the soft ink with the city and the usual reply time. Columns 6–7 stay empty. The row has 160px of space above and 120px below. No form. On a dark ground the photograph is the only bright thing in the row.
On a phone: The sentence comes first at 7.4vw. Below it the portrait at 96px square sits at the left margin with the question and the two links to its right, top-aligned, in the remaining width. The city and reply-time line spans the full width beneath.

Adjusted for this page:
- It sets a sentence large over several lines: jurors read that as a long headline. Either cut it to a two-line headline at display size, or keep it a statement at 36px or less on three lines (24px, four lines on a phone).

## 8. Motion — Shutter image
The one hero or showcase image opens from an edge with a clip-path over about 1.1 seconds while the picture inside settles from 1.12 scale to rest. Use it once, on the image that matters most; later images simply are there. Recipe: 'Image shutter' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 9. Where the richness comes from
Density and order. The mass of small images forms a texture; the strict rows keep it calm.

## 10. How this direction goes wrong
With fewer than about 20 images it looks unfinished; choose another direction. Do not add a big headline above the sheet. On a phone the frames become two per row at a fixed height and each run scrolls sideways. Rows that run past the right edge read as clipped in screenshots and to most visitors: wrap the frames onto the next line, or end each row inside the grid.

## 11. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Gil Huybrecht** (Awwwards Site of the Day, studied score 7.6) `aww-gil-huybrecht`
  Idea: A portfolio as a contact sheet: every project is a numbered run of miniature page screenshots on black, and all text is set at one small size.
  Hero: Black field on a seven-column grid with 14px margins. The top band is plain white text at one size, about 16px: name in column one, availability in column two, a services list from column three, a longer awards list from column five, then 'Profile' and 'Email me' at the right. List items are indented one step under their label. Below the lists roughly 300px of black is left empty. At mid-height the thumbnail grid begins: one small website screenshot per column, about 190px wide, each topped by a number at its right corner, with the project name over the first of each run. Two tiny toggle chips sit in the bottom corners.
  Worth taking: Set every piece of text on the page at one size and weight and build hierarchy only from column position and a one-step indent under labels.
- **Smallbits** (One Page Love, studied score 7.2) `opl-smallbits`
  Idea: The icon set is the page: a full-viewport wall of the product with one docked card holding every word.
  Hero: The whole viewport is a black field tiled with white pixel icons, each drawn about 50px on a 112px pitch, nine rows deep; alternate rows shift half a cell so it reads as a brick pattern, and icons at the edges are cropped. There is no header. A white square-cornered card, 795×170px, is docked bottom-centre: a two-line 24px semibold sentence left, a black rectangular button right, a row of five grey links below. A third-party badge floats top-right. This single screen is the entire page.
  Worth taking: Make the product the wallpaper: tile the full viewport with the assets at large size and skip a hero image entirely.
- **Rafael Derolez** (One Page Love, studied score 7.3) `opl-rafael-derolez-2026`
  Idea: A portfolio as a phone carousel: a fixed text rail on the left narrates whichever phone-shaped screen is centred on the right.
  Hero: Dark charcoal page split by a vertical hairline at 30% width. Left rail: a 55px header row with name, slash and current section as a breadcrumb in 16px sans, plus a small cobalt ticket-shaped hire button with a perforated divider and arrow; below a hairline, four short paragraphs of 16px grey text with white links, top-aligned, leaving the lower 40% of the rail empty. Right 70%: three phone-proportioned frames with large rounded corners in a row; the centre one upright, full brightness and about 680px tall, the outer two smaller, dimmed and rotated in perspective toward the centre.
  Worth taking: Use a breadcrumb (name / current item) as the only heading and update its last word as the content changes.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to C:/Users/Martin/OneDrive/Documentos/Github/Portafolio/.taste-skill/direction.json · reprint with `node draw.mjs --show`
