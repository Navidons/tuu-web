-- Drop the existing function first
DROP FUNCTION IF EXISTS delete_application(UUID);

-- Create a function to handle application deletion and archiving
CREATE OR REPLACE FUNCTION delete_application(
    p_application_id UUID,
    p_archived_by UUID DEFAULT NULL,
    p_archived_reason TEXT DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_application_record applications%ROWTYPE;
    v_comments_data JSONB;
    v_notifications_data JSONB;
BEGIN
    -- Check if application exists and retrieve its data
    SELECT * INTO v_application_record FROM applications WHERE id = p_application_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Application not found';
    END IF;

    -- Collect related comments
    SELECT jsonb_agg(row_to_json(ac.*)) INTO v_comments_data
    FROM application_comments ac WHERE ac.application_id = p_application_id;

    -- Collect related notifications
    SELECT jsonb_agg(row_to_json(n.*)) INTO v_notifications_data
    FROM notifications n WHERE n.type = 'application' AND (n.data->>'application_id')::uuid = p_application_id;

    -- Insert into archived_applications
    INSERT INTO archived_applications (
        id,
        original_application_id,
        full_name,
        email,
        phone,
        dob,
        gender,
        nationality,
        documents,
        status,
        created_at,
        approved_by,
        approved_at,
        notes,
        priority,
        assigned_to,
        deadline,
        last_activity,
        metadata,
        archived_at,
        archived_by,
        archived_reason
    ) VALUES (
        gen_random_uuid(), -- New UUID for the archived record
        v_application_record.id,
        v_application_record.full_name,
        v_application_record.email,
        v_application_record.phone,
        v_application_record.dob,
        v_application_record.gender,
        v_application_record.nationality,
        v_application_record.documents,
        v_application_record.status,
        v_application_record.created_at,
        v_application_record.approved_by,
        v_application_record.approved_at,
        v_application_record.notes,
        v_application_record.priority,
        v_application_record.assigned_to,
        v_application_record.deadline,
        v_application_record.last_activity,
        jsonb_build_object(
            'original_metadata', v_application_record.metadata,
            'archived_comments', v_comments_data,
            'archived_notifications', v_notifications_data
        ),
        NOW(),
        p_archived_by,
        p_archived_reason
    );

    -- Now delete the original records
    DELETE FROM application_comments WHERE application_id = p_application_id;
    DELETE FROM notifications WHERE type = 'application' AND (data->>'application_id')::uuid = p_application_id;
    DELETE FROM applications WHERE id = p_application_id;

    RETURN;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to delete and archive application: %', SQLERRM;
END;
$$; 