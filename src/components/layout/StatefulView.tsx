import * as React from 'react';
import { Loader } from '@/components/ui/Loader';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';

interface StatefulViewProps {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: React.ReactNode;
  emptyAction?: React.ReactNode;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

export function StatefulView({
  isLoading,
  isError,
  isEmpty,
  error,
  onRetry,
  emptyTitle = 'No data found',
  emptyDescription = 'There is nothing to display here yet.',
  emptyIcon,
  emptyAction,
  children,
  loadingComponent,
}: StatefulViewProps) {
  if (isLoading) {
    return loadingComponent ? (
      <>{loadingComponent}</>
    ) : (
      <div className="flex h-40 w-full flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Something went wrong"
        message={error?.message || 'An unexpected error occurred while loading this view.'}
        onRetry={onRetry}
      />
    );
  }

  if (isEmpty) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        icon={emptyIcon}
        action={emptyAction}
      />
    );
  }

  return <>{children}</>;
}
