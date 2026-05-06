import { Card, EmptyState } from '../common';
import type {  PickupHotspot  } from '../../types/dashboard';
import { formatCurrency, formatNumber, formatDistance } from '../../utils/formatters';
import { MapPin } from 'lucide-react';

interface PickupHotspotsTableProps {
  data: PickupHotspot[] | null;
}

export const PickupHotspotsTable = ({ data }: PickupHotspotsTableProps) => {
  if (!data || data.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-medium text-textPrimary mb-4">Pickup Hotspots</h3>
        <EmptyState />
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden flex flex-col">
      <h3 className="text-lg font-medium text-textPrimary mb-4">Pickup Hotspots</h3>
      <div className="overflow-x-auto -mx-6">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-textSecondary uppercase bg-surfaceHighlight border-y border-border">
            <tr>
              <th scope="col" className="px-6 py-3">Location</th>
              <th scope="col" className="px-6 py-3 text-right">Bookings</th>
              <th scope="col" className="px-6 py-3 text-right">Revenue</th>
              <th scope="col" className="px-6 py-3 text-right">Avg Distance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((hotspot, index) => (
              <tr 
                key={index} 
                className="bg-surface border-b border-border hover:bg-surfaceHighlight/50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-textPrimary flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  {hotspot.location_name}
                </td>
                <td className="px-6 py-4 text-right">{formatNumber(hotspot.booking_count)}</td>
                <td className="px-6 py-4 text-right text-primary">{formatCurrency(hotspot.total_booking_value)}</td>
                <td className="px-6 py-4 text-right text-textSecondary">{formatDistance(hotspot.average_ride_distance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
