import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { count, error } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending")

    if (error) {
      console.error("Error fetching pending applications count:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ count: count || 0 }, { status: 200 })
  } catch (error) {
    console.error("Unexpected error in pending applications count API:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    )
  }
} 