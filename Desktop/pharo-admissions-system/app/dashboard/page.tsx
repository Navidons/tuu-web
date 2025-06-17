"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { AdvancedDashboard } from "@/components/advanced-dashboard"

interface Application {
  id: string
  full_name: string
  email: string
  status: string
  created_at: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  })
  const [recentApplications, setRecentApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch statistics
      const { data: applications } = await supabase.from("applications").select("status")

      if (applications) {
        const stats = applications.reduce(
          (acc, app) => {
            acc.total++
            acc[app.status as keyof typeof acc]++
            return acc
          },
          { total: 0, approved: 0, rejected: 0, pending: 0, deferred: 0 },
        )
        setStats(stats)
      }

      // Fetch recent applications
      const { data: recent } = await supabase
        .from("applications")
        .select("id, full_name, email, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5)

      if (recent) {
        setRecentApplications(recent)
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "deferred":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    )
  }

  return <AdvancedDashboard stats={stats} recentApplications={recentApplications} />
}
