-- Create indexes for performance (separate from transaction blocks)
-- This script should be run after the main enterprise settings tables are created

-- Create regular indexes (not concurrent since we're in development)
CREATE INDEX IF NOT EXISTS idx_system_settings_category_key ON system_settings(category, key);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_active ON user_sessions(is_active, last_activity);
CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON system_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_system_logs_category ON system_logs(category);
CREATE INDEX IF NOT EXISTS idx_integration_settings_enabled ON integration_settings(is_enabled);
CREATE INDEX IF NOT EXISTS idx_notification_templates_type ON notification_templates(template_type);
CREATE INDEX IF NOT EXISTS idx_user_roles_active ON user_roles(is_active);
CREATE INDEX IF NOT EXISTS idx_school_configuration_code ON school_configuration(school_code);
CREATE INDEX IF NOT EXISTS idx_email_configuration_provider ON email_configuration(provider);

-- Create composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_system_settings_category_public ON system_settings(category, is_public);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_active ON user_sessions(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_system_logs_level_category ON system_logs(log_level, category);

SELECT 'Enterprise settings indexes created successfully' as result;
