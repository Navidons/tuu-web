-- Insert sample users (with Ugandan names)
INSERT IGNORE INTO users (name, email, password_hash, role, status) VALUES
('Mukasa John', 'mukasa.john@uedcl.com', '$2b$10$YourHashedPasswordHere', 'Admin', 'active'),
('Nakimera Sarah', 'nakimera.sarah@uedcl.com', '$2b$10$YourHashedPasswordHere', 'Manager', 'active'),
('Kibuuka David', 'kibuuka.david@uedcl.com', '$2b$10$YourHashedPasswordHere', 'Supervisor', 'active'),
('Nakato Mary', 'nakato.mary@uedcl.com', '$2b$10$YourHashedPasswordHere', 'Technician', 'active'),
('Ssemakula Peter', 'ssemakula.peter@uedcl.com', '$2b$10$YourHashedPasswordHere', 'Technician', 'active'),
('Nabukalu Grace', 'nabukalu.grace@uedcl.com', '$2b$10$YourHashedPasswordHere', 'Technician', 'active'),
('Kigozi Joseph', 'kigozi.joseph@uedcl.com', '$2b$10$YourHashedPasswordHere', 'Technician', 'active'),
('Nakawuki Elizabeth', 'nakawuki.elizabeth@uedcl.com', '$2b$10$YourHashedPasswordHere', 'Technician', 'active');

-- Insert sample teams
INSERT IGNORE INTO teams (name, supervisor_id, region, status) VALUES
('Central Region Team', 3, 'Central', 'active'),
('Eastern Region Team', 3, 'Eastern', 'active'),
('Western Region Team', 3, 'Western', 'active'),
('Northern Region Team', 3, 'Northern', 'active');

-- Insert team members
INSERT IGNORE INTO team_members (user_id, team_id, joined_date, status) VALUES
(4, 1, '2023-01-01', 'active'),
(5, 1, '2023-01-01', 'active'),
(6, 2, '2023-01-01', 'active'),
(7, 2, '2023-01-01', 'active'),
(8, 3, '2023-01-01', 'active');

-- Insert sample transformers (with more realistic locations)
INSERT IGNORE INTO transformers (serial_number, manufacturer, capacity_kva, manufacturing_date, installation_date, location, gps_coordinates, status) VALUES
('TR001', 'ABB', 1000.00, '2020-01-01', '2020-02-01', 'Kololo Substation', '0.3276° N, 32.5877° E', 'Active'),
('TR002', 'Siemens', 2000.00, '2020-03-01', '2020-04-01', 'Ntinda Substation', '0.3500° N, 32.6000° E', 'Active'),
('TR003', 'GE', 1500.00, '2020-05-01', '2020-06-01', 'Banda Substation', '0.3000° N, 32.6500° E', 'Active'),
('TR004', 'ABB', 2500.00, '2020-07-01', '2020-08-01', 'Luzira Substation', '0.2800° N, 32.6200° E', 'Active'),
('TR005', 'Siemens', 3000.00, '2020-09-01', '2020-10-01', 'Kireka Substation', '0.3400° N, 32.6400° E', 'Active'),
('TR006', 'GE', 1800.00, '2020-11-01', '2020-12-01', 'Bweyogerere Substation', '0.3600° N, 32.6600° E', 'Active');

