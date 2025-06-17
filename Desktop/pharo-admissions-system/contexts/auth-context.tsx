"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"

interface AuthContextType {
  user: User | null
  userRole: string | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("AuthContext useEffect: Initializing session check.");
    
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        console.log("AuthContext: Initial session data received:", session);
        setUser(session?.user ?? null);

        if (sessionError) {
          console.error("AuthContext: Error getting initial session:", sessionError);
          // Even if there's an error getting the session, loading should finish
          setLoading(false);
          return;
        }

        if (session?.user) {
          // Await fetchUserRole to ensure loading state is managed after role is fetched
          await fetchUserRole(session.user.id);
        } else {
          console.log("AuthContext: No initial session user found, setting loading to false.");
          setLoading(false);
        }
      } catch (error) {
        console.error("AuthContext: Unexpected error during initial auth setup:", error);
        setLoading(false); // Ensure loading is false even on unexpected errors
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("AuthContext: Auth state changed. Event:", event, "Session:", session);
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchUserRole(session.user.id) // Await here to ensure role is fetched before loading completes
      } else {
        setUserRole(null)
        console.log("AuthContext: No user in session after auth state change. UserRole set to null.");
      }
      setLoading(false) // Set loading to false after auth state change is fully processed
      console.log("AuthContext: Auth state change processed, setting loading to false.");
    })

    return () => {
      console.log("AuthContext: Unsubscribing from auth state changes.");
      subscription.unsubscribe();
    }
  }, [])

  const fetchUserRole = async (userId: string) => {
    console.log("AuthContext: Fetching user role for userId:", userId);
    try {
      const { data, error } = await supabase.from("users").select("role").eq("id", userId).single()

      if (error) {
        console.error("AuthContext: Error fetching user role from DB:", error.message || error);
        if (error.code === "PGRST116") {
          console.log("AuthContext: User not found in users table, attempting to create admin user.");
          await createUserRecord(userId)
          setUserRole("admin")
        } else {
          setUserRole("admin")
        }
      } else {
        setUserRole(data?.role || "admin")
        console.log("AuthContext: User role fetched:", data?.role);
      }
    } catch (error) {
      console.error("AuthContext: Unexpected error fetching user role:", error)
      setUserRole("admin")
    } finally {
      setLoading(false)
    }
  }

  const createUserRecord = async (userId: string) => {
    console.log("AuthContext: Attempting to create user record for userId:", userId);
    try {
      const { data: authUser, error: authError } = await supabase.auth.getUser()
      
      if (authError) {
        console.error("AuthContext: Error getting auth user for record creation:", authError)
        return
      }

      if (authUser.user) {
        const { error } = await supabase.from("users").insert({
          id: userId,
          email: authUser.user.email || "",
          role: "admin",
          full_name: authUser.user.user_metadata?.full_name || null,
        })

        if (error) {
          console.error("AuthContext: Error creating user record in DB:", error)
        } else {
          console.log("AuthContext: User record created successfully.")
        }
      }
    } catch (error) {
      console.error("AuthContext: Unexpected error creating user record:", error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    console.log("AuthContext: Attempting to sign in user:", email);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      console.error("AuthContext: Sign in error:", error);
    } else {
      console.log("AuthContext: Sign in successful.");
    }
    return { error }
  }

  const signOut = async () => {
    console.log("AuthContext: Attempting to sign out user.");
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("AuthContext: Sign out error:", error);
    } else {
      console.log("AuthContext: Sign out successful.");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
