-- =====================================================
-- Shares tabel voor Loek it Up — korte deellinks
-- Voer dit uit in Supabase SQL Editor (Dashboard > SQL Editor)
-- =====================================================

-- 1. Maak de shares tabel aan
CREATE TABLE IF NOT EXISTS shares (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    expires_at TIMESTAMPTZ DEFAULT (now() + interval '90 days')
);

-- 2. Schakel RLS in
ALTER TABLE shares ENABLE ROW LEVEL SECURITY;

-- 3. Iedereen mag een share aanmaken (via anon key)
CREATE POLICY "Allow anonymous insert" ON shares
    FOR INSERT
    WITH CHECK (true);

-- 4. Iedereen mag een share ophalen via ID (nodig voor importeren)
CREATE POLICY "Allow anonymous select" ON shares
    FOR SELECT
    USING (true);

-- 5. Niemand kan shares wijzigen of verwijderen via de API
CREATE POLICY "No update allowed" ON shares
    FOR UPDATE
    USING (false);

CREATE POLICY "No delete allowed" ON shares
    FOR DELETE
    USING (false);

-- 6. Index op id voor snelle lookups (al PK, maar expliciet voor duidelijkheid)
-- CREATE INDEX IF NOT EXISTS idx_shares_id ON shares (id);

-- 7. Optioneel: automatisch verlopen shares opruimen (cron via pg_cron of handmatig)
-- DELETE FROM shares WHERE expires_at < now();
