import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://mkggwlpiirfdaxmwbstg.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rZ2d3bHBpaXJmZGF4bXdic3RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMDg3MzUsImV4cCI6MjA2NTY4NDczNX0.AbDflRBZ_qWavcYve3r-GzVx696aJs83rzYd5KmwS8o"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string | null
          dob: string | null
          gender: string | null
          nationality: string | null
          documents: any
          status: "pending" | "approved" | "rejected" | "deferred"
          created_at: string
          approved_by: string | null
          approved_at: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone?: string | null
          dob?: string | null
          gender?: string | null
          nationality?: string | null
          documents?: any
          status?: "pending" | "approved" | "rejected" | "deferred"
          created_at?: string
          approved_by?: string | null
          approved_at?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string | null
          dob?: string | null
          gender?: string | null
          nationality?: string | null
          documents?: any
          status?: "pending" | "approved" | "rejected" | "deferred"
          created_at?: string
          approved_by?: string | null
          approved_at?: string | null
          notes?: string | null
        }
      }
      students: {
        Row: {
          id: string
          application_id: string | null
          enrolled_date: string
          class_admitted: string | null
          student_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          application_id?: string | null
          enrolled_date?: string
          class_admitted?: string | null
          student_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          application_id?: string | null
          enrolled_date?: string
          class_admitted?: string | null
          student_id?: string | null
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          role: "admin" | "clerk" | "principal" | "viewer"
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: "admin" | "clerk" | "principal" | "viewer"
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: "admin" | "clerk" | "principal" | "viewer"
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      letter_templates: {
        Row: {
          id: string
          name: string
          type: "acceptance" | "rejection" | "deferral"
          subject: string
          content: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: "acceptance" | "rejection" | "deferral"
          subject: string
          content: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: "acceptance" | "rejection" | "deferral"
          subject?: string
          content?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
