import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET handler to fetch a specific team by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const teamId = parseInt(params.id)
    
    // Validate ID
    if (isNaN(teamId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid team ID' },
        { status: 400 }
      )
    }
    
    // Get team details
    const teams = await query(`
      SELECT t.*, u.name as supervisor_name 
      FROM teams t
      LEFT JOIN users u ON t.supervisor_id = u.id
      WHERE t.id = ?
    `, [teamId])
    
    if (teams.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Team not found' },
        { status: 404 }
      )
    }
    
    const team = teams[0]
    
    // Get team members
    const members = await query(`
      SELECT u.id, u.name, u.email, u.role, tm.joined_date
      FROM team_members tm
      JOIN users u ON tm.user_id = u.id
      WHERE tm.team_id = ?
      ORDER BY u.name ASC
    `, [teamId])
    
    team.members = members
    
    return NextResponse.json({ 
      success: true, 
      team
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching team:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch team' },
      { status: 500 }
    )
  }
}

// PUT handler to update a team
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const teamId = parseInt(params.id)
    
    // Validate ID
    if (isNaN(teamId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid team ID' },
        { status: 400 }
      )
    }
    
    // Check if team exists
    const teams = await query('SELECT id FROM teams WHERE id = ?', [teamId])
    if (teams.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Team not found' },
        { status: 404 }
      )
    }
    
    const body = await req.json()
    const { name, supervisor_id, region, specialization } = body
    
    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Team name is required' },
        { status: 400 }
      )
    }
    
    // Update team
    await query(`
      UPDATE teams 
      SET name = ?, supervisor_id = ?, region = ?, specialization = ?
      WHERE id = ?
    `, [name, supervisor_id || null, region || null, specialization || null, teamId])
    
    return NextResponse.json({ 
      success: true, 
      message: 'Team updated successfully'
    }, { status: 200 })
  } catch (error) {
    console.error('Error updating team:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update team' },
      { status: 500 }
    )
  }
}

// DELETE handler to delete a team
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const teamId = parseInt(params.id)
    
    // Validate ID
    if (isNaN(teamId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid team ID' },
        { status: 400 }
      )
    }
    
    // Check if team exists
    const teams = await query('SELECT id FROM teams WHERE id = ?', [teamId])
    if (teams.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Team not found' },
        { status: 404 }
      )
    }
    
    // Start transaction
    await query('START TRANSACTION')
    
    try {
      // First remove all team members
      await query('DELETE FROM team_members WHERE team_id = ?', [teamId])
      
      // Then delete the team
      await query('DELETE FROM teams WHERE id = ?', [teamId])
      
      // Commit transaction
      await query('COMMIT')
      
      return NextResponse.json({ 
        success: true, 
        message: 'Team deleted successfully'
      }, { status: 200 })
    } catch (error) {
      // Rollback in case of error
      await query('ROLLBACK')
      throw error
    }
  } catch (error) {
    console.error('Error deleting team:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete team' },
      { status: 500 }
    )
  }
} 