import type { ReactNode } from 'react';
import { Card } from '../common';
import { cn } from '../common';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  className?: string;
}

export const KpiCard = ({ title, value, icon, trend, subtitle, className }: KpiCardProps) => {
  return (
    <Card hoverable className={cn('flex flex-col', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-textSecondary mb-1">{title}</p>
          <h4 className="text-2xl font-bold text-white tracking-tight">{value}</h4>
        </div>
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
      
      {(trend || subtitle) && (
        <div className="mt-4 flex items-center text-sm">
          {trend && (
            <span
              className={cn(
                "font-medium mr-2",
                trend.isPositive ? "text-primary" : "text-danger"
              )}
            >
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
          )}
          {subtitle && <span className="text-textMuted">{subtitle}</span>}
        </div>
      )}
    </Card>
  );
};
