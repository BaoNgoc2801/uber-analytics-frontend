import { cn } from './Card';

// ─── Base pulse block ─────────────────────────────────────────────────────
const Pulse = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse rounded-lg bg-surfaceHighlight', className)} />
);

// ─── KPI Hero Card Skeleton ───────────────────────────────────────────────
export const SkeletonHeroCard = () => (
  <div className="rounded-2xl border border-white/5 bg-surfaceHighlight/40 p-5 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <Pulse className="w-10 h-10 rounded-xl" />
      <Pulse className="w-16 h-5 rounded-full" />
    </div>
    <Pulse className="w-24 h-7 mb-2" />
    <Pulse className="w-32 h-3 mb-1" />
    <Pulse className="w-20 h-3" />
  </div>
);

// ─── Metric Pill Skeleton ─────────────────────────────────────────────────
export const SkeletonMetricPill = () => (
  <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface/60 animate-pulse">
    <Pulse className="w-10 h-10 rounded-xl shrink-0" />
    <div className="flex-1 space-y-2">
      <Pulse className="h-5 w-16" />
      <Pulse className="h-3 w-28" />
    </div>
  </div>
);

// ─── Chart Card Skeleton ──────────────────────────────────────────────────
export const SkeletonChart = ({ height = 'h-80' }: { height?: string }) => (
  <div className={cn('glass-panel p-6 animate-pulse flex flex-col gap-4', height)}>
    <div className="flex items-center justify-between">
      <div className="space-y-1.5">
        <Pulse className="h-2.5 w-16 rounded-full" />
        <Pulse className="h-5 w-40" />
      </div>
      <Pulse className="h-7 w-24 rounded-lg" />
    </div>
    <div className="flex-1 flex items-end gap-3 pt-4">
      {[65, 40, 80, 55, 90, 45, 70, 60, 85, 50, 75, 35].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-md bg-surfaceHighlight"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
);

// ─── Table Skeleton ───────────────────────────────────────────────────────
export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
  <div className="glass-panel overflow-hidden animate-pulse">
    <div className="p-6 border-b border-border flex items-center justify-between">
      <div className="space-y-1.5">
        <Pulse className="h-2.5 w-16 rounded-full" />
        <Pulse className="h-5 w-36" />
      </div>
      <Pulse className="h-8 w-32 rounded-lg" />
    </div>
    <div className="divide-y divide-border">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="px-6 py-4 flex items-center gap-4">
          <Pulse className="w-4 h-4 rounded-full shrink-0" />
          <Pulse className="h-4 flex-1" />
          <Pulse className="h-4 w-16" />
          <Pulse className="h-4 w-20" />
          <Pulse className="h-4 w-14" />
        </div>
      ))}
    </div>
  </div>
);

// ─── KPI Grid Skeleton ────────────────────────────────────────────────────
export const SkeletonKpiGrid = ({ count = 4 }: { count?: number }) => (
  <div className={`grid grid-cols-2 md:grid-cols-${Math.min(count, 4)} gap-4`}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonHeroCard key={i} />
    ))}
  </div>
);
