import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert, ShieldCheck, AlertTriangle, HelpCircle,
  CheckCircle2, XCircle, ArrowRight, BookOpen, Lock,
  RotateCcw, Phone, Globe, ExternalLink,
} from 'lucide-react';
import { useInvestigationStore, UserDecision } from '../store/investigationStore';
import cases, { Verdict } from '../data/cases';

interface Props { caseId: number; }

/* Verdict uses semantic colors — these are intentional exceptions to the indigo palette */
const verdictMeta: Record<Verdict, { label: string; Icon: React.ElementType; fg: string; bg: string; border: string }> = {
  fraud:      { label: 'Confirmed Fraud',        Icon: ShieldAlert,   fg: '#ef4444', bg: 'rgba(239,68,68,0.06)',   border: 'rgba(239,68,68,0.2)' },
  suspicious: { label: 'Suspicious Activity',    Icon: AlertTriangle, fg: '#f59e0b', bg: 'rgba(245,158,11,0.06)',  border: 'rgba(245,158,11,0.2)' },
  safe:       { label: 'Likely Safe',            Icon: ShieldCheck,   fg: '#22c55e', bg: 'rgba(34,197,94,0.06)',   border: 'rgba(34,197,94,0.2)'  },
  verify:     { label: 'Requires Verification',  Icon: HelpCircle,    fg: 'var(--indigo)', bg: 'var(--indigo-bg)', border: 'var(--indigo-border)' },
};

