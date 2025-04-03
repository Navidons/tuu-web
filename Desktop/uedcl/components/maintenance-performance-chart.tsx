"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
  ReferenceLine
} from '@/components/ui/chart';
import { ChartContainer, ChartTooltip, CHART_COLORS, getGridColor } from "@/components/ui/chart";

interface PerformanceData {
  month: string;
  completed: number;
  pending: number;
  efficiency: number;
}

interface MaintenancePerformanceChartProps {
  data: PerformanceData[];
}

export function MaintenancePerformanceChart({ data }: MaintenancePerformanceChartProps) {
  const gridColor = getGridColor();

  return (
    <ChartContainer className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="month" stroke={gridColor} />
          <YAxis yAxisId="left" orientation="left" stroke={gridColor} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} stroke={gridColor} />
          <Tooltip content={<ChartTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "10px" }} />
          <Bar yAxisId="left" dataKey="completed" name="Completed Tasks" fill={CHART_COLORS.blue} radius={[4, 4, 0, 0]} />
          <Bar yAxisId="left" dataKey="pending" name="Pending Tasks" fill={CHART_COLORS.orange} radius={[4, 4, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="efficiency" name="Efficiency %" stroke={CHART_COLORS.green} strokeWidth={2} dot={{ r: 5 }} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

