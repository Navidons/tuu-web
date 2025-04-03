"use client"

import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", completed: 85, pending: 15, overdue: 5 },
  { month: "Feb", completed: 90, pending: 8, overdue: 2 },
  { month: "Mar", completed: 78, pending: 12, overdue: 10 },
  { month: "Apr", completed: 92, pending: 5, overdue: 3 },
  { month: "May", completed: 88, pending: 10, overdue: 2 },
  { month: "Jun", completed: 82, pending: 15, overdue: 3 },
]

export function MaintenanceStatusChart() {
  return (
    <ChartContainer
      config={{
        completed: {
          label: "Completed",
          color: "hsl(var(--chart-1))",
        },
        pending: {
          label: "Pending",
          color: "hsl(var(--chart-2))",
        },
        overdue: {
          label: "Overdue",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend />
        <Bar dataKey="completed" fill="var(--color-completed)" />
        <Bar dataKey="pending" fill="var(--color-pending)" />
        <Bar dataKey="overdue" fill="var(--color-overdue)" />
      </BarChart>
    </ChartContainer>
  )
}

