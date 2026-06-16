/*
# Cyber Fraud Investigation Lab — Progress Tracking

1. New Tables
- `investigation_sessions`: Stores anonymous session data for progress tracking.
  - `id` (uuid, primary key)
  - `session_id` (text, unique): Anonymous browser session identifier stored in localStorage.
  - `created_at` (timestamp)

- `case_attempts`: Records each case investigation attempt and outcome.
  - `id` (uuid, primary key)
  - `session_id` (text): References the session.
  - `case_id` (integer): Which case (1-15).
  - `user_decision` (text): What the user decided (fraud/safe/suspicious/verify).
  - `correct_verdict` (text): The actual verdict for the case.
  - `is_correct` (boolean): Whether the user was right.
  - `clues_found` (integer): Number of red flags discovered.
  - `total_clues` (integer): Total red flags in the case.
  - `notes` (text): User's investigation notes.
  - `completed_at` (timestamp)

2. Security
- RLS enabled on both tables.
- Single-tenant (no auth): anon + authenticated can read/write.
  This is appropriate because data is anonymous session-based — no PII stored.

3. Notes
- No user authentication required — progress is tracked by anonymous session ID.
- Session ID is generated client-side and stored in localStorage.
*/

CREATE TABLE IF NOT EXISTS investigation_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS case_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  case_id integer NOT NULL,
  user_decision text NOT NULL,
  correct_verdict text NOT NULL,
  is_correct boolean NOT NULL DEFAULT false,
  clues_found integer NOT NULL DEFAULT 0,
  total_clues integer NOT NULL DEFAULT 0,
  notes text DEFAULT '',
  completed_at timestamptz DEFAULT now()
);

ALTER TABLE investigation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_sessions" ON investigation_sessions;
CREATE POLICY "anon_select_sessions" ON investigation_sessions FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_sessions" ON investigation_sessions;
CREATE POLICY "anon_insert_sessions" ON investigation_sessions FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_attempts" ON case_attempts;
CREATE POLICY "anon_select_attempts" ON case_attempts FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_attempts" ON case_attempts;
CREATE POLICY "anon_insert_attempts" ON case_attempts FOR INSERT
TO anon, authenticated WITH CHECK (true);