-- Insert sample maintenance tasks
INSERT IGNORE INTO maintenance_tasks (transformer_id, maintenance_date, maintenance_type, team, status, planned_duration, actual_duration, assigned_to, completed_at, notes) VALUES
('TR001', DATE_SUB(CURDATE(), INTERVAL 5 MONTH), 'preventive', 'inspection', 'completed', 4.0, 3.5, 4, DATE_SUB(CURDATE(), INTERVAL 5 MONTH), 'Routine inspection completed successfully'),
('TR002', DATE_SUB(CURDATE(), INTERVAL 4 MONTH), 'preventive', 'pm', 'completed', 6.0, 5.8, 5, DATE_SUB(CURDATE(), INTERVAL 4 MONTH), 'Preventive maintenance completed with minor adjustments'),
('TR003', DATE_SUB(CURDATE(), INTERVAL 3 MONTH), 'corrective', 'pdm', 'completed', 8.0, 7.5, 6, DATE_SUB(CURDATE(), INTERVAL 3 MONTH), 'Corrective maintenance completed after fault detection'),
('TR004', DATE_SUB(CURDATE(), INTERVAL 2 MONTH), 'preventive', 'inspection', 'completed', 4.0, 4.2, 7, DATE_SUB(CURDATE(), INTERVAL 2 MONTH), 'Routine inspection completed with recommendations'),
('TR005', DATE_SUB(CURDATE(), INTERVAL 1 MONTH), 'preventive', 'pm', 'completed', 6.0, 5.5, 8, DATE_SUB(CURDATE(), INTERVAL 1 MONTH), 'Preventive maintenance completed successfully'),
('TR006', CURDATE(), 'preventive', 'pdm', 'pending', 8.0, NULL, 4, NULL, 'Scheduled for preventive maintenance');

-- Insert sample transformer issues
INSERT IGNORE INTO transformer_issues (transformer_id, issue_type, description, reported_by, assigned_to, created_at, resolved_at, status) VALUES
('TR001', 'Oil Leakage', 'Minor oil leakage detected in main tank', 4, 5, DATE_SUB(CURDATE(), INTERVAL 6 MONTH), DATE_SUB(CURDATE(), INTERVAL 5 MONTH), 'resolved'),
('TR002', 'Overheating', 'Temperature exceeding normal range during peak hours', 5, 6, DATE_SUB(CURDATE(), INTERVAL 5 MONTH), DATE_SUB(CURDATE(), INTERVAL 4 MONTH), 'resolved'),
('TR003', 'Insulation Failure', 'Insulation resistance below threshold in HV winding', 6, 7, DATE_SUB(CURDATE(), INTERVAL 4 MONTH), DATE_SUB(CURDATE(), INTERVAL 3 MONTH), 'resolved'),
('TR004', 'Bushing Damage', 'Physical damage to HV bushing insulator', 7, 8, DATE_SUB(CURDATE(), INTERVAL 3 MONTH), DATE_SUB(CURDATE(), INTERVAL 2 MONTH), 'resolved'),
('TR005', 'Oil Contamination', 'Oil sample showing moisture contamination', 8, 4, DATE_SUB(CURDATE(), INTERVAL 2 MONTH), DATE_SUB(CURDATE(), INTERVAL 1 MONTH), 'resolved'),
('TR006', 'Voltage Fluctuation', 'Unstable voltage readings during load changes', 4, 5, DATE_SUB(CURDATE(), INTERVAL 1 MONTH), NULL, 'open');

-- Insert sample commissioning forms
INSERT IGNORE INTO commissioning_forms (transformer_id, date_commissioned, location, technician_id, voltage_reading, current_reading, oil_level, silica_gel_condition, earthing_status, installation_quality, notes, approved_by, approval_date, status) VALUES
('TR001', '2020-02-01', 'Kololo Substation', 4, '11kV', '100A', 'Normal', 'Good', 'Proper', 'Excellent', 'All parameters within acceptable range', 1, '2020-02-02', 'Approved'),
('TR002', '2020-04-01', 'Ntinda Substation', 5, '11kV', '180A', 'Normal', 'Good', 'Proper', 'Excellent', 'Installation completed successfully', 1, '2020-04-02', 'Approved'),
('TR003', '2020-06-01', 'Banda Substation', 6, '11kV', '130A', 'Normal', 'Good', 'Proper', 'Excellent', 'All systems operational', 1, '2020-06-02', 'Approved');

