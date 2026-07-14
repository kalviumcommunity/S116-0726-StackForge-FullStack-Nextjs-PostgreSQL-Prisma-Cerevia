import * as React from 'react';
import { cn } from '@/lib/utils';

interface ContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ContentWrapper({ children, className, ...props }: ContentWrapperProps) {
  return (
    <div
      className={cn(
        'flex-1 flex flex-col gap-6 md:gap-8 min-h-0 w-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
