import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const issuesData = await query(`
      SELECT 
        fault_type as issue_type,
        COUNT(*) as count,
        ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM fault_forms), 2) as percentage
      FROM fault_forms
      WHERE report_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY fault_type
      ORDER BY count DESC
    `)

    return NextResponse.json({ 
      success: true, 
      data: issuesData 
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching issues data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch issues data' },
      { status: 500 }
    )
  }
} 