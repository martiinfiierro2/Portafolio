# DIRECTION SHEET — The quiet instrument
seed 24027834 · drawn 2026-10-16 · sector personal-portfolio
Brief: Exploracion libre de portfolio web con contenido de muestra. Ocho opciones independientes del portfolio actual. Claro y oscuro. No revista ni poster. Solo bocetos.

| | |
| --- | --- |
| Direction | The quiet instrument |
| Hero | Column on one line |
| Type | Work Sans |
| Colour | Black and crimson |
| Sections | work (Quiet ledger, side preview) → about (Side facts, wide paragraph) → contact (One field, nothing else) |
| Motion | Slow crossfade |
| Photographs | the "Hands and making" set, as atmosphere |

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
Radical understatement. Where every competitor shouts, this page almost whispers: a headline barely larger than body text, a narrow column, small exact demonstrations, and a great deal of untouched space. The restraint is the claim. It says the thing is simple, finished and sure of itself. This only works when it is carried through completely; one loud element breaks it. In the study, a tool for simple lists sold itself with a 27px headline and 12–14px copy and was one of the most confident pages in the set.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
A single column 440–560px wide, placed left of centre (starting at about 22% of the viewport width) or dead centre, running the whole page. The headline is the one large thing on the first screen: two lines at display size (5–7vw), medium weight, starting on the column's left edge and allowed to run wider than the column. The supporting paragraph follows at body size (17–19px) in the full ink. One small primary button and one text link. Below, each point is a short paragraph followed by a compact demonstration or image no wider than the column. Sections are separated only by space (96–140px). Nothing spans the full width until the footer, which is a single quiet line. The first screen is mostly empty and that emptiness is composed: the column's top edge sits at about 30% of the viewport height.

## 3. Type — Work Sans
A light grotesque with open, slightly old-fashioned shapes; large headings look airy and the text weight beneath stays easy to read. Suits AI and research products, fashion houses and calm brand sites.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```
- Display: **Work Sans** — weight 300 · tracking -0.035em · leading 1.0 · sentence case
- Text: **Work Sans** — 400 for body, 500 for emphasis · leading 1.55 · tracking 0
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
One family, two weights. A display size for the headline (5–7vw), one heading size for section titles (about 32–40px), body at 17–19px, a small size for captions (14–15px). Leading 1.5 for text. Letter-spacing near zero. The typeface must be handsome at small sizes.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Black and crimson
```css
:root {
  --bg: #0a0a0a;
  --surface: #151515;
  --ink: #efefef;
  --muted: #8c8c8c;
  --accent: #b11226;
  --accent-ink: #ffffff;
  --field-1: #efefef;  --field-1-ink: #0a0a0a;
}
```
Black with off-white text and mid-grey texture takes nearly the whole page, and the last sections may invert to off-white with black type. Deep crimson is scattered sparingly: a few characters in a heading, a slider fill, the one button.
Paper and two inks (full and soft). One accent used on exactly one element per screen.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node C:/Users/Martin/.agents/skills/design-taste-frontend/scripts/assets.mjs "contenido muestra"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Precise rather than loud: cropped interface details at true size, and real photographs of the customer's world held to the column width, each doing one job. One short looping clip can sit at column width too. Never a large stock hero image.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Hands and making" set (hands at work, craft and making)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/674/1600/1000` — Cupped hands holding a heap of dark blue grapes · mid tone · pale blue, dark purple, tan · native landscape · photo: Maja Petric
- `https://picsum.photos/id/304/1600/1000` — Hand adjusting faders on an audio mixing console · mid tone · warm white, navy, amber · native landscape · photo: Drew Patrick Miller
- `https://picsum.photos/id/785/1600/1000` — Two cupped hands holding a pile of green spruce tips · mid tone · fresh green, dark green, warm skin · native landscape · photo: Jean Lakosnyk
- `https://picsum.photos/id/491/1600/1000` — Axe, hammer, pliers and leather gloves laid out on dark wood · dark tone · dark brown, tan, steel grey · native landscape · photo: Todd Quackenbush
- `https://picsum.photos/id/319/1600/1000` — Hands holding a vintage rangefinder camera against a denim jacket · mid tone · denim blue, mustard, silver · native landscape · photo: Kristian Karlsson
- `https://picsum.photos/id/407/1600/1000` — Hands lighting a sparkler that throws bright sparks in the dark · dark tone · charcoal, warm white, amber · calm area: right · native landscape · photo: Kelley Bozarth
- `https://picsum.photos/id/1060/1600/1000` — Kettle pouring water over a pour-over coffee dripper on a dark counter · dark tone · dark teal, black, warm brown · native landscape · photo: Karl Fredrickson
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: fog-and-quiet, architecture, object-still, people — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Column on one line
A warm off-white page that is more than 80% empty. Everything hangs on one vertical alignment 27% in from the left edge, the start of column 4; nothing is centred and nothing sits to its left. A small logo mark sits on that alignment 56px from the top. About 220px lower the column begins, only 380px wide: a two-line headline at 27px in medium weight, line-height 1.25; one supporting sentence at 15px in the softer ink, line-height 1.5; then, 28px below, the single action as a near-black rectangular button with 4px corners and one text link with an arrow beside it. A sign-in text link sits alone in the top-right corner at 14px; there is no navigation bar. At the bottom edge the first demonstration peeks in on the same alignment: a flat panel one step darker than the page, 368px wide, its top 90px visible, holding two real rows of the product's interface at true size with a visible pointer. Mark the panel's root with data-ui. The right half of the screen is blank on purpose, and nothing spans the full width until the footer.

