'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Search, Flame, Sparkles, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useAuth } from '@/providers/AuthProvider';
import Image from 'next/image';
import Link from 'next/link';
import { NotificationsMenu } from './NotificationsMenu';
import { SearchCommandModal } from './SearchCommandModal';

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
        return 'Student Workspace';
      case '/lessons':
        return 'Course Syllabus';
      case '/leaderboard':
        return 'Leaderboard';
      case '/xp':
        return 'XP Tracker';
      case '/profile':
        return 'Student Profile';
      case '/settings':
        return 'Account Settings';
      default:
        return 'Cerevia AI';
    }
  };

  // Compute level: Each level is 100 XP
  const currentXP = user?.totalXP || 0;
  const currentLevel = Math.floor(currentXP / 100) + 1;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl px-4 sm:px-6">
      
      {/* Left section: Mobile menu & Logo / Desktop Breadcrumbs */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden transition-colors"
          onClick={onMenuClick}
          aria-label="Open navigation sidebar"
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

      {/* Center title on mobile view */}
      <h1 className="text-xs font-bold tracking-wide text-white md:hidden absolute left-1/2 -translate-x-1/2">
        {getPageTitle(pathname)}
      </h1>

      {/* Right section: Search, XP, Streak, Notifications & Profile */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        
        {/* Command+K Search Bar */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="hidden sm:flex items-center gap-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/80 px-3.5 py-1.5 text-xs text-zinc-400 transition-all hover:border-zinc-700 hover:bg-zinc-800/60 hover:text-white"
        >
          <Search className="h-3.5 w-3.5 text-zinc-500" />
          <span className="font-medium">Search dashboard...</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-md border border-zinc-800 bg-zinc-950 px-1.5 font-mono text-[9px] font-semibold text-zinc-500">
            <span>⌘</span>K
          </kbd>
        </button>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="sm:hidden relative rounded-xl border border-zinc-800 p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
          aria-label="Search dashboard"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Gamification Streak Pill */}
        <div className="hidden lg:flex items-center gap-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400 select-none">
          <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400 animate-pulse" />
          <span>{user?.currentStreak || 0}d Streak</span>
        </div>

        {/* XP & Level Badge */}
        <Link
          href="/xp"
          className="hidden sm:flex items-center gap-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 hover:bg-blue-500/20 transition-all select-none group"
        >
          <Sparkles className="h-3.5 w-3.5 text-blue-400 fill-blue-400" />
          <span>Lvl {currentLevel} • {currentXP} XP</span>
          <ChevronRight className="h-3 w-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {/* Notifications Dropdown Trigger */}
        <NotificationsMenu />

        {/* User Profile Link */}
        <Link href="/profile" className="flex items-center gap-2 group">
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt="Avatar"
              width={32}
              height={32}
              unoptimized
              className="h-8 w-8 rounded-full object-cover border border-zinc-800 group-hover:border-blue-500 transition-colors shrink-0"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 group-hover:border-blue-500 transition-colors select-none">
              {(user?.fullName?.[0] || user?.email?.[0] || 'S').toUpperCase()}
            </div>
          )}
        </Link>

      </div>

      <SearchCommandModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
