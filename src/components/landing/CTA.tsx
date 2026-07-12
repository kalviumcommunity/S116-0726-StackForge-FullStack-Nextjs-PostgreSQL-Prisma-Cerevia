import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';

export function CTA() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Decorative backdrop glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[600px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
        <div className="h-12 w-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center animate-bounce duration-1000">
          <Flame className="h-6 w-6 fill-orange-500/20" />
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground max-w-2xl">
          Ready to build your learning streak?
        </h2>

        <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
          Join thousands of students completing daily lessons, climbing division ranks, and mastering active subject tracks on Cerevia.
        </p>

        <div className="mt-2 w-full sm:w-auto">
          <Link
            href="/dashboard"
            className="group inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>Start Learning Now</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
