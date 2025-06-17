-- Enable RLS on archived_applications table
ALTER TABLE public.archived_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing archived applications
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

-- Create policy for viewing archived applications for principals
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

-- Create policy for viewing archived applications for clerks
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