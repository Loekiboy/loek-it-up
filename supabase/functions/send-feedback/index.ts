// Supabase Edge Function: send-feedback
// Ontvangt feedbackdata, slaat op in DB en stuurt een e-mail via Resend.
// De ontvanger (TO_EMAIL) is een geheime omgevingsvariabele — staat NIET in de code.
//
// Vereiste secrets (stel in via Supabase Dashboard > Project Settings > Edge Functions > Secrets):
//   RESEND_API_KEY  →  jouw Resend API key (resend.com, gratis)
//   TO_EMAIL        →  jouw e-mailadres (wordt nooit zichtbaar voor gebruikers)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://loek.oerlemans.tv',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { type, subject, description, email, user_id, user_agent } = body;

    // --- Server-side validatie ---
    if (!type || !['feature', 'bug'].includes(type)) {
      return json({ error: 'Ongeldig type.' }, 400);
    }
    if (!subject || subject.trim().length < 3 || subject.length > 150) {
      return json({ error: 'Onderwerp is verplicht (3–150 tekens).' }, 400);
    }
    if (!description || description.trim().length < 10 || description.length > 2000) {
      return json({ error: 'Beschrijving is verplicht (10–2000 tekens).' }, 400);
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Ongeldig e-mailadres.' }, 400);
    }

    // --- Sla op in Supabase via service role (slaat RLS over voor inserts) ---
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { error: dbError } = await supabase.from('feedback').insert([{
      type,
      subject: subject.trim().slice(0, 150),
      description: description.trim().slice(0, 2000),
      email: email || null,
      user_id: user_id || null,
      user_agent: (user_agent || '').slice(0, 500),
    }]);

    if (dbError) {
      console.error('DB insert error:', dbError);
      // Ga toch door met e-mail versturen
    }

    // --- Stuur e-mail via Resend ---
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    const TO_EMAIL = Deno.env.get('TO_EMAIL'); // jouw adres, alleen zichtbaar op de server

    if (RESEND_API_KEY && TO_EMAIL) {
      const typeLabel = type === 'bug' ? '🐛 Bug Report' : '💡 Feature Request';
      const emailText = [
        `Nieuwe ${typeLabel} ontvangen via Loek it Up!`,
        '',
        `Type: ${typeLabel}`,
        `Onderwerp: ${subject.trim()}`,
        '',
        `Beschrijving:`,
        description.trim(),
        '',
        email ? `E-mail afzender: ${email}` : 'Geen e-mailadres opgegeven',
        user_id ? `User ID: ${user_id}` : 'Gebruiker niet ingelogd',
      ].join('\n');

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Loek it Up Feedback <onboarding@resend.dev>',
          to: [TO_EMAIL],
          subject: `[Loek it Up] ${type === 'bug' ? '🐛' : '💡'} ${subject.trim().slice(0, 80)}`,
          text: emailText,
        }),
      });

      if (!resendRes.ok) {
        const resendErr = await resendRes.text();
        console.error('Resend error:', resendErr);
        // Feedback is wel opgeslagen in DB, dus geen harde fout teruggeven
      }
    } else {
      console.warn('RESEND_API_KEY of TO_EMAIL ontbreekt — e-mail niet verstuurd.');
    }

    return json({ success: true });
  } catch (err) {
    console.error('Edge function exception:', err);
    return json({ error: 'Interne fout. Probeer het later opnieuw.' }, 500);
  }
});

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
