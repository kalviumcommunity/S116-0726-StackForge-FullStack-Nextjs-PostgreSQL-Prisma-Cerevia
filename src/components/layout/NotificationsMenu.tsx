'use client';

import * as React from 'react';
import { Bell, Check, Info, Trophy, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Notification {
  id: string;
  title: string;
  description: string;
  isRead: boolean;
  time: string;
  type: 'info' | 'success' | 'warning' | 'achievement';
}

// Mock notifications for demonstration
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Daily Streak Maintained!',
    description: 'You completed a lesson today. Keep it up!',
    isRead: false,
    time: '2 hours ago',
    type: 'success'
  },
  {
    id: '2',
    title: 'New Achievement Unlocked',
    description: 'You earned the "Fast Learner" badge.',
    isRead: false,
    time: '5 hours ago',
    type: 'achievement'
  },
  {
    id: '3',
    title: 'Weekly Leaderboard',
    description: 'You moved up 3 ranks this week!',
    isRead: true,
    time: '2 days ago',
    type: 'info'
  }
];

export function NotificationsMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState(MOCK_NOTIFICATIONS);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Click outside to close
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <Check className="h-4 w-4 text-success" />;
      case 'achievement': return <Trophy className="h-4 w-4 text-purple-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      default: return <Info className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
        aria-label="View notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500 ring-2 ring-background"></span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-border bg-card shadow-xl animate-in slide-in-from-top-2 fade-in duration-200 z-50">
          <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-3">
            <h3 className="font-semibold text-sm text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-medium text-primary hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-[350px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <Bell className="h-8 w-8 text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">You don&apos;t have any notifications right now.</p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-border">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "flex gap-3 p-4 transition-colors hover:bg-secondary/50",
                      !notification.isRead ? "bg-primary/5" : ""
                    )}
                  >
                    <div className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border",
                      !notification.isRead ? "bg-card" : "bg-secondary"
                    )}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium leading-none text-foreground">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.description}
                      </p>
                      <p className="text-[10px] font-medium text-muted-foreground/80 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="border-t border-border p-2 bg-secondary/20">
            <Link href="/settings" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground">
                View all notifications
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// style: adjust notifications visual polish step 4

// style: adjust notifications visual polish step 5

// style: adjust notifications visual polish step 6

// style: adjust notifications visual polish step 7

// style: adjust notifications visual polish step 8
