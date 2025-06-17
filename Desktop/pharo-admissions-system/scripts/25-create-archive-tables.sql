CREATE TABLE IF NOT EXISTS archived_applications (
    id UUID PRIMARY KEY,
    original_application_id UUID NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    dob DATE,
    gender TEXT,
    nationality TEXT,
    documents JSONB,
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    approved_by UUID,
    approved_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    priority TEXT,
    assigned_to UUID,
    deadline DATE,
    last_activity TIMESTAMP WITH TIME ZONE,
    metadata JSONB,
    archived_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    archived_by UUID REFERENCES auth.users(id),
    archived_reason TEXT
);

-- Optional: If you want to keep separate archives for comments and notifications, or embed them
-- For now, we will embed them as JSONB in the archived_applications table metadata

-- Add RLS to archived_applications
ALTER TABLE archived_applications ENABLE ROW LEVEL SECURITY;

-- Policies for archived_applications (e.g., only admins can view archives)
DROP POLICY IF EXISTS "Admins can view archived applications" ON archived_applications;
CREATE POLICY "Admins can view archived applications" ON archived_applications
    FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin'); 