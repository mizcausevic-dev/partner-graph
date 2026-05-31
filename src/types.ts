export type GraphSector =
  | "AI_PLATFORM"
  | "CLOUD_IDENTITY"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "NONPROFIT_FOUNDATION"
  | "PROPTECH"
  | "ROBOTICS"
  | "EXECUTIVE_INTELLIGENCE";

export type EvidenceState = "CURRENT" | "STALE" | "MISSING";
export type ClusterBand = "EXPAND_NOW" | "DEEPEN" | "WATCH";

export interface PartnerGraphRelationship {
  id: string;
  theme: string;
  sector: GraphSector;
  executiveBuyer: string;
  relationshipTarget: string;
  targetType: "COMPANY" | "PLATFORM" | "BUYER_CLUSTER";
  clusterBand: ClusterBand;
  strengthScore: number;
  expansionValueUsd: number;
  boardUseScore: number;
  evidenceState: EvidenceState;
  adjacencySummary: string;
  boardStory: string;
  nextMove: string;
  companyTags: string[];
  relatedSurfaces: string[];
}

export interface PartnerGraphExport {
  generatedAt: string;
  relationships: PartnerGraphRelationship[];
}

export type FindingCode =
  | "stale-link"
  | "high-strength"
  | "weak-cluster"
  | "board-usable"
  | "thin-proof";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  message: string;
  sector: GraphSector;
  theme: string;
}

export interface PartnerGraphReport {
  generatedAt: string;
  relationships: number;
  averageStrength: number;
  averageBoardUse: number;
  boardUsableLinks: number;
  staleLinks: number;
  expansionValueUsd: number;
  findingsList: Finding[];
  ok: boolean;
}
