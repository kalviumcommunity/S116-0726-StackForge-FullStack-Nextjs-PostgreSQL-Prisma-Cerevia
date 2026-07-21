import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all select-none border';

  const variants = {
    default: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary text-secondary-foreground border-border/30',
    success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/15',
    warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/15',
    destructive: 'bg-destructive/10 text-destructive dark:text-destructive-foreground border-destructive/15',
    outline: 'border-border/80 text-muted-foreground bg-background',
  };

  return <span className={cn(baseStyles, variants[variant], className)} {...props} />;
}

