import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const PAGE_SLUG = 'portfolio';
const STORAGE_KEY = 'has_visited_portfolio';

export function useVisitorCount() {
    const [count, setCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function track() {
            if (!supabase) {
                setLoading(false);
                return;
            }
            try {
                const hasVisited = localStorage.getItem(STORAGE_KEY);

                if (!hasVisited) {
                    // First visit: call the SECURITY DEFINER RPC to atomically increment.
                    // The anon user cannot UPDATE the table directly (blocked by RLS),
                    // but IS granted EXECUTE on this function, so this is the only
                    // permitted write path.
                    const { data, error } = await supabase.rpc('increment_view_count', {
                        slug: PAGE_SLUG,
                    });
                    if (error) throw error;
                    setCount(data as number);
                    localStorage.setItem(STORAGE_KEY, 'true');
                } else {
                    // Returning visitor: read current count via the public SELECT policy.
                    // RLS allows this via the "public_read_site_stats" policy.
                    const { data, error } = await supabase
                        .from('site_stats')
                        .select('view_count')
                        .eq('page_slug', PAGE_SLUG)
                        .single();
                    if (error) throw error;
                    setCount((data as { view_count: number }).view_count);
                }
            } catch (err) {
                // Silently fail — visitor count is non-critical UI, never block the page
                console.warn('[useVisitorCount] Could not load visitor count:', err);
                setCount(null);
            } finally {
                setLoading(false);
            }
        }

        track();
    }, []);

    return { count, loading };
}
