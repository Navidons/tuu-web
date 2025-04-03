-- Create the database
CREATE DATABASE IF NOT EXISTS uedcl;
USE uedcl;

-- Users table (core authentication and user management)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Technician', 'Supervisor', 'Manager') NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
);

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    supervisor_id INT,
    region VARCHAR(100),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supervisor_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_region (region),
    INDEX idx_status (status)
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
    user_id INT NOT NULL,
    team_id INT NOT NULL,
    joined_date DATE NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, team_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    INDEX idx_status (status)
);

-- Transformers table
CREATE TABLE IF NOT EXISTS transformers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serial_number VARCHAR(50) UNIQUE NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    capacity_kva DECIMAL(10, 2) NOT NULL,
    manufacturing_date DATE,
    installation_date DATE,
    location VARCHAR(200),
    gps_coordinates VARCHAR(100),
    status ENUM('Active', 'Inactive', 'Under Maintenance', 'Decommissioned') DEFAULT 'Active',
    last_maintenance_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_serial_number (serial_number),
    INDEX idx_status (status),
    INDEX idx_location (location)
);

-- Maintenance tasks table
CREATE TABLE IF NOT EXISTS maintenance_tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transformer_id VARCHAR(255) NOT NULL,
    maintenance_date DATE NOT NULL,
    maintenance_type ENUM('preventive', 'corrective', 'emergency') NOT NULL,
    team ENUM('inspection', 'pm', 'pdm') NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    planned_duration DECIMAL(5, 2),
    actual_duration DECIMAL(5, 2),
    assigned_to INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    notes TEXT,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_transformer_id (transformer_id),
    INDEX idx_maintenance_date (maintenance_date),
    INDEX idx_status (status)
);

-- Transformer issues table
CREATE TABLE IF NOT EXISTS transformer_issues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transformer_id VARCHAR(255) NOT NULL,
    issue_type VARCHAR(100) NOT NULL,
    description TEXT,
    reported_by INT,
    assigned_to INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    status ENUM('open', 'in_progress', 'resolved') DEFAULT 'open',
    FOREIGN KEY (reported_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_transformer_id (transformer_id),
    INDEX idx_status (status)
);

-- Commissioning forms table
CREATE TABLE IF NOT EXISTS commissioning_forms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transformer_id VARCHAR(255) NOT NULL,
    date_commissioned DATE NOT NULL,
    location VARCHAR(200) NOT NULL,
    technician_id INT NOT NULL,
    voltage_reading VARCHAR(255),
    current_reading VARCHAR(255),
    oil_level VARCHAR(50),
    silica_gel_condition VARCHAR(50),
    earthing_status VARCHAR(50),
    installation_quality VARCHAR(50),
    notes TEXT,
    approved_by INT,
    approval_date DATE,
    status ENUM('Draft', 'Submitted', 'Approved', 'Rejected') DEFAULT 'Draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (technician_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_transformer_id (transformer_id),
    INDEX idx_status (status)
);

-- Inspection forms table
CREATE TABLE IF NOT EXISTS inspection_forms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transformer_id VARCHAR(255) NOT NULL,
    inspection_date DATE NOT NULL,
    technician_id INT NOT NULL,
    overall_condition VARCHAR(50),
    oil_level VARCHAR(50),
    oil_leakage VARCHAR(50),
    silica_gel_condition VARCHAR(50),
    bushings_condition VARCHAR(50),
    radiator_condition VARCHAR(50),
    paintwork_condition VARCHAR(50),
    earthing_condition VARCHAR(50),
    temperature_reading VARCHAR(50),
    voltage_reading VARCHAR(50),
    current_reading VARCHAR(50),
    recommendations TEXT,
    next_inspection_date DATE,
    status ENUM('Draft', 'Submitted', 'Approved', 'Rejected') DEFAULT 'Draft',
    approved_by INT,
    approval_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (technician_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_transformer_id (transformer_id),
    INDEX idx_inspection_date (inspection_date),
    INDEX idx_status (status)
);

-- Fault forms table
CREATE TABLE IF NOT EXISTS fault_forms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transformer_id VARCHAR(255) NOT NULL,
    report_date DATE NOT NULL,
    reporter_id INT NOT NULL,
    fault_type VARCHAR(100) NOT NULL,
    fault_description TEXT NOT NULL,
    fault_date DATE,
    impact VARCHAR(50) NOT NULL,
    status ENUM('Reported', 'Under Investigation', 'Scheduled', 'In Progress', 'Resolved', 'Closed') DEFAULT 'Reported',
    assigned_to INT,
    resolution_description TEXT,
    resolution_date DATE,
    approved_by INT,
    approval_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_transformer_id (transformer_id),
    INDEX idx_report_date (report_date),
    INDEX idx_status (status)
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(50) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_setting_key (setting_key)
);

