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
  X
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
  
  // Prevent body scroll when mobile drawer is open
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

  // Handle Esc key to close drawer
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
      {/* --- DESKTOP SIDEBAR --- */}
      <aside
        className={cn(
          'hidden md:flex md:flex-col md:fixed md:inset-y-0 bg-[#060606] border-r border-border/10 z-20 transition-all duration-300',
          isCollapsed ? 'md:w-20' : 'md:w-64'
        )}
      >
        {/* Header (Logo + Collapse Button) */}
        <div
          className={cn(
            'flex h-16 items-center border-b border-border/10 relative',
            isCollapsed ? 'justify-center' : 'justify-between px-6'
          )}
        >
          <Logo showText={!isCollapsed} />
          
          {/* Collapse Toggle Button */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-none border border-border/10 bg-background text-muted-foreground hover:text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45 transition-transform select-none cursor-pointer',
              isCollapsed ? 'right-2' : '-right-3'
            )}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-3.5 w-3.5" />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-0 py-6 space-y-1 overflow-y-auto" aria-label="Desktop Sidebar Navigation">
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
        <div className="border-t border-border/10 bg-[#060606] p-3 space-y-1">
          <SidebarItem
            href="/settings"
            icon={Settings}
            label="Settings"
            isCollapsed={isCollapsed}
            className="opacity-75 hover:opacity-100"
          />
          <button
            type="button"
            onClick={logout}
            className={cn(
              'w-full flex items-center gap-3 rounded-none p-2 text-[10px] font-sans uppercase tracking-[0.15em] font-light text-destructive hover:bg-destructive/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive cursor-pointer',
              isCollapsed ? 'justify-center' : 'px-4 py-3'
            )}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
            {!isCollapsed && <span>Logout</span>}
          </button>

          <div
            className={cn(
              'flex items-center gap-3 border-t border-border/10 pt-3 mt-3',
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
                className="h-8 w-8 rounded-none object-cover border border-primary/20 shrink-0"
              />
            ) : (
              <div className="h-8 w-8 rounded-none bg-secondary/50 flex items-center justify-center text-xs font-sans uppercase tracking-wider font-medium text-foreground border border-primary/20 select-none shrink-0">
                {(user?.fullName?.[0] || user?.email?.[0] || 'S').toUpperCase()}
              </div>
            )}
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-sans font-semibold tracking-wider uppercase text-foreground truncate">{user?.fullName || 'Student Account'}</span>
                <span className="text-[9px] font-sans text-muted-foreground/60 truncate">{user?.email || 'student@byjus.com'}</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 w-72 bg-[#060606] border-r border-border/10 z-55 flex flex-col transition-transform duration-300 ease-out md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-border/10">
          <Logo />
          <button
            type="button"
            className="rounded-none p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-0 py-6 space-y-1 overflow-y-auto" aria-label="Mobile Drawer Navigation">
          {navigationItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              onClick={onClose}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-border/10 bg-[#060606] space-y-2">
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
            className="w-full flex items-center gap-3 rounded-none px-4 py-3 text-[10px] font-sans uppercase tracking-[0.15em] font-light text-destructive hover:bg-destructive/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive cursor-pointer"
          >
            <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Logout</span>
          </button>
          
          <div className="flex items-center gap-3 pt-3 border-t border-border/10">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt="Avatar"
                width={32}
                height={32}
                unoptimized
                className="h-8 w-8 rounded-none object-cover border border-primary/20 shrink-0"
              />
            ) : (
              <div className="h-8 w-8 rounded-none bg-secondary/50 flex items-center justify-center text-xs font-sans uppercase tracking-wider font-medium text-foreground border border-primary/20 select-none shrink-0">
                {(user?.fullName?.[0] || user?.email?.[0] || 'S').toUpperCase()}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-sans font-semibold tracking-wider uppercase text-foreground truncate">{user?.fullName || 'Student Account'}</span>
              <span className="text-[9px] font-sans text-muted-foreground/60 truncate">{user?.email || 'student@byjus.com'}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
