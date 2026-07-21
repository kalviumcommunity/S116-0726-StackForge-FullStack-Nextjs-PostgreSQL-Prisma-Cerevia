import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-sans font-medium tracking-normal transition-colors focus:outline-none select-none';

  const variants = {
    default: 'bg-primary/10 text-primary border border-primary/20',
    secondary: 'bg-secondary text-secondary-foreground border border-border',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    warning: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20',
    destructive: 'bg-destructive/10 text-destructive border border-destructive/20',
    outline: 'border border-border text-foreground bg-background',
  };

  return <span className={cn(baseStyles, variants[variant], className)} {...props} />;
}
