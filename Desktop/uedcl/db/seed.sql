-- Use the uedcl database
USE uedcl;

-- Create sample transformers
INSERT INTO transformers (serial_number, manufacturer, capacity_kva, location, gps_coordinates, installation_date)
VALUES 
  ('TS001', 'ABB', 250.00, 'Kampala Main Station', '0.3136° N, 32.5811° E', '2023-01-15'),
  ('TS002', 'Siemens', 500.00, 'Entebbe Substation', '0.0512° N, 32.4637° E', '2023-02-20'),
  ('TS003', 'General Electric', 750.00, 'Jinja Power Plant', '0.4478° N, 33.2026° E', '2023-03-10'),
  ('TS004', 'Schneider Electric', 150.00, 'Mbarara Distribution Hub', '-0.6167° N, 30.6500° E', '2023-04-05'),
  ('TS005', 'Eaton', 350.00, 'Gulu Regional Center', '2.7833° N, 32.2833° E', '2023-05-12');

-- Create sample users
INSERT INTO users (name, email, role)
VALUES 
  ('John Doe', 'john.doe@uedcl.com', 'Technician'),
  ('Jane Smith', 'jane.smith@uedcl.com', 'Supervisor'),
  ('Robert Johnson', 'robert.johnson@uedcl.com', 'Manager'),
  ('Sarah Williams', 'sarah.williams@uedcl.com', 'Technician'),
  ('Michael Brown', 'michael.brown@uedcl.com', 'Technician');

-- Create sample teams
INSERT INTO teams (name, supervisor_id, region)
VALUES 
  ('Kampala Team', 2, 'Central'),
  ('Western Region Team', 3, 'Western'),
  ('Northern Region Team', 2, 'Northern');

-- Assign users to teams
INSERT INTO team_members (user_id, team_id, joined_date)
VALUES 
  (1, 1, '2023-01-01'),
  (4, 1, '2023-01-05'),
  (5, 2, '2023-02-01'),
  (5, 3, '2023-03-01');

-- Sample commissioning forms
INSERT INTO commissioning_forms (
  transformer_id, 
  date_commissioned, 
  location, 
  technician_id, 
  voltage_reading, 
  current_reading, 
  oil_level, 
  silica_gel_condition, 
  earthing_status, 
  installation_quality, 
  notes, 
  status
)
VALUES 
  ('TS001', '2023-01-15', 'Kampala Main Station', '1', '33kV/11kV', '100A', 'Satisfactory', 'Good', 'Good', 'Excellent', 'Installation completed without issues', 'Approved'),
  ('TS002', '2023-02-20', 'Entebbe Substation', '4', '33kV/11kV', '150A', 'Satisfactory', 'Good', 'Good', 'Good', 'Minor adjustments needed for optimal performance', 'Approved'),
  ('TS003', '2023-03-10', 'Jinja Power Plant', '5', '66kV/11kV', '200A', 'Satisfactory', 'Good', 'Good', 'Good', 'Installation according to specifications', 'Approved'),
  ('TS004', '2023-04-05', 'Mbarara Distribution Hub', '1', '33kV/11kV', '80A', 'Satisfactory', 'Good', 'Good', 'Good', 'Standard installation process followed', 'Approved'),
  ('TS005', '2023-05-12', 'Gulu Regional Center', '5', '33kV/11kV', '120A', 'Satisfactory', 'Good', 'Good', 'Good', 'Installed according to manufacturer guidelines', 'Approved');

-- Sample inspection forms
INSERT INTO inspection_forms (
  transformer_id, 
  inspection_date, 
  technician_id, 
  overall_condition, 
  oil_level, 
  oil_leakage, 
  silica_gel_condition, 
  bushings_condition, 
  radiator_condition, 
  paintwork_condition, 
  earthing_condition, 
  temperature_reading, 
  voltage_reading, 
  current_reading, 
  recommendations, 
  next_inspection_date, 
  status
)
VALUES 
  ('TS001', '2023-02-15', '1', 'Good', 'Normal', 'None', 'Good', 'Good', 'Good', 'Good', 'Good', '65°C', '11kV', '95A', 'Continue regular maintenance', '2023-05-15', 'Approved'),
  ('TS002', '2023-03-20', '4', 'Good', 'Normal', 'None', 'Good', 'Good', 'Good', 'Good', 'Good', '60°C', '11kV', '140A', 'Clean radiator fins in next maintenance', '2023-06-20', 'Approved'),
  ('TS003', '2023-04-10', '5', 'Good', 'Normal', 'Minor', 'Good', 'Good', 'Good', 'Fair', 'Good', '70°C', '11kV', '190A', 'Address oil leakage and check paintwork', '2023-07-10', 'Approved'),
  ('TS004', '2023-05-05', '1', 'Good', 'Normal', 'None', 'Good', 'Good', 'Good', 'Good', 'Good', '55°C', '11kV', '75A', 'No issues found', '2023-08-05', 'Approved'),
  ('TS001', '2023-05-15', '4', 'Good', 'Normal', 'None', 'Fair', 'Good', 'Good', 'Good', 'Good', '68°C', '11kV', '98A', 'Replace silica gel in next maintenance', '2023-08-15', 'Approved');

-- Sample fault forms
INSERT INTO fault_forms (
  transformer_id, 
  report_date, 
  reporter_id, 
  fault_type, 
  fault_description, 
  fault_date, 
  impact, 
  status, 
  assigned_to
)
VALUES 
  ('TS003', '2023-04-15', '5', 'Oil Leakage', 'Minor oil leakage detected at the bottom valve', '2023-04-14', 'Medium', 'Resolved', 1),
  ('TS005', '2023-06-10', '4', 'Unusual Noise', 'Humming noise louder than normal during peak load', '2023-06-09', 'Low', 'Under Investigation', 5),
  ('TS002', '2023-06-25', '1', 'Temperature Rise', 'Abnormal temperature rise during operation', '2023-06-24', 'High', 'Scheduled', 4),
  ('TS001', '2023-07-05', '4', 'Circuit Breaker Trip', 'Circuit breaker trips under heavy load', '2023-07-04', 'High', 'In Progress', 1);

-- Sample maintenance records
INSERT INTO maintenance_records (
  transformer_id, 
  maintenance_date, 
  maintenance_type, 
  technician_id, 
  actions_taken, 
  parts_replaced, 
  oil_changed, 
  oil_quantity_added, 
  duration_hours, 
  next_maintenance_date, 
  status
)
VALUES 
  ('TS003', '2023-04-20', 'Corrective', '1', 'Fixed oil leakage by replacing valve seal', 'Valve seal', 0, 2.5, 3.0, '2023-07-20', 'Completed'),
  ('TS001', '2023-05-20', 'Preventive', '4', 'General maintenance and inspection', 'Silica gel', 0, 0, 4.0, '2023-08-20', 'Completed'),
  ('TS002', '2023-06-30', 'Corrective', '5', 'Investigated temperature rise, adjusted cooling system', 'Temperature sensor', 0, 0, 5.5, '2023-09-30', 'Completed'),
  ('TS004', '2023-07-15', 'Preventive', '1', 'Routine inspection and maintenance', 'None', 0, 0, 3.0, '2023-10-15', 'Scheduled'); 