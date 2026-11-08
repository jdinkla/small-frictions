MODE: evidence — limited verification addendum
MODEL: GPT-6 family; exact reviewer variant unavailable.

RESULT: The previously confirmed contrast miss is resolved by the revised accent #b43a20. All three lab “min” units remain 20px regular (400), now on wash #e8e5da at **4.6684875764072515:1**, exceeding the strict, unrounded 4.5:1 normal-text threshold. Original contrast was 4.492605653758059:1.

EVIDENCE:
- Own `just build` in `/private/tmp/small-frictions-review-craft-evidence`: exit 0; 13 pages built from the updated source.
- Own updated `node tools/browser-check.mjs`: exit 0. Its strict computed text-contrast assertions (including SVG fill and rectangle-background detection) passed for 13 pages at 320, 390, 768, 1024 and 1440 widths. The harness also reported no horizontal overflow, local fonts available, expected lab results and controls/keyboard behavior, local-only requests, no browser errors, readable no-JavaScript defaults, and working print checks. Report: `shots/workflows/report.json` in the copy; run output `/private/tmp/small-frictions-craft-verification-browser.txt`.
- Additional independent local Chromium computed-style and target-bound measurements at 320, 390, 768 and 1280 widths, on lab plus the average-wait, Little's law, bus-pairs and capacity articles. Evidence file `/private/tmp/small-frictions-craft-verification-computed.json`.

CONTRAST DETAILS:
1. All three lab unit labels: #b43a20 on #e8e5da; 20px/400; ratio 4.6684875764072515:1 at all four measured widths (12 instances). PASS for normal text.
2. Desktop SVG red text “Mean wait: 8.2 min” in average-wait: computed fill #b43a20, wash background, 18px/400, ratio 4.6684875764072515:1 at 768 and 1280. PASS for normal text. SVG text uses fill, not CSS text color, in this verification.
3. Mobile bus feedback labels “Wider gap ahead”, “More delay”, “Smaller gap ahead”, “Closes the gap”: #b43a20 on wash, 14px/500, ratio 4.6684875764072515:1 at both 320 and 390. PASS for normal text (8 instances).
4. Also measured the mobile Little's law equation at 28.8px and desktop SVG “1.5” at 49px: same 4.6684875764072515:1; they exceed both normal and large-text requirements. Across the selected pages, 26 visible accent-text instances were measured.

TARGET DETAILS:
The changed desktop article contents links, mobile contents summary/expanded links, lab section links and model-limit summaries were measured as rendered browser rectangles. Across the five selected routes at four widths: **124 visible target instances; every measured target was at least 44px high and 44px wide**. Minimum height 44px; minimum width 68.1875px. Mobile contents were opened before measuring their child links. These confirm the revised target dimensions for the selected shared components, not all inline links across the site.

P0/P1: No new issue established in this limited verification. The original P1 lab unit-label contrast miss is resolved.

PRESERVATION: Original evidence report `/private/tmp/small-frictions-craft-evidence-report.md` and original raw 52-hit scan `/private/tmp/small-frictions-review-craft-evidence/docs/qa/design-scan.json` remain intact. The scanner was not rerun and its historical count is not replaced by a clean-scan claim. No source changes or commits by this reviewer; temporary measurement script removed.

SKIPPED: No new visual/taste review or heuristic score; no new screenshot review loop; no full independent accessibility audit; no physical touch-device testing; no production-site verification. Browser computed contrast checks establish the tested declared colors, backgrounds and font sizes; they do not prove every possible compositing or interaction state. Browser overlay omitted because this was headless evidence verification.
