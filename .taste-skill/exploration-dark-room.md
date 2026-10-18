# DIRECTION SHEET — The dark room
seed 1126506565 · drawn 2026-10-15 · sector personal-portfolio
Brief: Bocetos web de Martin Fierro. Mantener ilustracion con tecnologias y cabecera flotante. Explorar distribucion, jerarquia y color. No estetica de revista ni poster. No implementar.

| | |
| --- | --- |
| Direction | The dark room |
| Hero | Inset photograph, crossing wordmark |
| Type | kept from the brand |
| Colour | Forest and lime |
| Sections | work (Full panels, one midline row) → about (Inset panel, shaped portrait) → contact (The email as display type) → footer (Name across the last photograph) |
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
One dark field from top to bottom, and in it, lit things. Photographs and objects appear like exhibits in a dim gallery: each with space around it, each the brightest thing on its screen. Type is light, small and sparse. The darkness is not a theme switch; it is a room, and the page is a slow walk through it. It suits subjects sold on atmosphere and material: an evening restaurant, a metal card, a record, a house at dusk.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
A single near-black or deep-toned ground runs the full page with no section bands. First screen: either the name at full width in a light weight along the bottom edge with one dim photograph above it, or one object or photograph centred at 40–50% of the viewport with a line of text beneath at 16–18px. Each later screen holds one or two lit items at a generous size (the main one 40–60% of the screen width) with its text set beside it at full reading size; the darkness frames the items, it does not replace content. Images vary in size but all share the same darkness at their edges so they sit in the ground without frames. Practical details come last in a simple two-column text block. The only solid light element on the page is the single primary action.

## 3. Type
Kept from the brand. Light or regular weights; they glow on dark. Avoid heavy bold, which looks cheap on black. Headings 4–7vw at most; text 16–18px with leading 1.6 and a slightly lifted ink (not pure white).

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
A dark ground with a tint (blue-black, green-black, brown-black), a soft light ink, a dimmer ink for secondary text, and one warm or bright accent used once per screen at most.

## 5. Imagery
**The project has no photographs of its own yet.** First choice: **real pictures of the subject's world from the open collections**: its city and street in old postcards and photographs, an old map of the neighbourhood, its materials up close, its trade in engravings, museum objects of its kind (references/imagery.md §3). Start with `node C:/Users/Martin/.agents/skills/design-taste-frontend/scripts/assets.mjs "web"`, then queries from your inventory (its street, its materials, its trade's tools and history). Download what you use into the project with `--get` and credit every one on the page (`--credits` prints the footer line). They show the world around the client, never the client's own room, dish, product, person or team. Second, for what no honest picture exists of: draw the subject's own things in code, large, in one flat graphic language and the palette's real colours (its tiles, its windows, its objects; references/imagery.md §8). Third: the dealt photographs, only where an honestly generic picture fits (the sea, the weather, a material), never one a visitor could take for the thing itself and never an unrelated scene. One treatment for all of them. If this direction is built on photographs, plan the set before building (four to six pictures of one family) and reuse them at different crops and scales instead of finding or drawing a new picture for every slot; keep drawings as `<symbol>` + `<use>` or generate them with a small script so the page stays light. List every found picture (with its source and licence), every dealt photograph and every drawing that stands in for photography in your report.

Low-key photographs: dark backgrounds, one light source, subjects emerging from shadow. Their dark edges should blend into the page ground.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Objects" set (single objects seen close: instruments, tools, cameras, books)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
Treatment: If a photograph's background is lighter than the page, darken the image slightly (`filter: brightness(0.85) contrast(1.05)`) rather than adding a frame.
- `https://picsum.photos/id/63/1600/1000` — Cup of coffee seen from above on a bright red surface · mid tone · bright red, white, brown · calm area: right · native landscape · photo: Justin Leibow
- `https://picsum.photos/id/113/1600/1000` — Steam rising from a metal mug with blurred blue background · mid tone · steel blue, white, grey · calm area: top · native landscape · photo: Zugr
- `https://picsum.photos/id/80/1600/1000` — Pine cones resting on weathered wood in black and white · mid tone · grey, charcoal · black-and-white · calm area: top · native landscape · photo: Sonja Langford
- `https://picsum.photos/id/23/1600/1000` — Close-up of metal fork tines against a dark blurred background · dark tone · charcoal, blue grey, silver · calm area: top · native portrait · photo: Alejandro Escamilla
- `https://picsum.photos/id/175/1600/1000` — Close-up of an analogue clock face in black and white · mid tone · white, black, grey · black-and-white · native landscape · photo: petradr
- `https://picsum.photos/id/535/1600/1000` — Colourful shirts on wooden hangers along a metal pipe rail · dark tone · charcoal, orange, green · native portrait · photo: Jeff Sheldon
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: hands-and-making, architecture, people, fog-and-quiet — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

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

