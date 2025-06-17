-- Create indexes for performance (fixed version)
-- This script checks for column existence before creating indexes

DO $$
BEGIN
    -- System Settings indexes
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'system_settings' AND column_name = 'category') THEN
        CREATE INDEX IF NOT EXISTS idx_system_settings_category_key ON system_settings(category, key);
        CREATE INDEX IF NOT EXISTS idx_system_settings_category_public ON system_settings(category, is_public);
        RAISE NOTICE 'Created system_settings indexes';
    END IF;

    -- User Sessions indexes (check if table exists)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_sessions') THEN
        CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_sessions' AND column_name = 'is_active') THEN
            CREATE INDEX IF NOT EXISTS idx_user_sessions_active ON user_sessions(is_active, last_activity);
            CREATE INDEX IF NOT EXISTS idx_user_sessions_user_active ON user_sessions(user_id, is_active);
        END IF;
        RAISE NOTICE 'Created user_sessions indexes';
    END IF;

    -- System Logs indexes (check if table exists)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'system_logs') THEN
        CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON system_logs(created_at);
        CREATE INDEX IF NOT EXISTS idx_system_logs_category ON system_logs(category);
        CREATE INDEX IF NOT EXISTS idx_system_logs_level_category ON system_logs(log_level, category);
        RAISE NOTICE 'Created system_logs indexes';
    END IF;

    -- Integration Settings indexes (check if table exists)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'integration_settings') THEN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'integration_settings' AND column_name = 'is_enabled') THEN
            CREATE INDEX IF NOT EXISTS idx_integration_settings_enabled ON integration_settings(is_enabled);
        END IF;
        RAISE NOTICE 'Created integration_settings indexes';
    END IF;

    -- Notification Templates indexes (check if table exists)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'notification_templates') THEN
        CREATE INDEX IF NOT EXISTS idx_notification_templates_type ON notification_templates(template_type);
        RAISE NOTICE 'Created notification_templates indexes';
    END IF;

    -- User Roles indexes (check if table exists)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_roles') THEN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_roles' AND column_name = 'is_active') THEN
            CREATE INDEX IF NOT EXISTS idx_user_roles_active ON user_roles(is_active);
        END IF;
        RAISE NOTICE 'Created user_roles indexes';
    END IF;

    -- School Configuration indexes (check if table exists)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'school_configuration') THEN
        CREATE INDEX IF NOT EXISTS idx_school_configuration_code ON school_configuration(school_code);
        RAISE NOTICE 'Created school_configuration indexes';
    END IF;

    -- Email Configuration indexes (check if table exists)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'email_configuration') THEN
        CREATE INDEX IF NOT EXISTS idx_email_configuration_provider ON email_configuration(provider);
        RAISE NOTICE 'Created email_configuration indexes';
    END IF;

    -- Applications table indexes (if exists)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'applications') THEN
        CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
        CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at);
        CREATE INDEX IF NOT EXISTS idx_applications_student_id ON applications(student_id);
        RAISE NOTICE 'Created applications indexes';
    END IF;

    -- Students table indexes (if exists)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'students') THEN
        CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
        CREATE INDEX IF NOT EXISTS idx_students_created_at ON students(created_at);
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'phone') THEN
            CREATE INDEX IF NOT EXISTS idx_students_phone ON students(phone);
        END IF;
        RAISE NOTICE 'Created students indexes';
    END IF;

    -- Users table indexes (if exists)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
        CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
        CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
        RAISE NOTICE 'Created users indexes';
    END IF;

    -- Audit logs indexes (if exists)
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'audit_logs') THEN
        CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
        CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
        CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
        RAISE NOTICE 'Created audit_logs indexes';
    END IF;

    RAISE NOTICE 'Enterprise settings indexes created successfully';

EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error creating indexes: %', SQLERRM;
END $$;

-- Create a function to show all created indexes
CREATE OR REPLACE FUNCTION show_enterprise_indexes()
RETURNS TABLE(
    table_name TEXT,
    index_name TEXT,
    column_names TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.tablename::TEXT,
        t.indexname::TEXT,
        array_to_string(
            array_agg(a.attname ORDER BY a.attnum),
            ', '
        )::TEXT as column_names
    FROM pg_indexes t
    JOIN pg_class c ON c.relname = t.indexname
    JOIN pg_index i ON i.indexrelid = c.oid
    JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
    WHERE t.schemaname = 'public'
    AND t.indexname LIKE 'idx_%'
    GROUP BY t.tablename, t.indexname
    ORDER BY t.tablename, t.indexname;
END;
$$ LANGUAGE plpgsql;

-- Show the created indexes
SELECT 'Index creation completed. Run: SELECT * FROM show_enterprise_indexes(); to see all indexes.' as result;
