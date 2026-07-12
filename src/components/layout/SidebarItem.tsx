'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  className?: string;
  onClick?: () => void;
}

export function SidebarItem({
  href,
  icon: Icon,
  label,
  className = '',
  onClick,
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isActive
          ? 'bg-secondary text-foreground'
          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
        className
      )}
    >
      <Icon
        className={cn(
          'h-4.5 w-4.5 shrink-0 transition-colors',
          isActive
            ? 'text-foreground'
            : 'text-muted-foreground group-hover:text-foreground'
        )}
        aria-hidden="true"
      />
      <span>{label}</span>
    </Link>
  );
}
