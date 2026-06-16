import React, { useState } from 'react';
import { CheckCircle2, Lock, Circle, Search, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import cases from '../data/cases';
import { useInvestigationStore } from '../store/investigationStore';

const envLabel: Record<string, string> = {
  gmail: 'Email Phishing',
  whatsapp: 'WhatsApp Scam',
  'sms-courier': 'SMS Phishing',
  'upi-qr': 'UPI / QR Fraud',
  'job-portal': 'Fake Job Offer',
  'investment-scam': 'Investment Fraud',
  'instagram-giveaway': 'Instagram Scam',
  'fake-customer-care': 'Helpline Fraud',
  'electricity-sms': 'Utility Scam',
  'deepfake-call': 'Deepfake Voice',
  marketplace: 'Online Marketplace',
  'upi-collect': 'UPI Collect Scam',
  'scholarship-portal': 'Scholarship Fraud',
  'aadhaar-portal': 'Identity Fraud',
  'social-recovery': 'Account Recovery',
};

const diffLabel: Record<string, string> = { Easy: 'Easy', Medium: 'Medium', Hard: 'Hard' };

export default function Sidebar() {
  const { selectedCaseId, selectCase, completedCases, caseStates, theme } = useInvestigationStore();
  const [query, setQuery] = useState('');
  const dk = theme === 'dark';

  const filtered = cases.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    envLabel[c.environmentType]?.toLowerCase().includes(query.toLowerCase())
  );

  const done = completedCases.length;
  const total = cases.length;
  const pct = (done / total) * 100;

  return (
    <div
      className="h-full flex flex-col border-r overflow-hidden"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      {/* Progress strip */}
      <div className="px-4 pt-4 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>
            Case Files
          </span>
          <span className="text-[11px] font-mono font-semibold" style={{ color: 'var(--text-2)' }}>
            {done}/{total}
          </span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--indigo)' }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2 border"
          style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
        >
          <Search size={12} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cases..."
            className="flex-1 text-xs bg-transparent"
            style={{ color: 'var(--text-1)' }}
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filtered.map((c, i) => {
          const isSelected = selectedCaseId === c.id;
          const isCompleted = completedCases.includes(c.id);
          const state = caseStates[c.id];
          const inProgress = !isCompleted && (state?.foundClues.length ?? 0) > 0;

          return (
            <motion.button
              key={c.id}
              onClick={() => selectCase(c.id)}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.015, duration: 0.18 }}
              className="w-full text-left rounded-xl px-3 py-2.5 mb-0.5 flex items-center gap-3 transition-all duration-100 border"
              style={isSelected ? {
                background: 'var(--indigo-bg)',
                borderColor: 'var(--indigo-border)',
              } : {
                background: 'transparent',
                borderColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                }
              }}
            >
              {/* Status icon */}
              <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                {isCompleted ? (
                  <CheckCircle2 size={14} style={{ color: 'var(--indigo)' }} />
                ) : inProgress ? (
                  <Circle size={14} style={{ color: 'var(--indigo)', opacity: 0.5 }} strokeWidth={2.5} />
                ) : (
                  <Lock size={12} style={{ color: 'var(--text-3)' }} strokeWidth={2} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-3)' }}>
                    {String(c.id).padStart(2, '0')}
                  </span>
                  <span
                    className="text-[10px] font-medium px-1.5 py-px rounded-sm"
                    style={
                      c.difficulty === 'Easy' ? { color: 'var(--indigo)', background: 'var(--indigo-bg)' }
                      : c.difficulty === 'Medium' ? { color: 'var(--text-2)', background: 'var(--surface-2)' }
                      : { color: 'var(--text-2)', background: 'var(--surface-2)' }
                    }
                  >
                    {diffLabel[c.difficulty]}
                  </span>
                </div>
                <p
                  className="text-[13px] font-semibold leading-tight truncate"
                  style={{ color: isSelected ? 'var(--text-1)' : 'var(--text-1)' }}
                >
                  {c.title}
                </p>
                <p className="text-[11px] truncate mt-0.5" style={{ color: 'var(--text-3)' }}>
                  {envLabel[c.environmentType]}
                </p>
              </div>

              {isSelected && (
                <ChevronRight size={12} style={{ color: 'var(--indigo)', flexShrink: 0 }} />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--indigo)] animate-pulse" />
          <span className="text-[11px] font-mono" style={{ color: 'var(--text-3)' }}>
            Simulation active
          </span>
        </div>
      </div>
    </div>
  );
}
