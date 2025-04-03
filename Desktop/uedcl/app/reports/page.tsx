"use client"

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DownloadIcon, BarChart3Icon, PieChartIcon, LineChartIcon } from "lucide-react"
import { 
  ResponsiveContainer, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  Bar, 
  Line,
  CHART_COLORS
} from "@/components/ui/chart"
import { MaintenancePerformanceChart } from "@/components/maintenance-performance-chart"
import { TransformerIssuesChart } from "@/components/transformer-issues-chart"
import { MaintenanceTrendChart } from "@/components/maintenance-trend-chart"
import { toast } from "sonner"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { exportReports } from "@/lib/export-utils"

interface PerformanceData {
  month: string;
  completed: number;
  pending: number;
  efficiency: number;
}

interface IssuesData {
  issue_type: string;
  count: number;
  percentage: number;
}

interface TrendsData {
  month: string;
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  efficiency: number;
}

interface MetricsData {
  completion_rate: number;
  avg_response_time: number;
  failure_rate: number;
  pm_compliance: number;
  mtbf: number;
  inspection_team_efficiency: number;
  pm_team_efficiency: number;
  pdm_team_efficiency: number;
  avg_tasks_per_technician: number;
  resource_utilization: number;
}

export default function ReportsPage() {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [issuesData, setIssuesData] = useState<IssuesData[]>([]);
  const [trendsData, setTrendsData] = useState<TrendsData[]>([]);
  const [metricsData, setMetricsData] = useState<MetricsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        
        // Fetch all data in parallel
        const [performanceRes, issuesRes, trendsRes, metricsRes] = await Promise.all([
          fetch(`${apiUrl}/api/reports/performance`),
          fetch(`${apiUrl}/api/reports/issues`),
          fetch(`${apiUrl}/api/reports/trends`),
          fetch(`${apiUrl}/api/reports/metrics`)
        ]);

        const [performance, issues, trends, metrics] = await Promise.all([
          performanceRes.json(),
          issuesRes.json(),
          trendsRes.json(),
          metricsRes.json()
        ]);

        if (performance.success) setPerformanceData(performance.data);
        if (issues.success) setIssuesData(issues.data);
        if (trends.success) setTrendsData(trends.data);
        if (metrics.success) setMetricsData(metrics.data);
      } catch (error) {
        console.error('Error fetching reports data:', error);
        toast.error('Failed to load reports data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExport = async (format: 'csv' | 'excel' | 'pdf') => {
    try {
      await exportReports(format);
      toast.success(`Reports exported successfully in ${format.toUpperCase()} format`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export reports');
    }
  };

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Export Reports
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('excel')}>
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs defaultValue="performance" className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-background">
            <TabsTrigger value="performance" className="data-[state=active]:bg-primary/10">
              <BarChart3Icon className="mr-2 h-4 w-4 text-primary" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="issues" className="data-[state=active]:bg-primary/10">
              <PieChartIcon className="mr-2 h-4 w-4 text-primary" />
              Issues
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-primary/10">
              <LineChartIcon className="mr-2 h-4 w-4 text-primary" />
              Trends
            </TabsTrigger>
          </TabsList>
          <TabsContent value="performance" className="space-y-6">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="text-2xl text-gray-800">Maintenance Performance</CardTitle>
                <CardDescription className="text-gray-500">Analysis of maintenance completion rates and efficiency</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.gray} />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="completed" name="Completed Tasks" fill={CHART_COLORS.blue} radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="left" dataKey="pending" name="Pending Tasks" fill={CHART_COLORS.orange} radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="efficiency" name="Efficiency %" stroke={CHART_COLORS.green} strokeWidth={2} dot={{ r: 5 }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="issues">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="text-2xl text-gray-800">Transformer Issues</CardTitle>
                <CardDescription className="text-gray-500">Distribution of common transformer issues and failures</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <TransformerIssuesChart data={issuesData} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="trends">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="text-2xl text-gray-800">Maintenance Trends</CardTitle>
                <CardDescription className="text-gray-500">Historical trends in maintenance activities and transformer health</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <MaintenanceTrendChart data={trendsData} />
              </CardContent>
            </Card>
          </TabsContent>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>Summary of important maintenance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <span className="font-medium">Maintenance Completion Rate</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {metricsData?.completion_rate || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Average Response Time</span>
                    <span className="font-bold">
                      {metricsData?.avg_response_time || 0} hours
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Transformer Failure Rate</span>
                    <span className="font-bold text-amber-600">
                      {metricsData?.failure_rate || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Preventive Maintenance Compliance</span>
                    <span className="font-bold text-green-600">
                      {metricsData?.pm_compliance || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Mean Time Between Failures</span>
                    <span className="font-bold">
                      {metricsData?.mtbf || 0} days
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Efficiency</CardTitle>
                <CardDescription>Team performance and resource utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Inspection Team Efficiency</span>
                    <span className="font-bold text-green-600">
                      {metricsData?.inspection_team_efficiency || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">PM Team Efficiency</span>
                    <span className="font-bold text-green-600">
                      {metricsData?.pm_team_efficiency || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">PdM Team Efficiency</span>
                    <span className="font-bold text-amber-600">
                      {metricsData?.pdm_team_efficiency || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Average Tasks per Technician</span>
                    <span className="font-bold">
                      {metricsData?.avg_tasks_per_technician || 0} per week
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Resource Utilization</span>
                    <span className="font-bold text-green-600">
                      {metricsData?.resource_utilization || 0}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

