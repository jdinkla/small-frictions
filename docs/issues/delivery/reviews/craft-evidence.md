MODE: evidence

EVIDENCE: Fresh local runs in `/private/tmp/small-frictions-delivery-craft-evidence` on 2026-11-08. `just check` exited 0: base-aware links valid, 4 test files / 20 tests passed, 22 HTML pages built, markup guard clear, built links/fragments/fonts/metadata/XML valid. `just impeccable-detect` exited 0 with all 99 raw findings preserved at `docs/qa/design-scan.json`; no `DEGRADED` warning was emitted. `just shots` exited 0: 22 pages × 2 viewports (1280×800, 390×844) × 1 light theme = 44/44 captures, zero missed captures or reported browser errors. Scoped local browser/server escalation was used successfully. `node tools/browser-check.mjs` exited 0: 22 pages × 5 widths (320, 390, 768, 1024, 1440), computed text contrast including SVG, overflow, keyboard controls, model results, resets, invalid/empty states, local requests, no-JS reading and print assertions passed. Additional independent computed-browser run: Chromium 149.0.7827.55, 9 representative routes at 320/390/1280, 57 records including states/hover/focus, 2,793 text samples, 196 selected target samples, zero measured contrast failures, zero selected targets under 44×44, zero expanded Delivery table overflow.

SCORE: 99 detector findings across 5 rules. This is a raw finding count, not a design score or clean-site certificate. No heuristic/taste score and no gate verdict are assigned.

| Rule, worst technical category first | Raw count | Representative built location | Browser/context triage |
| --- | ---: | --- | --- |
| low-contrast | 14 | `site/dist/404.html:0`: 3.6:1 black on rust; hover 1:1 black on black | 7 resting-state + 7 hover reports. Real button foreground is paper, not black. All seven buttons on the six affected routes were inspected at three widths; resting paper/rust is 5.166870:1 and hovered paper/ink is 12.612891:1. These screen contrast claims were not reproduced. Static CSS evaluation crosses print/token/inheritance rules incorrectly; the scanner did not report degradation, but its static result remains limited. |
| cramped-padding | 81 | `site/dist/labs/delivery/index.html:0`, `.experiment`, `.delivery-loads`, result rows | Representative members of every reported structural family have actual logical padding or padded children. Browser values below contradict “no inset.” No confirmed flush-text defect in the measured representatives; this is not an assertion that every raw occurrence was individually visually judged. |
| oversized-h1 | 2 | `site/dist/about/index.html:0`; `site/dist/articles/returns/index.html:0`: reported 5280px | Actual computed heading size is 45.6px at both 320 and 390, 67.84px at 1280. Both fit their viewport. The reported 5280px is a static relative-unit/clamp interpretation failure. |
| italic-serif-display | 1 | `site/dist/index.html:0`, “A long way to your door.” | Literal serif/emphasis signal retained. The h1 itself computes `font-style: normal`; it has an emphasized child. Whether that stylistic choice serves the magazine is outside MODE evidence. No technical defect inferred. |
| aphoristic-cadence | 1 | `site/dist/logbook/index.html:0`, detector reports six constructions | Literal copy-pattern flag retained, not converted into a technical failure or taste verdict. The representative match is an authorship/evidence boundary statement. Contextual editorial judgment is outside this mode. |

All 99 raw entries remain intact, including their snippets and line 0 locations. The scanner does not supply useful source line numbers. Counts have not been reduced after triage.

Cramped-padding raw breakdown (sums to 81): footer-base 22; article-layout 12; diagram-row 8; editorial-strip 1; article-index wrapper 3; index list items 18; previous-issue 1; experiment sections 6; delivery-loads wrapper 1; delivery-load paragraphs 2; Delivery result divs 7.

Computed spacing evidence at 390px: footer-base has 18px top/bottom padding and first text begins 21px from its top border; article-layout has 23px/40px block padding; diagram-row has 14px/14px and first text begins 18px from the top; editorial-strip has 17px/17px and text starts 20px from the boundary; article-index/list items receive child link padding, with measured first text 20–21px from the top and final text 27px from the bottom; previous-issue has 32px/32px. Delivery experiments have 32px/32px on phones and 45px/42px at 1280; delivery-load paragraphs have 13px/13px; result divs have 12px/12px. The unpadded delivery-loads wrapper inherits the space inside its first paragraph: actual text starts 16px below its top border. These are measured values, not source-only intentions.

