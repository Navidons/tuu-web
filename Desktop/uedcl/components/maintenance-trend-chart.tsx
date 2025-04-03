"use client"

import { 
  ResponsiveContainer, 
  LineChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  Line,
  CHART_COLORS
} from "@/components/ui/chart"

interface TrendsData {
  month: string;
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  efficiency: number;
}

interface MaintenanceTrendChartProps {
  data: TrendsData[];
}

export function MaintenanceTrendChart({ data }: MaintenanceTrendChartProps) {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.gray} />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="total_tasks" name="Total Tasks" stroke={CHART_COLORS.blue} strokeWidth={2} dot={{ r: 5 }} />
          <Line yAxisId="left" type="monotone" dataKey="completed_tasks" name="Completed Tasks" stroke={CHART_COLORS.green} strokeWidth={2} dot={{ r: 5 }} />
          <Line yAxisId="left" type="monotone" dataKey="pending_tasks" name="Pending Tasks" stroke={CHART_COLORS.orange} strokeWidth={2} dot={{ r: 5 }} />
          <Line yAxisId="right" type="monotone" dataKey="efficiency" name="Efficiency %" stroke={CHART_COLORS.purple} strokeWidth={2} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

