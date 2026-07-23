'use client';

import { Trophy, Flame, Shield, Search, Users, Globe, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardHeroProps {
  userRank: number;
  userXP: number;
  activeTab: 'global' | 'friends' | 'leagues' | 'activity';
  onTabChange: (tab: 'global' | 'friends' | 'leagues' | 'activity') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  timeframe: 'weekly' | 'monthly' | 'all-time';
  onTimeframeChange: (t: 'weekly' | 'monthly' | 'all-time') => void;
}

export function LeaderboardHero({
  userRank,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  timeframe,
  onTimeframeChange,
}: LeaderboardHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Main Header & Current User Rank Tile */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/80 px-3 py-1 text-[11px] font-extrabold text-blue-700 uppercase tracking-wider">
              <Trophy className="h-3.5 w-3.5 fill-blue-600 text-blue-600" />
              <span>Gold Division • Season 4</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider">
              <Flame className="h-3.5 w-3.5 text-emerald-600 fill-emerald-600" />
              <span>Global Rankings</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
            Global Engineering <span className="text-blue-600">Leaderboard</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-xl">
            Compete with software engineers worldwide, climb divisions, and showcase your weekly syllabus mastery.
          </p>
        </div>

        {/* User Standing Widget */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-xs min-w-[260px] flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Standing</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">#{userRank || 4}</span>
              <span className="text-xs font-bold text-blue-700">Gold Division</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Top 5% Promotion Zone
            </p>
          </div>

          <div className="h-12 w-12 rounded-xl bg-blue-100/80 border border-blue-200 flex flex-col items-center justify-center text-blue-600 shrink-0">
            <Trophy className="h-6 w-6 fill-blue-600" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs & Search Controls Row */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-slate-100">
        
        {/* Main Section Tabs */}
        <div className="flex items-center gap-1.5 border-b md:border-b-0 border-slate-100 pb-3 md:pb-0 overflow-x-auto scrollbar-none">
          {[
            { id: 'global', label: 'Global Standings', icon: Globe },
            { id: 'friends', label: 'Peer Network', icon: Users },
            { id: 'leagues', label: 'Divisions', icon: Shield },
            { id: 'activity', label: 'Community Feed', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as any)}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 cursor-pointer',
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-100/80 text-slate-600 border-slate-200/80 hover:text-slate-900 hover:bg-slate-200/60'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Timeframe Controls */}
        <div className="flex items-center gap-3">
          
          {/* Search Bar */}
          <div className="relative flex-1 md:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search engineer..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Timeframe Filter Dropdown/Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 p-1 rounded-xl text-xs font-semibold shrink-0">
            {(['weekly', 'monthly', 'all-time'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => onTimeframeChange(tf)}
                className={cn(
                  'px-2.5 py-1 rounded-lg capitalize transition-all text-[11px]',
                  timeframe === tf ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900'
                )}
              >
                {tf}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
