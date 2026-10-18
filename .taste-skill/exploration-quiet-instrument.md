# DIRECTION SHEET — The quiet instrument
seed 1374339973 · drawn 2026-10-15 · sector personal-portfolio
Brief: Bocetos web de Martin Fierro. Mantener ilustracion con tecnologias y cabecera flotante. Explorar distribucion, jerarquia y color. No estetica de revista ni poster. No implementar.

| | |
| --- | --- |
| Direction | The quiet instrument |
| Hero | Control that reads the page |
| Type | kept from the brand |
| Colour | Frost and slate |
| Sections | work (Quiet ledger, side preview) → about (Side facts, wide paragraph) → contact (One field, nothing else) → footer (A single quiet line) |
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
Radical understatement. Where every competitor shouts, this page almost whispers: a headline barely larger than body text, a narrow column, small exact demonstrations, and a great deal of untouched space. The restraint is the claim. It says the thing is simple, finished and sure of itself. This only works when it is carried through completely; one loud element breaks it. In the study, a tool for simple lists sold itself with a 27px headline and 12–14px copy and was one of the most confident pages in the set.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
A single column 440–560px wide, placed left of centre (starting at about 22% of the viewport width) or dead centre, running the whole page. The headline is the one large thing on the first screen: two lines at display size (5–7vw), medium weight, starting on the column's left edge and allowed to run wider than the column. The supporting paragraph follows at body size (17–19px) in the full ink. One small primary button and one text link. Below, each point is a short paragraph followed by a compact demonstration or image no wider than the column. Sections are separated only by space (96–140px). Nothing spans the full width until the footer, which is a single quiet line. The first screen is mostly empty and that emptiness is composed: the column's top edge sits at about 30% of the viewport height.

## 3. Type
Kept from the brand. One family, two weights. A display size for the headline (5–7vw), one heading size for section titles (about 32–40px), body at 17–19px, a small size for captions (14–15px). Leading 1.5 for text. Letter-spacing near zero. The typeface must be handsome at small sizes.

## 4. Colour — Frost and slate
```css
:root {
  --bg: #f7f9fa;
  --surface: #ecf0f2;
  --ink: #1f3038;
  --muted: #5d6b72;
  --accent: #0d7480;
  --accent-ink: #ffffff;
}
```
Cool white and one paler blue-grey step hold everything, with type in dark slate instead of black. Teal appears once per screen at most, as the primary button or one small detail beside the product photograph.
Paper and two inks (full and soft). One accent used on exactly one element per screen.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node C:/Users/Martin/.agents/skills/design-taste-frontend/scripts/assets.mjs "web"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Precise rather than loud: cropped interface details at true size, and real photographs of the customer's world held to the column width, each doing one job. One short looping clip can sit at column width too. Never a large stock hero image.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Fog and quiet" set (misty, muted, minimal landscapes and empty horizons; calm areas for text)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/510/1600/1000` — Small red-roofed church below a mountain under a blank white sky · light tone · white, olive brown, grey · calm area: top · native landscape · photo: Jeff Sheldon
- `https://picsum.photos/id/172/1600/1000` — Stone jetty stretching into still water and dense grey fog · mid tone · grey, warm grey · calm area: top · native landscape · photo: Aleksi Tappura
- `https://picsum.photos/id/269/1600/1000` — Gulls perched on a concrete wall beside a pale still sea · light tone · white, pale blue, grey · calm area: left · native landscape · photo: Jill Heyer
- `https://picsum.photos/id/544/1600/1000` — Layered hill ridges fading into warm beige mist · mid tone · beige, warm brown, cream · calm area: top · native landscape · photo: Francesco Gallarotti
- `https://picsum.photos/id/552/1600/1000` — Tiny sailboat on a calm sea with distant hills, black and white · mid tone · grey, white, black · black-and-white · calm area: all · native landscape · photo: Hugo Kerr
- `https://picsum.photos/id/922/1600/1000` — Dark treeline dissolving upward into pale fog, black and white · mid tone · charcoal, grey, white · black-and-white · calm area: top · native landscape · photo: Patrick Hendry
- `https://picsum.photos/id/302/1600/1000` — Lone marker post standing in still water wrapped in fog · light tone · pale grey, white · calm area: all · native landscape · photo: Billy Lam
- `https://picsum.photos/id/228/1600/1000` — Single round hay bale in a field under dense fog · mid tone · grey green, golden tan · calm area: top · native landscape · photo: Michal Kubicek
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: architecture, object-still, hands-and-making, people — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Control that reads the page
A near-black or deep neutral ground split into two halves by tone alone: the right half is one step lighter than the left, and they meet at a clean vertical edge at 50%. Left half: a small logo mark top-left at a 40px margin, then two-thirds of empty ground, then everything else anchored bottom-left, 40px from the edges: a one-line headline at clamp(26px, 2.1vw, 32px) in medium weight, one supporting sentence at 17px in the softer ink held to 44ch, and the single action as a light rectangular button. Right half: one fragment of the product, centred, about 450px square, built in HTML and working. It is the product's defining control (a loupe, a picker, a dial, a field) and it acts on the page itself: it reads the real background colour, the real headline size or the pointer position and prints that value in its own readout at 13px. Mark its root with data-ui so the product's own radii and borders apply inside it. There is no navigation bar; one text link sits top-right at 15px.

