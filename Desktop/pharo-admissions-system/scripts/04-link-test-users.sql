-- Link the auth users to our users table
-- This script should be run after the auth users are created

-- Get the user IDs from auth.users and insert into our users table
WITH auth_users AS (
  SELECT id, email FROM auth.users 
  WHERE email IN ('admin@pharosecondary.so', 'clerk@pharosecondary.so', 'principal@pharosecondary.so')
)
INSERT INTO users (id, email, role, full_name)
SELECT 
  au.id,
  au.email,
  CASE 
    WHEN au.email = 'admin@pharosecondary.so' THEN 'admin'
    WHEN au.email = 'clerk@pharosecondary.so' THEN 'clerk'
    WHEN au.email = 'principal@pharosecondary.so' THEN 'principal'
  END as role,
  CASE 
    WHEN au.email = 'admin@pharosecondary.so' THEN 'System Administrator'
    WHEN au.email = 'clerk@pharosecondary.so' THEN 'Admissions Clerk'
    WHEN au.email = 'principal@pharosecondary.so' THEN 'School Principal'
  END as full_name
FROM auth_users au
ON CONFLICT (id) DO NOTHING;
