# Delivery Lab · model and source record

Prepared 8 November 2026 by a separate Codex GPT-6-family implementation agent. Exact runtime variant unavailable. This is original explanatory model work with primary-source arithmetic inspection, not transport reporting or human fact-checking.

## Scope and established visual system

The lab extends the existing Public Notice Operate/Read surface: native ranges, an editable text payload, result rows, disclosures, readable arithmetic tables, existing typography and warm paper/rust tokens. The assigned brief settled the purpose and composition; this subagent used it directly rather than requesting a new design decision. No durable token or global-style change was needed. Canonical models are in `site/src/lib/delivery.ts`; the React island imports its own scoped stylesheet. No new dependency, storage or external runtime request was introduced.

## Original hub comparison

Four origins at (0, −3), (0, −1), (0, 1), (0, 3), and four destinations at (12, −3), (12, −1), (12, 1), (12, 3), all in kilometres. Every origin sends one parcel to every destination: 16 parcels. Direct comparison: 16 single-parcel loaded vehicle legs. Hub comparison: hub at (6, y), four inbound and four outbound loaded legs, four parcels per leg, requiring capacity of at least four. No claim about number of distinct vehicles is made.

Euclidean leg distance is √(Δx² + Δy²), counted once per loaded vehicle leg. The offset y ranges from 0 to 30 km. At y = 0, direct loaded vehicle distance is **198.4224086563 km** and hub loaded vehicle distance is **51.1638658512 km**, a difference of **147.2585428051 km**. At y = 30, hub loaded vehicle distance is **244.7782912640 km**, **46.3558826077 km more** than direct. Display rounds kilometres to one decimal. The calculation retains full precision.

The direct total can be independently reconstructed by vertical separation: four legs at 0 km, six at 2 km, four at 4 km, two at 6 km. Thus 4 × 12 + 6 × √148 + 4 × √160 + 2 × √180 = 198.4224086563 km. With hub at y = 0, four combined legs have length √45 km and four √37 km. Loads are conserved: 16 parcels in and 16 parcels out. Parcel-kilometres are a different measure, retained in the pure result for explicit unit checks: hub parcel-km equals four times hub loaded vehicle-km.

Excluded: empty and return legs, stop service, congestion, roads, timing, cost, emissions and fleet assignment. It compares two specified arrangements and is not a route optimizer. No source is required for the invented coordinates; they are labelled synthetic on the page.

## Original rectangular envelopes

Product envelope: 20 × 10 × 5 cm = 1,000 cm³ = **1 L**. External box: 30 × 20 × height cm, with height 6–40 cm and default 20 cm. The default box envelope is **12 L**; product-envelope ratio is **8.333333…%** and subtraction gives an **11 L envelope difference**. At the range ends, box envelopes are **3.6 L** and **24 L**. The conversion is 1 L = 1,000 cm³.

The ratio uses a rectangular product bounding envelope and the external box dimensions. Wall thickness, protection, packing and other contents are unspecified. The difference includes such unmodelled volumes; it is not measured air, proof of internal fit, dimensional weight, a shipping price or an emissions estimate.

## GS1 check-digit primary sources inspected

1. [GS1 Austria: Algorithmus der Prüfziffernberechnung](https://www.gs1.at/sites/default/files/2020-04/Algorithmus-GS1-Pruefziffernberechnung.pdf), four-page PDF, page 3 (zero-based page 2). Successfully fetched and read on 8 November 2026, including the multiplier table and worked calculation. Confirms alternating 3/1 multipliers with the rightmost payload digit weighted 3, summing the products and complementing to ten. The 17-digit payload example sums to 101 and appends 9. Page 4 separately treats the Code 128 symbol check character; this lab does not implement that different calculation. The file path is dated 2020-04; no claim is made that it is the latest complete GS1 specification.
2. [GS1 Denmark: Beregn dit kontrolciffer](https://www.gs1.dk/vaerktojer/beregn-dit-kontrolciffer). Successfully fetched and read on 8 November 2026. Calculator instructions and FAQ describe Modulo 10, excluding the check digit on input, and distinguish arithmetic agreement from correct allocation or barcode print quality. The official calculator was not executed or embedded, and no input was sent to it.
3. [GS1 UK: What is a check digit?](https://www.gs1uk.org/knowledge-hub/standards/what-is-a-check-digit) and [How to calculate your check digit](https://www.gs1uk.org/sites/default/files/how_to_calculate_your_check_digit.pdf). Read official-source search-index content on 8 November 2026. Direct retrieval returned an iframe wrapper, so do not claim complete live-page/PDF inspection. The indexed references give payload 501234567000 → sum 57 → check digit 3, and payload 501234567890 → sum 90 → check digit 0. These independent published reference values are unit-test fixtures. The Austria PDF is the directly inspected source for the method linked in the lab.

Access limitations: `https://www.gs1.org/services/how-calculate-check-digit-manually` returned 403. The GS1 General Specifications endpoint returned a tool content-size error; its contents are not claimed as reviewed. The first guessed Danish `/standarder/identifikation/kontrolciffer/` path was inaccessible; the current tool page above succeeded.

## Synthetic checksum behavior

The lab accepts exactly 12 ASCII digits, preserving leading zeros. Default synthetic payload **123456789012** produces weights **1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3** from the left, weighted sum **92**, check digit **8**, and displayed synthetic string **1234567890128**. Formula: (10 − (sum mod 10)) mod 10. An already divisible sum produces zero. Empty and invalid input replace the result with an explanatory message; stale arithmetic is not shown. Spaces, non-ASCII digits and wrong lengths are rejected rather than silently normalized.

This is local arithmetic, not allocation of an identifier, a production barcode generator, authentication or parcel tracking. No barcode image or lookup is supplied. Arithmetic agreement does not detect every possible entry error or prove identity. The 12-digit restriction is the bounded lab exercise, not a claim that all GS1 identifiers have that payload length.

## Implementation evidence and remaining integration work

`npx vitest run src/lib/delivery.test.ts` passed **8 tests** on 8 November 2026. Coverage: conservation and both hub extremes; correct vehicle/parcel distance units; fixed direct geometry across the slider; invalid bounds; volume conversion, limits and conservation; official-source checksum examples including zero; all 12 editable positions across digits 0–9; leading zeros and malformed inputs. Initial hand-entered decimal fixture values were corrected to independent geometric expressions after the tests exposed the transcription mismatch. The regex validation also explicitly checks string length to reject JavaScript’s permissive end-of-line `$` match.

The mechanical Impeccable scan over the component and stylesheet returned `[]` (no detector findings). This is advisory static evidence, not a rendered accessibility or design verdict. Controls have deterministic server-rendered defaults and remain disabled until an effect enables hydration. Keyboard ranges, labelled outputs, polite result regions, per-experiment/all resets, native assumptions disclosures, phone-sized HTML tables and print rules are implemented. No authored animation is added; the incumbent reduced-motion rule applies.

Parent integration must run the production build, browser interaction/print/no-JavaScript checks and independent rendered/prose review. This subagent has not built, captured screenshots, published or claimed those checks complete. Only the five assigned implementation/research files were written.
