import * as React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryText = 'Try again',
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-destructive/15 bg-destructive/5 p-8 md:p-12 text-center shadow-sm select-none transition-all',
        className
      )}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4 border border-destructive/20 animate-pulse">
        <AlertCircle className="h-5 w-5" />
      </div>
      <h3 className="text-sm font-semibold tracking-tight text-destructive mb-1.5">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mb-5">
        {message}
      </p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="border-destructive/30 hover:bg-destructive/10 hover:text-destructive transition-colors">
          {retryText}
        </Button>
      )}
    </div>
  );
}
