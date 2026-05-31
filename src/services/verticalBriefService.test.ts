import { describe, expect, it } from "vitest";
import { adjacencyMap, buyerLinks, payload, priorityClusters, relationshipLane, riskMap, summary, verification } from "./verticalBriefService.js";

describe("partner graph service", () => {
  it("returns an executive summary", () => {
    expect(summary().relationships).toBeGreaterThan(0);
  });

  it("returns the relationship lane", () => {
    expect(relationshipLane()[0]?.theme).toBeTruthy();
  });

  it("returns the adjacency map", () => {
    expect(adjacencyMap()[0]?.relationshipTarget).toBeTruthy();
  });

  it("returns buyer links", () => {
    expect(buyerLinks()[0]?.boardStory).toBeTruthy();
  });

  it("returns priority clusters", () => {
    expect(priorityClusters()[0]?.expansionValueUsd).toBeGreaterThan(0);
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
    expect(payload().verification.length).toBeGreaterThan(0);
  });
});
