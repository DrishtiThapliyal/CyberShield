import React from 'react';
import { ShieldCheck, Sun, Moon, Maximize2, Minimize2 } from 'lucide-react';
import { useInvestigationStore } from '../store/investigationStore';
import cases from '../data/cases';

export default function Navbar() {
  const { theme, toggleTheme, completedCases, isFullscreen, toggleFullscreen } = useInvestigationStore();
  const dk = theme === 'dark';
  const done = completedCases.length;
  const total = cases.length;

  const btn = `w-8 h-8 flex items-center justify-center rounded-lg transition-colors
    ${dk ? 'text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--surface-2)]'
         : 'text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--surface-2)]'}`;

  return (
    <header
      className="flex-shrink-0 h-14 flex items-center px-5 gap-4 border-b z-30"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 min-w-0 flex-shrink-0">
        <div className="w-7 h-7 rounded-lg bg-[var(--indigo)] flex items-center justify-center">
          <ShieldCheck size={14} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="font-semibold text-sm tracking-tight text-[var(--text-1)]">CyberSafe</span>
        <span
          className="hidden sm:block text-[10px] font-medium px-1.5 py-0.5 rounded-md border"
          style={{ color: 'var(--indigo)', background: 'var(--indigo-bg)', borderColor: 'var(--indigo-border)' }}
        >
          India
        </span>
      </div>

      {/* Divider */}
      <div className="h-5 w-px flex-shrink-0" style={{ background: 'var(--border)' }} />

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-0.5 flex-1">
        {['Simulations', 'Prevention Guide', 'Report Fraud'].map((label) => (
          <button
            key={label}
            className="px-3 py-1.5 rounded-lg text-sm transition-colors"
            style={{ color: 'var(--text-2)' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--text-1)'; (e.target as HTMLElement).style.background = 'var(--surface-2)'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--text-2)'; (e.target as HTMLElement).style.background = 'transparent'; }}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto flex-shrink-0">
        {/* Progress */}
        <div
          className="hidden sm:flex items-center gap-2 h-8 px-3 rounded-lg border text-sm"
          style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text-2)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--indigo)]" />
          <span className="font-semibold text-[var(--indigo)]">{done}</span>
          <span className="opacity-40">/</span>
          <span>{total}</span>
          <span className="opacity-50 text-xs">cases</span>
        </div>

        <button onClick={toggleFullscreen} className={btn} title={isFullscreen ? 'Exit focus' : 'Focus mode'}>
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>

        <button onClick={toggleTheme} className={btn} title="Toggle theme">
          {dk ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <button
          className="hidden sm:flex items-center gap-2 h-8 px-3.5 rounded-lg text-sm font-semibold text-white transition-colors"
          style={{ background: 'var(--indigo)' }}
        >
          My Progress
        </button>
      </div>
    </header>
  );
}
