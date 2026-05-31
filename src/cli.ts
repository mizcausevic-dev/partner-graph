import { readFile } from "node:fs/promises";
import { analyze } from "./analyze.js";
import { formatJson, formatSummary } from "./format.js";
import type { PartnerGraphRelationship } from "./types.js";

const [, , filePath = "fixtures/partner-graph.json", format = "--format", output = "summary"] = process.argv;

if (format !== "--format" || !["summary", "json"].includes(output)) {
  console.error("usage: partner-graph <file> --format <summary|json>");
  process.exit(1);
}

const relationships = JSON.parse(await readFile(filePath, "utf8")) as PartnerGraphRelationship[];
const report = analyze(relationships);
console.log(output === "json" ? formatJson(report) : formatSummary(report));
