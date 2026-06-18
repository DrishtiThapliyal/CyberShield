import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  LayoutDashboard,
  Map,
  DollarSign,
  Bug,
  Users,
  Clock,
  Network,
  Brain,
  Radar,
  Search,
  Bell,
  Filter,
} from "lucide-react";

const NAV = [
  { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
  { id: "geo", label: "Geographic Intel", icon: Map },
  { id: "financial", label: "Financial Impact", icon: DollarSign },
  { id: "scams", label: "Scam Analytics", icon: Bug },
  { id: "demo", label: "Demographics", icon: Users },
  { id: "temporal", label: "Temporal Analysis", icon: Clock },
  { id: "network", label: "Fraud Network", icon: Network },
  { id: "ml", label: "ML Intelligence", icon: Brain },
  { id: "threat", label: "Threat Intel", icon: Radar },
] as const;

export type SectionId = (typeof NAV)[number]["id"];

export function Shell({
  active,
  onChange,
  children,
}: {
  active: SectionId;
  onChange: (id: SectionId) => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 inset-y-0 left-0 w-72 bg-sidebar border-r border-sidebar-border transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-16 flex items-center gap-3 px-6 border-b border-sidebar-border">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg blur-md opacity-70" style={{ background: "var(--gradient-primary)" }} />
            <div className="relative w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
          <div>
            <div className="font-bold tracking-tight text-base leading-none">CyberShield</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Analytics Suite</div>
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {NAV.map((n) => {
            const Icon = n.icon;
            const isActive = active === n.id;
            return (
              <button
                key={n.id}
                onClick={() => {
                  onChange(n.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all relative ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeBar"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                    style={{ background: "var(--gradient-primary)" }}
                  />
                )}
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{n.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="absolute bottom-0 inset-x-0 p-4 border-t border-sidebar-border">
          <div className="rounded-lg p-3 text-xs" style={{ background: "var(--gradient-surface)" }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: "var(--neon-green)" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--neon-green)" }} />
              </span>
              <span className="font-medium">Live feed online</span>
            </div>
            <div className="text-muted-foreground">Streaming from 142 sources</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center gap-3 px-4 lg:px-8">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-secondary"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <Filter className="w-5 h-5" />
          </button>
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Ask: 'OTP frauds in Delhi 2025'…"
              className="w-full h-10 pl-9 pr-3 rounded-lg bg-secondary/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring"
            />
          </div>
          <div className="hidden md:flex items-center gap-2">
            <FilterPill label="Last 30 days" />
            <FilterPill label="All States" />
            <FilterPill label="All Scams" />
          </div>
          <button className="relative p-2 rounded-md hover:bg-secondary" aria-label="Alerts">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "var(--neon-red)" }} />
          </button>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: "var(--gradient-primary)", color: "var(--primary-foreground)" }}>
            AK
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8 max-w-[1600px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

function FilterPill({ label }: { label: string }) {
  return (
    <button className="h-9 px-3 rounded-lg text-xs font-medium bg-secondary/60 border border-border hover:border-primary/50 hover:text-primary transition-colors">
      {label}
    </button>
  );
}