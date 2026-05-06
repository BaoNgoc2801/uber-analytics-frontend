import { FileSearch } from 'lucide-react';
import { cn } from './Card';

interface EmptyStateProps {
  message?: string;
  description?: string;
  className?: string;
}

export const EmptyState = ({ 
  message = 'No data available', 
  description = 'Try adjusting your filters or check back later.',
  className 
}: EmptyStateProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-12 space-y-4 text-center', className)}>
      <div className="p-4 bg-surfaceHighlight rounded-full">
        <FileSearch className="w-8 h-8 text-textMuted" />
      </div>
      <div>
        <p className="text-textPrimary font-medium">{message}</p>
        <p className="text-sm text-textSecondary mt-1">{description}</p>
      </div>
    </div>
  );
};
