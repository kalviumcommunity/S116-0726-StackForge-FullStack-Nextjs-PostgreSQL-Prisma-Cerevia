'use client';

import { useState, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { cn } from '@/lib/utils';
import { GamificationOverlay } from '@/components/gamification/GamificationOverlay';
import { useAuth } from '@/providers/AuthProvider';

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans">
        <div className="relative flex items-center justify-center">
          <div className="h-12 w-12 border border-primary/20 border-t-primary animate-spin" />
        </div>
        <p className="mt-8 text-[10px] font-sans font-medium tracking-[0.2em] text-primary uppercase animate-pulse">
          Loading Cerevia...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased text-foreground">
      {/* Sidebar: handles desktop fixed sidebar + mobile drawer state */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main viewport area, offset on desktop by sidebar width */}
      <div
        className={cn(
          'flex flex-col min-h-screen flex-1 transition-all duration-300',
          isCollapsed ? 'md:pl-20' : 'md:pl-64'
        )}
      >
        {/* Sticky top navigation bar */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Content container */}
        <main className="flex-1 flex flex-col animate-fade-in">
          {children}
        </main>
        <GamificationOverlay />
      </div>
    </div>
  );
}
