-- Insert default letter templates
INSERT INTO letter_templates (name, type, subject, content) VALUES
(
    'Default Acceptance Letter',
    'acceptance',
    'Congratulations! Your Application to Pharo Secondary School has been Approved',
    '<h1>Congratulations!</h1>
    <p>Dear {{full_name}},</p>
    <p>We are pleased to inform you that your application to Pharo Secondary School has been <strong>approved</strong>.</p>
    <p>You have been admitted to <strong>{{class_admitted}}</strong> for the upcoming academic year.</p>
    <h3>Next Steps:</h3>
    <ul>
        <li>Complete your enrollment by visiting our school office</li>
        <li>Bring all required documents</li>
        <li>Pay the required fees</li>
    </ul>
    <p>We look forward to welcoming you to our school community.</p>
    <p>Best regards,<br>
    Pharo Secondary School<br>
    Admissions Office</p>'
),
(
    'Default Rejection Letter',
    'rejection',
    'Update on Your Application to Pharo Secondary School',
    '<h1>Application Update</h1>
    <p>Dear {{full_name}},</p>
    <p>Thank you for your interest in Pharo Secondary School. After careful consideration, we regret to inform you that we are unable to offer you admission at this time.</p>
    <p>This decision was difficult due to the high number of qualified applicants and limited spaces available.</p>
    <p>We encourage you to apply again in the future and wish you success in your educational journey.</p>
    <p>Best regards,<br>
    Pharo Secondary School<br>
    Admissions Office</p>'
);

-- Insert sample applications for testing
INSERT INTO applications (full_name, email, phone, dob, gender, nationality, status) VALUES
('John Doe', 'john.doe@example.com', '+252-61-1234567', '2008-05-15', 'Male', 'Somali', 'pending'),
('Jane Smith', 'jane.smith@example.com', '+252-61-2345678', '2008-08-22', 'Female', 'Somali', 'approved'),
('Ahmed Hassan', 'ahmed.hassan@example.com', '+252-61-3456789', '2008-03-10', 'Male', 'Somali', 'pending'),
('Fatima Ali', 'fatima.ali@example.com', '+252-61-4567890', '2008-11-05', 'Female', 'Somali', 'rejected'),
('Omar Mohamed', 'omar.mohamed@example.com', '+252-61-5678901', '2008-07-18', 'Male', 'Somali', 'deferred');
