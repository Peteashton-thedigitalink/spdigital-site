// ==========================================
// SP Digital — Supabase & OpenAI Config
// ==========================================

const SUPABASE_URL = 'https://lsjconskruqvhsrwlvww.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Zy_NwRGPWAFZTuYWBahe8Q_njygllzE';
const OPENAI_API_KEY = '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';

// Initialise Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);