# Public Notice · Small Frictions

A public-information magazine: the clarity of a transport notice with the unhurried reading of a small quarterly. The signature is a strong, condensed-feeling masthead, precise queue diagrams and a rust-red rule that separates editorial sections. A running issue folio supplies orientation; it never intrudes behind the prose.

## Direction record
Management selects candidate 4 under the founder’s full delegation. Seed reference: seed:57c2bb5e970f712b; remote reference retrieval succeeded after the initial restricted-network attempt. Grounded candidates, in order: science museum handout; weekend newspaper supplement; municipal timetable; **public-information notice**; pocket engineering paperback; classroom wall chart; ticket-office information sheet. Candidate 4 carries both short explanation and dense source notes without inventing an interface metaphor.

Challengers considered: drawcord cape (tension grammar does not improve article comprehension); alphabet weather (letters as material conflicts with calm reading); festival hoarding (loud collage obscures the quiet reading task); expedition newspaper (irregular issue grammar transfers, distressed print does not); other catalog suggestions were not selected. No real user preference or attended interview is claimed: the founding user explicitly delegated all decisions.

## Tokens
```css
:root {
  --paper: #f3f0e7;
  --ink: #272b27;
  --muted: #5c6159;
  --rule: #babcb1;
  --accent: #b43a20; /* queues, emphasis and links: the point of friction */
  --wash: #e8e5da;
  --accent-wash: #ead9cb;
  --display: 'Archivo', sans-serif;
  --reading: 'Source Serif 4', Georgia, serif;
  --mono: 'IBM Plex Mono', monospace;
}
```
Fonts: Archivo 400/500/600/700/800/900; Source Serif 4 regular/italic 400/500/600; IBM Plex Mono 400/500. Self-host WOFF2 fonts for a complete reading experience without third-party requests. Display titles use Archivo; long-form title and reading use Source Serif 4; mono appears only for counts, dates, units and formulae. Display scale tops at 6rem except the deliberately full-width magazine masthead, which is the publication’s wordmark rather than a reading heading.

## Composition
Max shell 1240px, 28px desktop gutters, 20px mobile. Article: readable 66ch column with a narrow contents rail. Home: masthead, a split cover (question and queue diagram), a broad experiment invitation, numbered issue contents in rows, compact editorial letter. No rounded-card grid. Index lists use rules and indentation, not panels.

## Theme and motion
Light-only: the paper ground stays consistent across diagrams, controls and prose. This is an explicit management decision. Every page supports print, keyboard focus and reduced motion. No autoplay; controls update models immediately. The one purposeful movement is the result bar responding to utilization, suppressed under reduced motion.

## Favicon
Three square queue marks, the last rust-red, on the paper ground. Inline SVG, same geometry as the magazine diagrams.

## Frozen mock
`design.html` contains real sample home, article and lab screens. This record is canonical design authority; root DESIGN.md points here to avoid a shadow token record.

## Craft refinements
Mobile article contents use a native closed disclosure so the opening explanation appears sooner. Desktop retains the contents rail. At phone widths, diagrams become equivalent HTML tables, equations and feedback rows at readable sizes; SVG remains on desktop and in print. Diagram captions remain visible. Secondary controls have a 44px minimum hit area.

## Issue 02 usability refinements
Delivery phone controls carry compact changing feedback in their own viewport; the full accessible result panel supplies the live announcement. Article endings provide the issue-specific lab path. The append-only log now generates five most recent heading links while retaining chronological content. Next-article navigation is one heading rather than a separate eyebrow.
