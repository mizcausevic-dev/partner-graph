# Architecture

Partner Graph is a static-friendly TypeScript relationship-intelligence layer for the Kinetic Gain executive-intelligence estate.

- `src/analyze.ts` computes relationship strength, board usability, stale-link pressure, expansion value, and finding rollups.
- `src/services/verticalBriefService.ts` exposes the graph-safe data packets used by both the app and prerender step.
- `src/services/render.ts` renders the static HTML routes.
- `scripts/generate_fixtures.ts` emits the canonical sample exports and clean packet variants.
- `scripts/prerender.ts` emits the GitHub Pages payload and machine-readable JSON snapshots.
- `scripts/render_readme_assets.ps1` generates the README proof images.
