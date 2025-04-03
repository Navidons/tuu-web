import { NextResponse } from 'next/server'
import { query, initDatabase } from '@/lib/db'

export async function GET() {
  try {
    // First check what tables and columns exist
    const tables = await query('SHOW TABLES')
    const tableNames = tables.map((table: any) => Object.values(table)[0])
    
    const issues = []
    let fixesApplied = false
    
    // Check commissioning_forms table
    if (tableNames.includes('commissioning_forms')) {
      const columns = await query('SHOW COLUMNS FROM commissioning_forms')
      const columnNames = columns.map((col: any) => col.Field)
      
      if (!columnNames.includes('date_commissioned')) {
        issues.push('Missing date_commissioned column in commissioning_forms')
        // Drop and recreate the table with proper schema
        await initDatabase()
        fixesApplied = true
      }
    } else {
      issues.push('Missing commissioning_forms table')
      // Create the table with proper schema
      await initDatabase()
      fixesApplied = true
    }
    
    // Check inspection_forms table
    if (tableNames.includes('inspection_forms')) {
      const columns = await query('SHOW COLUMNS FROM inspection_forms')
      const columnNames = columns.map((col: any) => col.Field)
      
      if (!columnNames.includes('inspection_date')) {
        issues.push('Missing inspection_date column in inspection_forms')
        // Drop and recreate the table with proper schema
        await initDatabase()
        fixesApplied = true
      }
    } else {
      issues.push('Missing inspection_forms table')
      // Create the table with proper schema
      await initDatabase()
      fixesApplied = true
    }
    
    // Check fault_forms table
    if (tableNames.includes('fault_forms')) {
      const columns = await query('SHOW COLUMNS FROM fault_forms')
      const columnNames = columns.map((col: any) => col.Field)
      
      if (!columnNames.includes('report_date')) {
        issues.push('Missing report_date column in fault_forms')
        // Drop and recreate the table with proper schema
        await initDatabase()
        fixesApplied = true
      }
    } else {
      issues.push('Missing fault_forms table')
      // Create the table with proper schema
      await initDatabase()
      fixesApplied = true
    }
    
    if (fixesApplied) {
      return NextResponse.json({ 
        success: true, 
        message: 'Schema fixes applied',
        issues,
        action: 'Database schema was updated'
      })
    } else if (issues.length > 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Schema issues found but not fixed',
        issues
      }, { status: 500 })
    } else {
      return NextResponse.json({ 
        success: true, 
        message: 'Database schema is correct',
        issues: []
      })
    }
  } catch (error) {
    console.error('Error fixing database schema:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fix database schema', 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
} 