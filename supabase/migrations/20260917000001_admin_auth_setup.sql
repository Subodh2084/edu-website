-- ============================================================
-- Leafclutch Technologies — Admin Auth Setup
-- File: supabase/migrations/20260917000001_admin_auth_setup.sql
-- ============================================================

-- 1. DROP & RECREATE handle_new_user trigger function
--    Enhanced to read 'role' from user metadata, defaulting to 'student'
--    so an admin account can be created with metadata {"role": "admin"}
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger (idempotent)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 2. TRIGGER: Sync email/name changes from auth.users → profiles
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_user_updated()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET
    email     = NEW.email,
    full_name = COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', public.profiles.full_name),
    updated_at = now()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE OF email, raw_user_meta_data ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_updated();

-- ============================================================
-- 3. TRIGGER: Clean up profile on auth user delete
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_user_deleted()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public.profiles WHERE id = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
CREATE TRIGGER on_auth_user_deleted
  AFTER DELETE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_deleted();

-- ============================================================
-- 4. HELPER FUNCTION: Promote an existing auth user to admin
--    Usage: SELECT promote_user_to_admin('user@example.com');
--    Run this once in the Supabase SQL editor after creating your admin
--    account in Authentication → Users.
-- ============================================================
CREATE OR REPLACE FUNCTION public.promote_user_to_admin(user_email TEXT)
RETURNS TEXT AS $$
DECLARE
  target_id UUID;
BEGIN
  SELECT id INTO target_id FROM public.profiles WHERE email = user_email LIMIT 1;

  IF target_id IS NULL THEN
    RETURN 'ERROR: No profile found for email: ' || user_email;
  END IF;

  UPDATE public.profiles SET role = 'admin', updated_at = now() WHERE id = target_id;
  RETURN 'SUCCESS: ' || user_email || ' is now an admin (id=' || target_id || ')';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- 5. HELPER FUNCTION: Check if a given email is admin
--    Usage: SELECT is_user_admin('user@example.com');
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_user_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles WHERE email = user_email AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- 6. GRANT execute permissions on new functions
-- ============================================================
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;
GRANT EXECUTE ON FUNCTION public.handle_user_updated() TO service_role;
GRANT EXECUTE ON FUNCTION public.handle_user_deleted() TO service_role;
GRANT EXECUTE ON FUNCTION public.promote_user_to_admin(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.is_user_admin(TEXT) TO service_role;

-- ============================================================
-- HOW TO CREATE YOUR FIRST ADMIN
-- ============================================================
-- 1. Go to Supabase Dashboard → Authentication → Users → Add User
-- 2. Enter email and password for the admin account
-- 3. In SQL Editor run:
--    SELECT promote_user_to_admin('your-admin@email.com');
-- 4. That's it — the account can now log in to /admin
-- ============================================================
