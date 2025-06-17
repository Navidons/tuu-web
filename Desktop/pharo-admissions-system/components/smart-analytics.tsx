"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Brain, TrendingUp, AlertTriangle, Activity, Sparkles } from "lucide-react"

interface SmartInsight {
  id: string
  type: "trend" | "anomaly" | "prediction" | "recommendation"
  title: string
  description: string
  confidence: number
  impact: "high" | "medium" | "low"
  actionable: boolean
  data?: any
}

interface PredictiveMetrics {
  nextWeekApplications: number
  approvalRateForecast: number
  capacityUtilization: number
  riskScore: number
  efficiencyScore: number
}

export function SmartAnalytics() {
  const [insights, setInsights] = useState<SmartInsight[]>([])
  const [predictions, setPredictions] = useState<PredictiveMetrics>({
    nextWeekApplications: 45,
    approvalRateForecast: 82.5,
    capacityUtilization: 78,
    riskScore: 15,
    efficiencyScore: 94,
  })
  const [loading, setLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d")

  useEffect(() => {
    generateSmartInsights()
  }, [selectedTimeframe])

  const generateSmartInsights = async () => {
    setLoading(true)

    // Simulate AI-generated insights
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockInsights: SmartInsight[] = [
      {
        id: "1",
        type: "trend",
        title: "Application Volume Surge Detected",
        description:
          "Applications increased 34% compared to last week. This trend suggests strong interest in the upcoming academic year.",
        confidence: 0.92,
        impact: "high",
        actionable: true,
        data: { change: 34, period: "week" },
      },
      {
        id: "2",
        type: "prediction",
        title: "Approval Rate Optimization Opportunity",
        description:
          "AI models predict approval rate could increase to 85% by adjusting review criteria for applications with scores >0.75.",
        confidence: 0.87,
        impact: "medium",
        actionable: true,
        data: { currentRate: 78, predictedRate: 85 },
      },
      {
        id: "3",
        type: "anomaly",
        title: "Processing Time Anomaly",
        description:
          "Average processing time increased by 40% for applications submitted on weekends. Consider weekend review scheduling.",
        confidence: 0.95,
        impact: "medium",
        actionable: true,
        data: { normalTime: 2.3, anomalyTime: 3.2 },
      },
      {
        id: "4",
        type: "recommendation",
        title: "Automated Pre-screening Opportunity",
        description:
          "67% of applications could be pre-screened automatically based on document completeness and basic criteria.",
        confidence: 0.89,
        impact: "high",
        actionable: true,
        data: { automationPotential: 67 },
      },
    ]

    setInsights(mockInsights)
    setLoading(false)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "trend":
        return <TrendingUp className="h-4 w-4 text-blue-600" />
      case "prediction":
        return <Brain className="h-4 w-4 text-purple-600" />
      case "anomaly":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "recommendation":
        return <Sparkles className="h-4 w-4 text-green-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const predictiveData = [
    { name: "Mon", actual: 12, predicted: 14 },
    { name: "Tue", actual: 15, predicted: 16 },
    { name: "Wed", actual: 18, predicted: 19 },
    { name: "Thu", actual: 22, predicted: 21 },
    { name: "Fri", actual: 25, predicted: 24 },
    { name: "Sat", predicted: 18 },
    { name: "Sun", predicted: 15 },
  ]

  const riskFactors = [
    { name: "Document Issues", value: 35, color: "#ef4444" },
    { name: "Incomplete Info", value: 28, color: "#f59e0b" },
    { name: "Eligibility", value: 22, color: "#eab308" },
    { name: "Other", value: 15, color: "#6b7280" },
  ]

  const efficiencyMetrics = [
    { metric: "Processing Speed", score: 94, target: 90 },
    { metric: "Accuracy Rate", score: 97, target: 95 },
    { metric: "User Satisfaction", score: 89, target: 85 },
    { metric: "System Uptime", score: 99.8, target: 99.5 },
  ]

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
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Brain className="mr-3 h-8 w-8 text-purple-600" />
            Smart Analytics
          </h1>
          <p className="text-gray-600">AI-powered insights and predictive analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-purple-700 border-purple-200 bg-purple-50">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
          <Button variant="outline" onClick={generateSmartInsights}>
            Refresh Insights
          </Button>
        </div>
      </div>

      {/* Predictive Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Next Week Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{predictions.nextWeekApplications}</div>
            <p className="text-xs text-purple-600">Expected applications</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Approval Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{predictions.approvalRateForecast}%</div>
            <p className="text-xs text-blue-600">Predicted rate</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Efficiency Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{predictions.efficiencyScore}%</div>
            <p className="text-xs text-green-600">System performance</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Capacity Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{predictions.capacityUtilization}%</div>
            <p className="text-xs text-orange-600">Current utilization</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{predictions.riskScore}%</div>
            <p className="text-xs text-red-600">System risk level</p>
          </CardContent>
        </Card>
      </div>

      {/* Smart Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
            AI-Generated Insights
          </CardTitle>
          <CardDescription>Actionable insights powered by machine learning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((insight) => (
              <Card key={insight.id} className="border-l-4 border-l-purple-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getInsightIcon(insight.type)}
                      <span className="font-medium text-sm capitalize">{insight.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getImpactColor(insight.impact)}>
                        {insight.impact} impact
                      </Badge>
                      <Badge variant="outline">{(insight.confidence * 100).toFixed(0)}% confidence</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-base">{insight.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  {insight.actionable && (
                    <Button size="sm" variant="outline" className="text-purple-600 border-purple-200">
                      Take Action
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Analytics */}
      <Tabs defaultValue="predictions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Application Volume</CardTitle>
              <CardDescription>AI forecast vs actual application submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={predictiveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual" />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle>Risk Factor Analysis</CardTitle>
              <CardDescription>Common issues affecting application processing</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskFactors}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskFactors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency">
          <Card>
            <CardHeader>
              <CardTitle>System Efficiency Metrics</CardTitle>
              <CardDescription>Performance indicators vs targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {efficiencyMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{metric.metric}</span>
                      <span className="text-gray-500">
                        {metric.score}% / {metric.target}%
                      </span>
                    </div>
                    <Progress value={(metric.score / metric.target) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Application Trends</CardTitle>
              <CardDescription>Historical patterns and seasonal variations</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={predictiveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
