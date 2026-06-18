import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function Card({
  children,
  className = "",
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative rounded-xl border border-border bg-card overflow-hidden ${className}`}
      style={{
        background: "var(--gradient-surface)",
        boxShadow: glow ? "var(--shadow-glow)" : "var(--shadow-card)",
      }}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between p-5 pb-2">
      <div>
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Kpi({
  label,
  value,
  delta,
  hint,
  accent = "cyan",
}: {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  accent?: "cyan" | "magenta" | "green" | "amber" | "red";
}) {
  const colorMap = {
    cyan: "var(--neon-cyan)",
    magenta: "var(--neon-magenta)",
    green: "var(--neon-green)",
    amber: "var(--neon-amber)",
    red: "var(--neon-red)",
  } as const;
  const up = (delta ?? 0) >= 0;
  return (
    <Card className="p-5">
      <div
        className="absolute inset-x-0 top-0 h-px opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${colorMap[accent]}, transparent)` }}
      />
      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div className="text-2xl lg:text-3xl font-bold tracking-tight" style={{ color: colorMap[accent] }}>
          {value}
        </div>
        {typeof delta === "number" && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-md ${
              up ? "text-[oklch(0.78_0.18_140)]" : "text-[oklch(0.68_0.22_30)]"
            }`}
            style={{ background: up ? "oklch(0.78 0.18 140 / 0.1)" : "oklch(0.68 0.22 30 / 0.1)" }}
          >
            {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </Card>
  );
}

export function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">{title}</h1>
      {sub && <p className="text-sm text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}