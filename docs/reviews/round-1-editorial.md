VERDICT: REVISE

REVIEWER: Independent editorial instance; GPT-6 family, exact model variant unavailable. The role file's suggested model name is not runtime evidence.

FLOOR: GREEN. My own `just check` in `/private/tmp/small-frictions-review-editorial` completed successfully: base-aware source links; 3 test files / 10 tests; production build of 13 HTML pages; markup guard; built-link, fragment, font, metadata and XML guards. No browser workflow execution is claimed by this editorial review.

COVERAGE:
- home `/`: PRESENT — cover, issue contents and lab route; queue explicitly labelled illustration.
- issue `/issues/waiting/`: PRESENT — issue introduction, six articles, lab route and authorship.
- archive `/issues/`: PRESENT — one actual issue, dated 8 November 2026; no future issue filler.
- capacity `/articles/capacity/`: PRESENT — concrete kiosk, stable M/M/1 assumptions, queue/system distinction and source notes.
- bus-pairs `/articles/bus-pairs/`: PRESENT — boarding feedback, invented worked numbers, interventions and real-world limits.
- average-wait `/articles/average-wait/`: PRESENT — equal frequency, unequal residual waits, explicit sampling rule and renewal qualification.
- one-queue `/articles/one-queue/`: PRESENT — same-job comparison, interchangeability assumptions and behavioral limitations.
- littles-law `/articles/littles-law/`: PRESENT — compatible boundary/units, worked numbers, stable averages and finite-window caveats.
- waiting-design `/articles/waiting-design/`: PRESENT — elapsed/experienced distinction, speculative versus observational evidence and labelled editorial suggestions.
- lab `/lab/`: PRESENT — three models, controls, default results, inspectable job table, assumptions and reset; one result explanation is inconsistent at the lower slider values.
- about `/about/`: PRESENT — explicit AI production/review, evidence policy, correction route, RSS and honest unvalidated business premise.
- log `/logbook/`: PRESENT — dated decisions, rationale, evidence boundaries and AI-manager attribution.
- not-found `/404.html`: PRESENT — useful missing-page message with issue and cover recovery links.

TOP-CHANGES:
1. [local] `site/src/components/islands/QueueLab.tsx:53`: make the pooling explanation depend on the selected long-task duration. The statement that B can take both waiting people while A is busy is false at 1 minute and does not describe the tie-at-2 allocator. At 1 minute the two counters each take one waiting job at minute 1; at 2 minutes B takes one at minute 1 and A takes the next at minute 2. Both arrangements then have the same mean wait. The practical explainer's bounce point is moving the control to “all equal” and seeing prose still describe the unequal-work mechanism. The computed results themselves are correct. A conditional explanation for durations <=2 resolves this narrow issue without changing the model.

OBSERVATIONS:
- The curious commuter gets a recognizable opening and an early mechanism in all six pieces. Models and invented scenes are labelled before quantitative conclusions; no fabricated reporting, people, quotations, audience or revenue claims found.
- The practical explainer can inspect assumptions, arithmetic, source notes and model code. Independently recomputed the 7-versus-3 total pooling waits, 8/18/38-minute kiosk queue waits, 8.2-minute headway wait and 64% increase, 36-second boarding contrast, and 90/30-minute Little's-law examples. No material mathematical defect found.
- Primary-source spot checks support the prose: MIT's M/M/1 note separates queue/system time; Sigman's renewal notes support the residual-wait formula; Berkeley's exam solution supports the work-conserving mechanism; UCLA's PDF supports boarding feedback; Daganzo's institutional abstract supports the narrowly qualified holding comparison; Ptolemy's Appendix C supports regular-versus-Poisson waiting; Little's 1961 abstract supports the limited historical statement. The Shunko and Larson checks used their publisher abstracts only, consistent with the source notes. Maister's author-hosted essay and Watkins's original PDF support the context and evidence qualifications. This is spot checking, not a claim that every external source was independently reverified.
- Watkins's no-significant-aggravation finding and nonrandom observational design are represented conservatively; the prose does not repeat the source abstract's stronger causal language. The other abstract-only boundaries are preserved.
- A cross-page phrase scan found no repeated stock signature phrases or placeholder text. Similar closing invitations to inspect the system are thematically consistent rather than a reader-blocking repeated template. Some caution language is recurrent, but it performs a necessary evidence function here.
- Optional comprehension polish: `site/src/content/entries/capacity.mdx:20` could briefly gloss Poisson/exponential behavior for the commuter. The worked kiosk and subsequent assumptions already let the core argument stand, so this is not a gate.
- No design/pixel verdict is given. This report judges the review snapshot, before the manager's announced correction to the pooling sentence.
