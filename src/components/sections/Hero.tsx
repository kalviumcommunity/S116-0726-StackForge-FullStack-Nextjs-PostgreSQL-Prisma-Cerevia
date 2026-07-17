import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center border-b border-border/10 overflow-hidden bg-black">
      {/* Cinematic Luxury Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 select-none pointer-events-none"
        style={{ backgroundImage: 'url("/luxury-bg.png")' }}
      />
      
      {/* Ambient Vignette and Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000_80%)] pointer-events-none" />

      {/* Decorative vertical center line for luxury architectural styling */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-primary/20 via-transparent to-transparent -translate-x-1/2 pointer-events-none hidden md:block" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 text-center flex flex-col items-center gap-8 py-20">
        {/* Brand Mark Subtitle */}
        <div className="inline-flex items-center gap-2.5 border border-primary/20 bg-black/40 backdrop-blur-md px-6 py-2 text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-primary select-none rounded-none animate-fade-in shadow-[0_0_15px_rgba(212,175,55,0.05)]">
          <Sparkles className="h-3 w-3 text-primary" />
          <span>Bespoke Syllabus Engine</span>
        </div>

        {/* Master Branding Title */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-extralight tracking-[0.22em] text-foreground uppercase leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            Cerevia
          </h1>
          <p className="text-[11px] sm:text-xs font-sans font-light tracking-[0.3em] text-primary/80 uppercase">
            Syllabus. Streaks. Mastery.
          </p>
        </div>

        {/* Brand Description */}
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed font-light tracking-wide mx-auto mt-2">
          An elite interactive learning environment engineered for modern builders. Complete challenges, maintain streak momentum, and master systems architecture inside a curated digital space.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-6">
          <Link
            href="/dashboard"
            className="group flex h-12 w-full sm:w-80 items-center justify-center gap-3 rounded-none bg-primary px-8 text-[11px] font-medium uppercase tracking-[0.25em] text-primary-foreground shadow-[0_4px_20px_rgba(212,175,55,0.15)] transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45"
          >
            <span>Enter Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#features"
            className="flex h-12 w-full sm:w-80 items-center justify-center rounded-none border border-primary/30 bg-black/40 backdrop-blur-md px-8 text-[11px] font-medium uppercase tracking-[0.25em] text-primary hover:bg-primary/10 hover:border-primary transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45"
          >
            Explore Curriculum
          </Link>
        </div>
      </div>
    </section>
  );
}
