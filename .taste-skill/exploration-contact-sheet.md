# DIRECTION SHEET — The contact sheet
seed 563687570 · drawn 2026-10-15 · sector personal-portfolio
Brief: Bocetos web de Martin Fierro. Mantener ilustracion con tecnologias y cabecera flotante. Explorar distribucion, jerarquia y color. No estetica de revista ni poster. No implementar.

| | |
| --- | --- |
| Direction | The contact sheet |
| Hero | Sheet with a text cell |
| Type | kept from the brand |
| Colour | Sand and moss |
| Sections | work (One strip per project) → about (Portrait as drop cap) → contact (Photo strip, three-cell bar) → footer (A footer of tiles) |
| Motion | Shutter image |
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
Show everything at once, small, in order. The work is laid out like a photographer's contact sheet or an archive drawer: dozens of small frames in strict rows, with all text set at one small size. Nothing is featured, which is the point: the volume and consistency of the body of work is the statement, and the visitor does the choosing. It suits people and studios whose strength is range and output.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
The name, or one sentence about the work, sits at display size (6–9vw) across the top of the first screen, and the sheet begins directly under it, still inside the first screen. The first screen opens with three or four short blocks of small text across the top on a 12-column grid (who, what, where to reach them), all at 14–16px, and immediately below, the sheet begins: rows of thumbnails at a fixed height (90–140px) with their natural widths, 6–10px gaps, each project forming a run of four to eight frames preceded by its title in the same small text. The sheet fills the whole page width edge to edge with 16–20px margins. Hovering a run dims the others and shows that project's one-line description in a fixed position. A single enlarged frame may interrupt the sheet once per screen at four times the size.

## 3. Type
Kept from the brand. One face. The name at display size on the first screen; everything else at one text size and one small size; hierarchy below the name comes from position and from a single brighter ink for titles.

## 4. Colour — Sand and moss
```css
:root {
  --bg: #ddd6c6;
  --surface: #d2cab8;
  --ink: #2a2a26;
  --muted: #59574e;
  --accent: #4f6238;
  --accent-ink: #ffffff;
  --field-1: #3f5a2a;  --field-1-ink: #ffffff;
}
```
Sand grey holds the page with charcoal type, and one deep leaf-green band may close it. Moss green is reserved for buttons; brighter greens and blues arrive only through photographs.
Black or white ground, so the thumbnails are the only colour.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node C:/Users/Martin/.agents/skills/design-taste-frontend/scripts/assets.mjs "web"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Many images: at least 24 frames to make a sheet. They can be project photographs from the dealt set cropped to mixed ratios, or page captures of the work. Square corners, no captions on the frames.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Architecture" set (structure, lines, bridges, facades and building interiors)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/620/1600/1000` — White arched bridge spanning grey water under a pale sky · light tone · white, pale grey, charcoal · black-and-white · calm area: bottom · native landscape · photo: Matthew Wiebe
- `https://picsum.photos/id/508/1600/1000` — Tall pointed vaults and pale columns of a church interior · light tone · cream, warm grey, soft orange · native portrait · photo: Jeff Sheldon
- `https://picsum.photos/id/887/1600/1000` — White apartment block facade with repeating balconies and windows · light tone · white, pale grey, soft red · native landscape · photo: Roman Kraft
- `https://picsum.photos/id/942/1600/1000` — White angular concrete building against a black sky · dark tone · black, white, pale grey · black-and-white · calm area: top · native landscape · photo: Carl Nenzen Loven
- `https://picsum.photos/id/618/1600/1000` — Curving glass and steel lattice roof in black and white · light tone · white, grey, black · black-and-white · native landscape · photo: Mika Ruusunen
- `https://picsum.photos/id/1081/1600/1000` — Stepped white modern building corner rising into a pale blue sky · light tone · white, pale blue, soft grey · calm area: top · native landscape · photo: Julien Moreau
- `https://picsum.photos/id/855/1600/1000` — Small figure walking past a huge bright yellow wall · light tone · bright yellow, black · calm area: left · native landscape · photo: Rodion Kutsaev
- `https://picsum.photos/id/954/1600/1000` — Narrow opening in a white wall revealing a white staircase · light tone · off-white, pale beige · calm area: left · native landscape · photo: Todd Quackenbush
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: fog-and-quiet, object-still, hands-and-making, people — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

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

