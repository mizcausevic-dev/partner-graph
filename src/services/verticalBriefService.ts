import { analyze } from "../analyze.js";
import { samplePartnerGraph } from "../data/sampleVerticalBrief.js";

const report = analyze(samplePartnerGraph, { now: "2026-05-31T18:40:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    relationships: report.relationships,
    averageStrength: report.averageStrength,
    averageBoardUse: report.averageBoardUse,
    boardUsableLinks: report.boardUsableLinks,
    staleLinks: report.staleLinks,
    expansionValueUsd: report.expansionValueUsd,
    highFindings,
    recommendation:
      "Expand now on IBM, Azure, FinTech, and the board-intelligence meta-cluster; deepen biotech and nonprofit; keep PropTech and robotics on watch."
  };
}

export function relationshipLane() {
  return samplePartnerGraph.map((item) => ({
    theme: item.theme,
    executiveBuyer: item.executiveBuyer,
    relationshipTarget: item.relationshipTarget,
    clusterBand: item.clusterBand,
    strengthScore: item.strengthScore,
    adjacencySummary: item.adjacencySummary,
    nextMove: item.nextMove
  }));
}

export function adjacencyMap() {
  return samplePartnerGraph.map((item) => ({
    theme: item.theme,
    relationshipTarget: item.relationshipTarget,
    evidenceState: item.evidenceState,
    boardUseScore: item.boardUseScore,
    companyTags: item.companyTags,
    relatedSurfaces: item.relatedSurfaces
  }));
}

export function buyerLinks() {
  return samplePartnerGraph.map((item) => ({
    theme: item.theme,
    executiveBuyer: item.executiveBuyer,
    boardStory: item.boardStory,
    strengthScore: item.strengthScore,
    boardUseScore: item.boardUseScore
  }));
}

export function priorityClusters() {
  return samplePartnerGraph.map((item) => ({
    theme: item.theme,
    clusterBand: item.clusterBand,
    expansionValueUsd: item.expansionValueUsd,
    nextMove: item.nextMove
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return report.findingsList.sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic relationship data only - no live CRM, partner, or ecosystem records are included.",
    "Strength, board-use, and expansion values are modeled from the sample relationship set in this repo.",
    "This surface is read-only and designed to show how the executive-intelligence estate can become a relationship graph.",
    "Company tags and related surfaces are synthetic decision aids rather than audited ecosystem datasets.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    relationshipLane: relationshipLane(),
    adjacencyMap: adjacencyMap(),
    buyerLinks: buyerLinks(),
    priorityClusters: priorityClusters(),
    riskMap: riskMap(),
    verification: verification(),
    sample: samplePartnerGraph
  };
}