### 1. work — Full panels, one midline row (full-bleed)
Four to seven consecutive panels, each 100vw by 100svh, butted together with no gap. Each panel is one photograph of the project cropped much tighter than its frame (`object-fit: cover` with the image scaled to 130%), so a detail fills the screen. The same three-part text row sits at exactly 50% of the height on every panel, in white with `mix-blend-mode: difference` or over a neutral dark scrim band 90px tall: the date or year at the left margin at 15px, the project title in capitals at clamp(22px, 2vw, 30px) starting 10% in from the left, and one fact (location, client, number of pieces) at the right margin at 15px. Because the row never moves, scrolling reads like turning plates in a book. Panels may be `position: sticky; top: 0` so each slides over the last. There is no section heading; the first panel's title row is the heading.
On a phone: Panels are 100vw by 82svh. The row drops to the bottom of each panel, 20px above its edge: the title at 22px on the first line, then date at the left and fact at the right on a second line at 13px, over the same scrim band.

Adjusted for this page:
- It names a kind of typeface: use the brand faces.
- It names colours (white): map them onto this palette's roles (ground `--bg`, panels `--surface` and the fields, text `--ink`/`--muted`, the accent `--accent` on the primary action only).
- It blends text with `difference`: over anything but black, white or grey that gives random hues. Use a solid ink chosen for each ground instead.

### 2. about — Inset panel, shaped portrait (split)
A deep-toned panel inset 20px from the page edges with a 12px radius, about 110svh tall, `overflow: hidden`. Left half: a two-line statement of four to seven words at clamp(40px, 4.4vw, 64px) in a pale ink, top-left with 56px padding; it is the heading and has nothing above it. Below it a photograph of the person or the workshop, masked with `clip-path` or an SVG `mask` to one bold shape taken from the subject (a four-lobed flower, a circle, an arch, a chamfered block), 38vw across, positioned so the panel's bottom edge crops its lowest fifth. Right side, starting at 63% of the width and 56px from the top: two text blocks 300px wide and 64px apart, each a subhead at 22px over a four-line paragraph at 15px; then one solid button in the accent colour. Between the statement and the text blocks the panel is empty. One photograph only.
On a phone: The panel is inset 10px and stacks: the statement at 8.5vw, then the two text blocks at full width, the button, and last the shaped photograph at 86vw across, centred and cropped by the panel's bottom edge by a quarter of its height.

Adjusted for this page:
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.
- It sets a sentence large over several lines: jurors read that as a long headline. Either cut it to a two-line headline at display size, or keep it a statement at 36px or less on three lines (24px, four lines on a phone).

### 3. contact — The email as display type (statement)
The section is 100svh in the inverse of the page's colours. A single email address is set as one line of display type spanning the content width: the font-size is fitted so the address runs from margin to margin (about 7–9vw for 20 characters; break after the @ onto two lines if it is longer than 26), light or regular weight, tight tracking, sitting on a baseline 12vh above the bottom edge. It is a `mailto:` link; on hover the whole line takes the accent ink. In the top-left corner, a sentence of up to 12 words at 20–22px says what to write about. In the two bottom corners at 14px: phone and city at the left, two or three social links at the right. No heading and no form. For a pinned ending, make the section `position: sticky; bottom: 0` beneath the page so the previous section lifts off it.
On a phone: The address breaks after the @ onto two lines at 11.5vw, left-aligned, sitting at 55% of an 86svh screen. The sentence sits at the top-left at 18px. Phone, city and social links stack at the bottom-left at 15px with 12px between them.

