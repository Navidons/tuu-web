-- Create comprehensive enterprise settings tables
DO $$
BEGIN
    -- System Settings Table
    CREATE TABLE IF NOT EXISTS system_settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        category VARCHAR(100) NOT NULL,
        key VARCHAR(200) NOT NULL,
        value TEXT,
        data_type VARCHAR(50) DEFAULT 'string',
        description TEXT,
        is_encrypted BOOLEAN DEFAULT FALSE,
        is_public BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_by UUID REFERENCES auth.users(id),
        UNIQUE(category, key)
    );

    -- School Configuration Table
    CREATE TABLE IF NOT EXISTS school_configuration (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        school_name VARCHAR(255) NOT NULL DEFAULT 'Pharo Secondary School',
        school_code VARCHAR(50) UNIQUE NOT NULL DEFAULT 'PSS',
        academic_year VARCHAR(20) NOT NULL DEFAULT '2024-2025',
        current_term VARCHAR(50) NOT NULL DEFAULT 'Fall 2024',
        admission_term VARCHAR(50) NOT NULL DEFAULT 'Fall 2024',
        school_address TEXT,
        school_phone VARCHAR(50),
        school_email VARCHAR(255),
        school_website VARCHAR(255),
        principal_name VARCHAR(255),
        principal_email VARCHAR(255),
        logo_url TEXT,
        timezone VARCHAR(100) DEFAULT 'UTC',
        currency VARCHAR(10) DEFAULT 'USD',
        language VARCHAR(10) DEFAULT 'en',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Email Configuration Table
    CREATE TABLE IF NOT EXISTS email_configuration (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        provider VARCHAR(50) NOT NULL DEFAULT 'smtp',
        smtp_host VARCHAR(255),
        smtp_port INTEGER DEFAULT 587,
        smtp_username VARCHAR(255),
        smtp_password TEXT, -- Encrypted
        smtp_encryption VARCHAR(20) DEFAULT 'tls',
        from_email VARCHAR(255) NOT NULL,
        from_name VARCHAR(255) NOT NULL DEFAULT 'Pharo Secondary School',
        reply_to_email VARCHAR(255),
        max_daily_emails INTEGER DEFAULT 1000,
        email_queue_enabled BOOLEAN DEFAULT TRUE,
        bounce_handling_enabled BOOLEAN DEFAULT TRUE,
        tracking_enabled BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Application Settings Table
    CREATE TABLE IF NOT EXISTS application_settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        max_applications_per_day INTEGER DEFAULT 100,
        application_deadline DATE,
        late_applications_allowed BOOLEAN DEFAULT FALSE,
        application_fee DECIMAL(10,2) DEFAULT 0.00,
        require_documents BOOLEAN DEFAULT TRUE,
        require_interview BOOLEAN DEFAULT FALSE,
        auto_approval_enabled BOOLEAN DEFAULT FALSE,
        auto_approval_threshold INTEGER DEFAULT 85,
        notification_enabled BOOLEAN DEFAULT TRUE,
        sms_notifications_enabled BOOLEAN DEFAULT FALSE,
        email_notifications_enabled BOOLEAN DEFAULT TRUE,
        application_number_prefix VARCHAR(10) DEFAULT 'APP',
        application_number_format VARCHAR(50) DEFAULT '{prefix}-{year}-{sequence}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- User Roles and Permissions Table (Enhanced)
    CREATE TABLE IF NOT EXISTS user_roles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) UNIQUE NOT NULL,
        display_name VARCHAR(255) NOT NULL,
        description TEXT,
        permissions JSONB DEFAULT '[]',
        is_system_role BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- User Sessions and Security Table
    CREATE TABLE IF NOT EXISTS user_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        session_token VARCHAR(255) UNIQUE NOT NULL,
        ip_address INET,
        user_agent TEXT,
        location VARCHAR(255),
        is_active BOOLEAN DEFAULT TRUE,
        last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        expires_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Security Settings Table
    CREATE TABLE IF NOT EXISTS security_settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        password_min_length INTEGER DEFAULT 8,
        password_require_uppercase BOOLEAN DEFAULT TRUE,
        password_require_lowercase BOOLEAN DEFAULT TRUE,
        password_require_numbers BOOLEAN DEFAULT TRUE,
        password_require_symbols BOOLEAN DEFAULT FALSE,
        password_expiry_days INTEGER DEFAULT 90,
        max_login_attempts INTEGER DEFAULT 5,
        lockout_duration_minutes INTEGER DEFAULT 30,
        session_timeout_minutes INTEGER DEFAULT 480,
        two_factor_required BOOLEAN DEFAULT FALSE,
        ip_whitelist_enabled BOOLEAN DEFAULT FALSE,
        allowed_ip_ranges TEXT[],
        audit_log_retention_days INTEGER DEFAULT 365,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Backup and Maintenance Settings
    CREATE TABLE IF NOT EXISTS backup_settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        auto_backup_enabled BOOLEAN DEFAULT TRUE,
        backup_frequency VARCHAR(20) DEFAULT 'daily',
        backup_time TIME DEFAULT '02:00:00',
        backup_retention_days INTEGER DEFAULT 30,
        backup_location VARCHAR(255),
        backup_encryption_enabled BOOLEAN DEFAULT TRUE,
        maintenance_mode_enabled BOOLEAN DEFAULT FALSE,
        maintenance_message TEXT,
        maintenance_start_time TIMESTAMP WITH TIME ZONE,
        maintenance_end_time TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Integration Settings Table
    CREATE TABLE IF NOT EXISTS integration_settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        integration_name VARCHAR(100) NOT NULL,
        integration_type VARCHAR(50) NOT NULL,
        api_endpoint VARCHAR(500),
        api_key TEXT, -- Encrypted
        api_secret TEXT, -- Encrypted
        webhook_url VARCHAR(500),
        webhook_secret TEXT,
        is_enabled BOOLEAN DEFAULT FALSE,
        configuration JSONB DEFAULT '{}',
        last_sync TIMESTAMP WITH TIME ZONE,
        sync_status VARCHAR(50) DEFAULT 'pending',
        error_message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(integration_name)
    );

    -- Notification Templates Table
    CREATE TABLE IF NOT EXISTS notification_templates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        template_name VARCHAR(100) UNIQUE NOT NULL,
        template_type VARCHAR(50) NOT NULL, -- email, sms, push
        subject VARCHAR(500),
        body_text TEXT,
        body_html TEXT,
        variables JSONB DEFAULT '[]',
        is_active BOOLEAN DEFAULT TRUE,
        is_system_template BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        created_by UUID REFERENCES auth.users(id)
    );

    -- System Logs Table
    CREATE TABLE IF NOT EXISTS system_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        log_level VARCHAR(20) NOT NULL,
        category VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        details JSONB,
        user_id UUID REFERENCES auth.users(id),
        ip_address INET,
        user_agent TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    RAISE NOTICE 'Enterprise settings tables created successfully';

EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error creating enterprise settings tables: %', SQLERRM;
END $$;

-- Insert default system settings
DO $$
BEGIN
    -- School Configuration
    INSERT INTO school_configuration (
        school_name, school_code, academic_year, current_term, admission_term,
        school_address, school_phone, school_email, principal_name
    ) VALUES (
        'Pharo Secondary School',
        'PSS',
        '2024-2025',
        'Fall 2024',
        'Fall 2024',
        '123 Education Street, Mogadishu, Somalia',
        '+252-1-234-5678',
        'info@pharosecondary.so',
        'Dr. Ahmed Hassan'
    ) ON CONFLICT DO NOTHING;

    -- Email Configuration
    INSERT INTO email_configuration (
        from_email, from_name, smtp_host, smtp_port
    ) VALUES (
        'admissions@pharosecondary.so',
        'Pharo Secondary School Admissions',
        'smtp.gmail.com',
        587
    ) ON CONFLICT DO NOTHING;

    -- Application Settings
    INSERT INTO application_settings (
        max_applications_per_day, application_fee, require_documents,
        notification_enabled, email_notifications_enabled
    ) VALUES (
        100, 25.00, TRUE, TRUE, TRUE
    ) ON CONFLICT DO NOTHING;

    -- Default User Roles
    INSERT INTO user_roles (name, display_name, description, permissions, is_system_role) VALUES
    ('super_admin', 'Super Administrator', 'Full system access with all permissions', 
     '["*"]', TRUE),
    ('admin', 'Administrator', 'Administrative access to most system functions',
     '["manage_users", "manage_settings", "view_reports", "manage_applications", "manage_students"]', TRUE),
    ('principal', 'Principal', 'School principal with oversight permissions',
     '["view_reports", "approve_applications", "manage_students", "view_settings"]', TRUE),
    ('clerk', 'Admissions Clerk', 'Basic application management permissions',
     '["create_applications", "edit_applications", "view_applications", "view_students"]', TRUE),
    ('viewer', 'Viewer', 'Read-only access to applications and reports',
     '["view_applications", "view_students", "view_reports"]', TRUE)
    ON CONFLICT (name) DO NOTHING;

    -- Security Settings
    INSERT INTO security_settings (
        password_min_length, max_login_attempts, session_timeout_minutes
    ) VALUES (8, 5, 480) ON CONFLICT DO NOTHING;

    -- Backup Settings
    INSERT INTO backup_settings (
        auto_backup_enabled, backup_frequency, backup_retention_days
    ) VALUES (TRUE, 'daily', 30) ON CONFLICT DO NOTHING;

    -- Default System Settings
    INSERT INTO system_settings (category, key, value, description, is_public) VALUES
    ('general', 'site_title', 'Pharo Secondary School - Admissions', 'Main site title', TRUE),
    ('general', 'site_description', 'Enterprise Admissions Management System', 'Site description', TRUE),
    ('general', 'contact_email', 'support@pharosecondary.so', 'Main contact email', TRUE),
    ('general', 'support_phone', '+252-1-234-5678', 'Support phone number', TRUE),
    ('features', 'ai_assistant_enabled', 'true', 'Enable AI assistant features', FALSE),
    ('features', 'mobile_app_enabled', 'true', 'Enable mobile app features', FALSE),
    ('features', 'real_time_notifications', 'true', 'Enable real-time notifications', FALSE),
    ('performance', 'cache_enabled', 'true', 'Enable application caching', FALSE),
    ('performance', 'max_concurrent_users', '100', 'Maximum concurrent users', FALSE)
    ON CONFLICT (category, key) DO NOTHING;

    -- Default Notification Templates
    INSERT INTO notification_templates (template_name, template_type, subject, body_text, is_system_template) VALUES
    ('application_received', 'email', 'Application Received - {{school_name}}', 
     'Dear {{applicant_name}}, we have received your application. Reference: {{application_number}}', TRUE),
    ('application_approved', 'email', 'Application Approved - {{school_name}}',
     'Congratulations {{applicant_name}}! Your application has been approved.', TRUE),
    ('application_rejected', 'email', 'Application Status Update - {{school_name}}',
     'Dear {{applicant_name}}, thank you for your interest. Unfortunately, we cannot offer admission at this time.', TRUE),
    ('interview_scheduled', 'email', 'Interview Scheduled - {{school_name}}',
     'Dear {{applicant_name}}, your interview has been scheduled for {{interview_date}} at {{interview_time}}.', TRUE)
    ON CONFLICT (template_name) DO NOTHING;

    RAISE NOTICE 'Default enterprise settings data inserted successfully';

EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error inserting default settings: %', SQLERRM;
END $$;

-- Enable Row Level Security
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_configuration ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_configuration ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE backup_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
DO $$
BEGIN
    -- System Settings Policies
    DROP POLICY IF EXISTS "system_settings_admin_access" ON system_settings;
    CREATE POLICY "system_settings_admin_access" ON system_settings
        FOR ALL USING (
            EXISTS (
                SELECT 1 FROM users u 
                WHERE u.id = auth.uid() 
                AND u.role IN ('admin', 'super_admin')
            )
        );

    -- Public settings can be read by authenticated users
    DROP POLICY IF EXISTS "system_settings_public_read" ON system_settings;
    CREATE POLICY "system_settings_public_read" ON system_settings
        FOR SELECT USING (is_public = TRUE AND auth.uid() IS NOT NULL);

    -- Similar policies for other tables
    DROP POLICY IF EXISTS "school_config_admin_access" ON school_configuration;
    CREATE POLICY "school_config_admin_access" ON school_configuration
        FOR ALL USING (
            EXISTS (
                SELECT 1 FROM users u 
                WHERE u.id = auth.uid() 
                AND u.role IN ('admin', 'super_admin', 'principal')
            )
        );

    RAISE NOTICE 'RLS policies created successfully';

EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error creating RLS policies: %', SQLERRM;
END $$;
