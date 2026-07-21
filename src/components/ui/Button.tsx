'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Spinner } from './Spinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 rounded-md font-sans text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer';

    const variants = {
      primary:
        'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline:
        'border border-border bg-background text-foreground hover:bg-secondary hover:text-foreground',
      ghost: 'text-foreground hover:bg-secondary hover:text-foreground',
      destructive:
        'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
      link: 'text-primary underline-offset-4 hover:underline p-0 h-auto rounded-none',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-10 px-4 py-2 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2.5',
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="text-current shrink-0" />}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
