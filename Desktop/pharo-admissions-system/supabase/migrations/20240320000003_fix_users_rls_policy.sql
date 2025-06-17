-- Enable RLS on the users table if not already enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop any existing conflicting policies for SELECT operations on the users table (optional, but safe for this scenario)
DROP POLICY IF EXISTS "Allow authenticated users to select their own user record" ON public.users;

-- Create a new RLS policy for SELECT operations on the users table
CREATE POLICY "Allow authenticated users to select their own user record"
ON public.users
FOR SELECT
TO authenticated
USING (auth.uid() = id); 