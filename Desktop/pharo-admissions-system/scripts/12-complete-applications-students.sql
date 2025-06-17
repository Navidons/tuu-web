-- Enhanced Applications and Students Tables with Additional Fields
ALTER TABLE applications ADD COLUMN IF NOT EXISTS documents JSONB DEFAULT '[]';
ALTER TABLE applications ADD COLUMN IF NOT EXISTS interview_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS interview_notes TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS priority_score INTEGER DEFAULT 0;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS source VARCHAR(50) DEFAULT 'walk-in';

-- Enhanced Students Table
ALTER TABLE students ADD COLUMN IF NOT EXISTS academic_year VARCHAR(10);
ALTER TABLE students ADD COLUMN IF NOT EXISTS enrollment_fee DECIMAL(10,2);
ALTER TABLE students ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'pending';
ALTER TABLE students ADD COLUMN IF NOT EXISTS guardian_name VARCHAR(255);
ALTER TABLE students ADD COLUMN IF NOT EXISTS guardian_phone VARCHAR(20);
ALTER TABLE students ADD COLUMN IF NOT EXISTS guardian_email VARCHAR(255);
ALTER TABLE students ADD COLUMN IF NOT EXISTS emergency_contact VARCHAR(255);
ALTER TABLE students ADD COLUMN IF NOT EXISTS emergency_phone VARCHAR(20);
ALTER TABLE students ADD COLUMN IF NOT EXISTS medical_info TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS special_needs TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS transport_required BOOLEAN DEFAULT FALSE;
ALTER TABLE students ADD COLUMN IF NOT EXISTS hostel_required BOOLEAN DEFAULT FALSE;

-- Create Application Comments Table
CREATE TABLE IF NOT EXISTS application_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    comment TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Student Academic Records Table
CREATE TABLE IF NOT EXISTS student_academic_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    academic_year VARCHAR(10) NOT NULL,
    term VARCHAR(20) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    grade VARCHAR(5),
    marks DECIMAL(5,2),
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Student Attendance Table
CREATE TABLE IF NOT EXISTS student_attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
    reason TEXT,
    marked_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, date)
);

-- Create Student Fees Table
CREATE TABLE IF NOT EXISTS student_fees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    fee_type VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    paid_amount DECIMAL(10,2) DEFAULT 0,
    payment_date DATE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'partial', 'paid', 'overdue')),
    academic_year VARCHAR(10) NOT NULL,
    term VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE application_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_academic_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_fees ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Application Comments
CREATE POLICY "Users can view application comments" ON application_comments
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage application comments" ON application_comments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('admin', 'principal', 'teacher')
        )
    );

-- RLS Policies for Student Academic Records
CREATE POLICY "Users can view student academic records" ON student_academic_records
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Teachers can manage academic records" ON student_academic_records
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('admin', 'principal', 'teacher')
        )
    );

-- RLS Policies for Student Attendance
CREATE POLICY "Users can view student attendance" ON student_attendance
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Teachers can manage attendance" ON student_attendance
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('admin', 'principal', 'teacher')
        )
    );

-- RLS Policies for Student Fees
CREATE POLICY "Users can view student fees" ON student_fees
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage student fees" ON student_fees
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('admin', 'principal', 'accountant')
        )
    );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_application_comments_application_id ON application_comments(application_id);
CREATE INDEX IF NOT EXISTS idx_application_comments_created_at ON application_comments(created_at);
CREATE INDEX IF NOT EXISTS idx_student_academic_records_student_id ON student_academic_records(student_id);
CREATE INDEX IF NOT EXISTS idx_student_academic_records_academic_year ON student_academic_records(academic_year);
CREATE INDEX IF NOT EXISTS idx_student_attendance_student_id ON student_attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_student_attendance_date ON student_attendance(date);
CREATE INDEX IF NOT EXISTS idx_student_fees_student_id ON student_fees(student_id);
CREATE INDEX IF NOT EXISTS idx_student_fees_status ON student_fees(status);
CREATE INDEX IF NOT EXISTS idx_student_fees_due_date ON student_fees(due_date);

