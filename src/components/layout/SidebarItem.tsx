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
        'group flex items-center gap-3 rounded-none p-2 text-[10px] font-sans uppercase tracking-[0.15em] font-light transition-all border-l-2 duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45',
        isCollapsed ? 'justify-center border-l-0' : 'px-4 py-3',
        isActive
          ? 'border-primary bg-primary/5 text-primary'
          : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-[#121212]/50',
        className
      )}
    >
      <Icon
        className={cn(
          'h-4 w-4 shrink-0 transition-colors',
          isActive
            ? 'text-primary'
            : 'text-muted-foreground group-hover:text-foreground'
        )}
        aria-hidden="true"
      />
      {!isCollapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}
