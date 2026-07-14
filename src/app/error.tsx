'use client';

import * as React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  React.useEffect(() => {
    // Log the error to a service
    console.error('Unhandled App Router error:', error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] px-4 text-center select-none">
      <div className="relative mb-6">
        <span className="text-[120px] font-extrabold leading-none tracking-tighter text-destructive/10 select-none">
          500
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive border border-destructive/20 animate-pulse">
            <AlertTriangle className="h-7 w-7" />
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
        An unexpected error occurred
      </h1>
      <p className="text-sm text-muted-foreground max-w-md mb-8">
        We apologize for the inconvenience. A crash was caught by the global error boundary. Please try resetting the viewport or returning home.
      </p>

      <div className="flex gap-4">
        <Button variant="primary" onClick={reset} leftIcon={<RotateCcw className="h-4 w-4" />}>
          Try resetting page
        </Button>
        <Button variant="outline" onClick={() => (window.location.href = '/')}>
          Return to landing
        </Button>
      </div>
    </div>
  );
}
