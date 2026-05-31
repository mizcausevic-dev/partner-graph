import type { Finding, PartnerGraphExport, PartnerGraphRelationship, PartnerGraphReport } from "./types.js";

function finding(
  item: PartnerGraphRelationship,
  code: Finding["code"],
  severity: Finding["severity"],
  message: string
): Finding {
  return {
    code,
    severity,
    message,
    sector: item.sector,
    theme: item.theme
  };
}

function evaluate(item: PartnerGraphRelationship): Finding[] {
  const findings: Finding[] = [];

  if (item.evidenceState !== "CURRENT") {
    findings.push(
      finding(
        item,
        "stale-link",
        item.evidenceState === "MISSING" ? "high" : "medium",
        "Adjacency proof is weak, so this relationship should not be treated as board-usable until evidence is refreshed."
      )
    );
  }

  if (item.strengthScore >= 80) {
    findings.push(
      finding(
        item,
        "high-strength",
        "high",
        "Relationship strength is high enough to justify immediate expansion or packaging into the next memo."
      )
    );
  }

  if (item.clusterBand === "WATCH" && item.boardUseScore < 68) {
    findings.push(
      finding(
        item,
        "weak-cluster",
        "medium",
        "The relationship is directionally interesting, but it still belongs in a watch cluster instead of active expansion."
      )
    );
  }

  if (item.boardUseScore >= 78 && item.clusterBand !== "WATCH") {
    findings.push(
      finding(
        item,
        "board-usable",
        "high",
        "This relationship is strong enough to support a board or investor narrative now."
      )
    );
  }

  if (item.evidenceState === "CURRENT" && item.strengthScore < 62) {
    findings.push(
      finding(
        item,
        "thin-proof",
        "low",
        "The adjacency is real, but the proof is still too thin for an aggressive story."
      )
    );
  }

  return findings;
}

export function analyze(relationships: PartnerGraphRelationship[], options: { now?: string } = {}): PartnerGraphReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = relationships.flatMap(evaluate);
  const count = relationships.length;
  const averageStrength = Math.round(relationships.reduce((sum, item) => sum + item.strengthScore, 0) / count);
  const averageBoardUse = Math.round(relationships.reduce((sum, item) => sum + item.boardUseScore, 0) / count);
  const boardUsableLinks = relationships.filter((item) => item.boardUseScore >= 78 && item.clusterBand !== "WATCH").length;
  const staleLinks = relationships.filter((item) => item.evidenceState !== "CURRENT").length;
  const expansionValueUsd = relationships.reduce((sum, item) => sum + item.expansionValueUsd, 0);
  const highFindings = findingsList.filter((item) => item.severity === "high").length;
  const penalty = staleLinks * 4 + highFindings * 2;

  return {
    generatedAt,
    relationships: count,
    averageStrength,
    averageBoardUse,
    boardUsableLinks,
    staleLinks,
    expansionValueUsd,
    findingsList,
    ok: averageBoardUse >= 70 && penalty < 24
  };
}

export function toExport(relationships: PartnerGraphRelationship[], now?: string): PartnerGraphExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    relationships
  };
}
