import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, EmptyState } from '../common';
import type {  CancellationReason  } from '../../types/dashboard';

interface CancellationReasonsChartProps {
  data: CancellationReason[] | null;
  title: string;
}

export const CancellationReasonsChart = ({ data, title }: CancellationReasonsChartProps) => {
  if (!data || data.length === 0) {
    return (
      <Card className="h-96 flex flex-col">
        <h3 className="text-lg font-medium text-textPrimary mb-4">{title}</h3>
        <EmptyState className="flex-1" />
      </Card>
    );
  }

  return (
    <Card className="h-96 flex flex-col">
      <h3 className="text-lg font-medium text-textPrimary mb-4">{title}</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" horizontal={false} />
            <XAxis 
              type="number"
              stroke="#525252" 
              tick={{ fill: '#a3a3a3', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              dataKey="reason" 
              type="category"
              stroke="#525252" 
              tick={{ fill: '#a3a3a3', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={120}
            />
            <Tooltip
              cursor={{ fill: '#262626' }}
              contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '0.5rem' }}
              itemStyle={{ color: '#ef4444' }}
              formatter={(value: any, _name: any, props: any) => [
                `${value} (${props.payload.percentage.toFixed(1)}%)`,
                'Cancellations'
              ]}
            />
            <Bar dataKey="count" name="Cancellations" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
