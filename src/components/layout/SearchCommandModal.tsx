'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Search, Monitor, BookOpen, Trophy, Settings, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SearchItem {
  name: string;
  category: 'Navigation' | 'Quick Actions';
  icon: React.ElementType;
  path: string;
}

/**
 * SearchCommandModal
 * Command palette search dialog popup.
 * Provides real-time filtering across dashboard navigation links,
 * keyboard navigation (Up/Down/Enter/Escape), and active item tracking.
 */
export function SearchCommandModal({ isOpen, onClose }: SearchCommandModalProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);

  const searchItems: SearchItem[] = React.useMemo(
    () => [
      { name: 'Dashboard Overview', category: 'Navigation', icon: Monitor, path: '/dashboard' },
      { name: 'Browse Lessons', category: 'Navigation', icon: BookOpen, path: '/lessons' },
      { name: 'Global Leaderboard', category: 'Navigation', icon: Trophy, path: '/leaderboard' },
      { name: 'User Profile', category: 'Quick Actions', icon: User, path: '/profile' },
      { name: 'Account Settings', category: 'Quick Actions', icon: Settings, path: '/settings' },
    ],
    []
  );

  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return searchItems;
    return searchItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, searchItems]);

  // Handle keyboard navigation (Arrow Up, Arrow Down, Enter, Escape)
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (filteredItems.length > 0 ? (prev + 1) % filteredItems.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) =>
          filteredItems.length > 0 ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
        );
      } else if (e.key === 'Enter' && filteredItems.length > 0) {
        e.preventDefault();
        const selected = filteredItems[activeIndex];
        if (selected) {
          router.push(selected.path);
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, activeIndex, router, onClose]);

  // Reset active selection index when search query changes
  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-background/80 backdrop-blur-xs animate-in fade-in duration-150">
      {/* Backdrop overlay listener */}
      <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Box */}
      <div className="relative z-50 w-full max-w-lg overflow-hidden rounded-xl border border-border/70 bg-card text-card-foreground shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-border/60 px-4 py-3 bg-muted/20">
          <Search className="mr-3 h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search..."
            className="flex h-9 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="mr-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear query"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
          <button
            onClick={onClose}
            className="inline-flex h-6 items-center justify-center rounded-md border border-border/60 bg-muted px-2 text-[10px] font-medium text-muted-foreground"
          >
            ESC
          </button>
        </div>

        {/* Results List Area */}
        <div className="max-h-[320px] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center">
              <Search className="mx-auto h-7 w-7 text-muted-foreground/40 mb-2" />
              <p className="text-sm font-medium text-foreground">No results found</p>
              <p className="text-xs text-muted-foreground mt-1">
                No matching pages found for &quot;{query}&quot;.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {filteredItems.map((item, index) => {
                const IconComponent = item.icon;
                const isSelected = activeIndex === index;

                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      router.push(item.path);
                      onClose();
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cn(
                      'flex items-center justify-between rounded-lg px-3 py-2.5 text-sm w-full text-left transition-colors cursor-pointer',
                      isSelected
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground hover:bg-muted/50'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <IconComponent className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 shrink-0">
                      {item.category}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

