'use client';

import { Logo } from './Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navigation = {
    platform: [
      { label: 'Home', href: '#home' },
      { label: 'Courses', href: '#courses' },
      { label: 'Learning Paths', href: '#learning-paths' },
      { label: 'Leaderboard', href: '#leaderboard' },
      { label: 'Why Cerevia', href: '#why-cerevia' },
    ],
    courses: [
      { label: 'Python for AI', href: '#courses' },
      { label: 'Java Enterprise', href: '#courses' },
      { label: 'React 19 & Next.js', href: '#courses' },
      { label: 'Node.js Microservices', href: '#courses' },
      { label: 'Cloud & Kubernetes', href: '#courses' },
      { label: 'System Design', href: '#courses' },
    ],
    resources: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/api' },
      { label: 'Community Forum', href: '#contact' },
      { label: 'Student Perks', href: '#impact' },
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Contact', href: '#contact' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Security Audit', href: '#' },
    ],
  };

  return (
    <footer className="border-t border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-12 dark:border-zinc-800">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-4">
            <Logo />
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              Learn Smarter. Practice Better. Build Your Future.
            </p>
            <p className="max-w-sm text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              Cerevia is an AI-powered education platform designed to empower
              engineers with hands-on coding sandboxes, interactive paths, and
              gamified streak systems.
            </p>

            {/* Platform Status Indicator */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-8">
            {/* Platform Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                Platform
              </h4>
              <ul className="space-y-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {navigation.platform.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="transition-colors hover:text-blue-600 dark:hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Courses Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                Courses
              </h4>
              <ul className="space-y-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {navigation.courses.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="transition-colors hover:text-blue-600 dark:hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                Resources
              </h4>
              <ul className="space-y-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {navigation.resources.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="transition-colors hover:text-blue-600 dark:hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
                Company
              </h4>
              <ul className="space-y-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {navigation.company.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="transition-colors hover:text-blue-600 dark:hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Social & Copyright Ribbon */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-zinc-500 sm:flex-row">
          <p>&copy; {currentYear} Cerevia Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/kalviumcommunity/S116-0726-StackForge-FullStack-Nextjs-PostgreSQL-Prisma-Cerevia"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-zinc-950 dark:hover:text-white"
            >
              GitHub
            </a>
            <a
              href="#"
              className="font-medium transition-colors hover:text-zinc-950 dark:hover:text-white"
            >
              Twitter / X
            </a>
            <a
              href="#"
              className="font-medium transition-colors hover:text-zinc-950 dark:hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="font-medium transition-colors hover:text-zinc-950 dark:hover:text-white"
            >
              Discord
            </a>
            <a
              href="#"
              className="font-medium transition-colors hover:text-zinc-950 dark:hover:text-white"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer as PublicFooter };