FINDINGS:

1. **[P3, advisory evidence limitation] Static scan is not a reliable screen-contrast, relative-size or logical-spacing verdict for this build.** Preserve all 99 reports and accompany them with computed-browser triage. Fourteen screen-contrast claims and two 5280px headings were contradicted by actual browser values; sampled spacing families also have actual insets. Do not report “zero findings” or call the scanner a full accessibility audit.
2. **[P3, unconfirmed contextual flags] Home typography and logbook cadence retain two automated style/copy signals.** Locations are `site/dist/index.html:0` and `site/dist/logbook/index.html:0`. They need contextual editorial/design judgment if acted on; MODE evidence makes no recommendation to change the prose or typography.

Confirmed site defects by severity in this run: P0 0; P1 0; P2 0; P3 0. The two numbered P3 items above are reporting/triage advisories, not newly confirmed site defects. This is limited evidence, not a WCAG conformance claim.

Delivery-specific evidence:

- Normal muted result/hint text on wash (`#5c6159` / `#e8e5da`) measures 5.031823:1. Muted hints on paper measure 5.568993:1. Rust outcome text on wash (`#b43a20` / `#e8e5da`) measures 4.668488:1; mobile outcomes are 24px and desktop 26.4px, so they also exceed the large-text threshold.
- Invalid payload `12x`: message is 16px rust on wash, 4.668488:1 against the 4.5 requirement, names the exact 12-digit constraint and recovery; `aria-invalid=true`; no valid check-digit result remains. Empty payload: 16px ink on wash, 11.396285:1, with “Enter 12 digits to inspect the calculation.” Valid default: sum 92, digit 8, completed synthetic string; the source workflow also tested zero payload and resets.
- At each 320/390/1280 width, 14 selected Delivery controls, disclosures and lab jump/code links meet both 44px dimensions. Minimum selected dimensions are 58.125×44px on phones; this does not include ordinary inline prose links. Three disclosure summaries are native details controls. The focused invalid payload has a 3px rust outline with 4px offset. Keyboard Home/End and reset behavior passed the separate five-width workflow.
- With all three model disclosures expanded and valid default digits, all three tables fit: at 320px each is 280px wide within x=20..300; at 390px each is 350px within x=20..370. No cell overflow. Hub legs have 8 body rows, direct matrix 4 rows, checksum 12 rows. Mobile table text computes 13px. Empty/invalid states replace the checksum table with its recovery message, without page overflow. Expanded 320px screenshot was inspected as supporting layout evidence.
- Five-width inherited workflow verified no-JS article content and source notes, disabled Queue and Delivery inputs and their deterministic defaults (Delivery check digit 8); print hides navigation, retains source notes and article diagrams, and generates Capacity and Barcode PDFs. This covers the existing workflow assertions, not every print page or lab disclosure.

SKIPPED: Browser overlay (headless run); Nielsen/taste/design-specificity scores (MODE evidence); physical-device touch and synthesized touch-drag tests (only native range keyboard interaction and emulated viewport layout were exercised); screen-reader/assistive-technology testing; full print pagination review and all closed-disclosure print behavior; individual visual judgment of every padding occurrence; all-state automated text enlargement/zoom; independent source factual review. No dark-mode checks: the specified product is light-only. No historical review verdicts were used as evidence for this result. No source edits or commits were made.

MODEL: GPT-6 family as exposed by the runtime. Exact maker/reviewer model variant and immutable runtime identifier: unavailable/unknown. This was a fresh separate AI evidence review, not human review.

Artifacts:

- Raw static findings: `/private/tmp/small-frictions-delivery-craft-evidence/docs/qa/design-scan.json`
- Fresh capture report: `/private/tmp/small-frictions-delivery-craft-evidence/shots/out/report.json`
- Fresh captures: `/private/tmp/small-frictions-delivery-craft-evidence/shots/out/`
- Five-width workflow report and print PDFs: `/private/tmp/small-frictions-delivery-craft-evidence/shots/workflows/`
- Raw computed records: `/private/tmp/small-frictions-delivery-craft-computed.json`
- Computed-run helper (review artifact only): `/private/tmp/delivery-craft-computed.mjs`
- Expanded/error screenshots: `/private/tmp/delivery-expanded-320.png`, `/private/tmp/delivery-expanded-390.png`, `/private/tmp/delivery-expanded-1280.png`
