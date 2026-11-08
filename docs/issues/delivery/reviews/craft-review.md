MODE: review
EVIDENCE: Own `just shots` production rebuild and capture run succeeded: 44/44 captures, 22 inventory pages × 2 widths (1280×800 and 390×844) × light. Initial restricted run failed with `Error: listen EPERM: operation not permitted 0.0.0.0:44363`; the authorized host-browser/server retry exited 0. Own fresh Playwright context inspected mobile contents, a mobile article diagram, keyboard-operated lab extremes, empty/invalid/leading-zero payload states, reset-all, expanded calculation tables and no-JavaScript delivery defaults. Evidence directory: `/private/tmp/delivery-craft-browser/`, with `evidence.json` and seven additional screenshots. Both local servers and all browser contexts were closed.
SCORE: 33/40 (10 applicable heuristics; Read publication plus Operate labs). Good by the reference percentage bands. Evidence for the human feel-check, not a PASS/REVISE gate.
MODEL: GPT-6 family exposed by the runtime; exact maker/reviewer variant unavailable. No other model identifier claimed.

## Scope and independence

Reviewed the isolated copy at `/private/tmp/small-frictions-delivery-craft-review`. Read AGENTS.md, PRODUCT.md, editorial/charter.md, specs/brief.md, specs/issues/delivery.md, specs/design.md, factory agents/craft-reviewer.md and the installed impeccable `reference/craft-floor.md` and `reference/critique.md`. The factory resolver returned an empty path; the dispatch supplied `/Users/jdinkla/.agents/skills/impeccable`, whose actual reference files were successfully read. This is direct runtime rubric access, not a remembered substitute.

No detector was run and no detector output was consulted. No other current judge's report was consulted. Logbook screenshots were inspected for composition and navigation only; their historical review entries were excluded from this assessment. No source edits or commits were made. Build-generated files and captures in the disposable review copy were necessarily regenerated.

Every inventory image was opened: home, issue (Waiting), archive, capacity, bus-pairs, average-wait, one-queue, littles-law, waiting-design, lab (Queue), about, log, not-found, delivery, parcel-detour, barcode, box-space, last-mile, container, returns, labs and delivery-lab, each at wide and mobile. Long full-page images establish whole-page composition; additional viewport and element captures were used for legible inspection of the mobile article opening, expanded contents, parcel diagram, hub interaction, payload error and two expanded arithmetic tables.

## Design specificity

Authored and coherent. The masthead, warm paper, disciplined rules, serif explanation and restrained rust emphasis fit a public-information magazine. The parcel network gives Delivery an issue-specific identity while preserving Waiting's grammar. The index is an editorial list rather than a generic feature-card layout. Diagrams carry actual comparisons: loaded vehicle distance versus distance per parcel, tracking observations versus an unknown gap, rectangular envelope volumes, handover time, handling units and return dispositions. This visual language would need substantive rewriting to serve an unrelated product.

The mobile HTML equivalents are a particularly strong decision: the parcel comparison is readable at actual phone width, carries units and explicit invented-network boundaries, and retains its caption. No horizontal overflow appeared with the Delivery Lab's model disclosures expanded. The publication's honest AI/source/model labels provide reassurance without interrupting every paragraph.

## Heuristic scores

