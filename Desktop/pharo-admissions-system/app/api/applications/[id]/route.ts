import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params

  try {
    const supabase = await createClient()

    const { data: application, error } = await supabase
      .from('applications')
      .select(`
        *,
        user:users (
          id,
          email,
          first_name,
          last_name,
          phone_number
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching application:', error)
      return NextResponse.json(
        { error: 'Failed to fetch application' },
        { status: 500 }
      )
    }

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error('Error in GET /api/applications/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params

  let archived_by: string | undefined
  let archived_reason: string | undefined

  try {
    const body = await request.json()
    archived_by = body.archived_by
    archived_reason = body.archived_reason
  } catch (error) {
    console.log('No JSON body provided for deletion')
  }

  try {
    const supabase = await createClient()

    const { data: application, error: fetchError } = await supabase
      .from('applications')
      .select('id, status')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Error fetching application:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch application' },
        { status: 500 }
      )
    }

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    const { error: deleteError } = await supabase
      .rpc('delete_application', { 
        p_application_id: id, 
        p_archived_by: (archived_by && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(archived_by)) ? archived_by : null, 
        p_archived_reason: archived_reason || 'No reason provided' 
      })

    if (deleteError) {
      console.error('Error deleting application:', deleteError)
      return NextResponse.json(
        { error: `Failed to delete application: ${deleteError.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Application archived successfully',
      id: id
    })
  } catch (error) {
    console.error('Error in DELETE /api/applications/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params

  try {
    const supabase = await createClient()
    const body = await request.json()

    // First verify the application exists
    const { data: existingApplication, error: fetchError } = await supabase
      .from('applications')
      .select('id')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Error fetching application:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch application' },
        { status: 500 }
      )
    }

    if (!existingApplication) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    // Update the application
    const { data: updatedApplication, error: updateError } = await supabase
      .from('applications')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating application:', updateError)
      return NextResponse.json(
        { error: 'Failed to update application' },
        { status: 500 }
      )
    }

    return NextResponse.json(updatedApplication)
  } catch (error) {
    console.error('Error in PUT /api/applications/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 