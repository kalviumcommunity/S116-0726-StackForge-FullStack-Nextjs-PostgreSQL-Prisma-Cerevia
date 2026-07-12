import { PublicHeader } from '@/components/layout/PublicHeader';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Benefits } from '@/components/landing/Benefits';
import { CTA } from '@/components/landing/CTA';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Public landing top navigation bar */}
      <PublicHeader />

      {/* Main landing sections */}
      <main className="flex-1 flex flex-col">
        <Hero />
        <Features />
        <HowItWorks />
        <Benefits />
        <CTA />
      </main>

      {/* Public landing footer map */}
      <PublicFooter />
    </div>
  );
}
