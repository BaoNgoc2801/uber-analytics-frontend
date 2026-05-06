import { useState } from 'react';
import { Card, EmptyState } from '../common';
import type {  TopLocation  } from '../../types/dashboard';
import { formatCurrency, formatNumber, formatDistance } from '../../utils/formatters';
import { ArrowDownAZ, ArrowUpAZ, MapPin } from 'lucide-react';

interface TopLocationsTableProps {
  data: TopLocation[] | null;
  mode: 'pickup' | 'drop';
  onModeChange: (mode: 'pickup' | 'drop') => void;
}

export const TopLocationsTable = ({ data, mode, onModeChange }: TopLocationsTableProps) => {
  const [sortField, setSortField] = useState<keyof TopLocation>('booking_count');
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (field: keyof TopLocation) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const sortedData = data ? [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue < bValue) return sortAsc ? -1 : 1;
    if (aValue > bValue) return sortAsc ? 1 : -1;
    return 0;
  }) : [];

  return (
    <Card className="flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <h3 className="text-lg font-medium text-textPrimary">Top Locations</h3>
        <div className="flex p-1 bg-surfaceHighlight rounded-lg border border-border">
          <button
            onClick={() => onModeChange('pickup')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              mode === 'pickup' ? 'bg-primary text-white' : 'text-textSecondary hover:text-textPrimary'
            }`}
          >
            Pickup
          </button>
          <button
            onClick={() => onModeChange('drop')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              mode === 'drop' ? 'bg-primary text-white' : 'text-textSecondary hover:text-textPrimary'
            }`}
          >
            Drop-off
          </button>
        </div>
      </div>

      {!sortedData || sortedData.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-textSecondary uppercase bg-surfaceHighlight border-y border-border">
              <tr>
                <th scope="col" className="px-6 py-3 cursor-pointer hover:text-textPrimary transition-colors" onClick={() => handleSort('location_name')}>
                  <div className="flex items-center">
                    Location
                    {sortField === 'location_name' && (sortAsc ? <ArrowUpAZ className="ml-1 w-3 h-3" /> : <ArrowDownAZ className="ml-1 w-3 h-3" />)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right cursor-pointer hover:text-textPrimary transition-colors" onClick={() => handleSort('booking_count')}>
                  <div className="flex items-center justify-end">
                    Bookings
                    {sortField === 'booking_count' && (sortAsc ? <ArrowUpAZ className="ml-1 w-3 h-3" /> : <ArrowDownAZ className="ml-1 w-3 h-3" />)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right cursor-pointer hover:text-textPrimary transition-colors" onClick={() => handleSort('total_value')}>
                  <div className="flex items-center justify-end">
                    Revenue
                    {sortField === 'total_value' && (sortAsc ? <ArrowUpAZ className="ml-1 w-3 h-3" /> : <ArrowDownAZ className="ml-1 w-3 h-3" />)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right cursor-pointer hover:text-textPrimary transition-colors" onClick={() => handleSort('average_ride_distance')}>
                  <div className="flex items-center justify-end">
                    Avg Distance
                    {sortField === 'average_ride_distance' && (sortAsc ? <ArrowUpAZ className="ml-1 w-3 h-3" /> : <ArrowDownAZ className="ml-1 w-3 h-3" />)}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((location, index) => (
                <tr 
                  key={index} 
                  className="bg-surface border-b border-border hover:bg-surfaceHighlight/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-textPrimary flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-textMuted" />
                    {location.location_name}
                  </td>
                  <td className="px-6 py-4 text-right">{formatNumber(location.booking_count)}</td>
                  <td className="px-6 py-4 text-right text-primary">{formatCurrency(location.total_value)}</td>
                  <td className="px-6 py-4 text-right text-textSecondary">{formatDistance(location.average_ride_distance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};
