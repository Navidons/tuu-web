-- Temporarily disable RLS for users table
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to ensure a clean slate
DROP POLICY IF EXISTS "Users can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can manage users" ON public.users;

-- Re-enable RLS for users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Recreate the get_user_role function (safe to re-run)
CREATE OR REPLACE FUNCTION public.get_user_role(p_user_id UUID) RETURNS TEXT LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role INTO user_role FROM public.users WHERE id = p_user_id;
    RETURN user_role;
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_role(UUID) TO authenticated;

-- Recreate policies for users using the new function
CREATE POLICY "Users can view all users" ON public.users
    FOR SELECT USING (auth.role() = 'authenticated' AND auth.uid() = id OR public.get_user_role(auth.uid()) IN ('admin', 'principal'));

CREATE POLICY "Admins can manage users" ON public.users
    FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Ensure replica identity is set (important for some operations like CDC)
ALTER TABLE public.users REPLICA IDENTITY FULL; 