# Generated imagery — the opt-in runbook

This site *may* carry AI-generated illustrative artwork: a hero image, per-entry plates,
portraits, chapter openers. Nothing in the build depends on it; skip this doc entirely if the
brief doesn't call for images. Two hard rules before opting in:

- **Illustrations only, never data.** Raster generators garble text and invent numbers.
  Anything with labels, digits, or diagram semantics is inline SVG keyed to the theme tokens —
  not a generated image. Prompts should request no visible text at all.
- **The floor never depends on images.** Generation costs money and needs API keys. `just
  check` and every page must stay green with zero images present, and the judge loop never
  calls image APIs — generation is an explicit, human-triggered step.

## The pattern: prompt-as-source, image-as-artifact

| Kind | Files | Rule |
| ---- | ----- | ---- |
| Authored | `tools/gen_images.py`, `specs/image-style.md` | slug list + per-slug subject + ONE shared style block |
| Generated — never hand-edit | `tools/prompts/*.yaml` | one prompt file per slug; fix the generator and re-run |
| Artifact — committed | `site/public/images/**/*.webp` | regenerable from the prompts; never hand-edited |

`tools/gen_images.py` writes one prompt YAML per slug in pixbridge's `ImagePrompt` schema —
`full_prompt` plus `generation_notes: {aspect_ratio, negative_prompts, key_requirements}`.
A companion `tools/gen_images.sh` renders and converts. Both are yours to author when the
site opts in; document them under the AGENTS.md generated-vs-authored boundary.

## Style discipline

- Write `specs/image-style.md` first: a **named** style preset derived from the approved
  design tokens — ground/ink/accent hexes spelled out in words, mood, texture, composition
  rules, key phrases for prompts, and an explicit **Avoid** list (fed to `negative_prompts`).
  One shared style block for the whole site, so the images read as a set, not stock art.
- The no-text rule belongs **in the shared STYLE block of the `full_prompt`** — spelled out
  emphatically: every surface "blank or carrying only unreadable squiggle-lines; no letters,
  numerals, titles, measurements". `negative_prompts` are advisory — gpt-image-2 largely
  ignores them. Avoid subject words that summon text: diagram, label, spine, stamp, map,
  chart.
- Generators offer fixed aspect ratios (`16:9`, `4:3`, `3:4`, `1:1`). If the layout displays
  a different crop, do it in CSS (`aspect-ratio` + `object-fit: cover`) and add a prompt rule
  keeping subjects clear of the cropped edges.
- If an image depicts a scene with intrinsic lighting, let it stay that way in both themes —
  a photograph doesn't change with the room's light. Give its caption bar its own tokens
  instead of the themed ones.

## Rendering with pixbridge

pixbridge is on PyPI — no checkout needed:

```bash
uvx pixbridge generate tools/prompts/<slug>.yaml -p openai -m gpt-image-2 -q low
```

- `--model` is **required** — pixbridge has no default. `uvx pixbridge providers` lists
  current providers/models; quality `low` is usually enough, since everything is downscaled
  to webp anyway.
- API keys come from the environment (`OPENAI_API_KEY` / `GOOGLE_API_KEY` / `XAI_API_KEY`) —
  never committed.
- Make `tools/gen_images.sh` **idempotent**: skip any slug whose target webp already exists,
  so deleting one file re-renders only that image.

## Publish step — always downscale

Raw generator output is 400–700 KB per image; committed files should be well under 150 KB:

```bash
cwebp -q 82 -resize 1600 0 <render>.png -o site/public/images/<slug>.webp
```

Add a manual justfile recipe (never part of `check`):

```make
# (Re)generate the artwork — needs API keys, costs money; see specs/generated-images.md
images:
    python3 tools/gen_images.py
    bash tools/gen_images.sh
```

## Wiring

- Images live in `site/public/images/` and are served under the project subpath — reference
  them through the BASE system (`withBase('/images/<slug>.webp')` in components), never a
  bare root-relative `src` (invariant 1 applies to image URLs too).
- Entries opt in via the registry / MDX frontmatter (`image`, `imageAlt`, `caption` fields);
  render through one `Figure.astro` that returns nothing when the entry has no image, so
  pages stay valid before (or without) generation.
- **Alt text is authored per image and descriptive** — what the image shows, not the entry
  title.
- Set explicit `width`/`height` props to the **file's real intrinsic ratio** (layout
  stability), pair any CSS `aspect-ratio` crop with `height: auto` — otherwise the height
  attribute stays the used height and the image renders at the wrong ratio — and keep
  figures static Astro — an image is never a reason for an island.

## Provenance (required)

Disclose on the about/colophon page that the artwork is AI-generated. Illustration prompts
are the one place artistic license is fine — they are illustrations, not factual claims —
but the disclosure itself is not optional.
