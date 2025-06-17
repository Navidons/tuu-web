-- Start a transaction to ensure atomicity
BEGIN;

-- Temporarily disable RLS for public.users table
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies on public.users to ensure a clean slate
DROP POLICY IF EXISTS "Users can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can manage users" ON public.users;

-- Re-enable RLS for public.users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Recreate the get_user_role function with SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.get_user_role(p_user_id UUID) RETURNS TEXT LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    user_role TEXT;
BEGIN
    -- IMPORTANT: This SELECT statement within a SECURITY DEFINER function
    -- bypasses RLS on the users table, preventing infinite recursion.
    SELECT role INTO user_role FROM public.users WHERE id = p_user_id;
    RETURN user_role;
END;
$$;

-- Grant execute permissions to authenticated users for the function
-- This is crucial for the function to be callable by authenticated users.
GRANT EXECUTE ON FUNCTION public.get_user_role(UUID) TO authenticated;

-- Recreate policies for public.users using the new function
-- Policy for users to view themselves or for admins/principals to view all users
CREATE POLICY "Users can view all users" ON public.users
    FOR SELECT USING (
        auth.uid() = id OR public.get_user_role(auth.uid()) IN ('admin', 'principal')
    );

-- Policy for admins to manage (insert, update, delete) users
CREATE POLICY "Admins can manage users" ON public.users
    FOR ALL USING (
        public.get_user_role(auth.uid()) = 'admin'
    );

-- Ensure replica identity is set to FULL (important for some operations like Change Data Capture)
ALTER TABLE public.users REPLICA IDENTITY FULL;

-- Commit the transaction
COMMIT; 