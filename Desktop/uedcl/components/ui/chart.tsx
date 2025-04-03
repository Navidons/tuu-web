"use client"

import * as React from "react"
import { 
  Bar, 
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  Tooltip as RechartsTooltip,
  Cell,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from "recharts"

// Simple color utility
export const CHART_COLORS = {
  blue: "hsl(var(--chart-1))",
  green: "hsl(var(--chart-2))",
  purple: "hsl(var(--chart-3))",
  orange: "hsl(var(--chart-4))",
  red: "hsl(var(--chart-5))",
  gray: "rgba(229, 231, 235, 0.5)",
  darkGray: "rgba(100, 100, 100, 0.5)",
}

// Dark mode aware grid color function
export const getGridColor = () => {
  if (typeof window !== 'undefined') {
    return document.documentElement.classList.contains('dark') 
      ? CHART_COLORS.darkGray 
      : CHART_COLORS.gray;
  }
  return CHART_COLORS.gray;
}

// Simple container without context
export function ChartContainer({ 
  children, 
  className = "w-full h-[400px]" 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

// Rename ChartTooltip to ChartTooltipContent (or export it with both names)
export function ChartTooltipContent({ 
  active, 
  payload, 
  label 
}: { 
  active?: boolean; 
  payload?: any[]; 
  label?: string;
}) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-md border bg-white dark:bg-gray-800 p-2 shadow-sm dark:border-gray-700 dark:shadow-lg">
      <div className="font-medium mb-1">{label}</div>
      {payload.map((item: any, index: number) => (
        <div
          key={index}
          className="flex items-center justify-between gap-2 text-sm py-0.5"
        >
          <div className="flex items-center gap-1.5">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color || CHART_COLORS.blue }}
            />
            <span>{item.name}</span>
          </div>
          <div className="font-semibold">{item.value}</div>
        </div>
      ))}
    </div>
  )
}

// Export the component with both names to support both usages
export { ChartTooltipContent as ChartTooltip };

// Export recharts components directly
export { 
  Bar, 
  Line, 
  Pie, 
  Cell,
  Legend,
  RechartsBarChart as BarChart,
  RechartsLineChart as LineChart,
  RechartsPieChart as PieChart,
  RechartsTooltip as Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine
}
