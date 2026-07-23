'use client';

import { Trophy, Flame, Shield, Search, Users, Globe, Sparkles, Filter } from 'lucide-react';
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
  userXP,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  timeframe,
  onTimeframeChange,
}: LeaderboardHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8">
      {/* Background Mesh Glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-amber-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-600/15 blur-[120px]" />

      {/* Main Header & Current User Rank Tile */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[11px] font-bold text-amber-400 uppercase tracking-widest">
              <Trophy className="h-3.5 w-3.5 fill-amber-400" />
              <span>Gold League • Season 4</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-[11px] font-bold text-blue-400 uppercase tracking-widest">
              <Flame className="h-3.5 w-3.5 text-blue-400 fill-blue-400" />
              <span>Live Social Ecosystem</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
            Global Engineering <span className="text-amber-400">Leaderboard</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal max-w-xl">
            Compete with software engineers worldwide, climb academic leagues, and showcase your daily syllabus mastery.
          </p>
        </div>

        {/* User Standing Widget */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 backdrop-blur-xl shadow-xl min-w-[280px] flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Your Standing</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">#{userRank || 4}</span>
              <span className="text-xs font-bold text-amber-400">Gold League</span>
            </div>
            <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Top 5% Promotion Zone
            </p>
          </div>

          <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col items-center justify-center text-amber-400 shrink-0">
            <Trophy className="h-6 w-6 fill-amber-400" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs & Search Controls Row */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-zinc-800/80">
        
        {/* Main Section Tabs */}
        <div className="flex items-center gap-2 border-b md:border-b-0 border-zinc-800 pb-3 md:pb-0 overflow-x-auto scrollbar-none">
          <button
            onClick={() => onTabChange('global')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0',
              activeTab === 'global'
                ? 'bg-white text-zinc-950 border-white shadow-md'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            )}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Global Standings</span>
          </button>

          <button
            onClick={() => onTabChange('friends')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0',
              activeTab === 'friends'
                ? 'bg-white text-zinc-950 border-white shadow-md'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            )}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Friends Ranking</span>
          </button>

          <button
            onClick={() => onTabChange('leagues')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0',
              activeTab === 'leagues'
                ? 'bg-white text-zinc-950 border-white shadow-md'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            )}
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Leagues</span>
          </button>

          <button
            onClick={() => onTabChange('activity')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0',
              activeTab === 'activity'
                ? 'bg-white text-zinc-950 border-white shadow-md'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            )}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Community Feed</span>
          </button>
        </div>

        {/* Search & Timeframe Controls */}
        <div className="flex items-center gap-3">
          
          {/* Search Bar */}
          <div className="relative flex-1 md:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search engineer..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-zinc-800 bg-zinc-900 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Timeframe Filter Dropdown/Buttons */}
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl text-xs font-semibold shrink-0">
            {(['weekly', 'monthly', 'all-time'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => onTimeframeChange(tf)}
                className={cn(
                  'px-2.5 py-1 rounded-lg capitalize transition-all text-[11px]',
                  timeframe === tf ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
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
