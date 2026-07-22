'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Compass, CheckCircle } from 'lucide-react';

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#111111] py-28 text-white">
      {/* Background Decorative Mesh & Glows */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_48px] opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 opacity-60 blur-[140px]" />
      <div className="pointer-events-none absolute right-10 top-10 -z-10 h-[300px] w-[300px] rounded-full bg-amber-500/15 blur-[120px]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 fill-amber-400" />
          <span>Accelerate Your Engineering Career</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Start Learning Today
        </h2>

        {/* Subtitle */}
        <p className="max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg md:text-xl">
          Join over{' '}
          <span className="font-bold text-white">20,000+ students</span>{' '}
          building their future with Cerevia’s AI-powered education platform.
        </p>

        {/* Action Buttons */}
        <div className="flex w-full flex-col items-center gap-4 pt-4 sm:w-auto sm:flex-row">
          <Link
            href="/register"
            className="group flex h-14 w-full transform items-center justify-center gap-2.5 rounded-full bg-white px-9 text-sm font-bold text-zinc-950 shadow-2xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-100 sm:w-auto"
          >
            <span>Create Account</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="#courses"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-8 text-sm font-semibold text-zinc-200 transition-all duration-200 hover:border-zinc-600 hover:bg-zinc-800 sm:w-auto"
          >
            <Compass className="h-4 w-4" />
            <span>Explore Courses</span>
          </a>
        </div>

        {/* Trust Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs font-medium text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-blue-400" />
            <span>Free Access to Core Syllabi</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-amber-400" />
            <span>Instant AI Sandbox</span>
          </div>
        </div>
      </div>
    </section>
  );
}
