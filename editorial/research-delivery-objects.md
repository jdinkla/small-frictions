# Delivery objects research record

Date: 2026-11-08. AI contributor; GPT-6 family exposed by runtime, exact variant unavailable. Bounded commission: `barcode`, `box-space`, `returns`. Drafts are provenance JSON; no site files, canonical article MDX, metadata or publication state were changed by this contributor.

## Inspected primary material

| Draft | Source and inspected content | Use and limits |
| --- | --- | --- |
| barcode [1] | [GS1 System Architecture](https://ref.gs1.org/architecture/system-architecture/), identify/capture/share discussion, table 4-1 at lines 269–293, data-capture workflow around lines 389–440, visibility-data section around lines 637–661. | GTIN class versus GTIN plus serial instance versus SSCC logistics unit; identifier/data-carrier distinction; context gives a scan its business meaning. Standard architecture, not observed adoption or carrier performance. |
| barcode [2] | [GS1 GO EPCIS explanation](https://support.gs1.org/support/solutions/articles/43000755325-what-is-electronic-product-code-information-services-epcis-), body lines 5–10, modified 30 May 2025. | Event what/when/where/business-context and condition information in 2.0. Brief official explanation, not a claim of inspecting the entire EPCIS technical standard. |
| barcode [3] | [GS1 Denmark Tools](https://www.gs1.dk/en/resources/tools), check-digit section lines 118–124. | Check digit computed from preceding digits with modulus 10. Copied-label counterexample and lack of authenticity proof are original reasoning about arithmetic. No scanner implementation tested. |
| box-space [1] | [UPS packaging guidance](https://www.ups.com/us/en/support/shipping-support/packaging-tips), lines 13–18, 40–55, 61–84. | Rigid box, suitable cushioning, different packing methods and irregular handling. Guidance contains an apparent error saying three inches equals 76 centimetres at line 71; the article neither reproduces nor relies on that instruction. Guidance is not a test of the invented box. |
| box-space [2] | [FedEx dimensional-weight explanation](https://www.fedex.com/en-us/shipping/packaging/what-is-dimensional-weight.html), lines 112–153. | Space relative to actual weight and greater-of pricing mechanism only. No numeric tariff quote. Promotional environmental language is not treated as quantified lifecycle evidence. |
| returns [1] | [DHL Returns and Circularity, US](https://www.dhl.com/us-en/home/supply-chain/solutions/returns-and-circularity.html), lines 12–16 and 42–62. | Inspection, sorting, processing and available final-disposition routes. Commercial provider description, not independent evaluation, outcome frequency or representative industry data. |
| returns [2] | [Apple Why Refurbished](https://www.apple.com/shop/refurbished/about), lines 32–44. | Named programme describes functional testing, cleaning, inspection, replacement parts as needed and packaging. Does not establish fate of all Apple returns or any general industry recovery rate. |

Sources were opened and their content inspected; they are not supported solely by search snippets. Sources are numbered locally within each draft. Inline [n] markers are placed near source-dependent claims. No source quotations are used. Each source's descriptive prose and note are kept below 200 words; most body text is original constructed reasoning or an explicitly fictional example. The magazine's editor must preserve this balance if expanding source summaries.

## Access limitations and rejected material

- Main gs1.org GTIN, SSCC, EPCIS and check-digit landing pages returned HTTP 403. Do not claim those pages were inspected. The reference architecture and GS1 support/member-organisation pages above supplied accessible primary alternatives.
- `https://ref.gs1.org/standards/epcis/` timed out. The full technical standard was not used.
- GS1 UK's check-digit article and older PDF opened as a one-line iframe wrapper; search returned substantive text but these were not accepted as inspected sources. A guessed older UK article URL was inaccessible. GS1 Denmark replaced those candidates.
- A guessed IKEA UK buyback URL was inaccessible. Search surfaced a US IKEA buyback description, but it was excluded: a buyback programme for used goods would blur the article's discussion of ordinary returns. No IKEA claims appear in the draft.
- No provider videos were watched, accounts accessed, interviews conducted or warehouse operations observed. DHL's page showed video-load errors; only its visible text was used.

## Original worked examples and correctness checks

- Barcode: twenty blue mugs, two customer parcels and depot events at 09:10 and 12:10 are invented. At 11:00 the two endpoint events do not establish a continuously observed location. No GPS capability or data freshness is implied. GTIN alone names a trade-item class; its serial-qualified form can name an instance. SSCC is for an individual logistics unit; not all carrier tracking identifiers are SSCCs. The number, barcode symbol and event records have separate roles.
- Box-space: all dimensions are explicitly external, except the separately named rectangular product envelope. 40 × 30 × 20 cm = 24,000 cm³ = 24 L. 20 × 15 × 10 cm = 3,000 cm³ = 3 L. Envelope fraction 3/24 = 12.5%. Its 87.5% complement is **not** a measured air or material-void fraction.
- Alternative box: 26 × 21 × 16 cm = 8,736 cm³ = 8.736 L. Relative external-volume reduction (24 − 8.736)/24 = 63.6%. Envelope fraction 3/8.736 ≈ 34.3%. The nominal 3 cm margin per face includes unspecified box walls; it proves nothing about adequate cushioning.
- Equal-volume shape: 80 × 30 × 10 cm = 24 L, but dimensions differ. The illustrative process length limit is hypothetical; no conveyor specification inferred.
- Returns: three lamps and all facility rules are fictional. No electrical-safety assessment advice is given. Receipt, processing, offering for resale, completed sale and material recovery are distinct events; no route frequencies, disposal percentages or emissions figures are supplied. The final paragraph states explicitly that neither inspected source provides representative all-returns disposal data.

## Draft validation

A local JSON parse verified all three objects. Body word counts including lead and takeaway, excluding source notes and metadata: barcode 703; box-space 754; returns 765. Arithmetic was recomputed independently with Python. These are contributor checks, not the required independent editorial review, browser review or full site checks. No publication claim is made.

Provisional article numbers: 04, 05, 06. Parent editor owns sequence, issue metadata, editing and commissioning of independent review.
