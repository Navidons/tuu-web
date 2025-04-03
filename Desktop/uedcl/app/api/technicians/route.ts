import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// GET handler to fetch all technicians
export async function GET() {
  try {
    const technicians = await query(`
      SELECT u.id, u.name, u.email, u.role, 
             t.id as team_id, t.name as team_name,
             tm.joined_date
      FROM users u
      LEFT JOIN team_members tm ON u.id = tm.user_id
      LEFT JOIN teams t ON tm.team_id = t.id
      WHERE u.role = 'Technician'
      ORDER BY u.name ASC
    `)
    
    return NextResponse.json({ 
      success: true, 
      technicians
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching technicians:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch technicians' },
      { status: 500 }
    )
  }
}

// POST handler to create a new technician
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, team_id, specialization, role = 'Technician' } = body
    
    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      )
    }
    
    // Start a transaction
    await query('START TRANSACTION')
    
    try {
      // Insert new user
      const userResult = await query(`
        INSERT INTO users (name, email, role)
        VALUES (?, ?, ?)
      `, [name, email, role])
      
      const userId = userResult.insertId
      
      // If team_id is provided, add user to the team
      if (team_id) {
        const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
        await query(`
          INSERT INTO team_members (user_id, team_id, joined_date)
          VALUES (?, ?, ?)
        `, [userId, team_id, today])
      }
      
      // Commit the transaction
      await query('COMMIT')
      
      return NextResponse.json({ 
        success: true, 
        message: 'Technician created successfully',
        technician_id: userId
      }, { status: 201 })
    } catch (error) {
      // Rollback in case of error
      await query('ROLLBACK')
      throw error
    }
  } catch (error) {
    console.error('Error creating technician:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create technician' },
      { status: 500 }
    )
  }
} 