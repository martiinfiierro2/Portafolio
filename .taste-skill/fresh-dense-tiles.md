# DIRECTION SHEET — The well-kept board
seed 138413743 · drawn 2026-10-16 · sector personal-portfolio
Brief: Exploracion libre de portfolio web con contenido de muestra. Ocho opciones independientes del portfolio actual. Claro y oscuro. No revista ni poster. Solo bocetos.

| | |
| --- | --- |
| Direction | The well-kept board |
| Hero | Name band and rails |
| Type | Bricolage Grotesque |
| Colour | Plum-black and pink |
| Sections | work (Giant title, uneven wall) → about (Team on colour tiles) → contact (Photo strip, three-cell bar) |
| Motion | Edge-to-edge marquee |
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
The whole page is a board of tiles fitted edge to edge with narrow gaps, like a tidy desk seen from above. Each tile is one thing: the name, a statement, a photograph, a number, a link, a short list. There is no hero and no sequence of bands; the page is one continuous composition that the eye roams. It suits subjects with many small true things to show (a studio with work, writing, clients and news; a product with several distinct capabilities) and it replaces the generic bento by having real content in every tile and a strict system for sizes.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
A 12-column grid with 8px gaps and 8–12px outer margins, filled completely, no empty cells. Tiles use only four sizes (for example 6×4, 6×2, 3×2, 3×4 in column × row units of about 90px). Every tile is a flat filled rectangle: ground colour one step from the page, or a palette colour, or a photograph covering it. One radius everywhere (0, or 6–10px). The first screen contains: a name tile (the name at display size, the largest type on the page) with the wordmark set large, a statement tile with the description at 28–40px, two or three image tiles and one action tile in the accent colour. Text inside tiles is top-left aligned with 20–24px padding and never centred. Below the first screen the board continues with the same sizes; the last row is the footer made of tiles.

## 3. Type — Bricolage Grotesque
A grotesk with visible stroke contrast and slightly irregular curves, so headings look drawn rather than engineered. Suits reports, consultancies and design-led software that want warmth without a serif.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600&display=swap" rel="stylesheet">
```
- Display: **Bricolage Grotesque** — weight 600 · tracking -0.04em · leading 0.92 · sentence case; leave optical sizing on so large sizes tighten and gain contrast
- Text: **Bricolage Grotesque** — 400 for body, 500 for emphasis · leading 1.5 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
One grotesk in two weights. Inside tiles: a large size for single statements, a small size for lists. No uppercase labels in tile corners.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Plum-black and pink
```css
:root {
  --bg: #0d060b;
  --surface: #1b0e17;
  --ink: #ffffff;
  --muted: #9a8f97;
  --accent: #ff488b;
  --accent-ink: #0d060b;
  --field-1: #470c35;  --field-1-ink: #ffffff;
  --field-2: #ffffff;  --field-2-ink: #101421;
}
```
Near-black and plum at the top and bottom bracket a white middle with navy-black text. Hot pink is reserved for primary buttons, bars in charts and map markers; it never fills a section.
Page ground, tile ground one step lighter or darker, and one or two palette colours on selected tiles. Photographs supply the rest.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node C:/Users/Martin/.agents/skills/design-taste-frontend/scripts/assets.mjs "contenido muestra"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Photographs fill whole tiles with `object-fit: cover`; choose images that crop well to both wide and tall tiles.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Architecture" set (structure, lines, bridges, facades and building interiors)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/855/1600/1000` — Small figure walking past a huge bright yellow wall · light tone · bright yellow, black · calm area: left · native landscape · photo: Rodion Kutsaev
- `https://picsum.photos/id/620/1600/1000` — White arched bridge spanning grey water under a pale sky · light tone · white, pale grey, charcoal · black-and-white · calm area: bottom · native landscape · photo: Matthew Wiebe
- `https://picsum.photos/id/508/1600/1000` — Tall pointed vaults and pale columns of a church interior · light tone · cream, warm grey, soft orange · native portrait · photo: Jeff Sheldon
- `https://picsum.photos/id/942/1600/1000` — White angular concrete building against a black sky · dark tone · black, white, pale grey · black-and-white · calm area: top · native landscape · photo: Carl Nenzen Loven
- `https://picsum.photos/id/618/1600/1000` — Curving glass and steel lattice roof in black and white · light tone · white, grey, black · black-and-white · native landscape · photo: Mika Ruusunen
- `https://picsum.photos/id/887/1600/1000` — White apartment block facade with repeating balconies and windows · light tone · white, pale grey, soft red · native landscape · photo: Roman Kraft
- `https://picsum.photos/id/954/1600/1000` — Narrow opening in a white wall revealing a white staircase · light tone · off-white, pale beige · calm area: left · native landscape · photo: Todd Quackenbush
- `https://picsum.photos/id/693/1600/1000` — Red suspension bridge tower rising from fog above rugged cliffs · mid tone · rust red, grey, dark teal · calm area: left · native landscape · photo: Rob Bye
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: fog-and-quiet, object-still, hands-and-making, people — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Name band and rails
One viewport filled completely with tiles on 8px gaps and 8px margins. Across the top, a band tile 170px tall holds the name on one line at clamp(140px, 14.4vw, 220px), heavy, tracking -0.04em, centred and deliberately wider than the band so both ends are cropped by the tile's edges (overflow: hidden, white-space: nowrap). Under it a row of four equal tiles, 64px tall, each holding one text link at 16px, top-left aligned. The remaining 62% of the height is three columns. Left rail (columns 1-2): two stacked tiles, a portrait photograph above and a short list of five facts below. Centre (columns 3-10): one large photograph tile, object-fit: cover, with a statement tile in the ground tone laid along its bottom third holding one sentence at clamp(24px, 2.4vw, 36px), top-left aligned on 24px padding. Right rail (columns 11-12): a full-height stack of five flat colour tiles, a light-to-dark run from the palette; the lowest takes the accent colour and holds the single action, the others each carry one short fact at 15px.

