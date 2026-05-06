import { useState } from 'react';
import { Filter } from 'lucide-react';
import type {  DashboardFilters, FilterOptions  } from '../../types/dashboard';
import { Card } from '../common';

interface FilterBarProps {
  options: FilterOptions | null;
  onFilterChange: (filters: DashboardFilters) => void;
  loading?: boolean;
}

export const FilterBar = ({ options, onFilterChange, loading }: FilterBarProps) => {
  const [filters, setFilters] = useState<DashboardFilters>({});

  const handleApply = () => {
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters({});
    onFilterChange({});
  };

  if (!options) return null;

  return (
    <Card className="mb-6 z-10 relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center text-lg font-medium text-textPrimary">
          <Filter className="w-5 h-5 mr-2 text-primary" />
          Dashboard Filters
        </h3>
        <div className="flex space-x-3">
          <button onClick={handleReset} className="btn-secondary text-sm py-1.5">
            Reset
          </button>
          <button onClick={handleApply} disabled={loading} className="btn-primary text-sm py-1.5">
            {loading ? 'Applying...' : 'Apply Filters'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-textSecondary">Date Range</label>
          <div className="flex space-x-2">
            <input
              type="date"
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-textPrimary focus:outline-none focus:border-primary"
              value={filters.start_date || ''}
              onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
            />
            <input
              type="date"
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-textPrimary focus:outline-none focus:border-primary"
              value={filters.end_date || ''}
              onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
            />
          </div>
        </div>

        {/* Vehicle Type */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-textSecondary">Vehicle Type</label>
          <select
            className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-textPrimary focus:outline-none focus:border-primary appearance-none"
            value={filters.vehicle_type || ''}
            onChange={(e) => setFilters({ ...filters, vehicle_type: e.target.value })}
          >
            <option value="">All Vehicles</option>
            {options.vehicle_types?.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        {/* Booking Status */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-textSecondary">Status</label>
          <select
            className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-textPrimary focus:outline-none focus:border-primary appearance-none"
            value={filters.booking_status || ''}
            onChange={(e) => setFilters({ ...filters, booking_status: e.target.value })}
          >
            <option value="">All Statuses</option>
            {options.statuses?.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Payment Method */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-textSecondary">Payment Method</label>
          <select
            className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-textPrimary focus:outline-none focus:border-primary appearance-none"
            value={filters.payment_method || ''}
            onChange={(e) => setFilters({ ...filters, payment_method: e.target.value })}
          >
            <option value="">All Methods</option>
            {options.payment_methods?.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
};
