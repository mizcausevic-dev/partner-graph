import { rm, writeFile } from "node:fs/promises";
import { samplePartnerGraph } from "../src/data/sampleVerticalBrief.js";

async function main() {
  const clean = samplePartnerGraph.map((item) => ({
    ...item,
    evidenceState: "CURRENT" as const,
    strengthScore: Math.max(item.strengthScore, 70),
    boardUseScore: Math.max(item.boardUseScore, 72),
    clusterBand: item.clusterBand === "WATCH" ? "DEEPEN" as const : item.clusterBand,
    adjacencySummary:
      item.evidenceState === "CURRENT"
        ? item.adjacencySummary
        : `${item.adjacencySummary} Proof has been refreshed for the clean packet.`
  }));

  await writeFile("fixtures/partner-graph.json", JSON.stringify(samplePartnerGraph, null, 2) + "\n");
  await writeFile("fixtures/partner-graph-clean.json", JSON.stringify(clean, null, 2) + "\n");

  for (const file of [
    "fixtures/deal-radar.json",
    "fixtures/deal-radar-clean.json",
    "fixtures/timing-signal-index.json",
    "fixtures/timing-signal-index-clean.json"
  ]) {
    try {
      await rm(file);
    } catch {
      // Ignore missing copied fixtures during scaffold cleanup.
    }
  }
}

await main();
