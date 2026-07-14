import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SectionContainer({ children, className, ...props }: SectionContainerProps) {
  return (
    <section
      className={cn(
        'w-full flex flex-col gap-4 border border-border bg-card/40 backdrop-blur-sm rounded-xl p-6 shadow-sm overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
