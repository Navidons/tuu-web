-- Ensure RLS is enabled
ALTER TABLE public.archived_applications ENABLE ROW LEVEL SECURITY;

-- Create a more permissive policy for testing (you can remove this later)
CREATE POLICY "Allow all authenticated users to view archived applications"
ON public.archived_applications
FOR SELECT
TO authenticated
USING (true);

-- Verify the policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'archived_applications'; 