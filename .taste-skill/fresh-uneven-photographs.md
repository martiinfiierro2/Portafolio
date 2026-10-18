# DIRECTION SHEET — Photographs at uneven sizes
seed 825396392 · drawn 2026-10-16 · sector personal-portfolio
Brief: Exploracion libre de portfolio web con contenido de muestra. Ocho opciones independientes del portfolio actual. Claro y oscuro. No revista ni poster. Solo bocetos.

| | |
| --- | --- |
| Direction | Photographs at uneven sizes |
| Hero | Stepped title, two photographs |
| Type | Switzer |
| Colour | Forest and lime |
| Sections | work (Loose scatter with pauses) → about (Pinned title, portraits pass) → contact (Sentence, portrait, two links) |
| Motion | Masked headline |
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
A calm page where the pictures are placed like prints on a gallery wall: each at its own size and position, with text set small and light between them. Nothing lines up in the obvious way, yet everything sits on a grid you can feel. The unevenness is what makes it read as art-directed by a person: a small portrait far left, a wide landscape running off the right edge, a square that overlaps the next section. It lets photographs lead without ever becoming a slideshow.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
A 12-column grid with wide margins (5–7vw). The hero is a single line of large light type (6–9vw) across the top third, and below it one photograph placed off-centre (columns 6–12, 16:10), its top edge overlapping the baseline zone of the headline by a few pixels of deliberate tension. Each following section places two or three photographs with different spans and vertical offsets: for example a 3:4 portrait in columns 2–5 starting 120px lower than a 16:10 landscape in columns 7–12; then a single small 1:1 in columns 9–11 beside a paragraph in columns 2–6. Paragraphs are short (max 40ch) and sit in the gaps. No two consecutive sections use the same arrangement. Vertical spacing is large and irregular on purpose (120–260px).

## 3. Type — Switzer
A single roman weight of a Swiss neo-grotesk at two or three modest sizes; position and grey value do the work that size and bold usually do. Suits architects, galleries, studios and any quiet page where photographs carry the scale.
```html
<link rel="preconnect" href="https://api.fontshare.com">
<link rel="preconnect" href="https://cdn.fontshare.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500&display=swap" rel="stylesheet">
```
- Display: **Switzer** — weight 400 · tracking -0.03em · leading 1.1 · sentence case; headings stay small (28–40px) and at most one line jumps to 5vw
- Text: **Switzer** — 400 for everything, 500 only for names and links · leading 1.45 · tracking -0.01em; hierarchy by ink against mid-grey
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
A light or regular weight at large size for the few headings; small, quiet text. Serif or a slender sans. Everything left-aligned to grid lines.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Forest and lime
```css
:root {
  --bg: #0f1f10;
  --surface: #162a17;
  --ink: #ffffff;
  --muted: #9aa39a;
  --accent: #c6f19d;
  --accent-ink: #0f1f10;
  --field-1: #000000;  --field-1-ink: #ffffff;
  --field-2: #ffffff;  --field-2-ink: #0f1f10;
}
```
Forest green, black and white sections alternate, with forest green holding the most; photographs stay in moss greens and stone browns. Pale lime sits on small squares only, such as arrow buttons and the closing wordmark.
A pale neutral ground with one deep ink taken from the photographs. No accent beyond a quiet link colour.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node C:/Users/Martin/.agents/skills/design-taste-frontend/scripts/assets.mjs "contenido muestra"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Six to nine photographs from one set, in a deliberate mix of ratios (3:4, 4:5, 1:1, 16:10, 21:9). Square corners. Captions, if any, are one short line under an image in the soft ink.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Fog and quiet" set (misty, muted, minimal landscapes and empty horizons; calm areas for text)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/594/1600/1000` — Small boathouse at the end of a jetty on dark water at night · dark tone · black, deep purple, warm white · calm area: top · native landscape · photo: Aurélien bellanger
- `https://picsum.photos/id/228/1600/1000` — Single round hay bale in a field under dense fog · mid tone · grey green, golden tan · calm area: top · native landscape · photo: Michal Kubicek
- `https://picsum.photos/id/70/1600/1000` — Road lined with tall trees fading into thick fog · mid tone · grey, dark green · calm area: centre · native landscape · photo: Dorothy Lin
- `https://picsum.photos/id/634/1600/1000` — Pine forest dissolving into fog beneath a pale pink sky · mid tone · dark green, pale pink, white · calm area: top · native landscape · photo: Jay Mantri
- `https://picsum.photos/id/941/1600/1000` — Small island on a pale, glassy sea beneath soft clouds · light tone · pale blue, soft white, grey · calm area: bottom · native landscape · photo: Ivan Slade
- `https://picsum.photos/id/926/1600/1000` — Lone figure standing on a hilltop in thick beige fog · light tone · warm beige, olive grey · calm area: top · native landscape · photo: Harman Abiwardani
- `https://picsum.photos/id/842/1600/1000` — Wooden steps with railings descending into pale pink fog · light tone · blush pink, pale grey, slate · calm area: top · native portrait · photo: Joe Beck
- `https://picsum.photos/id/269/1600/1000` — Gulls perched on a concrete wall beside a pale still sea · light tone · white, pale blue, grey · calm area: left · native landscape · photo: Jill Heyer
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: architecture, object-still, hands-and-making, people — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Stepped title, two photographs
A pale neutral ground with 6vw side margins on a 12-column grid. Navigation is three small items on the top edge at 15px: one link hard left, the wordmark centred, the single action hard right. The headline is two words or short phrases on two lines in a thin serif at clamp(72px, 8.3vw, 128px), leading 1.0, stepping diagonally across the middle third of the screen: the first line starts at column 2 with its baseline at 44% of the height; the second is indented to start at column 6 and ends near column 12. Two photographs are placed against the step, both with square corners. A small 16:10 landscape in columns 10-12 hangs from 10% of the height and stops about 20px above the first line. A 4:5 photograph in columns 2-5 starts 24px under the first line's baseline, to the left of the indented second line, and is cropped by the bottom edge of the viewport. Under the second line, starting on column 6, one sentence at 20px in the soft ink, max 36ch. Columns 6-12 of the lower third stay empty.

