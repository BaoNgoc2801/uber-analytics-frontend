import { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { FilterBar } from '../components/filters/FilterBar';
import { PickupHotspotsTable } from '../components/tables/PickupHotspotsTable';
import { TopLocationsTable } from '../components/tables/TopLocationsTable';
import {
  ErrorState, Card, EmptyState,
  SkeletonHeroCard, SkeletonTable, SkeletonChart,
} from '../components/common';
import { MapPin, TrendingUp, Navigation, BarChart2 } from 'lucide-react';
import type { DashboardFilters, StatusBreakdown } from '../types/dashboard';
import {
  useFilters, useKpiSummary, usePickupHotspots,
  useTopLocations, useStatusBreakdown,
} from '../hooks';
import { formatNumber, formatCurrency, formatDistance, formatPercentage } from '../utils/formatters';

// ─── Section Header ──────────────────────────────────────────────────────────
const SectionHeader = ({ label, description }: { label: string; description?: string }) => (
  <div className="mb-5">
    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-textMuted mb-1">{label}</p>
    {description && <p className="text-sm text-textSecondary">{description}</p>}
  </div>
);

// ─── Hero Stat ───────────────────────────────────────────────────────────────
const StatCard = ({
  label, value, sub, icon: Icon, color,
}: {
  label: string; value: string; sub?: string;
  icon: React.ElementType; color: string;
}) => (
  <div className="glass-panel p-5 flex items-center gap-4 hover:-translate-y-0.5 transition-transform duration-200">
    <div className={`p-3 rounded-xl shrink-0 ${color}`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-textMuted uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-xl font-bold text-textPrimary leading-none">{value}</p>
      {sub && <p className="text-xs text-textSecondary mt-0.5">{sub}</p>}
    </div>
  </div>
);

// ─── Status Progress Bars ────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  completed:        'bg-green-500',
  cancelled:        'bg-red-500',
  incomplete:       'bg-yellow-500',
  'no driver found':'bg-orange-500',
};
const getStatusColor = (s: string) => {
  const k = s.toLowerCase();
  for (const key of Object.keys(STATUS_COLORS)) {
    if (k.includes(key)) return STATUS_COLORS[key];
  }
  return 'bg-primary';
};

const StatusBars = ({ data }: { data: StatusBreakdown[] }) => (
  <div className="flex flex-col gap-4">
    {data.map(s => (
      <div key={s.booking_status}>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-textSecondary capitalize">{s.booking_status}</span>
          <span className="font-semibold text-textPrimary">
            {formatNumber(s.booking_count)}
            <span className="text-textMuted font-normal ml-1">({s.percentage.toFixed(1)}%)</span>
          </span>
        </div>
        <div className="h-2 w-full bg-surfaceHighlight rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${getStatusColor(s.booking_status)}`}
            style={{ width: `${Math.min(s.percentage, 100)}%` }}
          />
        </div>
      </div>
    ))}
  </div>
);

// ─── Main Locations Page ──────────────────────────────────────────────────────
export const Locations = () => {
  const [filters, setFilters] = useState<DashboardFilters>({});
  const [locationMode, setLocationMode] = useState<'pickup' | 'drop'>('pickup');

  const { data: filterOptions, loading: filtersLoading, error: filtersError } = useFilters();
  const { data: kpiData,         loading: kpiLoading,     error: kpiError      } = useKpiSummary(filters);
  const { data: hotspotsData,    loading: hotspotsLoading, error: hotspotsError } = usePickupHotspots(filters);
  const { data: topLocationsData,loading: topLocationsLoading                    } = useTopLocations(locationMode, 10, filters);
  const { data: statusData,      loading: statusLoading                          } = useStatusBreakdown(filters);

  const isLoading = kpiLoading || hotspotsLoading || topLocationsLoading || statusLoading;

  if (filtersError || kpiError || hotspotsError) {
    return (
      <AppLayout>
        <ErrorState
          message="Failed to load locations data. Please check your connection or try again."
          onRetry={() => window.location.reload()}
          className="min-h-[50vh]"
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col space-y-8">

        {/* ── Header ── */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1.5">Locations</h1>
          <p className="text-textSecondary text-sm">
            Explore pickup hotspots, top drop-off zones, and location-based ride analytics.
          </p>
        </div>

        {/* ── Filters ── */}
        {filtersLoading ? null : (
          <FilterBar
            options={filterOptions}
            onFilterChange={setFilters}
            loading={isLoading}
            title="Location Filters"
          />
        )}

        {/* ── KPI Stats ── */}
        <div>
          <SectionHeader label="Summary" description="Location-scoped ride and revenue metrics" />
          {kpiLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonHeroCard key={i} />)}
            </div>
          ) : kpiData ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Total Bookings"
                value={formatNumber(kpiData.total_bookings)}
                sub="All locations"
                icon={BarChart2}
                color="bg-blue-600"
              />
              <StatCard
                label="Completed Rides"
                value={formatNumber(kpiData.completed_rides)}
                sub={formatPercentage(kpiData.completion_rate) + ' rate'}
                icon={Navigation}
                color="bg-emerald-600"
              />
              <StatCard
                label="Avg Distance"
                value={formatDistance(kpiData.average_ride_distance)}
                sub="Per completed ride"
                icon={MapPin}
                color="bg-violet-600"
              />
              <StatCard
                label="Total Revenue"
                value={formatCurrency(kpiData.total_booking_value)}
                sub={`Avg ${formatCurrency(kpiData.average_booking_value)}/ride`}
                icon={TrendingUp}
                color="bg-amber-600"
              />
            </div>
          ) : null}
        </div>

        {/* ── Hotspots + Status ── */}
        <div>
          <SectionHeader
            label="Pickup Activity"
            description="Most active pickup zones and ride outcome distribution"
          />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Hotspots — 2/3 */}
            <div className="xl:col-span-2">
              {hotspotsLoading ? (
                <SkeletonTable rows={6} />
              ) : (
                <PickupHotspotsTable data={hotspotsData} />
              )}
            </div>

            {/* Status bars — 1/3 */}
            <div className="xl:col-span-1">
              <Card className="h-full flex flex-col">
                <div className="mb-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-textMuted mb-1">Status</p>
                  <p className="text-base font-semibold text-textPrimary">Ride Outcomes</p>
                </div>
                {statusLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="animate-pulse space-y-1.5">
                        <div className="flex justify-between">
                          <div className="h-3 w-24 bg-surfaceHighlight rounded" />
                          <div className="h-3 w-12 bg-surfaceHighlight rounded" />
                        </div>
                        <div className="h-2 w-full bg-surfaceHighlight rounded-full" />
                      </div>
                    ))}
                  </div>
                ) : !statusData || statusData.length === 0 ? (
                  <EmptyState />
                ) : (
                  <StatusBars data={statusData} />
                )}
              </Card>
            </div>
          </div>
        </div>

        {/* ── Top Locations ── */}
        <div>
          <SectionHeader
            label="Top Locations"
            description="Ranked by booking volume — switch between pickup and drop-off view"
          />
          {topLocationsLoading ? (
            <SkeletonTable rows={8} />
          ) : (
            <TopLocationsTable
              data={topLocationsData}
              mode={locationMode}
              onModeChange={setLocationMode}
            />
          )}
        </div>

      </div>
    </AppLayout>
  );
};
