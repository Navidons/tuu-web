-- Function to create audit log entries (with error handling)
CREATE OR REPLACE FUNCTION create_audit_log(
    p_action TEXT,
    p_table_name TEXT,
    p_record_id UUID DEFAULT NULL,
    p_old_values JSONB DEFAULT NULL,
    p_new_values JSONB DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
    audit_id UUID;
    current_user_id UUID;
BEGIN
    -- Get current user ID safely
    BEGIN
        current_user_id := auth.uid();
    EXCEPTION WHEN OTHERS THEN
        current_user_id := NULL;
    END;

    -- Insert audit log entry
    BEGIN
        INSERT INTO audit_logs (
            user_id,
            action,
            table_name,
            record_id,
            old_values,
            new_values,
            ip_address,
            created_at
        ) VALUES (
            current_user_id,
            p_action,
            p_table_name,
            p_record_id,
            p_old_values,
            p_new_values,
            inet_client_addr(),
            NOW()
        ) RETURNING id INTO audit_id;
        
        RETURN audit_id;
    EXCEPTION WHEN OTHERS THEN
        -- Return a dummy UUID if audit logging fails
        RETURN gen_random_uuid();
    END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create notifications
CREATE OR REPLACE FUNCTION create_notification(
    p_user_id UUID,
    p_type TEXT,
    p_title TEXT,
    p_message TEXT,
    p_data JSONB DEFAULT '{}'::jsonb,
    p_priority TEXT DEFAULT 'normal'
) RETURNS UUID AS $$
DECLARE
    notification_id UUID;
BEGIN
    INSERT INTO notifications (
        user_id,
        type,
        title,
        message,
        data,
        priority
    ) VALUES (
        p_user_id,
        p_type,
        p_title,
        p_message,
        p_data,
        p_priority
    ) RETURNING id INTO notification_id;
    
    -- Notify via pg_notify for real-time updates
    PERFORM pg_notify('notification_' || p_user_id::text, notification_id::text);
    
    RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check user permissions
CREATE OR REPLACE FUNCTION check_user_permission(
    p_user_id UUID,
    p_permission TEXT
) RETURNS BOOLEAN AS $$
DECLARE
    user_role TEXT;
    user_permissions JSONB;
BEGIN
    SELECT role, permissions INTO user_role, user_permissions
    FROM users WHERE id = p_user_id;
    
    -- Admin has all permissions
    IF user_role = 'admin' THEN
        RETURN TRUE;
    END IF;
    
    -- Check specific permission
    IF user_permissions ? p_permission THEN
        RETURN (user_permissions->p_permission)::boolean;
    END IF;
    
    -- Default role-based permissions
    CASE user_role
        WHEN 'principal' THEN
            RETURN p_permission IN ('approve_applications', 'view_reports', 'manage_students');
        WHEN 'clerk' THEN
            RETURN p_permission IN ('create_applications', 'edit_applications', 'view_applications');
        WHEN 'viewer' THEN
            RETURN p_permission IN ('view_applications', 'view_reports');
        ELSE
            RETURN FALSE;
    END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger function for audit logging
CREATE OR REPLACE FUNCTION audit_trigger_function() RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        PERFORM create_audit_log('INSERT', TG_TABLE_NAME, NEW.id, NULL, to_jsonb(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        PERFORM create_audit_log('UPDATE', TG_TABLE_NAME, NEW.id, to_jsonb(OLD), to_jsonb(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        PERFORM create_audit_log('DELETE', TG_TABLE_NAME, OLD.id, to_jsonb(OLD), NULL);
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create audit triggers
DROP TRIGGER IF EXISTS audit_applications_trigger ON applications;
CREATE TRIGGER audit_applications_trigger
    AFTER INSERT OR UPDATE OR DELETE ON applications
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

DROP TRIGGER IF EXISTS audit_users_trigger ON users;
CREATE TRIGGER audit_users_trigger
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

DROP TRIGGER IF EXISTS audit_students_trigger ON students;
CREATE TRIGGER audit_students_trigger
    AFTER INSERT OR UPDATE OR DELETE ON students
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
