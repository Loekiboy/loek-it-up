-- =====================================================
-- Feedback tabel voor Loek it Up
-- Voer dit uit in je Supabase SQL Editor (Dashboard > SQL Editor)
-- =====================================================

-- 1. Maak de feedback tabel aan
CREATE TABLE IF NOT EXISTS feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('feature', 'bug')),
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    email TEXT,
    user_id UUID REFERENCES auth.users(id),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Schakel RLS (Row Level Security) in op de feedback tabel
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- 3. Policy: iedereen (ook anoniem) mag feedback INSTUREN via de Edge Function
--    De Edge Function gebruikt de service role, dus deze policy is voor directe API-calls
CREATE POLICY "Allow anonymous insert" ON feedback
    FOR INSERT
    WITH CHECK (true);

-- 4. Niemand kan feedback lezen/wijzigen/verwijderen via de API
--    Je bekijkt feedback via het Supabase Dashboard > Table Editor
--    EN je ontvangt een e-mail zodra iemand feedback instuurt.
CREATE POLICY "Only admins can read feedback" ON feedback
    FOR SELECT
    USING (false);

CREATE POLICY "No update allowed" ON feedback
    FOR UPDATE
    USING (false);

CREATE POLICY "No delete allowed" ON feedback
    FOR DELETE
    USING (false);

-- =====================================================
-- E-MAIL SETUP: Supabase Edge Function secrets
-- =====================================================
-- De Edge Function 'send-feedback' verstuurt automatisch een e-mail
-- naar jouw adres. Het adres staat NOOIT in de client-code.
--
-- Stap 1: Maak een gratis Resend account aan op https://resend.com
--         → Settings > API Keys > Create API Key → kopieer de key
--
-- Stap 2: Stel de secrets in via de Supabase CLI:
--
--   supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
--   supabase secrets set TO_EMAIL=loekoerlemans@gmail.com
--
--   OF via het Supabase Dashboard:
--   Project Settings > Edge Functions > Secrets > Add secret
--
-- Stap 3: Deploy de Edge Function:
--
--   supabase functions deploy send-feedback
--
--   (vereist Supabase CLI: https://supabase.com/docs/guides/cli)
--
-- =====================================================
-- OPTIONEEL: RLS op word_lists controleren
-- =====================================================
-- Zorg dat deze policies actief zijn op de word_lists tabel:
--
-- ALTER TABLE word_lists ENABLE ROW LEVEL SECURITY;
--
-- CREATE POLICY "Users can view own lists" ON word_lists
--     FOR SELECT USING (auth.uid() = user_id);
--
-- CREATE POLICY "Users can insert own lists" ON word_lists
--     FOR INSERT WITH CHECK (auth.uid() = user_id);
--
-- CREATE POLICY "Users can update own lists" ON word_lists
--     FOR UPDATE USING (auth.uid() = user_id);
--
-- CREATE POLICY "Users can delete own lists" ON word_lists
--     FOR DELETE USING (auth.uid() = user_id);
--
-- CREATE POLICY "Anyone can read public lists" ON word_lists
--     FOR SELECT USING (is_public = true);