On a phone: The alignment becomes the 24px left margin. The logo mark sits 32px from the top and the column starts at 30% of the height: headline at 24px on two lines, the sentence at 15px, then button and text link side by side. The demonstration panel spans the width between the margins and shows its top 120px above the fold. The sign-in link stays top-right.
Headline: A dry two-line statement at 27px, up to about 30 characters per line; it never grows larger at any width.

Adjusted for this page:
- It names colours (white, black): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. work — Quiet ledger, side preview (list)
A plain ledger in one column 560px wide whose left edge sits at 22% of the viewport width. A heading of two or three words at 24–28px in medium weight, then 32px of space, then one row per project, 44px tall: the name at 16px in full ink at the left, the kind of work at 14px in the soft ink starting at 55% of the column, and the year right-aligned with tabular figures. Nothing is drawn between rows; the three fixed starts make the columns. Hovering or focusing a row keeps it in full ink, drops the others to the soft ink, and shows that project's image in the empty area right of the column: a 4:3 frame 300px wide, `position: absolute`, its top aligned to the hovered row, 64px from the column's right edge, appearing with a 150ms fade. Holds 6–20 rows; group by year with 28px of extra space.
On a phone: The column fills the width with 20px margins. Rows are 52px tall: name at the left, year at the right, kind of work on a second line at 13px. There is no hover preview; instead the first three projects each show a 16:10 image at full column width above their row.

### 2. about — Side facts, wide paragraph (table)
Two rows share one vertical line at 34% of the viewport width. Row one: in a 160px column at the left margin, three label and value pairs stack with 20px between them, each a label in the soft ink with its value beneath in full ink, all at 13px (founded, based in, team size). From the 34% line a five-line paragraph at clamp(20px, 1.7vw, 26px), leading 1.35, runs to 90% of the width. Row two starts 120px lower and repeats the logic for the record of the practice: one plain word at 13px at the far left (awards, press, clients), then from the 34% line two list columns, each 260px wide with a 64px gutter, at 13px with 10px between lines: name at the left, year at the right in the soft ink. No heading; the paragraph opens the section. Each list comfortably holds 6–12 lines. No photographs are needed.
On a phone: Everything aligns to the left margin. The paragraph comes first at 19px. The three label and value pairs follow as a two-column grid at 14px. The two record lists stack with 40px between them, each opened by its plain word in full ink.

