import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET handler to fetch all teams
export async function GET() {
  try {
    // First fetch all teams
    const teams = await query(`
      SELECT t.*, u.name as supervisor_name 
      FROM teams t
      LEFT JOIN users u ON t.supervisor_id = u.id
      ORDER BY t.name ASC
    `)
    
    // For each team, fetch the member count
    for(let i = 0; i < teams.length; i++) {
      const memberCount = await query(`
        SELECT COUNT(*) as count
        FROM team_members
        WHERE team_id = ?
      `, [teams[i].id])
      
      teams[i].members_count = memberCount[0].count
    }
    
    return NextResponse.json({ 
      success: true, 
      teams
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching teams:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch teams' },
      { status: 500 }
    )
  }
}

// POST handler to create a new team
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, supervisor_id, region, specialization } = body
    
    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Team name is required' },
        { status: 400 }
      )
    }
    
    // Insert new team
    const result = await query(`
      INSERT INTO teams (name, supervisor_id, region, specialization)
      VALUES (?, ?, ?, ?)
    `, [name, supervisor_id || null, region || null, specialization || null])
    
    return NextResponse.json({ 
      success: true, 
      message: 'Team created successfully',
      team_id: result.insertId
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating team:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create team' },
      { status: 500 }
    )
  }
} 