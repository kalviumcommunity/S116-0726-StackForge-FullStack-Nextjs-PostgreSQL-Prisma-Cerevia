import Link from 'next/link';
import { ArrowRight, Trophy, Flame, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 border-b border-border/20">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[800px] -translate-x-1/2 bg-orange-500/10 opacity-20 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left gap-6">
            {/* Tagline pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/5 px-3 py-1 text-xs font-semibold text-orange-500 select-none animate-fade-in">
              <Sparkles className="h-3 w-3" />
              <span>Real-time Learning Streaks</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground max-w-2xl leading-[1.1]">
              Keep learning momentum alive with{' '}
              <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                Cerevia
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Cerevia is a production-grade gamification engine designed for BYJU&apos;S. Power your consistency with daily streak tracking, real-time leaderboard challenges, and instant learning achievements.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
              <Link
                href="/dashboard"
                className="group flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#features"
                className="flex h-11 w-full sm:w-auto items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Interactive Illustration Column */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] aspect-square rounded-2xl border border-border bg-card p-6 shadow-2xl relative overflow-hidden group hover:border-orange-500/20 transition-all duration-300">
              {/* Card glowing borders */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="flex flex-col gap-5 h-full justify-between relative z-10">
                {/* Simulated Leaderboard Widget */}
                <div className="rounded-xl border border-border bg-background/50 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <Trophy className="h-3.5 w-3.5 text-amber-500" />
                      Weekly Leaderboard
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">1h cache</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-1 border-b border-border/40 text-xs">
                      <span className="font-medium text-foreground">1. Avadhut P.</span>
                      <span className="font-bold text-orange-500">2,450 XP</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-border/40 text-xs opacity-80">
                      <span className="font-medium text-foreground">2. Areesh A.</span>
                      <span className="font-medium text-muted-foreground">2,120 XP</span>
                    </div>
                    <div className="flex items-center justify-between py-1 text-xs opacity-60">
                      <span className="font-medium text-foreground">3. Hardik K.</span>
                      <span className="font-medium text-muted-foreground">1,890 XP</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Streak Widget */}
                <div className="rounded-xl border border-border bg-background/50 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                      <Flame className="h-5 w-5 text-orange-500 fill-orange-500/20" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-foreground">7 Days Streak!</span>
                      <span className="text-[10px] text-muted-foreground">Next target in 14 hours</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-orange-500/10 text-orange-500 rounded-full select-none">
                    +100 XP
                  </span>
                </div>

                {/* Graph Shimmer */}
                <div className="rounded-xl border border-border bg-background/50 p-4 space-y-2">
                  <div className="h-2 w-24 bg-secondary rounded" />
                  <div className="h-16 flex items-end gap-2 pt-2">
                    <div className="flex-1 bg-orange-500/30 hover:bg-orange-500 transition-colors h-8 rounded-sm cursor-pointer" />
                    <div className="flex-1 bg-orange-500/30 hover:bg-orange-500 transition-colors h-12 rounded-sm cursor-pointer" />
                    <div className="flex-1 bg-orange-500/30 hover:bg-orange-500 transition-colors h-6 rounded-sm cursor-pointer" />
                    <div className="flex-1 bg-orange-500/30 hover:bg-orange-500 transition-colors h-14 rounded-sm cursor-pointer" />
                    <div className="flex-1 bg-orange-500/30 hover:bg-orange-500 transition-colors h-10 rounded-sm cursor-pointer" />
                    <div className="flex-1 bg-orange-500 hover:bg-orange-500 h-16 rounded-sm cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
