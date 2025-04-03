import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const [
      transformerStats,
      maintenanceStatus,
      technicianCount,
      criticalIssues,
      transformerHealth,
      recentActivities,
      upcomingMaintenance
    ] = await Promise.all([
      // Total transformers count
      query(`
        SELECT COUNT(*) as total
        FROM transformers
        WHERE status != 'Decommissioned'
      `),
      
      // Maintenance status distribution
      query(`
        SELECT 
          SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed,
          SUM(CASE WHEN status IN ('Scheduled', 'In Progress') THEN 1 ELSE 0 END) as in_progress,
          SUM(CASE 
            WHEN status != 'Completed' 
            AND maintenance_date < CURDATE() 
            THEN 1 ELSE 0 END
          ) as overdue
        FROM maintenance_records
        WHERE maintenance_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      `),
      
      // Available technicians
      query(`
        SELECT COUNT(*) as total
        FROM users
        WHERE role = 'Technician'
      `),
      
      // Critical issues count
      query(`
        SELECT COUNT(*) as total
        FROM fault_forms
        WHERE impact = 'High'
        AND status NOT IN ('Resolved', 'Closed')
      `),
      
      // Transformer health distribution
      query(`
        SELECT 
          health_status,
          COUNT(*) as count
        FROM (
          SELECT 
            CASE 
              WHEN last_maintenance_date >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH) THEN 'Excellent'
              WHEN last_maintenance_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) THEN 'Good'
              WHEN last_maintenance_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH) THEN 'Fair'
              ELSE 'Poor'
            END as health_status
          FROM transformers
          WHERE status != 'Decommissioned'
        ) AS health_summary
        GROUP BY health_status
        ORDER BY 
          CASE health_status
            WHEN 'Excellent' THEN 1
            WHEN 'Good' THEN 2
            WHEN 'Fair' THEN 3
            WHEN 'Poor' THEN 4
          END
      `),
      
      // Recent activities
      query(`
        SELECT 
          m.id,
          t.serial_number,
          m.maintenance_type,
          DATE_FORMAT(m.maintenance_date, '%Y-%m-%d') as maintenance_date,
          m.status,
          u.name as technician_name
        FROM maintenance_records m
        JOIN transformers t ON m.transformer_id = t.serial_number
        LEFT JOIN users u ON m.technician_id = u.id
        WHERE m.maintenance_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        ORDER BY m.maintenance_date DESC
        LIMIT 5
      `),
      
      // Upcoming maintenance
      query(`
        SELECT 
          m.id,
          t.serial_number,
          m.maintenance_type,
          DATE_FORMAT(m.maintenance_date, '%Y-%m-%d') as maintenance_date,
          m.status,
          u.name as technician_name
        FROM maintenance_records m
        JOIN transformers t ON m.transformer_id = t.serial_number
        LEFT JOIN users u ON m.technician_id = u.id
        WHERE m.maintenance_date > CURDATE()
        AND m.status IN ('Scheduled', 'In Progress')
        ORDER BY m.maintenance_date ASC
        LIMIT 5
      `)
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalTransformers: transformerStats[0].total,
        maintenanceStatus: {
          completed: maintenanceStatus[0].completed || 0,
          inProgress: maintenanceStatus[0].in_progress || 0,
          overdue: maintenanceStatus[0].overdue || 0
        },
        availableTechnicians: technicianCount[0].total,
        criticalIssues: criticalIssues[0].total,
        transformerHealth: transformerHealth,
        recentActivities: recentActivities,
        upcomingMaintenance: upcomingMaintenance
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
} 