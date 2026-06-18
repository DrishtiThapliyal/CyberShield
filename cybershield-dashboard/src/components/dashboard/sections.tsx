import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  Treemap,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Brain,
  CircleDollarSign,
  Gauge,
  ShieldAlert,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Card, CardHeader, Kpi, SectionTitle } from "./primitives";
import {
  ageDistribution,
  forecast,
  genderSplit,
  hourlyHeatmap,
  kpis,
  liveFeed,
  monthlyTrend,
  occupations,
  scamCategories,
  stateData,
  trendingKeywords,
  sankeyFlow,
} from "@/lib/cyber/data";

const NEON = ["var(--neon-cyan)", "var(--neon-magenta)", "var(--neon-green)", "var(--neon-amber)", "var(--neon-red)"];
const NEON_RAW = [
  "oklch(0.82 0.17 200)",
  "oklch(0.7 0.22 330)",
  "oklch(0.78 0.18 140)",
  "oklch(0.82 0.18 80)",
  "oklch(0.68 0.22 30)",
];
const tint = (i: number, a = 0.15) => NEON_RAW[i % NEON_RAW.length].replace(")", ` / ${a})`);

const tooltipStyle = {
  contentStyle: {
    background: "oklch(0.18 0.035 255)",
    border: "1px solid oklch(0.3 0.04 258 / 0.6)",
    borderRadius: 8,
    fontSize: 12,
    color: "oklch(0.96 0.01 230)",
  },
  cursor: { fill: "oklch(0.3 0.04 258 / 0.2)" },
};

const fmt = (n: number) => n.toLocaleString("en-IN");
const cr = (n: number) => `₹${n.toLocaleString("en-IN")} Cr`;

