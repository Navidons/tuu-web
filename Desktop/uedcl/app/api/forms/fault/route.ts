import { NextResponse } from 'next/server'
import { saveFaultForm, query, updateFaultForm, deleteFaultForm, initDatabase } from '@/lib/db'

// Initialize database when this module loads
initDatabase().catch(console.error)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const transformerId = searchParams.get('transformerId')
    const status = searchParams.get('status')
    
    let sql = 'SELECT * FROM fault_forms'
    let params: any[] = []
    let whereClauses = []
    
    if (id) {
      whereClauses.push('id = ?')
      params.push(id)
    }
    
    if (transformerId) {
      whereClauses.push('transformer_id = ?')
      params.push(transformerId)
    }
    
    if (status) {
      whereClauses.push('status = ?')
      params.push(status)
    }
    
    if (whereClauses.length > 0) {
      sql += ' WHERE ' + whereClauses.join(' AND ')
    }
    
    // Default order by most recent
    sql += ' ORDER BY created_at DESC'
    
    // Add limit unless searching for specific ID
    if (!id) {
      sql += ' LIMIT 100'
    }
    
    const results = await query(sql, params)
    return NextResponse.json({ success: true, data: results })
  } catch (error) {
    console.error('Error retrieving fault forms:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve fault forms' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    console.log('Received fault form submission')
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
    
    if (!data.faultDescription) {
      console.error('Missing faultDescription')
      return NextResponse.json(
        { success: false, error: 'Missing fault description' },
        { status: 400 }
      )
    }
    
    // Default values for missing but required fields
    const formData = {
      ...data,
      reportDate: data.reportDate || data.faultDate || new Date().toISOString().split('T')[0],
      reporterId: data.reporterId || data.technicianId || data.engineerId || '1',
      faultType: data.faultType || data.faultNature || 'Unknown',
      impact: data.impact || 'Unknown',
      status: data.status || 'Reported'
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
    const result = await saveFaultForm(formData)
    console.log('Database result:', result)
    
    // Check if result has insertId
    const insertId = 'insertId' in result ? result.insertId : undefined
    
    return NextResponse.json({ 
      success: true, 
      id: insertId,
      message: 'Form submitted successfully' 
    })
  } catch (error) {
    console.error('Error saving fault form:', error)
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
    
    if (!data.transformerId || !data.reportDate || !data.reporterId || !data.faultType || !data.faultDescription) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Update in database
    const result = await updateFaultForm(data.id, data)
    
    return NextResponse.json({ success: true, affectedRows: result.affectedRows })
  } catch (error) {
    console.error('Error updating fault form:', error)
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
    const result = await deleteFaultForm(Number(id))
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Form not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, affectedRows: result.affectedRows })
  } catch (error) {
    console.error('Error deleting fault form:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete form' },
      { status: 500 }
    )
  }
} 