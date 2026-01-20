-- Add new columns to profiles for country, avatar and total points
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS country text,
ADD COLUMN IF NOT EXISTS total_points integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_seen_at timestamp with time zone DEFAULT now();

-- Create index for leaderboard queries
CREATE INDEX IF NOT EXISTS idx_profiles_total_points ON public.profiles (total_points DESC);

-- Create index for online users tracking
CREATE INDEX IF NOT EXISTS idx_profiles_last_seen ON public.profiles (last_seen_at DESC);

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create a public view for leaderboard (only public info, no email)
CREATE OR REPLACE VIEW public.leaderboard AS
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

-- Create a view for public statistics (online users, total registered)
CREATE OR REPLACE VIEW public.user_statistics AS
SELECT
  (SELECT COUNT(*) FROM public.profiles) as total_users,
  (SELECT COUNT(*) FROM public.profiles WHERE last_seen_at > NOW() - INTERVAL '5 minutes') as online_users;

-- RLS policy for profiles to allow reading leaderboard data (public fields only)
CREATE POLICY "Anyone can view leaderboard profiles"
ON public.profiles FOR SELECT
USING (true);

-- Drop the old restrictive policy and create new one
DROP POLICY IF EXISTS "Users can view their own profile " ON public.profiles;

-- Function to update user points when completing a quiz
CREATE OR REPLACE FUNCTION public.update_user_points()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  points_earned integer;
  bonus_points integer;
BEGIN
  -- Points per correct answer
  points_earned := NEW.score;
  
  -- Bonus for completing (all questions answered)
  IF NEW.completed = true THEN
    bonus_points := 10;
  ELSE
    bonus_points := 0;
  END IF;
  
  -- Update total points in profiles
  UPDATE public.profiles
  SET total_points = COALESCE(total_points, 0) + points_earned + bonus_points,
      updated_at = now()
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$;

-- Trigger to update points when progress is inserted/updated
DROP TRIGGER IF EXISTS on_progress_update_points ON public.user_progress;
CREATE TRIGGER on_progress_update_points
AFTER INSERT ON public.user_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_user_points();

-- Function to update last_seen_at
CREATE OR REPLACE FUNCTION public.update_last_seen()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET last_seen_at = now()
  WHERE user_id = auth.uid();
END;
$$;