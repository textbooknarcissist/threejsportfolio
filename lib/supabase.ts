import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Production-grade resiliency: We don't throw at the module level to avoid crashing the entire app 
// if a non-critical service (analytics) has a configuration issue.
if (!supabaseUrl || !supabaseAnonKey) {
    if (import.meta.env.DEV) {
        console.warn('Supabase credentials missing. Visitor counter will be disabled. Check your .env.local file.');
    }
}

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
