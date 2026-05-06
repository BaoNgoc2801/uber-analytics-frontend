import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, EmptyState } from '../common';
import type {  RevenueByVehicle  } from '../../types/dashboard';
import { formatCurrency } from '../../utils/formatters';

interface RevenueByVehicleChartProps {
  data: RevenueByVehicle[] | null;
}

export const RevenueByVehicleChart = ({ data }: RevenueByVehicleChartProps) => {
  if (!data || data.length === 0) {
    return (
      <Card className="h-96 flex flex-col">
        <h3 className="text-lg font-medium text-textPrimary mb-4">Revenue by Vehicle Type</h3>
        <EmptyState className="flex-1" />
      </Card>
    );
  }

  return (
    <Card className="h-96 flex flex-col">
      <h3 className="text-lg font-medium text-textPrimary mb-4">Revenue by Vehicle Type</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
            <XAxis 
              dataKey="vehicle_type" 
              stroke="#525252" 
              tick={{ fill: '#a3a3a3', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              yAxisId="left"
              orientation="left"
              stroke="#525252" 
              tick={{ fill: '#a3a3a3', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
              tickLine={false}
              axisLine={false}
              dx={-10}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#525252" 
              tick={{ fill: '#a3a3a3', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              dx={10}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '0.5rem' }}
              itemStyle={{ color: '#22c55e' }}
              labelStyle={{ color: '#a3a3a3', marginBottom: '4px' }}
              formatter={(value: any, name: any) => {
                if (name === 'Revenue') return [formatCurrency(value), name];
                return [value, name];
              }}
            />
            <Bar yAxisId="left" dataKey="total_booking_value" name="Revenue" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={40} />
            <Bar yAxisId="right" dataKey="booking_count" name="Bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
