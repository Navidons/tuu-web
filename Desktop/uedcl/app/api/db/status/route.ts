import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    // Check database connection by querying table structure
    const tables = await query('SHOW TABLES')
    const tableNames = tables.map((table: any) => Object.values(table)[0])
    
    // Check table structures
    const tableStructures = {}
    
    for (const tableName of tableNames) {
      const columns = await query(`DESCRIBE ${tableName}`)
      tableStructures[tableName] = columns
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful',
      tables: tableNames,
      structures: tableStructures
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection failed', 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
} 