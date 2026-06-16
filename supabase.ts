import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getSessionId(): string {
  let id = localStorage.getItem('cfil_session_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('cfil_session_id', id);
  }
  return id;
}

export async function saveAttempt(params: {
  caseId: number;
  userDecision: string;
  correctVerdict: string;
  isCorrect: boolean;
  cluesFound: number;
  totalClues: number;
  notes: string;
}) {
  const sessionId = getSessionId();
  await supabase.from('investigation_sessions').upsert({ session_id: sessionId }, { onConflict: 'session_id' });
  const { error } = await supabase.from('case_attempts').insert({
    session_id: sessionId,
    case_id: params.caseId,
    user_decision: params.userDecision,
    correct_verdict: params.correctVerdict,
    is_correct: params.isCorrect,
    clues_found: params.cluesFound,
    total_clues: params.totalClues,
    notes: params.notes,
  });
  return error;
}

export async function loadSessionProgress(): Promise<number[]> {
  const sessionId = getSessionId();
  const { data } = await supabase
    .from('case_attempts')
    .select('case_id')
    .eq('session_id', sessionId);
  if (!data) return [];
  return [...new Set(data.map((r: any) => r.case_id as number))];
}
