import { PublicHeader } from '@/components/layout/PublicHeader';
import { Hero } from '@/components/sections/Hero';
import { FeaturedCourses } from '@/components/sections/FeaturedCourses';
import { LearningPaths } from '@/components/sections/LearningPaths';
import { LearningImpact } from '@/components/sections/LearningImpact';
import { StudentTestimonials } from '@/components/sections/StudentTestimonials';
import { WhyCerevia } from '@/components/sections/WhyCerevia';
import { CTA } from '@/components/sections/CTA';
import { PublicFooter } from '@/components/layout/Footer';

export const metadata = {
  title: 'Cerevia — AI-Powered Education Platform for Engineers',
  description:
    'Master coding, AI, cloud computing, and software engineering through interactive learning experiences designed for the next generation.',
};

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] font-sans text-zinc-900 selection:bg-blue-600 selection:text-white dark:bg-[#111111] dark:text-zinc-100">
      {/* 1. Floating Navigation Header */}
      <PublicHeader />

      {/* Main Landing Content Sections */}
      <main className="flex flex-1 flex-col">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Featured Courses */}
        <FeaturedCourses />

        {/* 4. Learning Paths */}
        <LearningPaths />

        {/* 5. Learning Impact Statistics */}
        <LearningImpact />

        {/* 6. Student Testimonials Carousel */}
        <StudentTestimonials />

        {/* 7. Why Cerevia Features Grid */}
        <WhyCerevia />

        {/* 8. Final CTA */}
        <CTA />
      </main>

      {/* 9. Public Editorial Footer */}
      <PublicFooter />
    </div>
  );
}
