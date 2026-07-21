import * as React from 'react';
import { cn } from '@/lib/utils';

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '5xl' | '6xl' | '7xl' | 'full';
}

/**
 * PageContainer
 * Standard page wrapper for all dashboard views in Cerevia.
 * Controls maximum layout width, responsive horizontal padding,
 * vertical spacing, and centered page alignment.
 */
export function PageContainer({
  children,
  className,
  maxWidth = '7xl',
  ...props
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex-1 flex flex-col gap-6 md:gap-8 min-w-0',
        maxWidthClasses[maxWidth],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

