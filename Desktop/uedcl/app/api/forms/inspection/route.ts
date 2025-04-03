import { NextResponse } from 'next/server'
import { saveInspectionForm, query, updateInspectionForm, deleteInspectionForm, initDatabase } from '@/lib/db'

// Initialize database when this module loads
initDatabase().catch(console.error)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const transformerId = searchParams.get('transformerId')
    
    let sql = 'SELECT * FROM inspection_forms'
    let params: any[] = []
    
    if (id) {
      sql = 'SELECT * FROM inspection_forms WHERE id = ?'
      params = [id]
    } else if (transformerId) {
      sql = 'SELECT * FROM inspection_forms WHERE transformer_id = ? ORDER BY inspection_date DESC'
      params = [transformerId]
    } else {
      // Default is to return all forms ordered by most recent
      sql += ' ORDER BY created_at DESC LIMIT 100'
    }
    
    const results = await query(sql, params)
    return NextResponse.json({ success: true, data: results })
  } catch (error) {
    console.error('Error retrieving inspection forms:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve inspection forms' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    console.log('Received inspection form submission')
    const data = await request.json()
    console.log('Received data:', data)
    
    // Validate data
    if (!data.transformerId) {
      console.error('Missing transformerId')
      return NextResponse.json(
        { success: false, error: 'Missing transformer ID' },
        { status: 400 }
      )
    }
    
    if (!data.inspectionDate) {
      console.error('Missing inspectionDate')
      return NextResponse.json(
        { success: false, error: 'Missing inspection date' },
        { status: 400 }
      )
    }
    
    // Default values for missing but required fields
    const formData = {
      ...data,
      technicianId: data.technicianId || '1',
      status: data.status || 'Draft',
      recommendations: data.recommendations || data.comments || ''
    }
    
    console.log('Processed form data:', formData)
    
    // Attempt to add transformer to transformers table if it doesn't exist yet
    try {
      const existingTransformer = await query('SELECT * FROM transformers WHERE serial_number = ?', [formData.transformerId])
      
      if (Array.isArray(existingTransformer) && existingTransformer.length === 0) {
        console.log('Creating new transformer record for serial:', formData.transformerId)
        
        // Extract transformer details from form data if available
        const manufacturer = formData.manufacturer || 'Unknown'
        const capacity = formData.rating || 0
        
        await query(`
          INSERT INTO transformers (
            serial_number, 
            manufacturer, 
            capacity_kva, 
            location, 
            installation_date
          ) VALUES (?, ?, ?, ?, ?)
        `, [
          formData.transformerId,
          manufacturer,
          capacity,
          formData.location || 'Unknown',
          new Date().toISOString().split('T')[0] // Today's date
        ])
        
        console.log('Created new transformer record')
      }
    } catch (err) {
      console.error('Error creating transformer record (continuing anyway):', err)
      // Continue with form submission even if transformer creation fails
    }
    
    // Save to database using the helper function
    const result = await saveInspectionForm(formData)
    console.log('Database result:', result)
    
    // Check if result has insertId
    const insertId = 'insertId' in result ? result.insertId : undefined
    
    return NextResponse.json({ 
      success: true, 
      id: insertId,
      message: 'Form submitted successfully' 
    })
  } catch (error) {
    console.error('Error saving inspection form:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save form: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    
    // Validate data
    if (!data.id) {
      return NextResponse.json(
        { success: false, error: 'Missing form ID' },
        { status: 400 }
      )
    }
    
    if (!data.transformerId || !data.inspectionDate || !data.technicianId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Update in database
    const result = await updateInspectionForm(data.id, data)
    
    return NextResponse.json({ success: true, affectedRows: result.affectedRows })
  } catch (error) {
    console.error('Error updating inspection form:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update form' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing form ID' },
        { status: 400 }
      )
    }
    
    // Delete from database
    const result = await deleteInspectionForm(Number(id))
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Form not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, affectedRows: result.affectedRows })
  } catch (error) {
    console.error('Error deleting inspection form:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete form' },
      { status: 500 }
    )
  }
} 