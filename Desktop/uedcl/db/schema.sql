-- Create UEDCL database
CREATE DATABASE IF NOT EXISTS uedcl;
USE uedcl;

-- Transformers table to store transformer details
CREATE TABLE IF NOT EXISTS transformers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  serial_number VARCHAR(50) UNIQUE NOT NULL,
  manufacturer VARCHAR(100) NOT NULL,
  capacity_kva DECIMAL(10, 2) NOT NULL DEFAULT 0,
  manufacturing_date DATE,
  installation_date DATE,
  location VARCHAR(200),
  gps_coordinates VARCHAR(100),
  status ENUM('Active', 'Inactive', 'Under Maintenance', 'Decommissioned') DEFAULT 'Active',
  last_maintenance_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users/technicians table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role ENUM('Admin', 'Technician', 'Supervisor', 'Manager') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a default admin user
INSERT INTO users (name, email, role)
SELECT 'Default User', 'admin@uedcl.com', 'Admin'
WHERE NOT EXISTS (SELECT 1 FROM users LIMIT 1);

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  supervisor_id INT,
  region VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (supervisor_id) REFERENCES users(id)
);

-- User-Team relationship table
CREATE TABLE IF NOT EXISTS team_members (
  user_id INT NOT NULL,
  team_id INT NOT NULL,
  joined_date DATE NOT NULL,
  PRIMARY KEY (user_id, team_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- Commissioning forms table
-- NOTE: For application compatibility, we use VARCHAR for transformer_id
-- instead of INT with foreign key. In production, consider adding
-- proper foreign key constraints.
CREATE TABLE IF NOT EXISTS commissioning_forms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  transformer_id VARCHAR(255) NOT NULL,
  date_commissioned DATE NOT NULL,
  location VARCHAR(200) NOT NULL,
  technician_id VARCHAR(255) NOT NULL,
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inspection forms table
CREATE TABLE IF NOT EXISTS inspection_forms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  transformer_id VARCHAR(255) NOT NULL,
  inspection_date DATE NOT NULL,
  technician_id VARCHAR(255) NOT NULL,
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Fault report forms table
CREATE TABLE IF NOT EXISTS fault_forms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  transformer_id VARCHAR(255) NOT NULL,
  report_date DATE NOT NULL,
  reporter_id VARCHAR(255) NOT NULL,
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Maintenance records table
CREATE TABLE IF NOT EXISTS maintenance_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  transformer_id VARCHAR(255) NOT NULL,
  maintenance_date DATE NOT NULL,
  maintenance_type ENUM('Preventive', 'Corrective', 'Emergency') NOT NULL,
  technician_id VARCHAR(255) NOT NULL,
  actions_taken TEXT NOT NULL,
  parts_replaced TEXT,
  oil_changed BOOLEAN DEFAULT FALSE,
  oil_quantity_added DECIMAL(6, 2),
  duration_hours DECIMAL(5, 2),
  next_maintenance_date DATE,
  status ENUM('Scheduled', 'In Progress', 'Completed', 'Postponed', 'Cancelled') DEFAULT 'Scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Settings table for application configuration
CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(50) UNIQUE NOT NULL,
  setting_value TEXT,
  description TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Populate some initial settings
INSERT INTO settings (setting_key, setting_value, description) VALUES
('maintenance_frequency_days', '90', 'Default maintenance frequency in days'),
('inspection_frequency_days', '30', 'Default inspection frequency in days'),
('notification_email', 'admin@uedcl.com', 'Email for system notifications'),
('system_initialized', 'true', 'Indicates if the system has been initialized');

-- Create indexes for better performance
CREATE INDEX idx_transformer_serial ON transformers(serial_number);
CREATE INDEX idx_commissioning_transformer ON commissioning_forms(transformer_id);
CREATE INDEX idx_inspection_transformer ON inspection_forms(transformer_id); 
CREATE INDEX idx_fault_transformer ON fault_forms(transformer_id);
CREATE INDEX idx_maintenance_transformer ON maintenance_records(transformer_id); 