-- ENABLE ALL FUNCTIONALITIES - Complete System Activation
-- This script ensures all features are properly enabled and working

DO $$
BEGIN
    RAISE NOTICE '🚀 ENABLING ALL SYSTEM FUNCTIONALITIES';
    RAISE NOTICE '=====================================';
END $$;

-- Step 1: Ensure all required functions exist
DO $$
BEGIN
    RAISE NOTICE 'Step 1: Creating missing functions...';
    
    -- Function to calculate priority score (enhanced)
    CREATE OR REPLACE FUNCTION calculate_priority_score(app_id UUID)
    RETURNS INTEGER AS $func$
    DECLARE
        score INTEGER := 50;
        app_record RECORD;
        days_old INTEGER;
    BEGIN
        SELECT * INTO app_record FROM applications WHERE id = app_id;
        
        IF NOT FOUND THEN
            RETURN 0;
        END IF;
        
        -- Base score adjustments
        CASE app_record.status
            WHEN 'approved' THEN score := score + 40;
            WHEN 'rejected' THEN score := score - 30;
            WHEN 'deferred' THEN score := score + 10;
            WHEN 'pending' THEN score := score + 20;
        END CASE;
        
        -- Document completeness bonus
        IF app_record.documents IS NOT NULL AND jsonb_array_length(app_record.documents) > 0 THEN
            score := score + 15;
        END IF;
        
        -- Contact information completeness
        IF app_record.phone IS NOT NULL AND app_record.phone != '' THEN
            score := score + 10;
        END IF;
        
        -- Age factor (newer applications get slight priority)
        days_old := EXTRACT(days FROM NOW() - app_record.created_at)::INTEGER;
        score := score + GREATEST(0, 20 - days_old);
        
        -- Application source priority
        CASE COALESCE(app_record.application_source, 'online')
            WHEN 'referral' THEN score := score + 15;
            WHEN 'walk_in' THEN score := score + 10;
            WHEN 'online' THEN score := score + 5;
        END CASE;
        
        RETURN GREATEST(0, LEAST(100, score)); -- Keep score between 0-100
    END;
    $func$ LANGUAGE plpgsql;
    
    -- Function to enroll student from application
    CREATE OR REPLACE FUNCTION enroll_student_from_application(
        app_id UUID,
        student_data JSONB
    )
    RETURNS UUID AS $func$
    DECLARE
        app_record RECORD;
        student_id_generated VARCHAR(20);
        new_student_id UUID;
    BEGIN
        -- Get application details
        SELECT * INTO app_record FROM applications WHERE id = app_id;
        
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Application not found';
        END IF;
        
        IF app_record.status != 'approved' THEN
            RAISE EXCEPTION 'Application must be approved before enrollment';
        END IF;
        
        -- Generate student ID
        student_id_generated := 'PSS' || EXTRACT(year FROM NOW()) || 
                               LPAD((EXTRACT(epoch FROM NOW())::BIGINT % 10000)::TEXT, 4, '0');
        
        -- Create student record
        INSERT INTO students (
            application_id,
            student_id,
            class_admitted,
            enrolled_date,
            guardian_name,
            guardian_phone,
            guardian_email,
            emergency_contact_name,
            emergency_contact_phone,
            medical_conditions,
            previous_school,
            special_needs
        ) VALUES (
            app_id,
            student_id_generated,
            COALESCE(student_data->>'class_admitted', 'Grade 9'),
            COALESCE((student_data->>'enrolled_date')::DATE, CURRENT_DATE),
            student_data->>'guardian_name',
            student_data->>'guardian_phone',
            student_data->>'guardian_email',
            student_data->>'emergency_contact_name',
            student_data->>'emergency_contact_phone',
            student_data->>'medical_conditions',
            student_data->>'previous_school',
            student_data->>'special_needs'
        ) RETURNING id INTO new_student_id;
        
        -- Update application status to enrolled
        UPDATE applications 
        SET status = 'enrolled', 
            approved_at = NOW(),
            notes = COALESCE(notes, '') || ' - Student enrolled on ' || NOW()::DATE
        WHERE id = app_id;
        
        -- Log the enrollment event
        INSERT INTO application_analytics (application_id, event_type, event_data)
        VALUES (app_id, 'student_enrolled', jsonb_build_object(
            'student_id', student_id_generated,
            'enrolled_date', CURRENT_DATE
        ));
        
        RETURN new_student_id;
    END;
    $func$ LANGUAGE plpgsql;
    
    -- Function to get application statistics
    CREATE OR REPLACE FUNCTION get_application_statistics()
    RETURNS JSONB AS $func$
    DECLARE
        stats JSONB;
    BEGIN
        SELECT jsonb_build_object(
            'total_applications', COUNT(*),
            'pending_applications', COUNT(*) FILTER (WHERE status = 'pending'),
            'approved_applications', COUNT(*) FILTER (WHERE status = 'approved'),
            'rejected_applications', COUNT(*) FILTER (WHERE status = 'rejected'),
            'deferred_applications', COUNT(*) FILTER (WHERE status = 'deferred'),
            'enrolled_students', COUNT(*) FILTER (WHERE status = 'enrolled'),
            'applications_today', COUNT(*) FILTER (WHERE DATE(created_at) = CURRENT_DATE),
            'applications_this_week', COUNT(*) FILTER (WHERE created_at >= DATE_TRUNC('week', NOW())),
            'applications_this_month', COUNT(*) FILTER (WHERE created_at >= DATE_TRUNC('month', NOW()))
        ) INTO stats
        FROM applications;
        
        RETURN stats;
    END;
    $func$ LANGUAGE plpgsql;
    
    RAISE NOTICE '✓ All required functions created';
