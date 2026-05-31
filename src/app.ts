import express from "express";
import {
  renderAdjacencyMap,
  renderBuyerLinks,
  renderDocs,
  renderOverview,
  renderPriorityClusters,
  renderRelationshipLane,
  renderSample,
  renderVerification
} from "./services/render.js";
import {
  adjacencyMap,
  buyerLinks,
  payload,
  priorityClusters,
  relationshipLane,
  riskMap,
  summary,
  verification
} from "./services/verticalBriefService.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/relationship-lane", (_req, res) => res.type("html").send(renderRelationshipLane()));
  app.get("/adjacency-map", (_req, res) => res.type("html").send(renderAdjacencyMap()));
  app.get("/buyer-links", (_req, res) => res.type("html").send(renderBuyerLinks()));
  app.get("/priority-clusters", (_req, res) => res.type("html").send(renderPriorityClusters()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/relationship-lane", (_req, res) => res.json(relationshipLane()));
  app.get("/api/adjacency-map", (_req, res) => res.json(adjacencyMap()));
  app.get("/api/buyer-links", (_req, res) => res.json(buyerLinks()));
  app.get("/api/priority-clusters", (_req, res) => res.json(priorityClusters()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.type("application/json").send(renderSample()));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? "3000");
  createApp().listen(port, () => {
    console.log(`partner-graph listening on http://127.0.0.1:${port}`);
  });
}
