import mysql, { QueryResult, RowDataPacket } from 'mysql2/promise'

// Try to read environment variables
console.log('Database config:', {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'uedcl',
  // Password is omitted for security
})

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: 'uedcl', // Add database name to config
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

// Create a connection pool with database selected
const pool = mysql.createPool(dbConfig)

// Helper to execute SQL queries with proper database selection
async function executeQuery(sql: string, params: any[] = []) {
  try {
    const [result] = await pool.execute(sql, params)
    return result
  } catch (error) {
    console.error('Query execution error:', error)
    throw error
  }
}

// Initialize database and tables
export async function initDatabase() {
  const connection = await pool.getConnection()
  
  try {
    console.log('Starting database initialization...')
    
    // Create database if not exists
    await connection.query('CREATE DATABASE IF NOT EXISTS uedcl')
    await connection.query('USE uedcl')
    
    console.log('Creating database tables...')
    
    // Create users table first (as it's referenced by other tables)
    await connection.query(`
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
      )
    `)
    
    // Create teams table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS teams (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        supervisor_id INT,
        region VARCHAR(100),
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (supervisor_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `)
    
    // Create team_members table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS team_members (
        user_id INT NOT NULL,
        team_id INT NOT NULL,
        joined_date DATE NOT NULL,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, team_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
      )
    `)
    
    // Create transformers table
    await connection.query(`
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
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)
    
    // Create maintenance_tasks table
    await connection.query(`
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
        FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
      )
    `)
    
    // Create transformer_issues table
    await connection.query(`
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
        FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
      )
    `)
    
    // Create settings table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(50) UNIQUE NOT NULL,
        setting_value TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)
    
    // Insert default settings if not exists
    await connection.query(`
      INSERT IGNORE INTO settings (setting_key, setting_value, description) VALUES
      ('maintenance_frequency_days', '90', 'Default maintenance frequency in days'),
      ('inspection_frequency_days', '30', 'Default inspection frequency in days'),
      ('notification_email', 'admin@uedcl.com', 'Email for system notifications'),
      ('system_initialized', 'true', 'Indicates if the system has been initialized')
    `)
    
    // Insert default admin user if not exists
    await connection.query(`
      INSERT IGNORE INTO users (name, email, role)
      VALUES ('System Administrator', 'admin@uedcl.com', 'Admin')
    `)
    
    // Insert sample data only if tables are empty
    const [maintenanceCount] = await connection.query<RowDataPacket[]>('SELECT COUNT(*) as count FROM maintenance_tasks')
    if (maintenanceCount[0].count === 0) {
      console.log('Adding sample data...')
      
      // Insert sample maintenance tasks
      await connection.query(`
        INSERT INTO maintenance_tasks (transformer_id, maintenance_date, maintenance_type, team, status, planned_duration, actual_duration, completed_at)
        VALUES 
          ('TR001', DATE_SUB(CURDATE(), INTERVAL 5 MONTH), 'preventive', 'inspection', 'completed', 4.0, 3.5, DATE_SUB(CURDATE(), INTERVAL 5 MONTH)),
          ('TR002', DATE_SUB(CURDATE(), INTERVAL 4 MONTH), 'preventive', 'pm', 'completed', 6.0, 5.8, DATE_SUB(CURDATE(), INTERVAL 4 MONTH)),
          ('TR003', DATE_SUB(CURDATE(), INTERVAL 3 MONTH), 'corrective', 'pdm', 'completed', 8.0, 7.5, DATE_SUB(CURDATE(), INTERVAL 3 MONTH)),
          ('TR004', DATE_SUB(CURDATE(), INTERVAL 2 MONTH), 'preventive', 'inspection', 'completed', 4.0, 4.2, DATE_SUB(CURDATE(), INTERVAL 2 MONTH)),
          ('TR005', DATE_SUB(CURDATE(), INTERVAL 1 MONTH), 'preventive', 'pm', 'completed', 6.0, 5.5, DATE_SUB(CURDATE(), INTERVAL 1 MONTH)),
          ('TR006', CURDATE(), 'preventive', 'pdm', 'pending', 8.0, NULL, NULL)
      `)
      
      // Insert sample transformer issues
      await connection.query(`
        INSERT INTO transformer_issues (transformer_id, issue_type, description, created_at, resolved_at, status)
        VALUES 
          ('TR001', 'Oil Leakage', 'Minor oil leakage detected', DATE_SUB(CURDATE(), INTERVAL 6 MONTH), DATE_SUB(CURDATE(), INTERVAL 5 MONTH), 'resolved'),
          ('TR002', 'Overheating', 'Temperature exceeding normal range', DATE_SUB(CURDATE(), INTERVAL 5 MONTH), DATE_SUB(CURDATE(), INTERVAL 4 MONTH), 'resolved'),
          ('TR003', 'Insulation Failure', 'Insulation resistance below threshold', DATE_SUB(CURDATE(), INTERVAL 4 MONTH), DATE_SUB(CURDATE(), INTERVAL 3 MONTH), 'resolved'),
          ('TR004', 'Bushing Damage', 'Physical damage to bushing', DATE_SUB(CURDATE(), INTERVAL 3 MONTH), DATE_SUB(CURDATE(), INTERVAL 2 MONTH), 'resolved'),
          ('TR005', 'Oil Contamination', 'Oil sample showing contamination', DATE_SUB(CURDATE(), INTERVAL 2 MONTH), DATE_SUB(CURDATE(), INTERVAL 1 MONTH), 'resolved'),
          ('TR006', 'Voltage Fluctuation', 'Unstable voltage readings', DATE_SUB(CURDATE(), INTERVAL 1 MONTH), NULL, 'open')
      `)
      
      // Insert sample transformers
      await connection.query(`
        INSERT INTO transformers (serial_number, manufacturer, capacity_kva, manufacturing_date, installation_date, location)
        VALUES 
          ('TR001', 'ABB', 1000.00, '2020-01-01', '2020-02-01', 'Location A'),
          ('TR002', 'Siemens', 2000.00, '2020-03-01', '2020-04-01', 'Location B'),
          ('TR003', 'GE', 1500.00, '2020-05-01', '2020-06-01', 'Location C'),
          ('TR004', 'ABB', 2500.00, '2020-07-01', '2020-08-01', 'Location D'),
          ('TR005', 'Siemens', 3000.00, '2020-09-01', '2020-10-01', 'Location E'),
          ('TR006', 'GE', 1800.00, '2020-11-01', '2020-12-01', 'Location F')
      `)
    }
    
    console.log('Database initialization completed successfully')
    return { success: true }
  } catch (error) {
    console.error('Database initialization error:', error)
    throw error
  } finally {
    connection.release()
  }
}

// Export the query helper and pool
export { executeQuery as query }
export const db = pool

// Initialize database on module load
initDatabase().catch(error => {
  console.error('Failed to initialize database:', error)
  process.exit(1)
})

// Form-specific query helpers

// Commissioning forms
export async function saveCommissioningForm(data: any) {
  console.log('Saving commissioning form with data:', data)
  
  const sql = `
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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  
  const params = [
    data.transformerId,
    data.dateCommissioned,
    data.location,
    data.technicianId,
    data.voltage_reading || data.voltageReading || '',
    data.current_reading || data.currentReading || '',
    data.oil_level || data.oilLevel || '',
    data.silica_gel_condition || data.silicaGelCondition || '',
    data.earthing_status || data.earthingStatus || '',
    data.installation_quality || data.installationQuality || '',
    data.notes || '',
    data.status || 'Draft'
  ]
  
  return await executeQuery(sql, params)
}