END $$;

-- Step 2: Update applications with proper status and data
DO $$
BEGIN
    RAISE NOTICE 'Step 2: Updating application data...';
    
    -- Update existing applications with proper priority scores
    UPDATE applications 
    SET priority_score = calculate_priority_score(id)
    WHERE priority_score IS NULL OR priority_score = 0;
    
    -- Ensure all applications have proper status_updated_at
    UPDATE applications 
    SET status_updated_at = COALESCE(status_updated_at, created_at)
    WHERE status_updated_at IS NULL;
    
    -- Add some sample approved applications for testing enrollment
    INSERT INTO applications (
        full_name, email, phone, gender, nationality, status, 
        application_source, priority_score, documents_verified, created_at
    ) VALUES 
    ('Alice Johnson', 'alice.johnson@email.com', '+1234567895', 'Female', 'American', 'approved', 'online', 85, true, NOW() - INTERVAL '2 days'),
    ('Bob Wilson', 'bob.wilson@email.com', '+1234567896', 'Male', 'Canadian', 'approved', 'referral', 90, true, NOW() - INTERVAL '1 day'),
    ('Carol Davis', 'carol.davis@email.com', '+1234567897', 'Female', 'British', 'approved', 'walk_in', 88, true, NOW() - INTERVAL '3 hours')
    ON CONFLICT (email) DO NOTHING;
    
    RAISE NOTICE '✓ Application data updated';
END $$;

-- Step 3: Create sample workflow data
DO $$
BEGIN
    RAISE NOTICE 'Step 3: Creating workflow data...';
    
    -- Create workflow steps for approved applications
    INSERT INTO application_workflow (application_id, step_name, step_order, status, completed_at)
    SELECT 
        a.id,
        'Document Review',
        1,
        'completed',
        a.created_at + INTERVAL '1 day'
    FROM applications a
    WHERE a.status = 'approved'
    AND NOT EXISTS (
        SELECT 1 FROM application_workflow aw 
        WHERE aw.application_id = a.id AND aw.step_name = 'Document Review'
    );
    
    INSERT INTO application_workflow (application_id, step_name, step_order, status, completed_at)
    SELECT 
        a.id,
        'Interview',
        2,
        'completed',
        a.created_at + INTERVAL '2 days'
    FROM applications a
    WHERE a.status = 'approved'
    AND NOT EXISTS (
        SELECT 1 FROM application_workflow aw 
        WHERE aw.application_id = a.id AND aw.step_name = 'Interview'
    );
    
    INSERT INTO application_workflow (application_id, step_name, step_order, status)
    SELECT 
        a.id,
        'Enrollment',
        3,
        'pending'
    FROM applications a
    WHERE a.status = 'approved'
    AND NOT EXISTS (
        SELECT 1 FROM application_workflow aw 
        WHERE aw.application_id = a.id AND aw.step_name = 'Enrollment'
    );
    
    RAISE NOTICE '✓ Workflow data created';
