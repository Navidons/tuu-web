import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const searchQuery = searchParams.get("search");
    const statusFilter = searchParams.get("status");
    const priorityFilter = searchParams.get("priority");
    const sortBy = searchParams.get("sortBy") || "created_at";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    let query = supabase.from("applications").select("*");

    if (searchQuery) {
      query = query.or(
        `full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,status.ilike.%${searchQuery}%,priority.ilike.%${searchQuery}%`
      );
    }

    if (statusFilter && statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    if (priorityFilter && priorityFilter !== "all") {
      query = query.eq("priority", priorityFilter);
    }

    query = query.order(sortBy as any, { ascending: sortOrder === "asc" });

    const { data: applications, error } = await query;

    if (error) {
      console.error("Error fetching applications:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(applications);
  } catch (error: any) {
    console.error("Unexpected error fetching applications:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { data, error } = await supabase.from("applications").insert([body]).select()

    if (error) {
      console.error("Error creating application:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error: any) {
    console.error("Unexpected error creating application:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}