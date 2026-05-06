import { Loader2 } from 'lucide-react';
import { cn } from './Card';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState = ({ message = 'Loading...', className }: LoadingStateProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 space-y-4', className)}>
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
      <p className="text-textSecondary">{message}</p>
    </div>
  );
};
