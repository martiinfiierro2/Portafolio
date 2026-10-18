# DIRECTION SHEET — The split stage
seed 1120977938 · drawn 2026-10-15 · sector personal-portfolio
Brief: Martin Fierro. Ilustracion trabajando con tecnologias, cabecera flotante, sin proyecto estrella. Boceto, no implementar.

| | |
| --- | --- |
| Direction | The split stage |
| Hero | Inset photograph, crossing wordmark |
| Type | kept from the brand |
| Colour | kept from the brand |
| Sections | work (Big names, fixed preview) → about (Founder's letter) → contact (One field, nothing else) → footer (Name across the last photograph) |
| Motion | Scaling wordmark |
| Photographs | the "Objects" set, as atmosphere |

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
Half the screen never moves. One side is a fixed photograph (or object, or product view) that stays in place for the whole visit; the other side is a calm scrolling column with everything you need to read. The fixed half keeps the feeling present while the reader gets on with the facts, like sitting in the room while reading the menu. As sections pass, the fixed image may quietly change to the one that matches.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
Desktop: a two-column page, 50/50 or 45/55. One column is `position: sticky; top: 0; height: 100svh` and holds a single photograph filling it edge to edge, or the object centred on a flat field. The other column scrolls and holds all content in a single narrow measure (max 46ch) with comfortable padding (48–72px): name and one-line description first, then sections separated by generous space, then contact and footer. Headings in the scrolling column are modest (32–44px). The column grounds differ: photograph on one side, flat paper colour on the other, meeting at a clean vertical edge. On a phone the fixed half becomes a 60svh image at the top that stays sticky behind the first section, then releases.

## 3. Type
Kept from the brand. A text-first setting: a readable serif or a calm sans at 17–19px, with one display size for the name. Left-aligned throughout.

## 4. Colour
Kept from the brand. The paper colour of the reading column is chosen against the photograph: a tone taken from its shadows or its lightest area. One ink, optionally one accent ink for links and the action.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node C:/Users/Martin/.agents/skills/design-taste-frontend/scripts/assets.mjs "personal portfolio"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

One excellent portrait-orientation photograph for the fixed half, plus three or four more that crossfade in as their sections arrive. Small inline photographs in the reading column are optional and should be few.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Objects" set (single objects seen close: instruments, tools, cameras, books)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/63/1600/1000` — Cup of coffee seen from above on a bright red surface · mid tone · bright red, white, brown · calm area: right · native landscape · photo: Justin Leibow
- `https://picsum.photos/id/486/1600/1000` — Black vintage typewriter with blank paper seen from above on white · light tone · white, black · calm area: left · native portrait · photo: Florian Klauer
- `https://picsum.photos/id/535/1600/1000` — Colourful shirts on wooden hangers along a metal pipe rail · dark tone · charcoal, orange, green · native portrait · photo: Jeff Sheldon
- `https://picsum.photos/id/80/1600/1000` — Pine cones resting on weathered wood in black and white · mid tone · grey, charcoal · black-and-white · calm area: top · native landscape · photo: Sonja Langford
- `https://picsum.photos/id/39/1600/1000` — Close-up of a turntable tonearm resting on a vinyl record · light tone · white, black, warm grey · calm area: top · native landscape · photo: Luke Chesser
- `https://picsum.photos/id/24/1600/1000` — Open book lying on a wooden table in soft light · light tone · cream, warm brown · calm area: top · native landscape · photo: Alejandro Escamilla
- `https://picsum.photos/id/687/1600/1000` — Coin-operated viewing binoculars facing a pale sea and sky · light tone · white, pale blue, silver grey · calm area: right · native landscape · photo: davide ragusa
- `https://picsum.photos/id/175/1600/1000` — Close-up of an analogue clock face in black and white · mid tone · white, black, grey · black-and-white · native landscape · photo: petradr
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: fog-and-quiet, architecture, hands-and-making, people — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Inset photograph, crossing wordmark
One deep, dark flat field. A tall portrait photograph fills the left 47% of the viewport, inset 20px from the top, left and bottom edges, with a 12px radius and object-fit: cover; it is position: sticky for the length of the page while the right side scrolls. Five text links at 15px sit top-right on a 32px margin, the last of them the single action. There is no logo at the top. In the right half, at 44% of the height and centred on that half's own axis, one supporting sentence in the light ink at 24px on up to three lines, max 26ch. Along the bottom runs the name in lowercase at clamp(120px, 12vw, 200px), light or regular weight, tracking -0.04em, on one line. It starts over the photograph's lower-right corner, overlapping the image by about 10% of the viewport width (z-index above it; mix-blend-mode: difference keeps the letters legible on the picture), and ends flush with the right margin, its baseline 40px above the bottom edge.

On a phone: The photograph takes the top 58% of the screen, inset 12px, with the same radius. The name runs under it at 21vw on one line, its ascenders overlapping the photograph's bottom edge by 3vw. The sentence follows at 17px, left-aligned on a 20px margin. Links reduce to a menu word and the action on the top row, set over the photograph.
Headline: The name in lowercase on one line, up to 9 characters at this size; a longer name drops to 9vw.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.
- It blends text with `difference`: over anything but black, white or grey that gives random hues. Use a solid ink chosen for each ground instead.

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. work — Big names, fixed preview (index)
Project names are the index. In columns 1–8, five to nine names stack one per line at clamp(44px, 5.4vw, 80px), leading 1.0, each row a link with 10px of vertical padding. All names rest in the ink at 35% opacity except the active one, which is full ink; the first is active by default, and hover or keyboard focus moves the state. To the right of each name, on its baseline at 14px: the discipline and the year. In columns 9–12 a `position: sticky; top: 15vh` frame, 4:5 and 26vw wide with square corners, shows the active project's photograph; all images are stacked in the frame and swapped by opacity over 200ms. A two-word heading at 28px sits top-left, 48px above the first name. Nothing is drawn between rows: the size of the type and the dimming do the separating.
On a phone: Names at 9.5vw, all in full ink, one per line; discipline and year sit beneath each name at 13px. There is no sticky frame: each name is preceded by its own photograph at 16:10, full width, so the list becomes image then name, repeated, with 40px between projects.

Adjusted for this page:
- It fades text: anything a visitor reads, inactive items of a list included, is `--ink` or `--muted` at full strength (contrast 4.5:1 or more). The active item is told apart by `--ink` against `--muted`, weight or the accent, not by fading the rest.

### 2. about — Founder's letter (stack)
A letter in a centred column 520px wide with at least 160px of empty ground above and below. At the column's top-left, a round portrait 44px across. 28px below it, four or five short paragraphs at 16–17px with leading 1.55, each two to four lines and separated by one blank line, written in the first person. No heading. The sign-off is the writer's name at 22px in the text face's italic, with the role at 14px in the soft ink beneath it. One phrase in the letter may carry a flat marker-colour background. Variant for a page built as an object: the letter sits on a filled paper-colour sheet 640px wide with 60px padding on a contrasting ground, square corners, its bottom edge cut into small scallops with `clip-path`, and below a row of 5px round dots a tear-off strip 72px tall that carries the email address.
On a phone: The column takes the full width with 24px margins; text at 16px, portrait 40px. In the sheet variant the sheet spans edge to edge with 24px padding and keeps its shaped bottom edge; the tear-off strip stacks the email above a full-width button.

Adjusted for this page:
- It names a kind of typeface: use the brand faces.

### 3. contact — One field, nothing else (stack)
The whole section is one prompt and one field in a column 520px wide, on the page's text column line or centred, with 200px of empty ground above and 160px below. The prompt is two lines at one size, 24–28px in medium weight: the first line in the soft ink, the second in full ink. 28px below, a single input 520px wide and 64px tall with a 12px radius, filled with the lightest tone on the page so it is the only bright surface in view; no outline at rest and a 2px inner ring in the accent on focus. Inside the right end of the field, 8px from its edge, a round submit button 44px across with an arrow and an accessible name. 16px below the field, one line at 13px says what happens next. 72px lower, three label and value rows at 14px: email, phone, address.
On a phone: The column fills the width with 20px margins. Prompt at 22px. The field stays one row, 60px tall, with the arrow button inside its right end. The three label and value rows stack with the label above each value and 20px between them.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.

### 4. footer — Name across the last photograph (full-bleed)
The footer is the page's last photograph, full-bleed at 100vw by 100svh, darkened evenly with `filter: brightness(0.62)` so paper-coloured type reads everywhere on it. Three layers of text sit on the image. Top row, 32px from the edge: a short link list at 16px at the left margin and contact details at the right margin, each no wider than three columns. Mid-height is left to the photograph. Along the bottom, the wordmark runs the full width in the paper colour, letters about 12–20vw tall depending on the name's length, baseline 56px above the edge; under it one line of legal text at 13px. Choose an image whose interest is in its middle band, since the top and bottom carry text. No panel, no box and no colour block separates the footer from the image: the photograph is the footer.
On a phone: The photograph is 100vw by 88svh, cropped to its strongest vertical slice. Links stack at the top-left at 16px, contact beneath them. The wordmark is fitted to the width along the bottom, with the legal line under it at 12px.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Scaling wordmark
The giant name responds to the scroll: as the first screen leaves, the wordmark scales down a few percent (or grows from 0.94 to 1 as the footer arrives) on a scroll-linked timeline, so the monument feels heavy. Travel stays under 8%. Static fallback where scroll timelines are unsupported. Recipe: 'Scroll-linked progress' in references/motion.md, animating `scale`.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 9. Where the richness comes from
A full-height photograph always in view, against a quiet, well-set column of text.

## 10. How this direction goes wrong
The reading column must be genuinely well typeset, since it is half the page. Do not put cards or grids in it. Check that the fixed image crops well at short viewport heights. In blind tests the commonest complaint was monotony: several screens of the same split with only the text changing. Change what the reading half holds from section to section (a list, a large figure, a table, a full-colour panel, a drawing) and let at least one section break the split and run full width.

## 11. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Rafael Derolez** (One Page Love, studied score 7.3) `opl-rafael-derolez-2026`
  Idea: A portfolio as a phone carousel: a fixed text rail on the left narrates whichever phone-shaped screen is centred on the right.
  Hero: Dark charcoal page split by a vertical hairline at 30% width. Left rail: a 55px header row with name, slash and current section as a breadcrumb in 16px sans, plus a small cobalt ticket-shaped hire button with a perforated divider and arrow; below a hairline, four short paragraphs of 16px grey text with white links, top-aligned, leaving the lower 40% of the rail empty. Right 70%: three phone-proportioned frames with large rounded corners in a row; the centre one upright, full brightness and about 680px tall, the outer two smaller, dimmed and rotated in perspective toward the centre.
  Worth taking: Use a breadcrumb (name / current item) as the only heading and update its last word as the content changes.
- **Le Petit Bleu** (One Page Love, studied score 7.8) `opl-le-petit-bleu`
  Idea: The cafe's teal-and-white stripes become the whole system: one teal ink on cream, everything boxed in thin double outlines like printed menu cards, beside a permanently visible photo of the room.
  Hero: Viewport split 50/50 with 12px gaps. Left: a cream panel with a thin pale-teal outline and rounded corners. Inside, a second outlined box is the nav bar: two-line hamburger left, teal brush-script logo about 300px wide centred, a caps order link right. Below, a two-line light serif headline at about 3.5vw, centred, in teal, then two centred stacks, each a bold caps label, a serif line and a solid teal button wrapped in a second thin outline. Right: a full-height rounded photo of a striped booth, with an outlined hours bar across its top, three slide dots bottom-left and a white address card bottom-right.
  Worth taking: Print everything in one brand ink on cream, including body text, rules and buttons, and let photographs supply the other colours.
- **davesocozy** (One Page Love, studied score 7.5) `opl-davesocozy`
  Idea: A collage artist introduces himself by building a collage: each scroll step changes one caption and drops more paper cut-outs onto a green cutting mat.
  Hero: Cream page with a single centred object: a green cutting mat 776px wide by 582px tall (54% of viewport width), printed with a white grid, an inner border and diagonal guide lines, casting a soft shadow. One small portrait photo lies at its exact centre, tilted about three degrees. A one-line greeting in bold monospace at 32px sits 30px above the mat. The four viewport corners hold fixed controls: a glossy green flower logo top-left and three dark brown bevelled buttons in uppercase mono (shop top-right, Instagram bottom-left, enter studio bottom-right). A small scroll cue sits under the mat.
  Worth taking: Pin one physical work surface in the centre and let scrolling add objects to it while a single caption line above changes, instead of stacking sections.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to C:/Users/Martin/OneDrive/Documentos/Github/Portafolio/.taste-skill/direction.json · reprint with `node draw.mjs --show`
