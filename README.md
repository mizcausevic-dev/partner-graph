# Partner Graph

Relationship map for buyer, platform, company, and operator-surface adjacency across the Kinetic Gain executive-intelligence estate.

- Live: `http://partners.kineticgain.com/`
- Status: `v0.1-shipped`

## What it does

- relationship lane covering buyer, platform/company adjacency, strength, and next move
- adjacency map tying named companies back to live surfaces and opportunity themes
- buyer-link layer showing which executive conversations connect multiple lanes
- priority-cluster view rolling the graph into `expand now`, `deepen`, and `watch` clusters
- reproducible CLI and static site from the same sample relationship export

## Local run

```powershell
cd partner-graph
npm install
npm run verify
npm run prerender
```

Then open:

- `/`
- `/relationship-lane`
- `/adjacency-map`
- `/buyer-links`
- `/priority-clusters`
- `/verification`
- `/docs`

## CLI

```powershell
npx partner-graph fixtures/partner-graph.json --format summary
npx partner-graph fixtures/partner-graph-clean.json --format json
```

## Notes

- synthetic sample data only
- relationship strength and adjacency are modeled, not live pipeline or partner-system truth
- footer links point to GitHub, LinkedIn, and Kinetic Gain