### 3. contact — One field, nothing else (stack)
The whole section is one prompt and one field in a column 520px wide, on the page's text column line or centred, with 200px of empty ground above and 160px below. The prompt is two lines at one size, 24–28px in medium weight: the first line in the soft ink, the second in full ink. 28px below, a single input 520px wide and 64px tall with a 12px radius, filled with the lightest tone on the page so it is the only bright surface in view; no outline at rest and a 2px inner ring in the accent on focus. Inside the right end of the field, 8px from its edge, a round submit button 44px across with an arrow and an accessible name. 16px below the field, one line at 13px says what happens next. 72px lower, three label and value rows at 14px: email, phone, address.
On a phone: The column fills the width with 20px margins. Prompt at 22px. The field stays one row, 60px tall, with the arrow button inside its right end. The three label and value rows stack with the label above each value and 20px between them.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.

## 8. Motion — Slow crossfade
The principal photograph quietly changes: three or four images of the same framing crossfade over about 1.6 seconds, holding five to six seconds each, or the fixed image changes when its matching section arrives. It should feel like light shifting in a room. Pause when the tab is hidden; under reduced motion show only the first image.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 9. Where the richness comes from
Precision. With so little on the page, alignment, spacing and the exact size relationships are the design. Every element shares the column's left edge.

## 10. How this direction goes wrong
This is the one direction where a small headline is right; the inspector will not object, but do not mix it with a large display line. Emptiness must look decided: keep the column edges exact and the vertical rhythm even. Not suitable when the subject needs emotion or photography to sell. Quiet is not thin: the column must still deliver every piece of content the brief asks for, in full, at 16px or more in the full ink. In blind tests the quiet version lost every time it was quiet everywhere: a small headline beside an empty panel read as unfinished. Quiet means few things, not small things: the headline and the demonstration are large, and every screen holds content.

## 11. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Rows** (One Page Love, studied score 7.5) `opl-rows`
  Idea: Radical understatement: a product about simple lists is sold with a 27px headline, 12px copy and a column of small live demos, each proving one interaction.
  Hero: Warm off-white page, almost empty. Everything hangs on one vertical line 27% in from the left. A small striped-letter logo mark sits there near the top; 220px lower comes a two-line headline at only 27px (under 2vw), then three lines of 13px body about 370px wide, then a near-black rectangular button with 4px corners beside a text link with an arrow. A single grey sign-in link sits in the top-right corner; there is no navigation bar. More than 80% of the viewport is blank. At the bottom edge the first feature module peeks in: grey demo panel left, short text column right.
  Worth taking: Set the headline at near-body size (under 2vw) and let empty space, not scale, give it importance.
- **Plastic** (One Page Love, studied score 7.1) `opl-plastic`
  Idea: A plain, quiet app page given one physical object: a photographed vinyl record cropped by the top-right corner of the viewport.
  Hero: Pale grey page with no navigation, only a bold wordmark with a small orange-red caps descriptor beneath it at top left (80px margin). A photographed black vinyl record with an orange-red label is cropped by the top-right corner, showing a quarter disc about 360px wide and tall, with an orange wire stand poking out below it. The headline is centred slightly above the middle in two lines at 74px (5.2vw), about 37% of the viewport wide, followed by a two-line 17px sentence and two black store badges side by side. Lower down, an award mark and a laurel-framed rating sit centred; the bottom fifth is empty.
  Worth taking: Crop one photographed physical object by a viewport corner so the hero has a subject without a centred mockup.
- **HAOQI.DESIGN** (Awwwards Site of the Day, studied score 7.6) `aww-haoqi-design`
  Idea: A design engineer's page built like an instrumented canvas: visible construction grid with crosshairs, live coordinates and clock, and a glossy 3D greeting that plays with the cursor.
  Hero: Deep cobalt field with soft darker diagonal blurs. Faint guide lines divide the screen into three columns and three rows, with small plus marks at intersections. Top row: wordmark left, four mono nav items right. Second row: a two-line role title left, a two-line mono motto centre, a four-line mono bio right. Centre: glossy inflated 3D script reading hello, about 60% of viewport width, with a 3D cursor arrow lower right. The headline, three uppercase lines of wide bold sans at 5.6vw, is flush left in the lower third and tucks under the lettering. Bottom edge: mono time and weather left, cursor coordinates centre, globe icon right.
  Worth taking: Leave the layout grid visible as hairlines with plus marks at intersections and snap every block to it, so the scaffolding becomes the ornament.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to C:/Users/Martin/OneDrive/Documentos/Github/Portafolio/.taste-skill/direction.json · reprint with `node draw.mjs --show`
