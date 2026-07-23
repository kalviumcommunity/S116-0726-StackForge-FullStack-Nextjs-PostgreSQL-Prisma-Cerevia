'use client';

import { useEffect } from 'react';
import {
  LayoutDashboard,
  Trophy,
  BookOpen,
  User,
  Sparkles,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { Logo } from './Logo';
import { SidebarItem } from './SidebarItem';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/AuthProvider';
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navigationItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/lessons', icon: BookOpen, label: 'Lessons' },
  { href: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { href: '/xp', icon: Sparkles, label: 'XP Tracker' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: SidebarProps) {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <aside
        className={cn(
          'hidden md:flex md:flex-col md:fixed md:inset-y-0 bg-white border-r border-slate-200 z-20 transition-all duration-200 shadow-xs',
          isCollapsed ? 'md:w-20' : 'md:w-64'
        )}
      >
        <div
          className={cn(
            'flex h-16 items-center border-b border-border relative',
            isCollapsed ? 'justify-center' : 'justify-between px-6'
          )}
        >
          <Logo showText={!isCollapsed} size="sm" />

          <button
            type="button"
            onClick={onToggleCollapse}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-transform select-none cursor-pointer',
              isCollapsed ? 'right-2' : '-right-3'
            )}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Desktop Sidebar Navigation">
          {navigationItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>

        {/* Footer Area: Settings, Logout, Profile */}
        <div className="border-t border-border bg-card p-3 space-y-1">
          <SidebarItem
            href="/settings"
            icon={Settings}
            label="Settings"
            isCollapsed={isCollapsed}
            className="opacity-80 hover:opacity-100"
          />
          <button
            type="button"
            onClick={logout}
            className={cn(
              'w-full flex items-center gap-3 rounded-md p-2 text-sm font-sans font-medium text-destructive hover:bg-destructive/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive cursor-pointer',
              isCollapsed ? 'justify-center' : 'px-4 py-3'
            )}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
            {!isCollapsed && <span>Logout</span>}
          </button>

          <div
            className={cn(
              'flex items-center gap-3 border-t border-border pt-3 mt-3',
              isCollapsed ? 'justify-center' : 'px-3 py-1.5'
            )}
          >
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt="Avatar"
                width={32}
                height={32}
                unoptimized
                className="h-8 w-8 rounded-full object-cover border border-border shrink-0"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center text-xs font-sans font-medium text-foreground border border-border select-none shrink-0">
                {(user?.fullName?.[0] || user?.email?.[0] || 'S').toUpperCase()}
              </div>
            )}
            {!isCollapsed && (
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground">
                  {user?.fullName || 'Student Account'}
                </span>
                <span className="truncate text-[9px] text-muted-foreground/70">{user?.email || 'student@byjus.com'}</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/70 transition-opacity duration-300 md:hidden',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={cn(
          'fixed inset-y-0 left-0 w-72 bg-card border-r border-border z-55 flex flex-col transition-transform duration-300 ease-out md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-border">
          <Logo />
          <button
            type="button"
            className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Mobile Drawer Navigation">
          {navigationItems.map((item) => (
            <SidebarItem key={item.href} href={item.href} icon={item.icon} label={item.label} onClick={onClose} />
          ))}
        </nav>

        <div className="p-4 border-t border-border bg-card space-y-2">
          <SidebarItem
            href="/settings"
            icon={Settings}
            label="Settings"
            onClick={onClose}
            className="opacity-75 hover:opacity-100"
          />
          <button
            type="button"
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-sans font-medium text-destructive hover:bg-destructive/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive cursor-pointer"
          >
            <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Logout</span>
          </button>
          
          <div className="flex items-center gap-3 pt-3 border-t border-border">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt="Avatar"
                width={32}
                height={32}
                unoptimized
                className="h-8 w-8 rounded-full object-cover border border-border shrink-0"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center text-xs font-sans font-medium text-foreground border border-border select-none shrink-0">
                {(user?.fullName?.[0] || user?.email?.[0] || 'S').toUpperCase()}
              </div>
            )}
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground">
                {user?.fullName || 'Student Account'}
              </span>
              <span className="truncate text-[9px] text-muted-foreground/70">{user?.email || 'student@byjus.com'}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