On a phone: Tiles restack in two columns with 6px gaps. The name band stays full width: 26vw type cropped at both sides in a 110px band. The four link tiles become a two-by-two block. The large photograph tile follows at full width, 4:3, with the statement tile under it at 6vw. The colour rail becomes a horizontal row of five short tiles, the action tile last and twice as wide.
Headline: The name on one cropped line, any length, plus one sentence of up to 60 characters in the statement tile.

Adjusted for this page:
- It sets a sentence large over several lines: jurors read that as a long headline. Either cut it to a two-line headline at display size, or keep it a statement at 36px or less on three lines (24px, four lines on a phone).

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. work — Giant title, uneven wall (mosaic)
A one- or two-word title in capitals at clamp(72px, 9vw, 136px), leading 0.9, sits flush left at the 16px margin; on its baseline at the far right, one underlined link at 15px to the full archive. 32px below, thumbnails pack into an uneven wall with 8px gaps: a flex-wrap layout in which each row has a different fixed height (cycle 240, 360, 200, 300px) and each tile's width follows its image ratio, so widths range from one-sixth to one-half of the page and tile edges do not line up between rows. Rows are justified to both margins with `flex-grow`. Under each image, one caption line at 12px: project name left, year in the soft ink right. Square corners; no hover overlay beyond a slight dimming of the other tiles. Holds 9–16 projects. The section ground is one flat colour, dark or saturated, edge to edge.
On a phone: Title at 17vw on one line. The wall becomes rows of alternating composition: one full-width tile, then two tiles splitting the width 62/38, then 38/62, with 6px gaps and fixed row heights of 220 and 150px. Captions stay as one line under each tile.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.
- It names a kind of typeface: use the dealt faces (display Bricolage Grotesque, text Bricolage Grotesque) and their settings; capitals only where the type system sets them.

### 2. about — Team on colour tiles (grid)
A one-line heading of two or three words at 28–36px sits top-left; nothing sits to its right. 40px below, a grid of portrait tiles: six columns with 12px gaps across the full content width for 12 or more people, four columns for 4–8. Every tile is a 4:5 photograph treated identically so mixed-quality headshots look like one set: `filter: grayscale(1) contrast(1.15)` with `mix-blend-mode: multiply` over a flat tint, the tints rotating through four palette colours in a fixed order. Square corners or one small radius. Under each tile, left-aligned to its edge with 10px of space: the name at 15px in full ink and the role at 13px in the soft ink, up to two lines. Rows are 36px apart. A leftover tile in the last row stays at the left; it is not centred. No hover lift and no social icons.
On a phone: Two columns with 8px gaps; tiles stay 4:5 with names at 14px beneath. For more than ten people, switch to three columns and show the name only. The heading sits above at 24px. Tints keep their rotation, so the grid reads as a checkerboard of colours.

