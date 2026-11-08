# Contributor research ledger — Waiting / rules desk

Date: 8 November 2026. Research and draft authorship performed by an AI contributor. No interviews, field observations or independent human fact-checking were performed. Drafts are original prose; constructed scenes are labelled inside each article. Sources below were opened directly and relevant passages inspected, rather than accepted from search snippets alone. No source prose is quoted in the drafts.

## Drafts delivered

| File | Body words | Main device | Editorial boundary |
|---|---:|---|---|
| `drafts/one-queue.json` | 668 | Original two-counter worked example: waits total 7 minutes versus 3 | Pooling comparison assumes interchangeable fixed-speed counters, common job eligibility, no switching in separate queues, and no transfer cost. No universal faster-line claim. |
| `drafts/littles-law.json` | 642 | Original repair-desk example: 18 devices / 12 per hour = 90 minutes in system; 6 awaiting service / 12 per hour = 30-minute queue wait | Average counts, effective flow, consistent entry/exit boundary, units and finite-window effects. No inference about staffing or why delay occurs. |
| `drafts/waiting-design.json` | 609 | Original parcel-room scenarios and clearly labelled editorial design questions | Distinguishes speculative classic essays, observational evidence and our own suggestions. No guaranteed psychology, fabricated field test or countdown benefit. |

Word counts exclude title, deck, headings, takeaway, model note and sources. JSON parses successfully. All three use the parent-requested schema. File numbers 04–06 are provisional issue ordering; the managing editor can change them.

## Primary sources used

### One queue

1. [UC Berkeley CS 162, March 1996 midterm solution, page 12](https://hkn.eecs.berkeley.edu/examfiles/cs162_fa96_mt1_sol.pdf). Opened full 12-page PDF; inspected extra-credit solution. It describes committed separate queues potentially leaving a server idle while people wait elsewhere, in contrast to a shared work-conserving line. It explicitly assumes unknown service needs and no queue switching. The article uses this narrow mechanism, not an unqualified general stochastic dominance theorem.
2. [Shunko, Niederhoff and Rosokha, Humans Are Not Machines: The Behavioral Impact of Queueing Design on Service Time](https://pubsonline.informs.org/doi/10.1287/mnsc.2016.2610). Opened publisher page and inspected its abstract. It reports behavioral experiments showing slower servers in the pooled treatment and an effect of queue visibility, conditional on the experimental setting and incentives. Full paywalled paper was not used. Metadata: online 10 February 2017; Management Science volume 64(1), 2018, pages 453–473. The draft gives no numerical effect size and claims no universal real-world estimate.

The article’s two-counter and walking-delay examples were invented and calculated here, not taken from these sources. The brief first-free-server explanation and source notes are conservative paraphrases within each source’s 200-word reuse limit.

### Little’s law

1. [John D. C. Little, A Proof for the Queuing Formula: L = λW (1961)](https://pubsonline.informs.org/doi/10.1287/opre.9.3.383). Opened publisher page and inspected public abstract, definitions, year and stated stationary-process conditions. Full paywalled text was not used. Draft does not claim stationarity is the weakest or only possible condition for every version of the law.
2. [John D. C. Little, Little’s Law as Viewed on Its 50th Anniversary (2011, author’s paper reprinted by Project Production Institute in 2016)](https://projectproduction.org/journal/reprint-littles-law-as-viewed-on-its-50th-anniversary/). Opened full reprint. Inspected section 2.1, especially Theorem LL.1 (empty system at start and finish of finite interval), and section 3.1 on sample-path and stationary versions. The article’s repair desk is original. Source treatment is limited to consistent accounting, finite windows and the law’s scope; it does not reproduce the source’s examples, proofs or historical narrative.

A historical MIT URL `https://web.mit.edu/sgraves/www/papers/Little%27s%20Law-Published.pdf` now redirects to a faculty homepage. It was rejected as a source link and is not in the draft. MIT Cathy Wu’s 2023 queueing slides were inspected for an independent arithmetic sanity check but are not cited or paraphrased in these articles, avoiding overlap with the other contributor’s likely utilization article.

### Experience of waiting

1. [David H. Maister, The Psychology of Waiting Lines (1985), author’s website](https://davidmaister.com/articles/5/52/). Opened HTML essay. Its propositions on uncertainty and perceived fairness are identified as propositions; conclusion emphasizes context. Draft does not present it as controlled experimental evidence or reproduce its commercial anecdotes.
2. [Richard C. Larson, Perspectives on Queues: Social Justice and the Psychology of Queueing (1987)](https://pubsonline.informs.org/doi/10.1287/opre.35.6.895). Opened publisher page and public abstract only. It explicitly labels the piece speculative and explains the use of experience/cases. This limitation is in the article and source note. Do not imply the full article was reviewed.
3. [Watkins et al., Where Is My Bus? Impact of mobile real-time information on the perceived and actual wait time of transit riders (2011)](https://ojp-content.s3.us-east-2.amazonaws.com/NHI/Old/BaseImages/2014/04/d.pdf). Opened complete original 10-page journal PDF. Inspected sections 3–5, especially tables 1–4 (measured versus perceived wait), table 7 (no significant between-group aggravation difference), discussion of observational measurement bias, and discussion of self-selection in section 5. The draft uses no numerical headline or universal causal claim. It says that the real-time group’s measured and perceived means were not significantly different, rather than claiming exact equality or that the null hypothesis was proved.

The parcel-room messages, access questions, distinction between explaining and justifying policy, and proposed evaluation questions are original editorial reasoning, labelled as such rather than attributed research findings. Source-derived treatment and notes remain below 200 words per distinct source, without any direct quotation.

## Checks and caveats for managing editor

- Read-time labels are provisional five-minute editorial estimates; no claim of measurement.
- Source lists should remain visible on each published article. If adding inline reference links, preserve the relevant qualifications alongside claims.
- Do not convert “not significantly different” into “the same,” or observational association into guaranteed causal benefit.
- Do not say a shared queue always improves every individual wait or every real service’s mean. The example proves its own arithmetic only.
- Little’s law is about compatible averages, not a single snapshot. The article’s calculations assume a stable flow with all accepted devices passing through the measured stage. Little’s finite-window discussion is broader; this introductory piece deliberately uses the clean empty-endpoints case.
- No independent human review is claimed; each draft includes a visible AI model note.
