import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET handler to fetch a specific technician by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const technicianId = parseInt(params.id)
    
    // Validate ID
    if (isNaN(technicianId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid technician ID' },
        { status: 400 }
      )
    }
    
    // Get technician details
    const technicians = await query(`
      SELECT u.id, u.name, u.email, u.role, u.created_at
      FROM users u
      WHERE u.id = ? AND u.role = 'Technician'
    `, [technicianId])
    
    if (technicians.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Technician not found' },
        { status: 404 }
      )
    }
    
    const technician = technicians[0]
    
    // Get team information
    const teams = await query(`
      SELECT t.id, t.name, t.region, tm.joined_date
      FROM team_members tm
      JOIN teams t ON tm.team_id = t.id
      WHERE tm.user_id = ?
    `, [technicianId])
    
    technician.team = teams.length > 0 ? teams[0] : null
    
    return NextResponse.json({ 
      success: true, 
      technician
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching technician:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch technician' },
      { status: 500 }
    )
  }
}

// PUT handler to update a technician
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const technicianId = parseInt(params.id)
    
    // Validate ID
    if (isNaN(technicianId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid technician ID' },
        { status: 400 }
      )
    }
    
    // Check if technician exists
    const technicians = await query(`
      SELECT id FROM users WHERE id = ? AND role = 'Technician'
    `, [technicianId])
    
    if (technicians.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Technician not found' },
        { status: 404 }
      )
    }
    
    const body = await req.json()
    const { name, email, team_id } = body
    
    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      )
    }
    
    // Start transaction
    await query('START TRANSACTION')
    
    try {
      // Update user information
      await query(`
        UPDATE users 
        SET name = ?, email = ?
        WHERE id = ?
      `, [name, email, technicianId])
      
      // Handle team assignment
      if (team_id !== undefined) {
        // First, remove current team assignment if any
        await query('DELETE FROM team_members WHERE user_id = ?', [technicianId])
        
        // If a new team is specified, add the technician to it
        if (team_id) {
          const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
          await query(`
            INSERT INTO team_members (user_id, team_id, joined_date)
            VALUES (?, ?, ?)
          `, [technicianId, team_id, today])
        }
      }
      
      // Commit transaction
      await query('COMMIT')
      
      return NextResponse.json({ 
        success: true, 
        message: 'Technician updated successfully'
      }, { status: 200 })
    } catch (error) {
      // Rollback in case of error
      await query('ROLLBACK')
      throw error
    }
  } catch (error) {
    console.error('Error updating technician:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update technician' },
      { status: 500 }
    )
  }
}

// DELETE handler to delete a technician
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const technicianId = parseInt(params.id)
    
    // Validate ID
    if (isNaN(technicianId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid technician ID' },
        { status: 400 }
      )
    }
    
    // Check if technician exists
    const technicians = await query(`
      SELECT id FROM users WHERE id = ? AND role = 'Technician'
    `, [technicianId])
    
    if (technicians.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Technician not found' },
        { status: 404 }
      )
    }
    
    // Start transaction
    await query('START TRANSACTION')
    
    try {
      // First remove team memberships
      await query('DELETE FROM team_members WHERE user_id = ?', [technicianId])
      
      // Then delete the technician (user)
      await query('DELETE FROM users WHERE id = ?', [technicianId])
      
      // Commit transaction
      await query('COMMIT')
      
      return NextResponse.json({ 
        success: true, 
        message: 'Technician deleted successfully'
      }, { status: 200 })
    } catch (error) {
      // Rollback in case of error
      await query('ROLLBACK')
      throw error
    }
  } catch (error) {
    console.error('Error deleting technician:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete technician' },
      { status: 500 }
    )
  }
} 