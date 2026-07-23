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
        'group flex items-center gap-3 rounded-xl p-2.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        isCollapsed ? 'justify-center mx-2' : 'mx-2 px-3.5 py-2.5',
        isActive
          ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80',
        className
      )}
    >
      <Icon
        className={cn(
          'h-4 w-4 shrink-0 transition-colors',
          isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-700'
        )}
        aria-hidden="true"
      />
      {!isCollapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}
