import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const transformers = await query(
      'SELECT * FROM transformers ORDER BY id DESC'
    );
    
    return NextResponse.json({ transformers }, { status: 200 });
  } catch (error) {
    console.error('Error fetching transformers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transformers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.serial_number || !data.manufacturer || !data.capacity_kva) {
      return NextResponse.json(
        { error: 'Serial number, manufacturer, and capacity are required' },
        { status: 400 }
      );
    }
    
    // Check if serial number already exists
    const existingTransformers = await query(
      'SELECT * FROM transformers WHERE serial_number = ?',
      [data.serial_number]
    );
    
    if (Array.isArray(existingTransformers) && existingTransformers.length > 0) {
      return NextResponse.json(
        { error: 'A transformer with this serial number already exists' },
        { status: 409 }
      );
    }
    
    // Insert new transformer
    const result = await query(
      `INSERT INTO transformers (
        serial_number, 
        manufacturer, 
        capacity_kva, 
        manufacturing_date,
        installation_date,
        location,
        gps_coordinates,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.serial_number,
        data.manufacturer,
        data.capacity_kva,
        data.manufacturing_date || null,
        data.installation_date || null,
        data.location || null,
        data.gps_coordinates || null,
        data.status || 'Active'
      ]
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Transformer added successfully' 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error adding transformer:', error);
    return NextResponse.json(
      { error: 'Failed to add transformer' },
      { status: 500 }
    );
  }
} 