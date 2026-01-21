-- Fix security issues: Remove public access to profiles table
-- The leaderboard VIEW already exists and excludes sensitive fields (email)
-- So we only need to remove the dangerous public policy from the underlying table

-- Drop the problematic public SELECT policy that exposes emails
DROP POLICY IF EXISTS "Anyone can view leaderboard profiles" ON public.profiles;

-- The following policies remain and are correct:
-- "Users can view their own profile" - for authenticated user access to their own data
-- "Users can insert their own profile" - for creating profiles
-- "Users can update their own profile" - for updating profiles

-- Public leaderboard access is safely provided via the leaderboard VIEW
-- which already excludes email addresses and uses SECURITY INVOKER