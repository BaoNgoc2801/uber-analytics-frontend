import { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { FilterBar } from '../components/filters/FilterBar';
import { CancellationReasonsChart } from '../components/charts/CancellationReasonsChart';
import {
  ErrorState, Card, EmptyState, LoadingState,
  SkeletonMetricPill,
} from '../components/common';
import {
  Clock, AlertTriangle, CheckCircle, XCircle,
  ChevronRight, Car, TrendingDown, Activity,
} from 'lucide-react';
import type { DashboardFilters, RevenueByVehicle, StatusBreakdown } from '../types/dashboard';
import {
  useFilters, useKpiSummary, useRevenueByVehicle,
  useCancellationReasons, useStatusBreakdown,
} from '../hooks';
import {
  formatNumber, formatCurrency, formatPercentage,
  formatDuration, formatRating,
} from '../utils/formatters';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// ─── Section Header ──────────────────────────────────────────────────────────
const SectionHeader = ({ label, description }: { label: string; description?: string }) => (
  <div className="mb-5">
    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-textMuted mb-1">{label}</p>
    {description && <p className="text-sm text-textSecondary">{description}</p>}
  </div>
);

// ─── Metric Pill ─────────────────────────────────────────────────────────────
const MetricPill = ({
  label, value, sub, color, icon: Icon,
}: {
  label: string; value: string; sub?: string;
  color: string; icon: React.ElementType;
}) => (
  <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface/60 hover:bg-surfaceHighlight/60 transition-colors">
    <div className={`p-2.5 rounded-xl shrink-0 ${color}`}>
      <Icon className="w-4 h-4 text-white" />
    </div>
    <div className="min-w-0">
      <p className="text-lg font-bold text-textPrimary leading-none mb-0.5">{value}</p>
      <p className="text-xs text-textMuted truncate">{label}</p>
      {sub && <p className="text-xs text-textSecondary mt-0.5">{sub}</p>}
    </div>
  </div>
);

// ─── Status Donut (small inline) ─────────────────────────────────────────────
const STATUS_PALETTE: Record<string, string> = {
  completed: '#22c55e',
  cancelled: '#ef4444',
  incomplete: '#f59e0b',
  'no driver found': '#f97316',
};
const getStatusColor = (s: string) => {
  const k = s.toLowerCase();
  for (const key of Object.keys(STATUS_PALETTE)) {
    if (k.includes(key)) return STATUS_PALETTE[key];
  }
  return '#6366f1';
};

const StatusDonut = ({ data }: { data: StatusBreakdown[] | null }) => {
  if (!data || !data.length) return <EmptyState />;
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%" cy="50%"
          innerRadius={60} outerRadius={90}
          paddingAngle={3}
          dataKey="booking_count"
          nameKey="booking_status"
          stroke="none"
        >
          {data.map((d, i) => (
            <Cell key={i} fill={getStatusColor(d.booking_status)} />
          ))}
        </Pie>
        <Tooltip
          formatter={(v: any, _: any, p: any) => [
            `${formatNumber(v)} (${p.payload.percentage.toFixed(1)}%)`,
            p.payload.booking_status,
          ]}
          contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '0.75rem', fontSize: 12 }}
        />
        <Legend
          iconType="circle" iconSize={7} verticalAlign="bottom" height={36}
          formatter={(v) => <span style={{ color: '#a3a3a3', fontSize: 11 }}>{v}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

// ─── Vehicle Performance Table ────────────────────────────────────────────────
const VehicleTable = ({ data }: { data: RevenueByVehicle[] | null }) => {
  if (!data || !data.length) return <EmptyState />;

  const maxRevenue = Math.max(...data.map(d => d.total_booking_value));

  return (
    <div className="space-y-3">
      {data.map((v, i) => {
        const pct = (v.total_booking_value / maxRevenue) * 100;
        return (
          <div key={i} className="group">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                <Car className="w-3.5 h-3.5 text-textMuted" />
                <span className="font-medium text-textPrimary">{v.vehicle_type}</span>
                <span className="text-textMuted">·</span>
                <span className="text-textMuted">{formatNumber(v.booking_count)} rides</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-primary">{formatCurrency(v.total_booking_value)}</span>
                <span className="text-textMuted ml-2 hidden sm:inline">
                  avg {formatCurrency(v.average_booking_value)}
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-surfaceHighlight rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-blue-400 transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Cancellation Tabs ────────────────────────────────────────────────────────
type CancelTab = 'customer' | 'driver' | 'incomplete';

const CANCEL_TABS: { key: CancelTab; label: string; activeClass: string }[] = [
  { key: 'customer',   label: 'Customer',   activeClass: 'bg-red-500/80 text-white'    },
  { key: 'driver',     label: 'Driver',     activeClass: 'bg-orange-500/80 text-white' },
  { key: 'incomplete', label: 'Incomplete', activeClass: 'bg-yellow-500/80 text-white' },
];

const CancellationPanel = ({ filters }: { filters: DashboardFilters }) => {
  const [tab, setTab] = useState<CancelTab>('customer');

  const { data: custData,  loading: custLoading  } = useCancellationReasons('customer',   6, filters);
  const { data: drvData,   loading: drvLoading   } = useCancellationReasons('driver',     6, filters);
  const { data: incData,   loading: incLoading   } = useCancellationReasons('incomplete', 6, filters);

  const dataMap = { customer: custData, driver: drvData, incomplete: incData };
  const loadMap = { customer: custLoading, driver: drvLoading, incomplete: incLoading };

  return (
    <Card className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-textMuted mb-1">Cancellations</p>
          <p className="text-base font-semibold text-textPrimary">Top Reasons</p>
        </div>
        <div className="flex gap-1 p-1 bg-surfaceHighlight rounded-lg border border-border">
          {CANCEL_TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
                tab === t.key ? t.activeClass : 'text-textSecondary hover:text-textPrimary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {loadMap[tab] ? (
        <div className="h-72"><LoadingState message="Loading..." /></div>
      ) : (
        <div className="h-72">
          <CancellationReasonsChart data={dataMap[tab]} title="" />
        </div>
      )}
    </Card>
  );
};

// ─── Main Rides Page ──────────────────────────────────────────────────────────
export const Rides = () => {
  const [filters, setFilters] = useState<DashboardFilters>({});

  const { data: filterOptions, loading: filtersLoading, error: filtersError } = useFilters();
  const { data: kpiData,       loading: kpiLoading,     error: kpiError      } = useKpiSummary(filters);
  const { data: statusData,    loading: statusLoading                         } = useStatusBreakdown(filters);
  const { data: revenueData,   loading: revenueLoading                        } = useRevenueByVehicle(filters);

  const isLoading = kpiLoading || statusLoading || revenueLoading;

  if (filtersError || kpiError) {
    return (
      <AppLayout>
        <ErrorState
          message="Failed to load rides data. Please check your connection or try again."
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
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-1.5">Ride Analytics</h1>
            <p className="text-textSecondary text-sm">
              Deep-dive into ride performance, cancellations, and vehicle metrics.
            </p>
          </div>
          {kpiData && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-primary/20 bg-primary/5">
              <Activity className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">
                {formatPercentage(kpiData.completion_rate)} completion
              </span>
              <span className="text-textMuted text-xs">·</span>
              <span className="text-xs text-textMuted">
                {formatRating(kpiData.average_driver_rating)} driver rating
              </span>
            </div>
          )}
        </div>

        {/* ── Filters ── */}
        {filtersLoading ? null : (
          <FilterBar options={filterOptions} onFilterChange={setFilters} loading={isLoading} title="Ride Filters" />
        )}

        {/* ── Time & Outcome Metrics ── */}
        <div>
          <SectionHeader
            label="Ride Metrics"
            description="Performance indicators across the ride lifecycle"
          />
          {kpiLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonMetricPill key={i} />)}
            </div>
          ) : kpiData ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricPill
                label="Avg Wait Time (VTAT)"
                value={formatDuration(kpiData.average_vtat)}
                sub="Vehicle to arrival"
                icon={Clock}
                color="bg-blue-600"
              />
              <MetricPill
                label="Avg Ride Time (CTAT)"
                value={formatDuration(kpiData.average_ctat)}
                sub="Customer to arrival"
                icon={Clock}
                color="bg-violet-600"
              />
              <MetricPill
                label="No Driver Found"
                value={formatNumber(kpiData.no_driver_found)}
                sub={`${formatPercentage(kpiData.no_driver_found_rate)} miss rate`}
                icon={AlertTriangle}
                color="bg-orange-600"
              />
              <MetricPill
                label="Incomplete Rides"
                value={formatNumber(kpiData.incomplete_rides)}
                sub={`${formatPercentage(kpiData.incomplete_ride_rate)} of total`}
                icon={TrendingDown}
                color="bg-yellow-600"
              />
            </div>
          ) : null}
        </div>

        {/* ── Outcome Summary (completion vs cancellation) ── */}
        {kpiData && (
          <div>
            <SectionHeader
              label="Outcome Summary"
              description="How rides resolved across the fleet"
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  label: 'Completed',
                  value: formatNumber(kpiData.completed_rides),
                  pct: formatPercentage(kpiData.completion_rate),
                  color: 'border-green-500/30 bg-green-500/5',
                  textColor: 'text-green-400',
                  icon: CheckCircle,
                },
                {
                  label: 'By Customer',
                  value: formatNumber(kpiData.cancelled_by_customer),
                  pct: formatPercentage((kpiData.cancelled_by_customer / kpiData.total_bookings) * 100),
                  color: 'border-red-500/30 bg-red-500/5',
                  textColor: 'text-red-400',
                  icon: XCircle,
                },
                {
                  label: 'By Driver',
                  value: formatNumber(kpiData.cancelled_by_driver),
                  pct: formatPercentage((kpiData.cancelled_by_driver / kpiData.total_bookings) * 100),
                  color: 'border-orange-500/30 bg-orange-500/5',
                  textColor: 'text-orange-400',
                  icon: XCircle,
                },
                {
                  label: 'Incomplete',
                  value: formatNumber(kpiData.incomplete_rides),
                  pct: formatPercentage(kpiData.incomplete_ride_rate),
                  color: 'border-yellow-500/30 bg-yellow-500/5',
                  textColor: 'text-yellow-400',
                  icon: AlertTriangle,
                },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`rounded-xl border p-4 ${item.color}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-textMuted">{item.label}</p>
                      <Icon className={`w-3.5 h-3.5 ${item.textColor}`} />
                    </div>
                    <p className={`text-xl font-bold ${item.textColor}`}>{item.value}</p>
                    <p className="text-xs text-textMuted mt-0.5">{item.pct} of total</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Cancellations + Status ── */}
        <div>
          <SectionHeader
            label="Cancellation Analysis"
            description="Why rides are not completing — filter by responsible party"
          />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <CancellationPanel filters={filters} />
            </div>
            <div className="xl:col-span-1">
              <Card className="flex flex-col h-full">
                <div className="mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-textMuted mb-1">
                    Status
                  </p>
                  <p className="text-base font-semibold text-textPrimary">Ride Distribution</p>
                </div>
                {statusLoading ? (
                  <div className="flex-1"><LoadingState message="Loading..." /></div>
                ) : (
                  <StatusDonut data={statusData} />
                )}
              </Card>
            </div>
          </div>
        </div>

        {/* ── Vehicle Performance ── */}
        <div>
          <SectionHeader
            label="Vehicle Performance"
            description="Revenue and ride volume broken down by vehicle type"
          />
          <Card>
            {revenueLoading ? (
              <LoadingState message="Loading vehicle data..." />
            ) : (
              <VehicleTable data={revenueData} />
            )}
          </Card>
        </div>

        {/* ── Footer note ── */}
        {kpiData && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-surface/40 text-xs text-textMuted">
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span>
              Based on <span className="text-textPrimary font-medium">{formatNumber(kpiData.total_bookings)}</span> total bookings
              · Total value <span className="text-textPrimary font-medium">{formatCurrency(kpiData.total_booking_value)}</span>
              · Avg {formatCurrency(kpiData.average_booking_value)} per ride
            </span>
          </div>
        )}

      </div>
    </AppLayout>
  );
};
