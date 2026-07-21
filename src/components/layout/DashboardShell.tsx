'use client';

import { useState, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { cn } from '@/lib/utils';
import { GamificationOverlay } from '@/components/gamification/GamificationOverlay';
import { useAuth } from '@/providers/AuthProvider';

interface DashboardShellProps {
  children: ReactNode;
  className?: string;
}

/**
 * DashboardShell
 * Main layout wrapper for authenticated dashboard pages.
 * Handles desktop fixed sidebar offset, mobile drawer state,
 * sticky header navigation, and overall viewport structure.
 */
export function DashboardShell({ children, className }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, isLoading } = useAuth();

  // Show a simple, clean loading screen while verifying user auth session
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground font-sans">
        <div className="relative flex items-center justify-center">
          <div className="h-10 w-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
        <p className="mt-4 text-xs font-medium tracking-wider text-muted-foreground uppercase">
          Loading Cerevia...
        </p>
      </div>
    );
  }

  // Prevent flash of unauthenticated content
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased text-foreground">
      {/* Sidebar navigation component */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main viewport content area with responsive left-padding offset for desktop sidebar */}
      <div
        className={cn(
          'flex flex-col min-h-screen flex-1 transition-all duration-300 ease-in-out min-w-0',
          isCollapsed ? 'md:pl-20' : 'md:pl-64'
        )}
      >
        {/* Top navbar navigation bar */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Main page content container */}
        <main className={cn('flex-1 flex flex-col w-full min-w-0', className)}>
          {children}
        </main>

        {/* Gamification overlay for achievements and XP notifications */}
        <GamificationOverlay />
      </div>
    </div>
  );
}