### 3. contact — Photo strip, three-cell bar (strip)
A saturated flat field about 80svh tall. Across the top, 48px from the section edge, a strip of small photographs runs off both sides: all 150px tall at differing widths (3:4, 1:1, 3:2 in turn), 8px gaps, ten or more, drifting slowly as a marquee. A heading of two to four words at clamp(36px, 4vw, 60px) sits 72px below the strip at the left margin. 40px below the heading, the newsletter or booking form is one bar spanning the content width, 96px tall, divided into three equal cells with 8px gaps. Each cell is a filled block in a tone one step from the field with one radius: the first two are inputs (name, email) with placeholder text centred at 18px, the third is the submit action in the inverse colours with its word centred. Focus changes a cell's fill to the lightest tone. Small print at 13px sits under the first and third cells.
On a phone: The strip is 110px tall and scrolls by touch. The heading follows at 9vw. The three cells stack as full-width filled blocks 60px tall with 8px gaps, the submit block last. Small print sits beneath the stack, left-aligned.

## 8. Motion — Edge-to-edge marquee
One line of very large type travels sideways across the full width at a slow constant speed, as a band between two sections or as the closing statement. Linear timing, duplicated content for a seamless loop, paused on hover and under reduced motion. One marquee per page, carrying real words (the name, the claim), never a list of buzzwords.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 9. Where the richness comes from
The fit. A full board with consistent gaps and varied tile contents is satisfying in the way a packed suitcase is.

## 10. How this direction goes wrong
Tiles are filled, never outlined, and never carry shadows. Do not put an icon and a two-line feature blurb in every tile; vary what tiles hold. Decide the phone layout as its own board: two columns, tiles re-ordered so the name and statement lead.

## 11. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Aspen Search** (Awwwards Site of the Day, studied score 8.2) `aww-aspen-search`
  Idea: The page is a ruled tile system with no margins: the two-word name is split across cells that alternate type, dithered canvas, black and one mint green.
  Hero: A 60px top bar ruled into cells: black logo square, local time, nav links starting at the centre line, a theme toggle and a black contact cell flush right. Below, the viewport is a two-by-two grid divided by 1px black lines, no outer margin. Top-left is white with the first word of the name at 12.5vw, weight 450, sitting bottom-left. Top-right and bottom-left cells hold a black-and-white dithered canvas crossed by large pale-grey blade shapes that ignore cell borders. The bottom-right quadrant splits into a black cell (24px white summary, mono caps action row at its base) and a mint cell (second statement, client-logo marquee along the bottom).
  Worth taking: Rule the whole viewport into cells with 1px lines and no page margin, then give the nav, the headline, the summary and the proof each its own cell with a flat fill.
- **Oimachi** (Awwwards Site of the Day, studied score 7.1) `aww-oimachi`
  Idea: A studio homepage that behaves like a dense dashboard: work, posts, experiments and testimonials tiled edge to edge with 8px gutters instead of spaced-out sections.
  Hero: Charcoal ground (#181818) with only 8px side margins. Top-left: a round logo, then five tiny black rectangular chips with bold white 13px labels; top-right a contact chip and a theme toggle. The headline starts at the left margin about 160px down: two lines of light grotesk at 52px (3.6vw), tight tracking, with one word in italic serif. From 280px to the bottom edge runs a three-part row: two tall images butted together (each about 535x610px: a hand holding a phone on black, a man in a printed tee) and a 330px sidebar of blog posts, each a bold 14px title, two grey truncated lines and a small-radius thumbnail.
  Worth taking: Shrink page margins and gutters to 8px and tile media edge to edge so a portfolio reads as a working dashboard rather than a brochure.
- **Belen Jones** (One Page Love, studied score 7.2) `opl-belen-jones`
  Idea: The whole portfolio is one screen: a slowly turning 3D box skinned with project footage behind a floor-to-ceiling list of outlined client names.
  Hero: One viewport, no scroll. A flat pastel field (periwinkle on load) with a large black-edged 3D box, about half the viewport wide, rotating right of centre; each face shows a project film still. Over everything, nine project names are stacked flush-left from top edge to bottom edge in an ultra-bold extended sans at 7.6vw, caps, drawn as thin outlines only, lines almost touching; the active name is filled solid. Two small white pill buttons sit top-right; a two-line mono location and clock bottom-right. On first load only the box is visible, drifting in from the right with its texture mirrored, before the list appears.
  Worth taking: Set a project list as outline-only giant caps over the media and fill just the active line, so the list is both navigation and texture.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to C:/Users/Martin/OneDrive/Documentos/Github/Portafolio/.taste-skill/direction.json · reprint with `node draw.mjs --show`
