'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  course: string;
  avatar: string;
  rating: number;
  quote: string;
  badge: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Aarav Sharma',
    role: 'Frontend Engineer',
    company: 'Stripe',
    course: 'Modern React 19 & Next.js Architecture',
    avatar: '/images/students/avatar-1.webp',
    rating: 5,
    quote:
      'Cerevia completely changed how I learn programming. The AI Mentor instant feedback saved me weeks of debugging stuck code. I landed my dream role at Stripe within 4 months!',
    badge: 'Verified Student',
  },
  {
    id: 't2',
    name: 'Priya Patel',
    role: 'AI Solutions Specialist',
    company: 'Google',
    course: 'Artificial Intelligence & LLM Fine-Tuning',
    avatar: '/images/students/avatar-2.webp',
    rating: 5,
    quote:
      'The hands-on coding sandboxes and real-world vector database projects gave me the exact skills needed during my technical interviews. Unmatched platform quality.',
    badge: 'Verified Alumni',
  },
  {
    id: 't3',
    name: 'Rohan Verma',
    role: 'Backend Architect',
    company: 'Uber',
    course: 'Distributed System Design & Microservices',
    avatar: '/images/students/avatar-3.webp',
    rating: 5,
    quote:
      'The gamified streak engine and weekly leaderboards kept me accountable every single night. The System Design modules are world-class.',
    badge: 'Top 1% Ranker',
  },
  {
    id: 't4',
    name: 'Ananya Gupta',
    role: 'Cloud Infrastructure Lead',
    company: 'Microsoft',
    course: 'Cloud Native & Kubernetes Engineering',
    avatar: '/images/students/avatar-4.webp',
    rating: 5,
    quote:
      'Mastering Kubernetes and Terraform through Cerevia gave me the confidence to lead cloud infrastructure migrations. Worth every minute.',
    badge: 'Verified Student',
  },
];

export function StudentTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  };

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      className="overflow-hidden border-b border-zinc-200/60 bg-white py-24 dark:border-zinc-800/60 dark:bg-zinc-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl dark:text-white">
            Loved by Students &amp; Engineers
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            See how Cerevia helps ambitious learners unlock career opportunities
            at leading tech enterprises.
          </p>
        </div>

        {/* Featured Testimonial Card Carousel Showcase */}
        <div className="mx-auto max-w-4xl">
          <div className="relative rounded-3xl border border-zinc-200 bg-[#FAFAFA] p-8 shadow-xl backdrop-blur-2xl sm:p-12 dark:border-zinc-800 dark:bg-zinc-900/60">
            {/* Quote Watermark Icon */}
            <Quote className="pointer-events-none absolute right-8 top-8 h-20 w-20 text-zinc-200/60 dark:text-zinc-800/40" />

            <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:items-start">
              {/* Student Avatar Visual */}
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-xl sm:h-28 sm:w-28 dark:border-zinc-800">
                <Image
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content Column */}
              <div className="flex-1 space-y-4 text-center md:text-left">
                {/* Rating Stars & Badge */}
                <div className="flex items-center justify-center gap-3 md:justify-start">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500" />
                    ))}
                  </div>

                  <span className="rounded-full bg-blue-500/10 px-3 py-0.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                    {activeTestimonial.badge}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-base font-medium italic leading-relaxed text-zinc-800 sm:text-lg dark:text-zinc-200">
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div>
                  <h4 className="text-base font-bold text-zinc-950 dark:text-white">
                    {activeTestimonial.name}
                  </h4>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    {activeTestimonial.role} at{' '}
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                      {activeTestimonial.company}
                    </span>
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                    Completed: {activeTestimonial.course}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="mt-8 flex items-center justify-between border-t border-zinc-200/80 pt-6 dark:border-zinc-800/80">
              {/* Carousel Pagination Dots */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx
                        ? 'w-8 bg-zinc-950 dark:bg-white'
                        : 'w-2.5 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