-- Create functions for application scoring
CREATE OR REPLACE FUNCTION calculate_application_priority_score(app_id UUID)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
    app_record RECORD;
BEGIN
    SELECT * INTO app_record FROM applications WHERE id = app_id;
    
    -- Base score
    score := 50;
    
    -- Add points for complete information
    IF app_record.phone IS NOT NULL THEN score := score + 10; END IF;
    IF app_record.dob IS NOT NULL THEN score := score + 10; END IF;
    IF app_record.gender IS NOT NULL THEN score := score + 5; END IF;
    IF app_record.nationality IS NOT NULL THEN score := score + 5; END IF;
    
    -- Add points for documents
    IF jsonb_array_length(COALESCE(app_record.documents, '[]'::jsonb)) > 0 THEN 
        score := score + 20; 
    END IF;
    
    -- Subtract points for age (older applications get lower priority)
    score := score - EXTRACT(days FROM (NOW() - app_record.created_at))::INTEGER;
    
    RETURN GREATEST(score, 0);
END;
$$ LANGUAGE plpgsql;

-- Create function to update application scores
CREATE OR REPLACE FUNCTION update_all_application_scores()
RETURNS VOID AS $$
BEGIN
    UPDATE applications 
    SET priority_score = calculate_application_priority_score(id)
    WHERE status = 'pending';
END;
$$ LANGUAGE plpgsql;

-- Create function to get student statistics
CREATE OR REPLACE FUNCTION get_student_statistics()
RETURNS TABLE(
    total_students BIGINT,
    by_class JSONB,
    by_payment_status JSONB,
    by_gender JSONB,
    recent_enrollments BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_students,
        jsonb_object_agg(
            COALESCE(s.class_admitted, 'Unassigned'), 
            class_count
        ) as by_class,
        jsonb_object_agg(
            COALESCE(s.payment_status, 'Unknown'), 
            payment_count
        ) as by_payment_status,
        jsonb_object_agg(
            COALESCE(a.gender, 'Unknown'), 
            gender_count
        ) as by_gender,
        COUNT(*) FILTER (WHERE s.enrolled_date >= NOW() - INTERVAL '30 days') as recent_enrollments
    FROM students s
    JOIN applications a ON s.application_id = a.id
    CROSS JOIN LATERAL (
        SELECT COUNT(*) as class_count
        FROM students s2 
        WHERE COALESCE(s2.class_admitted, 'Unassigned') = COALESCE(s.class_admitted, 'Unassigned')
    ) class_stats
    CROSS JOIN LATERAL (
        SELECT COUNT(*) as payment_count
        FROM students s3 
        WHERE COALESCE(s3.payment_status, 'Unknown') = COALESCE(s.payment_status, 'Unknown')
    ) payment_stats
    CROSS JOIN LATERAL (
        SELECT COUNT(*) as gender_count
        FROM students s4
        JOIN applications a4 ON s4.application_id = a4.id
        WHERE COALESCE(a4.gender, 'Unknown') = COALESCE(a.gender, 'Unknown')
    ) gender_stats;
END;
$$ LANGUAGE plpgsql;

-- Insert sample data for testing
INSERT INTO application_comments (application_id, user_id, comment, is_internal)
SELECT 
    a.id,
    (SELECT id FROM auth.users LIMIT 1),
    'Application reviewed - all documents complete',
    true
FROM applications a
WHERE a.status = 'approved'
LIMIT 3;

-- Update existing applications with priority scores
SELECT update_all_application_scores();

-- Create trigger to automatically update priority scores
CREATE OR REPLACE FUNCTION trigger_update_application_score()
RETURNS TRIGGER AS $$
BEGIN
    NEW.priority_score := calculate_application_priority_score(NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_application_score_trigger
    BEFORE INSERT OR UPDATE ON applications
    FOR EACH ROW
    EXECUTE FUNCTION trigger_update_application_score();
