import { NextResponse } from 'next/server'
import { reinitializeDatabase } from '@/lib/db'

export async function GET() {
  try {
    const result = await reinitializeDatabase()
    
    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 500 })
    }
  } catch (error) {
    console.error('Error in reinitializeDatabase endpoint:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to reinitialize database' },
      { status: 500 }
    )
  }
} 