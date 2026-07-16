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
          'hidden md:flex md:flex-col md:fixed md:inset-y-0 bg-card border-r border-border z-20 transition-all duration-300',
          isCollapsed ? 'md:w-20' : 'md:w-64'
        )}
      >
        {/* Header (Logo + Collapse Button) */}
        <div
          className={cn(
            'flex h-16 items-center border-b border-border relative',
            isCollapsed ? 'justify-center' : 'justify-between px-6'
          )}
        >
          <Logo showText={!isCollapsed} />
          
          {/* Collapse Toggle Button */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-transform select-none cursor-pointer',
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
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto" aria-label="Desktop Sidebar Navigation">
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
        <div className="border-t border-border bg-muted/10 p-3 space-y-1">
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
              'w-full flex items-center gap-3 rounded-lg p-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 cursor-pointer',
              isCollapsed ? 'justify-center' : 'px-3 py-2'
            )}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
            {!isCollapsed && <span>Logout</span>}
          </button>

          <div
            className={cn(
              'flex items-center gap-3 border-t border-border/50 pt-3 mt-3',
              isCollapsed ? 'justify-center' : 'px-2 py-1.5'
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
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-foreground border border-border select-none shrink-0">
                {(user?.fullName?.[0] || user?.email?.[0] || 'S').toUpperCase()}
              </div>
            )}
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-foreground truncate">{user?.fullName || 'Student Account'}</span>
                <span className="text-[10px] text-muted-foreground truncate">{user?.email || 'student@byjus.com'}</span>
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
          'fixed inset-y-0 left-0 w-72 bg-card border-r border-border z-50 flex flex-col transition-transform duration-300 ease-out md:hidden shadow-lg',
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
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto" aria-label="Mobile Drawer Navigation">
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

        <div className="p-4 border-t border-border bg-muted/10 space-y-2">
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
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
            <span>Logout</span>
          </button>
          
          <div className="flex items-center gap-3 pt-3 border-t border-border/50">
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
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-foreground border border-border select-none shrink-0">
                {(user?.fullName?.[0] || user?.email?.[0] || 'S').toUpperCase()}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-foreground truncate">{user?.fullName || 'Student Account'}</span>
              <span className="text-[10px] text-muted-foreground truncate">{user?.email || 'student@byjus.com'}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
