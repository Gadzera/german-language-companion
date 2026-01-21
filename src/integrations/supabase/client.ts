// Safe Supabase client initialization for Cloudflare Pages
// Handles missing environment variables gracefully
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from '@/lib/supabase-config';

// Create a mock client that returns empty data for all operations
const createMockClient = (): SupabaseClient<Database> => {
  const mockResponse = { data: null, error: null };
  const mockQueryBuilder = {
    select: () => mockQueryBuilder,
    insert: () => mockQueryBuilder,
    update: () => mockQueryBuilder,
    delete: () => mockQueryBuilder,
    eq: () => mockQueryBuilder,
    neq: () => mockQueryBuilder,
    gt: () => mockQueryBuilder,
    gte: () => mockQueryBuilder,
    lt: () => mockQueryBuilder,
    lte: () => mockQueryBuilder,
    like: () => mockQueryBuilder,
    ilike: () => mockQueryBuilder,
    is: () => mockQueryBuilder,
    in: () => mockQueryBuilder,
    contains: () => mockQueryBuilder,
    containedBy: () => mockQueryBuilder,
    range: () => mockQueryBuilder,
    textSearch: () => mockQueryBuilder,
    filter: () => mockQueryBuilder,
    not: () => mockQueryBuilder,
    or: () => mockQueryBuilder,
    and: () => mockQueryBuilder,
    order: () => mockQueryBuilder,
    limit: () => mockQueryBuilder,
    single: () => Promise.resolve(mockResponse),
    maybeSingle: () => Promise.resolve(mockResponse),
    then: (resolve: (value: typeof mockResponse) => void) => Promise.resolve(mockResponse).then(resolve),
  };

  const mockAuth = {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signUp: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Supabase not configured' } }),
    signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Supabase not configured' } }),
    signOut: () => Promise.resolve({ error: null }),
    resetPasswordForEmail: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  };

  return {
    from: () => mockQueryBuilder,
    auth: mockAuth,
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: { message: 'Storage not configured' } }),
        download: () => Promise.resolve({ data: null, error: { message: 'Storage not configured' } }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
        remove: () => Promise.resolve({ data: null, error: null }),
        list: () => Promise.resolve({ data: [], error: null }),
      }),
    },
    channel: () => ({
      on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
      subscribe: () => ({ unsubscribe: () => {} }),
    }),
    rpc: () => Promise.resolve(mockResponse),
  } as unknown as SupabaseClient<Database>;
};

// Export the supabase client - either real or mock
export const supabase: SupabaseClient<Database> = isSupabaseConfigured()
  ? createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: typeof window !== 'undefined' ? localStorage : undefined,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : createMockClient();

// Export helper to check if using real client
export const isSupabaseAvailable = isSupabaseConfigured;
