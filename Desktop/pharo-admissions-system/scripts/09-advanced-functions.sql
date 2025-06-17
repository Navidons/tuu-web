-- Advanced functions for enterprise system

-- Function to generate daily analytics
CREATE OR REPLACE FUNCTION generate_daily_analytics(target_date DATE DEFAULT CURRENT_DATE)
RETURNS VOID AS $$
DECLARE
    total_apps INTEGER;
    approved_apps INTEGER;
    rejected_apps INTEGER;
    pending_apps INTEGER;
    deferred_apps INTEGER;
    conversion_rate DECIMAL(5,2);
    avg_processing INTERVAL;
BEGIN
    -- Get application counts for the target date
    SELECT 
        COUNT(*),
        COUNT(*) FILTER (WHERE status = 'approved'),
        COUNT(*) FILTER (WHERE status = 'rejected'),
        COUNT(*) FILTER (WHERE status = 'pending'),
        COUNT(*) FILTER (WHERE status = 'deferred')
    INTO total_apps, approved_apps, rejected_apps, pending_apps, deferred_apps
    FROM applications 
    WHERE DATE(created_at) = target_date;

    -- Calculate conversion rate
    IF total_apps > 0 THEN
        conversion_rate := (approved_apps::DECIMAL / total_apps) * 100;
    ELSE
        conversion_rate := 0;
    END IF;

    -- Calculate average processing time
    SELECT AVG(approved_at - created_at)
    INTO avg_processing
    FROM applications 
    WHERE DATE(created_at) = target_date 
    AND approved_at IS NOT NULL;

    -- Insert or update analytics
    INSERT INTO application_analytics (
        date, total_applications, approved_count, rejected_count, 
        pending_count, deferred_count, conversion_rate, avg_processing_time
    ) VALUES (
        target_date, total_apps, approved_apps, rejected_apps,
        pending_apps, deferred_apps, conversion_rate, avg_processing
    )
    ON CONFLICT (date) DO UPDATE SET
        total_applications = EXCLUDED.total_applications,
        approved_count = EXCLUDED.approved_count,
        rejected_count = EXCLUDED.rejected_count,
        pending_count = EXCLUDED.pending_count,
        deferred_count = EXCLUDED.deferred_count,
        conversion_rate = EXCLUDED.conversion_rate,
        avg_processing_time = EXCLUDED.avg_processing_time;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to queue emails
CREATE OR REPLACE FUNCTION queue_email(
    p_recipient_email TEXT,
    p_recipient_name TEXT,
    p_template_type TEXT,
    p_subject TEXT,
    p_content TEXT,
    p_priority INTEGER DEFAULT 5,
    p_scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
) RETURNS UUID AS $$
DECLARE
    email_id UUID;
BEGIN
    INSERT INTO email_queue (
        recipient_email, recipient_name, template_type, subject, 
        content, priority, scheduled_at
    ) VALUES (
        p_recipient_email, p_recipient_name, p_template_type, 
        p_subject, p_content, p_priority, p_scheduled_at
    ) RETURNING id INTO email_id;
    
    RETURN email_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to process email queue
CREATE OR REPLACE FUNCTION process_email_queue(batch_size INTEGER DEFAULT 10)
RETURNS INTEGER AS $$
DECLARE
    processed_count INTEGER := 0;
    email_record RECORD;
BEGIN
    FOR email_record IN 
        SELECT * FROM email_queue 
        WHERE status = 'pending' 
        AND scheduled_at <= NOW()
        ORDER BY priority DESC, created_at ASC
        LIMIT batch_size
    LOOP
        -- Update status to sending
        UPDATE email_queue 
        SET status = 'sending' 
        WHERE id = email_record.id;
        
        -- Here you would integrate with your email service
        -- For now, we'll mark as sent
        UPDATE email_queue 
        SET status = 'sent', sent_at = NOW() 
        WHERE id = email_record.id;
        
        processed_count := processed_count + 1;
    END LOOP;
    
    RETURN processed_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function for full-text search
CREATE OR REPLACE FUNCTION search_applications(search_query TEXT)
RETURNS TABLE(
    id UUID,
    full_name TEXT,
    email TEXT,
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.full_name,
        a.email,
        a.status,
        a.created_at,
        ts_rank(to_tsvector('english', a.full_name || ' ' || a.email), plainto_tsquery('english', search_query)) as rank
    FROM applications a
    WHERE to_tsvector('english', a.full_name || ' ' || a.email) @@ plainto_tsquery('english', search_query)
    ORDER BY rank DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create system backup
CREATE OR REPLACE FUNCTION create_system_backup(backup_type TEXT)
RETURNS UUID AS $$
DECLARE
    backup_id UUID;
BEGIN
    INSERT INTO system_backups (backup_type)
    VALUES (backup_type)
    RETURNING id INTO backup_id;
    
    -- Here you would implement actual backup logic
    -- For now, we'll simulate completion
    UPDATE system_backups 
    SET status = 'completed', completed_at = NOW()
    WHERE id = backup_id;
    
    RETURN backup_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
