import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell, type SectionId } from "@/components/dashboard/Shell";
import {
  OverviewSection,
  GeoSection,
  FinancialSection,
  ScamsSection,
  DemographicsSection,
  TemporalSection,
  NetworkSection,
  MLSection,
  ThreatSection,
} from "@/components/dashboard/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberShield Analytics — Cybercrime Intelligence Dashboard" },
      { name: "description", content: "Interactive cybercrime analytics for law enforcement: scam trends, victim demographics, financial loss, fraud networks and ML-driven threat intelligence." },
      { property: "og:title", content: "CyberShield Analytics" },
      { property: "og:description", content: "National cybercrime intelligence dashboard." },
    ],
  }),
  component: Index,
});

function Index() {
  const [section, setSection] = useState<SectionId>("overview");
  return (
    <Shell active={section} onChange={setSection}>
      {section === "overview" && <OverviewSection />}
      {section === "geo" && <GeoSection />}
      {section === "financial" && <FinancialSection />}
      {section === "scams" && <ScamsSection />}
      {section === "demo" && <DemographicsSection />}
      {section === "temporal" && <TemporalSection />}
      {section === "network" && <NetworkSection />}
      {section === "ml" && <MLSection />}
      {section === "threat" && <ThreatSection />}
    </Shell>
  );
}
