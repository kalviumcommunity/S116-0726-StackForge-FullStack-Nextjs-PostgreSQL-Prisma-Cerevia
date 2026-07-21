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
  isCollapsed?: boolean;
}

export function SidebarItem({
  href,
  icon: Icon,
  label,
  className = '',
  onClick,
  isCollapsed = false,
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      title={isCollapsed ? label : undefined}
      className={cn(
        'group relative mx-2 flex min-h-11 items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45',
        isCollapsed ? 'justify-center px-2' : 'px-3',
        isActive
          ? 'border-primary/10 bg-primary/10 text-foreground shadow-sm'
          : 'hover:border-border/40 hover:bg-secondary/60 hover:text-foreground',
        className
      )}
    >
      <span
        className={cn(
          'absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary transition-all',
          isActive ? 'w-1' : 'w-0'
        )}
      />
      <Icon
        className={cn(
          'h-4 w-4 shrink-0 transition-colors',
          isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
        )}
        aria-hidden="true"
      />
      {!isCollapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}
