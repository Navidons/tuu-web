"use client"

import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend,
  CHART_COLORS
} from "@/components/ui/chart"

interface IssuesData {
  issue_type: string;
  count: number;
  percentage: number;
}

interface TransformerIssuesChartProps {
  data: IssuesData[];
}

const COLORS = [
  CHART_COLORS.blue,
  CHART_COLORS.green,
  CHART_COLORS.orange,
  CHART_COLORS.red,
  CHART_COLORS.purple,
  CHART_COLORS.yellow,
  CHART_COLORS.teal,
  CHART_COLORS.pink
];

export function TransformerIssuesChart({ data }: TransformerIssuesChartProps) {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="issue_type"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

