'use client';

import { usePathname } from 'next/navigation';
import { Menu, Bell } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();

  // Generate page title based on path
  const getPageTitle = (path: string) => {
    if (path === '/') return 'Dashboard';
    const segment = path.split('/')[1];
    if (!segment) return 'Dashboard';
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 backdrop-blur px-4 md:px-8">
      {/* Mobile left side: Menu trigger & Logo */}
      <div className="flex items-center gap-4 md:gap-0">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="md:hidden">
          <Logo showText={false} />
        </div>
        {/* Desktop left side: Title */}
        <h1 className="hidden md:block text-base font-semibold tracking-tight text-foreground">
          {getPageTitle(pathname)}
        </h1>
      </div>

      {/* Mobile center side: Title */}
      <h1 className="md:hidden text-sm font-semibold text-foreground">
        {getPageTitle(pathname)}
      </h1>

      {/* Right side: Notifications / Profile placeholder */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="View notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-background" />
        </button>
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-foreground border border-border">
          S
        </div>
      </div>
    </header>
  );
}
