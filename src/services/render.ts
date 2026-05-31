import {
  adjacencyMap,
  buyerLinks,
  payload,
  priorityClusters,
  relationshipLane,
  summary,
  verification
} from "./verticalBriefService.js";

function layout(title: string, active: string, body: string) {
  const nav = [
    { href: "/", label: "Overview" },
    { href: "/relationship-lane", label: "Relationship Lane" },
    { href: "/adjacency-map", label: "Adjacency Map" },
    { href: "/buyer-links", label: "Buyer Links" },
    { href: "/priority-clusters", label: "Priority Clusters" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ];
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${title}</title><style>
  :root{--bg:#070a0f;--panel:#0b1220;--line:rgba(120,255,170,.18);--line2:rgba(120,255,170,.10);--text:#e9f3ff;--muted:rgba(233,243,255,.72);--muted2:rgba(233,243,255,.55);--good:#37ff8b;--cyan:#19c7ff;--warn:#ffcc66;--bad:#ff5c7a;--shadow:0 18px 60px rgba(0,0,0,.55);--mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--sans:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial}
  *{box-sizing:border-box}body{margin:0;font-family:var(--sans);color:var(--text);background:radial-gradient(1200px 600px at 20% -10%, rgba(55,255,139,.18), transparent 60%),radial-gradient(900px 520px at 90% 0%, rgba(25,199,255,.16), transparent 55%),linear-gradient(180deg,#05070c 0%,#070a0f 35%,#05070c 100%)} .wrap{max-width:1280px;margin:0 auto;padding:24px 22px 80px}
  .topbar{display:flex;justify-content:space-between;gap:14px;border-bottom:1px solid var(--line2);padding-bottom:14px;margin-bottom:22px;font-family:var(--mono);font-size:11px;letter-spacing:.16em;color:var(--muted);text-transform:uppercase}.topbar .left{color:var(--good)}.topbar .right{text-align:right}
  .hero{border-radius:22px;padding:28px;border:1px solid var(--line);border-top:2px solid var(--cyan);background:linear-gradient(180deg, rgba(11,18,32,.95), rgba(8,14,26,.92));box-shadow:var(--shadow)} .hero h1{font-size:54px;line-height:.98;margin:0 0 14px;font-weight:800} .hero p{color:var(--muted);font-size:15px;line-height:1.55;max-width:760px}
  .chiprow,.navrow,.footer-links{display:flex;flex-wrap:wrap;gap:8px}.meta-chip,.navchip{font-family:var(--mono);font-size:11px;color:var(--muted);padding:8px 12px;border-radius:999px;border:1px solid var(--line);background:rgba(6,10,18,.4);text-decoration:none}.navchip.active{color:#071017;background:linear-gradient(135deg,var(--good),var(--cyan));font-weight:700}
  .section{margin-top:34px}.sh{display:flex;justify-content:space-between;gap:14px;padding-bottom:10px;border-bottom:1px solid var(--line2);margin-bottom:14px}.sh h2{margin:0;font-size:24px}.note{font-family:var(--mono);font-size:11px;color:var(--muted2);letter-spacing:.16em;text-transform:uppercase}
  .kpis,.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}@media (max-width:1000px){.kpis,.grid{grid-template-columns:repeat(2,1fr)}}@media (max-width:640px){.kpis,.grid{grid-template-columns:1fr}} .kpi,.card{border:1px solid var(--line);border-radius:14px;padding:16px;background:linear-gradient(180deg, rgba(11,18,32,.85), rgba(8,14,26,.65))}
  .kpi .v{font-family:var(--mono);font-size:26px;color:var(--cyan)}.kpi .lbl{font-family:var(--mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}.kpi .h,.card p{font-size:13px;color:var(--muted);line-height:1.55}
  .card .name{font-family:var(--mono);font-size:11px;color:var(--good);letter-spacing:.18em;text-transform:uppercase}.card h3{margin:8px 0;font-size:20px}.status{font-family:var(--mono);font-size:10px;padding:4px 9px;border-radius:6px;border:1px solid currentColor;display:inline-block}.red{color:var(--bad)}.yellow{color:var(--warn)}.green{color:var(--good)}
  table{width:100%;border-collapse:separate;border-spacing:0;border:1px solid var(--line);border-radius:14px;overflow:hidden} th,td{padding:13px 14px;text-align:left;font-size:13.5px;vertical-align:top;color:var(--muted)} thead th{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted2);border-bottom:1px solid var(--line);background:rgba(11,18,32,.5)}
  .footer{margin-top:30px;padding-top:14px;border-top:1px dashed var(--line2);display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;font-family:var(--mono);font-size:11px;color:var(--muted2)}
  </style><meta name="description" content="Partner Graph is the relationship map for buyer, platform, company, and operator-surface adjacency across Kinetic Gain’s strongest lanes."><meta property="og:type" content="website"><meta property="og:title" content="Partner Graph"><meta property="og:description" content="Relationship map for IBM, Azure, FinTech, biotech, nonprofit, PropTech, robotics, and executive-intelligence adjacency."><meta property="og:url" content="https://partners.kineticgain.com/"><meta property="og:site_name" content="Kinetic Gain"></head><body><div class="wrap"><div class="topbar"><div class="left">Kinetic Gain · Partner Graph</div><div class="right"><div>relationship map · synthetic sample data only</div><div>buyers · platforms · companies · adjacency</div></div></div><section class="hero"><div class="chiprow"><span class="meta-chip">Relationship intelligence layer</span><span class="meta-chip">Board and investor adjacency surface</span><span class="meta-chip">Synthetic sample data only</span></div><h1>One relationship map that shows which buyers, platforms, and named-company adjacencies strengthen the board story, which clusters deserve expansion now, and which still belong on watch.</h1><p>Partner Graph sits after the scorecards, briefs, diligence packs, vertical brief, governance registry, radar, and timing index. It helps leadership see which named platforms and buyer clusters actually compose into stronger market stories.</p><div class="navrow">${nav.map((link) => `<a class="navchip${active === link.href ? " active" : ""}" href="${link.href}">${link.label}</a>`).join("")}</div></section>${body}<div class="footer"><div>partner-graph · synthetic sample data only</div><div class="footer-links"><a class="meta-chip" href="https://github.com/mizcausevic-dev/">GitHub</a><a class="meta-chip" href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a><a class="meta-chip" href="https://kineticgain.com/">Kinetic Gain</a></div></div></div></body></html>`;
}

const sev = (band: string) => band === "EXPAND_NOW" ? "red" : band === "DEEPEN" ? "yellow" : "green";

export function renderOverview() {
  const s = summary();
  return layout("Partner Graph", "/", `<section class="section"><div class="sh"><h2>Graph Snapshot</h2><div class="note">adjacency · board use · expansion</div></div><div class="kpis"><div class="kpi"><div class="v">${s.relationships}</div><div class="lbl">relationships</div><div class="h">Modeled buyer, platform, and company adjacencies in the graph.</div></div><div class="kpi"><div class="v">${s.averageStrength}</div><div class="lbl">average strength</div><div class="h">How strong the compositional relationship is today.</div></div><div class="kpi"><div class="v">${s.averageBoardUse}</div><div class="lbl">average board use</div><div class="h">How usable the graph is for board and investor narratives.</div></div><div class="kpi"><div class="v">${s.boardUsableLinks}</div><div class="lbl">board-usable links</div><div class="h">Relationships strong enough for immediate board use.</div></div><div class="kpi"><div class="v">${s.staleLinks}</div><div class="lbl">stale links</div><div class="h">Adjacencies that still need fresher proof before expansion.</div></div><div class="kpi"><div class="v">$${Math.round(s.expansionValueUsd/1000)}k</div><div class="lbl">expansion value</div><div class="h">Modeled expansion value across the graph.</div></div></div></section><section class="section"><div class="sh"><h2>What the graph resolves</h2><div class="note">who connects · what composes · what expands</div></div><div class="grid"><div class="card"><div class="name">priority</div><h3>Where leadership should expand next</h3><p>${s.recommendation}</p></div><div class="card"><div class="name">adjacency</div><h3>Which named platforms truly strengthen the story</h3><p>The graph keeps IBM, Azure, FinTech, biotech, nonprofit, PropTech, and robotics connected to real surfaces instead of abstract positioning.</p></div><div class="card"><div class="name">buyer map</div><h3>Which executive conversations compose cleanly</h3><p>Buyer clusters stay tied to the exact lanes that make them stronger.</p></div><div class="card"><div class="name">sequence</div><h3>What belongs in expand, deepen, or watch</h3><p>This layer helps leadership see which relationships deserve active expansion and which still need more proof.</p></div></div></section>`);
}

export function renderRelationshipLane() {
  return layout("Partner Graph — Relationship Lane", "/relationship-lane", `<section class="section"><div class="sh"><h2>Relationship Lane</h2><div class="note">buyer · target · next move</div></div><table><thead><tr><th>Theme</th><th>Buyer</th><th>Target</th><th>Band</th><th>Strength</th><th>Adjacency</th><th>Next move</th></tr></thead><tbody>${relationshipLane().map((item) => `<tr><td><b>${item.theme}</b></td><td>${item.executiveBuyer}</td><td>${item.relationshipTarget}</td><td><span class="status ${sev(item.clusterBand)}">${item.clusterBand}</span></td><td>${item.strengthScore}</td><td>${item.adjacencySummary}</td><td>${item.nextMove}</td></tr>`).join("")}</tbody></table></section>`);
}

export function renderAdjacencyMap() {
  return layout("Partner Graph — Adjacency Map", "/adjacency-map", `<section class="section"><div class="sh"><h2>Adjacency Map</h2><div class="note">evidence · tags · surfaces</div></div><table><thead><tr><th>Theme</th><th>Target</th><th>Evidence</th><th>Board use</th><th>Company tags</th><th>Related surfaces</th></tr></thead><tbody>${adjacencyMap().map((item) => `<tr><td><b>${item.theme}</b></td><td>${item.relationshipTarget}</td><td>${item.evidenceState}</td><td>${item.boardUseScore}</td><td>${item.companyTags.join(" · ")}</td><td>${item.relatedSurfaces.join("<br />")}</td></tr>`).join("")}</tbody></table></section>`);
}

export function renderBuyerLinks() {
  return layout("Partner Graph — Buyer Links", "/buyer-links", `<section class="section"><div class="sh"><h2>Buyer Links</h2><div class="note">story · strength · board use</div></div><div class="grid">${buyerLinks().map((item) => `<div class="card"><div class="name">${item.executiveBuyer}</div><h3>${item.theme}</h3><p>${item.boardStory}</p><p>Strength ${item.strengthScore} · Board use ${item.boardUseScore}</p></div>`).join("")}</div></section>`);
}

export function renderPriorityClusters() {
  return layout("Partner Graph — Priority Clusters", "/priority-clusters", `<section class="section"><div class="sh"><h2>Priority Clusters</h2><div class="note">expand now · deepen · watch</div></div><div class="grid">${priorityClusters().map((item) => `<div class="card"><div class="name">${item.clusterBand} · $${Math.round(item.expansionValueUsd/1000)}k</div><h3>${item.theme}</h3><p>${item.nextMove}</p></div>`).join("")}</div></section>`);
}

export function renderVerification() {
  return layout("Partner Graph — Verification", "/verification", `<section class="section"><div class="sh"><h2>Verification</h2><div class="note">graph-safe claims only</div></div><div class="grid">${verification().map((item) => `<div class="card"><div class="name">verification</div><h3>${item}</h3><p>The graph stays bounded to synthetic relationship and portfolio signals.</p></div>`).join("")}</div></section>`);
}

export function renderDocs() {
  return layout("Partner Graph — Docs", "/docs", `<section class="section"><div class="sh"><h2>Docs</h2><div class="note">cli · apis · relationship layer</div></div><div class="grid"><div class="card"><div class="name">cli</div><h3>Offline graph generation</h3><p><code>npx partner-graph fixtures/partner-graph.json --format summary</code> renders the same posture the dashboard exposes.</p></div><div class="card"><div class="name">apis</div><h3>Machine-readable payloads</h3><p>Use <code>/api/dashboard/summary</code>, <code>/api/relationship-lane</code>, <code>/api/adjacency-map</code>, and <code>/api/buyer-links</code> as the canonical JSON layers.</p></div><div class="card"><div class="name">product role</div><h3>Relationship layer after timing</h3><p>This graph turns recurring signals into named buyer, platform, and company adjacencies leadership can actually act on.</p></div></div></section>`);
}

export function renderSample() {
  return JSON.stringify(payload().sample, null, 2);
}
