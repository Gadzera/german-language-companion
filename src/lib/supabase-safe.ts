// Safe Supabase configuration checker
// This file provides utilities to check if Supabase is properly configured

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = (): boolean => {
  return !!(SUPABASE_URL && SUPABASE_ANON_KEY);
};

export const getSupabaseStatus = (): { configured: boolean; message: string } => {
  if (!SUPABASE_URL && !SUPABASE_ANON_KEY) {
    return {
      configured: false,
      message: 'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.',
    };
  }
  
  if (!SUPABASE_URL) {
    return {
      configured: false,
      message: 'VITE_SUPABASE_URL is missing.',
    };
  }
  
  if (!SUPABASE_ANON_KEY) {
    return {
      configured: false,
      message: 'VITE_SUPABASE_PUBLISHABLE_KEY is missing.',
    };
  }
  
  return {
    configured: true,
    message: 'Supabase is configured correctly.',
  };
};
