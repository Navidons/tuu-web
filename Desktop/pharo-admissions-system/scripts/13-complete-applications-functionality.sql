-- Complete Applications Functionality Database Setup
-- This script ensures all tables and functions needed for full applications functionality

-- Create missing columns in applications table
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS priority_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS interview_scheduled BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS interview_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS interview_notes TEXT,
ADD COLUMN IF NOT EXISTS application_source VARCHAR(50) DEFAULT 'online',
ADD COLUMN IF NOT EXISTS referral_source VARCHAR(100),
ADD COLUMN IF NOT EXISTS academic_year VARCHAR(10) DEFAULT '2024-2025';

-- Create application comments table
CREATE TABLE IF NOT EXISTS application_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    comment TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create application analytics table
CREATE TABLE IF NOT EXISTS application_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL, -- 'viewed', 'status_changed', 'document_uploaded', etc.
    event_data JSONB,
    user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create email queue table
CREATE TABLE IF NOT EXISTS email_queue (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    recipient_email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    body TEXT NOT NULL,
    template_type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'sent', 'failed'
    sent_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced students table with all enrollment fields
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS guardian_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS guardian_phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS guardian_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS emergency_contact VARCHAR(255),
ADD COLUMN IF NOT EXISTS emergency_phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS medical_info TEXT,
ADD COLUMN IF NOT EXISTS previous_school VARCHAR(255),
ADD COLUMN IF NOT EXISTS transport_mode VARCHAR(50) DEFAULT 'walking',
ADD COLUMN IF NOT EXISTS uniform_size VARCHAR(10) DEFAULT 'M',
ADD COLUMN IF NOT EXISTS special_needs TEXT,
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';

-- Create student fees table
CREATE TABLE IF NOT EXISTS student_fees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id VARCHAR(20) NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    paid_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    balance_amount DECIMAL(10,2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'partial', 'paid', 'overdue'
    due_date DATE,
    payment_plan VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create student attendance table
CREATE TABLE IF NOT EXISTS student_attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id VARCHAR(20) NOT NULL,
    attendance_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'present', -- 'present', 'absent', 'late', 'excused'
    notes TEXT,
    marked_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, attendance_date)
);

