import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  renderAdjacencyMap,
  renderBuyerLinks,
  renderDocs,
  renderOverview,
  renderPriorityClusters,
  renderRelationshipLane,
  renderSample,
  renderVerification
} from "../src/services/render.js";
import {
  adjacencyMap,
  buyerLinks,
  payload,
  priorityClusters,
  relationshipLane,
  riskMap,
  summary,
  verification
} from "../src/services/verticalBriefService.js";

const outDir = path.resolve("site");
async function emit(filePath: string, contents: string) {
  const target = path.join(outDir, filePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
}
const files: Record<string, string> = {
  "index.html": renderOverview(),
  [path.join("relationship-lane", "index.html")]: renderRelationshipLane(),
  [path.join("adjacency-map", "index.html")]: renderAdjacencyMap(),
  [path.join("buyer-links", "index.html")]: renderBuyerLinks(),
  [path.join("priority-clusters", "index.html")]: renderPriorityClusters(),
  [path.join("verification", "index.html")]: renderVerification(),
  [path.join("docs", "index.html")]: renderDocs(),
  "robots.txt": "User-agent: *\nAllow: /\nSitemap: https://partners.kineticgain.com/sitemap.xml\n",
  "sitemap.xml": `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://partners.kineticgain.com/</loc></url><url><loc>https://partners.kineticgain.com/relationship-lane/</loc></url><url><loc>https://partners.kineticgain.com/adjacency-map/</loc></url><url><loc>https://partners.kineticgain.com/buyer-links/</loc></url><url><loc>https://partners.kineticgain.com/priority-clusters/</loc></url><url><loc>https://partners.kineticgain.com/verification/</loc></url><url><loc>https://partners.kineticgain.com/docs/</loc></url></urlset>`,
  [path.join("api", "dashboard-summary.json")]: JSON.stringify(summary(), null, 2),
  [path.join("api", "relationship-lane.json")]: JSON.stringify(relationshipLane(), null, 2),
  [path.join("api", "adjacency-map.json")]: JSON.stringify(adjacencyMap(), null, 2),
  [path.join("api", "buyer-links.json")]: JSON.stringify(buyerLinks(), null, 2),
  [path.join("api", "priority-clusters.json")]: JSON.stringify(priorityClusters(), null, 2),
  [path.join("api", "risk-map.json")]: JSON.stringify(riskMap(), null, 2),
  [path.join("api", "verification.json")]: JSON.stringify(verification(), null, 2),
  [path.join("api", "sample.json")]: renderSample(),
  [path.join("api", "payload.json")]: JSON.stringify(payload(), null, 2)
};
for (const [filePath, contents] of Object.entries(files)) {
  await emit(filePath, contents);
}
