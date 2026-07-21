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
        'group flex items-center gap-3 rounded-md p-2.5 text-sm font-sans font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        isCollapsed ? 'justify-center mx-2' : 'mx-3 px-4 py-2.5',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
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
