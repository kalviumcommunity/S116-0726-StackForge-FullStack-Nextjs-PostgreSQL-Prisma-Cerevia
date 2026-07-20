import * as React from 'react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/50 p-8 md:p-12 text-center shadow-sm select-none transition-all',
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-muted-foreground mb-4 border border-border/40 shadow-inner">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-semibold tracking-tight text-foreground mb-1.5">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mb-5">
        {description}
      </p>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
