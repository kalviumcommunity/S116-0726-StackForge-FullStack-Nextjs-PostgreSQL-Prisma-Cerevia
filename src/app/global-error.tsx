'use client';

import * as React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('Fatal Root Layout Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased font-sans flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-center space-y-6">
          <div className="h-16 w-16 mx-auto rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center animate-pulse">
            <AlertTriangle className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-black text-slate-900">Application Error</h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              We encountered a critical runtime error. Please try reloading the session or return to the main platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => reset()}
              className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retry Session</span>
            </button>
            <button
              onClick={() => (window.location.href = '/')}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-200"
            >
              Return Home
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
