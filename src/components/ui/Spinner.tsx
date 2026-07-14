import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'muted' | 'white';
}

export function Spinner({
  className,
  size = 'md',
  variant = 'primary',
  ...props
}: SpinnerProps) {
  const sizes = {
    xs: 'h-3.5 w-3.5',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const variants = {
    primary: 'text-primary',
    muted: 'text-muted-foreground/50',
    white: 'text-white',
  };

  return (
    <svg
      className={cn('animate-spin shrink-0', sizes[size], variants[variant], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