| # | Heuristic | Score | Reason |
| --- | --- | --- | --- |
| 1 | Visibility of system status | 3/4 | Live values update, focus is conspicuous, and current issue/location is signaled. Mobile hub results are too far below the active slider to watch. |
| 2 | Match with the real world | 3/4 | Familiar questions and concrete units are strong; the lab's coordinate model still asks readers to translate an offset into spatial meaning through text. |
| 3 | User control and freedom | 3/4 | Per-model and global resets work; standard links and disclosures avoid traps. Mobile article endings give weak access back to the relevant experiment. |
| 4 | Consistency and standards | 4/4 | Two issues, their diagrams, indexes, source apparatus and labs maintain one predictable system; native inputs/disclosures preserve familiar behavior. |
| 5 | Error prevention | 3/4 | Bounded sliders and fixed dimensions constrain models; invalid payloads do not produce plausible numeric results. Payload validity is learned during editing rather than constrained away, appropriately but not perfectly preventively. |
| 6 | Recognition rather than recall | 3/4 | Labels, model hints and source notes are visible in context. A mobile reader must remember the hidden top-of-article lab link; the long log has no latest-entry navigation. |
| 7 | Flexibility and efficiency | 3/4 | Contents anchors, three experiment jumps and keyboard range controls provide useful accelerators. The article-to-lab and newest-log paths still require avoidable travel. |
| 8 | Aesthetic and minimalist design | 3/4 | Clear hierarchy and disciplined surfaces. Some reading apparatus repeats, and the next-article eyebrow is a minor craft-floor exception. |
| 9 | Error recognition and recovery | 4/4 | Empty and invalid payload messages specify exactly what to do, preserve input, expose invalid state, and recover immediately. The 404 gives two clear exits. |
| 10 | Help and documentation | 4/4 | Assumptions, arithmetic, tables, source method and narrow inference limits sit beside the relevant model; article-specific sources are explicitly qualified. |
| Total | | 33/40 | 82.5%; all 10 genuinely apply to this combined Read/Operate surface. |

No heuristic receives points for an absent feature: error prevention/recovery are scored on the actual check-digit input and missing-page state, and flexibility/help on the actual contents and labs. A static-only cover would not justify scoring every heuristic.

## Findings

1. **[P3, evidence constraint resolved] Initial screenshot capture could not bind its local server.** `just shots` initially exited 1 with `Error: listen EPERM: operation not permitted 0.0.0.0:44363` and `error: recipe shots failed on line 57 with exit code 1`. Re-running with authorized macOS browser/server access succeeded and produced all 44 captures. No site change is requested for this environment constraint and it does not lower the score.

2. **[P2] `/labs/delivery/`, mobile hub experiment: the changing conclusion is outside the input viewport.** At 390×844, after scrolling the hub slider into view and pressing End, the slider occupies y416–460 while the result panel begins at y762 and ends at y1161. The important “46.4 more loaded vehicle km” conclusion is below the viewport. The instruction says to move the hub and watch the loaded distance change, but the reader must scroll away from the control to see it. Move a compact changing comparison/conclusion directly below the slider, before the coordinate hint, static load rows and reset button; keep the detailed result panel afterward. Preserve the existing full result on desktop. Evidence: `hub-keyboard-end.png` and `evidence.json`.

3. **[P2] Delivery article endings, especially `/articles/parcel-detour/` on mobile: the relevant experiment path disappears.** The only article-specific Delivery Lab link is inside the top contents apparatus. On phones that disclosure starts closed. After a roughly 7,100px parcel article, the ending offers the next article and all articles but no direct route to its experiment. Add a contextual “Try the hub experiment” link beside the takeaway or in the end navigation, retaining the correct lab anchor. Apply equivalent specific labels to the other relevant article/lab relationships. The desktop sticky contents rail already makes this less burdensome. Evidence: parcel-detour-mobile-light.png, contents-open.png and site/src/pages/articles/[slug].astro.

4. **[P2] `/logbook/`: the append-only record needs a route to recent decisions.** The current capture is 8,863px wide-layout height and 13,530px mobile height. It begins with the oldest entries and supplies no entry index or “Latest decision” jump. A practical explainer checking the present issue's management evidence must traverse the whole historical record. Keep the canonical chronological prose intact; generate a compact recent-entry index or a top “Jump to latest decision” link from its headings. This improves inspectability without rewriting history. Evidence: log-wide-light.png, log-mobile-light.png and the logbook page shell, which renders one unindexed content body.

5. **[P3] All article endings: fold the next-article eyebrow into the navigation itself.** `NEXT IN THE ISSUE` sits above a separate linked heading in `.continue-reading`, the exact kicker/eyebrow pattern refused by the craft floor. Retain the useful navigation meaning as “Next: [article title]” in one typographic unit, with the nav's accessible label preserved. This is polish, not a reading blocker. Evidence: the article screenshots and site/src/pages/articles/[slug].astro:26.

