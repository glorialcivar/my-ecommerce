-- Set the search path to include the public schema
SET search_path TO public, auth;

-- Add auth_id column to users table to link with Supabase Auth
ALTER TABLE public.users ADD COLUMN auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create a unique index on auth_id to ensure one-to-one relationship
CREATE UNIQUE INDEX idx_users_auth_id ON public.users(auth_id);

-- Create a function to handle new user signups in Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if a user with this email already exists
  IF EXISTS (SELECT 1 FROM public.users WHERE email = NEW.email) THEN
    -- Update the existing user with the auth_id
    UPDATE public.users SET auth_id = NEW.id WHERE email = NEW.email;
  ELSE
    -- Create a new user record with the auth_id
    INSERT INTO public.users (auth_id, email, password_hash, first_name, last_name)
    VALUES (NEW.id, NEW.email, '', '', '');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically link new Supabase Auth users with our users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

-- Create a function to sync user data between auth.users and our users table
CREATE OR REPLACE FUNCTION public.sync_user_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Update our users table when auth.users is updated
  UPDATE public.users 
  SET email = NEW.email,
      updated_at = CURRENT_TIMESTAMP
  WHERE auth_id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to sync user data
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.sync_user_data();

-- Create a function to handle user deletion in Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_auth_user_deleted()
RETURNS TRIGGER AS $$
BEGIN
  -- Delete the corresponding user in our users table
  DELETE FROM public.users WHERE auth_id = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to handle user deletion
DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
CREATE TRIGGER on_auth_user_deleted
  AFTER DELETE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_auth_user_deleted();

-- Create a view to join users with auth.users for easier querying
DROP VIEW IF EXISTS public.user_profiles;
CREATE OR REPLACE VIEW public.user_profiles AS
SELECT 
  u.id,
  u.email,
  u.first_name,
  u.last_name,
  u.role,
  u.created_at,
  u.updated_at,
  au.id AS auth_id,
  au.email AS auth_email,
  au.email_confirmed_at,
  au.last_sign_in_at,
  au.phone,
  au.confirmed_at,
  au.banned_until,
  au.created_at AS auth_created_at,
  au.updated_at AS auth_updated_at
FROM public.users u
JOIN auth.users au ON u.auth_id = au.id;

-- Grant permissions on the view
GRANT SELECT ON public.user_profiles TO authenticated;
GRANT SELECT ON public.user_profiles TO anon;

-- Create a function to get the current user's profile
CREATE OR REPLACE FUNCTION public.get_current_user_profile()
RETURNS TABLE (
  id UUID,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  role TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.email,
    u.first_name,
    u.last_name,
    u.role,
    u.created_at,
    u.updated_at
  FROM public.users u
  WHERE u.auth_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.get_current_user_profile() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_current_user_profile() TO anon;

-- Enable Row Level Security on the users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow users to update their own profile
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = auth_id);

-- Create a policy to allow users to view their own user record
DROP POLICY IF EXISTS "Users can view their own user record" ON public.users;
CREATE POLICY "Users can view their own user record"
  ON public.users
  FOR SELECT
  USING (auth.uid() = auth_id);

-- Create a function to check if a user can access a profile
CREATE OR REPLACE FUNCTION public.can_access_profile(profile_auth_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN auth.uid() = profile_auth_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get a user profile by ID with permission check
CREATE OR REPLACE FUNCTION public.get_user_profile(user_id UUID)
RETURNS TABLE (
  id UUID,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  role TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  -- Check if the user has permission to view this profile
  IF EXISTS (
    SELECT 1 FROM public.users u
    WHERE u.id = user_id AND (u.auth_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin')
  ) THEN
    RETURN QUERY
    SELECT 
      u.id,
      u.email,
      u.first_name,
      u.last_name,
      u.role,
      u.created_at,
      u.updated_at
    FROM public.users u
    WHERE u.id = user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the functions
GRANT EXECUTE ON FUNCTION public.can_access_profile(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_profile(UUID) TO authenticated;

-- Reset the search path
RESET search_path;
