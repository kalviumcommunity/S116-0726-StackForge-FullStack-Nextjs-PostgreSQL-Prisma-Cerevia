'use client';

import * as React from 'react';
import { X, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Confetti } from './Confetti';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
}

export function LevelUpModal({ isOpen, onClose, newLevel }: LevelUpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <Confetti />
      
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border-2 border-primary/20 bg-card p-8 shadow-[0_0_50px_-12px_rgba(var(--primary),0.5)] animate-in zoom-in-95 duration-500 text-center flex flex-col items-center">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative mb-8 mt-4 flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 border-4 border-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.3)]">
          <Star className="absolute h-24 w-24 text-primary opacity-20 animate-pulse" />
          <span className="relative text-6xl font-black text-foreground drop-shadow-md">
            {newLevel}
          </span>
        </div>

        <h2 className="text-3xl font-black uppercase tracking-wider text-foreground mb-2">Level Up!</h2>
        <p className="text-muted-foreground mb-8">
          You have reached level {newLevel}. Keep up the great work!
        </p>

        <Button onClick={onClose} className="w-full h-12 text-lg font-bold" size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
}

// style: adjust level up modal visual polish step 7

// style: adjust level up modal visual polish step 8

// style: adjust level up modal visual polish step 9

// style: adjust level up modal visual polish step 10

// style: adjust level up modal visual polish step 11

// style: adjust level up modal visual polish step 12
