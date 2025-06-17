-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view archived applications" ON public.archived_applications;
DROP POLICY IF EXISTS "Principals can view archived applications" ON public.archived_applications;
DROP POLICY IF EXISTS "Clerks can view archived applications" ON public.archived_applications;

-- Recreate policies with updated conditions
CREATE POLICY "Admins can view archived applications"
ON public.archived_applications
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.role = 'admin'
  )
);

CREATE POLICY "Principals can view archived applications"
ON public.archived_applications
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.role = 'principal'
  )
);

CREATE POLICY "Clerks can view archived applications"
ON public.archived_applications
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.role = 'clerk'
  )
); 