// Inspection forms
export async function saveInspectionForm(data: any) {
  const sql = `
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
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  
  const params = [
    data.transformerId,
    data.inspectionDate,
    data.technicianId,
    data.overallCondition,
    data.oilLevel,
    data.oilLeakage,
    data.silicaGelCondition,
    data.bushingsCondition,
    data.radiatorCondition,
    data.paintworkCondition,
    data.earthingCondition,
    data.temperatureReading,
    data.voltageReading,
    data.currentReading,
    data.recommendations,
    data.nextInspectionDate,
    data.status || 'Draft'
  ]
  
  return await executeQuery(sql, params)
}

// Fault forms
export async function saveFaultForm(data: any) {
  const sql = `
    INSERT INTO fault_forms (
      transformer_id,
      report_date,
      reporter_id,
      fault_type,
      fault_description,
      fault_date,
      impact,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `
  
  const params = [
    data.transformerId,
    data.reportDate,
    data.reporterId,
    data.faultType,
    data.faultDescription,
    data.faultDate,
    data.impact,
    data.status || 'Reported'
  ]
  
  return await executeQuery(sql, params)
}

// Update inspection form
export async function updateInspectionForm(id: number, data: any) {
  const sql = `
    UPDATE inspection_forms SET
      transformer_id = ?,
      inspection_date = ?,
      technician_id = ?,
      overall_condition = ?,
      oil_level = ?,
      oil_leakage = ?,
      silica_gel_condition = ?,
      bushings_condition = ?,
      radiator_condition = ?,
      paintwork_condition = ?,
      earthing_condition = ?,
      temperature_reading = ?,
      voltage_reading = ?,
      current_reading = ?,
      recommendations = ?,
      next_inspection_date = ?,
      status = ?
    WHERE id = ?
  `
  
  const params = [
    data.transformerId,
    data.inspectionDate,
    data.technicianId,
    data.overallCondition,
    data.oilLevel,
    data.oilLeakage,
    data.silicaGelCondition,
    data.bushingsCondition,
    data.radiatorCondition,
    data.paintworkCondition,
    data.earthingCondition,
    data.temperatureReading,
    data.voltageReading,
    data.currentReading,
    data.recommendations,
    data.nextInspectionDate,
    data.status || 'Draft',
    id
  ]
  
  return await executeQuery(sql, params)
}

// Update fault form
export async function updateFaultForm(id: number, data: any) {
  const sql = `
    UPDATE fault_forms SET
      transformer_id = ?,
      report_date = ?,
      reporter_id = ?,
      fault_type = ?,
      fault_description = ?,
      fault_date = ?,
      impact = ?,
      status = ?
    WHERE id = ?
  `
  
  const params = [
    data.transformerId,
    data.reportDate,
    data.reporterId,
    data.faultType,
    data.faultDescription,
    data.faultDate,
    data.impact,
    data.status || 'Reported',
    id
  ]
  
  return await executeQuery(sql, params)
}

// Delete form functions
export async function deleteInspectionForm(id: number) {
  const sql = `DELETE FROM inspection_forms WHERE id = ?`
  return await executeQuery(sql, [id])
}

export async function deleteFaultForm(id: number) {
  const sql = `DELETE FROM fault_forms WHERE id = ?`
  return await executeQuery(sql, [id])
}

// Export a function to manually reinitialize the database
export async function reinitializeDatabase() {
  try {
    console.log('Manually reinitializing database...')
    await initDatabase()
    return { success: true, message: 'Database reinitialized successfully' }
  } catch (error) {
    console.error('Manual database reinitialization error:', error)
    return { success: false, error: String(error) }
  }
}