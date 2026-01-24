-- 1. Fix points inflation: Update trigger to handle INSERT OR UPDATE with delta calculation
DROP TRIGGER IF EXISTS on_progress_update_points ON public.user_progress;

CREATE OR REPLACE FUNCTION public.update_user_points()
RETURNS TRIGGER AS $$
DECLARE
  points_earned integer;
  bonus_points integer;
  old_points integer := 0;
  old_bonus integer := 0;
  points_delta integer;
BEGIN
  -- Calculate new points
  points_earned := NEW.score;
  IF NEW.completed = true THEN
    bonus_points := 10;
  ELSE
    bonus_points := 0;
  END IF;
  
  -- Calculate old points if this is an update
  IF TG_OP = 'UPDATE' THEN
    old_points := COALESCE(OLD.score, 0);
    IF OLD.completed = true THEN
      old_bonus := 10;
    ELSE
      old_bonus := 0;
    END IF;
  END IF;
  
  -- Calculate delta (difference between new and old)
  points_delta := (points_earned + bonus_points) - (old_points + old_bonus);
  
  -- Only add positive delta (improvement only)
  IF points_delta > 0 THEN
    UPDATE public.profiles
    SET total_points = COALESCE(total_points, 0) + points_delta,
        updated_at = now()
    WHERE user_id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for both INSERT and UPDATE
CREATE TRIGGER on_progress_update_points
AFTER INSERT OR UPDATE ON public.user_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_user_points();

-- 2. Recreate leaderboard view with SECURITY INVOKER (already has it, but ensure proper setup)
DROP VIEW IF EXISTS public.leaderboard;
CREATE VIEW public.leaderboard
WITH (security_invoker = on)
AS
SELECT 
  p.id,
  p.user_id,
  p.full_name,
  p.avatar_url,
  p.country,
  p.total_points,
  p.created_at
FROM public.profiles p
WHERE p.total_points IS NOT NULL AND p.total_points > 0
ORDER BY p.total_points DESC
LIMIT 100;

-- 3. Recreate user_statistics view with SECURITY INVOKER
DROP VIEW IF EXISTS public.user_statistics;
CREATE VIEW public.user_statistics
WITH (security_invoker = on)
AS
SELECT 
  (SELECT COUNT(*) FROM public.profiles)::integer as total_users,
  (SELECT COUNT(*) FROM public.profiles WHERE last_seen_at > now() - interval '5 minutes')::integer as online_users;

-- 4. Ensure profiles table has proper RLS for authenticated users only
DROP POLICY IF EXISTS "Users can view all profiles for leaderboard" ON public.profiles;
CREATE POLICY "Authenticated users can view profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (true);

-- Grant SELECT on views to authenticated users only (not anon)
REVOKE ALL ON public.leaderboard FROM anon;
REVOKE ALL ON public.user_statistics FROM anon;
GRANT SELECT ON public.leaderboard TO authenticated;
GRANT SELECT ON public.user_statistics TO authenticated;