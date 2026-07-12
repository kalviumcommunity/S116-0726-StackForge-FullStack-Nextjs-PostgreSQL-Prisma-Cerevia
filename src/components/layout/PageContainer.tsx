import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <main
      className={cn(
        'flex-1 flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full focus:outline-none',
        className
      )}
      tabIndex={-1}
    >
      {children}
    </main>
  );
}
