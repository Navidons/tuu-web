import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the transformer by ID
    const transformerResults = await query(
      'SELECT * FROM transformers WHERE id = ?',
      [params.id]
    );
    
    // If no transformer was found
    if (!Array.isArray(transformerResults) || transformerResults.length === 0) {
      return NextResponse.json(
        { error: 'Transformer not found' },
        { status: 404 }
      );
    }
    
    const transformer = transformerResults[0];
    
    // Get maintenance history for this transformer
    const maintenanceResults = await query(
      'SELECT * FROM maintenance_records WHERE transformer_id = ? ORDER BY maintenance_date DESC',
      [transformer.serial_number]
    );
    
    // Get issues/faults for this transformer
    const faultResults = await query(
      'SELECT * FROM fault_forms WHERE transformer_id = ? ORDER BY report_date DESC',
      [transformer.serial_number]
    );
    
    return NextResponse.json({
      transformer,
      maintenance: Array.isArray(maintenanceResults) ? maintenanceResults : [],
      issues: Array.isArray(faultResults) ? faultResults : []
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching transformer details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transformer details' },
      { status: 500 }
    );
  }
} 