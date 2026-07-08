import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import WelcomeScreen from './components/WelcomeScreen';
import CaseView from './components/CaseView';
import PostAnalysis from './components/PostAnalysis';
import { useInvestigationStore } from './store/investigationStore';
import cases from './data/cases';
import { saveAttempt, loadSessionProgress } from './lib/supabase';

export default function App() {
  const {
    selectedCaseId, getCaseState,
    sidebarWidth, setSidebarWidth,
    rightPanelWidth, setRightPanelWidth,
    isFullscreen, theme,
  } = useInvestigationStore();

  const dragging = useRef<'sidebar' | 'right' | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    loadSessionProgress().then((ids) => {
      ids.forEach((id) => {
        const s = useInvestigationStore.getState();
        if (!s.completedCases.includes(id)) s.submitDecision(id);
      });
    });
  }, []);

  useEffect(() => {
    return useInvestigationStore.subscribe((state, prev) => {
      state.completedCases
        .filter((id) => !prev.completedCases.includes(id))
        .forEach((caseId) => {
          const cd = cases.find((c) => c.id === caseId);
          const cs = state.caseStates[caseId];
          if (!cd || !cs) return;
          saveAttempt({
            caseId, userDecision: cs.decision ?? '',
            correctVerdict: cd.analysis.verdict,
            isCorrect: cs.decision === cd.analysis.verdict,
            cluesFound: cs.foundClues.length,
            totalClues: cd.redFlags.length,
            notes: cs.notes,
          });
        });
    });
  }, []);

  const onMouseDown = (side: 'sidebar' | 'right') => (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = side;
    const onMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      if (dragging.current === 'sidebar') setSidebarWidth(ev.clientX);
      if (dragging.current === 'right') {
        const w = bodyRef.current?.clientWidth ?? window.innerWidth;
        setRightPanelWidth(w - ev.clientX);
      }
    };
    const onUp = () => {
      dragging.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const selectedCase = selectedCaseId ? cases.find((c) => c.id === selectedCaseId) : null;
  const caseState = selectedCaseId ? getCaseState(selectedCaseId) : null;
  const isSubmitted = caseState?.submitted ?? false;

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: 'var(--bg)' }}>
      <Navbar />

      <div ref={bodyRef} className="flex-1 flex overflow-hidden">
        {!isFullscreen && (
          <>
            <div style={{ width: sidebarWidth, flexShrink: 0, overflow: 'hidden' }}>
              <Sidebar />
            </div>
            <div onMouseDown={onMouseDown('sidebar')} className="resize-handle" />
          </>
        )}

        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {!selectedCase ? (
              <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="flex-1 overflow-auto">
                <WelcomeScreen />
              </motion.div>
            ) : isSubmitted ? (
              <motion.div key={`post-${selectedCase.id}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="flex-1 overflow-auto">
                <PostAnalysis caseId={selectedCase.id} />
              </motion.div>
            ) : (
              <motion.div key={`case-${selectedCase.id}`} initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }} className="flex-1 flex flex-col overflow-hidden">
                <CaseView caseData={selectedCase} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isFullscreen && selectedCase && (
          <>
            <div onMouseDown={onMouseDown('right')} className="resize-handle" />
            <div style={{ width: rightPanelWidth, flexShrink: 0, overflow: 'hidden' }}>
              <RightPanel caseId={selectedCase.id} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
