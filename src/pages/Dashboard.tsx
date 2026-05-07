import { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { FilterBar } from '../components/filters/FilterBar';
import { BookingsByDayChart } from '../components/charts/BookingsByDayChart';
import { RevenueByVehicleChart } from '../components/charts/RevenueByVehicleChart';
import { StatusBreakdownChart } from '../components/charts/StatusBreakdownChart';
import {
  ErrorState, Card,
  SkeletonHeroCard, SkeletonChart,
} from '../components/common';
import {
  Car, CheckCircle, DollarSign, XCircle,
  TrendingUp, ArrowUpRight, ChevronRight,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { DashboardFilters } from '../types/dashboard';
import {
  useFilters, useKpiSummary, useStatusBreakdown,
  useBookingsByDay, useRevenueByVehicle,
} from '../hooks';
import { formatNumber, formatCurrency, formatPercentage } from '../utils/formatters';

// ─── Section Header ─────────────────────────────────────────────────────────
const SectionHeader = ({
  label, description, action,
}: {
  label: string;
  description?: string;
  action?: { text: string; href: string };
}) => (
  <div className="flex items-end justify-between mb-5">
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-textMuted mb-1">{label}</p>
      {description && <p className="text-sm text-textSecondary">{description}</p>}
    </div>
    {action && (
      <NavLink
        to={action.href}
        className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
      >
        {action.text} <ChevronRight className="w-3.5 h-3.5" />
      </NavLink>
    )}
  </div>
);

// ─── Hero KPI Card ───────────────────────────────────────────────────────────
interface HeroCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
  badge?: string;
}

const HeroCard = ({ title, value, sub, icon, gradient, iconBg, badge }: HeroCardProps) => (
  <div className={`relative overflow-hidden rounded-2xl p-5 border border-white/5 ${gradient}`}>
    {/* Glow orb */}
    <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl opacity-30 bg-white/20 pointer-events-none" />
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${iconBg}`}>{icon}</div>
        {badge && (
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/80">
            <TrendingUp className="w-3 h-3" />
            {badge}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-white tracking-tight mb-1">{value}</p>
      <p className="text-xs font-medium text-white/60 uppercase tracking-wide">{title}</p>
      <p className="text-xs text-white/40 mt-1">{sub}</p>
    </div>
  </div>
);

// ─── Quick Nav Card ──────────────────────────────────────────────────────────
const QuickNavCard = ({
  href, label, description, color,
}: {
  href: string; label: string; description: string; color: string;
}) => (
  <NavLink
    to={href}
    className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface/60 hover:bg-surfaceHighlight hover:border-primary/30 transition-all group"
  >
    <div>
      <p className={`text-sm font-semibold ${color} mb-0.5`}>{label}</p>
      <p className="text-xs text-textMuted">{description}</p>
    </div>
    <ArrowUpRight className="w-4 h-4 text-textMuted group-hover:text-primary transition-colors shrink-0" />
  </NavLink>
);

// ─── Main Dashboard ──────────────────────────────────────────────────────────
export const Dashboard = () => {
  const [filters, setFilters] = useState<DashboardFilters>({});

  const { data: filterOptions, loading: filtersLoading, error: filtersError } = useFilters();
  const { data: kpiData,       loading: kpiLoading,     error: kpiError      } = useKpiSummary(filters);
  const { data: statusData,    loading: statusLoading                         } = useStatusBreakdown(filters);
  const { data: bookingsData,  loading: bookingsLoading                       } = useBookingsByDay(filters);
  const { data: revenueData,   loading: revenueLoading                        } = useRevenueByVehicle(filters);

  const isLoading = kpiLoading || statusLoading || bookingsLoading || revenueLoading;

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

  const cancelRate = kpiData
    ? ((kpiData.cancelled_by_customer + kpiData.cancelled_by_driver) / kpiData.total_bookings) * 100
    : 0;

  return (
    <AppLayout>
      <div className="flex flex-col space-y-8">

        {/* ── Page Title ── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-1.5">Overview</h1>
            <p className="text-textSecondary text-sm">
              Real-time snapshot of your fleet operations and revenue.
            </p>
          </div>
          {kpiData && (
            <div className="hidden md:flex flex-col items-end gap-1">
              <p className="text-[10px] text-textMuted uppercase tracking-widest">Platform Health</p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-24 rounded-full bg-surfaceHighlight overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-1000"
                    style={{ width: `${kpiData.completion_rate}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-green-400">
                  {formatPercentage(kpiData.completion_rate)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ── Filters ── */}
        {filtersLoading ? null : (
          <FilterBar options={filterOptions} onFilterChange={setFilters} loading={isLoading} title="Overview Filters" />
        )}

        {/* ── Hero KPIs ── */}
        <div>
          <SectionHeader label="Key Metrics" description="Aggregated across all active filters" />
          {kpiLoading ? (
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonHeroCard key={i} />)}
            </div>
          ) : kpiData ? (
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <HeroCard
                title="Total Bookings"
                value={formatNumber(kpiData.total_bookings)}
                sub="All vehicle types"
                icon={<Car className="w-5 h-5 text-white" />}
                gradient="bg-gradient-to-br from-blue-600 to-blue-800"
                iconBg="bg-white/15"
              />
              <HeroCard
                title="Total Revenue"
                value={formatCurrency(kpiData.total_booking_value)}
                sub={`Avg ${formatCurrency(kpiData.average_booking_value)}/ride`}
                icon={<DollarSign className="w-5 h-5 text-white" />}
                gradient="bg-gradient-to-br from-emerald-600 to-green-800"
                iconBg="bg-white/15"
                badge="+rev"
              />
              <HeroCard
                title="Completion Rate"
                value={formatPercentage(kpiData.completion_rate)}
                sub={`${formatNumber(kpiData.completed_rides)} rides done`}
                icon={<CheckCircle className="w-5 h-5 text-white" />}
                gradient="bg-gradient-to-br from-violet-600 to-purple-800"
                iconBg="bg-white/15"
              />
              <HeroCard
                title="Cancellation Rate"
                value={formatPercentage(cancelRate)}
                sub={`${formatNumber(kpiData.cancelled_by_customer + kpiData.cancelled_by_driver)} cancelled`}
                icon={<XCircle className="w-5 h-5 text-white" />}
                gradient="bg-gradient-to-br from-rose-600 to-red-800"
                iconBg="bg-white/15"
              />
            </div>
          ) : null}
        </div>

        {/* ── Booking Trend ── */}
        <div>
          <SectionHeader
            label="Booking Trend"
            description="Daily bookings over the selected period"
            action={{ text: 'Ride analytics', href: '/rides' }}
          />
          {bookingsLoading ? (
            <SkeletonChart height="h-96" />
          ) : (
            <BookingsByDayChart data={bookingsData} />
          )}
        </div>

        {/* ── Status + Revenue ── */}
        <div>
          <SectionHeader
            label="Breakdown"
            description="Status distribution and revenue by vehicle type"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {statusLoading ? (
              <SkeletonChart height="h-96" />
            ) : (
              <StatusBreakdownChart data={statusData} />
            )}
            {revenueLoading ? (
              <SkeletonChart height="h-96" />
            ) : (
              <RevenueByVehicleChart data={revenueData} />
            )}
          </div>
        </div>

        {/* ── Quick Navigation ── */}
        <div>
          <SectionHeader label="Explore" description="Dive deeper into specific analytics" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <QuickNavCard
              href="/rides"
              label="Ride Analytics"
              description="Cancellations, time metrics, vehicle performance"
              color="text-blue-400"
            />
            <QuickNavCard
              href="/locations"
              label="Location Insights"
              description="Pickup hotspots and top drop-off zones"
              color="text-emerald-400"
            />
            <QuickNavCard
              href="/drivers"
              label="Driver Performance"
              description="Fleet ratings, activity and compliance"
              color="text-violet-400"
            />
          </div>
        </div>

      </div>
    </AppLayout>
  );
};
