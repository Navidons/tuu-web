import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

  try {
    // Test basic connection
    const { data: testData, error: testError } = await supabase
      .from("archived_applications")
      .select("count")
      .limit(1);

    if (testError) {
      return NextResponse.json({ 
        success: false, 
        error: testError.message,
        code: testError.code
      }, { status: 500 });
    }

    // Test full query
    const { data: fullData, error: fullError } = await supabase
      .from("archived_applications")
      .select("*")
      .limit(5);

    return NextResponse.json({
      success: true,
      testQuery: testData,
      fullQuery: {
        count: fullData?.length,
        data: fullData,
        error: fullError
      }
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: "Internal server error",
      details: error
    }, { status: 500 });
  }
} 