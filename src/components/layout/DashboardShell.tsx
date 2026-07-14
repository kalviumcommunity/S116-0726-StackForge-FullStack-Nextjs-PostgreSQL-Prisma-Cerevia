'use client';

import { useState, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { cn } from '@/lib/utils';

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
