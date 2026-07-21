'use client';

import * as React from 'react';
import { Bell, Check, Info, Trophy, AlertTriangle, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  isRead: boolean;
  time: string;
  type: 'info' | 'success' | 'warning' | 'achievement';
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Daily Streak Maintained!',
    description: 'You completed a lesson today. Keep it up!',
    isRead: false,
    time: '2 hours ago',
    type: 'success',
  },
  {
    id: '2',
    title: 'New Achievement Unlocked',
    description: 'You earned the "Fast Learner" badge.',
    isRead: false,
    time: '5 hours ago',
    type: 'achievement',
  },
  {
    id: '3',
    title: 'Weekly Leaderboard Update',
    description: 'You moved up 3 ranks on the leaderboard!',
    isRead: true,
    time: '2 days ago',
    type: 'info',
  },
];

/**
 * NotificationsMenu
 * Header notification bell trigger and dropdown card container.
 * Supports unread indicator badge, categorised notifications,
 * mark-as-read toggles, empty state UI, and keyboard dismissal.
 */
export function NotificationsMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Handle click outside & Escape key to close menu
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item))
    );
  };

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'success':
        return <Check className="h-4 w-4 text-emerald-500" />;
      case 'achievement':
        return <Trophy className="h-4 w-4 text-amber-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-rose-500" />;
      default:
        return <Info className="h-4 w-4 text-sky-500" />;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Bell Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="View notifications"
        aria-expanded={isOpen}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/80 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
          </span>
        )}
      </button>

      {/* Notifications Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 overflow-hidden rounded-xl border border-border/70 bg-card text-card-foreground shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* List Content */}
          <div className="max-h-[360px] overflow-y-auto divide-y divide-border/40">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                <Bell className="h-8 w-8 text-muted-foreground/40 mb-2" />
                <p className="text-sm font-medium text-foreground">No notifications yet</p>
                <p className="text-xs text-muted-foreground mt-1">We will notify you when updates arrive.</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={cn(
                    'flex items-start gap-3 p-3.5 transition-colors cursor-pointer hover:bg-muted/50',
                    !notification.isRead ? 'bg-primary/5' : 'bg-transparent'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 mt-0.5',
                      !notification.isRead ? 'bg-background shadow-xs' : 'bg-muted/40'
                    )}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {notification.title}
                      </p>
                      <span className="text-[10px] text-muted-foreground shrink-0">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Action Link */}
          <div className="border-t border-border/60 p-2 bg-muted/20 text-center">
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="inline-block w-full rounded-lg py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              Manage Notification Settings
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}


