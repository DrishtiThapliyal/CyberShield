import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, ShieldAlert, ShieldCheck, HelpCircle, Send,
  ChevronDown, Eye, FileText, Trash2, CheckCircle2,
} from 'lucide-react';
import { useInvestigationStore, UserDecision } from '../store/investigationStore';
import cases from '../data/cases';

const decisions: { value: UserDecision; label: string; sub: string; icon: React.ReactNode }[] = [
  { value: 'fraud',     label: 'Confirmed Fraud',    sub: 'Clear scam',         icon: <ShieldAlert size={13} /> },
  { value: 'suspicious',label: 'Suspicious',         sub: 'Investigate more',   icon: <AlertTriangle size={13} /> },
  { value: 'verify',    label: 'Need Verification',  sub: 'Confirm with source',icon: <HelpCircle size={13} /> },
  { value: 'safe',      label: 'Likely Safe',        sub: 'Appears legitimate', icon: <ShieldCheck size={13} /> },
];

interface Props { caseId: number; }

export default function RightPanel({ caseId }: Props) {
  const { getCaseState, setNotes, setDecision, submitDecision, theme } = useInvestigationStore();
  const state = getCaseState(caseId);
  const cd = cases.find((c) => c.id === caseId)!;
  const [expanded, setExpanded] = useState<string | null>(null);

  const pct = state.suspicionLevel;

  const row = 'px-4 py-3 border-b';
  const label = 'text-[11px] font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5';

  return (
    <div className="h-full flex flex-col border-l overflow-hidden"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>

      {/* Suspicion */}
      <div className={row} style={{ borderColor: 'var(--border)' }}>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>
            Suspicion Level
          </span>
          <span className="text-[11px] font-mono font-bold" style={{ color: pct > 60 ? '#ef4444' : 'var(--text-2)' }}>
            {pct}%
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: pct < 40 ? '#22c55e' : pct < 70 ? 'var(--indigo)' : '#ef4444' }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px]" style={{ color: 'var(--text-3)' }}>Safe</span>
          <span className="text-[10px]" style={{ color: 'var(--text-3)' }}>Fraud</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Clues */}
        <div className={row} style={{ borderColor: 'var(--border)' }}>
          <div className={`${label}`} style={{ color: 'var(--text-3)' }}>
            <AlertTriangle size={11} />
            Red Flags
            <span className="ml-auto font-mono" style={{ color: 'var(--text-2)' }}>
              {state.foundClues.length}/{cd.redFlags.length}
            </span>
          </div>

          {state.foundClues.length === 0 ? (
            <div className="rounded-lg py-5 text-center" style={{ background: 'var(--surface-2)' }}>
              <Eye size={18} className="mx-auto mb-1.5" style={{ color: 'var(--text-3)' }} />
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                Interact with the environment to uncover clues
              </p>
            </div>
          ) : (
            <div className="space-y-1.5">
              <AnimatePresence>
                {state.foundClues.map((clue) => (
                  <motion.div
                    key={clue.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="rounded-lg border cursor-pointer overflow-hidden"
                    style={{ borderColor: expanded === clue.id ? 'var(--indigo-border)' : 'var(--border)', background: 'var(--surface-2)' }}
                    onClick={() => setExpanded(expanded === clue.id ? null : clue.id)}
                  >
                    <div className="flex items-center gap-2 px-3 py-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--indigo)' }} />
                      <span className="text-xs flex-1 leading-snug font-medium" style={{ color: 'var(--text-1)' }}>
                        {clue.label}
                      </span>
                      <ChevronDown
                        size={11}
                        style={{ color: 'var(--text-3)', flexShrink: 0, transform: expanded === clue.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
                      />
                    </div>
                    <AnimatePresence>
                      {expanded === clue.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <p className="px-3 pb-2.5 text-[11px] leading-relaxed" style={{ color: 'var(--text-2)', borderTop: '1px solid var(--border)' }}>
                            {clue.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Notes */}
        <div className={row} style={{ borderColor: 'var(--border)' }}>
          <div className={`${label}`} style={{ color: 'var(--text-3)' }}>
            <FileText size={11} />
            Notes
            {state.notes && (
              <button onClick={() => setNotes(caseId, '')} className="ml-auto opacity-50 hover:opacity-100 transition-opacity">
                <Trash2 size={11} />
              </button>
            )}
          </div>
          <textarea
            value={state.notes}
            onChange={(e) => setNotes(caseId, e.target.value)}
            placeholder="Write observations..."
            rows={4}
            className="w-full rounded-lg px-3 py-2.5 text-xs resize-none border transition-colors"
            style={{
              background: 'var(--surface-2)',
              borderColor: 'var(--border)',
              color: 'var(--text-1)',
            }}
          />
        </div>

        {/* Verdict */}
        {!state.submitted ? (
          <div className="px-4 py-3">
            <div className={`${label}`} style={{ color: 'var(--text-3)' }}>
              <Send size={11} />Submit Verdict
            </div>

            <div className="space-y-1.5 mb-3">
              {decisions.map((d) => {
                const active = state.decision === d.value;
                return (
                  <button
                    key={d.value}
                    onClick={() => setDecision(caseId, d.value)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-left transition-all"
                    style={{
                      borderColor: active ? 'var(--indigo-border)' : 'var(--border)',
                      background: active ? 'var(--indigo-bg)' : 'var(--surface-2)',
                      color: active ? 'var(--indigo)' : 'var(--text-2)',
                    }}
                    onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-2)'; }}
                    onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
                  >
                    <span style={{ flexShrink: 0 }}>{d.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs font-semibold">{d.label}</p>
                      <p className="text-[10px] opacity-60">{d.sub}</p>
                    </div>
                    {active && <CheckCircle2 size={12} style={{ flexShrink: 0, color: 'var(--indigo)' }} />}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => { if (state.decision) submitDecision(caseId); }}
              disabled={!state.decision}
              className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-opacity"
              style={{
                background: state.decision ? 'var(--indigo)' : 'var(--surface-2)',
                color: state.decision ? 'white' : 'var(--text-3)',
                cursor: state.decision ? 'pointer' : 'not-allowed',
              }}
            >
              <Send size={13} />
              Submit Investigation
            </button>
          </div>
        ) : (
          <div className="px-4 py-3">
            <div
              className="rounded-xl p-4 border flex items-start gap-3"
              style={{ background: 'var(--indigo-bg)', borderColor: 'var(--indigo-border)' }}
            >
              <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--indigo)' }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-1)' }}>Submitted</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>See full analysis in the center panel.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
