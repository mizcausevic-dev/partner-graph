import type { PartnerGraphReport } from "./types.js";

export function formatSummary(report: PartnerGraphReport) {
  return [
    `generatedAt: ${report.generatedAt}`,
    `relationships: ${report.relationships}`,
    `averageStrength: ${report.averageStrength}`,
    `averageBoardUse: ${report.averageBoardUse}`,
    `boardUsableLinks: ${report.boardUsableLinks}`,
    `staleLinks: ${report.staleLinks}`,
    `expansionValueUsd: ${report.expansionValueUsd}`,
    `findings: ${report.findingsList.length}`,
    `ok: ${report.ok}`
  ].join("\n");
}

export function formatJson(report: PartnerGraphReport) {
  return JSON.stringify(report, null, 2);
}
