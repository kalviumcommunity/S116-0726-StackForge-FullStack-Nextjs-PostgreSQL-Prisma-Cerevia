'use client';

import Image from 'next/image';
import { Shield, ArrowUp, ArrowDown, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeagueTier {
  id: string;
  name: string;
  minXP: number;
  promotionTop: number;
  demotionBottom: number;
  image: string;
  color: string;
}

export function LeagueSystemCards({ currentLeague = 'Gold' }: { currentLeague?: string }) {
  const leagues: LeagueTier[] = [
    {
      id: 'l1',
      name: 'Bronze',
      minXP: 0,
      promotionTop: 5,
      demotionBottom: 0,
      image: '/images/community/leagues/bronze.webp',
      color: 'border-amber-700/40 bg-amber-950/10 text-amber-600',
    },
    {
      id: 'l2',
      name: 'Silver',
      minXP: 150,
      promotionTop: 5,
      demotionBottom: 3,
      image: '/images/community/leagues/silver.webp',
      color: 'border-zinc-400/40 bg-zinc-900/40 text-zinc-300',
    },
    {
      id: 'l3',
      name: 'Gold',
      minXP: 300,
      promotionTop: 5,
      demotionBottom: 3,
      image: '/images/community/leagues/gold.webp',
      color: 'border-amber-500/50 bg-amber-500/10 text-amber-400',
    },
    {
      id: 'l4',
      name: 'Platinum',
      minXP: 500,
      promotionTop: 5,
      demotionBottom: 3,
      image: '/images/community/leagues/platinum.webp',
      color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
    },
    {
      id: 'l5',
      name: 'Diamond',
      minXP: 800,
      promotionTop: 3,
      demotionBottom: 3,
      image: '/images/community/leagues/diamond.webp',
      color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300',
    },
    {
      id: 'l6',
      name: 'Master',
      minXP: 1200,
      promotionTop: 3,
      demotionBottom: 3,
      image: '/images/community/leagues/master.webp',
      color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
    },
    {
      id: 'l7',
      name: 'Legend',
      minXP: 2000,
      promotionTop: 0,
      demotionBottom: 3,
      image: '/images/community/leagues/legend.webp',
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    },
  ];

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
            <Shield className="h-3.5 w-3.5" />
            <span>Competitive Division Tiers</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            Weekly League System
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-xl">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Active: {currentLeague} League</span>
        </div>
      </div>

      {/* League Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {leagues.map((lg) => {
          const isCurrent = lg.name.toLowerCase() === currentLeague.toLowerCase();

          return (
            <div
              key={lg.id}
              className={cn(
                'rounded-2xl border p-4 space-y-3 flex flex-col justify-between items-center text-center transition-all duration-300 relative group overflow-hidden shadow-md',
                isCurrent
                  ? 'bg-zinc-900 border-amber-500 ring-2 ring-amber-500/30'
                  : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700'
              )}
            >
              <div className="space-y-2 flex flex-col items-center w-full">
                {isCurrent ? (
                  <span className="text-[9px] font-black uppercase tracking-wider bg-amber-500 text-zinc-950 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-zinc-500">
                    {lg.minXP} XP
                  </span>
                )}

                <div className="relative h-16 w-16 rounded-xl bg-zinc-900 border border-zinc-800 p-2 flex items-center justify-center">
                  <Image
                    src={lg.image}
                    alt={lg.name}
                    fill
                    unoptimized
                    className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <h4 className="text-sm font-extrabold text-white">{lg.name}</h4>
              </div>

              <div className="space-y-1 w-full pt-2 border-t border-zinc-800/80 text-[10px] font-semibold text-zinc-400">
                {lg.promotionTop > 0 && (
                  <p className="text-emerald-400 flex items-center justify-center gap-1">
                    <ArrowUp className="h-3 w-3" /> Top {lg.promotionTop} Promoted
                  </p>
                )}
                {lg.demotionBottom > 0 && (
                  <p className="text-rose-400 flex items-center justify-center gap-1">
                    <ArrowDown className="h-3 w-3" /> Bottom {lg.demotionBottom} Demoted
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
