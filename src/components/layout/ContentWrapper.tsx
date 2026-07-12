import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
}

export function ContentWrapper({ children, className = '' }: ContentWrapperProps) {
  return (
    <div className={cn('w-full flex-1 flex flex-col gap-6', className)}>
      {children}
    </div>
  );
}
