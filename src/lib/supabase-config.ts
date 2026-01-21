/**
 * Supabase configuration with safe initialization for Cloudflare Pages
 * Handles missing environment variables gracefully
 */

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
};

export const getSupabaseConfig = () => {
  if (!isSupabaseConfigured()) {
    console.warn(
      '[Supabase] Missing configuration. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY environment variables.'
    );
    return null;
  }
  
  return {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY,
  };
};
