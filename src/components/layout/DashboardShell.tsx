'use client';

import { useState, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased text-foreground">
      {/* Sidebar: handles desktop fixed sidebar + mobile drawer state */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main viewport area, offset on desktop by sidebar width */}
      <div className="flex flex-col md:pl-64 min-h-screen flex-1">
        {/* Sticky top navigation bar */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Content container */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
