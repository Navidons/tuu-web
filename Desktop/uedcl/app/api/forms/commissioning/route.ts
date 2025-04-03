import { NextResponse } from 'next/server'
import { saveCommissioningForm, initDatabase, query } from '@/lib/db'

// Initialize database when this module loads
initDatabase().catch(console.error)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const transformerId = searchParams.get('transformerId')
    
    let sql = 'SELECT * FROM commissioning_forms'
    let params: any[] = []
    
    if (id) {
      sql = 'SELECT * FROM commissioning_forms WHERE id = ?'
      params = [id]
    } else if (transformerId) {
      sql = 'SELECT * FROM commissioning_forms WHERE transformer_id = ? ORDER BY date_commissioned DESC'
      params = [transformerId]
    } else {
      // Default is to return all forms ordered by most recent
      sql += ' ORDER BY created_at DESC LIMIT 100'
    }
    
    const results = await query(sql, params)
    return NextResponse.json({ success: true, data: results })
  } catch (error) {
    console.error('Error retrieving commissioning forms:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve commissioning forms' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    console.log('Received commissioning form submission')
    const data = await request.json()
    console.log('Received data:', data)
    
    // Validate data here
    if (!data.transformerId) {
      console.error('Missing transformerId')
      return NextResponse.json(
        { success: false, error: 'Missing transformer ID' },
        { status: 400 }
      )
    }
    
    // Default values for missing but required fields
    const formData = {
      ...data,
      technicianId: data.technicianId || '1',
      dateCommissioned: data.dateCommissioned || new Date().toISOString().split('T')[0],
      location: data.location || 'Unknown',
      voltage_reading: data.voltageReading || data.voltage || '',
      current_reading: data.currentReading || data.current || '',
      oil_level: data.oilLevel || '',
      silica_gel_condition: data.silicaGelCondition || '',
      earthing_status: data.earthingStatus || '',
      installation_quality: data.installationQuality || '',
      notes: data.notes || data.comments || '',
      status: data.status || 'Draft'
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
          formData.location,
          formData.dateCommissioned
        ])
        
        console.log('Created new transformer record')
      }
    } catch (err) {
      console.error('Error creating transformer record (continuing anyway):', err)
      // Continue with form submission even if transformer creation fails
    }
    
    // Save to database using the helper function
    const result = await saveCommissioningForm(formData)
    console.log('Database result:', result)
    
    // Check if result has insertId
    const insertId = 'insertId' in result ? result.insertId : undefined
    
    return NextResponse.json({ 
      success: true, 
      id: insertId,
      message: 'Form submitted successfully' 
    })
  } catch (error) {
    console.error('Error saving commissioning form:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save form: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    )
  }
} 