-- Insert default settings
INSERT IGNORE INTO settings (setting_key, setting_value, description) VALUES
('maintenance_frequency_days', '90', 'Default maintenance frequency in days'),
('inspection_frequency_days', '30', 'Default inspection frequency in days'),
('notification_email', 'admin@uedcl.com', 'Email for system notifications'),
('system_initialized', 'true', 'Indicates if the system has been initialized');

-- Insert default admin user (password: admin123)
INSERT IGNORE INTO users (name, email, password_hash, role) VALUES
('System Administrator', 'admin@uedcl.com', '$2b$10$YourHashedPasswordHere', 'Admin');

-- Insert sample data
INSERT IGNORE INTO transformers (serial_number, manufacturer, capacity_kva, manufacturing_date, installation_date, location) VALUES
('TR001', 'ABB', 1000.00, '2020-01-01', '2020-02-01', 'Location A'),
('TR002', 'Siemens', 2000.00, '2020-03-01', '2020-04-01', 'Location B'),
('TR003', 'GE', 1500.00, '2020-05-01', '2020-06-01', 'Location C'),
('TR004', 'ABB', 2500.00, '2020-07-01', '2020-08-01', 'Location D'),
('TR005', 'Siemens', 3000.00, '2020-09-01', '2020-10-01', 'Location E'),
('TR006', 'GE', 1800.00, '2020-11-01', '2020-12-01', 'Location F');

-- Insert sample maintenance tasks
INSERT IGNORE INTO maintenance_tasks (transformer_id, maintenance_date, maintenance_type, team, status, planned_duration, actual_duration, completed_at) VALUES
('TR001', DATE_SUB(CURDATE(), INTERVAL 5 MONTH), 'preventive', 'inspection', 'completed', 4.0, 3.5, DATE_SUB(CURDATE(), INTERVAL 5 MONTH)),
('TR002', DATE_SUB(CURDATE(), INTERVAL 4 MONTH), 'preventive', 'pm', 'completed', 6.0, 5.8, DATE_SUB(CURDATE(), INTERVAL 4 MONTH)),
('TR003', DATE_SUB(CURDATE(), INTERVAL 3 MONTH), 'corrective', 'pdm', 'completed', 8.0, 7.5, DATE_SUB(CURDATE(), INTERVAL 3 MONTH)),
('TR004', DATE_SUB(CURDATE(), INTERVAL 2 MONTH), 'preventive', 'inspection', 'completed', 4.0, 4.2, DATE_SUB(CURDATE(), INTERVAL 2 MONTH)),
('TR005', DATE_SUB(CURDATE(), INTERVAL 1 MONTH), 'preventive', 'pm', 'completed', 6.0, 5.5, DATE_SUB(CURDATE(), INTERVAL 1 MONTH)),
('TR006', CURDATE(), 'preventive', 'pdm', 'pending', 8.0, NULL, NULL);

-- Insert sample transformer issues
INSERT IGNORE INTO transformer_issues (transformer_id, issue_type, description, created_at, resolved_at, status) VALUES
('TR001', 'Oil Leakage', 'Minor oil leakage detected', DATE_SUB(CURDATE(), INTERVAL 6 MONTH), DATE_SUB(CURDATE(), INTERVAL 5 MONTH), 'resolved'),
('TR002', 'Overheating', 'Temperature exceeding normal range', DATE_SUB(CURDATE(), INTERVAL 5 MONTH), DATE_SUB(CURDATE(), INTERVAL 4 MONTH), 'resolved'),
('TR003', 'Insulation Failure', 'Insulation resistance below threshold', DATE_SUB(CURDATE(), INTERVAL 4 MONTH), DATE_SUB(CURDATE(), INTERVAL 3 MONTH), 'resolved'),
('TR004', 'Bushing Damage', 'Physical damage to bushing', DATE_SUB(CURDATE(), INTERVAL 3 MONTH), DATE_SUB(CURDATE(), INTERVAL 2 MONTH), 'resolved'),
('TR005', 'Oil Contamination', 'Oil sample showing contamination', DATE_SUB(CURDATE(), INTERVAL 2 MONTH), DATE_SUB(CURDATE(), INTERVAL 1 MONTH), 'resolved'),
('TR006', 'Voltage Fluctuation', 'Unstable voltage readings', DATE_SUB(CURDATE(), INTERVAL 1 MONTH), NULL, 'open'); 