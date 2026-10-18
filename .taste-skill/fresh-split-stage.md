# DIRECTION SHEET — The split stage
seed 1039597983 · drawn 2026-10-16 · sector personal-portfolio
Brief: Exploracion libre de portfolio web con contenido de muestra. Ocho opciones independientes del portfolio actual. Claro y oscuro. No revista ni poster. Solo bocetos.

| | |
| --- | --- |
| Direction | The split stage |
| Hero | Striped card beside the room |
| Type | Gambarino / General Sans |
| Colour | Navy on white |
| Sections | work (Big names, fixed preview) → about (Founder's letter) → contact (One field, nothing else) |
| Motion | Slow crossfade |
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
Half the screen never moves. One side is a fixed photograph (or object, or product view) that stays in place for the whole visit; the other side is a calm scrolling column with everything you need to read. The fixed half keeps the feeling present while the reader gets on with the facts, like sitting in the room while reading the menu. As sections pass, the fixed image may quietly change to the one that matches.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
Desktop: a two-column page, 50/50 or 45/55. One column is `position: sticky; top: 0; height: 100svh` and holds a single photograph filling it edge to edge, or the object centred on a flat field. The other column scrolls and holds all content in a single narrow measure (max 46ch) with comfortable padding (48–72px): name and one-line description first, then sections separated by generous space, then contact and footer. Headings in the scrolling column are modest (32–44px). The column grounds differ: photograph on one side, flat paper colour on the other, meeting at a clean vertical edge. On a phone the fixed half becomes a 60svh image at the top that stays sticky behind the first section, then releases.

## 3. Type — Gambarino / General Sans
A narrow, sharp display serif for headlines against a small plain sans: a five-to-one jump with nothing between. Suits agencies, bakeries and restaurants, fashion and editorial brands.
```html
<link rel="preconnect" href="https://api.fontshare.com">
<link rel="preconnect" href="https://cdn.fontshare.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=gambarino@400&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500&display=swap" rel="stylesheet">
```
- Display: **Gambarino** — weight 400 (single cut) · tracking -0.02em · leading 0.92 · sentence case
- Text: **General Sans** — 400 for body, navigation and buttons, 500 for emphasis · leading 1.5
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
A text-first setting: a readable serif or a calm sans at 17–19px, with one display size for the name. Left-aligned throughout.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Navy on white
```css
:root {
  --bg: #ffffff;
  --surface: #f4f4f2;
  --ink: #1f2b4d;
  --muted: #6a7186;
  --accent: #f7941d;
  --accent-ink: #1f2b4d;
  --field-1: #05070a;  --field-1-ink: #ffffff;
  --field-2: #e3e1dc;  --field-2-ink: #1f2b4d;
}
```
Pure white pages with navy type sit between full-bleed photographs, opening on near-black and closing on a warm grey footer. Tangerine is one small tab or button, never larger than a thumbnail.
The paper colour of the reading column is chosen against the photograph: a tone taken from its shadows or its lightest area. One ink, optionally one accent ink for links and the action.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node C:/Users/Martin/.agents/skills/design-taste-frontend/scripts/assets.mjs "contenido muestra"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

One excellent portrait-orientation photograph for the fixed half, plus three or four more that crossfade in as their sections arrive. Small inline photographs in the reading column are optional and should be few.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Fog and quiet" set (misty, muted, minimal landscapes and empty horizons; calm areas for text)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/194/1600/1000` — Wooden deck and a single rock disappearing into thick fog · mid tone · cool grey, weathered brown · calm area: top · native landscape · photo: Aleksi Tappura
- `https://picsum.photos/id/941/1600/1000` — Small island on a pale, glassy sea beneath soft clouds · light tone · pale blue, soft white, grey · calm area: bottom · native landscape · photo: Ivan Slade
- `https://picsum.photos/id/594/1600/1000` — Small boathouse at the end of a jetty on dark water at night · dark tone · black, deep purple, warm white · calm area: top · native landscape · photo: Aurélien bellanger
- `https://picsum.photos/id/465/1600/1000` — Dark rocky peak emerging from thick white cloud · light tone · white, charcoal, pale grey · calm area: left · native landscape · photo: Paula Vermeulen
- `https://picsum.photos/id/813/1600/1000` — Still blue lake with a faint distant shoreline in haze · mid tone · slate blue, powder blue · calm area: all · native landscape · photo: Roger Burkhard
- `https://picsum.photos/id/552/1600/1000` — Tiny sailboat on a calm sea with distant hills, black and white · mid tone · grey, white, black · black-and-white · calm area: all · native landscape · photo: Hugo Kerr
- `https://picsum.photos/id/266/1600/1000` — Three ships on a distant horizon across a calm blue sea · mid tone · pale blue, deep blue · calm area: all · native landscape · photo: John Maravelakis
- `https://picsum.photos/id/172/1600/1000` — Stone jetty stretching into still water and dense grey fog · mid tone · grey, warm grey · calm area: top · native landscape · photo: Aleksi Tappura
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: architecture, object-still, hands-and-making, people — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Striped card beside the room
The viewport is split 50/50 with a 12px gap and 12px outer margins. The right half is one full-height photograph of the room, corners radiused 16px, `position: sticky` so it stays in view while the left half scrolls. The left half is a printed card: a flat paper-colour panel with the same 16px radius, and the subject's stripe (from its awning, label or ribbon) as the only ornament. Across the card's top runs a band 56px tall made of alternating bars of the single ink colour and paper, each bar 28px wide, built as a flex row of filled blocks. The same stripe returns as an 8px band above the footer and inside the button on hover. Under the band, centred: the wordmark about 300px wide, then a two-line headline in a light serif at clamp(40px, 3.6vw, 56px) in the ink colour, one supporting sentence at 17px held to 36ch, and the single action as a solid rectangular button. Three text links sit in one centred row at 15px, 28px above the card's bottom edge. One ink on paper; the photograph supplies every other colour.

On a phone: The photograph comes first at full width inside 12px margins, 48svh tall, with the 16px radius. The card follows and overlaps the photograph's bottom edge by 24px using a negative margin. Its striped band is 40px tall; below it the wordmark at 56% width, the headline at 8vw on two lines, the sentence and the button, all centred. The links wrap into the card's foot.
Headline: A warm two-line welcome of three to six words, up to about 18 characters per line at 3.6vw.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.
- It names a kind of typeface: use the dealt faces (display Gambarino, text General Sans) and their settings; capitals only where the type system sets them.

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
- It names a kind of typeface: use the dealt faces (display Gambarino, text General Sans) and their settings; capitals only where the type system sets them.

### 3. contact — One field, nothing else (stack)
The whole section is one prompt and one field in a column 520px wide, on the page's text column line or centred, with 200px of empty ground above and 160px below. The prompt is two lines at one size, 24–28px in medium weight: the first line in the soft ink, the second in full ink. 28px below, a single input 520px wide and 64px tall with a 12px radius, filled with the lightest tone on the page so it is the only bright surface in view; no outline at rest and a 2px inner ring in the accent on focus. Inside the right end of the field, 8px from its edge, a round submit button 44px across with an arrow and an accessible name. 16px below the field, one line at 13px says what happens next. 72px lower, three label and value rows at 14px: email, phone, address.
On a phone: The column fills the width with 20px margins. Prompt at 22px. The field stays one row, 60px tall, with the arrow button inside its right end. The three label and value rows stack with the label above each value and 20px between them.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.

## 8. Motion — Slow crossfade
The principal photograph quietly changes: three or four images of the same framing crossfade over about 1.6 seconds, holding five to six seconds each, or the fixed image changes when its matching section arrives. It should feel like light shifting in a room. Pause when the tab is hidden; under reduced motion show only the first image.
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
- **bleibtgleich’26** (Awwwards Site of the Day, studied score 7.5) `aww-bleibtgleich26`
  Idea: One thin vertical rule runs down the page and a tight bold grotesk sentence wraps around it, words stepping from one side of the line to the other.
  Hero: White page, black type. Content sits in a narrow band between 26% and 68% of the width. A 1px vertical rule drops from the top edge at 37% for two-thirds of the height. Left of it: a black blob avatar at the top, a tiny role caption at its foot. Right of it: a tiny location note at the top, the name in two lines of 90px medium grotesk at the bottom. The tagline continues below at the same size, flush to the band's left edge, running past the fold. The upper half is otherwise blank. The handle is split into two pale-grey words fixed in the bottom corners; a black menu pill sits top-right.
  Worth taking: Draw one 1px vertical rule and typeset a large sentence around it, alternating words to either side so the line becomes the text's spine.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to C:/Users/Martin/OneDrive/Documentos/Github/Portafolio/.taste-skill/direction.json · reprint with `node draw.mjs --show`
