'use client';

import * as React from 'react';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface XPToastProps {
  xp: number;
  message?: string;
  isVisible: boolean;
  onClose: () => void;
}

export function XPToast({ xp, message = "XP Gained!", isVisible, onClose }: XPToastProps) {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="flex items-center gap-3 rounded-full border border-purple-500/30 bg-card/90 px-4 py-2 shadow-lg backdrop-blur-md">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
          <Trophy className="h-4 w-4 text-purple-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground">+{xp} XP</span>
          <span className="text-xs text-muted-foreground">{message}</span>
        </div>
      </div>
    </div>
  );
}
