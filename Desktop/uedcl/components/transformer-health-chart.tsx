"use client"

import { Cell, Pie, PieChart, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Excellent", value: 540 },
  { name: "Good", value: 420 },
  { name: "Fair", value: 210 },
  { name: "Poor", value: 78 },
]

export function TransformerHealthChart() {
  return (
    <ChartContainer
      config={{
        excellent: {
          label: "Excellent",
          color: "hsl(var(--chart-1))",
        },
        good: {
          label: "Good",
          color: "hsl(var(--chart-2))",
        },
        fair: {
          label: "Fair",
          color: "hsl(var(--chart-3))",
        },
        poor: {
          label: "Poor",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="h-[300px]"
    >
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`var(--color-${entry.name.toLowerCase()})`} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltipContent />} />
      </PieChart>
    </ChartContainer>
  )
}

