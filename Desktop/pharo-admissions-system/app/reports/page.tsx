"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Download, TrendingUp, Users, Calendar } from "lucide-react"
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns"

interface ReportData {
  totalApplications: number
  approvedApplications: number
  rejectedApplications: number
  pendingApplications: number
  monthlyData: Array<{ month: string; applications: number; approved: number }>
  genderData: Array<{ name: string; value: number }>
  statusData: Array<{ name: string; value: number; color: string }>
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

  useEffect(() => {
    fetchReportData()
  }, [selectedPeriod])

  const fetchReportData = async () => {
    try {
      setLoading(true)

      // Calculate date range based on selected period
      const endDate = new Date()
      const startDate = subMonths(endDate, selectedPeriod === "6months" ? 6 : 12)

      // Fetch all applications
      const { data: applications, error } = await supabase
        .from("applications")
        .select("*")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString())

      if (error) throw error

      // Process data for reports
      const totalApplications = applications?.length || 0
      const approvedApplications = applications?.filter((app) => app.status === "approved").length || 0
      const rejectedApplications = applications?.filter((app) => app.status === "rejected").length || 0
      const pendingApplications = applications?.filter((app) => app.status === "pending").length || 0

      // Monthly data
      const monthlyData = []
      for (let i = 5; i >= 0; i--) {
        const monthStart = startOfMonth(subMonths(endDate, i))
        const monthEnd = endOfMonth(subMonths(endDate, i))
        const monthApps = applications?.filter(
          (app) => new Date(app.created_at) >= monthStart && new Date(app.created_at) <= monthEnd,
        )
        const monthApproved = monthApps?.filter((app) => app.status === "approved")

        monthlyData.push({
          month: format(monthStart, "MMM yyyy"),
          applications: monthApps?.length || 0,
          approved: monthApproved?.length || 0,
        })
      }

      // Gender data
      const maleCount = applications?.filter((app) => app.gender === "Male").length || 0
      const femaleCount = applications?.filter((app) => app.gender === "Female").length || 0
      const genderData = [
        { name: "Male", value: maleCount },
        { name: "Female", value: femaleCount },
      ]

      // Status data
      const statusData = [
        { name: "Approved", value: approvedApplications, color: "#16a34a" },
        { name: "Rejected", value: rejectedApplications, color: "#dc2626" },
        { name: "Pending", value: pendingApplications, color: "#eab308" },
      ]

      setReportData({
        totalApplications,
        approvedApplications,
        rejectedApplications,
        pendingApplications,
        monthlyData,
        genderData,
        statusData,
      })
    } catch (error) {
      console.error("Error fetching report data:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportReport = () => {
    if (!reportData) return

    const csvContent = [
      "Report Generated: " + format(new Date(), "PPP"),
      "",
      "Summary Statistics:",
      `Total Applications,${reportData.totalApplications}`,
      `Approved Applications,${reportData.approvedApplications}`,
      `Rejected Applications,${reportData.rejectedApplications}`,
      `Pending Applications,${reportData.pendingApplications}`,
      "",
      "Monthly Breakdown:",
      "Month,Total Applications,Approved",
      ...reportData.monthlyData.map((item) => `${item.month},${item.applications},${item.approved}`),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `admissions-report-${format(new Date(), "yyyy-MM-dd")}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading reports...</div>
      </div>
    )
  }

  if (!reportData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No data available for reports</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Admissions statistics and trends</p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="12months">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              {selectedPeriod === "6months" ? "Last 6 months" : "Last 12 months"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{reportData.approvedApplications}</div>
            <p className="text-xs text-muted-foreground">
              {reportData.totalApplications > 0
                ? `${Math.round((reportData.approvedApplications / reportData.totalApplications) * 100)}% approval rate`
                : "No applications"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <Calendar className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{reportData.rejectedApplications}</div>
            <p className="text-xs text-muted-foreground">
              {reportData.totalApplications > 0
                ? `${Math.round((reportData.rejectedApplications / reportData.totalApplications) * 100)}% rejection rate`
                : "No applications"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{reportData.pendingApplications}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Applications Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#3b82f6" name="Total Applications" />
                <Bar dataKey="approved" fill="#16a34a" name="Approved" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportData.statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {reportData.statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Gender Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-8">
            {reportData.genderData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <Badge variant="outline">{item.name}</Badge>
                <span className="text-2xl font-bold">{item.value}</span>
                <span className="text-sm text-gray-500">
                  (
                  {reportData.totalApplications > 0 ? Math.round((item.value / reportData.totalApplications) * 100) : 0}
                  %)
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
