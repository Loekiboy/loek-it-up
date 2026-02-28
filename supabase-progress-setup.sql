-- =====================================================
-- Supabase Progress Tracking – Schema Migration
-- =====================================================
-- Voegt voortgangsvelden toe aan de bestaande word_lists tabel
-- zodat per-woord stats en lijststatus worden opgeslagen.
--
-- De `words` JSONB-kolom bevat al per-woord stats:
--   [{ "id": "...", "term": "...", "definition": "...",
--      "stats": { "correct": 3, "wrong": 1 } }]
--
-- Deze migratie voegt aggregaatvelden toe voor snelle queries.
-- =====================================================

-- 1. Nieuwe kolommen toevoegen
ALTER TABLE word_lists
    ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'not_started',
    ADD COLUMN IF NOT EXISTS progress_pct INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS total_correct INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS total_wrong INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS last_studied TIMESTAMPTZ;

-- 2. Constraint: status mag alleen bepaalde waarden hebben
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'word_lists_status_check'
    ) THEN
        ALTER TABLE word_lists
            ADD CONSTRAINT word_lists_status_check
            CHECK (status IN ('not_started', 'in_progress', 'completed'));
    END IF;
END
$$;

-- 3. Constraint: progress_pct moet 0-100 zijn
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'word_lists_progress_pct_check'
    ) THEN
        ALTER TABLE word_lists
            ADD CONSTRAINT word_lists_progress_pct_check
            CHECK (progress_pct >= 0 AND progress_pct <= 100);
    END IF;
END
$$;

-- 4. Index voor snelle voortgangsqueries
CREATE INDEX IF NOT EXISTS idx_word_lists_user_status
    ON word_lists (user_id, status);

CREATE INDEX IF NOT EXISTS idx_word_lists_user_last_studied
    ON word_lists (user_id, last_studied DESC);
