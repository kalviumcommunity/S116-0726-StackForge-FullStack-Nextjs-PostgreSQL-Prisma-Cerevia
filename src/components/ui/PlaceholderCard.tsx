import * as React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Skeleton';

export interface PlaceholderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'card' | 'list' | 'stats';
  count?: number;
}

export function PlaceholderCard({ 
  className, 
  type = 'card',
  count = 1,
  ...props 
}: PlaceholderCardProps) {
  const renderCard = (i: number) => (
    <div 
      key={`placeholder-${i}`}
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-border/50 bg-card p-6 shadow-sm",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        {type === 'card' && <Skeleton className="h-12 w-12 rounded-full" />}
        {type === 'list' && <Skeleton className="h-10 w-10 rounded-lg" />}
        {type === 'stats' && <Skeleton className="h-8 w-8 rounded-full" />}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-3 w-[40%]" />
        </div>
      </div>
      
      {type === 'card' && (
        <div className="space-y-2 mt-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[80%]" />
          <Skeleton className="h-3 w-[90%]" />
        </div>
      )}
      
      {type === 'stats' && (
        <div className="mt-2">
          <Skeleton className="h-8 w-[30%]" />
        </div>
      )}
    </div>
  );

  if (count === 1) return renderCard(0);
  
  return (
    <div className={cn(
      "grid gap-4",
      type === 'list' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    )}>
      {Array.from({ length: count }).map((_, i) => renderCard(i))}
    </div>
  );
}
