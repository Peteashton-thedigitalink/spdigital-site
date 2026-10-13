// ==========================================
// SP Digital — Supabase & OpenAI Config
// ==========================================

const SUPABASE_URL = 'https://lsjconskruqvhsrwlvww.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Zy_NwRGPWAFZTuYWBahe8Q_njygllzE';


// Initialise Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);