-- Insert sample inspection forms
INSERT IGNORE INTO inspection_forms (transformer_id, inspection_date, technician_id, overall_condition, oil_level, oil_leakage, silica_gel_condition, bushings_condition, radiator_condition, paintwork_condition, earthing_condition, temperature_reading, voltage_reading, current_reading, recommendations, next_inspection_date, status, approved_by, approval_date) VALUES
('TR001', DATE_SUB(CURDATE(), INTERVAL 2 MONTH), 4, 'Good', 'Normal', 'None', 'Good', 'Good', 'Good', 'Good', 'Good', '45°C', '11kV', '95A', 'Schedule next maintenance in 3 months', DATE_ADD(CURDATE(), INTERVAL 1 MONTH), 'Approved', 1, DATE_SUB(CURDATE(), INTERVAL 2 MONTH)),
('TR002', DATE_SUB(CURDATE(), INTERVAL 1 MONTH), 5, 'Good', 'Normal', 'None', 'Good', 'Good', 'Good', 'Good', 'Good', '42°C', '11kV', '175A', 'Continue monitoring temperature', DATE_ADD(CURDATE(), INTERVAL 2 MONTH), 'Approved', 1, DATE_SUB(CURDATE(), INTERVAL 1 MONTH)),
('TR003', CURDATE(), 6, 'Good', 'Normal', 'None', 'Good', 'Good', 'Good', 'Good', 'Good', '40°C', '11kV', '125A', 'Schedule oil sample analysis', DATE_ADD(CURDATE(), INTERVAL 3 MONTH), 'Draft', NULL, NULL);

-- Insert sample fault forms
INSERT IGNORE INTO fault_forms (transformer_id, report_date, reporter_id, fault_type, fault_description, fault_date, impact, status, assigned_to, resolution_description, resolution_date, approved_by, approval_date) VALUES
('TR001', DATE_SUB(CURDATE(), INTERVAL 6 MONTH), 4, 'Oil Leakage', 'Minor oil leakage detected in main tank during routine inspection', DATE_SUB(CURDATE(), INTERVAL 6 MONTH), 'Low', 'Resolved', 5, 'Leakage repaired and tank resealed', DATE_SUB(CURDATE(), INTERVAL 5 MONTH), 1, DATE_SUB(CURDATE(), INTERVAL 5 MONTH)),
('TR002', DATE_SUB(CURDATE(), INTERVAL 5 MONTH), 5, 'Overheating', 'Temperature exceeding normal range during peak hours', DATE_SUB(CURDATE(), INTERVAL 5 MONTH), 'Medium', 'Resolved', 6, 'Cooling system cleaned and optimized', DATE_SUB(CURDATE(), INTERVAL 4 MONTH), 1, DATE_SUB(CURDATE(), INTERVAL 4 MONTH)),
('TR003', DATE_SUB(CURDATE(), INTERVAL 4 MONTH), 6, 'Insulation Failure', 'Insulation resistance below threshold in HV winding', DATE_SUB(CURDATE(), INTERVAL 4 MONTH), 'High', 'Resolved', 7, 'Winding insulation repaired and tested', DATE_SUB(CURDATE(), INTERVAL 3 MONTH), 1, DATE_SUB(CURDATE(), INTERVAL 3 MONTH)),
('TR004', DATE_SUB(CURDATE(), INTERVAL 3 MONTH), 7, 'Bushing Damage', 'Physical damage to HV bushing insulator', DATE_SUB(CURDATE(), INTERVAL 3 MONTH), 'High', 'Resolved', 8, 'Damaged bushing replaced', DATE_SUB(CURDATE(), INTERVAL 2 MONTH), 1, DATE_SUB(CURDATE(), INTERVAL 2 MONTH)),
('TR005', DATE_SUB(CURDATE(), INTERVAL 2 MONTH), 8, 'Oil Contamination', 'Oil sample showing moisture contamination', DATE_SUB(CURDATE(), INTERVAL 2 MONTH), 'Medium', 'Resolved', 4, 'Oil replaced and moisture ingress point sealed', DATE_SUB(CURDATE(), INTERVAL 1 MONTH), 1, DATE_SUB(CURDATE(), INTERVAL 1 MONTH)),
('TR006', DATE_SUB(CURDATE(), INTERVAL 1 MONTH), 4, 'Voltage Fluctuation', 'Unstable voltage readings during load changes', DATE_SUB(CURDATE(), INTERVAL 1 MONTH), 'Medium', 'Under Investigation', 5, NULL, NULL, NULL, NULL); 