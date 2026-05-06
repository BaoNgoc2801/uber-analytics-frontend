import type {  KpiSummary  } from '../../types/dashboard';
import { KpiCard } from './KpiCard';
import { Car, CheckCircle, XCircle, DollarSign, Clock, Star } from 'lucide-react';
import { formatCurrency, formatNumber, formatPercentage, formatDuration, formatRating } from '../../utils/formatters';

interface KpiGridProps {
  data: KpiSummary | null;
}

export const KpiGrid = ({ data }: KpiGridProps) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <KpiCard
        title="Total Bookings"
        value={formatNumber(data.total_bookings)}
        icon={<Car className="w-6 h-6" />}
        subtitle="Across all vehicle types"
      />
      <KpiCard
        title="Total Revenue"
        value={formatCurrency(data.total_booking_value)}
        icon={<DollarSign className="w-6 h-6" />}
        subtitle={`Avg. ${formatCurrency(data.average_booking_value)}/ride`}
      />
      <KpiCard
        title="Completion Rate"
        value={formatPercentage(data.completion_rate)}
        icon={<CheckCircle className="w-6 h-6" />}
        trend={{ value: 2.5, isPositive: true }}
        subtitle="vs. previous period"
      />
      <KpiCard
        title="Cancellation Rate"
        value={formatPercentage((data.cancelled_by_customer + data.cancelled_by_driver) / data.total_bookings * 100)}
        icon={<XCircle className="w-6 h-6" />}
        trend={{ value: -1.2, isPositive: true }} // Negative cancellation trend is good
        subtitle="Combined driver & customer"
      />
      <KpiCard
        title="Average Wait Time (VTAT)"
        value={formatDuration(data.average_vtat)}
        icon={<Clock className="w-6 h-6" />}
        subtitle="Vehicle To Arrival Time"
      />
      <KpiCard
        title="Average Ride Time (CTAT)"
        value={formatDuration(data.average_ctat)}
        icon={<Clock className="w-6 h-6" />}
        subtitle="Customer To Arrival Time"
      />
      <KpiCard
        title="Driver Rating"
        value={formatRating(data.average_driver_rating)}
        icon={<Star className="w-6 h-6 text-warning" />}
        subtitle="Average out of 5.0"
      />
      <KpiCard
        title="No Driver Found Rate"
        value={formatPercentage(data.no_driver_found_rate)}
        icon={<Car className="w-6 h-6 text-danger" />}
        subtitle="Missed opportunities"
      />
    </div>
  );
};