### 4. footer — Name across the last photograph (full-bleed)
The footer is the page's last photograph, full-bleed at 100vw by 100svh, darkened evenly with `filter: brightness(0.62)` so paper-coloured type reads everywhere on it. Three layers of text sit on the image. Top row, 32px from the edge: a short link list at 16px at the left margin and contact details at the right margin, each no wider than three columns. Mid-height is left to the photograph. Along the bottom, the wordmark runs the full width in the paper colour, letters about 12–20vw tall depending on the name's length, baseline 56px above the edge; under it one line of legal text at 13px. Choose an image whose interest is in its middle band, since the top and bottom carry text. No panel, no box and no colour block separates the footer from the image: the photograph is the footer.
On a phone: The photograph is 100vw by 88svh, cropped to its strongest vertical slice. Links stack at the top-left at 16px, contact beneath them. The wordmark is fitted to the width along the bottom, with the legal line under it at 12px.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Scaling wordmark
The giant name responds to the scroll: as the first screen leaves, the wordmark scales down a few percent (or grows from 0.94 to 1 as the footer arrives) on a scroll-linked timeline, so the monument feels heavy. Travel stays under 8%. Static fallback where scroll timelines are unsupported. Recipe: 'Scroll-linked progress' in references/motion.md, animating `scale`.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 9. Where the richness comes from
Light against dark, and the slow pacing.

## 10. How this direction goes wrong
Grey text on black fails contrast quickly: check it. No glow effects, no neon accent, no coloured light blobs. A dark page with a bright busy photograph is not this direction; choose low-key images. Dark does not mean empty: every screen still carries its content at a readable size, and running text is a light ink at 7:1 or more, not a dim grey.

## 11. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Cipher** (Awwwards Site of the Day, studied score 7) `aww-cipher`
  Idea: The showreel as a slowly turning wreath: a dozen film stills overlap in an elliptical ring around a tiny emblem on a black screen, with almost no text.
  Hero: The first capture is the preloader: a black screen textured with a fine grid of grey dots that thins out towards the right, the wordmark top-left and a tiny copyright glyph dead centre. Once loaded, the black screen holds a ring of about fourteen landscape film stills, each roughly 10% of the viewport wide, overlapping one another around an ellipse about 35% of the width; the centre is empty except for a 20px white emblem. The wordmark, about 11% wide, stays top-left. Four 9px uppercase links are split: one at the horizontal centre, three at the far right. A partner mark sits bottom-right. There is no headline.
  Worth taking: Arrange work thumbnails as an overlapping elliptical ring with an empty centre, and bind scroll to rotation instead of vertical travel.
- **Moto Finance** (Awwwards Site of the Day, studied score 7.3) `aww-moto-finance`
  Idea: A metal card presented like a museum piece: lit by a single overhead light box in a black room, then orbiting through dim architectural stills.
  Hero: Black full-bleed 3D scene. A pale silver-lavender light panel, a trapezoid in perspective like a ceiling light box, occupies the top 20% and centre 55% of the viewport. The two-line uppercase headline, centred at 4.4vw in medium grotesk with tight leading, straddles the panel's lower edge so its first line sits half on light, half on black. In the exact centre a small metal card stands on a low plinth, only about 150px wide, surrounded by darkness. A light-grey pill button (about 250 by 52px) is centred near the bottom; the logo is top-left and a dark pill button top-right.
  Worth taking: Let a headline straddle the edge of a light shape so one line is half on light and half on dark.
- **Shawn Golden** (One Page Love, studied score 7.5) `opl-shawn-golden`
  Idea: A personal homepage as a lovingly broken desktop: browser-default Times, 1px table borders and a giant pixel-serif name frame a set of working toys (paint program, clock, joke button, character generator).
  Hero: The whole site is one viewport divided by 1px black lines with no outer margin. Across the top, the name in a brown pixel serif at 14.4vw is cropped by both side edges in a band 170px tall. Under it: four equal bordered link cells with icons, a one-line text ticker, and a bio row with a round portrait and three lines of uppercase Times. The lower 65% is three columns: a 235px left rail (character drawing, work list, a button), a wide centre (large italic email ticker above a dark green paint canvas, dingbats beneath), and a 235px right rail (flipping word, analogue clock, weather line, navy flower panel).
  Worth taking: Divide the viewport into bordered cells with 1px black lines and zero margin, and give each cell one live widget instead of a content section.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to C:/Users/Martin/OneDrive/Documentos/Github/Portafolio/.taste-skill/direction.json · reprint with `node draw.mjs --show`
