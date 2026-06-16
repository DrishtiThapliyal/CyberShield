import { create } from 'zustand';

export type UserDecision = 'fraud' | 'safe' | 'suspicious' | 'verify' | null;
export type ThemeMode = 'dark' | 'light';

export interface FoundClue {
  id: string;
  label: string;
  detail: string;
  timestamp: number;
}

export interface CaseState {
  notes: string;
  foundClues: FoundClue[];
  suspicionLevel: number;
  decision: UserDecision;
  submitted: boolean;
}

interface InvestigationStore {
  selectedCaseId: number | null;
  caseStates: Record<number, CaseState>;
  completedCases: number[];
  theme: ThemeMode;
  sidebarWidth: number;
  rightPanelWidth: number;
  isFullscreen: boolean;
  selectCase: (id: number) => void;
  addClue: (caseId: number, clue: FoundClue) => void;
  setNotes: (caseId: number, notes: string) => void;
  setSuspicion: (caseId: number, level: number) => void;
  setDecision: (caseId: number, decision: UserDecision) => void;
  submitDecision: (caseId: number) => void;
  getCaseState: (caseId: number) => CaseState;
  resetCase: (caseId: number) => void;
  toggleTheme: () => void;
  setSidebarWidth: (w: number) => void;
  setRightPanelWidth: (w: number) => void;
  toggleFullscreen: () => void;
}

const defaultCaseState = (): CaseState => ({
  notes: '',
  foundClues: [],
  suspicionLevel: 0,
  decision: null,
  submitted: false,
});

export const useInvestigationStore = create<InvestigationStore>((set, get) => ({
  selectedCaseId: null,
  caseStates: {},
  completedCases: [],
  theme: 'light',
  sidebarWidth: 288,
  rightPanelWidth: 320,
  isFullscreen: false,

  selectCase: (id) => set({ selectedCaseId: id }),

  addClue: (caseId, clue) =>
    set((state) => {
      const existing = state.caseStates[caseId] ?? defaultCaseState();
      if (existing.foundClues.some((c) => c.id === clue.id)) return state;
      const newClues = [...existing.foundClues, clue];
      const suspicion = Math.min(100, Math.round((newClues.length / 5) * 100));
      return {
        caseStates: {
          ...state.caseStates,
          [caseId]: { ...existing, foundClues: newClues, suspicionLevel: suspicion },
        },
      };
    }),

  setNotes: (caseId, notes) =>
    set((state) => {
      const existing = state.caseStates[caseId] ?? defaultCaseState();
      return { caseStates: { ...state.caseStates, [caseId]: { ...existing, notes } } };
    }),

  setSuspicion: (caseId, level) =>
    set((state) => {
      const existing = state.caseStates[caseId] ?? defaultCaseState();
      return { caseStates: { ...state.caseStates, [caseId]: { ...existing, suspicionLevel: level } } };
    }),

  setDecision: (caseId, decision) =>
    set((state) => {
      const existing = state.caseStates[caseId] ?? defaultCaseState();
      return { caseStates: { ...state.caseStates, [caseId]: { ...existing, decision } } };
    }),

  submitDecision: (caseId) =>
    set((state) => {
      const existing = state.caseStates[caseId] ?? defaultCaseState();
      const completed = state.completedCases.includes(caseId)
        ? state.completedCases
        : [...state.completedCases, caseId];
      return {
        completedCases: completed,
        caseStates: { ...state.caseStates, [caseId]: { ...existing, submitted: true } },
      };
    }),

  getCaseState: (caseId) => get().caseStates[caseId] ?? defaultCaseState(),

  resetCase: (caseId) =>
    set((state) => {
      const newStates = { ...state.caseStates };
      delete newStates[caseId];
      const completedCases = state.completedCases.filter((id) => id !== caseId);
      return { caseStates: newStates, completedCases };
    }),

  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setSidebarWidth: (w) => set({ sidebarWidth: Math.max(220, Math.min(400, w)) }),
  setRightPanelWidth: (w) => set({ rightPanelWidth: Math.max(260, Math.min(420, w)) }),
  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
}));
