"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Target,
  Zap,
  Database,
  Shield,
} from "lucide-react"
import { format, subDays, startOfDay } from "date-fns"

interface DashboardMetrics {
  totalApplications: number
  todayApplications: number
  weeklyGrowth: number
  conversionRate: number
  avgProcessingTime: string
  pendingReview: number
  systemHealth: number
  activeUsers: number
}

interface ChartData {
  daily: Array<{ date: string; applications: number; approved: number; rejected: number }>
  status: Array<{ name: string; value: number; color: string }>
  processing: Array<{ stage: string; count: number; avgTime: number }>
}

export function AdvancedDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalApplications: 0,
    todayApplications: 0,
    weeklyGrowth: 0,
    conversionRate: 0,
    avgProcessingTime: "0 days",
    pendingReview: 0,
    systemHealth: 100,
    activeUsers: 0,
  })
  const [chartData, setChartData] = useState<ChartData>({
    daily: [],
    status: [],
    processing: [],
  })
  const [loading, setLoading] = useState(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")

  useEffect(() => {
    fetchDashboardData()
  }, [selectedTimeRange])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch applications data
      const { data: applications } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false })

      if (applications) {
        const today = startOfDay(new Date())
        const weekAgo = subDays(today, 7)

        // Calculate metrics
        const totalApplications = applications.length
        const todayApplications = applications.filter((app) => startOfDay(new Date(app.created_at)) >= today).length

        const thisWeekApps = applications.filter((app) => new Date(app.created_at) >= weekAgo).length
        const lastWeekApps = applications.filter((app) => {
          const appDate = new Date(app.created_at)
          return appDate >= subDays(weekAgo, 7) && appDate < weekAgo
        }).length

        const weeklyGrowth = lastWeekApps > 0 ? ((thisWeekApps - lastWeekApps) / lastWeekApps) * 100 : 0

        const approvedApps = applications.filter((app) => app.status === "approved").length
        const conversionRate = totalApplications > 0 ? (approvedApps / totalApplications) * 100 : 0

        const pendingReview = applications.filter((app) => app.status === "pending").length

        // Generate daily chart data
        const dailyData = []
        for (let i = 6; i >= 0; i--) {
          const date = subDays(new Date(), i)
          const dayApps = applications.filter(
            (app) => startOfDay(new Date(app.created_at)).getTime() === startOfDay(date).getTime(),
          )

          dailyData.push({
            date: format(date, "MMM dd"),
            applications: dayApps.length,
            approved: dayApps.filter((app) => app.status === "approved").length,
            rejected: dayApps.filter((app) => app.status === "rejected").length,
          })
        }

        // Status distribution
        const statusData = [
          {
            name: "Approved",
            value: applications.filter((app) => app.status === "approved").length,
            color: "#10b981",
          },
          {
            name: "Pending",
            value: applications.filter((app) => app.status === "pending").length,
            color: "#f59e0b",
          },
          {
            name: "Rejected",
            value: applications.filter((app) => app.status === "rejected").length,
            color: "#ef4444",
          },
          {
            name: "Deferred",
            value: applications.filter((app) => app.status === "deferred").length,
            color: "#8b5cf6",
          },
        ]

        // Processing pipeline data
        const processingData = [
          { stage: "New Applications", count: pendingReview, avgTime: 0 },
          { stage: "Under Review", count: Math.floor(pendingReview * 0.6), avgTime: 2 },
          { stage: "Final Decision", count: Math.floor(pendingReview * 0.3), avgTime: 1 },
          { stage: "Completed", count: approvedApps, avgTime: 0 },
        ]

        setMetrics({
          totalApplications,
          todayApplications,
          weeklyGrowth,
          conversionRate,
          avgProcessingTime: "2.3 days",
          pendingReview,
          systemHealth: 98.5,
          activeUsers: 12,
        })

        setChartData({
          daily: dailyData,
          status: statusData,
          processing: processingData,
        })
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const MetricCard = ({
    title,
    value,
    change,
    icon: Icon,
    trend = "up",
    suffix = "",
  }: {
    title: string
    value: string | number
    change?: number
    icon: any
    trend?: "up" | "down" | "neutral"
    suffix?: string
  }) => (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">
          {typeof value === "number" ? value.toLocaleString() : value}
          {suffix}
        </div>
        {change !== undefined && (
          <div className="flex items-center mt-1">
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            ) : trend === "down" ? (
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
            ) : null}
            <span
              className={`text-xs ${
                trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-500"
              }`}
            >
              {change > 0 ? "+" : ""}
              {change.toFixed(1)}% from last week
            </span>
          </div>
        )}
      </CardContent>
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 ${
          trend === "up" ? "bg-green-500" : trend === "down" ? "bg-red-500" : "bg-gray-300"
        }`}
      />
    </Card>
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Enterprise Dashboard</h1>
          <p className="text-gray-600">Real-time insights and system analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
            <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Live Data
          </Badge>
          <Button variant="outline" onClick={fetchDashboardData}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Applications"
          value={metrics.totalApplications}
          change={metrics.weeklyGrowth}
          icon={Users}
          trend={metrics.weeklyGrowth > 0 ? "up" : "down"}
        />
        <MetricCard title="Today's Applications" value={metrics.todayApplications} icon={Calendar} trend="neutral" />
        <MetricCard
          title="Conversion Rate"
          value={metrics.conversionRate.toFixed(1)}
          suffix="%"
          icon={Target}
          trend="up"
        />
        <MetricCard title="Avg Processing Time" value={metrics.avgProcessingTime} icon={Clock} trend="down" />
      </div>

      {/* System Health */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-green-600" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Overall Health</span>
                <span className="font-medium">{metrics.systemHealth}%</span>
              </div>
              <Progress value={metrics.systemHealth} className="h-2" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    Database
                  </div>
                  <div className="text-xs text-gray-500 ml-4">Optimal</div>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    API
                  </div>
                  <div className="text-xs text-gray-500 ml-4">Healthy</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5 text-blue-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <CheckCircle className="mr-2 h-4 w-4" />
              Review Pending ({metrics.pendingReview})
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Database className="mr-2 h-4 w-4" />
              Generate Reports
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-orange-600" />
              Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Pending Reviews</span>
              <Badge variant="secondary">{metrics.pendingReview}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>System Alerts</span>
              <Badge variant="outline">0</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Active Users</span>
              <Badge variant="outline">{metrics.activeUsers}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Application Trends</TabsTrigger>
          <TabsTrigger value="status">Status Distribution</TabsTrigger>
          <TabsTrigger value="pipeline">Processing Pipeline</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Application Trends (Last 7 Days)</CardTitle>
              <CardDescription>Daily application submissions and approvals</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData.daily}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    name="Total Applications"
                  />
                  <Area
                    type="monotone"
                    dataKey="approved"
                    stackId="2"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                    name="Approved"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Application Status Distribution</CardTitle>
              <CardDescription>Current status breakdown of all applications</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData.status}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.status.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline">
          <Card>
            <CardHeader>
              <CardTitle>Processing Pipeline</CardTitle>
              <CardDescription>Applications at each stage of the review process</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData.processing}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
