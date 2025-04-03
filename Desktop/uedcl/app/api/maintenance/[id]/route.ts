import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    // Get the maintenance record with transformer details
    const maintenanceResults = await query(
      `SELECT m.*, t.serial_number, t.location, t.manufacturer, t.capacity_kva, t.status as transformer_status 
       FROM maintenance_records m 
       LEFT JOIN transformers t ON m.transformer_id = t.serial_number 
       WHERE m.id = ?`,
      [id]
    )

    if (maintenanceResults.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Maintenance record not found' },
        { status: 404 }
      )
    }

    // Get technician information if needed (this could come from a users table)
    // For now, we'll just use the technician_id as is
    const maintenanceRecord = maintenanceResults[0]

    return NextResponse.json({
      success: true,
      maintenance: maintenanceRecord
    })
  } catch (error) {
    console.error('Error fetching maintenance record:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch maintenance record' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()
    
    // Check if the maintenance record exists
    const maintenanceCheck = await query(
      'SELECT id FROM maintenance_records WHERE id = ?',
      [id]
    )
    
    if (maintenanceCheck.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Maintenance record not found' },
        { status: 404 }
      )
    }
    
    // Fields that can be updated
    const allowedFields = [
      'maintenance_date',
      'maintenance_type',
      'technician_id',
      'actions_taken',
      'parts_replaced',
      'oil_changed',
      'oil_quantity_added',
      'duration_hours',
      'next_maintenance_date',
      'status',
      'notes'
    ]
    
    // Build the update query
    const updateFields = []
    const updateParams = []
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateFields.push(`${field} = ?`)
        updateParams.push(body[field])
      }
    }
    
    if (updateFields.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      )
    }
    
    // Add the ID to the parameters
    updateParams.push(id)
    
    // Execute the update
    await query(
      `UPDATE maintenance_records SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      updateParams
    )
    
    // Update transformer's last_maintenance_date if the status is 'Completed'
    if (body.status === 'Completed') {
      const transformerId = (await query(
        'SELECT transformer_id FROM maintenance_records WHERE id = ?',
        [id]
      ))[0].transformer_id
      
      await query(
        'UPDATE transformers SET last_maintenance_date = ? WHERE serial_number = ?',
        [body.maintenance_date, transformerId]
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Maintenance record updated successfully'
    })
  } catch (error) {
    console.error('Error updating maintenance record:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update maintenance record' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    
    // Check if the maintenance record exists
    const maintenanceCheck = await query(
      'SELECT id FROM maintenance_records WHERE id = ?',
      [id]
    )
    
    if (maintenanceCheck.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Maintenance record not found' },
        { status: 404 }
      )
    }
    
    // Delete the maintenance record
    await query('DELETE FROM maintenance_records WHERE id = ?', [id])
    
    return NextResponse.json({
      success: true,
      message: 'Maintenance record deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting maintenance record:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete maintenance record' },
      { status: 500 }
    )
  }
} 