-- Create application workflow states table
CREATE TABLE IF NOT EXISTS application_workflow_states (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    state VARCHAR(50) NOT NULL,
    entered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    exited_at TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER,
    notes TEXT,
    user_id UUID REFERENCES auth.users(id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at);
CREATE INDEX IF NOT EXISTS idx_applications_priority_score ON applications(priority_score DESC);
CREATE INDEX IF NOT EXISTS idx_applications_academic_year ON applications(academic_year);
CREATE INDEX IF NOT EXISTS idx_application_comments_application_id ON application_comments(application_id);
CREATE INDEX IF NOT EXISTS idx_application_analytics_application_id ON application_analytics(application_id);
CREATE INDEX IF NOT EXISTS idx_application_analytics_event_type ON application_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_email_queue_status ON email_queue(status);
CREATE INDEX IF NOT EXISTS idx_students_student_id ON students(student_id);
CREATE INDEX IF NOT EXISTS idx_students_class_admitted ON students(class_admitted);
CREATE INDEX IF NOT EXISTS idx_student_fees_student_id ON student_fees(student_id);
CREATE INDEX IF NOT EXISTS idx_student_attendance_student_id ON student_attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_student_attendance_date ON student_attendance(attendance_date);

-- Function to calculate application priority score
CREATE OR REPLACE FUNCTION calculate_priority_score(app_id UUID)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
    app_record RECORD;
    days_since_application INTEGER;
BEGIN
    SELECT * INTO app_record FROM applications WHERE id = app_id;
    
    IF NOT FOUND THEN
        RETURN 0;
    END IF;
    
    -- Base score
    score := 50;
    
    -- Time factor (older applications get higher priority)
    days_since_application := EXTRACT(DAY FROM NOW() - app_record.created_at);
    score := score + LEAST(days_since_application * 2, 30);
    
    -- Document completeness
    IF app_record.documents IS NOT NULL AND jsonb_array_length(app_record.documents) > 0 THEN
        score := score + 20;
    END IF;
    
    -- Contact information completeness
    IF app_record.phone IS NOT NULL THEN
        score := score + 5;
    END IF;
    
    -- Application source priority
    CASE app_record.application_source
        WHEN 'referral' THEN score := score + 15;
        WHEN 'walk_in' THEN score := score + 10;
        WHEN 'online' THEN score := score + 5;
        ELSE score := score;
    END CASE;
    
    RETURN score;
END;
$$ LANGUAGE plpgsql;

-- Function to update priority scores for all applications
CREATE OR REPLACE FUNCTION update_all_priority_scores()
RETURNS INTEGER AS $$
DECLARE
    updated_count INTEGER := 0;
    app_record RECORD;
BEGIN
    FOR app_record IN SELECT id FROM applications WHERE status = 'pending' LOOP
        UPDATE applications 
        SET priority_score = calculate_priority_score(app_record.id)
        WHERE id = app_record.id;
        updated_count := updated_count + 1;
    END LOOP;
    
    RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- Function to log application events
CREATE OR REPLACE FUNCTION log_application_event(
    app_id UUID,
    event_type VARCHAR(50),
    event_data JSONB DEFAULT NULL,
    user_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    event_id UUID;
BEGIN
    INSERT INTO application_analytics (application_id, event_type, event_data, user_id)
    VALUES (app_id, event_type, event_data, user_id)
    RETURNING id INTO event_id;
    
    RETURN event_id;
END;
$$ LANGUAGE plpgsql;

-- Function to queue email
CREATE OR REPLACE FUNCTION queue_email(
    app_id UUID,
    recipient VARCHAR(255),
    email_subject VARCHAR(500),
    email_body TEXT,
    template_type VARCHAR(50) DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    email_id UUID;
BEGIN
    INSERT INTO email_queue (application_id, recipient_email, subject, body, template_type)
    VALUES (app_id, recipient, email_subject, email_body, template_type)
    RETURNING id INTO email_id;
    
    RETURN email_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update priority score when application is updated
CREATE OR REPLACE FUNCTION trigger_update_priority_score()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'pending' THEN
        NEW.priority_score := calculate_priority_score(NEW.id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_priority_score_trigger ON applications;
CREATE TRIGGER update_priority_score_trigger
    BEFORE UPDATE ON applications
    FOR EACH ROW
    EXECUTE FUNCTION trigger_update_priority_score();

-- Trigger to log status changes
CREATE OR REPLACE FUNCTION trigger_log_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        PERFORM log_application_event(
            NEW.id,
            'status_changed',
            jsonb_build_object(
                'old_status', OLD.status,
                'new_status', NEW.status,
                'changed_by', NEW.approved_by
            ),
            NEW.approved_by
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS log_status_change_trigger ON applications;
CREATE TRIGGER log_status_change_trigger
    AFTER UPDATE ON applications
    FOR EACH ROW
    EXECUTE FUNCTION trigger_log_status_change();

-- Enable RLS on new tables
ALTER TABLE application_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_workflow_states ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for new tables
CREATE POLICY "Users can view application comments" ON application_comments
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert application comments" ON application_comments
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can view application analytics" ON application_analytics
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert application analytics" ON application_analytics
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can view email queue" ON email_queue
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can manage email queue" ON email_queue
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can view student fees" ON student_fees
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can manage student fees" ON student_fees
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can view student attendance" ON student_attendance
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can manage student attendance" ON student_attendance
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can view workflow states" ON application_workflow_states
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can manage workflow states" ON application_workflow_states
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data for testing
INSERT INTO applications (full_name, email, phone, gender, nationality, status, application_source, priority_score)
VALUES 
    ('John Doe', 'john.doe@email.com', '+1234567890', 'Male', 'American', 'pending', 'online', 75),
    ('Jane Smith', 'jane.smith@email.com', '+1234567891', 'Female', 'Canadian', 'pending', 'referral', 85),
    ('Mike Johnson', 'mike.johnson@email.com', '+1234567892', 'Male', 'British', 'approved', 'walk_in', 90),
    ('Sarah Wilson', 'sarah.wilson@email.com', '+1234567893', 'Female', 'Australian', 'pending', 'online', 70),
    ('David Brown', 'david.brown@email.com', '+1234567894', 'Male', 'South African', 'deferred', 'referral', 80)
ON CONFLICT (email) DO NOTHING;

-- Update priority scores for all existing applications
SELECT update_all_priority_scores();

COMMIT;
