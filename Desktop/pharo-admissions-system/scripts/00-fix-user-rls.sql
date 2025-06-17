-- Create a function to get the user's role without RLS interference
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

-- Recreate policies for users to use the new function

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can manage users" ON public.users;

-- Create policies for users
CREATE POLICY "Users can view all users" ON public.users
    FOR SELECT USING (auth.role() = 'authenticated' AND auth.uid() = id OR public.get_user_role(auth.uid()) IN ('admin', 'principal'));

CREATE POLICY "Admins can manage users" ON public.users
    FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');


ALTER TABLE public.users REPLICA IDENTITY FULL; 