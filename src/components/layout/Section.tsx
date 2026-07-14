import * as React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  title?: string;
  description?: string;
  headerAction?: React.ReactNode;
}

export function Section({
  children,
  className,
  title,
  description,
  headerAction,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'w-full flex flex-col gap-4 border border-border bg-card/40 backdrop-blur-sm rounded-xl p-6 shadow-sm overflow-hidden',
        className
      )}
      {...props}
    >
      {(title || description || headerAction) && (
        <div className="flex items-center justify-between pb-4 border-b border-border/50 gap-4">
          <div className="flex flex-col gap-1">
            {title && (
              <h2 className="text-lg font-bold tracking-tight text-foreground">{title}</h2>
            )}
            {description && (
              <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
            )}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}
      <div className="flex-1 flex flex-col min-h-0 w-full">{children}</div>
    </section>
  );
}
