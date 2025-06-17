import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);

    const searchQuery = searchParams.get("search");
    const statusFilter = searchParams.get("status");
    const reasonFilter = searchParams.get("reason");
    const sortBy = searchParams.get("sortBy") || "archived_at";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    let query = supabase.from("archived_applications").select(`
      id,
      original_application_id,
      full_name,
      email,
      phone,
      dob,
      gender,
      nationality,
      documents,
      status,
      created_at,
      approved_by,
      approved_at,
      notes,
      priority,
      assigned_to,
      deadline,
      last_activity,
      metadata,
      archived_at,
      archived_by,
      archived_reason
    `);

    if (searchQuery) {
      query = query.or(`full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`);
    }

    if (statusFilter && statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    if (reasonFilter && reasonFilter !== "all") {
      query = query.eq("archived_reason", reasonFilter);
    }

    query = query.order(sortBy as any, { ascending: sortOrder === "asc" });

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching archived applications:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Fetch user emails for archived_by
    const applicationsWithUsers = await Promise.all(
      data.map(async (app) => {
        if (app.archived_by) {
          const { data: user } = await supabase
            .from('users')
            .select('email')
            .eq('id', app.archived_by)
            .single();
          
          return { ...app, archived_by_user: user };
        }
        return { ...app, archived_by_user: null };
      })
    );

    return NextResponse.json(applicationsWithUsers);
  } catch (error) {
    console.error("Error in archived applications API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 