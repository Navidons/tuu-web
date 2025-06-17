-- Create a function to handle admin user creation without RLS issues
CREATE OR REPLACE FUNCTION create_admin_user_safe(user_email TEXT, user_password TEXT, user_full_name TEXT DEFAULT NULL)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_user_id UUID;
    existing_user_id UUID;
BEGIN
    -- Check if user already exists in auth.users
    SELECT id INTO existing_user_id 
    FROM auth.users 
    WHERE email = user_email;
    
    IF existing_user_id IS NOT NULL THEN
        -- User exists, just ensure they're in our users table
        INSERT INTO users (id, email, role, full_name)
        VALUES (existing_user_id, user_email, 'admin', user_full_name)
        ON CONFLICT (id) DO UPDATE SET
            role = 'admin',
            full_name = COALESCE(user_full_name, users.full_name),
            updated_at = NOW();
        
        RETURN 'Admin user updated: ' || user_email;
    END IF;
    
    -- Create new user (this would typically be done through Supabase Auth)
    -- For now, we'll just return instructions
    RETURN 'Please create user ' || user_email || ' through Supabase Auth dashboard, then run this function again';
END;
$$;

-- Create a function to add existing auth users to our users table
CREATE OR REPLACE FUNCTION sync_auth_users()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    auth_user RECORD;
    result_text TEXT := '';
BEGIN
    -- Loop through all authenticated users and add them to our users table
    FOR auth_user IN 
        SELECT id, email, created_at
        FROM auth.users
    LOOP
        INSERT INTO users (id, email, role, created_at)
        VALUES (auth_user.id, auth_user.email, 'admin', auth_user.created_at)
        ON CONFLICT (id) DO UPDATE SET
            email = auth_user.email,
            updated_at = NOW();
        
        result_text := result_text || 'Synced user: ' || auth_user.email || '; ';
    END LOOP;
    
    IF result_text = '' THEN
        RETURN 'No auth users found to sync';
    END IF;
    
    RETURN result_text;
END;
$$;

-- Run the sync function to add any existing users
SELECT sync_auth_users();
