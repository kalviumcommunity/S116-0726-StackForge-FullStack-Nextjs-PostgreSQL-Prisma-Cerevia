'use client';

import Image from 'next/image';
import { Shield, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeagueTier {
  id: string;
  name: string;
  minXP: number;
  promotionTop: number;
  demotionBottom: number;
  image: string;
}

export function LeagueSystemCards({ currentLeague = 'Gold' }: { currentLeague?: string }) {
  const leagues: LeagueTier[] = [
    { id: 'l1', name: 'Bronze', minXP: 0, promotionTop: 5, demotionBottom: 0, image: '/images/community/leagues/bronze.webp' },
    { id: 'l2', name: 'Silver', minXP: 150, promotionTop: 5, demotionBottom: 3, image: '/images/community/leagues/silver.webp' },
    { id: 'l3', name: 'Gold', minXP: 300, promotionTop: 5, demotionBottom: 3, image: '/images/community/leagues/gold.webp' },
    { id: 'l4', name: 'Platinum', minXP: 500, promotionTop: 5, demotionBottom: 3, image: '/images/community/leagues/platinum.webp' },
    { id: 'l5', name: 'Diamond', minXP: 800, promotionTop: 3, demotionBottom: 3, image: '/images/community/leagues/diamond.webp' },
    { id: 'l6', name: 'Master', minXP: 1200, promotionTop: 3, demotionBottom: 3, image: '/images/community/leagues/master.webp' },
    { id: 'l7', name: 'Legend', minXP: 2000, promotionTop: 0, demotionBottom: 3, image: '/images/community/leagues/legend.webp' },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider">
            <Shield className="h-3.5 w-3.5 text-blue-600" />
            <span>Competitive Divisions</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Weekly Division System
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-3.5 py-1.5 rounded-xl">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          <span>Active Division: {currentLeague}</span>
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
                'rounded-2xl border p-4 space-y-3 flex flex-col justify-between items-center text-center transition-all duration-300 relative group overflow-hidden shadow-xs',
                isCurrent
                  ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              )}
            >
              <div className="space-y-2 flex flex-col items-center w-full">
                {isCurrent ? (
                  <span className="text-[9px] font-black uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded-full">
                    Active
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-500">
                    {lg.minXP} XP
                  </span>
                )}

                <div className="relative h-16 w-16 rounded-xl bg-slate-100/80 border border-slate-200 p-2 flex items-center justify-center">
                  <Image
                    src={lg.image}
                    alt={lg.name}
                    fill
                    unoptimized
                    className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <h4 className="text-sm font-extrabold text-slate-900">{lg.name}</h4>
              </div>

              <div className="space-y-1 w-full pt-2 border-t border-slate-100 text-[10px] font-semibold text-slate-500">
                {lg.promotionTop > 0 && (
                  <p className="text-emerald-700 flex items-center justify-center gap-1">
                    <ArrowUp className="h-3 w-3 text-emerald-600" /> Top {lg.promotionTop} Promoted
                  </p>
                )}
                {lg.demotionBottom > 0 && (
                  <p className="text-rose-700 flex items-center justify-center gap-1">
                    <ArrowDown className="h-3 w-3 text-rose-600" /> Bottom {lg.demotionBottom} Demoted
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
