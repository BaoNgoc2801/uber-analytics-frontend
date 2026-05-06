import type { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card = ({ children, className, hoverable = false }: CardProps) => {
  return (
    <div
      className={cn(
        'glass-panel p-6',
        hoverable && 'card-hover',
        className
      )}
    >
      {children}
    </div>
  );
};
