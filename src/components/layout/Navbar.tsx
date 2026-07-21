'use client';

import { usePathname } from 'next/navigation';
import { Menu, Search } from 'lucide-react';
import { Logo } from './Logo';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useAuth } from '@/providers/AuthProvider';
import Image from 'next/image';
import { NotificationsMenu } from './NotificationsMenu';
import { SearchCommandModal } from './SearchCommandModal';
import * as React from 'react';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/lessons':
        return 'Lessons';
      case '/leaderboard':
        return 'Leaderboard';
      case '/xp':
        return 'XP Tracker';
      case '/profile':
        return 'Profile';
      case '/settings':
        return 'Settings';
      default:
        return 'Cerevia';
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border/10 bg-background/95">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-5 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45 md:hidden"
            onClick={onMenuClick}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="md:hidden">
            <Logo size="sm" />
          </div>
          <div className="hidden md:block">
            <Breadcrumb />
          </div>
        </div>

        <h1 className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[12px] font-medium uppercase tracking-[0.25em] text-foreground/90 md:hidden">
          {getPageTitle(pathname)}
        </h1>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden items-center gap-2 rounded-lg border border-border/70 bg-secondary/50 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground sm:flex"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-md border border-border/70 bg-background px-1.5 text-[8px] font-medium tracking-wide text-muted-foreground">
              <span className="text-[9px]">⌘</span>K
            </kbd>
          </button>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45 sm:hidden"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          <NotificationsMenu />

          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt="Avatar"
              width={32}
              height={32}
              unoptimized
              className="ml-1 h-9 w-9 shrink-0 rounded-lg border border-primary/20 object-cover sm:ml-0"
            />
          ) : (
            <div className="ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-secondary/60 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground sm:ml-0">
              {(user?.fullName?.[0] || user?.email?.[0] || 'S').toUpperCase()}
            </div>
          )}
        </div>
      </div>

      <SearchCommandModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
