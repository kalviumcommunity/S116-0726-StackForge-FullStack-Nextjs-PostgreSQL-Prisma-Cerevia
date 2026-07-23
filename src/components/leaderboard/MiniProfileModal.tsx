'use client';

import Image from 'next/image';
import { Modal } from '@/components/ui/Modal';
import { Trophy, Flame, ShieldCheck, User, Star, BookOpen } from 'lucide-react';
import { LeaderboardEntryItem } from './GlobalLeaderboardTable';

interface MiniProfileModalProps {
  student: LeaderboardEntryItem | null;
  onClose: () => void;
}

export function MiniProfileModal({ student, onClose }: MiniProfileModalProps) {
  if (!student) return null;

  const level = Math.floor((student.weeklyXP || 0) / 100) + 1;

  return (
    <Modal isOpen={!!student} onClose={onClose} title="Student Profile Preview">
      <div className="space-y-6 py-2 select-none">
        
        {/* Header Avatar & Details */}
        <div className="flex items-center gap-4 border-b border-zinc-800 pb-4">
          <div className="relative h-16 w-16 rounded-full border-2 border-amber-500 bg-zinc-900 overflow-hidden shrink-0 shadow-lg">
            {student.avatar ? (
              <Image
                src={student.avatar}
                alt={student.fullName || 'Student'}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-zinc-500 m-auto" />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-black text-white">{student.fullName || 'Anonymous Engineer'}</h3>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-wider">
              <ShieldCheck className="h-3 w-3" />
              <span>Level {level} Scholar</span>
            </span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-0.5">
            <p className="text-[10px] font-bold text-zinc-400 uppercase">Rank</p>
            <p className="text-lg font-black text-amber-400">#{student.rank}</p>
          </div>

          <div className="p-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-0.5">
            <p className="text-[10px] font-bold text-zinc-400 uppercase">Weekly XP</p>
            <p className="text-lg font-black text-white">{student.weeklyXP}</p>
          </div>

          <div className="p-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-0.5">
            <p className="text-[10px] font-bold text-zinc-400 uppercase">Streak</p>
            <p className="text-lg font-black text-amber-400">{student.streak || 3}d</p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full h-10 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-bold text-zinc-200 hover:bg-zinc-800"
          >
            Close Preview
          </button>
        </div>

      </div>
    </Modal>
  );
}
