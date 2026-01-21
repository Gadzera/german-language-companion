-- ============================================
-- SECURITY FIX: Remove email from profiles table
-- Email is already stored in auth.users (source of truth)
-- This eliminates redundant PII storage
-- ============================================

-- Step 1: Update the trigger to NOT copy email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Step 2: Remove email column from profiles table
-- (existing data will be preserved in auth.users)
ALTER TABLE public.profiles DROP COLUMN IF EXISTS email;