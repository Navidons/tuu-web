import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// POST handler to add a member to a team
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const teamId = parseInt(params.id)
    
    // Validate team ID
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
    const { user_id } = body
    
    // Validate user ID
    if (!user_id) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }
    
    // Check if user exists
    const users = await query('SELECT id FROM users WHERE id = ?', [user_id])
    if (users.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }
    
    // Check if user is already in the team
    const members = await query(
      'SELECT * FROM team_members WHERE user_id = ? AND team_id = ?',
      [user_id, teamId]
    )
    
    if (members.length > 0) {
      return NextResponse.json(
        { success: false, error: 'User is already a member of this team' },
        { status: 409 }
      )
    }
    
    // Add user to team
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    await query(
      'INSERT INTO team_members (user_id, team_id, joined_date) VALUES (?, ?, ?)',
      [user_id, teamId, today]
    )
    
    return NextResponse.json({ 
      success: true, 
      message: 'Member added to team successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error adding team member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add team member' },
      { status: 500 }
    )
  }
}

// DELETE handler to remove a member from a team
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const teamId = parseInt(params.id)
    
    // Validate team ID
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
    
    // Get the user ID from query parameters
    const url = new URL(req.url)
    const userId = url.searchParams.get('user_id')
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }
    
    // Check if user is a member of the team
    const members = await query(
      'SELECT * FROM team_members WHERE user_id = ? AND team_id = ?',
      [userId, teamId]
    )
    
    if (members.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User is not a member of this team' },
        { status: 404 }
      )
    }
    
    // Remove user from team
    await query(
      'DELETE FROM team_members WHERE user_id = ? AND team_id = ?',
      [userId, teamId]
    )
    
    return NextResponse.json({ 
      success: true, 
      message: 'Member removed from team successfully'
    }, { status: 200 })
  } catch (error) {
    console.error('Error removing team member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove team member' },
      { status: 500 }
    )
  }
} 