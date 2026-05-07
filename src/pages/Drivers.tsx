import { AppLayout } from '../components/layout/AppLayout';
import { LoadingState, ErrorState, Card } from '../components/common';
import { KpiCard } from '../components/kpi/KpiCard';
import { Users, Star, Car, ShieldCheck, TrendingDown, AlertCircle } from 'lucide-react';
import { cn } from '../components/common';
import { useKpiSummary } from '../hooks';
import { formatRating, formatNumber, formatPercentage } from '../utils/formatters';

// ─── Static driver data (no backend endpoint yet) ──────────────────────────
const MOCK_DRIVERS = [
  {
    id: 1,
    name: 'Rahul Sharma',
    initials: 'RS',
    rating: 4.9,
    rides: 1243,
    status: 'Active' as const,
    vehicle: 'Maruti Suzuki Dzire',
    type: 'Sedan',
    joinDate: 'Jan 2023',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Priya Patel',
    initials: 'PP',
    rating: 4.8,
    rides: 892,
    status: 'Active' as const,
    vehicle: 'Hyundai i20',
    type: 'Hatchback',
    joinDate: 'Mar 2023',
    color: 'bg-violet-500',
  },
  {
    id: 3,
    name: 'Amit Kumar',
    initials: 'AK',
    rating: 4.5,
    rides: 2150,
    status: 'Offline' as const,
    vehicle: 'Toyota Etios',
    type: 'Sedan',
    joinDate: 'Nov 2022',
    color: 'bg-emerald-500',
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    initials: 'SG',
    rating: 4.9,
    rides: 430,
    status: 'Active' as const,
    vehicle: 'Tata Nexon',
    type: 'SUV',
    joinDate: 'Aug 2023',
    color: 'bg-pink-500',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    initials: 'VS',
    rating: 4.2,
    rides: 3211,
    status: 'Suspended' as const,
    vehicle: 'Honda Amaze',
    type: 'Sedan',
    joinDate: 'Jun 2021',
    color: 'bg-orange-500',
  },
  {
    id: 6,
    name: 'Deepa Nair',
    initials: 'DN',
    rating: 4.7,
    rides: 678,
    status: 'Active' as const,
    vehicle: 'Maruti Swift',
    type: 'Hatchback',
    joinDate: 'Feb 2024',
    color: 'bg-teal-500',
  },
];

const STATUS_CONFIG = {
  Active: {
    dot: 'bg-green-400',
    badge: 'bg-green-500/10 text-green-400 border-green-500/20',
  },
  Offline: {
    dot: 'bg-gray-400',
    badge: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  },
  Suspended: {
    dot: 'bg-red-400',
    badge: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
} as const;

// ─── Star Rating Component ─────────────────────────────────────────────────
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(i => (
          <svg
            key={i}
            className={cn(
              'w-3 h-3',
              i <= Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-600 fill-current'
            )}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm font-semibold text-textPrimary">{rating.toFixed(1)}</span>
    </div>
  );
};

// ─── Main Drivers Page ─────────────────────────────────────────────────────
export const Drivers = () => {
  const { data: kpiData, loading: kpiLoading, error: kpiError } = useKpiSummary();

  if (kpiError) {
    return (
      <AppLayout>
        <ErrorState
          message="Failed to load driver stats. Please check your connection or try again."
          onRetry={() => window.location.reload()}
          className="min-h-[50vh]"
        />
      </AppLayout>
    );
  }

  const activeCount = MOCK_DRIVERS.filter(d => d.status === 'Active').length;
  const suspendedCount = MOCK_DRIVERS.filter(d => d.status === 'Suspended').length;

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">

        {/* ── Header ── */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Drivers
          </h1>
          <p className="text-textSecondary text-sm">
            Monitor driver activity, performance metrics, and compliance status.
          </p>
        </div>

        {/* ── KPI Cards (real API data where available) ── */}
        {kpiLoading ? (
          <LoadingState message="Loading driver stats..." />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KpiCard
              title="Total Drivers"
              value={formatNumber(MOCK_DRIVERS.length)}
              icon={<Users className="w-5 h-5" />}
              subtitle={`${activeCount} currently active`}
            />
            <KpiCard
              title="Avg Driver Rating"
              value={kpiData ? formatRating(kpiData.average_driver_rating) : '—'}
              icon={<Star className="w-5 h-5 text-warning" />}
              subtitle="From completed rides"
            />
            <KpiCard
              title="Cancelled by Driver"
              value={kpiData ? formatNumber(kpiData.cancelled_by_driver) : '—'}
              icon={<TrendingDown className="w-5 h-5" />}
              subtitle={kpiData ? `${formatPercentage((kpiData.cancelled_by_driver / kpiData.total_bookings) * 100)} of total` : ''}
            />
            <KpiCard
              title="Suspended"
              value={formatNumber(suspendedCount)}
              icon={<ShieldCheck className="w-5 h-5" />}
              subtitle={`${formatPercentage(((MOCK_DRIVERS.length - suspendedCount) / MOCK_DRIVERS.length) * 100)} compliance`}
            />
          </div>
        )}

        {/* ── Driver Cards Grid ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-textPrimary">Driver Roster</h2>
            <div className="flex items-center gap-2 text-xs text-textMuted">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                Active
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
                Offline
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                Suspended
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {MOCK_DRIVERS.map(driver => {
              const cfg = STATUS_CONFIG[driver.status];
              return (
                <Card key={driver.id} hoverable className="flex flex-col gap-4">
                  {/* Avatar + name row */}
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0',
                      driver.color
                    )}>
                      {driver.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-textPrimary truncate">
                          {driver.name}
                        </p>
                        <span className={cn(
                          'flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full border shrink-0',
                          cfg.badge
                        )}>
                          <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />
                          {driver.status}
                        </span>
                      </div>
                      <p className="text-xs text-textMuted truncate mt-0.5">{driver.vehicle}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-border" />

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-[10px] text-textMuted uppercase tracking-wide mb-1">Rating</p>
                      <StarRating rating={driver.rating} />
                    </div>
                    <div>
                      <p className="text-[10px] text-textMuted uppercase tracking-wide mb-1">Rides</p>
                      <p className="text-sm font-bold text-textPrimary">{driver.rides.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-textMuted uppercase tracking-wide mb-1">Type</p>
                      <p className="text-sm font-bold text-textPrimary">{driver.type}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-xs text-textMuted">
                      <Car className="w-3.5 h-3.5" />
                      <span>Joined {driver.joinDate}</span>
                    </div>
                    {driver.status === 'Suspended' && (
                      <div className="flex items-center gap-1 text-[10px] text-red-400">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Review needed
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* ── Performance Note ── */}
        {kpiData && (
          <Card className="flex items-start gap-4 border border-primary/20 bg-primary/5">
            <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-textPrimary mb-0.5">
                Fleet Average Rating: {formatRating(kpiData.average_driver_rating)} / 5.0
              </p>
              <p className="text-xs text-textMuted">
                Based on {formatNumber(kpiData.completed_rides)} completed rides.
                Driver cancellations account for{' '}
                <span className="text-white font-medium">
                  {formatNumber(kpiData.cancelled_by_driver)} rides
                </span>{' '}
                ({formatPercentage((kpiData.cancelled_by_driver / kpiData.total_bookings) * 100)} of all bookings).
              </p>
            </div>
          </Card>
        )}

      </div>
    </AppLayout>
  );
};
