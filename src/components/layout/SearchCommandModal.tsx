'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Search, Monitor, BookOpen, Trophy, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchCommandModal({ isOpen, onClose }: SearchCommandModalProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);
  
  const searchItems = React.useMemo(() => [
    { name: 'Dashboard', icon: Monitor, path: '/dashboard' },
    { name: 'Lessons', icon: BookOpen, path: '/lessons' },
    { name: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    { name: 'Profile', icon: User, path: '/profile' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ], []);
  
  const filteredItems = React.useMemo(() => {
    return searchItems.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, searchItems]);

  // Handle keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter' && filteredItems.length > 0) {
        e.preventDefault();
        router.push(filteredItems[activeIndex].path);
        onClose();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, activeIndex, router, onClose]);

  // Reset active index when query changes
  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 md:pt-32 bg-background/80 backdrop-blur-sm p-4">
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose} 
        aria-hidden="true"
      />
      
      <div className="relative z-50 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="mr-2 h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search..."
            className="flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="ml-2 inline-flex h-6 items-center justify-center rounded-md bg-secondary px-2 text-[10px] font-medium text-muted-foreground hover:bg-secondary/80"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[300px] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found for &quot;{query}&quot;.
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                Navigation
              </div>
              {filteredItems.map((item, index) => (
                <button
                  key={item.path}
                  onClick={() => {
                    router.push(item.path);
                    onClose();
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none w-full text-left transition-colors",
                    activeIndex === index 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
