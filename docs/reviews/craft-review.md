MODE: review

EVIDENCE: Independently ran `just shots` in `/private/tmp/small-frictions-review-craft-review`; exit 0, 26/26 clean captures (13 inventory pages × 1280×800 and 390×844 × light). Inspected all 26 PNGs, then inspected the mobile capacity capture at original detail and read the relevant diagram, contents and control styles to explain the pixels. No detector was run or consulted. The screenshot harness closed its browser and temporary HTTP server. No project source was edited and no commit was made.

MODEL: GPT-6 family; exact runtime maker/reviewer variant unavailable.

SCORE: 33/40 (10 applicable heuristics; Good). This site includes an interactive lab, so flexibility, prevention and contextual help apply; the custom missing-page route makes recovery applicable. These are design judgments based on captures and source, not claims of independently executing every control state.

| Heuristic | Score | Evidence / limitation |
|---|---:|---|
| Visibility of system status | 3 | Current primary route is underlined; lab inputs, utilization and results are visibly paired. No changing subsection indication in the long reading flows. |
| Match with real world | 4 | Recognizable counters, buses and familiar questions lead the explanation; invented models and their limits are plainly labeled. |
| User control and freedom | 3 | Clear issue/home routes, jump links, standard disclosure controls and a reset action. Reset is available only after all experiments, making repeated local comparison less immediate. |
| Consistency and standards | 4 | One coherent paper/rule/type system; equivalent article, index and experiment elements behave predictably in the captures and markup. |
| Error prevention | 3 | Bounded range inputs, units and model-specific caveats constrain interpretation and input. Detailed assumptions require opening disclosures. |
| Recognition rather than recall | 3 | Visible article contents, source notes and contextual lab links reduce recall, but the expanded mobile contents block gives too many equal-weight choices before the explanation. |
| Flexibility and efficiency | 3 | Article section anchors, three experiment anchors and standard range inputs provide direct routes. Small secondary targets and remote reset limit efficiency. |
| Aesthetic and minimalist design | 3 | Strong purposeful composition with no ornamental card system. Mobile article apparatus and very small diagram lettering weaken the reading hierarchy. |
| Error recovery | 3 | The missing-page message explains the situation plainly and offers two useful recovery routes. It provides general recovery rather than identifying the failed destination. |
| Help and documentation | 4 | Explanations, units, source support and model assumptions appear in the relevant reading or experiment context; the job table provides inspectable model detail. |

DESIGN SPECIFICITY: Clearly authored for Small Frictions. The large Archivo masthead, Source Serif reading, queue marks, restrained rust emphasis and rule-based contents connect a public-information notice to an explanatory magazine. The geometry conveys each article's mechanism rather than decorating it. The lab's number panels earn their prominence as actual computed results. The light-only treatment follows the recorded design authority and is not a missing dark-mode feature.

FINDINGS:

1. **[P2] All six article pages, mobile diagrams — preserve readable diagram lettering instead of uniformly shrinking the desktop SVG.** `ArticleDiagram.astro` uses a 600-unit-wide drawing. At the 390px capture the available diagram width is about 326px after shell and figure padding, so 18-unit labels render at roughly 9.8px and the 14-unit diagram notes at roughly 7.6px. The capacity graph visibly makes its axis labels substantially smaller than its already-small caption; the waiting-design diagram has the same problem in its explanatory note lines. Provide a mobile composition with stacked labels or HTML text outside the SVG, keeping essential labels around 12–14px or larger. Preserve all worked numbers and the honest model captions. Evidence: `capacity-mobile-light.png`, the other five mobile article captures; `site/src/components/ArticleDiagram.astro`; `.article-figure` mobile padding and `.diagram-note` in `global.css`.

2. **[P2] All six article pages, mobile opening — reduce the expanded contents interruption before the first explanation.** In `capacity-mobile-light.png` the title, deck and byline are followed by an approximately 240px two-column contents block and lab link; the first explanatory paragraph begins around the bottom of the initial 844px viewport. Other mobile articles repeat this sequence. A commuter arriving on the familiar question must pass five or six section options before reaching its mechanism. On phones, present an accessible collapsed “In this article” disclosure or a short “Jump to…” control, preserving the source and lab routes. Keep the desktop rail. Evidence: all six mobile article captures; `.article-contents` at the mobile breakpoint in `global.css`.

3. **[P2] Article contents and Queue Lab secondary controls, mobile — enlarge the small tap areas.** Single-line article contents links have 12px type, inherited 18px line-height and 7px top/bottom padding, giving about 32px height; lab assumptions summaries have a 36px minimum, and the lab jump links a 40px minimum. These are visibly smaller than the primary buttons and range areas. Give each secondary control a minimum 44px hit area while retaining compact text, and make the contents mobile disclosure proposed above a full-width target. Evidence: article mobile contents captures and `lab-mobile-light.png`; `.article-contents a`, `.model-limits summary`, `.lab-links a` in `global.css`. This is a manual design/source observation, not detector output.

No P0 or P1 issue observed in this review.

COGNITIVE LOAD: Two checklist failures at the mobile article opening: chunking (five or six equal-weight section links) and minimal choices (those links plus the lab route before the first paragraph). This is moderate load by the reference checklist, localized to apparatus rather than the article prose. Single focus, related grouping, visual hierarchy, sequential reading, low recall requirements and the lab's disclosure of detailed assumptions otherwise work well. The complete six-story index is a justified magazine catalog; preserve its full inventory rather than arbitrarily cutting it to satisfy a numerical rule. Desktop navigation also exposes five links, but the separated current-issue link gives a useful hierarchy.

PERSONA WALKTHROUGHS:

- **Curious commuter:** Home → “Browse the articles” → a familiar question is a clear path, and the opening paragraphs use concrete situations instead of generic introductions. The phone article opening is the main red flag: title apparatus and an expanded contents block use the initial screen, delaying the explanation. The diagram labels then demand zoom. The explicit “illustrative” and model-limit language respects this persona's concern about models passing as observations.
- **Practical explainer:** Issue → Queue Lab provides three direct mechanism anchors, visible units, meaningful result areas, assumptions disclosures and a job-by-job inspection table in source. Desktop article figures and source notes support teaching. On a phone, reduced diagram lettering makes the explanation less readily shareable or inspectable. The screenshots show defaults, not independently verified interaction outcomes; no functional-success claim is made here.

EMOTIONAL JOURNEY: The confident masthead and familiar questions create curiosity; warm paper and restrained color keep the reading calm. The mobile contents interruption is the valley. The numerical examples and explicit limits reassure without overstating certainty. Takeaways and next-article links give a useful ending rather than a sales prompt.

STRENGTHS: (1) Specific visual identity tied to precise explanatory geometry; (2) unusually clear separation of invented examples from observational evidence; (3) coherent mobile reflow, readable prose, useful article continuation and an on-brand but practical missing-page recovery screen.

SKIPPED: Browser overlay (headless factory review; expressly excluded by dispatch). Detector and technical audit (reserved for isolated MODE evidence; intentionally unrun). Interactive keyboard, hover, focus, reduced-motion, print, no-JavaScript and network workflows were not separately executed in this design-review turn, so the report does not certify those states. Dark captures intentionally omitted by the approved light-only design. Questions skipped: factory review excludes the ask-the-user round and the founder delegated decisions. No gate verdict issued.
