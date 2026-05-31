import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { samplePartnerGraph } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected relationship count", () => {
    const report = analyze(samplePartnerGraph, { now: "2026-05-31T18:40:00Z" });
    expect(report.relationships).toBe(8);
  });

  it("computes positive strength and board use", () => {
    const report = analyze(samplePartnerGraph, { now: "2026-05-31T18:40:00Z" });
    expect(report.averageStrength).toBeGreaterThanOrEqual(60);
    expect(report.averageBoardUse).toBeGreaterThanOrEqual(60);
  });

  it("counts board-usable links and stale links", () => {
    const report = analyze(samplePartnerGraph, { now: "2026-05-31T18:40:00Z" });
    expect(report.boardUsableLinks).toBeGreaterThanOrEqual(1);
    expect(report.staleLinks).toBeGreaterThanOrEqual(1);
  });

  it("emits strength and adjacency findings", () => {
    const report = analyze(samplePartnerGraph, { now: "2026-05-31T18:40:00Z" });
    expect(report.findingsList.some((finding) => finding.code === "high-strength")).toBe(true);
    expect(report.findingsList.some((finding) => finding.code === "stale-link" || finding.code === "weak-cluster")).toBe(true);
  });

  it("rolls up expansion value", () => {
    const report = analyze(samplePartnerGraph, { now: "2026-05-31T18:40:00Z" });
    expect(report.expansionValueUsd).toBeGreaterThan(0);
  });
});
