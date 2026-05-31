import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("partner-graph app", () => {
  it("serves the HTML routes", async () => {
    const htmlRoutes = ["/", "/relationship-lane", "/adjacency-map", "/buyer-links", "/priority-clusters", "/verification", "/docs"];

    for (const route of htmlRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/html/);
    }
  });

  it("serves the JSON routes", async () => {
    const jsonRoutes = [
      "/api/dashboard/summary",
      "/api/relationship-lane",
      "/api/adjacency-map",
      "/api/buyer-links",
      "/api/priority-clusters",
      "/api/risk-map",
      "/api/verification",
      "/api/sample",
      "/api/payload"
    ];

    for (const route of jsonRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
    }
  });
});
