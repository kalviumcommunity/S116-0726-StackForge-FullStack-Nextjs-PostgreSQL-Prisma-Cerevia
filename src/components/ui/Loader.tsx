import * as React from 'react';
import { Spinner } from './Spinner';
import { cn } from '@/lib/utils';

export interface LoaderProps {
  fullscreen?: boolean;
  text?: string;
  className?: string;
}

export function Loader({ fullscreen = false, text = 'Loading...', className }: LoaderProps) {
  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" className="text-orange-500" />
          {text && (
            <p className="text-xs font-semibold tracking-wide text-muted-foreground animate-pulse">
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center justify-center p-8 gap-3 w-full', className)}>
      <Spinner size="md" className="text-orange-500" />
      {text && (
        <p className="text-xs font-medium text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
