# Small Frictions · Publication brief

## Purpose
A web magazine about why everyday life works the way it does. Current issue: **Delivery**, following **Waiting**. The publication now requires two complete six-article issues, their own labs, honest authorship, an inspectable log and a verified public GitHub Pages site. The current commission is specified in specs/issues/delivery.md.

## Readers
- **The curious commuter.** Five minutes, phone, one familiar question. Bounces when a generic introduction delays the explanation or a model masquerades as observed data.
- **The practical explainer.** Designer, teacher or technically curious reader, desktop. Wants assumptions, source links and a controllable example. Bounces when a diagram is decorative or controls do nothing.

## Archetype
Deliberate hybrid: an issue-based explanatory magazine with interactive-explorable elements. Astro islands because changing model inputs is part of the editorial value. The ordinary reading path needs no JavaScript.

## Content and provenance
Each issue has six original English articles commissioned from two AI contributors, supervised and edited by the managing AI. Primary sources inspected before publication; no copied articles, fabricated quotes or personal reporting. Article-specific source notes and illustrative model labels. Canonical edited prose is MDX; contributor JSON is historical draft provenance. Registry drives routes and discovery. Waiting and Delivery are the current authorized inventory. Future issues remain uncommissioned proposals.

## Voice
Begin with something a reader recognizes. Explain one mechanism at a time. Use concrete worked examples and distinguish assumptions from measurements. Be candid about AI authorship, not self-congratulatory about it.

## Design leanings
Public-information typography with a magazine’s scale and spacing. Original precise vector diagrams; no generated bitmap artwork. Light-only, readable warm paper with rust-red semantic emphasis. No repeating filler cards, cookie wall or fake email signup.

## Page inventory
| id | path | purpose | mustShow |
| --- | --- | --- | --- |
| home | / | Cover and current-issue contents | The Small Frictions masthead, Delivery cover, a schematic network, six new article routes and a visible path to Waiting. |
| issue | /issues/waiting/ | Complete launch issue | All six article titles, issue introduction and a working route to the Queue Lab. |
| archive | /issues/ | Issue archive | Exactly two real issues, Delivery and Waiting, with their issue numbers and publication dates; no fake future issues. |
| capacity | /articles/capacity/ | Spare capacity explainer | A concrete queue example, explicit model assumptions and primary-source notes. |
| bus-pairs | /articles/bus-pairs/ | Bus bunching explainer | The boarding feedback mechanism, diagram and real-world limitations. |
| average-wait | /articles/average-wait/ | Inspection paradox explainer | Equal mean headways, unequal passenger waits, worked numbers and sources. |
| one-queue | /articles/one-queue/ | Pooling explainer | A shared versus separate line comparison and the conditions on its conclusion. |
| littles-law | /articles/littles-law/ | Little’s law explainer | The L = lambda W relationship, a consistent worked example and stable-system caveat. |
| waiting-design | /articles/waiting-design/ | Perceived waiting explainer | Elapsed versus experienced waiting with context-sensitive evidence and sources. |
| lab | /lab/ | Test three waiting mechanisms | Keyboard-operable controls for spare capacity, headway variation and shared queues, live results and model limits. |
| about | /about/ | About, authorship and editorial method | AI authorship, no claim of human fact-checking, sourcing policy and a correction route. |
| log | /logbook/ | Public management log | Dated decisions with rationale, evidence and a clear AI-manager attribution. |
| not-found | /404.html | Recover from broken links | A useful missing-page message with links to the issue and homepage. |
| delivery | /issues/delivery/ | New issue | Delivery, Issue 02, six new article titles and a route to the Delivery Lab. |
| parcel-detour | /articles/parcel-detour/ | Consolidation | Hub routing versus direct journeys, an original example and explicit tradeoffs. |
| barcode | /articles/barcode/ | Identity and events | Barcode identity versus tracking observations, with precise GS1 source notes. |
| box-space | /articles/box-space/ | Package volume | A clearly labelled rectangular volume example and limits of interpreting unused envelope space. |
| last-mile | /articles/last-mile/ | Delivery density | Stops, collection and failed-attempt tradeoffs without universal cost or emissions claims. |
| container | /articles/container/ | Transfer standards | Standardized handling across modes with qualified primary-source support. |
| returns | /articles/returns/ | Reverse logistics | Inspection and disposition choices, labelled examples and evidence limits. |
| labs | /labs/ | Discover both labs | Working links to the Delivery Lab and the preserved Queue Lab. |
| delivery-lab | /labs/delivery/ | Inspect three mechanisms | Responsive controls for a toy hub network, rectangular box volume and a synthetic GS1 check digit; live results, assumptions and inspectable arithmetic. |

## Publishing and authority
Public repository `jdinkla/small-frictions`; URL `https://jdinkla.github.io/small-frictions/`; choose a free local port in justfile. Folder name remains a local placeholder. All concept and release decisions are delegated by the founder’s explicit request, overriding skill checkpoints that would otherwise stop for approval. No repeated confirmation required. Source repository is public for inspectability.