On a phone: The step survives: the first line at 15vw flush to the 20px left margin, the second line indented by 22vw. The small landscape sits above the title at 46% of the width, pushed to the right margin. The tall photograph follows the title at 72% of the width on the left margin, cropped by the bottom of the screen; the sentence at 16px moves beneath it.
Headline: Two words or short phrases, one per line, at most 9 characters each so the indented second line fits a phone.

Adjusted for this page:
- It names a kind of typeface: use the dealt faces (display Switzer, text Switzer) and their settings; capitals only where the type system sets them.

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. work — Loose scatter with pauses (stack)
One word as heading at 32–40px, top-left on the margin. Projects then appear one at a time down the page, each a single photograph at its own width and side, with 22–30vh of empty ground between them. Use a repeating set of three placements on the 12-column grid: columns 1–6 hugging the left margin at 3:2; columns 9–12 hugging the right margin at 4:5, starting 80px above where the previous image ended so the two overlap in height; columns 3–9 inset at 16:9. Above each image's top-left corner, the project name at 13px in the soft ink; beneath its bottom-left corner, a one-line description at clamp(15px, 1.1vw, 17px) in full ink. Once, in the gap beside the narrow right-hand image, a two-line remark at 20px sits alone in columns 2–5. Square corners. Holds five to eight projects; more belongs in a denser index.
On a phone: Images alternate widths against alternating margins: 100%, 68% right, 82% left, with 72px between projects. The name above and the description below each image stay left-aligned to that image's edge. The two-line remark sits full width between the second and third project.

### 2. about — Pinned title, portraits pass (pinned)
A wrapper tall enough for its portraits: about 90svh per person, up to six people. A `position: sticky; top: 0` layer of 100svh holds the heading, two words at clamp(88px, 12vw, 180px), leading 0.85, centred at mid-height, in white with `mix-blend-mode: difference` so it reads over ground and photographs alike. Beneath it in the stacking order, portraits scroll past in normal flow: each a 4:5 photograph 26–30vw wide, alternately starting at column 2 and ending at column 11, 60svh apart, so each one passes behind a different half of the heading. Under each portrait's left corner: the name at 18px, the role at 14px in the soft ink, and one sentence of up to 30 words in a 280px measure. The last portrait is followed by 40svh of empty ground before the heading releases. Square corners. Nothing else is on screen.
On a phone: The heading shrinks to 17vw and pins 16px from the top instead of at mid-height. Portraits become 72% wide, alternating between the left and right margins, 48px apart, each with name, role and sentence beneath at the portrait's width.

Adjusted for this page:
- It names colours (white): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).
- It blends text with `difference`: over anything but black, white or grey that gives random hues. Use a solid ink chosen for each ground instead.