### 3. contact — Photo strip, three-cell bar (strip)
A saturated flat field about 80svh tall. Across the top, 48px from the section edge, a strip of small photographs runs off both sides: all 150px tall at differing widths (3:4, 1:1, 3:2 in turn), 8px gaps, ten or more, drifting slowly as a marquee. A heading of two to four words at clamp(36px, 4vw, 60px) sits 72px below the strip at the left margin. 40px below the heading, the newsletter or booking form is one bar spanning the content width, 96px tall, divided into three equal cells with 8px gaps. Each cell is a filled block in a tone one step from the field with one radius: the first two are inputs (name, email) with placeholder text centred at 18px, the third is the submit action in the inverse colours with its word centred. Focus changes a cell's fill to the lightest tone. Small print at 13px sits under the first and third cells.
On a phone: The strip is 110px tall and scrolls by touch. The heading follows at 9vw. The three cells stack as full-width filled blocks 60px tall with 8px gaps, the submit block last. Small print sits beneath the stack, left-aligned.

### 4. footer — A footer of tiles (grid)
The footer is the last two rows of a board: filled tiles with 8px gaps and 8–12px outer margins, every cell used. Upper row, each tile 220px tall: a statement tile in columns 1–4 with one sentence at 24px top-left and the legal text at 12px bottom-left; a navigation tile in columns 5–7 with a plain list at 16px; a tile in columns 8–9 giving the city and local time as text; an email tile in columns 10–12 with the address at 20px as a link, bottom-left. Lower row, 320px tall: a tile in the ink colour spanning columns 1–8 with the wordmark set large (about 9vw) and centred, and a tile in the accent colour in columns 9–12 with a two-to-four-word invitation top-left at 28px and an arrow, drawn as inline SVG with 4px strokes, in its bottom-right corner; the whole accent tile is a link.
On a phone: Two columns of tiles with 6px gaps: the wordmark tile full width first at 160px tall, the accent tile full width next, then navigation and email side by side, then time and statement. Every tile keeps 20px padding and top-left text.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Shutter image
The one hero or showcase image opens from an edge with a clip-path over about 1.1 seconds while the picture inside settles from 1.12 scale to rest. Use it once, on the image that matters most; later images simply are there. Recipe: 'Image shutter' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 9. Where the richness comes from
Density and order. The mass of small images forms a texture; the strict rows keep it calm.

## 10. How this direction goes wrong
With fewer than about 20 images it looks unfinished; choose another direction. Do not add a big headline above the sheet. On a phone the frames become two per row at a fixed height and each run scrolls sideways. Rows that run past the right edge read as clipped in screenshots and to most visitors: wrap the frames onto the next line, or end each row inside the grid.

## 11. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **PROOOOF** (One Page Love, studied score 7.4) `opl-proooof`
  Idea: The product's output is the page: a wall of photos each wearing its coloured EXIF strip, with all the copy folded into one small floating card.
  Hero: The whole viewport is a six-column masonry of photographs on a warm off-white ground with about 15px gutters, columns offset vertically so rows never line up. Each photo has a flat strip fused to its bottom edge carrying tiny monospaced capture data, every strip a different solid colour (black, red, orange, yellow, violet, green). Dead centre floats a white card about 380px wide and 410px tall with roughly 28px corner radius and a soft shadow. It contains an extended wordmark with chained O's, a two-row accordion with the first row open, an App Store badge and a monospaced line of links. There is no navigation.
  Worth taking: Show the product's output at wall scale as the background and confine all copy to one small card on top of it.
- **Smallbits** (One Page Love, studied score 7.2) `opl-smallbits`
  Idea: The icon set is the page: a full-viewport wall of the product with one docked card holding every word.
  Hero: The whole viewport is a black field tiled with white pixel icons, each drawn about 50px on a 112px pitch, nine rows deep; alternate rows shift half a cell so it reads as a brick pattern, and icons at the edges are cropped. There is no header. A white square-cornered card, 795×170px, is docked bottom-centre: a two-line 24px semibold sentence left, a black rectangular button right, a row of five grey links below. A third-party badge floats top-right. This single screen is the entire page.
  Worth taking: Make the product the wallpaper: tile the full viewport with the assets at large size and skip a hero image entirely.
- **Julien Calot** (Awwwards Site of the Day, studied score 7.4) `aww-julien-calot`
  Idea: Each series of paintings is a full-screen close crop of one canvas, with the series title, year and piece count strung along a single line at mid-height like a museum wall label.
  Hero: A painting detail fills the viewport edge to edge, a face in the centre with saturated landscape shapes around it and the canvas weave visible. All text is white and small, with no scrim. Top-left: the artist's name in bold condensed capitals about 45px tall, the largest type on screen. The same top row holds a two-item filter at 29% across and two small stacked link groups at 75% and 95%. On the vertical midline a single row reads: year at the far left, series title in condensed black caps at 1.6vw about 10% in, and a piece count preceded by a short dash at the far right. No button.
  Worth taking: Crop artwork far past its edges to fill the screen and keep all text under 2vw, so the image does the shouting and the type behaves like a wall label.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to C:/Users/Martin/OneDrive/Documentos/Github/Portafolio/.taste-skill/direction.json · reprint with `node draw.mjs --show`
