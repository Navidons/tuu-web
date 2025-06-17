-- Fix the infinite recursion in RLS policies
-- Drop all existing policies first
DROP POLICY IF EXISTS "Users can view all applications" ON applications;
DROP POLICY IF EXISTS "Admins can insert applications" ON applications;
DROP POLICY IF EXISTS "Admins can update applications" ON applications;
DROP POLICY IF EXISTS "Users can view all students" ON students;
DROP POLICY IF EXISTS "Admins can manage students" ON students;
DROP POLICY IF EXISTS "Users can view all users" ON users;
DROP POLICY IF EXISTS "Admins can manage users" ON users;
DROP POLICY IF EXISTS "Users can view letter templates" ON letter_templates;
DROP POLICY IF EXISTS "Admins can manage letter templates" ON letter_templates;

-- Temporarily disable RLS on users table to avoid recursion
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Create simple policies that don't cause recursion
-- Applications policies
CREATE POLICY "Authenticated users can view applications" ON applications
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert applications" ON applications
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update applications" ON applications
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete applications" ON applications
    FOR DELETE USING (auth.role() = 'authenticated');

-- Students policies
CREATE POLICY "Authenticated users can view students" ON students
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage students" ON students
    FOR ALL USING (auth.role() = 'authenticated');

-- Letter templates policies
CREATE POLICY "Authenticated users can view letter templates" ON letter_templates
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage letter templates" ON letter_templates
    FOR ALL USING (auth.role() = 'authenticated');

-- Users table - keep RLS disabled for now to avoid recursion
-- We'll handle permissions in the application layer instead