/* ───────── OVERVIEW ───────── */
export function OverviewSection() {
  return (
    <>
      <SectionTitle title="Executive Overview" sub="National cybercrime posture at a glance — last 12 months" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
        <Kpi label="Reported Crimes" value={fmt(kpis.totalCrimes)} delta={12.4} hint="vs. last year" accent="cyan" />
        <Kpi label="Financial Loss" value={cr(kpis.totalLoss)} delta={18.2} hint="₹4,458 Cr" accent="magenta" />
        <Kpi label="Victims" value={fmt(kpis.victims)} delta={9.1} accent="amber" />
        <Kpi label="Arrests" value={fmt(kpis.arrests)} delta={-2.3} accent="red" />
        <Kpi label="Detection Rate" value={`${kpis.detectionRate}%`} delta={3.1} accent="green" />
        <Kpi label="Conviction Rate" value={`${kpis.convictionRate}%`} delta={-0.6} accent="amber" />
        <Kpi label="Avg Loss / Incident" value={`₹${fmt(kpis.avgLoss)}`} delta={5.4} accent="magenta" />
        <Kpi label="Active Investigations" value="3,214" delta={7.8} accent="cyan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <Card className="lg:col-span-2">
          <CardHeader title="Crime & Loss Trend" subtitle="Monthly cases vs financial loss (₹ Cr)" />
          <div className="h-72 p-2">
            <ResponsiveContainer>
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.17 200)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.82 0.17 200)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.7 0.22 330)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.7 0.22 330)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(0.3 0.04 258 / 0.3)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "oklch(0.7 0.03 250)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "oklch(0.7 0.03 250)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="cases" stroke="oklch(0.82 0.17 200)" strokeWidth={2} fill="url(#g1)" />
                <Area type="monotone" dataKey="loss" stroke="oklch(0.7 0.22 330)" strokeWidth={2} fill="url(#g2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Crime Distribution" subtitle="By category, share of incidents" />
          <div className="h-72 p-2 flex items-center">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={scamCategories.slice(0, 5)}
                  dataKey="cases"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {scamCategories.slice(0, 5).map((_, i) => (
                    <Cell key={i} fill={NEON[i % NEON.length]} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="px-5 pb-5 space-y-1.5">
            {scamCategories.slice(0, 5).map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-sm" style={{ background: NEON[i % NEON.length] }} />
                  <span>{s.name}</span>
                </div>
                <span className="text-muted-foreground">{fmt(s.cases)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <Card className="lg:col-span-2">
          <CardHeader title="Top Scam Categories" subtitle="Ranked by incident count" />
          <div className="h-80 p-2">
            <ResponsiveContainer>
              <BarChart data={scamCategories} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid stroke="oklch(0.3 0.04 258 / 0.3)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "oklch(0.7 0.03 250)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fill: "oklch(0.92 0.01 230)", fontSize: 11 }} axisLine={false} tickLine={false} width={110} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="cases" radius={[0, 6, 6, 0]}>
                  {scamCategories.map((_, i) => (
                    <Cell key={i} fill={NEON[i % NEON.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Live Threat Feed" subtitle="Streaming alerts" action={<LivePulse />} />
          <div className="px-2 pb-3 space-y-1 max-h-80 overflow-auto">
            {liveFeed.map((f) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/40"
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background:
                      f.risk === "high" ? "var(--neon-red)" : f.risk === "med" ? "var(--neon-amber)" : "var(--neon-green)",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{f.type}</div>
                  <div className="text-xs text-muted-foreground">{f.loc} · {f.time}</div>
                </div>
                <div className="text-sm font-semibold text-[oklch(0.7_0.22_330)]">{f.loss}</div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function LivePulse() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[oklch(0.78_0.18_140)]">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: "var(--neon-green)" }} />
        <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--neon-green)" }} />
      </span>
      Live
    </span>
  );
}

/* ───────── GEOGRAPHIC ───────── */
export function GeoSection() {
  const max = Math.max(...stateData.map((s) => s.cases));
  return (
    <>
      <SectionTitle title="Geographic Intelligence" sub="State, district and city-level hotspot analytics" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader title="National Hotspot Map" subtitle="Crime density heatmap (simulated)" />
          <div className="relative h-[460px] m-4 rounded-lg overflow-hidden border border-border" style={{ background: "radial-gradient(ellipse at 30% 40%, oklch(0.25 0.05 260) 0%, oklch(0.16 0.03 250) 70%)" }}>
            {/* grid overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.82 0.17 200)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            {/* hotspots */}
            {stateData.map((s, i) => {
              const intensity = s.cases / max;
              // map lat/lng to box (rough India bounding box)
              const left = ((s.lng - 68) / (98 - 68)) * 100;
              const top = (1 - (s.lat - 8) / (37 - 8)) * 100;
              const size = 30 + intensity * 70;
              return (
                <motion.div
                  key={s.state}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <div
                    className="absolute inset-0 rounded-full blur-xl animate-pulse"
                    style={{
                      width: size,
                      height: size,
                      background: `oklch(${intensity > 0.7 ? "0.68 0.22 30" : intensity > 0.4 ? "0.82 0.18 80" : "0.82 0.17 200"} / 0.6)`,
                      transform: "translate(-50%,-50%)",
                      left: "50%",
                      top: "50%",
                    }}
                  />
                  <div
                    className="relative rounded-full border-2"
                    style={{
                      width: size / 2,
                      height: size / 2,
                      background: `oklch(${intensity > 0.7 ? "0.68 0.22 30" : intensity > 0.4 ? "0.82 0.18 80" : "0.82 0.17 200"} / 0.4)`,
                      borderColor: intensity > 0.7 ? "var(--neon-red)" : intensity > 0.4 ? "var(--neon-amber)" : "var(--neon-cyan)",
                    }}
                  />
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity bg-popover border border-border rounded px-2 py-1 text-[10px] whitespace-nowrap z-10">
                    <div className="font-semibold">{s.state}</div>
                    <div className="text-muted-foreground">{fmt(s.cases)} cases · ₹{s.loss} Cr</div>
                  </div>
                </motion.div>
              );
            })}
            <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[10px] bg-background/80 backdrop-blur px-3 py-2 rounded-lg border border-border">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: "var(--neon-cyan)" }} />Low</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: "var(--neon-amber)" }} />Med</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: "var(--neon-red)" }} />High</span>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="State Rankings" subtitle="By total cases" />
          <div className="px-4 pb-4 space-y-1.5">
            {stateData.map((s, i) => {
              const pct = (s.cases / max) * 100;
              return (
                <div key={s.state} className="group">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium flex items-center gap-2">
                      <span className="text-muted-foreground w-4">{i + 1}</span>
                      {s.state}
                    </span>
                    <span className="text-muted-foreground tabular-nums">{fmt(s.cases)}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary/60 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className="h-full rounded-full"
                      style={{ background: "var(--gradient-primary)" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </>
  );
}

/* ───────── FINANCIAL ───────── */
export function FinancialSection() {
  const totalLoss = scamCategories.reduce((a, b) => a + b.loss, 0);
  return (
    <>
      <SectionTitle title="Financial Impact" sub="Money lost, recovered, and how it flows" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Kpi label="Total Money Lost" value={cr(kpis.totalLoss)} delta={18.2} accent="red" />
        <Kpi label="Recovered" value="₹512 Cr" delta={24.7} accent="green" />
        <Kpi label="Recovery Rate" value="11.5%" delta={2.1} accent="cyan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <Card className="lg:col-span-2">
          <CardHeader title="Monthly Financial Loss" subtitle="₹ Cr lost vs recovered" />
          <div className="h-72 p-2">
            <ResponsiveContainer>
              <LineChart data={monthlyTrend}>
                <CartesianGrid stroke="oklch(0.3 0.04 258 / 0.3)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "oklch(0.7 0.03 250)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "oklch(0.7 0.03 250)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Line type="monotone" dataKey="loss" stroke="oklch(0.68 0.22 30)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="recovered" stroke="oklch(0.78 0.18 140)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardHeader title="Loss by Category" subtitle="Treemap, ₹ Cr" />
          <div className="h-72 p-2">
            <ResponsiveContainer>
              <Treemap
                data={scamCategories.map((s, i) => ({ name: s.name, size: s.loss, fill: NEON[i % NEON.length] }))}
                dataKey="size"
                stroke="oklch(0.16 0.03 250)"
                content={<TreemapCell />}
              />
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader title="Money Flow" subtitle="Victim → Method → Channel" />
        <div className="p-6">
          <SankeyVisual />
          <div className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
            <CircleDollarSign className="w-3.5 h-3.5" />
            ~{cr(Math.round(totalLoss / 10))} flowed through UPI in the last quarter — highest channel exposure.
          </div>
        </div>
      </Card>
    </>
  );
}

type TreemapCellProps = { x?: number; y?: number; width?: number; height?: number; name?: string; fill?: string };
function TreemapCell(props: TreemapCellProps) {
  const { x = 0, y = 0, width = 0, height = 0, name, fill } = props;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} opacity={0.85} stroke="oklch(0.16 0.03 250)" />
      {width > 60 && height > 30 && (
        <text x={x + 8} y={y + 18} fill="oklch(0.15 0.04 250)" fontSize={11} fontWeight={600}>
          {name}
        </text>
      )}
    </g>
  );
}

function SankeyVisual() {
  // Simple custom Sankey-style SVG
  const nodes = Array.from(new Set([...sankeyFlow.map((s) => s.src), ...sankeyFlow.map((s) => s.tgt)]));
  const cols: Record<string, number> = {
    Victims: 0,
    "Phishing Link": 1, "Fake Call": 1, "Social Media Ad": 1,
    UPI: 2, "Net Banking": 2, Card: 2, Crypto: 2,
  };
  const W = 800, H = 320;
  const colCount = 3;
  const colWidth = W / colCount;
  const byCol: Record<number, string[]> = {};
  nodes.forEach((n) => {
    const c = cols[n] ?? 0;
    (byCol[c] ||= []).push(n);
  });
  const nodePos: Record<string, { x: number; y: number; h: number }> = {};
  Object.entries(byCol).forEach(([c, list]) => {
    const col = Number(c);
    const slot = H / list.length;
    list.forEach((n, i) => {
      const total = sankeyFlow.filter((f) => f.src === n || f.tgt === n).reduce((a, b) => a + b.value, 0);
      nodePos[n] = { x: col * colWidth + 20, y: i * slot + 10, h: Math.max(20, total * 1.5) };
    });
  });
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[600px] h-[320px]">
        {sankeyFlow.map((f, i) => {
          const s = nodePos[f.src]; const t = nodePos[f.tgt];
          if (!s || !t) return null;
          const x1 = s.x + 14, y1 = s.y + s.h / 2;
          const x2 = t.x, y2 = t.y + t.h / 2;
          const mx = (x1 + x2) / 2;
          return (
            <path
              key={i}
              d={`M ${x1},${y1} C ${mx},${y1} ${mx},${y2} ${x2},${y2}`}
              stroke={NEON[i % NEON.length]}
              strokeWidth={Math.max(2, f.value / 4)}
              fill="none"
              opacity={0.5}
            />
          );
        })}
        {Object.entries(nodePos).map(([name, p]) => (
          <g key={name}>
            <rect x={p.x} y={p.y} width={14} height={p.h} rx={3} fill="var(--neon-cyan)" opacity={0.9} />
            <text x={p.x + 20} y={p.y + p.h / 2 + 4} fontSize={11} fill="oklch(0.92 0.01 230)">{name}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ───────── SCAM ANALYTICS ───────── */
export function ScamsSection() {
  return (
    <>
      <SectionTitle title="Scam Type Analytics" sub="Deep-dive metrics by fraud category" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {scamCategories.slice(0, 6).map((s, i) => (
          <Card key={s.name} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.name}</div>
                <div className="text-2xl font-bold mt-1">{fmt(s.cases)}</div>
                <div className="text-xs text-muted-foreground">reported incidents</div>
              </div>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: tint(i, 0.15) }}>
                <ShieldAlert className="w-5 h-5" style={{ color: NEON[i % NEON.length] }} />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-muted-foreground">Avg Loss</div>
                <div className="font-semibold mt-0.5">₹{fmt(s.avgLoss)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Success Rate</div>
                <div className="font-semibold mt-0.5">{s.successRate}%</div>
              </div>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-secondary/60 overflow-hidden">
              <div className="h-full" style={{ width: `${s.successRate * 2}%`, background: NEON[i % NEON.length] }} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

/* ───────── DEMOGRAPHICS ───────── */
export function DemographicsSection() {
  return (
    <>
      <SectionTitle title="Victim Demographics" sub="Who is being targeted" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader title="Age Distribution" subtitle="Victims by age band" />
          <div className="h-72 p-2">
            <ResponsiveContainer>
              <BarChart data={ageDistribution}>
                <CartesianGrid stroke="oklch(0.3 0.04 258 / 0.3)" vertical={false} />
                <XAxis dataKey="range" tick={{ fill: "oklch(0.7 0.03 250)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "oklch(0.7 0.03 250)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="victims" radius={[6, 6, 0, 0]}>
                  {ageDistribution.map((_, i) => (
                    <Cell key={i} fill={NEON[i % NEON.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardHeader title="Gender Split" />
          <div className="h-72 p-2">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={genderSplit} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3} strokeWidth={0}>
                  {genderSplit.map((_, i) => (
                    <Cell key={i} fill={NEON[i % NEON.length]} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="px-5 pb-5 flex justify-around text-xs">
            {genderSplit.map((g, i) => (
              <div key={g.name} className="text-center">
                <div className="font-semibold text-base" style={{ color: NEON[i % NEON.length] }}>{g.value}%</div>
                <div className="text-muted-foreground">{g.name}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader title="Occupation" subtitle="Victim count by profession" />
        <div className="h-72 p-2">
          <ResponsiveContainer>
            <BarChart data={occupations} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid stroke="oklch(0.3 0.04 258 / 0.3)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "oklch(0.7 0.03 250)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fill: "oklch(0.92 0.01 230)", fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="victims" radius={[0, 6, 6, 0]} fill="oklch(0.82 0.17 200)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  );
}

/* ───────── TEMPORAL ───────── */
export function TemporalSection() {
  const max = Math.max(...hourlyHeatmap.flatMap((r) => r.cells.map((c) => c.value)));
  return (
    <>
      <SectionTitle title="Temporal Analysis" sub="When attacks happen, and what's next" />
      <Card>
        <CardHeader title="Attack Heatmap" subtitle="Day × Hour intensity" />
        <div className="overflow-x-auto p-4">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-[40px_repeat(24,1fr)] gap-1 text-[10px] text-muted-foreground mb-1">
              <span />
              {Array.from({ length: 24 }, (_, i) => (
                <span key={i} className="text-center">{i % 3 === 0 ? `${i}` : ""}</span>
              ))}
            </div>
            {hourlyHeatmap.map((row) => (
              <div key={row.day} className="grid grid-cols-[40px_repeat(24,1fr)] gap-1 mb-1">
                <span className="text-[10px] text-muted-foreground self-center">{row.day}</span>
                {row.cells.map((c) => {
                  const intensity = c.value / max;
                  return (
                    <div
                      key={c.hour}
                      title={`${row.day} ${c.hour}:00 — ${c.value}`}
                      className="aspect-square rounded-sm transition-transform hover:scale-125 cursor-pointer"
                      style={{
                        background: `oklch(0.82 0.17 200 / ${0.08 + intensity * 0.92})`,
                        boxShadow: intensity > 0.85 ? "0 0 8px oklch(0.82 0.17 200 / 0.6)" : undefined,
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <Card className="lg:col-span-2">
          <CardHeader title="Trend Forecast" subtitle="Next 4 months — Prophet + LSTM ensemble" action={<Badge icon={TrendingUp} text="ML" />} />
          <div className="h-72 p-2">
            <ResponsiveContainer>
              <AreaChart data={[...monthlyTrend.slice(-6).map((m) => ({ month: m.month, cases: m.cases })), ...forecast.map((f) => ({ month: f.month, forecast: f.cases, lower: f.lower, upper: f.upper }))]}>
                <defs>
                  <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.7 0.22 330)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="oklch(0.7 0.22 330)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(0.3 0.04 258 / 0.3)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "oklch(0.7 0.03 250)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "oklch(0.7 0.03 250)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="upper" stroke="none" fill="url(#band)" />
                <Line type="monotone" dataKey="cases" stroke="oklch(0.82 0.17 200)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="forecast" stroke="oklch(0.7 0.22 330)" strokeWidth={2.5} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Forecast Confidence</div>
          <div className="mt-3">
            <div className="h-48">
              <ResponsiveContainer>
                <RadialBarChart innerRadius="55%" outerRadius="100%" data={[{ name: "Conf", value: 89, fill: "oklch(0.78 0.18 140)" }]} startAngle={90} endAngle={-270}>
                  <RadialBar background={{ fill: "oklch(0.3 0.04 258 / 0.4)" }} dataKey="value" cornerRadius={20} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center -mt-32 mb-20">
              <div className="text-4xl font-bold">89%</div>
              <div className="text-xs text-muted-foreground mt-1">model confidence</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">XGBoost + LSTM ensemble · MAPE 6.2%</div>
        </Card>
      </div>
    </>
  );
}

function Badge({ icon: Icon, text }: { icon: typeof TrendingUp; text: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md" style={{ background: "var(--gradient-primary)", color: "var(--primary-foreground)" }}>
      <Icon className="w-3 h-3" />
      {text}
    </span>
  );
}

/* ───────── NETWORK ───────── */
export function NetworkSection() {
  // build a small synthetic graph
  const nodes = [
    { id: "F1", type: "fraudster", x: 50, y: 50, label: "Ring Leader" },
    { id: "F2", type: "fraudster", x: 25, y: 25, label: "Operator A" },
    { id: "F3", type: "fraudster", x: 75, y: 30, label: "Operator B" },
    { id: "M1", type: "mule", x: 20, y: 60, label: "Mule Acc 1" },
    { id: "M2", type: "mule", x: 40, y: 80, label: "Mule Acc 2" },
    { id: "M3", type: "mule", x: 65, y: 75, label: "Mule Acc 3" },
    { id: "M4", type: "mule", x: 85, y: 60, label: "Mule Acc 4" },
    { id: "V1", type: "victim", x: 10, y: 80, label: "Victim" },
    { id: "V2", type: "victim", x: 30, y: 95, label: "Victim" },
    { id: "V3", type: "victim", x: 55, y: 95, label: "Victim" },
    { id: "V4", type: "victim", x: 80, y: 90, label: "Victim" },
    { id: "V5", type: "victim", x: 95, y: 75, label: "Victim" },
    { id: "IP1", type: "ip", x: 15, y: 10, label: "192.168.x" },
    { id: "IP2", type: "ip", x: 85, y: 10, label: "10.0.x" },
  ];
  const edges = [
    ["F1", "F2"], ["F1", "F3"], ["F2", "M1"], ["F2", "M2"], ["F3", "M3"], ["F3", "M4"],
    ["M1", "V1"], ["M2", "V2"], ["M2", "V3"], ["M3", "V3"], ["M3", "V4"], ["M4", "V5"],
    ["F2", "IP1"], ["F3", "IP2"], ["F1", "IP1"], ["F1", "IP2"],
  ];
  const color = (t: string) =>
    t === "fraudster" ? "var(--neon-red)" : t === "mule" ? "var(--neon-amber)" : t === "victim" ? "var(--neon-cyan)" : "var(--neon-magenta)";
  const nMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <>
      <SectionTitle title="Fraud Network Analysis" sub="Graph view of fraud rings, mules, and victims" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="lg:col-span-3">
          <CardHeader title="Detected Fraud Ring #7421" subtitle="14 nodes · 16 edges · risk score 94" />
          <div className="relative h-[480px] m-4 rounded-lg border border-border overflow-hidden" style={{ background: "radial-gradient(ellipse at center, oklch(0.22 0.05 260) 0%, oklch(0.16 0.03 250) 100%)" }}>
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
              {edges.map(([a, b], i) => {
                const A = nMap[a], B = nMap[b];
                return (
                  <line
                    key={i}
                    x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                    stroke="oklch(0.82 0.17 200 / 0.35)"
                    strokeWidth={0.2}
                  />
                );
              })}
            </svg>
            {nodes.map((n) => (
              <motion.div
                key={n.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.4 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <div
                  className="rounded-full border-2"
                  style={{
                    width: n.type === "fraudster" ? 22 : 14,
                    height: n.type === "fraudster" ? 22 : 14,
                    background: `${color(n.type)}`,
                    opacity: 0.85,
                    borderColor: color(n.type),
                    boxShadow: `0 0 12px ${color(n.type)}`,
                  }}
                />
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-[9px] whitespace-nowrap opacity-0 group-hover:opacity-100 bg-popover px-1.5 py-0.5 rounded border border-border z-10">
                  {n.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
        <div className="space-y-4">
          <Card className="p-5">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Ring Risk Score</div>
            <div className="text-4xl font-bold mt-2 text-[oklch(0.68_0.22_30)]">94<span className="text-base">/100</span></div>
            <div className="text-xs text-muted-foreground mt-1">Critical · escalate to CERT</div>
          </Card>
          <Card className="p-5 space-y-3 text-xs">
            {[
              { c: "var(--neon-red)", l: "Fraudster", n: 3 },
              { c: "var(--neon-amber)", l: "Money Mule", n: 4 },
              { c: "var(--neon-cyan)", l: "Victim", n: 5 },
              { c: "var(--neon-magenta)", l: "IP Address", n: 2 },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: r.c, boxShadow: `0 0 6px ${r.c}` }} />
                  {r.l}
                </div>
                <span className="font-semibold">{r.n}</span>
              </div>
            ))}
          </Card>
          <Card className="p-5">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Mule Indicators</div>
            <ul className="text-xs space-y-1.5 text-muted-foreground">
              <li>• Shared device fingerprint (×4)</li>
              <li>• Rapid transfer chains &lt; 60s</li>
              <li>• Repeated SIM block resets</li>
              <li>• Tier-3 town KYC mismatch</li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}

/* ───────── ML INTELLIGENCE ───────── */
export function MLSection() {
  return (
    <>
      <SectionTitle title="ML Intelligence" sub="Predictive scoring, anomaly detection and live inference" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <Brain className="w-3.5 h-3.5" /> Scam Prediction
          </div>
          <div className="mt-4 flex items-end gap-2">
            <div className="text-5xl font-bold" style={{ color: "var(--neon-magenta)" }}>92</div>
            <div className="text-sm text-muted-foreground mb-1">/100 risk</div>
          </div>
          <div className="mt-2 text-sm">Likely: <span className="font-semibold">Phishing</span></div>
          <div className="mt-1 text-xs text-muted-foreground">Confidence 89% · XGBoost</div>
          <div className="mt-4 space-y-2 text-xs">
            <Bar2 label="Random Forest" value={87} />
            <Bar2 label="XGBoost" value={92} />
            <Bar2 label="LightGBM" value={89} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <AlertTriangle className="w-3.5 h-3.5" /> Anomaly Detection
          </div>
          <div className="mt-4 space-y-3">
            {[
              { t: "Unusual UPI burst", loc: "Patna, BR", sev: "high" },
              { t: "New campaign pattern", loc: "Indore, MP", sev: "med" },
              { t: "Geo anomaly cluster", loc: "Coimbatore, TN", sev: "med" },
              { t: "Off-hours OTP spike", loc: "Pan-India", sev: "low" },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-md bg-secondary/40">
                <Zap className="w-4 h-4" style={{ color: a.sev === "high" ? "var(--neon-red)" : a.sev === "med" ? "var(--neon-amber)" : "var(--neon-green)" }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{a.t}</div>
                  <div className="text-[11px] text-muted-foreground">{a.loc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-muted-foreground">Isolation Forest · Autoencoder</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <Gauge className="w-3.5 h-3.5" /> Model Performance
          </div>
          <div className="mt-4 space-y-3">
            <Metric label="Precision" value="0.94" />
            <Metric label="Recall" value="0.89" />
            <Metric label="F1 Score" value="0.91" />
            <Metric label="ROC AUC" value="0.96" />
          </div>
          <div className="mt-4 pt-4 border-t border-border text-xs">
            <div className="text-muted-foreground mb-1">Training</div>
            <div className="font-mono text-[11px]">v2.4.1 · 2.1M rows · 14 features</div>
          </div>
        </Card>
      </div>
    </>
  );
}

function Bar2({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1"><span>{label}</span><span className="font-semibold">{value}%</span></div>
      <div className="h-1.5 rounded-full bg-secondary/60 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: "var(--gradient-primary)" }} />
      </div>
    </div>
  );
}
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold tabular-nums" style={{ color: "var(--neon-cyan)" }}>{value}</span>
    </div>
  );
}

/* ───────── THREAT INTEL ───────── */
export function ThreatSection() {
  return (
    <>
      <SectionTitle title="Threat Intelligence" sub="Emerging trends, keywords and malicious infrastructure" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-6">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-4">Trending Scam Keywords</div>
          <div className="flex flex-wrap gap-2 items-center justify-center min-h-[260px]">
            {trendingKeywords.map((k, i) => (
              <motion.span
                key={k.word}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1.5 rounded-full font-semibold cursor-pointer transition-colors"
                style={{
                  fontSize: `${10 + (k.size / 50) * 18}px`,
                  color: NEON[i % NEON.length],
                  background: "oklch(0.25 0.04 260 / 0.6)",
                  border: `1px solid ${tint(i, 0.3)}`,
                }}
              >
                {k.word}
              </motion.span>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-4">Malicious Domains</div>
          <div className="space-y-2 text-xs font-mono">
            {[
              { d: "kyc-update-rbi[.]xyz", h: "high" },
              { d: "secure-paytm-login[.]top", h: "high" },
              { d: "fastloan-approved[.]site", h: "med" },
              { d: "amzn-prize-india[.]click", h: "med" },
              { d: "uidai-aadhar-verify[.]in", h: "high" },
              { d: "courier-delivery-hold[.]live", h: "low" },
              { d: "irctc-refund-claim[.]top", h: "med" },
            ].map((d) => (
              <div key={d.d} className="flex items-center justify-between p-2 rounded-md bg-secondary/40 hover:bg-secondary/70">
                <span className="truncate">{d.d}</span>
                <span
                  className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded"
                  style={{
                    color: d.h === "high" ? "var(--neon-red)" : d.h === "med" ? "var(--neon-amber)" : "var(--neon-green)",
                    background: `oklch(${d.h === "high" ? "0.68 0.22 30" : d.h === "med" ? "0.82 0.18 80" : "0.78 0.18 140"} / 0.15)`,
                  }}
                >
                  {d.h}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}