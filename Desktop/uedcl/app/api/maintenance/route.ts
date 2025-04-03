import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const maintenanceRecords = await query(`
      SELECT 
        maintenance_records.*,
        transformers.serial_number,
        transformers.location,
        users.name as assigned_to_name
      FROM maintenance_records
      LEFT JOIN transformers ON maintenance_records.transformer_id = transformers.serial_number
      LEFT JOIN users ON maintenance_records.technician_id = users.id
      ORDER BY maintenance_records.maintenance_date DESC
    `);

    return NextResponse.json({ 
      success: true, 
      data: maintenanceRecords 
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching maintenance records:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch maintenance records' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['transformer_id', 'maintenance_date', 'maintenance_type', 'technician_id', 'actions_taken']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    // Ensure transformer exists
    const transformerCheck = await query(
      'SELECT id FROM transformers WHERE serial_number = ?', 
      [body.transformer_id]
    )
    
    if (transformerCheck.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Transformer not found' },
        { status: 404 }
      )
    }
    
    // Insert the maintenance record
    const result = await query(
      `INSERT INTO maintenance_tasks (
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
        status, 
        notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.transformer_id,
        body.maintenance_date,
        body.maintenance_type,
        body.technician_id,
        body.actions_taken,
        body.parts_replaced || null,
        body.oil_changed || false,
        body.oil_quantity_added || null,
        body.duration_hours || null,
        body.next_maintenance_date || null,
        body.status || 'Scheduled',
        body.notes || null
      ]
    )
    
    // Update transformer's last_maintenance_date if the status is 'Completed'
    if (body.status === 'Completed') {
      await query(
        'UPDATE transformers SET last_maintenance_date = ? WHERE serial_number = ?',
        [body.maintenance_date, body.transformer_id]
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Maintenance record created successfully',
      id: result.insertId
    })
  } catch (error) {
    console.error('Error creating maintenance record:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create maintenance record' },
      { status: 500 }
    )
  }
} 