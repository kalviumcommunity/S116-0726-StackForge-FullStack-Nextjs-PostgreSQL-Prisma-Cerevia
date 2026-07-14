import { PublicHeader } from '@/components/layout/PublicHeader';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Benefits } from '@/components/sections/Benefits';
import { CTA } from '@/components/sections/CTA';
import { PublicFooter } from '@/components/layout/Footer';

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
