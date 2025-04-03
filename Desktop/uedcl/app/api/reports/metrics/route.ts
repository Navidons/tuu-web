import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const metricsData = await query(`
      SELECT 
        -- Maintenance completion rate
        ROUND(
          (SELECT COUNT(*) FROM maintenance_records WHERE status = 'Completed') * 100.0 / 
          NULLIF((SELECT COUNT(*) FROM maintenance_records), 0)
        , 2) as completion_rate,
        
        -- Average response time (in hours)
        ROUND(
          (SELECT AVG(duration_hours) FROM maintenance_records WHERE status = 'Completed')
        , 2) as avg_response_time,
        
        -- Transformer failure rate
        ROUND(
          (SELECT COUNT(DISTINCT transformer_id) FROM fault_forms WHERE fault_type = 'Failure') * 100.0 / 
          NULLIF((SELECT COUNT(*) FROM transformers), 0)
        , 2) as failure_rate,
        
        -- PM compliance rate
        ROUND(
          (SELECT COUNT(*) FROM maintenance_records WHERE maintenance_type = 'Preventive' AND status = 'Completed') * 100.0 /
          NULLIF((SELECT COUNT(*) FROM transformers), 0)
        , 2) as pm_compliance,
        
        -- Mean time between failures (in days)
        ROUND(
          (SELECT AVG(DATEDIFF(f2.fault_date, f1.fault_date))
           FROM fault_forms f1
           JOIN fault_forms f2 ON f1.transformer_id = f2.transformer_id
           AND f2.fault_date > f1.fault_date
           WHERE f1.fault_type = 'Failure' AND f2.fault_type = 'Failure')
        , 2) as mtbf,

        -- Team efficiencies
        ROUND(
          (SELECT COUNT(*) FROM inspection_forms WHERE status = 'Approved') * 100.0 /
          NULLIF((SELECT COUNT(*) FROM inspection_forms), 0)
        , 2) as inspection_team_efficiency,
        
        ROUND(
          (SELECT COUNT(*) FROM maintenance_records 
           WHERE maintenance_type = 'Preventive' AND status = 'Completed') * 100.0 /
          NULLIF((SELECT COUNT(*) FROM maintenance_records WHERE maintenance_type = 'Preventive'), 0)
        , 2) as pm_team_efficiency,
        
        ROUND(
          (SELECT COUNT(*) FROM maintenance_records 
           WHERE maintenance_type = 'Corrective' AND status = 'Completed') * 100.0 /
          NULLIF((SELECT COUNT(*) FROM maintenance_records WHERE maintenance_type = 'Corrective'), 0)
        , 2) as pdm_team_efficiency,
        
        -- Average tasks per technician (weekly)
        ROUND(
          (SELECT COUNT(*) FROM maintenance_records 
           WHERE maintenance_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)) /
          NULLIF((SELECT COUNT(*) FROM users WHERE role = 'Technician'), 0)
        , 2) as avg_tasks_per_technician,
        
        -- Resource utilization
        ROUND(
          (SELECT COUNT(*) FROM maintenance_records 
           WHERE status = 'Completed' OR status = 'In Progress') * 100.0 /
          NULLIF((SELECT COUNT(*) FROM maintenance_records), 0)
        , 2) as resource_utilization
    `)

    return NextResponse.json({ 
      success: true, 
      data: metricsData[0] 
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching metrics data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch metrics data' },
      { status: 500 }
    )
  }
} 