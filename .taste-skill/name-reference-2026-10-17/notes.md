# Name lettering implementation

The supplied mockup is the approved, previously generated image reference. This is a typography correction within that precise design, rather than a new design direction (image-to-code §11).

Reference analysis: two tightly stacked uppercase words, very condensed vertical proportions, narrow counters, oxblood on warm white or ivory on charcoal. The flat acute sits just above the capitals. The second word is slightly narrower and aligned right on desktop. The name occupies the available height; mobile puts it before the introduction and tablet.

Compared Six Caps, Anton and Oswald in the browser. Anton's heavy rounded R and compact counters are closest; it is an approximation of the reference, not a claimed identification of the mockup font. Local Anton is fitted to actual canvas ink metrics, with optical spacing and a small outline. Each SVG letter remains independently animated. A custom flat acute keeps capital heights consistent. No bitmap lettering is used.

ROUND 1
Seen in one second: Martín Fierro.
Idea: the name becomes a two-line poster beside the entrance to the projects.
Live thing: scrolling or opening the folder transforms the tablet into the real catalog.
Layout: hero=split poster, projects=list, about=prose, contact=social links.
Scores for the hero: design 7.5 · usability 8 · creativity 7 · content 8 → overall 7.6.
Problems corrected: overlapping glyphs; font leading creating empty space between words; name and links clipping on short laptops; catalog heading appearing before its reveal window fits it.

Validation: build and ESLint pass. Name ink, spacing, accent, first-screen containment and overflow checked at six sizes in both themes. Tablet centering and catalog handoff checked at six sizes through six scroll positions. Interaction checks cover click, keyboard, search, project return, history, interrupted scroll, theme changes, reduced motion and short landscape.

Browser design inspector: 0 FAIL, 2 WARN. No footage is intentional for this approved typographic hero. Its pinned-over-picture warning concerns the label within the requested expanding tablet, rather than a separate page heading crossing an image. Source lint on the journey files: 0 FAIL, 0 WARN. A broader scan also finds existing eyebrow styles and outlined surfaces elsewhere in the site; those are outside this typography change.
