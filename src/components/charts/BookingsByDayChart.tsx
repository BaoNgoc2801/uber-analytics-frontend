import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { Card, EmptyState } from '../common';
import type {  BookingsByDay  } from '../../types/dashboard';

interface BookingsByDayChartProps {
  data: BookingsByDay[] | null;
}

export const BookingsByDayChart = ({ data }: BookingsByDayChartProps) => {
  if (!data || data.length === 0) {
    return (
      <Card className="h-96 flex flex-col">
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-textMuted mb-1">Trend</p>
          <h3 className="text-base font-semibold text-textPrimary">Bookings Over Time</h3>
        </div>
        <EmptyState className="flex-1" />
      </Card>
    );
  }

  const formattedData = data.map(item => ({
    ...item,
    formattedDate: format(parseISO(item.date), 'MMM dd'),
  }));

  return (
    <Card className="h-96 flex flex-col">
      <h3 className="text-lg font-medium text-textPrimary mb-4">Bookings Over Time</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
            <XAxis 
              dataKey="formattedDate" 
              stroke="#525252" 
              tick={{ fill: '#a3a3a3', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#525252" 
              tick={{ fill: '#a3a3a3', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              dx={-10}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '0.5rem' }}
              itemStyle={{ color: '#22c55e' }}
              labelStyle={{ color: '#a3a3a3', marginBottom: '4px' }}
            />
            <Line 
              type="monotone" 
              dataKey="total_bookings" 
              name="Bookings"
              stroke="#22c55e" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#22c55e', strokeWidth: 2, stroke: '#0a0a0a' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