function AccuracyBadge({ user, actual }: { user: UserDecision; actual: Verdict }) {
  const correct = user === actual;
  const partial = !correct && user === 'suspicious' && actual === 'fraud';
  const cfg = correct
    ? { icon: <CheckCircle2 size={12} />, text: 'Correct Assessment', fg: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' }
    : partial
    ? { icon: <AlertTriangle size={12} />, text: 'Partially Correct', fg: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' }
    : { icon: <XCircle size={12} />, text: 'Incorrect — Would Have Been Defrauded', fg: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)' };

  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold"
      style={{ color: cfg.fg, background: cfg.bg, borderColor: cfg.border }}
    >
      {cfg.icon}{cfg.text}
    </div>
  );
}

const card = 'rounded-xl border p-5 mb-4';
const sectionLabel = 'text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-3';

export default function PostAnalysis({ caseId }: Props) {
  const { getCaseState, resetCase, theme } = useInvestigationStore();
  const state = getCaseState(caseId);
  const cd = cases.find((c) => c.id === caseId)!;
  const { analysis, redFlags } = cd;
  const vm = verdictMeta[analysis.verdict];
  const foundIds = new Set(state.foundClues.map((c) => c.id));

  const stl = (extra?: React.CSSProperties): React.CSSProperties => ({
    background: 'var(--surface)',
    borderColor: 'var(--border)',
    ...extra,
  });

  const delay = (n: number) => ({ delay: 0.06 * n, duration: 0.2 });

  return (
    <div className="h-full overflow-y-auto" style={{ background: 'var(--bg)' }}>
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={delay(0)} className="mb-7">
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--indigo)' }}>
            Post-Investigation Analysis
          </p>
          <h2 className="text-2xl font-bold tracking-tight mb-3" style={{ color: 'var(--text-1)' }}>
            {cd.title}
          </h2>
          <AccuracyBadge user={state.decision} actual={analysis.verdict} />
        </motion.div>

        {/* Verdict */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={delay(1)}
          className={`${card}`} style={{ background: vm.bg, borderColor: vm.border }}>
          <div className="flex items-center gap-2.5 mb-2" style={{ color: vm.fg }}>
            <vm.Icon size={18} />
            <span className="font-bold text-base">{vm.label}</span>
          </div>
          <p className="text-sm font-medium mb-1.5" style={{ color: 'var(--text-1)' }}>{analysis.headline}</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{analysis.explanation}</p>
        </motion.div>

        {/* Red flags */}
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={delay(2)}
          className={`${card}`} style={stl()}>
          <div className={sectionLabel} style={{ color: 'var(--text-3)' }}>
            <AlertTriangle size={11} />Red Flag Analysis
            <span className="ml-auto font-mono" style={{ color: 'var(--text-2)' }}>
              {state.foundClues.length}/{redFlags.length} found
            </span>
          </div>
          <div className="space-y-2">
            {redFlags.map((f) => {
              const found = foundIds.has(f.id);
              return (
                <div key={f.id} className="flex items-start gap-3 rounded-lg p-3 border"
                  style={{
                    background: found ? 'rgba(34,197,94,0.04)' : 'rgba(239,68,68,0.04)',
                    borderColor: found ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.15)',
                  }}
                >
                  {found
                    ? <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color: '#22c55e' }} />
                    : <XCircle size={13} className="mt-0.5 flex-shrink-0" style={{ color: '#ef4444' }} />}
                  <div>
                    <p className="text-xs font-semibold" style={{ color: found ? '#22c55e' : '#ef4444' }}>{f.label}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-2)' }}>{f.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {state.foundClues.length < redFlags.length && (
            <div className="mt-3 rounded-lg px-3 py-2.5 border text-xs font-medium"
              style={{ background: 'rgba(245,158,11,0.05)', borderColor: 'rgba(245,158,11,0.18)', color: '#f59e0b' }}>
              {redFlags.length - state.foundClues.length} red flag{redFlags.length - state.foundClues.length > 1 ? 's' : ''} missed. Re-investigate to find them.
            </div>
          )}
        </motion.div>

        {/* Tactic */}
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={delay(3)}
          className={`${card}`} style={stl()}>
          <div className={sectionLabel} style={{ color: 'var(--text-3)' }}><Lock size={11} />Fraud Tactic</div>
          <div className="rounded-lg px-4 py-3 border text-sm font-semibold"
            style={{ background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>
            {analysis.tacticUsed}
          </div>
        </motion.div>

        {/* Psychological manipulation */}
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={delay(4)}
          className={`${card}`} style={stl()}>
          <div className={sectionLabel} style={{ color: 'var(--text-3)' }}>
            <AlertTriangle size={11} />How Your Mind Was Targeted
          </div>
          <div className="space-y-2">
            {analysis.psychologicalManipulation.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <ArrowRight size={12} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--indigo)' }} />
                <p className="text-sm" style={{ color: 'var(--text-2)' }}>{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Prevention */}
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={delay(5)}
          className={`${card}`} style={stl()}>
          <div className={sectionLabel} style={{ color: 'var(--text-3)' }}><BookOpen size={11} />How to Stay Safe</div>
          <div className="space-y-2">
            {analysis.preventionTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2.5 rounded-lg px-3 py-2.5 border"
                style={{ background: 'var(--indigo-bg)', borderColor: 'var(--indigo-border)' }}>
                <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--indigo)' }} />
                <p className="text-sm" style={{ color: 'var(--text-2)' }}>{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Official advice */}
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={delay(6)}
          className={`${card}`} style={stl()}>
          <div className={sectionLabel} style={{ color: 'var(--text-3)' }}>
            <ExternalLink size={11} />Official Recommendation
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{analysis.officialAdvice}</p>
        </motion.div>

        {/* Helplines */}
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={delay(7)}
          className={`${card}`} style={stl()}>
          <div className={sectionLabel} style={{ color: 'var(--text-3)' }}><Phone size={11} />Official Helplines</div>
          <div className="space-y-2.5">
            {[
              { Icon: Phone, title: 'National Cybercrime Helpline', value: '1930', sub: '24/7 — Report online financial fraud' },
              { Icon: Phone, title: 'Delhi Cyber Crime Unit', value: '011-20892633', sub: 'Delhi Police Cyber Cell' },
            ].map((h) => (
              <div key={h.title} className="flex items-center gap-4 rounded-xl px-4 py-3 border"
                style={{ background: 'var(--indigo-bg)', borderColor: 'var(--indigo-border)' }}>
                <h.Icon size={15} style={{ color: 'var(--indigo)', flexShrink: 0 }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-1)' }}>{h.title}</p>
                  <p className="text-[11px]" style={{ color: 'var(--text-3)' }}>{h.sub}</p>
                </div>
                <span className="text-sm font-bold font-mono" style={{ color: 'var(--indigo)' }}>{h.value}</span>
              </div>
            ))}
            <div className="flex items-center gap-4 rounded-xl px-4 py-3 border"
              style={{ background: 'var(--indigo-bg)', borderColor: 'var(--indigo-border)' }}>
              <Globe size={15} style={{ color: 'var(--indigo)', flexShrink: 0 }} />
              <div className="flex-1">
                <p className="text-xs font-semibold" style={{ color: 'var(--text-1)' }}>National Cybercrime Portal</p>
                <p className="text-[11px]" style={{ color: 'var(--text-3)' }}>File & track complaints online</p>
              </div>
              <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer"
                className="text-xs font-bold font-mono hover:underline" style={{ color: 'var(--indigo)' }}>
                cybercrime.gov.in
              </a>
            </div>
          </div>
        </motion.div>

        {/* Reset */}
        <div className="flex justify-center mt-2">
          <button
            onClick={() => resetCase(caseId)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-colors"
            style={{ color: 'var(--text-2)', background: 'var(--surface)', borderColor: 'var(--border)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-2)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
          >
            <RotateCcw size={13} />Re-investigate This Case
          </button>
        </div>
      </div>
    </div>
  );
}
