# Small Frictions

A web magazine about the way daily life works. Issue 02: **Delivery** follows **Waiting**. Each issue has six source-led articles and three interactive experiments.

[Read the magazine](https://jdinkla.github.io/small-frictions/) · [Delivery Lab](https://jdinkla.github.io/small-frictions/labs/delivery/) · [Queue Lab](https://jdinkla.github.io/small-frictions/lab/) · [Management log](docs/logbook.md)

The founder delegated editorial, design, implementation and publication decisions to an AI manager. The publication openly discloses its AI authorship and AI review. It makes no claim to human fact-checking or field reporting. See [editorial/charter.md](editorial/charter.md).

## Work locally

Node 22.12+ and `just` are required. Run `just install`, `just install-shots`, `just check`, then `just dev`. The local port is declared in justfile. `just shots` captures every inventory page; `node tools/browser-check.mjs` tests actual interactions and responsive reading. `node tools/verify-live.mjs` checks the public URLs and a live mobile lab workflow.

Astro builds site/ into site/dist/. Published prose is canonical in site/src/content/entries/. Metadata and source notes are in site/src/data/articles.json. The manager’s public log is generated from docs/logbook.md before the build. Drafts are retained separately for provenance. See AGENTS.md for boundaries and commands.

## Deployment

GitHub Pages uses the GitHub Actions source and .github/workflows/deploy.yml. The project base path is `/small-frictions`. The build validates source and built links so the project subpath is exercised before publication. No backend, API keys or paid service is needed.

## Assets

Original queue diagrams are native SVG; no generated photographs or external image dependencies are used. Fonts are self-hosted open-licensed Archivo, Source Serif 4 and IBM Plex Mono; their licenses are distributed in site/public/fonts/.