On a phone: The halves stack as two tones. The fragment comes first: 78vw square, centred in the lighter block, which is 58svh tall, still live and reading the page under the visitor's finger. The darker block below holds the headline at 6.4vw on up to two lines, the sentence at 16px and the button, left-aligned at 20px. The logo mark sits top-left over the first block.
Headline: One plain line at 26–32px naming what the tool is, up to about 32 characters, wrapping to two lines on a phone.

Adjusted for this page:
- It names colours (black): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).
- It draws lines or borders: keep them only inside a table, a form or a `data-ui` fragment; elsewhere separate with space or a change of ground.

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

### 4. footer — A single quiet line (strip)
No footer block at all. After at least 30svh of empty page ground, one baseline 30px above the bottom edge carries three items in the page's ordinary small text size (14–16px), the same size and weight as the navigation: at the left margin, what this is in three or four words; centred, two to five links separated by 24px of space; at the right margin, the year and a privacy link. Use a three-column grid (1fr auto 1fr) so the centre group is truly centred whatever the side lengths. No logo, no background change, no line above it, no columns. Links are in the full ink; the rest in the softer ink. If the page has a narrow text column, the three items may instead sit on that column's left edge as one wrapped line. The restraint only works if the page above has already made its invitation.
On a phone: Three short lines at 14px on the left margin with 8px between them: the description, the links on one wrapped line, then year and privacy. Links stay in the full ink. Leave 20svh of empty ground above and 24px below.

## 8. Motion — Masked headline
On load, each line of the headline rises from behind its own baseline, about 900ms with a strong ease-out, the second line 110ms after the first; the supporting sentence and the action then fade up together. Nothing else on the page performs. Because headlines are two lines at most, you author the line breaks and wrap each line yourself. Recipe: 'Masked line reveal' in references/motion.md.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 9. Where the richness comes from
Precision. With so little on the page, alignment, spacing and the exact size relationships are the design. Every element shares the column's left edge.

## 10. How this direction goes wrong
This is the one direction where a small headline is right; the inspector will not object, but do not mix it with a large display line. Emptiness must look decided: keep the column edges exact and the vertical rhythm even. Not suitable when the subject needs emotion or photography to sell. Quiet is not thin: the column must still deliver every piece of content the brief asks for, in full, at 16px or more in the full ink. In blind tests the quiet version lost every time it was quiet everywhere: a small headline beside an empty panel read as unfinished. Quiet means few things, not small things: the headline and the demonstration are large, and every screen holds content.

## 11. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Gil Huybrecht** (Awwwards Site of the Day, studied score 7.6) `aww-gil-huybrecht`
  Idea: A portfolio as a contact sheet: every project is a numbered run of miniature page screenshots on black, and all text is set at one small size.
  Hero: Black field on a seven-column grid with 14px margins. The top band is plain white text at one size, about 16px: name in column one, availability in column two, a services list from column three, a longer awards list from column five, then 'Profile' and 'Email me' at the right. List items are indented one step under their label. Below the lists roughly 300px of black is left empty. At mid-height the thumbnail grid begins: one small website screenshot per column, about 190px wide, each topped by a number at its right corner, with the project name over the first of each run. Two tiny toggle chips sit in the bottom corners.
  Worth taking: Set every piece of text on the page at one size and weight and build hierarchy only from column position and a one-step indent under labels.
- **Plastic** (One Page Love, studied score 7.1) `opl-plastic`
  Idea: A plain, quiet app page given one physical object: a photographed vinyl record cropped by the top-right corner of the viewport.
  Hero: Pale grey page with no navigation, only a bold wordmark with a small orange-red caps descriptor beneath it at top left (80px margin). A photographed black vinyl record with an orange-red label is cropped by the top-right corner, showing a quarter disc about 360px wide and tall, with an orange wire stand poking out below it. The headline is centred slightly above the middle in two lines at 74px (5.2vw), about 37% of the viewport wide, followed by a two-line 17px sentence and two black store badges side by side. Lower down, an award mark and a laurel-framed rating sit centred; the bottom fifth is empty.
  Worth taking: Crop one photographed physical object by a viewport corner so the hero has a subject without a centred mockup.
- **bleibtgleich’26** (Awwwards Site of the Day, studied score 7.5) `aww-bleibtgleich26`
  Idea: One thin vertical rule runs down the page and a tight bold grotesk sentence wraps around it, words stepping from one side of the line to the other.
  Hero: White page, black type. Content sits in a narrow band between 26% and 68% of the width. A 1px vertical rule drops from the top edge at 37% for two-thirds of the height. Left of it: a black blob avatar at the top, a tiny role caption at its foot. Right of it: a tiny location note at the top, the name in two lines of 90px medium grotesk at the bottom. The tagline continues below at the same size, flush to the band's left edge, running past the fold. The upper half is otherwise blank. The handle is split into two pale-grey words fixed in the bottom corners; a black menu pill sits top-right.
  Worth taking: Draw one 1px vertical rule and typeset a large sentence around it, alternating words to either side so the line becomes the text's spine.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to C:/Users/Martin/OneDrive/Documentos/Github/Portafolio/.taste-skill/direction.json · reprint with `node draw.mjs --show`
