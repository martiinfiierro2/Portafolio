# DIRECTION SHEET — The page is the object
seed 611440101 · drawn 2026-10-15 · sector personal-portfolio
Brief: Martin Fierro. Ilustracion trabajando con tecnologias, cabecera flotante, sin proyecto estrella. Boceto, no implementar.

| | |
| --- | --- |
| Direction | The page is the object |
| Hero | Card over a dim room |
| Type | kept from the brand |
| Colour | kept from the brand |
| Sections | work (Stacked folders with tabs) → about (Founder's letter) → contact (Clip-out coupon form) → footer (The back of the card) |
| Motion | Pinned story |
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
Find the printed or physical artefact that already exists in the subject's world and build the page as that thing. A wedding site is the invitation card. A restaurant is its menu. A conference is the ticket; a record is its sleeve; a shop is the receipt or the swing tag; an archive is a stack of tabbed folders; a course is the syllabus sheet. The artefact supplies everything a template would otherwise invent: its proportions, its typographic manners, its way of grouping information. Visitors recognise the object instantly, which is why these pages feel specific.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
The first screen shows the artefact as a single filled panel (paper colour on a contrasting ground) centred or offset, with believable proportions: a card at 5:7, a ticket at about 2.2:1 with a notch cut by `clip-path`, a menu as a tall sheet. All primary content lives on it, set the way that object is set: centred and symmetrical for an invitation, in tidy aligned columns for a menu or ticket. The ground behind is a flat colour or one full-bleed photograph. As the page continues, each section is another piece of the same stationery: a second card, a tear-off stub, a folded panel, always filled shapes with real edges (straight, notched, scalloped, perforated by a dotted `border` of round dots at 4px or more), never outlined boxes. The footer is the back of the object.

## 3. Type
Kept from the brand. Take the manners of the artefact: a bookish serif with small caps avoided, or a blunt condensed face for tickets and posters. Sizes stay within what print would use relative to the panel; the name is large on the panel, details are small and exact.

## 4. Colour
Kept from the brand. Paper and ink plus the ground the paper sits on. Two or three flat colours in total, like a two-colour print job.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node C:/Users/Martin/.agents/skills/design-taste-frontend/scripts/assets.mjs "personal portfolio"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Optional. One photograph behind the object, or small photographs placed on it like tipped-in plates. The object itself is the image.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Objects" set (single objects seen close: instruments, tools, cameras, books)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/63/1600/1000` — Cup of coffee seen from above on a bright red surface · mid tone · bright red, white, brown · calm area: right · native landscape · photo: Justin Leibow
- `https://picsum.photos/id/687/1600/1000` — Coin-operated viewing binoculars facing a pale sea and sky · light tone · white, pale blue, silver grey · calm area: right · native landscape · photo: davide ragusa
- `https://picsum.photos/id/39/1600/1000` — Close-up of a turntable tonearm resting on a vinyl record · light tone · white, black, warm grey · calm area: top · native landscape · photo: Luke Chesser
- `https://picsum.photos/id/24/1600/1000` — Open book lying on a wooden table in soft light · light tone · cream, warm brown · calm area: top · native landscape · photo: Alejandro Escamilla
- `https://picsum.photos/id/175/1600/1000` — Close-up of an analogue clock face in black and white · mid tone · white, black, grey · black-and-white · native landscape · photo: petradr
- `https://picsum.photos/id/535/1600/1000` — Colourful shirts on wooden hangers along a metal pipe rail · dark tone · charcoal, orange, green · native portrait · photo: Jeff Sheldon
- `https://picsum.photos/id/80/1600/1000` — Pine cones resting on weathered wood in black and white · mid tone · grey, charcoal · black-and-white · calm area: top · native landscape · photo: Sonja Langford
- `https://picsum.photos/id/486/1600/1000` — Black vintage typewriter with blank paper seen from above on white · light tone · white, black · calm area: left · native portrait · photo: Florian Klauer
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: fog-and-quiet, architecture, hands-and-making, people — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Card over a dim room
A full-bleed, low-key photograph of the room fills the viewport, darkened with `filter: brightness(0.7)` so it reads as atmosphere. Centred over it is one square-cornered panel in a flat warm tone taken from the photograph: columns 4–10, about 55% of the width and 62% of the height, a filled programme card with 32px padding. Along its top edge the three words of the title are spread to the left, centre and right in bold condensed capitals at clamp(28px, 2.5vw, 38px); that line is the headline. Under it sit two left-aligned blocks in the same face and size, line-height 1.0: the facts (date, time, place) as three short lines, then one supporting sentence held to 30ch. Along the card's bottom edge: a credit at left in 14px, the single action as a solid rectangular button in the centre, one text link at right. There is no navigation outside the card. The card is `position: sticky`: as the page scrolls it shrinks with `transform: scale` toward the bottom-left corner and stays there as a ticket-sized stub while photographs of differing sizes pass on a flat ground.

On a phone: The photograph fills 100svh and the card sits centred at full width minus 16px margins, 70svh tall. The title words stack as a two-line heading at 9vw at the card's top-left. The facts and the supporting sentence follow at 5.2vw in the condensed face. The action button spans the card's bottom edge. On scroll the card shrinks to a 120px stub pinned bottom-left.
Headline: The event or venue name, three words at most and up to about 8 characters each, spread across the card's top edge; two lines on a phone.

Adjusted for this page:
- It names a kind of typeface: use the brand faces.
- It sets a sentence large over several lines: jurors read that as a long headline. Either cut it to a two-line headline at display size, or keep it a statement at 36px or less on three lines (24px, four lines on a phone).

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. work — Stacked folders with tabs (band)
Projects are filed as folders: four to six full-width flat colour bands stacked so that each shows a 64px strip above the next, built with `position: sticky` and increasing `top` offsets (0, 64, 128px) so the bands pile up as the page scrolls. From the top-left edge of each band one or two tabs rise: filled shapes 44px tall and 200–320px wide with shouldered corners cut by `clip-path: polygon()` or an inline SVG path, side by side with 6px gaps, each in a flat colour that contrasts with its band. The project name sits inside the tab at 26–28px; the category sits right-aligned in the band's visible strip at 15px. An open band is 80svh: a 16:10 photograph in columns 1–7 and, top-aligned in columns 9–12, a 60-word description with a link. A two-word heading at 32px precedes the stack.
On a phone: Bands do not stick; they stack in normal flow, each led by one tab 40px tall with the name at 20px and the category beside it. Inside a band the photograph is full width at 4:3 with the description beneath at 16px and 20px padding.

### 2. about — Founder's letter (stack)
A letter in a centred column 520px wide with at least 160px of empty ground above and below. At the column's top-left, a round portrait 44px across. 28px below it, four or five short paragraphs at 16–17px with leading 1.55, each two to four lines and separated by one blank line, written in the first person. No heading. The sign-off is the writer's name at 22px in the text face's italic, with the role at 14px in the soft ink beneath it. One phrase in the letter may carry a flat marker-colour background. Variant for a page built as an object: the letter sits on a filled paper-colour sheet 640px wide with 60px padding on a contrasting ground, square corners, its bottom edge cut into small scallops with `clip-path`, and below a row of 5px round dots a tear-off strip 72px tall that carries the email address.
On a phone: The column takes the full width with 24px margins; text at 16px, portrait 40px. In the sheet variant the sheet spans edge to edge with 24px padding and keeps its shaped bottom edge; the tear-off strip stacks the email above a full-width button.

Adjusted for this page:
- It names a kind of typeface: use the brand faces.

### 3. contact — Clip-out coupon form (split)
The form is a coupon to cut out. One filled card in a strong flat colour, about 2.2:1, spans columns 2–11 with a 14px radius, with 120px of ground above and below. Semicircular notches 28px across are cut into its top and bottom edges at the 46% mark with `clip-path` or an SVG `mask`, and a vertical row of round dots (a dotted `border-left` 5px thick in the ground colour) joins the two notches as the perforation. Left of the perforation, with 48px padding: a two-line heading of three to five words at clamp(28px, 3vw, 44px) in heavy capitals at the top, and one sentence at 16px at the bottom. Right of it: four inputs stacked with 10px gaps, each a filled block 52px tall in a lighter tone of the card with its placeholder at 16px, then a full-width solid submit bar 56px tall in the darkest ink. Inputs keep visually hidden `label` elements.
On a phone: The card turns upright and spans the width with 12px margins. The perforation becomes horizontal: notches on the left and right edges, dots across. Heading and sentence sit above it; the four inputs and the submit bar sit below, each 54px tall.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.
- It names a kind of typeface: use the brand faces.
- It draws lines or borders: keep them only inside a table, a form or a `data-ui` fragment; elsewhere separate with space or a change of ground.

### 4. footer — The back of the card (stack)
The footer is the reverse side of the page's artefact, laid out as the back of a postcard. A paper-coloured panel spans columns 2–11 on the contrasting ground, about 420px tall, its top edge cut into a row of twelve semicircular scallops (an inline SVG path or `clip-path`, each scallop about 100px wide). The panel is divided by space into two halves. Left half: a short sign-off of two to four words at 32px, then two or three lines at 16px, written like a message. Right half: the address block, four left-aligned lines at 18px with 12px between them, each line a link (email, telephone, street, social); above it in the top-right corner, a stamp: one small photograph, 3:4 and 88px wide, with a 6px paper-coloured margin. Along the panel's bottom edge, a single centred line at 12px gives the copyright like a printer's imprint.
On a phone: The panel runs full width with six scallops across its top edge. The stamp sits top-right at 64px wide; the sign-off and message come first, then the address lines at 17px beneath them, then the imprint line centred at 12px.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Pinned story
One element holds its place with `position: sticky` (a title, a frame, a product fragment) while the items that belong to it scroll past or swap inside it. The page's ordinary scrolling does the work; nothing is hijacked. Keep the pinned run under six screens. Recipe: 'Pinned story' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 9. Where the richness comes from
Recognition. The shaped edges, the print-like alignment and the limited inks make a familiar object out of plain HTML.

## 10. How this direction goes wrong
Choose an artefact that truly belongs to the subject, or it becomes costume. Shape the edges with fills and `clip-path`; an outlined rectangle with a thin border is not an object. Keep text sizes readable on a phone, where the object becomes full width with its shaped edge kept at top and bottom.

## 11. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Mosby’s Files** (Awwwards Site of the Day, studied score 8) `aww-mosbys-files`
  Idea: An archive of architects presented as a physical stack of coloured index-tab file folders that you flip through.
  Hero: Charcoal background. A slim top bar over a hairline holds the condensed wordmark dead centre and one mono link far right. The headline is one centred line of heavy condensed uppercase at 10vw, about 71% of the width, in the upper quarter. Beneath it, a three-line centred serif paragraph in mid-grey, about 42% wide. From 51% down sits a stack of file folders 86% of the viewport wide: each is a flat colour band with one to three trapezoid tabs rising from its top-left edge, each tab a different colour holding a serif name. Mono category labels sit right-aligned. The front red folder is open, running off the bottom.
  Worth taking: Build navigation as stacked full-width colour bands with trapezoid tabs, each tab coloured to clash with the folder behind it.
- **Sarah & Matt Wedding** (One Page Love, studied score 8) `opl-sarah-matt-wedding`
  Idea: The site is the invitation: a letterpress-style card rendered as a physical object opens the page, and its ornaments, rules and small typographic parts become the components for everything after it.
  Hero: A flat blush-pink field fills the viewport. Top-left sits a gold filigree monogram about 120px square; three plain nav links are centred on the same line; a solid gold rectangular RSVP button sits top-right. Below, centred, a portrait invitation card half the viewport wide starts 200px down and is cropped by the bottom edge, with a soft halo shadow and a debossed border with scalloped inner corners. On the card: the two names in a large italic swash serif, staggered left and right against two ornamental roundels, separated by hairline rules carrying tiny wide-tracked caps for date and time.
  Worth taking: Make a real-world object (an invitation, a ticket, a label) the hero and reuse its small typographic parts, such as a boxed address line with slashes, as recurring components down the page.
- **Belen Jones** (One Page Love, studied score 7.2) `opl-belen-jones`
  Idea: The whole portfolio is one screen: a slowly turning 3D box skinned with project footage behind a floor-to-ceiling list of outlined client names.
  Hero: One viewport, no scroll. A flat pastel field (periwinkle on load) with a large black-edged 3D box, about half the viewport wide, rotating right of centre; each face shows a project film still. Over everything, nine project names are stacked flush-left from top edge to bottom edge in an ultra-bold extended sans at 7.6vw, caps, drawn as thin outlines only, lines almost touching; the active name is filled solid. Two small white pill buttons sit top-right; a two-line mono location and clock bottom-right. On first load only the box is visible, drifting in from the right with its texture mirrored, before the list appears.
  Worth taking: Set a project list as outline-only giant caps over the media and fill just the active line, so the list is both navigation and texture.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to C:/Users/Martin/OneDrive/Documentos/Github/Portafolio/.taste-skill/direction.json · reprint with `node draw.mjs --show`
