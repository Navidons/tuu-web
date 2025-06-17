-- Seed initial data for the system

-- Insert default letter templates
INSERT INTO letter_templates (name, type, subject, content, is_active) VALUES
(
    'Standard Acceptance Letter',
    'acceptance',
    'Congratulations! Your Application Has Been Approved',
    'Dear {{full_name}},

We are pleased to inform you that your application for admission to Pharo School has been approved.

Your enrollment details:
- Student ID: {{student_id}}
- Class: {{class_admitted}}
- Start Date: {{start_date}}

Please contact our admissions office to complete the enrollment process.

Congratulations and welcome to Pharo School!

Best regards,
Admissions Office
Pharo School',
    true
),
(
    'Standard Rejection Letter',
    'rejection',
    'Application Status Update',
    'Dear {{full_name}},

Thank you for your interest in Pharo School. After careful consideration of your application, we regret to inform you that we are unable to offer you admission at this time.

This decision does not reflect on your potential or worth as a student. We encourage you to continue pursuing your educational goals.

We wish you all the best in your future endeavors.

Sincerely,
Admissions Office
Pharo School',
    true
),
(
    'Deferral Letter',
    'deferral',
    'Application Deferred - Additional Information Required',
    'Dear {{full_name}},

Thank you for your application to Pharo School. Your application is currently under review, and we require additional information before making a final decision.

Please provide the following:
- {{required_documents}}

Once we receive this information, we will continue processing your application.

Thank you for your patience.

Best regards,
Admissions Office
Pharo School',
    true
);

-- Insert sample applications for testing (optional)
INSERT INTO applications (full_name, email, phone, dob, gender, nationality, status, notes) VALUES
(
    'John Smith',
    'john.smith@example.com',
    '+1234567890',
    '2010-05-15',
    'Male',
    'American',
    'pending',
    'Strong academic background'
),
(
    'Sarah Johnson',
    'sarah.johnson@example.com',
    '+1234567891',
    '2009-08-22',
    'Female',
    'Canadian',
    'approved',
    'Excellent references'
),
(
    'Michael Brown',
    'michael.brown@example.com',
    '+1234567892',
    '2011-03-10',
    'Male',
    'British',
    'rejected',
    'Incomplete documentation'
);
