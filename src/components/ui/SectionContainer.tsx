import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SectionContainer({ children, className, ...props }: SectionContainerProps) {
  return (
    <section
      className={cn(
        'w-full flex flex-col gap-4 border border-border/50 bg-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm overflow-hidden transition-all',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
