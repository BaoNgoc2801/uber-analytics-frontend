import { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { FilterBar } from '../components/filters/FilterBar';
import { KpiGrid } from '../components/kpi/KpiGrid';
import { StatusBreakdownChart } from '../components/charts/StatusBreakdownChart';
import { BookingsByDayChart } from '../components/charts/BookingsByDayChart';
import { RevenueByVehicleChart } from '../components/charts/RevenueByVehicleChart';
import { CancellationReasonsChart } from '../components/charts/CancellationReasonsChart';
import { PickupHotspotsTable } from '../components/tables/PickupHotspotsTable';
import { TopLocationsTable } from '../components/tables/TopLocationsTable';
import { LoadingState, ErrorState } from '../components/common';

import type {  DashboardFilters  } from '../types/dashboard';
import {
  useFilters,
  useKpiSummary,
  useStatusBreakdown,
  useBookingsByDay,
  useRevenueByVehicle,
  useCancellationReasons,
  usePickupHotspots,
  useTopLocations,
} from '../hooks';

export const Dashboard = () => {
  const [filters, setFilters] = useState<DashboardFilters>({});
  const [locationMode, setLocationMode] = useState<'pickup' | 'drop'>('pickup');

  const { data: filterOptions, loading: filtersLoading, error: filtersError } = useFilters();
  const { data: kpiData, loading: kpiLoading, error: kpiError } = useKpiSummary(filters);
  const { data: statusData, loading: statusLoading } = useStatusBreakdown(filters);
  const { data: bookingsData, loading: bookingsLoading } = useBookingsByDay(filters);
  const { data: revenueData, loading: revenueLoading } = useRevenueByVehicle(filters);
  const { data: cancelCustomerData, loading: cancelCustomerLoading } = useCancellationReasons('customer', 5, filters);
  const { data: cancelDriverData, loading: cancelDriverLoading } = useCancellationReasons('driver', 5, filters);
  const { data: hotspotsData, loading: hotspotsLoading } = usePickupHotspots(filters);
  const { data: topLocationsData, loading: topLocationsLoading } = useTopLocations(locationMode, 10, filters);

  const handleFilterChange = (newFilters: DashboardFilters) => {
    setFilters(newFilters);
  };

  const isLoading = kpiLoading || statusLoading || bookingsLoading || revenueLoading || cancelCustomerLoading || cancelDriverLoading || hotspotsLoading || topLocationsLoading;
  
  if (filtersError || kpiError) {
    return (
      <AppLayout>
        <ErrorState 
          message="Failed to load dashboard data. Please check your connection or try again." 
          onRetry={() => window.location.reload()} 
          className="min-h-[50vh]"
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Overview</h1>
          <p className="text-textSecondary">Monitor key metrics, ride statuses, and revenue analytics.</p>
        </div>

        {/* Global Filters */}
        {filtersLoading ? (
          <LoadingState message="Loading filters..." />
        ) : (
          <FilterBar 
            options={filterOptions} 
            onFilterChange={handleFilterChange} 
            loading={isLoading}
          />
        )}

        {/* KPIs */}
        <KpiGrid data={kpiData} />

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1">
            <StatusBreakdownChart data={statusData} />
          </div>
          <div className="xl:col-span-2">
            <BookingsByDayChart data={bookingsData} />
          </div>
        </div>

        {/* Revenue & Cancellations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <RevenueByVehicleChart data={revenueData} />
          </div>
          <CancellationReasonsChart 
            title="Top Customer Cancellation Reasons" 
            data={cancelCustomerData} 
          />
          <CancellationReasonsChart 
            title="Top Driver Cancellation Reasons" 
            data={cancelDriverData} 
          />
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PickupHotspotsTable data={hotspotsData} />
          <TopLocationsTable 
            data={topLocationsData} 
            mode={locationMode} 
            onModeChange={setLocationMode} 
          />
        </div>
      </div>
    </AppLayout>
  );
};
