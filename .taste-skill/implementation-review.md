# Implemented portfolio — 2026-10-16

## Scope and design decisions

Implemented the approved charcoal/amber composition: large Clash Display name above the specialty and original portrait; four equally weighted project rows with serif names; a separate project background; neutral reading text; and clearly separated About and Contact sections. Search and categories remain available through a compact disclosure. Existing project routes, galleries and demos are retained. Missing contact URLs remain null in the existing data file.

The latest approved mockup supersedes the older exploratory direction sheet's green palette and staggered project grid. The requested layout is a horizontal project list, not a gallery grid.

## Preservation checks

The original illustration assets are unchanged, with no color filters, regenerated faces, new artwork or clothing edits. The existing alpha edge mask blends only their outer edges.

- `martin-dark.png`: SHA256 `0DF10F698EE01BC573DC1C8982A8F9CB325969F8C39EDA519D19BF81A71295E6`
- `martin-light.png`: SHA256 `F04A17722864780F99AD1960F1B2A4A3174E14546764AD57C5EB4237FE76FE87`
- `Header.jsx` and `Header.css` are unchanged. A scoped variable in index.css preserves the original switch's blue accent independently of the new page palette.
- Before/after browser measurements match: dark track `rgb(66, 103, 213)`, light track `rgb(236, 236, 175)`, 56×32px, 16px radius; original moon shadows, sun gradient and icon positions (28px dark / 8px light) retained.

## Visual review and explicit exceptions

Reviewed actual desktop and mobile screenshots in both themes. The drawing ends before the project band, which has its own internal padding. About returns to the main page background with 72px mobile / 80–120px desktop top padding. No horizontal overflow or name overflow at 320, 390, 768 and 1440px in either theme. The desktop illustration-to-project gap is about 115px; mobile is 72px.

The surname now uses a bronze related to the project background with stronger contrast, following the user's request to improve legibility: `#A18A68` on `#24211D` (4.85:1) in dark mode, and `#8D6D3E` on `#FCF6EA` (4.44:1) in light mode. Both exceed the 3:1 requirement for its large display text. All other reading copy uses neutral black/white or neutral gray. Archived inspector screenshots and findings predate this correction.

Other retained warnings: three font roles follow the approved design (Clash Display name, Georgia project titles, Manrope body); the original floating navigation is explicitly requested; no unrelated stock video is added; functional form controls and the existing optional CV dialog retain appropriate borders. The two gradient lint matches are documented alpha masks on the original illustration, not decorative background gradients.

The final browser inspector also classifies the functional search disclosure and its result count as eyebrow labels above nearby project titles. These are existing search/filter controls, not decorative kickers; their function is retained. The static taste lint finishes with zero failures and four justified control-border warnings. The raw browser findings are retained without suppressing these exceptions.

## Verification

- Production build and ESLint passed.
- Real browser: four project links open their correct detail pages; Taskflow demo route renders.
- Category filtering, text search, empty state and reset checked.
- Mobile menu remains legible; an About anchor lands below the fixed header.
- Theme persists across reload; both original portrait paths load without CSS filters.
- Reduced motion displays content immediately with no transform.
- No page errors in the completed interaction checks.

Actual initial screenshots are saved beside this report as `implemented-{dark,light}-{1440,390}-{fold,page}.png`. Raw initial automated findings remain in `implemented-dark/report.json`.

## Mobile and contact refinement

- Below 760px, each project screenshot occupies the full content width above its title, description and arrow. Images use contain sizing so the original interfaces remain complete. At 390px the preview is about 358×224px; at 320px it is 288×180px. Desktop keeps the horizontal list.
- Restored the original social layout and icons: Instagram/LinkedIn over GitHub/WhatsApp, with a closed CONTACTO square opening into four tiles on hover or keyboard focus. Colors use the new charcoal/amber palette. Touch devices show the four icons directly. Missing URLs remain unset.
- The closed social state uses one solid overlay above the four resting tiles to prevent visible seams; the overlay fades away during interaction. The block keeps a stable footprint.
- Build, ESLint and browser checks passed for these refinements. No overflow at 320, 390, 768 or 1440px in either theme. New screenshots: `mobile-projects-{dark,light}-large.png`, `social-{dark,light}-seamless.png`.

## New visual exploration

The later reference-inspired sculptural-interface homepage is a generated concept only. It has not replaced the implemented homepage. Its source image is stored in the conversation's generated-image directory as `exec-e71232d6-1d2d-4335-b127-6e455d81e9e6.png`.
