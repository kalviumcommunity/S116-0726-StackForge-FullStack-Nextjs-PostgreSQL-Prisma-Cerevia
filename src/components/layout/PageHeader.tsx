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
        'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5 md:pb-6 border-b border-slate-200 min-w-0',
        className
      )}
    >
      <div className="flex flex-col gap-1 min-w-0">
        {breadcrumbs && (
          <div className="mb-1 text-xs text-slate-500">
            {breadcrumbs}
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 truncate">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
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