No P0 or P1 product findings were observed in this review.

## Cognitive load

- Single focus: passes. Articles provide one clear reading path; labs separate three experiments by headings and rules.
- Chunking: fails the strict ≤4-items rubric in the six-article issue list and several 5–7-link expanded contents lists. Distinct rows and recognizable article questions mitigate the load; this is a bounded editorial index, not an undifferentiated wall.
- Grouping: passes. Controls, results and model detail have consistent visual relationships.
- Visual hierarchy: passes. Headline, deck, opening explanation, mechanism and source apparatus are distinguishable.
- One thing at a time: passes. Each experiment changes one input and models can be inspected separately.
- Minimal choices: fails the literal ≤4 rubric at the six-article index and desktop five-link primary navigation. Mobile navigation reduces to four. The six-article issue inventory is an intentional editorial commitment; no new filter controls should be added to solve this.
- Working memory: mostly passes, with the mobile slider/result separation and lost article-end experiment route documented above.
- Progressive disclosure: passes. Closed mobile contents and optional arithmetic/assumption detail let readers choose their depth.

Two strict checklist failures: moderate cognitive load by the reference, strongly mitigated by grouping. The priorities are local feedback and navigation, not removing commissioned articles.

## Persona walks and emotional journey

**Curious commuter, phone, five minutes.** Home → Delivery contents → parcel explanation. The familiar detour question is easy to choose; the opening explains the network mechanism instead of delaying it with a generic introduction. The article labels its constructed comparison clearly, and the mobile table communicates 480 versus 230 vehicle-km while separately showing 80 versus 100 km per parcel. Opening the native contents works; choosing “Six trips or five” lands at the right hash/heading. Red flag: at the end, trying the explanation requires remembering the closed top contents or leaving via the general issue path. The takeaway is a good end peak; the next-article choice is calm, but it should preserve the experiment option.

**Practical explainer, desktop with phone cross-check.** Article → source/model notes → Delivery Lab → inspect network arithmetic. The desktop reading column and contents rail serve the inspection task. Input changes are real: hub offset 30 produces “46.4 more” loaded vehicle-km; box heights 6 and 40 produce 3.6 and 24 L. The default synthetic payload computes 92 and check digit 8; a twelve-zero payload preserves all zeros. Expanded tables remain readable on mobile without document overflow. Red flags: mobile live feedback requires a scroll, and checking the newest public management decision requires traversing the full historical log. The emotional valley is that repeated travel between control and explanation; the disclosed limits and precise recovery messages restore trust.

These are scenario-based walkthroughs of the brief's intended readers, not observed reader research.

## State and craft observations

The hydrated range controls enabled correctly; keyboard End/Home changed both inputs. Invalid `abc` produced “Use exactly 12 digits, 0–9, without spaces or a check digit,” kept the input and set aria-invalid=true. Empty input produced the distinct prompt; reset-all restored hub 0, box 20 and payload 123456789012. No-JavaScript delivery defaults remained visible with disabled controls and a clear enable-JavaScript explanation. Keyboard focus around the hub control is visible. Model tables use readable tabular values. The design uses authored self-hosted typography and crisp explanatory geometry rather than decorative imagery, shadows or generic icon cards. Source CSS defines selection, caret, focus and reduced-motion behavior. These observations are not a complete accessibility audit or independent mathematical/source verification.

SKIPPED: Browser overlay (headless MODE review, intentionally excised by the factory); detector and detector history (blindness requirement); cross-browser and assistive-technology testing, measured whole-site contrast auditing, print and reduced-motion browser tests (outside this fresh taste review's exercised scope); critique trend/history and repository persistence (would breach independence/read-only scope). Report persisted only to the requested `/private/tmp/small-frictions-delivery-craft-review-report.md`. Questions skipped: founder delegated choices and the factory explicitly removes the ask-user round. No site source edits or commits. Temporary browser evidence retained for the maker; its local server and browser were stopped.
