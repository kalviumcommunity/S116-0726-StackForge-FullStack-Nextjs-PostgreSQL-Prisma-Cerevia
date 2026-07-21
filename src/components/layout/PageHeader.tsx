import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/**
 * PageHeader
 * Reusable header component for dashboard pages.
 * Displays breadcrumb navigation, page title, subtitle/description,
 * and optional action buttons slot (e.g. Primary Action, Filters, Export).
 */
export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5 md:pb-6 border-b border-border/60 min-w-0',
        className
      )}
    >
      <div className="flex flex-col gap-1 min-w-0">
        {breadcrumbs && (
          <div className="mb-1 text-xs text-muted-foreground">
            {breadcrumbs}
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground truncate">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0 sm:self-center">
          {actions}
        </div>
      )}
    </div>
  );
}

