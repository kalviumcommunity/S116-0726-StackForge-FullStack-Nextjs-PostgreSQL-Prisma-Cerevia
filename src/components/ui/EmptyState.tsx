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
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-12 text-center shadow-sm select-none',
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-muted-foreground mb-4 border border-border">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-semibold tracking-tight text-foreground mb-1">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mb-6">
        {description}
      </p>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
