import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { CaseData } from '../data/cases';
import { useInvestigationStore } from '../store/investigationStore';
import EnvironmentRouter from './environments/EnvironmentRouter';

interface CaseViewProps { caseData: CaseData; }

const diffStyle: Record<string, { color: string; bg: string }> = {
  Easy: { color: 'var(--indigo)', bg: 'var(--indigo-bg)' },
  Medium: { color: 'var(--text-2)', bg: 'var(--surface-2)' },
  Hard: { color: 'var(--text-2)', bg: 'var(--surface-2)' },
};

export default function CaseView({ caseData }: CaseViewProps) {
  const { theme, selectCase } = useInvestigationStore();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div
        className="flex-shrink-0 px-5 py-3.5 border-b"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] mb-1.5" style={{ color: 'var(--text-3)' }}>
          <button
            onClick={() => selectCase(0 as any)}
            className="hover:underline transition-colors"
            style={{ color: 'var(--text-3)' }}
          >
            Cases
          </button>
          <ChevronRight size={10} />
          <span style={{ color: 'var(--indigo)', fontWeight: 600 }}>
            {String(caseData.id).padStart(2, '0')} — {caseData.title}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold tracking-tight leading-tight" style={{ color: 'var(--text-1)' }}>
                {caseData.title}
              </h2>
              <span
                className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ color: diffStyle[caseData.difficulty].color, background: diffStyle[caseData.difficulty].bg }}
              >
                {caseData.difficulty}
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
              {caseData.briefing}
            </p>
          </div>
        </div>
      </div>

      {/* Environment */}
      <div className="flex-1 overflow-hidden p-4" style={{ background: 'var(--bg)' }}>
        <motion.div
          key={caseData.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.16 }}
          className="h-full"
        >
          <EnvironmentRouter environmentType={caseData.environmentType} />
        </motion.div>
      </div>
    </div>
  );
}
