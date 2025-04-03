"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ClipboardCheckIcon, UsersIcon, WrenchIcon, AlertTriangleIcon, ClipboardIcon } from "lucide-react"
import { RecentActivities } from "@/components/recent-activities"
import { UpcomingMaintenance } from "@/components/upcoming-maintenance"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/chart"
import { toast } from "sonner"

interface DashboardData {
  totalTransformers: number;
  maintenanceStatus: {
    completed: number;
    inProgress: number;
    overdue: number;
  };
  availableTechnicians: number;
  criticalIssues: number;
  transformerHealth: Array<{
    condition: string;
    count: number;
  }>;
  recentActivities: any[];
  upcomingMaintenance: any[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${apiUrl}/api/dashboard`);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          toast.error('Failed to load dashboard data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const maintenanceStatusData = [
    { name: 'Completed', value: Number(data.maintenanceStatus.completed) || 0 },
    { name: 'In Progress', value: Number(data.maintenanceStatus.inProgress) || 0 },
    { name: 'Overdue', value: Number(data.maintenanceStatus.overdue) || 0 },
  ];

  const COLORS = ['#4ade80', '#60a5fa', '#f97316', '#f43f5e'];

  const renderCustomizedLabel = ({ name, value, percent }: { name: string; value: number; percent: number }) => {
    if (value === 0) return '';
    return `${name}: ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/forms">
                <ClipboardIcon className="mr-2 h-4 w-4" />
                Field Forms
              </Link>
            </Button>
            <Button asChild>
              <Link href="/maintenance/new">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Schedule Maintenance
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transformers</CardTitle>
              <WrenchIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalTransformers}</div>
              <p className="text-xs text-muted-foreground">Across all districts</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Maintenance</CardTitle>
              <ClipboardCheckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.maintenanceStatus.completed + data.maintenanceStatus.inProgress}</div>
              <p className="text-xs text-muted-foreground">Due in the next 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Technicians Available</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.availableTechnicians}</div>
              <p className="text-xs text-muted-foreground">Across 3 specialized teams</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
              <AlertTriangleIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.criticalIssues}</div>
              <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Maintenance Status</CardTitle>
              <CardDescription>Overview of maintenance completion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={maintenanceStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {maintenanceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} tasks`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Transformer Health</CardTitle>
              <CardDescription>Distribution of transformer conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.transformerHealth}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="health_status" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Number of Transformers" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest maintenance activities performed</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivities />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/maintenance?tab=completed">View All Activities</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Upcoming Maintenance</CardTitle>
              <CardDescription>Scheduled maintenance in the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <UpcomingMaintenance />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/maintenance">View Full Schedule</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

