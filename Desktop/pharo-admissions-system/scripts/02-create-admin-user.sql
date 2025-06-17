-- Insert admin user immediately after table creation
-- This ensures the first logged-in user gets admin privileges

-- Function to create admin user if not exists
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void AS $$
DECLARE
    admin_email TEXT := 'admin@pharoschool.com';
    admin_user_id UUID;
BEGIN
    -- Get the user ID from auth.users if exists
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = admin_email 
    LIMIT 1;
    
    -- If we found a user, insert them into our users table as admin
    IF admin_user_id IS NOT NULL THEN
        INSERT INTO users (id, email, role, full_name, created_at, updated_at)
        VALUES (
            admin_user_id,
            admin_email,
            'admin',
            'System Administrator',
            NOW(),
            NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
            role = 'admin',
            updated_at = NOW();
        
        RAISE NOTICE 'Admin user created/updated successfully';
    ELSE
        RAISE NOTICE 'No auth user found with email: %', admin_email;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Execute the function
SELECT create_admin_user();
