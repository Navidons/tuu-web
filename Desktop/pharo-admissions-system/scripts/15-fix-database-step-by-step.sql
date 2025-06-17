-- Step-by-step database fix for applications functionality
-- This script safely adds missing columns and tables

-- Step 1: Add missing columns to applications table
DO $$ 
BEGIN
    -- Add priority_score column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'priority_score') THEN
        ALTER TABLE applications ADD COLUMN priority_score INTEGER DEFAULT 0;
    END IF;
    
    -- Add interview_scheduled column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'interview_scheduled') THEN
        ALTER TABLE applications ADD COLUMN interview_scheduled BOOLEAN DEFAULT FALSE;
    END IF;
    
    -- Add interview_date column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'interview_date') THEN
        ALTER TABLE applications ADD COLUMN interview_date TIMESTAMP;
    END IF;
    
    -- Add interview_notes column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'interview_notes') THEN
        ALTER TABLE applications ADD COLUMN interview_notes TEXT;
    END IF;
    
    -- Add documents_verified column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'documents_verified') THEN
        ALTER TABLE applications ADD COLUMN documents_verified BOOLEAN DEFAULT FALSE;
    END IF;
    
    -- Add application_source column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND column_name = 'application_source') THEN
        ALTER TABLE applications ADD COLUMN application_source VARCHAR(50) DEFAULT 'online';
    END IF;
    
    RAISE NOTICE 'Applications table columns added successfully';
END $$;

-- Step 2: Add missing columns to students table
DO $$ 
BEGIN
    -- Add application_id column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'application_id') THEN
        ALTER TABLE students ADD COLUMN application_id UUID;
    END IF;
    
    -- Add guardian_name column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'guardian_name') THEN
        ALTER TABLE students ADD COLUMN guardian_name VARCHAR(255);
    END IF;
    
    -- Add guardian_phone column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'guardian_phone') THEN
        ALTER TABLE students ADD COLUMN guardian_phone VARCHAR(20);
    END IF;
    
    -- Add guardian_email column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'guardian_email') THEN
        ALTER TABLE students ADD COLUMN guardian_email VARCHAR(255);
    END IF;
    
    -- Add medical_info column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'medical_info') THEN
        ALTER TABLE students ADD COLUMN medical_info TEXT;
    END IF;
    
    -- Add enrollment_date column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'enrollment_date') THEN
        ALTER TABLE students ADD COLUMN enrollment_date DATE;
    END IF;
    
    -- Add fees_paid column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'fees_paid') THEN
        ALTER TABLE students ADD COLUMN fees_paid DECIMAL(10,2) DEFAULT 0;
    END IF;
    
    -- Add total_fees column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'total_fees') THEN
        ALTER TABLE students ADD COLUMN total_fees DECIMAL(10,2) DEFAULT 0;
    END IF;
    
    RAISE NOTICE 'Students table columns added successfully';
END $$;

-- Step 3: Create application_comments table
CREATE TABLE IF NOT EXISTS application_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL,
    user_id UUID NOT NULL,
    comment TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Step 4: Create application_analytics table
CREATE TABLE IF NOT EXISTS application_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB,
    user_id UUID,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Step 5: Create email_queue table
CREATE TABLE IF NOT EXISTS email_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    application_id UUID,
    created_at TIMESTAMP DEFAULT NOW(),
    sent_at TIMESTAMP
);

-- Step 6: Add foreign key constraints (only if they don't exist)
DO $$ 
BEGIN
    -- Add foreign key for students.application_id
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'students_application_id_fkey' 
        AND table_name = 'students'
    ) THEN
        ALTER TABLE students 
        ADD CONSTRAINT students_application_id_fkey 
        FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE SET NULL;
    END IF;
    
    -- Add foreign key for application_comments.application_id
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'application_comments_application_id_fkey' 
        AND table_name = 'application_comments'
    ) THEN
        ALTER TABLE application_comments 
        ADD CONSTRAINT application_comments_application_id_fkey 
        FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE;
    END IF;
    
    -- Add foreign key for application_analytics.application_id
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'application_analytics_application_id_fkey' 
        AND table_name = 'application_analytics'
    ) THEN
        ALTER TABLE application_analytics 
        ADD CONSTRAINT application_analytics_application_id_fkey 
        FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE;
    END IF;
    
    RAISE NOTICE 'Foreign key constraints added successfully';
END $$;

-- Step 7: Enable Row Level Security
ALTER TABLE application_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;

-- Step 8: Create RLS policies
CREATE POLICY "Users can view application comments" ON application_comments
    FOR SELECT USING (true);

CREATE POLICY "Users can insert application comments" ON application_comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view application analytics" ON application_analytics
    FOR SELECT USING (true);

CREATE POLICY "Users can insert application analytics" ON application_analytics
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view email queue" ON email_queue
    FOR SELECT USING (true);

CREATE POLICY "Users can insert email queue" ON email_queue
    FOR INSERT WITH CHECK (true);

-- Step 9: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_applications_priority_score ON applications(priority_score);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_students_application_id ON students(application_id);
CREATE INDEX IF NOT EXISTS idx_application_comments_application_id ON application_comments(application_id);
CREATE INDEX IF NOT EXISTS idx_application_analytics_application_id ON application_analytics(application_id);
CREATE INDEX IF NOT EXISTS idx_email_queue_status ON email_queue(status);

-- Step 10: Insert sample data for testing
INSERT INTO application_comments (application_id, user_id, comment, is_internal)
SELECT 
    a.id,
    (SELECT id FROM auth.users LIMIT 1),
    'Sample comment for application review',
    true
FROM applications a
WHERE NOT EXISTS (
    SELECT 1 FROM application_comments ac WHERE ac.application_id = a.id
)
LIMIT 3;

-- Update priority scores for existing applications
UPDATE applications 
SET priority_score = CASE 
    WHEN status = 'approved' THEN 90
    WHEN status = 'pending' THEN 70
    WHEN status = 'rejected' THEN 30
    ELSE 50
END
WHERE priority_score = 0 OR priority_score IS NULL;

-- Success message
DO $$ 
BEGIN
    RAISE NOTICE 'Database setup completed successfully!';
    RAISE NOTICE 'All applications functionality is now available.';
END $$;
