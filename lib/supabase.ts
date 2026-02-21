import { createClient } from '@supabase/supabase-js';

// Accessing environment variables via Vite's import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log configuration status (helpful for debugging configuration in production)
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[Supabase] Missing configuration. Visitor counter will be disabled.');
    console.info('Check your environment variables or .env.local file.');
}

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