### 3. contact — Sentence, portrait, two links (band)
One closing row of three elements hanging from the same top line, with open ground between them, on a 12-column grid. Columns 1–5: a sentence of 12–18 words at clamp(26px, 3vw, 44px), four lines, leading 1.1, saying what kind of enquiries are welcome; it is set as a paragraph and there is no separate heading. Columns 8–9: one small square portrait or photograph of the place, 150–170px, with square corners. Columns 10–12: a short question at 18px in medium weight, then 20px below it two underlined links stacked at 18px (the email address and one booking or social link), and beneath them a line at 14px in the soft ink with the city and the usual reply time. Columns 6–7 stay empty. The row has 160px of space above and 120px below. No form. On a dark ground the photograph is the only bright thing in the row.
On a phone: The sentence comes first at 7.4vw. Below it the portrait at 96px square sits at the left margin with the question and the two links to its right, top-aligned, in the remaining width. The city and reply-time line spans the full width beneath.

Adjusted for this page:
- It sets a sentence large over several lines: jurors read that as a long headline. Either cut it to a two-line headline at display size, or keep it a statement at 36px or less on three lines (24px, four lines on a phone).

## 8. Motion — Masked headline
On load, each line of the headline rises from behind its own baseline, about 900ms with a strong ease-out, the second line 110ms after the first; the supporting sentence and the action then fade up together. Nothing else on the page performs. Because headlines are two lines at most, you author the line breaks and wrap each line yourself. Recipe: 'Masked line reveal' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 9. Where the richness comes from
Placement. The differing sizes and offsets create movement on a still page.

## 10. How this direction goes wrong
Uneven is not random: every image edge lands on a column line, and offsets come from a small set of values. On a phone, keep the unevenness with alternating widths (100%, 72% left, 60% right) rather than stacking everything full width.

## 11. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Kononenko Architectural Bureau** (Awwwards Site of the Day, studied score 7.4) `aww-kononenko-architectural-bureau`
  Idea: Let the renders do the talking: one full-bleed visualisation, a name set half in grotesk and half in serif, then alternating oversized sans and serif statements on white.
  Hero: A single architectural render fills the viewport edge to edge: a low grey metal-clad building under a large overcast sky, wild grass across the bottom third. Type is white and tiny except for the name. Top-left at a 24px margin, the bureau name is stacked on three lines at 13px. Top-right, four links run inline separated by commas, the current one underlined. Bottom-left, the name repeats at 60px (4.2vw) on two tight lines, the first two words in grotesk and the last word in a serif at the same size. No button, no scrim, no tagline; the sky takes the upper 45% untouched.
  Worth taking: Set the last word of a sans headline in an upright serif of the same size to give a plain name a signature without any graphic device.
- **Zara Webb** (One Page Love, studied score 8) `opl-zara-webb`
  Idea: A one-woman newborn-care practice presented like a hand-made keepsake: a mascot rabbit, scalloped and flower-shaped cut-outs, candid film photographs.
  Hero: Split exactly in half. Left, on cream: two-line mono caps nav stacks sit at the column's top-left and top-right with a handwritten script logo centred between them. Centred below, a five-line headline in a condensed serif, each line broken to one to three words so the block forms a ragged lozenge; then a three-line 16px sans paragraph and an outlined pill button in mono caps. A line-drawn rabbit on a skateboard rides a hairline at the column's bottom-right. Right: a candid flash photograph bleeds off the top and right edges and stops at 92% height; a lilac pill button and a round chat icon overlay its top-right corner.
  Worth taking: Mask photographs into soft custom shapes (a four-petal flower, a scalloped egg) and let their container crop them.
- **Glide Typeface** (One Page Love, studied score 7.2) `opl-glide-typeface`
  Idea: The page background is one grainy sky that passes from midday blue through sunset pink to a starry night as you scroll down the résumé.
  Hero: Full-viewport grainy gradient: saturated sky blue at the top fading through pale pink to warm amber at bottom-left, with soft diagonal cloud streaks. A translucent white pill navigation bar about 62% of the viewport wide floats centred at the top, name at its left and five links at its right. The name is centred at about 33% height in a tight italic display serif at 6.7vw on one line. Beneath it: a two-line sans introduction at roughly 2vw, a white pill button with a blue dot and blue label, then an underlined text link. The lower 35% of the screen is empty gradient.
  Worth taking: Tie one long background gradient to page position so the palette tells time: day at the hero, dusk mid-page, night with stars at the footer, flipping text from dark to light on the way.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to C:/Users/Martin/OneDrive/Documentos/Github/Portafolio/.taste-skill/direction.json · reprint with `node draw.mjs --show`
