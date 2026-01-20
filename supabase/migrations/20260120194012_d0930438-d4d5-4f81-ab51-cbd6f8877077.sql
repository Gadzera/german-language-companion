-- Fix Security Definer Views by adding SECURITY INVOKER

-- Drop and recreate leaderboard view with security invoker
DROP VIEW IF EXISTS public.leaderboard;
CREATE VIEW public.leaderboard
WITH (security_invoker = on)
AS
SELECT 
  id,
  user_id,
  full_name,
  avatar_url,
  country,
  total_points,
  created_at
FROM public.profiles
WHERE total_points > 0
ORDER BY total_points DESC
LIMIT 100;

-- Drop and recreate user_statistics view with security invoker
DROP VIEW IF EXISTS public.user_statistics;
CREATE VIEW public.user_statistics
WITH (security_invoker = on)
AS
SELECT
  (SELECT COUNT(*) FROM public.profiles) as total_users,
  (SELECT COUNT(*) FROM public.profiles WHERE last_seen_at > NOW() - INTERVAL '5 minutes') as online_users;