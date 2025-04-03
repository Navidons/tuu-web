import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const trendsData = await query(`
      WITH RECURSIVE months AS (
        SELECT DATE_SUB(CURDATE(), INTERVAL 5 MONTH) as date
        UNION ALL
        SELECT DATE_ADD(date, INTERVAL 1 MONTH)
        FROM months
        WHERE date < CURDATE()
      ),
      monthly_stats AS (
        SELECT 
          DATE_FORMAT(maintenance_date, '%Y-%m') as month,
          COUNT(*) as total_tasks,
          SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed_tasks,
          SUM(CASE WHEN status IN ('Scheduled', 'In Progress') THEN 1 ELSE 0 END) as pending_tasks
        FROM maintenance_records
        WHERE maintenance_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(maintenance_date, '%Y-%m')
      )
      SELECT 
        DATE_FORMAT(m.date, '%Y-%m') as month,
        COALESCE(ms.total_tasks, 0) as total_tasks,
        COALESCE(ms.completed_tasks, 0) as completed_tasks,
        COALESCE(ms.pending_tasks, 0) as pending_tasks,
        ROUND((COALESCE(ms.completed_tasks, 0) / NULLIF(COALESCE(ms.total_tasks, 0), 0)) * 100, 2) as efficiency
      FROM months m
      LEFT JOIN monthly_stats ms ON DATE_FORMAT(m.date, '%Y-%m') = ms.month
      ORDER BY m.date ASC
    `)

    return NextResponse.json({ 
      success: true, 
      data: trendsData 
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching trends data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trends data' },
      { status: 500 }
    )
  }
} 