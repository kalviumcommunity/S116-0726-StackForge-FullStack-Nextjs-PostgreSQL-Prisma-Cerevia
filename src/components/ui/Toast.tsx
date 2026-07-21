'use client';

import * as React from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  id?: string;
  title?: string;
  message: string;
  description?: string;
  type?: 'info' | 'success' | 'warning' | 'error' | 'xp';
  isVisible: boolean;
  onClose?: () => void;
  duration?: number;
  className?: string;
}

export function Toast({
  title,
  message,
  description,
  type = 'info',
  isVisible,
  onClose,
  duration = 4000,
  className,
}: ToastProps) {
  React.useEffect(() => {
    if (isVisible && onClose && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  const icons = {
    info: <Info className="h-5 w-5 text-blue-500" />,
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    error: <AlertCircle className="h-5 w-5 text-destructive" />,
    xp: <Trophy className="h-5 w-5 text-primary" />,
  };

  const bgStyles = {
    info: 'bg-card border-blue-500/10',
    success: 'bg-card border-emerald-500/10',
    warning: 'bg-card border-amber-500/10',
    error: 'bg-card border-destructive/10',
    xp: 'bg-card border-primary/20',
  };

  return (
    <div
      role="alert"
      className={cn(
        'fixed bottom-4 right-4 z-50 flex w-full max-w-sm rounded-2xl border bg-card p-4 shadow-xl select-none transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in-50',
        bgStyles[type],
        className
      )}
    >
      <div className="flex gap-3 w-full">
        {/* Icon */}
        <div className="shrink-0 flex items-center justify-center">
          {icons[type]}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-1">
          {title ? (
            <h4 className="text-sm font-semibold text-foreground tracking-tight">
              {title}
            </h4>
          ) : (
            type === 'xp' && <h4 className="text-sm font-semibold text-primary tracking-tight">XP Earned!</h4>
          )}
          <p className="text-xs text-foreground leading-relaxed font-medium">
            {message}
          </p>
          {description && (
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Close Button */}
        {onClose && (
          <div className="shrink-0">
            <button
              onClick={onClose}
              className="rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