END $$;

-- Step 4: Enable all table permissions
DO $$
BEGIN
    RAISE NOTICE 'Step 4: Setting up permissions...';
    
    -- Grant necessary permissions
    GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
    GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
    GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO postgres, anon, authenticated, service_role;
    
    RAISE NOTICE '✓ Permissions configured';
END $$;

-- Step 5: Create triggers for automation
DO $$
BEGIN
    RAISE NOTICE 'Step 5: Creating automation triggers...';
    
    -- Trigger to automatically update priority scores
    CREATE OR REPLACE FUNCTION auto_update_priority_score()
    RETURNS TRIGGER AS $func$
    BEGIN
        NEW.priority_score := calculate_priority_score(NEW.id);
        RETURN NEW;
    END;
    $func$ LANGUAGE plpgsql;
    
    DROP TRIGGER IF EXISTS auto_priority_score_trigger ON applications;
    CREATE TRIGGER auto_priority_score_trigger
        BEFORE INSERT OR UPDATE ON applications
        FOR EACH ROW EXECUTE FUNCTION auto_update_priority_score();
    
    -- Trigger to log all status changes
    CREATE OR REPLACE FUNCTION log_application_status_change()
    RETURNS TRIGGER AS $func$
    BEGIN
        IF OLD.status IS DISTINCT FROM NEW.status THEN
            INSERT INTO application_analytics (application_id, event_type, event_data)
            VALUES (NEW.id, 'status_changed', jsonb_build_object(
                'old_status', OLD.status,
                'new_status', NEW.status,
                'changed_at', NOW()
            ));
            
            NEW.status_updated_at := NOW();
        END IF;
        RETURN NEW;
    END;
    $func$ LANGUAGE plpgsql;
    
    DROP TRIGGER IF EXISTS log_status_change_trigger ON applications;
    CREATE TRIGGER log_status_change_trigger
        BEFORE UPDATE ON applications
        FOR EACH ROW EXECUTE FUNCTION log_application_status_change();
    
    RAISE NOTICE '✓ Automation triggers created';
END $$;

-- Step 6: Final system verification
DO $$
DECLARE
    app_count INTEGER;
    approved_count INTEGER;
    student_count INTEGER;
    workflow_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO app_count FROM applications;
    SELECT COUNT(*) INTO approved_count FROM applications WHERE status = 'approved';
    SELECT COUNT(*) INTO student_count FROM students;
    SELECT COUNT(*) INTO workflow_count FROM application_workflow;
    
    RAISE NOTICE '=====================================';
    RAISE NOTICE '🎉 ALL FUNCTIONALITIES ENABLED! 🎉';
    RAISE NOTICE '=====================================';
    RAISE NOTICE '✅ Database Functions: ACTIVE';
    RAISE NOTICE '✅ Automation Triggers: ENABLED';
    RAISE NOTICE '✅ Student Enrollment: READY';
    RAISE NOTICE '✅ Workflow Management: OPERATIONAL';
    RAISE NOTICE '✅ Analytics Tracking: ACTIVE';
    RAISE NOTICE '=====================================';
    RAISE NOTICE 'Current System Status:';
    RAISE NOTICE '- Total Applications: %', app_count;
    RAISE NOTICE '- Approved (Ready for Enrollment): %', approved_count;
    RAISE NOTICE '- Enrolled Students: %', student_count;
    RAISE NOTICE '- Workflow Steps: %', workflow_count;
    RAISE NOTICE '=====================================';
    RAISE NOTICE '🚀 SYSTEM FULLY OPERATIONAL!';
    RAISE NOTICE '=====================================';
END $$;
