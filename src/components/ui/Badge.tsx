import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center rounded-none px-2 py-0.5 text-[9px] font-sans uppercase tracking-[0.15em] font-medium transition-colors focus:outline-none select-none';

  const variants = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-primary/15 text-primary border border-primary/20',
    warning: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/20',
    destructive: 'bg-destructive/10 text-destructive dark:text-destructive-foreground border border-destructive/20',
    outline: 'border border-border/80 text-foreground bg-background',
  };

  return <span className={cn(baseStyles, variants[variant], className)} {...props} />;
}
