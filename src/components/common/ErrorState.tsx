import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from './Card';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState = ({ message = 'Something went wrong', onRetry, className }: ErrorStateProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 space-y-4 text-center', className)}>
      <div className="p-3 bg-danger/10 rounded-full">
        <AlertCircle className="w-8 h-8 text-danger" />
      </div>
      <p className="text-danger font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 text-sm text-textSecondary hover:text-textPrimary transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try again</span>
        </button>
      )}
    </div>
  );
};
