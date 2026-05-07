import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, EmptyState } from '../common';
import type {  StatusBreakdown  } from '../../types/dashboard';

const COLORS = ['#22c55e', '#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#64748b'];

interface StatusBreakdownChartProps {
  data: StatusBreakdown[] | null;
}

export const StatusBreakdownChart = ({ data }: StatusBreakdownChartProps) => {
  if (!data || data.length === 0) {
    return (
      <Card className="h-96 flex flex-col">
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-textMuted mb-1">Breakdown</p>
          <h3 className="text-base font-semibold text-textPrimary">Ride Status</h3>
        </div>
        <EmptyState className="flex-1" />
      </Card>
    );
  }

  return (
    <Card className="h-96 flex flex-col">
      <h3 className="text-lg font-medium text-textPrimary mb-4">Ride Status Breakdown</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              dataKey="booking_count"
              nameKey="booking_status"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any, name: any, props: any) => [
                `${value} rides (${props.payload.percentage.toFixed(1)}%)`,
                name,
              ]}
              contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '0.5rem', color: '#f5f5f5' }}
              itemStyle={{ color: '#f5f5f5' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
