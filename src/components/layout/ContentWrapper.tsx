import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * ContentWrapper
 * Main layout body wrapper for dashboard section content.
 * Manages vertical spacing between content modules (cards, charts, grids),
 * flex column expansion, and overflow boundaries.
 */
export function ContentWrapper({ children, className, ...props }: ContentWrapperProps) {
  return (
    <div
      className={cn(
        'flex-1 flex flex-col gap-6 md:gap-8 min-w-0 w-full min-h-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

