# Delivery contributor research: networks, last mile and containers

Research date: 8 November 2026. AI contributor operating under the Small Frictions charter. This record accompanies three commissioned JSON drafts, not publication or independent human review. Runtime identifies the GPT-6 family; exact variant unavailable.

## Scope and method

Read PRODUCT.md, specs/brief.md, specs/design.md, editorial/charter.md and docs/logbook.md, plus the historical bus-pairs JSON schema. Drafts begin with familiar situations, then develop original mechanisms and explicitly invented examples. No interviews, tracking investigations, field visits, personal experience or direct quotations are claimed. Operator pages establish described services, not independent benefit estimates. Drafts use numbered inline source markers and visible source notes.

All eight sources in the final draft lists were opened and inspected directly with the web tool. These were public HTML pages except for the accessible 15-page locker research PDF. The PDF's methods, results, discussion and limitations were inspected in extracted text; no claim to assessing its visual figures is made. No source imagery was reused.

## parcel-detour

- [UPS Worldport](https://www.jobs-ups.com/us/en/ups-worldport): inspected operator recruitment page. Used only for the real hub example. No capacity or superiority claim imported.
- [UPS tracking status](https://www.ups.com/us/en/support/tracking-support/where-is-my-package/understanding-tracking-status): inspected operator support page. Used for the limit of scan histories.
- [DHL shipment status](https://www.dhl.de/en/privatkunden/hilfe-kundenservice/sendungsverfolgung/was-bedeutet-mein-sendungsstatus.html): inspected status sections, including misdirection and manual processing. Used to preserve the possibility of errors.

Original numerical example: three origins each send 10 parcels to each of two destinations, so 3 × 2 × 10 = 60 parcels. Vehicle capacity 30. Direct: 6 loaded trips × 80 km = 480 vehicle-km, ten parcels per trip. Hub: 3 inbound × 30 km + 2 outbound × 70 km = 230 vehicle-km, with 20 inbound parcels per vehicle and 30 outbound. Each parcel travels 100 rather than 80 km. Reduction in loaded vehicle-km is 250. These distances are a consistent hypothetical network, not observed roads. Return trips, hub overhead, handling, labour, cost, emissions, collection and final delivery excluded. Departure comparison separately assumes two hours direct travel versus 2.5 hours plus 0.5 hour transfer through H; departure availability decides arrival order. No claim that the kilometre example implies a particular timetable.

## last-mile

- [DHL Packstation receiving](https://www.dhl.de/en/privatkunden/hilfe-kundenservice/packstation/empfangen.html): inspected operator support page including collection and service constraints. No environmental marketing used as research.
- [Ranjbari et al., 2023, full PDF](https://urbanfreightlab.com/wp-content/uploads/2023/05/Do-Lockers-Reduce-Delivery-Dwell-Time-Evidence-from-Field_UrbanFreightLab.pdf): inspected primary field experiment. Draft preserves different outcome measures and study limits without exporting numerical effects to other contexts.

Original route arithmetic: 20 stops have 19 intervals between them. 19 × 1 + 20 × 3 = 79 minutes. Halving travel: 19 × 0.5 + 60 = 69.5 minutes. Halving handover: 19 + 20 × 1.5 = 49 minutes. Clock excludes approach/return. The separate collection scenario removes 4 delivery vehicle-km but can add 10 × 2 = 20 recipient vehicle-km. Walking/passing scenario can add zero car-km; it does not imply zero walking time or a calculated environmental saving. No customer behaviour distribution assumed. Accessibility and task redistribution are editorial reasoning, not survey findings.

## container

- [IMO safe transport overview](https://www.imo.org/en/mediacentre/hottopics/pages/container-default.aspx): official overview inspected for the safety and standards apparatus. Linked ISO engineering specifications were not read. Draft avoids exact dimensions, detailed lifting instructions and historical origin claims.
- [BIC identification](https://www.bic-code.org/identification-number/): inspected registry body's own explanation of identification.
- [Port of Rotterdam containers](https://www.portofrotterdam.com/en/logistics/cargo/containers): inspected authority's service page. Used for existing modal connections, not independently demonstrated speed or sustainability.

Original transfer count: 100 cartons × (1 unload + 1 load) × 3 changes = 600 carton actions; 1 container × 2 × 3 = 6 container actions. Units differ. Counts do not imply equal work per action or 100-fold time/productivity improvement. Packing, unpacking, intermediate yard lifts, stacking and waiting excluded. Cargo must fit suitable equipment and permitted mass; no assumed actual load capacity. Containers can require opening for other reasons; the claim is that changing vehicles alone need not require unpacking.

## Access limits and unused leads

- MDPI article `https://www.mdpi.com/1660-4601/18/12/6325` returned HTTP 429 on direct open. Not used.
- Southampton repository record `https://eprints.soton.ac.uk/348551/` returned HTTP 403 on direct open. Search snippet alone was insufficient; not used.
- Guessed BIC path `https://www.bic-code.org/size-and-type-code/` was inaccessible. No specification inferred from it; not cited.
- Search surfaced ITF reviews, operator material and secondary accounts. None supplies an empirical claim in these drafts unless listed above. Additional IMO gross-mass and CSC overviews were accessible and inspected as background; final container source [1] contains the narrower facts used.
- No source presented a complete dataset for evaluating a reader's own parcel route, emissions or locker convenience. Drafts therefore offer mechanisms and boundary checks, not case diagnoses or universal recommendations.

## Handoff checks

Draft JSON parsed successfully; source markers match their numbered lists. Word counts should be checked again after managing-editor edits. Mathematical examples were recalculated as above. No build, rendering, independent AI review, site edits, commit or publication is claimed by this contributor. Source-derived prose and source notes are kept under 200 words per source; the bulk of each draft is original explanation and invented examples. This record keeps source summaries deliberately short to preserve that boundary across the handoff.
