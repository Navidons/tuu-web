-- Test the setup and verify everything is working
SELECT 'Testing database setup...' as status;

-- Check if tables exist
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('applications', 'students', 'users', 'letter_templates');

-- Check if any users exist
SELECT 
    COUNT(*) as user_count,
    'users in users table' as description
FROM users;

-- Check if any auth users exist
SELECT 
    COUNT(*) as auth_user_count,
    'users in auth.users table' as description
FROM auth.users;

-- Show current policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE schemaname = 'public';
