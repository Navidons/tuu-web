/**
 * Database Setup Script
 * This script can be used to initialize the database with the schema and optional sample data.
 * Usage: npm run db:setup
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
require('dotenv').config({ path: '.env.local' });

// Database configuration from environment variables
const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true // Enable multiple statements for running the SQL files
};

async function readSqlFile(filename) {
  try {
    const filePath = path.join(__dirname, filename);
    const content = await readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    throw error;
  }
}

async function setupDatabase() {
  let connection;
  
  try {
    console.log('Connecting to MySQL server...');
    connection = await mysql.createConnection(config);
    
    console.log('Reading schema.sql...');
    const schemaSql = await readSqlFile('schema.sql');
    
    console.log('Executing schema.sql...');
    await connection.query(schemaSql);
    console.log('Schema created successfully.');
    
    // Check if seed data should be loaded
    const loadSeed = process.argv.includes('--with-seed');
    if (loadSeed) {
      console.log('Reading seed.sql...');
      const seedSql = await readSqlFile('seed.sql');
      
      console.log('Executing seed.sql...');
      await connection.query(seedSql);
      console.log('Sample data loaded successfully.');
    }
    
    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the setup
setupDatabase(); 