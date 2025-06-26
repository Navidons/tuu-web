import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Use environment variables or fallback to hardcoded values for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://enyqdavivjqrlflubutr.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVueXFkYXZpdmpxcmxmbHVidXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NDkwNDcsImV4cCI6MjA2NjEyNTA0N30.CuqFTmvMY5qx3FNRJhqp-qHXkkGZBg11pTjGqjbdc3E"

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

export function createClient() {
  // Always create a new instance to ensure it picks up the latest session
  const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    // Add global configuration options
    auth: {
      persistSession: true,
    },
  })

  return supabase
}

// Memoized client for server-side or client-side use
export const supabase = createClient()
