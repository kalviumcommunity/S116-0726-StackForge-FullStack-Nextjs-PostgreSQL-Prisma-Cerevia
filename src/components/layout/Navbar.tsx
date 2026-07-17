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

  // Generate page title based on path for mobile view
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
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/10 bg-card px-6">
      {/* Left side: Hamburger menu & logo on mobile, breadcrumb on desktop */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-none text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45 md:hidden"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="md:hidden">
          <Logo />
        </div>
        <div className="hidden md:block">
          <Breadcrumb />
        </div>
      </div>

      {/* Mobile Title View */}
      <h1 className="text-sm font-serif font-light tracking-wide text-foreground md:hidden absolute left-1/2 -translate-x-1/2">
        {getPageTitle(pathname)}
      </h1>

      {/* Right side: Notifications / Profile placeholder */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Search Button (Hidden on very small screens or shown as icon) */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="hidden sm:flex items-center gap-3 rounded-none border border-border bg-secondary/30 px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="font-sans uppercase tracking-[0.1em] text-[10px]">Search...</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-none border border-border bg-card px-1.5 font-sans text-[8px] font-medium tracking-wide text-muted-foreground opacity-100">
            <span className="text-[10px]">⌘</span>K
          </kbd>
        </button>
        <button
          onClick={() => setIsSearchOpen(true)}
          className="sm:hidden relative rounded-none p-2 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45 transition-colors"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        <NotificationsMenu />
        
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt="Avatar"
            width={32}
            height={32}
            unoptimized
            className="h-8 w-8 rounded-none object-cover border border-primary/20 shrink-0 ml-1 sm:ml-0"
          />
        ) : (
          <div className="h-8 w-8 rounded-none bg-secondary/50 flex items-center justify-center text-xs font-sans uppercase tracking-wider font-medium text-foreground border border-primary/20 select-none shrink-0 ml-1 sm:ml-0">
            {(user?.fullName?.[0] || user?.email?.[0] || 'S').toUpperCase()}
          </div>
        )}
      </div>

      <SearchCommandModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </header>
  );
}
