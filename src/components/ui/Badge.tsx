import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors focus:outline-none select-none';

  const variants = {
    default: 'bg-primary text-primary-foreground shadow-sm',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/20',
    destructive: 'bg-destructive/10 text-destructive dark:text-destructive-foreground border border-destructive/20',
    outline: 'border border-border text-foreground bg-background',
  };

  return <span className={cn(baseStyles, variants[variant], className)} {...props} />;
}
