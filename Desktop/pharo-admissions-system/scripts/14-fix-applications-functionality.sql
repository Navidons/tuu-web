-- Fix Applications Functionality - Handle Existing Table Structure
-- This script safely adds missing columns and creates new tables

-- First, let's check and add missing columns to existing tables
DO $$ 
BEGIN
    -- Add missing columns to applications table if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'priority_score') THEN
        ALTER TABLE applications ADD COLUMN priority_score INTEGER DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'interview_scheduled') THEN
        ALTER TABLE applications ADD COLUMN interview_scheduled BOOLEAN DEFAULT FALSE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'interview_date') THEN
        ALTER TABLE applications ADD COLUMN interview_date TIMESTAMP WITH TIME ZONE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'interview_notes') THEN
        ALTER TABLE applications ADD COLUMN interview_notes TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'application_source') THEN
        ALTER TABLE applications ADD COLUMN application_source VARCHAR(50) DEFAULT 'online';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'referral_source') THEN
        ALTER TABLE applications ADD COLUMN referral_source VARCHAR(100);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'academic_year') THEN
        ALTER TABLE applications ADD COLUMN academic_year VARCHAR(10) DEFAULT '2024-2025';
    END IF;

    -- Add missing columns to students table if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'application_id') THEN
        ALTER TABLE students ADD COLUMN application_id UUID REFERENCES applications(id) ON DELETE SET NULL;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'guardian_name') THEN
        ALTER TABLE students ADD COLUMN guardian_name VARCHAR(255);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'guardian_phone') THEN
        ALTER TABLE students ADD COLUMN guardian_phone VARCHAR(20);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'guardian_email') THEN
        ALTER TABLE students ADD COLUMN guardian_email VARCHAR(255);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'emergency_contact') THEN
        ALTER TABLE students ADD COLUMN emergency_contact VARCHAR(255);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'emergency_phone') THEN
        ALTER TABLE students ADD COLUMN emergency_phone VARCHAR(20);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'medical_info') THEN
        ALTER TABLE students ADD COLUMN medical_info TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'previous_school') THEN
        ALTER TABLE students ADD COLUMN previous_school VARCHAR(255);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'transport_mode') THEN
        ALTER TABLE students ADD COLUMN transport_mode VARCHAR(50) DEFAULT 'walking';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'uniform_size') THEN
        ALTER TABLE students ADD COLUMN uniform_size VARCHAR(10) DEFAULT 'M';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'special_needs') THEN
        ALTER TABLE students ADD COLUMN special_needs TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'status') THEN
        ALTER TABLE students ADD COLUMN status VARCHAR(20) DEFAULT 'active';
    END IF;
END $$;

-- Create new tables that don't exist
CREATE TABLE IF NOT EXISTS application_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    comment TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS application_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB,
    user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS email_queue (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    recipient_email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    body TEXT NOT NULL,
    template_type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending',
    sent_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_fees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id VARCHAR(20) NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    paid_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    balance_amount DECIMAL(10,2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
    status VARCHAR(20) DEFAULT 'pending',
    due_date DATE,
    payment_plan VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id VARCHAR(20) NOT NULL,
    attendance_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'present',
    notes TEXT,
    marked_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, attendance_date)
);

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

-- Create indexes for performance (only if they don't exist)
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
CREATE INDEX IF NOT EXISTS idx_students_application_id ON students(application_id);
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
    CASE COALESCE(app_record.application_source, 'online')
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

-- Enable RLS on new tables
ALTER TABLE application_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_workflow_states ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for new tables (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Users can view application comments" ON application_comments;
DROP POLICY IF EXISTS "Users can insert application comments" ON application_comments;
DROP POLICY IF EXISTS "Users can view application analytics" ON application_analytics;
DROP POLICY IF EXISTS "Users can insert application analytics" ON application_analytics;
DROP POLICY IF EXISTS "Users can view email queue" ON email_queue;
DROP POLICY IF EXISTS "Users can manage email queue" ON email_queue;
DROP POLICY IF EXISTS "Users can view student fees" ON student_fees;
DROP POLICY IF EXISTS "Users can manage student fees" ON student_fees;
DROP POLICY IF EXISTS "Users can view student attendance" ON student_attendance;
DROP POLICY IF EXISTS "Users can manage student attendance" ON student_attendance;
DROP POLICY IF EXISTS "Users can view workflow states" ON application_workflow_states;
DROP POLICY IF EXISTS "Users can manage workflow states" ON application_workflow_states;

-- Create new policies
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

-- Insert sample data for testing (only if tables are empty)
INSERT INTO applications (full_name, email, phone, gender, nationality, status, application_source, priority_score)
SELECT 'John Doe', 'john.doe@email.com', '+1234567890', 'Male', 'American', 'pending', 'online', 75
WHERE NOT EXISTS (SELECT 1 FROM applications WHERE email = 'john.doe@email.com');

INSERT INTO applications (full_name, email, phone, gender, nationality, status, application_source, priority_score)
SELECT 'Jane Smith', 'jane.smith@email.com', '+1234567891', 'Female', 'Canadian', 'pending', 'referral', 85
WHERE NOT EXISTS (SELECT 1 FROM applications WHERE email = 'jane.smith@email.com');

INSERT INTO applications (full_name, email, phone, gender, nationality, status, application_source, priority_score)
SELECT 'Mike Johnson', 'mike.johnson@email.com', '+1234567892', 'Male', 'British', 'approved', 'walk_in', 90
WHERE NOT EXISTS (SELECT 1 FROM applications WHERE email = 'mike.johnson@email.com');

INSERT INTO applications (full_name, email, phone, gender, nationality, status, application_source, priority_score)
SELECT 'Sarah Wilson', 'sarah.wilson@email.com', '+1234567893', 'Female', 'Australian', 'pending', 'online', 70
WHERE NOT EXISTS (SELECT 1 FROM applications WHERE email = 'sarah.wilson@email.com');

INSERT INTO applications (full_name, email, phone, gender, nationality, status, application_source, priority_score)
SELECT 'David Brown', 'david.brown@email.com', '+1234567894', 'Male', 'South African', 'deferred', 'referral', 80
WHERE NOT EXISTS (SELECT 1 FROM applications WHERE email = 'david.brown@email.com');

-- Update priority scores for all existing applications
SELECT update_all_priority_scores();

COMMIT;
